/* ==========================================================================
   Bridge Day + Southern Appalachians — Oct 15–25, 2026

   Transcribed from MASTER-trip2-october-2026.md (Sept 2026).
   Rendered by ../../js/trip.js.

   TRANSCRIPTION NOTES
     - Sun times recomputed (NOAA solar position) for each day's coordinates.
       The source ran ~3–4 min optimistic, always in the direction of more
       daylight than exists. Corrected values are used throughout.
     - Hike stats cross-checked against AllTrails where available. Looking
       Glass Rock confirms almost exactly. Black Balsam needs a route
       decision rather than a correction — see the hike table.
     - The lecture is confirmed on BOTH trips' Wednesdays. Oct 21 was already
       the buffer day, so this trip absorbs it with no structural cost.
     - Camp meals are NOT transcribed here. MEALS-trip2-october.md exists and
       contains the cooler timeline for 11 days on one cooler; it has not been
       folded in yet. Restaurant entries below come from the master file.

   Coordinates: only Spence Ridge is verified, and it came from the source
   file. Everything else is unplotted — use the Places tab.
   ========================================================================== */

window.TRIP_DATA = {
  meta: {
    slug: "appalachians-2026",
    title: "Bridge Day + Southern Appalachians",
    subtitle: "Solo · Cleveland → New River Gorge → Pisgah → Linville → Mount Rogers",
    dates: "Thursday, Oct 15 – Sunday, Oct 25, 2026",
    emoji: "🍂",
    theme: "autumn",
    route:
      "Four bases, north to south then back up: Arrowhead Bike Farm WV (3) → Davidson River NC (4) → FS 210 dispersed, Linville Gorge (2) → Hurricane Campground VA (1). Chasing color <i>downhill</i> — balds peak early October, the 3,000–5,000 ft band peaks the second and third weeks, and Linville on Oct 22–23 is the bullseye.",
    vehicle:
      "2013 Subaru Legacy. AWD, ~5.9 in ground clearance, low front air dam. Two roads matter: Keeneys Creek (Nuttallburg access, some sources recommend high clearance) and FS 210 (maintained gravel — the realistic failure mode is a cut sidewall, not getting stuck).",
    gettingThere:
      "I-77 S to Fayetteville, 5h 35m. Home from Hurricane Campground via US 58 E → I-77 N, 7h 30m.",
    stats: [
      { num: "11 days", lbl: "Length" },
      { num: "10", lbl: "Nights camping" },
      { num: "7 of 10", lbl: "Nights reserved" },
      { num: "~46 mi", lbl: "On foot" },
    ],
    overviewCards: [
      { h: "Dates", p: "Oct 15–25, 2026<br>11 days / 10 nights" },
      { h: "Group", p: "Solo." },
      { h: "Lodging", p: "<b>Oct 15 primitive, first-come</b> (NRG park campground) · Arrowhead ✅ Oct 16–18 · Davidson River ✅ 0864063574-1 · <b>FS 210 ❌ first-come</b> · Hurricane ✅ 0840120294-1" },
      { h: "The one real risk", p: "<b>Oct 22.</b> Leave a reserved site at 6:30 AM and race for a first-come dispersed site on FS 210, peak color week, no signal. ⚠️ <b>Nothing in the corridor is reservable — Mortimer isn't either.</b> The early start is the whole mitigation." },
      { h: "The open call", p: "<b>Fayette County Chamber 800-927-0263</b> — Fayette Station Road parking on Bridge Day. Arrowhead is now confirmed Oct 16–18." },
      { h: "The lecture", p: "Wed Oct 21, 11:00–3:00, at camp over Starlink. Confirmed on both 2026 trips. Oct 21 was already the buffer day — this one absorbs it cleanly." },
    ],
    footerNote:
      'Transcribed from the Sept 2026 master file. Sun times recomputed; hike stats cross-checked where AllTrails had them. <a href="../../index.html">← All trips</a>',
  },

  days: [
    {
      day: 1,
      date: "Thu Oct 15, 2026",
      title: "Down I-77",
      tagline: "Five and a half hours, a free site by the river, then the bridge head-on at sunset.",
      type: "travel + activity",
      driving: "~6h 05m",
      slack: "<b>None after dark, and now you are also site-hunting.</b> If the drive runs 90 min long, cut Fayette Station Road — claiming a site in daylight beats a scenic drive. Long Point is what to protect after that.",
      overnight: {
        name: "NRG primitive campground — first-come",
        place: "New River Gorge NP, WV",
        kind: "Primitive, free, no reservations",
        cost: "Free",
        checkin: "None — drive in and take a site",
        confirmation: "❌ No reservation exists or is possible. <b>Every NRG park campground is first-come, year-round.</b>",
        notes: "Four free options, all inside the park, all with fire rings, grills, tables and pit toilets, and <b>none with drinking water</b>: <b>Army Camp</b> (11 sites, near Prince), <b>Glade Creek</b> (11 sites, riverside, Glade Creek Trail from camp), <b>Grandview Sandbar</b>, and <b>Stone Cliff</b>. Seven of the park's eight campgrounds sit right on the river. ⚠️ Access roads to the riverside sites get rough after rain, and this is the Thursday before Bridge Day.",
      },
      schedule: [
        { kind: "drive", time: "7:30 → 1:05", est: "5h 35m", text: "Avon OH → New River Gorge, I-77 S.", maps: "Canyon Rim Visitor Center Lansing WV" },
        { kind: "stop", time: "1:05 → 1:50", est: "45m", text: "⚠️ <b>Decide the campground now, not at 5 PM.</b> Ask at Canyon Rim which of Army Camp, Glade Creek, Grandview Sandbar and Stone Cliff still has space and which access road is passable after recent rain.", warn: true },
        { kind: "drive", time: "1:50 → 2:05", est: "15m", text: "→ Canyon Rim Visitor Center.", maps: "Canyon Rim Visitor Center Lansing WV" },
        { kind: "stop", time: "2:05 → 2:55", est: "50m", text: "Both decks plus the boardwalk. ⚠️ <b>Ask a ranger about Keeneys Creek Road</b> — that's tomorrow's Nuttallburg access and it's the day's biggest variable.", warn: true },
        { kind: "drive", time: "2:55 → 3:55", est: "60m", text: "<b>Fayette Station Road</b> — 8-mile one-way loop, hairpins to the gorge floor, passes directly under the bridge, crosses the Tunney Hunsaker Bridge, through the Fayette and South Fayette townsites.", maps: "Fayette Station Road Fayetteville WV" },
        { kind: "drive", time: "3:55 → 4:10", est: "15m", text: "Road exit onto US-19." },
        { kind: "camp", time: "4:10 → 5:20", est: "1h 10m", text: "⚠️ <b>Claim a primitive site and pitch before dark.</b> Army Camp, Glade Creek, Grandview Sandbar or Stone Cliff — free, first-come, no water, pit toilets. Drive one and take what is open rather than shopping around; it is the Thursday of Bridge Day weekend. <b>Carry your own water in.</b>", warn: true },
        { kind: "hike", time: "5:20 → 6:05", est: "45m", text: "<b>Walk to Long Point from the tent</b>, ~1.6 mi each way.", maps: "Long Point Trailhead Fayetteville WV" },
        { kind: "sunset", time: "6:05 → 7:05", est: "60m", text: "⭐ <b>Long Point through sunset, 6:48</b> (recomputed; the plan said 6:52). Head-on bridge view — the classic angle." },
        { kind: "hike", time: "7:05 → 7:50", est: "45m", text: "Walk back. <b>Headlamp required</b> — civil twilight ends ~7:17 and it's fully dark before you're off the trail.", warn: true },
      ],
      meals: { b: "home", l: "<b>O-L1</b> packed — sourdough sub: salami, provolone, pepperoncini, oil, oregano. Apple, chips. Built at home (~850 kcal)", d: "⚠️ <b>Cook at camp or eat in Fayetteville.</b> The meal plan put you at the Arrowhead biergarten tonight; you are at a primitive site with no water instead. Bring dinner or plan a town stop." },
      highlights:
        "Fayette Station Road drops you to the gorge floor and back in one afternoon, and Long Point gives the head-on bridge view at sunset. ⚠️ Note the change: <b>the Long Point trailhead is at Arrowhead, which you are not at tonight</b> — from a river campground it is a drive, not a walk from the tent.",
      warnings:
        "Two things now compete for the same afternoon: claiming a first-come site and getting to Long Point for sunset. <b>The site wins.</b> Sunset is 6:48 and it is fully dark by 7:17, so the Long Point return is a headlamp walk either way — that part was always true. What is new is that you cannot arrive at a campsite after dark and expect one, on the Thursday before 100,000 people show up in Fayette County. If it is 5:30 and you have no site, skip Long Point and sort the tent.",
    },
    {
      day: 2,
      date: "Fri Oct 16, 2026",
      title: "Endless Wall and a Ford Coal Town",
      tagline: "The rim in the morning, 80 coke ovens in the afternoon.",
      type: "activity",
      driving: "~1h 50m",
      slack: "~1h 15m.",
      overnight: {
        name: "Arrowhead Bike Farm",
        place: "Fayetteville, WV",
        kind: "Private campground",
        cost: "$25.44 for the stay",
        checkin: "Check-in 3 PM. Kitchen till 10 PM Friday.",
        confirmation: "✅ Ref ROTXCV — confirmed Oct 16 → Oct 18, 2 nights",
        notes: null,
      },
      schedule: [
        { kind: "drive", time: "7:45 → 8:05", est: "20m", text: "→ <b>Nuttall lot</b> — NOT Fern Creek. Same distance to the overlook, consistently fewer people.", maps: "Nuttall Trailhead Endless Wall New River Gorge" },
        { kind: "hike", time: "8:05 → 11:05", est: "3h", text: "<b>Endless Wall loop → Diamond Point</b>, 5.4 mi / ~508 ft. Small lots and roadside parking is prohibited — if it's full, come back after 11. ⚠️ <b>This MUST be today</b> — all bridge-overlook trails close tomorrow for Bridge Day security.", warn: true },
        { kind: "drive", time: "11:05 → 11:20", est: "15m", text: "→ downtown Fayetteville.", maps: "Secret Sandwich Society Fayetteville WV" },
        { kind: "food", time: "11:20 → 12:35", est: "1h 15m", text: "<b>Secret Sandwich Society.</b> ⚠️ Weekend waits run 35–50 min; Friday lunch is the right slot. ⭐ <b>The Brussels sprouts</b> — feta, hot honey, balsamic; the dish locals name unprompted. Then the <b>McKinley</b>. <b>Key lime pie to go.</b>" },
        { kind: "drive", time: "12:35 → 1:10", est: "35m", text: "→ <b>Nuttallburg</b> via Keeneys Creek Rd. One lane, steep, drops into the gorge — trees over the hood, rock walls close.", maps: "Nuttallburg Winona WV", warn: true },
        { kind: "ruins", time: "1:10 → 3:40", est: "2h 30m", text: "⭐ <b>NUTTALLBURG.</b> Coal tipple on the C&O tracks, a rust-colored steel conveyor swooping down the hillside above the treetops, <b>80 coke ovens you can walk into</b>, town ruins. Nothing has run since 1958 — no glass in the windows, no graffiti either, grounds maintained. The Nuttall family gave it to the Park Service in 1998.<br><br><b>The Henry Ford angle:</b> Fordson Coal took the mining rights in 1920 trying to vertically integrate coal into the steel supply. Edsel oversaw the investment — the tipple and conveyor are from the 1923–26 rebuild. Ford mothballed the No. 2 mine within a year of visiting." },
        { kind: "hike", time: "optional", est: "+60m", text: "<i>Optional:</i> <b>Conveyor Trail</b>, ~0.5 mi steep to the headhouse. Also nearby: <b>Seldom Seen</b>, a former community reduced to foundation blocks and a great name." },
        { kind: "drive", time: "3:40 → 4:20", est: "40m", text: "→ Arrowhead." },
        { kind: "stop", time: "4:20 → 6:00", est: "1h 40m", text: "Camp, shower, rest. Sunset 6:46." },
        { kind: "food", time: "6:00 → 7:30", est: "1h 30m", text: "Dinner — <b>Pies & Pints</b> (founded here before spreading to five states). ⭐ <b>The black bean pizza with pork</b> — the tourist order is Grape & Gorgonzola; this is the local one. Pimento cheese fries. Or Arrowhead, open till 10 tonight." },
      ],
      meals: { b: "<b>O-B1</b> made — 3 eggs, 60g spinach, ½ bell pepper, 2 slices sourdough, butter. Toast the bread dry first. 12 min (~700 kcal)", l: "bought — Secret Sandwich Society", d: "bought — Pies &amp; Pints, or Arrowhead. <b>Tonight: build tomorrow’s Bridge Day muffuletta and press it under the cooler lid.</b> Also buy the block of ice today." },
      highlights:
        "Nuttallburg is the best ruin on either 2026 trip: a stabilized 90-acre historic district with a conveyor running down the hillside above the treetops, and a Henry Ford vertical-integration story attached to it.",
      warnings:
        "<b>Keeneys Creek Road is the variable.</b> Some sources recommend high clearance and you have 5.9 inches. Ask at Canyon Rim on Day 1. <b>If it's a no:</b> fall back to Kaymoor Top, 5 minutes from camp — same corridor, conveyor and coke ovens, reached by a long stairway down.",
    },
    {
      day: 3,
      date: "Sat Oct 17, 2026",
      title: "Bridge Day, From the Bottom",
      tagline: "876 feet of bridge above you, one jumper every 30 seconds.",
      type: "the big one",
      driving: "~40m plus two shuttles",
      slack: "2 hours before dark. The walk up is the variable — if it takes 3 hours, skip the deck and go straight to the chili.",
      overnight: {
        name: "Arrowhead Bike Farm",
        place: "Fayetteville, WV",
        kind: "Private campground",
        cost: "$25.44 for the stay",
        checkin: null,
        confirmation: "✅ Ref ROTXCV — checkout 11 AM Sun Oct 18, hands straight off to Davidson River at 2 PM",
        notes: null,
      },
      schedule: [
        { kind: "stop", time: "5:45 → 6:45", est: "60m", text: "Wake, breakfast, day bag and <b>CASH</b>. Breakfast option: <b>Tudor's Biscuit World</b>, Oak Hill, ~15 min — a real WV institution, not a tourist stop." },
        { kind: "drive", time: "6:45 → 7:00", est: "15m", text: "→ top of Fayette Station Rd, park. ⚠️ <b>CALL 800-927-0263 TO CONFIRM PARKING.</b> This is the one detail standing between the walk-to-the-bottom plan and improvising at 7 AM.", warn: true },
        { kind: "hike", time: "7:00 → 8:30", est: "1h 30m", text: "<b>Walk DOWN Fayette Station Road</b>, 4.5 mi. Sunrise 7:35 — you start in the dark." },
        { kind: "stop", time: "8:30 → 9:00", est: "30m", text: "Position at the bottom before the 9:00 opening." },
        { kind: "view", time: "9:00 → 11:30", est: "2h 30m", text: "⭐ <b>WATCH FROM BELOW THE JUMP ZONE.</b> 876 ft of bridge above, chutes opening. 2025 figures: 315 jumpers from 35 states and 4 countries, 752 jumps plus 16 tandems — roughly one every 30 seconds." },
        { kind: "hike", time: "11:30 → 1:45", est: "2h 15m", text: "<b>Walk back up</b> — 4.5 mi, ~800 ft, all of it." },
        { kind: "drive", time: "1:45 → 2:00", est: "15m", text: "→ Fayetteville High School shuttle lot.", maps: "Fayetteville High School Fayetteville WV" },
        { kind: "shuttle", time: "2:00 → 2:25", est: "25m", text: "Shuttle, $3 cash." },
        { kind: "stop", time: "2:25 → 3:00", est: "35m", text: "<b>Bridge deck</b> — vendors, rappel teams working the catwalk, final jumps. <b>Watching the rappellers is the sustained action</b> — jumpers are gone in seconds." },
        { kind: "shuttle", time: "3:00 → 3:25", est: "25m", text: "Shuttle back." },
        { kind: "event", time: "3:25 → 4:40", est: "1h 15m", text: "<b>Chili cook-off</b>, Fayette County Courthouse. The food event of the day, plus 200+ vendors. <b>Cash.</b>", maps: "Fayette County Courthouse Fayetteville WV" },
        { kind: "drive", time: "4:40 → 4:50", est: "10m", text: "→ Arrowhead. Sunset 6:45." },
      ],
      meals: { b: "bought — Tudor’s Biscuit World, Oak Hill, 6 AM", l: "<b>O-L2</b> ⭐ pressed muffuletta — ciabatta, 60g Genoa salami, 40g capicola, 50g provolone, olive salad, oil. Built last night, pressed overnight. Plus marcona almonds, apricots, 2 bars, a waffle (~1,200 kcal across the day). <b>Everything in it is cured, aged or oil-packed</b> — ten hours unrefrigerated in a pack, and it is genuinely better squashed.", d: "bought — chili cook-off, cash" },
      highlights:
        "The free, legal version: the roads are open to pedestrians even though the trails are closed and patrolled. You watch from directly below the jump zone instead of from the deck with everyone else.",
      warnings:
        "<b>Rules:</b> US-19 closed 7 AM–5 PM, all four lanes; local traffic only from Ames Heights Rd (N) and Rt 16 (S). Private vehicles cannot reach Fayette Station or Teays Landing — the road closes below Teays Landing at 6 PM Friday and cars there get towed. Riverbank spectating between Fayette Station Rapid and Fleaflicker Rapid is prohibited. No pets, bikes, carts or strollers on the bridge. <b>Fallback if the walk-down is closed in 2026:</b> leave camp 7:30, park at Fayetteville HS by 7:45, shuttle at 8:30, deck 9–3, chili at 3.",
    },
    {
      day: 4,
      date: "Sun Oct 18, 2026",
      title: "Thurmond, Then South",
      tagline: "Population 5, then a waterfall you walk behind.",
      type: "activity + transfer",
      driving: "~5h 30m",
      slack: "Moderate. The afternoon waterfall cluster is all roadside and trims easily.",
      overnight: {
        name: "Davidson River Campground",
        place: "Brevard, NC",
        kind: "USFS campground",
        cost: "Reserved",
        checkin: "Check-in 2 PM Oct 18, checkout noon Oct 22",
        confirmation: "✅ recreation.gov <b>0864063574-1</b> — 4 nights. Campground open, confirmed by phone.",
        notes: "~2,200 ft. Reopening had slipped four times (May 1 → Jul 1 → Sep 1 → Oct 1) before phone confirmation. Mount Pisgah and Lake Powhatan fallbacks are off the board.",
      },
      schedule: [
        { kind: "stop", time: "7:00 → 7:45", est: "45m", text: "Break camp." },
        { kind: "drive", time: "7:45 → 8:25", est: "40m", text: "→ Thurmond.", maps: "Thurmond Depot Thurmond WV" },
        { kind: "ruins", time: "8:25 → 9:40", est: "1h 15m", text: "<b>Thurmond.</b> Population 5 as of the 2010 census. Preserved storefronts and bank buildings; the C&O depot is now an NPS visitor center. In its prime it moved <b>95,000 passengers a year</b> — a division point where the coal and rail industries met." },
        { kind: "drive", time: "9:40 → 2:30", est: "4h 50m", text: "→ Davidson River Campground.", maps: "Davidson River Campground Pisgah Forest NC" },
        { kind: "stop", time: "2:30 → 3:30", est: "60m", text: "Check in (2 PM), set up. ⚠️ <b>TEST STARLINK for Wednesday.</b> Davidson River is forested and cell service here is described as extremely limited. This gives three days of buffer — use them.", warn: true },
        { kind: "drive", time: "3:30 → 3:40", est: "10m", text: "→ Looking Glass Falls.", maps: "Looking Glass Falls Pisgah Forest NC" },
        { kind: "stop", time: "3:40 → 4:00", est: "20m", text: "Looking Glass Falls — roadside." },
        { kind: "drive", time: "4:00 → 4:10", est: "10m", text: "→ Moore Cove trailhead.", maps: "Moore Cove Falls Trailhead Pisgah Forest NC" },
        { kind: "hike", time: "4:10 → 5:10", est: "60m", text: "⭐ <b>Moore Cove Falls</b>, 1.4 mi — 50-ft plunge and <b>the trail goes behind the water</b>." },
        { kind: "drive", time: "5:10 → 5:20", est: "10m", text: "→ Sliding Rock.", maps: "Sliding Rock Pisgah Forest NC" },
        { kind: "stop", time: "5:20 → 5:35", est: "15m", text: "Sliding Rock — looking, not sliding. It's October." },
        { kind: "drive", time: "5:35 → 5:50", est: "15m", text: "→ camp, cook. Sunset 6:53." },
      ],
      meals: { b: "<b>O-B2</b> made — hot oats+ in the pot: 2 packets, milk powder, pecans, dried fruit, PB last. 6 min (~970 kcal)", l: "<b>O-L3</b> packed — bagel, PB, honey, jerky, apple, leftover Bridge Day snacks (~700 kcal)", d: "<b>O-D1</b> made — beef-and-pork ragù frozen flat, 120g rigatoni, parmesan, sourdough. One pot, ~20 min (~1,050 kcal). <b>First Zone 1 dinner out of the cooler.</b>" },
      highlights:
        "Thurmond is a town of five people that used to move 95,000 passengers a year. Moore Cove is the waterfall you walk behind, and it's a mile and a half.",
      warnings:
        "Cathedral Falls and Hawks Nest were <b>removed</b> — they're northwest on Rt 60, the wrong direction when driving south, and cost about an hour of backtracking. Thurmond replaced them. Don't add them back on the day.",
    },
    {
      day: 5,
      date: "Mon Oct 19, 2026",
      title: "Five Parkway Miles",
      tagline: "Grassy summits with no trees, four trailheads, one stretch of road.",
      type: "activity",
      driving: "~1h 30m",
      slack: "<b>~1h 20m.</b> Was 15 minutes. Taking the short Black Balsam bought it, and nothing had to be cut.",
      overnight: {
        name: "Davidson River Campground",
        place: "Brevard, NC",
        kind: "USFS campground",
        cost: "Reserved",
        checkin: null,
        confirmation: "✅ 0864063574-1",
        notes: null,
      },
      schedule: [
        { kind: "drive", time: "7:45 → 8:30", est: "45m", text: "→ Black Balsam trailhead, off BRP MP 420. Sunrise 7:41.", maps: "Black Balsam Knob Trailhead Canton NC" },
        { kind: "hike", time: "8:30 → 9:50", est: "1h 20m", text: "✅ <b>Black Balsam Knob via Art Loeb — the short route, 1.4 mi / 357 ft.</b> AllTrails moving time 46 min. Open grassy summit, real 360°, no trees. <b>This is the chosen version</b>; the Tennent Mountain extension is 3.8 mi / 780 ft and the Graveyard Ridge loop is 9.7 mi / 1,666 ft if you ever want them." },
        { kind: "hike", time: "9:50 → 11:30", est: "1h 40m", text: "✅ <b>Sam Knob</b> — AllTrails confirms 2.5 mi / 561 ft, 78 min. Same lot, no driving." },
        { kind: "stop", time: "11:30 → 12:10", est: "40m", text: "Lunch at the trailhead. Hot soup in the thermos — at 5,000 ft in wind it does more than the calories." },
        { kind: "drive", time: "12:10 → 12:20", est: "10m", text: "→ Graveyard Fields, MP 418.8.", maps: "Graveyard Fields Blue Ridge Parkway" },
        { kind: "hike", time: "12:20 → 2:10", est: "1h 50m", text: "<b>Graveyard Fields loop.</b> ✅ AllTrails: 3.3 mi / 416 ft — slightly longer than the ~3 mi estimate." },
        { kind: "drive", time: "2:10 → 2:25", est: "15m", text: "→ Devil's Courthouse, MP 422.", maps: "Devils Courthouse Blue Ridge Parkway" },
        { kind: "hike", time: "2:25 → 3:10", est: "45m", text: "Devil's Courthouse — short, steep, five-state view. Reopened Aug 2025." },
        { kind: "drive", time: "3:10 → 3:25", est: "15m", text: "→ Looking Glass Rock Overlook, MP 417.", maps: "Looking Glass Rock Overlook Blue Ridge Parkway" },
        { kind: "hike", time: "3:25 → 4:25", est: "60m", text: "<b>Skinny Dip Falls</b>, ~0.5 mi in." },
        { kind: "dessert", time: "4:25 → 5:25", est: "35m + 25m", text: "→ <b>Dolly's Dairy Bar.</b> 100+ flavors with combos named after the adventures in the forest.", maps: "Dollys Dairy Bar Pisgah Forest NC" },
        { kind: "drive", time: "5:25 → 5:35", est: "10m", text: "→ camp. Sunset 6:52 — you are back with an hour of light to spare." },
      ],
      meals: { b: "<b>O-B3</b> made — breakfast tacos: 3 eggs, 200g diced potato, cheddar, 3 tortillas, salsa. <b>Eat all three</b> (~950 kcal)", l: "<b>O-L4</b> packed — 2 tortillas, hummus cups, hard salami, spinach, <b>plus 400 ml tomato soup in the thermos</b>, heated in the same pot right after breakfast. In relentless wind at 5,000 ft the hot liquid does more than the calories (~950 kcal)", d: "<b>O-D2</b> made — white chicken chili frozen flat, cheddar, sourdough. 10 min (~700 kcal). <b>Both Zone 1 dinners now gone — buy block ice in Brevard tomorrow.</b>" },
      highlights:
        "Everything today sits within five Parkway miles. Black Balsam and Tennent are grassy balds with genuine 360° views and no trees at all — the most un-Appalachian terrain in the Appalachians.",
      warnings:
        "Everything above 5,000 ft here is fully exposed — roughly <b>15°F colder than camp</b>, with wind. <b>Color note:</b> the balds peak late Sept / early Oct, so by the 19th the high country may already be browning. The color payoff on this trip is Linville on the 22nd–23rd, not here. Taking the short Black Balsam is the right call for a day that was over-packed; the summit view is the same one, you just skip the ridge walk out to Tennent.",
    },
    {
      day: 6,
      date: "Tue Oct 20, 2026",
      title: "Looking Glass Rock",
      tagline: "Switchbacks to a bare granite slab, then the quiet side of the road.",
      type: "activity",
      driving: "~1h",
      slack: "Comfortable. Dinner is the fixed point.",
      overnight: {
        name: "Davidson River Campground",
        place: "Brevard, NC",
        kind: "USFS campground",
        cost: "Reserved",
        checkin: null,
        confirmation: "✅ 0864063574-1",
        notes: null,
      },
      schedule: [
        { kind: "drive", time: "7:45 → 7:55", est: "10m", text: "→ Looking Glass Rock TH. Sunrise 7:41.", maps: "Looking Glass Rock Trailhead Pisgah Forest NC" },
        { kind: "hike", time: "7:55 → 12:25", est: "4h 30m", text: "<b>Looking Glass Rock</b>, 6.5 mi / ~1,700 ft. Switchbacks the whole way, bare granite slab at the top. The marquee Pisgah summit. ✅ <b>AllTrails confirms: 6.0 mi / 1,699 ft</b>, ~3h 30m typical — the plan's 4h 30m has real margin in it." },
        { kind: "drive", time: "12:25 → 12:35", est: "10m", text: "→ Daniel Ridge trailhead.", maps: "Daniel Ridge Loop Trailhead Pisgah Forest NC" },
        { kind: "stop", time: "12:35 → 1:05", est: "30m", text: "Lunch." },
        { kind: "hike", time: "1:05 → 3:20", est: "2h 15m", text: "<b>Daniel Ridge Loop + Falls</b>, ~4 mi. Turn <b>left</b> instead of right at the Looking Glass junction — quieter than anything else on that road." },
        { kind: "drive", time: "3:20 → 3:40", est: "20m", text: "→ Brevard.", maps: "Brevard NC" },
        { kind: "shop", time: "3:40 → 4:40", est: "60m", text: "<b>RESUPPLY — the only one this trip.</b> Water, fuel, food for the Linville leg. <b>Buy block ice</b> — the last cold of the trip. Also: <b>Bracken Mountain Bakery</b> for trail food.", warn: true },
        { kind: "food", time: "5:00 → 6:30", est: "1h 30m", text: "<b>Dinner: The Falls Landing.</b> Downtown since 1993, the town's serious restaurant. <b>Reserve ahead.</b> ⭐ <b>Fresh NC mountain trout</b> — the owner steers people to it personally; comes with a potato cake reviewers single out. Mountain trout is <i>the</i> regional dish.", maps: "The Falls Landing Brevard NC" },
        { kind: "drive", time: "6:30 → 6:50", est: "20m", text: "→ camp. Sunset 6:51." },
      ],
      meals: { b: "<b>O-B4</b> made — hot oats+ with an extra 20g pecans (~1,050 kcal)", l: "<b>O-L5</b> packed — salmon or chicken pouch, 2 tortillas, hot sauce, string cheese, Fritos, dried mango (~850 kcal)", d: "bought — The Falls Landing, mountain trout. <b>Resupply today: block ice, shrimp for Wednesday, and the vacuum-packed kielbasa that becomes the last night — keep it sealed.</b>" },
      highlights:
        "The best-corroborated hike on the trip: AllTrails and the plan agree to within half a mile and one foot of gain. Daniel Ridge in the afternoon is the quiet counterweight.",
      warnings:
        "John Rock was <b>removed</b> in favour of Moore Cove on Day 4 — John Rock's selling point is looking back at a mountain you climbed four hours earlier. Don't re-add it.",
    },
    {
      day: 7,
      date: "Wed Oct 21, 2026",
      title: "Lecture, Then Prep",
      tagline: "The rest day that makes Thursday possible.",
      type: "rest + lecture",
      driving: "~1h",
      slack: "Deliberately large. <b>Do not fill it.</b>",
      overnight: {
        name: "Davidson River Campground",
        place: "Brevard, NC",
        kind: "USFS campground",
        cost: "Reserved",
        checkin: "Checkout noon Oct 22 — you leave at 6:30 anyway",
        confirmation: "✅ 0864063574-1",
        notes: null,
      },
      schedule: [
        { kind: "stop", time: "7:30 → 10:15", est: "2h 45m", text: "Slow morning at camp. Breakfast, no time pressure. <b>This is a rest day now.</b>" },
        { kind: "stop", time: "10:15 → 11:00", est: "45m", text: "Set up the laptop, <b>verify Starlink</b>." },
        { kind: "lecture", time: "11:00 → 3:00", est: "4h", text: "<b>REMOTE LECTURE.</b> Class runs 11:10–2:30; the padding is setup and overrun.", warn: true },
        { kind: "shop", time: "3:15 → 4:45", est: "1h 30m", text: "→ Brevard. Final resupply, top off fuel." },
        { kind: "stop", time: "5:00 → 5:30", est: "30m", text: "⭐ <b>Download offline maps — Linville + Mount Rogers.</b> Last reliable signal on the trip.", warn: true },
        { kind: "stop", time: "5:30 → 6:30", est: "60m", text: "⭐ <b>Repack for two nights with no water and no service.</b> Charge everything. Starlink packed and accessible.", warn: true },
        { kind: "food", time: "6:30 →", est: "—", text: "Dinner at camp. <b>In bed early — tomorrow starts at 5:45.</b> Sunset 6:49." },
      ],
      meals: { b: "<b>O-B5</b> made — sausage and pepper hash with eggs on top: 150g smoked sausage, 300g potatoes, pepper, onion, 2 eggs, cheddar, sourdough. ~30 min, cleanup HIGH and that is fine — <b>last morning with a sink and a table</b> (~1,100 kcal). Deliberately drains Zone 2.", l: "<b>O-L6</b> made — quesadillas from whatever remains: leftover chicken, cheese, peppers, tortillas, salsa. <b>This slot exists to empty the cooler. Cook what is left, do not be precious</b> (~800 kcal)", d: "<b>O-D3</b> ⭐ made — garlic butter shrimp with orzo, blistered green beans, lemon, parsley, parmesan. ~25 min. <b>Shrimp 2 min a side, do not walk away — it is the one thing here you can ruin.</b> Last high-cleanup meal of the trip (~1,000 kcal)" },
      highlights:
        "October absorbs the lecture cleanly because Oct 21 was already the buffer day. Mount Pisgah, DuPont and PARI come off, and they were filler.",
      warnings:
        "⚠️ <b>The afternoon prep block is what makes Thursday possible. Do not let it get squeezed.</b> Offline maps, water, fuel, repack, charge. Thursday and Friday have no water, no service, and no reservation.",
    },
    {
      day: 8,
      date: "Thu Oct 22, 2026",
      title: "The Race for FS 210",
      tagline: "Wake at a site you paid for. Sleep somewhere you have no claim on.",
      type: "transfer + the risk day",
      driving: "~4h 05m",
      slack: "~1 hour, <b>all of it before noon</b>. If the site hunt takes two hours, drop Linville Falls.",
      overnight: {
        name: "FS 210 roadside dispersed",
        place: "Linville Gorge, NC",
        kind: "Dispersed — first-come",
        cost: "Free",
        checkin: "❌ NO RESERVATION POSSIBLE",
        confirmation: "❌ NONE — this is the weakest link in the trip",
        notes: "~3,800 ft. <b>No water, no facilities.</b> No camping within 200 ft of trailhead parking — standing Forest Order. Roadside FS 210 camping needs no permit; Wilderness camping does on Fri/Sat through Oct 31 (50-person quota, 30% releases Wednesday 10 AM ET).",
      },
      schedule: [
        { kind: "stop", time: "5:45 → 6:30", est: "45m", text: "Break camp in the dark. <b>Checkout is noon; you leave at 6:30 anyway.</b> The night is paid for — leaving early costs nothing and the FS 210 sites go today.", warn: true },
        { kind: "drive", time: "6:30 → 8:45", est: "2h 15m", text: "→ Linville Falls. Sunrise 7:40.", maps: "Linville Falls Visitor Center Linville Falls NC" },
        { kind: "hike", time: "8:45 → 9:45", est: "60m", text: "<i>Optional:</i> Erwins View, 1.6 mi RT. ⚠️ <b>Verify access</b> — the campground is closed all 2026 and the visitor center took Helene damage. Skip if behind." },
        { kind: "drive", time: "9:45 → 10:15", est: "30m", text: "→ <b>Gingercake turnoff.</b> NC 181 south <b>3 miles</b> to the <b>SECOND</b> Gingercake intersection — the road loops and meets 181 twice. There are also an Old Gingercake Rd and a Gingercake Acres Rd nearby, which is why map search is unreliable here.", maps: "Gingercake Road Jonas Ridge NC", warn: true },
        { kind: "drive", time: "10:15 → 10:45", est: "30m", text: "<b>Left fork</b> at the small brown Table Rock sign, through Gingercake Acres. Pavement ends in ~1 mi and becomes <b>FS 210</b> — same road, two numbers.", maps: "Table Rock Picnic Area Linville Gorge NC" },
        { kind: "camp", time: "10:45 → 12:15", est: "1h 30m", text: "⭐ <b>CLAIM A SITE.</b> Parking areas run north→south: <b>Sitting Bear → Hawksbill → Spence Ridge.</b> Drive it once from the top and take the first open Hawksbill site rather than pushing south hoping for better.", warn: true },
        { kind: "stop", time: "12:15 → 1:00", est: "45m", text: "Lunch, water sorted, camp secure." },
        { kind: "drive", time: "1:00 → 1:15", est: "15m", text: "→ Hawksbill lot — boulder-marked, on the left.", maps: "Hawksbill Mountain Trailhead Linville Gorge" },
        { kind: "hike", time: "1:15 → 3:15", est: "2h", text: "<b>Hawksbill</b>, 2.4 mi RT / ~700 ft, summit 4,009 ft. Trail starts on the <b>RIGHT</b> side of the road. <b>At the summit split, GO RIGHT</b> — most people go left because it's the obvious turn; the views are on the narrow right-hand path to the northern peak.<br><br>⭐ <b>He hikes it today specifically so he knows it in the dark tomorrow.</b> Note the boulder lot, the turns, and where the split is." },
        { kind: "drive", time: "3:15 → 3:50", est: "35m", text: "→ Table Rock picnic area." },
        { kind: "sunset", time: "3:50 → 6:20", est: "2h 30m", text: "<b>The Chimneys at sunset</b> — rock towers on the rim. Sunset <b>6:44</b> (recomputed; the plan said 6:41)." },
        { kind: "drive", time: "6:55 → 7:30", est: "35m", text: "→ camp. <b>Dark on FS 210 — go slow.</b>", warn: true },
      ],
      meals: { b: "<b>O-B6</b> made — <b>the foil burrito, nine days in the making.</b> Move it to Zone 2 tonight. Foil in a dry pan, 6 min, eaten one-handed while driving (~760 kcal). <b>Last thing out of the cooler — after this it is a dry box and water carrier.</b>", l: "<b>O-L7</b> ⚠️ NO WATER — 2 tortillas, a 5oz salmon pouch eaten straight from the pouch, PB packets, honey, Fritos, apricots. <b>Zero cookware touches food</b> (~900 kcal)", d: "<b>O-D4</b> ⚠️ NO WATER — boil-bag couscous: 110g couscous, sun-dried tomato, parmesan, seasoning, pre-mixed at home. Boil 200 ml, pour in, roll, 5 min, tear in a chicken pouch and 2 tbsp oil. <b>8 minutes, headlamp on. The highest-risk meal on either trip</b> — at 7:30 PM in the dark at 35°F, anything harder than boil-water ends with a bar and going to bed hungry (~950 kcal)" },
      highlights:
        "Peak color week in the corridor the whole trip was sequenced around. Hawksbill today is reconnaissance for tomorrow's sunrise — that's the entire reason it's on the schedule twice.",
      warnings:
        "<b>The single point of failure of the trip.</b> First-come dispersed, on the Thursday of peak color week, no cell service, no reservation possible anywhere in the corridor. <b>Bail-outs, decided before turning onto the forest road:</b> Mortimer Campground (~10 mi), or a motel in Newland, Linville Falls, or Morganton. <b>Road:</b> FS 210 is maintained gravel — passenger cars do it routinely and a Prius has reportedly made it with care. The realistic failure mode is a cut sidewall, not getting stuck: spare, jack, tire plug kit. Roughness increases with distance; the first ~3 miles to Hawksbill are tamer than the last stretch to the picnic area at ~9.5 miles.",
    },
    {
      day: 9,
      date: "Fri Oct 23, 2026",
      title: "Hawksbill at Sunrise",
      tagline: "4,009 feet, the river 2,000 below, peak color. It costs an alarm.",
      type: "the payoff",
      driving: "~1h 25m",
      slack: "2 hours before dark. Day total ~10 mi — right at the ceiling.",
      overnight: {
        name: "FS 210 roadside dispersed",
        place: "Linville Gorge, NC",
        kind: "Dispersed — first-come",
        cost: "Free",
        checkin: "❌ Second night on the same site",
        confirmation: "❌ NONE",
        notes: "No water on site.",
      },
      schedule: [
        { kind: "stop", time: "5:45 → 6:15", est: "30m", text: "Wake. Layers, gloves, <b>thermos</b>, headlamp. Mid-30s at 3,800 ft." },
        { kind: "drive", time: "6:15 → 6:30", est: "15m", text: "Camp → Hawksbill lot, in the dark." },
        { kind: "hike", time: "6:30 → 7:15", est: "45m", text: "Climb in the dark, 1.2 mi / ~700 ft. You walked this yesterday — that's why." },
        { kind: "sunrise", time: "7:15 → 8:30", est: "1h 15m", text: "⭐ <b>SUMMIT. 4,009 ft, the Linville River 2,000 ft below, peak color week.</b> Sunrise <b>7:41</b> (recomputed; the plan said 7:38 — three more minutes in the dark). <b>The best photograph available on the entire trip, and it costs an alarm.</b>" },
        { kind: "hike", time: "8:30 → 9:05", est: "35m", text: "Descend." },
        { kind: "stop", time: "9:05 → 9:50", est: "45m", text: "Real breakfast at camp. ⚠️ <b>No water on site — low-cleanup only.</b>" },
        { kind: "drive", time: "9:50 → 10:25", est: "35m", text: "→ Table Rock picnic area." },
        { kind: "hike", time: "10:25 → 3:55", est: "5h 30m", text: "<b>Table Rock Loop</b>, 7.5 mi, 2,000 → 4,100 ft. Little Table Rock → Spence Ridge → Table Rock Gap → summit. Rugged and rocky. ⚠️ <b>The Spence Ridge bridge over the Linville River is washed out.</b> The east-rim loop shouldn't need it — <b>confirm routing with Grandfather Ranger District, (828) 652-2144.</b>", warn: true },
        { kind: "drive", time: "3:55 → 4:30", est: "35m", text: "→ camp. Sunset 6:43." },
      ],
      meals: { b: "<b>O-B7</b> ⭐ NO WATER — hot oats+ <b>in the bag</b>. Boil 400 ml, pour into the double-bagged mix, roll, 3 min, stir in a PB packet, eat from the bag. <b>Hot, sweet, ready 7 minutes after you get back down</b> (~1,150 kcal). The pot only ever held boiling water — wipe it with a bandana.", l: "<b>O-L8</b> packed — 70g hard salami, aged cheddar, tortillas, mustard, dried mango, almonds, a bar. <b>10-mile day at altitude — do not trim this one</b> (~1,000 kcal)", d: "<b>O-D5</b> ⚠️ NO WATER — boil-bag burrito bowl: instant rice and taco seasoning pre-mixed, plus a <b>pull-tab can of black beans, undrained — the liquid counts toward your water and there is no wet waste to pack out</b>. Chicken pouch, cheddar, crushed Fritos. 10 min (~1,050 kcal)" },
      highlights:
        "This is the day the whole trip was sequenced to reach. Hawksbill at sunrise during peak color week, from a site you have to be lucky to get.",
      warnings:
        "<b>Release valve:</b> Table Rock summit out-and-back from the picnic area, ~2.4 mi through The Chimneys, instead of the full loop. Decide at the trailhead based on what the sunrise cost you. Ten miles on the day is exactly the ceiling and you started at 5:45.",
    },
    {
      day: 10,
      date: "Sat Oct 24, 2026",
      title: "Mount Rogers and Fatman's Squeeze",
      tagline: "Virginia's high point, wild ponies, and a rock slot you take your pack off for.",
      type: "activity + transfer",
      driving: "~3h",
      slack: "3 hours.",
      overnight: {
        name: "Hurricane Campground",
        place: "Mount Rogers NRA, VA",
        kind: "USFS campground",
        cost: "$20",
        checkin: "Gate 7 AM–10 PM",
        confirmation: "✅ recreation.gov <b>0840120294-1</b> — 1 night",
        notes: "~30 sites at 2,800–3,050 ft along Hurricane Branch and Comers Creek, under oak, hemlock and rhododendron. Paved spurs, gravel tent pads, two bathhouses with flush toilets and hot showers. The AT is within half a mile. <b>No cell service at all, no pay phone.</b> ⚠️ Skip site 6 — a camper reported it's neither private nor level.",
      },
      schedule: [
        { kind: "stop", time: "5:45 → 6:30", est: "45m", text: "Break camp." },
        { kind: "drive", time: "6:30 → 9:00", est: "2h 30m", text: "FS 210 → <b>Massie Gap.</b> US 221 N → NC 194 → US 58 W. Sunrise 7:41.", maps: "Massie Gap Grayson Highlands State Park" },
        { kind: "stop", time: "9:00 → 9:20", est: "20m", text: "Park entrance fee, gear up." },
        { kind: "hike", time: "9:20 → 3:20", est: "6h", text: "<b>Mount Rogers via Wilburn Ridge</b>, 8.0 mi / ~1,455 ft, topping at 5,729 ft — Virginia's high point.<br><br>⚠️ <b>The summit is wooded with no view.</b> The ridge is the entire payoff — take Wilburn Ridge, <b>not</b> the direct AT approach.<br><br>⭐ <b>FATMAN'S SQUEEZE</b> near Rhododendron Gap — a rock slot you physically squeeze through. Pack off.<br><br>⭐ <b>The ponies</b> are entirely unbothered by people and will walk right up. Don't feed them." },
        { kind: "drive", time: "3:20 → 3:50", est: "30m", text: "→ <b>Hurricane Campground.</b> ⚠️ <b>Follow these directions, not GPS</b> — both the Forest Service and Recreation.gov say so in bold. From I-81, <b>Marion exit 45</b> → <b>VA-16 South</b> → 15 miles → <b>SR 650</b> (5 mi south of Sugar Grove) → right → 2 miles to the paved entrance road. One camper let GPS route them onto 650 from the northwest and got four miles of gravel.", maps: "Hurricane Campground Mount Rogers National Recreation Area", warn: true },
        { kind: "stop", time: "3:50 → 5:00", est: "1h 10m", text: "Check in, set up, <b>hot shower.</b> $20. Sunset 6:39." },
        { kind: "food", time: "5:00 →", est: "—", text: "Cook. Last night. Damascus is ~35 min if you want a town; the leg is otherwise thin for food." },
      ],
      meals: { b: "<b>O-B8</b> ⚠️ still no water — 2 bagels, PB packets, honey, apricots, a shelf-stable protein shake. <b>No dishes, no water, no decisions in the dark</b> (~800 kcal)", l: "<b>O-L9</b> packed — a foil-wrapped PB-and-honey tortilla roll built last night, 2 bars, jerky, trail mix. <b>Nothing requiring assembly or taking your gloves off</b> on an exposed ridge (~900 kcal)", d: "<b>O-D6</b> ⭐⭐ made — kielbasa, cannellini and orecchiette with toasted breadcrumbs, sun-dried tomato, garlic, rosemary, lemon, parmesan. ~28 min, one burner, sequential. <b>Day 10 with an empty cooler and nothing but shelf-stable food — which is exactly what this dish was invented for</b> (~1,250 kcal). Finish with hot chocolate and dark chocolate. Take the twenty minutes." },
      highlights:
        "Wild ponies that walk right up, a rock slot you take your pack off to get through, and Virginia's high point — with the honest caveat that the summit itself is wooded and the ridge is the reason you're there.",
      warnings:
        "Wind on the exposed ridge is relentless — shell and gloves, not optional. Follow the written directions to Hurricane, not GPS.",
    },
    {
      day: 11,
      date: "Sun Oct 25, 2026",
      title: "Home",
      tagline: "Move the legs, then seven and a half hours.",
      type: "travel",
      driving: "~7h 30m",
      slack: "The optional loop is the only variable.",
      overnight: { name: "Home", place: null, kind: null, cost: null, checkin: null, confirmation: null, notes: null },
      schedule: [
        { kind: "hike", time: "6:00 → 6:45", est: "45m", text: "<i>Optional:</i> <b>Hurricane Knob Nature Trail</b>, 1-mi loop from the campground. Move the legs before seven hours in the car. Sunrise 7:42 — this starts in the dark." },
        { kind: "stop", time: "6:45 → 7:30", est: "45m", text: "Break camp." },
        { kind: "drive", time: "7:30 → 3:00", est: "7h 30m", text: "Hurricane CG → Avon OH. US 58 E → I-77 N the whole way.", maps: "Avon, OH" },
      ],
      meals: { b: "<b>O-B9</b> — bagels, PB, honey, apricots, protein shake, eaten driving (~650 kcal)", l: "<b>O-L10</b> — whatever is left. You will probably stop somewhere; plan it anyway so the stop stays optional.", d: "home" },
      highlights: "One mile on the legs before 450 miles in a seat.",
      warnings: "Sunrise is 7:42 and the optional loop starts at 6:00 — that's a headlamp walk, not a stroll. Skip it if the alarm hurts.",
    },
  ],

  lodging: {
    summary: "10 nights · 7 reserved, 3 first-come (Oct 15 in NRG, Oct 22–23 at Linville). Nothing in either first-come area is reservable at any price.",
    total: "Arrowhead $25.44 · Hurricane $20 · Davidson River reserved",
    rows: [
      { night: "1", date: "Oct 15", location: "New River Gorge, WV", type: "Primitive, no water", name: "Army Camp / Glade Creek / Grandview Sandbar / Stone Cliff", cost: "Free", status: "First-come — nothing to reserve" },
      { night: "2–3", date: "Oct 16–17", location: "Fayetteville, WV", type: "Private", name: "Arrowhead Bike Farm", cost: "$25.44", status: "✅ Ref ROTXCV — confirmed on the booking site" },
      { night: "4–7", date: "Oct 18–21", location: "Brevard, NC", type: "USFS", name: "Davidson River", cost: "Reserved", status: "✅ 0864063574-1 + phone-confirmed open" },
      { night: "8–9", date: "Oct 22–23", location: "Linville Gorge, NC", type: "Dispersed, no facilities", name: "FS 210 roadside", cost: "Free", status: "❌ FIRST-COME — no reservation possible" },
      { night: 10, date: "Oct 24", location: "Mount Rogers, VA", type: "USFS", name: "Hurricane Campground", cost: "$20", status: "✅ 0840120294-1" },
    ],
  },

  hikes: {
    title: "Hikes &amp; Trails",
    summary:
      "Eleven of eighteen stats in the source file were unverified estimates. AllTrails resolves some of them; where it disagrees or offers a different route, both are shown rather than one being picked.",
    rows: [
      { name: "Long Point", day: 1, distance: "~3.0 mi (est)", gain: "—", difficulty: "Easy", duration: "1h 30m", notes: "Trailhead is at the campground. Returns after dark — headlamp." },
      { name: "Endless Wall → Diamond Point", day: 2, distance: "5.4 mi", gain: "508 ft", difficulty: "Moderate", duration: "3h", notes: "Verified in source. Nuttall lot, not Fern Creek. Must be Friday — closed Saturday." },
      { name: "Nuttallburg + Conveyor Trail", day: 2, distance: "~1.0 mi (est)", gain: "—", difficulty: "Easy–steep", duration: "+60m", notes: "Keeneys Creek Rd access is the clearance question." },
      { name: "Fayette Station Rd walk-down", day: 3, distance: "9.0 mi", gain: "~800 ft", difficulty: "Moderate", duration: "3h 45m total", notes: "⚠️ Parking at the top unconfirmed — 800-927-0263." },
      { name: "Moore Cove Falls", day: 4, distance: "1.4 mi", gain: "—", difficulty: "Easy", duration: "60m", notes: "The trail goes behind the water." },
      { name: "⭐ Black Balsam Knob via Art Loeb (short)", day: 5, distance: "✅ 1.4 mi", gain: "✅ 357 ft", difficulty: "Moderate", duration: "46 min moving", notes: "<b>The chosen route.</b> Same summit, same 360°." },
      { name: "Black Balsam — longer alternatives", day: "5 (not taken)", distance: "3.8 / 4.3 / 9.7 mi", gain: "780 / 688 / 1,666 ft", difficulty: "Moderate", duration: "up to 4h 32m", notes: "Tennent Mtn out-and-back, Ivestor Gap loop, Graveyard Ridge loop. The plan's ~4 mi was the Tennent version." },
      { name: "Sam Knob", day: 5, distance: "✅ 2.5 mi", gain: "✅ 561 ft", difficulty: "Moderate", duration: "78 min", notes: "Same lot as Black Balsam — no driving between." },
      { name: "Graveyard Fields Loop", day: 5, distance: "✅ 3.3 mi", gain: "✅ 416 ft", difficulty: "Moderate", duration: "1h 50m", notes: "Slightly longer than the ~3 mi estimate." },
      { name: "Devil's Courthouse", day: 5, distance: "~0.8 mi (est)", gain: "—", difficulty: "Short, steep", duration: "45m", notes: "Five-state view. Reopened Aug 2025." },
      { name: "Skinny Dip Falls", day: 5, distance: "~1.0 mi (est)", gain: "—", difficulty: "Easy", duration: "60m", notes: "Second cut if the day slips." },
      { name: "✅ Looking Glass Rock", day: 6, distance: "6.5 mi (plan) · AllTrails 6.0 mi", gain: "~1,700 ft · AllTrails 1,699 ft", difficulty: "Moderate", duration: "4h 30m budgeted · AllTrails ~3h 30m", notes: "✅ Best-corroborated hike on the trip. The budget has real margin." },
      { name: "Daniel Ridge Loop + Falls", day: 6, distance: "~4.0 mi (est)", gain: "—", difficulty: "Easy–moderate", duration: "2h 15m", notes: "Turn LEFT at the Looking Glass junction." },
      { name: "Hawksbill (daylight recon)", day: 8, distance: "2.4 mi", gain: "~700 ft", difficulty: "Moderate", duration: "2h", notes: "Verified in source. Trail on the RIGHT side of the road; at the summit split GO RIGHT." },
      { name: "The Chimneys", day: 8, distance: "~2.0 mi (est)", gain: "—", difficulty: "Easy–moderate", duration: "2h 30m", notes: "Sunset from the rim towers." },
      { name: "⭐ Hawksbill at sunrise", day: 9, distance: "2.4 mi", gain: "~700 ft", difficulty: "Moderate, in the dark", duration: "2h 45m", notes: "Same lot, same trail, hiked yesterday on purpose." },
      { name: "Table Rock Loop", day: 9, distance: "7.5 mi", gain: "~2,100 ft", difficulty: "Rugged", duration: "5h 30m", notes: "⚠️ Spence Ridge river bridge washed out — confirm routing, (828) 652-2144. Release valve: 2.4 mi out-and-back instead." },
      { name: "⭐ Mount Rogers via Wilburn Ridge", day: 10, distance: "8.0 mi", gain: "~1,455 ft", difficulty: "Moderate", duration: "6h", notes: "Verified in source. Summit is wooded — the ridge is the payoff. Fatman's Squeeze, wild ponies." },
      { name: "Hurricane Knob (optional)", day: 11, distance: "1.0 mi", gain: "—", difficulty: "Easy", duration: "45m", notes: "From the campground, in the dark at 6 AM." },
    ],
  },

  sunMoon: [
    { date: "Thu 10/15", location: "Arrowhead / Long Point WV", firstLight: "7:06", sunrise: "7:33", sunset: "6:48 PM", dark: "~7:17 PM", moon: "—" },
    { date: "Fri 10/16", location: "Endless Wall / Nuttallburg", firstLight: "7:07", sunrise: "7:33", sunset: "6:46 PM", dark: "~7:15 PM", moon: "—" },
    { date: "Sat 10/17", location: "Bridge Day, Fayetteville", firstLight: "7:08", sunrise: "7:35", sunset: "6:45 PM", dark: "~7:14 PM", moon: "—" },
    { date: "Sun 10/18", location: "Thurmond → Brevard", firstLight: "7:13", sunrise: "7:39", sunset: "6:53 PM", dark: "~7:21 PM", moon: "—" },
    { date: "Mon 10/19", location: "Black Balsam, 6,000 ft", firstLight: "7:15", sunrise: "7:41", sunset: "6:52 PM", dark: "~7:20 PM", moon: "—" },
    { date: "Tue 10/20", location: "Looking Glass Rock", firstLight: "7:15", sunrise: "7:41", sunset: "6:51 PM", dark: "~7:19 PM", moon: "—" },
    { date: "Wed 10/21", location: "Davidson River", firstLight: "7:16", sunrise: "7:42", sunset: "6:49 PM", dark: "~7:17 PM", moon: "—" },
    { date: "Thu 10/22", location: "Linville / The Chimneys", firstLight: "7:14", sunrise: "7:40", sunset: "6:44 PM", dark: "~7:12 PM", moon: "—" },
    { date: "Fri 10/23", location: "Hawksbill summit, 4,009 ft", firstLight: "7:15", sunrise: "7:41", sunset: "6:43 PM", dark: "~7:11 PM", moon: "—" },
    { date: "Sat 10/24", location: "Massie Gap / Mount Rogers", firstLight: "7:15", sunrise: "7:41", sunset: "6:39 PM", dark: "~7:07 PM", moon: "—" },
    { date: "Sun 10/25", location: "Hurricane Campground VA", firstLight: "7:16", sunrise: "7:42", sunset: "6:37 PM", dark: "~7:05 PM", moon: "—" },
  ],
  sunMoonNote:
    "Recomputed with the NOAA solar position algorithm for each day's coordinates. The source file ran roughly 3–4 minutes optimistic on every entry — always in the direction of <i>more</i> daylight than exists. Individually trivial; on Day 1 and Day 9 it's the difference between finishing in twilight and finishing with a headlamp. Sea-level times with standard refraction: a ridge or gorge wall takes light earlier. Moon phase not yet worked out.",

  weather: [
    { location: "Arrowhead, WV", elevation: "~1,900 ft", high: "—", low: "40s", notes: "Source file figures. Not yet cross-checked against climate normals." },
    { location: "Davidson River, NC", elevation: "~2,200 ft", high: "—", low: "upper 30s–40s", notes: "" },
    { location: "Black Balsam and above", elevation: "5,000–6,000 ft", high: "—", low: "—", notes: "⚠️ Fully exposed, roughly 15°F colder than camp, with wind." },
    { location: "FS 210, Linville", elevation: "~3,800 ft", high: "—", low: "mid 30s", notes: "No water on site. Two consecutive nights." },
    { location: "Hurricane, VA", elevation: "~2,900 ft", high: "—", low: "mid 30s", notes: "Hot showers. Relentless wind on the Mount Rogers ridge." },
  ],
  weatherNote:
    "<b>Siesta 20 + MondoKing covers all of it.</b> The liner recommendation stands for the last three nights and is unconfirmed. September's Kentucky trip is the shakedown — note there whether the bag actually sleeps warm before deciding. <b>Color gradient:</b> balds above 5,000 ft peak late Sept/early Oct; the 3,000–5,000 ft corridor peaks the second and third weeks of October; the last week is best low. You're chasing color downhill and <b>Linville on Oct 22–23 is the bullseye.</b>",

  provisions: {
    summary:
      "Eleven days, one 48qt cooler, one mid-trip resupply. It cannot stay cold the whole way and it does not need to. Solo, one burner, one pot, one pan. No coffee, no alcohol. Every quantity is one serving. Restaurant slots — Tudor's, Secret Sandwich Society, Pies &amp; Pints, the Bridge Day chili cook-off, The Falls Landing — are handled on the day cards, not here.",
    coolerNote:
      "The structural problem of this trip in three rows. <b>The breakfast burrito is the calibration item:</b> it has to survive nine days frozen and be edible on Oct 22, so freeze it hardest and bury it under the water bottles. Frozen 1L bottles do double duty — coolant on the way down, and drinking water exactly when you arrive somewhere with none.",
    cooler: [
      { days: "1–3 · Oct 15–17", where: "Arrowhead, WV", state: "<b>Fayetteville eats five slots</b>, so the cooler is only carrying Zone 1 mass that stays frozen for later. <b>Block ice Oct 16.</b> Barely open it." },
      { days: "4–7 · Oct 18–21", where: "Davidson River, NC", state: "Both Zone 1 dinners consumed (O-D1 Sunday, O-D2 Monday). <b>Block ice Brevard Oct 20 — the last cold of the trip.</b> It carries the shrimp to Wednesday." },
      { days: "8–11 · Oct 22–25", where: "Linville → Hurricane → home", state: "<b>Cooler is empty. Wipe it out the morning of Oct 22 and it becomes the dry box and the water carrier.</b> Everything from O-B6 onward is shelf-stable." },
    ],
    criticalSlots:
      "Four slots decide whether you actually eat on the hard leg, and all four collapse to one primitive — <b>boil water, pour into a labeled bag, eat from the bag, pack it out.</b> <b>O-D4</b> (Thu 7:30 PM, dark, tired, no water) · <b>O-B7</b> (post-Hawksbill hot oats, pot never touches food) · <b>O-D5</b> (same format, different flavour, so night two doesn't taste like night one) · <b>O-L7</b> (zero cookware). Mix the five bags at your kitchen table in October and the hard leg is solved before you leave Ohio.",
    lists: [
      {
        group: "Freeze flat at home",
        note: "This is your ice. You are not choosing between carrying ice and carrying food.",
        items: [
          "Beef and pork ragù — 500 ml quart bag, frozen flat (O-D1, Sun 10/18)",
          "White chicken chili — 400 ml quart bag, thinnest so it thaws first (O-D2, Mon 10/19)",
          "Breakfast burrito ×1, foiled — <b>freeze hardest, nine days, buried at the bottom</b> (O-B6, Thu 10/22)",
          "4× 1L water bottles, frozen solid",
        ],
      },
      {
        group: "Pre-mix into labeled bags at home",
        note: "The work that makes the no-water leg survivable. Do it at the kitchen table, not at 35°F in the dark.",
        items: [
          "Oats ×5 — 2 packets · 25g milk powder · 30g nuts · 30g dried fruit · salt",
          "Oats XL ×1, <b>double-bagged</b> — 3 packets · 30g milk powder · 40g pecans · 40g apricot · salt (O-B7)",
          "Couscous — 110g couscous · 30g sun-dried tomato · 30g parmesan · Italian seasoning (O-D4)",
          "Rice — 80g instant rice · taco seasoning (O-D5)",
          "Hot chocolate ×3 — 3 packets · 25g milk powder · salt (Hawksbill summit + spares)",
        ],
      },
      {
        group: "Zone 3 — shelf-stable, trunk crate, no cooler space",
        items: [
          "Maple &amp; brown sugar oatmeal, big box (~13 packets) · whole milk powder 250g",
          "Peanut butter jar + 6 single-serve PB packets · pecans 200g · apricots 400g · dried mango 400g",
          "Couscous · instant rice · rigatoni 150g · orzo 150g · orecchiette 150g",
          "<b>Pull-tab cans only:</b> black beans ×1, cannellini ×1 — a forgotten opener at Linville means no dinner",
          "Chicken pouches ×3 (7oz) · salmon pouches ×2 (5oz)",
          "Panko 50g · parmesan wedge · <b>olive oil squeeze bottle</b> · dry-packed sun-dried tomatoes",
          "Large tortillas ×2 packs · bagels ×4 · individual Fritos ×4 · shelf-stable protein shakes ×3",
          "Honey packets · hot sauce · mustard · taco and Italian seasoning · rosemary · red pepper flakes · salt, pepper, garlic powder, paprika",
          "Tomato soup carton ×1 · hot chocolate packets ×12 · cider packets ×6",
          "Trail mix 1.5kg · bars ×16 · jerky 400g · waffles ×10 · almonds 500g · dark chocolate 200g",
          "<b>1 freeze-dried meal as the bail-out</b> — trunk, unopened, hope you never need it",
          "Quart freezer bags ×16 · gallon bags ×8 · foil · parchment · <b>pack-out trash bags for Linville</b>",
          "<b>3× 1-gallon water jugs</b> — fill before leaving Brevard",
        ],
      },
      {
        group: "Zone 2 — buy Oct 15 morning",
        note: "The zone that ruins trips. Keep it small, eat it early.",
        items: [
          "Ciabatta roll, Genoa salami, capicola, provolone, olive salad — <b>build the Bridge Day muffuletta on Oct 16 night</b>",
          "Eggs (half dozen) · spinach · bell peppers ×2 · sourdough loaf · sub fixings for O-L1 · 2 apples",
        ],
      },
      {
        group: "Buy in Fayetteville — Oct 16",
        note: "Fayetteville feeds you. That is the whole list.",
        items: ["1 block of ice"],
      },
      {
        group: "Resupply — Brevard NC, Tuesday Oct 20",
        note: "The only real resupply of the trip and the last cold you get.",
        items: [
          "<b>1 block of ice</b> — the last cold of the trip",
          "250g frozen raw shrimp (O-D3) · 150g smoked sausage or andouille (O-B5)",
          "<b>1× 12oz vacuum-packed kielbasa — keep it sealed until Oct 24. This is the last dinner. Protect it.</b>",
          "Eggs (half dozen) · potatoes 800g, <b>pre-diced if available</b> · bell peppers ×2 · onions ×2 · garlic ×2 · lemons ×3 · parsley",
          "Frozen green beans",
          "<b>Shredded</b> cheddar 300g · string cheese ×2 · hard salami 200g · hummus cups ×2 · spinach",
          "Salsa · sourdough loaf · bagels ×2",
          "<b>Fill the three water jugs before you leave town</b>",
        ],
      },
      {
        group: "Kit the meals depend on",
        note: "Designed around a can opener, cutting board, colander, grater, tongs, bowl and plate — none of which you carry.",
        items: [
          "<b>3 fuel canisters.</b> Eleven days, and cold air drops canister output.",
          "<b>Long-handled spoon</b> — the single most important item on the Linville leg. Four meals are eaten out of a deep quart bag; a short spork means chili on your knuckles at 35°F in the dark.",
          "<b>Wide-mouth thermos, 500ml+</b> — Hawksbill hot chocolate and Black Balsam soup both depend on it",
          "2L pot with lid (the lid drains, steams and holds heat) · 8–10\" pan · insulated mug · spork",
          "Thin silicone spatula — a spork will fail on eggs",
          "Folding knife · collapsible wash basin · sponge · biodegradable soap · 2 bandanas (one pot wipe, one towel)",
          "<b>Linville water carry: ~12 L / 3.2 gallons</b> — 3.5 L/day drinking, 0.8 L cooking, 0.5 L washing, over 2.5 days. About 27 lbs; the empty cooler carries the jugs from Oct 22.",
        ],
      },
    ],
  },

  packing: [
    {
      category: "The Linville leg — two nights, no water, no service",
      items: [
        "All water for two nights, carried in from Brevard",
        "Low-cleanup meals only — there is nothing to wash with",
        "Offline maps for Linville AND Mount Rogers, downloaded Wednesday in Brevard",
        "Everything charged Wednesday. Starlink packed and accessible.",
        "Spare tire pressure checked, jack, tire plug kit — cut sidewall is the real FS 210 risk",
      ],
    },
    {
      category: "Sleep — colder than September",
      items: [
        "REI Siesta 20 — mid-30s at Linville and Hurricane",
        "Sleeping bag liner ⚠️ recommended, not confirmed purchased. Decide after the September shakedown.",
        "Therm-a-Rest MondoKing 3D",
        "Puffy, hat, gloves — Hawksbill at 7:15 AM at 4,009 ft, and the Mount Rogers ridge",
      ],
    },
    {
      category: "Bridge Day",
      items: ["CASH — shuttle is $3, chili cook-off and 200+ vendors are cash", "Day bag only — no packs, pets, bikes, carts or strollers on the bridge", "Layers for 9 miles with 800 ft of climb on the return"],
    },
    {
      category: "The lecture kit",
      items: ["Starlink + mount", "Power bank charged", "Laptop + charger", "Tested Sunday Oct 18 on arrival — three days of buffer, use them"],
    },
    {
      category: "Camp kitchen",
      items: [
        "One burner, pot, pan, mug, spork",
        "Wide-mouth thermos — Hawksbill sunrise at 4,009 ft in the dark",
        "48qt cooler ⚠️ eleven days on one cooler. The cooler timeline is in MEALS-trip2-october.md and is not yet on this page.",
        "Block ice at the Brevard resupply — the last cold of the trip",
      ],
    },
  ],

  reservations: [
    { text: "⚠️ Oct 15 dinner — the meal plan still puts you at the Arrowhead biergarten that night. Pack a camp dinner or plan a Fayetteville stop." },
    { text: "Price and phone-check ONE motel in Newland / Linville Falls / Morganton before leaving Ohio — the Linville bail-out is first-come too" },
    { text: "⚠️ CALL 800-927-0263 — Fayette Station Road parking on Bridge Day." },
    { text: "Sign the Arrowhead waiver before arrival — every camper needs one" },
    { text: "Mix the five pre-portioned bags at home: oats ×5, oats XL (double-bagged), couscous, rice, hot chocolate ×3" },
    { text: "Freeze the breakfast burrito hardest — it has to survive nine days and be edible Oct 22" },
    { text: "Buy block ice twice: Fayetteville Oct 16, Brevard Oct 20" },
    { text: "Fill three 1-gallon water jugs in Brevard before leaving for Linville — ~12 L total carry" },
    { text: "Buy pull-tab cans only — a forgotten can opener at Linville means no dinner" },
    { text: "Call Grandfather Ranger District (828) 652-2144 — FS 210 site availability, the 200-ft camping Forest Order, and Table Rock loop routing given the washed-out Spence Ridge bridge" },
    { text: "Day 1 at Canyon Rim Visitor Center: ask about Keeneys Creek Road condition for a 5.9 in clearance car" },
    { text: "✅ Arrowhead ref ROTXCV — confirmed Oct 16–18, 2 nights, on the booking site" },
    { text: "✅ Davidson River Oct 18–21 — recreation.gov 0864063574-1, 4 nights, campground open (phone-confirmed)" },
    { text: "✅ Hurricane Campground Oct 24 — recreation.gov 0840120294-1, 1 night. Gate 7 AM–10 PM. No cell service — carry it on paper." },
    { text: "Decide the FS 210 bail-out BEFORE the trip: Mortimer Campground, or a motel in Newland / Linville Falls / Morganton" },
    { text: "Sleeping bag liner — decide after the September Kentucky shakedown" },
    { text: "Reserve The Falls Landing, Brevard, for Tuesday Oct 20" },
    { text: "Check burn ban status across WV, NC and VA" },
    { text: "Verify Linville Falls trail and spur road access from the closed Parkway corridor" },
    { text: "Wednesday Oct 21: download offline maps for Linville and Mount Rogers — last reliable signal" },
    { text: "Text the trip plan home, flagging Oct 22–24 as no-service days" },
  ],

  openQuestions: [
    {
      question: "Oct 15 is now a first-come primitive site, and that is the one thing left to get right.",
      blocks: "Day 1",
      detail:
        "Arrowhead is confirmed Oct 16–18, which covers Bridge Day night and hands off to Davidson River's 2 PM check-in on Oct 18. Oct 15 is solved by camping primitive inside the park instead.<br><br><b>Four free options, all first-come, all with fire rings, grills, tables and pit toilets, none with drinking water:</b> Army Camp (11 sites, near Prince), Glade Creek (11 sites, riverside, with the Glade Creek Trail leaving from camp), Grandview Sandbar, and Stone Cliff. Every campground in New River Gorge is first-come year-round — <b>there is nothing to reserve, so there is nothing to forget to book.</b><br><br>What that costs you: the Long Point trailhead is at Arrowhead, so on Oct 15 it becomes a drive rather than a walk from the tent. Water has to be carried in. And access roads to the riverside sites get rough after rain. <b>Ask at Canyon Rim Visitor Center when you arrive</b> which sites have space and which road is passable — that is a 5-minute conversation that saves an hour of driving in the dark.<br><br>Sources: <a href=\"https://www.nps.gov/neri/planyourvisit/campgrounds.htm\">NPS New River Gorge campgrounds</a> · <a href=\"https://thedyrt.com/camping/west-virginia/near/new-river-gorge-national-river/with/dispersed\">The Dyrt</a>",
    },
    {
      question: "Linville has no reservable option. Not in the gorge, and not as a bail-out.",
      blocks: "Days 8–9 — and it changes the risk, not the plan",
      detail:
        "You asked whether there is a reservable campground worth taking instead of racing for FS 210. <b>There isn't.</b><br><br>There are <b>no designated campsites inside Linville Gorge Wilderness at all</b> — the permit system counts people per night, it does not reserve a site. And permits are <b>not required</b> for day use, for roadside camping on FS 210, or for camping on Table Rock, so the Fri/Sat quota through Oct 31 does not apply to what you are actually doing. The dispersed sites along FS 210 near the Hawksbill trailhead and Spence Ridge parking are the whole inventory, and they are first-come.<br><br><b>The bail-out is also first-come.</b> Mortimer Campground is 17 USFS sites at $20–30 with flush toilets, showers and potable water — genuinely nice, and <b>not on recreation.gov</b>. You cannot pre-book it either.<br><br>So the honest read: the FS 210 gamble has no insurance policy available, which makes the 6:30 AM departure from Davidson River the entire mitigation rather than one of two. The realistic fallback ladder is FS 210 → Mortimer (also a race) → a motel in Newland, Linville Falls or Morganton. <b>Price and phone-check one motel before you leave Ohio</b> so the fallback is a decision, not a search at 8 PM with no signal.<br><br>Sources: <a href=\"https://ashevilletrails.com/linville-gorge/camping/\">Asheville Trails</a> · <a href=\"https://www.recreation.gov/permits/4675331\">Linville Gorge overnight permits</a> · <a href=\"https://www.fs.usda.gov/r08/northcarolina/recreation/mortimer-campground\">USFS Mortimer</a>",
    },
    {
      question: "Fayette Station Road parking on Bridge Day.",
      blocks: "Day 3 — the whole day",
      detail:
        "The walk-to-the-bottom plan is free and legal; the roads are open to pedestrians even though the trails are closed and patrolled. What's unconfirmed is <b>where you can legally park at the top.</b> Fayette County Chamber, 800-927-0263. Get this before departure — the fallback (Fayetteville HS at 7:45, shuttle at 8:30, deck 9–3) is a completely different day and you don't want to discover it at 7 AM.",
    },
    {
      question: "Which Black Balsam route?",
      blocks: "Day 5 — and Day 5 has only 15 minutes of slack",
      detail:
        "The plan says ~4 mi via Art Loeb to Tennent Mountain in 2h 30m. AllTrails lists a 1.4 mi out-and-back to Black Balsam alone, and a 9.7 mi / 1,666 ft Graveyard Ridge loop. Your figure sits between them, which is consistent with an out-and-back along the ridge to Tennent — but on a day with 15 minutes of margin, guessing wrong by five miles ends the day in the dark. Decide the exact route, then re-check whether Sam Knob still fits.",
    },
    {
      question: "The two Linville nights have no fallback written down.",
      blocks: "Days 8–9",
      detail:
        "Bail-outs are named in the master file — Mortimer, or a motel in Newland, Linville Falls or Morganton — but none has been called, priced, or checked for October availability. \"Decided in advance\" means a phone number and a rough price, not a list of towns. This is the difference between a plan and a hope.",
    },
    {
      question: "Keeneys Creek Road for 5.9 inches of clearance.",
      blocks: "Day 2 afternoon",
      detail:
        "Some sources recommend high clearance. The fallback is Kaymoor Top, five minutes from camp, same corridor, conveyor and coke ovens down a long stairway — a genuinely good substitute rather than a consolation. Ask a ranger at Canyon Rim on Day 1 and be willing to take the substitute.",
    },
    {
      question: "Table Rock loop routing with the Spence Ridge bridge out.",
      blocks: "Day 9 afternoon",
      detail:
        "The east-rim loop shouldn't need the washed-out river bridge, but that's an inference, not a confirmation. Grandfather Ranger District, (828) 652-2144. If it does need it, the release valve is the 2.4 mi out-and-back through The Chimneys.",
    },
    {
      question: "Mix the five bags before you leave Ohio.",
      blocks: "Days 8–10, the no-water leg",
      detail:
        "Four of the hard-leg meals collapse to one primitive: boil water, pour into a labeled bag, eat from the bag, pack it out. That only works if the bags already exist. Five get mixed at the kitchen table in October — oats ×5, oats XL double-bagged, couscous, rice, hot chocolate ×3. Do that and Linville is solved before you pull out of the driveway. Skip it and O-D4 becomes a protein bar in the dark at 35°F.",
    },
    {
      question: "Print the confirmations, especially Hurricane.",
      blocks: "Nothing — the numbers are on this page now",
      detail:
        "Davidson River <b>0864063574-1</b> (4 nights), Hurricane <b>0840120294-1</b> (1 night), Arrowhead ref <b>ROTXCV</b>. Hurricane has <b>no cell service and no pay phone</b> — if anything is wrong at that gate you cannot look it up, so that one goes on paper. Arrowhead also requires a signed waiver from every camper; sign it before you leave.",
    },
  ],

  places: [
    {
      group: "New River Gorge",
      items: [
        { name: "Arrowhead Bike Farm", maps: "Arrowhead Bike Farm Fayetteville WV", note: "Nights 1–3. Long Point TH is on site." },
        { name: "Canyon Rim Visitor Center", maps: "Canyon Rim Visitor Center Lansing WV", note: "Ask about Keeneys Creek Rd" },
        { name: "Fayette Station Road", maps: "Fayette Station Road Fayetteville WV", note: "8-mi one-way loop to the gorge floor" },
        { name: "Nuttall lot — Endless Wall", maps: "Nuttall Trailhead Endless Wall New River Gorge", note: "NOT Fern Creek" },
        { name: "Long Point Trailhead", maps: "Long Point Trailhead Fayetteville WV", note: "Head-on bridge view" },
        { name: "Nuttallburg", maps: "Nuttallburg Winona WV", note: "80 coke ovens. Via Keeneys Creek Rd." },
        { name: "Kaymoor Top", maps: "Kaymoor Top New River Gorge", note: "The Nuttallburg fallback, 5 min from camp" },
        { name: "Thurmond Depot", maps: "Thurmond Depot Thurmond WV", note: "Population 5" },
        { name: "Fayetteville HS shuttle lot", maps: "Fayetteville High School Fayetteville WV", note: "Bridge Day shuttle, $3 cash" },
        { name: "Fayette County Courthouse", maps: "Fayette County Courthouse Fayetteville WV", note: "Chili cook-off, 3 PM Saturday" },
        { name: "Secret Sandwich Society", maps: "Secret Sandwich Society Fayetteville WV", note: "⭐ Brussels sprouts, then the McKinley" },
        { name: "Pies & Pints", maps: "Pies and Pints Fayetteville WV", note: "⭐ Black bean pizza with pork" },
        { name: "Cathedral Café", maps: "Cathedral Cafe Fayetteville WV", note: "⭐ The carrot cake. That's the whole reason to go." },
        { name: "Tudor's Biscuit World, Oak Hill", maps: "Tudors Biscuit World Oak Hill WV", note: "Bridge Day breakfast, 6 AM" },
      ],
    },
    {
      group: "Pisgah",
      items: [
        { name: "Davidson River Campground", maps: "Davidson River Campground Pisgah Forest NC", note: "Nights 4–7. Test Starlink on arrival." },
        { name: "Looking Glass Falls", maps: "Looking Glass Falls Pisgah Forest NC", note: "Roadside" },
        { name: "Moore Cove Falls TH", maps: "Moore Cove Falls Trailhead Pisgah Forest NC", note: "Walk behind the water" },
        { name: "Sliding Rock", maps: "Sliding Rock Pisgah Forest NC", note: "Looking, not sliding" },
        { name: "Black Balsam Knob TH", maps: "Black Balsam Knob Trailhead Canton NC", note: "BRP MP 420. Decide the route first." },
        { name: "Graveyard Fields", maps: "Graveyard Fields Blue Ridge Parkway", note: "MP 418.8" },
        { name: "Devil's Courthouse", maps: "Devils Courthouse Blue Ridge Parkway", note: "MP 422" },
        { name: "Looking Glass Rock Overlook", maps: "Looking Glass Rock Overlook Blue Ridge Parkway", note: "MP 417 — Skinny Dip Falls" },
        { name: "Looking Glass Rock TH", maps: "Looking Glass Rock Trailhead Pisgah Forest NC", note: "✅ 6.0 mi / 1,699 ft confirmed" },
        { name: "Daniel Ridge TH", maps: "Daniel Ridge Loop Trailhead Pisgah Forest NC", note: "Turn LEFT at the junction" },
        { name: "The Falls Landing", maps: "The Falls Landing Brevard NC", note: "⭐ Mountain trout. Reserve ahead." },
        { name: "Dolly's Dairy Bar", maps: "Dollys Dairy Bar Pisgah Forest NC", note: "100+ flavors" },
        { name: "Bracken Mountain Bakery", maps: "Bracken Mountain Bakery Brevard NC", note: "Trail food for the Linville resupply" },
      ],
    },
    {
      group: "Linville Gorge",
      items: [
        { name: "Gingercake Rd turnoff", maps: "Gingercake Road Jonas Ridge NC", note: "⚠️ The SECOND intersection. Map search is unreliable here." },
        { name: "Hawksbill Mountain Trailhead", maps: "Hawksbill Mountain Trailhead Linville Gorge", note: "Boulder-marked lot. Trail on the RIGHT." },
        { name: "Spence Ridge parking", maps: "35.904183, -81.878217", note: "Verified coordinate from the source file. 200-ft walk east into the forest." },
        { name: "Table Rock picnic area", maps: "Table Rock Picnic Area Linville Gorge NC", note: "End of FS 210, roughest stretch" },
        { name: "Linville Falls Visitor Center", maps: "Linville Falls Visitor Center Linville Falls NC", note: "⚠️ Helene damage — verify access" },
        { name: "Mortimer Campground", maps: "Mortimer Campground Pisgah National Forest", note: "The bail-out, ~10 mi" },
      ],
    },
    {
      group: "Mount Rogers",
      items: [
        { name: "Massie Gap", maps: "Massie Gap Grayson Highlands State Park", note: "Entrance fee. Take Wilburn Ridge, not the AT." },
        { name: "Hurricane Campground", maps: "Hurricane Campground Mount Rogers National Recreation Area", note: "⚠️ Follow written directions, NOT GPS. Marion exit 45 → VA-16 S → SR 650." },
        { name: "Damascus VA", maps: "Damascus Virginia", note: "~35 min, the only real town on this leg" },
      ],
    },
  ],
  placesNote:
    "The field tab. Every entry opens a Google Maps search rather than dropping a pin. ⚠️ Note the two entries that say to ignore GPS — Gingercake Road and Hurricane Campground both route wrong.",
  offlineRegions:
    "Three Google Maps regions: <b>Fayetteville–Oak Hill–Beckley</b>, <b>Brevard–Asheville–Black Balsam</b>, and <b>Linville–Morganton north to Marion VA</b>. Download the last two on <b>Wednesday Oct 21 in Brevard</b> — that's the last reliable signal before four days without it. ⚠️ Google Maps offline does not include trails; download AllTrails or Gaia separately.",

  notes: [
    {
      heading: "The lodging in the master file does not match the lodging in your inbox",
      body:
        "The master file says Arrowhead Bike Farm, Oct 15–17, three nights, reserved. The confirmation email says the original booking was Oct 15 3 PM to Oct 17 11 AM — <b>two nights</b>. On Sept 1 you asked to move it forward a day to Oct 16–18 and were told by phone that it was done, with no revised confirmation ever sent. So the plan, the original booking, and the current booking are three different things, and only one of them is written down anywhere.<br><br>The move itself was the right instinct: the original dates left you with no bed on Bridge Day night, and the new ones hand off cleanly to Davidson River's 2 PM check-in on Oct 18. What it costs is Oct 15, which Day 1 currently assumes, and it squeezes Endless Wall — that hike has to happen before Saturday's trail closures, and under the new dates Friday is an arrival day. This is the first thing to sort on this trip, ahead of the Bridge Day parking question, because it determines where you sleep on night one.",
    },
    {
      heading: "Thursday Oct 22 is the trip's single point of failure",
      body:
        "You wake at a site you paid for and go to sleep somewhere you have no claim on. First-come dispersed camping on FS 210, on the Thursday of peak color week, with no cell service and no reservation possible anywhere in the corridor. The mitigation is already built in: leave Davidson River at 6:30 despite a noon checkout, drive FS 210 once from the top, and take the first open Hawksbill site rather than pushing south hoping for better. What is <i>not</i> built in is a bail-out that has actually been called. Mortimer Campground and motels in Newland, Linville Falls and Morganton are named but unverified. Decided in advance means a phone number and a price.",
    },
    {
      heading: "Why Hawksbill is on the schedule twice",
      body:
        "Thursday afternoon's Hawksbill hike is not a hike, it's reconnaissance. You climb it in daylight so that Friday at 6:30 AM you already know the boulder-marked lot, the trail starting on the right side of the road, and the summit split where most people go left and the views are right. The payoff is a 4,009 ft summit at sunrise with the Linville River 2,000 ft below during peak color week — the best photograph available on the entire trip, and it costs an alarm and one repeated hike.",
    },
    {
      heading: "The lecture is confirmed on both trips",
      body:
        "This was the open question across both 2026 files and it's now closed: 11:10–2:30, budgeted 11:00–3:00, on <b>both</b> Wednesdays. October absorbs it cleanly because Oct 21 was already the deliberately unscheduled buffer day — Mount Pisgah, DuPont and PARI come off and they were filler. Kentucky does not absorb it: Sept 23 permanently loses Double Arch. What survives here and matters more is the afternoon prep block: resupply, fuel, offline map downloads, and repacking for two waterless nights. <b>That work is what makes Thursday possible and it must not get squeezed.</b>",
    },
    {
      heading: "Starlink under canopy",
      body:
        "Davidson River is forested and Starlink needs sky view. Test it Sunday Oct 18 on arrival — three days of buffer, against Kentucky's one. Fallbacks if it fails: an open loop elsewhere in the campground, the Pisgah Inn area, or Brevard — though cell service at Davidson River is described as extremely limited, so the fallback is a drive, not a walk.",
    },
    {
      heading: "Sun times were optimistic in one direction",
      body:
        "Every sunrise and sunset in the source file ran roughly 3–4 minutes in the direction of more daylight than exists. Recomputed values are used throughout. Individually that's noise. It matters twice: Day 1, where you finish a 1.6-mile walk back from Long Point after full dark and the source already flagged it; and Day 9, where sunrise on Hawksbill is 7:41 rather than 7:38, meaning three more minutes standing on an exposed 4,009 ft summit in the mid-30s before the light arrives. Bring the layers you'd bring anyway, and don't trust a clock you didn't derive.",
    },
    {
      heading: "Fayetteville eats five restaurant slots in three days",
      body:
        "That's deliberate — it's the best food town on either 2026 trip, and the rest of the route is thin. Secret Sandwich Society's Brussels sprouts are what locals name unprompted; Pies & Pints was founded there before spreading to five states and the local order is the black bean pizza, not the Grape & Gorgonzola the tourists get; Cathedral Café is worth a stop for the carrot cake alone. Then it dries up: Brevard has The Falls Landing and Dolly's, Linville has nothing, and the Mount Rogers leg is genuinely thin with Damascus 35 minutes away. Front-loading the good food is the correct response to that geography, not an indulgence.",
    },
    {
      heading: "The color gradient is the trip's spine",
      body:
        "Balds above 5,000 ft peak late September into early October — so Black Balsam on the 19th may already be browning, and that's expected rather than a miss. The 3,000–5,000 ft corridor peaks the second and third weeks of October, which puts Linville on the 22nd–23rd exactly on the bullseye. The last week of the month is best low. You're chasing color downhill and the itinerary is ordered to do that, which is also why the two unreservable nights fall on the most contested days: the thing that makes Linville worth the risk is the same thing that fills FS 210.",
    },
    {
      heading: "What the source file removed, and why not to add it back",
      body:
        "Cathedral Falls and Hawks Nest were cut — northwest on Rt 60, the wrong direction going south, about an hour of backtracking; Thurmond replaced them and is better. John Rock was cut in favour of Moore Cove because John Rock's selling point is looking back at a mountain you climbed four hours earlier. Mount Pisgah, DuPont and PARI went to the lecture and were filler. Also standing: mountain biking (and renting one in Brevard), Bridge Walk, highline and zipline tickets, and breweries were all considered and declined.",
    },
  ],

  waypoints: [
    { name: "Spence Ridge parking, FS 210", lat: 35.904183, lng: -81.878217, verified: true, icon: "⛺", days: "8–9", notes: "From the source file. A 200-ft walk east into the forest — right at the Forest Order threshold." },
    { name: "Arrowhead Bike Farm", lat: 38.0403, lng: -81.0805, verified: true, icon: "⛺", days: "1–3", notes: "From the source file. Long Point trailhead on site." },
    { name: "Canyon Rim Visitor Center", lat: null, lng: null, verified: false, icon: "🌉", days: "1", notes: "" },
    { name: "Nuttallburg", lat: null, lng: null, verified: false, icon: "🏚️", days: "2", notes: "Via Keeneys Creek Rd — clearance question" },
    { name: "Davidson River Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "4–7", notes: "" },
    { name: "Hawksbill Trailhead", lat: null, lng: null, verified: false, icon: "🌄", days: "8–9", notes: "Boulder-marked lot" },
    { name: "Table Rock picnic area", lat: null, lng: null, verified: false, icon: "🪨", days: "8–9", notes: "End of FS 210" },
    { name: "Massie Gap", lat: null, lng: null, verified: false, icon: "🐴", days: "10", notes: "" },
    { name: "Hurricane Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "10", notes: "Follow written directions, not GPS" },
  ],
  map: { center: [37.2, -81.9], zoom: 7 },
};
