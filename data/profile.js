/* ==========================================================================
   profile.js — the traveler profile. This is the "applies to every trip"
   layer: how Colin travels, what's in the kit, what always has to happen
   before wheels up.

   EVERYTHING HERE WAS DERIVED FROM THE MAUI 2027 TRIP SPEC. It has not been
   independently confirmed. Fix anything that's wrong — this file is what a
   trip generator reads to make a plan feel like yours instead of a listicle.

   Gear `state` values: "own" | "replace" | "need" | "rent"
   ========================================================================== */

const PROFILE = {
  name: "Colin",
  homeBase: "Cleveland, Ohio (CLE)",
  defaultGroup: "Solo",
  defaultBudget: "$1,000–2,000 per trip, excluding airfare",
  driverNote:
    "Under 25 — young-driver fees apply to every rental. AAA membership waives the Hertz young-renter fee for ages 20–24; verify at booking. Turo avoids most of it and avoids rental-agreement road bans.",
};

/* The style rules. A trip that violates one of these needs a reason written
   into its Notes, not a quiet exception. */
const PRINCIPLES = [
  "Camping-first. Campgrounds over hotels unless the campground genuinely doesn't exist or the weather makes it stupid.",
  "No road driven twice. Loops beat out-and-backs; if a stub repeat is unavoidable, make it the shortest one.",
  "Dawn starts. The best light, the empty trailhead and the cool air are all before 8 AM. Plan around first light, not around opening hours.",
  "Geology is the through-line. Lava fields, fault scarps, dissected volcanoes, canyon stratigraphy — the 'why does this landscape look like this' is half the point.",
  "Grocery store over restaurant. Poke counters, deli counters, bulk warehouse runs. Budget 4–6 restaurant meals per week and make them count.",
  "One hard day, then a recovery day. Don't stack two strenuous hikes back to back on a solo trip.",
  "Calculated risk, documented. Risky segments get their own note with real numbers and a stated fallback — not a warning label and not silence.",
  "Respect the place. Real place names over guidebook inventions. Sacred and grieving places get driven through, not sightseen.",
];

/* The kit. `state` drives the color chip on the hub. */
const GEAR = [
  {
    category: "Sleep system",
    note: "The identified weak link. Two of three items are inadequate below ~55°F.",
    items: [
      { name: "2-person tent", state: "own", note: "" },
      { name: "Sleeping bag", state: "replace", note: "Summer weight. Does not handle 45°F nights — a problem at any campground above ~5,000 ft." },
      { name: "Sleeping pad", state: "replace", note: "Deflates halfway through the night. Replace before the next trip, not during it." },
      { name: "Puffy jacket", state: "own", note: "Doubles as a sleep layer at altitude." },
    ],
  },
  {
    category: "Pack & hiking",
    items: [
      { name: "Mystery Ranch Coulee 30 daypack", state: "own", note: "" },
      { name: "Trekking poles", state: "own", note: "" },
      { name: "Hiking boots", state: "own", note: "" },
      { name: "3L water capacity", state: "own", note: "Non-negotiable minimum for any desert or lava-field day." },
      { name: "Headlamp + spare batteries", state: "own", note: "Pre-dawn starts are the norm." },
    ],
  },
  {
    category: "Water",
    items: [
      { name: "Snorkel, mask, fins", state: "own", note: "Checked baggage." },
      { name: "Rash guard", state: "own", note: "Better sun protection than sunscreen on long snorkels." },
      { name: "Dry bag + quick-dry towel", state: "own", note: "" },
      { name: "Water shoes / reef booties", state: "own", note: "Coarse basalt 'black sand' beaches cut bare feet." },
    ],
  },
  {
    category: "Camp kitchen",
    items: [
      { name: "Lightweight stove + pot", state: "own", note: "" },
      { name: "Fuel canisters", state: "need", note: "CANNOT FLY. Buy on arrival, every trip. Locate the store before you land." },
      { name: "Small cooler", state: "own", note: "Ice from the first bulk grocery stop." },
    ],
  },
  {
    category: "Safety & navigation",
    items: [
      { name: "Satellite communicator", state: "rent", note: "~$50/trip. Non-optional for solo days without cell service. Book ~2 weeks out." },
      { name: "Offline maps", state: "own", note: "Download the whole region BEFORE leaving home. Not from the airport wifi." },
      { name: "First aid kit", state: "own", note: "" },
    ],
  },
  {
    category: "Documents & memberships",
    items: [
      { name: "America the Beautiful pass", state: "own", note: "Covers NPS entry. Does not cover state park fees or timed-entry reservations." },
      { name: "AAA membership", state: "own", note: "Waives the Hertz under-25 fee. Verify it still applies at booking — this changes." },
      { name: "Printed permits + reservations", state: "need", note: "Paper copies. Some entrance stations require paper + photo ID and have no signal to look you up." },
    ],
  },
];

/* Runs on every trip regardless of destination. The trip's own Reservations
   list handles the destination-specific stuff. */
const UNIVERSAL_CHECKLIST = [
  "Trip plan texted to someone at home, with the date and time of any no-signal segment",
  "Offline maps downloaded for the entire region, before leaving home",
  "Satellite communicator booked (~2 weeks out) for any solo no-signal day",
  "Permits and reservations printed on paper, plus photo ID",
  "Sleeping pad and bag confirmed adequate for the coldest night on the itinerary",
  "Fuel canister source identified at the destination (can't fly with them)",
  "Rental car: young-driver fee handled, and any road restrictions confirmed in writing",
  "Travel/medical coverage checked for anything remote or overseas",
];

/* Generic booking-window rules. Destination-specific windows live on the trip
   page — these are the defaults to reason from when planning a new one. */
const BOOKING_WINDOWS = [
  { what: "US National Park campgrounds (recreation.gov)", when: "6 months ahead, 10:00 AM ET", note: "Small campgrounds sell out in seconds. Set an alarm for the exact drop." },
  { what: "NPS timed-entry / sunrise reservations", when: "Typically 60 days, plus a next-day release", note: "Staying inside the park often bypasses the lottery entirely — check before you fight for one." },
  { what: "State park campgrounds", when: "Varies wildly — 30 days to 1 year", note: "Confirm the window as soon as the trip is real. Getting this wrong is the #1 way to lose a site." },
  { what: "Private campgrounds", when: "Usually anytime", note: "Call about after-hours arrival. Office cutoffs are the most common day-one failure." },
  { what: "Flights", when: "~11 months when schedules open; sweet spot 2–5 months", note: "" },
  { what: "Rental car / Turo", when: "2–3 months, re-check monthly", note: "Free cancellation means book early and rebook if the price drops." },
  { what: "Backcountry / wilderness permits", when: "Lottery, often 4–6 months, sometimes January for the whole year", note: "The one item that can dictate the trip's dates instead of the other way around." },
];
