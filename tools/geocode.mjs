#!/usr/bin/env node
/* ==========================================================================
   geocode.mjs — find coordinates for a trip's unverified waypoints, and
   only mark one verified when the evidence actually supports it.

   Run:
     node tools/geocode.mjs kentucky-2026
     node tools/geocode.mjs kentucky-2026 --name "Koomer Ridge Campground"
     node tools/geocode.mjs kentucky-2026 --near 37.78,-83.63 --radius 25000
     node tools/geocode.mjs kentucky-2026 --park biso --write

   Federal data — pick either, the bulk download is the better one:
     export RIDB_DATA=~/Downloads/RIDBFullExport   (no key; get the CSV or
       JSON dump from https://ridb.recreation.gov/download and extract it.
       Also picked up automatically from data/ridb/.)
     export RIDB_API_KEY=…   https://ridb.recreation.gov/profile — the key is
       a long hex string on your profile page, NOT your username.
     export NPS_API_KEY=…    https://www.nps.gov/subjects/developer/get-started.htm

   Without one of these you only get OSM, which is never enough on its own to
   reach VERIFIED.

   THE RULE (non-negotiable 1, mechanised):
     VERIFIED  an official agency dataset has it, OR two independent
               providers agree within --tolerance metres
     REVIEW    something was found, but not enough to trust — printed for you
               to judge, NEVER written to data.js
     NONE      nothing found; the waypoint stays null, which is a correct
               and useful answer

   OSM alone is REVIEW, not VERIFIED. Overpass and Nominatim are both OSM and
   count once between them — see tools/lib/sources.mjs.
   ========================================================================== */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import {
  PROVIDERS, lookupOverpass, lookupNominatim, lookupRidb, lookupNps,
} from "./lib/sources.mjs";
import { lookupRidbLocal, ridbDataDir, buildIndex, diagnose, searchedPaths } from "./lib/ridb-local.mjs";
import { haversineMeters, spreadMeters, centroid } from "./lib/geo.mjs";
import { bestCluster } from "./lib/rank.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------------- args ---------------- */

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
const flag = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? dflt : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);

if (!slug) {
  console.error("usage: node tools/geocode.mjs <trip-slug> [--name X] [--near lat,lng] [--park CODE] [--radius M] [--tolerance M] [--all] [--write]");
  process.exit(2);
}

// A trip's map.center is a DISPLAY centroid. On a two-region trip it can sit
// a hundred kilometres from every actual waypoint — Kentucky's [37.0, -84.2]
// is halfway between Red River Gorge and Big South Fork and near neither — so
// the default radius has to cover a whole trip, not a whole park. Use --near
// to tighten it back down when you know roughly where the place is.
const RADIUS = Number(flag("radius", 100000));
const TOLERANCE = Number(flag("tolerance", 150));
const PARK = flag("park", null);
const ONLY = flag("name", null);

/* ---------------- load the trip ---------------- */

const rel = `trips/${slug}/data.js`;
const file = join(ROOT, rel);
let source;
try {
  source = readFileSync(file, "utf8");
} catch {
  console.error(`No such trip data file: ${rel}`);
  process.exit(2);
}

const sandbox = { window: {}, document: { documentElement: { style: { setProperty() {} } } } };
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(ROOT, "js/themes.js"), "utf8"), sandbox);
vm.runInContext(source, sandbox, { filename: rel });
const D = sandbox.window.TRIP_DATA;

if (!D || !Array.isArray(D.waypoints)) {
  console.error(`${rel}: no waypoints array`);
  process.exit(2);
}

const nearArg = flag("near", null);
let anchor = null;
let anchorFrom = "";

if (nearArg) {
  const [la, ln] = nearArg.split(",").map((n) => Number(n.trim()));
  if (Number.isFinite(la) && Number.isFinite(ln)) {
    anchor = { lat: la, lng: ln };
    anchorFrom = "--near";
  } else {
    console.error(`--near must be "lat,lng" — got "${nearArg}"`);
    process.exit(2);
  }
}

// Prefer the waypoints already confirmed: their centre is a real point on the
// trip, unlike map.center which only has to look right on a map.
if (!anchor) {
  const known = D.waypoints.filter((w) => w.verified && w.lat != null && w.lng != null);
  if (known.length) {
    anchor = centroid(known.map((w) => ({ lat: w.lat, lng: w.lng })));
    anchorFrom = `centre of ${known.length} verified waypoint(s)`;
  }
}

if (!anchor && D.map && D.map.center) {
  anchor = { lat: D.map.center[0], lng: D.map.center[1] };
  anchorFrom = "map.center (display centroid — may be far from any waypoint)";
}

if (!anchor) {
  console.error(`${rel}: no verified waypoints and no map.center — pass --near "lat,lng" to anchor the search`);
  process.exit(2);
}

