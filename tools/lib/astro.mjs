/* ==========================================================================
   astro.mjs — sun and moon, computed.

   Every sun/moon table on this site was typed by hand, and one of them
   carries the note "recomputed; the plan said 6:52" — a four-minute error
   caught by luck. Sunrise is not a fact anyone should be transcribing: it is
   determined by a date, a latitude, a longitude and an elevation, and it is
   the same every time you work it out. Computing it is the opposite of
   inventing it.

   What this does NOT do is guess a location. It takes explicit coordinates
   and says which ones it used, because a sunset time is only as good as the
   position it was computed for.

   Sun: NOAA's solar position algorithm (the one behind their online
   calculator). Accurate to well under a minute for these latitudes.

   Moon: phase and illuminated fraction are from the standard low-precision
   series and are good to a fraction of a percent. Moonrise and moonset use a
   truncated lunar ephemeris (Montenbruck & Pfleger's low-precision moon, with
   rise/set found by interpolating altitude over the day) — good to a few
   minutes, which is fine for "when does the sky go dark" and is labelled
   approximate everywhere it surfaces.
   ========================================================================== */

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

/* ---------------- Time ---------------- */

/** Julian day for a UTC instant. */
export function toJulian(date) { return date.getTime() / 86400000 + 2440587.5; }
export function fromJulian(j) { return new Date((j - 2440587.5) * 86400000); }

/** Days since J2000.0. */
function days(date) { return toJulian(date) - 2451545.0; }

/* ---------------- Sun ---------------- */

/** Geometric solar position: declination and the equation of time, in degrees
    and minutes respectively. NOAA's formulation. */
function solar(d) {
  const T = d / 36525;                                     // Julian centuries
  const L0 = mod360(280.46646 + T * (36000.76983 + T * 0.0003032));
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
  const C = Math.sin(M * RAD) * (1.914602 - T * (0.004817 + 0.000014 * T))
          + Math.sin(2 * M * RAD) * (0.019993 - 0.000101 * T)
          + Math.sin(3 * M * RAD) * 0.000289;
  const trueLong = L0 + C;
  const omega = 125.04 - 1934.136 * T;
  const appLong = trueLong - 0.00569 - 0.00478 * Math.sin(omega * RAD);
  const seconds = 21.448 - T * (46.815 + T * (0.00059 - T * 0.001813));
  const e0 = 23 + (26 + seconds / 60) / 60;
  const eps = e0 + 0.00256 * Math.cos(omega * RAD);
  const decl = Math.asin(Math.sin(eps * RAD) * Math.sin(appLong * RAD)) * DEG;

  const y = Math.tan((eps / 2) * RAD) ** 2;
  const eqTime = 4 * DEG * (
    y * Math.sin(2 * L0 * RAD)
    - 2 * e * Math.sin(M * RAD)
    + 4 * e * y * Math.sin(M * RAD) * Math.cos(2 * L0 * RAD)
    - 0.5 * y * y * Math.sin(4 * L0 * RAD)
    - 1.25 * e * e * Math.sin(2 * M * RAD)
  );
  return { decl, eqTime };
}

function mod360(x) { return ((x % 360) + 360) % 360; }

/** Horizon dip from elevation, in degrees. At 10,000 ft the sun rises
    about four minutes earlier than it does at sea level on the same spot —
    which is the entire point of standing on a summit at dawn. */
export function horizonDip(elevationM) {
  if (!elevationM || elevationM <= 0) return 0;
  return (1.76 * Math.sqrt(elevationM)) / 60;
}

/**
 * Sun event times for one calendar day, as minutes after UTC midnight.
 * `zenith` is the solar zenith angle that defines the event:
 *   90.833  — sunrise/sunset (disc edge, refraction included)
 *   96      — civil twilight (first light / full dark)
 * Returns null for an event that doesn't happen (polar day or night).
 */
