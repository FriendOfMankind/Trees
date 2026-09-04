# TRIPFORMAT — trip research brief

> **Colin: paste this entire file into the other assistant, then add one line
> saying where you want to go and roughly when.** It comes back filled in.
> Paste the filled version into Claude Code here and the trip page gets built.
> Everything below this line is addressed to that other assistant.

---

You are researching a solo car-camping trip for a specific traveler. Your
output is not an itinerary for a reader — it is **structured input for another
system that will render it into a trail-ready page**. Follow the format
exactly. A beautifully written response in the wrong format is a failure.

## 1. Who this is for

Every recommendation must survive these constraints. They are not preferences.

| Constraint | Detail |
|---|---|
| Traveler | Solo. One person, one tent, one portion. |
| Home base | Avon, Ohio (west Cleveland). Drives measured from there; flights from **CLE**. |
| Vehicle | 2013 Subaru Legacy. AWD, **5.9 in clearance, low front air dam. NOT high-clearance.** |
| Camping style | **Car camping only.** Camp with the car, drive to trailheads, day hike. No hike-in nights, no permit lotteries, no wilderness quotas. |
| Daily ceiling | Soft ~10 mi / ~2,500 ft. Exceed only when the payoff justifies it. |
| Difficulty | Welcomes sustained *low-consequence* difficulty — scrambles, ladders, route-finding, wet rock. Wary of single *high-consequence* moves. |
| Crowds | Actively avoids. "Empty is cool if it's worth it." |
| Food | Cooks at camp by default. Restaurants only for a specific named dish. **No coffee. No beer.** Wants authentic local food and fresh dessert. |
| Trip shape | 2–5 campgrounds, 5–10 nights, 4–8 hikes. Occasional motel night for a shower. |
| Budget | $1–2k excluding airfare. |
| Rental cars | Under 25 — young-renter surcharge $15–35/day. Note it if the trip needs a rental. |
| Bonus | Ruins count as scenery. Coal towns, homesteads, tipples, ghost structures are destinations, not filler. |

**Access roads are a trip-breaker.** 5.9 inches of clearance. If a campground
or trailhead needs a rough forest road, say so explicitly — do not quietly
recommend it.

## 2. The three rules — these govern everything you write

**Rule 1 — Never invent a coordinate.** If you did not look up a lat/lng this
session, write `[?]` and leave it blank. A pin 200 m off routes someone to a
locked gate on a one-lane road with no cell service. Blank is correct. Guessed
is dangerous.

**Rule 2 — Never invent a bookable fact.** Prices, opening hours, gate cutoff
times, permit windows, phone numbers, confirmation policies. If you did not
verify it, tag it `[U]` or write `[?]`. A fabricated hour is worse than a
blank, because a blank makes him look it up.

**Rule 3 — Warnings are for what can hurt him or kill the day.** Gate cutoffs,
road closures, no-signal stretches, exposure, water crossings, flash-flood
corridors, altitude, ice. **Not "bring sunscreen."** If everything is a
warning, nothing is.

### Confidence tags — required on every factual line

Put one of these at the **end** of any line carrying a fact:

- `[V]` — **Verified.** You actually looked this up this session. **Must be
  followed by a source**, like `[V] nps.gov/hale/hours`. No source = not `[V]`.
- `[U]` — **Unverified.** From your training data. Plausible, current-ish,
  not checked. This is an honest and useful answer.
- `[?]` — **Unknown.** You don't know and couldn't find it. Also an honest
  and useful answer. Leave the value blank and tag it.

If you have no web access, **almost everything you write is `[U]`.** That is
fine. Tagging it `[V]` anyway is the single worst thing you can do to this
document, because downstream it will be printed as fact and carried to a
trailhead.

Do not smooth over disagreement. If a source contradicts what you remember,
write both and tag it `[U]` with a note.

---

## 3. The format — fill in every section below

Copy the structure exactly. Keep the `##` headings verbatim. Omit a section
only if it genuinely does not apply, and say why.

