# Trip Spec

How a trip page gets built on this site, what the data has to look like, and
the rules that make the output trustworthy.

If you're Claude and someone just pasted an itinerary at you: read
[`.claude/skills/new-trip/SKILL.md`](../.claude/skills/new-trip/SKILL.md)
instead — it's the operational version of this document. This file is the
reference.

---

## The three rules

Everything else is layout. These are the reason the pages are worth carrying
to a trailhead.

**1. Never invent a coordinate.** `verified: false` with `lat: null, lng: null`
is the correct output when you don't know. The renderer lists unverified
waypoints separately, under a warning, instead of plotting them. A pin 200 m
off routes someone to a locked gate on a one-lane road with no signal.

**2. Never invent a fact that looks bookable.** Confirmation numbers, prices,
opening hours, permit windows. Write `TBD`, or an explicit range with
"approx", or name the source to check. A fabricated hour is worse than a
blank, because a blank makes you look it up.

**3. Warnings are for what can hurt you or kill the day.** Gate cutoff times,
road closures, no-signal stretches, exposure, water, flash flood corridors,
altitude. Not "bring sunscreen". If everything is a warning, nothing is.

Corollary: when something is genuinely risky and the traveler has chosen to do
it anyway, the page's job is to state the real numbers and the fallback — not
to nag and not to stay silent. See the Piʻilani Highway note on the Maui trip
for the tone.

---

## Repo layout

```
index.html            the hub — renders from data/trips.js + data/profile.js
data/trips.js         THE REGISTRY. every trip, planned or dreamed
data/profile.js       traveler profile, gear locker, universal checklist, booking windows
css/base.css          shared tokens + primitives (theme lives in --t-* vars)
css/hub.css           hub only
css/trip.css          trip pages only
js/themes.js          palette presets + applyTheme()
js/hub.js             hub renderer
js/trip.js            shared trip renderer — every trip page uses this, unmodified
trips/<slug>/         one folder per trip: index.html (20-line shell) + data.js
template/trip-slug/   annotated blank to copy
tools/validate.mjs    node tools/validate.mjs — run before committing
vendor/leaflet/       Leaflet 1.9.4, vendored, no CDN
```

No build step, no dependencies. Open `index.html` in a browser or serve the
folder. GitHub Pages works as-is.

---

## Adding a trip: the five steps

1. `cp -r template/trip-slug trips/<slug>`
2. Fill in `trips/<slug>/data.js`. Don't touch `index.html` — it's a shell.
3. Add a registry entry to `data/trips.js`.
4. `node tools/validate.mjs`
5. Open the hub and click through it.

The trip's `index.html` never changes between trips. Tabs are generated from
whichever data sections exist, so a trip with no `hikes` array has no Hikes
tab. Add data → get a tab.

---

## Registry entry (`data/trips.js`)

| field | required | notes |
|---|---|---|
| `slug` | yes | matches the folder name and `meta.slug` |
| `title` | yes | |
| `subtitle` | | one line on the shape of it |
| `emoji` | | the card and favicon glyph |
| `theme` | | `ocean` `desert` `alpine` `forest` `night` `savanna` |
| `status` | yes | `planned` \| `outline` \| `wishlist` \| `done` |
| `pinned` | | floats it above everything on the hub |
| `page` | | `"trips/<slug>/"`, or `null` for a wishlist entry |
| `dates` | | locked dates, or `null` |
| `window` | | the season it has to happen in, when dates aren't locked |
| `region`, `country` | | |
| `coords` | | `[lat, lng]` — **display only**, region-level is fine |
| `nights`, `distance`, `budget` | | short strings for the card stat row |
| `tags` | | lowercase, reused across trips so they mean something |
| `why` | | the one-paragraph case for going |
| `next` | | **the single next action.** This is the most useful field on the hub |
| `updated` | | `YYYY-MM-DD` |

### Statuses

- **planned** — the itinerary is real, day by day, and you could leave on it.
- **outline** — a page exists with gaps. It must carry an `openQuestions`
  array; that's what makes it an outline rather than a bad plan.
- **wishlist** — an idea, no page. Enough detail to decide whether to build it.
- **done** — it happened. Keep it; the gear lessons are the point.

Pins live in git, not in browser storage, so they survive a new laptop and
they're the same on your phone.

---

