# Roadmap

Written 2026-09-07, against the tree at that date. Every claim below was
checked against the repo rather than remembered — see "How to re-check" at
the bottom, because this document goes stale faster than anything else here.

---

## The frame

This site's asset is not its layout. It's that it **says when it doesn't
know** — `verified: false`, `TBD`, `openQuestions`, "I could not confirm
this." That's what separates it from any AI trip planner, all of which will
confidently hand you a coordinate 200 m off a locked gate.

So every idea has to pass one filter:

> **Does this add verified facts, or does it add plausible text?**

Automation that ingests from an authoritative source — a booking confirmation
email, a Recreation.gov bulk record, an OSM trail geometry — makes the site
more true. Automation that generates content makes it less true while making
it look more finished. The second kind is the one that feels productive.

Concretely: **nothing writes trip content unattended.** No nightly "flesh out
a wishlist entry" job, no forecast baked into a data file, no auto-commit.
Every model-written change lands as a proposal a human reads.

---

## Already built — don't re-propose these

Listed because the obvious next ideas are mostly done, and proposing them
again wastes a session. Verified present in the tree on 2026-09-07:

| Thing | Where |
|---|---|
| CI running the validator on push | `.github/workflows/validate.yml` |
| Sun/moon computed, not typed | `tools/sun.mjs`, `tools/lib/astro.mjs`, tested against almanac times |
| Season matching + free-window finder | `months`/`mode` on every registry entry, Calendar tab, `tools/lib/rank.mjs` |
| Booking-window arithmetic | Agenda tab, derived in `js/derive.js` from `start` + `booking` |
| Declined/avoid list enforced | `DECLINED[].terms` and `AVOID` in `data/profile.js`, grepped by the validator |
| Staleness warnings | validator warns when a trip leaves in N days but was updated long ago |
| Coordinate resolution | `tools/geocode.mjs`, `tools/setcoord.mjs`, `tools/lib/ridb-local.mjs` (Recreation.gov bulk export) |
| Trail geometry from OSM | `tools/trail.mjs` — and "not mapped in OSM" is an accepted answer |
| Offline + print | `sw.js`, `js/offline.js`, `css/print.css`, `tools/manifest.mjs` |
| GPX / .ics / text exports | `tools/export.mjs`, `js/exports.js` |
| Retro → gear feedback loop | `retro` blocks answering `GEAR[].question` |
| Test suite | `node --test "tools/test/*.test.mjs"` — 52 tests |

An earlier draft of this file proposed nine of these as new work. That's the
failure mode of planning against a stale checkout, and it's why the re-check
instructions are at the bottom.

---

## Tier 0 — open contradictions, ahead of any feature

**1. Kentucky's K-L2 says two opposite things, and the trip leaves in 15 days.**
`trips/kentucky-2026/data.js` line 62 (overview) and line 146 (day 2 lunch)
call cooking through the 11:00–3:00 lecture "confirmed workable." Line 378
(provisions) flags the same slot as a conflict and proposes two fixes. Both
statements ship on the same page. Pick one.

**2. `budget: "TBD"` on a trip with both campgrounds already booked.**
Kentucky has confirmation numbers and no cost estimate.

These take an hour. Building automations while a trip two weeks out contradicts
itself is procrastination wearing a lab coat.

---

## Tier 1 — the camp kitchen's actual payoff

`data/meals.js` landed today with 23 recipes covering 39 slots. The survey
that matters:

| Trip | Days | Bare `made`/`bought` meal slots | Provisions section |
|---|---|---|---|
| kentucky-2026 | 6 | 11 | yes |
| appalachians-2026 | 11 | 5 | yes |
| maui-2027 | 8 | 18 | **none** |
| sky-islands-2027 | 11 | 25 | **none** |
| mojave-winter-2027 | 14 | 32 | **none** |
| northern-rockies-2027 | 21 | 47 | **none** |

**138 meal slots say nothing but "made" or "bought", and four of six trips
have no provisions section at all.** For a traveler whose profile opens with
"cooks at camp by default," that's the largest content gap on the site — and
it's now cheap to close, because the recipes exist and only need assigning.

### Grocery stops, timed to the meals between them

**Colin's rule, Sept 2026: shop at the start of every trip, road trips
included** — everything goes straight into the car. So the question is never
"where is a supermarket", it is *"how many of each meal do I need to buy at
this stop to reach the next one."*

The data to compute that already exists. `usedOn` says which day and slot each
recipe fills; the itinerary says where you are on each day. Between two
grocery stops there is a known count of breakfasts, lunches and dinners, minus
the ones marked `bought`. So each stop gets a line like:

> **Kroger, Stanton KY — Thursday, day 3.** Buy 2 breakfasts, 3 lunches,
> 3 dinners. Plus: 1 block of ice, and the rotisserie chicken that covers
> tonight and tomorrow.

