# Trail Notes — travel & camping hub

Static site. No build step, no package manager, no dependencies. Open
`index.html` or serve the folder; GitHub Pages works as-is.

## Layout

```
index.html            hub — renders from data/trips.js + data/profile.js
data/trips.js         THE REGISTRY. every trip, planned or dreamed
data/profile.js       traveler profile, gear locker, universal checklist, booking windows
css/base.css          shared tokens + primitives (theming via --t-* custom props)
css/hub.css           hub only
css/trip.css          trip pages only
js/themes.js          palette presets + applyTheme()
js/hub.js             hub renderer
js/trip.js            shared trip renderer — every trip page uses it unmodified
trips/<slug>/         one folder per trip: index.html (shell) + data.js (everything)
template/trip-slug/   annotated blank to copy
tools/validate.mjs    node tools/validate.mjs
tools/geocode.mjs     find + verify waypoint coordinates (never invents one)
tools/route.mjs       bake driving geometry between verified waypoints
tools/trail.mjs       transcribe a hike's real shape from OSM
tools/lib/            shared: polyline codec, distance, provider lookups
docs/TRIP_SPEC.md     full schema + conventions
```

## Working on this repo

- **Adding a trip?** Use the `/new-trip` skill
  (`.claude/skills/new-trip/SKILL.md`). Don't freestyle it.
- **Content changes are data changes.** A trip's `data.js` holds everything;
  its `index.html` is a shell that must not be edited per-trip. Tabs generate
  from whichever data sections exist.
- **Run `node tools/validate.mjs` before committing.** Must exit 0.
- Leaflet is vendored in `vendor/leaflet/`. Don't add a CDN dependency —
  these pages get used where there's no signal. Note the limit of that: the
  *library* works offline, the *tiles* don't — they stream from OSM. So the
  map is a planning tool, and the field answer is the Maps links plus a
  downloaded offline region. Don't imply otherwise on a page.
- **Map lines are generated, never hand-written.** `routes` and `trails` come
  from `tools/route.mjs` and `tools/trail.mjs` and are baked into `data.js`;
  nothing is fetched at page load. A drawn line looks surveyed even when it
  isn't, so every one carries a `source` and the validator enforces it.

## Non-negotiables

1. **Never invent a coordinate.** `verified: false` with null lat/lng is the
   correct output for an unknown location. Unverified waypoints are listed
   under a warning, not plotted. A pin 200 m off routes someone to a locked
   gate on a one-lane road with no cell service.
2. **Never invent a bookable fact** — confirmation numbers, prices, opening
   hours, permit windows. `TBD`, an explicit range, or name the source.
3. **Warnings are for what can hurt someone or kill the day**, not general
   advice. If everything is a warning, nothing is.
4. **`outline` is an honest status.** A page with an `openQuestions` list beats
   a `planned` page with invented times. Say what you don't know.
