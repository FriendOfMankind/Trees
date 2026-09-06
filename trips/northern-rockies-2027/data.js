/* ==========================================================================
   The Long Way to Glacier — July 6–26 2027.  STATUS: OUTLINE.

   Built 2026-09-06. This is the July replacement for the June road trip,
   after June was checked destination by destination and found to be the gap
   month in this entire wishlist: Beartooth needs late June minimum, the San
   Juans and Snowy Range need July, Lake Superior is blackfly season, Utah is
   too hot and Colorado is still melting. Moving the trip three weeks fixed
   more than any destination swap did.

   REVISED 2026-09-06 from a 25-day draft to 21, on four decisions:
     1. The cut comes off the FRONT END. Custer State Park and Devils Tower
        are gone; Badlands runs straight into the Bighorns. Chosen over
        cutting Theodore Roosevelt or a Glacier night, and it is the better
        trade — it BUYS Glacier a seventh night rather than costing one.
     2. The Slough Creek night stays. It is 16 sites and a real race, and the
        alternative — Lamar as a day trip off the plateau — loses the dawn.
     3. Two genuine soft days survive: Day 6 in the Bighorns and Day 17 at
        Glacier. On a trip twice as long as anything previously attempted,
        those are the point.
     4. Glacier's vehicle reservation is recorded as gone, not hedged.

   VERIFIED THIS SESSION:
     - Glacier: no timed-entry vehicle reservation for 2026 — first time in
       five years — across Going-to-the-Sun, Many Glacier, Two Medicine and
       North Fork. Entry pass still required. Colin confirms it stands for
       the trip, so it is recorded as fact rather than carried as a risk.
     - Glacier: Logan Pass 3-hour parking limit from July 1; new $1 ticketed
       shuttle, some on a 60-day rolling window, most released 7 PM the night
       before.
     - Glacier camping: 6-month rolling window, released daily. Apgar,
       Avalanche and Many Glacier go the day they open.
     - Going-to-the-Sun opened June 22 in 2026; typically late June/early July.
     - Beartooth: US-212 opened May 23 2026, closed again for snow, reopened
       June 9. Beartooth Lake CG typically opens late June; Island Lake
       sources disagree (late May vs July 1). By mid-July both are moot.
     - Yellowstone: Pebble Creek CG closed for flood recovery since June 2022,
       still listed closed for 2025. Slough Creek is 16 sites and fills fast.
     - Bighorns: several Cloud Peak Skyway campgrounds open June 5; high roads
       can hold snow to about July 1.
   CALCULATED:
     - Every sunrise / sunset / twilight below (tools/sun.mjs, NOAA).
     - Full moon July 17–18, which after the recut falls at Many Glacier.
   FROM ALLTRAILS:
     - Every hike distance, gain and time in the Hikes tab.
   COULD NOT VERIFY:
     - EVERY COORDINATE. tools/geocode.mjs returns NONE in this environment:
       overpass and nominatim are egress-blocked and no RIDB/NPS key is set.
       All waypoints are verified:false and unplotted. See CLAUDE.md.
     - Every campground FEE below is an estimate. None was read from an
       operator page; recreation.gov and nps.gov are blocked here.
     - The two transit nights (Days 1 and 20) have no lodging identified.
     - Drive times are Google-style estimates + 15%, unconfirmed.
   ========================================================================== */

