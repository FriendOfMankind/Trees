(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  document.documentElement.style.setProperty("--theme", TRIP.themeColor);

  // ---------- Tabs ----------
  function initTabs() {
    const buttons = $$(".tab-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => activateTab(btn.dataset.tab));
    });

    const hash = (location.hash || "").replace("#", "");
    if (hash && $(`#panel-${hash}`)) {
      activateTab(hash);
    }
  }

  function activateTab(name) {
    $$(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
    $$(".panel").forEach((p) => p.classList.toggle("active", p.id === `panel-${name}`));
    history.replaceState(null, "", `#${name}`);
    if (name === "map") {
      requestAnimationFrame(() => {
        if (window.__maui_map) window.__maui_map.invalidateSize();
      });
    }
  }
  window.__activateTab = activateTab;

  // ---------- Header ----------
  function renderHeader() {
    $("#trip-title").textContent = TRIP.title;
    $("#trip-subtitle").textContent = `${TRIP.subtitle} · ${TRIP.dates}`;
    const stats = [
      { num: TRIP.lengthLabel.split(" / ")[0], lbl: "Length" },
      { num: TRIP.totalDistance, lbl: "Distance" },
      { num: TRIP.totalDrivingHours, lbl: "Driving" },
      { num: "7", lbl: "Nights camping" },
    ];
    $("#header-stats").innerHTML = stats
      .map((s) => `<div class="stat"><span class="num">${s.num}</span><span class="lbl">${s.lbl}</span></div>`)
      .join("");
  }

  // ---------- Overview ----------
  function renderOverview() {
    const el = $("#panel-overview");
    el.innerHTML = `
      <h2 class="section-title">Trip Overview</h2>
      <div class="route-banner">
        <p><strong>Route:</strong> ${TRIP.route}</p>
        <p style="margin:0"><strong>Vehicle:</strong> ${TRIP.vehicle}</p>
      </div>
      <div class="overview-grid">
        <div class="info-card"><h3>Dates</h3><p>${TRIP.dates}<br>${TRIP.lengthLabel}</p></div>
        <div class="info-card"><h3>Group</h3><p>${TRIP.group}</p></div>
        <div class="info-card"><h3>Total distance</h3><p>${TRIP.totalDistance}, ${TRIP.totalDrivingHours} driving</p></div>
        <div class="info-card"><h3>Lodging</h3><p>7 nights camping — 2 private (Camp Olowalu), 3 state park (Waiʻānapanapa), 2 national park (Hosmer Grove)</p></div>
      </div>
      <h3 class="section-title" style="margin-top:1.5rem;">Days at a glance</h3>
      <div class="mini-days" id="mini-days"></div>
    `;
    $("#mini-days").innerHTML = DAYS.map(
      (d) => `
      <div class="mini-day" data-day="${d.day}">
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

  // ---------- Itinerary ----------
  function renderItinerary() {
    const el = $("#panel-itinerary");
    el.innerHTML =
      `<h2 class="section-title">Day-by-Day Itinerary</h2>` +
      DAYS.map((d) => dayCardHtml(d)).join("");
  }

  function dayCardHtml(d) {
    const meals = d.meals
      ? `<div class="meals-row"><span>🍳 B: ${d.meals.b}</span><span>🥪 L: ${d.meals.l}</span><span>🍽️ D: ${d.meals.d}</span></div>`
      : "";
    const overnight = d.overnight
      ? `<div class="overnight-box">
          <div class="on-name">${d.overnight.name}${d.overnight.place ? ` — ${d.overnight.place}` : ""}</div>
          ${d.overnight.kind ? `<div class="on-line">${d.overnight.kind}${d.overnight.cost ? ` · ${d.overnight.cost}` : ""}</div>` : ""}
          ${d.overnight.checkin ? `<div class="on-line">Check-in: ${d.overnight.checkin}</div>` : ""}
          ${d.overnight.confirmation ? `<div class="on-line">Confirmation: ${d.overnight.confirmation}</div>` : ""}
          ${d.overnight.notes ? `<div class="on-line">${d.overnight.notes}</div>` : ""}
        </div>`
      : "";
    return `
      <article class="day-card" id="day-${d.day}">
        <div class="day-card-head">
          <div>
            <div class="d-label">Day ${d.day} · ${d.date}</div>
            <h2>${d.title}</h2>
            <p class="tagline">${d.tagline}</p>
          </div>
        </div>
        <div class="day-card-body">
          <div class="day-meta-row">
            <span class="chip">${d.type}</span>
            <span class="chip">🚗 ${d.driving}</span>
          </div>
          <div class="day-columns">
            <div>
              <div class="side-block">
                <h4>Schedule</h4>
                <ul class="schedule-list">
                  ${d.schedule.map((s) => `<li><span class="time">${s.time}</span><span>${s.text}</span></li>`).join("")}
                </ul>
              </div>
            </div>
            <div>
              <div class="side-block">
                <h4>Overnight</h4>
                ${overnight}
              </div>
              <div class="side-block">
                <h4>Meals</h4>
                ${meals}
              </div>
              ${d.highlights ? `<div class="callout highlight"><strong>Highlights</strong>${d.highlights}</div>` : ""}
              ${d.warnings ? `<div class="callout warning"><strong>Warnings</strong>${d.warnings}</div>` : ""}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  // ---------- Map ----------
  function renderMap() {
    const verified = WAYPOINTS.filter((w) => w.verified);
    const unverified = WAYPOINTS.filter((w) => !w.verified);

    const map = L.map("map", { scrollWheelZoom: false }).setView([20.79, -156.32], 10);
    window.__maui_map = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const teal = TRIP.themeColor;
    verified.forEach((w) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="background:${teal};border:2px solid #fff;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 1px 4px rgba(0,0,0,0.4)">${w.icon}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });
      L.marker([w.lat, w.lng], { icon }).addTo(map).bindPopup(
        `<b>${w.name}</b><br>Day(s): ${w.days}${w.notes ? `<br>${w.notes}` : ""}<br><small>${w.lat.toFixed(5)}, ${w.lng.toFixed(5)}</small>`
      );
    });

    if (unverified.length) {
      $("#map-unverified").innerHTML = `
        <h4>Unverified locations — not plotted</h4>
        <p style="margin:0 0 0.5em">Coordinates were intentionally left blank per the trip spec. Confirm these against a real source before navigating.</p>
        <ul>
          ${unverified.map((w) => `<li><strong>${w.name}</strong> (Day ${w.days})${w.notes ? ` — ${w.notes}` : ""}</li>`).join("")}
        </ul>
      `;
    }
  }

  // ---------- Lodging ----------
  function renderLodging() {
    const el = $("#panel-lodging");
    el.innerHTML = `
      <h2 class="section-title">Lodging Summary</h2>
      <p class="section-sub">7 nights camping · ${LODGING_TOTAL} total</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Night</th><th>Date</th><th>Location</th><th>Type</th><th>Name</th><th>Cost</th><th>Status</th></tr></thead>
          <tbody>
            ${LODGING.map(
              (l) => `<tr><td>${l.night}</td><td>${l.date}</td><td>${l.location}</td><td>${l.type}</td><td>${l.name}</td><td>${l.cost}</td><td>${l.status}</td></tr>`
            ).join("")}
          </tbody>
          <tfoot><tr><td colspan="5">Total</td><td colspan="2">${LODGING_TOTAL}</td></tr></tfoot>
        </table>
      </div>
    `;
  }

  // ---------- Hikes ----------
  function renderHikes() {
    const el = $("#panel-hikes");
    el.innerHTML = `
      <h2 class="section-title">Hikes &amp; Trails</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Day</th><th>Distance</th><th>Elev gain</th><th>Difficulty</th><th>Duration</th><th>Notes</th></tr></thead>
          <tbody>
            ${HIKES.map(
              (h) => `<tr><td>${h.name}</td><td>${h.day}</td><td>${h.distance}</td><td>${h.gain}</td><td>${h.difficulty}</td><td>${h.duration}</td><td>${h.notes}</td></tr>`
            ).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  // ---------- Sun/Moon + Weather ----------
  function renderConditions() {
    const el = $("#panel-conditions");
    el.innerHTML = `
      <h2 class="section-title">Sun &amp; Moon</h2>
      <p class="section-sub">Calculated, elevation-corrected. ~13 hours of daylight daily.</p>
      <div class="table-wrap" style="margin-bottom:2rem;">
        <table>
          <thead><tr><th>Date</th><th>Location</th><th>First light</th><th>Sunrise</th><th>Sunset</th><th>Dark</th><th>Moon</th></tr></thead>
          <tbody>
            ${SUN_MOON.map(
              (s) => `<tr><td>${s.date}</td><td>${s.location}</td><td>${s.firstLight}</td><td>${s.sunrise}</td><td>${s.sunset}</td><td>${s.dark}</td><td>${s.moon}</td></tr>`
            ).join("")}
          </tbody>
        </table>
      </div>
      <h2 class="section-title">Weather</h2>
      <p class="section-sub">Approximate averages — verify against station data closer to the date.</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Location</th><th>Elevation</th><th>High °F</th><th>Low °F</th><th>Notes</th></tr></thead>
          <tbody>
            ${WEATHER.map(
              (w) => `<tr><td>${w.location}</td><td>${w.elevation}</td><td>${w.high}</td><td>${w.low}</td><td>${w.notes}</td></tr>`
            ).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  // ---------- Budget ----------
  function renderBudget() {
    const el = $("#panel-budget");
    el.innerHTML = `
      <h2 class="section-title">Budget Breakdown</h2>
      <p class="section-sub">${BUDGET_NOTE}</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Category</th><th>Cost</th><th>Notes</th></tr></thead>
          <tbody>
            ${BUDGET.map((b) => `<tr><td>${b.category}</td><td>$${b.cost}</td><td>${b.notes}</td></tr>`).join("")}
          </tbody>
          <tfoot>
            <tr><td>Subtotal</td><td>$${BUDGET_SUBTOTAL}</td><td></td></tr>
            <tr><td>Buffer (12%)</td><td>$${BUDGET_BUFFER}</td><td></td></tr>
            <tr><td>Total</td><td>~$${BUDGET_TOTAL}</td><td></td></tr>
          </tfoot>
        </table>
      </div>
    `;
  }

  // ---------- Packing (checklist, localStorage) ----------
  const LS_PACK = "maui2027.packing";
  const LS_RES = "maui2027.reservations";

  function loadSet(key) {
    try {
      return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch (e) {
      return new Set();
    }
  }
  function saveSet(key, set) {
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(set)));
    } catch (e) {
      /* ignore */
    }
  }

  function renderPacking() {
    const el = $("#panel-packing");
    const checked = loadSet(LS_PACK);
    el.innerHTML = `
      <h2 class="section-title">Packing List</h2>
      <div class="progress-label" id="pack-progress-label"></div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" id="pack-progress-fill"></div></div>
      <div class="pack-grid">
        ${PACKING.map(
          (cat, ci) => `
          <div class="pack-card">
            <h3>${cat.category}</h3>
            ${cat.items
              .map((item, ii) => {
                const id = `p-${ci}-${ii}`;
                const isChecked = checked.has(id);
                return `<label class="check-item ${isChecked ? "checked" : ""}" data-id="${id}">
                  <input type="checkbox" ${isChecked ? "checked" : ""} />
                  <span>${item}</span>
                </label>`;
              })
              .join("")}
          </div>`
        ).join("")}
      </div>
    `;

    $$(".check-item", el).forEach((label) => {
      const input = $("input", label);
      input.addEventListener("change", () => {
        const id = label.dataset.id;
        if (input.checked) {
          checked.add(id);
        } else {
          checked.delete(id);
        }
        label.classList.toggle("checked", input.checked);
        saveSet(LS_PACK, checked);
        updatePackProgress(checked);
      });
    });
    updatePackProgress(checked);
  }

  function totalPackItems() {
    return PACKING.reduce((sum, c) => sum + c.items.length, 0);
  }

  function updatePackProgress(checked) {
    const total = totalPackItems();
    const done = checked.size;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const fill = $("#pack-progress-fill");
    const label = $("#pack-progress-label");
    if (fill) fill.style.width = `${pct}%`;
    if (label) label.textContent = `${done} / ${total} packed (${pct}%)`;
  }

  // ---------- Reservations (checklist, localStorage) ----------
  function renderReservations() {
    const el = $("#panel-reservations");
    const checked = loadSet(LS_RES);
    el.innerHTML = `
      <h2 class="section-title">Reservations Checklist</h2>
      <div class="progress-label" id="res-progress-label"></div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" id="res-progress-fill"></div></div>
      <ul class="reservations-list">
        ${RESERVATIONS.map((r, i) => {
          const id = `r-${i}`;
          const isChecked = checked.has(id);
          return `<li><label class="check-item ${isChecked ? "checked" : ""}" data-id="${id}">
            <input type="checkbox" ${isChecked ? "checked" : ""} />
            <span>${r.text}</span>
          </label></li>`;
        }).join("")}
      </ul>
    `;

    $$(".check-item", el).forEach((label) => {
      const input = $("input", label);
      input.addEventListener("change", () => {
        const id = label.dataset.id;
        if (input.checked) {
          checked.add(id);
        } else {
          checked.delete(id);
        }
        label.classList.toggle("checked", input.checked);
        saveSet(LS_RES, checked);
        updateResProgress(checked);
      });
    });
    updateResProgress(checked);
  }

  function updateResProgress(checked) {
    const total = RESERVATIONS.length;
    const done = checked.size;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const fill = $("#res-progress-fill");
    const label = $("#res-progress-label");
    if (fill) fill.style.width = `${pct}%`;
    if (label) label.textContent = `${done} / ${total} done (${pct}%)`;
  }

  // ---------- Notes ----------
  function renderNotes() {
    const el = $("#panel-notes");
    el.innerHTML =
      `<h2 class="section-title">Important Notes</h2>` +
      NOTES.map((n) => `<div class="note-card"><h3>${n.heading}</h3><p>${n.body}</p></div>`).join("");
  }

  // ---------- Init ----------
  function init() {
    renderHeader();
    renderOverview();
    renderItinerary();
    renderLodging();
    renderHikes();
    renderConditions();
    renderBudget();
    renderPacking();
    renderReservations();
    renderNotes();
    initTabs();
    renderMap();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
