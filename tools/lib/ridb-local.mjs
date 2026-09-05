/* ==========================================================================
   ridb-local.mjs — read the bulk RIDB download instead of calling the API.

   Recreation.gov publishes its whole recreation-area / facility / site
   database as a daily CSV and JSON dump:
     https://ridb.recreation.gov/download

   For a site with a few dozen waypoints that is strictly better than the API:
   no key, no rate limit, no round trip per lookup, and it keeps working on a
   plane. Same authoritative federal data either way.

   Point the tools at it with:
     export RIDB_DATA=~/Downloads/RIDBFullExport
   or drop the extracted files in data/ridb/ (gitignored — it is hundreds of
   megabytes and it is not ours to redistribute).

   FIELD DETECTION IS DELIBERATELY GENERIC. The archive's exact filenames and
   columns are not pinned here because they are not guaranteed stable and
   nobody has verified them from inside this repo. Instead: walk whatever is
   there, and treat any record carrying a *Name plus a *Latitude/*Longitude
   as a locatable place. That works for Facilities (FacilityName /
   FacilityLatitude) and RecAreas (RecAreaName / RecAreaLatitude) alike, and
   it does not break when a column is renamed or a file is added.
   ========================================================================== */

import { readFileSync, readdirSync, existsSync, statSync, createReadStream } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import { haversineMeters } from "./geo.mjs";

/* The full RIDB export unzips to gigabytes across many files, most of which
   have no coordinates in them at all (attributes, permits, tours, media).
   So: never hold a whole file in memory. Stream it, decide from the header
   row whether it can possibly contain a place, and abandon it immediately if
   not. A 900 MB Campsites file that we do want costs one pass and only the
   rows that survive filtering; one we don't costs a single chunk. */
/* The index keeps only records whose name relates to a waypoint we are
   actually looking for. That is what makes this viable: the full export runs
   to millions of rows — individual campsites like "Site 412, loop A" — and
   holding them all costs gigabytes to answer forty questions. Filtering on
   the way in makes memory a function of the matches, not the dataset, and it
   drops the per-site noise for free, since no waypoint is ever named that. */
const MAX_PLACES = 200_000;     // backstop if someone indexes with no names
const MAX_JSON_BYTES = 300e6;   // JSON.parse needs the whole file as a string

let INDEX = null; // built once per process

/* ---------------- CSV ---------------- */

/** Streaming RFC-4180 reader.

    RIDB quotes fields containing commas and escapes quotes by doubling them,
    and a quoted field may contain a literal newline — so this is a character
    state machine over chunks, not a split() on lines. A naive reader corrupts
    exactly the rows with the most punctuation in them, and a corrupted row
    here becomes a coordinate in the wrong place.

    `onHeader` gets the first row and returns false to abandon the file, which
    is how a 900 MB table with no coordinate columns costs one chunk. */
async function streamCsv(file, onHeader, onRecord) {
  const stream = createReadStream(file, { encoding: "utf8", highWaterMark: 1 << 20 });
  let header = null;
  let row = [];
  let field = "";
  let quoted = false;
  let stopped = false;

  const endRow = () => {
    row.push(field);
    field = "";
    const r = row;
    row = [];
    if (r.length === 1 && r[0] === "") return;      // blank line
    if (!header) {
      header = r;
      if (onHeader(header) === false) { stopped = true; stream.destroy(); }
      return;
    }
    onRecord(header, r);
  };

  try {
    for await (const chunk of stream) {
      for (let i = 0; i < chunk.length; i++) {
        const c = chunk[i];
        if (quoted) {
          if (c === '"') {
            if (chunk[i + 1] === '"') { field += '"'; i++; }
            else if (i === chunk.length - 1) quoted = false; // "" split across chunks is
            else quoted = false;                             // vanishingly rare; treat as close
          } else field += c;
        } else if (c === '"') quoted = true;
        else if (c === ",") { row.push(field); field = ""; }
        else if (c === "\n") endRow();
        else if (c !== "\r") field += c;
      }
      if (stopped) break;
    }
  } catch (e) {
    if (!stopped) throw e;   // destroy() surfaces as an abort; anything else is real
  }
  if (!stopped && (field !== "" || row.length)) endRow();
  return { header, stopped };
}

