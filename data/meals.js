/* ==========================================================================
   meals.js — THE CAMP KITCHEN. Recipes, technique and cooler doctrine that
   outlive any one trip.

   WHY THIS FILE EXISTS: the same meals were being re-typed into every trip's
   data.js. `oats-plus` appears five times across two trips, the foil burrito
   twice, the sourdough sub twice, breakfast tacos twice — each with slightly
   different wording and calorie counts. A destination changes; one burner,
   one pot, one pan and one portion do not.

   SOURCE: transcribed 2026-09-07 from trips/kentucky-2026/data.js and
   trips/appalachians-2026/data.js. Nothing here is invented. Where the trip
   files gave a quantity, it is here; where they didn't, the field says so
   rather than guessing a number.

   ⚠️ KNOWN GAP: the original MEALS-trip1-kentucky.md and
   MEALS-trip2-october.md are cited by both trip pages but are NOT in this
   repo. Full ingredient lists, per-meal grams and the eleven-day cooler
   timeline live in those files. Paste them and this library gets complete.

   FIELD CONTRACT
     id        stable slug. Trip days reference it; the validator checks both
               directions, so a typo is a build failure, not a dead link.
     type      breakfast | lunch | dinner | drink
     method    bag | boil | one-pot | pan | assemble | no-cook | thermos
     cleanup   none | low | med | high — the field that decides WHERE a meal
               can be scheduled. `high` is only legal at a site with potable
               water. This is the single most load-bearing field here.
     water     none | boil-only | wash-needed
     kcal      as stated by the trip file. null when never stated.
     usedOn    every slot this has actually filled. { slug, code, day, meal }
               `code` is the trip's own label (K-B1, O-D6). Kept because the
               printed meal sheets use those codes.
   ========================================================================== */

/* The constraints every recipe below is built to. Change one of these and
   half the library stops working. */
const KITCHEN = {
  burners: "One burner. Two things cannot be hot at once — every multi-part meal is sequential, and the sequence is part of the recipe.",
  cookware: "One 2L pot with lid, one 8–10 in pan, insulated mug, spork, long-handled spoon, folding knife, spatula.",
  portions: "Solo. Every quantity in this file is one serving. Nothing here scales without re-checking pot volume.",
  cooler: "48 qt, pre-chilled. ~2.5 days unaided at 75°F. Frozen meals in flat quart bags ARE the ice.",
  excluded: "No coffee, no alcohol. Hot chocolate does the pre-dawn job caffeine would.",
  spice: "1–2 of 5. Background heat is welcome; heat as the point of the dish is not. Chorizo, salsa and taco seasoning stay, but at the mild end and never stacked.",
  calories: "~3,000 kcal/day on a hiking trip, confirmed rather than assumed. Portions here are sized to that.",
  thermos: "One wide-mouth thermos, and staying at one. The routine it serves is snack → hike → hot meal at the turnaround → hike out.",
};

/* Hard constraints. These are enforced, not advisory — the same standing as
   DECLINED and AVOID in data/profile.js.

   ⚠️ OPEN: oral allergy syndrome is food-specific, not category-wide. Which
   pollens someone reacts to decides which foods cross-react, so "raw fruit"
   is the shape of the problem, not the list. The affected recipes below are
   flagged `review: "oas"` until Colin names the specific triggers. Cooking
   and roasting are the ordinary workaround because the proteins involved are
   heat-labile.

   RESOLVED Sept 2026: <b>roasted nuts are fine.</b> Every nut in this library
   is therefore a buying instruction — roasted, not raw — and not a problem.

   STILL OPEN: raw fruit (the apples in two lunches) and dried fruit. Drying is
   not cooking, so dried apricots, figs, mango and banana chips are flagged
   rather than assumed safe either way. */
const CONSTRAINTS = [
  {
    what: "Oral allergy syndrome — raw fruit and vegetables",
    rule: "Raw is the problem, not the ingredient. <b>Roasted nuts are confirmed fine</b>, so every nut here is a buying instruction rather than a restriction. Cooked vegetables and cooked fruit are the workaround on that side. <b>Raw fruit and dried fruit are still open</b> — the recipes carrying them stay flagged until Colin says which are actually a problem.",
    level: "blocking",
  },
  {
    what: "Spice ceiling 1–2 of 5",
    rule: "Background heat only. Do not stack chorizo + salsa + hot sauce in one meal, and never make heat the reason a dish is interesting.",
    level: "firm",
  },
  {
    what: "No near-zero-calorie filler",
    rule: "<b>His rule, verbatim in spirit:</b> an ingredient that only tastes acceptable once seasoned, sauced and cooked isn't worth carrying. Vegetables earn their place by carrying calories or flavour — peppers, onion, potato — not by being vegetables. Celery, lettuce and courgette do not.",
    level: "firm",
  },
  {
    what: "Simple over clever",
    rule: "Fewer components, fewer steps. Speed is a feature in its own right, separately from cleanup — a good meal that is also quick scores higher than a good meal that isn't.",
    level: "preference",
  },
  {
    what: "No coffee, no alcohol",
    rule: "Standing. See AVOID in data/profile.js, which the validator enforces.",
    level: "blocking",
  },
];

/* The reusable technique. These are the things that took a trip to learn and
   should never have to be learned twice. */
const KITCHEN_DOCTRINE = [
  "<b>Frozen flat is the whole system.</b> A cooked meal frozen flat in a quart bag chills everything above it, takes no extra space, and then gets eaten. You are not packing ice and food — the food is the ice.",
  "<b>Block ice, never cubes.</b> 2–3× the life for the same money. Buy it at resupply. On any trip longer than three days this is not an optimization, it is the thing keeping the meat safe.",
  "<b>Cleanup level decides the campsite, not the appetite.</b> A HIGH-cleanup meal is only scheduled where there is potable water and preferably a sink. Ribeye night went to Bandy Creek for the free hot showers, not for the view.",
  "<b>The boil-bag primitive.</b> Boil water, pour into a labeled bag mixed at home, roll, wait, eat from the bag. Zero cookware touches food; the pot only ever held water, so a bandana wipe is the whole wash-up. This is what makes a waterless campsite survivable.",
  "<b>Pre-mix at the kitchen table, not at the trailhead.</b> Every boil-bag meal only works if the bag already exists. Five bags mixed in October solved the entire Linville leg before the car left the driveway.",
  "<b>The four things that turn a can into a meal:</b> olive oil in a squeeze bottle, hard cheese, crushed chips, a starch pouch. Carry all four and no dinner is ever just a can.",
  "<b>The routine is snack → hike → hot thermos meal at the turnaround → hike out.</b> That is the shape most days want, and it is why the thermos matters more than a stove at the destination. Build the day's one hot carried meal around it.",
  "<b>A dinner can repeat, just not back to back.</b> Corrected Sept 2026 — the earlier library assumed no dinner ever repeats on a trip and built around a constraint that was never real. Two nights apart is fine, which makes a long trip much easier to provision.",
  "<b>Raw is the constraint, not the ingredient.</b> Oral allergy syndrome means raw nuts, fruit and vegetables can irritate where the cooked or roasted version doesn't. Roasted nuts are confirmed fine, so nuts are a buying instruction, not a restriction. Raw and dried fruit are still open — reach for cooked fruit rather than dropping the calories.",
  "<b>The wide-mouth thermos is load-bearing.</b> Hot oats on a dark ridge and a hot dinner at an overlook are the same trick. There is one and there will be one — so on a pre-dawn morning the hot meal wins and the hot chocolate gets dropped. Plan for that rather than around a second flask.",
  "<b>Cured, aged and oil-packed food does not need a cooler.</b> Salami, capicola, provolone, olive salad, oil-packed tomato. This is why a pressed sandwich survives ten hours in a pack and why the lunch slot rarely touches Zone 2.",
  "<b>A pressed sandwich gets better squashed.</b> Build it the night before, wrap in parchment then foil, put it under the cooler lid. The weight is the recipe.",
  "<b>Cook double the starch whenever the pot is already dirty.</b> Friday's potatoes are Saturday's breakfast, and Saturday drops from 25 minutes to 14.",
  "<b>The last cooler meal is scheduled, not improvised.</b> One slot per trip exists purely to empty Zone 2 — quesadillas or a hash from whatever remains. Cook what is left and do not be precious about it.",
  "<b>In the dark, in the cold, anything harder than boil-water fails.</b> A 7:30 PM arrival at 35°F with a headlamp on is a boil-bag slot. Schedule ambition for daylight.",
];

/* Zone model for the 48qt. Referenced by every trip's provisions section. */
const COOLER_ZONES = [
  { zone: "Zone 1", what: "Cooked meals frozen flat in quart bags", role: "This is your ice. It chills Zone 2 from below and then becomes dinner. Plan the eating order — the last frozen bag out is the last day it can hold temperature.", risk: "low" },
  { zone: "Zone 2", what: "Eggs, dairy, produce, raw meat", role: "<b>The zone that ruins trips.</b> Keep it small, eat it early, and schedule a meal whose job is to empty it.", risk: "high" },
  { zone: "Zone 3", what: "Shelf-stable — pouches, cured meat, hard cheese, tortillas, starch", role: "Takes no cooler space at all. Every day past the ice window runs on Zone 3, so the back half of a long trip should already be shelf-stable by design.", risk: "none" },
];

