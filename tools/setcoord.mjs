#!/usr/bin/env node
/* ==========================================================================
   setcoord.mjs — record a coordinate you looked up yourself.

     node tools/setcoord.mjs kentucky-2026 "Auxier Ridge Trailhead" \
       37.828230,-83.677587 --source "Google Maps satellite, USFS 3 trailhead sign"

   WHY THIS EXISTS. geocode.mjs resolves federal facilities well — campgrounds,
   picnic areas, visitor centers are in Recreation.gov with authoritative
   coordinates. Trailheads mostly are not. They live in OpenStreetMap under
   whatever name a mapper chose, and one community source is not corroboration,
   so they land in REVIEW and stay there. That is the rule working, not
   failing: no amount of tooling turns one source into two.

   So the split is: the tool does what can be done from authoritative data, and
   you do the handful it can't. This makes your half take ten seconds instead
   of hand-editing data.js — right-click in any map, copy the coordinates,
   paste them here with where they came from.

   --source is REQUIRED. A coordinate with no provenance is indistinguishable
   from one somebody invented, which is the thing rule 1 exists to prevent.
   ========================================================================== */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { haversineMeters } from "./lib/geo.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const positional = argv.filter((a) => !a.startsWith("--") && argv[argv.indexOf(a) - 1] !== "--source");
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1]; };
const has = (n) => argv.includes(`--${n}`);

const [slug, wpName, coordArg] = positional;
const SOURCE = flag("source", null);

if (!slug || !wpName || !coordArg) {
  console.error(`usage: node tools/setcoord.mjs <slug> "<waypoint name>" <lat>,<lng> --source "where it came from"`);
  console.error(`\nexample:`);
  console.error(`  node tools/setcoord.mjs kentucky-2026 "Twin Arches Trailhead" 36.5417,-84.7357 \\`);
  console.error(`    --source "OSM node 12269314919, cross-checked on the NPS Big South Fork map"`);
  process.exit(2);
}
if (!SOURCE) {
  console.error(`--source is required. Say where the coordinate came from — a map, a sign, an\nofficial page. A coordinate with no provenance cannot be re-checked by anyone,\nincluding you in eight months.`);
  process.exit(2);
}

const [latS, lngS] = coordArg.split(",").map((x) => x.trim());
const lat = Number(latS);
const lng = Number(lngS);
if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
  console.error(`Could not read "${coordArg}" as lat,lng. Expected e.g. 37.828230,-83.677587`);
  process.exit(2);
}
if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
  console.error(`${lat}, ${lng} is off the planet.`);
  process.exit(2);
}

/* ---------------- load ---------------- */

const rel = `trips/${slug}/data.js`;
const file = join(ROOT, rel);
let source;
try { source = readFileSync(file, "utf8"); }
catch { console.error(`No such trip: ${rel}`); process.exit(2); }

const sandbox = { window: {}, document: { documentElement: { style: { setProperty() {} } } } };
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(ROOT, "js/themes.js"), "utf8"), sandbox);
vm.runInContext(source, sandbox, { filename: rel });
const D = sandbox.window.TRIP_DATA;

const wp = (D.waypoints || []).find((w) => w.name === wpName);
if (!wp) {
  console.error(`${rel} has no waypoint named "${wpName}". It has:`);
  for (const w of D.waypoints || []) console.error(`  ${w.name}`);
  process.exit(2);
}

/* ---------------- sanity ---------------- */

/* Every point that says where this trip is: the waypoints already confirmed,
   AND the map centre. Using only the waypoints made a two-region trip fight
   itself — Kentucky runs 170 km from Red River Gorge to Big South Fork, so
   the correct Big South Fork coordinate looked wildly out of place next to
   the only confirmed point at the other end. The map centre is the whole
   trip's middle and settles it. */
const anchors = (D.waypoints || [])
  .filter((w) => w.verified && w.lat != null && w.name !== wpName)
  .map((w) => ({ lat: w.lat, lng: w.lng, name: w.name }));