/* ---------------- shape detection ---------------- */

const findKey = (obj, re) => Object.keys(obj).find((k) => re.test(k));

/** Pull every array-of-objects out of whatever JSON shape the file has —
    a bare array, {RECDATA:[…]}, or a wrapper object with one array inside. */
function arraysIn(value, depth = 0) {
  if (depth > 3 || !value) return [];
  if (Array.isArray(value)) {
    return value.length && typeof value[0] === "object" && value[0] !== null ? [value] : [];
  }
  if (typeof value === "object") {
    return Object.values(value).flatMap((v) => arraysIn(v, depth + 1));
  }
  return [];
}

/** Work out, from a set of column names, which ones locate a place.
    Returns null when this table cannot contain one. */
function planFor(keys, sourceFile) {
  const find = (re) => keys.find((k) => re.test(k));
  const name = find(/Name$/i);
  const lat  = find(/Latitude$/i);
  const lng  = find(/Longitude$/i);
  if (!name || !lat || !lng) return null;
  return {
    name, lat, lng,
    id: find(/(Facility|RecArea|Campsite)ID$/i) || find(/ID$/i),
    type: find(/TypeDescription$/i) || find(/Type$/i),
    fallbackKind: basename(sourceFile, extname(sourceFile)),
  };
}

/** One record → a place, or null. `get` reads a column by name. */
function toPlace(plan, get) {
  const lat = Number(get(plan.lat));
  const lng = Number(get(plan.lng));
  const nm = get(plan.name);
  // RIDB stores 0,0 for facilities it has never located. That is not a place
  // off the coast of Africa; it is missing data, and letting one through puts
  // a pin in the Atlantic.
  if (!nm || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat === 0 && lng === 0) return null;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return {
    name: String(nm),
    lat, lng,
    id: plan.id ? get(plan.id) : null,
    kind: (plan.type ? get(plan.type) : null) || plan.fallbackKind,
  };
}

function harvest(records, sourceFile) {
  if (!records.length) return [];
  const plan = planFor(Object.keys(records[0]), sourceFile);
  if (!plan) return [];
  const out = [];
  for (const r of records) {
    const p = toPlace(plan, (k) => r[k]);
    if (p) out.push(p);
  }
  return out;
}

/* ---------------- index ---------------- */

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function walk(dir, depth = 0) {
  if (depth > 3) return [];
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return []; }
  return entries.flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return walk(p, depth + 1);
    const ext = extname(e.name).toLowerCase();
    return ext === ".json" || ext === ".csv" ? [p] : [];
  });
}

/* Names that only ever appear inside an extracted RIDB export. Finding one of
   these is proof we are looking at the right folder. */
const EXPORT_MARKERS = [/^Facilities_API_v\d+\.csv$/i, /^RecAreas_API_v\d+\.csv$/i,
                        /^Facilities_API_v\d+\.json$/i];

/** Look for an extracted export under `start`, breadth-first to `maxDepth`.
    Returns the folder containing the marker file, or null. */
function findExportUnder(start, maxDepth = 3) {
  if (!existsSync(start)) return null;
  let level = [start];
  for (let depth = 0; depth <= maxDepth && level.length; depth++) {
    const next = [];
    for (const dir of level) {
      let entries;
      try { entries = readdirSync(dir, { withFileTypes: true }); } catch { continue; }
      if (entries.some((e) => e.isFile() && EXPORT_MARKERS.some((re) => re.test(e.name)))) return dir;
      for (const e of entries) {
        // Don't wander into places an export is never unpacked to. A blind
        // walk of a home directory is slow and can hit permission errors on
        // every OneDrive and AppData folder on the way.
        if (e.isDirectory() && !e.name.startsWith(".") &&
            !/^(node_modules|AppData|Library|Windows|Program Files.*|\$Recycle\.Bin)$/i.test(e.name)) {
          next.push(join(dir, e.name));
        }
      }
    }
    level = next;
  }
  return null;
}

/** Where the bulk export is. Explicit setting wins; otherwise go looking,
    because "point an environment variable at the right folder" turned out to
    be the single hardest step in this whole pipeline and it does not need to
    be a step at all. */
