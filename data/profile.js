/* ==========================================================================
   profile.js — the traveler profile. The "applies to every trip" layer.

   SOURCE: rebuilt 2026-09-04 from the Sept 2026 handoff, both 2026 MASTER
   trip files, both MEALS files, and the Sept 3 2026 bucket list. Earlier
   versions of this file inferred these facts from the Maui 2027 spec and got
   several of them wrong. This version is transcribed, not inferred.

   Gear `state`: "own" | "replace" | "need" | "rent" | "unknown"

   A gear item may also carry `question: { text, answeredBy: "<slug>" }` — a
   thing you will only find out by using it. The hub surfaces those as a
   standing list, and the trip named in `answeredBy` answers it in its `retro`
   block once it has happened. Before this existed the questions sat in prose
   notes and were answered nowhere.

   Two more optional item fields, used by the clothing categories:
     `qty`  — how many to PACK on a typical 5–10 night trip. Not an inventory
              count. `null` means the number has never been written down —
              it renders as "?" rather than a guess.
     `type` — garment/kit role: "shell", "midlayer", "base", "socks", etc.
   ========================================================================== */

const PROFILE = {
  name: "Colin",
  homeBase: "Avon, Ohio — west Cleveland metro. Drive times are measured from there; flights from CLE.",
  defaultGroup: "Solo. One person, one tent, one portion.",
  vehicle:
    "2013 Subaru Legacy. AWD, ~5.9 in ground clearance, low front air dam. <b>Not high-clearance.</b> Road quality is a trip-breaker, not an inconvenience — check the access road before getting attached to a campground.",
  ceiling:
    "Soft ~10 mi / ~2,500 ft per day. Exceeded when the payoff justifies it, not by accident.",
  difficulty:
    "Welcomes sustained low-consequence difficulty — scrambles, ladders, route-finding, wet rock. More cautious about single high-consequence moves.",
  crowds: 'Actively avoids them. "Empty is cool if it\'s worth it."',
  food:
    "Cooks at camp by default. <b>Oral allergy syndrome</b> — raw nuts, fruit and vegetables can irritate; cooked and roasted forms are the usual workaround, but which specific foods trigger it is not yet recorded. Restaurants are for high value, not convenience — a reputable place with a big menu is worth choosing from, a mediocre one is worth skipping entirely. Wants authentic local food and fresh dessert, bought rather than made. Spice <b>1–2 of 5</b>: background heat, not the point of the dish. Target <b>~3,000 kcal/day</b> on a hiking trip, confirmed. <b>No coffee, no beer.</b>",
  driverNote:
    "Under 25 — the young-renter surcharge runs $15–35/day, up to ~$245 on a week. AAA membership is the standard workaround; also check whether the credit card already covers rental collision before buying the counter product.",
  tripShape:
    "2–5 campgrounds per trip, 5–10 nights, 4–8 hikes. Occasional motel night for a shower.",
};

/* The locked rule set. A trip that breaks one of these needs a written reason
   in its Notes, not a quiet exception. */
const PRINCIPLES = [
  "<b>Car camping only.</b> Camp with the car, drive to trailheads, day hike. No hike-in nights, no permit lotteries, no overnight wilderness quotas. This rule is locked and it has already removed real destinations from the list.",
  "<b>Check the access road first.</b> 5.9 inches of clearance and a low air dam. This is now the single most common way a good campground turns out to be unusable.",
  "<b>On any fly-in trip, night one and the last night are reservable.</b> First-come only in the middle, and only with a named reservable fallback inside 45 minutes. No arrival time solves structural oversubscription.",
  "<b>Dawn starts.</b> The light, the empty trailhead and the cool air are all before 8 AM. Plan around first light, not around opening hours.",
  "<b>Schedule against the crowd, not around it.</b> Popular trailheads Mon–Thu. Put the hard, empty hike on the busiest day — that's why it stays empty.",
  "<b>Every risky day gets a hard turnaround time and a bail-out named in advance</b>, decided before the forest road, not at it.",
  "<b>Drive estimates are Google plus 15%</b>, and stop durations are set at the slow end. Optimistic driving is how a day runs out of daylight.",
  "<b>Every day carries a slack line</b> saying how much margin exists and what gets cut first.",
  "<b>Cook at camp; eat out for a named dish.</b> The restaurant entry is the order, not the address.",
  "<b>Ruins count as scenery.</b> Coal towns, homesteads, tipples and ghost structures are destinations, not filler.",
];