/* Bought on every trip regardless of destination. The trip-specific grocery
   list is whatever this doesn't already cover. */
const PANTRY = [
  { item: "Olive oil in a squeeze bottle", why: "One of the four. Never travels without it." },
  { item: "Hard cheese — aged cheddar or parmesan", why: "Zone 3. Turns a starch into a dinner." },
  { item: "Crushed chips — Fritos hold up best", why: "Texture on anything wet. Split the bag lengthwise and pour the chili in." },
  { item: "Starch pouches — instant rice, couscous", why: "The 5-minute base under any pouch protein." },
  { item: "Chicken and salmon pouches", why: "Shelf-stable protein, no cookware, eats straight from the pouch when there's no water." },
  { item: "Tortillas", why: "Survive being sat on. Bread does not — it's crumbs after four hours of scrambling." },
  { item: "Peanut butter packets + honey", why: "The last 200 kcal of any breakfast, stirred in off-heat." },
  { item: "Whole milk powder", why: "Goes in every pre-mixed oats and hot chocolate bag. The fat is the point at 50°F." },
  { item: "Instant oats packets", why: "Base of the single most-used recipe in this file." },
  { item: "Bars, jerky, trail mix, dried fruit, roasted nuts", why: "The lunch slot's back half, every trip. Buy <b>roasted</b> nuts, always — raw is the oral-allergy trigger and standard trail mix is raw. Roasted is confirmed fine, so this costs nothing." },
];

/* ---------------------------------------------------------------- RECIPES */

