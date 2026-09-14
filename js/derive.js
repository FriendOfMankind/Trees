/* ==========================================================================
   derive.js — the things this site can work out for itself.

   Every number on these pages used to be typed by hand, including the ones
   that are pure arithmetic on data already in the files. Typed numbers drift;
   derived ones can't. Nothing in here guesses — if the inputs don't determine
   an answer, it returns `known: false` and says what's missing, which is the
   same contract as `verified: false` on a waypoint.

   Loaded by the hub and by tools/ under Node, so it must stay dependency-free
   and must not touch the DOM.
   ========================================================================== */

/** Look up a booking system's default lead time from BOOKING_WINDOWS. */
function bookingSystem(name, windows) {
  if (!name || !Array.isArray(windows)) return null;
  return windows.find((w) => w.system === name) || null;
}

/**
 * When the booking window opens for a trip.
 *
 * A trip declares its bookings:
 *   booking: [{ system: "recreation.gov", what: "Hosmer Grove", target: "2027-05-17" }]
 *
 * `target` is the FIRST NIGHT being booked, not the trip's start date. Rolling
 * windows count back from arrival, so a campground on night five opens four
 * days after the one on night one. Defaults to `trip.start` when omitted,
 * which is correct for the first campground and wrong for every later one —
 * so set it.
 *
 * The lead time itself lives once in data/profile.js. Correct it there and
 * every trip's dates move with it.
 *
 * Returns one entry per declared booking, each either:
 *   { known: true,  opensISO, ... }  — counted back from a known window
 *   { known: false, why }            — the window genuinely varies, or there
 *                                      is no date to count back from
 */
function bookingDeadlines(trip, windows) {
  const decls = !trip.booking ? [] : (Array.isArray(trip.booking) ? trip.booking : [trip.booking]);
  return decls.map((b) => {
    const sys = bookingSystem(b.system, windows);
    const label = b.system || (sys && sys.what) || "Booking";
    const what = b.what || (sys && sys.what) || label;
    const note = b.note || (sys && sys.note) || "";
    const base = { system: label, what, note, booked: !!b.booked };

    if (b.opens) {
      return Object.assign({}, base, { known: true, opensISO: b.opens, source: "explicit" });
    }

    const target = b.target || trip.start;
    const leadMonths = b.leadMonths != null ? b.leadMonths : (sys ? sys.leadMonths : null);
    const leadDays = b.leadDays != null ? b.leadDays : (sys ? sys.leadDays : null);

    if (!target) {
      return Object.assign({}, base, { known: false,
        why: "no locked date — the window can't be counted back from anything yet" });
    }
    if (leadMonths == null && leadDays == null) {
      return Object.assign({}, base, { known: false,
        why: (sys && sys.when) ? `window varies (${sys.when}) — confirm it` : "no lead time recorded for this system" });
    }

    const opensISO = leadMonths != null ? shiftMonthsISO(target, -leadMonths) : shiftISO(target, -leadDays);
    return Object.assign({}, base, {
      known: true, source: "derived", target, leadMonths, leadDays, opensISO,
      basis: leadMonths != null
        ? `${leadMonths} months before ${target}`
        : `${leadDays} days before ${target}`,
    });
  });
}

/** ISO date ± whole calendar months, clamped to the end of a short month.
    Rolling reservation windows are stated in months and land on the same day
    number, so 183 days is the wrong tool: it misses by up to three days, and
    three days is a sold-out campground. */
function shiftMonthsISO(iso, months) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const target = (y * 12 + (m - 1)) + months;
  const ny = Math.floor(target / 12);
  const nm = target - ny * 12;
  const lastDay = new Date(Date.UTC(ny, nm + 1, 0)).getUTCDate();
  return new Date(Date.UTC(ny, nm, Math.min(d, lastDay))).toISOString().slice(0, 10);
}

/** ISO date ± whole days, in UTC so nothing shifts across a timezone. */
function shiftISO(iso, days) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d) + days * 86400000).toISOString().slice(0, 10);
}

/**
 * Everything with a date attached to it, across every trip, oldest deadline
 * first. This is the list the hub's Agenda tab renders and the one
 * `node tools/agenda.mjs` prints.
 *
 * `todayISO` is injected rather than read from the clock so the same input
 * always produces the same output — that's what makes it testable.
 */
function agenda(trips, windows, todayISO) {
  const items = [];
  const today = todayISO || new Date().toISOString().slice(0, 10);
  const days = (iso) => iso ? Math.round((Date.parse(iso + "T00:00:00Z") - Date.parse(today + "T00:00:00Z")) / 86400000) : null;

  for (const t of trips) {
    if (t.status === "done") continue;

    for (const d of bookingDeadlines(t, windows)) {
      if (d.booked) continue;                     // already booked; not a deadline
      if (d.known) {
        items.push({
          kind: "booking", slug: t.slug, trip: t.title, emoji: t.emoji, theme: t.theme,
          dateISO: d.opensISO, days: days(d.opensISO),
          headline: `${d.what} window opens`,
          detail: d.note, basis: d.basis, open: days(d.opensISO) <= 0,
        });
      } else {
        items.push({
          kind: "unknown-window", slug: t.slug, trip: t.title, emoji: t.emoji, theme: t.theme,
          dateISO: null, days: null,
          headline: `${d.what} — window unknown`,
          detail: d.why,
        });
      }
    }

    if (t.start) {
      items.push({
        kind: "departure", slug: t.slug, trip: t.title, emoji: t.emoji, theme: t.theme,
        dateISO: t.start, days: days(t.start),
        headline: "Departure", detail: t.dates || "",
      });
    }

    /* The next action, for trips that are actually live. Every wishlist entry
       has one too, but "decide between this and Snowy Range for the 2028
       alpine slot" is not an agenda item, it's a card. Undated on purpose —
       inventing a due date for it would be inventing a fact. */
    if (t.next && (t.status === "planned" || t.status === "outline")) {
      items.push({
        kind: "next", slug: t.slug, trip: t.title, emoji: t.emoji, theme: t.theme,
        dateISO: null, days: null, headline: t.next, detail: "",
      });
    }
  }

  /* Dated things in date order; undated ones last, since "someday" can't
     compete with "the window opens on Thursday". */
  return items.sort((a, b) => {
    if ((a.dateISO === null) !== (b.dateISO === null)) return a.dateISO === null ? 1 : -1;
    if (a.dateISO === null) return (a.trip || "").localeCompare(b.trip || "");
    if (a.dateISO !== b.dateISO) return a.dateISO < b.dateISO ? -1 : 1;
    const rank = { booking: 0, next: 1, departure: 2, "unknown-window": 3 };
    return (rank[a.kind] || 9) - (rank[b.kind] || 9);
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { bookingDeadlines, agenda, shiftISO, shiftMonthsISO };
}
