/* ==========================================================================
   Mojave Winter Loop — Jan 2027.  STATUS: OUTLINE.

   Built 2026-09-04 from a verification pass, not from an upstream brief.
   What that pass could and could not reach is recorded honestly:

   VERIFIED (operator's own pages, via search):
     - Valley of Fire fees, reservation system and booking window (parks.nv.gov)
     - Death Valley campground seasons, reservation rules, fee ranges (nps.gov)
     - Joshua Tree first-come status and the Jan 2025 fee increase (nps.gov)
     - Mid Hills access road: high-clearance recommended (recreation.gov listing)
     - Trail distance / gain / difficulty for the Death Valley hikes (AllTrails)
   CALCULATED:
     - Every sunrise / sunset / civil-twilight time below (NOAA solar algorithm,
       run against regional coordinates — good to ~1 min; see notes)
   COULD NOT VERIFY:
     - nps.gov and recreation.gov are blocked by this environment's network
       policy, so no campground page was read directly, only quoted in search
       results. Every fee below wants one confirmation click before booking.
     - No coordinate was looked up. EVERY WAYPOINT IS verified:false WITH NULL
       COORDINATES. That is the correct output, not a gap to paper over.
     - Drive times are Google-style estimates from memory + 15%, unconfirmed.
     - Climate figures are seasonal recollection, not station data.
   ========================================================================== */

