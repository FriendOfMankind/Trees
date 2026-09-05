/* ==========================================================================
   hub.js — renders the hub from data/trips.js and data/profile.js.
   Nothing here is trip-specific. Add a trip to the registry, it shows up.
   ========================================================================== */

(function () {
  "use strict";

  const STATUS_LABEL = { planned: "Planned", outline: "Outline", wishlist: "Wishlist", done: "Done" };
  const STATUS_ORDER = { planned: 0, outline: 1, wishlist: 2, done: 3 };

  let activeFilter = "all";
  let activeTag = null;      // set by clicking a tag on any card
  let tabs = null;

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
    const n = daysUntil(t.start);
    return n !== null && n >= 0 ? n : null;
  }

  function matches(t) {
    if (activeTag && !(t.tags || []).includes(activeTag)) return false;
    if (activeFilter === "all") return true;
    if (activeFilter === "pinned") return !!t.pinned;
    return t.status === activeFilter;
  }

  /* How far along the booking is.

     First choice is what the trip page wrote into this browser's
     localStorage, because it counts every reservation line. Failing that —
     a phone that has never opened the trip page, a cleared cache — fall back
     to the `done` flags on the registry's own booking declarations, which are
     committed to git and therefore true everywhere. A slightly coarser bar
     that is always right beats a precise one that is usually missing. */
  function readProgress(t) {
    try {
      const raw = localStorage.getItem(`${t.slug}.progress`);
      const p = raw && JSON.parse(raw);
      if (p && p.reservations && p.reservations.total) {
        return Object.assign({ source: "this browser" }, p.reservations);
      }
    } catch (e) { /* private mode */ }

    const decls = !t.booking ? [] : (Array.isArray(t.booking) ? t.booking : [t.booking]);
    if (!decls.length) return null;
    return { done: decls.filter((b) => b.done).length, total: decls.length, source: "the registry" };
  }

  /* ---------------- Header ---------------- */

  function renderHeaderStats() {
    const by = (s) => TRIPS.filter((t) => t.status === s).length;
    const next = agenda(TRIPS, BOOKING_WINDOWS).find((i) => i.dateISO && i.days >= 0);
    const stats = [
      next ? { num: next.days === 0 ? "today" : `${next.days}d`, lbl: next.kind === "booking" ? "To a window" : "To departure" } : null,
      { num: by("planned"), lbl: "Planned" },
      { num: by("outline"), lbl: "In progress" },
      { num: by("wishlist"), lbl: "On the list" },
      { num: by("done"), lbl: "Done" },
    ].filter(Boolean);
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

    if (activeTag) {
      $("#filter-bar").insertAdjacentHTML("beforeend",
        `<button class="filter-btn tag-clear" id="clear-tag">tag: ${activeTag} &times;</button>`);
      $("#clear-tag").addEventListener("click", () => {
        activeTag = null;
        renderFilters();
        renderTripGrid();
      });
    }

    $$(".filter-btn[data-filter]").forEach((b) =>
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
    const prog = readProgress(t);
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
          ${t.tags && t.tags.length ? `<div class="tag-row">${t.tags.map((x) =>
            `<button type="button" class="tag${x === activeTag ? " on" : ""}" data-tag="${x}">${x}</button>`).join("")}</div>` : ""}
        </div>
        <div class="card-foot">
          <span class="next">${t.next ? `<b>Next:</b> ${t.next}` : (href ? "Open the plan →" : "Not planned yet")}</span>
          ${pct !== null ? `<span class="progress-mini" title="${prog.done}/${prog.total} booked — from ${prog.source}"><i style="width:${pct}%"></i></span>` : ""}
        </div>
      </${tag}>`;
  }

  function renderTripGrid() {
    const list = sortTrips(TRIPS.filter(matches));
    const el = $("#trip-grid");
    if (!list.length) {
      el.innerHTML = `<div class="empty-state">Nothing matches that combination.
        ${activeTag ? `Try clearing the <b>${activeTag}</b> tag.` : "Add an entry to <code>data/trips.js</code> — a wishlist entry takes about six lines."}</div>`;
    } else {
      el.innerHTML = list.map(tripCardHtml).join("");
    }

    /* Tags were rendered but inert for the site's whole life, which made the
       "reuse tags across trips so they mean something" rule unfalsifiable.
       Now they filter, so a tag that means nothing is visibly a tag that
       returns one trip. */
    $$("#trip-grid .tag").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        activeTag = activeTag === btn.dataset.tag ? null : btn.dataset.tag;
        renderFilters();
        renderTripGrid();
      })
    );
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
    L.tileLayer(TILE_URL, {
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

  /* ---------------- Agenda ----------------
     Every dated thing across every trip, in date order.

     This is the view the site was missing. The `next` field is the most
     useful thing on a trip card and there was nowhere to see all of them at
     once; booking windows were arithmetic somebody had to do in their head
     against a table on a different tab. Both are derived here — see
     js/derive.js — from `start`, the trip's `booking` declarations, and the
     lead times in data/profile.js. Nothing on this tab is typed by hand, so
     nothing on it can go stale. */

  const KIND_META = {
    booking: { icon: "🗓", label: "Booking window" },
    departure: { icon: "🚗", label: "Departure" },
    next: { icon: "➡", label: "Next action" },
    "unknown-window": { icon: "❓", label: "Unknown window" },
  };

  function renderAgenda() {
    const items = agenda(TRIPS, BOOKING_WINDOWS);
    const dated = items.filter((i) => i.dateISO);
    const undated = items.filter((i) => !i.dateISO);

    const row = (i) => {
      const meta = KIND_META[i.kind] || { icon: "•", label: i.kind };
      const n = i.days;
      const urgent = n !== null && n <= 30;
      const open = i.kind === "booking" && n !== null && n <= 0;
      return `<li class="agenda-row ${i.kind}${urgent ? " urgent" : ""}" style="${cardThemeStyle(i.theme)}">
        <span class="a-when">
          ${i.dateISO ? `<b>${fmtDay(i.dateISO)}</b><span class="a-rel">${open ? "open now" : relDays(n)}</span>` : `<span class="a-rel">no date</span>`}
        </span>
        <span class="a-body">
          <span class="a-head"><span class="a-icon" title="${meta.label}">${meta.icon}</span> ${i.headline}</span>
          <span class="a-trip">${i.emoji || "🧭"} ${
            TRIPS.some((t) => t.slug === i.slug && t.page)
              ? `<a href="${TRIPS.find((t) => t.slug === i.slug).page}">${i.trip}</a>`
              : i.trip}</span>
          ${i.basis ? `<span class="a-note">${i.basis}</span>` : ""}
          ${i.detail ? `<span class="a-note">${i.detail}</span>` : ""}
        </span>
      </li>`;
    };

    $("#panel-agenda").innerHTML = `
      <h2 class="section-title">Agenda</h2>
      <p class="section-sub">Everything with a date attached, soonest first. Booking windows are
        counted back from the night being booked using the lead times in the Playbook — not typed in,
        so they can't drift. A window this site can't derive is listed as unknown rather than guessed.</p>
      ${dated.length ? `<ul class="agenda-list">${dated.map(row).join("")}</ul>`
        : `<div class="empty-state">No dated deadlines. Give a trip a <code>start</code> and a
           <code>booking</code> declaration and it shows up here.</div>`}
      ${undated.length ? `
        <h3 class="section-title" style="margin-top:2rem">No date yet</h3>
        <p class="section-sub">Live trips' next actions, and the windows nobody has confirmed.</p>
        <ul class="agenda-list">${undated.map(row).join("")}</ul>` : ""}`;
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
    const store = checkStore(LS_UNI);
    const list = $("#uni-list");
    $$(".check-item", list).forEach((label) => {
      const on = store.has(label.dataset.id);
      $("input", label).checked = on;
      label.classList.toggle("checked", on);
    });
    const update = () =>
      setProgress("#uni-progress-fill", "#uni-progress-label", store.size, UNIVERSAL_CHECKLIST.length, "done");
    wireChecklist(list, store, update);
    update();
  }

  /* ---------------- Init ---------------- */

  function init() {
    renderHeaderStats();
    renderFilters();
    renderTripGrid();
    renderAgenda();
    renderGear();
    renderPlaybook();
    tabs = initTabs({
      nav: "#tabs",
      onActivate: (name) => {
        if (name === "map" && window.__hubMap) {
          requestAnimationFrame(() => window.__hubMap.invalidateSize());
        }
      },
    });
    initHubMap();
    Offline.register("./sw.js");
    Offline.mountIndicator($(".header-inner"));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