let targets = D.waypoints.filter((w) => (has("all") ? true : !(w.verified && w.lat != null)));
if (ONLY) targets = targets.filter((w) => w.name === ONLY);

if (!targets.length) {
  console.log(`Nothing to do — every waypoint in ${slug} is already verified. (--all to re-check.)`);
  process.exit(0);
}

/* ---------------- evidence → verdict ---------------- */

function verdictFor(cluster) {
  if (!cluster || !cluster.members.length) return { verdict: "NONE", why: "nothing found" };
  if (cluster.officials.length) {
    const p = PROVIDERS[cluster.officials[0].provider].label;
    return { verdict: "VERIFIED", why: `official source: ${p}` };
  }
  if (cluster.providers.size >= 2) {
    return {
      verdict: "VERIFIED",
      why: `${cluster.providers.size} independent providers agree within ${Math.round(cluster.spread)} m (${[...cluster.providers].join(" + ")})`,
    };
  }
  return {
    verdict: "REVIEW",
    why: `only ${[...cluster.providers].join(", ")} — one community source is not corroboration`,
  };
}

/** Prefer the official agency's own number over an average that drags it
    toward a community-edited point. If several officials agree, take their
    centroid; otherwise the centroid of the cluster. */
function pickCoords(cluster) {
  const pts = cluster.officials.length ? cluster.officials : cluster.members;
  return centroid(pts);
}

/* ---------------- run ---------------- */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];

console.log(`\n${slug} — ${targets.length} waypoint(s) to resolve`);
console.log(`anchor ${anchor.lat.toFixed(4)}, ${anchor.lng.toFixed(4)} (${anchorFrom})`);
console.log(`radius ${(RADIUS / 1000).toFixed(0)} km · agreement tolerance ${TOLERANCE} m`);
let bulkDir = ridbDataDir(ROOT);
if (bulkDir) {
  console.log(`  Recreation.gov: reading the bulk download at ${bulkDir}`);
  const problem = diagnose(bulkDir);
  if (problem) {
    console.log(`  PROBLEM: ${problem}`);
    console.log(`  Continuing without Recreation.gov — OSM alone never reaches VERIFIED.`);
    bulkDir = null;
  } else {
    // Hand it the names up front so the index holds only what we asked about.
    const idx = await buildIndex(bulkDir, { verbose: true, names: targets.map((w) => w.name) });
    console.log(`  indexed ${idx.places.length} matching place(s) from ${idx.files} file(s)`);
    if (!idx.places.length) {
      console.log(`  note: files were read, but none held a place matching these waypoint names.`);
      console.log(`        That can be right — trailheads are not Recreation.gov facilities.`);
    }
  }
}
if (!bulkDir && !process.env.RIDB_API_KEY) {
  console.log(`  note: Recreation.gov skipped — no bulk export found and no RIDB_API_KEY.`);
  const looked = searchedPaths();
  if (looked.length) {
    console.log(`        Looked for Facilities_API_v1.csv under:`);
    for (const p of looked) console.log(`          ${p}`);
    console.log(`        On another drive? Point at it directly:`);
    console.log(`          PowerShell:  $env:RIDB_DATA = "E:\\path\\to\\RIDBFullExport_V1_CSV"`);
    console.log(`          bash:        export RIDB_DATA=/path/to/RIDBFullExport_V1_CSV`);
  }
}
if (!process.env.NPS_API_KEY) console.log(`  note: ${PROVIDERS.nps.label} skipped — NPS_API_KEY not set`);
console.log("");

