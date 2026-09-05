/* ==========================================================================
   TRIP TEMPLATE — copy this folder to trips/<slug>/ and fill it in.

   Rendered by ../../js/trip.js. Every top-level section is OPTIONAL except
   `meta` and `days`: leave a section out (or as an empty array) and its tab
   simply doesn't appear. A four-day roadside camping trip with no hikes and
   no budget breakdown is a perfectly valid page.

   THE THREE RULES THAT MAKE THESE PAGES WORTH TRUSTING
   ----------------------------------------------------
   1. Never invent a coordinate. verified:false with lat/lng null is the
      correct output when you don't know. The renderer lists those separately
      as "not plotted" instead of pretending.
   2. Never invent a confirmation number, price, or opening hour. Use "TBD",
      or a range with the word "approx", or say where to check.
   3. Warnings are for things that can actually hurt you or blow up the day —
      closures, cutoff times, no-signal stretches, exposure, water. Not
      "bring sunscreen". If everything is a warning, nothing is.
   ========================================================================== */

window.TRIP_DATA = {
  /* ---- REQUIRED ------------------------------------------------------- */
  meta: {
    slug: "trip-slug",            // must match the folder name and the registry entry
    title: "Trip Name",
    subtitle: "Solo, Month Year",
    dates: "Monday, May 1, 2027 – Monday, May 8, 2027",  // or null if not locked
    emoji: "🧭",
    theme: "ocean",               // ocean | desert | alpine | forest | night | savanna

    // The dark banner at the top of Overview. Any of these may be omitted.
    route: "The shape of the trip in one or two sentences. Say explicitly whether any road is driven twice.",
    vehicle: "What you're driving and any restriction that matters (rental road bans, clearance, 4WD).",
    gettingThere: "Flights, ferries, the drive from home. Omit if it's obvious.",

    // Four numbers for the sticky header. Keep them short.
    stats: [
      { num: "8 days", lbl: "Length" },
      { num: "~400 mi", lbl: "Distance" },
      { num: "~19 hrs", lbl: "Driving" },
      { num: "7", lbl: "Nights camping" },
    ],

    overviewCards: [
      { h: "Dates", p: "May 1–8, 2027<br>8 days / 7 nights" },
      { h: "Group", p: "1 person — solo" },
      { h: "Total distance", p: "~400 mi, ~19 hrs driving" },
      { h: "Lodging", p: "7 nights camping — breakdown by type" },
    ],

    // Optional: overrides the "Hikes" tab label for trips that aren't about hiking.
    // labels: { hikes: "Dives" },

    footerNote: 'One line of standing caution. <a href="../../index.html">← All trips</a>',
  },

  /* ---- REQUIRED: the itinerary ---------------------------------------- */
  days: [
    {
      day: 1,
      date: "Mon May 1, 2027",
      title: "Short Punchy Day Name",
      tagline: "One line on what this day actually is.",
      type: "travel",                       // travel | activity | activity + drive | rest
      driving: "~35 min, 25 miles (A → B)", // omit if not driving
      // walking: "6 mi on foot",           // optional, for non-driving days

      overnight: {
        name: "Campground Name",
        place: "Nearest town",
        kind: "Private campground",         // State park | National park | Backcountry | Hotel
        cost: "~$25/night",
        checkin: "Office 7:00 AM – 6:00 PM",   // null if none — but FIND OUT, this is
        confirmation: "TBD",                   // the most common day-one failure
        notes: "Anything that could cost you the site.",
      },

      schedule: [
        { time: "3:00 PM", text: "What happens" },
        { time: "6:56 PM", text: "Sunset — real calculated time, not a guess" },
      ],

      meals: { b: "made at camp", l: "bought — place name", d: "made — what and from where" },
      highlights: "Why this day is worth doing. Be specific — a named trail feature beats 'beautiful views'.",
      warnings: "What can go wrong today, with the number attached. Cutoff times, closures, exposure, water.",
    },
  ],

  /* ---- OPTIONAL: everything below --------------------------------------- */

  lodging: {
    summary: "7 nights camping · ~$180 total",
    total: "~$180",
    rows: [
      { night: 1, date: "Mon 5/1", location: "Region", type: "Private campground",
        name: "Campground Name", cost: "~$25", status: "Needs booking" },
    ],
  },

  // Map pins. verified:true ONLY if you actually looked it up.
  // `node tools/geocode.mjs <slug>` does the looking up and will not mark
  // anything verified on one community source alone.
  waypoints: [
    { name: "Confirmed Place", lat: 20.80951, lng: -156.616477, verified: true,
      icon: "⛺", days: "1, 7", notes: "Hours, phone number, anything you'd want at the gate." },
    { name: "Unconfirmed Place", lat: null, lng: null, verified: false,
      icon: "🏖️", days: "2", notes: "Listed as not-plotted until someone verifies it." },
  ],

  // ---- Lines on the map. BOTH SECTIONS ARE GENERATED — never hand-write
  // geometry, and delete these blocks entirely if you have no lines yet.
  //
  //   node tools/route.mjs <slug> --write     driving legs between waypoints
  //   node tools/trail.mjs <slug> --write     hikes, as mapped in OSM
  //
  // Keep the >>> / <<< marker lines. That is how --write finds the block to
  // replace next time; without them the tool prints the block for you to
  // paste instead. Everything between the markers is overwritten.
  //
  // Nothing here is fetched at page load. See docs/TRIP_SPEC.md → "Maps and
  // routing" for why, and for what `source` has to say.

  // >>> ROUTES
  routes: [
    {
      id: "confirmed-place--somewhere-else",
      label: "Confirmed Place → Somewhere Else",
      mode: "driving",
      days: "2",
      distanceMi: 21.4,
      durationMin: 47,
      source: "openrouteservice/driving-car",
      generated: "2026-01-01",
      geometry: "encoded polyline, precision 5",
    },
  ],
  // <<< ROUTES

  // >>> TRAILS
  trails: [
    {
      id: "some-ridge-trail",
      label: "Some Ridge Trail",
      mode: "hiking",
      days: "3",
      distanceMi: 4.28,
      source: "osm/way 12345,12346",
      generated: "2026-01-01",
      // A trail is usually several OSM ways. They stay separate segments
      // rather than stitched — guessing the join order can draw a line
      // through a cliff.
      geometry: ["first segment", "second segment"],
    },
  ],
  // <<< TRAILS

  hikes: {
    title: "Hikes &amp; Trails",
    summary: "",
    rows: [
      { name: "Trail Name", day: 2, distance: "4.0 mi RT", gain: "~800 ft",
        difficulty: "Moderate", duration: "2.5–3 hr", notes: "Surface, shade, water, turnaround logic." },
    ],
  },

  sunMoon: [
    { date: "Mon 5/1", location: "Where", firstLight: "5:25 AM", sunrise: "5:49 AM",
      sunset: "6:56 PM", dark: "7:20 PM", moon: "52%" },
  ],
  sunMoonNote: "Calculated, elevation-corrected where it matters.",

  weather: [
    { location: "Region", elevation: "Sea level", high: 84, low: 68,
      notes: "Seasonal pattern, not a forecast." },
  ],
  weatherNote: "Approximate averages — verify against station data closer to the date.",

  budget: {
    note: "What this excludes (usually airfare) and whether it hits the target.",
    rows: [{ category: "Line item", cost: 420, notes: "Why it costs that" }],
    subtotal: 420,
    buffer: 50,
    bufferLabel: "Buffer (12%)",
    total: 470,
  },

  // Trip-specific only. The universal stuff lives in the hub's Playbook tab.
  packing: [
    { category: "Category name (call out the weak link if there is one)",
      items: ["Item — and why, if it isn't obvious"] },
  ],

  // In booking order, earliest window first. The first unchecked item is
  // literally what to do next, so the order carries information.
  reservations: [
    { text: "Thing to book — when the window opens — what happens if you miss it" },
  ],

  // For trips that aren't finished. Delete when the list empties.
  openQuestions: [
    { question: "The thing this plan doesn't know.",
      blocks: "Day 4 / booking / the whole route",
      detail: "What you'd need to find out, and where to look." },
  ],

  // Long-form. Body may contain inline HTML, including links to other trips.
  notes: [
    { heading: "Section heading", body: "The paragraph that doesn't fit anywhere else. Risk analysis, cultural context, food strategy, gear reasoning." },
  ],

  // Fallback map view, used only if fewer than 2 verified waypoints exist.
  map: { center: [0, 0], zoom: 9 },
};
