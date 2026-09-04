# Trail Notes — travel & camping hub

Static site. No build step, no package manager, no dependencies. Open
`index.html` or serve the folder; GitHub Pages works as-is.

## Layout

```
index.html            hub — renders from data/trips.js + data/profile.js
data/trips.js         THE REGISTRY. every trip, planned or dreamed
data/profile.js       traveler profile, gear locker, checklist, booking windows,
                      AVAILABILITY (term dates → the Calendar tab's free windows)
css/base.css          shared tokens + primitives (theming via --t-* custom props)
css/hub.css           hub only
css/trip.css          trip pages only
js/themes.js          palette presets + applyTheme()
js/hub.js             hub renderer
js/trip.js            shared trip renderer — every trip page uses it unmodified
trips/<slug>/         one folder per trip: index.html (shell) + data.js (everything)
template/trip-slug/   annotated blank to copy
tools/validate.mjs    node tools/validate.mjs
docs/TRIP_SPEC.md     full schema + conventions
docs/TRIPFORMAT.md    the paste-in brief. Hand this to an upstream research
                      chatbot; it returns a filled version you paste here
```

## Working on this repo

- **Adding a trip?** Use the `/new-trip` skill
  (`.claude/skills/new-trip/SKILL.md`). Don't freestyle it.
- **The intake pipeline:** upstream chatbot fills `docs/TRIPFORMAT.md` →
  Colin pastes it here → `/new-trip` runs the confidence pass (`[V]`/`[U]`/`[?]`
  tags become verified data, prose, or open questions — never upgraded by
  vibes) → page ships. A `[U]` fact never becomes `verified: true`.
- **The hub wears `basecamp`; trips wear terrain.** `js/hub.js` calls
  `applyTheme("basecamp")` explicitly. Don't let a trip use it.
- **Content changes are data changes.** A trip's `data.js` holds everything;
  its `index.html` is a shell that must not be edited per-trip. Tabs generate
  from whichever data sections exist.
- **Every registry entry needs `months` and `mode`.** They're what the
  Calendar tab matches against; `window` prose is for humans, `months` is for
  the machine. A trip with no `months` can never be offered for a gap.
- **Run `node tools/validate.mjs` before committing.** Must exit 0.
- Leaflet is vendored in `vendor/leaflet/`. Don't add a CDN dependency —
  these pages get used where there's no signal.

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
