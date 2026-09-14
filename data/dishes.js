/* ==========================================================================
   dishes.js — CANDIDATES, not recipes. The menu-bench yes/no list.

   Nothing here is in a trip plan. This is the shortlist Colin votes on, and
   the votes are what turn into real entries in data/meals.js. A "no" is worth
   as much as a "yes" — the repo has no DISLIKES list, and rejections are how
   it gets one.

   Every candidate is built to the same constraints the library is:
     one burner · one pot · one pan · solo portion · ~3,000 kcal/day
     spice 1–2 of 5 · simple over clever · nothing that needs a second stove

   Anchors he named: burgers, pizza, pasta. Those get real weight below rather
   than a token entry each.

   `kcal` is an ESTIMATE for one solo portion, to sort by density — not a
   measured figure.

   `mealId` names the recipe in data/meals.js this candidate already exists as,
   and tools/validate.mjs checks it resolves — so "in the library" is a claim
   that gets verified rather than a label somebody typed. Where a candidate is
   a VARIANT of a library recipe rather than the recipe itself, it still points
   at its parent and the blurb says so; voting no on a variant is a different
   answer from voting no on the dish.

   VOTED 2026-09-07, all 88: 63 yes, 5 maybe, 20 no. `vote` records the answer
   and `becameMealId` names the recipe a yes was written up as. The 20 nos are
   the more valuable half — they became DISLIKES in data/profile.js, which the
   validator enforces the way it enforces DECLINED. Nothing here is deleted
   after a vote: a rejected candidate is a record of a decision, and deleting
   it invites a future session to propose the same dish again.

   `oas` marks a candidate leaning on raw or dried fruit, which is the one part
   of the allergy question still open. Roasted nuts are confirmed fine.

   cleanup: none | low | med | high   (where it can be scheduled)
   time:    minutes, cooking only, ignoring anything done at home
   ========================================================================== */