export function ridbDataDir(root) {
  if (process.env.RIDB_DATA) return process.env.RIDB_DATA;

  const local = join(root, "data/ridb");
  if (existsSync(local)) return local;

  const home = process.env.USERPROFILE || process.env.HOME || "";
  const candidates = [
    root,
    join(root, ".."),
    home && join(home, "Downloads"),
    home && join(home, "Desktop"),
    home && join(home, "Documents"),
    home && join(home, "OneDrive", "Downloads"),
    home && join(home, "OneDrive", "Desktop"),
    home,
  ].filter(Boolean);

  for (const c of candidates) {
    const found = findExportUnder(c, c === home ? 2 : 3);
    if (found) return found;
  }
  return null;
}

/** Say precisely what is wrong with a data directory, because "nothing usable
    found" covers four different mistakes and sends you looking at the wrong
    one. Returns null when the directory is fine. */
export function diagnose(dir) {
  if (!existsSync(dir)) {
    const parent = dirname(dir);
    const leaf = basename(dir);
    let siblings = [];
    try { siblings = readdirSync(parent); } catch { /* parent unreadable too */ }

    // The overwhelmingly likely mistake: the download is still a zip.
    const zip = siblings.find((n) => n.toLowerCase() === `${leaf.toLowerCase()}.zip`)
             || siblings.find((n) => /ridb.*\.zip$/i.test(n));
    if (zip) {
      return `that folder does not exist, but ${join(parent, zip)} does.\n` +
             `      The download is still zipped. Extract it first — right-click → Extract All —\n` +
             `      then point RIDB_DATA at the folder it produces.`;
    }
    const near = siblings.filter((n) => /ridb/i.test(n)).slice(0, 5);
    return `that path does not exist.` +
      (near.length ? `\n      Nearby in ${parent}: ${near.join(", ")}` : "");
  }

  let stat;
  try { stat = statSync(dir); } catch (e) { return `cannot read it — ${e.message}`; }
  if (!stat.isDirectory()) {
    return /\.zip$/i.test(dir)
      ? `that is the zip file itself, not a folder. Extract it and point at the folder.`
      : `that is a file, not a folder.`;
  }

  const found = walk(dir);
  if (found.length) return null;

  let entries = [];
  try { entries = readdirSync(dir); } catch { /* ignore */ }
  if (!entries.length) return `the folder is empty — did the extraction finish?`;
  const zipInside = entries.filter((n) => /\.zip$/i.test(n));
  if (zipInside.length) {
    return `it contains ${zipInside.length} zip file(s) and no .csv or .json:\n` +
           `      ${zipInside.slice(0, 5).join(", ")}\n` +
           `      Extract those too, or point RIDB_DATA at wherever they unpack to.`;
  }
  return `no .csv or .json files anywhere under it (searched 3 levels deep).\n` +
         `      It contains: ${entries.slice(0, 8).join(", ")}${entries.length > 8 ? ` … ${entries.length - 8} more` : ""}`;
}

export async function buildIndex(dir, { verbose = false, names = [] } = {}) {
  if (INDEX) return INDEX;
  const files = walk(dir).sort();
  const places = [];

  // Pre-normalise once. Empty list = keep everything, up to MAX_PLACES.
  const targets = names.map(norm).filter((n) => n.length > 2);
  const wanted = (raw) => {
    if (!targets.length) return true;
    const n = norm(raw);
    if (!n) return false;
    for (const t of targets) if (n.includes(t) || t.includes(n)) return true;
    return false;
  };
  const report = [];
  const say = (line) => { report.push(line); if (verbose) console.log(`    ${line}`); };

  for (const f of files) {
    const size = statSync(f).size;
    const mb = `${(size / 1e6).toFixed(1)} MB`;
    const before = places.length;

    try {
      if (extname(f).toLowerCase() === ".csv") {
        let plan = null;
        const { stopped } = await streamCsv(
          f,
          (header) => { plan = planFor(header, f); return plan !== null; },
          (header, row) => {
            if (places.length >= MAX_PLACES) return;
            // Check the name before building anything: it is one string read
            // and it rejects almost every row in a multi-million-row table.
            const nameIdx = header.indexOf(plan.name);
            if (!wanted(row[nameIdx])) return;
            const p = toPlace(plan, (k) => row[header.indexOf(k)]);
            if (p) places.push(p);
          }
        );
        if (stopped) { say(`${basename(f)}  ${mb}  ·  no coordinate columns, skipped after the header`); continue; }
      } else {
        // JSON.parse needs the whole file as one string. The full JSON export
        // is far past what that can take, which is why the CSV export is the
        // one to download — say so rather than dying on an opaque OOM.
        if (size > MAX_JSON_BYTES) {
          say(`${basename(f)}  ${mb}  ·  TOO BIG to parse as JSON — download the CSV export instead`);
          continue;
        }
        for (const arr of arraysIn(JSON.parse(readFileSync(f, "utf8")))) {
          for (const p of harvest(arr, f)) if (wanted(p.name)) places.push(p);
        }
      }
      say(`${basename(f)}  ${mb}  →  ${places.length - before} located place(s)`);
    } catch (e) {
      say(`${basename(f)}  ${mb}  ·  SKIPPED — ${e.message.slice(0, 90)}`);
    }
  }

  if (places.length >= MAX_PLACES) {
    say(`hit the ${MAX_PLACES.toLocaleString()} place ceiling — pass the waypoint names to narrow the index`);
  }
  INDEX = { places, files: files.length, report, filtered: targets.length > 0 };
  return INDEX;
}

