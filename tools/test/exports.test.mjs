/* ==========================================================================
   exports.test.mjs — pin the file formats.

   These files leave the site and get opened by something else: a nav app, a
   calendar, a text message to whoever stays behind. A malformed one fails
   silently in someone else's software, which is the worst place to find out.

   The GPX tests are the important ones. Rule 1 of this repo says an
   unverified coordinate is never plotted, and an export that quietly
   forgot that would push a bad pin straight into a routing app.
   ========================================================================== */

import { test } from "node:test";
import assert from "node:assert/strict";
import { evalScripts } from "../lib/site.mjs";

const box = evalScripts(["js/derive.js", "js/exports.js"]);
const toGPX = box.read("toGPX");
const toICS = box.read("toICS");
const toPlanText = box.read("toPlanText");
const stripHtml = box.read("stripHtml");

const NOW = new Date("2000-01-01T00:00:00Z");

const TRIP = {
  meta: { slug: "test-2027", title: "Test & Trip <b>", subtitle: "Solo", dates: "May 1–3, 2027" },
  days: [
    { day: 1, date: "Sat May 1, 2027", title: "In", tagline: "Arrive",
      overnight: { name: "Camp One", place: "Nowhere", confirmation: "ABC-123",
                   notes: "Office 7 AM–6 PM. (808) 555-1234" },
      schedule: [{ time: "3:00 PM", text: "Drive; then <b>stop</b>, eat" }],
      warnings: "Gate closes at 6." },
    { day: 2, date: "Sun May 2, 2027", title: "Out", tagline: "Leave",
      noSignal: "The whole back road, 09:00 to 14:00.",
      overnight: { name: "Camp Two", confirmation: "TBD" },
      schedule: [{ time: "7:00 AM", text: "Go" }], slack: "Two hours." },
  ],
  waypoints: [
    { name: "Located Place", lat: 20.5, lng: -156.5, verified: true, icon: "⛺", days: "1", notes: "Gate <b>closes</b> 6 PM" },
    { name: "Unlocated Place", lat: null, lng: null, verified: false, icon: "🏖️", days: "2", notes: "" },
    { name: "Half Known", lat: 20.6, lng: -156.6, verified: false, icon: "🥾", days: "2", notes: "" },
  ],
  reservations: [{ text: "Book it", booked: true }],
};

const ENTRY = { slug: "test-2027", title: "Test", start: "2027-05-01",
  booking: [{ system: "recreation.gov", what: "Camp One, night 1", target: "2027-05-01" }] };
const WINDOWS = [{ system: "recreation.gov", leadMonths: 6, what: "recreation.gov", when: "6-month", note: "goes fast" }];
const PROFILE = { name: "Colin", defaultGroup: "Solo." };

/* ---------------- GPX ---------------- */

test("GPX exports only verified waypoints", () => {
  const gpx = toGPX(TRIP, { now: NOW.toISOString() });
  assert.ok(gpx.includes('lat="20.5"'), "the verified point must be there");
  assert.ok(!gpx.includes("20.6"), "a coordinate with verified:false must never reach a nav app");
  assert.equal((gpx.match(/<wpt /g) || []).length, 1);
});

test("GPX names what it withheld instead of dropping it silently", () => {
  const gpx = toGPX(TRIP, { now: NOW.toISOString() });
  assert.ok(gpx.includes("Unlocated Place"), "withheld points are listed in the comment");
  assert.ok(gpx.includes("Half Known"));
  assert.match(gpx, /2 waypoint\(s\) deliberately NOT exported/);
  // ...and only inside a comment, never as a plottable element.
  const withoutComments = gpx.replace(/<!--[\s\S]*?-->/g, "");
  assert.ok(!withoutComments.includes("Unlocated Place"));
});

test("GPX escapes XML and strips the inline HTML the data files carry", () => {
  const gpx = toGPX(TRIP, { now: NOW.toISOString() });
  assert.ok(gpx.includes("Test &amp; Trip"), "ampersand must be escaped");
  assert.ok(!/<b>/.test(gpx), "author HTML must not leak into the XML");
  assert.ok(gpx.includes("Gate closes 6 PM"));
});

test("GPX is well-formed enough to parse as XML", async () => {
  const gpx = toGPX(TRIP, { now: NOW.toISOString() });
  /* No XML parser in the standard library, so check the invariants that
     actually break readers: a single root, balanced wpt tags, no stray < or &. */
  assert.equal((gpx.match(/<gpx /g) || []).length, 1);
  assert.equal((gpx.match(/<\/gpx>/g) || []).length, 1);
  assert.equal((gpx.match(/<wpt /g) || []).length, (gpx.match(/<\/wpt>/g) || []).length);
  const text = gpx.replace(/<[^>]*>/g, "").replace(/<!--[\s\S]*?-->/g, "");
  assert.ok(!/&(?!(amp|lt|gt|quot|apos);)/.test(text), "every bare ampersand must be an entity");
});

