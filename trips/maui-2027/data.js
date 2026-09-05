// Full Circle Maui — Trip Data
//
// Rendered by ../../js/trip.js. See docs/TRIP_SPEC.md for the full schema and
// ../../template/trip-slug/data.js for an annotated blank.
//
// Coordinates marked verified:true were looked up and confirmed. Coordinates
// marked verified:false are intentionally NOT filled in — do not guess them.
// Confirm against a real source (Google Maps / official park site) before
// using for navigation. A coordinate 200 m off routes you to a locked gate on
// a one-lane road with no cell service.

const TRIP = {
  title: "Full Circle Maui",
  subtitle: "Solo, May 2027",
  dates: "Thursday, May 13, 2027 – Thursday, May 20, 2027",
  lengthLabel: "8 days / 7 nights",
  group: "1 person — Colin (solo)",
  vehicle:
    "Economy rental car. Turo strongly preferred — standard rental agreements prohibit the Piʻilani Highway (Kīpahulu–ʻUlupalakua) section outright.",
  route:
    "Counterclockwise island loop: Kahului → Olowalu (west) → South Maui lava coast → Paia → Hāna (east) → Piʻilani Hwy across the south flank → Haleakalā summit → Olowalu → OGG. No road driven twice except the OGG–Olowalu stub.",
  totalDistance: "~400 miles",
  totalDrivingHours: "~19 hours",
  theme: "ocean",
};

