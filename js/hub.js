/* ==========================================================================
   hub.js — renders the hub from data/trips.js and data/profile.js.
   Nothing here is trip-specific. Add a trip to the registry, it shows up.
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const STATUS_LABEL = { planned: "Planned", outline: "Outline", wishlist: "Wishlist", done: "Done" };
  const STATUS_ORDER = { planned: 0, outline: 1, wishlist: 2, done: 3 };

  let activeFilter = "all";

  /* ---------------- Sorting ----------------
     Chronological: the next trip you actually leave on is first. Undated
     ideas come after the dated ones, and finished trips go to the bottom —
     otherwise a 2026 trip you already took would outrank next month's.
     Sorting uses the `start` field (ISO date), not the display string. */
  function sortTrips(list) {
    const bucket = (t) => (t.status === "done" ? 2 : t.start ? 0 : 1);
    return list.slice().sort((a, b) => {
      const ba = bucket(a), bb = bucket(b);
      if (ba !== bb) return ba - bb;
      if (ba === 0) return a.start.localeCompare(b.start);
      if (ba === 2) return (b.start || "").localeCompare(a.start || "");
      return (a.title || "").localeCompare(b.title || "");
    });
  }

  /* Days until departure, for the card. Null once the trip has started. */
  function daysOut(t) {
    if (!t.start) return null;
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const [y, m, d] = t.start.split("-").map(Number);
    const diff = Math.round((Date.UTC(y, m - 1, d) - today) / 86400000);
    return diff >= 0 ? diff : null;
  }

  function matches(t, filter) {
    if (filter === "all") return true;
    if (filter === "pinned") return !!t.pinned;
    return t.status === filter;
  }

  /* Progress written by a trip page into this browser's localStorage. */
  function readProgress(slug) {
    try {
      const raw = localStorage.getItem(`${slug}.progress`);
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (!p.reservations || !p.reservations.total) return null;
      return p.reservations;
    } catch (e) { return null; }
  }

  /* ---------------- Header ---------------- */

  function renderHeaderStats() {
    const by = (s) => TRIPS.filter((t) => t.status === s).length;
    const stats = [
      { num: by("planned"), lbl: "Planned" },
      { num: by("outline"), lbl: "In progress" },
      { num: by("wishlist"), lbl: "On the list" },
      { num: by("done"), lbl: "Done" },
    ];
    $("#header-stats").innerHTML = stats
      .map((s) => `<div class="stat"><span class="num">${s.num}</span><span class="lbl">${s.lbl}</span></div>`)
      .join("");
  }

  /* ---------------- Trips ---------------- */

  function renderFilters() {
    const counts = {
      all: TRIPS.length,
      pinned: TRIPS.filter((t) => t.pinned).length,
      planned: TRIPS.filter((t) => t.status === "planned").length,
      outline: TRIPS.filter((t) => t.status === "outline").length,
      wishlist: TRIPS.filter((t) => t.status === "wishlist").length,
      done: TRIPS.filter((t) => t.status === "done").length,
    };
    const defs = [
      ["all", "All"], ["pinned", "📌 Pinned"], ["planned", "Planned"],
      ["outline", "Needs work"], ["wishlist", "Wishlist"], ["done", "Done"],
    ];
    $("#filter-bar").innerHTML = defs
      .map(([k, label]) =>
        `<button class="filter-btn ${k === activeFilter ? "active" : ""}" data-filter="${k}">
           ${label}<span class="count">${counts[k]}</span></button>`)
      .join("");

    $$(".filter-btn").forEach((b) =>
      b.addEventListener("click", () => {
        activeFilter = b.dataset.filter;
        renderFilters();
        renderTripGrid();
      })
    );
  }

  function tripCardHtml(t) {
    const href = t.page || null;
    const tag = href ? "a" : "div";
    const attrs = href ? ` href="${href}"` : "";

    const stats = [
      t.nights ? { k: "Nights", v: t.nights } : null,
      t.distance ? { k: "Driving", v: t.distance } : null,
      t.budget ? { k: "Budget", v: t.budget } : null,
    ].filter(Boolean);

    const countdown = daysOut(t);
    const prog = t.page ? readProgress(t.slug) : null;
    const pct = prog ? Math.round((prog.done / prog.total) * 100) : null;

    return `
      <${tag} class="trip-card ${href ? "" : "no-page"}" style="${cardThemeStyle(t.theme)}"${attrs}>
        <div class="card-band"></div>
        <div class="badges">
          ${t.pinned ? `<span class="badge pin">Pinned</span>` : ""}
          <span class="badge ${t.status}">${STATUS_LABEL[t.status] || t.status}</span>
        </div>
        <div class="card-head">
          <span class="card-emoji">${t.emoji || "🧭"}</span>
          <div>
            <h3>${t.title}</h3>
            ${t.subtitle ? `<p class="card-sub">${t.subtitle}</p>` : ""}
            <div class="card-when">${t.dates || t.window || "No dates yet"}${t.region ? ` · ${t.region}` : ""}</div>
            ${countdown !== null ? `<div class="card-countdown${countdown <= 30 ? " soon" : ""}">${countdown === 0 ? "Leaves today" : countdown === 1 ? "1 day out" : `${countdown} days out`}</div>` : ""}
          </div>
        </div>
        <div class="card-body">
          ${t.why ? `<p class="card-why">${t.why}</p>` : ""}
          ${stats.length ? `<div class="stat-row">${stats.map((s) => `<div class="s"><span class="v">${s.v}</span><span class="k">${s.k}</span></div>`).join("")}</div>` : ""}
          ${t.tags && t.tags.length ? `<div class="tag-row">${t.tags.map((x) => `<span class="tag">${x}</span>`).join("")}</div>` : ""}
        </div>
        <div class="card-foot">
          <span class="next">${t.next ? `<b>Next:</b> ${t.next}` : (href ? "Open the plan →" : "Not planned yet")}</span>
          ${pct !== null ? `<span class="progress-mini" title="${prog.done}/${prog.total} reservations done"><i style="width:${pct}%"></i></span>` : ""}
        </div>
      </${tag}>`;
  }

  function renderTripGrid() {
    const list = sortTrips(TRIPS.filter((t) => matches(t, activeFilter)));
    const el = $("#trip-grid");
    if (!list.length) {
      el.innerHTML = `<div class="empty-state">Nothing here yet. Add an entry to <code>data/trips.js</code> — a wishlist entry takes about six lines.</div>`;
      return;
    }
    el.innerHTML = list.map(tripCardHtml).join("");
  }

  /* ---------------- Map ---------------- */

  function initHubMap() {
    if (typeof L === "undefined") return;
    const pinned = TRIPS.filter((t) => Array.isArray(t.coords) && t.coords.length === 2);
    if (!pinned.length) {
      $("#hub-map-wrap").innerHTML = `<div class="empty-state">No trips have display coordinates yet.</div>`;
      return;
    }

    const map = L.map("map", { scrollWheelZoom: false });
    window.__hubMap = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    pinned.forEach((t) => {
      const accent = resolveTheme(t.theme).c800;
      const dim = t.status === "wishlist" || t.status === "done";
      const icon = L.divIcon({
        className: "",
        html: `<div style="background:${accent};border:2px solid #fff;border-radius:50%;width:34px;height:34px;
               display:flex;align-items:center;justify-content:center;font-size:17px;
               box-shadow:0 1px 4px rgba(0,0,0,0.4);opacity:${dim ? 0.65 : 1}">${t.emoji || "🧭"}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      const link = t.page ? `<br><a href="${t.page}">Open the plan →</a>` : "";
      L.marker(t.coords, { icon }).addTo(map).bindPopup(
        `<b>${t.title}</b><br>${STATUS_LABEL[t.status]} · ${t.dates || t.window || "no dates"}<br>${t.region || ""}${link}`
      );
    });

    if (pinned.length >= 2) {
      map.fitBounds(pinned.map((t) => t.coords), { padding: [50, 50] });
    } else {
      map.setView(pinned[0].coords, 6);
    }

    $("#map-legend").innerHTML = ["planned", "outline", "wishlist", "done"]
      .filter((s) => TRIPS.some((t) => t.status === s && t.coords))
      .map((s) => `<span><i style="background:${resolveTheme((TRIPS.find((t) => t.status === s) || {}).theme).c800}"></i>${STATUS_LABEL[s]}</span>`)
      .join("") + `<span style="margin-left:auto">Pin color follows the trip's theme, not its status.</span>`;
  }

  /* ---------------- Gear ---------------- */

  function renderGear() {
    $("#panel-gear").innerHTML = `
      <h2 class="section-title">Gear Locker</h2>
      <p class="section-sub">What's in the kit and what it can't do yet. Every trip's packing list is built against this — if something here says <em>replace</em>, that's a purchase with a deadline, not a nice-to-have.</p>
      <div class="gear-grid">
        ${GEAR.map((cat) => `
          <div class="gear-card">
            <h3>${cat.category}</h3>
            ${cat.note ? `<p class="section-sub" style="margin:-0.2em 0 0.6em">${cat.note}</p>` : ""}
            <ul class="gear-list">
              ${cat.items.map((i) => `<li>
                <span class="g-name">${i.name}${i.note ? `<span class="g-note">${i.note}</span>` : ""}</span>
                <span class="g-state ${i.state}">${i.state}</span>
              </li>`).join("")}
            </ul>
          </div>`).join("")}
      </div>`;
  }

  /* ---------------- Playbook ---------------- */

  function renderPlaybook() {
    $("#panel-playbook").innerHTML = `
      <h2 class="section-title">How ${PROFILE.name} Travels</h2>
      <p class="section-sub">The constraints every itinerary on this site is built to. These are transcribed from the trip files, not inferred — if one is wrong, fix it here and every future plan changes with it.</p>
      <div class="card-grid">
        <div class="info-card"><h3>Home base</h3><p>${PROFILE.homeBase}</p></div>
        <div class="info-card"><h3>Party</h3><p>${PROFILE.defaultGroup}</p></div>
        <div class="info-card"><h3>Vehicle</h3><p>${PROFILE.vehicle}</p></div>
        <div class="info-card"><h3>Hiking ceiling</h3><p>${PROFILE.ceiling}</p></div>
        <div class="info-card"><h3>Difficulty appetite</h3><p>${PROFILE.difficulty}</p></div>
        <div class="info-card"><h3>Crowds</h3><p>${PROFILE.crowds}</p></div>
        <div class="info-card"><h3>Food</h3><p>${PROFILE.food}</p></div>
        <div class="info-card"><h3>Trip shape</h3><p>${PROFILE.tripShape}</p></div>
        <div class="info-card"><h3>Rental cars</h3><p>${PROFILE.driverNote}</p></div>
      </div>

      <div class="note-card">
        <h3>The locked rule set</h3>
        <ul class="principle-list">${PRINCIPLES.map((p) => `<li>${p}</li>`).join("")}</ul>
      </div>

      <div class="note-card">
        <h3>Working rules for Claude</h3>
        <p class="section-sub" style="margin:-0.2em 0 0.6em">What any session planning a trip here is told about how to talk to you.</p>
        <ul class="principle-list">${WORKING_RULES.map((p) => `<li>${p}</li>`).join("")}</ul>
      </div>

      <div class="note-card" style="border-left-color: var(--warn-border)">
        <h3>Considered and declined — do not re-propose</h3>
        <div class="tag-row" style="margin-top:0.5em">${DECLINED.map((d) => `<span class="tag">${d}</span>`).join("")}</div>
      </div>

      <h2 class="section-title" style="margin-top:2rem">Every-Trip Checklist</h2>
      <p class="section-sub">Destination-independent. The trip's own Reservations tab covers the rest.</p>
      <div class="progress-label" id="uni-progress-label"></div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" id="uni-progress-fill"></div></div>
      <ul class="flat-list" id="uni-list">
        ${UNIVERSAL_CHECKLIST.map((text, i) => `<li><label class="check-item" data-id="u-${i}"><input type="checkbox" /><span>${text}</span></label></li>`).join("")}
      </ul>

      <h2 class="section-title" style="margin-top:2rem">Booking Windows</h2>
      <p class="section-sub">Default timing to plan against. Destination-specific windows live on the trip page — and the state-park row is the trap: it ranges from 30 days to a year.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>What</th><th>When it opens</th><th>Notes</th></tr></thead>
        <tbody>${BOOKING_WINDOWS.map((b) => `<tr><td>${b.what}</td><td>${b.when}</td><td>${b.note}</td></tr>`).join("")}</tbody>
      </table></div>`;

    wireUniversalChecklist();
  }

  const LS_UNI = "hub.universal";

  function wireUniversalChecklist() {
    let set;
    try { set = new Set(JSON.parse(localStorage.getItem(LS_UNI) || "[]")); } catch (e) { set = new Set(); }

    const update = () => {
      const total = UNIVERSAL_CHECKLIST.length;
      const pct = total ? Math.round((set.size / total) * 100) : 0;
      $("#uni-progress-fill").style.width = `${pct}%`;
      $("#uni-progress-label").textContent = `${set.size} / ${total} done (${pct}%)`;
    };

    $$("#uni-list .check-item").forEach((label) => {
      const input = $("input", label);
      const on = set.has(label.dataset.id);
      input.checked = on;
      label.classList.toggle("checked", on);
      input.addEventListener("change", () => {
        if (input.checked) set.add(label.dataset.id); else set.delete(label.dataset.id);
        label.classList.toggle("checked", input.checked);
        try { localStorage.setItem(LS_UNI, JSON.stringify(Array.from(set))); } catch (e) { /* private mode */ }
        update();
      });
    });
    update();
  }

  /* ---------------- Tabs ---------------- */

  function initTabs() {
    $$(".tab-btn").forEach((btn) => btn.addEventListener("click", () => activateTab(btn.dataset.tab)));
    const hash = (location.hash || "").replace("#", "");
    if (hash && $(`#panel-${hash}`)) activateTab(hash);
  }

  function activateTab(name) {
    $$(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
    $$(".panel").forEach((p) => p.classList.toggle("active", p.id === `panel-${name}`));
    history.replaceState(null, "", `#${name}`);
    if (name === "map" && window.__hubMap) {
      requestAnimationFrame(() => window.__hubMap.invalidateSize());
    }
  }

  function init() {
    renderHeaderStats();
    renderFilters();
    renderTripGrid();
    renderGear();
    renderPlaybook();
    initTabs();
    initHubMap();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
