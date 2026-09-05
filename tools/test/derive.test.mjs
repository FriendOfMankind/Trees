/* ==========================================================================
   derive.test.mjs — pin the booking arithmetic and the agenda.

   The point of deriving booking dates was that a typed one drifts. That only
   holds if the derivation is right, and it is exactly the kind of code where
   an off-by-one is invisible until a campground is gone.
   ========================================================================== */

import { test } from "node:test";
import assert from "node:assert/strict";
import { evalScripts } from "../lib/site.mjs";

/* derive.js is a browser script, so it runs in a vm sandbox and everything it
   returns carries that realm's prototypes. `assert.deepStrictEqual` compares
   prototypes and would reject a structurally identical array, so anything
   crossing the boundary gets flattened through JSON first. */
const plain = (v) => JSON.parse(JSON.stringify(v));

const box = evalScripts(["js/derive.js"]);
const bookingDeadlines = box.read("bookingDeadlines");
const agenda = box.read("agenda");
const shiftMonthsISO = box.read("shiftMonthsISO");
const shiftISO = box.read("shiftISO");

const WINDOWS = [
  { system: "recreation.gov", leadMonths: 6, what: "recreation.gov", when: "6-month rolling", note: "goes in seconds" },
  { system: "state-park", leadMonths: null, what: "State park", when: "30 days to 1 year", note: "" },
  { system: "baxter-sp", leadMonths: 4, what: "Baxter", when: "Rolling 4 months", note: "" },
];

/* ---------------- Calendar arithmetic ---------------- */

test("months are calendar months, not 183 days", () => {
  assert.equal(shiftMonthsISO("2027-05-17", -6), "2026-11-17");
  assert.equal(shiftMonthsISO("2026-09-22", -6), "2026-03-22");
  assert.equal(shiftMonthsISO("2027-01-10", -6), "2026-07-10");   // across a year
  assert.equal(shiftMonthsISO("2026-07-04", 6), "2027-01-04");
});

test("a day number that doesn't exist in the target month clamps to its end", () => {
  assert.equal(shiftMonthsISO("2027-03-31", -1), "2027-02-28");
  assert.equal(shiftMonthsISO("2028-03-31", -1), "2028-02-29");   // leap year
  assert.equal(shiftMonthsISO("2027-05-31", -6), "2026-11-30");
});

test("day shifts cross month and year boundaries in UTC", () => {
  assert.equal(shiftISO("2027-01-01", -1), "2026-12-31");
  assert.equal(shiftISO("2026-02-28", 1), "2026-03-01");
  assert.equal(shiftISO("not-a-date", 1), null);
});

/* ---------------- Booking windows ---------------- */

test("the window is counted back from the night booked, not the trip start", () => {
  const trip = { slug: "t", start: "2027-05-13", booking: [
    { system: "recreation.gov", what: "Hosmer", target: "2027-05-17" },
  ]};
  const [d] = bookingDeadlines(trip, WINDOWS);
  assert.equal(d.known, true);
  assert.equal(d.opensISO, "2026-11-17");
  assert.match(d.basis, /6 months before 2027-05-17/);
});

test("without a target it falls back to the trip start", () => {
  const trip = { slug: "t", start: "2027-05-13", booking: { system: "recreation.gov" } };
  const [d] = bookingDeadlines(trip, WINDOWS);
  assert.equal(d.opensISO, "2026-11-13");
});

test("a system with no lead time says so instead of producing a date", () => {
  const trip = { slug: "t", start: "2027-05-13", booking: [
    { system: "state-park", what: "Waiʻānapanapa", target: "2027-05-14" },
  ]};
  const [d] = bookingDeadlines(trip, WINDOWS);
  assert.equal(d.known, false);
  assert.equal(d.opensISO, undefined);
  assert.match(d.why, /varies/);
});

test("a trip with no start and no target is unknown, not zero", () => {
  const [d] = bookingDeadlines({ slug: "t", booking: { system: "recreation.gov" } }, WINDOWS);
  assert.equal(d.known, false);
  assert.match(d.why, /no locked date/);
});

