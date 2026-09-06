/* ==========================================================================
   Sky Islands — SE Arizona, March 5–15 2027.  STATUS: OUTLINE.

   Built 2026-09-06 from the `sky-islands` wishlist entry plus a verification
   pass. Nothing was pasted in; there was no upstream brief, so every fact
   here started as unverified and had to be earned.

   THE WINDOW: computed, not chosen. Spring 2027 runs Tue/Thu classes with
   spring break Mar 8–12. Last class Thu Mar 4, first class back Tue Mar 16.
   Fri Mar 5 → Mon Mar 15 is 11 days at a cost of zero missed classes, and
   it is the only window of that length before Commencement.

   VERIFIED THIS SESSION (operator's own pages, via search):
     - Chiricahua NM charges NO entrance fee (nps.gov)
     - Bonita Canyon: year-round, all sites reservable, 6-month rolling
     - Rustler Park + FR 42D: closed ~Nov–March, road not plowed
     - Sunny Flat: year-round, first-come, POTABLE WATER OFF UNTIL APRIL
     - Cochise Stronghold: $20, first-come, 11 sites, NO drinking water
     - Fort Bowie: grounds sunrise–sunset daily; visitor center Wed–Sun only
     - Gilbert Ray: reservation-only, Sept 1–Apr 30, $10/night tent
   CALCULATED:
     - Every sunrise / sunset / twilight time below (tools/sun.mjs, NOAA)
     - New moon falls Mar 7–8 2027
   FROM ALLTRAILS:
     - Every hike distance, gain and time in the Hikes tab
   CLIMATE (AccuWeather, Willcox AZ station, 4,167 ft):
     - Mar 5–15 normals: low 46–48°F, high 72–74°F. 2026 actuals ran
       40–56 / 64–89. Camp elevations are 800–1,200 ft higher, so the
       figures below are lapse-rate estimates, not station data.
   COULD NOT VERIFY:
     - Cave Creek campground FEES. An aggregator gave "$8–40", which is not
       a number. Douglas Ranger District (520) 364-3468.
     - Whether Bonita Canyon is 23 or 26 sites — two sources disagree — and
       whether the $20 fee has gone to the proposed $25.
     - Whether Bonita Canyon Drive to Massai Point ever closes for snow.
     - EVERY COORDINATE. tools/geocode.mjs was run and returned NONE for all
       15 waypoints: overpass-api.de and nominatim.openstreetmap.org are both
       blocked by this environment's egress policy (HTTP 403, host not in
       allowlist), and no RIDB_DATA / RIDB_API_KEY / NPS_API_KEY is set. So
       there was no provider to agree with anything. Every waypoint is
       verified:false with null coordinates and the Map tab falls back to the
       Places list, which is the correct outcome rather than a gap.
     - Drive times are Google-style estimates + 15%, unconfirmed.
   ========================================================================== */

