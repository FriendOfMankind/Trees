/* ==========================================================================
   sources.mjs — coordinate lookups, one function per data provider.

   THE PROVIDER FIELD IS THE POINT. The verification rule is "official, or two
   independent sources agreeing", and independence is decided here, not by
   counting how many HTTP calls returned something.

   Overpass and Nominatim are BOTH OpenStreetMap. Nominatim is a geocoder
   built on OSM data; if it agrees with Overpass that is one source agreeing
   with itself, not corroboration. So they share provider id "osm" and are
   collapsed to a single vote. RIDB (Recreation.gov) and NPS are separate
   federal datasets and each count on their own.

   `official: true` means a government agency publishes it as the authoritative
   location of a facility it operates. OSM is excellent and often more precise,
   but it is community-edited, so it never counts as official on its own.
   ========================================================================== */

const UA = "TrailNotes/1.0 (personal trip planner; github.com/FriendOfMankind/Trees)";

export const PROVIDERS = {
  osm:  { id: "osm",  label: "OpenStreetMap", official: false },
  ridb: { id: "ridb", label: "Recreation.gov (RIDB)", official: true, env: "RIDB_API_KEY" },
  nps:  { id: "nps",  label: "National Park Service", official: true, env: "NPS_API_KEY" },
};

/* ---------------- HTTP ---------------- */

async function getJson(url, { headers = {}, method = "GET", body, timeoutMs = 30000, retries = 2, backoff = 1000 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt) await new Promise((r) => setTimeout(r, backoff * 2 ** attempt));
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method,
        body,
        signal: ac.signal,
        headers: { "User-Agent": UA, Accept: "application/json", ...headers },
      });
      if (res.status === 429) { const e = new Error("HTTP 429 (rate limited)"); e.rateLimited = true; throw e; }
      if (res.status >= 500) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) {
        // A 4xx is an answer, not a hiccup: a bad key, a blocked host, a
        // malformed query. Retrying it just multiplies the wait by the
        // backoff — with Overpass's eight-second delay a hard 403 was
        // costing sixteen seconds per waypoint to learn nothing.
        const e = new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
        e.fatal = true;
        throw e;
      }
      return await res.json();
    } catch (e) {
      lastErr = e;
      if (e.fatal) break;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastErr;
}

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Strip the words that describe a place's kind rather than name it. Overpass
    matches on the `name` tag, and OSM rarely tags a lot as "X Trailhead" — it
    tags the trail "X" and the parking separately. */
export function coreName(name) {
  return name
    .replace(/\b(trailhead|trail head|parking|picnic area|day use|campground|visitor center|visitor centre)\b/gi, "")
    .replace(/,.*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** A page names a hike the way you'd say it out loud — "Auxier Ridge
    out-and-back", "Rock Bridge + Creation Falls", "Princess / Whistling /
    Angel Windows". OSM names the *way*: "Auxier Ridge Trail". So try
    progressively looser forms and report which one matched, rather than
    reporting "not mapped" when the trail is mapped under its real name.

    Ordered widest-confidence first. The caller stops at the first hit, so a
    loose variant never overrides an exact match. */
export function nameVariants(name) {
  const out = [];
  const push = (v) => {
    const t = v.replace(/\s+/g, " ").trim();
    if (t.length > 2 && !out.includes(t)) out.push(t);
  };

  push(name);
  push(coreName(name));

  // Drop the words that describe the SHAPE of a walk, not the trail's name.
  // "Loop" and "Trail" are kept — plenty of OSM ways really are called
  // "Twin Arches Loop" — so this only removes phrasings OSM never uses.
  const shapeless = name
    .replace(/\b(out[- ]and[- ]back|out ?& ?back|round ?trip|via|hike|walk|scramble)\b/gi, " ")
    .replace(/\([^)]*\)/g, " ");
  push(shapeless);
  push(coreName(shapeless));

  // A combined day — "A + B", "A / B", "A to B" — is several trails on the
  // page and several names in OSM. Try each part on its own.
  for (const part of name.split(/\s*(?:\/|\+|,| to | then |&)\s*/i)) {
    push(part);
    push(coreName(part));
  }

  return out;
}

/* ---------------- OpenStreetMap ---------------- */

/* Overpass is donated infrastructure with an aggressive rate limiter, and a
   name regex over a 200 km radius is an expensive query — the first real run
   of this tool collected an HTTP 429 and a pile of timeouts. So: pace the
   calls, allow a long time for one to finish, and roll onto another public
   instance when one starts refusing rather than hammering the same host. */
const OVERPASS_MIRRORS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];
const OVERPASS_GAP_MS = 3000;   // minimum spacing between our own queries
let lastOverpass = 0;
let mirror = 0;