/* How Claude should behave on this repo. Rendered on the hub so the rules are
   visible rather than buried in a system prompt. */
const WORKING_RULES = [
  "Direct and honest. Push back. Do not flatter or over-validate.",
  "Say plainly when a plan has a hole, when reasoning is weak, or when an earlier recommendation was wrong.",
  "Turn his own stated criteria back on a decision — that's the feedback that lands.",
  "Do not comment on how often plans change, pivot, or stay unbooked. Trip planning is a sandbox and exploring options is the point. Don't push to book.",
  "Flag confidence explicitly. \"I could not confirm this\" is a useful answer; a confident guess is not.",
];

/* Considered and declined. Re-proposing these wastes his time.

   `terms` is what tools/validate.mjs greps trip content for, so a declined
   thing reappearing in an itinerary is caught by the validator instead of by
   reading the page. Keep terms specific enough not to fire on ordinary prose.

   ⚠️ Live conflict, unresolved on purpose: stargazing is declined here, and
   the Maui 2027 page schedules a dark-sky window on the morning of 5/19. The
   declined list is from the Sept 2026 handoff; Maui was planned earlier. The
   validator now reports this every run rather than leaving it as a comment
   nobody reads. Resolve it in one direction — don't silence it. */
const DECLINED = [
  { what: "Mountain biking, including renting one in Brevard", terms: ["mountain bike", "mountain biking"] },
  { what: "Bridge Walk, highline and zipline tickets (New River Gorge)", terms: ["bridge walk", "highline", "zipline"],
    allow: ["highline trail"] },
  { what: "Big South Fork Scenic Railway", terms: ["scenic railway"] },
  { what: "Via ferrata at Torrent Falls", terms: ["via ferrata"] },
  { what: "The Cumberland Falls moonbow", terms: ["moonbow"] },
  { what: "Stargazing", terms: ["stargazing", "stargaze"] },
  { what: "Breweries", terms: ["brewery", "breweries"] },
];

/* Standing personal negatives — not activities considered and declined, but
   things that are simply never right for this traveler. Same enforcement as
   DECLINED: tools/validate.mjs greps a trip's schedule, reservations, hikes
   and places for `terms` and reports a hit.

   This exists because "No coffee, no beer" has been in PROFILE.food since the
   file was written, and the Maui itinerary opened Day 3 with "Wake, coffee,
   slow morning" the whole time. A preference stated only in prose is a
   preference nothing checks. */
const AVOID = [
  { what: "Coffee", terms: ["coffee"], why: "PROFILE.food: no coffee. A named cafe as a destination is fine — ordering the coffee is not.",
    allow: ["coffee house", "coffee shop"] },
  { what: "Beer", terms: ["beer", "brewpub"], why: "PROFILE.food: no beer. Breweries are also on the declined list." },
];

/* Foods rejected on the Menu Bench, Sept 2026 — 20 of 88 candidates.
   Enforced exactly like DECLINED and AVOID: tools/validate.mjs greps a trip's
   meals for `terms` and reports a hit, so a rejected dish cannot quietly
   reappear in an itinerary a year from now.

   ⚠️ These are the SPECIFIC dishes he said no to. The patterns underneath are
   inference and are NOT enforced — they are written down as hypotheses to be
   confirmed or knocked down, because acting on an unconfirmed pattern is how
   a preference list starts banning food nobody objected to:
     - grits, congee and rice pudding all rejected → savoury or sweet porridge
       is out, even though oats are in. Oats may simply be the exception.
     - both ramen entries rejected → ramen is out as a format.
     - tuna salad, egg salad and bánh mì all rejected → possibly mayonnaise.
     - hummus, refried beans, white chicken chili and gumbo rejected → possibly
       beans as the centre of a dish. Note lentil stew and cannellini pasta
       were both YES, so it is not legumes in general.
     - cold pizza, rice balls and egg salad rejected → leftovers repurposed as
       a cold lunch may be the objection, not the food.
     - pork chop with apple AND griddled banana both rejected → <b>cooked fruit
       may be out too</b>, which matters: cooked fruit was the proposed
       workaround for the raw-fruit allergy. If both are out, fruit leaves the
       plan entirely and the two raw apples need a non-fruit replacement. */