const MEALS = [
  /* ============================================================ BREAKFAST */
  {
    id: "oats-plus",
    review: { code: "oas", why: "Dried fruit — dates, apricots, banana chips — is unresolved. Pecans are fine: buy them <b>roasted</b>." },
    name: "Hot oats+",
    type: "breakfast",
    method: "boil",
    cleanup: "low",
    water: "boil-only",
    kcal: 970,
    kcalRange: "970–1,150 depending on the nut load",
    time: "6 min",
    cookware: ["pot"],
    prepAtHome: "Pre-mix into a labeled bag: 2 instant oats packets · 25 g whole milk powder · nuts (pecans) · dried fruit (dates, banana chips) · pinch of salt. Peanut butter goes in <b>last, off the heat</b>.",
    ingredients: [
      "2 instant oats packets",
      "25 g whole milk powder",
      "Pecans (20 g extra on a big day)",
      "Dried fruit — dates, apricots or banana chips",
      "Pinch of salt",
      "1 PB packet, stirred in last",
      "Cocoa (optional, the driving-breakfast version)",
    ],
    technique: "<b>The most-used recipe on this site and the reason the thermos exists.</b> Three delivery modes off one bag: straight from the pot, decanted into the thermos and eaten an hour later on a ridge, or — the waterless version — boil 400 ml, pour into the double-bagged mix, roll it shut, 3 min, eat from the bag. The pot only ever held water, so it wipes clean with a bandana.",
    tags: ["thermos", "boil-bag", "pre-dawn", "no-water-capable", "high-calorie"],
    variants: [
      "Thermos — decanted hot at camp, eaten on the ridge at sunrise (K-B1, O-B4)",
      "In-bag, no water — double-bag the mix at home, eat from the bag (O-B7). Hot and ready 7 minutes after getting back down.",
      "Driving version — banana chips and cocoa instead of pecans and dates (K-B5)",
    ],
    usedOn: [
      { slug: "kentucky-2026", code: null, day: 2, meal: "b" },
      { slug: "kentucky-2026", code: null, day: 6, meal: "b" },
      { slug: "appalachians-2026", code: "O-B2", day: 4, meal: "b" },
      { slug: "appalachians-2026", code: "O-B4", day: 6, meal: "b" },
      { slug: "appalachians-2026", code: "O-B7", day: 9, meal: "b" },
    ],
  },
  {
    id: "foil-burrito",
    name: "Chorizo–potato foil burrito",
    type: "breakfast",
    method: "pan",
    cleanup: "none",
    water: "none",
    kcal: 760,
    time: "6 min",
    cookware: ["pan"],
    prepAtHome: "Built and frozen at home, wrapped in foil. <b>Move it from Zone 1 to Zone 2 the night before</b> so it thaws.",
    ingredients: ["Chorizo", "Potato", "Flour tortilla", "(Full quantities are in MEALS-trip1-kentucky.md, not in this repo)"],
    technique: "Foil straight into a dry pan, 6 min, eaten one-handed while striking the tent or driving. <b>Zero cookware touches food.</b> On the October trip this was deliberately the last thing out of the cooler on day 9 — after it, the cooler is a dry box and a water carrier.",
    tags: ["one-handed", "frozen-flat", "zero-cleanup", "travel-day"],
    variants: ["Nine days in the cooler (O-B6) — it survives the whole trip if it stays in Zone 1 until the night before."],
    usedOn: [
      { slug: "kentucky-2026", code: null, day: 3, meal: "b" },
      { slug: "appalachians-2026", code: "O-B6", day: 8, meal: "b" },
    ],
  },
  {
    id: "eggs-spinach-toast",
    name: "Eggs, spinach and pepper with sourdough",
    type: "breakfast",
    method: "pan",
    cleanup: "med",
    water: "wash-needed",
    kcal: 700,
    time: "12 min",
    cookware: ["pan"],
    prepAtHome: null,
    ingredients: ["3 eggs", "60 g spinach", "½ bell pepper", "2 slices sourdough", "Butter"],
    technique: "<b>Toast the bread dry in the pan first</b>, then butter and eggs. One burner means sequence is the recipe. This is the relaxed morning — schedule it on a day with no dawn start.",
    tags: ["zone-2", "relaxed-morning", "eats-the-eggs"],
    variants: [],
    usedOn: [
      { slug: "kentucky-2026", code: null, day: 4, meal: "b" },
      { slug: "appalachians-2026", code: "O-B1", day: 2, meal: "b" },
    ],
  },
  {
    id: "breakfast-tacos",
    name: "Loaded breakfast tacos",
    type: "breakfast",
    method: "pan",
    cleanup: "med",
    water: "wash-needed",
    kcal: 1000,
    kcalRange: "950–1,050",
    time: "14 min with pre-cooked potatoes, ~25 without",
    cookware: ["pan"],
    prepAtHome: null,
    ingredients: ["3 eggs", "200–300 g diced potato", "Cheddar", "3 tortillas", "Salsa"],
    technique: "<b>The payoff for cooking double potatoes the night before</b> — it drops from a 25-minute job to a 14-minute crisp-and-scramble. Deliberately the biggest breakfast of a trip. <b>Eat all three tacos</b>; the portion is the point.",
    tags: ["zone-2", "big-day-fuel", "uses-leftover-starch"],
    variants: [],
    usedOn: [
      { slug: "kentucky-2026", code: null, day: 5, meal: "b" },
      { slug: "appalachians-2026", code: "O-B3", day: 5, meal: "b" },
    ],
  },
  {
    id: "sausage-pepper-hash",
    name: "Sausage and pepper hash with eggs on top",
    type: "breakfast",
    method: "pan",
    cleanup: "high",
    water: "wash-needed",
    kcal: 1100,
    time: "~30 min",
    cookware: ["pan"],
    prepAtHome: null,
    ingredients: ["150 g smoked sausage", "300 g potatoes", "Bell pepper", "Onion", "2 eggs", "Cheddar", "Sourdough"],
    technique: "<b>This is a Zone 2 drain disguised as a breakfast.</b> Schedule it on the last morning with a sink and a table — cleanup is HIGH and that is fine exactly once. Everything perishable that is left goes in.",
    tags: ["zone-2-drain", "high-cleanup", "needs-potable-water"],
    variants: [],
    usedOn: [{ slug: "appalachians-2026", code: "O-B5", day: 7, meal: "b" }],
  },
  {
    id: "cold-bagel-plate",
    review: { code: "oas", why: "Dried apricots. Unresolved." },
    name: "Cold bagel plate",
    type: "breakfast",
    method: "no-cook",
    cleanup: "none",
    water: "none",
    kcal: 725,
    kcalRange: "650–800",
    time: "0 min",
    cookware: [],
    prepAtHome: null,
    ingredients: ["2 bagels", "PB packets", "Honey", "Dried apricots", "Shelf-stable protein shake"],
    technique: "<b>No dishes, no water, no decisions in the dark.</b> The slot for a pre-dawn start on an empty cooler, and for the drive home. Nothing here needs gloves off.",
    tags: ["no-water", "zero-cleanup", "pre-dawn", "drive-home"],
    variants: [],
    usedOn: [
      { slug: "appalachians-2026", code: "O-B8", day: 10, meal: "b" },
      { slug: "appalachians-2026", code: "O-B9", day: 11, meal: "b" },
    ],
  },

  /* ================================================================ LUNCH */
  {
    id: "sourdough-sub",
    review: { code: "oas", why: "The whole raw apple. Raw fruit is the trigger — swap it for a roasted-nut bar or cooked fruit." },
    name: "Sourdough sub, built at home",
    type: "lunch",
    method: "assemble",
    cleanup: "none",
    water: "none",
    kcal: 850,
    time: "Built at home the morning of",
    cookware: [],
    prepAtHome: "Built at the kitchen table before leaving. Eaten in the car.",
    ingredients: ["Sourdough roll", "Genoa salami", "Provolone", "Pepperoncini", "Olive oil", "Oregano", "Apple", "Chips"],
    technique: "<b>The departure-day lunch, every time.</b> Nothing in it needs refrigeration for the length of a drive, and it means the first stop of the trip is a trailhead rather than a gas station.",
    tags: ["travel-day", "no-cooler", "zero-cleanup"],
    variants: [],
    usedOn: [
      { slug: "kentucky-2026", code: null, day: 1, meal: "l" },
      { slug: "appalachians-2026", code: "O-L1", day: 1, meal: "l" },
    ],
  },
  {
    id: "pressed-sandwich",
    review: { code: "oas", why: "Dried apricots. The marcona almonds are fine — marconas are fried or roasted by definition." },
    name: "Pressed muffuletta",
    type: "lunch",
    method: "assemble",
    cleanup: "none",
    water: "none",
    kcal: 1200,
    kcalRange: "1,100–1,200 across the day with snacks",
    time: "Built the night before, pressed overnight",
    cookware: [],
    prepAtHome: null,
    ingredients: ["Ciabatta", "60 g Genoa salami", "40 g capicola", "50 g provolone", "Olive salad", "Olive oil", "Marcona almonds", "Dried apricots", "2 bars", "A waffle"],
    technique: "⭐ <b>Build it the night before and press it under the cooler lid.</b> Everything in it is cured, aged or oil-packed, so ten hours unrefrigerated in a pack is fine — and it is genuinely <i>better</i> squashed. The one lunch that survives a full festival day with no cooler access.",
    tags: ["no-cooler", "long-day", "build-night-before", "zero-cleanup"],
    variants: [
      "Tortilla version (Kentucky day 5) — parchment then foil, squashed under the cooler lid. <b>Bread turns to crumbs after four hours of scrambling; a tight-rolled tortilla survives being sat on and hauled up a ladder.</b> Use this variant on any scrambling day.",
    ],
    usedOn: [
      { slug: "appalachians-2026", code: "O-L2", day: 3, meal: "l" },
      { slug: "kentucky-2026", code: null, day: 5, meal: "l" },
    ],
  },
  {
    id: "charcuterie-tortillas",
    review: { code: "oas", why: "Dried figs or mango. Buy the almonds <b>roasted</b> and that half is settled." },
    name: "Salami, aged cheddar and tortillas",
    type: "lunch",
    method: "no-cook",
    cleanup: "none",
    water: "none",
    kcal: 950,
    kcalRange: "850–1,000",
    time: "0 min",
    cookware: [],
    prepAtHome: null,
    ingredients: ["2 tortillas", "70 g hard salami", "Aged cheddar", "Honey mustard or plain mustard", "Dried figs or mango", "Almonds", "A bar"],
    technique: "<b>The default trail lunch.</b> Zero cleanup, zero cooler dependence — curing and aging are what make it safe unrefrigerated. On a 10-mile day at altitude, do not trim this one.",
    tags: ["no-cooler", "zero-cleanup", "trail-lunch", "default"],
    variants: [
      "Pouch version (O-L5) — swap salami for a salmon or chicken pouch, add hot sauce, string cheese, Fritos.",
    ],
    usedOn: [
      { slug: "kentucky-2026", code: null, day: 4, meal: "l" },
      { slug: "appalachians-2026", code: "O-L5", day: 6, meal: "l" },
      { slug: "appalachians-2026", code: "O-L8", day: 9, meal: "l" },
    ],
  },
  {
    id: "thermos-soup-lunch",
    name: "Tortilla plate with hot soup in the thermos",
    type: "lunch",
    method: "thermos",
    cleanup: "low",
    water: "boil-only",
    kcal: 950,
    time: "Heated at breakfast, eaten at midday",
    cookware: ["pot"],
    prepAtHome: null,
    ingredients: ["2 tortillas", "Hummus cups", "Hard salami", "Spinach", "400 ml tomato soup"],
    technique: "<b>Heat the soup in the same pot right after breakfast</b> — one boil, two meals, no extra wash. <b>In relentless wind at 5,000 ft the hot liquid does more than the calories do.</b> This is the exposed-ridge lunch.",
    tags: ["thermos", "cold-weather", "exposed", "piggybacks-breakfast"],
    variants: [],
    usedOn: [{ slug: "appalachians-2026", code: "O-L4", day: 5, meal: "l" }],
  },
  {
    id: "pouch-plate-no-water",
    review: { code: "oas", why: "Dried apricots. Unresolved." },
    name: "Waterless pouch plate",
    type: "lunch",
    method: "no-cook",
    cleanup: "none",
    water: "none",
    kcal: 900,
    time: "0 min",
    cookware: [],
    prepAtHome: null,
    ingredients: ["2 tortillas", "5 oz salmon pouch, eaten straight from the pouch", "PB packets", "Honey", "Fritos", "Dried apricots"],
    technique: "⚠️ <b>The no-water slot. Zero cookware touches food</b> — the pouch is the plate and it packs out. Built for a campsite with nothing to wash with.",
    tags: ["no-water", "zero-cleanup", "pack-it-out"],
    variants: [],
    usedOn: [{ slug: "appalachians-2026", code: "O-L7", day: 8, meal: "l" }],
  },
  {
    id: "quesadillas",
    name: "Pan quesadillas",
    type: "lunch",
    method: "pan",
    cleanup: "med",
    water: "wash-needed",
    kcal: 875,
    kcalRange: "800–950",
    time: "12 min",
    cookware: ["pan", "spatula"],
    prepAtHome: null,
    ingredients: ["3 tortillas", "Chicken pouch or leftover chicken", "80 g cheddar", "Bell pepper", "Salsa"],
    technique: "Three rounds in the pan, 12 minutes. <b>Needs potable water on site</b> — it is a MED-cleanup meal and the second-most common scheduling mistake on this site is putting one somewhere dry. Doubles as the cooler clean-out slot: swap in whatever Zone 2 has left and do not be precious about it.",
    tags: ["zone-2-drain", "med-cleanup", "needs-water", "flexible"],
    variants: [
      "Clean-out version (O-L6) — leftover chicken, whatever cheese and peppers remain. <b>This slot exists to empty the cooler.</b>",
    ],
    usedOn: [
      { slug: "kentucky-2026", code: "K-L2", day: 2, meal: "l" },
      { slug: "appalachians-2026", code: "O-L6", day: 7, meal: "l" },
    ],
  },
  {
    id: "pb-honey-roll",
    review: { code: "oas", why: "The whole raw apple, and trail mix unless it is a roasted-nut mix." },
    name: "PB-and-honey roll, built the night before",
    type: "lunch",
    method: "assemble",
    cleanup: "none",
    water: "none",
    kcal: 800,
    kcalRange: "700–900",
    time: "Built the night before",
    cookware: [],
    prepAtHome: null,
    ingredients: ["Tortilla or bagel", "PB", "Honey", "2 bars", "Jerky", "Trail mix", "Apple"],
    technique: "Foil-wrapped, built the previous night. <b>Nothing requiring assembly or taking your gloves off</b> — this is the exposed-ridge, bad-weather, cold-hands lunch.",
    tags: ["no-water", "gloves-on", "exposed", "build-night-before"],
    variants: ["Bagel version (O-L3) — bagel, PB, honey, jerky, apple, plus leftover snacks."],
    usedOn: [
      { slug: "appalachians-2026", code: "O-L3", day: 4, meal: "l" },
      { slug: "appalachians-2026", code: "O-L9", day: 10, meal: "l" },
    ],
  },

  /* =============================================================== DINNER */
  {
    id: "frozen-flat-chili",
    name: "Frozen-flat chili",
    type: "dinner",
    method: "one-pot",
    cleanup: "low",
    water: "wash-needed",
    kcal: 825,
    kcalRange: "700–950 by version",
    time: "10 min",
    cookware: ["pot"],
    prepAtHome: "<b>Cook at home, freeze flat in a 500 ml quart bag.</b> It rides as Zone 1 ice until the night it gets eaten.",
    ingredients: ["Beef-and-bean or white chicken chili", "Cheddar", "Fritos or sourdough"],
    technique: "<b>The archetype of the whole system</b> — it is simultaneously the ice and the dinner. Reheat in the pot, 10 minutes. <b>Split the Frito bag lengthwise and pour the chili in</b>: the bag is the bowl and there is nothing to wash.",
    tags: ["frozen-flat", "zone-1", "low-cleanup", "first-camp-dinner"],
    variants: [
      "Beef-and-bean (K-D1, ~950 kcal)",
      "White chicken chili (O-D2, ~700 kcal) — <b>eating this one means both Zone 1 dinners are gone; buy block ice tomorrow.</b>",
    ],
    usedOn: [
      { slug: "kentucky-2026", code: null, day: 2, meal: "d" },
      { slug: "appalachians-2026", code: "O-D2", day: 5, meal: "d" },
    ],
  },
  {
    id: "frozen-flat-ragu",
    name: "Beef-and-pork ragù with rigatoni",
    type: "dinner",
    method: "one-pot",
    cleanup: "med",
    water: "wash-needed",
    kcal: 1050,
    time: "~20 min",
    cookware: ["pot"],
    prepAtHome: "Ragù cooked at home and frozen flat.",
    ingredients: ["Frozen-flat ragù", "120 g rigatoni", "Parmesan", "Sourdough"],
    technique: "Same Zone 1 trick as the chili but the pasta cooks on site, which is what pushes cleanup to MED — you are draining starchy water. <b>The first Zone 1 dinner out of the cooler</b> on a long trip; eat it before the pasta water becomes a problem.",
    tags: ["frozen-flat", "zone-1", "med-cleanup"],
    variants: [],
    usedOn: [{ slug: "appalachians-2026", code: "O-D1", day: 4, meal: "d" }],
  },
  {
    id: "thermos-couscous-dinner",
    name: "Couscous dinner carried hot in the thermos",
    type: "dinner",
    method: "thermos",
    cleanup: "low",
    water: "boil-only",
    kcal: 1000,
    time: "Built at camp ~4:20, eaten at the overlook",
    cookware: ["pot"],
    prepAtHome: null,
    ingredients: ["Couscous", "Rotisserie chicken", "Chickpeas", "Sun-dried tomatoes", "Feta", "Lemon"],
    technique: "<b>Built at camp in the afternoon, carried hot, eaten at a sunset overlook.</b> Couscous holds heat and doesn't slosh — that combination is why it's the thermos dinner and rice isn't. Unlocks eating dinner somewhere with a view instead of at a picnic table.",
    tags: ["thermos", "sunset-dinner", "low-cleanup", "no-stove-at-the-view"],
    variants: [],
    usedOn: [{ slug: "kentucky-2026", code: null, day: 3, meal: "d" }],
  },
  {
    id: "rotisserie-potatoes-greens",
    name: "Rotisserie chicken, potatoes and greens",
    type: "dinner",
    method: "pan",
    cleanup: "med",
    water: "wash-needed",
    kcal: null,
    time: "~25 min",
    cookware: ["pan"],
    prepAtHome: null,
    ingredients: ["Rotisserie chicken (from resupply)", "400 g diced russets", "Green beans"],
    technique: "<b>A supermarket rotisserie chicken is the correct resupply move for one person</b> — it covers two dinners with no cooking on the first. <b>Cook double potatoes and bag half</b>; they are tomorrow's breakfast and they cut it to 14 minutes.",
    tags: ["resupply", "cook-double-starch", "med-cleanup"],
    variants: [],
    usedOn: [{ slug: "kentucky-2026", code: null, day: 4, meal: "d" }],
  },
  {
    id: "ribeye-smashed-potatoes",
    name: "Ribeye with smashed potatoes and pan sauce",
    type: "dinner",
    method: "pan",
    cleanup: "high",
    water: "wash-needed",
    kcal: 1300,
    time: "~45 min",
    cookware: ["pan", "pot"],
    prepAtHome: null,
    ingredients: ["12 oz ribeye", "Baby potatoes", "Butter", "Garlic", "Thyme", "Balsamic", "Beef broth", "Broccoli"],
    technique: "⭐ <b>The one big night.</b> Cleanup is HIGH, which is only allowed at a site with potable water and hot showers — that constraint is what put it at Bandy Creek rather than anywhere else on that trip. 45 minutes and nowhere to be is part of the recipe.",
    tags: ["high-cleanup", "needs-potable-water", "the-good-night", "rest-day"],
    variants: [],
    usedOn: [{ slug: "kentucky-2026", code: null, day: 5, meal: "d" }],
  },
  {
    id: "shrimp-orzo",
    name: "Garlic butter shrimp with orzo",
    type: "dinner",
    method: "pan",
    cleanup: "high",
    water: "wash-needed",
    kcal: 1000,
    time: "~25 min",
    cookware: ["pan", "pot"],
    prepAtHome: null,
    ingredients: ["Shrimp (bought at resupply, same day)", "Orzo", "Green beans", "Lemon", "Parsley", "Parmesan", "Garlic butter"],
    technique: "⭐ <b>Shrimp 2 minutes a side, do not walk away — it is the one thing here you can ruin.</b> Buy it the day it's eaten; this is not a Zone 1 meal. Schedule it as the last high-cleanup meal of a trip, at a site with water.",
    tags: ["high-cleanup", "needs-potable-water", "same-day-resupply", "the-good-night"],
    variants: [],
    usedOn: [{ slug: "appalachians-2026", code: "O-D3", day: 7, meal: "d" }],
  },
  {
    id: "boil-bag-couscous",
    name: "Boil-bag couscous",
    type: "dinner",
    method: "bag",
    cleanup: "none",
    water: "boil-only",
    kcal: 950,
    time: "8 min",
    cookware: ["pot"],
    prepAtHome: "<b>Pre-mix at home:</b> 110 g couscous · sun-dried tomato · parmesan · seasoning, into a labeled double bag.",
    ingredients: ["110 g couscous mix (pre-bagged)", "200 ml water", "Chicken pouch", "2 tbsp olive oil"],
    technique: "⚠️ Boil 200 ml, pour in, roll the bag shut, 5 min, tear in a chicken pouch and the oil. <b>Eight minutes, headlamp on.</b> Flagged on the October trip as the highest-risk meal of both trips — at 7:30 PM in the dark at 35°F, anything harder than boil-water ends with a protein bar and going to bed hungry. <b>The bag has to already exist.</b>",
    tags: ["no-water", "boil-bag", "dark-and-cold", "highest-risk", "pre-mix-required"],
    variants: [],
    usedOn: [{ slug: "appalachians-2026", code: "O-D4", day: 8, meal: "d" }],
  },
  {
    id: "boil-bag-burrito-bowl",
    name: "Boil-bag burrito bowl",
    type: "dinner",
    method: "bag",
    cleanup: "none",
    water: "boil-only",
    kcal: 1050,
    time: "10 min",
    cookware: ["pot"],
    prepAtHome: "<b>Pre-mix at home:</b> instant rice + taco seasoning into a labeled double bag.",
    ingredients: ["Instant rice + taco seasoning (pre-bagged)", "Pull-tab can of black beans, undrained", "Chicken pouch", "Cheddar", "Crushed Fritos"],
    technique: "<b>The undrained can is the trick.</b> The bean liquid counts toward your water and there is no wet waste to pack out — on a dry site that is two problems solved by not opening a strainer. Pull-tab, so no opener.",
    tags: ["no-water", "boil-bag", "water-positive", "pre-mix-required"],
    variants: [],
    usedOn: [{ slug: "appalachians-2026", code: "O-D5", day: 9, meal: "d" }],
  },
  {
    id: "kielbasa-cannellini-orecchiette",
    name: "Kielbasa, cannellini and orecchiette",
    type: "dinner",
    method: "one-pot",
    cleanup: "med",
    water: "wash-needed",
    kcal: 1250,
    time: "~28 min, sequential on one burner",
    cookware: ["pot", "pan"],
    prepAtHome: null,
    ingredients: ["Vacuum-packed kielbasa (keep sealed)", "Cannellini beans", "Orecchiette", "Toasted breadcrumbs", "Sun-dried tomato", "Garlic", "Rosemary", "Lemon", "Parmesan"],
    technique: "⭐⭐ <b>Day 10, empty cooler, nothing but shelf-stable food — which is exactly the problem this dish was invented for.</b> Every component rides in Zone 3 from day one. Sequential on one burner, ~28 min. Finish with hot chocolate and dark chocolate, and take the twenty minutes.",
    tags: ["zone-3-only", "shelf-stable", "last-night", "the-good-night"],
    variants: [],
    usedOn: [{ slug: "appalachians-2026", code: "O-D6", day: 10, meal: "d" }],
  },

  /* ================================================================ DRINK */
  {
    id: "hot-chocolate",
    name: "Hot chocolate, pre-mixed",
    type: "drink",
    method: "boil",
    cleanup: "none",
    water: "boil-only",
    kcal: null,
    time: "3 min",
    cookware: ["pot", "mug"],
    prepAtHome: "Pre-mix into labeled bags: cocoa packets · 15 g whole milk powder · pinch of salt. Three bags for the October trip.",
    ingredients: ["Cocoa packets", "15 g whole milk powder", "Pinch of salt"],
    technique: "<b>For the dark start — the fat and sugar do more at 50°F than caffeine would</b>, which matters on a site with no coffee. ⚠️ Competes with the oats for the thermos on any pre-dawn morning; a second wide-mouth thermos is the fix and it is on the gear list as an open item.",
    tags: ["pre-dawn", "thermos-contention", "no-coffee"],
    variants: [],
    usedOn: [],
    packedOn: ["kentucky-2026", "appalachians-2026"],
  },

  /* ======================================================== FROM THE VOTE
     Everything below came out of menubench.html in Sept 2026 — Colin voted
     yes on the dish, and these are the drafts of it.

     `draft: true` marks that difference and it matters. The 23 recipes above
     were transcribed from trips that actually happened: the quantities were
     cooked, the timings were stood next to. These were written from a
     checkbox. The method and the technique are sound; the grams and the
     calorie figures are estimates until one gets cooked. Clear the flag by
     cooking it, not by deciding it looks right.
     ====================================================================== */

  /* ---------------------------------------------------------- BREAKFAST */
  {
    id: "bacon-egg-bagel", name: "Bacon, egg and cheese bagel", type: "breakfast",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 950, time: "14 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["3–4 rashers bacon", "2 eggs", "American or cheddar", "1 bagel, split"],
    technique: "<b>One pan, three stages, no washing between.</b> Bacon out first and rest it on the bagel halves so the fat soaks in; eggs into the bacon fat; bagel cut-side down last to toast in what's left. Sequencing <i>is</i> the recipe on one burner — done in the wrong order it's three pans.",
    tags: ["zone-2", "one-pan-sequential", "handheld"], variants: [], usedOn: [],
  },
  {
    id: "french-toast", name: "Thick-cut French toast", type: "breakfast",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 900, time: "12 min",
    cookware: ["pan"], draft: true,
    prepAtHome: null,
    ingredients: ["4 thick slices sourdough, ideally a day stale", "2 eggs", "20 g whole milk powder + water", "Butter", "Syrup or honey", "Cinnamon"],
    technique: "<b>The use for bread that has gone hard.</b> Stale sourdough soaks without collapsing, which is the whole reason this belongs on day 4 rather than day 1. Milk powder means no fresh milk in Zone 2. Medium heat — butter burns before the custard sets if the pan is hot.",
    tags: ["zone-2", "uses-stale-bread", "sweet"], variants: [], usedOn: [],
  },
  {
    id: "shaker-pancakes", name: "Pancakes from a shaker bottle", type: "breakfast",
    method: "pan", cleanup: "low", water: "wash-needed", kcal: 850, time: "12 min",
    cookware: ["pan"], draft: true,
    prepAtHome: "Nothing — buy the just-add-water mix in the bottle it pours from.",
    ingredients: ["Just-add-water pancake mix in a shaker bottle", "Water", "Butter", "Syrup", "Optional: chocolate chips"],
    technique: "<b>The bottle is the bowl, the whisk and the ladle.</b> Nothing to wash but the pan, which is what drops this to LOW cleanup while every other pancake is MED. Shake, pour straight into the pan, cap it, done.",
    tags: ["low-cleanup", "no-bowl", "sweet"], variants: [], usedOn: [],
  },
  {
    id: "fried-leftover-pasta", name: "Last night's pasta, fried", type: "breakfast",
    method: "pan", cleanup: "low", water: "wash-needed", kcal: 900, time: "8 min",
    cookware: ["pan"], draft: true,
    prepAtHome: null,
    ingredients: ["Leftover pasta, cold", "Olive oil", "Parmesan", "Optional: an egg on top"],
    technique: "<b>Press it flat and leave it alone.</b> Cold pasta into hot oil, pressed into a cake, undisturbed four or five minutes until the underside is a crust. Turning it early is the only way to fail. Deliberately not breakfast food — which you said was fine — and it makes cooking double pasta at dinner worth doing.",
    tags: ["leftovers", "non-breakfast", "cook-double-starch"], variants: [], usedOn: [],
  },
  {
    id: "breakfast-quesadilla", name: "Breakfast quesadilla", type: "breakfast",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 850, time: "10 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["2 eggs", "2 tortillas", "Cheddar", "Leftover sausage, bacon or chicken", "Mild salsa"],
    technique: "Scramble, then fold into the tortilla in the same pan. <b>Cuts in half and eats one-handed in the car</b>, which is what separates it from the breakfast tacos — same ingredients, but this one survives a 7 AM departure.",
    tags: ["zone-2", "handheld", "travel-morning", "leftovers"], variants: [], usedOn: [],
  },
  {
    id: "griddled-pb-honey", name: "Griddled PB and honey sandwich", type: "breakfast",
    method: "pan", cleanup: "low", water: "wash-needed", kcal: 800, time: "5 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["2 slices sourdough or 1 bagel", "Peanut butter", "Honey", "Butter for the outside"],
    technique: "<b>Buttered on the outside, like a grilled cheese.</b> Five minutes, one pan, no plate — the fastest hot thing in this file. The honey goes on after it comes off the heat or it burns.",
    tags: ["fast", "low-cleanup", "no-cooler"], variants: [], usedOn: [],
  },
  {
    id: "shake-and-bar", name: "Milk-powder protein shake and a bar", type: "breakfast",
    method: "no-cook", cleanup: "none", water: "none", kcal: 600, time: "1 min",
    cookware: [], draft: true,
    prepAtHome: "Pre-bag the powder so it's one pour in the dark.",
    ingredients: ["Protein powder + whole milk powder, pre-bagged", "Water", "A bar"],
    technique: "<b>The genuinely zero-effort option, and it exists for one reason:</b> a 5 AM alpine start where anything requiring a decision doesn't happen. Shake it walking to the car. Not a meal — a bridge to the thermos meal at the turnaround.",
    tags: ["no-water", "pre-dawn", "zero-cleanup", "fast"], variants: [], usedOn: [],
  },

  /* -------------------------------------------------------------- LUNCH */
  {
    id: "italian-tortilla-wrap", name: "Pressed Italian tortilla wrap", type: "lunch",
    method: "assemble", cleanup: "none", water: "none", kcal: 1000, time: "Built the night before",
    cookware: [], draft: true,
    prepAtHome: null,
    ingredients: ["2 large flour tortillas", "Genoa salami", "Capicola", "Provolone", "Olive salad or sun-dried tomato", "Olive oil"],
    technique: "<b>The muffuletta idea in the format that survives a scramble.</b> Bread turns to crumbs after four hours in a pack; a tight-rolled tortilla can be sat on and hauled up a ladder. Wrap in parchment then foil, press under the cooler lid overnight. Everything in it is cured or oil-packed, so it needs no cooler at all.",
    tags: ["no-cooler", "zero-cleanup", "build-night-before", "scrambling-day"], variants: [], usedOn: [],
  },
  {
    id: "cuban-roll", name: "Pressed ham, cheese and pickle roll", type: "lunch",
    method: "assemble", cleanup: "none", water: "none", kcal: 950, time: "Built the night before",
    cookware: [], draft: true, prepAtHome: null,
    ingredients: ["Sub roll or ciabatta", "Sliced ham", "Swiss", "Dill pickle", "Yellow mustard", "Butter"],
    technique: "<b>A Cuban without the press or the plancha.</b> Weighted under the cooler lid overnight does what the press would. The pickle is the point — it's the only acid in a lunch otherwise made of fat and salt, and it keeps the tenth mile from tasting like the first.",
    tags: ["no-cooler", "zero-cleanup", "build-night-before"], variants: [], usedOn: [],
  },
  {
    id: "summer-sausage-board", name: "Summer sausage and cheese board", type: "lunch",
    method: "no-cook", cleanup: "none", water: "none", kcal: 950, time: "0 min",
    cookware: ["knife"], draft: true, prepAtHome: null,
    ingredients: ["Summer sausage", "Hard cheese", "Tortillas or crackers", "Mustard", "Roasted nuts"],
    technique: "<b>Zone 3 from start to finish</b> — nothing here has ever needed a cooler, which makes it the lunch for day 9 when the ice is gone. Sliced with the folding knife onto a tortilla. No plate, no pot, nothing to pack out but a wrapper.",
    tags: ["zone-3-only", "no-water", "zero-cleanup", "late-trip"], variants: [], usedOn: [],
  },

  /* ------------------------------------------------------- THERMOS SLOT */
  {
    id: "thermos-chili", name: "Chili carried hot", type: "lunch",
    method: "thermos", cleanup: "low", water: "boil-only", kcal: 950, time: "10 min at camp",
    cookware: ["pot"], draft: true,
    prepAtHome: "The chili itself is frozen flat at home — same bag as the dinner version.",
    ingredients: ["Frozen-flat chili", "Cheddar", "Fritos, carried separately"],
    technique: "<b>Reheated at camp before first light, eaten five hours later at the turnaround.</b> Pre-heat the flask with boiling water first and tip it out — a cold flask costs you most of the heat in the first hour. Chips go in a separate bag and get crushed on top at the top, not before.",
    tags: ["thermos", "frozen-flat", "turnaround-meal"], variants: [], usedOn: [],
  },
  {
    id: "thermos-mac", name: "Mac and cheese in the thermos", type: "lunch",
    method: "thermos", cleanup: "low", water: "boil-only", kcal: 1100, time: "15 min at camp",
    cookware: ["pot"], draft: true, prepAtHome: null,
    ingredients: ["Macaroni", "Evaporated milk or milk powder", "Sharp cheddar", "Butter", "Mustard powder"],
    technique: "<b>Cook it deliberately thicker than you want it.</b> Pasta keeps absorbing in the flask for hours, so what's perfect at camp is stodge at the turnaround. Slightly loose going in, right when you open it.",
    tags: ["thermos", "turnaround-meal", "high-calorie"], variants: [], usedOn: [],
  },
  {
    id: "thermos-beef-stew", name: "Beef stew, frozen flat and reheated", type: "lunch",
    method: "thermos", cleanup: "low", water: "boil-only", kcal: 1050, time: "12 min at camp",
    cookware: ["pot"], draft: true,
    prepAtHome: "<b>Cook at home, freeze flat in a quart bag.</b> Zone 1 on the way in, hot lunch on the way back.",
    ingredients: ["Frozen-flat beef stew", "Sourdough to mop", "Parsley if it survived"],
    technique: "<b>The best argument for the whole frozen-flat system:</b> it rides as the cooler's ice for four days and then turns into a hot stew at 5,000 ft. Reheat at dawn, straight into a pre-warmed flask.",
    tags: ["thermos", "frozen-flat", "zone-1", "cold-weather"], variants: [], usedOn: [],
  },
  {
    id: "thermos-rice-bowl", name: "Rice bowl with pulled pork", type: "lunch",
    method: "thermos", cleanup: "low", water: "boil-only", kcal: 1050, time: "10 min at camp",
    cookware: ["pot"], draft: true, prepAtHome: null,
    ingredients: ["Instant rice", "Tub or pouch pulled pork", "Cheddar", "Mild BBQ sauce"],
    technique: "Assembles hot in the flask — rice cooked in the pot, everything else layered straight in on top. <b>Entirely shelf-stable</b> if the pork is a pouch, so this is the thermos meal that still works after the ice has gone.",
    tags: ["thermos", "zone-3-capable", "turnaround-meal"], variants: [], usedOn: [],
  },
  {
    id: "thermos-potato-soup", name: "Loaded potato soup", type: "lunch",
    method: "thermos", cleanup: "low", water: "boil-only", kcal: 1000, time: "8 min at camp",
    cookware: ["pot"], draft: true,
    prepAtHome: "Pre-mix the dry parts into one bag: instant mash, milk powder, bacon bits, seasoning.",
    ingredients: ["Instant mashed potato", "Whole milk powder", "Bacon bits", "Cheddar", "Butter"],
    technique: "<b>Absurd calories per gram carried</b> — everything is dehydrated, so a day's lunch weighs almost nothing until you add water. Eight minutes of boiling water and a stir. The single best carried-weight ratio in this file.",
    tags: ["thermos", "no-cooler", "lightest", "cold-weather"], variants: [], usedOn: [],
  },

  /* ---------------------------------------------------- DINNER — THE PAN */
  {
    id: "smashburgers", name: "Smashburgers", type: "dinner",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 1200, time: "15 min",
    cookware: ["pan", "spatula"], draft: true, prepAtHome: null,
    ingredients: ["225 g ground beef, 80/20, as two balls", "2 slices American cheese", "Potato buns", "Onion, sliced thin", "Pickles", "Mustard"],
    technique: "⭐ <b>Dry pan, as hot as the burner goes, and smash within ten seconds of the meat landing.</b> The crust is the whole dish and it only forms on contact with dry hot metal — oil in the pan actively prevents it. Do not move them until the edges are brown and lacy. Two thin patties beat one thick one every time. Buns toasted in the fat afterwards.",
    tags: ["the-good-night", "zone-2", "fast-for-what-it-is"], variants: [], usedOn: [],
  },
  {
    id: "patty-melt", name: "Patty melt on sourdough", type: "dinner",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 1300, time: "20 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["225 g ground beef", "1 onion, sliced", "Swiss or cheddar", "Sourdough or rye", "Butter"],
    technique: "<b>Onions first and slowly — they take longer than everything else combined.</b> Get them properly soft and brown, set aside, cook the patty in the same pan, then build and griddle the sandwich in the onion fat. Burger and grilled cheese in one, and it eats better in the cold than either.",
    tags: ["cold-weather", "zone-2", "the-good-night"], variants: [], usedOn: [],
  },
  {
    id: "skillet-pizza", name: "Skillet pizza with a lid", type: "dinner",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 1200, time: "20 min",
    cookware: ["pan", "lid"], draft: true,
    prepAtHome: "Buy dough; it keeps several days in Zone 2 and improves for the first two.",
    ingredients: ["Store pizza dough or a flatbread base", "Tinned or jarred sauce", "Low-moisture mozzarella", "Pepperoni", "Olive oil"],
    technique: "⭐ <b>The lid is the oven.</b> Base into an oiled pan on low, topped, lid on — trapped steam and heat melt the top while the bottom crisps. Low heat and patience; high heat gives you a burnt base and raw cheese. <b>This is the one dish here where a lid is non-negotiable equipment.</b>",
    tags: ["the-good-night", "needs-lid", "zone-2"], variants: [], usedOn: [],
  },
  {
    id: "tortilla-pizza", name: "Tortilla pizza", type: "dinner",
    method: "pan", cleanup: "low", water: "wash-needed", kcal: 1000, time: "15 min",
    cookware: ["pan", "lid"], draft: true, prepAtHome: null,
    ingredients: ["3 flour tortillas", "Pizza sauce", "Mozzarella", "Pepperoni"],
    technique: "<b>The fast version, and the one that works on a night you got back late.</b> Tortilla crisped dry on one side first, flipped, topped, lid on for two minutes. Six minutes each and they come out one at a time, which is fine eaten standing up. No dough to keep cold.",
    tags: ["fast", "low-cleanup", "late-arrival", "needs-lid"], variants: [], usedOn: [],
  },
  {
    id: "calzone", name: "Folded calzone in the pan", type: "dinner",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 1150, time: "20 min",
    cookware: ["pan", "lid"], draft: true, prepAtHome: null,
    ingredients: ["Pizza dough", "Mozzarella and ricotta", "Pepperoni or ham", "Sauce on the side for dipping"],
    technique: "Same dough as the skillet pizza, folded and sealed, both sides browned with the lid on between turns. <b>Eats like handheld pizza with no plate</b>, and the sealed edge means the filling stays hot for a long time — which is the version you want at a picnic table at 40°F.",
    tags: ["handheld", "cold-weather", "needs-lid"], variants: [], usedOn: [],
  },
  {
    id: "crispy-chicken-thighs", name: "Crispy chicken thighs with potatoes", type: "dinner",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 1200, time: "30 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["2 bone-in skin-on chicken thighs", "400 g potatoes, halved", "Butter", "Garlic", "Rosemary or thyme"],
    technique: "<b>Skin down, cold pan, medium heat, and do not touch them for ten minutes.</b> Starting cold renders the fat instead of seizing the skin, and the rendered fat is what the potatoes cook in afterwards. The hardest part is leaving it alone; every check costs you the crust.",
    tags: ["zone-2", "rest-day", "renders-its-own-fat"], variants: [], usedOn: [],
  },
  {
    id: "steak-tacos", name: "Steak tacos", type: "dinner",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 1150, time: "20 min",
    cookware: ["pan"], draft: true, prepAtHome: "Marinate the steak at home in a bag; it travels in Zone 2 and is better for the wait.",
    ingredients: ["300 g skirt or flank steak", "6 corn or flour tortillas", "Cotija or cheddar", "Mild salsa", "Lime"],
    technique: "<b>Very hot pan, two minutes a side, then rest it while the tortillas warm in the same pan.</b> Slice <i>against</i> the grain and thin — skirt is chewy cut the wrong way and tender cut the right way, and that's the entire difference. Mild salsa, no chilli stacked on top.",
    tags: ["zone-2", "the-good-night", "spice-1"], variants: [], usedOn: [],
  },
  {
    id: "camp-fried-rice", name: "Fried rice from last night's rice", type: "dinner",
    method: "pan", cleanup: "low", water: "wash-needed", kcal: 1000, time: "12 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["Cold cooked rice", "2 eggs", "Smoked sausage or leftover meat", "Soy sauce", "Sesame oil", "Whatever Zone 2 has left"],
    technique: "<b>Cold rice only — fresh rice steams and turns to paste.</b> This is the payoff for cooking double the night before, and it doubles as the Zone 2 clean-out: anything perishable left goes in and nothing is precious about it.",
    tags: ["leftovers", "zone-2-drain", "cook-double-starch", "fast"], variants: [], usedOn: [],
  },
  {
    id: "loaded-hot-dogs", name: "Split-and-griddled hot dogs, loaded", type: "dinner",
    method: "pan", cleanup: "low", water: "wash-needed", kcal: 950, time: "10 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["4 good hot dogs", "Buns", "Tinned chili", "Cheddar", "Onion", "Mustard"],
    technique: "<b>Halve them lengthwise before they hit the pan.</b> Twice the surface, so they crisp instead of just heating, and they sit flat in a bun instead of rolling out. Ten minutes total. The dish for a night you have no ambition left.",
    tags: ["fast", "low-cleanup", "late-arrival", "low-effort"], variants: [], usedOn: [],
  },
  {
    id: "philly-roll", name: "Philly-style steak and cheese roll", type: "dinner",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 1250, time: "20 min",
    cookware: ["pan"], draft: true,
    prepAtHome: "Ask the counter to shave the beef, or freeze it 20 min at home and slice thin — impossible to do well at a picnic table.",
    ingredients: ["250 g shaved beef", "1 onion", "Provolone", "Hoagie roll", "Oil"],
    technique: "<b>Onions first, beef in fast at high heat, then the cheese laid straight over the pile in the pan</b> and the roll pressed on top to steam. Slide a spatula under the whole thing and flip it into the bread. Twenty minutes and it feels like a takeaway.",
    tags: ["zone-2", "the-good-night", "handheld"], variants: [], usedOn: [],
  },
  {
    id: "pierogi-kielbasa", name: "Pan-fried pierogi with kielbasa", type: "dinner",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 1200, time: "18 min",
    cookware: ["pan"], draft: true,
    prepAtHome: "Frozen pierogi go in as Zone 1 — they act as ice for the first days and get eaten before they'd spoil.",
    ingredients: ["Frozen pierogi", "Kielbasa, sliced", "Butter", "Onion", "Sour cream"],
    technique: "<b>Straight from frozen into butter — no boiling.</b> They thaw and brown in the same pan, which is the trick that makes them camp food rather than kitchen food. Kielbasa first for the fat, pierogi in that, onion last so it doesn't burn.",
    tags: ["zone-1", "frozen-flat-adjacent", "cold-weather"], variants: [], usedOn: [],
  },
  {
    id: "grilled-cheese-soup", name: "Grilled cheese and tomato soup", type: "dinner",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 1000, time: "15 min",
    cookware: ["pan", "pot"], draft: true, prepAtHome: null,
    ingredients: ["Sourdough", "Sharp cheddar", "Butter", "Tinned or carton tomato soup"],
    technique: "<b>Two burners' worth of cooking done in sequence on one.</b> Soup heated first and poured into the mug or flask to hold its heat, pan wiped, sandwich griddled while you drink it. The order is what makes it work.",
    tags: ["cold-weather", "comfort", "one-burner-sequential"], variants: [], usedOn: [],
  },
  {
    id: "corned-beef-hash", name: "Corned beef hash from the can", type: "dinner",
    method: "pan", cleanup: "low", water: "wash-needed", kcal: 950, time: "15 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["1 tin corned beef hash", "2 eggs", "Hot sauce, optional", "Bread"],
    technique: "<b>Press it flat and walk away.</b> The entire dish is the crust on the bottom, and it needs six or seven undisturbed minutes to form. One tin, one pan, entirely shelf-stable — this is a day-10 dinner that costs nothing to carry.",
    tags: ["zone-3-only", "shelf-stable", "low-effort", "late-trip"], variants: [], usedOn: [],
  },

  /* ---------------------------------------------------- DINNER — THE POT */
  {
    id: "cacio-e-pepe", name: "Cacio e pepe", type: "dinner",
    method: "one-pot", cleanup: "low", water: "wash-needed", kcal: 1000, time: "15 min",
    cookware: ["pot"], draft: true, prepAtHome: null,
    ingredients: ["150 g spaghetti or bucatini", "80 g pecorino or parmesan, finely grated", "Black pepper", "Olive oil"],
    technique: "⭐ <b>Four ingredients, no cooler, and the best effort-to-payoff ratio in this file.</b> Cook the pasta in <i>less</i> water than usual so the starch concentrates. Take the pot fully off the heat before the cheese goes in — on the burner it splits into strings and no amount of stirring recovers it. Toast the pepper in the dry pot first.",
    tags: ["zone-3-only", "no-cooler", "shelf-stable", "the-good-night"], variants: [], usedOn: [],
  },
  {
    id: "camp-carbonara", name: "Camp carbonara", type: "dinner",
    method: "one-pot", cleanup: "med", water: "wash-needed", kcal: 1200, time: "18 min",
    cookware: ["pot", "pan"], draft: true, prepAtHome: null,
    ingredients: ["150 g spaghetti", "100 g pancetta or bacon", "2 eggs", "60 g parmesan", "Black pepper"],
    technique: "<b>Off the heat, always.</b> Eggs and cheese beaten together, pasta and a splash of its water stirred in with the pot on the ground, not the burner. Residual heat is enough. On the flame it is scrambled egg with pasta in it — there is no middle outcome.",
    tags: ["zone-2", "off-heat-finish", "the-good-night"], variants: [], usedOn: [],
  },
  {
    id: "amatriciana", name: "Bucatini all'amatriciana", type: "dinner",
    method: "one-pot", cleanup: "med", water: "wash-needed", kcal: 1150, time: "20 min",
    cookware: ["pot"], draft: true, prepAtHome: null,
    ingredients: ["150 g bucatini", "100 g guanciale or pancetta", "1 tin chopped tomatoes", "Pecorino", "Black pepper"],
    technique: "<b>Chilli left out on purpose</b> — the traditional version carries it and you don't want it. Render the guanciale properly first; that fat is the sauce. Tin of tomatoes reduced hard while the pasta cooks. Everything shelf-stable except the cured pork, which doesn't need a cooler anyway.",
    tags: ["zone-3-capable", "spice-1", "shelf-stable"], variants: [], usedOn: [],
  },
  {
    id: "tomato-cream-sausage-pasta", name: "Tomato cream pasta with sausage", type: "dinner",
    method: "one-pot", cleanup: "med", water: "wash-needed", kcal: 1200, time: "18 min",
    cookware: ["pot"], draft: true, prepAtHome: null,
    ingredients: ["150 g short pasta", "2 Italian sausages, skinned", "Jarred tomato sauce", "Cream powder or evaporated milk", "Parmesan"],
    technique: "<b>Nearly foolproof, which is the point of having it on the list.</b> Brown the sausage meat in lumps, sauce in, cream in, pasta cooked separately or straight in with extra liquid. Nothing here splits, burns or needs timing. The dinner for a night you're tired and it's getting dark.",
    tags: ["low-risk", "zone-2", "late-arrival"], variants: [], usedOn: [],
  },
  {
    id: "stovetop-mac", name: "Real stovetop mac and cheese", type: "dinner",
    method: "one-pot", cleanup: "med", water: "wash-needed", kcal: 1150, time: "15 min",
    cookware: ["pot"], draft: true, prepAtHome: null,
    ingredients: ["150 g macaroni", "1 small tin evaporated milk", "150 g sharp cheddar, grated", "Butter", "Mustard powder"],
    technique: "<b>Evaporated milk, not a powder packet</b> — it's shelf-stable, it doesn't split, and the difference between this and the boxed version is enormous for the same effort. Cheese in off the heat, a handful at a time. Mustard powder is what stops it tasting flat.",
    tags: ["zone-3-capable", "comfort", "shelf-stable"], variants: [], usedOn: [],
  },
  {
    id: "gnocchi-brown-butter", name: "Gnocchi in brown butter", type: "dinner",
    method: "pan", cleanup: "low", water: "wash-needed", kcal: 1000, time: "10 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["Shelf-stable gnocchi", "60 g butter", "Parmesan", "Sage or black pepper"],
    technique: "<b>No boiling at all — straight from the packet into hot butter.</b> They crisp outside and stay soft inside, which is better than the boiled version and skips a pot of water you'd have to carry and dump. Ten minutes, and the only shelf-stable dinner here that feels like a restaurant.",
    tags: ["zone-3-only", "no-boiling-water", "fast", "shelf-stable"], variants: [], usedOn: [],
  },
  {
    id: "lentil-sausage-stew", name: "Lentil and sausage stew", type: "dinner",
    method: "one-pot", cleanup: "low", water: "wash-needed", kcal: 1000, time: "25 min",
    cookware: ["pot"], draft: true, prepAtHome: null,
    ingredients: ["Tinned or pouch lentils", "Smoked sausage", "1 onion", "Tinned tomatoes", "Stock cube", "Olive oil"],
    technique: "<b>Shelf-stable start to finish and the cheapest calories per gram carried in the file.</b> Pouch lentils skip the soaking that makes dried ones a non-starter at camp. One pot, no timing, and it is better reheated — so cook the whole pouch and eat the rest for breakfast.",
    tags: ["zone-3-only", "shelf-stable", "cheap", "makes-leftovers"], variants: [], usedOn: [],
  },
  {
    id: "tortellini-broth", name: "Tortellini in broth with parmesan", type: "dinner",
    method: "one-pot", cleanup: "low", water: "wash-needed", kcal: 950, time: "8 min",
    cookware: ["pot"], draft: true, prepAtHome: null,
    ingredients: ["Shelf-stable filled tortellini", "Stock cube", "Parmesan", "Olive oil", "Black pepper"],
    technique: "<b>The fastest real dinner here — eight minutes from cold burner to eating.</b> Shelf-stable tortellini cook in four. Cooked in the broth rather than drained, so there is no pasta water to dispose of and nothing to strain. This is the dish for a headlamp arrival where the alternative is a bar.",
    tags: ["fastest", "zone-3-only", "no-straining", "late-arrival"], variants: [], usedOn: [],
  },

  /* ------------------------------------------------------------ NO WATER */
  {
    id: "boil-bag-mash", name: "Instant mash with gravy and sausage", type: "dinner",
    method: "bag", cleanup: "none", water: "boil-only", kcal: 1000, time: "5 min",
    cookware: ["pot"], draft: true,
    prepAtHome: "<b>Pre-mix into a labelled double bag:</b> instant mash, gravy granules, milk powder, seasoning.",
    ingredients: ["Instant mashed potato", "Gravy granules", "Whole milk powder", "Shelf-stable sausage or a meat pouch", "Butter"],
    technique: "<b>Boiling water and nothing else, in five minutes.</b> Mash is the most forgiving boil-bag base there is — no soak time, no minimum, and it cannot go wrong in the dark. Sausage sliced in cold with the folding knife.",
    tags: ["no-water", "boil-bag", "fast", "pre-mix-required", "dark-and-cold"], variants: [], usedOn: [],
  },
  {
    id: "boil-bag-stuffing", name: "Stuffing mix with chicken pouch", type: "dinner",
    method: "bag", cleanup: "none", water: "boil-only", kcal: 900, time: "6 min",
    cookware: ["pot"], draft: true,
    prepAtHome: "Decant the boxed mix into a labelled double bag; the box is packaging you'd carry out.",
    ingredients: ["Boxed stuffing mix", "Chicken pouch", "Butter", "Water"],
    technique: "<b>A boil-bag meal nobody thinks of.</b> Boxed stuffing is engineered to rehydrate in exactly boiling water, it is savoury rather than sweet, and it costs almost nothing. Six minutes. Chicken torn in at the end.",
    tags: ["no-water", "boil-bag", "cheap", "pre-mix-required"], variants: [], usedOn: [],
  },
  {
    id: "boil-bag-noodles", name: "Instant noodles in the bag", type: "dinner",
    method: "bag", cleanup: "none", water: "boil-only", kcal: 850, time: "5 min",
    cookware: ["pot"], draft: true, prepAtHome: null,
    ingredients: ["Instant noodle block", "Half the seasoning sachet", "Meat pouch", "Sesame oil", "Butter"],
    technique: "<b>Never touches the pot.</b> Noodles and half the sachet — the whole one is far too salty for a day you've been sweating — into the bag, boiling water over, rolled shut five minutes. Pouch protein and a slick of oil at the end for the calories.",
    tags: ["no-water", "boil-bag", "fast", "half-the-sachet"], variants: [], usedOn: [],
  },

  /* ----------------------------------------------------- SWEET AND SNACK */
  {
    id: "pan-smores", name: "Pan s'mores", type: "drink",
    method: "pan", cleanup: "low", water: "wash-needed", kcal: 500, time: "5 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["Graham crackers", "Chocolate", "Marshmallows"],
    technique: "<b>No fire required, which matters under a burn ban</b> — and burn bans are checked on the universal checklist for a reason. Assembled in a dry pan on low with the lid on for two minutes. Works where an open fire is illegal.",
    tags: ["no-fire-needed", "burn-ban-safe", "sweet"], variants: [], usedOn: [],
  },
  {
    id: "cinnamon-toast", name: "Butter, sugar and cinnamon toast", type: "drink",
    method: "pan", cleanup: "none", water: "none", kcal: 400, time: "3 min",
    cookware: ["pan"], draft: true, prepAtHome: null,
    ingredients: ["Bread", "Butter", "Sugar", "Cinnamon"],
    technique: "<b>Ten seconds of effort on a pan you already dirtied.</b> Straight after dinner while it's still hot — no extra washing, no extra fuel, and it turns the end of a cold evening into something. The lowest-cost item in this file by a distance.",
    tags: ["zero-extra-cleanup", "after-dinner", "sweet", "glycogen"], variants: [], usedOn: [],
  },
  {
    id: "skillet-cookie", name: "One pan cookie from dough", type: "drink",
    method: "pan", cleanup: "med", water: "wash-needed", kcal: 800, time: "15 min",
    cookware: ["pan", "lid"], draft: true, prepAtHome: null,
    ingredients: ["Refrigerated cookie dough", "Butter for the pan"],
    technique: "<b>Low heat and a lid, and check it early.</b> Pressed into a buttered pan, lid on, lowest flame — the bottom goes long before the top sets, so it comes off slightly underdone and finishes in the residual heat. Genuinely worth the fifteen minutes on the last night.",
    tags: ["last-night", "needs-lid", "sweet", "glycogen"], variants: [], usedOn: [],
  },
  {
    id: "roasted-trail-mix", name: "Roasted nut and chocolate mix", type: "drink",
    method: "no-cook", cleanup: "none", water: "none", kcal: 600, time: "0 min",
    cookware: [], draft: true,
    prepAtHome: "Mixed at home from <b>roasted</b> nuts, so the bag that goes in the pack is already correct.",
    ingredients: ["Roasted almonds, pecans, cashews", "Dark chocolate chunks", "Pretzels or salted crackers"],
    technique: "<b>This is the standing trail-mix slot, built roasted on purpose.</b> Off-the-shelf trail mix is raw nuts and dried fruit — the exact combination to avoid. Buying roasted costs nothing and removes the problem entirely. No dried fruit until that question is settled.",
    tags: ["oas-safe", "roasted-only", "no-water", "snack"], variants: [], usedOn: [],
  },
  {
    id: "resupply-sweets", name: "Whatever looks good at the resupply", type: "drink",
    method: "no-cook", cleanup: "none", water: "none", kcal: 500, time: "0 min",
    cookware: [], draft: true, prepAtHome: null,
    ingredients: ["Chosen at the shop, not planned here"],
    technique: "<b>Listed so the shopping list budgets for it rather than pretending it doesn't happen.</b> The stated default is a grocery-store grab for glycogen, and a plan that leaves it out is a plan that's quietly wrong about what the trip costs and weighs.",
    tags: ["resupply", "snack", "glycogen", "unplanned-by-design"], variants: [], usedOn: [],
  },
];

