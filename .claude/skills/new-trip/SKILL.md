---
name: new-trip
description: Build a trip page for this travel hub from a pasted itinerary, spec, or rough idea — or add a wishlist entry. Use when the user pastes trip notes, an itinerary markdown file, or asks to add / plan / flesh out a trip, a destination, or a wishlist item on this site.
---

# Build a trip page

You are adding a trip to Colin's travel and camping hub. The Maui 2027 page
(`trips/maui-2027/`) is the reference implementation — when in doubt about
tone, density, or how blunt to be, open it and match it.

Read [`docs/TRIP_SPEC.md`](../../../docs/TRIP_SPEC.md) for the full schema.
This file is the procedure.

## The three rules (do not negotiate with these)

1. **Never invent a coordinate.** `verified: false`, `lat: null, lng: null` is
   the correct answer when you don't know. The renderer lists those under a
   warning instead of plotting them. Only set `verified: true` for a
   coordinate you actually looked up this session.
2. **Never invent a bookable fact.** Confirmation numbers, prices, opening
   hours, permit windows. Write `TBD`, an explicit `approx` range, or name the
   source to check. A blank makes him look it up; a fabricated hour doesn't.
3. **Warnings are for what can hurt him or kill the day.** Gate cutoffs,
   closures, no-signal stretches, exposure, water, flash flood corridors,
   altitude. Not "bring sunscreen."

Where the source material and your own knowledge disagree, say so in the
chat — don't silently pick one.

## Procedure

### 1. Read the source and the profile

Read whatever was pasted, then `data/profile.js`. The profile is what makes an
itinerary his rather than a listicle: solo, camping-first, dawn starts, no road
driven twice, geology as the through-line, groceries over restaurants, one hard
day then a recovery day, $1–2k excluding airfare, flying from CLE, under-25
rental car friction.

If the source contradicts a principle, that's fine — but say why in a note on
the page. Don't quietly drop it.

### 2. Decide the status honestly

- **planned** — you can write a real day-by-day with times. Ship the full page.
- **outline** — you can write most of it but there are genuine gaps. Ship the
  page *with* an `openQuestions` array. This is the honest status for most
  first passes and it is not a failure.
- **wishlist** — not enough to build a day-by-day. Add a registry entry only,
  `page: null`. Six lines. Don't pad it into a fake itinerary.

Choosing `planned` when you had to invent half the times is the main way this
system goes bad. Prefer `outline` and list the gaps.

### 3. Build it

```
cp -r template/trip-slug trips/<slug>
```

Slug is `<place>-<year>`, lowercase, hyphens: `maui-2027`, `moab-2028`.

Fill `trips/<slug>/data.js`. Do **not** edit `trips/<slug>/index.html` — it's a
20-line shell, identical for every trip, and the tabs generate themselves from
the data that exists.

Pick a theme by terrain, not country: `ocean` `desert` `alpine` `forest`
`night` `savanna`. If none fit, add a seventh preset to `js/themes.js` rather
than inlining a one-off palette.

### 4. Register it

Add an entry to `data/trips.js`. The `next` field matters most — it's the
single action standing between this trip and being booked, and it's what shows
on the hub card. "Enter the permit lottery, opens January" beats "plan more".

Order `reservations` by booking window, earliest first, so the first unchecked
box is always the next thing to do.

### 5. Validate and look at it

```
node tools/validate.mjs
```

Must exit clean. Then actually open the page — check the tabs render, the map
has pins, the day cards aren't empty.

### 6. Report

Tell him, in the chat and briefly:
- what you built and what status you gave it
- **every fact you couldn't verify**, listed plainly
- what you'd research next, ranked

Don't bury uncertainty in the page and call it done.

## Quality bar

Day titles are names, not labels: "Lava Dawn, Then East", not "Day 2 — driving
to Hāna". Schedule entries carry real times including calculated sunrise and
sunset. Trail notes describe surface, shade, water and turnaround logic, not
scenery. Budget line items must add to the subtotal — the validator checks it.

The `notes` array is where the page earns its keep: risk analysis with actual
numbers and a stated fallback, cultural context, the food strategy, the gear
reasoning. A page with a thin notes section is a page that hasn't been thought
about.
