/* ==========================================================================
   coordcheck.test.mjs — the coordinate sanity checks.

   These matter more than most tests here. Non-negotiable #1 is "never invent
   a coordinate", and the checks in js/coordcheck.js are what stands between a
   fat-fingered paste and a pin 200 m off a locked gate. A check that silently
   stops firing is worse than no check, because the page still says it ran.

   Loaded the same way the site's other browser files are read from Node — a
   vm sandbox — so the file mapbench.html ships is the file under test.
   ========================================================================== */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";
import { ROOT } from "../lib/site.mjs";

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(readFileSync(join(ROOT, "js/coordcheck.js"), "utf8"), sandbox, { filename: "js/coordcheck.js" });
const { coordChecks, coordPrecisionOf, coordHaversineKm } = sandbox;

const codes = (r) => r.map((x) => x.code);
const RRG = [37.8, -83.65]; // Red River Gorge, near enough for a centroid

test("a good coordinate passes clean", () => {
  const r = coordChecks({ name: "Auxier Ridge Trailhead", lat: 37.82823, lng: -83.677587, tripCoords: RRG, others: [] });
  // Length, not deepEqual: the array comes from the vm sandbox, so it has a
  // different Array prototype and deepEqual rejects it even when it is empty.
  assert.equal(r.length, 0, `expected no findings, got ${JSON.stringify(r)}`);
});

test("swapped lat/lng is stopped, not warned", () => {
  // Auxier Ridge with the pair reversed: -83.677587, 37.82823
  const r = coordChecks({ name: "x", lat: -83.677587, lng: 37.82823, tripCoords: RRG, others: [] });
  assert.ok(codes(r).includes("swapped"), `expected a swap stop, got ${JSON.stringify(codes(r))}`);
  assert.equal(r.find((x) => x.code === "swapped").level, "stop");
});

test("a positive longitude in North America is stopped", () => {
  const r = coordChecks({ name: "x", lat: 37.82823, lng: 83.677587, tripCoords: RRG, others: [] });
  assert.ok(codes(r).includes("sign"));
  assert.equal(r.find((x) => x.code === "sign").level, "stop");
});

test("a positive longitude is fine outside the Americas", () => {
  const r = coordChecks({ name: "x", lat: 46.5, lng: 11.35, country: "Italy", others: [] });
  assert.ok(!codes(r).includes("sign"));
  assert.ok(!codes(r).includes("swapped"));
});

test("coarse precision warns but does not block", () => {
  const r = coordChecks({ name: "x", lat: 37.8, lng: -83.6, tripCoords: RRG, others: [] });
  const p = r.find((x) => x.code === "precision");
  assert.ok(p, "expected a precision warning");
  assert.equal(p.level, "warn");
  assert.match(p.msg, /11 km/);
});

test("six decimal places does not warn", () => {
  const r = coordChecks({ name: "x", lat: 37.828230, lng: -83.677587, tripCoords: RRG, others: [] });
  assert.ok(!codes(r).includes("precision"));
});

test("a pin in the wrong state warns, a pin in the wrong country stops", () => {
  // ~400 km away: warn.
  const warnOnly = coordChecks({ name: "x", lat: 41.5, lng: -81.7, tripCoords: RRG, others: [] }); // Cleveland
  const w = warnOnly.find((x) => x.code === "far");
  assert.ok(w && w.level === "warn", `expected a far warn, got ${JSON.stringify(warnOnly)}`);

  // ~3,000 km away: stop.
  const stop = coordChecks({ name: "x", lat: 36.5, lng: -117.1, tripCoords: RRG, others: [] }); // Death Valley
  const s = stop.find((x) => x.code === "far");
  assert.ok(s && s.level === "stop");
});

test("an identical coordinate to another waypoint is stopped", () => {
  const others = [{ name: "Gray's Arch", lat: 37.807934, lng: -83.657265, days: "3" }];
  const r = coordChecks({ name: "x", lat: 37.807934, lng: -83.657265, tripCoords: RRG, others });
  assert.ok(codes(r).includes("duplicate"));
  assert.equal(r.find((x) => x.code === "duplicate").level, "stop");
});

