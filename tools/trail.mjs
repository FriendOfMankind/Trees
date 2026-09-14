#!/usr/bin/env node
/* ==========================================================================
   trail.mjs — put a hike's real shape on the map by transcribing the way
   OpenStreetMap already has for it, instead of asking a routing engine to
   invent a path across the terrain.

   Run:
     node tools/trail.mjs kentucky-2026 --near 37.78,-83.63
     node tools/trail.mjs kentucky-2026 --name "Auxier Ridge Trail" --near 37.78,-83.63
     node tools/trail.mjs kentucky-2026 --near 37.78,-83.63 --write

   WHY NOT ROUTE IT: a foot-routing engine given two ends of a trail will
   return *a* path whether or not the trail is mapped — across a different
   trail, down a service road, or the long way round a ridge. Transcribing the
   named way gives you either the real line or nothing, and nothing is a
   correct answer that tells you the trail isn't mapped yet.

   A trail is usually several OSM ways, not one. Each match is kept as its own
   segment rather than stitched, because stitching means guessing the join
   order and a wrong guess draws a line through a cliff.
   ========================================================================== */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { trailGeometryOsm, nameVariants } from "./lib/sources.mjs";
import { haversineMeters, encodePolyline, simplify, metersToMiles, centroid } from "./lib/geo.mjs";
import { renderBlock, spliceBlock } from "./lib/blocks.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1]; };
const has = (n) => argv.includes(`--${n}`);

if (!slug) {
  console.error('usage: node tools/trail.mjs <trip-slug> [--name "Trail"] [--near lat,lng] [--radius M] [--write]');
  process.exit(2);
}

const RADIUS = Number(flag("radius", 25000));
const ONLY = flag("name", null);

const rel = `trips/${slug}/data.js`;
const source = readFileSync(join(ROOT, rel), "utf8");
const sandbox = { window: {}, document: { documentElement: { style: { setProperty() {} } } } };
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(ROOT, "js/themes.js"), "utf8"), sandbox);
vm.runInContext(source, sandbox, { filename: rel });
const D = sandbox.window.TRIP_DATA;

/* ---------------- anchor ---------------- */

const nearArg = flag("near", null);
let anchor = null;
if (nearArg) {
  const [la, ln] = nearArg.split(",").map((n) => Number(n.trim()));
  if (!Number.isFinite(la) || !Number.isFinite(ln)) { console.error(`--near must be "lat,lng"`); process.exit(2); }
  anchor = { lat: la, lng: ln };
} else {
  const known = (D.waypoints || []).filter((w) => w.verified && w.lat != null);
  if (known.length) anchor = centroid(known.map((w) => ({ lat: w.lat, lng: w.lng })));
  else if (D.map && D.map.center) anchor = { lat: D.map.center[0], lng: D.map.center[1] };
}
if (!anchor) { console.error(`${rel}: pass --near "lat,lng" — nothing in the file anchors the search`); process.exit(2); }

/* ---------------- which hikes ---------------- */

const hikeRows = (D.hikes && D.hikes.rows) || [];
let names = ONLY ? [ONLY] : hikeRows.map((h) => h.name).filter(Boolean);
if (!names.length) {
  console.error(`${rel}: no hikes to look up. Pass --name "Trail name".`);
  process.exit(2);
}

/* ---------------- fetch ---------------- */

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
const today = new Date().toISOString().slice(0, 10);
const lengthOf = (pts) => pts.slice(1).reduce(
  (s, p, i) => s + haversineMeters({ lat: pts[i][0], lng: pts[i][1] }, { lat: p[0], lng: p[1] }), 0);

const routes = [];
console.log(`\n${slug} — ${names.length} trail(s), anchor ${anchor.lat.toFixed(4)}, ${anchor.lng.toFixed(4)}, radius ${(RADIUS / 1000).toFixed(0)} km\n`);

