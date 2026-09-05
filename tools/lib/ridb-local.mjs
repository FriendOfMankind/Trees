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

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { haversineMeters } from "./geo.mjs";

let INDEX = null; // built once per process

/* ---------------- CSV ---------------- */

/** Minimal RFC-4180 reader. RIDB's exports quote fields containing commas and
    escape quotes by doubling them, which a naive split() silently corrupts —
    and a corrupted row here becomes a coordinate in the wrong place. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else quoted = false;
      } else field += c;
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(field); field = "";
    } else if (c === "\n") {
      row.push(field); field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }

  if (!rows.length) return [];
  const head = rows[0];
  return rows.slice(1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
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

function harvest(records, sourceFile) {
  if (!records.length) return [];
  const sample = records[0];
  const nameKey = findKey(sample, /Name$/i);
  const latKey  = findKey(sample, /Latitude$/i);
  const lngKey  = findKey(sample, /Longitude$/i);
  if (!nameKey || !latKey || !lngKey) return [];

  const idKey   = findKey(sample, /(Facility|RecArea|Campsite)ID$/i) || findKey(sample, /ID$/i);
  const typeKey = findKey(sample, /TypeDescription$/i) || findKey(sample, /Type$/i);

  const out = [];
  for (const r of records) {
    const lat = Number(r[latKey]);
    const lng = Number(r[lngKey]);
    const nm  = r[nameKey];
    // RIDB stores 0,0 for facilities it has never located. Those are not a
    // place off the coast of Africa; they are missing data, and letting one
    // through would put a pin in the Atlantic.
    if (!nm || !Number.isFinite(lat) || !Number.isFinite(lng)) continue;
    if (lat === 0 && lng === 0) continue;
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180) continue;
    out.push({
      name: String(nm),
      lat, lng,
      id: idKey ? r[idKey] : null,
      kind: typeKey ? r[typeKey] : basename(sourceFile, extname(sourceFile)),
    });
  }
  return out;
}

/* ---------------- index ---------------- */

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

export function ridbDataDir(root) {
  if (process.env.RIDB_DATA) return process.env.RIDB_DATA;
  const local = join(root, "data/ridb");
  return existsSync(local) ? local : null;
}

export function buildIndex(dir, { verbose = false } = {}) {
  if (INDEX) return INDEX;
  const files = walk(dir);
  const places = [];
  const report = [];

  for (const f of files) {
    let found = [];
    try {
      const size = statSync(f).size;
      const text = readFileSync(f, "utf8");
      if (extname(f).toLowerCase() === ".csv") {
        found = harvest(parseCsv(text), f);
      } else {
        for (const arr of arraysIn(JSON.parse(text))) found.push(...harvest(arr, f));
      }
      report.push(`${basename(f)}  ${(size / 1e6).toFixed(1)} MB  →  ${found.length} located place(s)`);
    } catch (e) {
      report.push(`${basename(f)}  SKIPPED — ${e.message.slice(0, 80)}`);
    }
    places.push(...found);
  }

  if (verbose) for (const line of report) console.log(`    ${line}`);
  INDEX = { places, files: files.length, report };
  return INDEX;
}

/* ---------------- lookup ---------------- */

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Same contract as the API provider in sources.mjs: return candidates tagged
    `ridb`, which counts as official and so can reach VERIFIED on its own. */
export function lookupRidbLocal(name, { lat, lng, radiusM = 100000, root }) {
  const dir = ridbDataDir(root);
  if (!dir) {
    return { skipped: "no RIDB bulk data — set RIDB_DATA or put the extracted download in data/ridb/" };
  }
  const idx = buildIndex(dir);
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
