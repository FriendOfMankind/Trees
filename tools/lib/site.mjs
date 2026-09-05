/* ==========================================================================
   site.mjs — shared helpers for the tools in this folder. Loading the site's
   browser data files from Node is the only awkward part of a no-build-step
   site, so it lives here once instead of in every tool.
   ========================================================================== */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

/** Run browser-ish script files in a sandbox.
    `const` declarations live in the context's lexical scope rather than on the
    sandbox object, so values are read back by evaluating the name. */
export function evalScripts(files) {
  const sandbox = { window: {}, document: { documentElement: { style: { setProperty() {} } } } };
  vm.createContext(sandbox);
  for (const f of files) {
    vm.runInContext(readFileSync(join(ROOT, f), "utf8"), sandbox, { filename: f });
  }
  sandbox.read = (name) =>
    vm.runInContext(`typeof ${name} !== "undefined" ? ${name} : undefined`, sandbox);
  return sandbox;
}

/** The hub's own data: TRIPS, THEMES, PROFILE, GEAR, BOOKING_WINDOWS, … */
export function loadHub() {
  return evalScripts(["js/themes.js", "data/profile.js", "data/trips.js"]);
}

/** Every folder under trips/ that looks like a trip page. */
export function tripSlugs() {
  const dir = join(ROOT, "trips");
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(dir, d.name, "data.js")))
    .map((d) => d.name)
    .sort();
}

/** One trip's window.TRIP_DATA, or null if it won't evaluate. */
export function loadTrip(slug) {
  try {
    return evalScripts(["js/themes.js", `trips/${slug}/data.js`]).window.TRIP_DATA || null;
  } catch (e) {
    return null;
  }
}

/** Parse "YYYY-MM-DD" as a UTC date, so nothing shifts by a timezone. */
export function isoToUTC(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function utcToISO(date) {
  return date.toISOString().slice(0, 10);
}

export function addDays(date, n) {
  return new Date(date.getTime() + n * 86400000);
}
