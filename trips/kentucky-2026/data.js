/* ==========================================================================
   Red River Gorge + Big South Fork — Sept 22–27, 2026

   Transcribed from MASTER-trip1-kentucky-sept-2026.md and
   MEALS-trip1-kentucky.md (both Sept 2026). Rendered by ../../js/trip.js.

   REVISED 2026-09-06 — restructured against two stated preferences:
     1. Hike out, sit up to an hour, hike back. Lookouts, river shelves,
        falls and rock shelters are the destinations worth sitting at.
     2. One outing per day. No mid-day return to camp without a reason
        that earns it; a trailhead reachable on foot from the tent is free.
   Campgrounds and drive days are untouched — both reservations still stand.
   Changes: Angel Falls added Thursday as a stop on the drive in (Leatherwood
   Ford is 15 min short of Bandy Creek, so it costs no extra driving); the
   East Rim sunset moved Thursday -> Friday, which removes Thursday's second
   outing; John Litton cut from Friday; Sky Bridge cut from Wednesday;
   Devil's Jump expanded to absorb Sunday's 45-minute wait in Stearns.
   Confirmed by the traveler: Miguel's 7:00 AM-9:45 PM; Red River Rockhouse
   12-9 PM and closed Tue/Wed, so it is off this trip; Divide Road will be
   driven with a turnaround; Honey Creek is off if it rains; Yahoo Falls
   declined.

   FROM THE EARLIER TRANSCRIPTION PASS — findings recorded as warnings and
   open questions rather than silent edits:
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
      "Avon OH → Koomer Ridge (2 nights, Red River Gorge) → Bandy Creek (3 nights, Big South Fork) → Blue Heron → home. Two sandstone plateaus, one transfer day between them. <b>Every day is one loop out from camp and back</b> — no returning mid-day unless the reason is worth the drive.",
    vehicle:
      "2013 Subaru Legacy. AWD, ~5.9 in ground clearance, low front air dam. The five unpaved miles to Twin Arches off Divide Road are the one road on this trip that needs a condition check first.",
    gettingThere:
      "I-71 S → Cincinnati → I-75 S → Mountain Pkwy → Exit 33 Slade. 5h 35m outbound (Google +15%), ~7h back from Stearns.",
    stats: [
      { num: "6 days", lbl: "Length" },
      { num: "5", lbl: "Nights camping" },
      { num: "~27 mi", lbl: "On foot" },
      { num: "✅ Both", lbl: "Campgrounds booked" },
    ],
    overviewCards: [
      { h: "Dates", p: "Sept 22–27, 2026<br>6 days / 5 nights" },
      { h: "Group", p: "Solo. One person, one tent, one portion." },
      { h: "Lodging", p: "<b>All reserved.</b> Koomer Ridge ×2 (walk-in tent, $24), Bandy Creek ×3 (tent loop, free hot showers)" },
      { h: "Permits", p: "<b>None needed.</b> There is no RRG camping permit — the thing that exists is an overnight <i>parking</i> pass for vehicles left on forest land 10 PM–6 AM. The campground fee covers it." },
      { h: "The constraint", p: "Remote lecture Wed Sept 23, 11:00–3:00, at camp over Starlink. Confirmed on <b>both</b> 2026 trips. Cooking lunch through it is fine — K-L2 is a 12-minute job." },
      { h: "The shape of a day", p: "<b>Hike out, sit up to an hour, hike back.</b> Lookouts, river shelves, falls and rock shelters are the destinations. Days are routed as a single outing from camp — the lecture is the only mid-day return the trip permits." },
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
      driving: "~6h 05m total",
      slack: "~2 hours once Gladie comes off. First cut is Angel Windows, and you almost certainly will not need it.",
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
        { kind: "drive", time: "2:50 → 3:15", est: "25m", text: "→ the KY 715 overlook cluster. <b>Gladie is cut</b> — the building is closed Tuesdays and its two short nature trails do not compete with three arches.", maps: "Princess Arch Trailhead Red River Gorge" },
        { kind: "hike", time: "3:15 → 5:15", est: "2h", text: "<b>Princess Arch, Whistling Arch, Angel Windows.</b> ✅ AllTrails: Whistling 0.6 mi / 91 ft / 16 min, Angel Windows 0.6 mi / 88 ft / 16 min. Three short walks with a few minutes of driving between them — two hours is generous, which is the point on arrival day." },
        { kind: "drive", time: "5:15 → 5:25", est: "10m", text: "→ Sky Bridge Station, KY 715.", maps: "Sky Bridge Station Pine Ridge KY" },
        { kind: "food", time: "5:25 → 6:25", est: "60m", text: "<b>Dinner.</b> Restaurant, taphouse, hostel and gear shop in one rustic cabin — the only real option in the northeastern Gorge. <b>Order the gourmet hot dogs.</b>" },
        { kind: "dessert", time: "6:25 → 6:45", est: "20m", text: "<b>The Brick</b>, directly across the street. Hand-scooped ice cream in a ~1900 brick building. <b>Order strawberry cheesecake.</b>", maps: "The Brick Pine Ridge KY" },
        { kind: "drive", time: "6:45 → 7:05", est: "20m", text: "→ Chimney Top Rock for sunset.", maps: "Chimney Top Rock Red River Gorge" },
        { kind: "sunset", time: "7:05 → 7:55", est: "50m", text: "✅ <b>Chimney Top faces west / northwest</b> — aspect confirmed, this is the right sunset spot. Sunset <b>7:31</b>. AllTrails: 0.7 mi, 98 ft, paved and ADA-rated, 18 min. You arrive with half an hour spare instead of three minutes." },
        { kind: "drive", time: "8:10 → 8:35", est: "25m", text: "→ camp." },
      ],
      meals: {
        b: "home",
        l: "packed — sourdough sub, Genoa salami, provolone, pepperoncini, oil and oregano. Built this morning, eaten in the car (~850 kcal)",
        d: "bought — Sky Bridge Station hot dogs, then The Brick",
      },
      highlights:
        "Three arches, a hand-cut tunnel and a confirmed west-facing sunset overlook, all inside the four hours after a five-and-a-half-hour drive. Nothing today is hard, and cutting Gladie means nothing today is rushed either.",
      warnings:
        "Test Starlink today. It is the single point of failure for Wednesday and you have exactly one day of buffer to solve it. Fallbacks in order: an open spot elsewhere in the campground, the Gladie or Slade area, or Miguel's / Sky Bridge Station, which have wifi.",
    },
    {
      day: 2,
      date: "Wed Sept 23, 2026",
      title: "Ridge at First Light, Laptop by Eleven",
      tagline: "Canyon fog, then four hours of class in a tent.",
      type: "activity + lecture",
      driving: "~2h",
      slack: "Tight before 11:00 — the drive back from Auxier is the buffer. Loose after 3:00, and looser than it was: Sky Bridge came off, which removed a third stop and a fourth drive leg.",
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
        { kind: "hike", time: "3:50 → 5:50", est: "2h", text: "⭐ <b>Rock Bridge + Creation Falls — and a full hour sitting at the falls.</b> ✅ AllTrails: 1.4 mi loop / 311 ft, or 1.5 mi out-and-back at 42 min moving. The only arch in the Gorge that spans water, and AllTrails tags this trail with a <b>beach</b> — the creek shelf below Creation Falls is the sit. Forty-two minutes of walking inside a two-hour block is deliberate." },
        { kind: "drive", time: "5:50 → 6:25", est: "35m", text: "→ camp, and stay there." },
        { kind: "food", time: "6:25 →", est: "—", text: "<b>Dinner at camp.</b> Chili out of the frozen quart bag, one pot, Fritos poured in. Nothing after it — the day ends where you sleep." },
      ],
      meals: {
        b: "made — hot maple oats+ in the thermos, eaten on the ridge. Pre-mixed at home: 2 packets, milk powder, pecans, dates, salt, PB stirred in last (~970 kcal)",
        l: "<b>K-L2</b> made — chicken quesadillas: 3 tortillas, chicken pouch, 80g cheddar, bell pepper, salsa. 12 min in the pan at 12:05, cooked during the lecture — <b>confirmed workable</b> (~950 kcal). Potable water on site.",
        d: "made — beef-and-bean chili frozen flat, reheated at camp at 6:25. Split the Frito bag lengthwise and pour it in (~950 kcal, one pot)",
      },
      highlights:
        "Auxier Ridge at dawn with canyon fog below is the best thing in the Gorge and you'll have it alone. AllTrails puts the out-and-back to Courthouse Rock at 4.3 mi / 738 ft — close to the plan's 4.6 mi estimate. The afternoon is now one hike instead of three stops: an hour on the creek shelf under an arch that spans water, then camp.",
      warnings:
        "⚠️ <b>The 6:15 AM walk out Auxier Ridge is moonless.</b> The moon sets at <b>4:09 AM</b>; by 6:15 it is well below the horizon. Nothing overhead helps you — the headlamp is the whole plan, and spare batteries are in the pack for a reason.<br><br>Casualties of the lecture: Double Arch, the full Auxier loop, and Hidden Arch. Now permanent — the lecture is confirmed on both trips. <b>Sky Bridge is a separate, deliberate cut</b>: it faces E/SE so the evening light was never going to work, and it was the third stop and fourth drive leg of an already long day.",
    },
    {
      day: 3,
      date: "Thu Sept 24, 2026",
      title: "Gray's Arch, Then South",
      tagline: "Short arch, long drive, dinner on the rocks beside the rapids.",
      type: "activity + transfer",
      driving: "~4h 05m",
      slack: "<b>~1h 30m.</b> Was zero. Swapping the Gray's Arch loop for the 2.5 mi out-and-back cut 1h 45m off the day; moving the rim sunset to Friday cut the second outing entirely.",
      overnight: {
        name: "Bandy Creek Campground",
        place: "Big South Fork, TN",
        kind: "NPS campground — tent loop",
        cost: "Reserved",
        checkin: "Visitor center adjacent, 9–5 ET",
        confirmation: "✅ recreation.gov <b>0895576747-1</b> — 3 nights",
        notes: "Free hot showers. ⚠️ Active black bear habitat — food storage required. Flagged hazardous tree area: look up before pitching. Visitor center is adjacent but closes 5 PM ET — you arrive after it.",
      },
      schedule: [
        { kind: "hike", time: "OPTIONAL 6:00 → 7:30", est: "1h 30m", text: "<i>Optional, if you wake early:</i> <b>Hidden Arch</b>, 2.3 mi straight from the campground — the hike the lecture took off Wednesday. Only if you actually want it; the day is better without it." },
        { kind: "stop", time: "7:30 → 8:15", est: "45m", text: "Break camp. <b>An hour and a half later than the original plan</b> — the shorter Gray's Arch bought it." },
        { kind: "drive", time: "8:15 → 8:40", est: "25m", text: "→ Gray's Arch Picnic Area, Tunnel Ridge Rd.", maps: "Grays Arch Picnic Area Red River Gorge" },
        { kind: "hike", time: "8:40 → 10:10", est: "1h 30m", text: "✅ <b>Gray's Arch Trail, out-and-back — 2.5 mi, 308 ft.</b> AllTrails moving time is 62 min; 90 minutes covers the arch itself. ⚠️ <b>The Gray's Arch spur alone is 0.3 mi and does NOT reach the arch</b> — turn onto Rough Trail for another 0.6. <b>This replaces the 6.1–7.8 mi Rough / Pinch 'Em Tight loop and is what makes today survivable.</b>" },
        { kind: "drive", time: "10:10 → 10:35", est: "25m", text: "→ Slade.", maps: "Miguels Pizza Slade KY" },
        { kind: "food", time: "10:35 → 11:35", est: "60m", text: "<b>Lunch at Miguel's.</b> ✅ <b>Open 7:00 AM–9:45 PM — confirmed, the 10:35 arrival is safe.</b> Opened 1984 as an ice cream shop by Miguel Ventura; now the Camp Four of the East — climbers give crag directions relative to it. <b>Build your own, 45 toppings. Never a plain pie.</b> A fresh one takes 20–30 min even when quiet." },
        { kind: "shop", time: "11:35 → 12:20", est: "45m", text: "<b>RESUPPLY — the only one this trip.</b> Kroger in Stanton has the real selection. <b>Buy one BLOCK of ice</b> (block, not cubes — 2–3× longer) and a rotisserie chicken, which covers tonight's dinner and tomorrow's.", maps: "Kroger Stanton Kentucky" },
        { kind: "drive", time: "12:20 → 3:20", est: "3h", text: "→ <b>Leatherwood Ford</b>, on TN 297. You drive past it on the way in — it is 15 minutes short of the campground, not a detour.", maps: "Leatherwood Ford Big South Fork" },
        { kind: "stop", time: "3:20 → 3:35", est: "15m", text: "Boil water in the car park and build the couscous. Thermos sealed, dinner carried in." },
        { kind: "hike", time: "3:35 → 5:45", est: "2h 10m", text: "⭐ <b>Angel Falls Trail — 3.7 mi out-and-back, 200 ft, Easy.</b> ✅ AllTrails: 76 min moving, 4.5★, 739 reviews. A flat river walk along the Big South Fork ending at the boulders where the rapids run. <b>Eat dinner sitting on them.</b> ⚠️ AllTrails' own description blends a clifftop overlook and the riverside rapids into one paragraph; 200 ft spread over 3.7 mi says river-level. Ask at the campground which you actually get." },
        { kind: "drive", time: "5:45 → 6:00", est: "15m", text: "→ Bandy Creek Campground. ⚠️ TN 297 climbs out of the gorge on this stretch — the 13% grade is right here, in the good direction.", maps: "Bandy Creek Campground Oneida TN" },
        { kind: "stop", time: "6:00 → 7:30", est: "1h 30m", text: "Set up, free hot shower, <b>bear-aware food storage sorted in daylight</b> — sunset is 7:32. Look up before pitching: flagged hazardous tree area. <b>You are done for the day.</b> ⚠️ The visitor center closes 5 PM ET, so you miss it — that is the price of Angel Falls on the way in.", warn: true },
      ],
      meals: {
        b: "made — chorizo–potato foil burrito, built and frozen at home, 6 min in a dry pan, eaten while striking the tent (~760 kcal). Move it to Zone 2 tonight.",
        l: "bought — Miguel's",
        d: "packed — couscous, rotisserie chicken, chickpeas, sun-dried tomatoes, feta. Built at Leatherwood Ford at 3:20, carried hot in the thermos, eaten on the boulders beside the rapids (~1,000 kcal). Couscous holds heat and doesn't slosh, which is exactly why it survives 1.8 miles of river trail.",
      },
      highlights:
        "You end the day eating a hot dinner out of a thermos on river boulders with the rapids running past, then drive fifteen minutes uphill and pitch a tent in daylight. Angel Falls is the best pure hike-sit-hike on the trip: 3.7 flat miles, 200 ft, and it costs no extra driving because it is on the road in.",
      warnings:
        "<b>Still the longest driving day, but the shape is fixed.</b> 7:30 AM to 7:30 PM with about 4 hours behind the wheel. The old version's real hazard is gone: you no longer arrive at an unfamiliar bear-country campground, set up, and immediately leave again for a fenceless overlook you walk back from in the dark on night one. The rim moved to Friday and costs two minutes of sunset (7:34 → 7:32).<br><br>What it costs instead: <b>the Bandy Creek visitor center, which closes at 5 PM ET.</b> That was the plan's place to ask about the Twin Arches forest road and Honey Creek conditions. Both are now judgment calls made in the field — turn around if Divide Road goes rough, and don't start Honey Creek after rain. If you would rather have the ranger, do camp first and Angel Falls becomes a Saturday afternoon hike."
    },
    {
      day: 4,
      date: "Fri Sept 25, 2026",
      title: "Arches and Homesteads",
      tagline: "Two arches, a waterfall, an afternoon off, then the rim at sunset.",
      type: "activity",
      driving: "~2h 35m, two trailheads out and the rim back",
      slack: "<b>Genuinely loose.</b> 8.1 miles on foot against a ~10 mi ceiling, and two and a half hours of nothing in the middle of it. Was 12.3 miles across three trailheads.",
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
        { kind: "drive", time: "8:00 → 8:45", est: "45m", text: "→ Twin Arches TH, including <b>5 unpaved miles off Divide Road</b>. Farthest trailhead first, then work back toward camp all day. ⚠️ <b>Committed, with a turnaround</b> — 5.9 in of clearance and a low air dam. If the surface goes rough or rutted, reverse out and the day becomes Slave Falls plus a long afternoon.", maps: "Twin Arches Trailhead Big South Fork", warn: true },
        { kind: "hike", time: "8:45 → 10:30", est: "1h 45m", text: "⭐ <b>Twin Arches Short Loop — ✅ 1.1 mi, 269 ft, 37 min moving.</b> Not the 2 mi the plan carried, and nowhere near the 5.1 mi full loop. Largest natural arch complex in the eastern US and <b>you can climb on top of them</b> — an hour sitting up there is most of this block, which is now the point rather than the overrun." },
        { kind: "drive", time: "10:30 → 10:50", est: "20m", text: "→ Sawmill Trailhead, back down Divide Road toward camp.", maps: "Sawmill Trailhead Big South Fork" },
        { kind: "hike", time: "10:50 → 1:20", est: "2h 30m", text: "<b>Slave Falls + Needle Arch — ✅ 4.4 mi loop, 383 ft, Easy, 100 min moving.</b> Longer than the plan's 3.0 mi estimate, which is why Litton had to go. Lunch and 45 minutes at the falls inside the block: tortilla plate, no cooking, no cleanup." },
        { kind: "drive", time: "1:20 → 2:00", est: "40m", text: "→ camp." },
        { kind: "stop", time: "2:00 → 4:45", est: "2h 45m", text: "⭐ <b>The one afternoon off.</b> Free hot shower, then cook dinner early — rotisserie chicken, potatoes, green beans. <b>Cook double potatoes and bag half</b>: that is Saturday's breakfast and Saturday is the day. Camp sits between Divide Road and the East Rim, so this stop costs about fifteen minutes of driving, not a round trip." },
        { kind: "drive", time: "4:45 → 5:10", est: "25m", text: "→ East Rim Trailhead.", maps: "East Rim Trailhead Big South Fork" },
        { kind: "sunset", time: "5:10 → 8:00", est: "2h 50m", text: "⭐ <b>Sunset Overlook — moved off Thursday.</b> ✅ AllTrails: 2.6 mi out-and-back, only 104 ft, Easy, 51 min moving — so roughly <b>1h 45m of this block is sitting on the rim</b>, which is the entire idea. Sunset <b>7:31</b>, civil twilight ends 7:56. ⚠️ <b>No railings or fencing of any kind.</b> Headlamp for the walk out — though the moon is <b>98% lit</b> and ~9° up in the east at sunset, ~18° by the time you are back at the car, so this is not a black-woods walk.", warn: true },
        { kind: "drive", time: "8:00 → 8:25", est: "25m", text: "→ camp." },
      ],
      meals: {
        b: "made — eggs, spinach, red bell pepper, sourdough toasted dry in the pan first (~700 kcal). The relaxed one.",
        l: "packed — 2 tortillas, hard salami, aged cheddar, honey mustard, figs, almonds (~950 kcal), eaten at Slave Falls. Zero cleanup. Curing is what makes this safe unrefrigerated.",
        d: "made — rotisserie chicken, 400g diced russets, green beans, <b>cooked early at camp around 3:00</b> so the rim block stays free. <b>Cook double potatoes and bag half</b> — they're tomorrow's breakfast and tomorrow is a 6-hour day. Carry dessert and the thermos to the overlook.",
      },
      highlights:
        "Twin Arches is the largest natural arch complex in the eastern US and you can stand on top of it. Then a waterfall, then an actual afternoon off, then an hour and three quarters on an unfenced sandstone rim watching the sun go down over the Cumberland Plateau — with fresh legs, from a campground you already know, the night before the hard day.",
      warnings:
        "<b>Fixed, and the fix cost Litton.</b> The day was 12.3 miles across three trailheads. Cutting the John Litton Farm Loop drops it to <b>8.1 miles across two</b>, under the ceiling, the day before Honey Creek. That is a real trade, not a free one — AllTrails has Litton at 5.7 mi / 465 ft / 2h 07m moving with rock shelters, Fall Branch Falls and the farmstead on it, so the plan's 3h 15m estimate was an hour heavy. You are giving up a good loop to buy a rim at sunset. Worth it, but know what you paid.<br><br>⚠️ <b>The five unpaved miles to Twin Arches are the only clearance question on this trip</b>, and you are driving them without a ranger's read because the visitor center closed before you arrived Thursday. Drive them slowly, and turn around the moment the surface stops being maintained gravel. A cut sidewall five miles down Divide Road with no signal is the failure mode, not getting stuck.",
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
        { kind: "hike", time: "7:50 → 1:50", est: "6h", text: "⭐ <b>HONEY CREEK LOOP, COUNTER-CLOCKWISE.</b> <b>Take your hour on the BACK HALF</b> — Indian Rockhouse or Hide-Out Falls, after the 11:00 turnaround check. A sit before halfway spends the safety margin; a sit after it is nearly free, and you would still be at camp by 3:15. Multiple trip reports recommend this direction — you'd rather climb <i>up</i> wet rock than down it. <b>Trailhead signs say one hour per mile. Believe them</b> — that's scouting and backtracking, not slow walking. AllTrails independently says the same: <i>\"allow for a slower pace, roughly an hour per mile.\"</i>" },
        { kind: "drive", time: "1:50 → 2:00", est: "10m", text: "→ Honey Creek Overlook — drive the last mile up.", maps: "Honey Creek Overlook Big South Fork" },
        { kind: "stop", time: "2:00 → 2:30", est: "30m", text: "Judge whether the ladder spur would've been worth it. Opinions genuinely split — one hiker called the overlook boring and the loop far better." },
        { kind: "drive", time: "2:30 → 3:20", est: "50m", text: "→ camp." },
        { kind: "food", time: "3:20 →", est: "—", text: "<b>The one relaxed dinner of the trip.</b> Ribeye, smashed potatoes, garlic-thyme butter. Nothing scheduled after — and the moon comes up <b>full</b> — 100%, rising about sunset." },
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
        { kind: "stop", time: "9:35 → 10:35", est: "1h", text: "⭐ <b>Devil's Jump Overlook — sit here for an hour.</b> 0.1 mi from the trailhead at Blue Heron, paved, deck with bench seating over the river bend. <b>This is what kills the Whistle Stop gap</b>: the old plan drove to Stearns at 10:15 and waited 45 minutes in a car park for an 11:00 opening. Same hour, better chair, no extra driving." },
        { kind: "hike", time: "optional", est: "+3h", text: "<i>Optional, Version A only:</i> Blue Heron Loop, 6.5 mi with the \"Cracks in the Rocks\" passage — no extra driving, it leaves from Blue Heron. Only if the legs have it after Honey Creek, which they probably won't." },
        { kind: "drive", time: "10:35 → 10:50", est: "15m", text: "→ Stearns. You arrive ten minutes before it opens instead of forty-five.", maps: "The Whistle Stop Stearns KY" },
        { kind: "food", time: "11:00 → 12:15", est: "1h 15m", text: "<b>The Whistle Stop</b>, at the railway depot. Sunday 11:00–5:00. <b>Order the fried green tomatoes</b> — that's the dish reviewers single out; the burger and club get called average." },
        { kind: "drive", time: "12:15 → 7:15", est: "7h", text: "→ Avon OH. North on US 27 → I-75 N.", maps: "Avon, OH" },
      ],
      meals: {
        b: "made — second oats bag in the thermos, eaten driving: 2 packets, milk powder, banana chips, cocoa, PB (~900 kcal)",
        l: "bought — the Whistle Stop, or on the road under Version B",
        d: "home",
      },
      highlights:
        "Blue Heron is a coal town the Park Service stabilized rather than restored — free, self-guided, and empty on a Sunday morning. Then an hour on a benched deck above the river bend at Devil's Jump before lunch, which is the same shape as the rest of the trip and costs nothing.",
      warnings:
        "Seven hours of driving after five nights in a tent and a six-hour scramble day. Version B still exists — if you're wrecked, skip the Whistle Stop and eat on the road. <b>Yahoo Falls is declined</b>: a 40-minute driving detour for a 1 mi walk is the wrong trade on a day that is already eight hours of highway.",
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
      "✅ = cross-checked against AllTrails and settled. <b>Every hike here is now scored against one shape: walk out, sit up to an hour, walk back.</b> Lookouts, river shelves, falls and rock shelters are the destinations. Three routes moved on measurement — <b>Gray's Arch was never one number</b> (five routes share the name, 2.5 to 7.8 mi), <b>Honey Creek's gain is 820 ft, not 571</b>, and <b>Twin Arches is a 1.1 mi short loop, not 2 mi</b>. Two hikes came off (Sky Bridge, John Litton) and one came on (Angel Falls).",
    rows: [
      { name: "Princess / Whistling / Angel Windows", day: 1, distance: "✅ 0.6 mi each", gain: "✅ 88–91 ft each", difficulty: "Easy", duration: "16 min each", notes: "Three separate walks off KY 715. Princess not in AllTrails; the other two confirmed." },
      { name: "Chimney Top Rock", day: 1, distance: "✅ 0.7 mi", gain: "✅ 98 ft", difficulty: "Easy — paved, ADA", duration: "18 min", notes: "✅ Faces W/NW. Confirmed sunset spot." },
      { name: "Auxier Ridge out-and-back", day: 2, distance: "✅ 4.3 mi (AllTrails) · plan said ~4.6", gain: "✅ 738 ft", difficulty: "Moderate", duration: "2h 05m", notes: "To Courthouse Rock. Dark start, sunrise at the turnaround." },
      { name: "Rock Bridge + Creation Falls", day: 2, distance: "✅ 1.4 mi loop", gain: "✅ 311 ft", difficulty: "Moderate", duration: "1h 30m", notes: "The only arch in the Gorge spanning water." },
      { name: "Rock Bridge / Creation Falls — the sit", day: 2, distance: "✅ 1.5 mi out-and-back", gain: "✅ 259 ft", difficulty: "Moderate", duration: "42 min moving", notes: "⭐ AllTrails tags this trail with a <b>beach</b> — the creek shelf below the falls. A two-hour block for 42 min of walking." },
      { name: "Sky Bridge", day: "2 (cut)", distance: "0.7 mi loop", gain: "160 ft", difficulty: "Moderate", duration: "23 min", notes: "<b>Cut.</b> Faces E/SE so evening light never worked, and it was a third stop plus a fourth drive leg on the lecture day." },
      { name: "⭐ Gray's Arch Trail (out-and-back)", day: 3, distance: "✅ 2.5 mi", gain: "✅ 308 ft", difficulty: "Moderate", duration: "62 min moving", notes: "<b>The chosen route.</b> The spur alone is 0.3 mi and does not reach the arch — turn onto Rough Trail." },
      { name: "Gray's Arch — longer alternatives", day: "3 (not taken)", distance: "3.8 / 4.8 / 6.1 / 7.8 mi", gain: "577 / 987 / 1,056 / 1,505 ft", difficulty: "Moderate–Hard", duration: "up to 3h 49m", notes: "Pinch Em Tight loop, Long Loop, Rough+Martin's Fork, Rough Trail loop. The plan's ~6.5 mi was one of these — all four cost Thursday its slack." },
      { name: "⭐ Angel Falls Trail", day: 3, distance: "✅ 3.7 mi out-and-back", gain: "✅ 200 ft", difficulty: "Easy", duration: "76 min moving", notes: "<b>New — the best hike-sit-hike on the trip.</b> Flat river walk from Leatherwood Ford to the boulders at the rapids. On the road in, so it costs no extra driving. 4.5★, 739 reviews." },
      { name: "⭐ Sunset Overlook", day: "4 (moved from 3)", distance: "✅ 2.6 mi", gain: "✅ 104 ft", difficulty: "Easy", duration: "51 min moving", notes: "No railings. ~1h 45m of the block is sitting. Moved to Friday: same rim, rested legs, known campground, two minutes of sunset." },
      { name: "⭐ Twin Arches Short Loop", day: 4, distance: "✅ 1.1 mi — plan said ~2.0", gain: "✅ 269 ft", difficulty: "Moderate", duration: "37 min moving", notes: "<b>Settled.</b> The full loop is a separate 5.1 mi / 810 ft route. 5 unpaved miles to the trailhead. You can climb on top of the arches — that is the hour." },
      { name: "Slave Falls + Needle Arch", day: 4, distance: "✅ 4.4 mi loop — plan said ~3.0", gain: "✅ 383 ft", difficulty: "Easy", duration: "100 min moving", notes: "From Sawmill Trailhead, 20 min back down Divide Road from Twin Arches. Lunch and 45 min at the falls." },
      { name: "Slave Falls + Twin Arches combined loop", day: "4 (option)", distance: "10.1 mi", gain: "1,174 ft", difficulty: "Moderate", duration: "4h 07m", notes: "⭐ One trailhead instead of two. See Open Questions." },
      { name: "John Litton Farm Loop", day: "4 (cut)", distance: "✅ 5.7 mi loop", gain: "✅ 465 ft", difficulty: "Moderate", duration: "2h 07m moving", notes: "<b>Cut to buy the Friday rim sunset.</b> It IS in AllTrails — under <i>John Litton Farm Loop</i>, 4.6★, with caves, Fall Branch Falls and the farmstead. The plan's 3h 15m was an hour heavy. Trailhead is at Bandy Creek, zero driving. A genuine loss." },
      { name: "⭐ Honey Creek Loop", day: 5, distance: "✅ 4.6 mi", gain: "✅ 820 ft — settled", difficulty: "Hard", duration: "6h — one hour per mile", notes: "The plan's 571 ft was low. Both sources independently say an hour per mile." },
      { name: "Hidden Arch (optional)", day: "3 (optional)", distance: "✅ 2.1 mi loop", gain: "✅ 252 ft", difficulty: "Moderate", duration: "52 min moving", notes: "From Koomer Ridge, zero driving. The hike the lecture cut — recoverable Thursday morning if you wake early. Note first light is 7:02." },
      { name: "Silvermine Arch (unscheduled)", day: "—", distance: "3.0 mi out-and-back", gain: "393 ft", difficulty: "Moderate", duration: "76 min moving", notes: "⭐ <b>The best trail with no home on this trip.</b> Leaves straight from Koomer Ridge — arch plus rock shelter, 4.6★. The zero-drive alternative to Wednesday's Rock Bridge run, or a longer Thursday-morning option than Hidden Arch. Next time." },
      { name: "⭐ Devil's Jump Overlook", day: 6, distance: "0.1 mi", gain: "—", difficulty: "Easy", duration: "1h — mostly sitting", notes: "Paved, benched deck over the river bend, at the Blue Heron trailhead. Absorbs the 45 minutes the old plan spent waiting in a car park in Stearns." },
      { name: "Blue Heron Loop (optional)", day: 6, distance: "6.5 mi", gain: "—", difficulty: "Moderate", duration: "+3h", notes: "Cracks in the Rocks passage. No extra driving — leaves from Blue Heron. Version A only, and only if the legs survived Honey Creek." },
      { name: "Yahoo Falls", day: "6 (declined)", distance: "✅ 1.0 mi loop", gain: "✅ 193 ft", difficulty: "Easy", duration: "30 min moving", notes: "<b>Declined.</b> 113 ft, highest in Kentucky, 4.7★ — but a 40-minute driving detour for a 30-minute walk on an eight-hour driving day. Wrong trade." },
    ],
  },

  sunMoonSites: [
    { date: "2026-09-22", label: "Koomer Ridge / Chimney Top", waypoint: "Koomer Ridge Campground", tz: "America/New_York" },
    { date: "2026-09-23", label: "Auxier Ridge", waypoint: "Auxier Ridge Trailhead", tz: "America/New_York" },
    { date: "2026-09-24", label: "Bandy Creek / Leatherwood Ford", waypoint: "Bandy Creek Campground", tz: "America/New_York" },
    { date: "2026-09-25", label: "Bandy Creek / East Rim", waypoint: "Bandy Creek Campground", tz: "America/New_York" },
    { date: "2026-09-26", label: "Honey Creek", waypoint: "Honey Creek Trailhead", tz: "America/New_York" },
    { date: "2026-09-27", label: "Blue Heron / Stearns", waypoint: "Blue Heron Mining Community", tz: "America/New_York" },
  ],

  sunMoon: [
    { date: "Tue 9/22", location: "Koomer Ridge / Chimney Top", firstLight: "6:56", sunrise: "7:22", sunset: "7:31 PM", dark: "7:57 PM", moon: "83% — moonset 3:06 AM. Waxing gibbous." },
    { date: "Wed 9/23", location: "Auxier Ridge", firstLight: "6:57", sunrise: "7:23", sunset: "7:29 PM", dark: "7:56 PM", moon: "90% — moonset 4:09 AM. ⚠️ <b>Gone two hours before the dark ridge walk starts.</b>" },
    { date: "Thu 9/24", location: "Bandy Creek / Leatherwood Ford", firstLight: "7:02", sunrise: "7:28", sunset: "7:32 PM", dark: "7:58 PM", moon: "95% — moonset 5:18 AM" },
    { date: "Fri 9/25", location: "Bandy Creek / East Rim", firstLight: "7:03", sunrise: "7:29", sunset: "7:31 PM", dark: "7:56 PM", moon: "98% — ~9° up at sunset, ~18° by 8:20. The rim walk-out is lit." },
    { date: "Sat 9/26", location: "Honey Creek", firstLight: "7:04", sunrise: "7:29", sunset: "7:29 PM", dark: "7:55 PM", moon: "100% — <b>full moon</b>, rising about sunset" },
    { date: "Sun 9/27", location: "Blue Heron / Stearns", firstLight: "7:04", sunrise: "7:30", sunset: "7:27 PM", dark: "7:53 PM", moon: "99% — moonset 8:32 AM. Still reads full." },
  ],
  sunMoonNote:
    "<b>Derived, not typed.</b> Every figure here now comes from <code>node tools/sun.mjs kentucky-2026</code> against each day's verified waypoint — NOAA solar position with refraction and horizon dip, moon rise/set to about ±4 minutes. That replaced a hand-recomputed table whose sunsets ran <b>1–3 minutes late every single day</b>. A gorge wall or a ridge still takes the light earlier than any of these numbers.<br><br><b>Moon: settled, and it changed the Wednesday risk read.</b> Waxing gibbous all week, <b>full on Sept 26</b> — computed by <code>tools/sun.mjs</code>, not looked up. Two consequences and they cut opposite ways. ⚠️ <b>Wednesday's 6:15 AM walk out Auxier Ridge is moonless</b> — the moon sets at 4:09 AM, two hours before you leave the car. Nothing overhead helps; the headlamp is the entire plan. ✅ <b>Every evening is moonlit</b> — during the Friday walk back from the unfenced East Rim the moon is 98% lit and 9–18° up in the east. Still carry the headlamp, but that walk is not through black woods.",

  weather: [
    { location: "Red River Gorge (Stanton KY)", elevation: "~1,200 ft", high: "75–77", low: "48–50", notes: "AccuWeather climate normals for Sept 22–27. The plan said 70–75°F highs — normals run slightly warmer, and last year ran 73–84°F." },
    { location: "Big South Fork (Bandy Creek)", elevation: "~1,300 ft", high: "~75", low: "~50", notes: "Similar. Ticks and snakes still active on the Plateau in late September; black bears at Bandy Creek." },
  ],
  weatherNote:
    "Climate normals, not a forecast — the 10-day forecast reaches Sept 22 around Sept 12. ⚠️ <b>The warmer normals matter for the cooler:</b> the meal plan sizes Zone 1 against 70–75°F and gets ~2.5 days out of the 48qt. At 77–84°F that shortens. The Thursday block of ice is not optional.",

  provisions: {
    summary:
      "Five nights, one 48qt cooler, one resupply on Thursday. Solo, one burner, one pot, one pan. No coffee, no alcohol. Every quantity is one serving.",
    coolerNote:
      "<b>Zone 1 is your ice</b> — cooked meals frozen flat in quart bags, which chill everything above them and then get eaten. <b>Zone 2 is the zone that ruins trips</b> (eggs, dairy, produce, raw meat): keep it small, eat it early. Zone 3 is shelf-stable and takes no cooler space at all. ⚠️ Climate normals for these dates run 75–77°F, warmer than the 70–75°F the meal plan assumed, which shortens the window before Thursday's resupply.",
    cooler: [
      { days: "1–2 · Sep 22–23", where: "Koomer Ridge, KY", state: "<b>Zone 2 is nearly empty until Thursday, which is the whole reason this works</b> — only four meals happen before the resupply. Zone 1 holds the chili and the burrito." },
      { days: "3 · Sep 24", where: "Kroger, Stanton", state: "<b>Buy one BLOCK of ice — block, not cubes, it lasts 2–3× longer.</b> Plus the rotisserie chicken that covers Thursday and Friday dinner." },
      { days: "4–6 · Sep 25–27", where: "Bandy Creek, TN", state: "Running on the block ice and the resupply. Bandy Creek has potable water and free hot showers, which is the only reason Saturday's high-cleanup ribeye is scheduled there." },
    ],
    criticalSlots:
      "⚠️ <b>K-L2 is scheduled at 12:05 on Wednesday, inside the 11:00–3:00 lecture block</b> — three rounds of quesadillas, pan, spatula, MED cleanup. The meal file predates the lecture revision and also still doubles snacks for \"the Auxier loop\", which the lecture cut. Either build the quesadillas cold Tuesday night and eat them at the break, or swap to a no-cook tortilla plate and move the quesadillas to Friday.",
    lists: [
      {
        group: "Freeze flat at home",
        items: [
          "Beef-and-bean chili — 500 ml quart bag (K-D1, Wed dinner). Split a Frito bag lengthwise and pour it in.",
          "Chorizo–potato foil burrito (K-B2, Thu breakfast). Move to Zone 2 Wednesday night.",
        ],
      },
      {
        group: "Pre-mix into labeled bags at home",
        items: [
          "Oats ×2 — 2 packets · 25g milk powder · nuts · dried fruit · salt (K-B1 Wed, K-B5 Sun)",
          "Hot chocolate — packets · 15g whole milk powder · pinch of salt. <b>For the dark Auxier Ridge start; the fat and sugar do more at 50°F than caffeine would.</b>",
        ],
      },
      {
        group: "Buy at home",
        items: [
          "Sub fixings for K-L1: sourdough, Genoa salami, provolone, pepperoncini, oil, oregano",
          "Eggs, spinach, bell peppers, sourdough loaf, tortillas",
          "Chicken pouch (7oz) · hard salami · aged cheddar · provolone · sun-dried tomato pesto",
          "Trail mix 900g · bars ×8 · jerky 200g · waffles ×6 · dried mango 250g · almonds 250g",
          "Honey mustard packets · dried figs · banana chips · cocoa",
          "Olive oil squeeze bottle, hard cheese, crushed chips, starch pouches — the four things that turn a can into a meal",
        ],
      },
      {
        group: "Resupply — Kroger, Stanton KY, Thursday",
        note: "The only one this trip.",
        items: [
          "<b>1 BLOCK of ice</b> — not cubes",
          "<b>Rotisserie chicken</b> — covers K-D2 Thursday and K-D3 Friday. The correct move for one person.",
          "400g russet potatoes (<b>cook double Friday</b> — half is Saturday's breakfast) · 400g baby potatoes",
          "1× 12oz ribeye for Saturday · butter · garlic · thyme · balsamic · beef broth",
          "Couscous · chickpeas (pull-tab) · feta · sun-dried tomatoes in oil · lemon",
          "Frozen green beans · frozen broccoli · red onion · bell peppers · salsa",
        ],
      },
      {
        group: "Kit",
        items: [
          "<b>Wide-mouth thermos</b> — hot oats on the ridge Wednesday, hot couscous dinner at the Sunset Overlook Thursday. Two meals depend on it.",
          "One burner, 2L pot with lid, 8–10\" pan, insulated mug, spork, long spoon, folding knife, spatula",
          "48qt cooler, pre-chilled · wash basin · biodegradable soap · 2 bandanas",
          "Bear-aware food storage for Bandy Creek — sorted before dark Thursday",
        ],
      },
    ],
  },

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
    { text: "✅ Koomer Ridge, Sept 22–23 — recreation.gov 0822210215-1, 2 nights, confirmed 9/1", booked: true },
    { text: "✅ Bandy Creek, Sept 24–26 — recreation.gov 0895576747-1, 3 nights, confirmed 9/1", booked: true },
    { text: "✅ Tunnel Ridge Road — confirmed OPEN by phone. The Bison Way fallback is dead.", booked: true },
    { text: "✅ Honey Creek — confirmed OPEN by phone.", booked: true },
    { text: "✅ Miguel's Pizza — open 7:00 AM–9:45 PM. Thursday's 10:35 lunch confirmed safe.", booked: true },
    { text: "✅ Red River Rockhouse — 12–9 PM, CLOSED Tue and Wed. Those are your only two Gorge nights, so it is off this trip. Question closed.", booked: true },
    { text: "Check fire ban status, both parks" },
    { text: "⚠️ No visitor center Thursday — you arrive after 5 PM ET. Divide Road and Honey Creek are field calls now." },
    { text: "Divide Road / Twin Arches: drive it slow, turn around the moment it stops being maintained gravel" },
    { text: "~Sept 12: first forecast that reaches Sept 22. ~Sept 16: first forecast that reaches Honey Creek Saturday." },
    { text: "Sat: no Honey Creek after rain. Be willing to swap it with Friday." },
    { text: "Download offline Google Maps regions AND AllTrails/Gaia trail maps — before leaving home" },
    { text: "Load the Honey Creek GPX. Not optional." },
    { text: "Text the trip plan home, including Saturday's Honey Creek window" },
    { text: "Morning of departure: re-check Tunnel Ridge Road — Cumberland District, 606-784-6428" },
  ],

  openQuestions: [
    {
      question: "Angel Falls: does the trail give you a clifftop overlook, a riverside rapid, or both?",
      blocks: "Nothing — the hike happens either way",
      detail:
        "AllTrails' curated description for Angel Falls Trail runs both together: a 180° panoramic vista reached through an aperture in the rock, <i>and</i> a continuation below the overlook arriving at boulders where the rapids run. The measured stats — <b>3.7 mi, 200 ft, Easy, 76 min moving</b> — say river-level, because 200 ft of gain over 3.7 miles is not a clifftop route. I have not resolved which the marked trail from Leatherwood Ford actually delivers and I am not going to guess. Ask at Bandy Creek, or just walk it and find out. Either answer is a good Thursday evening.",
    },
    {
      question: "Visitor center or Angel Falls? You cannot have both on Thursday.",
      blocks: "Day 3 — decided, but reversible",
      detail:
        "Bandy Creek Visitor Center is 9–5 ET. Stopping at Leatherwood Ford on the way in puts you at camp around 6:00, so you miss it. <b>Taken deliberately</b>, because the two things the plan wanted to ask a ranger are already decided: Divide Road is a drive-it-and-turn-around-if-rough call, and Honey Creek is off if it rains. If you would rather have the ranger's read on the forest road, flip it — camp first Thursday, and Angel Falls becomes a Saturday afternoon hike after Honey Creek. It is flat and 10 minutes from the campground, so it survives tired legs.",
    },
    {
      question: "Wednesday afternoon: Creation Falls, or Silvermine Arch from the tent?",
      blocks: "Day 2 — decided, but it's close",
      detail:
        "<b>Creation Falls is scheduled.</b> It is the better destination — the only arch in the Gorge that spans water, 4.8★, and AllTrails tags the trail with a <i>beach</i>, meaning the creek shelf you would sit on. The cost is 35 minutes of driving each way for 42 minutes of walking.<br><br><b>Silvermine Arch</b> is the alternative and it is a genuinely close call: <b>3.0 mi out-and-back, 393 ft, 76 min, 4.6★</b>, arch plus rock shelter, and it leaves <i>straight from Koomer Ridge</i> — zero driving, more walking. Better ratio, lesser destination. The tiebreaker was that 35 minutes through the Gorge after four hours of laptop in a tent reads as decompression rather than commuting.",
    },
    {
      question: "Print the confirmations before you leave.",
      blocks: "Nothing — both sites are confirmed",
      detail:
        "Koomer Ridge <b>0822210215-1</b> (2 nights) and Bandy Creek <b>0895576747-1</b> (3 nights), both booked through recreation.gov on Sept 1. Cell service is limited to none at both campgrounds — carry paper.",
    },
    {
      question: "The forecast does not reach your dates yet. Two dates to check.",
      blocks: "Day 5 — Honey Creek is the weather-dependent one",
      detail:
        "The 10-day forecast currently reaches about Sept 16. <b>First real look at Sept 22 is around Sept 12; first look at Saturday Sept 26 is around Sept 16.</b> That second one is the load-bearing date — the rule is no Honey Creek after rain, and a rule you cannot act on is not a rule. Until then the page carries climate normals (75–77°F highs), not a forecast.",
    },
  ],

  places: [
    {
      group: "Red River Gorge",
      items: [
        { name: "Koomer Ridge Campground", maps: "Koomer Ridge Campground Slade KY", note: "Nights 1–2. Walk-in tent site." },
        { name: "Nada Tunnel", maps: "Nada Tunnel Red River Gorge KY", note: "One lane, 900 ft, hand-cut 1910–11" },
        { name: "Princess Arch Trailhead", maps: "Princess Arch Trailhead Red River Gorge", note: "The KY 715 overlook cluster" },
        { name: "Auxier Ridge Trailhead", maps: "Auxier Ridge Trailhead Red River Gorge", note: "Via Tunnel Ridge Rd. Wednesday's dark start." },
        { name: "Gray's Arch Picnic Area", maps: "Grays Arch Picnic Area Red River Gorge", note: "Thursday morning" },
        { name: "Chimney Top Rock", maps: "Chimney Top Rock Red River Gorge", note: "✅ Tuesday sunset. Faces W/NW — confirmed." },
        { name: "Silvermine Arch Trailhead", maps: "Silvermine Arch Trailhead Koomer Ridge KY", note: "⭐ Leaves from Koomer Ridge. 3.0 mi out-and-back, arch + rock shelter. Unscheduled — the standby if plans move." },
        { name: "Sky Bridge", maps: "Sky Bridge Red River Gorge KY", note: "Cut — faces E/SE, wrong light for an evening" },
        { name: "Rock Bridge Recreation Area", maps: "Rock Bridge Recreation Area Red River Gorge", note: "The only arch spanning water" },
        { name: "Miguel's Pizza", maps: "Miguels Pizza Slade KY", note: "✅ 7:00 AM–9:45 PM. Build your own, 45 toppings." },
        { name: "Red River Rockhouse", maps: "Red River Rockhouse Campton KY", note: "⚠️ 12–9 PM, CLOSED Tue + Wed — your only two Gorge nights. Off this trip. Next time." },
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
        { name: "East Rim Trailhead", maps: "East Rim Trailhead Big South Fork", note: "Sunset Overlook — <b>Friday</b> now, not Thursday. No railings." },
        { name: "Twin Arches Trailhead", maps: "Twin Arches Trailhead Big South Fork", note: "5 unpaved miles off Divide Road" },
        { name: "Sawmill Trailhead", maps: "Sawmill Trailhead Big South Fork", note: "Slave Falls + Needle Arch" },
        { name: "John Litton Farm Loop", maps: "John Litton Farm Loop Big South Fork", note: "Cut from Friday. Trailhead is at Bandy Creek if the day opens up." },
        { name: "Honey Creek Trailhead", maps: "Honey Creek Trailhead Big South Fork", note: "Small lot ~1 mi before the road ends" },
        { name: "Honey Creek Overlook", maps: "Honey Creek Overlook Big South Fork", note: "Drive the last mile up" },
        { name: "⭐ Leatherwood Ford / Angel Falls TH", maps: "Leatherwood Ford Big South Fork", note: "Thursday, on the way in. TN 297, 15 min short of camp. 3.7 mi flat river walk to the rapids." },
      ],
    },
    {
      group: "The drive home",
      items: [
        { name: "Blue Heron Mining Community", maps: "Blue Heron Mining Community Stearns KY", note: "Free, self-guided ghost structures" },
        { name: "Devil's Jump Overlook", maps: "Devils Jump Overlook Big South Fork", note: "0.1 mi, paved" },
        { name: "The Whistle Stop", maps: "The Whistle Stop Stearns KY", note: "Opens 11:00 Sunday. Fried green tomatoes." },
        { name: "Yahoo Falls", maps: "Yahoo Falls Kentucky", note: "Declined — 40 min of driving for a 30 min walk on an 8-hour driving day." },
      ],
    },
  ],
  placesNote:
    "The field tab. Every entry opens a Google Maps search rather than dropping a pin — a query works with your downloaded offline region, and it doesn't depend on a coordinate anyone guessed.",
  offlineRegions:
    "Two Google Maps regions: <b>Slade–Stanton–Campton</b> and <b>Oneida–Stearns–Jamestown</b>. ⚠️ Google Maps offline does not include trails — download AllTrails or Gaia separately, and the <b>Honey Creek GPX is not optional</b>. Cell service is limited to none at both campgrounds.",

  notes: [
    {
      heading: "The shape every day now has",
      body:
        "Two rules were applied to the whole itinerary and they reorganised three days.<br><br><b>One: hike out, sit up to an hour, hike back.</b> The destination has to be worth sitting at — a lookout, a river shelf, a waterfall, a rock shelter. Measured against that, the plan was already half right: Auxier Ridge at dawn, Chimney Top at sunset and the East Rim overlook are all textbook. Friday was the opposite — 12.3 miles across three trailheads with nowhere to stop.<br><br><b>Two: one outing per day.</b> No returning to camp mid-day unless the reason earns it, and a trailhead you can walk to from the tent doesn't count as a return. Only two days broke this. Wednesday's mid-day return is the lecture, which is not negotiable. Thursday's was real: arrive at an unfamiliar bear-country campground, set up, leave again for an unfenced clifftop, walk back in the dark on night one.<br><br>The Thursday fix turned out to be geography nobody had checked. AllTrails' directions for Angel Falls read <i>\"from Oneida, take TN 297 west 10 miles to Leatherwood Ford\"</i> — that is the road you drive in on, and Leatherwood Ford sits fifteen minutes short of Bandy Creek. So Angel Falls is not an evening trip out from camp. It is a stop on the way in, and the rim sunset moves to Friday for the price of two minutes of daylight.",
    },
    {
      heading: "What came off, and what it cost",
      body:
        "<b>Sky Bridge (Wed).</b> A third stop and a fourth drive leg on a day with a 5:45 wake and four hours of laptop in it. It also faces E/SE, so the evening light was never going to work. Wednesday afternoon is now one hike and a full hour on the creek shelf at Creation Falls.<br><br><b>John Litton Farm Loop (Fri).</b> The expensive one, and worth being honest about. It <i>is</i> in AllTrails, under <i>John Litton Farm Loop</i> — 5.7 mi, 465 ft, 2h 07m moving, 4.6★, with caves, Fall Branch Falls and the farmstead on it, and a trailhead at Bandy Creek that costs no driving at all. The page previously said it wasn't listed and budgeted 3h 15m, an hour heavy. It came off anyway: 11+ miles the day before a six-hour rope-and-ladder scramble, with none of those miles ending anywhere you'd sit. You traded a good loop for an evening on the rim.<br><br><b>Yahoo Falls (Sun).</b> Declined outright — 40 minutes of driving for a 30-minute walk on a day that is already eight hours of highway.<br><br><b>Red River Rockhouse.</b> Not a cut, a closure: 12–9 PM, shut Tuesday and Wednesday, which are the only two nights in the Gorge. There is no version of this trip that reaches it. The open question is closed rather than left hanging.",
    },
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
      heading: "Thursday was the day that broke. Then Friday. Both are fixed.",
      body:
        "The source file called Friday the uncertain day and gave Thursday no slack line at all. By the numbers Thursday was the heavier one — 14h 35m door to tent, nine miles on foot, and a first arrival at a bear-country campground that got set up and immediately abandoned for a sunset hike returning in the dark.<br><br>The fix turned out to be a data problem, not a scheduling one. <b>Gray's Arch is five different routes.</b> AllTrails carries a 2.5 mi out-and-back, a 3.8 mi Pinch Em Tight loop, a 4.8 mi long loop, a 6.1 mi Rough/Martin's Fork loop and a 7.8 mi Rough Trail loop. The plan's \"~6.5 mi\" had landed on one of the long ones without anyone choosing it. Taking the 2.5 mi out-and-back — which still reaches the arch, and still requires the Rough Trail turn most people miss — cuts 1h 45m and four miles, moves wake-up from 6:00 to 7:30, and gets you to Bandy Creek in daylight.<br><br>Thursday is now about twelve hours door to tent, ends at 7:30 PM instead of 8:20, and no longer contains a second outing at all.<br><br><b>Friday inherited the problem and has now been fixed too.</b> Slave Falls measured 4.4 mi against an estimated 3.0, and Twin Arches turned out to be a <b>1.1 mi short loop</b> rather than the 2 mi the plan carried — so the day was 11.2 miles across three trailheads, not the 12.3 first calculated. Either way it was over the ceiling the day before Honey Creek. Cutting John Litton drops it to <b>8.1 miles across two trailheads</b>, with a two-and-three-quarter-hour hole in the middle for a shower and an early dinner, and the rim at sunset on the back end. Camp sits between Divide Road and the East Rim, so the mid-day stop costs about fifteen minutes of driving rather than a round trip — which is why it survives the one-outing rule.",
    },
    {
      heading: "Everything is now cross-checked, and two things moved",
      body:
        "Nine of nineteen stats in the source file were flagged as unverified estimates. All of them have now been checked against AllTrails and the two that mattered both moved. <b>Gray's Arch</b> was never a single trail — five routes share the name and the plan had accidentally budgeted four hours for one of the longest. <b>Honey Creek's elevation gain is 820 ft, not 571</b> — confirmed, and over 4.6 miles rather than the 5.5–6.0 the plan assumed, which makes it a steeper day than it read on paper. Both sources still independently say an hour per mile, so the six-hour budget stands.<br><br>Smaller corrections: Slave Falls is 4.4 mi not 3.0; the Twin Arches full loop is 5.1 mi against the 2 mi spur in the plan; Sunset Overlook is 51 minutes of walking, so most of that block is sitting on the rim. Everything on Days 1 and 2 confirmed within a tenth of a mile.<br><br>And the aspect question is closed: <b>Chimney Top faces west/northwest and is the sunset spot; Sky Bridge faces east/southeast and is a sunrise one.</b> Sky Bridge stays on Wednesday evening because walking over the top and then underneath is the point, but it will not give you the sunset the plan implied.",
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
        "Oneida and Jamestown are chains. Bandy Creek has potable water and free hot showers, which is exactly why Saturday's ribeye dinner is scheduled there — high cleanup is only allowed where there's water. Fayetteville does the opposite job in October, eating five restaurant slots in three days. Here, the good meals are front-loaded in the Gorge: Sky Bridge Station and The Brick on Tuesday, Miguel's on Thursday (✅ open 7:00 AM–9:45 PM, so the 10:35 arrival is safe).<br><br><b>Red River Rockhouse is settled and the answer is no.</b> Local sources call it the best food at the Red — but it runs 12–9 PM and closes Tuesday and Wednesday, which are precisely the two nights you are in the Gorge. Thursday you are on the road south by 12:20. Reaching it would cost the resupply and an hour of the transfer drive for a cheeseburger. It goes on the next-time list, not this one.",
    },
  ],

  waypoints: [
    { name: "Koomer Ridge Campground", lat: 37.784032, lng: -83.632634, verified: true, icon: "⛺", days: "1–2", notes: "Walk-in tent site", source: "Recreation.gov facility 10311270 (RIDB bulk export)" },
    { name: "Auxier Ridge Trailhead", lat: 37.828230, lng: -83.677587, verified: true, icon: "🌄", days: "2", notes: "Via Tunnel Ridge Rd", source: "OSM way 225745556, footway at the Tunnel Ridge Rd lot" },
    { name: "Gray's Arch Picnic Area", lat: 37.807934, lng: -83.657265, verified: true, icon: "🥾", days: "3", notes: "", source: "Checked on satellite imagery; Tunnel Ridge Road parking area" },
    { name: "Leatherwood Ford / Angel Falls TH", lat: null, lng: null, verified: false, icon: "🏞️", days: "3", notes: "On TN 297, ~15 min short of camp — Thursday's stop on the drive in" },
    { name: "Bandy Creek Campground", lat: 36.488329, lng: -84.697519, verified: true, icon: "⛺", days: "3–5", notes: "Bear country", source: "Recreation.gov facility 232506, agreeing with OSM node 13121679831 to 36 m" },
    { name: "Twin Arches Trailhead", lat: 36.541700, lng: -84.735700, verified: true, icon: "🪨", days: "4", notes: "5 unpaved miles", source: "OSM node 12269314919, Big South Fork — not the same-named arch in Red River Gorge" },
    { name: "Honey Creek Trailhead", lat: 36.421268, lng: -84.651813, verified: true, icon: "🪜", days: "5", notes: "Small lot ~1 mi before road end", source: "Checked on satellite imagery; matches OSM node 3373114451, amenity=parking, to 7 m" },
    { name: "Blue Heron Mining Community", lat: 36.678056, lng: -84.518889, verified: true, icon: "🏚️", days: "6", notes: "", source: "Recreation.gov facility 232505 (RIDB bulk export)" },
  ],
  map: { center: [37.0, -84.2], zoom: 8 },
};