const DISH_GROUPS = [
  {
    group: "Breakfast",
    note: "You asked for more options and said non-breakfasty is fine, so about half of these aren't breakfast food.",
    dishes: [
      { id: "b-oats", vote: "yes", name: "Hot oats+", blurb: "The incumbent. Pre-mixed bag, boil, PB stirred in off the heat.", method: "boil", cleanup: "low", time: 6, kcal: 970, have: true, mealId: "oats-plus", oas: true },
      { id: "b-burrito", vote: "yes", name: "Chorizo–potato foil burrito", blurb: "Built and frozen at home, foil into a dry pan, eaten one-handed.", method: "pan", cleanup: "none", time: 6, kcal: 760, have: true, mealId: "foil-burrito" },
      { id: "b-eggs-toast", vote: "yes", name: "Eggs, spinach and pepper with sourdough", blurb: "Toast the bread dry first. The relaxed morning.", method: "pan", cleanup: "med", time: 12, kcal: 700, have: true, mealId: "eggs-spinach-toast" },
      { id: "b-tacos", vote: "yes", name: "Loaded breakfast tacos", blurb: "Eggs, potato, cheddar, three tortillas. Faster if the potatoes were cooked last night.", method: "pan", cleanup: "med", time: 14, kcal: 1000, have: true, mealId: "breakfast-tacos" },
      { id: "b-hash", vote: "yes", name: "Sausage and pepper hash with eggs on top", blurb: "The Zone-2 drain. Needs a sink.", method: "pan", cleanup: "high", time: 30, kcal: 1100, have: true, mealId: "sausage-pepper-hash" },
      { id: "b-bagel-cold", vote: "yes", name: "Cold bagel plate", blurb: "No dishes, no water, no decisions in the dark.", method: "no-cook", cleanup: "none", time: 0, kcal: 725, have: true, mealId: "cold-bagel-plate", oas: true },
      { id: "b-bacon-egg-bagel", vote: "yes", becameMealId: "bacon-egg-bagel", name: "Bacon, egg and cheese bagel", blurb: "Bacon first, egg in the fat, bagel toasted in what's left. One pan, sequential.", method: "pan", cleanup: "med", time: 14, kcal: 950 },
      { id: "b-biscuits-gravy", vote: "no", name: "Sausage gravy over split biscuits", blurb: "Brown sausage, flour, milk powder and water. Bakery biscuits from the resupply.", method: "pan", cleanup: "med", time: 15, kcal: 1100 },
      { id: "b-french-toast", vote: "yes", becameMealId: "french-toast", name: "Thick-cut French toast", blurb: "Sourdough, egg, milk powder, butter, syrup. Uses up bread going stale.", method: "pan", cleanup: "med", time: 12, kcal: 900 },
      { id: "b-pancakes", vote: "yes", becameMealId: "shaker-pancakes", name: "Pancakes from a shaker bottle", blurb: "Just-add-water mix shaken in the bottle it pours from. Nothing to wash but the pan.", method: "pan", cleanup: "low", time: 12, kcal: 850 },
      { id: "b-grits", vote: "no", name: "Cheese grits with sausage", blurb: "Quick grits, sharp cheddar, butter, sliced smoked sausage stirred through.", method: "one-pot", cleanup: "low", time: 10, kcal: 950 },
      { id: "b-congee", vote: "no", name: "Savoury rice porridge with egg", blurb: "Instant rice cooked past done, egg stirred in, sesame oil, scallion. Non-breakfasty and very cheap to carry.", method: "one-pot", cleanup: "low", time: 12, kcal: 800 },
      { id: "b-leftover-pasta", vote: "yes", becameMealId: "fried-leftover-pasta", name: "Last night's pasta, fried", blurb: "Cold pasta pressed into a hot oiled pan until the bottom crisps. Deliberately non-breakfast.", method: "pan", cleanup: "low", time: 8, kcal: 900 },
      { id: "b-quesadilla-am", vote: "yes", becameMealId: "breakfast-quesadilla", name: "Breakfast quesadilla", blurb: "Egg, cheese, leftover meat, folded. Cuts in half and eats in the car.", method: "pan", cleanup: "med", time: 10, kcal: 850 },
      { id: "b-shakshuka", vote: "no", name: "One-pan eggs in tomato sauce", blurb: "Jarred sauce, eggs cracked in, lid on, bread to mop. Mild — no harissa.", method: "pan", cleanup: "med", time: 15, kcal: 800 },
      { id: "b-pbbanana-toast", vote: "yes", becameMealId: "griddled-pb-honey", name: "Griddled PB and honey sandwich", blurb: "Buttered outside, hot pan, pressed. Two minutes, one pan, no plate.", method: "pan", cleanup: "low", time: 5, kcal: 800 },
      { id: "b-protein-shake", vote: "yes", becameMealId: "shake-and-bar", name: "Milk-powder protein shake + bar", blurb: "The genuinely zero-effort option for a 5 AM start. Shake it while walking.", method: "no-cook", cleanup: "none", time: 1, kcal: 600 },
    ],
  },
  {
    group: "Lunch — no cooking",
    note: "You said you'll be moving, so all of these assemble cold and most survive a pack.",
    dishes: [
      { id: "l-sub", vote: "yes", name: "Sourdough sub, built at home", blurb: "Salami, provolone, pepperoncini, oil, oregano. Departure day.", method: "assemble", cleanup: "none", time: 0, kcal: 850, have: true, mealId: "sourdough-sub", oas: true },
      { id: "l-muffuletta", vote: "yes", name: "Pressed muffuletta", blurb: "Built the night before, pressed under the cooler lid. Better squashed.", method: "assemble", cleanup: "none", time: 0, kcal: 1200, have: true, mealId: "pressed-sandwich", oas: true },
      { id: "l-charcuterie", vote: "yes", name: "Salami, aged cheddar and tortillas", blurb: "The default trail lunch. Zero cooler dependence.", method: "no-cook", cleanup: "none", time: 0, kcal: 950, have: true, mealId: "charcuterie-tortillas", oas: true },
      { id: "l-pouch", vote: "no", name: "Waterless pouch plate", blurb: "Salmon eaten from the pouch. The pouch is the plate and it packs out.", method: "no-cook", cleanup: "none", time: 0, kcal: 900, have: true, mealId: "pouch-plate-no-water", oas: true },
      { id: "l-pbroll", vote: "yes", name: "PB-and-honey roll, built the night before", blurb: "Nothing requiring gloves off on an exposed ridge.", method: "assemble", cleanup: "none", time: 0, kcal: 800, have: true, mealId: "pb-honey-roll", oas: true },
      { id: "l-italian-wrap", vote: "yes", becameMealId: "italian-tortilla-wrap", name: "Pressed Italian tortilla wrap", blurb: "The muffuletta idea in a tortilla — survives being sat on where bread turns to crumbs.", method: "assemble", cleanup: "none", time: 0, kcal: 1000 },
      { id: "l-banh-mi", vote: "no", name: "Cold cut bánh mì-style roll", blurb: "Pâté or cold cuts, quick-pickled carrot made at home, cilantro, mayo. Mild.", method: "assemble", cleanup: "none", time: 0, kcal: 900 },
      { id: "l-tuna-crackers", vote: "no", name: "Tuna or chicken salad on crackers", blurb: "Pouch, mayo packets, mustard, relish. Mixed in the pouch, no bowl.", method: "no-cook", cleanup: "none", time: 3, kcal: 800 },
      { id: "l-cuban", vote: "yes", becameMealId: "cuban-roll", name: "Pressed ham, cheese and pickle roll", blurb: "The Cuban without the press. Ham, swiss, pickle, mustard, weighted overnight.", method: "assemble", cleanup: "none", time: 0, kcal: 950 },
      { id: "l-pizza-cold", vote: "no", name: "Cold leftover skillet pizza", blurb: "If pizza night happens, the leftover slice is a legitimately good trail lunch.", method: "no-cook", cleanup: "none", time: 0, kcal: 800 },
      { id: "l-hummus-plate", vote: "no", name: "Hummus, salami and pita", blurb: "Shelf-stable hummus cups. Nothing to wash.", method: "no-cook", cleanup: "none", time: 0, kcal: 850 },
      { id: "l-summer-sausage", vote: "yes", becameMealId: "summer-sausage-board", name: "Summer sausage and cheese board", blurb: "Sliced with the folding knife onto a tortilla. Zone 3 entirely.", method: "no-cook", cleanup: "none", time: 0, kcal: 950 },
      { id: "l-egg-salad", vote: "no", name: "Egg salad wrap from hard-boiled eggs", blurb: "Eggs boiled at breakfast, mashed with mayo at midday. Piggybacks the morning boil.", method: "assemble", cleanup: "low", time: 5, kcal: 800 },
      { id: "l-rice-ball", vote: "no", name: "Rice balls with tuna and mayo", blurb: "Made from last night's rice, wrapped in foil. Onigiri without the ceremony.", method: "assemble", cleanup: "none", time: 0, kcal: 700 },
    ],
  },
  {
    group: "Carried hot — the thermos slot",
    note: "Your stated routine: snack → hike → hot meal at the turnaround → hike out. One thermos, so one of these per day, max.",
    dishes: [
      { id: "t-couscous", vote: "maybe", name: "Couscous with chicken and feta", blurb: "Holds heat, doesn't slosh. The incumbent thermos dinner.", method: "thermos", cleanup: "low", time: 10, kcal: 1000, have: true, mealId: "thermos-couscous-dinner" },
      { id: "t-soup-plate", vote: "maybe", name: "Tomato soup in the thermos + tortilla plate", blurb: "Heated in the same pot right after breakfast. One boil, two meals.", method: "thermos", cleanup: "low", time: 5, kcal: 950, have: true, mealId: "thermos-soup-lunch" },
      { id: "t-chili-thermos", vote: "yes", becameMealId: "thermos-chili", name: "Chili carried hot", blurb: "Reheated at camp at dawn, eaten at the turnaround five hours later.", method: "thermos", cleanup: "low", time: 10, kcal: 950 },
      { id: "t-mac", vote: "yes", becameMealId: "thermos-mac", name: "Mac and cheese in the thermos", blurb: "Cooked thick at camp; it keeps eating well for hours.", method: "thermos", cleanup: "low", time: 15, kcal: 1100 },
      { id: "t-ramen-loaded", vote: "no", name: "Loaded instant ramen with egg and sausage", blurb: "Noodles slightly under-done so they finish in the flask.", method: "thermos", cleanup: "low", time: 10, kcal: 900 },
      { id: "t-beef-stew", vote: "yes", becameMealId: "thermos-beef-stew", name: "Beef stew, frozen flat and reheated", blurb: "Zone 1 on the way out, hot lunch at 5,000 ft on the way back.", method: "thermos", cleanup: "low", time: 12, kcal: 1050 },
      { id: "t-rice-bowl", vote: "yes", becameMealId: "thermos-rice-bowl", name: "Rice bowl with pulled pork", blurb: "Instant rice, pouch or tub pork, cheese. Assembles hot in the flask.", method: "thermos", cleanup: "low", time: 10, kcal: 1050 },
      { id: "t-potato-soup", vote: "yes", becameMealId: "thermos-potato-soup", name: "Loaded potato soup", blurb: "Instant mash, milk powder, bacon bits, cheddar. Absurd calories per gram carried.", method: "thermos", cleanup: "low", time: 8, kcal: 1000 },
    ],
  },
  {
    group: "Dinner — the pan",
    note: "Burgers and pizza both live here. Both are genuinely doable on one burner and neither is currently in the library.",
    dishes: [
      { id: "d-smashburger", vote: "yes", becameMealId: "smashburgers", name: "Smashburgers", blurb: "Two thin patties smashed hard in a dry hot pan, cheese, toasted bun. ⭐ You named burgers first.", method: "pan", cleanup: "med", time: 15, kcal: 1200 },
      { id: "d-patty-melt", vote: "yes", becameMealId: "patty-melt", name: "Patty melt on sourdough", blurb: "Burger meets grilled cheese. Onions cooked down first in the same pan.", method: "pan", cleanup: "med", time: 20, kcal: 1300 },
      { id: "d-skillet-pizza", vote: "yes", becameMealId: "skillet-pizza", name: "Skillet pizza with a lid", blurb: "Store dough or a flatbread base, lid on to melt the top. ⭐ You named pizza.", method: "pan", cleanup: "med", time: 20, kcal: 1200 },
      { id: "d-tortilla-pizza", vote: "yes", becameMealId: "tortilla-pizza", name: "Tortilla pizza, three of them", blurb: "The fast version — crisp tortilla, sauce, cheese, pepperoni, lid on. 6 minutes each.", method: "pan", cleanup: "low", time: 15, kcal: 1000 },
      { id: "d-calzone", vote: "yes", becameMealId: "calzone", name: "Folded calzone in the pan", blurb: "Same dough, folded, both sides browned. Eats like handheld pizza.", method: "pan", cleanup: "med", time: 20, kcal: 1150 },
      { id: "d-ribeye", vote: "maybe", name: "Ribeye with smashed potatoes", blurb: "The one big night. HIGH cleanup, so only where there's water.", method: "pan", cleanup: "high", time: 45, kcal: 1300, have: true, mealId: "ribeye-smashed-potatoes" },
      { id: "d-shrimp-orzo", vote: "yes", name: "Garlic butter shrimp with orzo", blurb: "Two minutes a side, don't walk away.", method: "pan", cleanup: "high", time: 25, kcal: 1000, have: true, mealId: "shrimp-orzo" },
      { id: "d-pork-chop", vote: "no", name: "Pork chop with apple and onion", blurb: "Chop seared, fruit softened in the fat. Cooked fruit, so OAS-safe.", method: "pan", cleanup: "med", time: 25, kcal: 1100 },
      { id: "d-sausage-peppers", vote: "maybe", name: "Sausage and peppers with bread", blurb: "Italian sausage, peppers, onion, torn sourdough. Very forgiving.", method: "pan", cleanup: "med", time: 20, kcal: 1150 },
      { id: "d-chicken-thighs", vote: "yes", becameMealId: "crispy-chicken-thighs", name: "Crispy chicken thighs with potatoes", blurb: "Skin down, undisturbed, ten minutes. Potatoes finish in the fat.", method: "pan", cleanup: "med", time: 30, kcal: 1200 },
      { id: "d-steak-tacos", vote: "yes", becameMealId: "steak-tacos", name: "Steak tacos", blurb: "Skirt or flank sliced thin, charred fast, warm tortillas, cheese, mild salsa.", method: "pan", cleanup: "med", time: 20, kcal: 1150 },
      { id: "d-fried-rice", vote: "yes", becameMealId: "camp-fried-rice", name: "Fried rice from last night's rice", blurb: "The cook-double-starch payoff. Egg, sausage, whatever's left in Zone 2.", method: "pan", cleanup: "low", time: 12, kcal: 1000 },
      { id: "d-hot-dogs", vote: "yes", becameMealId: "loaded-hot-dogs", name: "Split-and-griddled hot dogs, loaded", blurb: "Halved lengthwise so they crisp. Chili and cheese on top.", method: "pan", cleanup: "low", time: 10, kcal: 950 },
      { id: "d-philly", vote: "yes", becameMealId: "philly-roll", name: "Philly-style steak and cheese roll", blurb: "Thin sliced beef, onion, provolone melted in the pan, into a hoagie.", method: "pan", cleanup: "med", time: 20, kcal: 1250 },
      { id: "d-pierogi", vote: "yes", becameMealId: "pierogi-kielbasa", name: "Pan-fried pierogi with kielbasa", blurb: "Frozen pierogi are Zone 1 ice on the way in. Butter, onion, sour cream.", method: "pan", cleanup: "med", time: 18, kcal: 1200 },
      { id: "d-grilled-cheese-soup", vote: "yes", becameMealId: "grilled-cheese-soup", name: "Grilled cheese and tomato soup", blurb: "Soup in the pot, sandwich in the pan. Two burners' worth done in sequence.", method: "pan", cleanup: "med", time: 15, kcal: 1000 },
      { id: "d-quesadillas", vote: "yes", name: "Pan quesadillas", blurb: "Chicken, cheddar, pepper, salsa, three rounds. Also the designated cooler clean-out slot.", method: "pan", cleanup: "med", time: 12, kcal: 875, have: true, mealId: "quesadillas" },
      { id: "d-rotisserie", vote: "yes", name: "Rotisserie chicken, potatoes and greens", blurb: "A supermarket bird from the resupply covers two dinners with no cooking on the first.", method: "pan", cleanup: "med", time: 25, kcal: 1000, have: true, mealId: "rotisserie-potatoes-greens" },
      { id: "d-hash-corned", vote: "yes", becameMealId: "corned-beef-hash", name: "Corned beef hash from the can", blurb: "Pressed flat and left alone until the bottom is crust. One can, one pan.", method: "pan", cleanup: "low", time: 15, kcal: 950 },
    ],
  },
  {
    group: "Dinner — the pot",
    note: "Pasta was your third anchor. Most of these ride in as frozen-flat Zone 1 and act as the cooler's ice.",
    dishes: [
      { id: "p-ragu", vote: "maybe", name: "Beef-and-pork ragù with rigatoni", blurb: "Frozen flat at home. First Zone 1 dinner out of the cooler.", method: "one-pot", cleanup: "med", time: 20, kcal: 1050, have: true, mealId: "frozen-flat-ragu" },
      { id: "p-chili", vote: "yes", name: "Frozen-flat chili", blurb: "Is simultaneously the ice and the dinner. Poured into a split Frito bag.", method: "one-pot", cleanup: "low", time: 10, kcal: 825, have: true, mealId: "frozen-flat-chili" },
      { id: "p-kielbasa", vote: "yes", name: "Kielbasa, cannellini and orecchiette", blurb: "Entirely shelf-stable — built for day 10 with an empty cooler.", method: "one-pot", cleanup: "med", time: 28, kcal: 1250, have: true, mealId: "kielbasa-cannellini-orecchiette" },
      { id: "p-cacio", vote: "yes", becameMealId: "cacio-e-pepe", name: "Cacio e pepe", blurb: "Pasta, parmesan, black pepper, starch water. Four ingredients, no cooler at all. ⭐ Pasta anchor.", method: "one-pot", cleanup: "low", time: 15, kcal: 1000 },
      { id: "p-carbonara", vote: "yes", becameMealId: "camp-carbonara", name: "Camp carbonara", blurb: "Bacon or pancetta, egg, parmesan, off the heat so it doesn't scramble.", method: "one-pot", cleanup: "med", time: 18, kcal: 1200 },
      { id: "p-amatriciana", vote: "yes", becameMealId: "amatriciana", name: "Bucatini all'amatriciana", blurb: "Guanciale or pancetta, tinned tomato, pecorino. Mild — chilli left out.", method: "one-pot", cleanup: "med", time: 20, kcal: 1150 },
      { id: "p-vodka-ish", vote: "yes", becameMealId: "tomato-cream-sausage-pasta", name: "Tomato cream pasta with sausage", blurb: "Jarred sauce, cream powder, browned sausage. Nearly foolproof.", method: "one-pot", cleanup: "med", time: 18, kcal: 1200 },
      { id: "p-mac", vote: "yes", becameMealId: "stovetop-mac", name: "Real stovetop mac and cheese", blurb: "Evaporated milk and grated cheese, not a powder packet. Genuinely good.", method: "one-pot", cleanup: "med", time: 15, kcal: 1150 },
      { id: "p-gnocchi", vote: "yes", becameMealId: "gnocchi-brown-butter", name: "Gnocchi in brown butter", blurb: "Shelf-stable gnocchi, no boiling needed if pan-crisped. Six minutes.", method: "one-pot", cleanup: "low", time: 10, kcal: 1000 },
      { id: "p-white-chili", vote: "no", name: "White chicken chili", blurb: "The other frozen-flat, milder than the beef one. <b>Currently a variant of the chili recipe, not its own entry</b> — a yes here means split it out.", method: "one-pot", cleanup: "low", time: 10, kcal: 700, have: true, mealId: "frozen-flat-chili" },
      { id: "p-gumbo", vote: "no", name: "Sausage and chicken gumbo over rice", blurb: "Frozen flat. Roux done at home where a burnt one is recoverable. Mild.", method: "one-pot", cleanup: "low", time: 15, kcal: 1100 },
      { id: "p-lentil-sausage", vote: "yes", becameMealId: "lentil-sausage-stew", name: "Lentil and sausage stew", blurb: "Shelf-stable start to finish. Very cheap calories per gram.", method: "one-pot", cleanup: "low", time: 25, kcal: 1000 },
      { id: "p-tortellini", vote: "yes", becameMealId: "tortellini-broth", name: "Tortellini in broth with parmesan", blurb: "Shelf-stable tortellini cook in four minutes. Fastest real dinner here.", method: "one-pot", cleanup: "low", time: 8, kcal: 950 },
      { id: "p-ramen-upgrade", vote: "no", name: "Upgraded ramen with pork and egg", blurb: "Instant noodles, discard half the packet, add real meat and a soft egg.", method: "one-pot", cleanup: "low", time: 12, kcal: 900 },
    ],
  },
  {
    group: "No water at the site",
    note: "Boil-bag or nothing: the pot only ever holds water, so a bandana is the whole wash-up. Every one needs a bag mixed at home.",
    dishes: [
      { id: "n-couscous-bag", vote: "yes", name: "Boil-bag couscous", blurb: "Eight minutes, headlamp on. Flagged as the highest-risk meal on either trip.", method: "bag", cleanup: "none", time: 8, kcal: 950, have: true, mealId: "boil-bag-couscous" },
      { id: "n-burrito-bowl", vote: "yes", name: "Boil-bag burrito bowl", blurb: "Undrained beans count toward your water and leave no wet waste.", method: "bag", cleanup: "none", time: 10, kcal: 1050, have: true, mealId: "boil-bag-burrito-bowl" },
      { id: "n-oats-bag", vote: "yes", name: "Hot oats+ in the bag", blurb: "Hot and ready seven minutes after getting back down. <b>Currently a variant of oats+, not its own entry.</b>", method: "bag", cleanup: "none", time: 3, kcal: 1150, have: true, mealId: "oats-plus", oas: true },
      { id: "n-mash-bag", vote: "yes", becameMealId: "boil-bag-mash", name: "Instant mash with gravy and sausage", blurb: "Mash takes boiling water and nothing else. Absurdly calorie-dense per gram.", method: "bag", cleanup: "none", time: 5, kcal: 1000 },
      { id: "n-stuffing", vote: "yes", becameMealId: "boil-bag-stuffing", name: "Stuffing mix with chicken pouch", blurb: "Boxed stuffing is a boil-bag meal nobody thinks of. Savoury and fast.", method: "bag", cleanup: "none", time: 6, kcal: 900 },
      { id: "n-noodle-bag", vote: "yes", becameMealId: "boil-bag-noodles", name: "Instant noodles in the bag", blurb: "Never touches the pot. Add a pouch of protein and sesame oil.", method: "bag", cleanup: "none", time: 5, kcal: 850 },
      { id: "n-grits-bag", vote: "no", name: "Cheese grits in the bag", blurb: "Instant grits, powdered cheese, butter packets. Three minutes.", method: "bag", cleanup: "none", time: 4, kcal: 850 },
      { id: "n-refried", vote: "no", name: "Refried bean and cheese tortillas", blurb: "Dehydrated refried beans rehydrate in five minutes in the bag.", method: "bag", cleanup: "none", time: 6, kcal: 950 },
    ],
  },
  {
    group: "Sweet and snack",
    note: "You said dessert is mostly a grocery-store grab for glycogen — these are the ones worth actually making, if any.",
    dishes: [
      { id: "s-hotchoc", vote: "yes", name: "Hot chocolate, pre-mixed", blurb: "Whole milk powder and a pinch of salt. The no-coffee pre-dawn answer.", method: "boil", cleanup: "none", time: 3, kcal: 300, have: true, mealId: "hot-chocolate" },
      { id: "s-smores-pan", vote: "yes", becameMealId: "pan-smores", name: "Pan s'mores", blurb: "No fire needed — chocolate and marshmallow melted between graham crackers in the pan.", method: "pan", cleanup: "low", time: 5, kcal: 500 },
      { id: "s-rice-pudding", vote: "no", name: "Rice pudding from leftover rice", blurb: "Milk powder, sugar, cinnamon. Uses the starch you cooked double of.", method: "one-pot", cleanup: "low", time: 10, kcal: 600 },
      { id: "s-banana-boat", vote: "no", name: "Griddled banana with chocolate", blurb: "Cooked, so the raw-fruit problem doesn't apply.", method: "pan", cleanup: "low", time: 6, kcal: 450 },
      { id: "s-cinnamon-toast", vote: "yes", becameMealId: "cinnamon-toast", name: "Butter, sugar and cinnamon toast", blurb: "Ten seconds of effort on the pan you already dirtied.", method: "pan", cleanup: "none", time: 3, kcal: 400 },
      { id: "s-cookie-skillet", vote: "yes", becameMealId: "skillet-cookie", name: "One pan cookie from dough", blurb: "Refrigerated dough pressed into the pan, lid on, low heat.", method: "pan", cleanup: "med", time: 15, kcal: 800 },
      { id: "s-trailmix-roasted", vote: "yes", becameMealId: "roasted-trail-mix", name: "Roasted nut and chocolate mix", blurb: "The trail-mix slot with roasted rather than raw nuts — the OAS-safe version.", method: "no-cook", cleanup: "none", time: 0, kcal: 600 },
      { id: "s-store-sweets", vote: "yes", becameMealId: "resupply-sweets", name: "Whatever looks good at the resupply", blurb: "Your stated default. Listed so the shopping list actually budgets for it.", method: "no-cook", cleanup: "none", time: 0, kcal: 500 },
    ],
  },
];
