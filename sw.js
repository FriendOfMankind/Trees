/* ==========================================================================
   sw.js — the offline layer.

   Why this exists: every other part of this site is built on the assumption
   that it gets opened where there is no signal, and until now that was only
   half true. Leaflet was vendored but the site itself still had to be reached
   over the network, and the map tiles always were. On a phone at a trailhead
   that is a DNS error, not a trip plan.

   Two caches:
     shell  — the site itself, versioned by content hash (see sw-precache.js).
              Stale-while-revalidate: instant offline, fresh next load.
     tiles  — OpenStreetMap raster tiles, cache-first, kept across shell
              versions because tiles don't change when the site does.

   ON TILES AND THE OSM USAGE POLICY: the tile servers are donated
   infrastructure and their policy treats downloading more than 250 tiles in
   one go as bulk downloading, which is not allowed. So PREFETCH_TILES is
   capped at 250, throttled, and deliberately not enough to cover a whole
   trip at navigation zoom. It buys you the overview map you already looked
   at, offline. It is NOT a substitute for real offline navigation — that is
   what the GPX export and a proper offline maps app are for.
   ========================================================================== */

importScripts("./sw-precache.js");

const SHELL_CACHE = `trailnotes-shell-${self.PRECACHE_VERSION}`;
const TILE_CACHE = "trailnotes-tiles-v1";

const TILE_HOSTS = ["tile.openstreetmap.org"];
const MAX_TILES = 3000;        // hard ceiling on stored tiles
const MAX_PREFETCH = 250;      // OSM policy: more than this in one go is bulk downloading
const PREFETCH_CONCURRENCY = 2;

const isTile = (url) => TILE_HOSTS.some((h) => url.hostname === h || url.hostname.endsWith(`.${h}`));

/* ---------------- Install / activate ---------------- */

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    /* One at a time rather than addAll: a single 404 should not take the
       whole install down and leave the site with no offline copy at all. */
    const results = await Promise.allSettled(
      self.PRECACHE_FILES.map(async (f) => {
        const res = await fetch(new Request(f, { cache: "reload" }));
        if (!res.ok) throw new Error(`${f} → ${res.status}`);
        await cache.put(f, res);
      })
    );
    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length) {
      console.warn(`[sw] ${failed.length}/${self.PRECACHE_FILES.length} assets failed to precache`,
        failed.map((f) => String(f.reason)));
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keep = new Set([SHELL_CACHE, TILE_CACHE]);
    for (const name of await caches.keys()) {
      if (name.startsWith("trailnotes-") && !keep.has(name)) await caches.delete(name);
    }
    await self.clients.claim();
  })());
});

/* ---------------- Fetch ---------------- */

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  if (isTile(url)) { event.respondWith(tileFirst(req)); return; }
  if (url.origin === self.location.origin) { event.respondWith(shellSWR(req)); return; }
  /* Anything else — Google Maps deep links and the like — is left alone.
     Those are navigations away from the site, not resources of it. */
});

/** Cache first, then network. A tile never changes, so freshness is worthless
    and having it at all is the entire point. */
async function tileFirst(req) {
  const cache = await caches.open(TILE_CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res.ok) { await cache.put(req, res.clone()); trimTiles(); }
    return res;
  } catch (e) {
    /* Offline and never seen: a transparent tile beats a broken-image icon,
       because the markers and the scale bar still read on top of it. */
    return blankTile();
  }
}

/** Serve from cache immediately, refresh in the background. The site's content
    is edited constantly, so "what I have" must never become "what I'm stuck
    with" once there's a network again. */
