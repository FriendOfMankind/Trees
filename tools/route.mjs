#!/usr/bin/env node
/* ==========================================================================
   route.mjs — bake driving geometry between a trip's verified waypoints into
   data.js, so the page draws a real road line with no network call at load.

   Run:
     node tools/route.mjs kentucky-2026                 # preview every leg
     node tools/route.mjs maui-2027 --engine osrm       # no API key needed
     node tools/route.mjs kentucky-2026 --write

   Engines:
     ors    OpenRouteService. Free key, 2000/day, honest terms.
            export ORS_API_KEY=…   https://openrouteservice.org/dev/#/signup
     osrm   The public OSRM demo server. No key, driving only. Its terms ask
            you not to build on it — fine for a few authoring calls.

   WHY BAKED, NOT FETCHED: a route requested at page load is a route you don't
   have in a hollow with no bars, which is exactly where you need it. Baking it
   also makes the line reviewable in a diff instead of trusting a live service
   to say the same thing next time.

   Only VERIFIED waypoints are routed. Routing from a guessed coordinate would
   draw a confident line to the wrong place — worse than no line.
   ========================================================================== */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { routeOrs, routeOsrm } from "./lib/sources.mjs";
import { haversineMeters, metersToMiles, decodePolyline } from "./lib/geo.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith("--"));
const flag = (n, d) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1]; };
const has = (n) => argv.includes(`--${n}`);

if (!slug) {
  console.error('usage: node tools/route.mjs <trip-slug> [--engine ors|osrm] [--from "A" --to "B"] [--write]');
  process.exit(2);
}

const ENGINE = flag("engine", process.env.ORS_API_KEY ? "ors" : "osrm");
const FROM = flag("from", null);
const TO = flag("to", null);

/* ---------------- load ---------------- */

const rel = `trips/${slug}/data.js`;
const file = join(ROOT, rel);
const source = readFileSync(file, "utf8");

const sandbox = { window: {}, document: { documentElement: { style: { setProperty() {} } } } };
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(ROOT, "js/themes.js"), "utf8"), sandbox);
vm.runInContext(source, sandbox, { filename: rel });
const D = sandbox.window.TRIP_DATA;

const verified = (D.waypoints || []).filter((w) => w.verified && w.lat != null && w.lng != null);
if (verified.length < 2) {
  console.error(
    `${rel}: needs at least two verified waypoints to draw a leg — it has ${verified.length}.\n` +
    `Run  node tools/geocode.mjs ${slug}  first.`
  );
  process.exit(2);
}

/* ---------------- which legs ---------------- */

const byName = (n) => verified.find((w) => w.name === n);
let legs;

if (FROM || TO) {
  const a = byName(FROM);
  const b = byName(TO);
  if (!a || !b) {
    console.error(`--from/--to must name verified waypoints. Available:\n  ${verified.map((w) => w.name).join("\n  ")}`);
    process.exit(2);
  }
  legs = [[a, b]];
} else {
  // Waypoint array order is itinerary order by convention in this repo.
  legs = verified.slice(0, -1).map((w, i) => [w, verified[i + 1]]);
}

/* ---------------- route ---------------- */

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
const today = new Date().toISOString().slice(0, 10);
const routes = [];

console.log(`\n${slug} — ${legs.length} driving leg(s) via ${ENGINE}\n`);

for (const [a, b] of legs) {
  const straightM = haversineMeters(a, b);
  let r;
  try {
    r = ENGINE === "ors" ? await routeOrs([a, b], "driving-car") : await routeOsrm([a, b]);
  } catch (e) {
    console.log(`✗ ${a.name} → ${b.name}\n    ${e.message}\n`);
    continue;
  }

  const miles = metersToMiles(r.distanceM);
  const mins = Math.round(r.durationS / 60);
  const detour = r.distanceM / straightM;
  const points = decodePolyline(r.geometry).length;

  console.log(`✓ ${a.name} → ${b.name}`);
  console.log(`    ${miles.toFixed(1)} mi · ${Math.floor(mins / 60)}h ${mins % 60}m · ${points} points · ${(r.geometry.length / 1024).toFixed(1)} KB`);

  // Sanity checks. A routing engine given a bad coordinate will happily snap to
  // the nearest road and return a confident, wrong line — these catch the two
  // shapes that failure takes.
  if (r.distanceM < straightM) {
    console.log(`    ! shorter than the straight line (${metersToMiles(straightM).toFixed(1)} mi) — impossible; check the coordinates`);
  } else if (detour > 3) {
    console.log(`    ! ${detour.toFixed(1)}× the straight-line distance — plausible in mountains, but eyeball it before trusting`);
  }
  console.log("");

  routes.push({
    id: `${slugify(a.name)}--${slugify(b.name)}`,
    label: `${a.name} → ${b.name}`,
    mode: "driving",
    days: b.days || a.days || "",
    distanceMi: Number(miles.toFixed(1)),
    durationMin: mins,
    geometry: r.geometry,
    source: r.engine,
    generated: today,
  });
}

if (!routes.length) {
  console.log("No legs routed.");
  process.exit(1);
}

const totalMi = routes.reduce((s, r) => s + r.distanceMi, 0);
const totalMin = routes.reduce((s, r) => s + r.durationMin, 0);
console.log(`Total: ${totalMi.toFixed(0)} mi · ${Math.floor(totalMin / 60)}h ${totalMin % 60}m driving`);
if (D.meta && D.meta.distance) console.log(`data.js currently claims: ${D.meta.distance}`);

/* ---------------- write ---------------- */

const block = renderBlock(routes);

if (!has("write")) {
  console.log(`\nPreview only. Re-run with --write to put this into ${rel}:\n`);
  console.log(block);
  process.exit(0);
}

const START = "  // >>> ROUTES";
const END = "  // <<< ROUTES";
const i = source.indexOf(START);
const j = source.indexOf(END);

if (i === -1 || j === -1) {
  console.log(`\n${rel} has no generated-routes block. Paste this into window.TRIP_DATA:\n`);
  console.log(block);
  console.log(`\n(Keep the >>> and <<< marker lines — they are how --write finds the block next time.)`);
  process.exit(0);
}

writeFileSync(file, source.slice(0, i) + block + source.slice(j + END.length));
console.log(`\nWrote ${routes.length} route(s) into ${rel}. Now run: node tools/validate.mjs`);

function renderBlock(rs) {
  const body = rs.map((r) =>
    `    {\n` +
    `      id: ${JSON.stringify(r.id)},\n` +
    `      label: ${JSON.stringify(r.label)},\n` +
    `      mode: ${JSON.stringify(r.mode)},\n` +
    `      days: ${JSON.stringify(r.days)},\n` +
    `      distanceMi: ${r.distanceMi},\n` +
    (r.durationMin != null ? `      durationMin: ${r.durationMin},\n` : "") +
    `      source: ${JSON.stringify(r.source)},\n` +
    `      generated: ${JSON.stringify(r.generated)},\n` +
    `      geometry: ${JSON.stringify(r.geometry)},\n` +
    `    },`
  ).join("\n");

  return `${START} — generated. Re-run the tool rather than hand-editing;
  // the next --write overwrites everything between these markers.
  routes: [
${body}
  ],
${END}`;
}