## Trip data (`trips/<slug>/data.js`)

Sets one global: `window.TRIP_DATA`. Required: `meta`, `days`. Everything else
is optional — omit a section and its tab disappears.

`template/trip-slug/data.js` is the annotated canonical shape; read it rather
than duplicating the field list here. Two things it can't show you:

- **`meta.labels.hikes`** renames the Hikes tab for trips that aren't about
  hiking (`"Dives"`, `"Climbs"`, `"Paddles"`).
- **`notes[].body` and `warnings` may contain inline HTML**, including links
  to other trips. Use it — cross-linking is half the value of a hub.

The Maui file declares plain consts and assembles `window.TRIP_DATA` at the
bottom. New trips should use the template's direct-object shape; both produce
the same object and the renderer doesn't care.

### Section-by-section, what "good" looks like

**days** — the core. Each day gets a `title` that's a name, not a description
("Lava Dawn, Then East", not "Day 2: driving"), a `tagline` that says what the
day actually is, and a `schedule` with real times. Sunrise and sunset go in the
schedule as calculated times. Meals are `made` / `bought — place name` /
`packed`, because that determines the grocery stops.

**waypoints** — rule 1 applies hardest here. `icon` is one emoji that says what
kind of place it is at a glance. `notes` should carry what you'd want standing
at the gate: hours, phone number, road condition.

**hikes** — `notes` is for surface, shade, water and turnaround logic, not
scenery. "Zero shade, closed-toe shoes mandatory, dawn start" beats "gorgeous".

**routes / trails** — the lines on the map. Both are generated; see "Maps and
routing" below. Never hand-write geometry.

**budget** — line items must add to `subtotal`; the validator checks this.
Add a buffer of 10–15%. `note` says what's excluded (usually airfare).

**packing** — trip-specific only. Universal gear lives in the hub's Gear
Locker. Call out the weak link in the category name if there is one.

**reservations** — **in booking-window order, earliest first.** The order
carries information: the first unchecked item is literally what to do next.
Each line should say what to book, when the window opens, and what happens if
you miss it.

**openQuestions** — required for `outline` status. Each is a real question with
what it `blocks` and where to look for the answer. Delete the section when it
empties and flip the status to `planned`.

**notes** — the long-form. Risk analysis with real numbers, cultural context,
food strategy, gear reasoning. This is where the page earns its keep.

---

## Themes

Six presets in `js/themes.js`, chosen by terrain rather than by country:
`ocean` (reef, wet volcanic coast), `desert` (red rock, slot canyons),
`alpine` (granite, glacier, above treeline), `forest` (temperate rainforest),
`night` (dark sky, aurora, winter), `savanna` (grassland, dry heat).

Pick by what the ground looks like. Opening a page should tell you within half
a second whether you're looking at lava or granite. Adding a preset means
adding twelve hex values to `THEMES` — do that rather than inventing a
one-off inline palette, so the next trip can reuse it.

---

## Maps and routing

The map draws three things: verified waypoints as pins, `routes` as solid
lines, `trails` as dashed ones. All three are static data in `data.js`. **The
page never calls a routing service at load**, and that's deliberate — a route
you fetch on demand is a route you don't have in a hollow with no bars, which
is the one place you need it. Baking it also makes the line reviewable in a
diff instead of trusting a service to answer the same way next time.

### Being honest about offline

Leaflet is vendored so the library works without signal. **Map tiles are not.**
They stream from `tile.openstreetmap.org`, so offline you get your pins and
your lines floating on grey. That is worth knowing before you rely on it:

- The map is a **planning tool** — used at a table, with signal.
- In the field, the Maps deep links and a downloaded offline region in a real
  navigation app do the work. `offlineRegions` on a trip says which to grab.

Pre-rendering tiles into the repo was considered and rejected: OSM's tile
policy forbids bulk downloading, and it would add tens of megabytes per trip.

### The shape

