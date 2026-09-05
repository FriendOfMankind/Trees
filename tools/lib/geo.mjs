/* ==========================================================================
   geo.mjs — geometry helpers shared by the authoring tools.

   Nothing here touches the network. Nothing here ships to the browser except
   the decoder, which is reimplemented in js/trip.js (25 lines; not worth a
   build step to share).
   ========================================================================== */

/** Great-circle distance in metres. Used to decide whether two sources
    actually agree about a place, so it needs to be right, not fast. */
export function haversineMeters(a, b) {
  const R = 6371008.8; // mean Earth radius, metres
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** Widest distance between any two points in a set, in metres.
    This is the number that decides "do these sources agree" — the mean would
    hide one bad outlier among three good points, which is the exact failure
    we care about. */
export function spreadMeters(points) {
  let max = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      max = Math.max(max, haversineMeters(points[i], points[j]));
    }
  }
  return max;
}

/** Arithmetic mean of a point set. Only meaningful once spread is small. */
export function centroid(points) {
  const lat = points.reduce((s, p) => s + p.lat, 0) / points.length;
  const lng = points.reduce((s, p) => s + p.lng, 0) / points.length;
  return { lat, lng };
}

/* ---------------- Encoded polyline (Google algorithm) ----------------
   Route geometry is stored encoded because the alternative — a raw array of
   [lat,lng] pairs — is roughly ten times the bytes for the same line, and a
   thousand-mile route turns data.js into an unreadable wall of numbers.
   Precision 5 is ~1 m, which is far finer than any road centreline is
   surveyed, and is what both OSRM and OpenRouteService emit by default. */

export function encodePolyline(points, precision = 5) {
  const factor = 10 ** precision;
  let lastLat = 0;
  let lastLng = 0;
  let out = "";

  const chunk = (value) => {
    let v = value < 0 ? ~(value << 1) : value << 1;
    let s = "";
    while (v >= 0x20) {
      s += String.fromCharCode((0x20 | (v & 0x1f)) + 63);
      v >>= 5;
    }
    return s + String.fromCharCode(v + 63);
  };

  for (const p of points) {
    const lat = Math.round(p.lat * factor);
    const lng = Math.round(p.lng * factor);
    out += chunk(lat - lastLat) + chunk(lng - lastLng);
    lastLat = lat;
    lastLng = lng;
  }
  return out;
}

export function decodePolyline(str, precision = 5) {
  const factor = 10 ** precision;
  const points = [];
  let i = 0;
  let lat = 0;
  let lng = 0;

  while (i < str.length) {
    let shift = 0;
    let result = 0;
    let byte;
    do {
      byte = str.charCodeAt(i++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      byte = str.charCodeAt(i++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    points.push([lat / factor, lng / factor]);
  }
  return points;
}

/** Ramer–Douglas–Peucker, in degrees. Routing engines already simplify, but
    an OSM trail transcribed way-by-way can carry survey-grade noise we don't
    need for a page that renders it 400 px wide. */
export function simplify(points, toleranceDeg = 0.00005) {
  if (points.length < 3) return points.slice();

  const perp = (p, a, b) => {
    const [px, py] = p;
    const [ax, ay] = a;
    const [bx, by] = b;
    const dx = bx - ax;
    const dy = by - ay;
    if (dx === 0 && dy === 0) return Math.hypot(px - ax, py - ay);
    const t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy);
    const cl = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (ax + cl * dx), py - (ay + cl * dy));
  };

  const keep = new Array(points.length).fill(false);
  keep[0] = true;
  keep[points.length - 1] = true;
  const stack = [[0, points.length - 1]];

  while (stack.length) {
    const [first, last] = stack.pop();
    let maxDist = 0;
    let index = -1;
    for (let i = first + 1; i < last; i++) {
      const d = perp(points[i], points[first], points[last]);
      if (d > maxDist) {
        maxDist = d;
        index = i;
      }
    }
    if (maxDist > toleranceDeg && index !== -1) {
      keep[index] = true;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

export const M_PER_MILE = 1609.344;
export const metersToMiles = (m) => m / M_PER_MILE;