test("two stops far apart on the same day warn; on different days they don't", () => {
  const far = { name: "Twin Arches", lat: 36.5417, lng: -84.7357, days: "2" };
  const sameDay = coordChecks({ name: "x", lat: 37.82823, lng: -83.677587, days: "2", tripCoords: RRG, others: [far] });
  assert.ok(codes(sameDay).includes("split"));

  const otherDay = coordChecks({ name: "x", lat: 37.82823, lng: -83.677587, days: "5", tripCoords: RRG, others: [far] });
  assert.ok(!codes(otherDay).includes("split"));
});

test("garbage input is rejected before anything else runs", () => {
  assert.equal(coordChecks({ name: "x", lat: NaN, lng: -83.6, others: [] })[0].code, "nan");
  assert.equal(coordChecks({ name: "x", lat: 200, lng: -83.6, others: [] })[0].code, "range");
});

test("precisionOf counts decimals as written", () => {
  assert.equal(coordPrecisionOf(37), 0);
  assert.equal(coordPrecisionOf(37.8), 1);
  assert.equal(coordPrecisionOf(37.828230), 5); // trailing zero is not retained by Number
});

test("haversine agrees with a known distance", () => {
  // Cleveland to Red River Gorge. 3.70° of latitude is ~411 km, and 1.96° of
  // longitude at 39.6°N is ~168 km, so the great circle is ~444 km.
  const km = coordHaversineKm([41.4993, -81.6944], [37.8, -83.65]);
  assert.ok(km > 435 && km < 455, `got ${km}`);
});

/* ---- Replacing a coordinate that already has a source -------------------
   Added after seven already-verified Kentucky pins were re-placed from Google
   Maps in a single pass. Six were harmless; one disagreed by 2.7 km and would
   have silently overwritten a Recreation.gov facility ID. */

test("a near-identical re-placement reads as corroboration, not a correction", () => {
  const r = coordChecks({
    name: "Honey Creek Trailhead", lat: 36.421256, lng: -84.651842, tripCoords: RRG, others: [],
    existing: { lat: 36.421268, lng: -84.651813, verified: true, source: "OSM node 3373114451" },
  });
  const c = r.find((x) => x.code === "corroborates");
  assert.ok(c, `expected corroboration, got ${JSON.stringify(codes(r))}`);
  assert.equal(c.level, "warn");
  assert.match(c.msg, /corroboration/);
});

test("a moderate re-placement needs an explicit confirm and names the source it would lose", () => {
  const r = coordChecks({
    name: "Koomer Ridge Campground", lat: 37.781011, lng: -83.636170, tripCoords: RRG, others: [],
    existing: { lat: 37.784032, lng: -83.632634, verified: true, source: "Recreation.gov facility 10311270" },
  });
  const c = r.find((x) => x.code === "replace");
  assert.ok(c, `expected a replace confirm, got ${JSON.stringify(codes(r))}`);
  assert.equal(c.level, "confirm");
  assert.match(c.msg, /Recreation\.gov facility 10311270/);
});

test("a far re-placement is flagged as two different places", () => {
  const r = coordChecks({
    name: "Blue Heron Mining Community", lat: 36.671249, lng: -84.547903,
    tripCoords: [36.5, -84.6], others: [],
    existing: { lat: 36.678056, lng: -84.518889, verified: true, source: "Recreation.gov facility 232505" },
  });
  const c = r.find((x) => x.code === "replace-far");
  assert.ok(c, `expected replace-far, got ${JSON.stringify(codes(r))}`);
  assert.equal(c.level, "confirm");
  assert.match(c.msg, /2696 m|about a different place/);
});

test("no existing coordinate means no replace finding at all", () => {
  const r = coordChecks({ name: "x", lat: 36.476828, lng: -84.667818, tripCoords: [36.5, -84.6], others: [] });
  assert.ok(!codes(r).some((c) => c.startsWith("replace") || c === "corroborates"));
});
