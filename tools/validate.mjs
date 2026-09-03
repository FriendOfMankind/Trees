#!/usr/bin/env node
/* ==========================================================================
   validate.mjs — sanity-check the registry and every trip data file.
   Run: node tools/validate.mjs

   This is not a linter. It catches the four things that actually break the
   site or, worse, quietly ship a wrong fact:
     - a registry entry pointing at a page that doesn't exist
     - a slug mismatch between the registry and the trip's own data
     - a waypoint marked verified:true with no coordinates (or vice versa)
     - a coordinate outside the possible range
   ========================================================================== */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];
const warnings = [];

function fail(msg) { problems.push(msg); }
function warn(msg) { warnings.push(msg); }

/** Run browser-ish script files in a sandbox.
    `const` declarations live in the context's lexical scope rather than on the
    sandbox object, so values are read back by evaluating the name. */
function evalScripts(files) {
  const sandbox = { window: {}, document: { documentElement: { style: { setProperty() {} } } } };
  vm.createContext(sandbox);
  for (const f of files) {
    vm.runInContext(readFileSync(join(ROOT, f), "utf8"), sandbox, { filename: f });
  }
  sandbox.read = (name) =>
    vm.runInContext(`typeof ${name} !== "undefined" ? ${name} : undefined`, sandbox);
  return sandbox;
}

// ---- Registry -------------------------------------------------------------

const hub = evalScripts(["js/themes.js", "data/profile.js", "data/trips.js"]);
const TRIPS = hub.read("TRIPS");
const THEMES = hub.read("THEMES") || {};

if (!Array.isArray(TRIPS)) {
  fail("data/trips.js did not define a TRIPS array");
} else {
  const seen = new Set();
  const validStatus = new Set(["planned", "outline", "wishlist", "done"]);

  for (const t of TRIPS) {
    const id = t.slug || "(no slug)";
    if (!t.slug) fail(`registry: an entry has no slug (title: ${t.title})`);
    if (seen.has(t.slug)) fail(`registry: duplicate slug "${t.slug}"`);
    seen.add(t.slug);

    if (!validStatus.has(t.status)) fail(`${id}: status "${t.status}" is not one of planned/outline/wishlist/done`);
    if (t.theme && !THEMES[t.theme]) fail(`${id}: unknown theme "${t.theme}" (see js/themes.js)`);

    if (t.coords) {
      const [lat, lng] = t.coords;
      if (typeof lat !== "number" || typeof lng !== "number") fail(`${id}: coords must be two numbers`);
      else if (lat < -90 || lat > 90 || lng < -180 || lng > 180) fail(`${id}: coords out of range`);
    }

    if (t.page) {
      if (!existsSync(join(ROOT, t.page, "index.html"))) fail(`${id}: page "${t.page}" has no index.html`);
      if (!existsSync(join(ROOT, t.page, "data.js"))) fail(`${id}: page "${t.page}" has no data.js`);
    } else if (t.status === "planned" || t.status === "outline") {
      fail(`${id}: status "${t.status}" but no page — planned and outline trips need a page`);
    }

    if (!t.next) warn(`${id}: no "next" action set — the hub card will just say "Open the plan"`);
  }
}

// ---- Trip data files ------------------------------------------------------

const tripsDir = join(ROOT, "trips");
const slugs = existsSync(tripsDir)
  ? readdirSync(tripsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
  : [];

for (const slug of slugs) {
  const rel = `trips/${slug}/data.js`;
  let box;
  try {
    box = evalScripts(["js/themes.js", rel]);
  } catch (e) {
    fail(`${rel}: failed to evaluate — ${e.message}`);
    continue;
  }

  const D = box.window.TRIP_DATA;
  if (!D) { fail(`${rel}: does not set window.TRIP_DATA`); continue; }
  if (!D.meta) { fail(`${rel}: no meta block`); continue; }

  if (D.meta.slug !== slug) fail(`${rel}: meta.slug "${D.meta.slug}" does not match folder "${slug}"`);
  if (Array.isArray(TRIPS) && !TRIPS.some((t) => t.slug === slug)) fail(`${rel}: not listed in data/trips.js — it won't appear on the hub`);
  if (D.meta.theme && !THEMES[D.meta.theme] && typeof D.meta.theme !== "object") {
    fail(`${rel}: unknown theme "${D.meta.theme}"`);
  }
  if (!Array.isArray(D.days) || !D.days.length) warn(`${rel}: no days — the itinerary tab will be empty`);

  for (const w of D.waypoints || []) {
    const hasCoords = w.lat != null && w.lng != null;
    if (w.verified && !hasCoords) fail(`${rel}: "${w.name}" is verified:true but has no coordinates`);
    if (!w.verified && hasCoords) warn(`${rel}: "${w.name}" has coordinates but verified:false — confirm it and flip the flag, or drop the numbers`);
    if (hasCoords && (Math.abs(w.lat) > 90 || Math.abs(w.lng) > 180)) fail(`${rel}: "${w.name}" coordinates out of range`);
  }

  const b = D.budget;
  if (b && b.rows && b.subtotal != null) {
    const sum = b.rows.reduce((s, r) => s + (Number(r.cost) || 0), 0);
    if (sum !== b.subtotal) fail(`${rel}: budget subtotal is ${b.subtotal} but the line items add to ${sum}`);
    if (b.buffer != null && b.total != null && b.subtotal + b.buffer !== b.total) {
      fail(`${rel}: budget subtotal + buffer (${b.subtotal + b.buffer}) does not equal total (${b.total})`);
    }
  }
}

// ---- Report ---------------------------------------------------------------

for (const w of warnings) console.log(`  warn  ${w}`);
for (const p of problems) console.log(`  FAIL  ${p}`);

console.log(
  `\n${slugs.length} trip page(s), ${TRIPS ? TRIPS.length : 0} registry entr(ies) — ` +
  `${problems.length} problem(s), ${warnings.length} warning(s)`
);
process.exit(problems.length ? 1 : 0);