```js
routes: [                        // driving legs — tools/route.mjs
  {
    id: "camp-olowalu--la-perouse-bay",   // unique within the trip
    label: "Camp Olowalu → La Pérouse Bay",
    mode: "driving",             // "driving" | "hiking"
    days: "2",
    distanceMi: 21.4,
    durationMin: 47,             // driving only
    source: "openrouteservice/driving-car",   // REQUIRED — see below
    generated: "2026-09-05",
    geometry: "…encoded polyline…",
  },
],
trails: [                        // hikes as mapped — tools/trail.mjs
  {
    id: "auxier-ridge",
    label: "Auxier Ridge Trail",
    mode: "hiking",
    days: "2",
    distanceMi: 4.28,
    source: "osm/way 12345,12346",
    generated: "2026-09-05",
    geometry: ["…seg…", "…seg…"],  // one string, or an array of them
  },
],
```

`geometry` is an [encoded polyline](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)
at precision 5 (~1 m). Raw `[lat,lng]` arrays are roughly ten times the bytes
and turn `data.js` into a wall of numbers. A trail is usually several OSM ways
kept as separate segments rather than stitched, because guessing the join order
can draw a line through a cliff.

`source` is **required** and the validator enforces it. A line is more
persuasive than a pin — it looks surveyed even when it isn't — so every one has
to say which tool and service drew it. A line nobody can trace back is a line
nobody can re-check when a road closes.

### Generating it

```bash
node tools/geocode.mjs kentucky-2026 --near 37.78,-83.63   # find coordinates
node tools/geocode.mjs kentucky-2026 --near 37.78,-83.63 --write
node tools/route.mjs   kentucky-2026 --write                # driving legs
node tools/trail.mjs   kentucky-2026 --near 37.78,-83.63 --write
node tools/validate.mjs
```

Every tool previews by default and only touches `data.js` with `--write`.
`route.mjs` chains verified waypoints in array order, which is itinerary order
by convention.

Optional free keys, set as environment variables. Without them you get OSM
only, which is never enough to reach VERIFIED on its own:

| Variable | Get one at | Covers |
|---|---|---|
| `RIDB_API_KEY` | ridb.recreation.gov/profile | federal campgrounds, USFS/NPS/BLM/Corps facilities |
| `NPS_API_KEY` | nps.gov/subjects/developer | park campgrounds, visitor centers, places |
| `ORS_API_KEY` | openrouteservice.org/dev | driving and hiking routing, 2000/day |

`route.mjs --engine osrm` needs no key at all but is driving-only, and OSRM's
public demo server asks you not to build on it.

### When a coordinate earns `verified: true`

Rule 1 says never invent a coordinate. `geocode.mjs` mechanises the bar:

- **VERIFIED** — an official agency dataset has it, **or** two *independent*
  providers agree within `--tolerance` (150 m default).
- **REVIEW** — something was found but not enough to trust. Printed for you to
  judge. **Never written**, whatever `--write` says.
- **NONE** — nothing found. The waypoint stays null, which is a correct answer.

**Independence is the whole game.** Overpass and Nominatim are both
OpenStreetMap — Nominatim is a geocoder built on OSM data — so they share the
provider id `osm` and count once between them. Two OSM lookups agreeing is one
source agreeing with itself. RIDB and NPS are separate federal datasets and
each count on their own. OSM alone is REVIEW, never VERIFIED: it is often more
precise than the official number, but it is community-edited.

This is not paranoia. Searching for one campground turned up
`37.787058, -83.623989` (a day-use lot) and `37.7840317, -83.6326338` (the
campground) — **833 m apart**, both real, both plausible, and one of them will
route you to the wrong turning in the dark.

### Trails are transcribed, not routed

`trail.mjs` pulls the named way's actual geometry out of OSM rather than asking
a foot-routing engine to find a path. A router given two ends of a trail always
returns *a* path — down a service road, across a different trail, the long way
round a ridge — whether or not the real one is mapped. Transcribing gives you
the true line or nothing, and "this trail isn't mapped" is information.

Page names and OSM names differ ("Auxier Ridge out-and-back" vs "Auxier Ridge
Trail"), so the tool tries progressively looser forms and tells you which one
matched. Check that it matched the trail you meant — it also cross-checks the
mapped length against the `distance` in your `hikes` row and flags a big gap.

---

## Checked state

Packing, reservations and the hub's universal checklist save to
`localStorage`, namespaced by slug. It's **per browser** — not synced, and
gone if you clear site data. Don't treat it as a record of what's booked;
treat it as a scratchpad. Anything that must survive goes in the data file.

Trip pages also write a small `<slug>.progress` blob so the hub can show a
booking progress bar on the card without loading every trip's data.