const DAYS = [
  {
    day: 1,
    date: "Thu May 13, 2027",
    title: "Touchdown",
    tagline: "Land, drive west, sleep by the reef.",
    type: "travel",
    driving: "~35 min, 25 miles (OGG → Olowalu)",
    overnight: {
      name: "Camp Olowalu",
      place: "Olowalu",
      kind: "Private campground",
      cost: "~$25/night",
      checkin: "Office 7:00 AM – 6:00 PM",
      confirmation: "TBD",
      notes:
        "Hard 6 PM office cutoff. Only ~30 min of margin. Call ahead about late arrival procedure when booking.",
    },
    schedule: [
      { time: "3:00 PM", text: "Land at OGG" },
      { time: "3:00–4:00 PM", text: "Checked bags + rental counter (solo, no one to split errands with)" },
      { time: "4:00–4:35 PM", text: "Drive to Camp Olowalu" },
      { time: "4:45 PM", text: "Check in, pitch tent (sunset 6:56 PM, ~2 hrs of light)" },
      { time: "5:30 PM", text: "Shakedown snorkel off camp — reef at mile marker 14, turtle cleaning station" },
      { time: "6:56 PM", text: "Sunset from the beach" },
    ],
    meals: { b: "airport/plane", l: "plane", d: "bought — Leoda's Kitchen & Pie Shop (Olowalu) or packed" },
    highlights: "Zero-effort first night. Best shore snorkel on the island is 100 yards from your tent.",
    warnings:
      "Do NOT try to squeeze a Costco run in today — cut for margin. Groceries move to Day 2. Fuel canisters can't fly; buy them tomorrow.",
  },
  {
    day: 2,
    date: "Fri May 14, 2027",
    title: "Lava Dawn, Then East",
    tagline: "Youngest rock on Maui at first light, oldest road on Maui by dusk.",
    type: "activity + drive",
    driving: "~4 hrs total, ~115 miles (Olowalu → La Pérouse → Paia → Waiʻānapanapa)",
    noSignal: "La Pérouse Bay — no service on the last mile in, or at the trailhead. Back in range returning through Kīhei.",
    overnight: {
      name: "Waiʻānapanapa State Park",
      place: "Hāna",
      kind: "State park",
      cost: "$30/night (non-resident)",
      checkin: "Park gate closes to outside visitors at 6:00 PM",
      confirmation: "TBD",
      notes: "Arrive before 6 PM. Sunset 6:54 PM.",
    },
    schedule: [
      { time: "4:30 AM", text: "Wake (body clock says 10:30 AM — jetlag is an asset today)" },
      { time: "5:00 AM", text: "Drive to La Pérouse Bay (~50 min). Last mile is narrow, bumpy, no cell service." },
      { time: "5:24 AM", text: "First light" },
      { time: "5:48 AM", text: "Sunrise" },
      { time: "5:50–9:30 AM", text: "Hoapili Trail (King's Highway) out to Cape Hanamanioa / toward Kanaio Beach" },
      { time: "10:00 AM", text: "Off the lava. Non-negotiable — zero shade, temps climb fast." },
      { time: "10:30–11:15 AM", text: "Makena Big Beach (Oneloa) swim/cooldown" },
      { time: "12:00 PM", text: "Kahului: Costco (bulk groceries + cheapest gas on island) + Walmart/Ace (fuel canisters, ice)" },
      { time: "1:30 PM", text: "Paia: Mana Foods (open 8:00 AM–8:30 PM) — deli, produce, camp food. Last real grocery before Hāna." },
      { time: "2:15 PM", text: "Depart Paia on Hāna Highway (~2 hrs remaining to Waiʻānapanapa)" },
      { time: "4:45 PM", text: "Arrive, set up camp" },
      { time: "6:54 PM", text: "Sunset over the black sand" },
    ],
    meals: { b: "made at camp", l: "bought — Paia Fish Market", d: "made — poke + rice from Mana Foods" },
    highlights: "Hoapili at dawn is the best geology on the island and you'll have it to yourself. Snorkel-to-lava-field-to-rainforest in one day.",
    warnings:
      "Closed-toe shoes on the lava, non-negotiable — aʻa shreds footwear. Carry 3L water. Gas up in Kahului; Hāna gas is limited and expensive.",
  },
  {
    day: 3,
    date: "Sat May 15, 2027",
    title: "Kīpahulu",
    tagline: "Bamboo, banyan, and a 400-foot waterfall.",
    type: "activity",
    driving: "~50 min, 22 miles round trip (Waiʻānapanapa ↔ Kīpahulu)",
    overnight: {
      name: "Waiʻānapanapa State Park",
      place: "Hāna",
      kind: "State park",
      cost: "$30/night",
      checkin: null,
      confirmation: null,
      notes: null,
    },
    schedule: [
      { time: "6:30 AM", text: "Wake, coffee, slow morning" },
      { time: "8:00 AM", text: "Drive to Kīpahulu (~11 miles, 25 min past Hāna)" },
      { time: "9:00 AM", text: "Kīpahulu Visitor Center opens (9:00 AM – 5:00 PM)" },
      { time: "9:15 AM–12:15 PM", text: "Pīpīwai Trail to Waimoku Falls" },
      { time: "12:30 PM", text: "Kūloa Point Loop (~0.5 mi) — ʻOheʻo Gulch overlook" },
      { time: "1:30 PM", text: "Lunch in Hāna town" },
      { time: "3:00 PM", text: "Hāna Bay, Kahanu Garden, or camp downtime" },
      { time: "6:54 PM", text: "Sunset" },
    ],
    meals: { b: "made", l: "bought — Braddah Hutt's BBQ or the Thai truck near Hāna Ballpark", d: "made" },
    highlights: "Banyan grove, the bamboo tunnel, Waimoku Falls. Best-effort-to-payoff hike on Maui.",
    warnings:
      "ʻOheʻo Gulch pools are closed to swimming and to walking down. Confirmed — don't plan on it. Keep your park entrance receipt; it covers 3 days across both districts and you'll reuse it on Day 5 and Day 6.",
  },
  {
    day: 4,
    date: "Sun May 16, 2027",
    title: "Hāna Coast",
    tagline: "Jump, swim, walk the old trail.",
    type: "activity / partial rest",
    driving: "~1 hr, ~30 miles local",
    overnight: {
      name: "Waiʻānapanapa State Park",
      place: "Hāna",
      kind: "State park",
      cost: "$30/night",
      checkin: null,
      confirmation: null,
      notes: null,
    },
    schedule: [
      { time: "6:00 AM", text: "Wake" },
      { time: "7:00–10:00 AM", text: "Waioka Pond (see Important Notes — grey-area access, real hazards)" },
      { time: "10:30 AM–1:00 PM", text: "Hāmoa Beach + Koki Beach (ʻĀlau islet view)" },
      { time: "1:00–4:00 PM", text: "Camp downtime, black sand beach, lava tube caves" },
      { time: "4:30–6:30 PM", text: "Waiʻānapanapa coastal trail (old Piʻilani trail) north toward the sea arch and blowholes — golden hour, straight out of camp" },
      { time: "6:55 PM", text: "Sunset" },
    ],
    meals: { b: "made", l: "made", d: "made" },
    highlights: "The coastal trail past the first quarter mile is empty. Sea stacks, blowholes, seabird colony.",
    warnings:
      "Hard rule at Waioka — no rain upstream in the last 24 hrs, no exceptions. Flash flood corridor with fatalities. Swim the landing zone before jumping anything; the rock beach physically moves between visits, so depth changes. Solo jumping is a materially worse risk than jumping with people around — consider scouting only unless others are present.",
  },
  {
    day: 5,
    date: "Mon May 17, 2027",
    title: "The Back Road",
    tagline: "Flex day, then across the far side of the volcano.",
    type: "drive / rest valve",
    driving: "~4 hrs, ~80 miles (Waiʻānapanapa → Kīpahulu → Piʻilani Hwy → ʻUlupalakua → Kula → Hosmer)",
    noSignal: "Piʻilani Highway, Kīpahulu to ʻUlupalakua — zero cell service the whole way. Roughly 09:00 to 14:00.",
    overnight: {
      name: "Hosmer Grove Campground",
      place: "Haleakalā NP, 6,800 ft",
      kind: "National park",
      cost: "$20/night",
      checkin: "Self-serve; after-hours check-in pavilion available",
      confirmation: "TBD (recreation.gov)",
      notes: "6 sites total. 5G cell service. Grills, picnic tables, pit toilets, potable water.",
    },
    schedule: [
      { time: "FLEX", text: "If wrecked, sleep in and skip straight to the 11:00 AM departure." },
      { time: "6:30–9:30 AM", text: "Optional: Kaihalulu (Red Sand Beach). Sketchy eroding access; dry conditions only." },
      { time: "10:00 AM", text: "Break camp, fill gas tank in Hāna — no fuel for the next 38 miles" },
      { time: "11:00 AM", text: "Depart Kīpahulu westbound on Piʻilani Highway (Hwy 31)" },
      { time: "11:00 AM–2:00 PM", text: "38 miles across the Kaupō Gap and the dry leeward flank. Drive slow, honk on blind corners." },
      { time: "2:15 PM", text: "ʻUlupalakua / Grandma's Coffee House, Keokea" },
      { time: "3:30 PM", text: "Up Crater Road (Rte 378) to Hosmer Grove, set up" },
      { time: "4:49 PM", text: "Moonrise (80% lit) — bright all night, see Important Notes" },
      { time: "7:01 PM", text: "Sunset from 6,800 ft" },
    ],
    meals: { b: "made", l: "packed (nothing on Piʻilani)", d: "made at Hosmer" },
    highlights: "The Kaupō Gap — the enormous erosional breach that helped carve Haleakalā's \"crater.\" You're driving through the cross-section.",
    warnings:
      "Check mauicounty.gov road notifications the morning of. This road closes routinely for culvert overflow, rockfall, and downed trees. Zero cell service. Full tank, extra water. If it's closed, fallback is the Hāna Highway back the way you came (~3.5 hrs); plan for either.",
  },
  {
    day: 6,
    date: "Tue May 18, 2027",
    title: "Into the Crater",
    tagline: "Down the headwall and back up.",
    type: "activity",
    driving: "~30 min, ~8 miles (Hosmer ↔ Halemauʻu Trailhead)",
    overnight: {
      name: "Hosmer Grove Campground",
      place: "Haleakalā NP, 6,800 ft",
      kind: "National park",
      cost: "$20/night",
      checkin: null,
      confirmation: null,
      notes: null,
    },
    schedule: [
      { time: "6:30 AM", text: "Wake (5:41 AM sunrise; sleep in a little, today's hike doesn't need dawn)" },
      { time: "8:00 AM", text: "Drive to Halemauʻu Trailhead (20.7522771, -156.2284596)" },
      { time: "8:30 AM–1:30 PM", text: "Halemauʻu Trail to Hōlua — switchbacks down a 1,000 ft headwall into the valley" },
      { time: "2:00 PM", text: "Hosmer Grove Nature Trail loop (0.5 mi, endemic birds — ʻiʻiwi, ʻapapane)" },
      { time: "4:00 PM", text: "Camp, layer up, early dinner" },
      { time: "7:01 PM", text: "Sunset" },
      { time: "3:45 AM (5/19)", text: "Set alarm. Moonset 4:17 AM. Dark sky window 4:17–5:15 AM. This is your only real stargazing." },
    ],
    meals: { b: "made", l: "packed", d: "made" },
    highlights: "The Halemauʻu switchbacks are the most dramatic trail feature on the island. Silverswords, cinder cones, nēnē.",
    warnings:
      "Altitude: you go sea level → sleeping at 6,800 ft → hiking near 8,000 ft within 36 hrs. Mild, but hydrate hard and don't be surprised by a headache. Nights in the mid-40s°F with drizzle — see Gear Notes, this is the weakest link in your kit.",
  },
  {
    day: 7,
    date: "Wed May 19, 2027",
    title: "Sunrise and Sliding Sands",
    tagline: "Watch the sun come up at 10,000 feet, then walk down into it.",
    type: "activity + drive",
    driving: "~2 hrs, ~70 miles (Hosmer → summit → Makawao → Olowalu)",
    overnight: {
      name: "Camp Olowalu",
      place: "Olowalu",
      kind: "Private campground",
      cost: "~$25/night",
      checkin: null,
      confirmation: null,
      notes: null,
    },
    schedule: [
      { time: "3:45 AM", text: "Wake. Moonset 4:17 AM." },
      { time: "4:20–5:10 AM", text: "Stargazing from camp or a summit pullout — the one dark window of the trip" },
      { time: "4:45 AM", text: "Drive to summit (~30 min, 11 miles up Crater Road)" },
      { time: "5:40 AM", text: "Sunrise at Puʻu ʻUlaʻula / Haleakalā Visitor Center (elevation-corrected; 7 min earlier than sea level)" },
      { time: "6:30–11:30 AM", text: "Keoneheʻeheʻe (Sliding Sands) down toward the first cinder cones and back. Cold, empty, perfect light." },
      { time: "12:30 PM", text: "Break camp at Hosmer, descend" },
      { time: "1:30 PM", text: "Komoda Store & Bakery, Makawao (cream puffs — closes when sold out, go early-ish)" },
      { time: "3:30 PM", text: "Arrive Camp Olowalu, set up" },
      { time: "6:58 PM", text: "Last sunset" },
    ],
    meals: { b: "made (pre-dawn, at camp)", l: "packed", d: "bought — Leoda's or Kihei poke" },
    highlights: "Sunrise reservation comes free with your Hosmer stay — you skip the 60-day booking scramble entirely. Descending Sliding Sands right after sunrise means cold air and an empty trail.",
    warnings:
      "You descend first and climb out at 8,000–10,000 ft, so this hikes harder than the mileage. Turn around at the halfway point of your energy, not your distance. Summit is 30–40°F at sunrise with wind — full layers.",
  },
  {
    day: 8,
    date: "Thu May 20, 2027",
    title: "Out",
    tagline: "One last swim.",
    type: "travel",
    driving: "~1 hr, ~45 miles",
    overnight: { name: "N/A — flight home", place: null, kind: null, cost: null, checkin: null, confirmation: null, notes: null },
    schedule: [
      { time: "6:00 AM", text: "Wake, break camp" },
      { time: "OPTION A (late flight)", text: "7:00 AM drive to Waiheʻe Ridge (20.9529, -156.5316), hike 7:30–10:30 AM. Be off it by noon before it clouds in. Shower/rinse, then OGG." },
      { time: "OPTION B (early/midday flight)", text: "7:00–9:00 AM final snorkel at Olowalu reef, shower at camp, Leoda's for the road, OGG." },
      { time: "—", text: "Return to OGG at least 2 hrs before departure" },
    ],
    meals: { b: "made", l: "bought — Leoda's or Tin Roof (Kahului)", d: "airport/plane" },
    highlights: "Waiheʻe Ridge is arguably the best hike on Maui and it's a different volcano entirely (Mauna Kahālāwai, ~1.3 Ma, deeply dissected).",
    warnings: "Waiheʻe parking lot is small and fills. Trail is muddy and slick after rain. Don't cut it close on the flight.",
  },
];

