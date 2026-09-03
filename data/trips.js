/* ==========================================================================
   trips.js — THE REGISTRY. Every trip, planned or dreamed, lives here.
   The hub renders entirely from this file. Adding a trip = adding an entry.

   status:
     "planned"  — a full trip page exists and the itinerary is real
     "outline"  — a page exists but has gaps; open questions are listed on it
     "wishlist" — an idea. No page. Enough detail to decide if it's worth building
     "done"     — already happened; keep it for the notes and the gear lessons

   pinned: true floats it to the top of the hub, above everything else.
   Pins live here, in git, not in browser storage — one source of truth, and
   it survives a new laptop.

   coords: [lat, lng] — DISPLAY ONLY, for the hub map. Region-level is fine
   here (an island, a park, a city). Navigation-grade coordinates belong in
   the trip's own WAYPOINTS, where the verified flag applies.
   ========================================================================== */

const TRIPS = [
  {
    slug: "maui-2027",
    title: "Full Circle Maui",
    subtitle: "Counterclockwise island loop, solo",
    emoji: "🌺",
    theme: "ocean",
    status: "planned",
    pinned: true,
    page: "trips/maui-2027/",
    dates: "May 13–20, 2027",
    window: "May — dry season leeward, before summer crowds",
    region: "Maui, Hawaii",
    country: "USA",
    coords: [20.79, -156.32],
    nights: "7 nights camping",
    distance: "~400 mi driving",
    budget: "~$1,362",
    tags: ["camping", "volcanic", "snorkeling", "solo", "road loop", "altitude"],
    why: "Every major Maui landscape in one counterclockwise loop — reef, lava field, rainforest, and a 10,000 ft summit — without driving a road twice.",
    next: "Confirm the Waiʻānapanapa booking window (1 year vs 90 days) so the alarm is set correctly",
    updated: "2026-09-03",
  },

  /* ------------------------------------------------------------------------
     SHAPE REFERENCE — copy one of these when adding a trip. Nothing below is
     a real plan; they're here so the format is obvious. Uncomment and fill,
     or delete once you've got your own.

  {
    slug: "example-outline",
    title: "Trip Name",
    subtitle: "One line on the shape of it",
    emoji: "🏜️",
    theme: "desert",              // ocean | desert | alpine | forest | night | savanna
    status: "outline",
    pinned: false,
    page: "trips/example-outline/",
    dates: "Sep 2027 (dates not locked)",
    window: "Sep–Oct — after monsoon, before the cold",
    region: "Region, State",
    country: "USA",
    coords: [37.2, -112.9],
    nights: "6 nights camping",
    distance: "~500 mi driving",
    budget: "~$1,100 est.",
    tags: ["camping", "canyon", "permit lottery"],
    why: "Why this trip exists in one or two sentences.",
    next: "Enter the permit lottery — opens January",
    openCount: 4,                 // number of unresolved questions on the page
    updated: "2026-09-03",
  },

  {
    slug: "example-wishlist",
    title: "Somewhere You Haven't Planned Yet",
    subtitle: "Idea only",
    emoji: "🗻",
    theme: "alpine",
    status: "wishlist",
    pinned: false,
    page: null,                   // no page yet — that's what makes it a wish
    dates: null,
    window: "Jul–Aug — the only window the passes are open",
    region: "Region, Country",
    country: "Country",
    coords: [46.5, 8.0],
    nights: "~8 nights",
    distance: null,
    budget: "$1,800–2,400 est.",
    tags: ["hut-to-hut", "alpine", "expensive"],
    why: "The one-paragraph case for going. What's actually there.",
    next: "Decide if it beats the other summer option — then build the page",
    updated: "2026-09-03",
  },
  ------------------------------------------------------------------------ */
];
