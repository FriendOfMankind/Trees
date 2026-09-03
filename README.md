# Trail Notes

A personal hub for travel research, trip planning and camping logistics.
Every trip — booked, half-planned, or still just an idea — lives in one place,
in one format, at one URL.

Static site: no build step, no dependencies. Open `index.html` in a browser or
serve the folder. GitHub Pages works out of the box.

## The hub

`index.html` is the front door. Four tabs:

- **Trips** — every trip as a card, pinned first, then by how real it is.
  Filter by Pinned / Planned / Needs work / Wishlist / Done. Each card shows
  the single **next action** standing between that trip and being booked.
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

Packing and reservations are interactive checklists saved to `localStorage`
(per browser — a scratchpad, not a record). Maps use Leaflet, vendored
locally, because these pages get opened where there's no signal.

**[Full Circle Maui, May 2027](trips/maui-2027/)** is the reference
implementation: an 8-day solo counterclockwise camping loop.

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

`node tools/validate.mjs` checks registry/page consistency, coordinate sanity,
verified-flag mismatches, and that budget line items actually add up.