/* Genuine gaps. Listed rather than guessed — same rule as a waypoint with no
   coordinate. */
const KITCHEN_OPEN_QUESTIONS = [
  {
    q: "Where are MEALS-trip1-kentucky.md and MEALS-trip2-october.md?",
    blocks: "Exact grams for roughly half these recipes, and the eleven-day cooler timeline the Appalachians page says is 'not yet on this page'.",
    fix: "Paste both files. They are the source both trip pages were transcribed from and they never made it into the repo.",
  },
  {
    q: "Does Maui 2027 get real meals or stay at 'made'?",
    blocks: "Every Maui day says `made` / `bought` with no recipe. On a fly-in trip with no cooler and bought fuel canisters, most of this library does not transfer — the frozen-flat system needs a car.",
    fix: "Decide whether Maui gets a fly-in subset (Zone 3 only, no frozen flat) or is honestly marked as unplanned food.",
  },
  {
    q: "Second wide-mouth thermos — buy or not?",
    blocks: "Any pre-dawn morning where hot oats and hot chocolate are both wanted. Currently they compete for one thermos.",
    fix: "It is already on the gear locker as an open item. Cheap fix, recurring benefit.",
  },
  {
    q: "Kentucky's day cards don't print meal codes; its provisions section does.",
    blocks: "Cross-referencing a printed day sheet against the shopping list. K-B1, K-B2, K-B5, K-L1, K-D1 and K-D2 are all cited under Provisions but appear nowhere on the day they're eaten. The Appalachians page labels every slot.",
    fix: "Add the codes to the Kentucky day slots — additive, no restructuring. Deliberately not done here: the trip is 15 days out and its own file says three weeks out is the wrong time to touch it. Do it after Sept 27.",
  },
  {
    q: "K-L2 is scheduled inside the Sept 23 lecture block.",
    blocks: "Kentucky day 2 lunch. Three rounds of quesadillas, pan, spatula, MED cleanup, at 12:05 during an 11:00–3:00 remote lecture.",
    fix: "The trip page calls it 'confirmed workable' in the day card and flags it as a conflict in provisions. Those two statements disagree. Pick one before Sept 22.",
  },
];