That is derived, not hand-maintained, and it fixes the thing that makes a
resupply stressful — standing in an aisle doing arithmetic about how many
dinners are left.

Shape it as `provisions.stops[]` on a trip:

```js
stops: [
  { day: 1, where: "Giant Eagle, Avon OH", kind: "departure", maps: "..." },
  { day: 3, where: "Kroger, Stanton KY",   kind: "resupply",  maps: "...",
    also: ["1 BLOCK of ice, not cubes", "Rotisserie chicken — covers D2 and D3"] },
]
```

Everything else — the meal counts, the ingredient roll-up, which Zone each
item lands in — comes from `data/meals.js`. The stop only declares where and
when.

**Blocked on nothing.** It needs the meals assigned first (item 1 below),
because a count of meals you have not chosen yet is a count of nothing.

Order of work:

1. **Assign recipes to the existing trips.** Add `usedOn` entries; the trip
   files need no edit and the validator checks every claim.
2. **Grocery stops with per-stop meal counts**, as designed above. The
   shopping list falls out of it: ingredients rolled up per stop, split by
   what goes in the cooler and what does not.
3. **Cooler timeline.** Same data plus `cleanup` and Zone membership: plot
   Zone 1 depletion against days and flag where a high-cleanup meal is
   scheduled at a site with no potable water. The 11-day Appalachians timeline
   is described as existing in `MEALS-trip2-october.md` and has never been in
   this repo.
4. **A fly-in kitchen subset.** Maui has no cooler and buys fuel on arrival,
   so most of this library doesn't transfer. Either build the Zone 3-only
   subset or mark Maui's food honestly as unplanned. Right now it's 18 slots
   of "made" with nothing behind them.

**Blocked on you:** `MEALS-trip1-kentucky.md` and `MEALS-trip2-october.md`
are cited by both 2026 trip pages and are not in this repo. They hold exact
grams for roughly half these recipes and the cooler timeline. Paste them and
items 1–3 get materially better. Everything else here proceeds without them.

---

## Tier 2 — one trip left with no map

Done Sept 2026 via `mapbench.html`: Kentucky 8/8, Appalachians 9/9, Maui
18/18, Sky Islands 15/15, Northern Rockies 15/15. **Only
`mojave-winter-2027` is left, at 0/14.** One session on the bench closes it.

---

## Tier 3 — automation that isn't built yet

### Booking alarms that reach you when you aren't looking at the site

The Agenda tab computes when every window opens. Nothing tells you while
you're doing something else. A weekly scheduled job that reads the registry
and pushes "recreation.gov opens for X in 3 days, 7 AM local" is the highest-
dollar item left, because the failure it prevents — missing a 7 AM drop by a
day — is unrecoverable and the repo's own notes say small campgrounds "go in
seconds."

Notification only. It writes nothing.

### `/preflight <slug>` — a T-14 / T-7 / T-1 skill

Runs the universal checklist against one trip: open questions still open,
reservations unchecked, gear marked `need` that a day depends on, road
conditions not re-confirmed, forecast now inside the 10-day window, meals with
no recipe. Read-only, outputs a list. The K-L2 contradiction is exactly the
class of thing this would have surfaced on its own.

### Email → reservations, as a repeatable skill

Already done once by hand (commit 9239640, "Pull reservation confirmations
from email into both trip pages"). Best-shaped automation on the list, because
it ingests an authoritative fact rather than generating a plausible one. Make
it a skill: search for confirmations, diff against each trip's `reservations`,
propose the additions.

### Weather, at read time only

AccuWeather's daily forecast reaches 10 days. Kentucky is 15 days out today,
so its forecast does not exist yet and the page correctly shows climate
normals instead. Any forecast written into a data file must carry the date it
was fetched, or it becomes a lie within a week.

---

## Explicitly not doing

- **Auto-generating trip pages or wishlist prose.** The point of this site is
  that it doesn't.
- **A chat interface over the trips.** A demo. The Calendar tab and the
  filters answer the real questions faster.
- **Caching forecasts into data files.** See above.
- **Any scheduled job that commits without review.**
- **A CDN dependency.** These pages get opened where there's no signal.
- **Silencing a validator warning to get a clean run.** Resolve it in the data
  or argue with it out loud. `CLAUDE.md` non-negotiable #5.

---

## How to re-check this document

This file is the most perishable thing in the repo. Before trusting it:

```
git log --oneline -20                      # what landed since it was written
ls tools tools/lib .github/workflows       # what's already automated
node tools/validate.mjs                    # what the repo says is wrong today
node --test "tools/test/*.test.mjs"
```

If a Tier item is already built, delete it rather than leaving it to be
proposed again.