for (const w of targets) {
  const cands = [];
  const errors = [];

  const hints = [];
  const collect = async (label, fn) => {
    try {
      const r = await fn();
      if (r && r.skipped) return;
      if (r && r.hint) hints.push(r.hint);
      cands.push(...(r || []));
    } catch (e) {
      errors.push(`${label}: ${e.message}`);
    }
  };

  await collect("overpass", () => lookupOverpass(w.name, { ...anchor, radiusM: RADIUS }));
  await sleep(1100); // Nominatim asks for <= 1 req/sec, and means it
  await collect("nominatim", () => lookupNominatim(w.name, { ...anchor, radiusM: RADIUS }));
  // The bulk download and the API are the same dataset, so use one or the
  // other — querying both would double-count Recreation.gov as if it were two
  // sources, which is exactly the mistake the provider ids exist to prevent.
  if (bulkDir) await collect("ridb", () => lookupRidbLocal(w.name, { ...anchor, radiusM: RADIUS, root: ROOT }));
  else await collect("ridb", () => lookupRidb(w.name, { ...anchor, radiusM: RADIUS }));
  await collect("nps", () => lookupNps(w.name, { parkCode: PARK }));

  // Anything absurdly far from the trip is a name collision, not our place.
  const near = cands.filter((c) => haversineMeters(anchor, c) <= RADIUS * 1.5);
  const cluster = bestCluster(near, TOLERANCE, anchor);
  const { verdict, why } = verdictFor(cluster);
  const coords = cluster && cluster.members.length ? pickCoords(cluster) : null;

  results.push({ w, verdict, why, coords, cluster, near, errors, hints });

  const mark = { VERIFIED: "✓", REVIEW: "?", NONE: "×" }[verdict];
  console.log(`${mark} ${w.name}`);
  console.log(`    ${verdict} — ${why}`);
  if (coords) console.log(`    ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);

  // Two places sharing a name is common and the distance between them is the
  // giveaway: "Twin Arches" is an arch in Red River Gorge AND the landmark in
  // Big South Fork, 166 km apart. Printing one coordinate under a REVIEW made
  // an arbitrary pick look like an answer.
  if (verdict !== "VERIFIED" && near.length > 1) {
    const apart = spreadMeters(near);
    if (apart > 5000) {
      console.log(`    ! candidates are spread over ${(apart / 1000).toFixed(0)} km — more than one place answers to this name.`);
      console.log(`      The coordinate above is the best of them, not a decision. Pick from the list yourself.`);
    }
  }
  for (const c of near.slice(0, 8)) {
    const d = coords ? `${Math.round(haversineMeters(coords, c))} m` : "";
    const inCluster = cluster && cluster.members.includes(c) ? " *" : "  ";
    console.log(`     ${inCluster} [${c.via}] ${c.lat.toFixed(6)}, ${c.lng.toFixed(6)}  ${c.detail}  ${d}`);
    if (c.url) console.log(`          ${c.url}`);
  }
  if (near.length > 8) console.log(`        … ${near.length - 8} more`);
  for (const h of hints) console.log(`      → ${h}`);
  for (const e of errors) console.log(`      ! ${e}`);
  console.log("");
}

/* ---------------- write ---------------- */

const writable = results.filter((r) => r.verdict === "VERIFIED");

if (!has("write")) {
  console.log(`${writable.length} waypoint(s) would be written. Re-run with --write to apply.`);
  console.log(`REVIEW rows are never written — confirm them yourself and edit ${rel} by hand.`);
  process.exit(0);
}

/** The span of the waypoints array in the source, by bracket counting.

    A place name is NOT unique in a trip file — the same campground appears in
    the lodging rows, in the Places tab and in the waypoints, so a search for
    `name: "X"` across the whole file finds the Places entry first, which has
    no coordinates to rewrite. Scoping to the array is the difference between
    editing the right line and quietly editing nothing. */
function waypointsSpan(text) {
  const open = /(?:^|\n)\s*(?:waypoints:|const\s+WAYPOINTS\s*=)\s*\[/.exec(text);
  if (!open) return null;
  const start = open.index + open[0].length - 1;   // at the "["
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (c === "[") depth++;
    else if (c === "]") { if (--depth === 0) return { start, end: i + 1 }; }
  }
  return null;
}

let out = source;
let written = 0;
const skipped = [];

const span = waypointsSpan(out);
if (!span) {
  console.log(`Could not locate the waypoints array in ${rel} — nothing written.`);
  process.exit(1);
}
let region = out.slice(span.start, span.end);

for (const r of writable) {
  // Waypoints are single-line objects by convention. Rewrite only the three
  // fields on the line carrying this name, and only inside the waypoints
  // array. Requiring lat/lng on the line too, so a differently shaped entry
  // is reported rather than mangled.
  const nameLit = r.w.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const lineRe = new RegExp(
    `^([ \\t]*\\{[^\\n]*name:\\s*"${nameLit}"[^\\n]*lat:[^\\n]*\\},?)$`, "m");
  const m = region.match(lineRe);
  if (!m) {
    skipped.push(`${r.w.name} — no single-line waypoint entry with a lat field to rewrite`);
    continue;
  }

  let line = m[1];
  if (!/lat:\s*[^,]+,\s*lng:\s*[^,]+,/.test(line) || !/verified:\s*(true|false)/.test(line)) {
    skipped.push(`${r.w.name} — entry does not have the expected lat/lng/verified fields`);
    continue;
  }
  line = line
    .replace(/lat:\s*[^,]+,/, `lat: ${r.coords.lat.toFixed(6)},`)
    .replace(/lng:\s*[^,]+,/, `lng: ${r.coords.lng.toFixed(6)},`)
    .replace(/verified:\s*(true|false)/, "verified: true");
  region = region.replace(lineRe, line);
  written++;
}

out = out.slice(0, span.start) + region + out.slice(span.end);

if (written) writeFileSync(file, out);
console.log(`Wrote ${written} coordinate(s) into ${rel}.`);
for (const s of skipped) console.log(`  skipped: ${s}`);
console.log(`Now run: node tools/validate.mjs`);