const LODGING = [
  { night: 1, date: "Thu 5/13", location: "Olowalu (west)", type: "Private campground", name: "Camp Olowalu", cost: "~$25", status: "Needs booking" },
  { night: 2, date: "Fri 5/14", location: "Hāna (east)", type: "State park", name: "Waiʻānapanapa SP", cost: "$30", status: "Needs booking" },
  { night: 3, date: "Sat 5/15", location: "Hāna (east)", type: "State park", name: "Waiʻānapanapa SP", cost: "$30", status: "Needs booking" },
  { night: 4, date: "Sun 5/16", location: "Hāna (east)", type: "State park", name: "Waiʻānapanapa SP", cost: "$30", status: "Needs booking" },
  { night: 5, date: "Mon 5/17", location: "Haleakalā, 6,800 ft", type: "National park", name: "Hosmer Grove", cost: "$20", status: "Needs booking" },
  { night: 6, date: "Tue 5/18", location: "Haleakalā, 6,800 ft", type: "National park", name: "Hosmer Grove", cost: "$20", status: "Needs booking" },
  { night: 7, date: "Wed 5/19", location: "Olowalu (west)", type: "Private campground", name: "Camp Olowalu", cost: "~$25", status: "Needs booking" },
];
const LODGING_TOTAL = "~$180";

