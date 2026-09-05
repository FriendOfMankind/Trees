#!/usr/bin/env node
/* ==========================================================================
   sun.mjs — generate or check a trip's Sun / Moon table.

   Sunrise is not a fact worth transcribing. It follows from a date, a
   position and an elevation, and it comes out the same every time. One of
   the tables in this repo carries the note "recomputed; the plan said 6:52",
   which is a four-minute error that was caught by luck rather than by a
   process. This is the process.

   Ad-hoc, for any place:
     node tools/sun.mjs --lat 20.71 --lng -156.25 --elev 3055 \
                        --tz Pacific/Honolulu --from 2027-05-13 --days 8

   For a trip that declares `sunMoonSites` in its data.js:
     node tools/sun.mjs maui-2027              print a paste-ready table
     node tools/sun.mjs maui-2027 --check      diff it against what's there

   A site may give lat/lng directly, or name a waypoint — in which case the
   waypoint must be verified:true. You cannot compute a sunset for a place
   you have not located, and the tool will not pretend otherwise.
   ========================================================================== */

import { sunTimes, moonPhase, moonRiseSet, fmtLocal, localDayOffset } from "./lib/astro.mjs";
import { loadTrip, tripSlugs } from "./lib/site.mjs";

const argv = process.argv.slice(2);
const flag = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : def;
};
const has = (name) => argv.includes(`--${name}`);
const slug = argv.find((a) => !a.startsWith("--") && !argv[argv.indexOf(a) - 1]?.startsWith("--"));

/* Tolerances for --check. A minute of drift is rounding; five is a mistake. */
const TOL_MIN = 3;

function computeDay({ dateISO, lat, lng, elevationM, tz, label }) {
  const date = new Date(dateISO + "T00:00:00Z");
  const s = sunTimes(date, lat, lng, elevationM);
  const m = moonRiseSet(date, lat, lng, elevationM);
  /* Phase is read at local midday, so a single number describes the night
     that follows rather than the one that just ended. */
  const p = moonPhase(new Date(date.getTime() + (12 * 60 - 4 * lng) * 60000));

  const t = (v) => fmtLocal(date, v, tz);
  const withDay = (v) => {
    if (v == null) return null;
    const off = localDayOffset(date, v, tz);
    return t(v) + (off > 0 ? " (next day)" : off < 0 ? " (prev day)" : "");
  };

  return {
    dateISO, label, lat, lng, elevationM: elevationM || 0, tz,
    firstLight: t(s.firstLight), sunrise: t(s.sunrise), noon: t(s.noon),
    sunset: t(s.sunset), dark: t(s.dark),
    moonrise: withDay(m.rise), moonset: withDay(m.set),
    moonPercent: p.percent, moonName: p.name,
    minutes: s,
  };
}

/* ---------------- Ad-hoc mode ---------------- */

if (has("lat") && has("lng")) {
  const lat = Number(flag("lat")), lng = Number(flag("lng"));
  const elevationM = Number(flag("elev", 0));
  const tz = flag("tz", "UTC");
  const from = flag("from", new Date().toISOString().slice(0, 10));
  const n = Number(flag("days", 1));

  console.log(`\n${lat}, ${lng}  ·  ${elevationM} m  ·  ${tz}`);
  console.log(`Sun: NOAA, refraction + horizon dip. Moon rise/set ±~4 min. Twilight is civil (sun 6° down).\n`);
  console.log("date        first    rise     noon     set      dark     moon");
  for (let i = 0; i < n; i++) {
    const dateISO = new Date(Date.parse(from + "T00:00:00Z") + i * 86400000).toISOString().slice(0, 10);
    const r = computeDay({ dateISO, lat, lng, elevationM, tz, label: "" });
    console.log([
      dateISO,
      pad(r.firstLight), pad(r.sunrise), pad(r.noon), pad(r.sunset), pad(r.dark),
      `${r.moonPercent}% ${r.moonName}${r.moonset ? `, set ${r.moonset}` : ""}`,
    ].join(" "));
  }
  console.log("");
  process.exit(0);
}

function pad(s) { return String(s == null ? "—" : s).padStart(8); }

/* ---------------- Trip mode ---------------- */

if (!slug) {
  console.log("Usage:\n  node tools/sun.mjs --lat <n> --lng <n> [--elev m] [--tz IANA] [--from YYYY-MM-DD] [--days n]");
  console.log("  node tools/sun.mjs <slug> [--check]");
  console.log(`\nTrips: ${tripSlugs().join(", ")}`);
  process.exit(1);
}

const D = loadTrip(slug);
if (!D) { console.log(`  FAIL  trips/${slug}/data.js did not load`); process.exit(1); }

const sites = D.sunMoonSites;
if (!Array.isArray(sites) || !sites.length) {
  console.log(`${slug} has no \`sunMoonSites\` block, so there is nothing to compute from.

Add one to trips/${slug}/data.js — one entry per day, each naming where you
wake up. A site may reference a verified waypoint or carry its own numbers:

  sunMoonSites: [
    { date: "2027-05-13", label: "Olowalu", waypoint: "Camp Olowalu", tz: "Pacific/Honolulu" },
    { date: "2027-05-17", label: "Hosmer Grove", lat: 20.765, lng: -156.238, elevationM: 2073, tz: "Pacific/Honolulu" },
  ],

A waypoint reference must be verified:true. There is no way to compute a
sunset for a place nobody has located, and guessing the location to produce
a confident-looking time is the exact failure this repo is built against.`);
  process.exit(1);
}

