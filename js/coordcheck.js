/* ==========================================================================
   coordcheck.js — the sanity checks a coordinate has to survive before it is
   allowed into a data file.

   Kept separate from mapbench.js and free of any DOM so it can be run two
   ways: loaded as a plain script by mapbench.html, and evaluated in a Node
   sandbox by tools/test/coordcheck.test.mjs the same way the site's other
   browser data files are.

   These are the checks that catch a real mistake with a real cost. Each one
   corresponds to something that has actually gone wrong somewhere:

     swapped   — 37.8,-83.6 is Kentucky; -83.6,37.8 is the Indian Ocean.
                 The most common paste error there is.
     sign      — a positive longitude in North America puts the pin in Asia.
     precision — 2 decimal places is ~1.1 km. Too coarse to navigate to, and
                 the signature of a number rounded from memory rather than
                 read off a map.
     far       — measured against the trip's own region centroid.
     split     — two stops on the same day 150 km apart is either a wrong pin
                 or a day that doesn't work. Both worth saying out loud.
     duplicate — identical coordinates mean a paste that didn't refresh.
     replace   — the waypoint ALREADY has a verified coordinate from a named
                 source, and this placement would overwrite it. Added after a
                 real session where seven already-verified pins were re-placed
                 from Google Maps in one pass, silently downgrading provenance
                 from Recreation.gov facility IDs and OSM node IDs. One of the
                 seven disagreed by 2.7 km and nobody would have seen it.

   Levels: "stop" blocks, "confirm" needs an explicit override, "warn" is shown
   and allowed. A warning you cannot override is one people learn to route
   around, so the overridable ones stay overridable — but overwriting a
   sourced coordinate should cost one deliberate click.
   ========================================================================== */