const DISLIKES = [
  { what: "Sausage gravy over biscuits", terms: ["sausage gravy", "biscuits and gravy"] },
  { what: "Grits, in any form", terms: ["grits"] },
  { what: "Savoury rice porridge / congee", terms: ["congee", "rice porridge"] },
  { what: "Eggs poached in tomato sauce (shakshuka)", terms: ["shakshuka"] },
  { what: "Eating a pouch straight as the meal", terms: ["pouch plate", "straight from the pouch"] },
  { what: "Bánh mì-style cold cut rolls", terms: ["banh mi", "bánh mì"] },
  { what: "Tuna or chicken salad", terms: ["tuna salad", "chicken salad"] },
  { what: "Cold leftover pizza as a lunch", terms: ["cold pizza", "leftover pizza"] },
  { what: "Hummus as a meal component", terms: ["hummus"] },
  { what: "Egg salad", terms: ["egg salad"] },
  { what: "Rice balls / onigiri", terms: ["rice ball", "onigiri"] },
  { what: "Ramen, both instant and upgraded", terms: ["ramen"] },
  { what: "Pork chop with cooked apple", terms: ["pork chop"] },
  { what: "White chicken chili", terms: ["white chicken chili", "white chili"] },
  { what: "Gumbo", terms: ["gumbo"] },
  { what: "Cheese grits in a boil bag", terms: ["cheese grits"] },
  { what: "Refried beans", terms: ["refried bean"] },
  { what: "Rice pudding", terms: ["rice pudding"] },
  { what: "Griddled banana with chocolate", terms: ["banana boat", "griddled banana"] },
];