const WAYPOINTS = [
  { name: "Kahului Airport (OGG)", lat: null, lng: null, verified: false, icon: "✈️", days: "1, 8", notes: "" },
  { name: "Camp Olowalu", lat: 20.80951, lng: -156.616477, verified: true, icon: "⛺", days: "1, 7", notes: "Office 7 AM–6 PM. (808) 661-4303" },
  { name: "La Pérouse Bay", lat: 20.5979905, lng: -156.4204539, verified: true, icon: "🌋", days: "2", notes: "No cell service. Rough final mile." },
  { name: "Makena Big Beach", lat: null, lng: null, verified: false, icon: "🏖️", days: "2", notes: "Dangerous shore break" },
  { name: "Costco Kahului", lat: null, lng: null, verified: false, icon: "🛒", days: "2", notes: "Cheapest gas on island" },
  { name: "Mana Foods", lat: 20.915528, lng: -156.380073, verified: true, icon: "🛒", days: "2", notes: "8:00 AM–8:30 PM. Last real grocery before Hāna." },
  { name: "Waiʻānapanapa State Park", lat: 20.7834865, lng: -155.997711, verified: true, icon: "⛺", days: "2–5", notes: "Gate closes 6 PM. (808) 248-4843" },
  { name: "Kīpahulu Visitor Center", lat: 20.6616396, lng: -156.0444889, verified: true, icon: "🌳", days: "3, 5", notes: "9 AM–5 PM. (808) 248-7375" },
  { name: "Hāmoa Beach", lat: null, lng: null, verified: false, icon: "🏖️", days: "4", notes: "" },
  { name: "Waioka Pond", lat: null, lng: null, verified: false, icon: "🤿", days: "4", notes: "Grey-area access — see notes" },
  { name: "Piʻilani Hwy east end (Kīpahulu)", lat: null, lng: null, verified: false, icon: "🛣️", days: "5", notes: "Gas up in Hāna first" },
  { name: "Grandma's Coffee House, Keokea", lat: null, lng: null, verified: false, icon: "☕", days: "5", notes: "" },
  { name: "Hosmer Grove Campground", lat: 20.7684079, lng: -156.2375389, verified: true, icon: "⛺", days: "5–7", notes: "5G service. After-hours check-in pavilion." },
  { name: "Halemauʻu Trailhead", lat: 20.7522771, lng: -156.2284596, verified: true, icon: "🥾", days: "6", notes: "Small lot, pit toilet" },
  { name: "Haleakalā Visitor Center", lat: 20.7150988, lng: -156.2497954, verified: true, icon: "🌅", days: "7", notes: "6 AM–12 PM. Sunrise lot fills — arrive by 5:00 AM." },
  { name: "Komoda Store & Bakery, Makawao", lat: null, lng: null, verified: false, icon: "🥐", days: "7", notes: "Closes when sold out" },
  { name: "Waiheʻe Ridge Trailhead", lat: 20.9529323, lng: -156.5316222, verified: true, icon: "🥾", days: "8", notes: "7 AM–7 PM. Small lot." },
  { name: "Puʻu Kekaʻa (Black Rock)", lat: 20.9269462, lng: -156.6963223, verified: true, icon: "🤿", days: "flex", notes: "Backup cliff jump. Strong current past the point." },
];