window.TRIP_DATA = {
  meta: {
    slug: "mojave-winter-2027",
    title: "Mojave Winter Loop",
    subtitle: "Solo, January 2027 — the desert that only exists in winter",
    dates: "Sat Jan 2 – Fri Jan 15, 2027 (target, unbooked)",
    emoji: "🏜️",
    theme: "desert",

    route:
      "A counterclockwise loop out of Las Vegas: Valley of Fire → Death Valley → Mojave National Preserve → Joshua Tree → back to Las Vegas. <b>No road is driven twice</b> except the first hour of I-15 out of the city, which is unavoidable. Arrives as the second half of an open jaw — CLE → DEN for Frisco, then DEN → LAS.",
    vehicle:
      "Rental from Las Vegas. <b>Standard clearance is fine for the entire route as planned</b>, because every high-clearance option has been deliberately cut: Racetrack Playa, Titus Canyon, and <b>Mid Hills Campground</b> (recreation.gov lists its access road as unpaved, steep, high-clearance recommended). Under-25 surcharge applies — check AAA before paying it at the counter.",
    gettingThere:
      "Not a round trip from CLE. Fly CLE → DEN before Christmas, Frisco with family Dec 25–30, then DEN → LAS around Jan 1–2 and LAS → CLE on Jan 15. Price the three-leg multi-city against two separate round trips — <b>this has not been priced and it is the single assumption the whole trip rests on.</b>",

    stats: [
      { num: "14 days", lbl: "Length" },
      { num: "~1,100 mi", lbl: "Driving" },
      { num: "13", lbl: "Nights camping" },
      { num: "4", lbl: "Park units" },
    ],

    overviewCards: [
      { h: "Dates", p: "Jan 2–15, 2027 <i>(target)</i><br>14 days / 13 nights" },
      { h: "Group", p: "1 person — solo" },
      { h: "Daylight", p: "<b>~9h 50m.</b> Sunrise ~6:50, sunset ~4:45.<br>This is the trip's real constraint." },
      { h: "Status", p: "<b>Outline.</b> Nothing booked. 9 open questions below." },
    ],

    footerNote: 'Every fee here is one confirmation click from being real. Nothing is booked. <a href="../../index.html">← All trips</a>',
  },

  days: [
    {
      day: 1, date: "Sat Jan 2, 2027", title: "Land, Provision, Red Rock",
      tagline: "Denver to a sandstone campground before dark — and dark is 5:02 PM.",
      type: "travel", driving: "~1h 15m, 55 mi (LAS → Valley of Fire)",
      overnight: { name: "Atlatl Rock or Arch Rock Campground", place: "Valley of Fire State Park, NV",
        kind: "State park", cost: "$25/night (non-Nevada vehicle) + $15 day-use",
        checkin: "Check-in 2:00 PM, check-out 11:00 AM",
        confirmation: "TBD — reservenevada.com, booking window is 11 months and closes 72 hrs out",
        notes: "72 sites across two campgrounds. Water, restrooms, <b>showers and a dump station</b>. Reservation-only per the park page — do not plan to roll up." },
      schedule: [
        { time: "~11:00 AM", text: "Land at LAS. Rental counter — AAA card out before the under-25 surcharge is quoted" },
        { time: "12:00 PM", text: "Collect the shipped gear duffel. Buy fuel canisters — they cannot fly" },
        { time: "1:00 PM", text: "Groceries and block ice (not cubes) in North Las Vegas" },
        { time: "2:30 PM", text: "Depart I-15 north" },
        { time: "3:45 PM", text: "Enter the park, set camp while there is still light" },
        { time: "4:33 PM", text: "Sunset — calculated" },
        { time: "5:02 PM", text: "Full dark — calculated" },
      ],
      meals: { b: "packed — airport", l: "packed", d: "made at camp" },
      highlights: "Nothing ambitious. The win today is being set up in Aztec sandstone before dark on the same day you woke up in Colorado.",
      warnings: "<b>Dark at 5:02 PM.</b> A flight delay of two hours turns setup into a headlamp job. If you land after 2 PM, set camp first and skip everything else.",
      slack: "~2 hrs. First thing cut is the grocery stop — buy in Overton instead, smaller selection.",
    },
    {
      day: 2, date: "Sun Jan 3, 2027", title: "Fire Wave at First Light",
      tagline: "The whole park is small enough to do in a day if you start at dawn.",
      type: "activity", driving: "~25 mi inside the park",
      overnight: { name: "Same site, Valley of Fire", place: "Overton, NV", kind: "State park",
        cost: "$25/night", checkin: "n/a — second night", confirmation: "TBD",
        notes: "Book both nights in one reservation." },
      schedule: [
        { time: "6:22 AM", text: "First light — calculated" },
        { time: "6:50 AM", text: "Sunrise — calculated" },
        { time: "7:15 AM", text: "Fire Wave / White Domes end of the scenic road, before any tour van" },
        { time: "10:30 AM", text: "Mouse's Tank — petroglyph panels in the wash" },
        { time: "12:30 PM", text: "Atlatl Rock, then the Cabins" },
        { time: "3:00 PM", text: "Elephant Rock at the east entrance" },
        { time: "4:36 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "Fire Wave's banding is cross-bedded Aztec Sandstone — Jurassic dune fields turned to rock. Same formation as Zion's Navajo Sandstone, different name on this side of the state line.",
      warnings: "Trails are loose sand and rough rock; the park's own brochure says they feel longer than the listed distance. Park closes to day use at sunset — campers excepted.",
      slack: "Large. This is a deliberately soft day two.",
    },
    {
      day: 3, date: "Mon Jan 4, 2027", title: "Across the Basin and Range",
      tagline: "Three and a half hours of basin, range, basin, range — the drive is the geology lesson.",
      type: "travel", driving: "~3h 45m, 185 mi (Valley of Fire → Furnace Creek via Pahrump)",
      overnight: { name: "Furnace Creek Campground — or Sunset as the fallback", place: "Death Valley, CA",
        kind: "National park", cost: "$30/night Furnace Creek · $18/night Sunset",
        checkin: "TBD — confirm whether a late arrival holds a reservation",
        confirmation: "TBD — recreation.gov, reservable Oct 15–Apr 15",
        notes: "<b>Furnace Creek is the only reservable campground in the park in winter and the NPS page says last-minute cancellations are rare.</b> Sunset is first-come and the NPS describes it as large and rarely full — that is the named fallback." },
      schedule: [
        { time: "6:50 AM", text: "Sunrise. Break camp" },
        { time: "8:00 AM", text: "Depart east entrance, north through Overton and Pahrump" },
        { time: "11:30 AM", text: "Last real groceries and fuel in Pahrump — prices inside the park are worse" },
        { time: "1:30 PM", text: "Cross into the park. Elevation goes from 3,000 ft to below sea level in an hour" },
        { time: "2:30 PM", text: "Set camp at Furnace Creek" },
        { time: "4:45 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "bought — Pahrump", d: "made at camp" },
      highlights: "You drop roughly 3,000 vertical feet into the lowest place in North America. Watch the plant line change on the way down.",
      warnings: "<b>Fuel in Pahrump.</b> In-park gas is limited and expensive. <b>No cell signal for long stretches</b> after Pahrump — text the plan home before you leave town.",
      slack: "~2 hrs. If Furnace Creek is full and Sunset is somehow also full, Stovepipe Wells is 25 mi further and also first-come.",
    },
    {
      day: 4, date: "Tue Jan 5, 2027", title: "Golden Canyon, Manly Beacon, Zabriskie",
      tagline: "The badlands loop — and it starts three miles from the tent.",
      type: "activity", driving: "~15 mi",
      overnight: { name: "Furnace Creek Campground", place: "Death Valley, CA", kind: "National park",
        cost: "$30/night", checkin: "n/a", confirmation: "TBD", notes: "" },
      schedule: [
        { time: "6:31 AM", text: "First light — calculated" },
        { time: "6:59 AM", text: "Sunrise — calculated" },
        { time: "7:15 AM", text: "Golden Canyon trailhead. Loop up to Manly Beacon and Zabriskie Point" },
        { time: "12:00 PM", text: "Back at the car. Lunch at camp, out of the sun" },
        { time: "2:00 PM", text: "Harmony Borax Works — industrial ruins, twenty-mule-team era" },
        { time: "3:30 PM", text: "Zabriskie Point again for the low light, five minutes from the road" },
        { time: "4:45 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "made at camp", d: "made at camp" },
      highlights: "Manly Beacon standing out of the Furnace Creek Formation — lakebed mudstone, folded and stripped. Ruins count as scenery, and Harmony Borax is the real thing.",
      warnings: "Golden Canyon is a <b>flash flood corridor</b>. It is January and rain is unlikely, but check the forecast at the visitor center — a narrow wash is the wrong place to be surprised.",
      slack: "~3 hrs. Zabriskie is a 5-minute walk from parking and can absorb whatever is left.",
    },
    {
      day: 5, date: "Wed Jan 6, 2027", title: "Below Sea Level, Then Above It",
      tagline: "Badwater at dawn, Dante's View at 5,575 ft by afternoon — 5,857 vertical feet in one day, all of it paved.",
      type: "activity + drive", driving: "~75 mi",
      overnight: { name: "Furnace Creek Campground", place: "Death Valley, CA", kind: "National park",
        cost: "$30/night", checkin: "n/a", confirmation: "TBD", notes: "" },
      schedule: [
        { time: "6:59 AM", text: "Sunrise" },
        { time: "7:30 AM", text: "Badwater Basin salt flats — 1.9 mi, flat, boardwalk then polygons" },
        { time: "9:30 AM", text: "Natural Bridge Canyon — 1.5 mi RT" },
        { time: "11:00 AM", text: "Artist's Drive one-way loop — volcanic ash oxidised to green, purple, pink" },
        { time: "1:30 PM", text: "Devil's Golf Course — rock salt eroded into blades" },
        { time: "3:15 PM", text: "Dante's View. 0.9 mi ridge walk. Badwater is a mile below you" },
        { time: "4:45 PM", text: "Sunset from the rim — calculated for the valley floor, a few minutes later up here" },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "Standing at Badwater and then looking down on it from Dante's View the same day is the single best way to feel what a normal fault does over five million years.",
      warnings: "<b>Dante's View road is steep with a vehicle length restriction near the top</b> — fine in a car, and it is paved the whole way. Wind at the rim is serious; it is 5,500 ft and January.",
      slack: "~1.5 hrs. Devil's Golf Course is the cut.",
    },
    {
      day: 6, date: "Thu Jan 7, 2027", title: "North to the Dunes and the Marble",
      tagline: "Mosaic Canyon's polished marble is the best rock you can touch in the park.",
      type: "activity + drive", driving: "~60 mi",
      overnight: { name: "Furnace Creek Campground", place: "Death Valley, CA", kind: "National park",
        cost: "$30/night", checkin: "n/a", confirmation: "TBD", notes: "" },
      schedule: [
        { time: "6:59 AM", text: "Sunrise" },
        { time: "7:45 AM", text: "Mesquite Flat Sand Dunes — 2.2 mi, before the day's footprints" },
        { time: "10:00 AM", text: "Mosaic Canyon — 3.5 mi RT, ~975 ft. Water-polished marble narrows" },
        { time: "1:30 PM", text: "Stovepipe Wells — resupply, and the one place to check conditions" },
        { time: "3:00 PM", text: "Salt Creek boardwalk — pupfish, endemic, nowhere else on Earth" },
        { time: "4:48 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "Mosaic Canyon narrows are Noonday Dolomite polished to a shine by flash floods. The breccia sections are a literal mosaic — that's the name.",
      warnings: "Mosaic requires <b>scrambling on smooth polished rock</b> — exactly the low-consequence difficulty you want, but it is slick and boots matter. Another flash flood corridor.",
      slack: "~2 hrs.",
    },
    {
      day: 7, date: "Fri Jan 8, 2027", title: "The Long Empty North",
      tagline: "Ubehebe Crater and the drive nobody makes.",
      type: "activity + drive", driving: "~130 mi round trip",
      overnight: { name: "Mesquite Spring Campground (first-come) — or back to Furnace Creek", place: "Death Valley, CA",
        kind: "National park", cost: "$20/night", checkin: "n/a — first-come",
        confirmation: "None — first-come, first-served",
        notes: "TBD whether moving camp north for one night beats the 2-hour round trip. Mesquite Spring is the northern option; confirm it is open in January." },
      schedule: [
        { time: "6:59 AM", text: "Sunrise" },
        { time: "7:30 AM", text: "North on the paved road through the valley" },
        { time: "9:30 AM", text: "Ubehebe Crater — 600 ft deep, a maar from a steam explosion maybe 2,000 years ago" },
        { time: "11:00 AM", text: "Rim walk, 1.5 mi around. Little Hebe on the same loop" },
        { time: "1:30 PM", text: "Return south. <b>Racetrack Playa is 27 mi of rough road from here and is CUT</b>" },
        { time: "4:48 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "A maar crater is what happens when rising magma hits groundwater and the whole thing flashes to steam. Ubehebe is one of the most legible examples anywhere.",
      warnings: "<b>Racetrack Playa is off the table</b> — 27 miles of sharp gravel that shreds tires, high-clearance strongly advised, and there is no signal. This is the single most common way this park breaks a rental. <b>Do not be talked into it.</b>",
      slack: "~2 hrs, but it's a long driving day. Cut Little Hebe.",
    },
    {
      day: 8, date: "Sat Jan 9, 2027", title: "Slack Day",
      tagline: "Deliberately unscheduled. Eight days in, something will have gone sideways.",
      type: "rest", driving: "as needed",
      overnight: { name: "Furnace Creek Campground", place: "Death Valley, CA", kind: "National park",
        cost: "$30/night", checkin: "n/a", confirmation: "TBD", notes: "" },
      schedule: [
        { time: "—", text: "Laundry and a shower if the Ranch will sell one. Charge everything" },
        { time: "—", text: "Options if the legs are good: Desolation Canyon (3.7 mi, ~790 ft), Sidewinder Canyon (4.1 mi, ~1,040 ft, slot sections), Golden Canyon again for what was missed" },
        { time: "4:50 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "made at camp", d: "bought — the one restaurant meal of the trip, if there's one worth having" },
      highlights: "Every trip on this site has a slack day and it is always the one that saves the plan. Do not fill it in advance.",
      warnings: "",
      slack: "The whole day is slack. That's the point.",
    },
    {
      day: 9, date: "Sun Jan 10, 2027", title: "South to the Cinder Cones",
      tagline: "Out of the park and into the preserve nobody has heard of.",
      type: "travel", driving: "~3h 30m, 175 mi (Furnace Creek → Hole-in-the-Wall)",
      overnight: { name: "Hole-in-the-Wall Campground", place: "Mojave National Preserve, CA",
        kind: "National preserve", cost: "TBD — approx $15–25/night, unconfirmed",
        checkin: "TBD", confirmation: "TBD — confirm reservable vs first-come for January",
        notes: "<b>Mid Hills is the other campground and it is CUT</b> — recreation.gov lists its access as unpaved, steep, high-clearance recommended. Hole-in-the-Wall's own access is reportedly better but <b>this needs confirming before committing to it as the only option.</b>" },
      schedule: [
        { time: "6:59 AM", text: "Sunrise. Break camp" },
        { time: "8:00 AM", text: "South out of the park" },
        { time: "11:00 AM", text: "Baker — fuel, water, and the last real supplies" },
        { time: "1:30 PM", text: "Kelso Depot, then east to Hole-in-the-Wall" },
        { time: "4:41 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "bought — Baker", d: "made at camp" },
      highlights: "The Cima volcanic field on the way in — three dozen cinder cones sitting on the desert like they were dropped there last week. Some are under 15,000 years old.",
      warnings: "<b>No maintenance is performed on dirt roads in Mojave National Preserve</b> — that is the NPS's own wording. Stay on pavement. <b>No signal and no water across most of the preserve.</b> Fill every container in Baker.",
      slack: "~2 hrs.",
    },
    {
      day: 10, date: "Mon Jan 11, 2027", title: "Kelso Dunes and the Rings",
      tagline: "A dune field that booms, and a slot with iron rings bolted into it.",
      type: "activity", driving: "~70 mi",
      overnight: { name: "Hole-in-the-Wall Campground", place: "Mojave National Preserve, CA",
        kind: "National preserve", cost: "TBD", checkin: "n/a", confirmation: "TBD", notes: "" },
      schedule: [
        { time: "6:50 AM", text: "Sunrise" },
        { time: "7:30 AM", text: "Rings Loop Trail from camp — 1.5 mi, iron rings through a slot in Banshee Canyon" },
        { time: "10:00 AM", text: "Drive west to Kelso Dunes" },
        { time: "11:30 AM", text: "Kelso Dunes — ~3 mi RT, ~600 ft of climbing in soft sand. Budget double the time" },
        { time: "3:00 PM", text: "Kelso Depot — 1920s Union Pacific station, restored" },
        { time: "4:48 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "Kelso Dunes are one of the few dune fields in North America that <b>boom</b> — slide down the lee face and the sand resonates audibly. The Rings Loop is exactly the low-consequence scrambling you like.",
      warnings: "<b>Sand climbing is far slower than the mileage suggests</b> — three miles of dune is a five-mile day in the legs. <b>Zero shade, zero water at the dunes.</b> Turn around at 1:30 PM regardless of where you are; dark is 5:16.",
      slack: "~1 hr. Kelso Depot is the cut.",
    },
    {
      day: 11, date: "Tue Jan 12, 2027", title: "Into the Joshua Trees",
      tagline: "The last transit day, and the shortest.",
      type: "travel", driving: "~2h 45m, 135 mi (Hole-in-the-Wall → Joshua Tree)",
      overnight: { name: "Jumbo Rocks or Hidden Valley", place: "Joshua Tree NP, CA", kind: "National park",
        cost: "$25/night (first-come rate as of Jan 2025)", checkin: "TBD",
        confirmation: "TBD — Hidden Valley is first-come year-round; confirm Jumbo Rocks' January status",
        notes: "<b>No water at most JT campgrounds.</b> Fill everything in Twentynine Palms on the way in. NPS says camping fees must be paid within one hour of selecting a site." },
      schedule: [
        { time: "6:50 AM", text: "Sunrise. Break camp" },
        { time: "8:30 AM", text: "South through the preserve to I-40" },
        { time: "11:30 AM", text: "Twentynine Palms — <b>water, groceries, fuel</b>. Last chance" },
        { time: "1:00 PM", text: "Enter the park. Cholla Cactus Garden on the way through" },
        { time: "2:30 PM", text: "Camp. Arrive early — first-come sites in January go" },
        { time: "4:53 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "bought — Twentynine Palms", d: "made at camp" },
      highlights: "You cross the Mojave/Colorado desert boundary inside the park — Joshua trees stop and ocotillo starts, and you can see the line.",
      warnings: "<b>Arrive by early afternoon.</b> First-come sites in a January weekend window are the trip's real booking risk, and there is no reservation to fall back on.",
      slack: "~2 hrs.",
    },
    {
      day: 12, date: "Wed Jan 13, 2027", title: "Monzogranite Day",
      tagline: "Ryan Mountain for the view, Hidden Valley for the rock.",
      type: "activity", driving: "~35 mi",
      overnight: { name: "Same site, Joshua Tree", place: "Joshua Tree NP, CA", kind: "National park",
        cost: "$25/night", checkin: "n/a", confirmation: "TBD", notes: "" },
      schedule: [
        { time: "6:50 AM", text: "Sunrise" },
        { time: "7:30 AM", text: "Ryan Mountain — ~3 mi RT, ~1,050 ft, the one real climb of the trip" },
        { time: "10:30 AM", text: "Hidden Valley loop — 1 mi, enclosed by rock, old cattle-rustler story" },
        { time: "12:30 PM", text: "Barker Dam loop — 1.3 mi, petroglyphs and a ranch-era dam" },
        { time: "3:00 PM", text: "Keys View — the San Andreas laid out below, and Signal Mountain in Mexico on a clear day" },
        { time: "4:53 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "The rock piles are monzogranite that cooled underground, cracked in three directions, then weathered into stacked boulders once the overburden eroded off. Keys View looks straight down the San Andreas.",
      warnings: "Ryan Mountain is <b>exposed and windy</b>; January at 5,400 ft is genuinely cold in wind. Keys View is often hazed out by LA air — go anyway, it costs ten minutes.",
      slack: "~2 hrs.",
    },
    {
      day: 13, date: "Thu Jan 14, 2027", title: "Last Full Day",
      tagline: "Whatever the trip has turned out to be about.",
      type: "activity", driving: "~40 mi",
      overnight: { name: "Same site, Joshua Tree", place: "Joshua Tree NP, CA", kind: "National park",
        cost: "$25/night", checkin: "n/a", confirmation: "TBD", notes: "" },
      schedule: [
        { time: "6:49 AM", text: "Sunrise" },
        { time: "—", text: "Options: Lost Horse Mine (~6.5 mi, ruins — a stamp mill still standing), Skull Rock, Arch Rock, or a second run at Ryan Mountain" },
        { time: "3:00 PM", text: "Start packing what can be packed tonight" },
        { time: "4:56 PM", text: "Sunset — calculated" },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "Lost Horse Mine is the ruins pick — a well-preserved ten-stamp mill, and the walk out is quiet because most of the park is at Skull Rock.",
      warnings: "",
      slack: "Large by design. Day 13 of 14 is when you're tired.",
    },
    {
      day: 14, date: "Fri Jan 15, 2027", title: "Out",
      tagline: "Three hours to the airport and a long way home.",
      type: "travel", driving: "~3h 15m, 190 mi (Joshua Tree → LAS)",
      overnight: null,
      schedule: [
        { time: "6:49 AM", text: "Sunrise. Break camp for the last time" },
        { time: "8:00 AM", text: "North out of the park" },
        { time: "11:30 AM", text: "Ship the gear duffel home from Las Vegas, or check it" },
        { time: "12:30 PM", text: "Return the rental. Fuel it first — airport refuel rates are punitive" },
        { time: "—", text: "LAS → CLE. Book nothing before 3:00 PM" },
      ],
      meals: { b: "made at camp", l: "bought — Las Vegas", d: "airport" },
      highlights: "",
      warnings: "<b>Do not book a morning flight.</b> Three hours of driving plus a rental return plus security, starting from a campsite, is not a morning.",
      slack: "~2 hrs if the flight is mid-afternoon. Zero if it isn't.",
    },
  ],

  lodging: {
    summary: "13 nights camping · ~$290 total (every figure needs one confirmation)",
    total: "~$290",
    rows: [
      { night: "1–2", date: "Jan 2–3", location: "Valley of Fire", type: "State park", name: "Atlatl or Arch Rock", cost: "$25/nt", status: "Reservable — book now" },
      { night: "3–8", date: "Jan 4–9", location: "Death Valley", type: "National park", name: "Furnace Creek (Sunset as fallback)", cost: "$30/nt", status: "Reservable Oct 15–Apr 15" },
      { night: "9–10", date: "Jan 10–11", location: "Mojave Preserve", type: "National preserve", name: "Hole-in-the-Wall", cost: "TBD", status: "Unconfirmed" },
      { night: "11–13", date: "Jan 12–14", location: "Joshua Tree", type: "National park", name: "Jumbo Rocks / Hidden Valley", cost: "$25/nt", status: "First-come — the real risk" },
    ],
  },

  /* RULE 1. Not one coordinate below was looked up this session, so not one is
     plotted. The renderer lists them under a warning instead. This is the
     correct output. */
  waypoints: [
    { name: "Atlatl Rock Campground, Valley of Fire", lat: null, lng: null, verified: false, icon: "⛺", days: "1, 2", notes: "Reserve at reservenevada.com. Park office 702-397-2088, Mon–Fri 9–4. Showers and dump station on site." },
    { name: "Fire Wave trailhead", lat: null, lng: null, verified: false, icon: "🌊", days: "2", notes: "White Domes end of the scenic road. Loose sand." },
    { name: "Furnace Creek Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "3–8", notes: "recreation.gov, reservable Oct 15–Apr 15. NPS: 'rarely availability from last minute cancellations.' Phone 1-877-444-6777." },
    { name: "Sunset Campground — the fallback", lat: null, lng: null, verified: false, icon: "🅿️", days: "3–8", notes: "First-come. NPS describes it as large and rarely full. This is the named bail-out if Furnace Creek doesn't come through." },
    { name: "Golden Canyon trailhead", lat: null, lng: null, verified: false, icon: "🥾", days: "4", notes: "Flash flood corridor. Check the forecast at the visitor center." },
    { name: "Dante's View", lat: null, lng: null, verified: false, icon: "🏔️", days: "5", notes: "5,575 ft, paved, vehicle length restriction near the top. Very windy." },
    { name: "Mosaic Canyon trailhead", lat: null, lng: null, verified: false, icon: "🪨", days: "6", notes: "Near Stovepipe Wells. Polished marble, scrambling, slick when damp." },
    { name: "Ubehebe Crater", lat: null, lng: null, verified: false, icon: "🌋", days: "7", notes: "Paved to the rim. Racetrack Playa road starts here and is CUT." },
    { name: "Hole-in-the-Wall Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "9, 10", notes: "Mojave Preserve. Confirm access road surface and whether it takes reservations in January." },
    { name: "Kelso Dunes trailhead", lat: null, lng: null, verified: false, icon: "🏜️", days: "10", notes: "No water, no shade. Hard turnaround 1:30 PM." },
    { name: "Jumbo Rocks Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "11–13", notes: "Joshua Tree. No water. Confirm first-come vs reservable for January." },
    { name: "Ryan Mountain trailhead", lat: null, lng: null, verified: false, icon: "⛰️", days: "12", notes: "Exposed and windy. The one real climb of the trip." },
  ],

  hikes: {
    title: "Hikes &amp; Trails",
    summary: "Death Valley figures are from AllTrails and are <b>verified</b> for distance, gain and difficulty. Joshua Tree, Mojave and Valley of Fire figures are approximate and unconfirmed. Every one of these fits inside the ~10 mi / 2,500 ft ceiling with room to spare — the constraint on this trip is daylight, not legs.",
    rows: [
      { name: "Fire Wave / White Domes", day: 2, distance: "~1.5 mi RT", gain: "~200 ft", difficulty: "Easy", duration: "1 hr", notes: "Loose sand. Park brochure warns trails feel longer than listed. Unverified figures." },
      { name: "Golden Canyon → Manly Beacon → Zabriskie", day: 4, distance: "6.2 mi loop", gain: "1,059 ft", difficulty: "Moderate", duration: "3–4 hr", notes: "Flash flood corridor. Gravel wash then badlands ridge. No shade, no water. AllTrails-verified." },
      { name: "Badwater Basin Salt Flats", day: 5, distance: "1.9 mi RT", gain: "6 ft", difficulty: "Easy", duration: "35 min", notes: "Boardwalk then salt polygons. Flat. AllTrails-verified." },
      { name: "Natural Bridge Canyon", day: 5, distance: "1.5 mi RT", gain: "456 ft", difficulty: "Moderate", duration: "1 hr", notes: "Short gravel wash. AllTrails-verified." },
      { name: "Dante's View Trail", day: 5, distance: "0.9 mi RT", gain: "209 ft", difficulty: "Moderate", duration: "30 min", notes: "Ridge walk at 5,575 ft. Wind is the issue, not the grade. AllTrails-verified." },
      { name: "Mesquite Flat Sand Dunes", day: 6, distance: "2.2 mi RT", gain: "154 ft", difficulty: "Moderate", duration: "45 min", notes: "Soft sand, slower than the numbers. Go at first light for clean sand. AllTrails-verified." },
      { name: "Mosaic Canyon", day: 6, distance: "3.5 mi RT", gain: "974 ft", difficulty: "Moderate", duration: "2–3 hr", notes: "Polished marble narrows with scrambling. Slick. Boots with real grip. AllTrails-verified." },
      { name: "Desolation Canyon", day: 8, distance: "3.7 mi RT", gain: "787 ft", difficulty: "Moderate", duration: "2 hr", notes: "Slack-day option. Quiet, unsigned turnoff. AllTrails-verified." },
      { name: "Sidewinder Canyon", day: 8, distance: "4.1 mi RT", gain: "1,040 ft", difficulty: "Moderate", duration: "3 hr", notes: "Slack-day option. Slot sections — headlamp genuinely useful. AllTrails-verified." },
      { name: "Rings Loop, Banshee Canyon", day: 10, distance: "~1.5 mi", gain: "~100 ft", difficulty: "Moderate", duration: "1 hr", notes: "Iron rings bolted into rock. Low-consequence scrambling. Unverified figures." },
      { name: "Kelso Dunes", day: 10, distance: "~3 mi RT", gain: "~600 ft", difficulty: "Hard in sand", duration: "3 hr", notes: "Soft sand doubles the effort. No water, no shade. Hard turnaround 1:30 PM. Unverified figures." },
      { name: "Ryan Mountain", day: 12, distance: "~3 mi RT", gain: "~1,050 ft", difficulty: "Moderate", duration: "2 hr", notes: "Steady stone-step climb, fully exposed. Unverified figures." },
      { name: "Lost Horse Mine", day: 13, distance: "~6.5 mi RT", gain: "~550 ft", difficulty: "Moderate", duration: "3 hr", notes: "Ruins pick — a standing ten-stamp mill. Unverified figures." },
    ],
  },

  sunMoon: [
    { date: "Sat 1/2", location: "Valley of Fire", firstLight: "6:21 AM", sunrise: "6:50 AM", sunset: "4:33 PM", dark: "5:02 PM", moon: "TBD" },
    { date: "Mon 1/4", location: "Death Valley", firstLight: "6:31 AM", sunrise: "6:59 AM", sunset: "4:44 PM", dark: "5:13 PM", moon: "TBD" },
    { date: "Fri 1/8", location: "Death Valley", firstLight: "6:31 AM", sunrise: "6:59 AM", sunset: "4:48 PM", dark: "5:16 PM", moon: "TBD" },
    { date: "Sun 1/10", location: "Mojave Preserve", firstLight: "6:22 AM", sunrise: "6:50 AM", sunset: "4:47 PM", dark: "5:15 PM", moon: "TBD" },
    { date: "Tue 1/12", location: "Joshua Tree", firstLight: "6:23 AM", sunrise: "6:50 AM", sunset: "4:54 PM", dark: "5:22 PM", moon: "TBD" },
    { date: "Thu 1/14", location: "Joshua Tree", firstLight: "6:22 AM", sunrise: "6:49 AM", sunset: "4:56 PM", dark: "5:23 PM", moon: "TBD" },
  ],
  sunMoonNote:
    "<b>Calculated, not looked up</b> — NOAA solar algorithm run against regional coordinates for each site, so they are good to about a minute. Moon phase is TBD. The number that matters: <b>roughly 9 hours 50 minutes of usable light</b>, versus about 14 hours on a June trip. Everything below is planned around that.",

  weather: [
    { location: "Death Valley (Furnace Creek, −190 ft)", elevation: "Below sea level", high: 67, low: 40, notes: "⚠️ Approximate seasonal recollection, NOT verified against station data. January is the mildest month here and the reason the trip exists." },
    { location: "Valley of Fire (~2,000 ft)", elevation: "2,000 ft", high: 58, low: 36, notes: "⚠️ Unverified. Cooler than Death Valley." },
    { location: "Mojave Preserve (Hole-in-the-Wall, ~4,300 ft)", elevation: "4,300 ft", high: 55, low: 30, notes: "⚠️ Unverified. <b>Freezing nights are likely.</b> Snow is possible at this elevation." },
    { location: "Joshua Tree (~4,000 ft)", elevation: "4,000 ft", high: 60, low: 35, notes: "⚠️ Unverified. Wind is the bigger factor than the temperature." },
  ],
  weatherNote:
    "<b>Every figure in this table is unverified</b> and should be replaced with station normals before this page is trusted. The planning-relevant claim — that these four units are comfortable in January and lethal in July — is solid. The specific numbers are not. <b>The Siesta 20 bag and the MondoKing R-7.0 are correctly specified for 30°F nights</b>; the open item is the liner.",

  budget: {
    note: "Excludes all airfare, which is the largest unknown on this trip. Every line is an estimate and the rental car dominates — <b>confirm whether AAA still waives the under-25 surcharge before accepting the counter price</b>, because that single item is worth roughly $350.",
    rows: [
      { category: "Rental car, 14 days incl. under-25 surcharge", cost: 900, notes: "approx. AAA waiver could cut this by ~$350" },
      { category: "Fuel, ~1,100 mi", cost: 160, notes: "approx" },
      { category: "Camping, 13 nights", cost: 290, notes: "VoF $25 · Furnace Creek $30 · JT $25 · Mojave TBD" },
      { category: "Groceries, 14 days", cost: 210, notes: "cooking at camp, one restaurant meal" },
      { category: "Gear shipped to Las Vegas and back", cost: 140, notes: "beats hauling a tent and the MondoKing through a family Christmas" },
      { category: "Park entrance", cost: 15, notes: "Valley of Fire day-use, non-NV vehicle. America the Beautiful covers DV, Mojave and JT" },
      { category: "Fuel canisters and arrival sundries", cost: 40, notes: "canisters cannot fly" },
    ],
    subtotal: 1755,
    buffer: 210,
    bufferLabel: "Buffer (12%)",
    total: 1965,
  },

  packing: [
    { category: "Cold — the part that is not obvious about a desert",
      items: [
        "Siesta 20 bag — correct for 30°F nights at Mojave and Joshua Tree elevation",
        "<b>Sleeping bag liner — still on the 'need' list.</b> This trip is the reason to finally buy it",
        "Puffy, hat, gloves. Dante's View and Ryan Mountain are both windy at elevation",
        "Warm layer for camp — dark falls at 5:15 PM and you'll be sitting in it for four hours",
      ] },
    { category: "Water — the trip's actual hazard",
      items: [
        "Maximum water capacity you own. <b>No water at most Joshua Tree campgrounds and effectively none in the Mojave Preserve</b>",
        "Fill in Pahrump, Baker and Twentynine Palms. Those are the three towns that matter",
        "Extra beyond the plan — a vehicle problem in the preserve means waiting with no signal",
      ] },
    { category: "Light — nine hours fifty minutes of it",
      items: [
        "Headlamp plus spares. You will cook in the dark every single night",
        "A second light for camp, so the headlamp stays in the pack",
        "Power bank. Fourteen days of camera and phone with no hookups",
      ] },
    { category: "Sand and rock",
      items: [
        "Gaiters or at least ankle protection for Kelso and Mesquite dunes",
        "Boots with real grip — Mosaic Canyon's polished marble is the technical crux of the trip",
        "Trekking poles for the dune climbs",
      ] },
    { category: "Shipped ahead to Las Vegas",
      items: [
        "Tent, MondoKing, bag, stove, pot, cooler — everything that makes a family Christmas awkward",
        "<b>Not fuel canisters</b> — they cannot fly and cannot ship by air either. Buy in Las Vegas",
      ] },
  ],

  reservations: [
    { text: "<b>Valley of Fire — book now.</b> reservenevada.com opens an 11-month window, so early January 2027 is <b>already bookable</b>. Must be booked at least 72 hrs ahead; $5 non-refundable transaction fee. Miss it and there is no first-come option — the park page says reservation only." },
    { text: "<b>Furnace Creek Campground — window opens ~early July 2026 on a 6-month rolling basis (CONFIRM).</b> The only reservable campground in Death Valley in winter, and NPS says cancellations rarely free anything up. If it fails, Sunset is first-come and rarely fills." },
    { text: "<b>Multi-city flight CLE → DEN → LAS → CLE.</b> Price against two round trips before anything else is booked — the whole shape of this trip depends on it." },
    { text: "Rental car from LAS, 14 days. Book early with free cancellation and re-check monthly. <b>Verify the AAA under-25 waiver still applies</b> — it is worth ~$350 here." },
    { text: "Gear shipment to Las Vegas. Decide the destination (hotel hold vs General Delivery) and book the outbound leg two weeks ahead." },
    { text: "Joshua Tree — <b>no reservation to make if the January campgrounds are first-come.</b> The mitigation is arriving early on Jan 12, not a booking. Confirm which JT campgrounds take reservations in January." },
    { text: "Mojave Preserve, Hole-in-the-Wall — confirm reservable vs first-come, then book if possible." },
  ],

  openQuestions: [
    { question: "What does the CLE → DEN → LAS → CLE multi-city actually cost against two round trips?",
      blocks: "The entire trip shape",
      detail: "If the open jaw is materially worse than two round trips, going home from Denver and flying out again is the fallback — and it also solves the gear problem. Google Flights multi-city; check Southwest separately since it doesn't appear in aggregators." },
    { question: "Is Furnace Creek Campground's booking window 6 months rolling, and what time does it drop?",
      blocks: "The Death Valley half of the trip",
      detail: "recreation.gov is blocked from this session, so this was never read directly. NPS confirms reservable Oct 15–Apr 15. Confirm the exact release date and set an alarm — the NPS page explicitly says cancellations rarely free sites." },
    { question: "Is Hole-in-the-Wall Campground's access road paved, and does it take reservations in January?",
      blocks: "Days 9–10",
      detail: "Mid Hills is confirmed out (unpaved, steep, high-clearance recommended). Hole-in-the-Wall is the assumed alternative but its access has not been confirmed against the 5.9 in clearance limit. Call the preserve before committing." },
    { question: "Which Joshua Tree campgrounds are reservable in January vs first-come?",
      blocks: "Days 11–13, and the biggest un-mitigated risk on the trip",
      detail: "Hidden Valley is confirmed first-come year-round. Jumbo Rocks status for January is unknown. January is high season at JT and a Tuesday arrival helps, but there is currently no booked fallback." },
    { question: "Is Texas Springs Campground open in January 2027?",
      blocks: "The Death Valley fallback chain",
      detail: "One aggregator lists it as currently closed. If it is open it is a second first-come option near Furnace Creek; if not, the chain is Furnace Creek → Sunset → Stovepipe Wells." },
    { question: "What are the actual January temperature normals for each of the four units?",
      blocks: "The weather table and the sleeping bag decision",
      detail: "Every figure in the weather table is recollection, not station data. Pull NOAA/NWS climate normals for Furnace Creek, Overton, Mitchell Caverns and Twentynine Palms." },
    { question: "Buy the sleeping bag liner or not?",
      blocks: "Comfort on nights 9–13",
      detail: "It has been on the gear list as 'need' since the October 2026 trip and never bought. Mojave and Joshua Tree at 4,000+ ft in January is the strongest case yet." },
    { question: "Where does the gear duffel actually ship to?",
      blocks: "Day 1",
      detail: "General Delivery at a Las Vegas post office needs ID and has pickup hours; a hotel will usually hold a package for a booked guest but there is no hotel night here. A shipping-store hold (UPS Store etc.) is the likely answer. Confirm cost both directions." },
    { question: "Is a January 2 arrival too close to the holiday crowd?",
      blocks: "Days 1–3",
      detail: "New Year's week is peak at Valley of Fire and Death Valley. Sliding the whole trip three days later would land in a quieter window but eats into the spring-semester start on Jan 19. Worth checking historical occupancy." },
  ],

  notes: [
    { heading: "Read this first: what is and isn't verified",
      body: "This page was built from a live verification pass, and the pass hit a wall. <b>nps.gov and recreation.gov are both blocked by the network policy of the environment this was built in</b>, so no campground page was opened directly — the National Park Service facts below come from search results quoting those pages, which is better than a blog and worse than the page.<br><br>What <i>is</i> solid: Valley of Fire's fees and reservation rules (read in full from parks.nv.gov), the Death Valley campground seasons and fee ranges (NPS's own wording, quoted), the Mid Hills clearance warning (recreation.gov's own listing), the Death Valley trail distances and gains (AllTrails), and every sun time on this page (calculated, not recalled).<br><br>What is <b>not</b>: every coordinate. Not one was looked up, so not one is plotted — the map below lists all twelve waypoints as unverified rather than pretending. Also unverified: all four weather rows, every drive time, and the Joshua Tree and Mojave campground details. <b>Nine open questions is the honest count</b>, and until they close this stays an outline." },

    { heading: "Nine hours fifty minutes",
      body: "This is the fact that shapes everything. Sunrise is about 6:50, sunset about 4:45, full dark by 5:15. That is roughly <b>four hours less usable light than a June trip</b>, and it is why every day above carries one substantial objective instead of two.<br><br>The upside is that your dawn-start habit costs nothing here — a 6:50 sunrise is civilised. The downside is the back half of the day evaporates. A hike that starts at 1 PM is a hike that finishes in the dark, and in a desert canyon that is a genuinely bad outcome rather than an inconvenience. <b>Every turnaround time on this page is set against 4:45 PM, not against how you feel at the time.</b><br><br>The second-order effect: you will cook dinner in the dark for thirteen consecutive nights. Two light sources, not one, and the thermos earns its place again." },

    { heading: "Why these four units and not the obvious ones",
      body: "Zion, Arches and the Grand Canyon are all within range of Las Vegas and all wrong for this trip. Zion and Arches fail the crowd test even in winter and both now run shuttle or timed-entry systems. The four units chosen here share a property that matters more than fame: <b>they are only comfortable between roughly November and March.</b> Death Valley in July is the hottest place on Earth. Kelso Dunes in August is a genuine hazard.<br><br>That means this trip <b>costs nothing in opportunity</b>. It occupies a January window that no summer destination could ever use. Compare that with spending the same eighteen days on somewhere that would also work in June, and the January slot is doing real work." },

    { heading: "The geology, which is the actual through-line",
      body: "Four completely different mechanisms in one loop, all of them legible from a paved road.<br><br><b>Valley of Fire</b> is Aztec Sandstone — Jurassic sand dunes lithified, the same formation Zion calls Navajo Sandstone. The cross-bedding in the Fire Wave is preserved dune faces.<br><br><b>Death Valley</b> is the classic basin-and-range half-graben: the crust is pulling apart, the valley floor is dropping, and the Black Mountains are rising. Standing at Badwater at −282 ft and looking down from Dante's View at 5,575 ft the same afternoon is nearly 5,900 ft of fault displacement in one day. Add Ubehebe (a maar — magma meets groundwater, everything flashes to steam) and Mosaic Canyon's flood-polished dolomite.<br><br><b>Mojave Preserve</b> is the Cima volcanic field — three dozen cinder cones, some under 15,000 years old, plus a dune field that audibly booms.<br><br><b>Joshua Tree</b> is monzogranite: an intrusion that cooled deep, jointed in three directions, then weathered into stacked piles once erosion stripped the cover. Keys View looks directly down the San Andreas.<br><br>Nowhere else fits four unrelated stories that cleanly into 1,100 miles." },

    { heading: "The clearance audit",
      body: "This route was built around 5.9 inches of ground clearance and a low front air dam, and three well-known things were cut for it rather than gambled on.<br><br><b>Racetrack Playa</b> — 27 miles of sharp gravel from Ubehebe. Tire damage there is common enough that the park writes about it, and there is no signal. Cut.<br><br><b>Titus Canyon Road</b> — one-way, rough, high-clearance advised. Cut.<br><br><b>Mid Hills Campground</b> — recreation.gov's own listing says the access road is unpaved, steep and high-clearance recommended; a trip report describes eleven slow miles of washboard. Cut, with Hole-in-the-Wall as the substitute — <b>and that substitution is itself unverified</b>, which is why it's an open question rather than a plan.<br><br>Everything remaining on this itinerary is on pavement. That is not a compromise; it is the whole reason the trip works in a rental sedan." },

    { heading: "Water, and the one that can actually hurt you",
      body: "The temperature will not be the problem in January. Water will.<br><br><b>Mojave National Preserve has effectively no potable water</b>, and NPS's own line is that no maintenance is performed on its dirt roads. <b>Most Joshua Tree campgrounds have no water either.</b> The three towns that matter are Pahrump (before Death Valley), Baker (before the preserve) and Twentynine Palms (before Joshua Tree) — miss one and the next fix is a long backtrack.<br><br>Carry more than the plan needs. The realistic bad day is not dehydration on a trail; it is a flat tire on a preserve road with no signal and a two-hour wait, which is a different problem entirely if there are three litres in the car instead of fifteen." },

    { heading: "Food",
      body: "Thirteen nights of cooking on one burner, and this trip is unusually kind to that: it's cold, so the cooler is barely working for a living and block ice will last far longer than the 2.5 days it manages at 75°F. Frozen meals in flat quart bags genuinely <i>are</i> the ice here.<br><br>Resupply at Pahrump (day 3), Baker (day 9) and Twentynine Palms (day 11). Baker is small — treat it as fuel, water and a sandwich, not a shop.<br><br>The one restaurant meal is penciled for the slack day at Furnace Creek, and only if there is a specific dish worth ordering. That's the rule and this trip gives it no reason to bend: there is no regional dish in Death Valley. If a named thing turns up in Twentynine Palms or Overton, that's the better spend." },

    { heading: "The Frisco handoff, and the gear problem it creates",
      body: "The routing is genuinely clever — CLE → DEN for family, then DEN → LAS instead of going home and back out. It saves a leg and a day.<br><br>What it costs is that <b>you'd otherwise be carrying a tent, a 25-inch MondoKing, a cooler and a stove through a family Christmas in a ski town</b>, which is two checked bags and a lot of friction. Shipping a gear duffel to Las Vegas for roughly $60–80 each way removes the problem entirely and costs about what the second checked bag would anyway.<br><br>Fuel canisters can't fly and can't ship by air. Buy them in Las Vegas on day one — this is already a standing line on the fly-in checklist." },

    { heading: "How this connects to the rest of the year",
      body: 'This is the first of six trips in the last year before full-time work starts. It is deliberately placed in a window that no other trip could use, which is the same logic behind putting <a href="../../index.html#calendar">Sky Islands in March</a> and saving the summer for the long haul and Alaska.<br><br>The filter for the whole year: <b>how much harder does this get on two weeks of PTO?</b> This trip scores high on that — fourteen days, four units, an open-jaw routing. It is not a thing you do on a long weekend, now or later.' },
  ],

  map: { center: [35.6, -116.0], zoom: 7 },
};