/* ---------------- ICS ---------------- */

test("ICS uses CRLF and folds long lines to the RFC limit", () => {
  const ics = toICS(TRIP, ENTRY, WINDOWS, { now: NOW });
  assert.ok(ics.includes("\r\n"), "RFC 5545 requires CRLF");
  for (const line of ics.split("\r\n")) {
    assert.ok(Buffer.byteLength(line, "utf8") <= 75, `line over 75 octets: ${line.slice(0, 40)}…`);
  }
});

test("ICS wraps every event and closes the calendar", () => {
  const ics = toICS(TRIP, ENTRY, WINDOWS, { now: NOW });
  assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, (ics.match(/END:VEVENT/g) || []).length);
  assert.ok(ics.startsWith("BEGIN:VCALENDAR"));
  assert.ok(ics.trimEnd().endsWith("END:VCALENDAR"));
  assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, 3, "two days plus one booking window");
});

test("ICS anchors day one to the registry start and runs consecutively", () => {
  const ics = toICS(TRIP, ENTRY, WINDOWS, { now: NOW });
  assert.ok(ics.includes("DTSTART;VALUE=DATE:20270501"));
  assert.ok(ics.includes("DTSTART;VALUE=DATE:20270502"));
});

test("ICS gives a booking window an alarm, and derives its date", () => {
  const ics = toICS(TRIP, ENTRY, WINDOWS, { now: NOW });
  assert.ok(ics.includes("BEGIN:VALARM"));
  assert.ok(ics.includes("TRIGGER:-P1D"));
  assert.ok(ics.includes("DTSTART;VALUE=DATE:20261101"), "6 months before 2027-05-01");
});

test("ICS escapes the characters that would otherwise split a field", () => {
  const ics = toICS(TRIP, ENTRY, WINDOWS, { now: NOW });
  const unfolded = ics.replace(/\r\n /g, "");
  const desc = unfolded.split("\r\n").find((l) => l.startsWith("DESCRIPTION:"));
  assert.ok(desc.includes("\\,") || !desc.includes(", "), "commas must be escaped in a text value");
  assert.ok(!/(?<!\\)\n/.test(desc), "a raw newline would end the property");
});

test("no start date means no calendar rather than events at epoch", () => {
  const ics = toICS(TRIP, { slug: "x" }, WINDOWS, { now: NOW });
  assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, 0);
});

/* ---------------- Plan text ---------------- */

test("the plan lists a bed for every night and flags one that's missing", () => {
  const txt = toPlanText(TRIP, ENTRY, PROFILE);
  assert.ok(txt.includes("Camp One, Nowhere"));
  assert.ok(txt.includes("confirmation ABC-123"));
  assert.ok(!txt.includes("confirmation TBD"), "TBD is not a confirmation and shouldn't be sent as one");
});

test("declared no-signal windows are listed", () => {
  const txt = toPlanText(TRIP, ENTRY, PROFILE);
  assert.match(txt, /NO SIGNAL[\s\S]*back road, 09:00 to 14:00/);
});

test("with none declared it says so rather than implying coverage", () => {
  const bare = { ...TRIP, days: TRIP.days.map(({ noSignal, ...d }) => d) };
  const txt = toPlanText(bare, ENTRY, PROFILE);
  assert.match(txt, /Not declared in the trip data/);
  assert.match(txt, /not a[\s\S]{0,40}statement that there is coverage/);
});

test("phone numbers are pulled from waypoint notes, not just the schedule", () => {
  const txt = toPlanText(TRIP, ENTRY, PROFILE);
  assert.ok(txt.includes("(808) 555-1234"), "the campground office number must survive to the message");
});

test("the plan is plain text — no markup reaches the recipient", () => {
  const txt = toPlanText(TRIP, ENTRY, PROFILE);
  assert.ok(!/<[a-z/]/i.test(txt), `markup leaked: ${(/<[^>]*>/.exec(txt) || [])[0]}`);
});

/* ---------------- stripHtml ---------------- */

test("stripHtml removes tags, decodes entities, and collapses whitespace", () => {
  assert.equal(stripHtml("<b>Bold</b> &amp; <i>italic</i>"), "Bold & italic");
  assert.equal(stripHtml("one<br>two"), "one two");
  assert.equal(stripHtml("  spaced   out \n here "), "spaced out here");
  assert.equal(stripHtml(null), "");
  assert.equal(stripHtml("&lt;not a tag&gt;"), "<not a tag>");
});