function sunEvent(dateUTC, lat, lng, zenith, rising) {
  /* Iterate once: the declination at local noon is a better input than the
     one at UTC midnight, and one pass gets us inside a couple of seconds. */
  let noonGuess = 720 - 4 * lng;
  for (let i = 0; i < 2; i++) {
    const d = days(dateUTC) + noonGuess / 1440;
    const { decl, eqTime } = solar(d);
    const cosH = (Math.cos(zenith * RAD) - Math.sin(lat * RAD) * Math.sin(decl * RAD))
               / (Math.cos(lat * RAD) * Math.cos(decl * RAD));
    if (cosH > 1 || cosH < -1) return null;
    const H = Math.acos(cosH) * DEG;
    noonGuess = 720 - 4 * (lng + (rising ? H : -H)) - eqTime;
  }
  return noonGuess;
}

function solarNoon(dateUTC, lng) {
  const { eqTime } = solar(days(dateUTC) + (720 - 4 * lng) / 1440);
  return 720 - 4 * lng - eqTime;
}

/**
 * Every sun time for one day at one place.
 * `date` is a UTC calendar day; `elevationM` is optional.
 */
export function sunTimes(date, lat, lng, elevationM) {
  const z = 90.833 + horizonDip(elevationM);
  return {
    firstLight: sunEvent(date, lat, lng, 96, true),      // civil dawn
    sunrise: sunEvent(date, lat, lng, z, true),
    noon: solarNoon(date, lng),
    sunset: sunEvent(date, lat, lng, z, false),
    dark: sunEvent(date, lat, lng, 96, false),           // civil dusk
  };
}

/* ---------------- Moon ---------------- */

/** Geocentric ecliptic position of the moon, low precision (Montenbruck &
    Pfleger). Good to roughly an arcminute — minutes, not seconds, on a
    rise time. */
function moonEcliptic(T) {
  const L0 = frac(0.606433 + 1336.855225 * T);            // mean longitude, revolutions
  const l = 2 * Math.PI * frac(0.374897 + 1325.552410 * T); // moon's mean anomaly
  const ls = 2 * Math.PI * frac(0.993133 + 99.997361 * T);  // sun's mean anomaly
  const D = 2 * Math.PI * frac(0.827361 + 1236.853086 * T); // mean elongation
  const F = 2 * Math.PI * frac(0.259086 + 1342.227825 * T); // argument of latitude

  const dL = 22640 * Math.sin(l) - 4586 * Math.sin(l - 2 * D) + 2370 * Math.sin(2 * D)
    + 769 * Math.sin(2 * l) - 668 * Math.sin(ls) - 412 * Math.sin(2 * F)
    - 212 * Math.sin(2 * l - 2 * D) - 206 * Math.sin(l + ls - 2 * D)
    + 192 * Math.sin(l + 2 * D) - 165 * Math.sin(ls - 2 * D) - 125 * Math.sin(D)
    - 110 * Math.sin(l + ls) + 148 * Math.sin(l - ls) - 55 * Math.sin(2 * F - 2 * D);

  const S = F + (dL + 412 * Math.sin(2 * F) + 541 * Math.sin(ls)) / 206264.8;
  const h = F - 2 * D;
  const N = -526 * Math.sin(h) + 44 * Math.sin(l + h) - 31 * Math.sin(-l + h)
    - 23 * Math.sin(ls + h) + 11 * Math.sin(-ls + h) - 25 * Math.sin(-2 * l + F)
    + 21 * Math.sin(-l + F);

  const lambda = 2 * Math.PI * frac(L0 + dL / 1296000);
  const beta = (18520 * Math.sin(S) + N) / 206264.8;
  return { lambda, beta };
}

function frac(x) { return x - Math.floor(x); }

/** Moon altitude in degrees at a UTC instant. */
function moonAltitude(date, lat, lng) {
  const T = days(date) / 36525;
  const { lambda, beta } = moonEcliptic(T);
  const eps = (23.43929111 - 0.013004167 * (T * 100)) * RAD;

  const ra = Math.atan2(Math.sin(lambda) * Math.cos(eps) - Math.tan(beta) * Math.sin(eps), Math.cos(lambda));
  const dec = Math.asin(Math.sin(beta) * Math.cos(eps) + Math.cos(beta) * Math.sin(eps) * Math.sin(lambda));

  const H = (greenwichSiderealDeg(date) + lng) * RAD - ra;
  return Math.asin(
    Math.sin(lat * RAD) * Math.sin(dec) + Math.cos(lat * RAD) * Math.cos(dec) * Math.cos(H)
  ) * DEG;
}

