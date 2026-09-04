/* ==========================================================================
   trips.js — THE REGISTRY. Every trip, planned or dreamed. The hub renders
   entirely from this file.

   status:
     "planned"  — a real day-by-day exists and you could leave on it. May
                  still carry open questions; every real trip does.
     "outline"  — a page exists but you could not leave on it yet
     "wishlist" — an idea. No page. Enough to decide whether to build one
     "done"     — already happened; kept for the notes and the gear lessons

   start: ISO date. Drives the hub's chronological sort and the countdown.
          Null for anything without locked dates.

   coords: [lat, lng] — DISPLAY ONLY, region centroids for the hub map.
           Navigation-grade coordinates live in each trip's WAYPOINTS, where
           the verified flag applies.

   Wishlist entries below are transcribed from the Sept 3 2026 bucket list,
   Tiers 1 and 2. Their confidence marks are preserved in `why`: ✅ verified
   Sept 2026, 📋 verified in an earlier 2026 session, ⚠️ unverified lead.
   ========================================================================== */

const TRIPS = [
  /* ---------------------------------------------------------------- 2026 */
  {
    slug: "kentucky-2026",
    title: "Red River Gorge + Big South Fork",
    subtitle: "Arches, ladders, and a coal town",
    emoji: "🪨",
    theme: "forest",
    status: "planned",
    pinned: true,
    page: "trips/kentucky-2026/",
    start: "2026-09-22",
    dates: "Sept 22–27, 2026",
    window: "Late September — before the leaves, after the heat",
    region: "Slade KY → Bandy Creek TN",
    country: "USA",
    coords: [37.0, -84.2],
    nights: "5 nights camping",
    distance: "~1,000 mi round trip",
    budget: "TBD",
    tags: ["car camping", "arches", "scrambling", "ruins", "solo", "lecture day"],
    why: "Two sandstone plateaus back to back — the Gorge's arch cluster, then Honey Creek's ladders and ropes on the busiest Saturday of the season, because that's what keeps it empty.",
    next: "Re-check Tunnel Ridge Road the morning of departure — Cumberland District, 606-784-6428",
    updated: "2026-09-04",
  },
  {
    slug: "appalachians-2026",
    title: "Bridge Day + Southern Appalachians",
    subtitle: "Chasing color downhill, WV to VA",
    emoji: "🍂",
    theme: "autumn",
    status: "planned",
    pinned: true,
    page: "trips/appalachians-2026/",
    start: "2026-10-15",
    dates: "Oct 15–25, 2026",
    window: "Mid-late October — peak color moves down the elevation band",
    region: "New River Gorge → Pisgah → Linville → Mount Rogers",
    country: "USA",
    coords: [37.2, -81.4],
    nights: "10 nights — 7 confirmed, 1 uncovered",
    distance: "~1,600 mi round trip",
    budget: "TBD",
    tags: ["car camping", "fall color", "ruins", "BASE jumping", "first-come", "solo", "lodging gap"],
    why: "BASE jumpers watched from the gorge floor, three coal ghost towns, and a sunrise on Hawksbill during peak color week — with two unreservable nights on a forest road as the price.",
    next: "Call Arrowhead 304-900-5501 — the reservation moved to Oct 16–18 by phone, leaving Oct 15 with no bed and nothing in writing",
    updated: "2026-09-04",
  },

  /* ---------------------------------------------------------------- 2027 */
  {
    slug: "maui-2027",
    title: "Full Circle Maui",
    subtitle: "Counterclockwise island loop, solo",
    emoji: "🌺",
    theme: "ocean",
    status: "planned",
    pinned: false,
    page: "trips/maui-2027/",
    start: "2027-05-13",
    dates: "May 13–20, 2027",
    window: "May — dry season leeward, before summer crowds",
    region: "Maui, Hawaii",
    country: "USA",
    coords: [20.79, -156.32],
    nights: "7 nights camping",
    distance: "~400 mi driving",
    budget: "~$1,362",
    tags: ["camping", "volcanic", "snorkeling", "solo", "road loop", "altitude"],
    why: "Every major Maui landscape in one counterclockwise loop — reef, lava field, rainforest, and a 10,000 ft summit.",
    next: "Confirm the Waiʻānapanapa booking window (1 year vs 90 days) so the alarm is set correctly",
    updated: "2026-09-03",
  },

  /* ------------------------------------------------- WISHLIST — TIER 1
     Justifies a plane ticket. */
  {
    slug: "eastern-sierra", title: "Eastern Sierra", subtitle: "Committed — the best payoff per dollar",
    emoji: "🏔️", theme: "alpine", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "July–early October; September for aspen and fewer people",
    region: "Bishop / Mammoth, California", country: "USA", coords: [37.36, -118.55],
    nights: "~8 nights", budget: "Cheap flights (Reno), cheap car",
    tags: ["car camping", "alpine", "paved trailheads", "committed"],
    why: "✅ Four Jeffrey CG at 8,100 ft with bear boxes and a trailhead under a mile up the road. Little Lakes Valley from Mosquito Flat is the highest paved trailhead in the Sierra — the single best expression of the car-camping rule set.",
    next: "Pick a September week and check Four Jeffrey's reservable/FCFS split", updated: "2026-09-03",
  },
  {
    slug: "beartooth-plateau", title: "Beartooth Plateau", subtitle: "Paved to 9,500 ft",
    emoji: "🗻", theme: "alpine", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "Late June–early/mid September",
    region: "Montana / Wyoming", country: "USA", coords: [45.0, -109.55],
    nights: "~7 nights", budget: null,
    tags: ["car camping", "alpine", "high camps", "wildlife"],
    why: "📋 US-212 is paved above 9,500 ft, so you get emptiness and short approaches — everywhere else those two trade off. Island Lake CG sits at 9,518 ft. Pairs with Yellowstone's northeast corner for Lamar Valley wildlife with zero hiking.",
    next: "Decide between this and Snowy Range for the 2028 alpine slot", updated: "2026-09-03",
  },
  {
    slug: "snowy-range", title: "Snowy Range / Medicine Bow", subtitle: "The sleeper of the whole list",
    emoji: "⛰️", theme: "alpine", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "Mid-July–October, once the high road opens",
    region: "Centennial, Wyoming", country: "USA", coords: [41.35, -106.32],
    nights: "~6 nights", budget: "Denver flights, ~2.5 hr drive",
    tags: ["car camping", "alpine", "no permits", "10,000 ft camps"],
    why: "✅ 29 paved miles topping out above 10,000 ft at Libby Flats, a 12,013 ft peak inside the day-hike ceiling, campgrounds above 10,000 ft, and no hiking permits of any kind. A fraction of Colorado's crowds two hours north of Denver.",
    next: "Verify Medicine Bow Peak loop stats and the Brooklyn Lake reservation window", updated: "2026-09-03",
  },
  {
    slug: "kenai-peninsula", title: "Kenai Peninsula", subtitle: "The one that gets harder to justify, not easier",
    emoji: "🧊", theme: "night", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "Late June for light, early September for color and fewer bugs",
    region: "Alaska", country: "USA", coords: [60.1, -149.44],
    nights: "8 nights, 4 camps", budget: "Highest on the list — flights and rentals triple a Reno rate",
    tags: ["car camping", "glacier", "bears", "expensive", "wet"],
    why: "📋 Harding Icefield is the best single payoff on the entire bucket list. Four camps from Hatcher Pass to Exit Glacier, with a ~20% washout rate budgeted and the boat tour held back as a weather hedge.",
    next: "Decide whether this is a real item or a fantasy item — if real it belongs before 2029", updated: "2026-09-03",
  },

  /* ------------------------------------------------- WISHLIST — TIER 2
     Strong, unscheduled. */
  {
    slug: "glacier-np", title: "Glacier National Park", subtitle: "Highest hit rate, worst bureaucracy",
    emoji: "🏞️", theme: "alpine", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "July–September", region: "Montana", country: "USA",
    coords: [48.7, -113.8], nights: null, budget: null,
    tags: ["car camping", "alpine", "reservation system"],
    why: "⚠️ Best hikes per day of anywhere on the list. 📋 The vehicle reservation is a separate system from camping and you can hold one without the other — verify the current year early.",
    next: "Check the current year's vehicle reservation rules before anything else", updated: "2026-09-03",
  },
  {
    slug: "north-cascades", title: "North Cascades + Methow", subtitle: "Planned once, then Hawaii took the window",
    emoji: "🌲", theme: "forest", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "Mid-July–September", region: "Washington", country: "USA",
    coords: [48.5, -120.7], nights: null, budget: null,
    tags: ["car camping", "alpine", "already researched"],
    why: "📋 Maple Pass, Cutthroat, Blue Lake, Easy Pass. Fully planned for Aug 2026 before it was swapped out — the research is already done. 📋 Cascade Pass road conflicts with rental agreements; recurring campfire bans.",
    next: "Recover the Aug 2026 plan rather than re-researching it", updated: "2026-09-03",
  },
  {
    slug: "high-uintas", title: "High Uintas", subtitle: "Absurdly lake-dense, short season",
    emoji: "💧", theme: "alpine", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "Late July–September", region: "Utah", country: "USA",
    coords: [40.7, -110.88], nights: null, budget: "1.5 hr from SLC",
    tags: ["car camping", "alpine", "lakes"],
    why: "📋 The only major east-west range in the lower 48. Mirror Lake Highway is the spine — Trial Lake, Butterfly and Mirror Lake campgrounds string along it. Naturalist Basin, Ibantik, Bald Mountain, Notch Mountain.",
    next: "Check the Mirror Lake Hwy opening date against a July–Aug window", updated: "2026-09-03",
  },
  {
    slug: "lassen", title: "Lassen Volcanic", subtitle: "Best day-hike fit in California",
    emoji: "🌋", theme: "forest", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "July–September", region: "California", country: "USA",
    coords: [40.49, -121.42], nights: null, budget: null,
    tags: ["car camping", "volcanic", "uncrowded"],
    why: "📋 Cinder Cone 4 mi, Kings Creek Falls 2.8, Echo/Twin Lakes 8 — every hike lands inside the ceiling. The least-visited real national park in California.",
    next: "Pair it with Eastern Sierra or treat it as its own trip", updated: "2026-09-03",
  },
  {
    slug: "san-juans", title: "San Juans", subtitle: "Ice Lakes Basin is the marquee",
    emoji: "⛏️", theme: "alpine", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "July–September", region: "Colorado", country: "USA",
    coords: [37.81, -107.66], nights: null, budget: null,
    tags: ["car camping", "alpine", "mining ruins"],
    why: "⚠️ South Mineral CG puts you at the Ice Lakes trailhead. Ranked lower purely because you're Colorado-saturated — be suspicious of Colorado ideas that arrive feeling easy.",
    next: "Only if it beats Snowy Range on its merits, not on familiarity", updated: "2026-09-03",
  },
  {
    slug: "oregon-coast-crater", title: "Oregon Coast + Crater Lake", subtitle: "Inverts the effort-equals-payoff model",
    emoji: "🌊", theme: "forest", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "September", region: "Oregon / Northern California", country: "USA",
    coords: [43.0, -124.0], nights: "12 nights, three landscapes", budget: null,
    tags: ["car camping", "coast", "old growth", "low effort"],
    why: "⚠️ Redwoods, coast and Crater Lake in one run. But the best thing in Jedediah Smith is 200 ft from the road and the only real climb on the northern Oregon coast is Saddle Mountain. Do this one on purpose, not by accident.",
    next: "Decide whether a low-effort trip is what you actually want that year", updated: "2026-09-03",
  },
  {
    slug: "olympic-rainier", title: "Olympic + Rainier", subtitle: "Motel nights are functional here",
    emoji: "🏕️", theme: "forest", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "July–September", region: "Washington", country: "USA",
    coords: [47.6, -123.2], nights: null, budget: null,
    tags: ["car camping", "rainforest", "motel nights"],
    why: "📋 Neither park has real shower access, so the Port Angeles motel night is a function rather than a luxury. Verify Ohanapecosh — closed for 2026.",
    next: "Verify Ohanapecosh status and Cougar Rock availability", updated: "2026-09-03",
  },
  {
    slug: "bighorns", title: "Bighorns / Cloud Peak", subtitle: "Unspent and cheap to reach",
    emoji: "🐻", theme: "alpine", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "July–September", region: "Wyoming", country: "USA",
    coords: [44.3, -107.2], nights: null, budget: "Cheap",
    tags: ["car camping", "dispersed", "alpine"],
    why: "📋 Crazy Woman Canyon Road dispersed camping — creek, canyon walls, the best-reviewed sites in the range. Cut from the overlanding trip and never reallocated.",
    next: "Check Crazy Woman Canyon Rd against 5.9 in of clearance", updated: "2026-09-03",
  },
  {
    slug: "ruby-mountains", title: "Ruby Mountains", subtitle: "Booked once, then pivoted away",
    emoji: "💎", theme: "alpine", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "July–September", region: "Nevada", country: "USA",
    coords: [40.6, -115.36], nights: null, budget: "SLC airport",
    tags: ["car camping", "alpine", "empty", "already researched"],
    why: "📋 A paved canyon road to a glacial cirque with near-zero people. Thomas Canyon CG in Lamoille Canyon. ⚠️ <b>Two recreation.gov reservations (0861563331-1 and -2) were booked on Jul 27 2026 and reminder emails on Aug 3 and Aug 7 said the trip was one month away — which is right about now.</b> Both confirmations are still unread in the inbox.",
    next: "⚠️ Check whether the Thomas Canyon nights are still live and cancel them if unused — recreation.gov 0861563331", updated: "2026-09-04",
  },
  {
    slug: "great-basin", title: "Great Basin", subtitle: "Darkest sky in the lower 48",
    emoji: "🌲", theme: "night", status: "wishlist", pinned: false, page: null,
    start: null, dates: null, window: "July–September", region: "Nevada", country: "USA",
    coords: [38.98, -114.3], nights: null, budget: null,
    tags: ["car camping", "bristlecones", "empty"],
    why: "⚠️ Wheeler Peak, bristlecone groves, and functionally nobody there. Considered once and dropped. Note the tension: the dark sky is the headline draw and stargazing is on the declined list.",
    next: "Decide if it earns a trip without the stargazing angle", updated: "2026-09-03",
  },
];
