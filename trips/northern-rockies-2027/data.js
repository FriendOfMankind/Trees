/* ==========================================================================
   The Long Way to Glacier — July 6–30 2027.  STATUS: OUTLINE.

   Built 2026-09-06. This is the July replacement for the June road trip,
   after June was checked destination by destination and found to be the gap
   month in this entire wishlist: Beartooth needs late June minimum, the San
   Juans and Snowy Range need July, Lake Superior is blackfly season, Utah is
   too hot and Colorado is still melting. Moving the trip three weeks fixed
   more than any destination swap did.

   THE TRIGGER: Glacier eliminated its timed-entry vehicle reservation for
   2026 — first time in five years. The single largest objection to the park
   on this list evaporated, and a system dropped after five years can come
   back. That is why Glacier anchors this and not Beartooth.

   VERIFIED THIS SESSION:
     - Glacier: no vehicle reservation in 2026 (Going-to-the-Sun, Many
       Glacier, Two Medicine, North Fork). Entry pass still required.
     - Glacier: Logan Pass 3-hour parking limit from July 1; new $1 ticketed
       shuttle, 60-day rolling for some, most released 7 PM the night before.
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
     - Full moon July 17–18, over the Beartooth Plateau.
   FROM ALLTRAILS:
     - Every hike distance, gain and time in the Hikes tab.
   COULD NOT VERIFY:
     - EVERY COORDINATE. tools/geocode.mjs returns NONE in this environment:
       overpass and nominatim are egress-blocked and no RIDB/NPS key is set.
       All waypoints are verified:false and unplotted. See CLAUDE.md.
     - Every campground FEE below is an estimate. None was read from an
       operator page; recreation.gov and nps.gov are blocked here.
     - The four transit nights (Days 1, 23, 24 and the Glacier transfer) have
       no lodging identified at all.
     - Drive times are Google-style estimates + 15%, unconfirmed.
   ========================================================================== */

