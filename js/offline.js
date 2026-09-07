/* ==========================================================================
   offline.js — service worker registration, the online/offline indicator,
   and the tile prefetch that the Map tab drives.

   Loaded by every page. Degrades to nothing when service workers aren't
   available, which includes opening the site straight off disk with file://
   — still a supported way to use it, just without the caching layer.
   ========================================================================== */

const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

const Offline = (function () {
  "use strict";

  let sw = null;                 // the controlling ServiceWorker, once we have one
  const waiters = new Map();     // message type → resolve fn

  /* ---------------- Registration ---------------- */

  function register(scriptPath) {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol === "file:") return;   // no SW off the filesystem

    window.addEventListener("load", () => {
      navigator.serviceWorker.register(scriptPath).catch((err) => {
        console.warn("[offline] service worker registration failed:", err.message);
      });
    });

    navigator.serviceWorker.addEventListener("message", (e) => {
      const type = (e.data || {}).type;
      const fn = waiters.get(type);
      if (fn) { waiters.delete(type); fn(e.data); }
      if (type === "PREFETCH_PROGRESS" && onProgress) onProgress(e.data);
    });

    navigator.serviceWorker.ready.then((reg) => { sw = reg.active; });
  }

  let onProgress = null;

  function send(msg, expect) {
    return new Promise((resolve) => {
      const target = navigator.serviceWorker && navigator.serviceWorker.controller;
      if (!target) { resolve(null); return; }
      if (expect) waiters.set(expect, resolve);
      target.postMessage(msg);
      if (!expect) resolve(null);
    });
  }

  /* ---------------- Online / offline indicator ----------------
     Small, permanent, and honest: on a trip page the difference between
     "cached copy" and "live" is worth one line of chrome. */

  function mountIndicator(host) {
    const el = document.createElement("div");
    el.className = "net-state";
    el.setAttribute("aria-live", "polite");
    const paint = () => {
      const on = navigator.onLine;
      el.classList.toggle("off", !on);
      el.textContent = on ? "" : "Offline — showing the saved copy";
      el.hidden = on;
    };
    window.addEventListener("online", paint);
    window.addEventListener("offline", paint);
    paint();
    (host || document.body).appendChild(el);
    return el;
  }

  /* ---------------- Slippy tile math ----------------
     Standard Web Mercator tile indices. Same formulas Leaflet uses, so the
     URLs we prefetch are byte-identical to the ones it will later request. */

  function lonToX(lon, z) { return Math.floor(((lon + 180) / 360) * Math.pow(2, z)); }
  function latToY(lat, z) {
    const r = (lat * Math.PI) / 180;
    return Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * Math.pow(2, z));
  }

  /** Every tile URL covering [[s,w],[n,e]] across a zoom range, low zoom
      first so a truncated download still leaves you a usable overview. */
  function tileUrls(bounds, minZ, maxZ) {
    const [[south, west], [north, east]] = bounds;
    const urls = [];
    for (let z = minZ; z <= maxZ; z++) {
      const x0 = lonToX(Math.min(west, east), z), x1 = lonToX(Math.max(west, east), z);
      const y0 = latToY(Math.max(north, south), z), y1 = latToY(Math.min(north, south), z);
      for (let x = x0; x <= x1; x++) {
        for (let y = y0; y <= y1; y++) {
          urls.push(TILE_URL.replace("{z}", z).replace("{x}", x).replace("{y}", y));
        }
      }
    }
    return urls;
  }

  /** How deep can we go before crossing the policy cap? Returns the deepest
      zoom whose cumulative tile count still fits in `budget`. */
  function zoomBudget(bounds, minZ, maxZ, budget) {
    let urls = [], z = minZ, lastFit = minZ - 1;
    for (; z <= maxZ; z++) {
      const next = tileUrls(bounds, minZ, z);
      if (next.length > budget) break;
      urls = next;
      lastFit = z;
    }
    return { urls, maxZoom: lastFit };
  }

  function status() { return send({ type: "TILE_STATUS" }, "TILE_STATUS"); }
  function clear() { return send({ type: "CLEAR_TILES" }, "TILES_CLEARED"); }

  function prefetch(urls, progressFn) {
    onProgress = progressFn || null;
    return send({ type: "PREFETCH_TILES", urls }, "PREFETCH_DONE")
      .then((r) => { onProgress = null; return r; });
  }

  const available = () =>
    "serviceWorker" in navigator &&
    location.protocol !== "file:" &&
    !!(navigator.serviceWorker && navigator.serviceWorker.controller);

  return { register, mountIndicator, tileUrls, zoomBudget, status, clear, prefetch, available };
})();
