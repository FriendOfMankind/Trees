#!/usr/bin/env node
/* ==========================================================================
   validate.mjs — sanity-check the registry and every trip data file.
   Run: node tools/validate.mjs

   This is not a linter. Every rule here exists because breaking it either
   breaks the site or, worse, quietly ships a wrong fact. The repo states its
   rules in prose across four documents; this file is the subset a machine can
   hold you to. A rule stated only in prose is a rule enforced only by whoever
   happens to be careful that day.

   FAIL blocks a commit. warn is something to look at.
   ========================================================================== */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT, loadHub, loadTrip, tripSlugs, isoToUTC, utcToISO, addDays } from "./lib/site.mjs";
import { decodePolyline, haversineMeters } from "./lib/geo.mjs";

const problems = [];
const warnings = [];
const fail = (m) => problems.push(m);
const warn = (m) => warnings.push(m);

const TODAY = utcToISO(new Date());

// ---- Registry -------------------------------------------------------------

const hub = loadHub();
const TRIPS = hub.read("TRIPS");
const THEMES = hub.read("THEMES") || {};
const DECLINED = hub.read("DECLINED") || [];
const GEAR = hub.read("GEAR") || [];
const AVOID = hub.read("AVOID") || [];
const BOOKING_WINDOWS = hub.read("BOOKING_WINDOWS") || [];
const SYSTEMS = new Set(BOOKING_WINDOWS.map((b) => b.system).filter(Boolean));