const GEAR = [
  {
    category: "Sleep system",
    note: "Rebuilt for cold in 2026. This was the weak link and no longer is — the only open item is the liner.",
    items: [
      { name: "REI Co-op Siesta 20 sleeping bag", state: "own", note: "New, Sept 2026. First cold-weather bag. Sept KY is the shakedown for the October 30s.",
        question: { text: "Does it actually sleep warm enough to trust at 32°F?", answeredBy: "kentucky-2026" } },
      { name: "Sleeping bag liner", state: "need", note: "Recommended for the last three October nights (Linville and Hurricane, mid-30s). Purchase not confirmed.",
        question: { text: "Is it needed, or does the Siesta 20 cover the mid-30s on its own?", answeredBy: "kentucky-2026" } },
      { name: "Therm-a-Rest MondoKing 3D, 25 in Large", state: "own", note: "R-7.0. Overkill for anything on the current list, which is the correct problem to have." },
      { name: "2-person tent", state: "own", note: "" },
      { name: "Puffy, hat, gloves", state: "own", note: "Lives in <b>Clothing — the layer system</b> below. Listed here too because the puffy is a sleep layer on any night the bag is marginal." },
    ],
  },
  {
    category: "Connectivity — the trip-critical one",
    note: "A remote lecture runs 11:00–3:00 on a Wednesday of both 2026 trips, taken at camp.",
    items: [
      { name: "Starlink", state: "own", note: "Needs sky view. Both Koomer Ridge and Davidson River are forested. <b>Test on arrival day, not the morning of the lecture.</b>",
        question: { text: "Does it hold a usable link under canopy at Koomer Ridge, or does the lecture need a different plan?", answeredBy: "kentucky-2026" } },
      { name: "Portable power bank", state: "own", note: "Four hours of laptop plus Starlink is the real draw, not the phone." },
      { name: "Offline maps — Google Maps regions", state: "need", note: "Downloaded before leaving home. Covers driving only." },
      { name: "Offline maps — AllTrails or Gaia", state: "need", note: "<b>Google Maps offline does not include trails.</b> Separate download, and a GPX for anything poorly blazed." },
    ],
  },
  {
    category: "Pack & hiking",
    items: [
      { name: "Day pack", state: "own", note: "" },
      { name: "Trekking poles", state: "own", note: "The alternative to trusting muddy fixed ropes." },
      { name: "Boots with real grip", state: "own", note: "Wet rock and wet rope are the recurring hazard." },
      { name: "Headlamp + spare batteries", state: "own", note: "In the pack regardless of the hour." },
      { name: "Camp shoes", state: "own", note: "" },
    ],
  },
  {
    category: "Clothing — the layer system",
    note: "The three layers that decide whether a cold, wet, exposed morning is fine or a bail-out. <b>Counts here are pack counts for a 5–10 night trip, not an inventory.</b> Confirmed Sept 2026 except the two still marked <em>unknown</em>: the <b>midlayer</b> and the <b>sun hat</b>.",
    items: [
      { name: "Rain shell", type: "shell", qty: 1, state: "own", note: "Confirmed Sept 2026. Guaranteed use at Hāna and Hosmer; the Mount Rogers ridge note calls shell and gloves not optional." },
      { name: "Fleece or midlayer", type: "midlayer", qty: 1, state: "unknown", note: "The layer between the hiking shirt and the puffy — a fleece, grid fleece or light synthetic. Its job is to be worn <i>while moving</i> on a cold morning, which the puffy cannot do without soaking it in sweat. <b>Colin asked what this is in Sept 2026, which is itself the answer: there probably isn't one.</b> Confirm before the next cold trip." },
      { name: "Puffy jacket", type: "insulation", qty: 1, state: "own", note: "Double duty: ridge layer and sleep layer. Hawksbill at 7:15 AM, 4,009 ft, mid-30s — and the Mount Rogers ridge, where the note says shell and gloves are not optional." },
      { name: "Warm hat", type: "insulation", qty: 1, state: "own", note: "" },
      { name: "Gloves", type: "insulation", qty: 1, state: "own", note: "Confirmed Sept 2026. One pair — a wet pair with no spare is how a cold ridge morning ends early." },
      { name: "Sun hat", type: "sun", qty: 1, state: "unknown", note: "Not confirmed. Load-bearing on the desert trips, not the Appalachian ones." },
      { name: "Sunglasses", type: "sun", qty: 1, state: "unknown", note: "" },
    ],
  },
  {
    category: "Clothing — worn articles & counts",
    note: "Counts are transcribed from the Maui 2027 packing list, which is the only place any number was ever written down. They are a 7-day fly-in target — a 10-night drive-out trip with a laundromat mid-route wants different numbers. <b>No cotton on anything that gets sweat in it.</b>",
    items: [
      { name: "Hiking shirts", type: "base", qty: 2, state: "own", note: "Enough owned (confirmed Sept 2026). Pack count from the Maui list. Merino or synthetic — cotton holds water and stops insulating." },
      { name: "Long pants", type: "legs", qty: 1, state: "own", note: "Enough owned (confirmed Sept 2026). Brush, sun and cold mornings. Packing only one means one wet day ends the pants — consider two on any trip with a creek crossing." },
      { name: "Shorts", type: "legs", qty: 2, state: "own", note: "Enough owned (confirmed Sept 2026)." },
      { name: "Wool socks", type: "socks", qty: 4, state: "own", note: "“Plenty”, confirmed Sept 2026 — so the pack count is a choice, not a ceiling. Still the highest-leverage number here: wet feet on day three of eight is a whole-trip problem, not a day problem." },
      { name: "Liner socks", type: "socks", qty: null, state: "own", note: "Owned (confirmed Sept 2026); pack count never set. Blister insurance on the long descents." },
      { name: "Underwear", type: "base", qty: null, state: "own", note: "Owned (confirmed Sept 2026); pack count never set. Synthetic or merino, one per day unless there’s a laundry stop." },
      { name: "Swim trunks", type: "water", qty: 2, state: "own", note: "\"One always wet\" — the Maui list's reasoning, and it applies to any swimming-hole trip." },
      { name: "Sleep layer", type: "base", qty: 1, state: "own", note: "Confirmed Sept 2026 — a dedicated dry set that never leaves the tent. Sleeping in the clothes you hiked in is how a 20°F bag underperforms." },
    ],
  },
  {
    category: "Camp kitchen",
    note: "One burner, one pot, one pan. The meal plans are built to that exact constraint.",
    items: [
      { name: "One burner, pot, pan, mug, spork", state: "own", note: "" },
      { name: "Wide-mouth thermos", state: "own", note: "<b>One, and staying at one — decided Sept 2026.</b> Load-bearing: the standing routine is snack → hike → hot thermos meal at the turnaround → hike out. Because there is only one, hot oats and hot chocolate compete on any pre-dawn morning; the meal wins and the drink gets dropped. Plan around that rather than around a second flask. A second one would unlock the pre-dawn hot chocolate." },
      { name: "48 qt cooler", state: "own", note: "Frozen meals in flat quart bags <i>are</i> the ice. Holds ~2.5 days unaided in 75°F — buy a <b>block</b> of ice at resupply, not cubes.",
        question: { text: "Does the frozen-meals-as-ice system actually reach the first resupply, and does the breakfast burrito survive to day 8?", answeredBy: "appalachians-2026" } },
      { name: "Olive oil in a squeeze bottle", state: "own", note: "One of the four things that turn a can into a meal: oil, hard cheese, crushed chips, starch pouch." },
      { name: "Fuel canisters", state: "need", note: "Cannot fly. Buy on arrival on any fly-in trip." },
    ],
  },
  {
    category: "Vehicle & road",
    items: [
      { name: "Spare, jack, tire plug kit", state: "need", note: "On maintained gravel the realistic failure mode is a cut sidewall, not getting stuck. Confirm the spare is actually inflated before FS 210." },
      { name: "AAA membership", state: "own", note: "Waives the under-25 renter fee on fly-in trips. Verify it still applies at booking — this changes." },
    ],
  },
  {
    category: "Safety & documents",
    items: [
      { name: "First aid kit", state: "own", note: "" },
      { name: "Printed permits + reservations", state: "need", note: "Paper copies. Some entrance stations require paper plus photo ID and have no signal to look you up." },
      { name: "America the Beautiful pass", state: "own", note: "Covers NPS entry. Not state park fees, not timed entry." },
    ],
  },
];