```markdown
## TRIP
slug:        <place-year, lowercase, hyphens — e.g. moab-2028>
title:       <short name, not a sentence>
subtitle:    <one line on the shape of it — e.g. "Solo, red rock, May 2028">
emoji:       <one emoji for the card>
terrain:     <ocean | desert | alpine | forest | night | savanna | autumn — pick by what the GROUND looks like, not the country>
dates:       <locked dates, or "not locked">
window:      <the season it must happen in, and why — e.g. "Mid-May: after snowmelt, before 100°F">
region:      <Region → Region>
country:     <country>
coords:      <region-level lat,lng for the index map. Region centroid is fine here — this one is display-only. [V]/[U]/[?]>
nights:      <e.g. "6 nights camping, 1 motel">
distance:    <total driving, round trip>
budget:      <estimate excluding airfare, or TBD>
tags:        <5-8 lowercase tags — e.g. car camping, slot canyons, ruins, solo>

## WHY
<One paragraph. The actual case for going — the specific geology, the specific
ruin, the specific thing you cannot see anywhere else. Not "stunning natural
beauty." If you can't make a specific case, say so and stop.>

## THE SHAPE
route:       <the loop or line in 1-2 sentences. State explicitly whether any road is driven twice — he hates driving a road twice.>
gettingThere: <flights/drive from Avon OH. Hours and rough airfare if flying. Tag it.>
vehicle:     <what he'd drive, and any road that his clearance rules out>

## DAYS
<One block per day. Real times. Include calculated sunrise and sunset — and if
you calculated them, tag [V] with the method; if you're recalling them, [U].>

### Day 1 — <A NAME, not a label. "Lava Dawn, Then East" beats "Day 2: driving">
date:      <Mon May 1, 2028>
type:      <travel | activity | activity + drive | rest>
tagline:   <one line on what this day actually is>
driving:   <~2h10m, 95 mi (Town A → Town B) — use Google estimate +15%>
overnight: <campground name | town | kind (state park/NPS/private/dispersed/motel) | cost | check-in or gate cutoff | booking status>
schedule:
  - 5:40 AM — First light [U]
  - 6:05 AM — Sunrise [U]
  - 6:30 AM — <what happens>
  - 8:12 PM — Sunset [U]
meals:     b: <made at camp / bought — place name / packed> | l: <...> | d: <...>
highlights: <why this day is worth doing. A named feature beats "great views".>
warnings:  <only Rule-3 material, with the number attached. Blank is fine.>
slack:     <how much margin this day has and what gets cut first if it runs late>

### Day 2 — ...
<repeat>

## WAYPOINTS
<Every place that needs to be on a map. One per line. THIS IS WHERE RULE 1
BITES — a blank coordinate is a correct answer.>

| name | lat | lng | tag | icon | days | notes |
|---|---|---|---|---|---|---|
| <Campground> | 38.57281 | -109.54994 | [V] recreation.gov/camping/... | ⛺ | 1,2 | <gate hours, phone, road surface — what you'd want standing at the gate> |
| <Trailhead> |  |  | [?] |  🥾 | 3 | <couldn't find coordinates — search "X trailhead" on AllTrails> |

## HIKES
| name | day | distance | gain | difficulty | time | tag | notes |
|---|---|---|---|---|---|---|---|
| <Trail> | 2 | 4.0 mi RT | 800 ft | Moderate | 2.5–3 hr | [U] | <SURFACE, SHADE, WATER, TURNAROUND LOGIC. Not scenery. "Zero shade, closed-toe shoes mandatory, dawn start" is the target.> |

## LODGING
| night | date | location | type | name | cost | booking window opens | tag |
|---|---|---|---|---|---|---|---|
| 1 | Mon 5/1 | <region> | <State park> | <name> | ~$25 | <when reservations open — this drives the whole to-do order> | [U] |

## WEATHER
| location | elevation | avg high | avg low | tag | notes |
|---|---|---|---|---|---|
| <region> | 5,200 ft | 78 | 48 | [U] | <seasonal pattern, not a forecast. Monsoon timing, snowmelt, heat curve.> |

## BUDGET
<Line items with numbers. They must ADD UP — a downstream validator checks the
arithmetic and will reject the trip if they don't. Exclude airfare and say so.>

| category | cost | tag | notes |
|---|---|---|---|
| Campgrounds, 6 nights | 150 | [U] | |
| Gas | 220 | [U] | ~1,600 mi @ 28 mpg |
| Groceries | 120 | [U] | |
subtotal: 490
buffer: 60   <10-15%>
total: 550
excludes: <airfare / rental car / etc>

## RESERVATIONS
<IN BOOKING-WINDOW ORDER, EARLIEST FIRST. The order carries information: the
first unchecked item is literally what to do next. Each line says WHAT to book,
WHEN the window opens, and WHAT HAPPENS IF HE MISSES IT.>
1. <Thing — window opens X — if missed, Y> [tag]
2. ...

## PACKING
<TRIP-SPECIFIC ONLY. He already owns a full car-camping kit — do not list
"tent, sleeping bag, headlamp." List what THIS destination demands that a
generic trip does not: a 20°F bag for altitude, sand stakes, a water filter for
a dry stretch, microspikes, a bear canister.>
- <Category>: <item — and why>

## WARNINGS
<Trip-level Rule-3 items that aren't tied to one day. Road closures by season,
no-signal corridors, fire bans, water availability, wildlife storage rules.>

## OPEN QUESTIONS
<THE MOST IMPORTANT SECTION. Everything you tagged [?] or couldn't resolve.
Do not pad it and do not hide gaps — an honest gap list is worth more than a
confident guess. Format:>
- **<the question>** — blocks: <Day 4 / the booking order / the whole route> — where to look: <specific site, office, or phone number>

## NOTES
<Long-form. This is where the brief earns its keep. Give me 3-6 sections of
real substance:>
- **Risk analysis** with actual numbers and a stated fallback, not vibes.
- **Geology / why the landscape looks like that** — this is his through-line.
- **Food strategy** — where to resupply, the one or two named dishes worth a
  restaurant, where the cooler gets block ice.
- **Cultural or historical context**, especially ruins and industrial history.
- **What you'd cut** if the trip has to lose a day.

## SOURCES
<Every URL you actually opened. If this list is empty, say so plainly at the
top of your response: "No web access — everything below is [U].">
```

---

## 4. Before you send it back — self-check

1. Is every `[V]` followed by a real source you actually opened? If not,
   downgrade it to `[U]`. **Do this pass explicitly.**
2. Does every coordinate you wrote come from a lookup? If not, delete the
   numbers and tag `[?]`.
3. Do the budget line items add to the subtotal?
4. Are the reservations in booking-window order, earliest first?
5. Is anything in WARNINGS actually just advice? Cut it.
6. Does any recommended road need more than 5.9 inches of clearance? Flag it.
7. Is OPEN QUESTIONS honestly full, or did you paper over gaps?

An outline with twelve open questions is a **good** deliverable. A polished
plan with invented gate hours is a **bad** one. Optimize accordingly.