window.TRIP_DATA = {
  meta: {
    slug: "sky-islands-2027",
    title: "Sky Islands",
    subtitle: "Solo · Tucson → the Dragoons → Chiricahua → Cave Creek → Tucson",
    dates: "Friday, March 5 – Monday, March 15, 2027",
    emoji: "🌵",
    theme: "desert",

    route:
      "A clockwise loop out of Tucson: Saguaro West → Cochise Stronghold (Dragoons) → Chiricahua National Monument from the Willcox side → <b>north around the range via I-10</b> → Cave Creek Canyon at Portal → back to Tucson through Douglas and Bisbee. <b>No road is driven twice.</b> The one road that would shorten it — FR 42 over Onion Saddle, straight through the Chiricahuas — is the road you cannot use. See the warnings.",
    vehicle:
      "Rental from Tucson. <b>Standard clearance is fine for the loop as planned.</b> Two trailhead approaches are the open question rather than the highways: Slavin Gulch and the Cochise Stronghold spur. Under-25 surcharge applies — check whether AAA still waives it <i>before</i> paying it at the counter.",
    gettingThere:
      "CLE → TUS round trip, Fri Mar 5 out and Mon Mar 15 back. <b>Not priced.</b> Spring break is the most expensive fortnight of the year to fly into Tucson and no fare has been checked, which makes the budget below incomplete by its single largest line.",

    stats: [
      { num: "11 days", lbl: "Length" },
      { num: "~700 mi", lbl: "Driving" },
      { num: "10", lbl: "Nights camping" },
      { num: "~52 mi", lbl: "On foot" },
    ],

    overviewCards: [
      { h: "Dates", p: "Mar 5–15, 2027<br>11 days / 10 nights" },
      { h: "Group", p: "Solo. One person, one tent, one portion." },
      { h: "Why this window", p: "Computed from the academic calendar, not picked. Tue/Thu classes, spring break Mar 8–12. <b>Zero missed classes</b>, and the only 11-day window before Commencement." },
      { h: "The booking race", p: "<b>Bonita Canyon is the whole plan and it is 23–26 sites on a 6-month rolling window.</b> March 5 released around Sept 5 2026. Every later night releases one day at a time. It is the busiest month of its year." },
      { h: "The crowd problem", p: "March is Chiricahua's peak month and the profile says crowds are actively avoided. <b>This itinerary answers that by spending 3 nights in the monument and 4 on the empty side of the range</b> — Cave Creek and the Dragoons are the same geology with a fraction of the people." },
      { h: "No entrance fee", p: "✅ Chiricahua National Monument charges <b>no entrance fee</b> — it was eliminated when the campground moved to reservations. The America the Beautiful pass does nothing here. It is not needed." },
      { h: "Time zone", p: "Arizona does <b>not</b> observe daylight saving. DST starts Sun Mar 14 2027 — the clock at camp does not move, but every connecting flight time and everyone at home shifts an hour relative to you." },
      { h: "Water", p: "<b>Two of the four campgrounds have no drinking water in March.</b> Cochise Stronghold has none ever; Sunny Flat's is off until April. This is a haul-your-own trip for 4 of 10 nights." },
    ],

    footerNote:
      'Outline. Campgrounds and closures are verified; fees, coordinates and airfare are not. <a href="../../index.html">← All trips</a>',
  },

  days: [
    {
      day: 1,
      date: "Fri Mar 5, 2027",
      title: "Land in the Saguaros",
      tagline: "Fly, provision, and get the tent up before the light goes.",
      type: "travel",
      driving: "~40 min from TUS",
      slack: "Generous. Everything after the grocery stop is optional and Signal Hill is 0.5 mi round trip.",
      overnight: {
        name: "Gilbert Ray Campground",
        place: "Tucson Mountain Park",
        kind: "County campground",
        cost: "$10/night (tent)",
        checkin: "TBD — confirm office hours and after-hours arrival",
        confirmation: "TBD",
        notes: "✅ <b>Reservation-only</b> since 2024, open Sept 1 – Apr 30. $10 tent / $20 RV. Satisfies the fly-in rule that night one is reservable. Bordered by Tucson Mountain Park, minutes from Saguaro West.",
      },
      schedule: [
        { kind: "travel", time: "morning", text: "CLE → TUS. <b>Fare not priced.</b> Book the car at the same time and check AAA against the under-25 surcharge first." },
        { kind: "stop", time: "+45m", est: "45m", text: "Pick up the car. <b>Do not buy the counter collision product before checking whether the credit card already covers it.</b>", warn: true },
        { kind: "stop", time: "+1h", est: "60m", text: "<b>Provision in Tucson.</b> This is the last full-size grocery until Willcox on Day 4 — and Portal, on Days 8–10, has effectively none. Buy the fuel canisters here; they cannot fly.", maps: "Fry's Food and Drug Tucson AZ" },
        { kind: "drive", time: "+2h", est: "40m", text: "→ Gilbert Ray Campground, Tucson Mountain Park.", maps: "Gilbert Ray Campground Tucson AZ" },
        { kind: "stop", time: "+2h 40m", est: "45m", text: "Check in, pitch, sort the cooler. Fill every water container — the next three campgrounds range from unreliable to nonexistent on water." },
        { kind: "hike", time: "late afternoon", est: "45m", text: "<b>Signal Hill petroglyphs</b>, Saguaro West — roughly 0.5 mi round trip to a boulder field of Hohokam petroglyphs. A short walk that is a destination, which is what arrival day wants.", maps: "Signal Hill Petroglyphs Saguaro National Park" },
        { kind: "sunset", time: "6:29 PM", text: "Sunset. Dark 6:49 PM. Waning crescent, 5.6% — effectively no moon all week." },
      ],
      meals: { b: "home / airport", l: "bought — airport or Tucson", d: "made at camp — first night, keep it to one pan" },
      highlights:
        "Petroglyphs on a boulder field with the Tucson Mountains behind them, half an hour after pitching the tent. Arrival day does not need to be more than this.",
      warnings:
        "Fill water containers tonight. Cochise Stronghold on Day 3 has <b>no drinking water at all</b> and Sunny Flat on Days 7–9 has it shut off until April. This is the last easy fill until Willcox.",
    },
    {
      day: 2,
      date: "Sat Mar 6, 2027",
      title: "Wasson Peak the Long Way",
      tagline: "A loop over the high point of the Tucson Mountains, through a mine on the way down.",
      type: "activity",
      driving: "~25 min each way",
      slack: "About 2 hours. The loop is the only thing today; if it runs long nothing else suffers.",
      overnight: {
        name: "Gilbert Ray Campground",
        place: "Tucson Mountain Park",
        kind: "County campground",
        cost: "$10/night (tent)",
        checkin: "n/a — night 2 of 2",
        confirmation: "TBD",
        notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "6:42 AM", text: "Sunrise. First light 6:21 AM — be at the trailhead for it." },
        { kind: "drive", time: "6:00 → 6:25", est: "25m", text: "→ King Canyon Trailhead, across from the Arizona-Sonora Desert Museum.", maps: "King Canyon Trailhead Saguaro National Park West" },
        { kind: "hike", time: "6:30 → 11:30", est: "5h", text: "<b>Wasson Peak via King Canyon, Hugh Norris and Gould Mine.</b> ✅ AllTrails: <b>7.8 mi, 1,853 ft, loop, Moderate.</b> The ridge walk on Hugh Norris is the reason to do it this direction, and <b>Gould Mine</b> comes on the way down — a worked copper site, so the ruins land at the end when you want an excuse to stop.", maps: "Wasson Peak Saguaro National Park" },
        { kind: "stop", time: "11:30 → 12:30", est: "60m", text: "Sit somewhere on the descent. The summit is the obvious spot but it is Saturday of spring break — take the hour lower down where nobody is." },
        { kind: "drive", time: "12:45 → 1:10", est: "25m", text: "→ camp. Afternoon off, deliberately: tomorrow starts a run of five days with no shower and no reliable water." },
        { kind: "sunset", time: "6:30 PM", text: "Sunset. Dark 6:50 PM. New moon tomorrow." },
      ],
      meals: { b: "made — hot, before first light", l: "packed — eaten on the ridge", d: "made at camp" },
      highlights:
        "Nearly 2,000 ft of gain through saguaro forest to the top of the range, then down through a copper mine. It is the only day of the trip where the walk is the entire plan.",
      warnings:
        "Saturday of spring break at a national park 25 minutes from a city. <b>The King Canyon lot is small.</b> Being on the trail by first light is the difference between parking and driving away — this is exactly the case the dawn-start rule exists for.",
    },
    {
      day: 3,
      date: "Sun Mar 7, 2027",
      title: "Into the Granite",
      tagline: "East to the Dragoons, and the first camp with no water in it.",
      type: "travel + activity",
      driving: "~1h 50m",
      slack: "Loose. Rockfellow Dome is short and the rest of the day is making camp.",
      noSignal: "Patchy from the Sunsites turnoff into Cochise Stronghold, and effectively none at the campground. All night.",
      overnight: {
        name: "Cochise Stronghold Campground",
        place: "Dragoon Mountains, Coronado NF",
        kind: "USFS campground — first come, first served",
        cost: "$20/night (single site)",
        checkin: "No office. Self-serve.",
        confirmation: "None possible — FCFS",
        notes: "✅ Verified: 5,000 ft, <b>11 individual sites</b>, first come first served, $20 single / $40 double, grills, fire pits, vault toilets. <b>NO DRINKING WATER — bring plenty.</b> Closed Jun 1 – Aug 31, so March is in season. Douglas Ranger District (520) 364-3468.",
      },
      schedule: [
        { kind: "sunrise", time: "6:40 AM", text: "Sunrise at Gilbert Ray. Break camp." },
        { kind: "drive", time: "7:30 → 9:20", est: "1h 50m", text: "→ Cochise Stronghold via I-10 east and Sunsites. <b>Top up water and fuel in Benson or Sunsites</b> — the campground has neither.", maps: "Cochise Stronghold Campground Arizona", warn: true },
        { kind: "stop", time: "9:20 → 10:15", est: "55m", text: "<b>Take a site early.</b> Eleven sites, first-come, on the Sunday of spring break. Drive the loop once from the top and take the first acceptable one. Named fallback if it is full: dispersed on the forest road below, or push on to Bonita Canyon a day early." },
        { kind: "hike", time: "10:30 → 12:30", est: "2h", text: "<b>Rockfellow Dome Trail.</b> ✅ AllTrails: <b>2.0 mi, 1,108 ft, Hard, out-and-back.</b> Steep for its length. The Rockfellow group is the best of the Dragoon granite and this is the short way to stand under it.", maps: "Rockfellow Dome Trail Cochise Stronghold" },
        { kind: "stop", time: "12:30 → 1:30", est: "60m", text: "Sit under the domes. This is the hike-out-sit-hike-back shape and the Dragoons are built for it." },
        { kind: "stop", time: "afternoon", text: "Camp. Read the Stronghold's history — this is where Cochise held out and where he is buried, location unmarked and deliberately unrecorded." },
        { kind: "sunset", time: "6:25 PM", text: "Sunset. Dark 6:44 PM. <b>New moon.</b>" },
      ],
      meals: { b: "made at camp", l: "packed", d: "made — low-water cleanup, this camp has none" },
      highlights:
        "1.4-billion-year-old granite weathered into domes and hoodoos, and the natural fortress a whole people held against the US Army for a decade. It is a ruin with no structures in it.",
      warnings:
        "<b>No drinking water at this campground, at all, ever.</b> You need everything for the night plus tomorrow's hike in the car before you leave Sunsites. Eleven sites, first-come, on a spring-break Sunday — have the fallback decided before you turn off the highway, not at the campground entrance.",
    },
    {
      day: 4,
      date: "Mon Mar 8, 2027",
      title: "Slavin's Mine, Then the Hoodoos",
      tagline: "A canyon full of mining wreckage in the morning, a reserved site by dark.",
      type: "activity + drive",
      driving: "~1h 40m total",
      slack: "About 90 minutes. Slavin Gulch is the cut if the approach road turns out to be worse than expected.",
      overnight: {
        name: "Bonita Canyon Campground",
        place: "Chiricahua National Monument",
        kind: "National monument campground",
        cost: "$20/night — ⚠️ a rise to $25 was proposed; verify",
        checkin: "Reservation-only. Confirm the arrival cutoff.",
        confirmation: "TBD — recreation.gov, 6-month rolling window",
        notes: "✅ Verified: ~5,400 ft, open year-round, <b>every site reservable, none first-come</b>, 6-month rolling window. ⚠️ Two sources disagree on whether it is 23 or 26 sites. Feb–April is its busiest season and it is <b>full most nights</b>. There is no walk-up fallback inside the monument.",
      },
      schedule: [
        { kind: "sunrise", time: "6:30 AM", text: "Sunrise. First light 6:11 AM." },
        { kind: "drive", time: "6:00 → 6:35", est: "35m", text: "→ Slavin Gulch trailhead, east side of the Dragoons. ⚠️ <b>The approach is a forest road and its condition is not verified.</b> Turn around if it stops being something a low air dam can take — the hike is not worth the oil pan.", warn: true },
        { kind: "hike", time: "6:45 → 10:15", est: "3h 30m", text: "<b>Slavin Gulch to Slavin's Mine.</b> ✅ AllTrails: <b>6.9 mi, 1,407 ft, Moderate, out-and-back.</b> Ends at the timbers and tailings of an abandoned mine wedged in the canyon. Ruins as scenery, and almost nobody walks it.", maps: "Slavin Gulch Trailhead Dragoon Mountains" },
        { kind: "stop", time: "10:15 → 11:00", est: "45m", text: "Sit at the mine workings before turning around." },
        { kind: "drive", time: "12:00 → 1:05", est: "1h 05m", text: "→ Chiricahua National Monument via Sunsites and Sunizona. Fill water and top up groceries at <b>Willcox</b> if the detour north makes sense; otherwise this is the last chance before Portal.", maps: "Chiricahua National Monument Visitor Center" },
        { kind: "stop", time: "1:05 → 2:00", est: "55m", text: "Check in at Bonita Canyon and pitch. <b>No entrance fee</b> — the monument eliminated it." },
        { kind: "hike", time: "2:30 → 3:40", est: "1h 10m", text: "<b>Sugarloaf Mountain.</b> ✅ AllTrails: <b>1.9 mi, 492 ft, Moderate, out-and-back.</b> The highest point you can drive most of the way to, and the orientation hike for the next two days — everything you are going to walk is visible from the top.", maps: "Sugarloaf Mountain Trailhead Chiricahua" },
        { kind: "sunset", time: "6:25 PM", text: "Sunset. Dark 6:44 PM. New moon, 0.3%." },
      ],
      meals: { b: "made at camp", l: "packed — eaten at the mine", d: "made at camp" },
      highlights:
        "The clearest single day of the trip: a mine at the head of a canyon in the morning, and the hoodoo country laid out below you from Sugarloaf in the afternoon.",
      warnings:
        "<b>The Slavin Gulch approach road is unverified and this car has 5.9 inches of clearance and a low front air dam.</b> Decide the turnaround at the road, before committing. If it is out, Cochise Trail #279 (9.4 mi, 1,883 ft) leaves from the campground itself and needs no driving at all.",
    },
    {
      day: 5,
      date: "Tue Mar 9, 2027",
      title: "Echo Canyon at First Light",
      tagline: "The grottoes and the hoodoo corridor, walked before the lot fills.",
      type: "activity",
      driving: "~20 min each way",
      slack: "Large. Echo Canyon is under two hours and the rest of the day is yours.",
      overnight: {
        name: "Bonita Canyon Campground",
        place: "Chiricahua National Monument",
        kind: "National monument campground",
        cost: "$20/night (verify)",
        checkin: "n/a — night 2 of 3",
        confirmation: "TBD",
        notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "6:29 AM", text: "Sunrise. First light 6:10 AM." },
        { kind: "drive", time: "6:00 → 6:20", est: "20m", text: "→ Echo Canyon trailhead, about 7 miles up Bonita Canyon Drive. ⚠️ <b>Whether this road ever closes for snow in early March is NOT confirmed.</b> Ask at the visitor center on arrival, not the morning of.", maps: "Echo Canyon Trailhead Chiricahua National Monument", warn: true },
        { kind: "hike", time: "6:30 → 8:30", est: "2h", text: "<b>Echo Canyon Loop.</b> ✅ AllTrails: <b>3.4 mi, 561 ft, Moderate, loop, ~94 min.</b> The grottoes are the thing — a corridor where the rhyolite columns close overhead into something between a slot and a cave. Rated 4.9, which is not nothing for a 3-mile walk.", maps: "Echo Canyon Loop Chiricahua" },
        { kind: "stop", time: "8:30 → 9:30", est: "60m", text: "Sit in the grottoes. You will have them, at this hour, in a way you absolutely will not at 11." },
        { kind: "drive", time: "9:45 → 10:00", est: "15m", text: "→ Massai Point, the end of the road at 6,870 ft." },
        { kind: "stop", time: "10:00 → 11:00", est: "60m", text: "<b>Massai Point.</b> The overlook and the short nature trail. This is where the caldera makes sense as a landform rather than a fact — the whole hoodoo field is welded ash from the Turkey Creek eruption and you can see the shape of it from here.", maps: "Massai Point Chiricahua National Monument" },
        { kind: "stop", time: "afternoon", text: "Camp. Deliberate half-day: tomorrow is the big one." },
        { kind: "sunset", time: "6:26 PM", text: "Sunset. Dark 6:45 PM." },
      ],
      meals: { b: "made — before first light", l: "made at camp", d: "made at camp" },
      highlights:
        "Echo Canyon's grottoes at dawn with nobody in them. The whole argument for a 6:30 start in a park that is full by 10 is contained in this one morning.",
      warnings:
        "The Echo Canyon lot is the smallest and most-wanted parking in the monument and this is peak season. There is no overflow. If it is full at 6:30 something has gone very wrong, but the fallback is to start from the visitor center instead and walk up.",
    },
    {
      day: 6,
      date: "Wed Mar 10, 2027",
      title: "Heart of Rocks",
      tagline: "The long loop through the balanced rocks — on a Wednesday, on purpose.",
      type: "activity",
      driving: "None — leaves from the visitor center",
      slack: "Thin by design. This is the biggest day and it has the whole day.",
      overnight: {
        name: "Bonita Canyon Campground",
        place: "Chiricahua National Monument",
        kind: "National monument campground",
        cost: "$20/night (verify)",
        checkin: "n/a — night 3 of 3",
        confirmation: "TBD",
        notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "6:28 AM", text: "Sunrise. First light 6:09 AM." },
        { kind: "hike", time: "6:15 → 12:15", est: "6h", text: "<b>Heart of Rocks Loop from the Visitor Center.</b> ✅ AllTrails: <b>6.9 mi, 1,597 ft, Moderate, loop, ~219 min moving.</b> Six hours is the moving time plus the sitting. Well inside the ~10 mi / 2,500 ft ceiling, which is why this version is the pick over the 7.3-mile Massai Point variant — it also starts at camp, so the day needs no driving at all.", maps: "Heart of Rocks Loop Chiricahua National Monument" },
        { kind: "stop", time: "in the middle", est: "60m", text: "<b>Sit in the Heart of Rocks itself.</b> Punch and Judy, the Big Balanced Rock, Duck on a Rock. This is the hour the day is for." },
        { kind: "stop", time: "12:30 → 1:30", est: "60m", text: "Back at camp. Eat, lie down." },
        { kind: "stop", time: "2:00 → 3:30", est: "1h 30m", text: "<b>Visitor center and Faraway Ranch.</b> Ask them three things: whether Bonita Canyon Drive has closed for snow this season, current road status for Cave Creek from the north, and what the water situation actually is at Sunny Flat this week.", maps: "Faraway Ranch Chiricahua National Monument" },
        { kind: "sunset", time: "6:27 PM", text: "Sunset. Dark 6:46 PM. Waxing crescent 6.8%." },
      ],
      meals: { b: "made — before first light", l: "packed — eaten in the Heart of Rocks", d: "made at camp" },
      highlights:
        "The reason the monument exists. A 6.9-mile loop through a forest of balanced rhyolite columns, walked mid-week while everyone else is doing it on the weekend.",
      warnings:
        "Longest day of the trip at 6.9 mi / 1,597 ft. Hard turnaround: <b>if you are not at the Heart of Rocks spur by 10:00 AM, skip the spur and take the loop back.</b> There is no water on the loop — carry it all. The upper section holds ice in shade well into March.",
    },
    {
      day: 7,
      date: "Thu Mar 11, 2027",
      title: "Apache Pass, Then All The Way Around",
      tagline: "A fort in the morning and two and a half hours of driving to get eight miles east.",
      type: "activity + travel",
      driving: "~3h 20m total",
      slack: "Thin. If Fort Bowie runs long the transfer eats the evening — and Sunny Flat is first-come.",
      noSignal: "From the Fort Bowie trailhead through Apache Pass, and again from San Simon south to Portal. Most of the day.",
      overnight: {
        name: "Sunny Flat Campground",
        place: "Cave Creek Canyon, Portal AZ",
        kind: "USFS campground — first come, first served",
        cost: "TBD — call Douglas RD (520) 364-3468",
        checkin: "No office. Self-serve.",
        confirmation: "None possible — FCFS",
        notes: "✅ Verified: <b>open year-round, first-come, no reservations accepted</b>, ~14 sites. ⚠️ <b>Potable water runs April–November only — there is none in March.</b> Stewart is half a mile northeast with ~10 more first-come sites and its water off until first thaw. Fee not verified; an aggregator said $8–40, which is not an answer.",
      },
      schedule: [
        { kind: "sunrise", time: "6:27 AM", text: "Sunrise. Break camp — you are not coming back this side of the range." },
        { kind: "drive", time: "6:45 → 7:30", est: "45m", text: "→ Fort Bowie trailhead, Apache Pass Road. ⚠️ <b>No overnight parking, cars and motorcycles only, and the lot is 3 miles on foot from the fort.</b>", maps: "Fort Bowie National Historic Site Trailhead" },
        { kind: "hike", time: "7:30 → 10:30", est: "3h", text: "<b>Fort Bowie Trail.</b> ✅ AllTrails: <b>4.3 mi, 597 ft, Moderate, loop.</b> Adobe ruins of the fort that held Apache Pass, the Butterfield stage station, the post cemetery, and Apache Spring — the water that made the pass worth fighting over for twenty-five years. ✅ Grounds and trails are open <b>sunrise to sunset, seven days</b>; the visitor center is Wed–Sun 8:30–4 in winter, so <b>Thursday works and Monday would not have</b>.", maps: "Fort Bowie National Historic Site" },
        { kind: "stop", time: "10:30 → 11:15", est: "45m", text: "Sit at the ruins. 520-549-6751 if anything about access needs checking first." },
        { kind: "drive", time: "12:00 → 2:35", est: "2h 35m", text: "→ Portal via Bowie, <b>I-10 east to San Simon, then south</b>. 🚨 <b>Do NOT take FR 42 over Onion Saddle.</b> It looks like the direct line on a map and it is unpaved, it is the road that serves Rustler Park, and <b>that road closes with the first snow and is not plowed November–March.</b> The long way around is the only way across in March.", maps: "Portal Arizona", warn: true },
        { kind: "stop", time: "2:35 → 3:30", est: "55m", text: "<b>Take a site at Sunny Flat.</b> First-come, ~14 sites, Thursday afternoon. Fallback in order: Stewart half a mile up, then dispersed on the forest road." },
        { kind: "sunset", time: "6:27 PM", text: "Sunset. Dark 6:46 PM." },
      ],
      meals: { b: "made at camp", l: "packed — eaten at the fort", d: "made at camp" },
      highlights:
        "Apache Pass is the whole reason southeast Arizona has the history it has, and the fort sits in it as adobe stubs and a cemetery. Then the long way around a mountain range you could see over the whole time.",
      warnings:
        "🚨 <b>The Onion Saddle shortcut is closed and unplowed in March.</b> Attempting it is the single worst thing you could do on this trip: unpaved, high, no signal, and nobody expecting you. Budget the 2h 35m and take I-10.<br><br><b>Sunny Flat has no drinking water in March.</b> You need three nights of it in the car before leaving Bowie — fill everything at Fort Bowie or in town, not in Portal, which has almost nothing.",
    },
    {
      day: 8,
      date: "Fri Mar 12, 2027",
      title: "The Quiet Side of the Range",
      tagline: "An easy canyon walk on the day the rest of Arizona is busy.",
      type: "rest",
      driving: "~15 min",
      slack: "Enormous. That is the point of today.",
      overnight: {
        name: "Sunny Flat Campground",
        place: "Cave Creek Canyon, Portal AZ",
        kind: "USFS campground — FCFS",
        cost: "TBD",
        checkin: "n/a — night 2 of 3",
        confirmation: "None possible — FCFS",
        notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "6:25 AM", text: "Sunrise. Sleep past it — first rest day of the trip." },
        { kind: "hike", time: "8:30 → 10:30", est: "2h", text: "<b>South Fork Trail #243.</b> ✅ AllTrails: <b>4.2 mi, 456 ft, Easy, out-and-back.</b> The most famous birding canyon in the United States and an almost flat walk along a creek under sycamores. Easy is the correct grade for the day after Fort Bowie.", maps: "South Fork Trail Cave Creek Canyon Portal AZ" },
        { kind: "stop", time: "10:30 → 12:00", est: "1h 30m", text: "<b>Sit on the creek.</b> Elegant trogons nest in this canyon and this is the trail people come from other continents to walk slowly. An hour and a half sitting still is the correct use of it." },
        { kind: "hike", time: "1:30 → 2:30", est: "1h", text: "<b>Cave Creek Nature Trail #603.</b> ✅ AllTrails: <b>2.1 mi, 150 ft, Easy.</b> Short, and it takes in the visitor information station.", maps: "Cave Creek Visitor Information Center Portal AZ" },
        { kind: "stop", time: "afternoon", text: "Camp. The canyon walls here are the same welded tuff as the hoodoos, cut differently — worth an hour just looking at the cliffs from the site." },
        { kind: "sunset", time: "6:27 PM", text: "Sunset. Dark 6:46 PM. Waxing crescent 21%." },
      ],
      meals: { b: "made at camp", l: "made at camp", d: "made at camp" },
      highlights:
        "The rest day, in the best possible place for one. South Fork is world-famous and almost flat, and Portal on a Friday in March is still nearly empty compared to the monument thirty miles west.",
      warnings:
        "Water. Day 2 of 3 with none available at the campground. Ration against Saturday's bigger hike rather than discovering the shortfall on Saturday morning.",
    },
    {
      day: 9,
      date: "Sat Mar 13, 2027",
      title: "Up the Canyon Wall",
      tagline: "The hard, empty hike on the busiest day of the week.",
      type: "activity",
      driving: "~30 min each way",
      slack: "About an hour. Greenhouse is the swap if Herb Martyr's road is bad.",
      overnight: {
        name: "Sunny Flat Campground",
        place: "Cave Creek Canyon, Portal AZ",
        kind: "USFS campground — FCFS",
        cost: "TBD",
        checkin: "n/a — night 3 of 3",
        confirmation: "None possible — FCFS",
        notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "6:23 AM", text: "Sunrise. First light 6:05 AM." },
        { kind: "drive", time: "6:00 → 6:30", est: "30m", text: "→ Herb Martyr trailhead, up the canyon past the campground.", maps: "Herb Martyr Campground Portal AZ" },
        { kind: "hike", time: "6:30 → 11:30", est: "5h", text: "<b>Herb Martyr Trail.</b> ✅ AllTrails: <b>5.9 mi, 2,083 ft, Hard, out-and-back.</b> Steep, forested, and it climbs out of the canyon toward the country that Rustler Park would have given you if the road were open. This is how you get high in the Chiricahuas in March without FR 42.", maps: "Herb Martyr Trail Portal AZ" },
        { kind: "stop", time: "at the top", est: "60m", text: "Sit at the high point and turn around. <b>Hard turnaround 11:00 AM regardless of where you are.</b>", warn: true },
        { kind: "stop", time: "afternoon", text: "Camp. Last night in the canyon; pack what can be packed tonight." },
        { kind: "sunset", time: "6:28 PM", text: "Sunset. Dark 6:47 PM. Waxing crescent 31%." },
      ],
      meals: { b: "made — before first light", l: "packed", d: "made at camp — use up the cooler" },
      highlights:
        "2,000 ft of climbing on the wet, forested side of the range, on the Saturday of spring break, with essentially nobody there. This is the whole 'schedule against the crowd' rule in one day.",
      warnings:
        "<b>Hard turnaround 11:00 AM.</b> 2,083 ft in under 3 miles is steep enough that the descent is the slow part, and it is the third day on rationed water. ⚠️ The Herb Martyr road condition is not verified. <b>Greenhouse Trail to Winn Falls</b> (6.3 mi, 2,024 ft, Hard) is the named swap if the road turns you back.<br><br>⚠️ <b>Silver Peak</b> (10.3 mi, 3,047 ft) is the other option here and it is <b>over the day ceiling</b> on both counts. It is not scheduled. If you want it, it replaces the whole day and gets its own turnaround.",
    },
    {
      day: 10,
      date: "Sun Mar 14, 2027",
      title: "Out Through the Copper Towns",
      tagline: "The long way back to Tucson, past two towns built on holes in the ground.",
      type: "travel",
      driving: "~4h with stops",
      slack: "Moderate. Tombstone comes off first if the day runs long.",
      overnight: {
        name: "Gilbert Ray Campground",
        place: "Tucson Mountain Park",
        kind: "County campground",
        cost: "$10/night (tent)",
        checkin: "Reservation-only — book with the Day 1–2 nights",
        confirmation: "TBD",
        notes: "Last night reservable, per the fly-in rule. Puts you 40 minutes from TUS for a Monday flight.",
      },
      schedule: [
        { kind: "note", time: "—", text: "⚠️ <b>Daylight saving starts today in most of the country. Arizona does not observe it.</b> Your clock does not move; everyone you are flying through and calling shifts an hour relative to you. Re-check tomorrow's flight time against Arizona local, today.", warn: true },
        { kind: "sunrise", time: "6:24 AM", text: "Sunrise. Break camp." },
        { kind: "drive", time: "7:30 → 9:15", est: "1h 45m", text: "→ Douglas via Rodeo NM and AZ-80 south. A different road out than the one in — no road driven twice on this trip.", maps: "Douglas Arizona" },
        { kind: "drive", time: "9:15 → 9:50", est: "35m", text: "→ Bisbee.", maps: "Bisbee Arizona" },
        { kind: "stop", time: "9:50 → 12:30", est: "2h 40m", text: "<b>Bisbee.</b> Built on the Copper Queen — the Lavender Pit is an open cut you can stand at the rim of, and the town is stacked up a canyon on stairs. Ruins that people still live in. The Queen Mine underground tour runs here; cost and times <b>not verified</b>.", maps: "Lavender Pit Bisbee Arizona" },
        { kind: "food", time: "12:30 → 1:30", est: "60m", text: "<b>Lunch in Bisbee.</b> One of the two eat-out meals on the trip. Pick the named dish, not the convenient door." },
        { kind: "drive", time: "1:30 → 2:10", est: "40m", text: "→ Tombstone. Touristy and knowingly so; the <b>Boothill Graveyard</b> and the courthouse are the parts that are actually old.", maps: "Tombstone Arizona" },
        { kind: "drive", time: "3:30 → 5:00", est: "1h 30m", text: "→ Gilbert Ray, Tucson. Fuel the car near the airport tonight, not in the morning." },
        { kind: "sunset", time: "6:35 PM", text: "Sunset at Tucson. Dark 6:56 PM." },
      ],
      meals: { b: "made at camp", l: "bought — Bisbee", d: "made at camp — last of the cooler" },
      highlights:
        "Two mining towns and an open pit on the way back, which turns a four-hour repositioning drive into the day it is instead of the day it has to be.",
      warnings:
        "The DST mismatch. Arizona stays on MST while the rest of the country springs forward today — <b>verify tomorrow's departure in Arizona local time before you go to sleep.</b> This is the most common way to miss a flight out of Phoenix or Tucson in March.",
    },
    {
      day: 11,
      date: "Mon Mar 15, 2027",
      title: "Out",
      tagline: "Home, and back in class Tuesday.",
      type: "travel",
      driving: "~40 min",
      slack: "Depends entirely on the flight, which is not booked.",
      overnight: null,
      schedule: [
        { kind: "sunrise", time: "6:30 AM", text: "Sunrise. Break camp." },
        { kind: "drive", time: "TBD", est: "40m", text: "→ TUS. Return the car. <b>Leave the fuel canisters</b> — they cannot fly. Give them away at the campground rather than binning them.", maps: "Tucson International Airport" },
        { kind: "travel", time: "TBD", text: "TUS → CLE. <b>Not booked, not priced.</b> First class back is Tuesday Mar 16, so a same-day arrival home matters." },
      ],
      meals: { b: "made at camp", l: "bought — airport", d: "home" },
      highlights: "Eleven days, four ranges, zero missed classes.",
      warnings:
        "Arizona is on MST and the rest of the country moved to DST yesterday. <b>Check the departure time in Arizona local.</b> Fuel canisters cannot go in checked or carry-on baggage.",
    },
  ],

  lodging: {
    summary: "10 nights camping · ~$176 total · 4 reservable, 6 first-come",
    total: "~$176",
    rows: [
      { night: 1, date: "Fri 3/5", location: "Tucson Mountain Park", type: "County campground", name: "Gilbert Ray", cost: "$10", status: "Reservation-only — needs booking" },
      { night: 2, date: "Sat 3/6", location: "Tucson Mountain Park", type: "County campground", name: "Gilbert Ray", cost: "$10", status: "Reservation-only — needs booking" },
      { night: 3, date: "Sun 3/7", location: "Dragoon Mountains", type: "USFS — FCFS", name: "Cochise Stronghold", cost: "$20", status: "First-come. No water." },
      { night: 4, date: "Mon 3/8", location: "Chiricahua NM", type: "NPS campground", name: "Bonita Canyon", cost: "$20", status: "⚠️ 6-month window — book first" },
      { night: 5, date: "Tue 3/9", location: "Chiricahua NM", type: "NPS campground", name: "Bonita Canyon", cost: "$20", status: "⚠️ 6-month window" },
      { night: 6, date: "Wed 3/10", location: "Chiricahua NM", type: "NPS campground", name: "Bonita Canyon", cost: "$20", status: "⚠️ 6-month window" },
      { night: 7, date: "Thu 3/11", location: "Cave Creek, Portal", type: "USFS — FCFS", name: "Sunny Flat", cost: "TBD", status: "First-come. No water until April." },
      { night: 8, date: "Fri 3/12", location: "Cave Creek, Portal", type: "USFS — FCFS", name: "Sunny Flat", cost: "TBD", status: "First-come" },
      { night: 9, date: "Sat 3/13", location: "Cave Creek, Portal", type: "USFS — FCFS", name: "Sunny Flat", cost: "TBD", status: "First-come" },
      { night: 10, date: "Sun 3/14", location: "Tucson Mountain Park", type: "County campground", name: "Gilbert Ray", cost: "$10", status: "Reservation-only — needs booking" },
    ],
  },

  hikes: {
    title: "Hikes &amp; Trails",
    summary:
      "Every figure below is AllTrails, looked up 2026-09-06. Total on foot as scheduled is roughly 52 miles across 10 walks. Nothing scheduled exceeds the ~10 mi / ~2,500 ft day ceiling; the two things that would are listed and explicitly not scheduled.",
    rows: [
      { name: "Wasson Peak via King Canyon, Hugh Norris + Gould Mine", day: 2, distance: "7.8 mi loop", gain: "1,853 ft",
        difficulty: "Moderate", duration: "~5 hr", notes: "Saguaro West. Ridge walk out, copper mine on the descent. Small trailhead lot on a Saturday — dawn start is not optional." },
      { name: "Rockfellow Dome Trail", day: 3, distance: "2.0 mi RT", gain: "1,108 ft",
        difficulty: "Hard", duration: "~2 hr", notes: "Steep for its length — 1,100 ft in a mile. Dragoon granite. Little shade; short enough that it doesn't matter." },
      { name: "Slavin Gulch to Slavin's Mine", day: 4, distance: "6.9 mi RT", gain: "1,407 ft",
        difficulty: "Moderate", duration: "~3.5 hr", notes: "⚠️ Approach road condition unverified — decide the turnaround at the road. Ends at mine timbers and tailings in the canyon." },
      { name: "Sugarloaf Mountain", day: 4, distance: "1.9 mi RT", gain: "492 ft",
        difficulty: "Moderate", duration: "~1 hr", notes: "The orientation hike. Everything you walk on days 5–6 is visible from the top." },
      { name: "Echo Canyon Loop", day: 5, distance: "3.4 mi loop", gain: "561 ft",
        difficulty: "Moderate", duration: "~1.5–2 hr", notes: "The grottoes: rhyolite columns closing overhead. Smallest, most contested lot in the monument — be there at 6:30." },
      { name: "Heart of Rocks Loop from the Visitor Center", day: 6, distance: "6.9 mi loop", gain: "1,597 ft",
        difficulty: "Moderate", duration: "~5–6 hr", notes: "Biggest day. Starts at camp — no driving. No water on the loop. Upper section holds shade ice into March. Turnaround 10:00 AM for the spur." },
      { name: "Fort Bowie Trail", day: 7, distance: "4.3 mi loop", gain: "597 ft",
        difficulty: "Moderate", duration: "~3 hr", notes: "Adobe ruins, stage station, cemetery, Apache Spring. Grounds open sunrise–sunset daily; visitor center Wed–Sun only in winter." },
      { name: "South Fork Trail #243", day: 8, distance: "4.2 mi RT", gain: "456 ft",
        difficulty: "Easy", duration: "~1.5–2 hr", notes: "Near-flat creek walk under sycamores. The rest-day hike, and the best-known birding canyon in the country." },
      { name: "Cave Creek Nature Trail #603", day: 8, distance: "2.1 mi RT", gain: "150 ft",
        difficulty: "Easy", duration: "~45 min", notes: "Short. Takes in the visitor information station." },
      { name: "Herb Martyr Trail", day: 9, distance: "5.9 mi RT", gain: "2,083 ft",
        difficulty: "Hard", duration: "~4–5 hr", notes: "Steepest scheduled hike. The way to get high in the Chiricahuas without FR 42. ⚠️ Road condition unverified — Greenhouse Trail to Winn Falls (6.3 mi, 2,024 ft) is the named swap." },
      { name: "Silver Peak — NOT SCHEDULED", day: null, distance: "10.3 mi RT", gain: "3,047 ft",
        difficulty: "Strenuous", duration: "~6 hr", notes: "⚠️ <b>Over the day ceiling on both distance and gain.</b> Listed so the decision is deliberate rather than accidental. If taken, it replaces Day 9 entirely and needs its own turnaround time." },
      { name: "Rustler Park to Chiricahua Peak — UNAVAILABLE", day: null, distance: "10.9 mi RT", gain: "2,142 ft",
        difficulty: "Hard", duration: "~5.5 hr", notes: "🚨 <b>Not possible in March.</b> Rustler Park and FR 42D are closed roughly November–March and the road is not plowed. This is the high country the trip does not get." },
    ],
  },

  sunMoon: [
    { date: "Fri 3/5", location: "Tucson", firstLight: "6:22 AM", sunrise: "6:43 AM", sunset: "6:29 PM", dark: "6:49 PM", moon: "5.6% waning" },
    { date: "Sat 3/6", location: "Tucson", firstLight: "6:21 AM", sunrise: "6:42 AM", sunset: "6:30 PM", dark: "6:50 PM", moon: "2% waning" },
    { date: "Sun 3/7", location: "Cochise Stronghold", firstLight: "6:13 AM", sunrise: "6:31 AM", sunset: "6:25 PM", dark: "6:44 PM", moon: "0.2% new" },
    { date: "Mon 3/8", location: "Chiricahua NM", firstLight: "6:11 AM", sunrise: "6:30 AM", sunset: "6:25 PM", dark: "6:44 PM", moon: "0.3% new" },
    { date: "Tue 3/9", location: "Chiricahua NM", firstLight: "6:10 AM", sunrise: "6:29 AM", sunset: "6:26 PM", dark: "6:45 PM", moon: "2.5%" },
    { date: "Wed 3/10", location: "Chiricahua NM", firstLight: "6:09 AM", sunrise: "6:28 AM", sunset: "6:27 PM", dark: "6:46 PM", moon: "6.8%" },
    { date: "Thu 3/11", location: "Cave Creek / Portal", firstLight: "6:07 AM", sunrise: "6:26 AM", sunset: "6:27 PM", dark: "6:46 PM", moon: "13.1%" },
    { date: "Fri 3/12", location: "Cave Creek / Portal", firstLight: "6:06 AM", sunrise: "6:25 AM", sunset: "6:27 PM", dark: "6:46 PM", moon: "21.2%" },
    { date: "Sat 3/13", location: "Cave Creek / Portal", firstLight: "6:05 AM", sunrise: "6:23 AM", sunset: "6:28 PM", dark: "6:47 PM", moon: "30.9%" },
    { date: "Sun 3/14", location: "Tucson", firstLight: "6:11 AM", sunrise: "6:32 AM", sunset: "6:35 PM", dark: "6:56 PM", moon: "41.7%" },
    { date: "Mon 3/15", location: "Tucson", firstLight: "6:10 AM", sunrise: "6:30 AM", sunset: "6:36 PM", dark: "6:57 PM", moon: "52.9% first qtr" },
  ],
  sunMoonNote:
    "Computed with <code>tools/sun.mjs</code> (NOAA solar position, refraction and horizon dip), against regional coordinates and camp elevations — good to about a minute. <b>All times are MST. Arizona does not observe daylight saving</b>, so these do not jump on March 14 even though the rest of the country does. Note the new moon on March 7–8: the darkest week of the month falls mid-trip, in one of the least light-polluted corners of the lower 48. Nothing in the itinerary is built around that, deliberately — see the notes.",

  weather: [
    { location: "Willcox (station data)", elevation: "4,167 ft", high: 73, low: 47,
      notes: "AccuWeather climate normals for Mar 5–15. The only real station figures here — everything below is derived from these." },
    { location: "Chiricahua NM — Bonita Canyon", elevation: "~5,400 ft", high: 69, low: 43,
      notes: "Estimated from Willcox by standard lapse rate, ~1,200 ft higher. Not station data." },
    { location: "Cave Creek — Sunny Flat", elevation: "~5,200 ft", high: 69, low: 43,
      notes: "Estimated. Canyon shade makes mornings colder than the number suggests." },
    { location: "Cochise Stronghold", elevation: "5,000 ft", high: 70, low: 44,
      notes: "Estimated. Open granite country — warmer in sun, colder at night than the canyons." },
    { location: "Tucson / Gilbert Ray", elevation: "~2,700 ft", high: 78, low: 50,
      notes: "Estimated. Lowest and warmest camp of the trip." },
  ],
  weatherNote:
    "⚠️ <b>Only the Willcox row is measured.</b> The rest are lapse-rate estimates from it and should be treated as a shape, not a forecast. The variability matters more than the average: in 2026 these same eleven days at Willcox ran lows of 40–56°F and <b>highs of 64–89°F</b>. An 89°F day on exposed rhyolite with no water on the loop is a different Heart of Rocks than a 69°F one. <b>The sleep system is massively over-specified for this trip</b> — the Siesta 20 and an R-7 pad against a 43°F low — which is the correct problem to have and means cold is not on the risk list for once.",

  packing: [
    {
      category: "Water — the trip-defining one",
      items: [
        "<b>Maximum water capacity you can carry in the car.</b> Four of ten nights are at campgrounds with no potable water: Cochise Stronghold has none at all, Sunny Flat's is off until April.",
        "Collapsible jugs — 5+ gallons of capacity beyond your daily bottles",
        "Water filter — Cave Creek runs, but treat it; this is a backstop, not the plan",
        "Two large hiking bottles minimum. Heart of Rocks has no water on the loop.",
      ],
    },
    {
      category: "Desert sun, not desert heat",
      items: [
        "Sun hoody and a wide-brim hat — the 2026 sample hit 89°F on these dates",
        "Sunglasses. Rhyolite glare above 5,000 ft is genuinely punishing.",
        "Electrolytes — more useful here than on any trip on the list so far",
      ],
    },
    {
      category: "Cold that is not actually a problem",
      items: [
        "Siesta 20 + MondoKing — far more than a 43°F low needs. No liner required.",
        "Puffy and a hat for pre-dawn starts. Mornings at 5,400 ft in March start near freezing in shade even when the day hits 70.",
      ],
    },
    {
      category: "Bought on arrival — cannot fly",
      items: [
        "Fuel canisters — buy in Tucson on Day 1, leave them behind on Day 11",
        "Block ice at the Willcox stop on Day 4, not cubes",
      ],
    },
    {
      category: "Vehicle",
      items: [
        "Confirm the rental's spare is present and inflated — two trailhead approaches here are unpaved and unverified",
        "Offline maps for the whole loop, plus GPX for Slavin Gulch and Herb Martyr, whose roads are the open questions",
      ],
    },
  ],

  reservations: [
    { text: "🚨 <b>Bonita Canyon Campground, Mar 8–10</b> — recreation.gov, 6-month rolling window. March 8 released around <b>Sept 8 2026</b> and each later night releases one day at a time. 23–26 sites, all reservable, no walk-up option, in the campground's busiest month. <b>If this fails the trip's whole middle fails</b> and there is no fallback inside the monument." },
    { text: "<b>Gilbert Ray Campground, Mar 5–6 and Mar 14</b> — reservation-only since 2024, at least 72 hours ahead. $10/night tent. Cheap and rarely a race, but it is what satisfies the rule that night one and the last night are reservable." },
    { text: "<b>Flights CLE → TUS, Mar 5 out / Mar 15 back</b> — not priced. Spring break is peak Tucson. Sweet spot per the hub's own booking table is 2–5 months out, i.e. roughly Oct 2026 – Jan 2027." },
    { text: "<b>Rental car, 11 days from TUS</b> — 2–3 months out, re-check monthly, free cancellation. Verify AAA still waives the under-25 surcharge before booking; on 11 days that fee is worth $165–385." },
    { text: "No reservation possible: Cochise Stronghold (11 sites, FCFS) and Sunny Flat / Stewart (~24 sites between them, FCFS). Arrive early, drive the loop once, take the first acceptable site." },
  ],

  openQuestions: [
    { question: "What does Sunny Flat actually cost, and Stewart?",
      blocks: "The budget, and nothing else",
      detail: "The only figure found was an aggregator's \"$8–40 per night\", which is a range wide enough to be useless. Same ranger district as Cochise Stronghold, which is $20 — so $20 is the working assumption and it is a guess. <b>Douglas Ranger District (520) 364-3468.</b>" },

    { question: "Is Bonita Canyon 23 sites or 26, and is the fee $20 or $25?",
      blocks: "Nothing structural — but it changes the odds on the only booking that matters",
      detail: "One source says 23 sites, another 26. NPS lists $20/night; a separate NPS notice describes a proposed increase from $20 to $25. Neither materially changes the plan, but on a campground this small the site count is the difference between a race and a lottery. Check recreation.gov directly at booking." },

    { question: "Does Bonita Canyon Drive ever close for snow in early March?",
      blocks: "Days 5 and 6 — Echo Canyon and Massai Point both hang off it",
      detail: "It is the paved park road so it is almost certainly fine, but no source consulted said so, and Rustler Park nine miles away is shut for the season. <b>Ask the visitor center on arrival Day 4, and have the fallback of starting Echo Canyon from the visitor center on foot.</b> Do not find out at 6:00 AM on Day 5." },

    { question: "Are the Slavin Gulch and Herb Martyr approach roads passable in a low-clearance Legacy?",
      blocks: "Day 4 morning and Day 9",
      detail: "Both are the standard failure mode for this car: a good hike behind a forest road nobody documents. Named swaps are already written into both days — Cochise Trail #279 from the campground on Day 4, Greenhouse Trail to Winn Falls on Day 9 — so neither is a trip-breaker, but the decision belongs at the road, before committing. Douglas RD (520) 364-3468 for current condition." },

    { question: "What does CLE → TUS actually cost over spring break?",
      blocks: "Whether the trip is affordable at all",
      detail: "The single largest line item and the one nobody has checked. Every other number on this page is knowable within about $50; this one could swing $400. It is also the item the Mojave deferral was supposed to free money for, so it deserves pricing before anything else gets booked." },

    { question: "Is three nights inside the monument the right split?",
      blocks: "The shape of days 4–7",
      detail: "The crowd argument says the monument is the compromise and Cave Creek and the Dragoons are the payoff. Currently it is 3 nights in the monument, 3 at Portal, 1 in the Dragoons. An alternative worth weighing: 2 nights in the monument, 2 in the Dragoons, and keep 3 at Portal — the Dragoons have a 9.4-mile trail leaving directly from the campground that this plan never uses." },
  ],

  places: [
    {
      group: "Tucson",
      items: [
        { name: "Gilbert Ray Campground", maps: "Gilbert Ray Campground Tucson AZ", note: "Nights 1, 2, 10. Reservation-only, $10 tent, open Sept 1–Apr 30." },
        { name: "King Canyon Trailhead", maps: "King Canyon Trailhead Saguaro National Park West", note: "Day 2. Opposite the Desert Museum. Small lot — dawn." },
        { name: "Signal Hill Petroglyphs", maps: "Signal Hill Petroglyphs Saguaro National Park", note: "Day 1, ~0.5 mi. Hohokam petroglyph boulders." },
        { name: "Tucson International Airport", maps: "Tucson International Airport", note: "In Day 1, out Day 11. ~40 min from Gilbert Ray." },
      ],
    },
    {
      group: "The Dragoons",
      items: [
        { name: "Cochise Stronghold Campground", maps: "Cochise Stronghold Campground Arizona", note: "Night 3. 11 sites, FCFS, $20. ⚠️ NO WATER. Douglas RD (520) 364-3468." },
        { name: "Rockfellow Dome Trail", maps: "Rockfellow Dome Trail Cochise Stronghold", note: "Day 3. 2.0 mi / 1,108 ft. Steep and short." },
        { name: "Slavin Gulch Trailhead", maps: "Slavin Gulch Trailhead Dragoon Mountains", note: "Day 4. ⚠️ Approach road unverified. Mine ruins at the end." },
        { name: "Sunsites / Benson", maps: "Sunsites Arizona", note: "⚠️ Last water and fuel before the Stronghold. There is nothing at the campground." },
      ],
    },
    {
      group: "Chiricahua National Monument",
      items: [
        { name: "Bonita Canyon Campground", maps: "Bonita Canyon Campground Chiricahua", note: "Nights 4–6. ⚠️ ALL reservable, no walk-ups, 6-month window, full most nights in March." },
        { name: "Chiricahua NM Visitor Center", maps: "Chiricahua National Monument Visitor Center", note: "✅ No entrance fee. Ask about Bonita Canyon Drive snow status and Portal road conditions." },
        { name: "Echo Canyon Trailhead", maps: "Echo Canyon Trailhead Chiricahua National Monument", note: "Day 5. Smallest lot in the monument. 6:30 AM." },
        { name: "Massai Point", maps: "Massai Point Chiricahua National Monument", note: "Day 5. 6,870 ft, end of the road. The caldera makes sense from here." },
        { name: "Faraway Ranch", maps: "Faraway Ranch Chiricahua National Monument", note: "Day 6 afternoon. Homestead ruins inside the monument." },
        { name: "Rustler Park / FR 42D", maps: "Rustler Park Campground Arizona", note: "🚨 CLOSED Nov–March, road not plowed. The high country is off this trip." },
        { name: "Willcox", maps: "Willcox Arizona", note: "Day 4 resupply. Last real grocery before Portal. BLOCK ice." },
      ],
    },
    {
      group: "Apache Pass",
      items: [
        { name: "Fort Bowie NHS Trailhead", maps: "Fort Bowie National Historic Site Trailhead", note: "Day 7. ⚠️ 3 mi on foot to the fort. Cars only, no overnight parking, no fee." },
        { name: "Fort Bowie Visitor Center", maps: "Fort Bowie National Historic Site", note: "✅ Wed–Sun 8:30–4 winter, closed Mon + Tue. Grounds sunrise–sunset daily. 520-549-6751." },
      ],
    },
    {
      group: "Cave Creek / Portal",
      items: [
        { name: "Sunny Flat Campground", maps: "Sunny Flat Campground Portal AZ", note: "Nights 7–9. ~14 sites, FCFS, no reservations. ⚠️ NO POTABLE WATER until April." },
        { name: "Stewart Campground", maps: "Stewart Campground Portal AZ", note: "Fallback, ~0.5 mi northeast. ~10 FCFS sites, water off in winter." },
        { name: "South Fork Trailhead", maps: "South Fork Trail Cave Creek Canyon Portal AZ", note: "Day 8. 4.2 mi, easy. The birding canyon." },
        { name: "Herb Martyr Trailhead", maps: "Herb Martyr Campground Portal AZ", note: "Day 9. ⚠️ Road condition unverified. 5.9 mi / 2,083 ft." },
        { name: "FR 42 / Onion Saddle", maps: "Onion Saddle Chiricahua Mountains", note: "🚨 DO NOT. Unpaved, unplowed Nov–March. Go around via I-10, 2h 35m." },
      ],
    },
    {
      group: "The way out",
      items: [
        { name: "Lavender Pit, Bisbee", maps: "Lavender Pit Bisbee Arizona", note: "Day 10. Open-cut copper mine you can stand at the rim of." },
        { name: "Bisbee", maps: "Bisbee Arizona", note: "Day 10 lunch. Town stacked up a canyon on stairs. Queen Mine tour cost/times unverified." },
        { name: "Boothill Graveyard, Tombstone", maps: "Boothill Graveyard Tombstone Arizona", note: "Day 10. The genuinely old part of a very touristy town. First cut if the day runs long." },
      ],
    },
  ],
  placesNote:
    "No coordinate on this page has been verified, so every entry here is a Maps search string rather than a pin. That is deliberate — a search for a named place lands you correctly; a coordinate someone guessed does not.",

  offlineRegions:
    "Download Google Maps offline for the whole loop before leaving home: Tucson, Benson–Sunsites, Willcox, Chiricahua NM, Apache Pass, San Simon–Portal, and Douglas–Bisbee. <b>Trails are a separate download</b> — AllTrails or Gaia for the Chiricahua trail network, Cave Creek, and both Dragoon approaches. There is no usable signal at Cochise Stronghold, through Apache Pass, or in Cave Creek Canyon.",

  budget: {
    note: "Excludes airfare, which is the largest single number on this trip and has not been priced. Everything here is per-person solo.",
    rows: [
      { category: "Camping — 10 nights", cost: 176, notes: "Gilbert Ray 3×$10, Cochise Stronghold 1×$20, Bonita Canyon 3×$22 (approx), Sunny Flat 3×$20 (TBD)" },
      { category: "Rental car — 11 days", cost: 440, notes: "~$40/day base. ⚠️ Under-25 surcharge of $165–385 is NOT in this number — it assumes AAA waives it. Verify before booking." },
      { category: "Fuel", cost: 90, notes: "~700 mi loop at ~28 mpg" },
      { category: "Groceries", cost: 130, notes: "10 days solo, cooking at camp. Tucson on Day 1, Willcox on Day 4." },
      { category: "Eating out", cost: 70, notes: "Two named meals — Bisbee lunch and one other. Not convenience food." },
      { category: "Fuel canisters + arrival sundries", cost: 25, notes: "Cannot fly. Bought Tucson, left behind." },
      { category: "Bisbee / Tombstone entries", cost: 30, notes: "TBD — Queen Mine tour and Boothill costs unverified" },
    ],
    subtotal: 961,
    buffer: 115,
    bufferLabel: "Buffer (12%)",
    total: 1076,
  },

  waypoints: [
    { name: "Gilbert Ray Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "1, 2, 10", notes: "Reservation-only, $10 tent, Sept 1–Apr 30. Tucson Mountain Park." },
    { name: "King Canyon Trailhead", lat: null, lng: null, verified: false, icon: "🥾", days: "2", notes: "Saguaro West. Small lot, fills on weekends." },
    { name: "Cochise Stronghold Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "3", notes: "11 sites, FCFS, $20, 5,000 ft. NO drinking water. (520) 364-3468." },
    { name: "Rockfellow Dome Trailhead", lat: null, lng: null, verified: false, icon: "🪨", days: "3", notes: "2.0 mi / 1,108 ft. Dragoon granite." },
    { name: "Slavin Gulch Trailhead", lat: null, lng: null, verified: false, icon: "⛏️", days: "4", notes: "Approach road condition unverified. Mine ruins at the turnaround." },
    { name: "Bonita Canyon Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "4, 5, 6", notes: "~5,400 ft. All sites reservable, 6-month window, no walk-ups. Full most nights Feb–Apr." },
    { name: "Chiricahua NM Visitor Center", lat: null, lng: null, verified: false, icon: "ℹ️", days: "4, 6", notes: "No entrance fee. Heart of Rocks loop starts here." },
    { name: "Echo Canyon Trailhead", lat: null, lng: null, verified: false, icon: "🥾", days: "5", notes: "~7 mi up Bonita Canyon Drive. Smallest lot in the monument." },
    { name: "Massai Point", lat: null, lng: null, verified: false, icon: "👁️", days: "5", notes: "6,870 ft, end of the paved road." },
    { name: "Fort Bowie NHS Trailhead", lat: null, lng: null, verified: false, icon: "🏚️", days: "7", notes: "Apache Pass Road. 3 mi on foot to the fort. No overnight parking, cars only." },
    { name: "Sunny Flat Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "7, 8, 9", notes: "~14 sites, FCFS, year-round. Potable water April–November only." },
    { name: "South Fork Trailhead", lat: null, lng: null, verified: false, icon: "🐦", days: "8", notes: "Cave Creek Canyon. 4.2 mi, easy, sycamore creek walk." },
    { name: "Herb Martyr Trailhead", lat: null, lng: null, verified: false, icon: "🥾", days: "9", notes: "5.9 mi / 2,083 ft. Road condition unverified." },
    { name: "Lavender Pit, Bisbee", lat: null, lng: null, verified: false, icon: "⛏️", days: "10", notes: "Open-cut copper mine, rim viewpoint." },
    { name: "Tucson International Airport", lat: null, lng: null, verified: false, icon: "✈️", days: "1, 11", notes: "In and out. ~40 min from Gilbert Ray." },
  ],

  notes: [
    {
      heading: "The window was computed, not chosen",
      body:
        "Spring 2027 runs Tuesday/Thursday classes with spring break March 8–12. The last class before the break is Thursday March 4 and the first one after is Tuesday March 16, so <b>Friday March 5 through Monday March 15 is free at a cost of zero missed classes</b> — eleven days, which clears the hub's own 8-day threshold for a trip being worth an airfare. It is also the last window of that length before Commencement on May 8. Nothing else in the spring is bigger than a Friday-to-Monday.",
    },
    {
      heading: "The crowd problem, stated honestly",
      body:
        "The profile's first line about people is \"actively avoids them — empty is cool if it's worth it.\" <b>March is Chiricahua National Monument's single busiest month</b>, and the campground is full most nights. A reservation removes the lottery; it does not remove the crowd.<br><br>The itinerary's answer is a split: <b>three nights in the monument and seven outside it.</b> The Dragoons and Cave Creek Canyon are the same sky-island geology — Cave Creek's walls are the same welded tuff as the hoodoos — with a fraction of the visitation, and the two hardest days of the trip (Heart of Rocks on a Wednesday, Herb Martyr on a Saturday) are placed to invert the crowd rather than avoid it. If the monument is where you spend eight days, this trip fails your own test. As built, it passes.",
    },
    {
      heading: "Water is the actual risk here, not cold",
      body:
        "This is the first trip on the list where the sleep system is comprehensively over-specified: a 20°F bag and an R-7 pad against an estimated 43°F low. Cold is off the risk list.<br><br>Water replaces it. <b>Four of ten nights are at campgrounds with no potable water</b> — Cochise Stronghold has none at any time of year, and Sunny Flat's is shut off until April, which is exactly the fact that makes an early-March trip different from the April version of the same trip. Add the Heart of Rocks loop, which has no water on it, and Herb Martyr's 2,083 ft on day three of rationing. The mitigation is dull and it works: maximum carrying capacity in the car, fill at every town, and treat the filter as a backstop rather than a plan.",
    },
    {
      heading: "The road you cannot take",
      body:
        "On a map, Chiricahua National Monument and Portal are about eight miles apart across the range, connected by FR 42 over Onion Saddle. In March that road is <b>unpaved, unplowed and closed</b> — it is the same road that serves Rustler Park, which shuts with the first snow and stays shut through March. The crossing that exists is I-10: north out of Bowie, east to San Simon, then south into Portal. <b>2 hours 35 minutes to travel eight miles of mountain.</b><br><br>This is worth internalising before Day 7 rather than discovering at a gate. It is also the reason Rustler Park to Chiricahua Peak — a 10.9-mile hike that would otherwise be the obvious centrepiece — does not appear in this trip at all, and why Herb Martyr is scheduled instead: it is the way to gain 2,000 ft in these mountains without that road.",
    },
    {
      heading: "The geology is the through-line, and it is one event",
      body:
        "Roughly 27 million years ago the Turkey Creek caldera erupted and laid down a sheet of rhyolite ash so hot it welded into solid rock as it settled. Cooling cracked it into vertical columns; water and ice have been widening those joints ever since. <b>Everything you walk on Days 5 and 6 is one eruption, weathered.</b> The hoodoos at Heart of Rocks, the corridor at Echo Canyon, and the canyon walls above Sunny Flat are the same rock cut three different ways.<br><br>The Dragoons are the counterpoint and they are older by two orders of magnitude — around 1.4-billion-year-old granite, exhumed and weathered into domes. Two days apart, a billion and a half years of separation, and you can see one range from the other.",
    },
    {
      heading: "Ruins, deliberately",
      body:
        "\"Ruins count as scenery\" is a locked principle and this trip is unusually well supplied. <b>Gould Mine</b> on the Wasson Peak descent, <b>Slavin's Mine</b> at the head of its canyon, <b>Fort Bowie</b> as adobe stubs with a post cemetery and the spring that made Apache Pass worth twenty-five years of fighting, <b>Faraway Ranch</b> inside the monument, and the <b>Lavender Pit</b> at Bisbee on the way out. Five of the eleven days have something abandoned on them, and none of it is filler.<br><br>Cochise Stronghold is the odd one: a ruin with no structures. It is the natural fortress the Chiricahua Apache held for a decade, and Cochise is buried somewhere in it in a location that was deliberately never recorded. There is nothing to photograph, which is the point.",
    },
    {
      heading: "The new moon, and why nothing is built on it",
      body:
        "New moon falls on March 7–8 2027, mid-trip, in one of the darkest corners of the lower 48. That is a real fact and it is in the Sun/Moon table because that is what the table is for.<br><br><b>It is not scheduled as an activity, on purpose.</b> Night-sky watching is on the hub's declined list, and the honest thing is to note the coincidence rather than quietly build a night around it and hope the rule has softened. If it has softened, say so and the trip has an obvious free upgrade sitting in it. If it hasn't, nothing here needs changing. What is <i>not</i> acceptable is the Maui pattern, where a declined activity ended up on a page without anyone deciding it should.",
    },
    {
      heading: "What this trip costs, and the number that isn't here",
      body:
        "About <b>$1,076 excluding airfare</b>, and that figure assumes AAA still waives the under-25 rental surcharge — if it doesn't, add $165–385, which is a bigger swing than the entire camping and food budget combined.<br><br>The airfare is unpriced, and spring break is the most expensive fortnight of the year to fly into Tucson. This is the second trip in a row where the flight is the blocking unknown. It also matters more than usual here: the Mojave loop was deferred so the money could go somewhere better at a better time of year, and this is that somewhere. <b>Pricing CLE → TUS is the thing that tests whether that trade was real.</b>",
    },
  ],

  map: { center: [32.0, -109.5], zoom: 8 },
};