for (const name of names) {
  // Try the page's wording first, then looser forms of it. Stop at the first
  // variant that finds anything, so an exact match is never diluted by a
  // broader one that happens to catch more ways.
  let ways = [];
  let matchedAs = name;
  let error = null;
  for (const variant of nameVariants(name)) {
    try {
      const found = await trailGeometryOsm(variant, { ...anchor, radiusM: RADIUS });
      if (found.length) { ways = found; matchedAs = variant; break; }
    } catch (e) {
      error = e;
      break; // a transport failure will not fix itself on the next variant
    }
    await new Promise((r) => setTimeout(r, 400)); // be polite to Overpass
  }

  if (error) {
    console.log(`✗ ${name}\n    ${error.message}\n`);
    continue;
  }

  if (!ways.length) {
    console.log(`× ${name}`);
    console.log(`    no OSM way by this name — tried: ${nameVariants(name).join(" · ")}`);
    console.log(`    within ${(RADIUS / 1000).toFixed(0)} km. That is a real answer: the trail`);
    console.log(`    isn't mapped under a name we recognise. Leave it off rather than guess.\n`);
    continue;
  }

  const segments = [];
  let totalM = 0;
  const notes = new Set();

  for (const w of ways) {
    const pts = simplify(w.points);
    const m = lengthOf(pts);
    totalM += m;
    segments.push(encodePolyline(pts.map(([lat, lng]) => ({ lat, lng }))));
    if (w.sacScale) notes.add(`sac_scale=${w.sacScale}`);
    if (w.surface) notes.add(`surface=${w.surface}`);
  }

  const miles = metersToMiles(totalM);
  console.log(`✓ ${name}`);
  if (matchedAs !== name) console.log(`    matched OSM as "${matchedAs}" — confirm that's the same trail`);
  console.log(`    ${ways.length} OSM way(s) · ${miles.toFixed(2)} mi mapped · ${segments.join("").length} bytes`);
  if (notes.size) console.log(`    OSM tags: ${[...notes].join(", ")}`);
  for (const w of ways.slice(0, 5)) console.log(`      ${w.url}`);
  if (ways.length > 5) console.log(`      … ${ways.length - 5} more`);

  // Cross-check against the distance the page already claims. A big gap means
  // the name matched the wrong trail, or OSM has only part of it — either way
  // you want to know before this line goes on a map you navigate by.
  const row = hikeRows.find((h) => h.name === name);
  const claimed = row && String(row.distance || "").match(/([\d.]+)\s*mi/i);
  if (claimed) {
    const stated = Number(claimed[1]);
    const ratio = miles / stated;
    if (ratio < 0.6 || ratio > 1.7) {
      console.log(`    ! data.js says ${stated} mi, OSM has ${miles.toFixed(2)} mi — check this matched the right trail`);
    } else {
      console.log(`    matches the ${stated} mi in data.js`);
    }
  }
  console.log("");

  routes.push({
    id: slugify(name),
    label: name,
    mode: "hiking",
    days: (row && row.day) || "",
    distanceMi: Number(miles.toFixed(2)),
    source: `osm/way ${ways.map((w) => w.wayId).join(",")}`.slice(0, 120),
    generated: today,
    geometry: segments,
  });
}

if (!routes.length) { console.log("Nothing to write."); process.exit(1); }

const block = renderBlock("TRAILS", "trails", routes);

if (!has("write")) {
  console.log(`Preview only. Re-run with --write to put this into ${rel}:\n`);
  console.log(block.slice(0, 1200) + (block.length > 1200 ? "\n    … truncated" : ""));
  process.exit(0);
}

const spliced = spliceBlock(source, "TRAILS", block);
if (!spliced) {
  console.log(`Could not find the waypoints array in ${rel} to place this after. Paste it in yourself:\n`);
  console.log(block);
  process.exit(1);
}

const { writeFileSync } = await import("node:fs");
writeFileSync(join(ROOT, rel), spliced.text);
console.log(`${spliced.how === "inserted" ? "Inserted" : "Updated"} ${routes.length} trail(s) in ${rel}.`);
console.log(`Now run: node tools/manifest.mjs && node tools/validate.mjs`);