const tagUse = new Map();

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
    if (t.theme === "basecamp") fail(`${id}: "basecamp" is the hub's own palette — pick a terrain theme`);

    if (t.coords) {
      const [lat, lng] = t.coords;
      if (typeof lat !== "number" || typeof lng !== "number") fail(`${id}: coords must be two numbers`);
      else if (lat < -90 || lat > 90 || lng < -180 || lng > 180) fail(`${id}: coords out of range`);
    }

    if (t.theme === "basecamp") fail(`${id}: "basecamp" is the hub's own palette — pick a terrain theme`);

    /* Calendar fields. `window` prose is for humans; `months` is what the
       Calendar tab matches a free gap against, so a trip without it can never
       be offered for one. */
    if (t.months != null) {
      if (!Array.isArray(t.months) || !t.months.length) fail(`${id}: months must be a non-empty array of 1-12`);
      else if (t.months.some((m) => !Number.isInteger(m) || m < 1 || m > 12)) fail(`${id}: months must be integers 1-12`);
    } else if (t.status !== "done") {
      warn(`${id}: no "months" — the Calendar tab can't offer it for any window`);
    }
    if (t.mode && !["fly", "drive", "weekend"].includes(t.mode)) fail(`${id}: mode "${t.mode}" is not fly/drive/weekend`);
    if (t.days != null && (!Number.isInteger(t.days) || t.days < 1)) fail(`${id}: days must be a positive integer`);
    if (t.target && !/^\d{4}-\d{2}-\d{2}$/.test(t.target)) fail(`${id}: target must be YYYY-MM-DD`);
    if (t.target && Array.isArray(t.months)) {
      const tm = Number(t.target.slice(5, 7));
      if (!t.months.includes(tm)) fail(`${id}: target ${t.target} is in month ${tm}, which is not in its season ${JSON.stringify(t.months)}`);
    }
    if (t.start && !t.days) warn(`${id}: has a start date but no "days" — it won't render a bar on the calendar`);

    if (t.start && !/^\d{4}-\d{2}-\d{2}$/.test(t.start)) fail(`${id}: start "${t.start}" is not YYYY-MM-DD`);
    if (t.updated && !/^\d{4}-\d{2}-\d{2}$/.test(t.updated)) fail(`${id}: updated "${t.updated}" is not YYYY-MM-DD`);

    if (t.page) {
      if (!existsSync(join(ROOT, t.page, "index.html"))) fail(`${id}: page "${t.page}" has no index.html`);
      if (!existsSync(join(ROOT, t.page, "data.js"))) fail(`${id}: page "${t.page}" has no data.js`);
    } else if (t.status === "planned" || t.status === "outline") {
      fail(`${id}: status "${t.status}" but no page — planned and outline trips need a page`);
    }

    if (t.months) {
      if (!Array.isArray(t.months) || !t.months.length) fail(`${id}: months must be a non-empty array of 1-12`);
      else if (t.months.some((m) => !Number.isInteger(m) || m < 1 || m > 12)) fail(`${id}: months must be integers 1-12`);
    } else if (!t.external && t.status !== "done") {
      warn(`${id}: no "months" — the Calendar tab can't offer it for any window`);
    }
    if (t.mode && !["fly", "drive", "weekend"].includes(t.mode)) fail(`${id}: mode "${t.mode}" is not fly/drive/weekend`);
    if (t.days != null && (!Number.isInteger(t.days) || t.days < 1)) fail(`${id}: days must be a positive integer`);
    if (t.target && !/^\d{4}-\d{2}-\d{2}$/.test(t.target)) fail(`${id}: target must be YYYY-MM-DD`);
    if (t.target && t.months) {
      const tm = Number(t.target.slice(5, 7));
      if (!t.months.includes(tm)) fail(`${id}: target ${t.target} is in month ${tm}, which is not in its season ${JSON.stringify(t.months)}`);
    }
    if (t.start && !t.days) warn(`${id}: has a start date but no "days" — it won't render a bar on the calendar`);

    if (!t.next) warn(`${id}: no "next" action set — the hub card will just say "Open the plan"`);

    /* Booking declarations have to reference a system the profile knows
       about, or the Agenda silently drops them. */
    const decls = !t.booking ? [] : (Array.isArray(t.booking) ? t.booking : [t.booking]);
    for (const b of decls) {
      if (!b.system) fail(`${id}: a booking declaration has no system`);
      else if (!SYSTEMS.has(b.system)) {
        fail(`${id}: booking system "${b.system}" is not in BOOKING_WINDOWS (data/profile.js)`);
      }
      if (b.target && !/^\d{4}-\d{2}-\d{2}$/.test(b.target)) fail(`${id}: booking target "${b.target}" is not YYYY-MM-DD`);
      if (b.target && t.start && b.target < t.start) {
        fail(`${id}: booking target ${b.target} is before the trip starts (${t.start})`);
      }
    }

    /* Staleness. A trip inside 60 days whose file has not been touched in
       three months is more likely forgotten than finished. */
    if (t.start && t.updated && t.status !== "done") {
      const out = daysBetween(TODAY, t.start);
      const age = daysBetween(t.updated, TODAY);
      if (out >= 0 && out <= 60 && age > 90) {
        warn(`${id}: leaves in ${out} days but was last updated ${age} days ago`);
      }
    }

    for (const tag of t.tags || []) tagUse.set(tag, (tagUse.get(tag) || 0) + 1);
  }

  /* Tags are meant to be reused across trips so they mean something. A
     one-off tag is fine — "BASE jumping" is genuinely one trip. What isn't
     fine is two tags for one idea, which is what makes the whole vocabulary
     stop working. So: report overlaps, not singletons. */
  const tags = [...tagUse.keys()];
  for (const a of tags) {
    for (const b of tags) {
      if (a >= b) continue;
      const overlap = b.includes(a) || a.includes(b);
      if (overlap) {
        warn(`tags "${a}" (${tagUse.get(a)} trips) and "${b}" (${tagUse.get(b)} trips) overlap — pick one or the filter splits the same idea in two`);
      }
    }
  }
}

// ---- Trip data files ------------------------------------------------------

const slugs = tripSlugs();

