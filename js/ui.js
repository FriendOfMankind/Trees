/* ==========================================================================
   ui.js — the parts the hub and the trip pages both need. Loaded before
   hub.js / trip.js by every page.

   This file exists because the tab controller, the checklist storage and the
   progress bars had drifted into two near-identical copies. Two copies of a
   keyboard handler means one of them is always the one nobody fixed.
   ========================================================================== */

const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

/* ---------------- Tabs ----------------
   Real tab semantics: roles, aria-selected, arrow keys, Home/End. The panels
   are sections in the document, so a screen reader reaches them normally. */

function initTabs(opts) {
  const nav = $(opts.nav);
  if (!nav) return { activate() {} };

  nav.setAttribute("role", "tablist");

  const buttons = $$(".tab-btn", nav);
  buttons.forEach((btn) => {
    const name = btn.dataset.tab;
    btn.setAttribute("role", "tab");
    btn.id = `tab-${name}`;
    btn.setAttribute("aria-controls", `panel-${name}`);
    const panel = $(`#panel-${name}`);
    if (panel) {
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", btn.id);
      panel.setAttribute("tabindex", "0");
    }
    btn.addEventListener("click", () => activate(name));
  });

  function activate(name, opts2) {
    const found = buttons.some((b) => b.dataset.tab === name);
    if (!found) return;
    buttons.forEach((b) => {
      const on = b.dataset.tab === name;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.setAttribute("tabindex", on ? "0" : "-1");
    });
    $$(".panel").forEach((p) => {
      const on = p.id === `panel-${name}`;
      p.classList.toggle("active", on);
      p.hidden = !on;
    });
    history.replaceState(null, "", `#${name}`);
    if (opts.onActivate) opts.onActivate(name);
    if (opts2 && opts2.focus) {
      const btn = buttons.find((b) => b.dataset.tab === name);
      if (btn) btn.focus();
    }
  }

  nav.addEventListener("keydown", (e) => {
    const idx = buttons.findIndex((b) => b === document.activeElement);
    if (idx < 0) return;
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    let next = null;
    if (step) next = (idx + step + buttons.length) % buttons.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = buttons.length - 1;
    if (next === null) return;
    e.preventDefault();
    activate(buttons[next].dataset.tab, { focus: true });
  });

  const initial = (location.hash || "").replace("#", "");
  activate(buttons.some((b) => b.dataset.tab === initial) ? initial : buttons[0].dataset.tab);

  window.addEventListener("hashchange", () => {
    const name = (location.hash || "").replace("#", "");
    if (name) activate(name);
  });

  return { activate };
}

/* ---------------- Checklist state ----------------
   localStorage, per browser, best effort. Everything that must survive a
   cleared cache belongs in a data file — see the `done` flag on reservations.
   This is the scratchpad layer and nothing more. */

function checkStore(key) {
  let set;
  try { set = new Set(JSON.parse(localStorage.getItem(key) || "[]")); } catch (e) { set = new Set(); }
  return {
    has: (id) => set.has(id),
    get size() { return set.size; },
    set(id, on) {
      if (on) set.add(id); else set.delete(id);
      try { localStorage.setItem(key, JSON.stringify(Array.from(set))); } catch (e) { /* private mode */ }
    },
  };
}

function checkItemHtml(id, text, checked, opts) {
  const locked = opts && opts.locked;
  return `<label class="check-item ${checked ? "checked" : ""}${locked ? " locked" : ""}" data-id="${id}">
    <input type="checkbox" ${checked ? "checked" : ""} ${locked ? "disabled" : ""} />
    <span>${text}</span></label>`;
}

/** Wire every .check-item inside `scope` to `store`, calling `onChange` after. */
function wireChecklist(scope, store, onChange) {
  $$(".check-item", scope).forEach((label) => {
    const input = $("input", label);
    if (!input || input.disabled) return;
    input.addEventListener("change", () => {
      store.set(label.dataset.id, input.checked);
      label.classList.toggle("checked", input.checked);
      if (onChange) onChange();
    });
  });
}

function setProgress(fillSel, labelSel, done, total, noun) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const fill = $(fillSel), label = $(labelSel);
  if (fill) {
    fill.style.width = `${pct}%`;
    const wrap = fill.parentElement;
    if (wrap) {
      wrap.setAttribute("role", "progressbar");
      wrap.setAttribute("aria-valuenow", String(pct));
      wrap.setAttribute("aria-valuemin", "0");
      wrap.setAttribute("aria-valuemax", "100");
    }
  }
  if (label) label.textContent = `${done} / ${total} ${noun} (${pct}%)`;
}

/* ---------------- Dates ----------------
   Everything date-shaped on this site is a UTC calendar day. Parsing
   "2026-09-22" with the Date constructor and then reading local fields is how
   a countdown ends up one day off for half the planet. */

function isoToUTC(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function todayUTC() {
  const n = new Date();
  return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
}

/** Whole days from today to an ISO date. Negative once it's in the past. */
function daysUntil(iso) {
  const t = isoToUTC(iso);
  return t === null ? null : Math.round((t - todayUTC()) / 86400000);
}

function fmtDay(iso) {
  const t = isoToUTC(iso);
  if (t === null) return iso || "";
  return new Date(t).toLocaleDateString(undefined, {
    timeZone: "UTC", month: "short", day: "numeric", year: "numeric",
  });
}

/** "in 12 days" / "today" / "9 days ago" — for deadlines, not decoration. */
function relDays(n) {
  if (n === null) return "";
  if (n === 0) return "today";
  if (n === 1) return "tomorrow";
  if (n === -1) return "yesterday";
  return n > 0 ? `in ${n} days` : `${-n} days ago`;
}

function download(filename, text, mime) {
  const blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    /* Clipboard API needs a secure context; file:// isn't one, and this site
       is explicitly opened from disk sometimes. */
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
    ta.remove();
    return ok;
  }
}
