import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { renderBlock, spliceBlock, arraySpan } from "../lib/blocks.mjs";
import { encodePolyline, decodePolyline } from "../lib/geo.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

const leg = (id, pts) => ({
  id, label: `${id} leg`, mode: "driving", days: "2",
  distanceMi: 21.4, durationMin: 47, source: "osrm/driving", generated: "2026-09-05",
  geometry: encodePolyline(pts),
});
const PTS = [{ lat: 37.784, lng: -83.632 }, { lat: 37.79, lng: -83.64 }, { lat: 37.8, lng: -83.65 }];

/** Evaluate a trip file the way the site and validator do. */
function evalTrip(text) {
  const sandbox = { window: {}, document: { documentElement: { style: { setProperty() {} } } } };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(join(ROOT, "js/themes.js"), "utf8"), sandbox);
  vm.runInContext(text, sandbox, { filename: "trip.js" });
  return sandbox.window.TRIP_DATA;
}

test("finds the waypoints array in both file shapes", () => {
  for (const slug of ["kentucky-2026", "maui-2027"]) {
    const t = readFileSync(join(ROOT, `trips/${slug}/data.js`), "utf8");
    const span = arraySpan(t, "waypoints");
    assert.ok(span, `${slug}: no waypoints span`);
    assert.ok(t.slice(span.start, span.end).includes("name:"), `${slug}: span holds no entries`);
  }
});

test("inserting into a real trip file produces something that still parses", () => {
  const src = readFileSync(join(ROOT, "trips/kentucky-2026/data.js"), "utf8");
  const block = renderBlock("ROUTES", "routes", [leg("a--b", PTS), leg("b--c", PTS)]);
  const out = spliceBlock(src, "ROUTES", block);
  assert.equal(out.how, "inserted");

  const D = evalTrip(out.text);
  assert.equal(D.routes.length, 2);
  assert.equal(D.routes[0].id, "a--b");
  assert.equal(D.routes[0].distanceMi, 21.4);
  // The geometry must survive the round trip through the file verbatim.
  assert.deepEqual(decodePolyline(D.routes[0].geometry).map((p) => p.map((n) => +n.toFixed(3))),
                   PTS.map((p) => [+p.lat.toFixed(3), +p.lng.toFixed(3)]));
  // And everything else in the file must be untouched.
  assert.equal(D.waypoints.length, 7);
  assert.ok(D.days.length > 0);
});

test("re-running replaces the block instead of stacking a second one", () => {
  const src = readFileSync(join(ROOT, "trips/kentucky-2026/data.js"), "utf8");
  const first = spliceBlock(src, "ROUTES", renderBlock("ROUTES", "routes", [leg("a--b", PTS)])).text;
  const second = spliceBlock(first, "ROUTES", renderBlock("ROUTES", "routes", [leg("x--y", PTS), leg("y--z", PTS)]));
  assert.equal(second.how, "replaced");

  const D = evalTrip(second.text);
  assert.equal(D.routes.length, 2, "old block was not replaced");
  assert.equal(D.routes[0].id, "x--y");
  assert.equal((second.text.match(/>>> ROUTES/g) || []).length, 1, "marker duplicated");
});

test("routes and trails coexist without clobbering each other", () => {
  const src = readFileSync(join(ROOT, "trips/kentucky-2026/data.js"), "utf8");
  const withRoutes = spliceBlock(src, "ROUTES", renderBlock("ROUTES", "routes", [leg("a--b", PTS)])).text;
  const trail = { id: "t1", label: "A Trail", mode: "hiking", days: "3", distanceMi: 4.2,
                  source: "osm/way 1,2", generated: "2026-09-05",
                  geometry: [encodePolyline(PTS), encodePolyline(PTS)] };
  const both = spliceBlock(withRoutes, "TRAILS", renderBlock("TRAILS", "trails", [trail])).text;

  const D = evalTrip(both);
  assert.equal(D.routes.length, 1);
  assert.equal(D.trails.length, 1);
  assert.equal(D.trails[0].geometry.length, 2, "multi-segment trail geometry lost");
});
