#!/usr/bin/env node
/* ==========================================================================
   export.mjs — write a trip out in the formats other tools read.

     node tools/export.mjs <slug> [--gpx] [--ics] [--text] [--out DIR]
     node tools/export.mjs --all        regenerate data/trips.json (committed)

   With no format flag you get all three for that trip, written to `exports/`
   (gitignored — these are derived, and a stale committed GPX is a hazard).
   data/trips.json is the exception: it is committed, because the point of it
   is that something outside this repo can read the registry without running
   a browser. CI checks it is current.
   ========================================================================== */

import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, loadHub, loadTrip, tripSlugs, evalScripts } from "./lib/site.mjs";

/* derive.js and exports.js are browser scripts; they reference each other via
   globals, so they have to share one sandbox rather than be imported. */
const box = evalScripts(["js/derive.js", "js/exports.js"]);
const { toGPX, toICS, toPlanText, toRegistryJSON } =
  ["toGPX", "toICS", "toPlanText", "toRegistryJSON"].reduce((o, n) => (o[n] = box.read(n), o), {});

const argv = process.argv.slice(2);
const has = (f) => argv.includes(`--${f}`);
const flag = (f, d) => { const i = argv.indexOf(`--${f}`); return i >= 0 ? argv[i + 1] : d; };
const slug = argv.find((a) => !a.startsWith("--") && argv[argv.indexOf(a) - 1] !== "--out");

const hub = loadHub();
const TRIPS = hub.read("TRIPS") || [];
const BOOKING_WINDOWS = hub.read("BOOKING_WINDOWS") || [];
const PROFILE = hub.read("PROFILE");

/* Deterministic output: a timestamp that moves every run would make the CI
   "generated files are current" check fail on every commit. */
const NOW = new Date("2000-01-01T00:00:00Z");

if (has("all")) {
  const json = toRegistryJSON(TRIPS, BOOKING_WINDOWS, "1970-01-01");
  /* The agenda is relative to today, so it is not committed — only the trips
     and their derived booking dates, which are absolute. */
  delete json.agenda;
  writeFileSync(join(ROOT, "data/trips.json"), JSON.stringify(json, null, 2) + "\n");
  console.log(`data/trips.json — ${json.trips.length} trips`);
  process.exit(0);
}

if (!slug) {
  console.log("Usage:\n  node tools/export.mjs <slug> [--gpx] [--ics] [--text] [--out DIR]");
  console.log("  node tools/export.mjs --all      regenerate data/trips.json");
  console.log(`\nTrips: ${tripSlugs().join(", ")}`);
  process.exit(1);
}

const D = loadTrip(slug);
if (!D) { console.log(`  FAIL  trips/${slug}/data.js did not load`); process.exit(1); }
const trip = TRIPS.find((t) => t.slug === slug) || {};

const outDir = join(ROOT, flag("out", "exports"));
mkdirSync(outDir, { recursive: true });

const wantAll = !has("gpx") && !has("ics") && !has("text");
const written = [];

if (wantAll || has("gpx")) {
  const verified = (D.waypoints || []).filter((w) => w.verified && w.lat != null);
  if (!verified.length) {
    console.log(`  warn  ${slug} has no verified waypoints — a GPX would be an empty file, so none was written.`);
    console.log(`        That is the correct outcome: verify a coordinate before exporting one.`);
  } else {
    write(`${slug}.gpx`, toGPX(D, { now: NOW.toISOString().replace(/\.\d+Z$/, "Z") }));
    console.log(`        ${verified.length} verified waypoint(s) exported, ${(D.waypoints || []).length - verified.length} withheld as unverified`);
  }
}
if (wantAll || has("ics")) {
  if (!trip.start) console.log(`  warn  ${slug} has no start date in the registry — no calendar written`);
  else write(`${slug}.ics`, toICS(D, trip, BOOKING_WINDOWS, { now: NOW }));
}
if (wantAll || has("text")) write(`${slug}-plan.txt`, toPlanText(D, trip, PROFILE));

console.log(`\nWrote ${written.length} file(s) to ${flag("out", "exports")}/`);

function write(name, body) {
  writeFileSync(join(outDir, name), body);
  written.push(name);
  console.log(`  ${name}  (${body.length} bytes)`);
}
