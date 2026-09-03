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

## Checked state

Packing, reservations and the hub's universal checklist save to
`localStorage`, namespaced by slug. It's **per browser** — not synced, and
gone if you clear site data. Don't treat it as a record of what's booked;
treat it as a scratchpad. Anything that must survive goes in the data file.

Trip pages also write a small `<slug>.progress` blob so the hub can show a
booking progress bar on the card without loading every trip's data.