function greenwichSiderealDeg(date) {
  const d = days(date);
  return mod360(280.46061837 + 360.98564736629 * d);
}

/**
 * Moonrise and moonset for a UTC calendar day, as minutes after UTC midnight,
 * or null when the moon doesn't cross the horizon that day (which happens
 * roughly once a month and is not an error).
 *
 * Method: sample altitude hourly, find sign changes against the standard
 * -0.583° horizon (refraction plus the moon's semidiameter), then bisect.
 */
export function moonRiseSet(date, lat, lng, elevationM) {
  /* Same horizon as the sun: standard refraction + semidiameter, pushed down
     by the dip from any elevation. From a 10,000 ft summit the moon sets
     several minutes later than it does at the coast, and a dark-sky window is
     exactly the kind of plan that difference ruins. */
  const H0 = -0.583 - horizonDip(elevationM);
  const at = (min) => moonAltitude(new Date(date.getTime() + min * 60000), lat, lng) - H0;

  let rise = null, set = null;
  let prev = at(0);
  for (let m = 60; m <= 1440; m += 60) {
    const cur = at(m);
    if (prev < 0 && cur >= 0) rise = bisect(at, m - 60, m);
    if (prev >= 0 && cur < 0) set = bisect(at, m - 60, m);
    prev = cur;
  }
  return { rise, set };
}

function bisect(f, lo, hi) {
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid; else lo = mid;
  }
  return (lo + hi) / 2;
}

/**
 * Moon phase at a UTC instant.
 * `fraction` is the illuminated fraction, 0–1. `age` is days since new moon.
 * `waxing` says which way it's going, which is what decides whether the dark
 * window is before dawn or after dusk.
 */
export function moonPhase(date) {
  const T = days(date) / 36525;
  const { lambda } = moonEcliptic(T);
  const d = days(date);
  const sunLong = mod360(280.46646 + 0.9856474 * d) * RAD;
  const elong = mod360((lambda - sunLong) * DEG);
  const fraction = (1 - Math.cos(elong * RAD)) / 2;
  return {
    fraction,
    percent: Math.round(fraction * 1000) / 10,
    age: (elong / 360) * 29.530588853,
    waxing: elong < 180,
    name: phaseName(elong, fraction),
  };
}

function phaseName(elongDeg, fraction) {
  if (fraction < 0.02) return "New moon";
  if (fraction > 0.98) return "Full moon";
  const waxing = elongDeg < 180;
  if (Math.abs(fraction - 0.5) < 0.06) return waxing ? "First quarter" : "Last quarter";
  if (fraction < 0.5) return waxing ? "Waxing crescent" : "Waning crescent";
  return waxing ? "Waxing gibbous" : "Waning gibbous";
}

/* ---------------- Formatting ---------------- */

/** Minutes-after-UTC-midnight on `date` → a wall clock string in `tz`. */
export function fmtLocal(date, minutesUTC, tz, opts) {
  if (minutesUTC == null) return null;
  const inst = new Date(date.getTime() + minutesUTC * 60000);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour: "numeric", minute: "2-digit",
    hour12: !(opts && opts.hour24),
  }).format(inst);
}

/** True when the instant lands on a different calendar day in `tz` than the
    day the table is labelled with — a moonset at 00:40 belongs to the next
    morning and saying so out loud avoids a very bad kind of alarm.

    The comparison is against `date`'s own UTC calendar day, which is what the
    row is labelled with. Comparing against the *local* rendering of UTC
    midnight would be wrong everywhere west of Greenwich, since in Hawaii that
    instant is already 2 PM the previous afternoon — every Hawaii moonset
    would have been stamped "(next day)". */
export function localDayOffset(date, minutesUTC, tz) {
  if (minutesUTC == null) return 0;
  const inst = new Date(date.getTime() + minutesUTC * 60000);
  const local = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
  }).format(inst);
  const target = date.toISOString().slice(0, 10);
  return local === target ? 0 : (local > target ? 1 : -1);
}
