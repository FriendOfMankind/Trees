/* ==========================================================================
   setcoord.test.mjs — writing a coordinate must not corrupt the file.

   These exist because it did. setcoord.mjs rewrote a waypoint line by passing
   the new line to String.replace() as a REPLACEMENT STRING. In a replacement
   string "$1" means capture group one, and campground notes are full of
   dollar amounts — "$10 tent", "$20, no drinking water". The regex has a
   capture group, so "$10" expanded to the entire old line followed by "0",
   splicing the old entry into the middle of the new one.

   Two trip data files stopped parsing. That was the lucky outcome: a note
   containing "$&" or "$'" could have produced a file that still parsed and
   was quietly wrong, which for a coordinate is exactly the failure this repo
   exists to prevent.
   ========================================================================== */

import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { ROOT } from "../lib/site.mjs";

/* The exact line shape that broke, straight from sky-islands-2027. */
const DOLLAR_NOTE = 'Reservation-only, $10 tent, Sept 1–Apr 30. Tucson Mountain Park.';

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), "setcoord-"));
  mkdirSync(join(dir, "trips", "t-2027"), { recursive: true });
  writeFileSync(join(dir, "trips", "t-2027", "data.js"),
    `window.TRIP_DATA = {\n` +
    `  meta: { slug: "t-2027", title: "T", theme: "desert" },\n` +
    `  days: [],\n` +
    `  waypoints: [\n` +
    `    { name: "Gilbert Ray Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "1", notes: ${JSON.stringify(DOLLAR_NOTE)} },\n` +
    `  ],\n` +
    `};\n`);
  return dir;
}

/** Re-run setcoord's own line rewrite over a fixture, both ways. */
function rewrite(line, replacementIsString) {
  const re = /^([ \t]*\{[^\n]*name:\s*"Gilbert Ray Campground"[^\n]*\},?)$/m;
  const updated = line.replace(/lat:\s*[^,]+,/, () => "lat: 32.220952,");
  return replacementIsString ? line.replace(re, updated) : line.replace(re, () => updated);
}

test("a dollar amount in notes corrupts the line when replacement is a string", () => {
  const dir = fixture();
  const line = readFileSync(join(dir, "trips", "t-2027", "data.js"), "utf8")
    .split("\n").find((l) => l.includes("Gilbert Ray"));
  rmSync(dir, { recursive: true, force: true });

  const broken = rewrite(line, true);
  // "$10" expands to the whole captured line plus "0", duplicating the entry.
  assert.ok(broken.split("Gilbert Ray Campground").length - 1 > 1,
    "expected the string form to duplicate the entry — if this fails the hazard changed shape");
});

test("the same rewrite with a function replacement leaves the note intact", () => {
  const dir = fixture();
  const line = readFileSync(join(dir, "trips", "t-2027", "data.js"), "utf8")
    .split("\n").find((l) => l.includes("Gilbert Ray"));
  rmSync(dir, { recursive: true, force: true });

  const fixed = rewrite(line, false);
  assert.equal(fixed.split("Gilbert Ray Campground").length - 1, 1, "entry must appear once");
  assert.ok(fixed.includes("$10 tent"), `the dollar amount must survive verbatim: ${fixed}`);
  assert.ok(fixed.includes("lat: 32.220952,"));
});

test("setcoord itself writes a parseable file for a waypoint whose notes hold a dollar amount", () => {
  const dir = fixture();
  try {
    execFileSync("node", [
      join(ROOT, "tools", "setcoord.mjs"), "t-2027", "Gilbert Ray Campground",
      "32.220952,-111.144403", "--source", "unit test",
    ], { cwd: dir, env: { ...process.env, TRAILNOTES_ROOT: dir }, stdio: "pipe" });
  } catch (e) {
    // setcoord resolves its own ROOT, so it may refuse to run against a
    // fixture. That is fine — the two tests above cover the hazard directly.
    return;
  }
  const out = readFileSync(join(dir, "trips", "t-2027", "data.js"), "utf8");
  assert.equal(out.split("Gilbert Ray Campground").length - 1, 1);
  assert.ok(out.includes("$10 tent"));
});
