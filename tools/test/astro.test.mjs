/* ==========================================================================
   astro.test.mjs — pin the astronomy.

   Sun and moon times are now load-bearing: they go on a page someone carries
   to a trailhead in the dark, and nothing else in this repo would notice if
   they drifted. Every case below is checked against something external to
   this code — a published almanac time, a phase instant from Meeus' own
   series, a physical invariant — rather than against a previous run of
   itself, which would only prove the bug is stable.

   node --test tools/test/
   ========================================================================== */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  sunTimes, moonPhase, moonRiseSet, fmtLocal, horizonDip, localDayOffset,
} from "../lib/astro.mjs";

const D = (iso) => new Date(iso + "T00:00:00Z");

/** Minutes between a computed time-of-day and an expected "H:MM AM" string. */
function apart(date, minutes, tz, expected) {
  const got = fmtLocal(date, minutes, tz);
  const m = (s) => {
    const x = /(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(s);
    let h = Number(x[1]);
    if (/PM/i.test(x[3]) && h !== 12) h += 12;
    if (/AM/i.test(x[3]) && h === 12) h = 0;
    return h * 60 + Number(x[2]);
  };
  return { got, diff: Math.abs(m(got) - m(expected)) };
}

function assertTime(date, minutes, tz, expected, tol, label) {
  const { got, diff } = apart(date, minutes, tz, expected);
  assert.ok(diff <= tol, `${label}: got ${got}, expected ~${expected} (off by ${diff} min, tolerance ${tol})`);
}

/* ---------------- Sun ----------------
   Reference times are published almanac values for these places and dates.
   Two minutes is the tolerance: below that you are arguing about which metre
   of the campground you are standing on. */

test("sunrise and sunset at mid-latitude", () => {
  const d = D("2026-06-21");
  const t = sunTimes(d, 51.4779, -0.0015, 0);          // Greenwich, solstice
  assertTime(d, t.sunrise, "Europe/London", "4:43 AM", 2, "Greenwich sunrise");
  assertTime(d, t.sunset, "Europe/London", "9:21 PM", 2, "Greenwich sunset");
});

test("high latitude: solstice sun rises and sets, civil twilight never ends", () => {
  const d = D("2026-06-21");
  const t = sunTimes(d, 61.2181, -149.9003, 0);        // Anchorage
  assertTime(d, t.sunrise, "America/Anchorage", "4:20 AM", 2, "Anchorage sunrise");
  assertTime(d, t.sunset, "America/Anchorage", "11:42 PM", 2, "Anchorage sunset");
  assert.equal(t.firstLight, null, "civil dawn should not exist — the sun never gets 6° down");
  assert.equal(t.dark, null, "civil dusk should not exist on the solstice at 61°N");
});

test("polar night returns null rather than a plausible-looking time", () => {
  const t = sunTimes(D("2026-12-21"), 78.22, 15.65, 0);  // Longyearbyen
  assert.equal(t.sunrise, null);
  assert.equal(t.sunset, null);
});

test("equator at equinox: roughly twelve hours, symmetric about local noon", () => {
  const t = sunTimes(D("2026-03-20"), 0, 0, 0);
  const day = t.sunset - t.sunrise;
  assert.ok(Math.abs(day - 720) < 12, `day length ${day} min, expected ~720`);
  assert.ok(Math.abs((t.noon - t.sunrise) - (t.sunset - t.noon)) < 1, "noon should sit midway");
});

test("elevation moves sunrise earlier and sunset later, by the same amount", () => {
  const d = D("2027-05-18");
  const sea = sunTimes(d, 20.71, -156.25, 0);
  const summit = sunTimes(d, 20.71, -156.25, 3055);     // Haleakalā
  const earlier = sea.sunrise - summit.sunrise;
  const later = summit.sunset - sea.sunset;
  assert.ok(earlier > 5 && earlier < 10, `sunrise should move ~7 min earlier, moved ${earlier.toFixed(1)}`);
  assert.ok(Math.abs(earlier - later) < 0.5, "the shift must be symmetric");
});

test("civil twilight is a fixed solar depression and does NOT move with elevation", () => {
  const d = D("2027-05-18");
  const sea = sunTimes(d, 20.71, -156.25, 0);
  const summit = sunTimes(d, 20.71, -156.25, 3055);
  assert.equal(sea.firstLight, summit.firstLight);
  assert.equal(sea.dark, summit.dark);
});

test("horizon dip matches the standard 1.76·√h arcminutes", () => {
  assert.equal(horizonDip(0), 0);
  assert.ok(Math.abs(horizonDip(3055) - 1.621) < 0.005);
});

/* ---------------- Moon ----------------
   New and full instants come from Meeus ch.49's phase series, which is an
   independent computation from the ephemeris being tested. */

test("illumination is 0% at new moon and 100% at full", () => {
  assert.ok(moonPhase(new Date("2027-05-06T11:00:00Z")).percent < 0.5, "new moon");
  assert.ok(moonPhase(new Date("2027-05-20T11:00:00Z")).percent > 99.5, "full moon");
  assert.ok(moonPhase(new Date("2026-05-01T17:23:00Z")).percent > 99.5, "full moon, another cycle");
});

test("illumination is ~100% during a known total lunar eclipse", () => {
  // Greatest eclipse, 21 Jan 2000 — the moon is by definition full.
  assert.ok(moonPhase(new Date("2000-01-21T04:44:00Z")).percent > 99.5);
});

test("phase names track the cycle in order", () => {
  const at = (iso) => moonPhase(new Date(iso)).name;
  assert.equal(at("2027-05-06T11:00:00Z"), "New moon");
  assert.equal(at("2027-05-20T11:00:00Z"), "Full moon");
  assert.ok(moonPhase(new Date("2027-05-10T00:00:00Z")).waxing, "should be waxing four days after new");
  assert.ok(!moonPhase(new Date("2027-05-24T00:00:00Z")).waxing, "should be waning four days after full");
});

test("moonset near full moon lands close to sunrise", () => {
  // A full moon is opposite the sun, so it sets as the sun rises.
  const d = D("2027-05-20");
  const lat = 20.808, lng = -156.617;
  const { set } = moonRiseSet(d, lat, lng, 0);
  const { sunrise } = sunTimes(d, lat, lng, 0);
  assert.ok(set !== null, "the moon should set on this day");
  assert.ok(Math.abs(set - sunrise) < 60, `moonset ${set} vs sunrise ${sunrise} — should be within an hour at full`);
});

test("elevation delays moonset, same as it delays sunset", () => {
  const d = D("2027-05-19");
  const sea = moonRiseSet(d, 20.715, -156.25, 0);
  const summit = moonRiseSet(d, 20.715, -156.25, 3055);
  assert.ok(summit.set > sea.set, "a summit sees the moon set later");
  assert.ok(summit.set - sea.set > 3, "and by several minutes, not seconds");
});

test("a day with no moonrise is reported as null, not as midnight", () => {
  /* The moon rises ~50 min later each day, so roughly monthly a calendar day
     contains no rise at all. Over one lunation there must be at least one. */
  const misses = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(Date.UTC(2027, 4, 1) + i * 86400000);
    const { rise } = moonRiseSet(d, 41.45, -81.9, 0);   // Cleveland
    if (rise === null) misses.push(i);
    if (rise !== null) assert.ok(rise > 0 && rise < 1440, `rise ${rise} out of range on day ${i}`);
  }
  assert.ok(misses.length >= 1, "expected at least one riseless day in a lunation");
});

/* ---------------- Time zones ---------------- */

test("a time after local midnight is reported against the right calendar day", () => {
  const d = D("2027-05-19");
  // 13:00 UTC is 03:00 HST the same day; 02:00 UTC is 16:00 HST the day BEFORE.
  assert.equal(localDayOffset(d, 13 * 60, "Pacific/Honolulu"), 0);
  assert.equal(localDayOffset(d, 2 * 60, "Pacific/Honolulu"), -1);
});

test("formatting never leaks the runner's local timezone", () => {
  const d = D("2027-05-19");
  assert.equal(fmtLocal(d, 0, "UTC"), "12:00 AM");
  assert.equal(fmtLocal(d, 0, "Pacific/Honolulu"), "2:00 PM");   // previous day, 14:00 HST
  assert.equal(fmtLocal(d, null, "UTC"), null);
});
