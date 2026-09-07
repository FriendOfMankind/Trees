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

Order of work:

1. **Assign recipes to the existing trips.** Add `usedOn` entries; the trip
   files need no edit and the validator checks every claim.
2. **Grocery list generator.** `meals.js` knows ingredients, `usedOn` knows
   which days a trip cooks, the itinerary knows where the resupply stop is.
   Roll that into a shopping list split by "buy at home" / "resupply". This is
   the thing the kitchen registry was built to enable.
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

## Tier 2 — the three new trips have no maps

`mojave-winter-2027`, `sky-islands-2027` and `northern-rockies-2027` have
**0 verified waypoints out of 44**. The validator already warns about all
three. `tools/geocode.mjs` and `tools/setcoord.mjs` exist to fix exactly this,
so it's mechanical work, not research — and until it's done, three trips fall
back to a searchable list instead of a map.

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