for (const slug of slugs) {
  const rel = `trips/${slug}/data.js`;
  const D = loadTrip(slug);
  if (!D) { fail(`${rel}: failed to evaluate or does not set window.TRIP_DATA`); continue; }
  if (!D.meta) { fail(`${rel}: no meta block`); continue; }

  const entry = Array.isArray(TRIPS) ? TRIPS.find((t) => t.slug === slug) : null;

  if (D.meta.slug !== slug) fail(`${rel}: meta.slug "${D.meta.slug}" does not match folder "${slug}"`);
  if (!entry) fail(`${rel}: not listed in data/trips.js — it won't appear on the hub`);
  if (D.meta.theme && !THEMES[D.meta.theme] && typeof D.meta.theme !== "object") {
    fail(`${rel}: unknown theme "${D.meta.theme}"`);
  }
  if (D.meta.theme === "basecamp") fail(`${rel}: "basecamp" is the hub's own palette — pick a terrain theme`);
  if (entry && entry.theme && D.meta.theme && entry.theme !== D.meta.theme) {
    warn(`${rel}: theme "${D.meta.theme}" but the registry says "${entry.theme}" — the card and the page won't match`);
  }

  const days = Array.isArray(D.days) ? D.days : [];
  if (!days.length) warn(`${rel}: no days — the itinerary tab will be empty`);

  /* --- The honest-status rule. The spec says an outline "must carry an
     openQuestions array; that's what makes it an outline rather than a bad
     plan." Nothing enforced it until now. --- */
  if (entry && entry.status === "outline" && !(D.openQuestions || []).length) {
    fail(`${rel}: status is "outline" but there are no openQuestions — an outline without stated gaps is just an incomplete plan`);
  }
  /* --- A trip that happened should have taught you something --- */
  if (entry && entry.status === "done" && !D.retro) {
    warn(`${rel}: status is "done" but there's no retro — the gear lessons are the reason to keep a finished trip`);
  }
  if (D.retro && entry && entry.status !== "done") {
    warn(`${rel}: has a retro but the status is "${entry.status}" — flip it to "done"`);
  }

  if (entry && entry.status === "planned" && (D.openQuestions || []).length) {
    warn(`${rel}: status "planned" with ${D.openQuestions.length} open question(s) — fine, every real trip has some, but check the status is still honest`);
  }

  /* --- Waypoints: rule 1 --- */
  for (const w of D.waypoints || []) {
    const hasCoords = w.lat != null && w.lng != null;
    if (w.verified && !hasCoords) fail(`${rel}: "${w.name}" is verified:true but has no coordinates`);
    if (!w.verified && hasCoords) warn(`${rel}: "${w.name}" has coordinates but verified:false — confirm it and flip the flag, or drop the numbers`);
    if (hasCoords && (Math.abs(w.lat) > 90 || Math.abs(w.lng) > 180)) fail(`${rel}: "${w.name}" coordinates out of range`);
  }
  const verified = (D.waypoints || []).filter((w) => w.verified && w.lat != null);
  if ((D.waypoints || []).length && !verified.length) {
    warn(`${rel}: not one of its ${D.waypoints.length} waypoints is verified — the Map tab falls back to a searchable list, which works, but the trip has no map`);
  }

  /* --- Dates line up --- */
  const dayDates = days.map((d) => parseDayDate(d.date)).filter(Boolean);
  if (entry && entry.start && dayDates.length) {
    if (dayDates[0] !== entry.start) {
      fail(`${rel}: day 1 is ${dayDates[0]} but the registry says the trip starts ${entry.start}`);
    }
  }
  for (let i = 1; i < dayDates.length; i++) {
    const expected = utcToISO(addDays(isoToUTC(dayDates[i - 1]), 1));
    if (dayDates[i] !== expected) {
      fail(`${rel}: day ${i + 1} is ${dayDates[i]}, expected ${expected} — the itinerary skips or repeats a date`);
    }
  }
  for (let i = 0; i < days.length; i++) {
    if (days[i].day !== i + 1) warn(`${rel}: days[${i}].day is ${days[i].day}, expected ${i + 1}`);
  }

  /* --- Every night has a bed, or is knowingly without one --- */
  const nightsWithoutLodging = days.slice(0, -1).filter((d) => !d.overnight).map((d) => `day ${d.day}`);
  if (nightsWithoutLodging.length) {
    warn(`${rel}: no overnight on ${nightsWithoutLodging.join(", ")} — every night but the last needs one, even if it's "first-come, unresolved"`);
  }
  /* A lodging row may be one night ("3") or a stay ("4–6"), so count the
     nights covered rather than the rows. What matters is that the table
     accounts for every night, not how it's grouped. */
  if (D.lodging && D.lodging.rows && days.length) {
    const covered = D.lodging.rows.reduce((n, r) => n + nightsIn(r.night), 0);
    if (covered && covered !== days.length - 1) {
      warn(`${rel}: ${days.length} days implies ${days.length - 1} nights, but the lodging table accounts for ${covered}`);
    }
  }

  /* --- Hand-typed header stats vs the arrays they summarise --- */
  for (const s of D.meta.stats || []) {
    const n = firstInt(s.num);
    if (n === null) continue;
    if (/night/i.test(s.lbl) && days.length && n !== days.length - 1 && !/reserved|confirmed/i.test(s.lbl)) {
      warn(`${rel}: header stat "${s.num} ${s.lbl}" but the itinerary has ${days.length} days (${days.length - 1} nights)`);
    }
    if (/length|days/i.test(s.lbl) && days.length && n !== days.length) {
      warn(`${rel}: header stat "${s.num} ${s.lbl}" but the itinerary has ${days.length} days`);
    }
  }

  /* --- Budget arithmetic --- */
  /* ---- Baked route geometry ----
     A drawn line is more persuasive than a pin: it looks surveyed even when it
     isn't. So the bar is provenance plus plausibility — every line says which
     tool and service produced it, and lands where the trip actually is. */

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

      // Provenance is not paperwork. A line nobody can trace back to a service
      // and a date is a line nobody can re-check when a road closes.
      if (!r.source) fail(`${rel}: ${id}: no source — say which tool and service drew this`);
      if (!r.generated) warn(`${rel}: ${id}: no generated date — you won't know when it goes stale`);

      const segs = (Array.isArray(r.geometry) ? r.geometry : [r.geometry]).filter(Boolean);
      if (!segs.length) { fail(`${rel}: ${id}: no geometry`); continue; }

      const points = [];
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

      const off = points.find(([lat, lng]) => Math.abs(lat) > 90 || Math.abs(lng) > 180);
      if (off) {
        fail(`${rel}: ${id}: decoded geometry leaves the planet at ${off[0]}, ${off[1]}`);
        continue;
      }

      // Does the line land where the trip is? A routing engine handed a bad
      // coordinate returns a confident route to the wrong place, and that is
      // precisely the failure a map is worst at showing you.
      if (verified.length) {
        const far = points.find((p) =>
          verified.every((w) => haversineMeters(w, { lat: p[0], lng: p[1] }) > 200000));
        if (far) {
          fail(`${rel}: ${id}: geometry passes ${far[0].toFixed(3)}, ${far[1].toFixed(3)} — over 200 km from every verified waypoint. Wrong polyline, or wrong coordinates fed to the router.`);
        }
      }

      if (r.distanceMi != null && !(r.distanceMi > 0)) fail(`${rel}: ${id}: distanceMi is ${r.distanceMi}`);
    }
  }

  if ((D.routes || D.trails) && !verified.length) {
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

  /* --- Sun/moon sites must resolve to a located place --- */
  for (const site of D.sunMoonSites || []) {
    if (site.waypoint) {
      const w = (D.waypoints || []).find((x) => x.name === site.waypoint);
      if (!w) fail(`${rel}: sunMoonSites ${site.date} names waypoint "${site.waypoint}", which doesn't exist`);
      else if (!w.verified) fail(`${rel}: sunMoonSites ${site.date} uses unverified waypoint "${site.waypoint}" — you can't compute a sunset for a place nobody has located`);
    } else if (site.lat == null || site.lng == null) {
      fail(`${rel}: sunMoonSites ${site.date} has neither a waypoint nor coordinates`);
    }
    if (!site.tz) fail(`${rel}: sunMoonSites ${site.date} has no tz`);
  }

  /* --- Declined things reappearing ---
     Only where the trip actually commits to one: schedule rows, reservation
     lines, hike rows. A note explaining why something was declined is the
     page doing its job, and flagging that would train everyone to ignore
     this check. */
  const committed = [
    ...days.flatMap((d) => (d.schedule || []).map((x) => x.text || "")),
    ...days.map((d) => d.highlights || ""),
    ...(D.reservations || []).map((r) => r.text || ""),
    ...((D.hikes && D.hikes.rows) || []).flatMap((h) => [h.name, h.notes || ""]),
    ...(D.places || []).flatMap((g) => (g.items || []).flatMap((i) => [i.name, i.note || ""])),
  ].join("\n").toLowerCase();
  /* Fields are joined with newlines, never spaces: gluing a hike's name to its
     notes with a space invents phrases that are in neither ("Sky Bridge" +
     "walk over the top" is not a Bridge Walk). */

  const hasTerm = (term) =>
    new RegExp(`\\b${term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(committed);

  for (const d of DECLINED) {
    for (const term of (d.terms || [])) {
      if (hasTerm(term)) {
        warn(`${rel}: the itinerary schedules "${term}", but "${d.what}" is on the declined list — resolve it in one direction, don't silence it`);
        break;
      }
    }
  }

  /* Standing personal negatives. `allow` covers the case where the word is
     part of a place name rather than an order — Grandma's Coffee House is a
     destination on the Maui page and buying coffee there is not the plan.
     Allowed phrases are removed from the text first, so a place name excuses
     itself and nothing else. */
  for (const a of AVOID) {
    const text = (a.allow || []).reduce(
      (acc, phrase) => acc.split(phrase.toLowerCase()).join(" "), committed);
    for (const term of (a.terms || [])) {
      const re = new RegExp(`\\b${term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
      if (re.test(text)) {
        warn(`${rel}: the itinerary mentions "${term}" — ${a.why}`);
        break;
      }
    }
  }
}

// ---- The gear feedback loop -----------------------------------------------

/* Questions about the kit point at the trip that answers them. A question
   pointing at a trip that has already happened is the loop failing to close,
   which is exactly the state this repo was in before the field existed. */
for (const cat of GEAR) {
  for (const item of cat.items || []) {
    const q = item.question;
    if (!q) continue;
    if (!q.text) fail(`gear: "${item.name}" has a question with no text`);
    if (!q.answeredBy) { warn(`gear: "${item.name}" has an open question with no trip assigned to answer it`); continue; }
    const t = Array.isArray(TRIPS) ? TRIPS.find((x) => x.slug === q.answeredBy) : null;
    if (!t) { fail(`gear: "${item.name}" is answered by "${q.answeredBy}", which is not a trip`); continue; }
    if (t.status === "done") {
      warn(`gear: "${item.name}" is still an open question but ${t.slug} is done — answer it in that trip's retro`);
    } else if (t.start && t.start < TODAY) {
      warn(`gear: "${item.name}" is answered by ${t.slug}, which started ${t.start} but isn't marked done`);
    }
  }
}