window.TRIP_DATA = {
  meta: {
    slug: "northern-rockies-2027",
    title: "The Long Way to Glacier",
    subtitle: "Solo · Avon OH → Badlands → Bighorns → Beartooth → Glacier → home",
    dates: "Tuesday, July 6 – Friday, July 30, 2027",
    emoji: "🏔️",
    theme: "alpine",

    route:
      "Out on I-90 through South Dakota, up through Wyoming and Montana to Glacier, and <b>home on I-94 through North Dakota</b> — a different line back, so no road is driven twice. Six anchors: Badlands, the Black Hills, Devils Tower, the Bighorns, the Beartooth Plateau, and seven nights at Glacier. Theodore Roosevelt catches the drive home.",
    vehicle:
      "2013 Subaru Legacy, ~5.9 in clearance, low air dam. <b>Every anchor on this route is reachable on pavement.</b> The one road that is not is Crazy Woman Canyon in the Bighorns — see the warnings. This is a ~4,400 mi trip on your own car: get the service done before, not on the road.",
    gettingThere:
      "Driving. No flights, no rental, no under-25 surcharge, no fuel canisters to buy on arrival. <b>That is a large part of why this trip is affordable at 25 days</b> — the whole cost structure is fuel and campsites.",

    stats: [
      { num: "25 days", lbl: "Length" },
      { num: "~4,400 mi", lbl: "Driving" },
      { num: "24", lbl: "Nights out" },
      { num: "~85 mi", lbl: "On foot" },
    ],

    overviewCards: [
      { h: "Dates", p: "July 6–30, 2027<br>25 days / 24 nights" },
      { h: "Group", p: "Solo. One person, one tent, one portion." },
      { h: "Why July, not June", p: "June was checked and it is the gap month on this whole list. Beartooth needs late June at minimum, Snowy Range's campgrounds open July 4, the San Juans hold snow into July. <b>Moving three weeks fixed more than any destination swap.</b>" },
      { h: "Why Glacier anchors it", p: "✅ <b>Glacier dropped its timed-entry vehicle reservation for 2026</b> — first time in five years. The biggest objection to the park is gone, and a system dropped after five years can come back. This is the window." },
      { h: "The booking date", p: "<b>Mid-January 2027.</b> Glacier camping is a 6-month rolling window released daily, and the good campgrounds go the day they open. Everything else on this trip is bookable later or not at all." },
      { h: "⚠️ This breaks the trip shape", p: "The profile says <b>2–5 campgrounds, 5–10 nights</b>. This is <b>25 nights across roughly 11 places to sleep</b> — more than double the longest trip ever taken. That is the real risk here, not any single road or hike. See the notes." },
      { h: "Timing vs Alaska", p: "Home July 30. <b>Kenai starts Aug 14</b> — fifteen days of turnaround, which is comfortable. The PNW version of this trip would have left six." },
      { h: "The light", p: "Glacier in late July runs <b>first light 5:14 AM to dark 10:06 PM</b> — about 17 usable hours. A dawn-start habit is worth more here than almost anywhere." },
    ],

    footerNote:
      'Outline. Road and season facts are verified; every fee, coordinate and four of the transit nights are not. <a href="../../index.html">← All trips</a>',
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
        notes: "⚠️ <b>One of four transit nights with no lodging identified.</b> Options are a Wisconsin state park, a KOA, or a cheap motel. Decide before leaving, because arriving at 8 PM without a plan is how a road trip starts badly.",
      },
      schedule: [
        { kind: "drive", time: "6:00 AM", est: "10h 30m", text: "Avon OH → I-80 W → Chicago bypass → I-90 W. <b>Leave before the Chicago window closes</b> — through the metro before 10 AM or after 7 PM, nothing in between.", warn: true },
        { kind: "stop", time: "afternoon", text: "Fuel and a real stop somewhere in Wisconsin. This is a driving day; treat it as one." },
      ],
      meals: { b: "home", l: "packed — built the night before", d: "made at camp, or bought if the day ran long" },
      highlights: "Nothing. This day exists so that day two ends at the Badlands.",
      warnings: "Chicago. The single worst traffic on the route and it is 3 hours in. Time it or lose 90 minutes.",
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
        notes: "⚠️ Fee not verified — recreation.gov is unreachable from this session. The park's only developed campground with water; Sage Creek is the free primitive alternative and it is <b>gravel access</b>, so check it before committing this car to it.",
      },
      schedule: [
        { kind: "drive", time: "6:30 AM", est: "10h", text: "→ Badlands NP via I-90 to Exit 131, then the Badlands Loop Road.", maps: "Badlands National Park Cedar Pass" },
        { kind: "stop", time: "5:00 PM", est: "45m", text: "Set up at Cedar Pass. Water here — the next reliable fill is Custer." },
        { kind: "hike", time: "6:15 PM", est: "1h", text: "<b>Door Trail and Window Trail.</b> Both under half a mile, both straight into the wall. The right first hour: you have been in a car for two days." , maps: "Door Trail Badlands National Park" },
        { kind: "sunset", time: "8:36 PM", text: "Sunset. Dark 9:06 PM. Waxing crescent 28%." },
      ],
      meals: { b: "packed", l: "packed", d: "made at camp" },
      highlights: "Two days of interstate and then a 200-foot escarpment of banded Oligocene mudstone with nothing in front of it. The contrast is the point of doing the drive in two pushes.",
      warnings: "Badlands heat. July highs here run well into the 90s and there is <b>no shade anywhere in this park</b>. Everything walked here happens before 9 AM or after 6 PM.",
    },
    {
      day: 3, date: "Thu Jul 8, 2027",
      title: "Notch and Castle at First Light",
      tagline: "A ladder up a canyon wall, then the long flat one, both before the heat.",
      type: "activity",
      driving: "~40 mi within the park",
      slack: "Large after 11 AM, and deliberately — the afternoon is unusable here.",
      overnight: {
        name: "Cedar Pass Campground", place: "Badlands National Park, SD",
        kind: "National park campground", cost: "~$28/night est.",
        checkin: "n/a — night 2 of 2", confirmation: "TBD", notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "5:08 AM", text: "Sunrise. First light 4:38 AM — be at the Notch trailhead for it." },
        { kind: "hike", time: "4:50 AM", est: "1h 30m", text: "<b>Notch Trail.</b> ✅ AllTrails: <b>1.2 mi, 118 ft, Moderate.</b> Short, and it involves a log ladder up a canyon wall and a ledge traverse to a notch over the White River valley. Rated 4.8 for a 1.2-mile walk, which tells you it is the ladder people come for.", maps: "Notch Trail Badlands National Park" },
        { kind: "hike", time: "6:45 AM", est: "3h 30m", text: "<b>Castle Trail.</b> The long one — roughly 10 mi out and back across open badlands prairie between the Door/Window lot and Fossil Exhibit. <b>Distance and gain not verified in AllTrails this session.</b> Flat, and completely exposed.", maps: "Castle Trail Badlands National Park" },
        { kind: "stop", time: "10:30 AM", est: "1h", text: "Back to camp. <b>The rest of the day is heat management, not laziness.</b>" },
        { kind: "drive", time: "6:00 PM", est: "1h", text: "<b>Sage Creek Rim Road</b> for the bison herd and the prairie dog towns at last light. Gravel but graded; turn around if it is not.", maps: "Sage Creek Rim Road Badlands", warn: true },
        { kind: "sunset", time: "8:36 PM", text: "Sunset from the rim. Dark 9:06 PM." },
      ],
      meals: { b: "made — pre-dawn", l: "made at camp", d: "made at camp" },
      highlights: "The Notch ladder is the most fun 1.2 miles on the first half of this route. Castle is the opposite — an hour of nothing but banded rock in every direction.",
      warnings: "<b>Zero shade and no water on either trail.</b> Castle in the afternoon in July is a genuine heat-injury hike, not an uncomfortable one. <b>Hard turnaround: off Castle by 10:30 AM regardless of where you are.</b> Carry more water than feels sensible.",
    },
    {
      day: 4, date: "Fri Jul 9, 2027",
      title: "Granite Needles",
      tagline: "Out of the mudstone and into 1.7-billion-year-old rock.",
      type: "travel + activity",
      driving: "~110 mi, ~2h 30m",
      slack: "~2 hours. Needles Highway is the flex if the day runs long.",
      overnight: {
        name: "Custer State Park — Sylvan Lake or Game Lodge CG", place: "Custer, SD",
        kind: "State park campground", cost: "~$26/night est. + park entry ~$20/vehicle",
        checkin: "Confirm office hours", confirmation: "TBD",
        notes: "⚠️ <b>South Dakota state park booking windows are their own system and were not verified.</b> The hub's own booking table flags state parks as the most common way to lose a site — confirm this window as soon as the trip is real. Sylvan Lake puts you at the Black Elk trailhead.",
      },
      schedule: [
        { kind: "sunrise", time: "5:09 AM", text: "Sunrise. Break camp before the heat." },
        { kind: "drive", time: "7:00 AM", est: "2h 30m", text: "→ Custer State Park via Rapid City. <b>Full resupply in Rapid City</b> — it is the last real grocery until Sheridan or Cody.", maps: "Custer State Park South Dakota", warn: true },
        { kind: "stop", time: "10:00 AM", est: "1h", text: "Set up. Water, showers — take them, there is no guarantee of the next." },
        { kind: "drive", time: "1:00 PM", est: "2h 30m", text: "<b>Needles Highway (SD-87).</b> Fourteen miles of granite spires, one-lane rock tunnels and switchbacks. ⚠️ The tunnels are <b>narrow — the tightest is about 8 ft 4 in wide</b>; fine for a Legacy, and the reason RVs cannot do this road.", maps: "Needles Highway Custer State Park" },
        { kind: "stop", time: "3:30 PM", est: "1h", text: "<b>Sylvan Lake.</b> Granite slabs straight out of the water. Sit on them." },
        { kind: "sunset", time: "8:46 PM", text: "Sunset. Dark 9:12 PM. Waxing crescent 39%." },
      ],
      meals: { b: "made at camp", l: "bought — Rapid City", d: "made at camp" },
      highlights: "The Needles are Precambrian granite pushed up and weathered into fins — you go from 30-million-year-old mud yesterday to 1.7-billion-year-old basement rock today, three hours apart.",
      warnings: "Rapid City is the resupply. Miss it and you are buying gas-station food in Wyoming for two days.",
    },
    {
      day: 5, date: "Sat Jul 10, 2027",
      title: "The High Point of the Plains",
      tagline: "The tallest thing between here and the Alps, walked on a Saturday because it can be.",
      type: "activity",
      driving: "None — the loop leaves from Sylvan Lake",
      slack: "~2 hours built in.",
      overnight: {
        name: "Custer State Park", place: "Custer, SD",
        kind: "State park campground", cost: "~$26/night est.",
        checkin: "n/a — night 2 of 2", confirmation: "TBD", notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "5:13 AM", text: "Sunrise. First light 4:46 AM." },
        { kind: "hike", time: "5:00 AM", est: "5h", text: "<b>Black Elk Peak Loop.</b> ✅ AllTrails: <b>7.2 mi, 1,473 ft, Moderate, loop, ~217 min.</b> 7,242 ft — the highest point in the United States east of the Rockies. A stone fire lookout on the summit. Comfortably inside the day ceiling, and starting at 5 AM on a July Saturday is the whole difference between this being pleasant and being a queue.", maps: "Black Elk Peak Trailhead Sylvan Lake" },
        { kind: "stop", time: "8:00 AM", est: "1h", text: "<b>Sit at the lookout.</b> You will have it, at this hour, in a way you will not at eleven." },
        { kind: "stop", time: "afternoon", text: "Camp. Shower, laundry if it exists — this is the last civilised stop before four days of mountain camping." },
        { kind: "sunset", time: "8:45 PM", text: "Sunset. Dark 9:12 PM. First quarter moon." },
      ],
      meals: { b: "made — pre-dawn", l: "packed — eaten at the lookout", d: "made at camp" },
      highlights: "A granite summit with a 1930s stone fire tower on it, reached by a 7-mile loop that fits the ceiling with room to spare.",
      warnings: "Saturday of peak season at the most popular trail in the Black Hills. <b>The Sylvan Lake lot fills early and the park turns cars away.</b> A 5 AM start is not enthusiasm, it is the parking strategy.",
    },
    {
      day: 6, date: "Sun Jul 11, 2027",
      title: "The Stump",
      tagline: "A laccolith with a Lakota name and a Hollywood problem.",
      type: "travel + activity",
      driving: "~130 mi, ~2h 45m",
      slack: "~2 hours.",
      overnight: {
        name: "Belle Fourche River Campground", place: "Devils Tower NM, WY",
        kind: "National monument campground", cost: "~$20/night est.",
        checkin: "First-come, first-served — confirm", confirmation: "None if FCFS",
        notes: "⚠️ <b>Believed first-come and not verified.</b> A Sunday night in July at the only campground inside the monument is not a sure thing. Named fallback: the private campground at the entrance, or dispersed on Bureau of Land Management ground outside.",
      },
      schedule: [
        { kind: "sunrise", time: "5:13 AM", text: "Sunrise. Break camp." },
        { kind: "drive", time: "7:00 AM", est: "2h 45m", text: "→ Devils Tower NM via Spearfish and I-90.", maps: "Devils Tower National Monument" },
        { kind: "stop", time: "10:00 AM", est: "45m", text: "Take a site early. ⚠️ First-come on a July Sunday." },
        { kind: "hike", time: "11:00 AM", est: "3h", text: "<b>Joyner Ridge, Red Beds and Tower Trail loop.</b> ✅ AllTrails: <b>7.0 mi, 898 ft, Moderate, loop, ~176 min.</b> Circles the whole thing at two distances — Red Beds gives you the Tower against the Triassic red mudstone it stands in, and the Tower Trail puts you directly under the columns.", maps: "Devils Tower Trailhead" },
        { kind: "stop", time: "2:15 PM", est: "1h", text: "<b>Sit under the columns.</b> Phonolite porphyry cooled into hexagonal columns — the same physics as the Giant's Causeway, at forty times the scale. It is also a sacred site to more than twenty tribes; the June voluntary climbing closure is about that." },
        { kind: "sunset", time: "8:51 PM", text: "Sunset. Dark 9:19 PM. Waxing gibbous 61%." },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "An igneous intrusion the surrounding sedimentary rock eroded off, leaving 867 feet of columnar rock standing in a red valley. The best ruin-adjacent geology on the eastern half of the route.",
      warnings: "Prairie rattlesnakes on the Red Beds section — it is warm, low and rocky. Watch where hands go on the boulder sections.",
    },
    {
      day: 7, date: "Mon Jul 12, 2027",
      title: "Up the Cloud Peak Skyway",
      tagline: "First real altitude of the trip: a 9,100 ft camp reached on pavement.",
      type: "travel",
      driving: "~230 mi, ~5h",
      slack: "~2 hours.",
      noSignal: "From Buffalo west over US-16 and at the West Tensleep camps. Most of the next three days.",
      overnight: {
        name: "West Tensleep Lake Campground", place: "Bighorn NF, WY",
        kind: "USFS campground", cost: "~$20/night est.",
        checkin: "Mix of reservable and first-come — verify", confirmation: "TBD",
        notes: "⚠️ Fee and reservable/first-come split not verified. ✅ Several Cloud Peak Skyway campgrounds open June 5, so mid-July is well inside the season. At ~9,100 ft this is the first altitude camp — the trailhead for Days 8 and 9 is right there.",
      },
      schedule: [
        { kind: "sunrise", time: "5:18 AM", text: "Sunrise. Break camp." },
        { kind: "drive", time: "7:00 AM", est: "5h", text: "→ Buffalo WY via I-90, then <b>US-16 west, the Cloud Peak Skyway</b>, and the West Tensleep road. <b>Fuel and top up food in Buffalo or Sheridan.</b>", maps: "West Tensleep Lake Campground Wyoming", warn: true },
        { kind: "stop", time: "12:30 PM", est: "1h", text: "Set up at ~9,100 ft. <b>You slept at 4,300 ft last night.</b> Today is deliberately easy for that reason." },
        { kind: "hike", time: "3:00 PM", est: "45m", text: "<b>West Tensleep Falls.</b> ✅ AllTrails: <b>1.6 mi, 219 ft, Easy.</b> A short leg-stretch from camp and an altitude test — if this feels harder than 1.6 flat miles should, tomorrow gets cut.", maps: "West Tensleep Falls Trailhead" },
        { kind: "sunset", time: "9:02 PM", text: "Sunset. Dark 9:27 PM. Waxing gibbous 70%." },
      ],
      meals: { b: "made at camp", l: "bought — Buffalo WY", d: "made at camp" },
      highlights: "Paved road to a lake camp at 9,100 ft with the Cloud Peak Wilderness starting at the parking lot. This is the shape of trip the whole rule set was built for.",
      warnings: "<b>Altitude.</b> Sleeping at 9,100 ft the night after 4,300 ft is a real jump. Tomorrow is 11 miles and 2,000 ft starting from that camp — <b>if tonight is a bad night, swap Day 8 for Day 9's shorter option.</b> Also: afternoon thunderstorms are the Bighorn July pattern, so tomorrow starts early for that too.",
    },
    {
      day: 8, date: "Tue Jul 13, 2027",
      title: "Lost Twin Lakes",
      tagline: "Two cirque lakes under a headwall, and the biggest day so far.",
      type: "activity",
      driving: "None — leaves from camp",
      slack: "Thin. This is the day the trip's whole margin protects.",
      overnight: {
        name: "West Tensleep Lake Campground", place: "Bighorn NF, WY",
        kind: "USFS campground", cost: "~$20/night est.",
        checkin: "n/a — night 2 of 3", confirmation: "TBD", notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "5:26 AM", text: "Sunrise. First light 5:01 AM." },
        { kind: "hike", time: "5:15 AM", est: "7h", text: "<b>Mirror Lake and Lost Twin Lakes.</b> ✅ AllTrails: <b>11.1 mi, 2,076 ft, Hard, out-and-back, ~321 min moving.</b> ⚠️ <b>This is over the ~10 mi soft ceiling</b> — by a mile, at altitude, on the first hard day. It is in because the payoff is two lakes in a granite cirque with a wall straight above them, and because the gain is comfortably under the 2,500 ft half of the ceiling.", maps: "West Tensleep Trailhead Bighorn National Forest", warn: true },
        { kind: "stop", time: "9:30 AM", est: "1h", text: "<b>Sit at Lost Twin.</b> The turnaround is the destination — an hour under the headwall is what the eleven miles buy." },
        { kind: "stop", time: "1:00 PM", est: "rest", text: "Back at camp. Eat, lie down, do nothing." },
        { kind: "sunset", time: "9:01 PM", text: "Sunset. Dark 9:26 PM. Waxing gibbous 79%." },
      ],
      meals: { b: "made — pre-dawn, hot", l: "packed — eaten at the lakes", d: "made at camp" },
      highlights: "Eleven miles into the Cloud Peak Wilderness to a pair of lakes in a granite bowl, with no permit of any kind required to walk it.",
      warnings: "<b>Hard turnaround 10:00 AM.</b> Bighorn afternoon thunderstorms are reliable in July and the upper basin is open ground above treeline. Being on the descent by 11 is the plan; being at the lakes at 1 PM is how you get caught. <b>Over the distance ceiling at altitude — bail-out is Mirror Lake at 5.9 mi / 1,095 ft, which is a complete day on its own.</b>",
    },
    {
      day: 9, date: "Wed Jul 14, 2027",
      title: "Crazy Woman, Carefully",
      tagline: "A short lake walk, then a canyon road that has to be looked at before it is driven.",
      type: "rest",
      driving: "~60 mi if the canyon goes, ~20 if not",
      slack: "Enormous. That is the design.",
      overnight: {
        name: "West Tensleep Lake Campground", place: "Bighorn NF, WY",
        kind: "USFS campground", cost: "~$20/night est.",
        checkin: "n/a — night 3 of 3", confirmation: "TBD", notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "5:27 AM", text: "Sunrise. Sleep past it. First rest day of the trip." },
        { kind: "hike", time: "8:00 AM", est: "2h", text: "<b>Sherd Lake Trail.</b> ✅ AllTrails: <b>3.5 mi, 570 ft, Moderate.</b> Short, and the correct grade the day after eleven miles.", maps: "Sherd Lake Trailhead Bighorn National Forest" },
        { kind: "drive", time: "12:00 PM", est: "3h", text: "🚨 <b>Crazy Woman Canyon Road (FSR 33) — decide at the road, not before.</b> Your registry lists this canyon's dispersed sites as the best-reviewed in the range. It is also unpaved, narrow, rocky and shelf-like in places. <b>5.9 inches of clearance and a low front air dam.</b> Drive to the top, look, and turn around without regret if it is not obviously fine. There is no prize for the bottom of that canyon in this car.", maps: "Crazy Woman Canyon Road Wyoming", warn: true },
        { kind: "stop", time: "afternoon", text: "If the canyon is out: the Skyway overlooks and Meadowlark Lake fill the afternoon with zero risk." },
        { kind: "sunset", time: "9:01 PM", text: "Sunset. Dark 9:26 PM. Waxing gibbous 87%." },
      ],
      meals: { b: "made at camp", l: "made at camp", d: "made at camp" },
      highlights: "The recovery day, in a place where recovering is easy: a lake at 3.5 miles and a scenic byway that needs no walking at all.",
      warnings: "<b>Crazy Woman Canyon is the single clearance decision on this trip.</b> This is exactly the failure mode the profile names — a good place behind a road this car should not be on. Look first. The trip does not need it.",
    },
    {
      day: 10, date: "Thu Jul 15, 2027",
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
        notes: "⚠️ <b>9,518 ft.</b> ⚠️ Opening date is the one fact two published sources flatly contradict — one says late May, one says July 1 or earlier depending on snowpack. <b>By mid-July it is moot, which is precisely why this trip is in July and not June.</b> Beartooth Lake is the neighbouring fallback and typically opens late June.",
      },
      schedule: [
        { kind: "sunrise", time: "5:28 AM", text: "Sunrise. Break camp." },
        { kind: "drive", time: "6:30 AM", est: "3h", text: "→ Cody WY via Ten Sleep and the Bighorn Basin. <b>Last full resupply before Glacier.</b> Fuel, groceries, block ice.", maps: "Cody Wyoming", warn: true },
        { kind: "drive", time: "10:30 AM", est: "2h 30m", text: "<b>Chief Joseph Scenic Byway (WY-296) then US-212 west.</b> Dead Indian Pass, then the switchbacks up onto the plateau. Paved throughout.", maps: "Chief Joseph Scenic Byway Wyoming" },
        { kind: "stop", time: "1:30 PM", est: "1h", text: "Set up at Island Lake. ⚠️ <b>You are at 9,518 ft and it can snow here in July.</b> Pitch properly, not quickly." },
        { kind: "stop", time: "3:00 PM", est: "2h", text: "Nothing. Acclimatise, walk the lakeshore, look at the plateau." },
        { kind: "sunset", time: "9:12 PM", text: "Sunset. Dark 9:37 PM. Waxing gibbous 93%." },
      ],
      meals: { b: "made at camp", l: "bought — Cody", d: "made at camp" },
      highlights: "US-212 is paved above 9,500 ft, which is the whole argument for this place: everywhere else, emptiness and short approaches trade off against each other. Here they do not.",
      warnings: "<b>Weather at 9,500 ft in July includes snow.</b> Not likely, entirely possible. The Siesta 20 and the R-7 pad are correctly specified for this camp and nothing else on the trip. <b>Also: this is the highest, most exposed camp of the trip and the one furthest from help.</b>",
    },
    {
      day: 11, date: "Fri Jul 16, 2027",
      title: "The High Lakes",
      tagline: "A loop past a dozen lakes on a plateau above the trees.",
      type: "activity",
      driving: "~2 mi",
      slack: "~3 hours.",
      overnight: {
        name: "Island Lake Campground", place: "Beartooth Plateau, WY",
        kind: "USFS campground", cost: "~$20/night est.",
        checkin: "n/a — night 2 of 3", confirmation: "TBD", notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "5:36 AM", text: "Sunrise. First light 5:11 AM." },
        { kind: "hike", time: "6:00 AM", est: "5h", text: "<b>Beauty Lake and Beartooth High Lakes Loop.</b> ✅ AllTrails: <b>7.7 mi, 1,161 ft, Moderate, loop, ~205 min.</b> The trailhead is <b>half a mile from the campground</b>. Above treeline almost immediately, past lake after lake. This is the single best expression of the car-camping rule set on the entire route.", maps: "Beartooth High Lakes Trailhead Island Lake" },
        { kind: "stop", time: "9:00 AM", est: "1h 30m", text: "<b>Sit at Beauty Lake.</b> An hour and a half. Nothing to hurry for." },
        { kind: "stop", time: "afternoon", text: "Camp. Thunderstorm-watching from a safe place is the correct plateau afternoon activity." },
        { kind: "sunset", time: "9:11 PM", text: "Sunset. Dark 9:36 PM. Waxing gibbous 97% — near-full moon over the plateau." },
      ],
      meals: { b: "made — hot, it will be near freezing", l: "packed", d: "made at camp" },
      highlights: "Seven and a half miles across a lake-strewn plateau above 9,500 ft, starting on foot from the tent. No permit, no shuttle, no quota.",
      warnings: "<b>Above treeline for most of the loop.</b> Beartooth afternoon storms build fast and there is no cover. <b>Hard turnaround noon.</b> Freezing nights at this elevation in July are normal — that is what the bag is for.",
    },
    {
      day: 12, date: "Sat Jul 17, 2027",
      title: "Becker Lake and the Burn",
      tagline: "A longer, flatter walk, and a lookout over the whole range.",
      type: "activity",
      driving: "~20 mi",
      slack: "~2 hours.",
      overnight: {
        name: "Island Lake Campground", place: "Beartooth Plateau, WY",
        kind: "USFS campground", cost: "~$20/night est.",
        checkin: "n/a — night 3 of 3", confirmation: "TBD", notes: "",
      },
      schedule: [
        { kind: "sunrise", time: "5:37 AM", text: "Sunrise. First light 5:12 AM." },
        { kind: "hike", time: "6:00 AM", est: "4h", text: "<b>Becker Lake via Beartooth High Lakes Trail.</b> ✅ AllTrails: <b>8.0 mi, 715 ft, Moderate, ~181 min.</b> Longer than yesterday and much flatter — the gain is a third of it. A good second day at altitude.", maps: "Beartooth High Lakes Trail Wyoming" },
        { kind: "drive", time: "1:00 PM", est: "45m", text: "→ <b>Clay Butte Lookout.</b> A fire tower on a spur road with the Beartooths on one side and the Absarokas on the other. ⚠️ The spur is gravel — assess it.", maps: "Clay Butte Lookout Wyoming", warn: true },
        { kind: "stop", time: "2:00 PM", est: "1h 30m", text: "The lookout. Best single view on the route that costs no walking." },
        { kind: "sunset", time: "9:10 PM", text: "Sunset. Dark 9:35 PM. <b>Full moon</b> — it rises as the sun sets and it will be light all night at this elevation." },
      ],
      meals: { b: "made — hot", l: "packed", d: "made at camp" },
      highlights: "Eight nearly-flat miles at 9,500 ft, then a fire lookout you can drive most of the way to. The plateau does not make you choose between effort and payoff.",
      warnings: "Same storm pattern. Clay Butte's access road is gravel and its condition is unverified — the lookout is optional and the car is not.",
    },
    {
      day: 13, date: "Sun Jul 18, 2027",
      title: "Down Into Lamar",
      tagline: "Off the plateau into the best wildlife valley in the lower 48.",
      type: "travel + activity",
      driving: "~70 mi, ~2h",
      slack: "Depends entirely on whether there is a campsite. See the warning.",
      overnight: {
        name: "⚠️ Slough Creek Campground — 16 sites", place: "Yellowstone NP, WY",
        kind: "National park campground", cost: "~$20/night est.",
        checkin: "Reservable — and it goes in minutes", confirmation: "TBD",
        notes: "🚨 <b>This is the weakest link in the whole trip.</b> <b>Pebble Creek</b>, the obvious base at the foot of the Beartooth Highway, has been <b>closed for flood recovery since June 2022</b> and was still listed closed for 2025 — its 2027 status is unknown. That leaves <b>Slough Creek at 16 sites, which fills within minutes</b> of its booking window opening. Fallbacks: stay a fourth night on the plateau and do Lamar as a long day trip, or a motel in Cooke City / Gardiner.",
      },
      schedule: [
        { kind: "sunrise", time: "5:38 AM", text: "Sunrise. Break camp." },
        { kind: "drive", time: "7:00 AM", est: "2h", text: "→ Yellowstone NE entrance via Cooke City. <b>Cooke City is the last fuel for a long way and it is expensive.</b> Fill anyway.", maps: "Yellowstone Northeast Entrance Cooke City" },
        { kind: "stop", time: "9:00 AM", est: "1h", text: "Secure the site, or trigger the fallback. Decide by 10 AM." },
        { kind: "drive", time: "5:00 PM", est: "3h", text: "<b>Lamar Valley at last light.</b> Bison, elk, and the wolf packs the valley is famous for. <b>Pull-outs only, stay in or beside the car, 25 yards from bison and 100 from wolves and bears.</b>", maps: "Lamar Valley Yellowstone", warn: true },
        { kind: "sunset", time: "9:10 PM", text: "Sunset. Dark 9:37 PM. Full moon." },
      ],
      meals: { b: "made at camp", l: "packed", d: "made — early, so the valley gets last light" },
      highlights: "The Lamar at dusk with the plateau you just came off filling the rear-view. Almost no hiking today and that is correct — it is a wildlife day and wildlife happens from a pull-out.",
      warnings: "<b>Grizzly country, properly.</b> Bear spray on the person, not in the car. All food and anything scented in the bear box, every time, including toothpaste. <b>Do not approach anything.</b> The valley kills people who walk toward bison for a photograph roughly every other year.",
    },
    {
      day: 14, date: "Mon Jul 19, 2027",
      title: "The Long Push North",
      tagline: "Four hundred miles of Montana, and then the Rockies get serious.",
      type: "travel",
      driving: "~400 mi, ~8h",
      slack: "None. This is the longest single day between anchors.",
      overnight: {
        name: "Many Glacier Campground", place: "Glacier National Park, MT",
        kind: "National park campground", cost: "~$23/night est.",
        checkin: "🚨 Book mid-January 2027", confirmation: "TBD",
        notes: "🚨 <b>THE booking of this trip.</b> ✅ 6-month rolling window on recreation.gov, released daily; Many Glacier is one of the three that go the day they open. <b>Arriving here without a reservation is not a plan.</b> If it fails: Two Medicine and St. Mary are the fallbacks, and the whole Many Glacier half of the itinerary reshapes around whichever one you get.",
      },
      schedule: [
        { kind: "sunrise", time: "5:43 AM", text: "Sunrise. Break camp in the dark if it saves an hour." },
        { kind: "drive", time: "6:00 AM", est: "8h", text: "→ Many Glacier via Livingston, Great Falls and Browning. <b>Resupply in Great Falls</b> — it is the last full grocery, and East Glacier has almost nothing.", maps: "Many Glacier Campground Glacier National Park", warn: true },
        { kind: "stop", time: "3:00 PM", est: "1h", text: "Check in. ✅ <b>No vehicle reservation needed in 2026</b> — verify that still holds for 2027 before relying on it. Entry pass required; the America the Beautiful pass covers it." },
        { kind: "hike", time: "5:00 PM", est: "1h", text: "<b>Swiftcurrent Nature Trail.</b> ✅ AllTrails: <b>2.6 mi, 131 ft, Easy, loop.</b> A flat lap of Swiftcurrent Lake after eight hours of driving.", maps: "Swiftcurrent Nature Trail Many Glacier" },
        { kind: "sunset", time: "9:37 PM", text: "Sunset. Dark 10:08 PM. Nearly 17 hours of light up here." },
      ],
      meals: { b: "packed", l: "bought — Great Falls", d: "made at camp" },
      highlights: "The Many Glacier valley is the reason the park has the reputation it has, and you arrive with four hours of light still in the day.",
      warnings: "Eight hours after two weeks of driving is when the mistake happens. <b>Stop every two hours whether it feels necessary or not.</b> Deer and elk on the road after Browning at dusk.",
    },
    {
      day: 15, date: "Tue Jul 20, 2027",
      title: "Iceberg Lake",
      tagline: "A cirque lake with ice still floating in it in July.",
      type: "activity",
      driving: "~1 mi",
      slack: "~2 hours.",
      overnight: { name: "Many Glacier Campground", place: "Glacier NP, MT", kind: "National park campground", cost: "~$23/night est.", checkin: "n/a — night 2 of 3", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:44 AM", text: "Sunrise. First light 5:13 AM." },
        { kind: "hike", time: "5:30 AM", est: "6h", text: "<b>Iceberg Lake.</b> ✅ AllTrails: <b>9.7 mi, 1,453 ft, Moderate, out-and-back, ~257 min.</b> Fits the ceiling on both counts. The lake sits in a 3,000-ft cirque that keeps it frozen so late that bergs float in it into August.", maps: "Iceberg Lake Trailhead Many Glacier" },
        { kind: "stop", time: "9:00 AM", est: "1h", text: "<b>Sit at the lake.</b> This is the hour the day is for." },
        { kind: "stop", time: "afternoon", text: "Camp. Deliberate half-day before tomorrow." },
        { kind: "sunset", time: "9:36 PM", text: "Sunset. Dark 10:07 PM." },
      ],
      meals: { b: "made — pre-dawn", l: "packed", d: "made at camp" },
      highlights: "Icebergs in July, reached by a trail that fits inside the day ceiling with room to spare. The best effort-to-payoff hike on the whole route.",
      warnings: "🚨 <b>Grizzly country and this trail is a known bear corridor.</b> Bear spray, noise on blind corners, do not hike it silent and alone at dawn without making sound. <b>The Many Glacier lot fills by 7 AM in July</b> — the 5:30 start is the parking plan as much as the light plan.",
    },
    {
      day: 16, date: "Wed Jul 21, 2027",
      title: "Grinnell Glacier",
      tagline: "The hardest day of the trip, on the trail the park is named for.",
      type: "activity",
      driving: "~1 mi",
      slack: "Thin. Everything else today bends around this.",
      overnight: { name: "Many Glacier Campground", place: "Glacier NP, MT", kind: "National park campground", cost: "~$23/night est.", checkin: "n/a — night 3 of 3", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:45 AM", text: "Sunrise. First light 5:14 AM." },
        { kind: "hike", time: "5:15 AM", est: "8h", text: "<b>Grinnell Glacier Trail.</b> ✅ AllTrails: <b>11.1 mi, 2,047 ft, Hard, out-and-back, ~319 min moving.</b> ⚠️ <b>Over the distance ceiling by about a mile</b>, under the gain half. The payoff is standing at a glacier that has lost most of its area in a century and is documented doing it. <b>The boat shuttle across Swiftcurrent and Josephine cuts ~3.4 mi off</b> if it is running and you want the shorter version.", maps: "Grinnell Glacier Trailhead Many Glacier", warn: true },
        { kind: "stop", time: "9:30 AM", est: "1h 30m", text: "<b>Sit at the glacier basin.</b> Longest sit of the trip, and the one it was all built toward." },
        { kind: "sunset", time: "9:35 PM", text: "Sunset. Dark 10:06 PM." },
      ],
      meals: { b: "made — pre-dawn, hot", l: "packed — eaten at the glacier", d: "made at camp — low effort, you will be finished" },
      highlights: "The single biggest day on the route and the reason the trip is Glacier-anchored rather than Beartooth-anchored.",
      warnings: "<b>Hard turnaround 10:30 AM at the glacier basin regardless of where you are.</b> ⚠️ <b>Snowfields across the upper trail persist into late July most years</b> and the traverse above the lake is exposed — if a snowfield looks doubtful, that is the turnaround, not a problem to solve. Grizzly corridor again. Over the distance ceiling on a trip that has already been going two weeks — <b>if Day 15 hurt, take the boat.</b>",
    },
    {
      day: 17, date: "Thu Jul 22, 2027",
      title: "Move West, Do Nothing",
      tagline: "Over the Sun Road to the other side of the park, and a rest day that is actually one.",
      type: "rest",
      driving: "~60 mi, ~2h 30m over Going-to-the-Sun",
      slack: "Enormous by design. Halfway point of the Glacier block.",
      overnight: {
        name: "Apgar or Avalanche Campground", place: "Glacier NP — west side, MT",
        kind: "National park campground", cost: "~$23/night est.",
        checkin: "🚨 Same mid-January booking as Many Glacier", confirmation: "TBD",
        notes: "⚠️ <b>Second competitive Glacier booking.</b> Apgar and Avalanche both go the day their window opens. Book both halves of the Glacier stay in the same January sitting.",
      },
      schedule: [
        { kind: "sunrise", time: "5:47 AM", text: "Sunrise. Break camp slowly." },
        { kind: "drive", time: "8:00 AM", est: "2h 30m", text: "→ west side over <b>Going-to-the-Sun Road</b>. ✅ It opened June 22 in 2026 and typically opens late June/early July, so mid-July is safe. ⚠️ <b>Logan Pass parking is capped at 3 hours from July 1 and the lot fills by 8 AM</b> — pass through today, walk it tomorrow.", maps: "Going-to-the-Sun Road Logan Pass", warn: true },
        { kind: "hike", time: "1:00 PM", est: "2h 30m", text: "<b>Avalanche Lake.</b> ✅ AllTrails: <b>6.1 mi, 780 ft, Moderate, ~153 min.</b> Cedar forest, then a lake with waterfalls dropping into it from three sides. Busy, and worth it anyway.", maps: "Avalanche Lake Trailhead Glacier" },
        { kind: "stop", time: "afternoon", text: "Camp. Shower if Apgar has them. It has been a while." },
        { kind: "sunset", time: "9:34 PM", text: "Sunset. Dark 10:05 PM." },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "The Sun Road is the drive people come to Glacier for, and doing it as a transfer rather than a destination means you are not fighting for a parking space at the top.",
      warnings: "<b>Logan Pass at midday in July is the worst parking in the park.</b> Do not plan to stop there today. The 3-hour limit from July 1 means even if you get in, you are on a clock.",
    },
    {
      day: 18, date: "Fri Jul 23, 2027",
      title: "The Highline",
      tagline: "A ledge trail cut along the Garden Wall, walked at first light.",
      type: "activity",
      driving: "~35 mi, or the shuttle",
      slack: "~2 hours.",
      overnight: { name: "Apgar / Avalanche", place: "Glacier NP — west side", kind: "National park campground", cost: "~$23/night est.", checkin: "n/a", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:48 AM", text: "Sunrise. First light 5:17 AM." },
        { kind: "drive", time: "4:45 AM", est: "1h", text: "→ Logan Pass, <b>before the lot fills</b>. ⚠️ Alternative: the new <b>$1 ticketed shuttle</b> — a portion released on a 60-day rolling window, most released 7 PM the night before. <b>That shuttle is what makes a point-to-point version of this hike possible</b>, which is worth knowing.", maps: "Logan Pass Visitor Center", warn: true },
        { kind: "hike", time: "6:00 AM", est: "6h", text: "<b>Haystack Butte via the Highline Trail.</b> ✅ AllTrails: <b>8.6 mi, 1,768 ft, Hard, out-and-back.</b> ⚠️ The full Highline Trail is <b>15.2 mi / 2,572 ft — over the ceiling on both counts</b>, so this is the version that fits. The first mile is a ledge cut into the Garden Wall with a hand cable and a long drop; after that it opens out.", maps: "Highline Trail Logan Pass" },
        { kind: "stop", time: "9:00 AM", est: "1h", text: "Sit at Haystack. Turn around." },
        { kind: "hike", time: "1:00 PM", est: "1h 30m", text: "<b>Hidden Lake Overlook</b> if the legs have it. ✅ AllTrails: <b>2.8 mi, 567 ft, Moderate, ~84 min.</b> Straight from the Logan Pass lot.", maps: "Hidden Lake Overlook Trailhead" },
        { kind: "sunset", time: "9:33 PM", text: "Sunset. Dark 10:03 PM." },
      ],
      meals: { b: "made — pre-dawn", l: "packed", d: "made at camp" },
      highlights: "The Highline Trail's opening ledge is the most exposed piece of trail on the route and it is over in a mile. Haystack Butte is where it stops being a corridor and becomes a plateau.",
      warnings: "🚨 <b>The Garden Wall ledge is genuinely exposed</b> — a hand cable bolted to the rock with a long drop below. It is not technical and it is not a scramble, but it is a bad place to be nervous, and the profile's line about being cautious around single high-consequence moves applies here. <b>If the ledge does not feel right, turn around at the cable</b> — Hidden Lake alone is a good day. <b>Logan Pass parking is capped at 3 hours from July 1</b>, so a 6 AM start on a hike this long means the shuttle back, not the lot.",
    },
    {
      day: 19, date: "Sat Jul 24, 2027",
      title: "Falls and a Slow Day",
      tagline: "Short walks on the busiest day of the week, on purpose.",
      type: "rest",
      driving: "~70 mi",
      slack: "Large.",
      overnight: { name: "Apgar / Avalanche", place: "Glacier NP — west side", kind: "National park campground", cost: "~$23/night est.", checkin: "n/a", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:49 AM", text: "Sunrise." },
        { kind: "hike", time: "7:00 AM", est: "1h 30m", text: "<b>St. Mary and Virginia Falls.</b> ✅ AllTrails: <b>3.1 mi, 469 ft, Moderate, ~83 min.</b> Two waterfalls on a short trail off the east end of the Sun Road.", maps: "St Mary Falls Trailhead Glacier" },
        { kind: "stop", time: "9:00 AM", est: "3h", text: "Sit at Virginia Falls. Then drive the Sun Road slowly in the direction you have not yet driven it, stopping wherever there is room." },
        { kind: "stop", time: "afternoon", text: "Camp. Reorganise the car — you are eleven days from home and it will be a mess by now." },
        { kind: "sunset", time: "9:31 PM", text: "Sunset. Dark 10:02 PM." },
      ],
      meals: { b: "made at camp", l: "packed", d: "made at camp" },
      highlights: "The deliberate nothing day inside the Glacier block. Nineteen days in, this is what keeps day 21 possible.",
      warnings: "Saturday in Glacier in late July is the single busiest combination on this route. Everything today is short, early, or done from the car by design.",
    },
    {
      day: 20, date: "Sun Jul 25, 2027",
      title: "Slack",
      tagline: "The day the trip keeps in its pocket.",
      type: "rest",
      driving: "Depends",
      slack: "This day IS the slack.",
      overnight: { name: "Apgar / Avalanche", place: "Glacier NP — west side", kind: "National park campground", cost: "~$23/night est.", checkin: "n/a — last Glacier night", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "note", time: "—", text: "<b>Unscheduled on purpose.</b> Over twenty days something will have been weathered out, closed, sold out or simply missed. This is where it goes. If nothing has: Two Medicine is the quiet corner of the park most people skip, and Bullhead Lake (6.8 mi / 446 ft, Easy) or Redrock Falls (3.7 mi / 255 ft) are the low-effort options back on the Many Glacier side." },
        { kind: "stop", time: "evening", text: "Pack for the drive home. Last night in the mountains." },
        { kind: "sunset", time: "9:30 PM", text: "Sunset. Dark 10:00 PM." },
      ],
      meals: { b: "made at camp", l: "made at camp", d: "made at camp — clear the cooler" },
      highlights: "A whole day held in reserve twenty days into a trip is worth more than any hike that could be scheduled in it.",
      warnings: "The temptation is to fill this in advance. Don't.",
    },
    {
      day: 21, date: "Mon Jul 26, 2027",
      title: "East to the Badlands Again",
      tagline: "Five hundred and fifty miles of Montana, and a different badland at the end of it.",
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
        { kind: "sunrise", time: "5:52 AM", text: "Sunrise. Break camp." },
        { kind: "drive", time: "6:30 AM", est: "9h 30m", text: "→ Theodore Roosevelt NP South Unit via US-2 east, then I-94. <b>A different road home than the road out</b> — this is what keeps the no-road-twice rule intact on a 4,400 mi trip.", maps: "Theodore Roosevelt National Park South Unit" },
        { kind: "hike", time: "6:30 PM", est: "30m", text: "<b>Wind Canyon Trail.</b> ✅ AllTrails: <b>0.5 mi, 62 ft, Easy, loop.</b> Half a mile to a bend of the Little Missouri at golden hour. The correct end to a 550-mile day.", maps: "Wind Canyon Trail Theodore Roosevelt" },
        { kind: "sunset", time: "8:39 PM", text: "Sunset. Dark 9:10 PM. Last quarter moon." },
      ],
      meals: { b: "made at camp", l: "bought — somewhere on US-2", d: "made at camp" },
      highlights: "Ending a nine-hour drive on a half-mile walk to a river bend, with bison somewhere in the dark.",
      warnings: "Longest driving day of the trip and it comes at day 21. <b>This is the day to consider a motel instead if the tiredness is real.</b>",
    },
    {
      day: 22, date: "Tue Jul 27, 2027",
      title: "Coal Seams and Wild Horses",
      tagline: "Badlands that burn, and the last real day of the trip.",
      type: "activity",
      driving: "~50 mi in the park",
      slack: "Large.",
      overnight: { name: "Cottonwood Campground", place: "Theodore Roosevelt NP, ND", kind: "National park campground", cost: "~$14/night est.", checkin: "n/a — night 2 of 2", confirmation: "TBD", notes: "" },
      schedule: [
        { kind: "sunrise", time: "5:22 AM", text: "Sunrise. First light 4:51 AM." },
        { kind: "hike", time: "5:30 AM", est: "3h", text: "<b>Big Plateau and Ekblom Trail Loop.</b> ✅ AllTrails: <b>5.2 mi, 534 ft, Moderate, loop, ~122 min.</b> Up onto a plateau above the Little Missouri. Bison and wild horses use it, so give them the trail.", maps: "Ekblom Trailhead Theodore Roosevelt National Park" },
        { kind: "stop", time: "9:00 AM", est: "1h", text: "Sit on the plateau." },
        { kind: "drive", time: "11:00 AM", est: "2h", text: "<b>Scenic Loop Drive</b> and the <b>Coal Vein Trail</b> (0.8 mi, 29 ft) — a seam that burned underground for 26 years and baked the surrounding clay into red scoria. Geology you can see happening.", maps: "Coal Vein Trail Theodore Roosevelt" },
        { kind: "hike", time: "5:00 PM", est: "1h 45m", text: "<b>Painted Canyon Trail.</b> ✅ AllTrails: <b>4.2 mi, 446 ft, Moderate.</b> Down into the canyon from the overlook, in evening light.", maps: "Painted Canyon Overlook Theodore Roosevelt" },
        { kind: "sunset", time: "8:38 PM", text: "Sunset. Dark 9:09 PM." },
      ],
      meals: { b: "made — pre-dawn", l: "made at camp", d: "made at camp" },
      highlights: "A coal seam that burned for 26 years, wild horses, and the last badlands before three days of interstate. A quiet, underrated end to the route.",
      warnings: "Bison on the trails here, genuinely and often. <b>Give them 25 yards and go around.</b> Heat again — the North Dakota badlands run as hot as the South Dakota ones and have as little shade.",
    },
    {
      day: 23, date: "Wed Jul 28, 2027",
      title: "East",
      tagline: "The first of three.",
      type: "travel",
      driving: "~620 mi, ~10h",
      slack: "None.",
      overnight: {
        name: "TBD — Minnesota / western Wisconsin", place: "TBD",
        kind: "Transit night — not identified", cost: "~$30 est.",
        checkin: "Unknown", confirmation: "TBD",
        notes: "⚠️ <b>Second of the unidentified transit nights.</b> Same problem as Day 1 and it should be solved at the same time.",
      },
      schedule: [
        { kind: "drive", time: "6:00 AM", est: "10h", text: "→ east on I-94 through North Dakota and Minnesota." },
      ],
      meals: { b: "made at camp", l: "packed", d: "bought" },
      highlights: "Nothing. That is fine.",
      warnings: "Three driving days at the end of a 25-day trip is when attention goes. <b>Two-hour stops, no exceptions.</b>",
    },
    {
      day: 24, date: "Thu Jul 29, 2027",
      title: "East Again",
      tagline: "The second of three.",
      type: "travel",
      driving: "~600 mi, ~10h",
      slack: "None.",
      overnight: {
        name: "TBD — Indiana / Ohio", place: "TBD",
        kind: "Transit night — not identified", cost: "~$30 est.",
        checkin: "Unknown", confirmation: "TBD",
        notes: "⚠️ Third unidentified transit night. Could also be collapsed — see the notes on whether this is 25 days or 24.",
      },
      schedule: [
        { kind: "drive", time: "6:00 AM", est: "10h", text: "→ Chicago and past it. <b>Time the Chicago window again</b> — before 10 AM or after 7 PM.", warn: true },
      ],
      meals: { b: "packed", l: "packed", d: "bought" },
      highlights: "Nothing.",
      warnings: "Chicago, in the other direction, on a Thursday.",
    },
    {
      day: 25, date: "Fri Jul 30, 2027",
      title: "Home",
      tagline: "Fifteen days until Alaska.",
      type: "travel",
      driving: "~400 mi, ~6h 30m",
      slack: "All of it.",
      overnight: null,
      schedule: [
        { kind: "drive", time: "7:00 AM", est: "6h 30m", text: "→ Avon OH." },
        { kind: "note", time: "arrival", text: "<b>Kenai leaves Aug 14.</b> Fifteen days to unpack, service the car, do laundry and repack for a fly-in trip. That gap is why this trip ends July 30 and not August 8." },
      ],
      meals: { b: "packed", l: "bought", d: "home" },
      highlights: "4,400 miles, six anchors, three states you had never camped in.",
      warnings: "The car has done 4,400 miles. <b>Get it looked at before Alaska, not after.</b>",
    },
  ],

  hikes: {
    title: "Hikes &amp; Trails",
    summary:
      "Every figure is AllTrails, looked up 2026-09-06. Roughly 85 miles on foot across 25 days. <b>Two scheduled hikes exceed the ~10 mi soft ceiling</b> — Lost Twin Lakes and Grinnell Glacier — and both are listed with the shorter bail-out that replaces them. Three famous trails are named and explicitly NOT scheduled because they blow the ceiling outright.",
    rows: [
      { name: "Notch Trail", day: 3, distance: "1.2 mi RT", gain: "118 ft", difficulty: "Moderate", duration: "~1 hr", notes: "Log ladder up a canyon wall, then a ledge to the notch. No shade, no water. Dawn." },
      { name: "Castle Trail", day: 3, distance: "~10 mi RT", gain: "minimal", difficulty: "Moderate", duration: "~3.5 hr", notes: "⚠️ Stats NOT verified in AllTrails this session. Flat, fully exposed prairie badlands. Off it by 10:30 AM." },
      { name: "Black Elk Peak Loop", day: 5, distance: "7.2 mi loop", gain: "1,473 ft", difficulty: "Moderate", duration: "~4–5 hr", notes: "Highest point east of the Rockies, 7,242 ft, stone fire lookout. Sylvan Lake lot fills early — 5 AM start." },
      { name: "Joyner Ridge + Red Beds + Tower loop", day: 6, distance: "7.0 mi loop", gain: "898 ft", difficulty: "Moderate", duration: "~3 hr", notes: "Circles Devils Tower at two radii. Rattlesnakes on the low rocky sections." },
      { name: "West Tensleep Falls", day: 7, distance: "1.6 mi RT", gain: "219 ft", difficulty: "Easy", duration: "~45 min", notes: "The altitude test. If 1.6 flat miles at 9,100 ft feels hard, tomorrow gets cut." },
      { name: "Mirror Lake + Lost Twin Lakes", day: 8, distance: "11.1 mi RT", gain: "2,076 ft", difficulty: "Hard", duration: "~6–7 hr", notes: "⚠️ <b>Over the 10 mi ceiling.</b> Two cirque lakes under a headwall. Turnaround 10 AM for storms. <b>Bail-out: Mirror Lake alone, 5.9 mi / 1,095 ft.</b>" },
      { name: "Sherd Lake", day: 9, distance: "3.5 mi RT", gain: "570 ft", difficulty: "Moderate", duration: "~1.5 hr", notes: "The recovery walk." },
      { name: "Beauty Lake + Beartooth High Lakes Loop", day: 11, distance: "7.7 mi loop", gain: "1,161 ft", difficulty: "Moderate", duration: "~4–5 hr", notes: "⭐ Trailhead 0.5 mi from the tent, above treeline almost at once. Best expression of the rule set on the route. Turnaround noon." },
      { name: "Becker Lake via Beartooth High Lakes", day: 12, distance: "8.0 mi RT", gain: "715 ft", difficulty: "Moderate", duration: "~3–4 hr", notes: "Longer and much flatter than Day 11. Good second day at 9,500 ft." },
      { name: "Swiftcurrent Nature Trail", day: 14, distance: "2.6 mi loop", gain: "131 ft", difficulty: "Easy", duration: "~1 hr", notes: "Flat lap after eight hours of driving." },
      { name: "Iceberg Lake", day: 15, distance: "9.7 mi RT", gain: "1,453 ft", difficulty: "Moderate", duration: "~5–6 hr", notes: "⭐ Fits the ceiling on both counts. Bergs in the lake into August. Known bear corridor — make noise. Lot fills by 7 AM." },
      { name: "Grinnell Glacier", day: 16, distance: "11.1 mi RT", gain: "2,047 ft", difficulty: "Hard", duration: "~7–8 hr", notes: "⚠️ <b>Over the 10 mi ceiling.</b> Biggest day of the trip. Snowfields on the upper traverse into late July. <b>Bail-out: the boat shuttle cuts ~3.4 mi.</b> Turnaround 10:30 AM." },
      { name: "Avalanche Lake", day: 17, distance: "6.1 mi RT", gain: "780 ft", difficulty: "Moderate", duration: "~2.5 hr", notes: "Cedar forest to a lake with waterfalls on three sides. Busy; worth it." },
      { name: "Haystack Butte via the Highline Trail", day: 18, distance: "8.6 mi RT", gain: "1,768 ft", difficulty: "Hard", duration: "~5–6 hr", notes: "🚨 First mile is an exposed ledge with a hand cable. <b>Turn around at the cable if it doesn't feel right.</b> This is the version of the Highline Trail that fits the ceiling." },
      { name: "Hidden Lake Overlook", day: 18, distance: "2.8 mi RT", gain: "567 ft", difficulty: "Moderate", duration: "~1.5 hr", notes: "Straight from the Logan Pass lot. Add-on only if the legs have it." },
      { name: "St. Mary and Virginia Falls", day: 19, distance: "3.1 mi RT", gain: "469 ft", difficulty: "Moderate", duration: "~1.5 hr", notes: "Two waterfalls, short trail, east end of the Sun Road." },
      { name: "Big Plateau + Ekblom Loop", day: 22, distance: "5.2 mi loop", gain: "534 ft", difficulty: "Moderate", duration: "~2 hr", notes: "Plateau above the Little Missouri. Bison and wild horses on the trail." },
      { name: "Painted Canyon Trail", day: 22, distance: "4.2 mi RT", gain: "446 ft", difficulty: "Moderate", duration: "~1.5–2 hr", notes: "Down into the canyon from the overlook. Evening light." },
      { name: "The full Highline Trail — NOT SCHEDULED", day: null, distance: "15.2 mi RT", gain: "2,572 ft", difficulty: "Hard", duration: "~7 hr", notes: "⚠️ <b>Over the ceiling on both counts.</b> Listed so the Haystack Butte substitution is a visible decision. Granite Park Chalet point-to-point (11.6 mi) is the shuttle-dependent middle option." },
      { name: "Ptarmigan Tunnel — NOT SCHEDULED", day: null, distance: "10.7 mi RT", gain: "2,362 ft", difficulty: "Hard", duration: "~5.5 hr", notes: "A tunnel blasted through a rock wall in 1930. Over the distance ceiling and it competes with Iceberg Lake from the same trailhead. A candidate for the Day 20 slack." },
      { name: "Cloud Peak via Mistymoon — NOT POSSIBLE", day: null, distance: "22.6 mi RT", gain: "5,337 ft", difficulty: "Strenuous", duration: "~12 hr", notes: "🚨 Double the ceiling and an overnight for almost everyone. The Bighorns' marquee summit is a backpacking trip, which the locked rule set excludes." },
    ],
  },

  sunMoon: [
    { date: "Wed 7/7", location: "Badlands", firstLight: "4:37 AM", sunrise: "5:08 AM", sunset: "8:37 PM", dark: "9:07 PM", moon: "18.6% waxing" },
    { date: "Thu 7/8", location: "Badlands", firstLight: "4:38 AM", sunrise: "5:08 AM", sunset: "8:36 PM", dark: "9:06 PM", moon: "28.4%" },
    { date: "Fri 7/9", location: "Custer SP", firstLight: "4:45 AM", sunrise: "5:12 AM", sunset: "8:46 PM", dark: "9:12 PM", moon: "39.1%" },
    { date: "Sat 7/10", location: "Custer SP", firstLight: "4:46 AM", sunrise: "5:13 AM", sunset: "8:45 PM", dark: "9:12 PM", moon: "50% first qtr" },
    { date: "Sun 7/11", location: "Devils Tower", firstLight: "4:48 AM", sunrise: "5:17 AM", sunset: "8:51 PM", dark: "9:19 PM", moon: "60.6%" },
    { date: "Mon 7/12", location: "Bighorns", firstLight: "5:00 AM", sunrise: "5:25 AM", sunset: "9:02 PM", dark: "9:27 PM", moon: "70.5%" },
    { date: "Tue 7/13", location: "Bighorns", firstLight: "5:01 AM", sunrise: "5:26 AM", sunset: "9:01 PM", dark: "9:26 PM", moon: "79.2%" },
    { date: "Wed 7/14", location: "Bighorns", firstLight: "5:02 AM", sunrise: "5:27 AM", sunset: "9:01 PM", dark: "9:26 PM", moon: "86.6%" },
    { date: "Thu 7/15", location: "Beartooth", firstLight: "5:10 AM", sunrise: "5:35 AM", sunset: "9:12 PM", dark: "9:37 PM", moon: "92.6%" },
    { date: "Fri 7/16", location: "Beartooth", firstLight: "5:11 AM", sunrise: "5:36 AM", sunset: "9:11 PM", dark: "9:36 PM", moon: "96.8%" },
    { date: "Sat 7/17", location: "Beartooth", firstLight: "5:12 AM", sunrise: "5:37 AM", sunset: "9:10 PM", dark: "9:35 PM", moon: "99.3% FULL" },
    { date: "Sun 7/18", location: "Lamar Valley", firstLight: "5:16 AM", sunrise: "5:42 AM", sunset: "9:10 PM", dark: "9:37 PM", moon: "100% FULL" },
    { date: "Mon 7/19", location: "Many Glacier", firstLight: "5:12 AM", sunrise: "5:43 AM", sunset: "9:37 PM", dark: "10:08 PM", moon: "98.9%" },
    { date: "Tue 7/20", location: "Many Glacier", firstLight: "5:13 AM", sunrise: "5:44 AM", sunset: "9:36 PM", dark: "10:07 PM", moon: "96.1%" },
    { date: "Wed 7/21", location: "Many Glacier", firstLight: "5:14 AM", sunrise: "5:45 AM", sunset: "9:35 PM", dark: "10:06 PM", moon: "91.6%" },
    { date: "Thu 7/22", location: "Glacier — west", firstLight: "5:16 AM", sunrise: "5:47 AM", sunset: "9:34 PM", dark: "10:05 PM", moon: "85.5%" },
    { date: "Fri 7/23", location: "Glacier — west", firstLight: "5:17 AM", sunrise: "5:48 AM", sunset: "9:33 PM", dark: "10:03 PM", moon: "78.1%" },
    { date: "Sat 7/24", location: "Glacier — west", firstLight: "5:19 AM", sunrise: "5:49 AM", sunset: "9:31 PM", dark: "10:02 PM", moon: "69.4%" },
    { date: "Sun 7/25", location: "Glacier — west", firstLight: "5:20 AM", sunrise: "5:50 AM", sunset: "9:30 PM", dark: "10:00 PM", moon: "59.8%" },
    { date: "Mon 7/26", location: "Theodore Roosevelt", firstLight: "4:49 AM", sunrise: "5:21 AM", sunset: "8:39 PM", dark: "9:10 PM", moon: "49.7% last qtr" },
    { date: "Tue 7/27", location: "Theodore Roosevelt", firstLight: "4:51 AM", sunrise: "5:22 AM", sunset: "8:38 PM", dark: "9:09 PM", moon: "39.1%" },
  ],
  sunMoonNote:
    "Computed with <code>tools/sun.mjs</code> (NOAA solar position, refraction and horizon dip) against regional coordinates and camp elevations — good to about a minute. Everything above is Mountain Time; the route never leaves it. <b>Note how the day lengthens as you go north:</b> Badlands gives about 16h 30m of usable light, Glacier about <b>16h 55m</b> — first light 5:14 AM, dark 10:06 PM. Full moon falls July 17–18 over the Beartooth Plateau, which will make the highest camp of the trip bright all night. Nothing is built around that, deliberately — night-sky watching is on the hub's declined list and this page is not going to quietly schedule it.",

  weather: [
    { location: "Badlands", elevation: "~2,500 ft", high: 92, low: 64, notes: "⚠️ Estimated, not station data. No shade anywhere in the park. The heat, not the cold, is the risk on days 2–3." },
    { location: "Custer State Park", elevation: "~6,200 ft", high: 80, low: 52, notes: "Estimated. Black Hills run 10–12°F cooler than the plains below them." },
    { location: "Bighorns — West Tensleep", elevation: "~9,100 ft", high: 68, low: 38, notes: "Estimated. Afternoon thunderstorms are the reliable July pattern here, not an exception." },
    { location: "Beartooth Plateau", elevation: "~9,518 ft", high: 62, low: 34, notes: "Estimated. ⚠️ <b>Snow is possible here in any month.</b> Coldest camp of the trip." },
    { location: "Glacier — Many Glacier", elevation: "~4,900 ft", high: 76, low: 46, notes: "Estimated. Valley bottoms warm, the passes 15°F colder and windy." },
    { location: "Theodore Roosevelt", elevation: "~2,300 ft", high: 88, low: 60, notes: "Estimated. Same shadeless-badlands problem as day 3." },
  ],
  weatherNote:
    "⚠️ <b>None of these are station data.</b> Unlike the <a href=\"../sky-islands-2027/\">Sky Islands</a> page, which is anchored to Willcox normals, no station figures were pulled for this route — these are seasonal estimates and should be treated as a shape, not a forecast. The real point is the <b>spread</b>: this trip runs from a 92°F shadeless badland to a 34°F night at 9,518 ft and back, twice. <b>The sleep system is correctly specified for the Beartooth camp and massively over-specified for everything else</b>, which is the right way round. The thing to pack for is the range, not either end.",

  packing: [
    {
      category: "The range problem — this trip's defining one",
      items: [
        "<b>Full cold kit AND full heat kit, simultaneously, for 25 days.</b> Beartooth at 34°F and Badlands at 92°F are eight days apart in the same duffel.",
        "Siesta 20 + MondoKing — right for Beartooth, overkill everywhere else. Take both anyway.",
        "Sun hoody and a wide-brim hat for the badlands days at either end",
        "Rain shell that actually works — Bighorn and Beartooth afternoon storms are near-daily in July",
      ],
    },
    {
      category: "Bear country — new on this trip",
      items: [
        "<b>Bear spray, on the person, not in the car.</b> Required thinking from Lamar Valley through all of Glacier.",
        "⚠️ <b>Bear spray cannot fly</b> — irrelevant here since you are driving, but it also cannot be left in a hot car all day. Learn the storage rules.",
        "Discipline about the bear box: all food, cookware, toiletries, anything scented, every single night",
        "Noise on blind corners. Iceberg Lake and Grinnell are known corridors.",
      ],
    },
    {
      category: "The car — it is the trip",
      items: [
        "<b>Full service before departure.</b> 4,400 miles on a 2013 Legacy with no rental to fall back on.",
        "Spare confirmed inflated, jack, tire plug kit — Sage Creek Rim, Crazy Woman and Clay Butte are all gravel decisions",
        "Jump pack. Cold nights at 9,500 ft and a fortnight of short trips are hard on a battery.",
        "Paper atlas as well as offline maps. Four days of the route have effectively no signal.",
      ],
    },
    {
      category: "Twenty-five days of food logistics",
      items: [
        "<b>Four resupplies planned: Rapid City (day 4), Buffalo (day 7), Cody (day 10), Great Falls (day 14).</b> Nothing between Cody and Great Falls is a real grocery.",
        "Block ice at every resupply, not cubes",
        "This is 2.5× the longest trip ever run on this cooler system — <b>the meal plan needs rebuilding, not extending</b>",
      ],
    },
    {
      category: "Showers and laundry",
      items: [
        "Custer SP (day 4–5) and Apgar (day 17+) are the two realistic shower points in 25 days",
        "One laundry stop somewhere around day 13–14. Plan it or wear it.",
      ],
    },
  ],

  reservations: [
    { text: "🚨 <b>Glacier — Many Glacier, Jul 19–21</b> — recreation.gov, 6-month rolling, released daily. <b>Book around Jan 19 2027.</b> Many Glacier is one of the three campgrounds that go the day the window opens. There is no realistic walk-up fallback in July." },
    { text: "🚨 <b>Glacier — Apgar or Avalanche, Jul 22–25</b> — same system, book in the same January sitting. Both are equally competitive." },
    { text: "⚠️ <b>Slough Creek, Yellowstone, Jul 18</b> — 16 sites, fills within minutes. Book the day the window opens. <b>Confirm first whether Pebble Creek has reopened</b>; if it has, it is the better base and the closer one." },
    { text: "<b>Custer State Park, Jul 9–10</b> — South Dakota state park system, window NOT verified. The hub's own booking table calls state parks the most common way to lose a site. Confirm the window as soon as the trip is real." },
    { text: "<b>Badlands — Cedar Pass, Jul 7–8</b> — recreation.gov, 6-month window." },
    { text: "<b>Bighorns — West Tensleep, Jul 12–14</b> — mix of reservable and first-come, split not verified." },
    { text: "<b>Beartooth — Island Lake, Jul 15–17</b> — reservable/first-come split not verified. Call Shoshone NF; two published sources contradict each other on this campground's season." },
    { text: "<b>Theodore Roosevelt — Cottonwood, Jul 26–27</b> — part reservable, part first-come." },
    { text: "<b>Devils Tower — Belle Fourche, Jul 11</b> — believed first-come. Arrive early on a Sunday." },
    { text: "⚠️ <b>Logan Pass shuttle tickets</b> — $1, some on a 60-day rolling window, most released 7 PM the night before. Only matters if the Highline Trail is done point-to-point." },
    { text: "⚠️ <b>Four transit nights (Days 1, 23, 24 and any Glacier transfer) have no lodging identified at all.</b> Solve them together, once, before departure." },
  ],

  openQuestions: [
    { question: "Does Glacier's vehicle reservation stay gone for 2027?",
      blocks: "The entire premise of anchoring here",
      detail: "✅ It was eliminated for 2026 — the first time in five years — across Going-to-the-Sun, Many Glacier, Two Medicine and North Fork. But a system dropped after five years can be reinstated, and this whole trip is shaped around it being gone. <b>Re-check before booking anything in January.</b> If it comes back, the trip still works; it just gains a second booking race." },

    { question: "Can you actually get Many Glacier and a west-side campground for these dates?",
      blocks: "Days 14–20 — over a quarter of the trip",
      detail: "6-month rolling, released daily, and these are three of the most competitive campgrounds in the system. <b>Mid-January 2027, the morning the window opens, with a backup plan already written.</b> If Many Glacier fails, Two Medicine and St. Mary are the fallbacks and the Many Glacier hikes become long day trips or get dropped. Set recreation.gov cancellation alerts either way." },

    { question: "Has Pebble Creek reopened?",
      blocks: "Day 13, and the whole Beartooth → Lamar link",
      detail: "Closed for flood recovery since June 2022 and still listed closed for 2025. If it is open, it is 27 sites at the foot of the Beartooth Highway and the obvious base. If not, Slough Creek is 16 sites that fill in minutes and the honest fallback is a fourth night on the plateau with Lamar as a long day trip. <b>This is the one link in the route with no good answer yet.</b>" },

    { question: "Is Crazy Woman Canyon Road drivable in a car with 5.9 in of clearance and a low air dam?",
      blocks: "Day 9 afternoon only",
      detail: "The registry lists its dispersed sites as the best-reviewed in the Bighorns. It is also unpaved, narrow and shelf-like in places. This is the standard failure mode the profile names. <b>Not a trip-breaker — Day 9 has a zero-risk alternative already written — but decide at the road, not from a map.</b> Bighorn NF, Buffalo Ranger District." },

    { question: "Is 25 days across ~11 places to sleep a trip you actually want?",
      blocks: "The whole shape",
      detail: "🚨 <b>The most important open question on this page.</b> The profile says 2–5 campgrounds and 5–10 nights. This is 25 nights and roughly eleven places to sleep — <b>more than double the longest trip ever taken</b> (11 days, Appalachians 2026). Nothing here is individually hard. The risk is cumulative: 4,400 miles of driving, four resupplies, two showers, and the fact that nobody knows yet how this traveller does on day 19 of anything. <b>A 21-day version that drops Theodore Roosevelt and one Bighorn night is a real option</b> and would cost the trip almost nothing." },

    { question: "What do the campgrounds actually cost?",
      blocks: "The budget only",
      detail: "Every fee on this page is an estimate. recreation.gov and nps.gov are blocked from this session, so nothing was read from an operator page. The total is likely within $150 either way, but no line here should be treated as booked-fact." },

    { question: "Are the four transit nights camping, motels, or a mix?",
      blocks: "Days 1, 23, 24 and the budget",
      detail: "Nothing is identified for any of them. Motels at ~$90 would add roughly $270 over the estimate used here. Given days 23 and 24 are 600-mile drives at the end of 25 days, <b>at least one of them being a bed rather than a tent is probably the right call</b> and should be budgeted rather than improvised." },
  ],

  places: [
    { group: "The drive out", items: [
      { name: "Chicago I-90 corridor", maps: "I-90 Chicago Skyway", note: "⚠️ Days 1 and 24. Before 10 AM or after 7 PM, nothing between." },
      { name: "Rapid City", maps: "Rapid City South Dakota", note: "Day 4 resupply. Last real grocery until Buffalo WY." },
    ]},
    { group: "Badlands", items: [
      { name: "Cedar Pass Campground", maps: "Cedar Pass Campground Badlands", note: "Nights 2–3. Water. Fee unverified." },
      { name: "Notch Trail", maps: "Notch Trail Badlands National Park", note: "Day 3. 1.2 mi, log ladder, ledge traverse." },
      { name: "Sage Creek Rim Road", maps: "Sage Creek Rim Road Badlands", note: "Day 3 evening. Bison, prairie dogs. Gravel — assess." },
    ]},
    { group: "Black Hills", items: [
      { name: "Custer State Park", maps: "Custer State Park South Dakota", note: "Nights 4–5. Showers. ⚠️ State park booking window unverified." },
      { name: "Needles Highway", maps: "Needles Highway Custer State Park", note: "Day 4. Tunnels down to ~8 ft 4 in wide." },
      { name: "Black Elk Peak Trailhead", maps: "Black Elk Peak Trailhead Sylvan Lake", note: "Day 5. Lot fills early — 5 AM." },
    ]},
    { group: "Devils Tower", items: [
      { name: "Belle Fourche River Campground", maps: "Belle Fourche River Campground Devils Tower", note: "Night 6. Believed first-come, unverified." },
      { name: "Devils Tower Trailhead", maps: "Devils Tower National Monument", note: "Day 6. Rattlesnakes on Red Beds." },
    ]},
    { group: "Bighorns", items: [
      { name: "West Tensleep Lake Campground", maps: "West Tensleep Lake Campground Wyoming", note: "Nights 7–9, ~9,100 ft. Trailhead at camp." },
      { name: "Buffalo, WY", maps: "Buffalo Wyoming", note: "Day 7 resupply and fuel." },
      { name: "Crazy Woman Canyon Road", maps: "Crazy Woman Canyon Road Wyoming", note: "🚨 Day 9. Unpaved, narrow. Decide at the road." },
    ]},
    { group: "Beartooth + Yellowstone NE", items: [
      { name: "Island Lake Campground", maps: "Island Lake Campground Beartooth", note: "Nights 10–12, 9,518 ft. Season dates contradicted by two sources." },
      { name: "Cody, WY", maps: "Cody Wyoming", note: "Day 10. Last full resupply before Great Falls." },
      { name: "Chief Joseph Scenic Byway", maps: "Chief Joseph Scenic Byway Wyoming", note: "Day 10. Paved. Dead Indian Pass." },
      { name: "Clay Butte Lookout", maps: "Clay Butte Lookout Wyoming", note: "Day 12. Gravel spur — assess." },
      { name: "Slough Creek Campground", maps: "Slough Creek Campground Yellowstone", note: "🚨 Night 13. 16 sites, fills in minutes." },
      { name: "Pebble Creek Campground", maps: "Pebble Creek Campground Yellowstone", note: "⚠️ Closed for flood recovery since 2022. Check 2027 status." },
      { name: "Lamar Valley", maps: "Lamar Valley Yellowstone", note: "Day 13 evening. Pull-outs only. Grizzly country." },
    ]},
    { group: "Glacier", items: [
      { name: "Many Glacier Campground", maps: "Many Glacier Campground Glacier National Park", note: "🚨 Nights 14–16. Book mid-January 2027." },
      { name: "Apgar Campground", maps: "Apgar Campground Glacier National Park", note: "🚨 Nights 17–20. Same January booking." },
      { name: "Great Falls, MT", maps: "Great Falls Montana", note: "Day 14 resupply. Last full grocery." },
      { name: "Iceberg Lake Trailhead", maps: "Iceberg Lake Trailhead Many Glacier", note: "Day 15. Lot fills by 7 AM. Bear corridor." },
      { name: "Grinnell Glacier Trailhead", maps: "Grinnell Glacier Trailhead Many Glacier", note: "Day 16. Snowfields into late July." },
      { name: "Logan Pass", maps: "Logan Pass Visitor Center Glacier", note: "⚠️ 3-hour parking cap from July 1. $1 shuttle." },
    ]},
    { group: "The drive home", items: [
      { name: "Cottonwood Campground", maps: "Cottonwood Campground Theodore Roosevelt", note: "Nights 21–22. Wild horses." },
      { name: "Painted Canyon Overlook", maps: "Painted Canyon Overlook Theodore Roosevelt", note: "Day 22 evening." },
    ]},
  ],
  placesNote:
    "No coordinate on this page has been verified — <code>tools/geocode.mjs</code> returns nothing in this environment — so every entry is a Maps search string rather than a pin. A search for a named place lands you correctly; a guessed coordinate does not.",

  offlineRegions:
    "Download offline Google Maps for the whole corridor before leaving: Chicago–Madison–La Crosse, Badlands, Rapid City–Black Hills, Devils Tower, Buffalo–Bighorns, Cody–Beartooth, Yellowstone NE, Great Falls–Browning–Glacier, and the I-94 corridor home. <b>Trails are a separate download</b> — AllTrails or Gaia for Cloud Peak Wilderness, the Beartooth High Lakes, and all of Glacier. There is effectively no signal on the Cloud Peak Skyway, across the Beartooth Plateau, in Lamar, or in the Many Glacier valley.",

  budget: {
    note: "No airfare, no rental car, no under-25 surcharge — this trip is fuel and campsites. Every campground fee is an estimate; none was read from an operator page.",
    rows: [
      { category: "Fuel", cost: 566, notes: "~4,400 mi at ~28 mpg, ~$3.60/gal. The single largest line." },
      { category: "Camping — 24 nights", cost: 554, notes: "Estimated across 11 places. Glacier ~$23 × 7 is the biggest block." },
      { category: "Groceries", cost: 320, notes: "25 days solo, cooking at camp. Four resupplies." },
      { category: "Eating out", cost: 120, notes: "A handful of named meals, not convenience food." },
      { category: "Custer State Park entry", cost: 20, notes: "State park — the America the Beautiful pass does not cover it" },
      { category: "Showers, laundry, sundries", cost: 60, notes: "Two shower points in 25 days" },
      { category: "Motel contingency", cost: 180, notes: "Two nights at ~$90 for the 600-mile drive-home days. See the open question." },
    ],
    subtotal: 1820,
    buffer: 218,
    bufferLabel: "Buffer (12%)",
    total: 2038,
  },

  waypoints: [
    { name: "Cedar Pass Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "2, 3", notes: "Badlands NP. Water. No shade in the park." },
    { name: "Notch Trailhead", lat: null, lng: null, verified: false, icon: "🪜", days: "3", notes: "Log ladder and ledge traverse. Dawn only in July." },
    { name: "Custer State Park", lat: null, lng: null, verified: false, icon: "⛺", days: "4, 5", notes: "Showers. State park booking window unverified." },
    { name: "Black Elk Peak Trailhead", lat: null, lng: null, verified: false, icon: "🥾", days: "5", notes: "Sylvan Lake. Lot fills early on summer weekends." },
    { name: "Belle Fourche River Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "6", notes: "Devils Tower NM. Believed first-come." },
    { name: "West Tensleep Lake Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "7, 8, 9", notes: "~9,100 ft, Bighorn NF. Cloud Peak Wilderness trailhead at camp." },
    { name: "Crazy Woman Canyon Road", lat: null, lng: null, verified: false, icon: "⚠️", days: "9", notes: "Unpaved, narrow, shelf sections. Clearance decision." },
    { name: "Island Lake Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "10, 11, 12", notes: "9,518 ft, Shoshone NF. Highest camp of the trip." },
    { name: "Chief Joseph Scenic Byway", lat: null, lng: null, verified: false, icon: "🛣️", days: "10", notes: "WY-296. Paved. Dead Indian Pass." },
    { name: "Slough Creek Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "13", notes: "Yellowstone. 16 sites, fills in minutes. Grizzly country." },
    { name: "Lamar Valley", lat: null, lng: null, verified: false, icon: "🦬", days: "13", notes: "Pull-outs only. 25 yd from bison, 100 yd from bears and wolves." },
    { name: "Many Glacier Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "14, 15, 16", notes: "Book mid-January 2027. No walk-up fallback in July." },
    { name: "Iceberg Lake Trailhead", lat: null, lng: null, verified: false, icon: "🧊", days: "15", notes: "Bear corridor. Lot fills by 7 AM." },
    { name: "Grinnell Glacier Trailhead", lat: null, lng: null, verified: false, icon: "🏔️", days: "16", notes: "Snowfields on the upper traverse into late July." },
    { name: "Logan Pass", lat: null, lng: null, verified: false, icon: "🅿️", days: "17, 18", notes: "3-hour parking cap from July 1. $1 ticketed shuttle." },
    { name: "Apgar Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "17–20", notes: "Glacier west side. Showers. Same January booking race." },
    { name: "Cottonwood Campground", lat: null, lng: null, verified: false, icon: "⛺", days: "21, 22", notes: "Theodore Roosevelt NP South Unit. Wild horses and bison." },
  ],

  notes: [
    {
      heading: "Why this is a July trip, and why that mattered more than the destination",
      body:
        "The June road trip was checked destination by destination and June turned out to be the gap month in this entire wishlist. <a href=\"#beartooth-plateau\">Beartooth</a> needs late June at absolute minimum — US-212 opened May 23 in 2026 and was <b>closed again by snow until June 9</b>. Snowy Range's campgrounds open July 4. The San Juans hold snow into early July. Lake Superior is peak blackfly. Utah is too hot, and Colorado's high country is still melting.<br><br><b>Moving the trip three weeks fixed more than any destination swap did.</b> Every single anchor on this route is comfortably in season in mid-July, and none of them was in June. That is the whole reason this page exists in this shape.",
    },
    {
      heading: "Why Glacier anchors it, and the clock on that",
      body:
        "✅ <b>Glacier eliminated its timed-entry vehicle reservation for 2026 — the first time in five years</b> — across Going-to-the-Sun, Many Glacier, Two Medicine and North Fork. The registry entry for this park literally used to be subtitled \"worst bureaucracy,\" and that objection is gone.<br><br>🚨 <b>A system dropped after five years can come back.</b> That is not a reason to panic-book, but it is the honest reason this trip is Glacier-anchored in 2027 rather than Beartooth-anchored: Beartooth will be exactly as good in 2031, and nobody knows what Glacier's entry rules look like then. <b>Re-verify before the January booking, and if it returns, the trip still works — it just gains a second race.</b><br><br>What replaced it is smaller and still real: a <b>3-hour parking cap at Logan Pass from July 1</b>, and a new <b>$1 ticketed shuttle</b> instead of the free hop-on service. The shuttle is quietly useful — it is what makes a point-to-point Highline Trail route possible, which is otherwise a car-shuttle problem for a solo traveller.",
    },
    {
      heading: "The real risk is the length, not any single day",
      body:
        "🚨 <b>Nothing on this route is individually hard, and that is exactly why the length is the thing to worry about.</b><br><br>The profile says <b>2–5 campgrounds per trip, 5–10 nights</b>. This is <b>25 nights across roughly eleven places to sleep</b>, which is more than double the longest trip on record here — the 11-day <a href=\"../appalachians-2026/\">Appalachians</a> run. Add 4,400 miles of driving on a 2013 Legacy with no rental to fall back on, four resupplies, two realistic showers, and three 600-mile days at the end when attention is worst.<br><br>Individually, every day is inside the ceiling or has a written bail-out. Cumulatively, this is an unknown. <b>Nobody knows yet how this traveller does on day 19 of anything.</b> The Kentucky and Appalachians trips are the data and they top out at eleven days.<br><br><b>The 21-day version is a real option and it costs almost nothing:</b> drop Theodore Roosevelt (two nights), drop one Bighorn night, and collapse one drive-home day. That removes the weakest content on the route and the two hardest driving days. It is written here rather than buried because deciding it in advance is much better than deciding it exhausted in North Dakota.",
    },
    {
      heading: "Two hikes are over the ceiling, on purpose, with bail-outs",
      body:
        "The soft ceiling is ~10 mi and ~2,500 ft per day, exceeded \"when the payoff justifies it, not by accident.\" Two scheduled hikes cross it and both are over on distance only:<br><br><b>Lost Twin Lakes (Day 8): 11.1 mi, 2,076 ft.</b> A mile over, at 9,000+ ft, on the first hard day of the trip. Bail-out written into the day: Mirror Lake alone at 5.9 mi / 1,095 ft, which is a complete day.<br><br><b>Grinnell Glacier (Day 16): 11.1 mi, 2,047 ft.</b> A mile over, on day sixteen. Bail-out: the boat shuttle across Swiftcurrent and Josephine removes about 3.4 miles, and it exists precisely for this.<br><br>Three more are named in the Hikes tab and deliberately <b>not</b> scheduled: the full Highline Trail (15.2 mi / 2,572 ft — over on both counts, hence the Haystack Butte version), Ptarmigan Tunnel (10.7 mi, and it competes with Iceberg Lake from the same trailhead), and Cloud Peak (22.6 mi / 5,337 ft, which is a backpacking trip and therefore excluded by a locked rule). <b>Listing what was cut is the point — otherwise the ceiling gets crossed by accident rather than by decision.</b>",
    },
    {
      heading: "The Garden Wall ledge, stated plainly",
      body:
        "The first mile of the Highline Trail is cut into the side of the Garden Wall with a hand cable bolted to the rock and a long drop below it. It is <b>not</b> technical, it is <b>not</b> a scramble, and thousands of people walk it every summer including children.<br><br>It is also the single highest-consequence piece of ground on this entire route, and the profile is explicit: sustained low-consequence difficulty is welcome, single high-consequence moves get more caution. <b>So: if the ledge does not feel right, turn around at the cable.</b> Hidden Lake Overlook from the same parking lot is a genuinely good day and costs nothing but the ego. The page's job here is to give the real numbers and a stated fallback, not to nag and not to stay silent.",
    },
    {
      heading: "Bear country is new for this list",
      body:
        "From Lamar Valley on Day 13 through the last Glacier morning on Day 21, this is <b>grizzly country in a way nothing previously on this hub has been</b>. Red River Gorge and the Southern Appalachians are black bear country; the food-storage habits transfer, the rest does not.<br><br>What changes: <b>bear spray lives on the person, not in the pack and not in the car.</b> Noise on blind corners — Iceberg Lake and Grinnell are documented corridors and both are hiked at dawn on this itinerary, which is the highest-encounter window. Everything scented goes in the bear box every night, including toothpaste and the cooler. And in Lamar, the rule is simply that you do not leave the pull-out: 25 yards from bison, 100 from bears and wolves, and the valley injures someone walking toward a bison for a photograph roughly every other year.<br><br>None of this is a reason not to go. It is a reason to have the habits before Day 13 rather than learning them there.",
    },
    {
      heading: "What this costs, and what it does not",
      body:
        "About <b>$2,038 for 25 days</b>, and unusually for this list that number is nearly complete — <b>there is no airfare, no rental car and no under-25 surcharge in it</b>, because you are driving your own car. Compare the <a href=\"../sky-islands-2027/\">Sky Islands</a> trip: 11 days, ~$1,076, and an unpriced flight that could add $400 on top.<br><br>Fuel is the single biggest line at ~$566, and it is the one that moves with the route rather than with choices. Campsites are ~$554 across eleven places, all estimated. <b>The 21-day version saves roughly $250</b> — two nights of camping, a tank and a half of fuel, and one motel — which is not nothing but is not the argument for shortening it either. The argument for shortening it is on day 19, not in the budget.",
    },
    {
      heading: "The shape of the summer this sits in",
      body:
        "This trip is the middle of three things and the only one that is drivable. <a href=\"../maui-2027/\">Maui</a> is May 13–20. This is July 6–30. <a href=\"#kenai-peninsula\">Kenai</a> is targeted at August 14–27, and <b>this route deliberately ends July 30 to leave fifteen days of turnaround before it</b> — the PNW alternative would have left six, which is why it was dropped.<br><br>The Eastern Sierra was the fourth item and it was <b>dropped from 2027 by choice</b>, correctly: it is ten days on cheap Reno flights and a cheap car, which is a trip that survives a two-week PTO allowance in 2028 and every year after. A 4,400-mile drive and Alaska do not. <b>The horizon is Aug 31 2027, when full-time work starts and the academic calendar stops being the constraint.</b> Everything about the shape of this summer follows from that one date.",
    },
  ],

  map: { center: [46.0, -106.5], zoom: 5 },
};