const HIKES = [
  { name: "Hoapili Trail (King's Highway)", day: 2, distance: "4–6 mi RT", gain: "Minimal", difficulty: "Moderate (terrain)", duration: "3–4 hr", notes: "Zero shade. Closed-toe shoes mandatory. Dawn start." },
  { name: "Pīpīwai Trail", day: 3, distance: "4.0 mi RT", gain: "~800 ft", difficulty: "Moderate", duration: "2.5–3 hr", notes: "Roots and rocks throughout. Bamboo tunnel, Waimoku Falls." },
  { name: "Waiʻānapanapa Coastal Trail", day: 4, distance: "3–4 mi RT", gain: "Minimal", difficulty: "Easy", duration: "2 hr", notes: "Sea arch, blowholes, seabird colony. Empty past the first ¼ mi." },
  { name: "Halemauʻu to Hōlua", day: 6, distance: "~7.5 mi RT", gain: "~1,400 ft", difficulty: "Strenuous", duration: "5 hr", notes: "Switchbacks down a 1,000 ft headwall." },
  { name: "Keoneheʻeheʻe (Sliding Sands)", day: 7, distance: "5–8 mi RT", gain: "1,500–2,500 ft (climb-out)", difficulty: "Strenuous (altitude)", duration: "4–5 hr", notes: "Descend first, climb out at 8,000–10,000 ft." },
  { name: "Waiheʻe Ridge Trail", day: "8 (opt.)", distance: "4.2 mi RT", gain: "1,600 ft", difficulty: "Moderate–strenuous", duration: "2.5–3 hr", notes: "2.1 mi each way. Steep start, muddy, clouds in by mid-morning." },
  { name: "Hosmer Grove Nature Loop", day: 6, distance: "0.5 mi", gain: "Minimal", difficulty: "Easy", duration: "30 min", notes: "Endemic forest birds. Straight from camp." },
];

/* Where each morning actually starts, so tools/sun.mjs can compute the table
   instead of anyone typing it. Coordinates come from verified waypoints by
   name — the tool refuses an unverified one, which is the same rule the map
   follows. Elevations are the published campground/summit figures.

   Regenerate:  node tools/sun.mjs maui-2027
   Check:       node tools/sun.mjs maui-2027 --check                        */
const SUN_MOON_SITES = [
  { date: "2027-05-13", label: "Olowalu", waypoint: "Camp Olowalu", tz: "Pacific/Honolulu" },
  { date: "2027-05-14", label: "La Pérouse → Hāna", waypoint: "La Pérouse Bay", tz: "Pacific/Honolulu" },
  { date: "2027-05-15", label: "Hāna", waypoint: "Waiʻānapanapa State Park", tz: "Pacific/Honolulu" },
  { date: "2027-05-16", label: "Hāna", waypoint: "Waiʻānapanapa State Park", tz: "Pacific/Honolulu" },
  { date: "2027-05-17", label: "Hosmer (6,800 ft)", waypoint: "Hosmer Grove Campground", elevationM: 2073, tz: "Pacific/Honolulu" },
  { date: "2027-05-18", label: "Hosmer (6,800 ft)", waypoint: "Hosmer Grove Campground", elevationM: 2073, tz: "Pacific/Honolulu" },
  { date: "2027-05-19", label: "Summit (10,023 ft)", waypoint: "Haleakalā Visitor Center", elevationM: 3055, tz: "Pacific/Honolulu" },
  { date: "2027-05-20", label: "Olowalu", waypoint: "Camp Olowalu", tz: "Pacific/Honolulu" },
];

