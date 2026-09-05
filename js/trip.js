/* ==========================================================================
   trip.js — the shared trip renderer. Every trip page loads this file plus
   its own data.js; nothing here is destination-specific.

   The page builds its own tabs from whichever sections the data defines, so
   a trip with no hikes has no Hikes tab. Add data, get a tab. Remove data,
   the tab disappears. No HTML editing.

   Note bodies and warning strings may contain inline HTML (links to other
   trips, <em>, <br>). Data in this repo is author-written, not user input.
   ========================================================================== */

(function () {
  "use strict";

  const D = window.TRIP_DATA;
  if (!D) {
    document.body.innerHTML = "<p style='padding:2rem;font-family:sans-serif'>No TRIP_DATA found. Check that data.js loaded before trip.js.</p>";
    return;
  }

  const M = D.meta;
  const SLUG = M.slug;

  /* Trip pages load the registry too, so an export can reach `start`, the
     booking declarations and the profile. Guarded because a trip page opened
     without them should still render — it just can't build a calendar. */
  const ENTRY = (typeof TRIPS !== "undefined" && TRIPS.find((t) => t.slug === SLUG)) || null;
  const WINDOWS = typeof BOOKING_WINDOWS !== "undefined" ? BOOKING_WINDOWS : [];
  const has = (v) => Array.isArray(v) ? v.length > 0 : !!v;

  applyTheme(M.theme);

  /* ---------------- Section registry ----------------
     id, tab label, whether the data exists, and the renderer. */
  const SECTIONS = [
    { id: "overview",     label: "Overview",             on: true,                       render: renderOverview },
    { id: "itinerary",    label: "Itinerary",            on: has(D.days),                render: renderItinerary },
    { id: "places",       label: "Places",               on: has(D.places),              render: renderPlaces },
    { id: "map",          label: "Map",                  on: has(D.waypoints) || has(D.routes) || has(D.trails), render: renderMapPanel },
    { id: "lodging",      label: "Lodging",              on: has(D.lodging && D.lodging.rows), render: renderLodging },
    { id: "hikes",        label: (M.labels && M.labels.hikes) || "Hikes", on: has(D.hikes && D.hikes.rows), render: renderHikes },
    { id: "conditions",   label: "Sun / Moon / Weather", on: has(D.sunMoon) || has(D.weather), render: renderConditions },
    { id: "budget",       label: "Budget",               on: has(D.budget && D.budget.rows), render: renderBudget },
    { id: "provisions",   label: "Food &amp; Cooler",    on: has(D.provisions),          render: renderProvisions },
    { id: "packing",      label: "Packing",              on: has(D.packing),             render: renderPacking },
    { id: "reservations", label: "Reservations",         on: has(D.reservations),        render: renderReservations },
    { id: "questions",    label: "Open Questions",       on: has(D.openQuestions),       render: renderQuestions },
    { id: "retro",        label: "Retro",                on: has(D.retro),               render: renderRetro },
    { id: "notes",        label: "Notes",                on: has(D.notes),               render: renderNotes },
  ].filter((s) => s.on);

  /* ---------------- Chrome ---------------- */

  function renderChrome() {
    document.title = `${M.title} — Trip Plan`;
    $("#trip-title").textContent = M.title;
    $("#trip-subtitle").textContent = M.dates ? `${M.subtitle} · ${M.dates}` : M.subtitle;

    if (M.emoji) {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${M.emoji}</text></svg>`;
      document.head.appendChild(link);
    }

    $("#header-stats").innerHTML = (M.stats || [])
      .map((s) => `<div class="stat"><span class="num">${s.num}</span><span class="lbl">${s.lbl}</span></div>`)
      .join("");

    $("#tabs").innerHTML = SECTIONS.map((s, i) => {
      const badge = s.id === "questions" ? ` (${D.openQuestions.length})` : "";
      return `<button class="tab-btn ${i === 0 ? "active" : ""}" data-tab="${s.id}">${s.label}${badge}</button>`;
    }).join("");

    $("#panels").innerHTML = SECTIONS.map(
      (s, i) => `<section id="panel-${s.id}" class="panel ${i === 0 ? "active" : ""}"></section>`
    ).join("");

    if (M.footerNote) $("#footer-note").innerHTML = M.footerNote;
  }

  let tabs = null;

  function activateTab(name) { if (tabs) tabs.activate(name); }

  /* ---------------- Overview ---------------- */

  function renderOverview() {
    const el = $("#panel-overview");
    const bannerLines = [
      M.route ? `<p><strong>Route:</strong> ${M.route}</p>` : "",
      M.vehicle ? `<p><strong>Vehicle:</strong> ${M.vehicle}</p>` : "",
      M.gettingThere ? `<p><strong>Getting there:</strong> ${M.gettingThere}</p>` : "",
    ].filter(Boolean).join("");

    el.innerHTML = `
      <h2 class="section-title">Trip Overview</h2>
      ${bannerLines ? `<div class="route-banner">${bannerLines}</div>` : ""}
      <div class="card-grid">
        ${(M.overviewCards || []).map((c) => `<div class="info-card"><h3>${c.h}</h3><p>${c.p}</p></div>`).join("")}
      </div>
      <div class="tool-bar" id="export-bar" data-no-print></div>
      ${has(D.days) ? `<h3 class="section-title" style="margin-top:1.5rem;">Days at a glance</h3><div class="mini-days" id="mini-days"></div>` : ""}
    `;

    renderExportBar();

    if (!has(D.days)) return;
    $("#mini-days").innerHTML = D.days.map(
      (d) => `<div class="mini-day" data-day="${d.day}">
        <div class="d-num">Day ${d.day}</div>
        <div class="d-title">${d.title}</div>
        <div class="d-date">${d.date}</div>
      </div>`
    ).join("");

    $$(".mini-day", el).forEach((card) => {
      card.addEventListener("click", () => {
        activateTab("itinerary");
        requestAnimationFrame(() => {
          const target = $(`#day-${card.dataset.day}`);
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    });
  }

  /* ---------------- Exports ----------------
     The site used to be one-way: everything went in, nothing came out. The
     gear locker lists a GPX as a `need` and the universal checklist says to
     text the plan home, and neither had a button. */

  function renderExportBar() {
    const el = $("#export-bar");
    if (!el) return;

    const verified = (D.waypoints || []).filter((w) => w.verified && w.lat != null && w.lng != null);
    const unverified = (D.waypoints || []).length - verified.length;

    el.innerHTML = [
      verified.length
        ? `<button class="btn ghost" id="dl-gpx">Download GPX (${verified.length} pins)</button>`
        : `<span class="tool-note">No GPX — this trip has no verified coordinates yet.</span>`,
      ENTRY && ENTRY.start ? `<button class="btn ghost" id="dl-ics">Add to calendar (.ics)</button>` : "",
      `<button class="btn ghost" id="copy-plan">Copy the plan to text home</button>`,
      `<button class="btn ghost" id="do-print">Print</button>`,
      unverified ? `<span class="tool-note">${unverified} unverified waypoint${unverified === 1 ? "" : "s"} left out of the GPX on purpose.</span>` : "",
    ].filter(Boolean).join("");

    const on = (id, fn) => { const b = $(id); if (b) b.addEventListener("click", fn); };

    on("#dl-gpx", () => download(`${SLUG}.gpx`, toGPX(D), "application/gpx+xml"));
    on("#dl-ics", () => download(`${SLUG}.ics`, toICS(D, ENTRY, WINDOWS), "text/calendar"));
    on("#do-print", () => window.print());
    on("#copy-plan", async () => {
      const btn = $("#copy-plan");
      const text = toPlanText(D, ENTRY, typeof PROFILE !== "undefined" ? PROFILE : null);
      const ok = await copyText(text);
      btn.textContent = ok ? "Copied — paste it into a message" : "Couldn't copy; downloading instead";
      if (!ok) download(`${SLUG}-plan.txt`, text, "text/plain");
      setTimeout(() => { btn.textContent = "Copy the plan to text home"; }, 4000);
    });
  }

  /* ---------------- Itinerary ---------------- */

  function renderItinerary() {
    $("#panel-itinerary").innerHTML =
      `<h2 class="section-title">Day-by-Day Itinerary</h2>` + D.days.map(dayCardHtml).join("");
  }

  /* One row of the movement log. Accepts either the simple {time,text} shape
     or the full {kind,time,est,text,maps,warn} one — Maui uses the first,
     everything since uses the second. */
  const KIND_ICON = {
    drive: "\u{1F697}", stop: "\u{1F4CD}", hike: "\u{1F97E}", food: "\u{1F37D}\uFE0F",
    dessert: "\u{1F366}", shop: "\u{1F6D2}", sunrise: "\u{1F304}", sunset: "\u{1F305}",
    lecture: "\u{1F4E1}", ruins: "\u{1F3DA}\uFE0F", view: "\u{1F440}", camp: "\u26FA",
    shuttle: "\u{1F68C}", event: "\u{1F336}\uFE0F",
    /* Added when Maui was brought onto this shape. All three are reusable:
       every trip here starts before dawn, half of them touch water, and the
       moon decides whether a night is dark on any trip that cares. */
    wake: "\u23F0", swim: "\u{1F93F}", moon: "\u{1F319}",
  };

  /* Google Maps search deep link. The query string is what survives offline —
     it's stored in the page, so the link works the moment there's signal, and
     the offline Google Maps region download does the actual navigation. */
  function mapsUrl(query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  /* The query string is carried in data-q as well as the href, because on
     paper an href is invisible and the query is the only part that's useful
     standing at a junction with a phone that has no signal. */
  function mapsBtn(query) {
    return `<a class="maps-btn" href="${mapsUrl(query)}" data-q="${query.replace(/"/g, "&quot;")}" target="_blank" rel="noopener">Maps &#8599;</a>`;
  }

  function scheduleRowHtml(s) {
    const icon = s.kind ? (KIND_ICON[s.kind] || "\u{1F4CD}") : "";
    const maps = s.maps ? mapsBtn(s.maps) : "";
    const est = s.est ? `<span class="est">${s.est}</span>` : "";
    return `<li class="${s.warn ? "warn-row" : ""}">
      <span class="time">${icon ? `<span class="kind">${icon}</span>` : ""}${s.time}</span>
      <span class="row-body"><span class="row-text">${s.text}</span>${est}${maps}</span>
    </li>`;
  }

  function dayCardHtml(d) {
    const o = d.overnight;
    const overnight = o
      ? `<div class="overnight-box">
          <div class="on-name">${o.name}${o.place ? ` — ${o.place}` : ""}</div>
          ${o.kind ? `<div class="on-line">${o.kind}${o.cost ? ` · ${o.cost}` : ""}</div>` : ""}
          ${o.checkin ? `<div class="on-line">Check-in: ${o.checkin}</div>` : ""}
          ${o.confirmation ? `<div class="on-line">Confirmation: ${o.confirmation}</div>` : ""}
          ${o.notes ? `<div class="on-line">${o.notes}</div>` : ""}
        </div>`
      : "";

    const meals = d.meals
      ? `<div class="meals-row"><span>🍳 B: ${d.meals.b}</span><span>🥪 L: ${d.meals.l}</span><span>🍽️ D: ${d.meals.d}</span></div>`
      : "";

    const chips = [
      d.type ? `<span class="chip">${d.type}</span>` : "",
      d.driving ? `<span class="chip">🚗 ${d.driving}</span>` : "",
      d.walking ? `<span class="chip">🥾 ${d.walking}</span>` : "",
      d.noSignal ? `<span class="chip nosignal">📵 No signal</span>` : "",
    ].filter(Boolean).join("");

    const slack = d.slack
      ? `<div class="slack-line"><b>Slack:</b> ${d.slack}</div>`
      : "";

    return `
      <article class="day-card" id="day-${d.day}">
        <div class="day-card-head">
          <div>
            <div class="d-label">Day ${d.day} · ${d.date}</div>
            <h2>${d.title}</h2>
            ${d.tagline ? `<p class="tagline">${d.tagline}</p>` : ""}
          </div>
        </div>
        <div class="day-card-body">
          ${chips ? `<div class="day-meta-row">${chips}</div>` : ""}
          <div class="day-columns">
            <div>
              <div class="side-block">
                <h4>Schedule</h4>
                <ul class="schedule-list">
                  ${(d.schedule || []).map(scheduleRowHtml).join("")}
                </ul>
                ${slack}
              </div>
            </div>
            <div>
              ${overnight ? `<div class="side-block"><h4>Overnight</h4>${overnight}</div>` : ""}
              ${meals ? `<div class="side-block"><h4>Meals</h4>${meals}</div>` : ""}
              ${d.highlights ? `<div class="callout highlight"><strong>Highlights</strong>${d.highlights}</div>` : ""}
              ${d.noSignal ? `<div class="callout warning"><strong>No signal</strong>${d.noSignal}</div>` : ""}
              ${d.warnings ? `<div class="callout warning"><strong>Warnings</strong>${d.warnings}</div>` : ""}
            </div>
          </div>
        </div>
      </article>`;
  }

  /* ---------------- Places ----------------
     The field view. Every entry is a Google Maps query rather than a pin,
     because a query works with the offline region download and a tile map
     does not. This is the tab to use at a trailhead; the Map tab is for
     planning at home. */
  function renderPlaces() {
    $("#panel-places").innerHTML = `
      <h2 class="section-title">Places to Pin</h2>
      <p class="section-sub">${D.placesNote || "Tap Maps to open the search. Download the offline regions listed at the bottom before leaving home."}</p>
      ${D.places.map((g) => `
        <div class="place-group">
          <h3>${g.group}</h3>
          <ul class="place-list">
            ${g.items.map((i) => `<li>
              <span class="p-name">${i.name}${i.note ? `<span class="p-note">${i.note}</span>` : ""}</span>
              ${mapsBtn(i.maps || i.name)}
            </li>`).join("")}
          </ul>
        </div>`).join("")}
      ${D.offlineRegions ? `<div class="callout warning" style="margin-top:1.25rem">
        <strong>Offline downloads</strong>${D.offlineRegions}</div>` : ""}`;
  }

  /* ---------------- Map ---------------- */

  const VERIFIED = (D.waypoints || []).filter((w) => w.verified && w.lat != null && w.lng != null);

  function renderMapPanel() {
    /* A tile map with zero pins is not an empty map, it's a broken-looking
       one — you cannot tell "nothing is located yet" from "the tiles failed
       to load". When nothing is verified, don't draw a map at all: say why,
       and hand over the search strings, which are what actually work for a
       place nobody has coordinates for. */
    $("#panel-map").innerHTML = VERIFIED.length
      ? `<div id="map"></div>
         <div id="map-legend"></div>
         <div id="tile-panel" class="tile-panel"></div>
         <div id="map-unverified"></div>`
      : `<div id="map-unverified"></div>`;
  }

  /* Encoded polyline (Google algorithm, precision 5) — the same codec
     tools/lib/geo.mjs writes with, and checked against it over 500 random
     polylines. Route geometry is stored encoded because a raw [lat,lng] array
     is roughly ten times the bytes and turns data.js into a wall of numbers.
     Decoding a thousand-mile route is well under a millisecond. */
  function decodePolyline(str) {
    const points = [];
    let i = 0, lat = 0, lng = 0;
    while (i < str.length) {
      let shift = 0, result = 0, byte;
      do { byte = str.charCodeAt(i++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
      lat += result & 1 ? ~(result >> 1) : result >> 1;
      shift = 0; result = 0;
      do { byte = str.charCodeAt(i++) - 63; result |= (byte & 0x1f) << shift; shift += 5; } while (byte >= 0x20);
      lng += result & 1 ? ~(result >> 1) : result >> 1;
      points.push([lat / 1e5, lng / 1e5]);
    }
    return points;
  }

  /* `geometry` is one encoded string, or an array of them. A driving leg is a
     single line; a trail is usually several OSM ways kept as separate segments
     rather than stitched, because guessing the join order can draw a line
     through a cliff. */
  const geometrySegments = (g) => (Array.isArray(g) ? g : [g]).filter(Boolean).map(decodePolyline);

  /* ---------------- Offline tiles ----------------
     The map is the one part of this site that was never actually offline:
     Leaflet is vendored, the tiles were not. This stores the tiles you can
     legitimately store and is honest about the ceiling.

     The OSM tile servers are donated and their policy treats more than 250
     tiles in one go as bulk downloading. So this covers the trip at overview
     zoom and stops. For navigation-grade offline maps, export the GPX and
     use an app built for it — that is not a limitation of this page, it is
     what the GPX button is for. */
  function renderTilePanel(bounds) {
    const el = $("#tile-panel");
    if (!el) return;

    if (!Offline.available()) {
      el.innerHTML = `<p class="tile-note">Offline tile storage needs the service worker, which isn't running here
        (opened from a file, or the page hasn't reloaded since it registered). The map still works online.</p>`;
      return;
    }
    if (!bounds) { el.innerHTML = ""; return; }

    const plan = Offline.zoomBudget(bounds, 7, 13, 250);
    if (!plan.urls.length) { el.innerHTML = ""; return; }

    el.innerHTML = `
      <div class="tile-row">
        <button class="btn" id="tile-save">Save ${plan.urls.length} map tiles for offline</button>
        <span class="tile-note" id="tile-status">Covers this trip's area to zoom ${plan.maxZoom} — an overview, not turn-by-turn.</span>
      </div>`;

    const btn = $("#tile-save"), note = $("#tile-status");
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      note.textContent = "Saving…";
      const res = await Offline.prefetch(plan.urls, (p) => {
        note.textContent = `Saving ${p.done} / ${p.total}…`;
      });
      if (!res) { note.textContent = "The service worker didn't answer. Reload and try again."; btn.disabled = false; return; }
      note.textContent = `Saved. ${res.done - res.failed} tiles stored${res.failed ? `, ${res.failed} failed` : ""}. `
        + `They'll be there with no signal; anything past zoom ${plan.maxZoom} won't.`;
    });
  }

  function initMap() {
    if (!has(D.waypoints)) return;

    const verified = VERIFIED;
    const unverified = D.waypoints.filter((w) => !(w.verified && w.lat != null && w.lng != null));

    if (!verified.length) { renderUnverified(unverified, true); return; }
    if (typeof L === "undefined") return;

    const map = L.map("map", { scrollWheelZoom: false });
    window.__tripMap = map;

    /* No {s} subdomains: OSM deprecated them, and a single predictable URL
       per tile is what makes the offline prefetch cache the same bytes
       Leaflet will later ask for. */
    L.tileLayer(TILE_URL, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const palette = resolveTheme(M.theme);
    const accent = palette.c800;

    /* ---- Baked route geometry ----
       Drawn before the markers so a pin is never hidden under a line, and
       cased in white so the line reads over both forest and desert tiles.
       Every line here was produced at authoring time by tools/route.mjs or
       tools/trail.mjs; nothing is fetched at load. */
    const drawn = [];

    const drawGeometry = (item, style) => {
      geometrySegments(item.geometry).forEach((pts) => {
        if (pts.length < 2) return;
        L.polyline(pts, { color: "#ffffff", weight: style.weight + 3, opacity: 0.75 }).addTo(map);
        const line = L.polyline(pts, style).addTo(map);
        const bits = [
          item.distanceMi != null ? `${item.distanceMi} mi` : null,
          item.durationMin != null ? `${Math.floor(item.durationMin / 60)}h ${item.durationMin % 60}m` : null,
          item.days ? `Day ${item.days}` : null,
        ].filter(Boolean).join(" · ");
        line.bindPopup(
          `<b>${item.label || item.id}</b>${bits ? `<br>${bits}` : ""}` +
          (item.source ? `<br><small>source: ${item.source}</small>` : "")
        );
        drawn.push(...pts);
      });
    };

    (D.routes || []).forEach((r) => drawGeometry(r, { color: accent, weight: 4, opacity: 0.9 }));
    (D.trails || []).forEach((t) => drawGeometry(t, { color: palette.c500, weight: 3, opacity: 0.95, dashArray: "6 5" }));

    verified.forEach((w) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="background:${accent};border:2px solid #fff;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 1px 4px rgba(0,0,0,0.4)">${w.icon || "📍"}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      L.marker([w.lat, w.lng], { icon }).addTo(map).bindPopup(
        `<b>${w.name}</b><br>Day(s): ${w.days}${w.notes ? `<br>${w.notes}` : ""}<br><small>${w.lat.toFixed(5)}, ${w.lng.toFixed(5)}</small>`
      );
    });

    // Fit to what we actually know — pins AND route geometry, since a leg can
    // swing well outside the box its two endpoints make. The same points set
    // the offline prefetch area, so a route that leaves the pin box still gets
    // its tiles downloaded; framing on pins alone would cache a corridor the
    // road doesn't follow.
    let area = null;
    const framePoints = verified.map((w) => [w.lat, w.lng]).concat(drawn);

    const frame = () => {
      if (framePoints.length >= 2) map.fitBounds(framePoints, { padding: [40, 40] });
      else if (framePoints.length === 1) map.setView(framePoints[0], 11);
      else if (D.map && D.map.center) map.setView(D.map.center, D.map.zoom || 9);
      else map.setView([0, 0], 2);
    };

    if (framePoints.length >= 2) {
      const lats = framePoints.map((p) => p[0]), lngs = framePoints.map((p) => p[1]);
      area = [[Math.min(...lats) - 0.15, Math.min(...lngs) - 0.15],
              [Math.max(...lats) + 0.15, Math.max(...lngs) + 0.15]];
    } else if (framePoints.length === 1) {
      const [la, ln] = framePoints[0];
      area = [[la - 0.3, ln - 0.3], [la + 0.3, ln + 0.3]];
    } else if (D.map && D.map.center) {
      const [la, ln] = D.map.center;
      area = [[la - 0.6, ln - 0.6], [la + 0.6, ln + 0.6]];
    }

    // Leaflet renders nothing until a view is set, so take a cheap one now and
    // do the real framing once the panel has a size. initMap() runs during
    // init() with the map panel still hidden, where the container measures 0x0
    // and fitBounds collapses to maximum zoom over the centre of the bounds —
    // a street-level view of the empty space between the waypoints. Framing
    // once on first reveal is the fix; re-framing on every visit would throw
    // away the pan and zoom you just did.
    if (D.map && D.map.center) map.setView(D.map.center, D.map.zoom || 9);
    else if (framePoints.length) map.setView(framePoints[0], 9);
    else map.setView([0, 0], 2);

    if ($("#map").getBoundingClientRect().height > 0) frame();
    else window.__tripFrame = frame;

    renderTilePanel(area);
    renderLegend(verified, palette);
    renderUnverified(unverified, false);
  }

  /* What is actually on the map, and what it does and doesn't promise. Each
     row corresponds to data really present in data.js, so a missing row means
     missing data rather than a styling gap. */
  function renderLegend(verified, palette) {
    const el = $("#map-legend");
    if (!el) return;
    const rows = [];
    if (verified.length) {
      rows.push(`<span><i style="background:${palette.c800};border-radius:50%"></i>${verified.length} verified location${verified.length === 1 ? "" : "s"}</span>`);
    }
    if (has(D.routes)) {
      const mi = D.routes.reduce((s, r) => s + (r.distanceMi || 0), 0);
      rows.push(`<span><i style="background:${palette.c800};height:4px;border-radius:2px"></i>driving${mi ? ` · ${mi.toFixed(0)} mi` : ""}</span>`);
    }
    if (has(D.trails)) {
      const mi = D.trails.reduce((s, t) => s + (t.distanceMi || 0), 0);
      rows.push(`<span><i style="background:${palette.c500};height:3px;border-radius:2px"></i>trail, as mapped in OSM${mi ? ` · ${mi.toFixed(1)} mi` : ""}</span>`);
    }
    if (!rows.length) return;
    el.className = "map-legend";
    el.innerHTML = rows.join("") +
      `<span class="map-legend-note">Lines are baked into this page — nothing is fetched from a routing service, ` +
      `so they are there with the server unreachable. Tiles are cached separately; download the region below.</span>`;
  }

  /* The unverified list. Every entry gets a Maps search, because a search
     string is the thing that genuinely works for a place with no coordinate —
     it's what the Places tab is built on, and there's no reason this list
     should be a dead end when that one isn't. */
  function renderUnverified(unverified, isOnly) {
    const el = $("#map-unverified");
    if (!el || !unverified.length) return;
    el.className = "map-note";
    el.innerHTML = `
      <h4>${isOnly ? "Nothing on this trip is located yet" : "Unverified locations — not plotted"}</h4>
      <p style="margin:0 0 0.5em">${isOnly
        ? `All ${unverified.length} waypoints have <code>verified: false</code>, so there is no map to draw. That is the honest state, not a bug — a pin 200 m off can route you to a locked gate on a one-lane road with no signal. Search each one instead, and confirm it against a real source before navigating.`
        : "Coordinates were left blank on purpose. A pin 200 m off can route you to a locked gate on a one-lane road with no signal. Confirm each against a real source before navigating."}</p>
      <ul class="unverified-list">${unverified.map((w) => `<li>
        <span class="u-body"><strong>${w.name}</strong> <span class="u-day">Day ${w.days}</span>${w.notes ? `<br><span class="u-note">${w.notes}</span>` : ""}</span>
        ${mapsBtn(w.name)}
      </li>`).join("")}</ul>`;
  }

  /* ---------------- Tables ---------------- */

  function tableHtml(headers, rows, foot) {
    return `<div class="table-wrap"><table>
      <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c == null ? "" : c}</td>`).join("")}</tr>`).join("")}</tbody>
      ${foot || ""}
    </table></div>`;
  }

  function renderLodging() {
    const g = D.lodging;
    $("#panel-lodging").innerHTML = `
      <h2 class="section-title">Lodging Summary</h2>
      ${g.summary ? `<p class="section-sub">${g.summary}</p>` : ""}
      ${tableHtml(
        ["Night", "Date", "Location", "Type", "Name", "Cost", "Status"],
        g.rows.map((l) => [l.night, l.date, l.location, l.type, l.name, l.cost, l.status]),
        g.total ? `<tfoot><tr><td colspan="5">Total</td><td colspan="2">${g.total}</td></tr></tfoot>` : ""
      )}`;
  }

  function renderHikes() {
    const g = D.hikes;
    $("#panel-hikes").innerHTML = `
      <h2 class="section-title">${g.title || "Hikes &amp; Trails"}</h2>
      ${g.summary ? `<p class="section-sub">${g.summary}</p>` : ""}
      ${tableHtml(
        ["Name", "Day", "Distance", "Elev gain", "Difficulty", "Duration", "Notes"],
        g.rows.map((h) => [h.name, h.day, h.distance, h.gain, h.difficulty, h.duration, h.notes])
      )}`;
  }

  function renderConditions() {
    const parts = [];
    if (has(D.sunMoon)) {
      parts.push(`<h2 class="section-title">Sun &amp; Moon</h2>
        ${D.sunMoonNote ? `<p class="section-sub">${D.sunMoonNote}</p>` : ""}
        <div style="margin-bottom:2rem">${tableHtml(
          ["Date", "Location", "First light", "Sunrise", "Sunset", "Dark", "Moon"],
          D.sunMoon.map((s) => [s.date, s.location, s.firstLight, s.sunrise, s.sunset, s.dark, s.moon]
        ))}</div>`);
    }
    if (has(D.weather)) {
      parts.push(`<h2 class="section-title">Weather</h2>
        <p class="section-sub">${D.weatherNote || "Approximate averages — verify against station data closer to the date."}</p>
        ${tableHtml(
          ["Location", "Elevation", "High °F", "Low °F", "Notes"],
          D.weather.map((w) => [w.location, w.elevation, w.high, w.low, w.notes])
        )}`);
    }
    $("#panel-conditions").innerHTML = parts.join("");
  }

  function renderBudget() {
    const b = D.budget;
    const foot = `<tfoot>
      ${b.subtotal != null ? `<tr><td>Subtotal</td><td>$${b.subtotal}</td><td></td></tr>` : ""}
      ${b.buffer != null ? `<tr><td>${b.bufferLabel || "Buffer"}</td><td>$${b.buffer}</td><td></td></tr>` : ""}
      ${b.total != null ? `<tr><td>Total</td><td>~$${b.total}</td><td></td></tr>` : ""}
    </tfoot>`;
    $("#panel-budget").innerHTML = `
      <h2 class="section-title">Budget Breakdown</h2>
      ${b.note ? `<p class="section-sub">${b.note}</p>` : ""}
      ${tableHtml(["Category", "Cost", "Notes"], b.rows.map((r) => [r.category, `$${r.cost}`, r.notes]), foot)}`;
  }

  /* ---------------- Checklists ---------------- */

  const LS_PACK = `${SLUG}.packing`;
  const LS_RES = `${SLUG}.reservations`;
  const LS_PROV = `${SLUG}.provisions`;
  const LS_PROGRESS = `${SLUG}.progress`;

  const packStore = checkStore(LS_PACK);
  const resStore = checkStore(LS_RES);
  const provStore = checkStore(LS_PROV);

  /* Is browser storage actually usable? A private window, cleared site data or
     a blocked-cookies setting all make it silently useless, and a checklist
     that forgets everything without saying so is worse than no checklist. */
  const STORAGE_OK = (function () {
    try {
      localStorage.setItem("__probe", "1");
      localStorage.removeItem("__probe");
      return true;
    } catch (e) { return false; }
  })();

  /* A reservation actually made lives in data.js as `booked: true` with its
     confirmation number. localStorage only ever tracks the rest. That way the
     hub is right on a phone that has never opened this page, and clearing site
     data cannot lose a confirmation number. */
  const resDone = (r, i) => !!r.booked || resStore.has(`r-${i}`);

  function resDoneCount() {
    return (D.reservations || []).filter(resDone).length;
  }

  /* Reservations marked booked:true in data.js are FACTS — they live in git,
     they survive a new laptop, and they are the same on every device. The
     checkbox state in localStorage is a scratchpad layered on top of them and
     is never allowed to contradict one. */
  const bookedInData = (i) => !!((D.reservations || [])[i] || {}).booked;

  /* The hub reads this so a trip card can show how far along booking is
     without loading every trip's data file. Per-browser and best effort — the
     durable count is `booked: true` in data.js, which is included here so a
     fresh browser still shows real progress instead of zero. */
  function writeProgress() {
    try {
      localStorage.setItem(LS_PROGRESS, JSON.stringify({
        reservations: {
          done: resDoneCount(),
          fromData: (D.reservations || []).filter((r) => r.booked).length,
          total: (D.reservations || []).length,
        },
        packing: { done: packStore.size, total: totalPackItems() },
        ts: Date.now(),
      }));
    } catch (e) { /* private mode */ }
  }

  function totalPackItems() {
    return (D.packing || []).reduce((sum, c) => sum + c.items.length, 0);
  }

  function renderPacking() {
    const el = $("#panel-packing");
    const checked = packStore;
    el.innerHTML = `
      <h2 class="section-title">Packing List</h2>
      <p class="section-sub">Checked state is saved in this browser only. See the <a href="../../index.html#gear">Gear Locker</a> on the hub for what you already own.</p>
      <div class="progress-label" id="pack-progress-label"></div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" id="pack-progress-fill"></div></div>
      <div class="pack-grid">
        ${D.packing.map((cat, ci) => `<div class="pack-card"><h3>${cat.category}</h3>
          ${cat.items.map((item, ii) => checkItemHtml(`p-${ci}-${ii}`, item, checked.has(`p-${ci}-${ii}`))).join("")}
        </div>`).join("")}
      </div>`;
    const update = () => setProgress("#pack-progress-fill", "#pack-progress-label", checked.size, totalPackItems(), "packed");
    wireChecklist(el, checked, () => { update(); writeProgress(); });
    update();
  }

  /* ---------------- Food & cooler ----------------
     The meal plan lives with the itinerary rather than in a separate file,
     because the two constrain each other: a cook time that lands inside a
     lecture block, or a cooler that runs warm before the resupply, is only
     visible when they sit on the same page. */
  function renderProvisions() {
    const el = $("#panel-provisions");
    const P = D.provisions;
    const checked = provStore;
    let n = 0;
    const lists = (P.lists || []).map((g) => `
      <div class="pack-card">
        <h3>${g.group}</h3>
        ${g.note ? `<p class="section-sub" style="margin:-0.2em 0 0.6em">${g.note}</p>` : ""}
        ${g.items.map((item) => checkItemHtml(`v-${n++}`, item, checked.has(`v-${n - 1}`))).join("")}
      </div>`).join("");

    el.innerHTML = `
      <h2 class="section-title">Food &amp; Cooler</h2>
      ${P.summary ? `<p class="section-sub">${P.summary}</p>` : ""}
      ${P.cooler ? `
        <h3 class="section-title" style="margin-top:1.25rem">The cooler timeline</h3>
        ${P.coolerNote ? `<p class="section-sub">${P.coolerNote}</p>` : ""}
        ${tableHtml(["Days", "Where", "Cooler state"], P.cooler.map((c) => [c.days, c.where, c.state]))}` : ""}
      ${P.criticalSlots ? `
        <div class="callout warning" style="margin-top:1.25rem">
          <strong>The slots that decide whether you eat</strong>${P.criticalSlots}</div>` : ""}
      ${lists ? `
        <h3 class="section-title" style="margin-top:1.75rem">Prep &amp; shopping</h3>
        <div class="progress-label" id="prov-progress-label"></div>
        <div class="progress-bar-wrap"><div class="progress-bar-fill" id="prov-progress-fill"></div></div>
        <div class="pack-grid">${lists}</div>` : ""}`;

    const total = (P.lists || []).reduce((sum, g) => sum + g.items.length, 0);
    const update = () => setProgress("#prov-progress-fill", "#prov-progress-label", checked.size, total, "done");
    wireChecklist(el, checked, update);
    update();
  }

  function renderReservations() {
    const el = $("#panel-reservations");
    const rows = D.reservations;

    el.innerHTML = `
      <h2 class="section-title">Reservations Checklist</h2>
      <p class="section-sub">In booking order. The first unchecked item is what to do next.</p>

      <div class="note-card storage-note">
        <p style="margin:0">
          <b>Ticks here live in this browser only.</b> They are a scratchpad — not synced,
          not on your phone, gone if you clear site data.
          <b>Anything actually booked belongs in <code>data.js</code></b> as
          <code>booked: true</code> with its confirmation number; those show as
          locked ✓ and survive a new laptop.
          ${STORAGE_OK ? "" : `<br><b style="color:var(--warn-ink)">⚠ This browser is blocking storage entirely — nothing you tick here will be remembered at all.</b>`}
        </p>
      </div>

      <div class="progress-label" id="res-progress-label"></div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" id="res-progress-fill"></div></div>
      <ul class="flat-list">
        ${rows.map((r, i) => `<li>${checkItemHtml(`r-${i}`, r.text, resDone(r, i), {
            locked: !!r.booked,
            lockNote: r.confirmation ? `booked — ${r.confirmation}` : "booked — recorded in git",
          })}</li>`).join("")}
      </ul>

      <p class="section-sub" style="margin-top:0.9rem">
        <button class="promote-btn" id="promote-res">Copy ticked items for <code>data.js</code></button>
        <span id="promote-out" class="promote-out"></span>
      </p>`;

    const update = () => setProgress("#res-progress-fill", "#res-progress-label", resDoneCount(), rows.length, "done");
    wireChecklist(el, resStore, () => { update(); writeProgress(); });
    update();

    const btn = $("#promote-res", el);
    if (btn) btn.addEventListener("click", async () => {
      const pending = rows
        .map((r, i) => ({ r, i }))
        .filter(({ r, i }) => !r.booked && resStore.has(`r-${i}`));
      const out = $("#promote-out", el);
      if (!pending.length) {
        out.textContent = "Nothing ticked that isn't already in the data file.";
        return;
      }
      const text = pending
        .map(({ r, i }) => `  // reservations[${i}] — add to this entry in data.js:\n  //   booked: true, confirmation: "…",\n  // ${stripHtml(r.text)}`)
        .join("\n");
      out.textContent = (await copyText(text))
        ? `Copied ${pending.length} item(s). Paste into data.js so it survives this browser.`
        : text;
    });
  }

  /* ---------------- Open questions ---------------- */

  function renderQuestions() {
    $("#panel-questions").innerHTML = `
      <h2 class="section-title">Open Questions</h2>
      <p class="section-sub">Everything this plan doesn't know yet. An itinerary with an empty list here is finished; anything on it is a gap you'd otherwise discover at a trailhead.</p>
      ${D.openQuestions.map((q) => `<div class="question-card">
        ${q.blocks ? `<div class="q-meta">Blocks: ${q.blocks}</div>` : ""}
        <h3>${q.question}</h3>
        ${q.detail ? `<p>${q.detail}</p>` : ""}
      </div>`).join("")}`;
  }

  /* ---------------- Retro ----------------
     What the trip taught you, written after it. This site could plan
     endlessly and learn nothing: `done` was a valid status with no place to
     put a lesson, while the gear locker carried open questions ("note whether
     it actually sleeps warm enough to trust at 32°F") that had nowhere to
     land. A gear verdict here is the answer to one of those. */

  const VERDICT = {
    held: { label: "Held up", cls: "ok" },
    failed: { label: "Failed", cls: "bad" },
    marginal: { label: "Marginal", cls: "warn" },
    unused: { label: "Never used", cls: "dim" },
    replace: { label: "Replace", cls: "bad" },
  };

  function renderRetro() {
    const R = D.retro;
    const list = (title, items, cls) => !has(items) ? "" : `
      <div class="note-card ${cls || ""}">
        <h3>${title}</h3>
        <ul class="principle-list">${items.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>`;

    $("#panel-retro").innerHTML = `
      <h2 class="section-title">Retro</h2>
      <p class="section-sub">Written after the trip. The gear verdicts are the part that changes future trips —
        they are what the Gear Locker's open questions get answered with.</p>
      ${R.verdict ? `<div class="route-banner"><p>${R.verdict}</p></div>` : ""}
      ${list("What worked", R.worked)}
      ${list("What didn\u2019t", R.didnt)}
      ${has(R.gear) ? `
        <h3 class="section-title" style="margin-top:1.5rem">Gear verdicts</h3>
        ${tableHtml(["Item", "Verdict", "What actually happened"],
          R.gear.map((g) => {
            const v = VERDICT[g.verdict] || { label: g.verdict, cls: "dim" };
            return [g.item, `<span class="verdict ${v.cls}">${v.label}</span>`, g.note || ""];
          }))}` : ""}
      ${list("Next time", R.nextTime)}`;
  }

  /* ---------------- Notes ---------------- */

  function renderNotes() {
    $("#panel-notes").innerHTML =
      `<h2 class="section-title">Important Notes</h2>` +
      D.notes.map((n) => `<div class="note-card"><h3>${n.heading}</h3><p>${n.body}</p></div>`).join("");
  }

  /* ---------------- Init ---------------- */

  function init() {
    renderChrome();
    SECTIONS.forEach((s) => s.render());
    tabs = initTabs({
      nav: "#tabs",
      onActivate: (name) => {
        if (name === "map" && window.__tripMap) {
          requestAnimationFrame(() => {
            window.__tripMap.invalidateSize();
            // Frame it now that the container has a real size — see initMap.
            if (window.__tripFrame) { window.__tripFrame(); window.__tripFrame = null; }
          });
        }
      },
    });
    initMap();
    writeProgress();
    Offline.register("../../sw.js");
    Offline.mountIndicator($(".header-inner"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