async function shellSWR(req) {
  const cache = await caches.open(SHELL_CACHE);
  const hit = (await cache.match(req, { ignoreSearch: true })) || (await matchIndex(cache, req));

  const network = fetch(req)
    .then((res) => {
      if (res.ok && res.type === "basic") cache.put(req, res.clone()).catch(() => {});
      return res;
    })
    .catch(() => null);

  if (hit) { network; return hit; }

  const res = await network;
  if (res) return res;

  /* A navigation we've never cached, with no network. Say so plainly rather
     than showing the browser's dinosaur — the user may be standing somewhere
     where knowing "the plan is not on this device" matters. */
  if (req.mode === "navigate") {
    return new Response(OFFLINE_PAGE, { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
  return new Response("", { status: 504, statusText: "Offline" });
}

/* A directory URL and its index.html are the same page to a user and two
   different keys to the Cache API. The precache stores "trips/x/index.html";
   the browser asks for "trips/x/". Without this, every trip page you had not
   already opened online was missing offline — which is exactly the page you'd
   be reaching for. */
async function matchIndex(cache, req) {
  if (req.mode !== "navigate") return undefined;
  const url = new URL(req.url);
  if (!url.pathname.endsWith("/")) return undefined;
  return cache.match(url.pathname + "index.html", { ignoreSearch: true });
}

const TRANSPARENT_PNG = Uint8Array.from(atob(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
), (c) => c.charCodeAt(0));

function blankTile() {
  return new Response(TRANSPARENT_PNG, { headers: { "Content-Type": "image/png" } });
}

const OFFLINE_PAGE = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Offline</title><style>
body{font-family:Georgia,serif;background:#fbfaf6;color:#16211f;margin:0;
display:flex;min-height:100vh;align-items:center;justify-content:center;padding:2rem}
div{max-width:32rem}h1{font-size:1.4rem;margin:0 0 .6em}
p{line-height:1.6;color:#4a5a57}code{background:#eee;padding:.1em .35em;border-radius:3px}
</style></head><body><div>
<h1>This page isn't on the device</h1>
<p>You're offline and this particular page was never cached. Pages you have
opened at least once while online are available; this one wasn't.</p>
<p>If this is the plan you needed, that's a real failure of the system and not
your fault — the fix is to open each trip page once before leaving home.</p>
</div></body></html>`;

/* ---------------- Tile prefetch, driven by the Map tab ---------------- */

self.addEventListener("message", (event) => {
  const msg = event.data || {};
  const reply = (data) => event.source && event.source.postMessage(data);

  if (msg.type === "SKIP_WAITING") { self.skipWaiting(); return; }

  if (msg.type === "TILE_STATUS") {
    caches.open(TILE_CACHE).then((c) => c.keys()).then((keys) =>
      reply({ type: "TILE_STATUS", count: keys.length, max: MAX_TILES, maxPrefetch: MAX_PREFETCH })
    );
    return;
  }

  if (msg.type === "CLEAR_TILES") {
    caches.delete(TILE_CACHE).then(() => reply({ type: "TILES_CLEARED" }));
    return;
  }

  if (msg.type === "PREFETCH_TILES") {
    event.waitUntil(prefetchTiles(Array.isArray(msg.urls) ? msg.urls : [], reply));
    return;
  }
});

async function prefetchTiles(urls, reply) {
  const cache = await caches.open(TILE_CACHE);

  /* Skip what we already hold, then apply the policy cap to what's left. */
  const todo = [];
  for (const u of urls) {
    if (todo.length >= MAX_PREFETCH) break;
    if (!(await cache.match(u))) todo.push(u);
  }

  const capped = urls.length > MAX_PREFETCH;
  let done = 0, failed = 0;

  async function worker() {
    while (todo.length) {
      const u = todo.shift();
      try {
        const res = await fetch(u, { mode: "cors" });
        if (res.ok) await cache.put(u, res); else failed++;
      } catch (e) { failed++; }
      done++;
      if (done % 10 === 0) reply({ type: "PREFETCH_PROGRESS", done, total: done + todo.length });
      /* Deliberate pacing. These are donated tile servers. */
      await new Promise((r) => setTimeout(r, 60));
    }
  }

  await Promise.all(Array.from({ length: PREFETCH_CONCURRENCY }, worker));
  await trimTiles();
  const keys = await (await caches.open(TILE_CACHE)).keys();
  reply({ type: "PREFETCH_DONE", done, failed, capped, stored: keys.length });
}

/** Keep the tile cache bounded. Oldest-inserted first, which is the order
    cache.keys() returns — good enough, and it never runs on the hot path. */
let trimming = false;
async function trimTiles() {
  if (trimming) return;
  trimming = true;
  try {
    const cache = await caches.open(TILE_CACHE);
    const keys = await cache.keys();
    if (keys.length <= MAX_TILES) return;
    for (const req of keys.slice(0, keys.length - MAX_TILES)) await cache.delete(req);
  } finally {
    trimming = false;
  }
}
