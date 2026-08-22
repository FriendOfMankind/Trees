# Full Circle Maui — Trip Plan

A static, single-page trip-planning site for a solo, 8-day / 7-night
counterclockwise camping loop around Maui (May 13–20, 2027), built from
[`maui2027tripspec.md`](https://claude.ai).

No build step, no dependencies to install — just open `index.html` in a
browser, or serve the folder statically (GitHub Pages works out of the box).

## What's here

- **Overview** — trip meta, route, quick stats.
- **Itinerary** — day-by-day cards: schedule, overnight, meals, highlights, warnings.
- **Map** — Leaflet map plotting every waypoint with a verified coordinate.
  Waypoints with unverified/blank coordinates are listed separately and
  **not** plotted (see "A note on data accuracy" below).
- **Lodging** — nightly campground summary table.
- **Hikes** — trail stats table.
- **Sun / Moon / Weather** — daily sun & moon tables plus regional averages.
- **Budget** — line-item cost breakdown.
- **Packing** — interactive checklist (state saved to `localStorage`, per browser).
- **Reservations** — interactive booking checklist (also saved to `localStorage`).
- **Notes** — the trip's safety/logistics notes (Piʻilani Hwy, Waioka Pond, moon phase, gear, altitude, solo protocol, closures, food, respect).

## Structure

```
index.html          # shell + tab markup
css/styles.css       # all styling (single stylesheet, no framework)
js/data.js           # all trip data, transcribed from the spec
js/app.js            # renders data.js into the DOM, tab switching, map, checklists
vendor/leaflet/       # Leaflet 1.9.4, vendored locally (no CDN dependency)
```

## A note on data accuracy

Per the source spec, some waypoints intentionally have **no coordinates**
(Kahului Airport, Makena Big Beach, Costco Kahului, Hāmoa Beach, Waioka
Pond, the Piʻilani Hwy east end, Grandma's Coffee House, and Komoda Store
& Bakery). These were left blank rather than guessed, because a wrong
coordinate can route someone to a locked gate on a one-lane road with no
cell service. They appear in the Map tab's "unverified" list instead of
as pins. If you fill these in, verify each one against a real source
(Google Maps, the official venue) first.

Camping confirmation numbers are similarly marked `TBD` — none of the
reservations described in the spec have been made yet (see the
Reservations tab).

## Editing the data

Everything content-wise lives in `js/data.js` as plain JS objects/arrays
(`TRIP`, `DAYS`, `LODGING`, `WAYPOINTS`, `HIKES`, `SUN_MOON`, `WEATHER`,
`BUDGET`, `PACKING`, `RESERVATIONS`, `NOTES`). Edit that file and reload —
`js/app.js` re-renders everything from it, so no HTML edits are needed for
content changes.