async function overpassQuery(data) {
  const wait = OVERPASS_GAP_MS - (Date.now() - lastOverpass);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));

  let lastErr;
  for (let i = 0; i < OVERPASS_MIRRORS.length; i++) {
    const url = OVERPASS_MIRRORS[(mirror + i) % OVERPASS_MIRRORS.length];
    try {
      const out = await getJson(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ data }).toString(),
        timeoutMs: 120000,   // a big regex query legitimately takes a minute
        retries: 1,
        backoff: 8000,       // 429 means slow down, not try again immediately
      });
      lastOverpass = Date.now();
      mirror = (mirror + i) % OVERPASS_MIRRORS.length;   // stay on what worked
      return out;
    } catch (e) {
      lastErr = e;
      lastOverpass = Date.now();
      if (!e.rateLimited && !/abort/i.test(e.message)) throw e;  // a real error
    }
  }
  throw new Error(`${lastErr?.message || "failed"} — all Overpass mirrors busy. Re-run in a few minutes; it caches nothing, so nothing is lost.`);
}

/** Overpass: match OSM objects by name near a point, and return their tags.
    Preferred over a geocoder because you can see WHAT was matched — a
    `tourism=camp_site` way is a campground; a `highway=residential` way that
    happens to share the name is not. */
export async function lookupOverpass(name, { lat, lng, radiusM = 20000 }) {
  const q = `[out:json][timeout:90];nwr["name"~"${escapeRegex(coreName(name))}",i](around:${radiusM},${lat},${lng});out center tags 25;`;
  const data = await overpassQuery(q);
  return (data.elements || [])
    .map((el) => {
      const p = el.type === "node" ? el : el.center;
      if (!p || p.lat == null || p.lon == null) return null;
      const tags = el.tags || {};
      const kind =
        tags.tourism || tags.leisure || tags.amenity || tags.highway ||
        tags.natural || tags.route || tags.man_made || "untagged";
      return {
        provider: "osm",
        via: "overpass",
        label: tags.name || name,
        lat: p.lat,
        lng: p.lon,
        detail: `${el.type}/${el.id} · ${kind}`,
        url: `https://www.openstreetmap.org/${el.type}/${el.id}`,
        tags,
      };
    })
    .filter(Boolean);
}

/** Nominatim: free-text fallback for places Overpass name-matching misses.
    Rate limit is 1 req/sec and it is enforced — the caller paces this. */
export async function lookupNominatim(name, { lat, lng, radiusM = 20000 }) {
  const d = radiusM / 111000; // rough degrees; the box only needs to be close

  // "Auxier Ridge Trailhead" is how the page says it; the gazetteer has
  // "Auxier Ridge". Try the page's wording first, then looser forms, and stop
  // at the first that returns anything so an exact hit is never diluted.
  let data = [];
  for (const variant of nameVariants(name)) {
    data = await getJson(`https://nominatim.openstreetmap.org/search?${new URLSearchParams({
      q: variant, format: "jsonv2", limit: "5",
      viewbox: `${lng - d},${lat + d},${lng + d},${lat - d}`, bounded: "1",
    })}`);
    if (data && data.length) break;
    await new Promise((r) => setTimeout(r, 1100));   // 1 req/sec, enforced
  }
  return (data || []).map((r) => ({
    provider: "osm",
    via: "nominatim",
    label: r.display_name,
    lat: Number(r.lat),
    lng: Number(r.lon),
    detail: `${r.category}=${r.type}`,
    url: r.osm_type && r.osm_id ? `https://www.openstreetmap.org/${r.osm_type}/${r.osm_id}` : null,
  }));
}

/* ---------------- Recreation.gov (RIDB) ---------------- */

/** The authoritative source for federal campgrounds and recreation
    facilities — Forest Service, NPS, BLM, Corps. Free key at
    https://ridb.recreation.gov/profile (Login → API key). */
export async function lookupRidb(name, { lat, lng, radiusM = 20000 }) {
  const key = process.env.RIDB_API_KEY;
  if (!key) return { skipped: "RIDB_API_KEY not set" };
  const params = new URLSearchParams({
    query: coreName(name),
    limit: "10",
    latitude: String(lat),
    longitude: String(lng),
    radius: String(Math.ceil(radiusM / 1609.344)), // RIDB wants miles
  });
  const data = await getJson(`https://ridb.recreation.gov/api/v1/facilities?${params}`, {
    headers: { apikey: key },
  });
  return (data.RECDATA || [])
    .map((f) => {
      const flat = Number(f.FacilityLatitude);
      const flng = Number(f.FacilityLongitude);
      if (!flat || !flng) return null; // RIDB returns 0,0 for unmapped facilities
      return {
        provider: "ridb",
        via: "ridb",
        label: f.FacilityName,
        lat: flat,
        lng: flng,
        detail: `${f.FacilityTypeDescription || "facility"} · id ${f.FacilityID}`,
        url: `https://www.recreation.gov/camping/campgrounds/${f.FacilityID}`,
      };
    })
    .filter(Boolean);
}

