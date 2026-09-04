/* ==========================================================================
   Red River Gorge + Big South Fork — Sept 22–27, 2026

   Transcribed from MASTER-trip1-kentucky-sept-2026.md and
   MEALS-trip1-kentucky.md (both Sept 2026). Rendered by ../../js/trip.js.

   WHAT CHANGED IN TRANSCRIPTION — nothing structural. Three weeks out with
   both campgrounds reserved is the wrong time to restructure, per the audit
   prompt's own configuration. Findings are recorded as warnings and open
   questions instead of silent edits:
     - Hike stats now carry an AllTrails cross-check. Where the two sources
       disagree, BOTH are shown. Neither is automatically right.
     - Sun times recomputed (NOAA solar position). The plan's Sept 24 sunset
       was earlier than Sept 22's despite moving 65 miles west.
     - Thursday's load is flagged. It was not flagged in the source.
     - The lecture is confirmed on BOTH trips' Wednesdays, so Double Arch
       stays cut. That open question is now closed.

   Coordinates: AllTrails does not return trailhead coordinates, so every
   waypoint here is verified:false and unplotted. Use the Places tab.
   ========================================================================== */

window.TRIP_DATA = {
  meta: {
    slug: "kentucky-2026",
    title: "Red River Gorge + Big South Fork",
    subtitle: "Solo · Avon OH → Slade KY → Bandy Creek TN",
    dates: "Tuesday, Sept 22 – Sunday, Sept 27, 2026",
    emoji: "🪨",
    theme: "forest",
    route:
      "Avon OH → Koomer Ridge (2 nights, Red River Gorge) → Bandy Creek (3 nights, Big South Fork) → Blue Heron → home. Two sandstone plateaus, one transfer day between them.",
    vehicle:
      "2013 Subaru Legacy. AWD, ~5.9 in ground clearance, low front air dam. The five unpaved miles to Twin Arches off Divide Road are the one road on this trip that needs a condition check first.",
    gettingThere:
      "I-71 S → Cincinnati → I-75 S → Mountain Pkwy → Exit 33 Slade. 5h 35m outbound (Google +15%), ~7h back from Stearns.",
    stats: [
      { num: "6 days", lbl: "Length" },
      { num: "5", lbl: "Nights camping" },
      { num: "~19 mi", lbl: "On foot" },
      { num: "✅ Both", lbl: "Campgrounds booked" },
    ],
    overviewCards: [
      { h: "Dates", p: "Sept 22–27, 2026<br>6 days / 5 nights" },
      { h: "Group", p: "Solo. One person, one tent, one portion." },
      { h: "Lodging", p: "<b>All reserved.</b> Koomer Ridge ×2 (walk-in tent, $24), Bandy Creek ×3 (tent loop, free hot showers)" },
      { h: "Permits", p: "<b>None needed.</b> There is no RRG camping permit — the thing that exists is an overnight <i>parking</i> pass for vehicles left on forest land 10 PM–6 AM. The campground fee covers it." },
      { h: "The constraint", p: "Remote lecture Wed Sept 23, 11:00–3:00, at camp over Starlink. Confirmed to fall on <b>both</b> 2026 trips." },
      { h: "Time zone", p: "The ET/CT line cuts through Big South Fork just west of Bandy Creek. The phone will flip mid-hike. <b>All park and campground hours are Eastern.</b>" },
    ],
    footerNote:
      'Transcribed from the Sept 2026 master file. Hike stats show both the plan\'s figure and AllTrails where they disagree — neither is automatically right. <a href="../../index.html">← All trips</a>',
  },

  days: [
    {
      day: 1,
      date: "Tue Sept 22, 2026",
      title: "Down the Mountain Parkway",
      tagline: "Five and a half hours, then three arches before dinner.",
      type: "travel + activity",
      driving: "~6h 15m total",
      slack: "~1 hour. First cut is Angel Windows.",
      overnight: {
        name: "Koomer Ridge Campground",
        place: "Slade, KY",
        kind: "USFS campground — walk-in tent site",
        cost: "$24/night",
        checkin: "Showers + potable water run through Oct 31",
        confirmation: "✅ recreation.gov <b>0822210215-1</b> — 2 nights",
        notes: "54 sites at ~1,200 ft. Cliff, Silvermine, Hidden Arch and Koomer Ridge trails all leave from the campground.",
      },
      schedule: [
        { kind: "drive", time: "7:30 → 1:05", est: "5h 35m", text: "Avon OH → Koomer Ridge. I-71 S → Cincinnati → I-75 S → Mountain Pkwy → <b>Exit 33 Slade</b> → left, then right on KY 15 → 5 mi, on the left.", maps: "Koomer Ridge Campground Slade KY" },
        { kind: "stop", time: "1:05 → 1:50", est: "45m", text: "Check in, pitch the walk-in site, unpack." },
        { kind: "stop", time: "1:50 → 2:10", est: "20m", text: "<b>TEST STARLINK.</b> Find the site's best sky window now, not Wednesday at 10:55. Koomer Ridge is forested and a four-hour lecture is not the moment to discover the canopy blocks it.", warn: true },
        { kind: "drive", time: "2:10 → 2:30", est: "20m", text: "→ Nada Tunnel. 900 ft, one lane, hand-cut 1910–11 for the Dana Lumber Company. The Gateway to the Gorge.", maps: "Nada Tunnel Red River Gorge KY" },
        { kind: "stop", time: "2:30 → 2:50", est: "20m", text: "Drive through and photograph it." },
        { kind: "drive", time: "2:50 → 3:05", est: "15m", text: "→ Gladie Learning Center.", maps: "Gladie Cultural Environmental Learning Center Stanton KY" },
        { kind: "stop", time: "3:05 → 3:35", est: "30m", text: "<b>BUILDING CLOSED TUESDAYS</b> (open Thu–Sun 10–5). Grounds are open — the Gladie Cabin (former hotel, post office, and childhood home of bluegrass musician Lily May Ledford), the barn, farm artifacts, two short nature trails.", warn: true },
        { kind: "drive", time: "3:35 → 4:00", est: "25m", text: "→ the KY 715 overlook cluster.", maps: "Princess Arch Trailhead Red River Gorge" },
        { kind: "hike", time: "4:00 → 5:50", est: "1h 50m", text: "<b>Princess Arch, Whistling Arch, Angel Windows</b> — all under a mile each." },
        { kind: "drive", time: "5:50 → 6:00", est: "10m", text: "→ Sky Bridge Station, KY 715.", maps: "Sky Bridge Station Pine Ridge KY" },
        { kind: "food", time: "6:00 → 6:55", est: "55m", text: "<b>Dinner.</b> Restaurant, taphouse, hostel and gear shop in one rustic cabin — the only real option in the northeastern Gorge. <b>Order the gourmet hot dogs.</b>" },
        { kind: "dessert", time: "6:55 → 7:15", est: "20m", text: "<b>The Brick</b>, directly across the street. Hand-scooped ice cream in a ~1900 brick building. <b>Order strawberry cheesecake.</b>", maps: "The Brick Pine Ridge KY" },
        { kind: "drive", time: "7:15 → 7:30", est: "15m", text: "→ Chimney Top Rock for sunset.", maps: "Chimney Top Rock Red River Gorge" },
        { kind: "sunset", time: "7:30 → 8:10", est: "40m", text: "Sunset <b>7:33</b> (recomputed; the plan said 7:36). Short walk from parking. ⚠️ Aspect was never verified — Chimney Top was assigned to sunset on the assumption it faces west." },
        { kind: "drive", time: "8:10 → 8:35", est: "25m", text: "→ camp." },
      ],
      meals: {
        b: "home",
        l: "packed — sourdough sub, Genoa salami, provolone, pepperoncini, oil and oregano. Built this morning, eaten in the car (~850 kcal)",
        d: "bought — Sky Bridge Station hot dogs, then The Brick",
      },
      highlights:
        "Three arches, a hand-cut tunnel and a sunset overlook, all inside the four hours after a five-and-a-half-hour drive. Nothing today is hard.",
      warnings:
        "Test Starlink today. It is the single point of failure for Wednesday and you have exactly one day of buffer to solve it. Fallbacks in order: an open spot elsewhere in the campground, the Gladie or Slade area, or Miguel's / Sky Bridge Station, which have wifi.",
    },
    {
      day: 2,
      date: "Wed Sept 23, 2026",
      title: "Ridge at First Light, Laptop by Eleven",
      tagline: "Canyon fog, then four hours of class in a tent.",
      type: "activity + lecture",
      driving: "~2h 15m",
      slack: "Tight before 11:00 — the drive back from Auxier is the buffer. Loose after 3:00.",
      overnight: {
        name: "Koomer Ridge Campground",
        place: "Slade, KY",
        kind: "USFS campground",
        cost: "$24/night",
        checkin: null,
        confirmation: "✅ 0822210215-1",
        notes: null,
      },
      schedule: [
        { kind: "stop", time: "5:45 → 6:15", est: "30m", text: "Wake. Layers, headlamp, <b>thermos</b> — the oats go in it hot and get eaten on the ridge." },
        { kind: "drive", time: "6:15 → 6:40", est: "25m", text: "→ Auxier Ridge TH via <b>Tunnel Ridge Road</b>. ✅ Confirmed open by phone. Re-check the morning of departure: 606-784-6428.", maps: "Auxier Ridge Trailhead Red River Gorge" },
        { kind: "hike", time: "6:40 → 7:25", est: "45m", text: "Out the ridge in the dark, ~1.5 mi." },
        { kind: "sunrise", time: "7:25 → 8:10", est: "45m", text: "⭐ <b>SUNRISE ON THE RIDGE, 7:23</b> (recomputed; the plan said 7:29 — you have six more minutes of dark than budgeted, not fewer). Canyon fog is the entire point and it burns off by mid-morning. Courthouse Rock and Haystack Rock in view." },
        { kind: "hike", time: "8:10 → 9:30", est: "1h 20m", text: "<b>Out-and-back</b> to the end of the ridge and return. <b>Not the full loop</b> — the lecture makes Double Arch impossible today, and the lecture is confirmed on both trips." },
        { kind: "drive", time: "9:30 → 9:55", est: "25m", text: "→ camp." },
        { kind: "stop", time: "9:55 → 11:00", est: "1h 05m", text: "Breakfast, set up the laptop, <b>verify Starlink</b>." },
        { kind: "lecture", time: "11:00 → 3:00", est: "4h", text: "<b>REMOTE LECTURE.</b> At camp. Class runs 11:10–2:30; the padding is setup and overrun.", warn: true },
        { kind: "drive", time: "3:15 → 3:50", est: "35m", text: "→ Rock Bridge Recreation Area.", maps: "Rock Bridge Recreation Area Red River Gorge" },
        { kind: "hike", time: "3:50 → 5:20", est: "1h 30m", text: "<b>Rock Bridge + Creation Falls</b>, 1.4 mi — the only arch in the Gorge that spans water." },
        { kind: "drive", time: "5:20 → 5:50", est: "30m", text: "→ Sky Bridge area." },
        { kind: "food", time: "5:50 → 6:50", est: "60m", text: "Dinner — cook at camp, or Sky Bridge Station again." },
        { kind: "hike", time: "7:00 → 8:15", est: "1h 15m", text: "⭐ <b>Sky Bridge — walk over the TOP of the arch, then take the lower trail underneath it.</b> Most people do one and leave. Same 0.7 mi. Sunset 7:32.", maps: "Sky Bridge Red River Gorge KY" },
        { kind: "drive", time: "8:15 → 8:40", est: "25m", text: "→ camp." },
      ],
      meals: {
        b: "made — hot maple oats+ in the thermos, eaten on the ridge. Pre-mixed at home: 2 packets, milk powder, pecans, dates, salt, PB stirred in last (~970 kcal)",
        l: "⚠️ made — chicken quesadillas, 12 min in the pan. <b>The meal plan schedules this at 12:05, inside the lecture block.</b> See Open Questions.",
        d: "made — beef-and-bean chili frozen flat, reheated. Split the Frito bag lengthwise and pour it in (~950 kcal, one pot)",
      },
      highlights:
        "Auxier Ridge at dawn with canyon fog below is the best thing in the Gorge and you'll have it alone. AllTrails puts the out-and-back to Courthouse Rock at 4.3 mi / 738 ft — close to the plan's 4.6 mi estimate.",
      warnings:
        "Casualties of the lecture: Double Arch, the full Auxier loop, and Hidden Arch (2.3 mi from camp). Now permanent — the lecture is confirmed on both trips, so there is no version of this where Double Arch comes back.",
    },
    {
      day: 3,
      date: "Thu Sept 24, 2026",
      title: "Gray's Arch, Then South",
      tagline: "A hike, a transfer, and a sunset overlook — in one day.",
      type: "activity + transfer",
      driving: "~4h 20m",
      slack: "<b>None.</b> This is the heaviest day of the trip and the source file lists no margin at all.",
      overnight: {
        name: "Bandy Creek Campground",
        place: "Big South Fork, TN",
        kind: "NPS campground — tent loop",
        cost: "Reserved",
        checkin: "Visitor center adjacent, 9–5 ET",
        confirmation: "✅ recreation.gov <b>0895576747-1</b> — 3 nights",
        notes: "Free hot showers. ⚠️ Active black bear habitat — food storage required. Flagged hazardous tree area: look up before pitching.",
      },
      schedule: [
        { kind: "stop", time: "6:00 → 6:45", est: "45m", text: "Break camp." },
        { kind: "drive", time: "6:45 → 7:10", est: "25m", text: "→ Gray's Arch Picnic Area, Tunnel Ridge Rd.", maps: "Grays Arch Picnic Area Red River Gorge" },
        { kind: "hike", time: "7:10 → 11:10", est: "4h", text: "<b>Gray's Arch via Rough / Pinch 'Em Tight.</b> ⚠️ <b>Gray's Arch Trail is only 0.3 mi and does NOT reach the arch</b> — turn onto Rough Trail for another 0.6. Everything in RRG is stitched segments. ⚠️ Distance disputed: the plan says ~6.5 mi, AllTrails says 3.8 mi / 577 ft for the same named loop. If AllTrails is right you gain ~1.5 hours here.", warn: true },
        { kind: "drive", time: "11:10 → 11:35", est: "25m", text: "→ Slade.", maps: "Miguels Pizza Slade KY" },
        { kind: "food", time: "11:35 → 12:35", est: "1h", text: "<b>Lunch at Miguel's.</b> Opened 1984 as an ice cream shop by Miguel Ventura; now called the Camp Four of the East — climbers give crag directions relative to it. <b>Build your own, 45 toppings. Do not order a plain pie.</b> A fresh one takes 20–30 min even when packed." },
        { kind: "shop", time: "12:35 → 1:20", est: "45m", text: "<b>RESUPPLY — the only one this trip.</b> Kroger in Stanton has the real selection. <b>Buy one BLOCK of ice</b> (block, not cubes — lasts 2–3× longer) and a rotisserie chicken, which covers tonight's dinner and tomorrow's.", maps: "Kroger Stanton Kentucky" },
        { kind: "drive", time: "1:20 → 4:35", est: "3h 15m", text: "→ Bandy Creek Campground.", maps: "Bandy Creek Campground Oneida TN" },
        { kind: "stop", time: "4:35 → 5:35", est: "60m", text: "Set up, free hot shower. ⚠️ Bear-aware food storage. Look up before pitching. <b>Ask at the visitor center about Honey Creek conditions and the Twin Arches forest road.</b>", warn: true },
        { kind: "drive", time: "5:35 → 6:00", est: "25m", text: "→ East Rim Trailhead.", maps: "East Rim Trailhead Big South Fork" },
        { kind: "sunset", time: "6:00 → 8:10", est: "2h 10m", text: "<b>Sunset Overlook</b>, 1.3 mi each way. The Park Service says the walk out is unremarkable and the view definitely is not. <b>No railings or fencing of any kind.</b> Sunset <b>7:34</b> (recomputed — the plan said 7:30, but Big South Fork is 65 mi west of Slade so its sunset is <i>later</i>, not earlier). Civil twilight ends ~8:00: <b>the walk back is in the dark. Headlamp.</b>", warn: true },
        { kind: "drive", time: "8:10 → 8:35", est: "25m", text: "→ camp." },
      ],
      meals: {
        b: "made — chorizo–potato foil burrito, built and frozen at home, 6 min in a dry pan, eaten while striking the tent (~760 kcal). Move it to Zone 2 tonight.",
        l: "bought — Miguel's",
        d: "packed — couscous, rotisserie chicken, chickpeas, sun-dried tomatoes, feta. Built at 4:20, carried hot in the thermos, eaten at the overlook (~1,000 kcal). Couscous holds heat and doesn't slosh.",
      },
      highlights:
        "You end the day eating a hot dinner out of a thermos on an unfenced sandstone rim watching the sun go down over the Cumberland Plateau. That's the payoff for the transfer.",
      warnings:
        "<b>This is the day to watch.</b> 6:00 AM to 8:35 PM is 14h 35m, containing a 9-mile hike, 4h 20m of driving, and a first arrival at an unfamiliar bear-country campground that you set up and immediately leave again. The source file assigns Friday as the uncertain day; by the numbers, Thursday is heavier and has no slack. Two honest levers if it runs long: skip the Sunset Overlook (it repeats in spirit on Saturday) or move it to Friday evening, which has two hours spare.",
    },
    {
      day: 4,
      date: "Fri Sept 25, 2026",
      title: "Arches and Homesteads",
      tagline: "Climb on top of the biggest arch complex in the East.",
      type: "activity",
      driving: "~1h 45m across three trailheads",
      slack: "2 hours. See Open Questions — there is now a third option for this day.",
      overnight: {
        name: "Bandy Creek Campground",
        place: "Big South Fork, TN",
        kind: "NPS campground",
        cost: "Reserved",
        checkin: null,
        confirmation: "✅ 0895576747-1",
        notes: null,
      },
      schedule: [
        { kind: "drive", time: "8:00 → 8:45", est: "45m", text: "→ Twin Arches TH. Includes <b>5 unpaved miles off Divide Road</b> — ask about its condition at the visitor center Thursday evening before committing 5.9 in of clearance to it.", maps: "Twin Arches Trailhead Big South Fork", warn: true },
        { kind: "hike", time: "8:45 → 10:30", est: "1h 45m", text: "<b>Twin Arches</b>, ~2 mi as planned. Largest natural arch complex in the eastern US — ⭐ <b>you can climb on top of them.</b> ⚠️ AllTrails lists the full Twin Arches Loop at 5.1 mi / 810 ft; the 2 mi figure is the short spur." },
        { kind: "drive", time: "10:30 → 10:50", est: "20m", text: "→ Sawmill Trailhead.", maps: "Sawmill Trailhead Big South Fork" },
        { kind: "hike", time: "10:50 → 12:50", est: "2h", text: "<b>Slave Falls + Needle Arch</b>, ~3 mi (est)." },
        { kind: "stop", time: "12:50 → 1:20", est: "30m", text: "Lunch from the pack — tortilla plate, no cooking, no cleanup." },
        { kind: "drive", time: "1:20 → 2:00", est: "40m", text: "→ Litton / Slaven Farm trailhead.", maps: "Litton Slaven Farm Loop Big South Fork" },
        { kind: "hike", time: "2:00 → 5:15", est: "3h 15m", text: "<b>Litton / Slaven Farm Loop</b>, 5.9 mi — Cumberland Plateau farmstead, waterfall, rock shelters, hemlock cove. Homestead ruins today; industrial ruins Sunday." },
        { kind: "drive", time: "5:15 → 5:35", est: "20m", text: "→ camp." },
        { kind: "food", time: "5:35 →", est: "—", text: "Cook. <b>Early night — tomorrow is the day.</b>" },
      ],
      meals: {
        b: "made — eggs, spinach, red bell pepper, sourdough toasted dry in the pan first (~700 kcal). The relaxed one.",
        l: "packed — 2 tortillas, hard salami, aged cheddar, honey mustard, figs, almonds (~950 kcal). Zero cleanup. Curing is what makes this safe unrefrigerated.",
        d: "made — rotisserie chicken, 400g diced russets, green beans. <b>Cook double potatoes and bag half</b> — they're tomorrow's breakfast and tomorrow is a 6-hour day.",
      },
      highlights:
        "Twin Arches is the largest natural arch complex in the eastern US and you can stand on top of it. Litton/Slaven adds a Cumberland Plateau farmstead, a waterfall and rock shelters on one loop.",
      warnings:
        "Three trailheads, 1h 45m of driving between them, ~11 miles on foot. That's the fragmentation you dislike. The five unpaved miles to Twin Arches are the one clearance question on this trip — ask Thursday evening, and have the willingness to turn around.",
    },
    {
      day: 5,
      date: "Sat Sept 26, 2026",
      title: "Honey Creek",
      tagline: "Ladders, ropes, and an hour per mile.",
      type: "the big one",
      driving: "~1h 50m",
      slack: "4 hours before sunset — and that slack <i>is</i> the safety plan.",
      overnight: {
        name: "Bandy Creek Campground",
        place: "Big South Fork, TN",
        kind: "NPS campground",
        cost: "Reserved",
        checkin: null,
        confirmation: "✅ 0895576747-1",
        notes: null,
      },
      schedule: [
        { kind: "stop", time: "6:15 → 7:00", est: "45m", text: "Wake, big breakfast, pack the day properly." },
        { kind: "drive", time: "7:00 → 7:50", est: "50m", text: "→ Honey Creek trailhead. Park at the small lot about a mile before the road ends; the trailhead is just up the road past the parking area. ✅ Confirmed open by phone.", maps: "Honey Creek Trailhead Big South Fork" },
        { kind: "hike", time: "7:50 → 1:50", est: "6h", text: "⭐ <b>HONEY CREEK LOOP, COUNTER-CLOCKWISE.</b> Multiple trip reports recommend this direction — you'd rather climb <i>up</i> wet rock than down it. <b>Trailhead signs say one hour per mile. Believe them</b> — that's scouting and backtracking, not slow walking. AllTrails independently says the same: <i>\"allow for a slower pace, roughly an hour per mile.\"</i>" },
        { kind: "drive", time: "1:50 → 2:00", est: "10m", text: "→ Honey Creek Overlook — drive the last mile up.", maps: "Honey Creek Overlook Big South Fork" },
        { kind: "stop", time: "2:00 → 2:30", est: "30m", text: "Judge whether the ladder spur would've been worth it. Opinions genuinely split — one hiker called the overlook boring and the loop far better." },
        { kind: "drive", time: "2:30 → 3:20", est: "50m", text: "→ camp." },
        { kind: "food", time: "3:20 →", est: "—", text: "<b>The one relaxed dinner of the trip.</b> Nothing scheduled after." },
      ],
      meals: {
        b: "made — loaded breakfast tacos, biggest breakfast of the trip on purpose. Friday's pre-cooked potatoes make it a 14-minute crisp-and-scramble (~1,050 kcal)",
        l: "packed — pressed wrap built Friday night, parchment then foil, squashed under the cooler lid overnight. <b>Getting compressed improves it.</b> Bread turns to crumbs after four hours of scrambling; a tight-rolled tortilla survives being sat on and hauled up a ladder. Plus 2 bars, trail mix, dried mango (~1,100 kcal across the day)",
        d: "made — ⭐ ribeye, smashed baby potatoes, garlic-thyme butter, balsamic pan sauce, broccoli. ~45 min and nowhere to be. Cleanup HIGH, which is only allowed because Bandy Creek has potable water and free hot showers (~1,300 kcal)",
      },
      highlights:
        "The Painted Cliffs about a mile in · rope-assisted climbs on slick rock · wooden and steel ladders · a passage between two settled boulders too narrow for a pack · Indian Rockhouse with a rickety ladder up to the cave floor · Hide-Out Falls · repeated creek crossings. Saturday is the park's busiest day and Honey Creek stays empty because it's hard. That is deliberate scheduling.",
      warnings:
        "<b>SOLO RULES — do not soften these.</b> Route downloaded offline <i>before leaving camp</i>. Headlamp in the pack regardless of the hour. <b>Hard turnaround: not at the halfway point by 11:00 AM → reverse out the way you came.</b> Trekking poles — people skip the muddy ropes and use poles instead. Shoes with real grip: wet rock, wet ropes. <b>Do not go right after rain</b> — check Thursday's forecast and be willing to swap with Friday. People get lost here and the usual cause is starting late and finishing in the dark.",
    },
    {
      day: 6,
      date: "Sun Sept 27, 2026",
      title: "Blue Heron, Then Home",
      tagline: "A coal town the company left standing, then seven hours north.",
      type: "activity + travel",
      driving: "~8h 20m",
      slack: "Version A waits for lunch and gets home ~7:15 PM. Version B leaves at 10:00 and gets home ~5:30 PM.",
      overnight: { name: "Home", place: null, kind: null, cost: null, checkin: null, confirmation: null, notes: null },
      schedule: [
        { kind: "stop", time: "6:30 → 7:15", est: "45m", text: "Break camp. ⚠️ <b>Hwy 297 toward Oneida has a 13% grade</b> with winding curves into the gorge. Alternate: Hwy 154 to Bandy Creek Rd.", warn: true },
        { kind: "drive", time: "7:15 → 8:20", est: "1h 05m", text: "→ Blue Heron Mining Community, 9 mi west of Stearns.", maps: "Blue Heron Mining Community Stearns KY" },
        { kind: "ruins", time: "8:20 → 9:35", est: "1h 15m", text: "<b>Blue Heron ghost structures.</b> Restored coal town once owned by the Stearns Coal and Lumber Co. Free, self-guided." },
        { kind: "hike", time: "9:35 → 10:00", est: "25m", text: "<b>Devil's Jump Overlook</b> — 0.1 mi from the trailhead, paved, deck with bench seating, view of the river bend below." },
        { kind: "hike", time: "optional", est: "+3h", text: "<i>Optional:</i> Blue Heron Loop, 6.5 mi with the \"Cracks in the Rocks\" passage. Only on Version A, and only if the legs have it after Honey Creek." },
        { kind: "drive", time: "10:00 → 10:15", est: "15m", text: "→ Stearns.", maps: "The Whistle Stop Stearns KY" },
        { kind: "stop", time: "10:15 → 11:00", est: "45m", text: "⚠️ <b>Dead time.</b> The Whistle Stop opens 11:00 on Sunday and the source file's clock skips this gap. Either fill it with the Blue Heron Loop, or take Version B and eat on the road.", warn: true },
        { kind: "food", time: "11:00 → 12:15", est: "1h 15m", text: "<b>The Whistle Stop</b>, at the railway depot. Sunday 11:00–5:00. <b>Order the fried green tomatoes</b> — that's the dish reviewers single out; the burger and club get called average." },
        { kind: "drive", time: "12:15 → 7:15", est: "7h", text: "→ Avon OH. North on US 27 → I-75 N.", maps: "Avon, OH" },
      ],
      meals: {
        b: "made — second oats bag in the thermos, eaten driving: 2 packets, milk powder, banana chips, cocoa, PB (~900 kcal)",
        l: "bought — the Whistle Stop, or on the road under Version B",
        d: "home",
      },
      highlights:
        "Blue Heron is a coal town the Park Service stabilized rather than restored — free, self-guided, and empty on a Sunday morning. Optional 40-minute detour either version: <b>Yahoo Falls</b> off US 27, 1 mi loop, 113 ft, the highest waterfall in Kentucky. <b>No safety barriers at the upper viewpoint.</b>",
      warnings:
        "Seven hours of driving after five nights in a tent and a six-hour scramble day. Version B exists for a reason — don't wait 45 minutes for a restaurant if you're already tired.",
    },
  ],

  lodging: {
    summary: "5 nights camping · both campgrounds reserved and confirmed · no permits required",
    total: "Koomer Ridge $24/night; Bandy Creek reserved",
    rows: [
      { night: 1, date: "Tue 9/22", location: "Slade, KY", type: "USFS — walk-in tent", name: "Koomer Ridge", cost: "$24", status: "✅ 0822210215-1" },
      { night: 2, date: "Wed 9/23", location: "Slade, KY", type: "USFS — walk-in tent", name: "Koomer Ridge", cost: "$24", status: "✅ 0822210215-1" },
      { night: 3, date: "Thu 9/24", location: "Big South Fork, TN", type: "NPS — tent loop", name: "Bandy Creek", cost: "Reserved", status: "✅ 0895576747-1" },
      { night: 4, date: "Fri 9/25", location: "Big South Fork, TN", type: "NPS — tent loop", name: "Bandy Creek", cost: "Reserved", status: "✅ 0895576747-1" },
      { night: 5, date: "Sat 9/26", location: "Big South Fork, TN", type: "NPS — tent loop", name: "Bandy Creek", cost: "Reserved", status: "✅ 0895576747-1" },
    ],
  },

  hikes: {
    title: "Hikes &amp; Trails",
    summary:
      "Two sources, shown side by side where they disagree. Plan figures marked (est) were unverified estimates in the source file; AllTrails figures are crowd-sourced GPS from thousands of recorded hikes. Neither is automatically right — but a 4-hour block for a 3.8-mile trail is worth knowing about before you're standing at the trailhead.",
    rows: [
      { name: "Princess / Whistling / Angel Windows", day: 1, distance: "~2.0 mi (est)", gain: "—", difficulty: "Easy", duration: "1h 50m", notes: "Three separate sub-mile walks off KY 715." },
      { name: "Auxier Ridge out-and-back", day: 2, distance: "~4.6 mi (est) · AllTrails 4.3 mi", gain: "AllTrails 738 ft", difficulty: "Moderate", duration: "2h 05m", notes: "Sources broadly agree. Dark start, sunrise at the turnaround." },
      { name: "Rock Bridge + Creation Falls", day: 2, distance: "1.4 mi", gain: "—", difficulty: "Easy", duration: "1h 30m", notes: "The only arch in the Gorge spanning water." },
      { name: "Sky Bridge (top + underneath)", day: 2, distance: "0.7 mi", gain: "—", difficulty: "Easy", duration: "1h 15m", notes: "Do both halves. Most people do one." },
      { name: "Gray's Arch via Rough / Pinch 'Em Tight", day: 3, distance: "⚠️ ~6.5 mi (est) · AllTrails 3.8 mi", gain: "AllTrails 577 ft", difficulty: "Moderate", duration: "4h budgeted", notes: "⚠️ Biggest disagreement on the trip. Gray's Arch Trail alone is 0.3 mi and does not reach the arch." },
      { name: "Sunset Overlook", day: 3, distance: "2.6 mi RT", gain: "—", difficulty: "Easy", duration: "2h 10m", notes: "No railings. Returns after dark — headlamp." },
      { name: "Twin Arches", day: 4, distance: "~2.0 mi spur · AllTrails loop 5.1 mi", gain: "AllTrails 810 ft (loop)", difficulty: "Moderate", duration: "1h 45m", notes: "5 unpaved miles to the trailhead. You can climb on top of the arches." },
      { name: "Slave Falls / Needle Arch", day: 4, distance: "~3.0 mi (est)", gain: "—", difficulty: "Easy–moderate", duration: "2h", notes: "From Sawmill Trailhead." },
      { name: "Slave Falls + Twin Arches combined loop", day: "4 (option)", distance: "AllTrails 10.1 mi", gain: "1,174 ft", difficulty: "Moderate", notes: "⭐ One trailhead instead of two. See Open Questions — this may be the better Friday." },
      { name: "Litton / Slaven Farm Loop", day: 4, distance: "5.9 mi", gain: "—", difficulty: "Moderate", duration: "3h 15m", notes: "Farmstead, waterfall, rock shelters, hemlock cove." },
      { name: "⭐ Honey Creek Loop", day: 5, distance: "5.5–6.0 mi (plan) · AllTrails 4.6 mi", gain: "~571 ft (plan) · ⚠️ AllTrails 820 ft", difficulty: "Hard", duration: "6h — one hour per mile", notes: "⚠️ AllTrails has 44% more climb and a mile less distance. Both sources say one hour per mile regardless." },
      { name: "Devil's Jump Overlook", day: 6, distance: "0.1 mi", gain: "—", difficulty: "Easy", duration: "25m", notes: "Paved, benched." },
      { name: "Blue Heron Loop (optional)", day: 6, distance: "6.5 mi", gain: "—", difficulty: "Moderate", duration: "+3h", notes: "\"Cracks in the Rocks\" passage. Version A only." },
      { name: "Yahoo Falls (optional)", day: 6, distance: "1.0 mi", gain: "—", difficulty: "Easy", duration: "40m detour", notes: "113 ft, highest in Kentucky. No barriers at the upper viewpoint." },
    ],
  },

  sunMoon: [
    { date: "Tue 9/22", location: "Slade / Chimney Top", firstLight: "6:56", sunrise: "7:22", sunset: "7:33 PM", dark: "~7:59 PM", moon: "—" },
    { date: "Wed 9/23", location: "Auxier Ridge", firstLight: "6:57", sunrise: "7:23", sunset: "7:32 PM", dark: "~7:58 PM", moon: "—" },
    { date: "Thu 9/24", location: "Bandy Creek / East Rim", firstLight: "7:02", sunrise: "7:28", sunset: "7:34 PM", dark: "~8:00 PM", moon: "—" },
    { date: "Fri 9/25", location: "Big South Fork", firstLight: "7:03", sunrise: "7:29", sunset: "7:32 PM", dark: "~7:58 PM", moon: "—" },
    { date: "Sat 9/26", location: "Honey Creek", firstLight: "7:03", sunrise: "7:29", sunset: "7:31 PM", dark: "~7:57 PM", moon: "—" },
    { date: "Sun 9/27", location: "Blue Heron / Stearns", firstLight: "7:04", sunrise: "7:30", sunset: "7:30 PM", dark: "~7:56 PM", moon: "—" },
  ],
  sunMoonNote:
    "Recomputed with the NOAA solar position algorithm for each day's actual coordinates, because the source file's Sept 24 sunset was <i>earlier</i> than Sept 22's despite moving 65 miles west — which cannot be right. These are sea-level times with standard refraction; a ridge or a gorge wall takes light away earlier. Moon phase not yet worked out — see Open Questions.",

  weather: [
    { location: "Red River Gorge (Stanton KY)", elevation: "~1,200 ft", high: "75–77", low: "48–50", notes: "AccuWeather climate normals for Sept 22–27. The plan said 70–75°F highs — normals run slightly warmer, and last year ran 73–84°F." },
    { location: "Big South Fork (Bandy Creek)", elevation: "~1,300 ft", high: "~75", low: "~50", notes: "Similar. Ticks and snakes still active on the Plateau in late September; black bears at Bandy Creek." },
  ],
  weatherNote:
    "Climate normals, not a forecast — the 10-day forecast reaches Sept 22 around Sept 12. ⚠️ <b>The warmer normals matter for the cooler:</b> the meal plan sizes Zone 1 against 70–75°F and gets ~2.5 days out of the 48qt. At 77–84°F that shortens. The Thursday block of ice is not optional.",

  packing: [
    {
      category: "The lecture kit — this trip's single point of failure",
      items: [
        "Starlink dish + mount",
        "Portable power bank, fully charged",
        "Laptop + charger",
        "A backup plan written down: Gladie/Slade area, Miguel's, or Sky Bridge Station all have wifi",
      ],
    },
    {
      category: "Sleep (shakedown for October — take notes)",
      items: [
        "REI Siesta 20 bag — first cold-weather use. Lows ~50°F here, mid-30s in October. Note whether it sleeps warm.",
        "Therm-a-Rest MondoKing 3D",
        "2-person tent",
        "Puffy, hat, gloves — for the 5:45 AM Auxier start",
      ],
    },
    {
      category: "Honey Creek specifically",
      items: [
        "Shoes with real grip — wet rock, wet ropes",
        "Trekking poles — the alternative to trusting the muddy fixed ropes",
        "Headlamp in the pack regardless of the hour",
        "GPX loaded offline before leaving camp — blazing is inconsistent",
        "3L water",
      ],
    },
    {
      category: "Camp kitchen",
      items: [
        "One burner, pot, pan, mug, spork",
        "Wide-mouth thermos — hot oats on the ridge Wednesday, hot dinner at the overlook Thursday",
        "48qt cooler, pre-chilled",
        "Olive oil squeeze bottle, hard cheese, crushed chips, starch pouches",
        "Frozen-flat quart bags: chili (Wed dinner), chorizo burrito (Thu breakfast) — these ARE the ice",
      ],
    },
    {
      category: "Vehicle",
      items: [
        "Spare tire checked and inflated — 5 unpaved miles to Twin Arches",
        "Jack, tire plug kit",
        "Offline Google Maps: Slade–Stanton–Campton, and Oneida–Stearns–Jamestown",
        "AllTrails or Gaia downloaded separately — Google Maps offline has no trails",
      ],
    },
    {
      category: "Bear country (Bandy Creek)",
      items: ["Food storage sorted before dark on Thursday", "Nothing scented in the tent", "Look up before pitching — flagged hazardous tree area"],
    },
  ],

  reservations: [
    { text: "✅ Koomer Ridge, Sept 22–23 — recreation.gov 0822210215-1, 2 nights, confirmed 9/1" },
    { text: "✅ Bandy Creek, Sept 24–26 — recreation.gov 0895576747-1, 3 nights, confirmed 9/1" },
    { text: "✅ Tunnel Ridge Road — confirmed OPEN by phone. The Bison Way fallback is dead." },
    { text: "✅ Honey Creek — confirmed OPEN by phone." },
    { text: "Check fire ban status, both parks" },
    { text: "Thu evening at Bandy Creek visitor center: ask about the Twin Arches forest road condition" },
    { text: "Thu evening at Bandy Creek visitor center: ask about Honey Creek ladder condition and recent rain" },
    { text: "Thu: check Saturday's forecast — do not do Honey Creek right after rain, be willing to swap with Friday" },
    { text: "Download offline Google Maps regions AND AllTrails/Gaia trail maps — before leaving home" },
    { text: "Load the Honey Creek GPX. Not optional." },
    { text: "Text the trip plan home, including Saturday's Honey Creek window" },
    { text: "Morning of departure: re-check Tunnel Ridge Road — Cumberland District, 606-784-6428" },
  ],

  openQuestions: [
    {
      question: "Friday now has a third option, and it may beat both of the originals.",
      blocks: "Day 4",
      detail:
        "AllTrails lists a <b>Slave Falls + Twin Arches combined loop: 10.1 mi, 1,174 ft, one trailhead.</b> That's the same two destinations you already planned, connected on foot instead of by a 20-minute drive, landing exactly on the ~10 mi ceiling. Measured against your own stated criteria — crowd-averse, ~10 mi / 2,500 ft, dislikes fragmented driving — it beats the three-trailhead day on fragmentation and beats the Leatherwood Ford alternative on not being a different place entirely. Cost: you'd drop Litton/Slaven, which is the homestead-ruins hike. Worth ten minutes on the AllTrails page before Thursday.",
    },
    {
      question: "The meal plan schedules a 12-minute cook inside the lecture block.",
      blocks: "Day 2",
      detail:
        "K-L2 is chicken quesadillas, three rounds in the pan, MED cleanup, at 12:05 Wednesday. The lecture runs 11:00–3:00. The meal file predates the lecture revision — it also still says to double snacks for \"the Auxier loop,\" which the lecture cut. Either build the quesadillas cold Tuesday night and eat them at the break, or move to a no-cook tortilla plate and save the quesadillas for Friday.",
    },
    {
      question: "Gray's Arch: 3.8 miles or 6.5?",
      blocks: "Day 3 — the day with no slack",
      detail:
        "The plan budgets 4 hours for ~6.5 mi. AllTrails puts the same named loop at 3.8 mi / 577 ft. If AllTrails is right you gain roughly 90 minutes on the heaviest day of the trip, which would take the pressure off the evening. If the plan is right, nothing changes. Ten minutes on the AllTrails page or the DBNF trail listing settles it.",
    },
    {
      question: "Honey Creek: 571 ft of gain or 820?",
      blocks: "Day 5",
      detail:
        "AllTrails says 4.6 mi / 820 ft, Hard, from 2,244 reviews. The plan says 5.5–6.0 mi / ~571 ft. Both sources independently say one hour per mile, so the 6-hour budget holds either way — but 820 ft over 4.6 miles is a materially different day than 571 over 6.",
    },
    {
      question: "Which overlook faces which way?",
      blocks: "Days 1 and 2",
      detail:
        "Chimney Top Rock and Sky Bridge were assigned to sunset on the assumption that they're the two named short-walk viewpoints. <b>Aspect was never verified.</b> A sunset overlook that faces east is a wasted evening.",
    },
    {
      question: "Moon phase for Sept 22–27 was never worked out.",
      blocks: "Nothing critical",
      detail:
        "Stargazing is on the declined list so this may not matter at all — but the 5:45 AM Wednesday walk out Auxier Ridge in the dark is easier or harder depending on it, and it's the one thing the conditions table can't answer yet.",
    },
    {
      question: "Print the confirmations before you leave.",
      blocks: "Nothing — both sites are confirmed",
      detail:
        "Koomer Ridge <b>0822210215-1</b> (2 nights) and Bandy Creek <b>0895576747-1</b> (3 nights), both booked through recreation.gov on Sept 1. The numbers are on this page now, but cell service is limited to none at both campgrounds — carry paper too.",
    },
  ],

  places: [
    {
      group: "Red River Gorge",
      items: [
        { name: "Koomer Ridge Campground", maps: "Koomer Ridge Campground Slade KY", note: "Nights 1–2. Walk-in tent site." },
        { name: "Nada Tunnel", maps: "Nada Tunnel Red River Gorge KY", note: "One lane, 900 ft, hand-cut 1910–11" },
        { name: "Gladie Learning Center", maps: "Gladie Cultural Environmental Learning Center Stanton KY", note: "Building closed Tuesdays. Grounds open." },
        { name: "Princess Arch Trailhead", maps: "Princess Arch Trailhead Red River Gorge", note: "The KY 715 overlook cluster" },
        { name: "Auxier Ridge Trailhead", maps: "Auxier Ridge Trailhead Red River Gorge", note: "Via Tunnel Ridge Rd. Wednesday's dark start." },
        { name: "Gray's Arch Picnic Area", maps: "Grays Arch Picnic Area Red River Gorge", note: "Thursday morning" },
        { name: "Chimney Top Rock", maps: "Chimney Top Rock Red River Gorge", note: "Tuesday sunset — aspect unverified" },
        { name: "Sky Bridge", maps: "Sky Bridge Red River Gorge KY", note: "Walk the top AND the lower trail" },
        { name: "Rock Bridge Recreation Area", maps: "Rock Bridge Recreation Area Red River Gorge", note: "The only arch spanning water" },
        { name: "Miguel's Pizza", maps: "Miguels Pizza Slade KY", note: "Build your own, 45 toppings" },
        { name: "Red River Rockhouse", maps: "Red River Rockhouse Campton KY", note: "⭐ The cheeseburger. Not currently scheduled — the best meal you'd be skipping." },
        { name: "Sky Bridge Station", maps: "Sky Bridge Station Pine Ridge KY", note: "Gourmet hot dogs. Live music Fri/Sat." },
        { name: "The Brick", maps: "The Brick Pine Ridge KY", note: "Strawberry cheesecake, across the street" },
        { name: "Kroger Stanton", maps: "Kroger Stanton Kentucky", note: "The only resupply. BLOCK ice + rotisserie chicken." },
      ],
    },
    {
      group: "Big South Fork",
      items: [
        { name: "Bandy Creek Campground", maps: "Bandy Creek Campground Oneida TN", note: "Nights 3–5. Free hot showers. Bear country." },
        { name: "Bandy Creek Visitor Center", maps: "Bandy Creek Visitor Center Big South Fork", note: "9–5 ET. Ask about Honey Creek and the Twin Arches road." },
        { name: "East Rim Trailhead", maps: "East Rim Trailhead Big South Fork", note: "Sunset Overlook. No railings." },
        { name: "Twin Arches Trailhead", maps: "Twin Arches Trailhead Big South Fork", note: "5 unpaved miles off Divide Road" },
        { name: "Sawmill Trailhead", maps: "Sawmill Trailhead Big South Fork", note: "Slave Falls + Needle Arch" },
        { name: "Litton / Slaven Farm Loop", maps: "Litton Slaven Farm Loop Big South Fork", note: "Friday afternoon" },
        { name: "Honey Creek Trailhead", maps: "Honey Creek Trailhead Big South Fork", note: "Small lot ~1 mi before the road ends" },
        { name: "Honey Creek Overlook", maps: "Honey Creek Overlook Big South Fork", note: "Drive the last mile up" },
        { name: "Leatherwood Ford", maps: "Leatherwood Ford Big South Fork", note: "The single-trailhead Friday alternative" },
      ],
    },
    {
      group: "The drive home",
      items: [
        { name: "Blue Heron Mining Community", maps: "Blue Heron Mining Community Stearns KY", note: "Free, self-guided ghost structures" },
        { name: "Devil's Jump Overlook", maps: "Devils Jump Overlook Big South Fork", note: "0.1 mi, paved" },
        { name: "The Whistle Stop", maps: "The Whistle Stop Stearns KY", note: "Opens 11:00 Sunday. Fried green tomatoes." },
        { name: "Yahoo Falls", maps: "Yahoo Falls Kentucky", note: "Optional 40-min detour. No barriers up top." },
      ],
    },
  ],
  placesNote:
    "The field tab. Every entry opens a Google Maps search rather than dropping a pin — a query works with your downloaded offline region, and it doesn't depend on a coordinate anyone guessed.",
  offlineRegions:
    "Two Google Maps regions: <b>Slade–Stanton–Campton</b> and <b>Oneida–Stearns–Jamestown</b>. ⚠️ Google Maps offline does not include trails — download AllTrails or Gaia separately, and the <b>Honey Creek GPX is not optional</b>. Cell service is limited to none at both campgrounds.",

  notes: [
    {
      heading: "The Wednesday lecture — now confirmed on both trips",
      body:
        "11:10–2:30, budgeted 11:00–3:00, taken at camp on a laptop over Starlink. This was the single open question across both 2026 trips and it's now closed: it falls on <b>both</b> Wednesdays. That means Sept 23 permanently loses the full Auxier Branch → Double Arch loop and keeps the out-and-back. Double Arch is not coming back on this trip. Hidden Arch (2.3 mi from camp) also comes off the day.",
    },
    {
      heading: "Starlink under canopy is the real risk, not the lecture",
      body:
        "Koomer Ridge is a forested campground and Starlink needs sky view. Test it Tuesday afternoon on arrival — that gives one full day of buffer, which is thinner than October's three. Fallbacks in order: an open spot elsewhere in the campground, the Gladie or Slade area, or Miguel's / Sky Bridge Station, which have wifi. If the canopy wins, the lecture happens somewhere with a roof and Wednesday morning's plan is unaffected either way.",
    },
    {
      heading: "Thursday is the day that breaks, not Friday",
      body:
        "The source file names Friday as the uncertain day and gives Thursday no slack line at all. By the numbers Thursday is the heavier one: 14h 35m door to tent, 9.1 miles on foot, 4h 20m driving including the 3h 15m transfer, and a first arrival at an unfamiliar bear-country campground that gets set up and immediately abandoned for a sunset hike that returns after dark. Friday has two hours spare and three trailheads you could trim. If Gray's Arch turns out to be 3.8 miles rather than 6.5, Thursday solves itself.",
    },
    {
      heading: "Two sources, both shown",
      body:
        "Nine of nineteen hike stats in the source file were flagged as unverified estimates. Cross-checking against AllTrails resolved some and opened others: Auxier broadly agrees, Gray's Arch disagrees by nearly half, and Honey Creek has 44% more climb over a mile less distance. AllTrails is crowd-sourced GPS from recorded hikes — good at distance and gain, bad at agency-official routing. Where they disagree, both are printed rather than picked. The one thing both sources agree on is Honey Creek's hour-per-mile pace.",
    },
    {
      heading: "Honey Creek on a Saturday is deliberate",
      body:
        "Saturday is the park's busiest day. Honey Creek stays empty because it's hard — ropes, ladders, creek crossings and inconsistent blazing. AllTrails' own trail description independently recommends allowing an hour per mile and warns that markings are poor and a downloaded map is necessary. Putting the hardest hike on the busiest day is the crowd-aversion rule working exactly as intended. The four hours of daylight left over after finishing at 1:50 PM is not spare time — it is the safety margin, and the 11:00 AM turnaround is what protects it.",
    },
    {
      heading: "The cooler math is tighter than planned",
      body:
        "The meal plan sizes Zone 1 — frozen meals in flat quart bags acting as ice — against highs of 70–75°F and gets about 2.5 days out of the 48qt. AccuWeather's climate normals for Stanton over these dates are 75–77°F, and last year ran 73–84°F. That shortens the window, and only four meals happen before Thursday's resupply, so the plan still works. But the block of ice at Kroger stops being an optimization and becomes the thing that keeps Thursday's rotisserie chicken safe through Friday dinner.",
    },
    {
      heading: "This trip is the shakedown for October",
      body:
        "The Siesta 20 is new and this is its first cold-weather use, at lows around 50°F. October's last three nights are Linville at ~3,800 ft and Hurricane at ~2,900 ft, both mid-30s, and a liner was recommended and is not confirmed purchased. Note on Wednesday and Saturday mornings whether the bag actually sleeps warm — that observation is the input to a purchase decision three weeks later, and there is no second chance to collect it.",
    },
    {
      heading: "Big South Fork food is thin, and that's not a research failure",
      body:
        "Oneida and Jamestown are chains. Bandy Creek has potable water and free hot showers, which is exactly why Saturday's ribeye dinner is scheduled there — high cleanup is only allowed where there's water. Fayetteville does the opposite job in October, eating five restaurant slots in three days. Here, the good meals are front-loaded in the Gorge: Sky Bridge Station and The Brick on Tuesday, Miguel's on Thursday. <b>Red River Rockhouse is the notable omission</b> — local sources call it the best food at the Red and the cheeseburger the best meal available, and the current schedule never reaches it.",
    },
  ],

  waypoints: [
    { name: "Koomer Ridge Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "1–2", notes: "Walk-in tent site" },
    { name: "Auxier Ridge Trailhead", lat: null, lng: null, verified: false, icon: "🌄", days: "2", notes: "Via Tunnel Ridge Rd" },
    { name: "Gray's Arch Picnic Area", lat: null, lng: null, verified: false, icon: "🥾", days: "3", notes: "" },
    { name: "Bandy Creek Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "3–5", notes: "Bear country" },
    { name: "Twin Arches Trailhead", lat: null, lng: null, verified: false, icon: "🪨", days: "4", notes: "5 unpaved miles" },
    { name: "Honey Creek Trailhead", lat: null, lng: null, verified: false, icon: "🪜", days: "5", notes: "Small lot ~1 mi before road end" },
    { name: "Blue Heron Mining Community", lat: null, lng: null, verified: false, icon: "🏚️", days: "6", notes: "" },
  ],
  map: { center: [37.0, -84.2], zoom: 8 },
};