const SUN_MOON = [
  { date: "Thu 5/13", location: "Olowalu", firstLight: "5:25 AM", sunrise: "5:49 AM", sunset: "6:56 PM", dark: "7:20 PM", moon: "52%" },
  { date: "Fri 5/14", location: "La Pérouse → Hāna", firstLight: "5:24 AM", sunrise: "5:48 AM", sunset: "6:54 PM", dark: "7:18 PM", moon: "59%" },
  { date: "Sat 5/15", location: "Hāna", firstLight: "5:22 AM", sunrise: "5:46 AM", sunset: "6:54 PM", dark: "7:18 PM", moon: "66%" },
  { date: "Sun 5/16", location: "Hāna", firstLight: "5:21 AM", sunrise: "5:45 AM", sunset: "6:55 PM", dark: "7:19 PM", moon: "73%" },
  { date: "Mon 5/17", location: "Hosmer (6,800 ft)", firstLight: "5:15 AM", sunrise: "5:41 AM", sunset: "7:01 PM", dark: "7:27 PM", moon: "80% — moonset 3:38 AM" },
  { date: "Tue 5/18", location: "Hosmer (6,800 ft)", firstLight: "5:15 AM", sunrise: "5:41 AM", sunset: "7:01 PM", dark: "7:27 PM", moon: "87% — moonset 4:17 AM" },
  { date: "Wed 5/19", location: "Summit (10,023 ft)", firstLight: "5:13 AM", sunrise: "5:40 AM", sunset: "7:03 PM", dark: "7:29 PM", moon: "94%" },
  { date: "Thu 5/20", location: "Olowalu", firstLight: "5:22 AM", sunrise: "5:47 AM", sunset: "6:59 PM", dark: "7:23 PM", moon: "Full moon" },
];

const WEATHER = [
  { location: "Olowalu / West Maui", elevation: "Sea level", high: 84, low: 68, notes: "Dry season. Under 2 in. monthly rainfall in leeward areas Apr–Oct." },
  { location: "La Pérouse / South Maui", elevation: "Sea level", high: 86, low: 68, notes: "Hottest, driest, zero shade on the lava." },
  { location: "Waiʻānapanapa / Hāna", elevation: "Sea level", high: 80, low: 68, notes: "Windward. Rains often regardless of season — expect at least one wet day." },
  { location: "Hosmer Grove", elevation: "6,800 ft", high: "60–65", low: "45–50", notes: "Drizzle and cloud common. Wind." },
  { location: "Haleakalā summit", elevation: "10,023 ft", high: "55–60", low: "32–40", notes: "Sunrise is 30–40°F with wind chill." },
];

const BUDGET = [
  { category: "Car rental (7 days, economy)", cost: 420, notes: "Maui tax load is heavy — this is all-in" },
  { category: "Young driver fee (under 25)", cost: 60, notes: "With AAA. Without it, ~$210." },
  { category: "AAA membership", cost: 60, notes: "Waives the Hertz young-renter fee for ages 20–24. Verify at booking." },
  { category: "Gas (~400 mi)", cost: 75, notes: "Fill at Costco Kahului" },
  { category: "Camping (7 nights)", cost: 180, notes: "See Lodging Summary" },
  { category: "Groceries", cost: 180, notes: "Costco + Mana Foods" },
  { category: "Restaurants (~6 meals)", cost: 135, notes: "" },
  { category: "Park fees", cost: 1, notes: "America the Beautiful pass covers entry; $1 sunrise reservation" },
  { category: "Waiʻānapanapa day-use entry", cost: 15, notes: "$10 parking + $5 entry — verify whether camping permit covers this" },
  { category: "Satellite communicator rental", cost: 50, notes: "Strongly recommended — solo Piʻilani + solo lava hiking" },
  { category: "Fuel canisters, ice, misc.", cost: 40, notes: "" },
];
const BUDGET_SUBTOTAL = 1216;
const BUDGET_BUFFER = 146;
const BUDGET_TOTAL = 1362;
const BUDGET_NOTE = "Excludes airfare (CLE→OGG, budget separately, ~$700–900 RT typical). Inside the $1–2k target.";