/* Runs on every trip regardless of destination. */
const UNIVERSAL_CHECKLIST = [
  "Offline Google Maps regions downloaded for the whole route — before leaving home",
  "Trail maps downloaded separately (AllTrails/Gaia) — Google Maps offline has no trails",
  "GPX loaded for any route with poor blazing or route-finding",
  "Starlink sky view tested on arrival day at every forested campground",
  "Trip plan texted home, with the date and time of every no-signal segment",
  "Hard turnaround time set for the biggest day, and a bail-out named before the forest road",
  "Fire and burn ban status checked for every state on the route",
  "Bear food storage sorted where required",
  "Block ice — not cubes — on the resupply list",
  "Fuel canisters sourced at the destination on any fly-in trip",
  "Spare tire pressure checked before any gravel road",
  "Permits and reservations printed on paper, plus photo ID",
  "Road conditions re-confirmed by phone the morning of departure",
];

/* Booking timing. The recreation.gov row previously said "10:00 AM ET" here —
   that was invented. This version follows the Sept 2026 bucket list, which
   marks it verified. Re-check anything that would end a trip if wrong.

   `system` is the id a trip's `booking` declaration references, and
   `leadMonths` is what lets the hub work out the actual date the window opens
   instead of leaving it as arithmetic for a human at 6 AM. Rows where the
   window genuinely varies leave it null on purpose: the Agenda then says
   "window unknown — confirm it" rather than inventing a date, which is the
   same contract as `verified: false` on a waypoint.

   leadMonths is counted back from the FIRST NIGHT being booked, not from the
   trip's start date. */
const BOOKING_WINDOWS = [
  { system: "recreation.gov", leadMonths: 6,
    what: "recreation.gov (most USFS / NPS)", when: "6-month rolling window, releases <b>7 AM Pacific = 10 AM Eastern</b>",
    note: "⚠️ Corrected Sept 2026. This row said \"7 AM local\", meaning the campground's own zone. recreation.gov's own booking-tips article says <b>7am PT / 8am MT / 10am ET</b> — one instant nationwide — \"but not always\". From Ohio the alarm is <b>10:00 AM</b> no matter where the campground is. Confirm on the facility's own page; small campgrounds go in seconds." },
  { system: "reservenevada", leadMonths: 11,
    what: "Nevada State Parks (reservenevada.com)", when: "11-month rolling window",
    note: "Must be booked at least 72 hrs ahead; $5 non-refundable transaction fee. Valley of Fire is reservation-only — no first-come fallback." },
  { system: "pima-county", leadMonths: 12,
    what: "Pima County parks (Gilbert Ray, Tucson)", when: "Up to 1 year ahead; the whole Sept 1 – Apr 30 season opens at once",
    note: "✅ Verified Sept 2026 from pima.gov: Gilbert Ray is reservation-only, cash and first-come camping are gone, and the 2026–27 season was bookable from Sept 1 2026. Max 3 sites per transaction. A separate older source says \"at least 72 hours in advance\" — that is a MINIMUM lead time, not the window. 520-724-5159." },
  { system: "state-park", leadMonths: null,
    what: "State park campgrounds", when: "Varies wildly — 30 days to 1 year",
    note: "Confirm the window as soon as the trip is real. Getting this wrong is the most common way to lose a site." },
  { system: "private", leadMonths: null,
    what: "Private campgrounds", when: "Usually anytime",
    note: "Call about after-hours arrival. Office cutoffs are the most common day-one failure." },
  { system: "first-come", leadMonths: null, reservable: false,
    what: "First-come dispersed", when: "No reservation possible",
    note: "Arrive early, drive the road once from the top, take the first acceptable site. Bail-out named in advance." },
  { system: "glacier-np", leadMonths: null,
    what: "Glacier NP", when: "Vehicle reservations are a separate system from camping",
    note: "You can hold one without the other. Verify the current year early." },
  { system: "buffalo-nr", leadMonths: 6,
    what: "Buffalo National River", when: "6-month window, minimum 5 days in advance",
    note: "Reservations required at Steel Creek, Ozark, Carver, Tyler Bend and Rush since Mar 13 2026. Older first-come guidance is dead." },
  { system: "baxter-sp", leadMonths: 4,
    what: "Baxter State Park", when: "Rolling 4 months",
    note: "First night plus 3 consecutive nights bookable online together as of summer 2026. Separate Day Use Parking Reservation for the Katahdin trailheads." },
  { system: "flights", leadMonths: null,
    what: "Flights", when: "~11 months when schedules open; sweet spot 2–5 months",
    note: "A range, not a deadline — deliberately left underivable." },
  { system: "rental-car", leadMonths: null,
    what: "Rental car / Turo", when: "2–3 months, re-check monthly",
    note: "Free cancellation means book early and rebook if the price drops." },
];