/* ---------------- National Park Service ---------------- */

/** NPS publishes campgrounds, visitor centers and "places" with coordinates.
    Free key at https://www.nps.gov/subjects/developer/get-started.htm
    `parkCode` narrows hard and is worth passing (biso, neri, hale…). */
export async function lookupNps(name, { parkCode } = {}) {
  const key = process.env.NPS_API_KEY;
  if (!key) return { skipped: "NPS_API_KEY not set" };

  const endpoints = ["campgrounds", "visitorcenters", "places"];
  const out = [];
  for (const ep of endpoints) {
    const params = new URLSearchParams({ q: coreName(name), limit: "10", api_key: key });
    if (parkCode) params.set("parkCode", parkCode);
    let data;
    try {
      data = await getJson(`https://developer.nps.gov/api/v1/${ep}?${params}`);
    } catch {
      continue; // one endpoint failing should not sink the others
    }
    for (const r of data.data || []) {
      const rlat = Number(r.latitude);
      const rlng = Number(r.longitude);
      if (!rlat || !rlng) continue;
      out.push({
        provider: "nps",
        via: `nps/${ep}`,
        label: r.name || r.title,
        lat: rlat,
        lng: rlng,
        detail: `${ep.replace(/s$/, "")}${r.parkCode ? ` · ${r.parkCode}` : ""}`,
        url: r.url || null,
      });
    }
  }
  return out;
}

/* ---------------- Routing ---------------- */

/** OpenRouteService. Free key, 2000 requests/day, and the only free engine
    here with a real hiking profile. Profiles used:
      driving-car   roads
      foot-hiking   OSM paths and tracks, weighted for trails
    Key: https://openrouteservice.org/dev/#/signup */
export async function routeOrs(coords, profile = "driving-car") {
  const key = process.env.ORS_API_KEY;
  if (!key) throw new Error("ORS_API_KEY not set — get one free at https://openrouteservice.org/dev/#/signup");
  const data = await getJson(`https://api.openrouteservice.org/v2/directions/${profile}`, {
    method: "POST",
    headers: { Authorization: key, "Content-Type": "application/json" },
    body: JSON.stringify({ coordinates: coords.map((c) => [c.lng, c.lat]) }),
  });
  const r = (data.routes || [])[0];
  if (!r) throw new Error("OpenRouteService returned no route");
  return {
    geometry: r.geometry, // encoded polyline, precision 5
    distanceM: r.summary?.distance ?? null,
    durationS: r.summary?.duration ?? null,
    engine: `openrouteservice/${profile}`,
  };
}

/** OSRM's public demo server. No key, driving only, and its terms ask you not
    to build on it — fine for a handful of authoring calls, not for a service.
    Here so you can get a driving line before signing up for anything. */
export async function routeOsrm(coords) {
  const path = coords.map((c) => `${c.lng},${c.lat}`).join(";");
  const data = await getJson(
    `https://router.project-osrm.org/route/v1/driving/${path}?overview=full&geometries=polyline`
  );
  if (data.code !== "Ok") throw new Error(`OSRM: ${data.code} ${data.message || ""}`);
  const r = data.routes[0];
  return {
    geometry: r.geometry,
    distanceM: r.distance,
    durationS: r.duration,
    engine: "osrm/driving",
  };
}

/** Pull a named trail's actual mapped geometry out of OSM instead of asking a
    routing engine to guess a path across it. For a trail this is strictly
    better: you get the line OSM has for "Auxier Ridge Trail", or you get
    nothing and know the trail is not mapped — no invented detour in between. */
export async function trailGeometryOsm(name, { lat, lng, radiusM = 15000 }) {
  const q =
    `[out:json][timeout:90];` +
    `way["name"~"${escapeRegex(coreName(name))}",i]["highway"~"^(path|footway|track|bridleway|steps)$"](around:${radiusM},${lat},${lng});` +
    `out geom;`;
  const data = await overpassQuery(q);
  return (data.elements || [])
    .filter((el) => Array.isArray(el.geometry) && el.geometry.length > 1)
    .map((el) => ({
      wayId: el.id,
      name: (el.tags || {}).name || name,
      sacScale: (el.tags || {}).sac_scale || null,
      surface: (el.tags || {}).surface || null,
      points: el.geometry.map((g) => [g.lat, g.lon]),
      url: `https://www.openstreetmap.org/way/${el.id}`,
    }));
}

export { getJson };
