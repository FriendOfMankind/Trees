/* ==========================================================================
   exports.js — getting a plan out of this site and into the things that
   actually run on a trip.

   The site was a read-only terminal: everything went in, nothing came out.
   Meanwhile the gear locker lists "a GPX for anything poorly blazed" as a
   `need` and the universal checklist says "Text the trip plan home, with the
   date and time of every no-signal segment" — two jobs the data could already
   do and no button could.

   Four formats, one rule each:
     GPX   — verified waypoints only. An unverified pin in a nav app is worse
             than no pin, because the app will happily route you to it.
     ICS   — days as all-day events, booking windows as alarms.
     TEXT  — the plan you send home. Where you are each night, what has no
             signal, and who to call.
     JSON  — the machine-readable registry, so anything else can read this.

   Loaded by trip pages and by tools/export.mjs under Node. No DOM, no deps.
   ========================================================================== */

/* ---------------- Shared ---------------- */

/** Data files carry author-written inline HTML. Every export here is plain
    text or XML, so it has to come out. */
function stripHtml(s) {
  return String(s == null ? "" : s)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8599;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function xmlEscape(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

/* ---------------- GPX ---------------- */

/** GPX symbol names most apps recognise, keyed off the waypoint's emoji.
    An unknown icon just gets no <sym> — the app picks its default. */
const GPX_SYM = {
  "⛺": "Campground", "🥾": "Trail Head", "🌋": "Summit", "🏖️": "Beach",
  "🛒": "Shopping Center", "🤿": "Swimming Area", "✈️": "Airport",
  "🌳": "Park", "🌅": "Scenic Area", "🛣️": "Road", "☕": "Restaurant",
  "🥐": "Restaurant", "📍": "Waypoint",
};

/**
 * GPX 1.1 from a trip's waypoints.
 * Only `verified: true` points with real coordinates are emitted. The
 * unverified ones are listed in a comment at the top so that opening the file
 * tells you what it deliberately left out — a silent omission would just look
 * like the trip has fewer places in it.
 */
function toGPX(D, opts) {
  const M = D.meta || {};
  const all = D.waypoints || [];
  const verified = all.filter((w) => w.verified && w.lat != null && w.lng != null);
  const skipped = all.filter((w) => !(w.verified && w.lat != null && w.lng != null));
  const when = (opts && opts.now) || new Date().toISOString().replace(/\.\d+Z$/, "Z");

  const notes = skipped.length
    ? `\n<!-- ${skipped.length} waypoint(s) deliberately NOT exported: coordinates were\n     never verified, and a pin 200 m off routes you to a locked gate.\n${
        skipped.map((w) => `     - ${stripHtml(w.name)} (day ${w.days || "?"})`).join("\n")}\n-->\n`
    : "";

  const wpts = verified.map((w) => {
    const sym = GPX_SYM[w.icon];
    const desc = [w.days ? `Day(s): ${w.days}` : "", stripHtml(w.notes)].filter(Boolean).join(" — ");
    return `  <wpt lat="${w.lat}" lon="${w.lng}">
    <name>${xmlEscape(stripHtml(w.name))}</name>${desc ? `
    <desc>${xmlEscape(desc)}</desc>` : ""}${sym ? `
    <sym>${xmlEscape(sym)}</sym>` : ""}
  </wpt>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Trail Notes" xmlns="http://www.topografix.com/GPX/1/1"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>${xmlEscape(stripHtml(M.title || "Trip"))}</name>
    <desc>${xmlEscape(stripHtml(M.subtitle || ""))} — verified waypoints only</desc>
    <time>${when}</time>
  </metadata>${notes}
${wpts}
</gpx>
`;
}

/* ---------------- ICS ---------------- */

/** RFC 5545 wants CRLF and lines folded at 75 octets. Calendars are
    unforgiving about both. */
function icsFold(line) {
  const bytes = [...line];
  const out = [];
  let cur = "";
  for (const ch of bytes) {
    if (cur.length + ch.length > 73) { out.push(cur); cur = " "; }
    cur += ch;
  }
  out.push(cur);
  return out.join("\r\n");
}

function icsEscape(s) {
  return stripHtml(s).replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function icsDate(iso) { return iso.replace(/-/g, ""); }

function icsStamp(d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z"); }

function shiftDay(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d) + n * 86400000).toISOString().slice(0, 10);
}

/**
 * A calendar for one trip: each day as an all-day event carrying its
 * schedule, plus one alarmed event per booking window that hasn't been booked.
 *
 * `trip` is the registry entry (for `start` and `booking`); `windows` is
 * BOOKING_WINDOWS. Both optional — without them you get the itinerary alone.
 */
function toICS(D, trip, windows, opts) {
  const M = D.meta || {};
  const now = (opts && opts.now) || new Date();
  const stamp = icsStamp(now);
  const uidBase = `${M.slug || "trip"}@trail-notes`;
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", `PRODID:-//Trail Notes//${M.slug || "trip"}//EN`,
    "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    `X-WR-CALNAME:${icsEscape(M.title || "Trip")}`,
  ];

  const start = trip && trip.start;

  (D.days || []).forEach((d, i) => {
    if (!start) return;                              // no anchor date, no calendar
    const dayISO = shiftDay(start, i);
    const body = [
      d.tagline ? stripHtml(d.tagline) : "",
      d.overnight ? `Overnight: ${stripHtml(d.overnight.name)}${d.overnight.confirmation ? ` (${stripHtml(d.overnight.confirmation)})` : ""}` : "",
      d.driving ? `Driving: ${stripHtml(d.driving)}` : "",
      d.noSignal ? `NO SIGNAL: ${stripHtml(d.noSignal)}` : "",
      "",
      ...(d.schedule || []).map((s) => `${stripHtml(s.time)}  ${stripHtml(s.text)}`),
      d.warnings ? `\nWarnings: ${stripHtml(d.warnings)}` : "",
    ].filter((x) => x !== undefined).join("\n");

    lines.push(
      "BEGIN:VEVENT",
      `UID:day-${i + 1}-${uidBase}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(dayISO)}`,
      `DTEND;VALUE=DATE:${icsDate(shiftDay(dayISO, 1))}`,
      `SUMMARY:Day ${d.day} — ${icsEscape(d.title || "")}`,
      `DESCRIPTION:${icsEscape(body)}`,
      d.overnight ? `LOCATION:${icsEscape(d.overnight.place || d.overnight.name || "")}` : "",
      "END:VEVENT"
    );
  });

  /* Booking windows. These are the events worth an alarm — the itinerary you
     will remember, the 6 AM drop you will not. */
  if (trip && typeof bookingDeadlines === "function") {
    for (const b of bookingDeadlines(trip, windows || [])) {
      if (b.done || !b.known || !b.opensISO) continue;
      lines.push(
        "BEGIN:VEVENT",
        `UID:book-${b.opensISO}-${slugify(b.what)}-${uidBase}`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${icsDate(b.opensISO)}`,
        `DTEND;VALUE=DATE:${icsDate(shiftDay(b.opensISO, 1))}`,
        `SUMMARY:BOOK: ${icsEscape(b.what)}`,
        `DESCRIPTION:${icsEscape([
          `${M.title || ""} — booking window opens.`,
          b.basis ? `Derived: ${b.basis}.` : "",
          b.note,
          "Times are local to the campground and small sites go in seconds.",
        ].filter(Boolean).join("\n"))}`,
        "BEGIN:VALARM", "ACTION:DISPLAY",
        `DESCRIPTION:${icsEscape(`Booking window opens tomorrow: ${b.what}`)}`,
        "TRIGGER:-P1D", "END:VALARM",
        "END:VEVENT"
      );
    }
  }

  lines.push("END:VCALENDAR");
  return lines.filter(Boolean).map(icsFold).join("\r\n") + "\r\n";
}

function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

/* ---------------- The plan you send home ---------------- */

/**
 * Plain text, built for a phone message.
 *
 * The universal checklist has said "Text the trip plan home, with the date
 * and time of every no-signal segment" since the site existed, and there was
 * nothing to press. `day.noSignal` is what makes the no-signal section real;
 * when a trip hasn't declared any, this says so rather than implying coverage
 * nobody checked.
 */
function toPlanText(D, trip, profile) {
  const M = D.meta || {};
  const L = [];
  const days = D.days || [];

  L.push(`TRIP PLAN — ${stripHtml(M.title || "")}`);
  if (M.dates) L.push(stripHtml(M.dates));
  if (profile) L.push(`${stripHtml(profile.name || "")}, ${stripHtml(profile.defaultGroup || "")}`);
  if (M.vehicle) L.push(`Vehicle: ${stripHtml(M.vehicle)}`);
  L.push("");

  L.push("WHERE I AM EACH NIGHT");
  for (const d of days) {
    const o = d.overnight;
    L.push(`  ${d.date} — ${o ? stripHtml(o.name) + (o.place ? `, ${stripHtml(o.place)}` : "") : "NO LODGING RECORDED"}`);
    if (o && o.confirmation && o.confirmation !== "TBD") L.push(`      confirmation ${stripHtml(o.confirmation)}`);
  }
  L.push("");

  const dark = days.filter((d) => d.noSignal);
  L.push("NO SIGNAL");
  if (dark.length) {
    for (const d of dark) L.push(`  ${d.date} — ${stripHtml(d.noSignal)}`);
  } else {
    L.push("  Not declared in the trip data. That is a gap in the plan, not a");
    L.push("  statement that there is coverage. Add `noSignal` to the days it");
    L.push("  applies to before sending this.");
  }
  L.push("");

  /* Every number written anywhere in the plan, including the waypoint notes,
     where campground office numbers actually live. Whoever is holding this
     message is the person who will need them, and they will not be scrolling
     a trip page to find one. */
  const phones = [];
  const numberSources = [
    ...days.flatMap((d) => [
      d.overnight && d.overnight.notes, d.overnight && d.overnight.name,
      d.highlights, d.warnings, ...(d.schedule || []).map((s) => s.text),
    ]),
    ...(D.waypoints || []).flatMap((w) => [`${w.name}\u0000${w.notes || ""}`]),
    ...(D.reservations || []).map((r) => r.text),
  ].filter(Boolean);

  for (const src of numberSources) {
    const text = stripHtml(String(src).replace(/\u0000/g, " — "));
    for (const m of text.matchAll(/(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]\d{4})/g)) {
      const label = text.slice(0, 60).replace(/\s+/g, " ").trim();
      if (!phones.some((x) => x.num === m[1])) phones.push({ num: m[1], label });
    }
  }
  if (phones.length) {
    L.push("NUMBERS IN THE PLAN");
    for (const p of phones) L.push(`  ${p.num}  ${p.label}`);
    L.push("");
  }

  const turn = days.filter((d) => d.slack || d.warnings);
  if (turn.length) {
    L.push("DAYS WITH A STATED RISK OR TURNAROUND");
    for (const d of turn) {
      L.push(`  ${d.date} — ${stripHtml(d.title)}`);
      if (d.slack) L.push(`      slack: ${stripHtml(d.slack)}`);
      if (d.warnings) L.push(`      ${stripHtml(d.warnings).slice(0, 200)}`);
    }
    L.push("");
  }

  L.push(`If you have not heard from me by the end of ${days.length ? stripHtml(days[days.length - 1].date) : "the trip"},`);
  L.push("start with the last campground on the list above.");
  return L.join("\n");
}

/* ---------------- JSON ---------------- */

/** The registry as data, so something other than this site can read it. */
function toRegistryJSON(trips, windows, todayISO) {
  return {
    generated: "tools/export.mjs",
    trips: trips.map((t) => ({
      slug: t.slug, title: t.title, subtitle: t.subtitle, status: t.status,
      pinned: !!t.pinned, page: t.page || null,
      start: t.start || null, dates: t.dates || null, window: t.window || null,
      region: t.region || null, country: t.country || null, coords: t.coords || null,
      nights: t.nights || null, distance: t.distance || null, budget: t.budget || null,
      tags: t.tags || [], why: t.why || null, next: t.next || null,
      updated: t.updated || null,
      booking: typeof bookingDeadlines === "function" ? bookingDeadlines(t, windows || []) : undefined,
    })),
    agenda: typeof agenda === "function" ? agenda(trips, windows || [], todayISO) : undefined,
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { toGPX, toICS, toPlanText, toRegistryJSON, stripHtml };
}
