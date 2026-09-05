# Trail Notes

A personal hub for travel research, trip planning and camping logistics.
Every trip — booked, half-planned, or still just an idea — lives in one place,
in one format, at one URL.

Static site: no build step, no dependencies. Open `index.html` in a browser or
serve the folder. GitHub Pages works out of the box.

## The hub

`index.html` is the front door. Five tabs:

- **Trips** — every trip as a card, pinned first, then by how real it is.
  Filter by Pinned / Planned / Needs work / Wishlist / Done, or click any tag
  to filter by it. Each card shows the single **next action** standing between
  that trip and being booked.
- **Agenda** — every dated thing across every trip, soonest first. Booking
  windows are *derived*: a trip declares what it has to book and through which
  system, and the window is counted back from the night being booked using the
  lead times in the Playbook. Nothing on this tab is typed in, so nothing on it
  can drift. A window the site can't derive is listed as unknown rather than
  guessed.
- **Map** — every trip pinned on one world map, colored by theme.
- **Gear Locker** — what's in the kit and, more usefully, what it can't do
  yet. Anything marked *replace* is a purchase with a deadline.
- **Playbook** — the planning principles every itinerary here is built to, the
  checklist that runs on every trip regardless of destination, and default
  booking-window timing.

## A trip page

Each trip is a folder under `trips/`. The tabs are generated from whichever
data sections exist — a trip with no hikes has no Hikes tab:

Overview · Itinerary · Map · Lodging · Hikes · Sun/Moon/Weather · Budget ·
Packing · Reservations · Open Questions · Notes

Plus **Retro** on a finished trip — the verdict, and what each piece of gear
actually did. Those verdicts answer the Gear Locker's open questions, which is
the only path by which a trip changes what the next one packs.

Packing and provisions are checklists saved to `localStorage` (per browser — a
scratchpad, not a record). Reservations are different: a line marked
`done: true` in the data file is confirmed and can't be unticked in the
browser, because the data file is the record and the checkbox isn't.

Every trip's Overview carries four buttons: **GPX** (verified waypoints only —
unverified ones are deliberately withheld and the page says how many),
**calendar** (.ics, days as all-day events plus an alarm for each booking
window), **copy the plan to text home**, and **print**.

**[Full Circle Maui, May 2027](trips/maui-2027/)** is the reference
implementation: an 8-day solo counterclockwise camping loop.

## Offline

This site is meant to be opened where there is no signal, so it caches itself.
A service worker stores the whole thing — every page, every trip's data,
Leaflet — on first visit, versioned by a content hash so the cache retires
itself when anything changes. Every trip page opens with no network, whether
or not you visited it first. A badge in the header says when you're seeing the
saved copy.

Map tiles are cached as you pan, and the Map tab has a button to store the
trip's area up front. That is capped at 250 tiles per request: the OSM tile
servers are donated and their usage policy treats more than that as bulk
downloading. So it buys you an overview map offline, not turn-by-turn — for
that, export the GPX and use an app built for navigation. The page says as
much rather than implying more.

Printing produces a real document: every tab unfolded into one linear
sequence, the map and the chrome dropped, day cards kept off page breaks,
checkboxes you can tick with a pen, and each Maps link's search string printed
beside it, because an href is invisible on paper.

## Tools

Nothing here runs in a browser and the site works without any of it.

```bash
node --test "tools/test/*.test.mjs"   # 48 tests over the derived facts
node tools/validate.mjs            # must exit 0 before committing; CI runs it
node tools/manifest.mjs            # regenerate the offline precache list
node tools/export.mjs <slug>       # GPX + ICS + plan text into exports/
node tools/export.mjs --all        # regenerate data/trips.json
node tools/sun.mjs <slug> --check  # diff a sun/moon table against the real numbers
node tools/sun.mjs --lat 44.4 --lng -110.6 --tz America/Denver --from 2027-07-04 --days 5
```

`tools/sun.mjs` exists because sunrise is not a fact worth transcribing. It
follows from a date, a position and an elevation, and it comes out the same
every time — one table in this repo still carries the note "recomputed; the
plan said 6:52", which is a four-minute error caught by luck. Sites resolve
through *verified* waypoints only; there is no computing a sunset for a place
nobody has located.

## Adding a trip

```bash
cp -r template/trip-slug trips/<slug>   # fill in data.js, leave index.html alone
# add a matching entry to data/trips.js
node tools/validate.mjs                  # must exit clean
```

`template/trip-slug/data.js` is an annotated blank with every field explained.
[`docs/TRIP_SPEC.md`](docs/TRIP_SPEC.md) is the reference. If you're using
Claude Code, the `/new-trip` skill does all of it from a pasted itinerary.

## Why some things are blank on purpose

Some waypoints have no coordinates. That's deliberate, and the validator
enforces the shape of it: an unverified location is listed under a warning
rather than plotted on the map. A coordinate 200 metres off can route someone
to a locked gate on a one-lane road with no cell service. Same reasoning
applies to confirmation numbers, prices and opening hours — a blank makes you
look it up, a fabricated one doesn't.

`node tools/validate.mjs` is where the repo's prose rules become enforced
ones. Beyond registry/page consistency, coordinate sanity, verified-flag
mismatches and budget arithmetic, it checks that an `outline` carries the open
questions that make it an outline, that day dates are sequential and agree
with the registry, that every night has lodging, that header numbers match the
arrays they summarise, that a finished trip has a retro, that a gear question
still points at a trip that hasn't happened yet, and that nothing on the
declined list has crept back into an itinerary.

A rule stated only in prose is a rule enforced only by whoever happens to be
careful that day.
