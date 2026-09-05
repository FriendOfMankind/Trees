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

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const D = window.TRIP_DATA;
  if (!D) {
    document.body.innerHTML = "<p style='padding:2rem;font-family:sans-serif'>No TRIP_DATA found. Check that data.js loaded before trip.js.</p>";
    return;
  }

  const M = D.meta;
  const SLUG = M.slug;
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

  function initTabs() {
    $$(".tab-btn").forEach((btn) => btn.addEventListener("click", () => activateTab(btn.dataset.tab)));
    const hash = (location.hash || "").replace("#", "");
    if (hash && $(`#panel-${hash}`)) activateTab(hash);
  }

  function activateTab(name) {
    $$(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
    $$(".panel").forEach((p) => p.classList.toggle("active", p.id === `panel-${name}`));
    history.replaceState(null, "", `#${name}`);
    if (name === "map" && window.__tripMap) {
      requestAnimationFrame(() => {
        window.__tripMap.invalidateSize();
        // The map is built during init(), while its panel is still hidden, so
        // Leaflet measures a 0x0 container and any fitBounds against it
        // collapses to maximum zoom over the centre of the bounds — a
        // street-level view of the empty space between your waypoints. Frame
        // it on first reveal instead, when the container has a real size.
        // Once only: re-framing on every visit would throw away the pan and
        // zoom you just did.
        if (window.__tripFrame) { window.__tripFrame(); window.__tripFrame = null; }
      });
    }
  }

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
      ${has(D.days) ? `<h3 class="section-title" style="margin-top:1.5rem;">Days at a glance</h3><div class="mini-days" id="mini-days"></div>` : ""}
    `;

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
  };

  /* Google Maps search deep link. The query string is what survives offline —
     it's stored in the page, so the link works the moment there's signal, and
     the offline Google Maps region download does the actual navigation. */
  function mapsUrl(query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  function scheduleRowHtml(s) {
    const icon = s.kind ? (KIND_ICON[s.kind] || "\u{1F4CD}") : "";
    const maps = s.maps
      ? `<a class="maps-btn" href="${mapsUrl(s.maps)}" target="_blank" rel="noopener">Maps &#8599;</a>`
      : "";
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
              <a class="maps-btn" href="${mapsUrl(i.maps || i.name)}" target="_blank" rel="noopener">Maps &#8599;</a>
            </li>`).join("")}
          </ul>
        </div>`).join("")}
      ${D.offlineRegions ? `<div class="callout warning" style="margin-top:1.25rem">
        <strong>Offline downloads</strong>${D.offlineRegions}</div>` : ""}`;
  }

  /* ---------------- Map ---------------- */

  function renderMapPanel() {
    $("#panel-map").innerHTML =
      `<div id="map"></div><div id="map-legend"></div><div id="map-unverified"></div>`;
  }

  /* Encoded polyline (Google algorithm, precision 5) — the same codec
     tools/lib/geo.mjs writes with. Route geometry is stored encoded because a
     raw [lat,lng] array is roughly ten times the bytes and turns data.js into
     a wall of numbers. Decoding a thousand-mile route is well under a
     millisecond, so this costs nothing at load. */
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

  function initMap() {
    const anyGeometry = has(D.routes) || has(D.trails);
    if ((!has(D.waypoints) && !anyGeometry) || typeof L === "undefined") return;

    const wps = D.waypoints || [];
    const verified = wps.filter((w) => w.verified && w.lat != null && w.lng != null);
    const unverified = wps.filter((w) => !(w.verified && w.lat != null && w.lng != null));

    const map = L.map("map", { scrollWheelZoom: false });
    window.__tripMap = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const palette = resolveTheme(M.theme);
    const accent = palette.c800;

    /* ---- Routes and trails ----
       Drawn under the pins so a marker is never hidden by a line, and cased in
       white so the line stays readable over both forest and desert tiles.
       Every line here was baked at authoring time by tools/route.mjs or
       tools/trail.mjs — nothing is fetched at load, because the moment you
       need this map is the moment you have no signal. */
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

    (D.routes || []).forEach((r) =>
      drawGeometry(r, { color: accent, weight: 4, opacity: 0.9 }));
    (D.trails || []).forEach((t) =>
      drawGeometry(t, { color: palette.c500, weight: 3, opacity: 0.95, dashArray: "6 5" }));

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
    // run well outside the box its two endpoints make. Only fall back to a
    // fixed view when there is nothing real to frame.
    const framePoints = verified.map((w) => [w.lat, w.lng]).concat(drawn);

    const frame = () => {
      if (framePoints.length >= 2) {
        map.fitBounds(framePoints, { padding: [40, 40] });
      } else if (framePoints.length === 1) {
        map.setView(framePoints[0], 11);
      } else if (D.map && D.map.center) {
        map.setView(D.map.center, D.map.zoom || 9);
      } else {
        map.setView([0, 0], 2);
      }
    };

    // Leaflet needs a view set before it will render anything at all, so take
    // the cheap fallback now and re-frame properly once the panel is visible
    // (see activateTab). If the map panel is already on screen — a #map deep
    // link, or the only tab — do the real framing immediately.
    if (D.map && D.map.center) map.setView(D.map.center, D.map.zoom || 9);
    else if (framePoints.length) map.setView(framePoints[0], 9);
    else map.setView([0, 0], 2);

    if ($("#map").getBoundingClientRect().height > 0) frame();
    else window.__tripFrame = frame;

    const legend = [];
    if (verified.length) legend.push(`<span><i style="background:${accent};border-radius:50%"></i>${verified.length} verified location${verified.length === 1 ? "" : "s"}</span>`);
    if (has(D.routes)) {
      const mi = (D.routes || []).reduce((s2, r) => s2 + (r.distanceMi || 0), 0);
      legend.push(`<span><i style="background:${accent};height:4px;border-radius:2px"></i>driving${mi ? ` · ${mi.toFixed(0)} mi` : ""}</span>`);
    }
    if (has(D.trails)) {
      const mi = (D.trails || []).reduce((s2, t) => s2 + (t.distanceMi || 0), 0);
      legend.push(`<span><i style="background:${palette.c500};height:3px;border-radius:2px"></i>trail, as mapped in OSM${mi ? ` · ${mi.toFixed(1)} mi` : ""}</span>`);
    }
    if (legend.length) {
      $("#map-legend").className = "map-legend";
      $("#map-legend").innerHTML =
        legend.join("") +
        `<span class="map-legend-note">Lines are baked into this page — nothing loads from a routing service. ` +
        `Map tiles still need signal, so download an offline region before you go.</span>`;
    }

    if (unverified.length) {
      $("#map-unverified").className = "map-note";
      $("#map-unverified").innerHTML = `
        <h4>Unverified locations — not plotted</h4>
        <p style="margin:0 0 0.5em">Coordinates were left blank on purpose. A pin 200 m off can route you to a locked gate on a one-lane road with no signal. Confirm each against a real source before navigating.</p>
        <ul>${unverified.map((w) => `<li><strong>${w.name}</strong> (Day ${w.days})${w.notes ? ` — ${w.notes}` : ""}</li>`).join("")}</ul>`;
    }
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
  const LS_PROGRESS = `${SLUG}.progress`;

  function loadSet(key) {
    try { return new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch (e) { return new Set(); }
  }
  function saveSet(key, set) {
    try { localStorage.setItem(key, JSON.stringify(Array.from(set))); } catch (e) { /* private mode */ }
  }

  /* The hub reads this so a trip card can show how far along booking is
     without loading every trip's data file. Per-browser, best effort. */
  function writeProgress() {
    try {
      localStorage.setItem(LS_PROGRESS, JSON.stringify({
        reservations: { done: loadSet(LS_RES).size, total: (D.reservations || []).length },
        packing: { done: loadSet(LS_PACK).size, total: totalPackItems() },
        ts: Date.now(),
      }));
    } catch (e) { /* private mode */ }
  }

  function wireChecklist(scope, key, set, onChange) {
    $$(".check-item", scope).forEach((label) => {
      const input = $("input", label);
      input.addEventListener("change", () => {
        if (input.checked) set.add(label.dataset.id); else set.delete(label.dataset.id);
        label.classList.toggle("checked", input.checked);
        saveSet(key, set);
        onChange();
        writeProgress();
      });
    });
  }

  function checkItemHtml(id, text, checked) {
    return `<label class="check-item ${checked ? "checked" : ""}" data-id="${id}">
      <input type="checkbox" ${checked ? "checked" : ""} /><span>${text}</span></label>`;
  }

  function totalPackItems() {
    return (D.packing || []).reduce((sum, c) => sum + c.items.length, 0);
  }

  function setProgress(fillSel, labelSel, done, total, noun) {
    const pct = total ? Math.round((done / total) * 100) : 0;
    const fill = $(fillSel), label = $(labelSel);
    if (fill) fill.style.width = `${pct}%`;
    if (label) label.textContent = `${done} / ${total} ${noun} (${pct}%)`;
  }

  function renderPacking() {
    const el = $("#panel-packing");
    const checked = loadSet(LS_PACK);
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
    wireChecklist(el, LS_PACK, checked, update);
    update();
  }

  /* ---------------- Food & cooler ----------------
     The meal plan lives with the itinerary rather than in a separate file,
     because the two constrain each other: a cook time that lands inside a
     lecture block, or a cooler that runs warm before the resupply, is only
     visible when they sit on the same page. */
  const LS_PROV = `${SLUG}.provisions`;

  function renderProvisions() {
    const el = $("#panel-provisions");
    const P = D.provisions;
    const checked = loadSet(LS_PROV);
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
    wireChecklist(el, LS_PROV, checked, update);
    update();
  }

  function renderReservations() {
    const el = $("#panel-reservations");
    const checked = loadSet(LS_RES);
    el.innerHTML = `
      <h2 class="section-title">Reservations Checklist</h2>
      <p class="section-sub">In booking order. The first unchecked item is what to do next.</p>
      <div class="progress-label" id="res-progress-label"></div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" id="res-progress-fill"></div></div>
      <ul class="flat-list">
        ${D.reservations.map((r, i) => `<li>${checkItemHtml(`r-${i}`, r.text, checked.has(`r-${i}`))}</li>`).join("")}
      </ul>`;
    const update = () => setProgress("#res-progress-fill", "#res-progress-label", checked.size, D.reservations.length, "done");
    wireChecklist(el, LS_RES, checked, update);
    update();
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
    initTabs();
    initMap();
    writeProgress();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
