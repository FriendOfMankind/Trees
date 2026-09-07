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
     - a meal in data/meals.js claiming a trip slot that doesn't exist, or a
       meal code on a trip page that no recipe claims
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

const hub = evalScripts(["js/themes.js", "data/profile.js", "data/meals.js", "data/trips.js"]);
const TRIPS = hub.read("TRIPS");
const THEMES = hub.read("THEMES") || {};
const MEALS = hub.read("MEALS");

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


// ---- Camp kitchen ---------------------------------------------------------
// The recipe library is only worth anything if `usedOn` is true. Checked in
// both directions: every claimed slot must exist on the trip, and every meal
// code printed on a trip page must be claimed by a recipe. A dangling code is
// how a "reusable" library quietly becomes a second copy of the same prose.

const MEAL_TYPES = new Set(["breakfast", "lunch", "dinner", "drink"]);
const MEAL_METHODS = new Set(["bag", "boil", "one-pot", "pan", "assemble", "no-cook", "thermos"]);
const MEAL_CLEANUP = new Set(["none", "low", "med", "high"]);
const MEAL_WATER = new Set(["none", "boil-only", "wash-needed"]);
const MEAL_KEYS = { b: "breakfast", l: "lunch", d: "dinner" };

const claimedCodes = new Set();

if (!Array.isArray(MEALS)) {
  fail("data/meals.js did not define a MEALS array");
} else {
  const seenMeal = new Set();
  for (const m of MEALS) {
    const id = m.id || "(no id)";
    if (!m.id) fail(`meals: an entry has no id (name: ${m.name})`);
    if (seenMeal.has(m.id)) fail(`meals: duplicate id "${m.id}"`);
    seenMeal.add(m.id);

    if (!MEAL_TYPES.has(m.type)) fail(`meals/${id}: type "${m.type}" is not one of ${[...MEAL_TYPES].join("/")}`);
    if (!MEAL_METHODS.has(m.method)) fail(`meals/${id}: method "${m.method}" is not one of ${[...MEAL_METHODS].join("/")}`);
    if (!MEAL_CLEANUP.has(m.cleanup)) fail(`meals/${id}: cleanup "${m.cleanup}" is not one of ${[...MEAL_CLEANUP].join("/")}`);
    if (!MEAL_WATER.has(m.water)) fail(`meals/${id}: water "${m.water}" is not one of ${[...MEAL_WATER].join("/")}`);

    // A meal that needs washing up but claims no water is a scheduling bug
    // waiting to happen at a dry campsite.
    if ((m.cleanup === "med" || m.cleanup === "high") && m.water === "none") {
      fail(`meals/${id}: cleanup "${m.cleanup}" with water "none" — a meal that dirties cookware needs somewhere to wash it`);
    }

    if (!Array.isArray(m.usedOn)) { fail(`meals/${id}: usedOn must be an array`); continue; }
    if (!m.usedOn.length && m.type !== "drink") warn(`meals/${id}: not used on any trip — an orphan recipe`);

    for (const u of m.usedOn) {
      if (u.code) claimedCodes.add(`${u.slug}:${u.code}`);
      if (Array.isArray(TRIPS) && !TRIPS.some((t) => t.slug === u.slug)) {
        fail(`meals/${id}: usedOn references unknown trip "${u.slug}"`);
      }
      if (!MEAL_KEYS[u.meal]) fail(`meals/${id}: usedOn meal slot "${u.meal}" must be b, l or d`);
      if (u.meal && MEAL_KEYS[u.meal] && m.type !== "drink" && MEAL_KEYS[u.meal] !== m.type) {
        warn(`meals/${id}: a ${m.type} recipe is filling the "${u.meal}" slot on ${u.slug} day ${u.day}`);
      }
    }
  }
}

// Now walk the trip files and check the claims land on real days.
for (const slug of slugs) {
  const rel = `trips/${slug}/data.js`;
  let D;
  try {
    D = evalScripts(["js/themes.js", rel]).window.TRIP_DATA;
  } catch (e) { continue; }
  if (!D || !Array.isArray(D.days)) continue;

  const dayByNum = new Map(D.days.map((d) => [d.day, d]));

  for (const m of Array.isArray(MEALS) ? MEALS : []) {
    for (const u of m.usedOn || []) {
      if (u.slug !== slug) continue;
      const day = dayByNum.get(u.day);
      if (!day) { fail(`meals/${m.id}: claims ${slug} day ${u.day}, which has no such day`); continue; }
      if (!day.meals || day.meals[u.meal] == null) {
        fail(`meals/${m.id}: claims ${slug} day ${u.day} slot "${u.meal}", which has no meal there`);
        continue;
      }
      const text = String(typeof day.meals[u.meal] === "object" ? day.meals[u.meal].text || "" : day.meals[u.meal]);
      if (u.code && !text.includes(u.code)) {
        fail(`meals/${m.id}: claims code ${u.code} on ${slug} day ${u.day} "${u.meal}", but that slot's text doesn't mention it`);
      }
    }
  }

  // Reverse direction: a code printed on the page that no recipe claims.
  for (const day of D.days) {
    if (!day.meals) continue;
    for (const key of ["b", "l", "d"]) {
      const raw = day.meals[key];
      if (raw == null) continue;
      const text = String(typeof raw === "object" ? raw.text || "" : raw);
      for (const code of text.match(/\b[A-Z]-[BLD]\d+\b/g) || []) {
        if (!claimedCodes.has(`${slug}:${code}`)) {
          warn(`${rel}: day ${day.day} "${key}" prints meal code ${code}, which no recipe in data/meals.js claims`);
        }
      }
    }
  }
}

// ---- Report ---------------------------------------------------------------

for (const w of warnings) console.log(`  warn  ${w}`);
for (const p of problems) console.log(`  FAIL  ${p}`);

console.log(
  `\n${slugs.length} trip page(s), ${TRIPS ? TRIPS.length : 0} registry entr(ies), ` +
  `${MEALS ? MEALS.length : 0} recipe(s) — ` +
  `${problems.length} problem(s), ${warnings.length} warning(s)`
);
process.exit(problems.length ? 1 : 0);
