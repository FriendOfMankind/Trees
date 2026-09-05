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
     - route geometry that doesn't decode, or that wanders off the trip
   ========================================================================== */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { decodePolyline, haversineMeters } from "./lib/geo.mjs";

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

  /* ---- Baked route geometry ----
     A drawn line is more persuasive than a pin: it looks surveyed even when
     it isn't. So the bar is provenance plus plausibility — every line says
     which tool and service produced it, and lands where the trip is. */

  const verifiedPts = (D.waypoints || [])
    .filter((w) => w.verified && w.lat != null && w.lng != null)
    .map((w) => ({ lat: w.lat, lng: w.lng }));

  const geoIds = new Set();

  for (const [field, items] of [["routes", D.routes], ["trails", D.trails]]) {
    if (items == null) continue;
    if (!Array.isArray(items)) { fail(`${rel}: ${field} must be an array`); continue; }

    for (const r of items) {
      const id = r.id || r.label || "(unnamed)";

      if (!r.id) fail(`${rel}: ${field}: an entry has no id`);
      else if (geoIds.has(r.id)) fail(`${rel}: duplicate route/trail id "${r.id}"`);
      geoIds.add(r.id);

      if (!["driving", "hiking"].includes(r.mode)) {
        fail(`${rel}: ${id}: mode "${r.mode}" is not "driving" or "hiking"`);
      }

      // Provenance is not paperwork. A line you cannot trace back to a service
      // and a date is a line nobody can re-check when a road closes.
      if (!r.source) fail(`${rel}: ${id}: no source — say which tool and service drew this`);
      if (!r.generated) warn(`${rel}: ${id}: no generated date — you won't know when it goes stale`);

      const segs = (Array.isArray(r.geometry) ? r.geometry : [r.geometry]).filter(Boolean);
      if (!segs.length) { fail(`${rel}: ${id}: no geometry`); continue; }

      let points = [];
      let bad = false;
      for (const seg of segs) {
        if (typeof seg !== "string") { fail(`${rel}: ${id}: geometry segments must be encoded polyline strings`); bad = true; break; }
        let decoded;
        try {
          decoded = decodePolyline(seg);
        } catch (e) {
          fail(`${rel}: ${id}: geometry failed to decode — ${e.message}`);
          bad = true;
          break;
        }
        if (decoded.length < 2) { fail(`${rel}: ${id}: a geometry segment has fewer than 2 points`); bad = true; break; }
        points.push(...decoded);
      }
      if (bad) continue;

      const outOfRange = points.find(([lat, lng]) => Math.abs(lat) > 90 || Math.abs(lng) > 180);
      if (outOfRange) {
        fail(`${rel}: ${id}: decoded geometry leaves the planet at ${outOfRange[0]}, ${outOfRange[1]}`);
        continue;
      }

      // Does the line land where the trip is? A routing engine handed a bad
      // coordinate returns a confident route to the wrong place, and that is
      // exactly the failure a map is worst at showing you.
      if (verifiedPts.length) {
        const far = points.find((p) =>
          verifiedPts.every((w) => haversineMeters(w, { lat: p[0], lng: p[1] }) > 200000));
        if (far) {
          fail(`${rel}: ${id}: geometry passes ${far[0].toFixed(3)}, ${far[1].toFixed(3)} — over 200 km from every verified waypoint. Wrong polyline, or wrong coordinates fed to the router.`);
        }
      }

      if (r.distanceMi != null && !(r.distanceMi > 0)) {
        fail(`${rel}: ${id}: distanceMi is ${r.distanceMi}`);
      }
    }
  }

  if ((D.routes || D.trails) && !verifiedPts.length) {
    warn(`${rel}: has route geometry but no verified waypoints — nothing anchors those lines to a real place`);
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