// ---- Cross-cutting --------------------------------------------------------

/* The offline precache is generated. If it's stale the service worker ships
   an asset list that no longer matches the site, which is the silent kind of
   broken. */
try {
  execFileSync(process.execPath, [join(ROOT, "tools/manifest.mjs"), "--check"], { stdio: "pipe" });
} catch (e) {
  fail("sw-precache.js is out of date — run: node tools/manifest.mjs");
}

// ---- Report ---------------------------------------------------------------

for (const w of warnings) console.log(`  warn  ${w}`);
for (const p of problems) console.log(`  FAIL  ${p}`);

console.log(
  `\n${slugs.length} trip page(s), ${TRIPS ? TRIPS.length : 0} registry entr(ies) — ` +
  `${problems.length} problem(s), ${warnings.length} warning(s)`
);
process.exit(problems.length ? 1 : 0);

// ---- Helpers --------------------------------------------------------------

/** "Thu Oct 15, 2026" / "Mon May 1, 2027" → "2026-10-15". Null if unparseable —
    day dates are display strings and this check is best-effort by design. */
function parseDayDate(s) {
  if (!s) return null;
  const m = /([A-Z][a-z]{2})[a-z]*\s+(\d{1,2}),?\s+(\d{4})/.exec(String(s));
  if (!m) return null;
  const months = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
  const mon = months[m[1]];
  if (!mon) return null;
  return `${m[3]}-${String(mon).padStart(2, "0")}-${String(Number(m[2])).padStart(2, "0")}`;
}

/** "3" → 1 night; "4–6" or "4-6" → 3 nights. Anything unparseable → 0, which
    turns the coverage check off rather than making up a number. */
function nightsIn(v) {
  const m = /^\s*(\d+)\s*[–-]\s*(\d+)\s*$/.exec(String(v == null ? "" : v));
  if (m) return Number(m[2]) - Number(m[1]) + 1;
  return /^\s*\d+\s*$/.test(String(v)) ? 1 : 0;
}

function firstInt(s) {
  const m = /(\d+)/.exec(String(s == null ? "" : s));
  return m ? Number(m[1]) : null;
}

function daysBetween(aISO, bISO) {
  const a = isoToUTC(aISO), b = isoToUTC(bISO);
  if (!a || !b) return null;
  return Math.round((b - a) / 86400000);
}
