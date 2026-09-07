/* ==========================================================================
   mapbench.js — the coordinate workbench.

   THE PROBLEM THIS SOLVES. Every geocoding host is unreachable from a Claude
   Code session on this repo: nominatim, overpass, recreation.gov and the RIDB
   API all fail to connect. tools/geocode.mjs, route.mjs and trail.mjs
   therefore return nothing. That isn't a bug to route around — it's a hard
   split in who can do what:

     Claude has  — the itinerary, the schema, the validator, arithmetic
     You have    — a browser that can actually reach a map

   Before this page the handoff was: Claude prints a list, you look each one up,
   you run setcoord.mjs once per waypoint. Forty-four waypoints, forty-four
   commands, and the sanity check was somebody squinting at the numbers.

   Here you place them all in one sitting, every placement is checked as it
   lands, and the output is a single block to paste back.

   WHAT THIS PAGE WILL NOT DO. It will not write to data.js, and it will not
   let a coordinate through without a source string. A coordinate with no
   provenance is indistinguishable from one somebody invented, which is the
   thing non-negotiable #1 exists to prevent. Same rule as tools/setcoord.mjs,
   enforced in the same place: at the point of entry.
   ========================================================================== */

(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const LS_KEY = "mapbench.placements";

  const state = {
    slug: null,
    trip: null,       // registry entry
    data: null,       // window.TRIP_DATA for the trip
    selected: null,   // waypoint name
    placements: {},   // slug -> { name -> { lat, lng, source } }
    map: null,
    layer: null,
    pendingConfirm: null,  // "name:lat,lng" awaiting a deliberate overwrite
    confirmed: {},         // name -> "lat,lng" the user explicitly approved
  };

  /* ---------------- Persistence ----------------
     Per browser, and deliberately only that. This is a scratchpad between
     looking something up and pasting it back; the data file is the record. */

  function loadPlacements() {
    try { state.placements = JSON.parse(localStorage.getItem(LS_KEY) || "{}"); }
    catch (e) { state.placements = {}; }
  }
  function savePlacements() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state.placements)); } catch (e) { /* private mode */ }
  }
  function placed() { return state.placements[state.slug] || {}; }
  function setPlacement(name, rec) {
    state.placements[state.slug] = state.placements[state.slug] || {};
    if (rec) state.placements[state.slug][name] = rec;
    else delete state.placements[state.slug][name];
    savePlacements();
  }

  /* ---------------- Checks ----------------
     The rules themselves live in js/coordcheck.js, with no DOM, so the exact
     code this page runs is the code tools/test/coordcheck.test.mjs exercises.
     Duplicating them here would mean the tests pass while the page ships
     something else. */

  function checkPlacement(name, lat, lng) {
    const D = state.data;
    const wp = (D.waypoints || []).find((w) => w.name === name);
    const others = (D.waypoints || [])
      .filter((w) => w.name !== name)
      .map((w) => {
        const c = coordFor(w);
        return c ? { name: w.name, days: w.days, lat: c[0], lng: c[1] } : null;
      })
      .filter(Boolean);

    /* What's already on file, so the checks can tell a first placement from an
       overwrite of something sourced. */
    const existing = wp && wp.lat != null && wp.lng != null && !placed()[name]
      ? { lat: wp.lat, lng: wp.lng, verified: wp.verified, source: wp.source }
      : null;

    return coordChecks({
      name, lat, lng, others, existing,
      days: wp && wp.days,
      tripCoords: state.trip && state.trip.coords,
      country: state.trip && state.trip.country,
    });
  }

  /* A waypoint's coordinate from whichever source has one: this session's
     placement first, then what's already in the data file. */
  function coordFor(wp) {
    const p = placed()[wp.name];
    if (p) return [p.lat, p.lng];
    if (wp.lat != null && wp.lng != null) return [wp.lat, wp.lng];
    return null;
  }

  function statusOf(wp) {
    if (placed()[wp.name]) return "new";
    if (wp.verified && wp.lat != null) return "ok";
    if (wp.lat != null) return "review";
    return "todo";
  }

  /* ---------------- Trip loading ----------------
     Every trip's data.js sets window.TRIP_DATA, so they can't all be loaded at
     once. Inject one, read it, and replace it when the selection changes. */

  function loadTripData(slug, done) {
    const trip = TRIPS.find((t) => t.slug === slug);
    if (!trip || !trip.page) return done(null);
    const s = document.createElement("script");
    s.src = `${trip.page}data.js`;
    s.onload = () => { done(window.TRIP_DATA || null); s.remove(); };
    s.onerror = () => { done(null); s.remove(); };
    document.head.appendChild(s);
  }

  /* ---------------- Rendering ---------------- */

  function mapsSearchUrl(wp) {
    const region = (state.trip && state.trip.region) || "";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${wp.name} ${region}`)}`;
  }

  function renderWorklist() {
    const D = state.data;
    if (!D || !Array.isArray(D.waypoints) || !D.waypoints.length) {
      $("#worklist").innerHTML = `<div class="empty-state">This trip has no waypoints array.</div>`;
      return;
    }
    const order = { todo: 0, review: 1, new: 2, ok: 3 };
    const rows = D.waypoints.slice().sort((a, b) => order[statusOf(a)] - order[statusOf(b)]);

    $("#worklist").innerHTML = rows.map((wp) => {
      const st = statusOf(wp);
      const c = coordFor(wp);
      const p = placed()[wp.name];
      const sel = state.selected === wp.name;
      return `
        <div class="wp-row ${sel ? "selected" : ""}" data-name="${esc(wp.name)}">
          <div class="wp-main">
            <div class="wp-name">${wp.icon || "📍"} ${esc(wp.name)}
              <span class="wp-status ${st}">${st === "ok" ? "verified" : st === "new" ? "placed now" : st === "review" ? "unverified w/ coords" : "no coordinate"}</span>
            </div>
            ${wp.days ? `<div class="wp-day">Day ${esc(wp.days)}</div>` : ""}
            ${wp.notes ? `<div class="wp-note">${esc(wp.notes)}</div>` : ""}
            ${c ? `<div class="wp-coord">${c[0].toFixed(6)}, ${c[1].toFixed(6)}${p ? ` · <i>${esc(p.source)}</i>` : wp.source ? ` · <i>${esc(wp.source)}</i>` : ""}</div>` : ""}
          </div>
          <div class="wp-actions">
            <a class="maps-btn" href="${mapsSearchUrl(wp)}" target="_blank" rel="noopener">Look up &#8599;</a>
            <input class="wp-paste" type="text" placeholder="paste lat, lng" data-for="${esc(wp.name)}" />
            ${p ? `<button class="wp-undo" data-undo="${esc(wp.name)}">undo</button>` : ""}
          </div>
          <div class="wp-checks" id="checks-${cssId(wp.name)}"></div>
        </div>`;
    }).join("");

    $$(".wp-row").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target.closest("input, a, button")) return;
        state.selected = el.dataset.name;
        renderWorklist();
        renderMap();
      });
    });
    $$(".wp-paste").forEach((inp) => {
      inp.addEventListener("change", () => tryPlace(inp.dataset.for, inp.value));
      inp.addEventListener("paste", () => setTimeout(() => tryPlace(inp.dataset.for, inp.value), 0));
    });
    $$("[data-undo]").forEach((b) =>
      b.addEventListener("click", () => {
        setPlacement(b.dataset.undo, null);
        renderAll();
      })
    );
  }

  function tryPlace(name, raw) {
    const source = $("#source-input").value.trim();
    const box = $(`#checks-${cssId(name)}`);
    if (!source) {
      if (box) box.innerHTML = `<div class="chk stop">Fill in the source field first. A coordinate with no provenance can't be re-checked by anyone, including you in eight months.</div>`;
      return;
    }
    /* Google Maps hands you "37.828230, -83.677587"; some sources use a
       space, a slash or the degree sign. Take the first two numbers. */
    const nums = String(raw).match(/-?\d+(\.\d+)?/g);
    if (!nums || nums.length < 2) {
      if (box) box.innerHTML = `<div class="chk stop">Couldn't read two numbers out of that.</div>`;
      return;
    }
    const lat = Number(nums[0]), lng = Number(nums[1]);
    const problems = checkPlacement(name, lat, lng);
    const icon = { stop: "✕", confirm: "!", warn: "⚠" };
    if (box) {
      box.innerHTML = problems.map((p) => `<div class="chk ${p.level}">${icon[p.level] || "⚠"} ${esc(p.msg)}</div>`).join("");
    }
    if (problems.some((p) => p.level === "stop")) return;

    /* A "confirm" means this would overwrite a coordinate that already has a
       named source. One deliberate click, not a stray paste. Pending state is
       keyed on the exact numbers so editing the box clears it. */
    const needsConfirm = problems.filter((p) => p.level === "confirm");
    if (needsConfirm.length && state.pendingConfirm !== `${name}:${lat},${lng}`) {
      state.pendingConfirm = `${name}:${lat},${lng}`;
      if (box) {
        box.insertAdjacentHTML("beforeend",
          `<div class="chk confirm-row">
             <button class="promote-btn" data-confirm="${esc(name)}">Replace it anyway</button>
             <span>or leave it — the existing coordinate stays and nothing is lost.</span>
           </div>`);
        const btn = box.querySelector("[data-confirm]");
        if (btn) btn.addEventListener("click", () => { state.confirmed[name] = `${lat},${lng}`; tryPlace(name, `${lat},${lng}`); });
      }
      return;
    }
    if (needsConfirm.length && state.confirmed[name] !== `${lat},${lng}`) return;

    setPlacement(name, { lat, lng, source });
    state.selected = name;
    renderAll();
  }

  function renderMap() {
    const D = state.data;
    const pts = (D.waypoints || []).map((w) => ({ wp: w, c: coordFor(w) })).filter((x) => x.c);
    $("#map-hint").textContent = pts.length
      ? `${pts.length} of ${(D.waypoints || []).length} located. Click the map to place the selected waypoint.`
      : `Nothing located yet. Select a waypoint, then click the map or paste coordinates.`;

    if (!state.map) {
      state.map = L.map("bench-map", { scrollWheelZoom: true });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(state.map);
      state.map.on("click", (e) => {
        if (!state.selected) return;
        tryPlace(state.selected, `${e.latlng.lat.toFixed(6)},${e.latlng.lng.toFixed(6)}`);
      });
    }
    if (state.layer) state.layer.remove();
    state.layer = L.layerGroup().addTo(state.map);

    pts.forEach(({ wp, c }) => {
      const st = statusOf(wp);
      const isSel = state.selected === wp.name;
      const color = isSel ? "#b4531f" : st === "new" ? "#1f8f96" : "#2f6d43";
      L.marker(c, {
        icon: L.divIcon({
          className: "",
          html: `<div class="pin" style="background:${color}">${wp.icon || "📍"}</div>`,
          iconSize: [30, 30], iconAnchor: [15, 15],
        }),
      }).addTo(state.layer).bindPopup(`<b>${esc(wp.name)}</b><br>${c[0].toFixed(6)}, ${c[1].toFixed(6)}`);
    });

    if (pts.length >= 2) state.map.fitBounds(pts.map((p) => p.c), { padding: [40, 40] });
    else if (pts.length === 1) state.map.setView(pts[0].c, 12);
    else if (state.trip && state.trip.coords) state.map.setView(state.trip.coords, 8);
    else state.map.setView([39.5, -98.35], 4);
    requestAnimationFrame(() => state.map.invalidateSize());
  }

  function renderOutput() {
    const p = placed();
    const names = Object.keys(p);
    if (!names.length) {
      $("#bench-out").innerHTML = `<div class="empty-state">Place a coordinate and the paste-back block appears here.</div>`;
      return;
    }
    const json = JSON.stringify({
      slug: state.slug,
      coords: names.map((n) => ({ name: n, lat: p[n].lat, lng: p[n].lng, source: p[n].source })),
    }, null, 2);

    const cmds = names.map((n) =>
      `node tools/setcoord.mjs ${state.slug} ${JSON.stringify(n)} ${p[n].lat},${p[n].lng} --source ${JSON.stringify(p[n].source)}`
    ).join("\n");

    $("#bench-out").innerHTML = `
      <div class="out-block">
        <div class="out-head"><h3>Paste this to Claude</h3><button class="promote-btn" data-copy="json">Copy</button></div>
        <textarea id="out-json" readonly rows="${Math.min(20, names.length * 6 + 4)}">${esc(json)}</textarea>
      </div>
      <div class="out-block">
        <div class="out-head"><h3>Or run these yourself</h3><button class="promote-btn" data-copy="cmds">Copy</button></div>
        <textarea id="out-cmds" readonly rows="${Math.min(14, names.length + 2)}">${esc(cmds)}</textarea>
      </div>`;

    $$("[data-copy]").forEach((b) =>
      b.addEventListener("click", () => {
        const el = $(b.dataset.copy === "json" ? "#out-json" : "#out-cmds");
        el.select();
        try { document.execCommand("copy"); b.textContent = "Copied"; setTimeout(() => (b.textContent = "Copy"), 1500); }
        catch (e) { b.textContent = "Select + copy"; }
      })
    );
  }

  function renderStatus() {
    const D = state.data;
    if (!D) { $("#bench-status").innerHTML = ""; $("#header-stats").innerHTML = ""; return; }
    const w = D.waypoints || [];
    const n = (s) => w.filter((x) => statusOf(x) === s).length;
    $("#header-stats").innerHTML = [
      { num: n("ok"), lbl: "Verified" },
      { num: n("new"), lbl: "Placed now" },
      { num: n("todo"), lbl: "No coordinate" },
    ].map((s) => `<div class="stat"><span class="num">${s.num}</span><span class="lbl">${s.lbl}</span></div>`).join("");

    /* Re-run the checks over what's already in the file. This is the "review"
       half — a coordinate that shipped wrong looks exactly like one that
       shipped right until something measures it. */
    const bad = [];
    for (const wp of w) {
      const c = coordFor(wp);
      if (!c || placed()[wp.name]) continue;
      for (const issue of checkPlacement(wp.name, c[0], c[1])) {
        if (issue.level === "stop" || issue.level === "warn") bad.push(`<b>${esc(wp.name)}</b> — ${esc(issue.msg)}`);
      }
      if (wp.verified && !wp.source) bad.push(`<b>${esc(wp.name)}</b> — verified with no <code>source</code>. Can't be re-checked.`);
    }
    $("#bench-status").innerHTML = bad.length
      ? `<div class="note-card" style="border-left-color:var(--warn-border)">
           <h3>Review — ${bad.length} thing(s) already in the file worth a second look</h3>
           <ul class="principle-list">${bad.map((b) => `<li>${b}</li>`).join("")}</ul></div>`
      : `<div class="note-card"><h3>Review</h3><p>Nothing already in this trip's file trips a check.</p></div>`;
  }

  function renderAll() { renderStatus(); renderWorklist(); renderMap(); renderOutput(); }

  /* ---------------- Utils ---------------- */

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const cssId = (s) => String(s).replace(/[^a-zA-Z0-9]/g, "-");

  /* ---------------- Init ---------------- */

  function selectTrip(slug) {
    state.slug = slug;
    state.trip = TRIPS.find((t) => t.slug === slug) || null;
    state.selected = null;
    loadTripData(slug, (data) => {
      state.data = data;
      if (!data) {
        $("#worklist").innerHTML = `<div class="empty-state">Couldn't load <code>${esc(slug)}/data.js</code>. Serve the folder over http:// — a file:// page can't fetch it.</div>`;
        return;
      }
      renderAll();
    });
  }

  function init() {
    applyTheme("basecamp");
    loadPlacements();

    const withPages = TRIPS.filter((t) => t.page);
    $("#trip-select").innerHTML = withPages
      .map((t) => `<option value="${t.slug}">${t.emoji || "🧭"} ${esc(t.title)}</option>`)
      .join("");
    $("#trip-select").addEventListener("change", (e) => selectTrip(e.target.value));

    $("#clear-btn").addEventListener("click", () => {
      if (!state.slug) return;
      state.placements[state.slug] = {};
      savePlacements();
      renderAll();
    });

    /* ?trip=<slug> so a session can hand over a link that opens on the trip
       that actually needs the work, rather than "then pick it from the list". */
    let want = null;
    try { want = new URLSearchParams(location.search).get("trip"); } catch (e) { /* ignore */ }
    const start = withPages.find((t) => t.slug === want) || withPages[0];
    if (start) {
      $("#trip-select").value = start.slug;
      selectTrip(start.slug);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