window.TRIP_DATA = {
  meta: {
    slug: "northern-rockies-2027",
    title: "The Long Way to Glacier",
    subtitle: "Solo · Avon OH → Badlands → Bighorns → Beartooth → Glacier → home",
    dates: "Tuesday, July 6 – Monday, July 26, 2027",
    emoji: "🏔️",
    theme: "alpine",

    route:
      "Out on I-90 through South Dakota, up through Wyoming and Montana to Glacier, and <b>home on I-94 through North Dakota</b> — a different line back, so no road is driven twice. Four anchors on a long spine: Badlands, the Cloud Peak Skyway, the Beartooth Plateau, and <b>seven nights at Glacier</b>, with Lamar Valley on the way in and Theodore Roosevelt catching the drive home.",
    vehicle:
      "2013 Subaru Legacy, ~5.9 in clearance, low air dam. <b>Every anchor on this route is reachable on pavement.</b> The one road that is not is Crazy Woman Canyon in the Bighorns — see Day 6. This is a ~4,300 mi trip on your own car: get the service done before, not on the road.",
    gettingThere:
      "Driving. No flights, no rental, no under-25 surcharge, no fuel canisters to buy on arrival. <b>That is most of why 21 days costs under $1,800</b> — the whole cost structure is fuel and campsites.",

    stats: [
      { num: "21 days", lbl: "Length" },
      { num: "~4,300 mi", lbl: "Driving" },
      { num: "20", lbl: "Nights out" },
      { num: "~95 mi", lbl: "On foot" },
    ],

    overviewCards: [
      { h: "Dates", p: "July 6–26, 2027<br>21 days / 20 nights" },
      { h: "Group", p: "Solo. One person, one tent, one portion." },
      { h: "Why July, not June", p: "June was checked and it is the gap month on this whole list. Beartooth needs late June at minimum, Snowy Range's campgrounds open July 4, the San Juans hold snow into July. <b>Moving three weeks fixed more than any destination swap.</b>" },
      { h: "Why Glacier anchors it", p: "✅ <b>No timed-entry vehicle reservation.</b> Glacier dropped it for 2026 after five years, and the single largest objection to the park went with it. Entry pass only." },
      { h: "The cut that bought a week", p: "This was a 25-day draft. The four days came off the <b>front end</b> — Custer State Park and Devils Tower are gone, Badlands runs straight into the Bighorns. That trade <b>added</b> a Glacier night instead of costing one." },
      { h: "The booking date", p: "<b>Mid-January 2027.</b> Glacier camping is a 6-month rolling window released daily and the good campgrounds go the day they open. Slough Creek is worse: <b>16 sites, gone in minutes.</b>" },
      { h: "⚠️ Still twice your longest trip", p: "The profile says 2–5 campgrounds, 5–10 nights. This is <b>20 nights across 9 places to sleep</b> — the Appalachians run was 11 days. <b>Days 6 and 17 are deliberately soft</b> and that is the mitigation." },
      { h: "Timing vs Alaska", p: "Home July 26. <b>Kenai starts Aug 14</b> — nineteen days of turnaround. The 25-day version left fifteen; the PNW version would have left six." },
    ],

    footerNote:
      'Outline. Road and season facts are verified; every fee, every coordinate and two transit nights are not. <a href="../../index.html">← All trips</a>',
  },

  days: [
    {
      day: 1, date: "Tue Jul 6, 2027",
      title: "Get Across Illinois",
      tagline: "The unglamorous half of a road trip, done on purpose on day one.",
      type: "travel",
      driving: "~600 mi, ~10h 30m (Google +15%)",
      slack: "None needed. Nothing happens today except distance.",
      overnight: {
        name: "TBD — western Wisconsin / La Crosse area", place: "Wisconsin",
        kind: "Transit night — not identified", cost: "~$30 est.",
        checkin: "Unknown", confirmation: "TBD",
        notes: "⚠️ <b>One of two transit nights with no lodging identified.</b> A Wisconsin state park, a KOA, or a cheap motel. Decide before leaving — arriving at 8 PM without a plan is how a road trip starts badly.",
      },
      schedule: [
        { kind: "drive", time: "6:00 AM", est: "10h 30m", text: "Avon OH → I-80 W → Chicago bypass → I-90 W. <b>Time the Chicago window</b> — through the metro before 10 AM or after 7 PM, nothing in between.", warn: true },
        { kind: "stop", time: "afternoon", text: "Fuel and a real stop somewhere in Wisconsin. This is a driving day; treat it as one." },
      ],
      meals: { b: "home", l: "packed — built the night before", d: "made at camp, or bought if the day ran long" },
      highlights: "Nothing. This day exists so that day two ends at the Badlands.",
      warnings: "Chicago. The worst traffic on the route and it is 3 hours in. Time it or lose 90 minutes.",
    },
    {
      day: 2, date: "Wed Jul 7, 2027",
      title: "Into the Wall",
      tagline: "Six hundred more miles, then the prairie falls away.",
      type: "travel + activity",
      driving: "~600 mi, ~10h",
      slack: "~1 hour. The Door and Window walks are ten minutes each.",
      overnight: {
        name: "Cedar Pass Campground", place: "Badlands National Park, SD",
        kind: "National park campground", cost: "~$28/night est.",
        checkin: "Confirm the arrival cutoff", confirmation: "TBD",
        notes: "⚠️ Fee not verified — recreation.gov is unreachable from this session. The park's only developed campground with water. Sage Creek is the free primitive alternative and its access is <b>gravel</b>, so look before committing this car to it.",
      },
      schedule: [
        { kind: "drive", time: "6:30 AM", est: "10h", text: "→ Badlands NP via I-90 to Exit 131, then the Badlands Loop Road.", maps: "Badlands National Park Cedar Pass" },
        { kind: "stop", time: "5:00 PM", est: "45m", text: "Set up at Cedar Pass. Water here — the next reliable fill is Buffalo, Wyoming." },
        { kind: "hike", time: "6:15 PM", est: "1h", text: "<b>Door Trail and Window Trail.</b> Both under half a mile, both straight into the wall. The right first hour after two days in a car.", maps: "Door Trail Badlands National Park" },
        { kind: "sunset", time: "8:37 PM", text: "Sunset. Dark 9:07 PM. Waxing crescent 19%." },
      ],
      meals: { b: "packed", l: "packed", d: "made at camp" },
      highlights: "Two days of interstate and then a 200-foot escarpment of banded Oligocene mudstone with nothing in front of it. The contrast is the point of doing the drive in two pushes.",
      warnings: "Badlands heat. July highs run well into the 90s and there is <b>no shade anywhere in this park</b>. Everything walked here happens before 9 AM or after 6 PM.",
    },
    {
      day: 3, date: "Thu Jul 8, 2027",
      title: "Notch and Castle at First Light",
      tagline: "A ladder up a canyon wall, then the long flat one, both before the heat.",
      type: "activity",
      driving: "~40 mi within the park",
      slack: "Large after 11 AM, deliberately — the afternoon is unusable here.",
      overnight: {
        name: "Cedar Pass Campground", place: "Badlands National Park, SD",
        kind: "National park campground", cost: "~$28/night est.",
        checkin: "n/a — night 2 of 2", confirmation: "TBD", notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "5:08 AM", text: "Sunrise. First light 4:38 AM — be at the Notch trailhead for it." },
        { kind: "hike", time: "4:50 AM", est: "1h 30m", text: "<b>Notch Trail.</b> ✅ AllTrails: <b>1.2 mi, 118 ft, Moderate.</b> Short, and it involves a log ladder up a canyon wall and a ledge traverse to a notch over the White River valley. Rated 4.8 for 1.2 miles, which tells you it is the ladder people come for.", maps: "Notch Trail Badlands National Park" },
        { kind: "hike", time: "6:45 AM", est: "3h 30m", text: "<b>Castle Trail.</b> The long one — roughly 10 mi out and back across open badlands between the Door/Window lot and Fossil Exhibit. ⚠️ <b>Distance and gain NOT verified in AllTrails this session.</b> Flat, and completely exposed.", maps: "Castle Trail Badlands National Park" },
        { kind: "stop", time: "10:30 AM", est: "1h", text: "Back to camp. <b>The rest of the day is heat management, not laziness.</b>" },
        { kind: "drive", time: "6:00 PM", est: "1h", text: "<b>Sage Creek Rim Road</b> for the bison herd and the prairie dog towns at last light. Gravel but graded; turn around if it is not.", maps: "Sage Creek Rim Road Badlands", warn: true },
        { kind: "sunset", time: "8:36 PM", text: "Sunset from the rim. Dark 9:06 PM." },
      ],
      meals: { b: "made — pre-dawn", l: "made at camp", d: "made at camp" },
      highlights: "The Notch ladder is the most fun 1.2 miles on the eastern half of this route. Castle is the opposite — an hour of nothing but banded rock in every direction.",
      warnings: "<b>Zero shade and no water on either trail.</b> Castle in the afternoon in July is a genuine heat-injury hike, not an uncomfortable one. <b>Hard turnaround: off Castle by 10:30 AM regardless of where you are.</b> Carry more water than feels sensible.",
    },
    {
      day: 4, date: "Fri Jul 9, 2027",
      title: "Straight to Altitude",
      tagline: "Four hundred and fifty miles from a shadeless badland to a 9,100 ft lake camp.",
      type: "travel",
      driving: "~450 mi, ~8h",
      slack: "~1 hour.",
      noSignal: "From Buffalo west over US-16 and at the West Tensleep camps. Most of the next three days.",
      overnight: {
        name: "West Tensleep Lake Campground", place: "Bighorn NF, WY",
        kind: "USFS campground", cost: "~$20/night est.",
        checkin: "Mix of reservable and first-come — verify", confirmation: "TBD",
        notes: "⚠️ Fee and reservable/first-come split not verified. ✅ Several Cloud Peak Skyway campgrounds open June 5, so mid-July is well inside the season. At ~9,100 ft this is the first altitude camp, and the trailhead for Days 5 and 6 is right there.",
      },
      schedule: [
        { kind: "sunrise", time: "5:08 AM", text: "Sunrise. Break camp before the heat." },
        { kind: "drive", time: "6:00 AM", est: "5h", text: "→ Rapid City, then west on I-90. <b>Full resupply in Rapid City</b> — first of four on this trip.", maps: "Rapid City South Dakota", warn: true },
        { kind: "drive", time: "12:00 PM", est: "3h", text: "→ Buffalo WY, then <b>US-16 west, the Cloud Peak Skyway</b>, and the West Tensleep road. Fuel in Buffalo — nothing past it.", maps: "West Tensleep Lake Campground Wyoming" },
        { kind: "stop", time: "3:30 PM", est: "1h", text: "Set up at ~9,100 ft. <b>You slept at 2,500 ft last night.</b> That is a 6,600 ft jump in one day and it is the largest on the trip." },
        { kind: "hike", time: "5:00 PM", est: "45m", text: "<b>West Tensleep Falls.</b> ✅ AllTrails: <b>1.6 mi, 219 ft, Easy.</b> A leg-stretch from camp and an altitude test — if this feels harder than 1.6 flat miles should, tomorrow gets cut to Mirror Lake.", maps: "West Tensleep Falls Trailhead" },
        { kind: "sunset", time: "9:04 PM", text: "Sunset. Dark 9:29 PM. Waxing crescent 39%." },
      ],
      meals: { b: "made at camp", l: "bought — Rapid City", d: "made at camp" },
      highlights: "Paved road to a lake camp at 9,100 ft with the Cloud Peak Wilderness starting at the parking lot. This is the shape of trip the whole rule set was built for.",
      warnings: "🚨 <b>2,500 ft to 9,100 ft in one day.</b> The biggest altitude jump of the trip, and it now happens on day four rather than day seven, because the Black Hills stop that used to break it up was cut. <b>Tomorrow is 11 miles and 2,000 ft from that camp — if tonight is a bad night, take the Mirror Lake bail-out.</b> Do not push through a bad altitude night to keep an itinerary.",
    },
    {
      day: 5, date: "Sat Jul 10, 2027",
      title: "Lost Twin Lakes",
      tagline: "Two cirque lakes under a headwall, and the biggest day of the first week.",
      type: "activity",
      driving: "None — leaves from camp",
      slack: "Thin. This is what tomorrow's soft day protects.",
      overnight: {
        name: "West Tensleep Lake Campground", place: "Bighorn NF, WY",
        kind: "USFS campground", cost: "~$20/night est.",
        checkin: "n/a — night 2 of 3", confirmation: "TBD", notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "5:24 AM", text: "Sunrise. First light 4:58 AM." },
        { kind: "hike", time: "5:00 AM", est: "7h", text: "<b>Mirror Lake and Lost Twin Lakes.</b> ✅ AllTrails: <b>11.1 mi, 2,076 ft, Hard, out-and-back, ~321 min moving.</b> ⚠️ <b>Over the ~10 mi soft ceiling</b> — by a mile, at altitude, on your second day up here. It is in because the payoff is two lakes in a granite cirque with a wall straight above them, and the gain is comfortably under the 2,500 ft half of the ceiling.", maps: "West Tensleep Trailhead Bighorn National Forest", warn: true },
        { kind: "stop", time: "9:15 AM", est: "1h", text: "<b>Sit at Lost Twin.</b> The turnaround is the destination — an hour under the headwall is what the eleven miles buy." },
        { kind: "stop", time: "1:00 PM", est: "rest", text: "Back at camp. Eat, lie down, do nothing." },
        { kind: "sunset", time: "9:03 PM", text: "Sunset. Dark 9:29 PM. First quarter moon." },
      ],
      meals: { b: "made — pre-dawn, hot", l: "packed — eaten at the lakes", d: "made at camp" },
      highlights: "Eleven miles into the Cloud Peak Wilderness to a pair of lakes in a granite bowl, with no permit of any kind required to walk it.",
      warnings: "<b>Hard turnaround 10:00 AM.</b> Bighorn afternoon thunderstorms are reliable in July and the upper basin is open ground above treeline. On the descent by 11 is the plan; at the lakes at 1 PM is how you get caught. <b>Over the distance ceiling at altitude on day five — the bail-out is Mirror Lake at 5.9 mi / 1,095 ft, which is a complete day on its own.</b>",
    },
    {
      day: 6, date: "Sun Jul 11, 2027",
      title: "Crazy Woman, Carefully",
      tagline: "The first soft day: a short lake walk and a canyon road that gets looked at before it gets driven.",
      type: "rest",
      driving: "~60 mi if the canyon goes, ~20 if not",
      slack: "Enormous. That is the design. ⭐ SOFT DAY 1 OF 2.",
      overnight: {
        name: "West Tensleep Lake Campground", place: "Bighorn NF, WY",
        kind: "USFS campground", cost: "~$20/night est.",
        checkin: "n/a — night 3 of 3", confirmation: "TBD", notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "5:25 AM", text: "Sunrise. Sleep past it. First soft day of the trip." },
        { kind: "hike", time: "8:00 AM", est: "2h", text: "<b>Sherd Lake Trail.</b> ✅ AllTrails: <b>3.5 mi, 570 ft, Moderate.</b> Short, and the correct grade the day after eleven miles.", maps: "Sherd Lake Trailhead Bighorn National Forest" },
        { kind: "drive", time: "12:00 PM", est: "3h", text: "🚨 <b>Crazy Woman Canyon Road (FSR 33) — decide at the road, not before.</b> The registry lists this canyon's dispersed sites as the best-reviewed in the range. It is also unpaved, narrow, rocky and shelf-like in places, and this car has <b>5.9 inches of clearance and a low front air dam</b>. Drive to the top, look, and turn around without regret if it is not obviously fine. There is no prize for the bottom of that canyon in this car.", maps: "Crazy Woman Canyon Road Wyoming", warn: true },
        { kind: "stop", time: "afternoon", text: "If the canyon is out: the Skyway overlooks and Meadowlark Lake fill the afternoon with zero risk." },
        { kind: "sunset", time: "9:03 PM", text: "Sunset. Dark 9:28 PM. Waxing gibbous 61%." },
      ],
      meals: { b: "made at camp", l: "made at camp", d: "made at camp" },
      highlights: "The first of the two days held in reserve, in a place where doing nothing is easy: a lake at 3.5 miles and a scenic byway that needs no walking at all.",
      warnings: "<b>Crazy Woman Canyon is the single clearance decision on this trip.</b> This is exactly the failure mode the profile names — a good place behind a road this car should not be on. Look first. The trip does not need it.",
    },
    {
      day: 7, date: "Mon Jul 12, 2027",
      title: "Chief Joseph to the Plateau",
      tagline: "One of the great drives in North America, ending above 9,500 ft.",
      type: "travel",
      driving: "~230 mi, ~5h 30m",
      slack: "~1 hour. This drive takes longer than the map says.",
      noSignal: "From Cody west over the Chief Joseph Byway and all along US-212. Effectively the next four days.",
      overnight: {
        name: "Island Lake Campground", place: "Shoshone NF, WY — Beartooth Plateau",
        kind: "USFS campground", cost: "~$20/night est.",
        checkin: "Verify reservable vs first-come", confirmation: "TBD",
        notes: "⚠️ <b>9,518 ft.</b> ⚠️ Its opening date is the one fact two published sources flatly contradict — one says late May, one says July 1 or earlier depending on snowpack. <b>By mid-July it is moot, which is precisely why this trip is in July and not June.</b> Beartooth Lake is the neighbouring fallback and typically opens late June.",
      },
      schedule: [
        { kind: "sunrise", time: "5:25 AM", text: "Sunrise. Break camp." },
        { kind: "drive", time: "6:30 AM", est: "3h", text: "→ Cody WY via Ten Sleep and the Bighorn Basin. <b>Third resupply — fuel, groceries, block ice.</b> Nothing between here and Great Falls is a real grocery.", maps: "Cody Wyoming", warn: true },
        { kind: "drive", time: "10:30 AM", est: "2h 30m", text: "<b>Chief Joseph Scenic Byway (WY-296) then US-212 west.</b> Dead Indian Pass, then the switchbacks up onto the plateau. Paved throughout.", maps: "Chief Joseph Scenic Byway Wyoming" },
        { kind: "stop", time: "1:30 PM", est: "1h", text: "Set up at Island Lake. ⚠️ <b>You are at 9,518 ft and it can snow here in July.</b> Pitch properly, not quickly." },
        { kind: "stop", time: "3:00 PM", est: "2h", text: "Nothing. Walk the lakeshore, look at the plateau." },
        { kind: "sunset", time: "9:14 PM", text: "Sunset. Dark 9:40 PM. Waxing gibbous 70%." },
      ],
      meals: { b: "made at camp", l: "bought — Cody", d: "made at camp" },
      highlights: "US-212 is paved above 9,500 ft, which is the whole argument for this place: everywhere else, emptiness and short approaches trade off against each other. Here they do not.",
      warnings: "<b>Weather at 9,500 ft in July includes snow.</b> Not likely, entirely possible. The Siesta 20 and the R-7 pad are correctly specified for this camp and nothing else on the trip. <b>This is also the highest, most exposed camp and the one furthest from help.</b>",
    },
    {
      day: 8, date: "Tue Jul 13, 2027",
      title: "The High Lakes",
      tagline: "A loop past a dozen lakes on a plateau above the trees.",
      type: "activity",
      driving: "~2 mi",
      slack: "~3 hours.",
      overnight: { name: "Island Lake Campground", place: "Beartooth Plateau, WY", kind: "USFS campground", cost: "~$20/night est.", checkin: "n/a — night 2 of 3", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:33 AM", text: "Sunrise. First light 5:08 AM." },
        { kind: "hike", time: "6:00 AM", est: "5h", text: "<b>Beauty Lake and Beartooth High Lakes Loop.</b> ✅ AllTrails: <b>7.7 mi, 1,161 ft, Moderate, loop, ~205 min.</b> The trailhead is <b>half a mile from the campground</b>. Above treeline almost immediately, past lake after lake. This is the single best expression of the car-camping rule set on the entire route.", maps: "Beartooth High Lakes Trailhead Island Lake" },
        { kind: "stop", time: "9:00 AM", est: "1h 30m", text: "<b>Sit at Beauty Lake.</b> An hour and a half. Nothing to hurry for." },
        { kind: "stop", time: "afternoon", text: "Camp. Watching a thunderstorm build from a safe place is the correct plateau afternoon." },
        { kind: "sunset", time: "9:13 PM", text: "Sunset. Dark 9:39 PM. Waxing gibbous 79%." },
      ],
      meals: { b: "made — hot, it will be near freezing", l: "packed", d: "made at camp" },
      highlights: "Seven and a half miles across a lake-strewn plateau above 9,500 ft, starting on foot from the tent. No permit, no shuttle, no quota.",
      warnings: "<b>Above treeline for most of the loop.</b> Beartooth afternoon storms build fast and there is no cover. <b>Hard turnaround noon.</b> Freezing nights at this elevation in July are normal — that is what the bag is for.",
    },
    {
      day: 9, date: "Wed Jul 14, 2027",
      title: "Becker Lake and the Lookout",
      tagline: "A longer, flatter walk, and a fire tower over the whole range.",
      type: "activity",
      driving: "~20 mi",
      slack: "~2 hours.",
      overnight: { name: "Island Lake Campground", place: "Beartooth Plateau, WY", kind: "USFS campground", cost: "~$20/night est.", checkin: "n/a — night 3 of 3", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:34 AM", text: "Sunrise. First light 5:09 AM." },
        { kind: "hike", time: "6:00 AM", est: "4h", text: "<b>Becker Lake via Beartooth High Lakes Trail.</b> ✅ AllTrails: <b>8.0 mi, 715 ft, Moderate, ~181 min.</b> Longer than yesterday and much flatter — the gain is a third of it. A good second day at altitude.", maps: "Beartooth High Lakes Trail Wyoming" },
        { kind: "drive", time: "1:00 PM", est: "45m", text: "→ <b>Clay Butte Lookout.</b> A fire tower on a spur road with the Beartooths on one side and the Absarokas on the other. ⚠️ The spur is gravel — assess it.", maps: "Clay Butte Lookout Wyoming", warn: true },
        { kind: "stop", time: "2:00 PM", est: "1h 30m", text: "The lookout. Best single view on the route that costs no walking." },
        { kind: "sunset", time: "9:13 PM", text: "Sunset. Dark 9:38 PM. Waxing gibbous 87%." },
      ],
      meals: { b: "made — hot", l: "packed", d: "made at camp" },
      highlights: "Eight nearly-flat miles at 9,500 ft, then a fire lookout you can drive most of the way to. The plateau does not make you choose between effort and payoff.",
      warnings: "Same storm pattern. Clay Butte's access road is gravel and its condition is unverified — the lookout is optional and the car is not.",
    },
    {
      day: 10, date: "Thu Jul 15, 2027",
      title: "Down Into Lamar",
      tagline: "Off the plateau into the best wildlife valley in the lower 48.",
      type: "travel + activity",
      driving: "~70 mi, ~2h",
      slack: "Depends entirely on whether the site came through. See the warning.",
      overnight: {
        name: "⚠️ Slough Creek Campground — 16 sites", place: "Yellowstone NP, WY",
        kind: "National park campground", cost: "~$20/night est.",
        checkin: "Reservable — and it goes in minutes", confirmation: "TBD",
        notes: "🚨 <b>The single worst booking risk on this trip, kept on purpose.</b> <b>Pebble Creek</b>, the obvious base at the foot of the Beartooth Highway, has been <b>closed for flood recovery since June 2022</b> and was still listed closed for 2025 — its 2027 status is unknown. That leaves <b>Slough Creek at 16 sites, which fills within minutes</b>. It is kept because the alternative — Lamar as a day trip off the plateau — loses the dawn, and dawn is the whole point of a wildlife valley. <b>Fallback if it fails: a fourth plateau night with Lamar as a long day trip, or a motel in Cooke City or Gardiner.</b>",
      },
      schedule: [
        { kind: "sunrise", time: "5:34 AM", text: "Sunrise. Break camp." },
        { kind: "drive", time: "7:00 AM", est: "2h", text: "→ Yellowstone NE entrance via Cooke City. <b>Cooke City is the last fuel for a long way and it is expensive.</b> Fill anyway.", maps: "Yellowstone Northeast Entrance Cooke City" },
        { kind: "stop", time: "9:00 AM", est: "1h", text: "Take the site. If it did not come through, trigger the fallback by 10 AM — do not spend the day hoping." },
        { kind: "drive", time: "5:00 PM", est: "3h", text: "<b>Lamar Valley at last light.</b> Bison, elk, and the wolf packs the valley is famous for. <b>Pull-outs only, stay in or beside the car, 25 yards from bison and 100 from wolves and bears.</b>", maps: "Lamar Valley Yellowstone", warn: true },
        { kind: "sunset", time: "9:13 PM", text: "Sunset. Dark 9:40 PM. Waxing gibbous 93%." },
      ],
      meals: { b: "made at camp", l: "packed", d: "made — early, so the valley gets last light" },
      highlights: "The Lamar at dusk with the plateau you came off filling the rear-view. Almost no hiking today and that is correct — it is a wildlife day and wildlife happens from a pull-out.",
      warnings: "<b>Grizzly country, properly, and it starts here.</b> Bear spray on the person, not in the car. All food and anything scented in the bear box, every time, including toothpaste. <b>Do not approach anything.</b> The valley injures someone walking toward a bison for a photograph roughly every other year.",
    },
    {
      day: 11, date: "Fri Jul 16, 2027",
      title: "The Long Push North",
      tagline: "Four hundred and thirty miles of Montana, and then seven nights in one park.",
      type: "travel",
      driving: "~430 mi, ~8h",
      slack: "None. Longest day between anchors.",
      overnight: {
        name: "Many Glacier Campground", place: "Glacier National Park, MT",
        kind: "National park campground", cost: "~$23/night est.",
        checkin: "🚨 Book mid-January 2027", confirmation: "TBD",
        notes: "🚨 <b>THE booking of this trip.</b> ✅ 6-month rolling window on recreation.gov, released daily; Many Glacier is one of the three that go the day they open. <b>Arriving without a reservation is not a plan.</b> If it fails: Two Medicine and St. Mary are the fallbacks and the Many Glacier half reshapes around whichever you get.",
      },
      schedule: [
        { kind: "sunrise", time: "5:40 AM", text: "Sunrise. Break camp in the dark if it saves an hour." },
        { kind: "drive", time: "6:00 AM", est: "8h", text: "→ Many Glacier via Livingston, Great Falls and Browning. <b>Fourth and final resupply in Great Falls</b> — East Glacier has almost nothing. Last realistic laundry too.", maps: "Many Glacier Campground Glacier National Park", warn: true },
        { kind: "stop", time: "3:00 PM", est: "1h", text: "Check in. ✅ <b>No vehicle reservation.</b> Entry pass required and the America the Beautiful pass covers it." },
        { kind: "hike", time: "5:00 PM", est: "1h", text: "<b>Swiftcurrent Nature Trail.</b> ✅ AllTrails: <b>2.6 mi, 131 ft, Easy, loop.</b> A flat lap of Swiftcurrent Lake after eight hours of driving.", maps: "Swiftcurrent Nature Trail Many Glacier" },
        { kind: "sunset", time: "9:40 PM", text: "Sunset. Dark 10:12 PM. Nearly 17 hours of light up here." },
      ],
      meals: { b: "made at camp", l: "bought — Great Falls", d: "made at camp" },
      highlights: "The Many Glacier valley is the reason the park has the reputation it has, and you arrive with four hours of light still in the day.",
      warnings: "Eight hours after ten days of driving is when the mistake happens. <b>Stop every two hours whether it feels necessary or not.</b> Deer and elk on the road after Browning at dusk.",
    },
    {
      day: 12, date: "Sat Jul 17, 2027",
      title: "Easy Saturday",
      tagline: "Short walks from camp on the busiest day of the week, on purpose.",
      type: "rest",
      driving: "~2 mi",
      slack: "Large.",
      overnight: { name: "Many Glacier Campground", place: "Glacier NP, MT", kind: "National park campground", cost: "~$23/night est.", checkin: "n/a — night 2 of 4", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:41 AM", text: "Sunrise. First light 5:09 AM. No alarm." },
        { kind: "hike", time: "8:00 AM", est: "2h", text: "<b>Redrock Falls.</b> ✅ AllTrails: <b>3.7 mi, 255 ft, Easy.</b> From the Swiftcurrent trailhead at camp.", maps: "Redrock Falls Trail Many Glacier" },
        { kind: "hike", time: "11:00 AM", est: "2h 30m", text: "<b>Bullhead Lake via Swiftcurrent Pass Trail.</b> ✅ AllTrails: <b>6.8 mi, 446 ft, Easy, ~144 min.</b> Same valley, further in. <b>Pick one of these two if the legs are done</b> — this is a soft-landing day, not a target.", maps: "Bullhead Lake Trail Many Glacier" },
        { kind: "stop", time: "afternoon", text: "Camp. Reorganise, wash something, look at the wall." },
        { kind: "sunset", time: "9:39 PM", text: "Sunset. Dark 10:11 PM. <b>Full moon</b> over the Many Glacier valley." },
      ],
      meals: { b: "made at camp", l: "made at camp", d: "made at camp" },
      highlights: "Two easy valley walks with 3,000-foot walls on either side, on the day every trailhead in the park is at its worst.",
      warnings: "<b>Saturday in Glacier in mid-July is the busiest combination on this route.</b> Everything today leaves on foot from the campground, which is why it is scheduled here rather than a marquee hike. Bear country — noise on the Swiftcurrent valley trails, they are heavily used by both people and bears.",
    },
    {
      day: 13, date: "Sun Jul 18, 2027",
      title: "Iceberg Lake",
      tagline: "A cirque lake with ice still floating in it in July.",
      type: "activity",
      driving: "~1 mi",
      slack: "~2 hours.",
      overnight: { name: "Many Glacier Campground", place: "Glacier NP, MT", kind: "National park campground", cost: "~$23/night est.", checkin: "n/a — night 3 of 4", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:42 AM", text: "Sunrise. First light 5:10 AM." },
        { kind: "hike", time: "5:00 AM", est: "6h", text: "<b>Iceberg Lake.</b> ✅ AllTrails: <b>9.7 mi, 1,453 ft, Moderate, out-and-back, ~257 min.</b> Fits the ceiling on both counts. The lake sits in a 3,000-ft cirque that keeps it frozen so late that bergs float in it into August.", maps: "Iceberg Lake Trailhead Many Glacier" },
        { kind: "stop", time: "8:30 AM", est: "1h", text: "<b>Sit at the lake.</b> This is the hour the day is for." },
        { kind: "stop", time: "afternoon", text: "Camp. Deliberate half-day before tomorrow." },
        { kind: "sunset", time: "9:38 PM", text: "Sunset. Dark 10:10 PM. Full moon." },
      ],
      meals: { b: "made — pre-dawn", l: "packed", d: "made at camp" },
      highlights: "Icebergs in July, on a trail that fits inside the day ceiling with room to spare. The best effort-to-payoff hike on the whole route.",
      warnings: "🚨 <b>Grizzly country and this is a known bear corridor.</b> Bear spray, noise on blind corners, do not hike it silent at dawn. <b>The Many Glacier lot fills by 7 AM in July</b> — the 5 AM start is the parking plan as much as the light plan. ⚠️ It lands on a Sunday, which is the one crowd compromise the 21-day cut forced; dawn is the mitigation.",
    },
    {
      day: 14, date: "Mon Jul 19, 2027",
      title: "Grinnell Glacier",
      tagline: "The hardest day of the trip, on a Monday, on the trail the park is named for.",
      type: "activity",
      driving: "~1 mi",
      slack: "Thin. Everything else today bends around this.",
      overnight: { name: "Many Glacier Campground", place: "Glacier NP, MT", kind: "National park campground", cost: "~$23/night est.", checkin: "n/a — night 4 of 4", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:43 AM", text: "Sunrise. First light 5:12 AM." },
        { kind: "hike", time: "5:00 AM", est: "8h", text: "<b>Grinnell Glacier Trail.</b> ✅ AllTrails: <b>11.1 mi, 2,047 ft, Hard, out-and-back, ~319 min moving.</b> ⚠️ <b>Over the distance ceiling by about a mile</b>, under the gain half. The payoff is standing at a glacier that has lost most of its area in a century and is documented doing it. <b>The boat shuttle across Swiftcurrent and Josephine cuts ~3.4 mi off</b> if it is running and you want the shorter version.", maps: "Grinnell Glacier Trailhead Many Glacier", warn: true },
        { kind: "stop", time: "9:15 AM", est: "1h 30m", text: "<b>Sit at the glacier basin.</b> Longest sit of the trip, and the one it was all built toward." },
        { kind: "sunset", time: "9:37 PM", text: "Sunset. Dark 10:08 PM." },
      ],
      meals: { b: "made — pre-dawn, hot", l: "packed — eaten at the glacier", d: "made at camp — low effort, you will be finished" },
      highlights: "The single biggest day on the route and the reason the trip is Glacier-anchored rather than Beartooth-anchored — landed on a Monday, the best day of the week it could have got.",
      warnings: "<b>Hard turnaround 10:30 AM at the glacier basin regardless of where you are.</b> ⚠️ <b>Snowfields across the upper trail persist into late July most years</b> and the traverse above the lake is exposed — if a snowfield looks doubtful, that is the turnaround, not a problem to solve. Grizzly corridor again. Over the distance ceiling on day fourteen — <b>if yesterday hurt, take the boat.</b>",
    },
    {
      day: 15, date: "Tue Jul 20, 2027",
      title: "Over the Sun Road",
      tagline: "The drive people come to Glacier for, done as a transfer so it isn't a fight.",
      type: "travel + activity",
      driving: "~60 mi, ~2h 30m over Going-to-the-Sun",
      slack: "~2 hours.",
      overnight: {
        name: "Apgar or Avalanche Campground", place: "Glacier NP — west side, MT",
        kind: "National park campground", cost: "~$23/night est.",
        checkin: "🚨 Same mid-January booking as Many Glacier", confirmation: "TBD",
        notes: "⚠️ <b>Second competitive Glacier booking.</b> Apgar and Avalanche both go the day their window opens. Book both halves of the Glacier stay in the same January sitting. ⭐ <b>Apgar is the first realistic shower since leaving home fifteen days ago</b>, now that the Custer State Park stop is cut.",
      },
      schedule: [
        { kind: "sunrise", time: "5:44 AM", text: "Sunrise. Break camp slowly." },
        { kind: "drive", time: "8:00 AM", est: "2h 30m", text: "→ west side over <b>Going-to-the-Sun Road</b>. ✅ It opened June 22 in 2026 and typically opens late June/early July, so mid-July is safe. ⚠️ <b>Logan Pass parking is capped at 3 hours from July 1 and the lot fills by 8 AM</b> — pass through today, walk it tomorrow.", maps: "Going-to-the-Sun Road Logan Pass", warn: true },
        { kind: "hike", time: "1:00 PM", est: "2h 30m", text: "<b>Avalanche Lake.</b> ✅ AllTrails: <b>6.1 mi, 780 ft, Moderate, ~153 min.</b> Cedar forest, then a lake with waterfalls dropping into it from three sides. Busy, and worth it anyway.", maps: "Avalanche Lake Trailhead Glacier" },
        { kind: "stop", time: "afternoon", est: "1h", text: "Camp. <b>Shower.</b> Fifteen days." },
        { kind: "sunset", time: "9:36 PM", text: "Sunset. Dark 10:07 PM." },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "The Sun Road as a transfer rather than a destination means you are not fighting for a parking space at the top of it.",
      warnings: "<b>Logan Pass at midday in July is the worst parking in the park.</b> Do not plan to stop there today. The 3-hour limit from July 1 means even if you get in, you are on a clock.",
    },
    {
      day: 16, date: "Wed Jul 21, 2027",
      title: "The Highline",
      tagline: "A ledge cut along the Garden Wall, walked at first light on the best day of the week for it.",
      type: "activity",
      driving: "~35 mi, or the shuttle",
      slack: "~2 hours.",
      overnight: { name: "Apgar / Avalanche", place: "Glacier NP — west side", kind: "National park campground", cost: "~$23/night est.", checkin: "n/a", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:45 AM", text: "Sunrise. First light 5:14 AM." },
        { kind: "drive", time: "4:45 AM", est: "1h", text: "→ Logan Pass, <b>before the lot fills</b>. ⚠️ Alternative: the <b>$1 ticketed shuttle</b> — some released on a 60-day rolling window, most released 7 PM the night before. <b>That shuttle is what makes a point-to-point version of this hike possible</b>, which otherwise needs a second car.", maps: "Logan Pass Visitor Center", warn: true },
        { kind: "hike", time: "6:00 AM", est: "6h", text: "<b>Haystack Butte via the Highline Trail.</b> ✅ AllTrails: <b>8.6 mi, 1,768 ft, Hard, out-and-back.</b> ⚠️ The full Highline Trail is <b>15.2 mi / 2,572 ft — over the ceiling on both counts</b>, so this is the version that fits. The first mile is a ledge cut into the Garden Wall with a hand cable and a long drop; after that it opens out.", maps: "Highline Trail Logan Pass" },
        { kind: "stop", time: "9:00 AM", est: "1h", text: "Sit at Haystack. Turn around." },
        { kind: "hike", time: "1:00 PM", est: "1h 30m", text: "<b>Hidden Lake Overlook</b> if the legs have it. ✅ AllTrails: <b>2.8 mi, 567 ft, Moderate, ~84 min.</b> Straight from the Logan Pass lot.", maps: "Hidden Lake Overlook Trailhead" },
        { kind: "sunset", time: "9:35 PM", text: "Sunset. Dark 10:06 PM." },
      ],
      meals: { b: "made — pre-dawn", l: "packed", d: "made at camp" },
      highlights: "The Highline Trail's opening ledge is the most exposed piece of trail on the route and it is over in a mile. Haystack Butte is where it stops being a corridor and becomes a plateau.",
      warnings: "🚨 <b>The Garden Wall ledge is genuinely exposed</b> — a hand cable bolted to the rock with a long drop below. It is not technical and it is not a scramble, but it is a bad place to be nervous, and the profile's line about caution around single high-consequence moves applies here. <b>If the ledge does not feel right, turn around at the cable</b> — Hidden Lake alone is a good day. <b>Logan Pass parking is capped at 3 hours from July 1</b>, so a 6 AM start on a hike this long means the shuttle back, not the lot.",
    },
    {
      day: 17, date: "Thu Jul 22, 2027",
      title: "Slack",
      tagline: "The day the trip keeps in its pocket, with two waterfalls as the default.",
      type: "rest",
      driving: "~70 mi if the falls happen",
      slack: "This day IS the slack. ⭐ SOFT DAY 2 OF 2.",
      overnight: { name: "Apgar / Avalanche", place: "Glacier NP — west side", kind: "National park campground", cost: "~$23/night est.", checkin: "n/a — last Glacier night", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "note", time: "—", text: "<b>Unscheduled on purpose.</b> Seventeen days in, something will have been weathered out, closed, sold out or simply missed. This is where it goes. <b>Ptarmigan Tunnel</b> (10.7 mi / 2,362 ft) is the obvious ambitious use of it if nothing needs rescuing." },
        { kind: "hike", time: "7:00 AM", est: "1h 30m", text: "<b>Default if nothing needs the day: St. Mary and Virginia Falls.</b> ✅ AllTrails: <b>3.1 mi, 469 ft, Moderate, ~83 min.</b> Two waterfalls on a short trail off the east end of the Sun Road.", maps: "St Mary Falls Trailhead Glacier" },
        { kind: "stop", time: "9:00 AM", est: "3h", text: "Sit at Virginia Falls, then drive the Sun Road slowly in whichever direction you have not done at leisure." },
        { kind: "stop", time: "evening", text: "Pack for the drive home. Last night in the mountains." },
        { kind: "sunset", time: "9:34 PM", text: "Sunset. Dark 10:05 PM." },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp — start clearing the cooler" },
      highlights: "A whole day held in reserve seventeen days into a trip is worth more than any hike that could be scheduled in it.",
      warnings: "The temptation is to fill this in advance. Don't. That is what the falls are for — a default, not a plan.",
    },
    {
      day: 18, date: "Fri Jul 23, 2027",
      title: "East to the Other Badlands",
      tagline: "Five hundred and fifty miles, and a different badland at the end of it.",
      type: "travel",
      driving: "~550 mi, ~9h 30m",
      slack: "None.",
      overnight: {
        name: "Cottonwood Campground", place: "Theodore Roosevelt NP — South Unit, ND",
        kind: "National park campground", cost: "~$14/night est.",
        checkin: "Part reservable, part first-come — verify", confirmation: "TBD",
        notes: "⚠️ Fee and booking split not verified. Wild horses use this campground area, which is not a hazard so much as a thing that will happen.",
      },
      schedule: [
        { kind: "sunrise", time: "5:47 AM", text: "Sunrise. Break camp." },
        { kind: "drive", time: "6:30 AM", est: "9h 30m", text: "→ Theodore Roosevelt NP South Unit via US-2 east, then I-94. <b>A different road home than the road out</b> — this is what keeps the no-road-twice rule intact across 4,300 miles.", maps: "Theodore Roosevelt National Park South Unit" },
        { kind: "hike", time: "6:30 PM", est: "30m", text: "<b>Wind Canyon Trail.</b> ✅ AllTrails: <b>0.5 mi, 62 ft, Easy, loop.</b> Half a mile to a bend of the Little Missouri at golden hour. The correct end to a 550-mile day.", maps: "Wind Canyon Trail Theodore Roosevelt" },
        { kind: "sunset", time: "8:43 PM", text: "Sunset. Dark 9:14 PM. Waning gibbous 78%." },
      ],
      meals: { b: "made at camp", l: "bought — somewhere on US-2", d: "made at camp" },
      highlights: "Ending a nine-hour drive on a half-mile walk to a river bend, with bison somewhere in the dark.",
      warnings: "Longest driving day of the trip and it comes at day 18. <b>This is the day to consider a motel instead if the tiredness is real.</b>",
    },
    {
      day: 19, date: "Sat Jul 24, 2027",
      title: "Coal Seams and Wild Horses",
      tagline: "Badlands that burn, and the last real day of the trip.",
      type: "activity",
      driving: "~50 mi in the park",
      slack: "Large.",
      overnight: { name: "Cottonwood Campground", place: "Theodore Roosevelt NP, ND", kind: "National park campground", cost: "~$14/night est.", checkin: "n/a — night 2 of 2", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:18 AM", text: "Sunrise. First light 4:47 AM." },
        { kind: "hike", time: "5:30 AM", est: "3h", text: "<b>Big Plateau and Ekblom Trail Loop.</b> ✅ AllTrails: <b>5.2 mi, 534 ft, Moderate, loop, ~122 min.</b> Up onto a plateau above the Little Missouri. Bison and wild horses use it, so give them the trail.", maps: "Ekblom Trailhead Theodore Roosevelt National Park" },
        { kind: "stop", time: "9:00 AM", est: "1h", text: "Sit on the plateau." },
        { kind: "drive", time: "11:00 AM", est: "2h", text: "<b>Scenic Loop Drive</b> and the <b>Coal Vein Trail</b> (0.8 mi, 29 ft) — a seam that burned underground for 26 years and baked the surrounding clay into red scoria. Geology you can see having happened.", maps: "Coal Vein Trail Theodore Roosevelt" },
        { kind: "hike", time: "5:00 PM", est: "1h 45m", text: "<b>Painted Canyon Trail.</b> ✅ AllTrails: <b>4.2 mi, 446 ft, Moderate.</b> Down into the canyon from the overlook, in evening light.", maps: "Painted Canyon Overlook Theodore Roosevelt" },
        { kind: "sunset", time: "8:41 PM", text: "Sunset. Dark 9:13 PM." },
      ],
      meals: { b: "made — pre-dawn", l: "made at camp", d: "made at camp" },
      highlights: "A coal seam that burned for 26 years, wild horses, and the last badlands before two days of interstate. A quiet, underrated end to the route.",
      warnings: "Bison on the trails here, genuinely and often. <b>Give them 25 yards and go around.</b> Heat again — the North Dakota badlands run as hot as the South Dakota ones and have as little shade.",
    },
    {
      day: 20, date: "Sun Jul 25, 2027",
      title: "East",
      tagline: "The first of two long ones.",
      type: "travel",
      driving: "~650 mi, ~11h",
      slack: "None.",
      overnight: {
        name: "TBD — Minnesota / Wisconsin", place: "TBD",
        kind: "Transit night — not identified", cost: "~$30 est.",
        checkin: "Unknown", confirmation: "TBD",
        notes: "⚠️ <b>Last unidentified transit night.</b> Solve it with Day 1's at the same time. Given this is a 650-mile day at the end of three weeks, a motel here is a defensible use of the contingency line in the budget.",
      },
      schedule: [
        { kind: "drive", time: "6:00 AM", est: "11h", text: "→ east on I-94 through North Dakota and Minnesota. <b>Two 650-mile days is how a 1,300-mile run home fits into 21 days</b> — longer than the outbound days, and at the worse end of the trip.", warn: true },
      ],
      meals: { b: "made at camp", l: "packed", d: "bought" },
      highlights: "Nothing. That is fine.",
      warnings: "Longer than any day on the way out, at day 20. <b>Two-hour stops, no exceptions.</b> If it is going badly, stop early and make Day 21 the long one instead — nothing depends on the split.",
    },
    {
      day: 21, date: "Mon Jul 26, 2027",
      title: "Home",
      tagline: "Nineteen days until Alaska.",
      type: "travel",
      driving: "~650 mi, ~11h",
      slack: "All of it — nothing is waiting.",
      overnight: null,
      schedule: [
        { kind: "drive", time: "6:00 AM", est: "11h", text: "→ Avon OH. <b>Time the Chicago window one last time</b> — before 10 AM or after 7 PM.", warn: true },
        { kind: "note", time: "arrival", text: "<b>Kenai leaves Aug 14.</b> Nineteen days to unpack, service the car, do laundry and repack for a fly-in trip. That gap is why this trip ends July 26." },
      ],
      meals: { b: "packed", l: "bought", d: "home" },
      highlights: "4,300 miles, four anchors, seven nights at Glacier, and three states you had never camped in.",
      warnings: "The car has done 4,300 miles. <b>Get it looked at before Alaska, not after.</b>",
    },
  ],

  hikes: {
    title: "Hikes &amp; Trails",
    summary:
      "Every figure is AllTrails, looked up 2026-09-06. Roughly 95 miles on foot across 21 days, and Day 12 is a pick-one-of-two rather than a target. <b>Two scheduled hikes exceed the ~10 mi soft ceiling</b> — Lost Twin Lakes and Grinnell Glacier — and both carry the shorter bail-out that replaces them. Three well-known trails are named and explicitly NOT scheduled because they blow the ceiling outright.",
    rows: [
      { name: "Notch Trail", day: 3, distance: "1.2 mi RT", gain: "118 ft", difficulty: "Moderate", duration: "~1 hr", notes: "Log ladder up a canyon wall, then a ledge to the notch. No shade, no water. Dawn." },
      { name: "Castle Trail", day: 3, distance: "~10 mi RT", gain: "minimal", difficulty: "Moderate", duration: "~3.5 hr", notes: "⚠️ Stats NOT verified in AllTrails this session. Flat, fully exposed prairie badlands. Off it by 10:30 AM." },
      { name: "West Tensleep Falls", day: 4, distance: "1.6 mi RT", gain: "219 ft", difficulty: "Easy", duration: "~45 min", notes: "The altitude test after a 6,600 ft gain in one day. If 1.6 flat miles feels hard, tomorrow becomes Mirror Lake." },
      { name: "Mirror Lake + Lost Twin Lakes", day: 5, distance: "11.1 mi RT", gain: "2,076 ft", difficulty: "Hard", duration: "~6–7 hr", notes: "⚠️ <b>Over the 10 mi ceiling.</b> Two cirque lakes under a headwall. Turnaround 10 AM for storms. <b>Bail-out: Mirror Lake alone, 5.9 mi / 1,095 ft.</b>" },
      { name: "Sherd Lake", day: 6, distance: "3.5 mi RT", gain: "570 ft", difficulty: "Moderate", duration: "~1.5 hr", notes: "The soft-day walk." },
      { name: "Beauty Lake + Beartooth High Lakes Loop", day: 8, distance: "7.7 mi loop", gain: "1,161 ft", difficulty: "Moderate", duration: "~4–5 hr", notes: "⭐ Trailhead 0.5 mi from the tent, above treeline almost at once. Best expression of the rule set on the route. Turnaround noon." },
      { name: "Becker Lake via Beartooth High Lakes", day: 9, distance: "8.0 mi RT", gain: "715 ft", difficulty: "Moderate", duration: "~3–4 hr", notes: "Longer and much flatter than Day 8. Good second day at 9,500 ft." },
      { name: "Swiftcurrent Nature Trail", day: 11, distance: "2.6 mi loop", gain: "131 ft", difficulty: "Easy", duration: "~1 hr", notes: "Flat lap after eight hours of driving." },
      { name: "Redrock Falls", day: 12, distance: "3.7 mi RT", gain: "255 ft", difficulty: "Easy", duration: "~1.5 hr", notes: "Leaves from camp. Saturday soft-landing day." },
      { name: "Bullhead Lake via Swiftcurrent Pass Trail", day: 12, distance: "6.8 mi RT", gain: "446 ft", difficulty: "Easy", duration: "~2.5 hr", notes: "Same valley, further in. <b>Pick one of these two, not both, if the legs are done.</b>" },
      { name: "Iceberg Lake", day: 13, distance: "9.7 mi RT", gain: "1,453 ft", difficulty: "Moderate", duration: "~5–6 hr", notes: "⭐ Fits the ceiling on both counts. Bergs in the lake into August. Known bear corridor. Lot fills by 7 AM — 5 AM start." },
      { name: "Grinnell Glacier", day: 14, distance: "11.1 mi RT", gain: "2,047 ft", difficulty: "Hard", duration: "~7–8 hr", notes: "⚠️ <b>Over the 10 mi ceiling.</b> Biggest day of the trip, landed on a Monday. Snowfields on the upper traverse into late July. <b>Bail-out: the boat cuts ~3.4 mi.</b> Turnaround 10:30 AM." },
      { name: "Avalanche Lake", day: 15, distance: "6.1 mi RT", gain: "780 ft", difficulty: "Moderate", duration: "~2.5 hr", notes: "Cedar forest to a lake with waterfalls on three sides. Busy; worth it." },
      { name: "Haystack Butte via the Highline Trail", day: 16, distance: "8.6 mi RT", gain: "1,768 ft", difficulty: "Hard", duration: "~5–6 hr", notes: "🚨 First mile is an exposed ledge with a hand cable. <b>Turn around at the cable if it doesn't feel right.</b> This is the version of the Highline Trail that fits the ceiling." },
      { name: "Hidden Lake Overlook", day: 16, distance: "2.8 mi RT", gain: "567 ft", difficulty: "Moderate", duration: "~1.5 hr", notes: "Straight from the Logan Pass lot. Add-on only if the legs have it." },
      { name: "St. Mary and Virginia Falls", day: 17, distance: "3.1 mi RT", gain: "469 ft", difficulty: "Moderate", duration: "~1.5 hr", notes: "The slack day's default, not its plan." },
      { name: "Big Plateau + Ekblom Loop", day: 19, distance: "5.2 mi loop", gain: "534 ft", difficulty: "Moderate", duration: "~2 hr", notes: "Plateau above the Little Missouri. Bison and wild horses on the trail." },
      { name: "Painted Canyon Trail", day: 19, distance: "4.2 mi RT", gain: "446 ft", difficulty: "Moderate", duration: "~1.5–2 hr", notes: "Down into the canyon from the overlook. Evening light." },
      { name: "Ptarmigan Tunnel — SLACK-DAY OPTION", day: null, distance: "10.7 mi RT", gain: "2,362 ft", difficulty: "Hard", duration: "~5.5 hr", notes: "A tunnel blasted through a rock wall in 1930. Over the distance ceiling and it competes with Iceberg Lake from the same trailhead — which is why it is the Day 17 option rather than a scheduled day." },
      { name: "The full Highline Trail — NOT SCHEDULED", day: null, distance: "15.2 mi RT", gain: "2,572 ft", difficulty: "Hard", duration: "~7 hr", notes: "⚠️ <b>Over the ceiling on both counts.</b> Listed so the Haystack Butte substitution is a visible decision. Granite Park Chalet point-to-point (11.6 mi) is the shuttle-dependent middle option." },
      { name: "Cloud Peak via Mistymoon — NOT POSSIBLE", day: null, distance: "22.6 mi RT", gain: "5,337 ft", difficulty: "Strenuous", duration: "~12 hr", notes: "🚨 Double the ceiling and an overnight for almost everyone. The Bighorns' marquee summit is a backpacking trip, which the locked rule set excludes." },
    ],
  },

  sunMoon: [
    { date: "Wed 7/7", location: "Badlands", firstLight: "4:37 AM", sunrise: "5:08 AM", sunset: "8:37 PM", dark: "9:07 PM", moon: "18.6% waxing" },
    { date: "Thu 7/8", location: "Badlands", firstLight: "4:38 AM", sunrise: "5:08 AM", sunset: "8:36 PM", dark: "9:06 PM", moon: "28.4%" },
    { date: "Fri 7/9", location: "Bighorns", firstLight: "4:58 AM", sunrise: "5:23 AM", sunset: "9:04 PM", dark: "9:29 PM", moon: "39.2%" },
    { date: "Sat 7/10", location: "Bighorns", firstLight: "4:58 AM", sunrise: "5:24 AM", sunset: "9:03 PM", dark: "9:29 PM", moon: "50.1% first qtr" },
    { date: "Sun 7/11", location: "Bighorns", firstLight: "4:59 AM", sunrise: "5:25 AM", sunset: "9:03 PM", dark: "9:28 PM", moon: "60.6%" },
    { date: "Mon 7/12", location: "Beartooth", firstLight: "5:07 AM", sunrise: "5:32 AM", sunset: "9:14 PM", dark: "9:40 PM", moon: "70.5%" },
    { date: "Tue 7/13", location: "Beartooth", firstLight: "5:08 AM", sunrise: "5:33 AM", sunset: "9:13 PM", dark: "9:39 PM", moon: "79.3%" },
    { date: "Wed 7/14", location: "Beartooth", firstLight: "5:09 AM", sunrise: "5:34 AM", sunset: "9:13 PM", dark: "9:38 PM", moon: "86.7%" },
    { date: "Thu 7/15", location: "Lamar / Slough Creek", firstLight: "5:13 AM", sunrise: "5:40 AM", sunset: "9:13 PM", dark: "9:40 PM", moon: "92.6%" },
    { date: "Fri 7/16", location: "Many Glacier", firstLight: "5:08 AM", sunrise: "5:40 AM", sunset: "9:40 PM", dark: "10:12 PM", moon: "96.8%" },
    { date: "Sat 7/17", location: "Many Glacier", firstLight: "5:09 AM", sunrise: "5:41 AM", sunset: "9:39 PM", dark: "10:11 PM", moon: "99.3% FULL" },
    { date: "Sun 7/18", location: "Many Glacier", firstLight: "5:10 AM", sunrise: "5:42 AM", sunset: "9:38 PM", dark: "10:10 PM", moon: "100% FULL" },
    { date: "Mon 7/19", location: "Many Glacier", firstLight: "5:12 AM", sunrise: "5:43 AM", sunset: "9:37 PM", dark: "10:08 PM", moon: "98.9%" },
    { date: "Tue 7/20", location: "Glacier — west", firstLight: "5:13 AM", sunrise: "5:44 AM", sunset: "9:36 PM", dark: "10:07 PM", moon: "96.1%" },
    { date: "Wed 7/21", location: "Glacier — west", firstLight: "5:14 AM", sunrise: "5:45 AM", sunset: "9:35 PM", dark: "10:06 PM", moon: "91.6%" },
    { date: "Thu 7/22", location: "Glacier — west", firstLight: "5:16 AM", sunrise: "5:47 AM", sunset: "9:34 PM", dark: "10:05 PM", moon: "85.5%" },
    { date: "Fri 7/23", location: "Theodore Roosevelt", firstLight: "4:45 AM", sunrise: "5:17 AM", sunset: "8:43 PM", dark: "9:14 PM", moon: "78.3%" },
    { date: "Sat 7/24", location: "Theodore Roosevelt", firstLight: "4:47 AM", sunrise: "5:18 AM", sunset: "8:41 PM", dark: "9:13 PM", moon: "69.7%" },
  ],
  sunMoonNote:
    "Computed with <code>tools/sun.mjs</code> (NOAA solar position, refraction and horizon dip) against regional coordinates and camp elevations — good to about a minute. Everything above is Mountain Time; the route never leaves it. <b>Note how the day lengthens as you go north:</b> Badlands gives about 16h 30m of usable light, Glacier about <b>17 hours</b> — first light 5:08 AM, dark 10:12 PM. Full moon falls July 17–18, which after the 21-day recut lands at <b>Many Glacier</b> rather than on the Beartooth Plateau. Nothing is built around that, deliberately — night-sky watching is on the hub's declined list and this page is not going to quietly schedule it.",

  weather: [
    { location: "Badlands", elevation: "~2,500 ft", high: 92, low: 64, notes: "⚠️ Estimated, not station data. No shade anywhere in the park. The heat, not the cold, is the risk on days 2–3." },
    { location: "Bighorns — West Tensleep", elevation: "~9,100 ft", high: 68, low: 38, notes: "Estimated. Afternoon thunderstorms are the reliable July pattern here, not an exception." },
    { location: "Beartooth Plateau", elevation: "~9,518 ft", high: 62, low: 34, notes: "Estimated. ⚠️ <b>Snow is possible here in any month.</b> Coldest camp of the trip." },
    { location: "Lamar Valley", elevation: "~6,500 ft", high: 78, low: 42, notes: "Estimated. Big diurnal swing — hot afternoons, cold dawns, which is when the wildlife is out." },
    { location: "Glacier — Many Glacier", elevation: "~4,900 ft", high: 76, low: 46, notes: "Estimated. Valley bottoms warm, the passes 15°F colder and windy." },
    { location: "Theodore Roosevelt", elevation: "~2,300 ft", high: 88, low: 60, notes: "Estimated. Same shadeless-badlands problem as day 3." },
  ],
  weatherNote:
    "⚠️ <b>None of these are station data.</b> Unlike the <a href=\"../sky-islands-2027/\">Sky Islands</a> page, which is anchored to Willcox normals, no station figures were pulled for this route — these are seasonal estimates and should be treated as a shape, not a forecast. The real point is the <b>spread</b>: this trip runs from a 92°F shadeless badland to a 34°F night at 9,518 ft and back, twice, and after the front-end cut it now does the first half of that swing <b>in a single day</b> (Day 4). <b>The sleep system is correctly specified for the Beartooth camp and massively over-specified for everything else</b>, which is the right way round. Pack for the range, not either end.",

  packing: [
    {
      category: "The range problem — this trip's defining one",
      items: [
        "<b>Full cold kit AND full heat kit, simultaneously, for 21 days.</b> Beartooth at 34°F and Badlands at 92°F are four days apart in the same duffel — closer together than they were before the recut.",
        "Siesta 20 + MondoKing — right for Beartooth, overkill everywhere else. Take both anyway.",
        "Sun hoody and a wide-brim hat for the badlands days at either end",
        "Rain shell that actually works — Bighorn and Beartooth afternoon storms are near-daily in July",
      ],
    },
    {
      category: "Altitude — sharper than it was",
      items: [
        "<b>Day 4 goes from 2,500 ft to 9,100 ft in one drive.</b> The Black Hills stop that used to break this up was cut with the front end. Nothing to pack for it except the discipline to take the Mirror Lake bail-out on Day 5 if the night went badly.",
        "Electrolytes and more water than feels necessary for the first two Bighorn days",
      ],
    },
    {
      category: "Bear country — new on this trip",
      items: [
        "<b>Bear spray, on the person, not in the car.</b> Required thinking from Lamar Valley on Day 10 through the last Glacier morning on Day 18.",
        "Discipline about the bear box: all food, cookware, toiletries, anything scented, every single night",
        "Noise on blind corners. Iceberg Lake, Grinnell and the Swiftcurrent valley are all documented corridors.",
      ],
    },
    {
      category: "The car — it is the trip",
      items: [
        "<b>Full service before departure.</b> 4,300 miles on a 2013 Legacy with no rental to fall back on.",
        "Spare confirmed inflated, jack, tire plug kit — Sage Creek Rim, Crazy Woman and Clay Butte are all gravel decisions",
        "Jump pack. Cold nights at 9,500 ft and a fortnight of short trips are hard on a battery.",
        "Paper atlas as well as offline maps. Four days of the route have effectively no signal.",
      ],
    },
    {
      category: "Twenty-one days of food logistics",
      items: [
        "<b>Four resupplies: Rapid City and Buffalo (day 4), Cody (day 7), Great Falls (day 11).</b> Nothing between Cody and Great Falls is a real grocery.",
        "Block ice at every resupply, not cubes",
        "This is roughly twice the longest trip ever run on this cooler system — <b>the meal plan needs rebuilding, not extending</b>",
      ],
    },
    {
      category: "Showers and laundry — worse after the recut",
      items: [
        "⚠️ <b>The Custer State Park shower stop was cut with the front end.</b> Apgar on Day 15 is now the first realistic shower in fifteen days.",
        "Plan one laundry stop in Great Falls on Day 11, or wear it.",
        "This is the clearest cost of the 21-day version and it is worth knowing before departure rather than discovering on day nine.",
      ],
    },
  ],

  reservations: [
    { text: "🚨 <b>Slough Creek, Yellowstone, Jul 15</b> — <b>16 sites, fills within minutes</b> of its 6-month window opening. The tightest booking on the trip, kept deliberately over the day-trip alternative because a wildlife valley is worth a dawn. Check first whether Pebble Creek has reopened; if it has, it is the better base and the closer one." },
    { text: "🚨 <b>Glacier — Many Glacier, Jul 16–19</b> — recreation.gov, 6-month rolling, released daily. <b>Book around Jan 16 2027.</b> One of the three campgrounds that go the day the window opens. No realistic walk-up fallback in July." },
    { text: "🚨 <b>Glacier — Apgar or Avalanche, Jul 20–22</b> — same system, same January sitting. Both equally competitive." },
    { text: "<b>Badlands — Cedar Pass, Jul 7–8</b> — recreation.gov, 6-month window." },
    { text: "<b>Bighorns — West Tensleep, Jul 9–11</b> — mix of reservable and first-come, split not verified." },
    { text: "<b>Beartooth — Island Lake, Jul 12–14</b> — reservable/first-come split not verified. Call Shoshone NF; two published sources contradict each other on this campground's season." },
    { text: "<b>Theodore Roosevelt — Cottonwood, Jul 23–24</b> — part reservable, part first-come." },
    { text: "⚠️ <b>Logan Pass shuttle tickets</b> — $1, some on a 60-day rolling window, most released 7 PM the night before. Matters on Day 16 if the Highline Trail is done point-to-point." },
    { text: "⚠️ <b>Two transit nights (Days 1 and 20) have no lodging identified at all.</b> Solve them together, once, before departure. Day 20 follows a 650-mile drive at the end of three weeks — a motel there is a defensible use of the contingency line." },
  ],

  openQuestions: [
    { question: "Can you actually get Slough Creek, Many Glacier and a west-side campground for these dates?",
      blocks: "Days 10 and 11–17 — over a third of the trip",
      detail: "🚨 The three hardest bookings on the trip and they are consecutive. Slough Creek is 16 sites and gone in minutes; Many Glacier and Apgar go the day their windows open. <b>All three windows fall in mid-January 2027 — book them in one sitting, with fallbacks already written.</b> If Many Glacier fails, Two Medicine and St. Mary reshape the middle. If Slough Creek fails, Day 10 becomes a fourth plateau night with Lamar as a long day trip." },

    { question: "Has Pebble Creek reopened?",
      blocks: "Day 10, and how bad the Slough Creek race actually is",
      detail: "Closed for flood recovery since June 2022 and still listed closed for 2025. If it is open, that is 27 sites at the foot of the Beartooth Highway instead of 16 at Slough Creek, and the worst booking risk on the trip roughly halves. <b>Worth one phone call to Yellowstone before January.</b>" },

    { question: "Is a 6,600 ft altitude gain in one day, on day four, actually fine?",
      blocks: "Day 5, the biggest hike of the first half",
      detail: "⚠️ <b>New risk created by the 21-day recut, and the main cost of cutting the front end.</b> The 25-day version climbed to the Black Hills (6,200 ft) before the Bighorns (9,100 ft), which broke the gain into two steps. That is gone. You now sleep at 2,500 ft on Day 3 and 9,100 ft on Day 4, then walk 11 miles and 2,000 ft on Day 5. <b>The Mirror Lake bail-out is written into Day 5 and exists for exactly this.</b> No prior trip on this hub has tested how this traveller handles altitude." },

    { question: "Fifteen days to the first shower — is that actually acceptable?",
      blocks: "Nothing structural, but it is the other real cost of the recut",
      detail: "Custer State Park was the trip's only mid-route shower and it went with the front end. <b>Apgar on Day 15 is now the first one.</b> Options if that is too long: a paid shower in Cody (Day 7) or Great Falls (Day 11), both of which are already resupply stops, or a motel night on one of the transit days. Cheap to solve, easy to forget until day nine." },

    { question: "Is Crazy Woman Canyon Road drivable in a car with 5.9 in of clearance and a low air dam?",
      blocks: "Day 6 afternoon only",
      detail: "The registry lists its dispersed sites as the best-reviewed in the Bighorns. It is also unpaved, narrow and shelf-like in places. <b>Not a trip-breaker — Day 6 has a zero-risk alternative already written — but decide at the road, not from a map.</b> Bighorn NF, Buffalo Ranger District." },

    { question: "Is 21 days across 9 places to sleep still too much?",
      blocks: "The whole shape",
      detail: "Down from 25 days and 11 places, which is a real improvement, but <b>still roughly double the longest trip ever taken</b> (11 days, Appalachians 2026). Two days are deliberately soft — Day 6 in the Bighorns and Day 17 at Glacier — and that is the mitigation. The remaining lever if it still feels long: <b>cut Theodore Roosevelt (Days 18–19) and drive home in three easier days instead of two 650-mile pushes.</b> That would make it 20 days and remove both long pushes." },

    { question: "What do the campgrounds actually cost?",
      blocks: "The budget only",
      detail: "Every fee on this page is an estimate. recreation.gov and nps.gov are blocked from this session, so nothing was read from an operator page. The total is likely within $150 either way, but no line here should be treated as booked fact." },
  ],

  places: [
    { group: "The drive out", items: [
      { name: "Chicago I-90 corridor", maps: "I-90 Chicago Skyway", note: "⚠️ Days 1 and 21. Before 10 AM or after 7 PM, nothing between." },
      { name: "Rapid City", maps: "Rapid City South Dakota", note: "Day 4 resupply — a drive-through now that the Black Hills stop is cut." },
    ]},
    { group: "Badlands", items: [
      { name: "Cedar Pass Campground", maps: "Cedar Pass Campground Badlands", note: "Nights 2–3. Water. Fee unverified." },
      { name: "Notch Trail", maps: "Notch Trail Badlands National Park", note: "Day 3. 1.2 mi, log ladder, ledge traverse." },
      { name: "Sage Creek Rim Road", maps: "Sage Creek Rim Road Badlands", note: "Day 3 evening. Bison, prairie dogs. Gravel — assess." },
    ]},
    { group: "Bighorns", items: [
      { name: "West Tensleep Lake Campground", maps: "West Tensleep Lake Campground Wyoming", note: "Nights 4–6, ~9,100 ft. Trailhead at camp." },
      { name: "Buffalo, WY", maps: "Buffalo Wyoming", note: "Day 4. Last fuel before the Skyway." },
      { name: "Crazy Woman Canyon Road", maps: "Crazy Woman Canyon Road Wyoming", note: "🚨 Day 6. Unpaved, narrow. Decide at the road." },
    ]},
    { group: "Beartooth + Yellowstone NE", items: [
      { name: "Island Lake Campground", maps: "Island Lake Campground Beartooth", note: "Nights 7–9, 9,518 ft. Season dates contradicted by two sources." },
      { name: "Cody, WY", maps: "Cody Wyoming", note: "Day 7. Last full resupply before Great Falls. Paid showers here if wanted." },
      { name: "Chief Joseph Scenic Byway", maps: "Chief Joseph Scenic Byway Wyoming", note: "Day 7. Paved. Dead Indian Pass." },
      { name: "Clay Butte Lookout", maps: "Clay Butte Lookout Wyoming", note: "Day 9. Gravel spur — assess." },
      { name: "Slough Creek Campground", maps: "Slough Creek Campground Yellowstone", note: "🚨 Night 10. 16 sites, fills in minutes." },
      { name: "Pebble Creek Campground", maps: "Pebble Creek Campground Yellowstone", note: "⚠️ Closed for flood recovery since 2022. Check 2027 status." },
      { name: "Lamar Valley", maps: "Lamar Valley Yellowstone", note: "Day 10 evening. Pull-outs only. Grizzly country." },
    ]},
    { group: "Glacier", items: [
      { name: "Many Glacier Campground", maps: "Many Glacier Campground Glacier National Park", note: "🚨 Nights 11–14. Book mid-January 2027." },
      { name: "Apgar Campground", maps: "Apgar Campground Glacier National Park", note: "🚨 Nights 15–17. Same January booking. First shower in 15 days." },
      { name: "Great Falls, MT", maps: "Great Falls Montana", note: "Day 11. Final resupply and the one realistic laundry stop." },
      { name: "Iceberg Lake Trailhead", maps: "Iceberg Lake Trailhead Many Glacier", note: "Day 13. Lot fills by 7 AM. Bear corridor." },
      { name: "Grinnell Glacier Trailhead", maps: "Grinnell Glacier Trailhead Many Glacier", note: "Day 14. Snowfields into late July." },
      { name: "Logan Pass", maps: "Logan Pass Visitor Center Glacier", note: "⚠️ 3-hour parking cap from July 1. $1 shuttle." },
    ]},
    { group: "The drive home", items: [
      { name: "Cottonwood Campground", maps: "Cottonwood Campground Theodore Roosevelt", note: "Nights 18–19. Wild horses." },
      { name: "Painted Canyon Overlook", maps: "Painted Canyon Overlook Theodore Roosevelt", note: "Day 19 evening." },
    ]},
  ],
  placesNote:
    "No coordinate on this page has been verified — <code>tools/geocode.mjs</code> returns nothing in this environment — so every entry is a Maps search string rather than a pin. A search for a named place lands you correctly; a guessed coordinate does not.",

  offlineRegions:
    "Download offline Google Maps for the whole corridor before leaving: Chicago–Madison–La Crosse, Badlands, Rapid City–Buffalo, the Bighorns, Cody–Beartooth, Yellowstone NE, Great Falls–Browning–Glacier, and the I-94 corridor home. <b>Trails are a separate download</b> — AllTrails or Gaia for Cloud Peak Wilderness, the Beartooth High Lakes, and all of Glacier. There is effectively no signal on the Cloud Peak Skyway, across the Beartooth Plateau, in Lamar, or in the Many Glacier valley.",

  budget: {
    note: "No airfare, no rental car, no under-25 surcharge — this trip is fuel and campsites. Every campground fee is an estimate; none was read from an operator page.",
    rows: [
      { category: "Fuel", cost: 553, notes: "~4,300 mi at ~28 mpg, ~$3.60/gal. The single largest line." },
      { category: "Camping — 20 nights", cost: 445, notes: "Estimated across 9 places. Glacier ~$23 × 7 is the biggest block." },
      { category: "Groceries", cost: 270, notes: "21 days solo, cooking at camp. Four resupplies." },
      { category: "Eating out", cost: 100, notes: "A handful of named meals, not convenience food." },
      { category: "Showers, laundry, sundries", cost: 50, notes: "⚠️ One free shower point now that Custer State Park is cut — budget a paid one in Cody or Great Falls" },
      { category: "Motel contingency", cost: 180, notes: "Two nights at ~$90 for the transit days. See the open questions." },
    ],
    subtotal: 1598,
    buffer: 192,
    bufferLabel: "Buffer (12%)",
    total: 1790,
  },

  waypoints: [
    { name: "Cedar Pass Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "2, 3", notes: "Badlands NP. Water. No shade in the park." },
    { name: "Notch Trailhead", lat: null, lng: null, verified: false, icon: "🪜", days: "3", notes: "Log ladder and ledge traverse. Dawn only in July." },
    { name: "West Tensleep Lake Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "4, 5, 6", notes: "~9,100 ft, Bighorn NF. Cloud Peak Wilderness trailhead at camp." },
    { name: "Crazy Woman Canyon Road", lat: null, lng: null, verified: false, icon: "⚠️", days: "6", notes: "Unpaved, narrow, shelf sections. Clearance decision." },
    { name: "Island Lake Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "7, 8, 9", notes: "9,518 ft, Shoshone NF. Highest camp of the trip." },
    { name: "Chief Joseph Scenic Byway", lat: null, lng: null, verified: false, icon: "🛣️", days: "7", notes: "WY-296. Paved. Dead Indian Pass." },
    { name: "Clay Butte Lookout", lat: null, lng: null, verified: false, icon: "👁️", days: "9", notes: "Fire tower. Gravel spur — assess before driving it." },
    { name: "Slough Creek Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "10", notes: "Yellowstone. 16 sites, fills in minutes. Grizzly country." },
    { name: "Lamar Valley", lat: null, lng: null, verified: false, icon: "🦬", days: "10", notes: "Pull-outs only. 25 yd from bison, 100 yd from bears and wolves." },
    { name: "Many Glacier Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "11–14", notes: "Book mid-January 2027. No walk-up fallback in July." },
    { name: "Iceberg Lake Trailhead", lat: null, lng: null, verified: false, icon: "🧊", days: "13", notes: "Bear corridor. Lot fills by 7 AM." },
    { name: "Grinnell Glacier Trailhead", lat: null, lng: null, verified: false, icon: "🏔️", days: "14", notes: "Snowfields on the upper traverse into late July." },
    { name: "Logan Pass", lat: null, lng: null, verified: false, icon: "🅿️", days: "15, 16", notes: "3-hour parking cap from July 1. $1 ticketed shuttle." },
    { name: "Apgar Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "15–17", notes: "Glacier west side. First shower in fifteen days." },
    { name: "Cottonwood Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "18, 19", notes: "Theodore Roosevelt NP South Unit. Wild horses and bison." },
  ],

  notes: [
    {
      heading: "Why this is a July trip, and why that mattered more than the destination",
      body:
        "The June road trip was checked destination by destination and June turned out to be the gap month in this entire wishlist. <a href=\"#beartooth-plateau\">Beartooth</a> needs late June at absolute minimum — US-212 opened May 23 in 2026 and was <b>closed again by snow until June 9</b>. Snowy Range's campgrounds open July 4. The San Juans hold snow into early July. Lake Superior is peak blackfly. Utah is too hot, and Colorado's high country is still melting.<br><br><b>Moving the trip three weeks fixed more than any destination swap did.</b> Every anchor on this route is comfortably in season in mid-July and none of them was in June. That is the whole reason this page exists in this shape.",
    },
    {
      heading: "Why Glacier anchors it",
      body:
        "✅ <b>Glacier has no timed-entry vehicle reservation.</b> It was eliminated for 2026 after five years — across Going-to-the-Sun, Many Glacier, Two Medicine and North Fork — and the registry entry for that park used to be subtitled \"worst bureaucracy.\" That objection is gone. Entry pass only, and the America the Beautiful pass covers it.<br><br>What replaced it is smaller and still real: a <b>3-hour parking cap at Logan Pass from July 1</b>, and a <b>$1 ticketed shuttle</b> instead of the free hop-on service. The shuttle is quietly useful — it is what makes a point-to-point Highline Trail route possible, which is otherwise a car-shuttle problem for a solo traveller.<br><br>Camping is where the difficulty moved. 6-month rolling window, released daily, and Many Glacier, Apgar and Avalanche all go the day they open. <b>Mid-January 2027 is the date that cannot be moved.</b>",
    },
    {
      heading: "The 21-day cut: what it bought and what it cost",
      body:
        "This started as a 25-day draft and the four days came off the <b>front end</b>: Custer State Park and Devils Tower are gone, and Badlands now runs straight into the Bighorns.<br><br>That was chosen over cutting Theodore Roosevelt or a Glacier night, and it is the better trade — <b>it added a seventh Glacier night rather than costing one.</b> Seven nights is what makes the Glacier block work: an easy Saturday, Iceberg on Sunday, Grinnell on a Monday, the transfer on Tuesday, the Highline Trail on a Wednesday, and a whole day held in reserve on Thursday. The two hardest hikes land on the two best days of the week available.<br><br><b>Three real costs, none hidden:</b><br>• <b>Black Elk Peak is gone</b> — the best hike on the eastern half, and it was nearly free since I-90 passes it either way. Devils Tower goes with it.<br>• <b>The altitude step is gone.</b> The Black Hills at 6,200 ft used to break the climb from the plains to the Bighorns in two. Day 4 is now 2,500 ft to 9,100 ft in one drive, followed by an 11-mile hike on Day 5. The Mirror Lake bail-out exists for exactly that.<br>• <b>Fifteen days to the first shower.</b> Custer State Park was the only mid-route one. Apgar on Day 15 is now it. Cheap to solve with a paid shower in Cody or Great Falls; easy to forget until day nine.",
    },
    {
      heading: "The length is still the risk, and two days are held against it",
      body:
        "🚨 <b>Nothing on this route is individually hard, and that is exactly why the length is the thing to worry about.</b><br><br>The profile says <b>2–5 campgrounds per trip, 5–10 nights</b>. This is <b>20 nights across nine places to sleep</b> — down from 25 nights and eleven places, which is a real improvement, but still roughly double the longest trip on record here, the 11-day <a href=\"../appalachians-2026/\">Appalachians</a> run.<br><br><b>Two days are deliberately soft and they are the mitigation:</b> Day 6 in the Bighorns, after the 11-mile Lost Twin Lakes day, and Day 17 at Glacier, which is genuinely unscheduled with St. Mary Falls as a default rather than a plan. Over three weeks something will be weathered out, closed or simply missed, and those two days are where it goes.<br><br><b>The remaining lever, if 21 still feels long:</b> cut Theodore Roosevelt and drive home in three easier days instead of two 650-mile pushes. That makes it 20 days, removes the two hardest driving days, and costs the weakest content on the route. It is in the open questions rather than buried, because deciding it in advance beats deciding it exhausted in North Dakota.",
    },
    {
      heading: "Two hikes are over the ceiling, on purpose, with bail-outs",
      body:
        "The soft ceiling is ~10 mi and ~2,500 ft per day, exceeded \"when the payoff justifies it, not by accident.\" Two scheduled hikes cross it and both are over on distance only:<br><br><b>Lost Twin Lakes (Day 5): 11.1 mi, 2,076 ft.</b> A mile over, at 9,000+ ft, on your second day at altitude after the biggest single-day climb of the trip. Bail-out written into the day: Mirror Lake alone at 5.9 mi / 1,095 ft, which is a complete day.<br><br><b>Grinnell Glacier (Day 14): 11.1 mi, 2,047 ft.</b> A mile over, on day fourteen. Bail-out: the boat shuttle across Swiftcurrent and Josephine removes about 3.4 miles, and it exists precisely for this.<br><br>Three more are named in the Hikes tab and deliberately <b>not</b> scheduled: the full Highline Trail (15.2 mi / 2,572 ft — over on both counts, hence the Haystack Butte version), Ptarmigan Tunnel (10.7 mi, now the Day 17 slack option rather than a scheduled day), and Cloud Peak (22.6 mi / 5,337 ft, a backpacking trip and therefore excluded by a locked rule). <b>Listing what was cut is the point — otherwise the ceiling gets crossed by accident rather than by decision.</b>",
    },
    {
      heading: "The Garden Wall ledge, stated plainly",
      body:
        "The first mile of the Highline Trail is cut into the side of the Garden Wall with a hand cable bolted to the rock and a long drop below it. It is <b>not</b> technical, it is <b>not</b> a scramble, and thousands of people walk it every summer including children.<br><br>It is also the single highest-consequence piece of ground on this entire route, and the profile is explicit: sustained low-consequence difficulty is welcome, single high-consequence moves get more caution. <b>So: if the ledge does not feel right, turn around at the cable.</b> Hidden Lake Overlook from the same parking lot is a genuinely good day and costs nothing but the ego. The page's job here is to give the real numbers and a stated fallback, not to nag and not to stay silent.",
    },
    {
      heading: "Bear country is new for this list",
      body:
        "From Lamar Valley on Day 10 through the last Glacier morning on Day 18, this is <b>grizzly country in a way nothing previously on this hub has been</b>. Red River Gorge and the Southern Appalachians are black bear country; the food-storage habits transfer, the rest does not.<br><br>What changes: <b>bear spray lives on the person, not in the pack and not in the car.</b> Noise on blind corners — Iceberg Lake, Grinnell and the Swiftcurrent valley are documented corridors, and the first two are hiked at dawn on this itinerary, which is the highest-encounter window. Everything scented goes in the bear box every night, including toothpaste and the cooler. And in Lamar the rule is simply that you do not leave the pull-out: 25 yards from bison, 100 from bears and wolves, and the valley injures someone walking toward a bison for a photograph roughly every other year.<br><br>None of this is a reason not to go. It is a reason to have the habits before Day 10 rather than learning them there.",
    },
    {
      heading: "What this costs, and what it does not",
      body:
        "About <b>$1,790 for 21 days</b>, and unusually for this list that number is nearly complete — <b>there is no airfare, no rental car and no under-25 surcharge in it</b>, because you are driving your own car. Compare the <a href=\"../sky-islands-2027/\">Sky Islands</a> trip: 11 days, ~$1,076, plus an unpriced flight that could add $400 on top.<br><br>Fuel is the biggest line at ~$553 and it moves with the route rather than with choices. Campsites are ~$445 across nine places, all estimated. The 25-day version came to $2,038, so <b>the recut saved about $250</b> — which was never the argument for shortening it. The argument was day 19.",
    },
    {
      heading: "The shape of the summer this sits in",
      body:
        "This trip is the middle of three things and the only one that is drivable. <a href=\"../maui-2027/\">Maui</a> is May 13–20. This is July 6–26. <a href=\"#kenai-peninsula\">Kenai</a> is targeted at August 14–27, and <b>this route ends July 26 leaving nineteen days of turnaround before it</b> — the 25-day version left fifteen, and the PNW alternative would have left six, which is why it was dropped.<br><br>The Eastern Sierra was the fourth item and it was <b>dropped from 2027 by choice</b>, correctly: it is ten days on cheap Reno flights and a cheap car, a trip that survives a two-week PTO allowance in 2028 and every year after. A 4,300-mile drive and Alaska do not. <b>The horizon is Aug 31 2027, when full-time work starts and the academic calendar stops being the constraint.</b> Everything about the shape of this summer follows from that one date.",
    },
  ],

  map: { center: [45.5, -106.0], zoom: 5 },
};
