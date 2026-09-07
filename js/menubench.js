/* ==========================================================================
   menubench.js — vote yes/no/maybe on candidate dishes.

   WHY A PAGE AND NOT A MARKDOWN FILE. The first intake went out as
   docs/MEALFORMAT.md and Colin's own read on it was right: prose is a bad
   instrument for this. Ten open questions is ten small essays. Eighty-eight
   yes/no decisions is a few minutes if the interface gets out of the way,
   and it produces something structured at the end instead of paragraphs
   somebody has to parse.

   Same shape as mapbench.html deliberately: pick from a list, decide, get one
   block to paste back. One workflow to learn, used twice.

   This page writes nothing. Votes live in localStorage until they're pasted
   somewhere, exactly like the map bench's placements.
   ========================================================================== */

(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const LS_KEY = "menubench.votes";
  const ALL = DISH_GROUPS.flatMap((g) => g.dishes.map((d) => ({ ...d, group: g.group })));

  let votes = {};
  let filter = "todo";

  const FILTERS = [
    ["todo", "Not yet voted"],
    ["all", "Everything"],
    ["yes", "Yes"],
    ["maybe", "Maybe"],
    ["no", "No"],
  ];

  function load() {
    try { votes = JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch (e) { votes = {}; }
  }
  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(votes)); } catch (e) { /* private mode */ }
  }

  function matches(d) {
    const v = votes[d.id];
    if (filter === "all") return true;
    if (filter === "todo") return !v;
    return v === filter;
  }

  /* The next thing a keypress acts on: first unvoted dish in document order,
     so Y/N/M can be held down through the whole list without touching the
     mouse. Returns null once everything is decided. */
  function nextUnvoted() {
    return ALL.find((d) => !votes[d.id]) || null;
  }

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function dishRowHtml(d, isNext) {
    const v = votes[d.id];
    const facts = [
      d.method,
      `${d.cleanup === "none" ? "no cleanup" : d.cleanup + " cleanup"}`,
      d.time === 0 ? "no cooking" : `${d.time} min`,
      `~${d.kcal.toLocaleString()} kcal`,
    ];
    return `
      <div class="dish-row ${v ? "vote-" + v : ""} ${isNext ? "next" : ""}" data-id="${d.id}">
        <div class="dish-main">
          <div class="dish-name">${esc(d.name)}
            ${d.have ? `<span class="have-pill">in the library</span>` : ""}
            ${d.oas ? `<span class="oas-pill">raw fruit — needs a swap</span>` : ""}
          </div>
          <div class="dish-blurb">${d.blurb}</div>
          <div class="dish-facts">${facts.map((f) => `<span>${esc(f)}</span>`).join("")}</div>
        </div>
        <div class="vote-btns">
          <button class="vote-btn yes ${v === "yes" ? "on" : ""}" data-vote="yes" title="Yes">Y</button>
          <button class="vote-btn maybe ${v === "maybe" ? "on" : ""}" data-vote="maybe" title="Maybe">M</button>
          <button class="vote-btn no ${v === "no" ? "on" : ""}" data-vote="no" title="No">N</button>
        </div>
      </div>`;
  }

  function render() {
    const nx = nextUnvoted();
    const html = DISH_GROUPS.map((g) => {
      const rows = g.dishes.filter(matches);
      if (!rows.length) return "";
      return `<div class="dish-group">
        <h3>${esc(g.group)} <span class="count-note">${rows.length} shown</span></h3>
        ${g.note ? `<p class="gnote">${g.note}</p>` : ""}
        ${rows.map((d) => dishRowHtml(d, nx && d.id === nx.id)).join("")}
      </div>`;
    }).join("");

    $("#dish-list").innerHTML = html || `<div class="empty-state">Nothing matches that filter.</div>`;

    $$(".vote-btn").forEach((b) =>
      b.addEventListener("click", () => {
        const id = b.closest(".dish-row").dataset.id;
        votes[id] = votes[id] === b.dataset.vote ? undefined : b.dataset.vote;
        if (!votes[id]) delete votes[id];
        save();
        renderAll();
      })
    );
  }

  function renderFilters() {
    $("#menu-filter-bar").innerHTML = FILTERS.map(([k, label]) => {
      const n = k === "all" ? ALL.length
        : k === "todo" ? ALL.filter((d) => !votes[d.id]).length
        : ALL.filter((d) => votes[d.id] === k).length;
      return `<button class="filter-btn ${k === filter ? "active" : ""}" data-mfilter="${k}">${label}<span class="count">${n}</span></button>`;
    }).join("");
    $$("[data-mfilter]").forEach((b) =>
      b.addEventListener("click", () => { filter = b.dataset.mfilter; renderAll(); })
    );
  }

  function renderProgress() {
    const done = Object.keys(votes).length;
    const pct = Math.round((done / ALL.length) * 100);
    $("#vote-progress-fill").style.width = `${pct}%`;
    $("#vote-progress-label").textContent = `${done} / ${ALL.length} decided (${pct}%)`;

    const n = (v) => ALL.filter((d) => votes[d.id] === v).length;
    $("#header-stats").innerHTML = [
      { num: n("yes"), lbl: "Yes" },
      { num: n("maybe"), lbl: "Maybe" },
      { num: n("no"), lbl: "No" },
      { num: ALL.length - done, lbl: "Left" },
    ].map((s) => `<div class="stat"><span class="num">${s.num}</span><span class="lbl">${s.lbl}</span></div>`).join("");
  }

  function renderOutput() {
    const done = Object.keys(votes).length;
    if (!done) {
      $("#menu-out").innerHTML = `<div class="empty-state">Vote on something and the paste-back block appears here.</div>`;
      return;
    }
    const pick = (v) => ALL.filter((d) => votes[d.id] === v).map((d) => ({ id: d.id, name: d.name }));
    const payload = {
      source: "menubench",
      decided: done,
      of: ALL.length,
      yes: pick("yes"),
      maybe: pick("maybe"),
      no: pick("no"),
    };
    const json = JSON.stringify(payload, null, 2);

    $("#menu-out").innerHTML = `
      <div class="out-block" style="grid-column:1/-1">
        <div class="out-head">
          <h3>Paste this to Claude</h3>
          <button class="promote-btn" id="copy-votes">Copy</button>
        </div>
        <textarea id="votes-json" readonly rows="16">${esc(json)}</textarea>
      </div>`;

    $("#copy-votes").addEventListener("click", () => {
      const el = $("#votes-json");
      el.select();
      const b = $("#copy-votes");
      try { document.execCommand("copy"); b.textContent = "Copied"; setTimeout(() => (b.textContent = "Copy"), 1500); }
      catch (e) { b.textContent = "Select + copy"; }
    });
  }

  function renderAll() { renderFilters(); renderProgress(); render(); renderOutput(); }

  function init() {
    applyTheme("basecamp");
    load();

    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea, select")) return;
      const key = { y: "yes", n: "no", m: "maybe" }[e.key.toLowerCase()];
      if (!key) return;
      const d = nextUnvoted();
      if (!d) return;
      e.preventDefault();
      votes[d.id] = key;
      save();
      renderAll();
    });

    $("#clear-votes").addEventListener("click", () => {
      if (!confirm("Clear every vote?")) return;
      votes = {};
      save();
      renderAll();
    });

    renderAll();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