/* ==========================================================================
   AVAILABILITY — the calendar constraint layer.

   The hub's Calendar tab computes free windows from this rather than from a
   hand-maintained list, so when the term dates change the gaps recompute
   themselves. `classDays` is JS getDay(): 0=Sun … 6=Sat.

   SOURCE: university academic calendar, transcribed 2026-09-04. Class-day
   pattern is Colin's own schedule, not the university's.
   ========================================================================== */

const AVAILABILITY = {
  note:
    "Free windows are computed from term dates and weekly class days. A window is only listed if it costs zero missed classes — deciding to skip one is a judgment call the calendar shouldn't make for you.",

  terms: [
    {
      name: "Fall 2026",
      start: "2026-08-31", end: "2026-12-11",
      classDays: [1, 3],
      classNote: "Mon in-person · Wed remote 11:00–3:00, taken from camp (needs Starlink sky view)",
      noClass: [
        { date: "2026-09-07", name: "Labor Day" },
        { start: "2026-10-19", end: "2026-10-20", name: "Fall Break" },
        { date: "2026-11-11", name: "Veterans Day" },
        { start: "2026-11-25", end: "2026-11-27", name: "Thanksgiving Break" },
      ],
    },
    {
      name: "Fall 2026 finals",
      start: "2026-12-14", end: "2026-12-18",
      classDays: [1, 2, 3, 4, 5],
      classNote: "Final exam week — treat the whole week as blocked",
      noClass: [],
    },
    {
      name: "Spring 2027",
      start: "2027-01-19", end: "2027-04-30",
      classDays: [2, 4],
      classNote: "Tue + Thu in person (Senior Project). Two anchors a week means Fri–Mon is the only routine window.",
      noClass: [{ start: "2027-03-08", end: "2027-03-12", name: "Spring Break" }],
    },
    {
      name: "Spring 2027 finals",
      start: "2027-05-03", end: "2027-05-07",
      classDays: [1, 2, 3, 4, 5],
      classNote: "Final exam week",
      noClass: [],
    },
  ],

  /* Hard commitments that aren't trips. Blocked the same way a class day is.
     A `confirmed: false` entry is a PLACEHOLDER — the calendar still blocks it
     so the surrounding windows aren't overstated, but any window touching it
     is provisional until the real dates land. */
  blocked: [
    { start: "2026-12-25", end: "2026-12-30", name: "Frisco, CO — family (DATES UNCONFIRMED)", confirmed: false },
    { date: "2027-05-08", name: "🎓 Commencement", confirmed: true },
  ],

  /* The horizon. After this, PTO replaces the academic calendar and the
     whole planning model changes — which is the entire argument for
     spending 2027's summer on the trips that a two-week allowance can't hold. */
  horizon: { date: "2027-08-31", name: "Full-time work starts" },

  /* How long a window has to be before a mode is worth it. */
  modeFit: [
    { mode: "fly", minDays: 8, label: "Worth an airfare" },
    { mode: "drive", minDays: 5, label: "Long drive, 8–15 hrs each way" },
    { mode: "weekend", minDays: 3, label: "Inside a ~5 hr radius" },
  ],
};