test("an explicit opens date wins over any derivation", () => {
  const [d] = bookingDeadlines(
    { slug: "t", start: "2027-05-13", booking: { system: "recreation.gov", opens: "2026-10-01" } }, WINDOWS);
  assert.equal(d.opensISO, "2026-10-01");
  assert.equal(d.source, "explicit");
});

test("a per-booking lead overrides the system default", () => {
  const [d] = bookingDeadlines(
    { slug: "t", start: "2027-05-13", booking: { system: "recreation.gov", leadMonths: 4 } }, WINDOWS);
  assert.equal(d.opensISO, "2027-01-13");
});

test("a single booking object and an array of one behave identically", () => {
  const a = bookingDeadlines({ slug: "t", start: "2027-05-13", booking: { system: "baxter-sp" } }, WINDOWS);
  const b = bookingDeadlines({ slug: "t", start: "2027-05-13", booking: [{ system: "baxter-sp" }] }, WINDOWS);
  assert.deepEqual(plain(a), plain(b));
  assert.equal(a[0].opensISO, "2027-01-13");
});

test("no booking declaration produces no deadlines", () => {
  assert.deepEqual(plain(bookingDeadlines({ slug: "t", start: "2027-05-13" }, WINDOWS)), []);
});

/* ---------------- The agenda ---------------- */

const TRIPS = [
  { slug: "soon", title: "Soon", status: "planned", start: "2026-10-15", next: "call the campground",
    booking: [{ system: "recreation.gov", what: "Booked already", target: "2026-10-16", booked: true },
              { system: "recreation.gov", what: "Still open", target: "2027-04-01" }] },
  { slug: "dream", title: "Dream", status: "wishlist", start: null, next: "decide if this is real" },
  { slug: "past", title: "Past", status: "done", start: "2025-06-01", next: "write the retro" },
  { slug: "vague", title: "Vague", status: "outline", start: "2027-08-01", next: "pick dates",
    booking: [{ system: "state-park", what: "Some park" }] },
];

test("a booked window is not a deadline", () => {
  const items = agenda(TRIPS, WINDOWS, "2026-09-05");
  assert.equal(items.filter((i) => i.headline.includes("Booked already")).length, 0);
  assert.equal(items.filter((i) => i.headline.includes("Still open")).length, 1);
});

test("finished trips are left out entirely", () => {
  assert.equal(agenda(TRIPS, WINDOWS, "2026-09-05").filter((i) => i.slug === "past").length, 0);
});

test("a wishlist next action is not an agenda item; a live one is", () => {
  const items = agenda(TRIPS, WINDOWS, "2026-09-05");
  assert.equal(items.filter((i) => i.slug === "dream").length, 0);
  assert.ok(items.some((i) => i.kind === "next" && i.slug === "soon"));
  assert.ok(items.some((i) => i.kind === "next" && i.slug === "vague"), "outline counts as live");
});

test("dated items come first, in date order; undated ones trail", () => {
  const items = agenda(TRIPS, WINDOWS, "2026-09-05");
  const dated = plain(items.filter((i) => i.dateISO).map((i) => i.dateISO));
  assert.deepEqual(dated, [...dated].sort(), "dated items must be in ascending order");
  const firstUndated = items.findIndex((i) => !i.dateISO);
  assert.ok(items.slice(firstUndated).every((i) => !i.dateISO), "no dated item may follow an undated one");
});

test("days-until is computed against the injected today, not the clock", () => {
  const items = agenda(TRIPS, WINDOWS, "2026-09-05");
  const dep = items.find((i) => i.kind === "departure" && i.slug === "soon");
  assert.equal(dep.dateISO, "2026-10-15");
  assert.equal(dep.days, 40);
  const later = agenda(TRIPS, WINDOWS, "2026-10-15").find((i) => i.kind === "departure" && i.slug === "soon");
  assert.equal(later.days, 0, "the day itself is zero days out");
});

test("an underivable window still appears, flagged rather than dropped", () => {
  const items = agenda(TRIPS, WINDOWS, "2026-09-05");
  const unknown = items.find((i) => i.kind === "unknown-window");
  assert.ok(unknown, "an unknown window must be visible; silently dropping it is the failure mode");
  assert.equal(unknown.dateISO, null);
  assert.match(unknown.headline, /window unknown/);
});