if (D.map && D.map.center) {
  anchors.push({ lat: D.map.center[0], lng: D.map.center[1], name: "the trip's map centre" });
}

if (anchors.length) {
  const nearest = anchors
    .map((a) => ({ ...a, d: haversineMeters(a, { lat, lng }) }))
    .sort((x, y) => x.d - y.d)[0];

  if (nearest.d > 150000) {
    // The classic paste error is swapping the two numbers, and it produces a
    // coordinate that is confidently somewhere else on Earth. Check whether
    // the swap lands where the trip actually is before blaming the user.
    const swapped = { lat: lng, lng: lat };
    const swapOk = Math.abs(swapped.lat) <= 90 &&
      anchors.some((a) => haversineMeters(a, swapped) < nearest.d / 4);

    console.error(`\n${lat}, ${lng} is ${(nearest.d / 1000).toFixed(0)} km from ${nearest.name}.`);
    if (swapOk) {
      console.error(`\nSwapping them — ${lng}, ${lat} — lands much closer to this trip.`);
      console.error(`That is almost certainly what you meant. Re-run with the numbers the other way round.`);
      process.exit(1);
    }
    console.error(`\nThat may be right for a trip that spans a long way, but it is far enough`);
    console.error(`out to be worth a second look. Re-run with --force if you are sure.`);
    if (!has("force")) process.exit(1);
  } else {
    console.log(`${(nearest.d / 1000).toFixed(1)} km from ${nearest.name} — plausible.`);
  }
}

/* ---------------- write ---------------- */

/** Same array-scoped edit geocode.mjs uses: a place name is not unique in a
    trip file, so searching the whole thing finds the Places entry first. */
function waypointsSpan(text) {
  const open = /(?:^|\n)\s*(?:waypoints:|const\s+WAYPOINTS\s*=)\s*\[/.exec(text);
  if (!open) return null;
  const start = open.index + open[0].length - 1;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === "[") depth++;
    else if (text[i] === "]") { if (--depth === 0) return { start, end: i + 1 }; }
  }
  return null;
}

const span = waypointsSpan(source);
if (!span) { console.error(`Could not locate the waypoints array in ${rel}.`); process.exit(1); }

let region = source.slice(span.start, span.end);
const nameLit = wpName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const lineRe = new RegExp(`^([ \\t]*\\{[^\\n]*name:\\s*"${nameLit}"[^\\n]*lat:[^\\n]*\\},?)$`, "m");
const m = region.match(lineRe);
if (!m) { console.error(`"${wpName}" is not a single-line waypoint entry with a lat field — edit ${rel} by hand.`); process.exit(1); }

let line = m[1]
  .replace(/lat:\s*[^,]+,/, `lat: ${lat.toFixed(6)},`)
  .replace(/lng:\s*[^,]+,/, `lng: ${lng.toFixed(6)},`)
  .replace(/verified:\s*(true|false)/, "verified: true");

// Record provenance next to the coordinate, replacing any earlier one.
const src = JSON.stringify(SOURCE);
if (/\bsource:\s*"/.test(line)) {
  line = line.replace(/\bsource:\s*"(?:[^"\\]|\\.)*"/, `source: ${src}`);
} else {
  // Insert before the closing brace, keeping the separating comma. Getting
  // this wrong produces a file that no longer parses, so it is one explicit
  // substitution rather than a chain of clever ones.
  line = line.replace(/\s*\}(\s*,?)\s*$/, `, source: ${src} }$1`);
}

region = region.replace(lineRe, line);
writeFileSync(file, source.slice(0, span.start) + region + source.slice(span.end));

console.log(`\n${wpName}`);
console.log(`  ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
console.log(`  source: ${SOURCE}`);
console.log(`\nWritten to ${rel}. Now run: node tools/validate.mjs`);