(function (root) {
  "use strict";

  function haversineKm(a, b) {
    const R = 6371, rad = (d) => (d * Math.PI) / 180;
    const dLat = rad(b[0] - a[0]), dLng = rad(b[1] - a[1]);
    const s = Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  /** Miles or km out of a registry `distance` string — "~4,300 mi loop",
      "~1,000 mi round trip", "~400 mi driving". Returns km, or null. */
  function parseTripDistanceKm(str) {
    if (!str) return null;
    const m = String(str).match(/([\d,]+(?:\.\d+)?)\s*(mi|mile|miles|km)\b/i);
    if (!m) return null;
    const n = Number(m[1].replace(/,/g, ""));
    if (!Number.isFinite(n) || n <= 0) return null;
    return /^k/i.test(m[2]) ? n : n * 1.609344;
  }

  /** How far from the trip's centre a waypoint may legitimately be.

      A fixed radius is wrong, and it was: a 21-day Badlands-to-Glacier road
      trip had 16 correct coordinates refused because Glacier is 686 km from
      the trip's middle, while a 700-mile loop around the Sky Islands should
      not tolerate anything like that.

      The registry already states each trip's driving distance, and that is
      the signal. For a closed loop of perimeter P no point is further than
      P/4 from the centre, so that bound scales with the trip instead of
      against it. Floored at 150 km so a short trip still gets a real check,
      and the fixed default survives for a trip with no distance recorded. */
  function maxRadiusKm(distanceStr) {
    const km = parseTripDistanceKm(distanceStr);
    if (km == null) return { warn: 300, stop: 800 };
    const r = Math.max(150, km / 4);
    return { warn: r, stop: r * 2.5 };
  }

  /** Decimal places actually present in a number as written. */
  function precisionOf(n) {
    const s = String(n);
    const i = s.indexOf(".");
    return i === -1 ? 0 : s.length - i - 1;
  }

  /**
   * @param {object} o
   * @param {string} o.name        waypoint being placed
   * @param {number} o.lat
   * @param {number} o.lng
   * @param {Array}  o.others      [{ name, days, lat, lng }] — everything else with a coordinate
   * @param {string} o.days        the day(s) this waypoint belongs to
   * @param {Array}  [o.tripCoords] [lat,lng] region centroid from the registry
   * @param {string} [o.country]   "USA" | "Canada" | other
   * @param {object} [o.existing]  { lat, lng, verified, source } already on file
   * @param {string} [o.tripDistance] registry `distance` prose, e.g. "~4,300 mi loop"
   * @returns {Array<{level:"stop"|"warn", code:string, msg:string}>}
   */
  function coordChecks(o) {
    const out = [];
    const { name, lat, lng } = o;
    const others = o.others || [];

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return [{ level: "stop", code: "nan", msg: "Not two numbers." }];
    }
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      return [{ level: "stop", code: "range", msg: `${lat}, ${lng} is off the planet.` }];
    }

    const country = o.country || "USA";
    const inAmericas = country === "USA" || country === "Canada";

    if (inAmericas && lng > 0) {
      const swapped = lat < 0 && Math.abs(lat) > 24;
      out.push(swapped
        ? { level: "stop", code: "swapped", msg: "Latitude and longitude look swapped — in North America longitude is the negative one." }
        : { level: "stop", code: "sign", msg: `Longitude ${lng} is positive. In North America it should be negative — this pin is in Asia.` });
    }

    const p = Math.min(precisionOf(lat), precisionOf(lng));
    if (p <= 2) {
      const slop = p === 0 ? "~111 km" : p === 1 ? "~11 km" : "~1.1 km";
      out.push({ level: "warn", code: "precision", msg: `Only ${p} decimal place(s) — that's ${slop} of slop. Read it off a map rather than rounding.` });
    }

    if (Array.isArray(o.tripCoords) && o.tripCoords.length === 2) {
      const km = haversineKm([lat, lng], o.tripCoords);
      const limit = maxRadiusKm(o.tripDistance);
      if (km > limit.stop) {
        out.push({ level: "stop", code: "far", msg: `${Math.round(km)} km from the trip's region centre, which is beyond anything a ${o.tripDistance || "trip of unstated length"} can reach. That is not this trip.` });
      } else if (km > limit.warn) {
        out.push({ level: "warn", code: "far", msg: `${Math.round(km)} km from the trip's region centre — further than a ${o.tripDistance || "trip of unstated length"} would usually reach. Worth confirming.` });
      }
    }

    /* Replacing something already sourced. Distance decides how loud: a near
       match is corroboration and worth keeping as a note, a far one is the
       interesting case and must not go through on a stray click. */
    const ex = o.existing;
    if (ex && ex.lat != null && ex.lng != null) {
      const km = haversineKm([lat, lng], [ex.lat, ex.lng]);
      const m = Math.round(km * 1000);
      const src = ex.source ? `"${ex.source}"` : "an unnamed source";
      if (m <= 50) {
        out.push({ level: "warn", code: "corroborates", msg: `Matches the existing pin to ${m} m. That is corroboration, not a correction — keep the stronger source (${src}) and record the agreement instead of overwriting.` });
      } else if (m <= 500) {
        out.push({ level: "confirm", code: "replace", msg: `${m} m from the existing coordinate, which came from ${src}. Replacing it downgrades the provenance to whatever you type here.` });
      } else {
        out.push({ level: "confirm", code: "replace-far", msg: `${m} m from the existing coordinate, which came from ${src}. That is far enough that one of the two is about a different place — worth resolving rather than overwriting.` });
      }
    }

    for (const other of others) {
      if (other.name === name || other.lat == null || other.lng == null) continue;
      if (other.lat === lat && other.lng === lng) {
        out.push({ level: "stop", code: "duplicate", msg: `Identical to "${other.name}" — the paste probably didn't refresh.` });
        continue;
      }
      if (o.days && other.days && other.days === o.days) {
        const km = haversineKm([lat, lng], [other.lat, other.lng]);
        if (km > 150) {
          out.push({ level: "warn", code: "split", msg: `${Math.round(km)} km from "${other.name}", which is on the same day (${o.days}).` });
        }
      }
    }
    return out;
  }

  root.coordChecks = coordChecks;
  root.coordMaxRadiusKm = maxRadiusKm;
  root.parseTripDistanceKm = parseTripDistanceKm;
  root.coordPrecisionOf = precisionOf;
  root.coordHaversineKm = haversineKm;
})(typeof globalThis !== "undefined" ? globalThis : this);