const PACKING = [
  {
    category: "Sleep system (the weak link — read Gear Notes)",
    items: [
      "Tent (2-person, existing)",
      "Sleeping bag — needs to handle 45°F, not just summer temps",
      "Sleeping pad — existing pad deflates overnight; replace before this trip",
      "Puffy jacket (doubles as sleep layer at Hosmer)",
      "Warm hat, gloves",
    ],
  },
  {
    category: "Clothing",
    items: [
      "Rain shell (Hāna and Hosmer, guaranteed use)",
      "Fleece or midlayer",
      "2× hiking shirts, 2× shorts, 1× long pants",
      "Wool socks ×4, liner socks",
      "Swim trunks ×2 (one always wet)",
      "Sun hat, sunglasses",
      "Camp shoes / sandals",
    ],
  },
  {
    category: "Footwear",
    items: [
      "Hiking boots",
      "Closed-toe shoes you don't mind destroying — aʻa lava on Hoapili",
      "Water shoes or reef booties — Waiʻānapanapa's \"black sand\" is coarse basalt pebbles that cut",
    ],
  },
  {
    category: "Water & snorkel",
    items: ["Snorkel, mask, fins (checked)", "Rash guard (better sun protection than sunscreen for long snorkels)", "Dry bag", "Quick-dry towel"],
  },
  {
    category: "Hiking",
    items: [
      "Trekking poles (Sliding Sands climb-out, Waiheʻe mud)",
      "Daypack (Mystery Ranch Coulee 30)",
      "3L water capacity minimum — Hoapili has zero water and zero shade",
      "Headlamp + spare batteries (3:45 AM starts on Day 7)",
      "Reef-safe sunscreen (required by Hawaii law)",
    ],
  },
  {
    category: "Camp kitchen",
    items: [
      "Lightweight pot, stove",
      "Fuel canisters — BUY ON ISLAND, cannot fly. Walmart or Ace, Kahului, Day 2.",
      "Spork, knife, cutting surface",
      "Cooler (small) + ice from Kahului",
    ],
  },
  {
    category: "Navigation & safety",
    items: [
      "Offline maps downloaded for the entire island — before you leave Ohio",
      "Satellite communicator (rent) — Piʻilani has zero cell service",
      "Printed sunrise reservation + photo ID (paper copy required at the Haleakalā entrance station)",
      "Printed camping permits",
      "First aid kit",
      "Trip plan texted to someone at home, with your Piʻilani crossing time on 5/17",
    ],
  },
  {
    category: "Documents",
    items: ["America the Beautiful pass", "AAA card", "Driver's license, rental confirmation"],
  },
];

const RESERVATIONS = [
  { text: "Flights CLE→OGG — target ~3:00 PM arrival 5/13 — book when schedules open (~11 months out)" },
  { text: "Confirm Waiʻānapanapa camping booking window (1 year vs 90 days) — do this NOW so the alarm is set correctly" },
  { text: "Camp Olowalu 5/13 + 5/19 — book direct anytime — call about the 6 PM check-in cutoff" },
  { text: "Hosmer Grove 5/17 + 5/18 — recreation.gov opens ~Nov 13, 2026 (6 months out) — 6 sites total, book the morning it drops" },
  { text: "Waiʻānapanapa camping 5/14–5/16 — ~Feb 2027 if 90-day window" },
  { text: "Waiʻānapanapa day-use entry — opens ~Apr 13, 2027 (30 days out) — verify if camping permit already covers entry" },
  { text: "AAA membership — before booking the car" },
  { text: "Rental car — ~Mar 2027 — Turo preferred, confirm Piʻilani permission in writing" },
  { text: "Satellite communicator rental — ~2 weeks out" },
  { text: "Replace sleeping pad — before departure" },
  { text: "Morning of 5/17: check mauicounty.gov road notifications for Piʻilani closures" },
];

