---
name: new-trip
description: Build a trip page for this travel hub from a pasted itinerary, spec, or rough idea — or add a wishlist entry. Use when the user pastes trip notes, an itinerary markdown file, or asks to add / plan / flesh out a trip, a destination, or a wishlist item on this site.
---

# Build a trip page

You are adding a trip to Colin's travel and camping hub.

**The reference implementation is `trips/kentucky-2026/`.** It is the newest
page and the one that uses the current data shape: schedule rows carrying
`kind` / `est` / `maps` / `warn`, a `places` tab, a `provisions` block, and
`noSignal` on the days that have none. Maui 2027 was built first, is still
the best-written page for tone and for how blunt the risk notes should be,
and predates all of those fields — match Kentucky for structure and Maui for
voice. Building to Maui's structure alone will produce a page worse than the
last two.

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

## Step 0: triage the intake

What landed in the chat decides the procedure.

**A. A filled-in TRIPFORMAT doc** (has `## TRIP`, `## DAYS`, `## OPEN
QUESTIONS` headings and `[V]`/`[U]`/`[?]` tags — see
[`docs/TRIPFORMAT.md`](../../../docs/TRIPFORMAT.md)). This is the happy path.
Go to **Step 1**, then run the **confidence pass** below before writing a
single field.

**B. Raw notes, an itinerary, a wall of text.** Same procedure, but you have
no confidence tags, so treat *everything* as `[U]` until you verify it
yourself. Say so in the chat: "nothing in this is tagged, so I'm treating all
of it as unverified."

**C. A one-line idea** ("I want to do the Olympic Peninsula next summer").
Don't build a page from nothing. Either:
- add a six-line **wishlist** entry and stop, or
- **interview him** — ask the smallest set of questions that unblock a real
  page, in one batch, not one at a time. The questions that actually matter:
  dates or season window, how many nights, fly or drive, what the trip is
  *for* (a specific hike? a geology thing? a ruin?), and whether anything is
  already booked. Then go to Step 1.

Offer him `docs/TRIPFORMAT.md` if he doesn't already have it — running an
upstream research pass through that format is faster than an interview.

## The confidence pass — how tags become data

This is the whole point of the pipeline. **A tag never gets upgraded by
vibes.** Map them mechanically:

| Tag in the doc | What it becomes in `data.js` |
|---|---|
| `[V]` **with a source you can see** | Use it. Coordinates may be `verified: true`. Keep the source in `notes`. |
| `[V]` with no source attached | **Downgrade to `[U]`.** Say in the chat that you did. |
| `[U]` | Usable as prose. **Never** `verified: true`, never a printed price or gate hour without the word "approx" or a "verify with X" note. |
| `[?]` | `TBD`, `null` coordinates with `verified: false`, or an `openQuestions` entry. Never quietly filled in. |

Then **try to upgrade the tags yourself** using whatever tools this session
has. Don't skip this because it's tedious — it's the step that makes the page
worth carrying to a trailhead:

- **Trails, trailhead coordinates, distance and gain** → AllTrails tools
  (`search_trails_by_name`, `find_trails_near_location`, `get_trail_details`)
  if present. This is the single highest-value lookup available; it turns
  `[?]` hike rows into real coordinates.
- **Seasonal climate, high/low, conditions** → AccuWeather tools if present.
  Label it a seasonal pattern, not a forecast — a trip a year out has no
  forecast, and saying otherwise is a Rule 2 violation.
- **Campground hours, gate cutoffs, road status, booking windows, fees** →
  web search / fetch (Firecrawl or `WebSearch`/`WebFetch`) against the
  operator's own site: nps.gov, recreation.gov, the state park system, the
  ranger district. **Never a blog or an aggregator for a bookable fact.**
- **Anything you still can't confirm** → it stays `[?]` and becomes an open
  question. That is a successful outcome, not a failure.

If none of those tools exist in this session, say so plainly in the report
instead of quietly shipping `[U]` data as if you'd checked it.

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
`night` `savanna` `autumn`. If none fit, add a preset to `js/themes.js` rather
than inlining a one-off palette. **`basecamp` is the hub's own palette — never
assign it to a trip.**

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
- **the confidence ledger**: how many facts came in `[V]` / `[U]` / `[?]`,
  what you upgraded and with which tool, and what you had to downgrade
- **every fact you couldn't verify**, listed plainly
- what you'd research next, ranked — and which of those he can only get by
  phoning a ranger district, because those are the ones that don't resolve
  themselves

Don't bury uncertainty in the page and call it done.

## Quality bar

Schedule rows carry `kind` (the icon), real `time`s, `est` where a duration
matters, `maps` where there is a place to search for, and `warn: true` only
where rule 3 applies. Prefer an existing `kind` over inventing one; if none
fit, add it to `KIND_ICON` in `js/trip.js` so the next trip can reuse it.

Day titles are names, not labels: "Lava Dawn, Then East", not "Day 2 — driving
to Hāna". Schedule entries carry real times including calculated sunrise and
sunset. Trail notes describe surface, shade, water and turnaround logic, not
scenery. Budget line items must add to the subtotal — the validator checks it.

The `notes` array is where the page earns its keep: risk analysis with actual
numbers and a stated fallback, cultural context, the food strategy, the gear
reasoning. A page with a thin notes section is a page that hasn't been thought
about.