const waypoints = D.waypoints || [];
const rows = [];
const problems = [];

for (const site of sites) {
  let { lat, lng } = site;
  if (site.waypoint) {
    const w = waypoints.find((x) => x.name === site.waypoint);
    if (!w) { problems.push(`${site.date}: no waypoint named "${site.waypoint}"`); continue; }
    if (!w.verified || w.lat == null || w.lng == null) {
      problems.push(`${site.date}: waypoint "${site.waypoint}" is not verified — verify it or give explicit coordinates`);
      continue;
    }
    lat = w.lat; lng = w.lng;
  }
  if (lat == null || lng == null) { problems.push(`${site.date}: no coordinates`); continue; }
  if (!site.tz) { problems.push(`${site.date}: no tz (IANA zone, e.g. "Pacific/Honolulu")`); continue; }
  rows.push(computeDay({
    dateISO: site.date, lat, lng, elevationM: site.elevationM || 0, tz: site.tz,
    label: site.label || site.waypoint || "",
  }));
}

for (const p of problems) console.log(`  FAIL  ${p}`);
if (!rows.length) process.exit(1);

if (!has("check")) {
  console.log(`\n/* Generated by: node tools/sun.mjs ${slug}\n`
    + `   NOAA solar position with refraction and horizon dip; civil twilight is a\n`
    + `   fixed 6° solar depression and therefore does NOT shift with elevation.\n`
    + `   Moon rise/set ±~4 min. Illumination read at local midday. */`);
  console.log("  sunMoon: [");
  for (const r of rows) {
    const moon = `${r.moonPercent}%${r.moonset ? ` — moonset ${r.moonset}` : ""}`;
    console.log(`    { date: ${JSON.stringify(dayLabel(r.dateISO, r.tz))}, location: ${JSON.stringify(r.label)}, `
      + `firstLight: ${JSON.stringify(r.firstLight)}, sunrise: ${JSON.stringify(r.sunrise)}, `
      + `sunset: ${JSON.stringify(r.sunset)}, dark: ${JSON.stringify(r.dark)}, moon: ${JSON.stringify(moon)} },`);
  }
  console.log("  ],\n");
  process.exit(0);
}

/* ---------------- --check ---------------- */

const existing = D.sunMoon || [];
if (!existing.length) { console.log(`${slug} has no sunMoon table to check against.`); process.exit(1); }
if (existing.length !== rows.length) {
  console.log(`  warn  ${existing.length} rows in the table, ${rows.length} sites declared — comparing in order`);
}

let bad = 0;
console.log(`\nChecking ${slug} against computed values (tolerance ${TOL_MIN} min)\n`);
for (let i = 0; i < Math.min(existing.length, rows.length); i++) {
  const e = existing[i], r = rows[i];
  const diffs = [];
  for (const key of ["firstLight", "sunrise", "sunset", "dark"]) {
    const d = minutesApart(e[key], r[key]);
    if (d === null) continue;
    if (d > TOL_MIN) diffs.push(`${key}: file ${e[key]} vs computed ${r[key]} (${d} min)`);
  }
  const filePct = /(\d+)\s*%/.exec(e.moon || "");
  if (filePct && Math.abs(Number(filePct[1]) - r.moonPercent) > 3) {
    diffs.push(`moon: file ${filePct[1]}% vs computed ${r.moonPercent}%`);
  }
  if (diffs.length) {
    bad++;
    console.log(`  ${e.date || r.dateISO}  ${r.label}`);
    for (const d of diffs) console.log(`      ${d}`);
  }
}
console.log(`\n${bad} of ${Math.min(existing.length, rows.length)} rows disagree by more than ${TOL_MIN} minutes.`);
process.exit(bad ? 1 : 0);

/** "7:33 AM" / "7:33" / "~7:17 PM" → minutes, tolerantly. Returns null when a
    cell isn't a time at all, because "—" is a legitimate entry. */
function toMinutes(s) {
  const m = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(String(s || ""));
  if (!m) return null;
  let h = Number(m[1]);
  const min = Number(m[2]);
  const ap = (m[3] || "").toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return h * 60 + min;
}

function minutesApart(a, b) {
  const x = toMinutes(a), y = toMinutes(b);
  if (x === null || y === null) return null;
  /* A bare "7:33" with no meridiem is ambiguous; treat 12-hour wraps as equal
     rather than reporting a spurious 12-hour error. */
  const d = Math.abs(x - y);
  return Math.min(d, Math.abs(d - 720), Math.abs(d - 1440));
}

function dayLabel(dateISO, tz) {
  const d = new Date(dateISO + "T12:00:00Z");
  const wd = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short" }).format(d);
  const [y, m, dd] = dateISO.split("-");
  return `${wd} ${Number(m)}/${Number(dd)}`;
}