const NOTES = [
  {
    heading: "For the developer",
    body:
      "Do not fabricate coordinates or confirmation numbers. Waypoints marked verified were confirmed by lookup; blanks are intentional and must be confirmed against a real source before shipping. A coordinate 200 meters off routes the user to a locked gate on a one-lane road with no cell service.",
  },
  {
    heading: "Piʻilani Highway (Day 5) — the calculated risk",
    body:
      "Colin has accepted this. The facts: 38 miles, mostly paved with gravel/dirt sections, roughest ~6 miles narrows to a single lane on sharp bends; at Lelekea Bay it's a one-and-a-half-lane road hugging a sea cliff around a blind curve with rockfall fencing. Standard rental agreements prohibit the Kīpahulu–ʻUlupalakua section outright, citing no phone signal, with the renter liable for all towing costs. The road closes routinely — during Hurricane Lala in Aug 2026 it was closed at MM37 for culvert overflow plus a separate closure at ʻUlupalakua for downed trees. Fallback if closed: return via the Hāna Highway, ~3.5 hrs. Budget the whole day either way.",
  },
  {
    heading: "The moon",
    body:
      "Nights of 5/17 and 5/18 have a bright waxing gibbous (80–87% lit) up nearly all night. Hosmer is not a stargazing destination on these dates. The only genuinely dark windows are 4:17–5:15 AM on 5/19 (after moonset, before twilight) — which is scheduled. A trip shifted to ~May 6–13 would have hit near new moon; Colin chose to keep the original dates knowingly.",
  },
  {
    heading: "Waioka Pond (Day 4)",
    body:
      "The only access trail crosses posted Hāna Ranch land; the pool itself is state land. Reaching it means trespassing, police have ticketed the roadside parking, and it sits in a flash flood corridor where people have died. Jumps range roughly 10 to 40 ft. The rock beach physically shifts with stream and ocean conditions, so depth varies between visits. Solo, the risk profile is materially worse — no one to pull you out. Recommendation: scout on arrival, jump only if other people are present, and abort entirely if there's been rain upstream in 24 hours. Black Rock (Kāʻanapali) is the sanctioned alternative — deep water, easy re-entry, but avoid the strong current past the point.",
  },
  {
    heading: "Gear — the identified weak link",
    body:
      "Current kit is a summer-weight bag, a summer pad that already deflates halfway through the night, and a 2-person tent. Hosmer at 6,800 ft in May runs mid-40s°F with drizzle. Two consecutive nights there immediately precede the biggest hike of the trip. Fix the pad before departure or plan to sleep in the puffy.",
  },
  {
    heading: "Altitude",
    body:
      "Sea level → sleeping at 6,800 ft → hiking near 10,000 ft in roughly 36 hours. Mild by mainland standards, but real. Hydrate aggressively on Days 5–6, and treat a headache on the first Hosmer night as normal rather than alarming.",
  },
  {
    heading: "Solo travel protocol",
    body:
      "Trip plan texted home before departure, with the Piʻilani crossing time on 5/17. Offline maps for the whole island, downloaded before leaving. Satellite communicator for Days 2, 5, and 7 minimum. Do not push a turnaround on Sliding Sands — the climb-out is the hard half and there's nobody to share water with.",
  },
  {
    heading: "Closures and hard times to respect",
    body:
      "Camp Olowalu office: 7 AM – 6 PM (Day 1 pinch point). Waiʻānapanapa gate to outside visitors: closes 6 PM (Day 2). Kīpahulu Visitor Center: 9 AM – 5 PM. Haleakalā Visitor Center: 6 AM – 12 PM. ʻOheʻo Gulch pools: closed to swimming and to descending. ʻĀhihi-Kinaʻu reserve: closed — drive-through only; lava hikes past its southern boundary at La Pérouse remain open. Sunrise entry window: 3:00–7:00 AM, paper reservation + photo ID required at the entrance station.",
  },
  {
    heading: "Food strategy",
    body:
      "Hawaii supermarket poke and deli counters are the budget lever — fresh poke by the pound plus pre-made rice is a zero-cook dinner that eats better than most restaurants. Buy bulk at Costco Kahului (Day 2), restock at Mana Foods in Paia before the Hāna leg. Nothing decent exists past Paia; the Hāna Ranch Store is emergency-only. Worth spending on: Tin Roof (Kahului), Sam Sato's (Wailuku, closes early afternoon), Paia Fish Market, Braddah Hutt's (Hāna), Komoda Store & Bakery (Makawao), Leoda's (Olowalu), Grandma's Coffee House (Keokea). Verify all hours before the trip — small Maui spots close early and some have relocated since the 2023 fire.",
  },
  {
    heading: "Respect",
    body:
      "Camp Olowalu sits ~6 miles south of Lahaina. The fire footprint is still visible and residents are still living it. Drive through, don't sightsee. Puʻu Kekaʻa is a leina a ka ʻuhane — a place where souls were said to depart the island. Waioka is the real name; \"Venus Pool\" is a guidebook invention.",
  },
];

/* --------------------------------------------------------------------------
   Assembly — hands the data above to the shared renderer. Everything the
   renderer needs is in here; the consts above are just the source of truth.
   -------------------------------------------------------------------------- */

window.TRIP_DATA = {
  meta: {
    slug: "maui-2027",
    title: TRIP.title,
    subtitle: TRIP.subtitle,
    dates: TRIP.dates,
    emoji: "🌺",
    theme: TRIP.theme,
    route: TRIP.route,
    vehicle: TRIP.vehicle,
    stats: [
      { num: "8 days", lbl: "Length" },
      { num: TRIP.totalDistance, lbl: "Distance" },
      { num: TRIP.totalDrivingHours, lbl: "Driving" },
      { num: "7", lbl: "Nights camping" },
    ],
    overviewCards: [
      { h: "Dates", p: `${TRIP.dates}<br>${TRIP.lengthLabel}` },
      { h: "Group", p: TRIP.group },
      { h: "Total distance", p: `${TRIP.totalDistance}, ${TRIP.totalDrivingHours} driving` },
      {
        h: "Lodging",
        p: "7 nights camping — 2 private (Camp Olowalu), 3 state park (Waiʻānapanapa), 2 national park (Hosmer Grove)",
      },
    ],
    footerNote:
      'Built from the trip spec. Coordinates marked "unverified" are intentionally blank; confirm before navigating. <a href="../../index.html">← All trips</a>',
  },

  days: DAYS,
  lodging: { rows: LODGING, total: LODGING_TOTAL, summary: `7 nights camping · ${LODGING_TOTAL} total` },
  waypoints: WAYPOINTS,
  hikes: { title: "Hikes &amp; Trails", rows: HIKES },
  sunMoon: SUN_MOON,
  sunMoonSites: SUN_MOON_SITES,
  sunMoonNote: "Calculated, elevation-corrected. ~13 hours of daylight daily.",
  weather: WEATHER,
  budget: {
    rows: BUDGET,
    subtotal: BUDGET_SUBTOTAL,
    buffer: BUDGET_BUFFER,
    bufferLabel: "Buffer (12%)",
    total: BUDGET_TOTAL,
    note: BUDGET_NOTE,
  },
  packing: PACKING,
  reservations: RESERVATIONS,
  notes: NOTES,
  map: { center: [20.79, -156.32], zoom: 10 },
};
