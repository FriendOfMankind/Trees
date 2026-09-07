# Roadmap

Written 2026-09-07. What to build next on this site, ranked by what it
actually buys, with the reasoning kept visible so it can be argued with.

---

## The frame

This site's asset is not its layout. It's that it **says when it doesn't
know** — `verified: false`, `TBD`, `openQuestions`, "I could not confirm
this." That's what separates it from any AI trip planner, all of which will
confidently give you a coordinate 200 m off a locked gate.

So there's a filter every idea below has to pass:

> **Does this add verified facts, or does it add plausible text?**

Automation that ingests from an authoritative source (a booking confirmation
email, an AllTrails record, a park's own page) makes the site more true.
Automation that generates content makes it less true while making it look
more finished. The second kind is the one that feels productive.

Concretely: **do not build a thing that writes trip content unattended.** Not
a nightly "flesh out a wishlist entry" job, not a weather forecast baked into
a data file, not an auto-committed anything. Every AI-written change lands as
a proposal a human reads.

---

## Tier 0 — do this before any automation

**Kentucky leaves in 15 days and carries an unresolved contradiction.**
`trips/kentucky-2026/data.js` says two different things about K-L2: the day-2
card calls the midday quesadillas "confirmed workable" during the 11:00–3:00
lecture; the provisions section flags the same slot as a conflict and proposes
two fixes. Both statements are on the same page. Also `budget: "TBD"` on a
trip with both campgrounds already booked.

Building automations while a trip two weeks out has an open contradiction is
procrastination wearing a lab coat. Close these first. They take an hour.

---

## Tier 1 — the schema gaps, which are worth more than any AI feature

These are the highest-value items on this document and none of them need a
model.

### 1. Wishlist entries have no machine-readable season or distance

32 wishlist entries, and the only seasonality is prose in `window`
("Late September — before the leaves, after the heat"). `start` is `null` for
all of them. So the question that actually drives every decision here —
*"I have a window from X to Y, what's viable?"* — can only be answered by
reading 32 cards.

Add to the registry:

```js
season:     { months: [6, 7, 8, 9], best: [9], why: "Snow on the passes into June; smoke risk in August" },
driveHours: 14,          // from Avon, or null for fly-in
fly:        false,       // changes the whole cost and gear model
```

Then the hub gets a **"What fits my window?"** control: pick a month range,
get the viable subset sorted by drive time. That single feature does more for
a 32-item wishlist than every other idea in this file.

### 2. Nothing computes when to act

`BOOKING_WINDOWS` documents the rules as prose. Every trip has a `next`.
Nothing turns "6-month rolling window, releases 7 AM local" plus a start date
into "**this opens in 9 days.**" On a site whose own notes say small
campgrounds "go in seconds," that gap costs real trips.

Add `bookingSystem` to the registry, derive the open date from `start`, and
sort the hub by urgency rather than only by date. See Tier 2 for the alarm.

### 3. No fact has a "last verified" date

Facts here decay, and this repo already knows it: Buffalo National River's
reservation rules changed in March 2026 and the file notes the older guidance
is "dead." Baxter's online booking changed in summer 2026. Nothing records
*when* anything was checked.

Add `verifiedOn: "2026-09-04"` to volatile facts (booking windows, road
conditions, campground status) and a `tools/stale.mjs` that lists anything
unverified for N months. Cheap, and it turns "is this still true?" from a
memory problem into a report.

### 4. Contradictions live in code comments, where decisions go to die

`data/profile.js` contains, verbatim: *"⚠️ Note the conflict: stargazing is on
this list, but the Maui 2027 page schedules a dark-sky window on 5/19 —
worth resolving rather than silently editing one of them."* That comment has
survived every commit since.

Make the validator catch it: scan every trip's data for `DECLINED` keywords
and warn. Same for the K-L2 class of problem — a HIGH or MED-cleanup meal
scheduled at a site the lodging data marks as having no potable water is
mechanically detectable now that `data/meals.js` records cleanup levels.

---

## Tier 2 — automation that pays for itself

### 5. CI: run the validator on every push

A GitHub Action running `node tools/validate.mjs`. Ten lines. The validator
already catches a wrong coordinate flag and a budget that doesn't add up;
right now it only catches them if someone remembers to run it.

### 6. Booking-window alarms (scheduled, and the highest-dollar item here)

A weekly Routine that reads the registry, computes which booking windows open
in the next 30 days, and pings with the exact date and drop time. Nothing is
written; it's a notification. This is the automation most likely to actually
change an outcome, because the failure mode it prevents — missing a 7 AM drop
by a day — is unrecoverable.

### 7. `/preflight <slug>` — a T-14 / T-7 / T-1 skill

Runs the universal checklist against one trip and reports what's unresolved:
open questions still open, reservations unchecked, gear marked `need` that a
day depends on, road conditions not re-confirmed, forecast now inside the
10-day window. Read-only, outputs a list. This is where the Kentucky K-L2
conflict would have surfaced on its own.

### 8. `/verify-hikes <slug>` — AllTrails cross-check

Kentucky already did this by hand and the page shows both figures where they
disagree, which is the right behavior. The AllTrails MCP server can automate
the lookup. **Verified limitation:** its trail-details response does not
return trailhead coordinates, which is exactly why every Kentucky waypoint is
`verified: false`. This tool checks distance, gain and difficulty. **It does
not solve the coordinate problem** and must not be used to pretend it does.

### 9. Email → reservations, as a repeatable skill

Already done once by hand — commit 9239640, "Pull reservation confirmations
from email into both trip pages." That's the best-shaped automation on this
list, because it ingests an authoritative fact rather than generating a
plausible one. Make it a skill: search for confirmations, diff against each
trip's `reservations`, propose the additions.

---

## Tier 3 — good, not urgent

- **Grocery list generator.** Now buildable: `data/meals.js` knows ingredients
  and `usedOn` knows which days a trip cooks. Roll up a trip's meals into a
  shopping list split by "buy at home" and "resupply," with the resupply stop
  taken from the itinerary. This is the payoff for the kitchen registry.
- **Cooler timeline.** Same data. Zone 1 depletion vs. days, which is the
  thing `MEALS-trip2-october.md` reportedly contains and this repo doesn't.
- **Print / offline view.** These pages get carried to trailheads. A clean
  print stylesheet is worth more than most interactive features.
- **`done` trips and a gear feedback loop.** The status exists and nothing
  uses it. The Siesta 20 bag is explicitly a shakedown in September for the
  October 30s — that finding needs somewhere to land, and the Gear Locker is
  it.
- **Weather at read time, never baked in.** AccuWeather's daily forecast
  reaches 10 days. Kentucky is 15 days out today, so the forecast doesn't
  exist yet. Climate normals are what's usable now, and the pages correctly
  label them as normals. Any forecast written into a data file must carry the
  date it was fetched, or it becomes a lie within a week.

---

## Explicitly not doing

- **Auto-generating trip pages or wishlist prose.** The whole point of this
  site is that it doesn't.
- **A chat interface over the trips.** A demo, not a tool. The filters and a
  season query answer the real questions faster.
- **Caching forecasts into data files.** See above.
- **Any scheduled job that commits without review.**
- **A CDN dependency.** These pages get opened where there's no signal.