/* ---------------- lookup ---------------- */

/** Same contract as the API provider in sources.mjs: return candidates tagged
    `ridb`, which counts as official and so can reach VERIFIED on its own. */
export function lookupRidbLocal(name, { lat, lng, radiusM = 100000, root }) {
  const dir = ridbDataDir(root);
  if (!dir) {
    return { skipped: "no RIDB bulk data — set RIDB_DATA or put the extracted download in data/ridb/" };
  }
  const idx = INDEX;
  if (!idx) return { skipped: "RIDB index not built — call buildIndex() first" };
  if (!idx.places.length) {
    return { skipped: `RIDB data at ${dir} had no records with a name and coordinates` };
  }

  const target = norm(name);
  const hits = [];
  const outOfRange = [];

  for (const p of idx.places) {
    const pn = norm(p.name);
    // Substring either way: the page says "Koomer Ridge Campground" and RIDB
    // may say "Koomer Ridge" — or the reverse.
    if (!pn.includes(target) && !target.includes(pn)) continue;
    const d = haversineMeters({ lat, lng }, p);
    if (d > radiusM) {
      // Keep it. A trip that spans two regions — Red River Gorge to Big South
      // Fork is 170 km — has one anchor and no radius that covers both, so a
      // name match just outside the circle is the single most likely reason a
      // real place reports NONE. Saying so beats a silent miss.
      outOfRange.push({ name: p.name, lat: p.lat, lng: p.lng, km: d / 1000, id: p.id });
      continue;
    }
    hits.push({
      provider: "ridb",
      via: "ridb/bulk",
      label: p.name,
      lat: p.lat,
      lng: p.lng,
      detail: `${p.kind || "facility"}${p.id ? ` · id ${p.id}` : ""}`,
      url: p.id ? `https://www.recreation.gov/camping/campgrounds/${p.id}` : null,
      _distance: d,
    });
  }

  // Closest first, and cap it: a loose name match in a national dataset can
  // return a lot, and the caller only needs enough to cluster.
  hits.sort((a, b) => a._distance - b._distance);
  if (!hits.length && outOfRange.length) {
    outOfRange.sort((a, b) => a.km - b.km);
    const near = outOfRange.slice(0, 3);
    const r = [];
    r.outOfRange = near;
    r.hint =
      `Recreation.gov has ${outOfRange.length === 1 ? "a match" : `${outOfRange.length} matches`} for this name, ` +
      `but outside --radius ${(radiusM / 1000).toFixed(0)} km:\n` +
      near.map((o) => `        ${o.name} — ${o.km.toFixed(0)} km away at ${o.lat.toFixed(6)}, ${o.lng.toFixed(6)}${o.id ? ` (id ${o.id})` : ""}`).join("\n") +
      `\n        If that is the right place: --near ${near[0].lat.toFixed(2)},${near[0].lng.toFixed(2)}  or a bigger --radius.`;
    return r;
  }
  return hits.slice(0, 10);
}

export function resetIndex() { INDEX = null; }
