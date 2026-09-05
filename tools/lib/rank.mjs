/* ==========================================================================
   rank.mjs — decide which of several candidate coordinates is the place.

   Separated from the CLI so it can be tested directly: this is the code that
   chooses what a coordinate IS, and it got two real cases wrong on its first
   run against live data — a school named "Honey Creek" beat the trailhead
   parking, and an arch in Red River Gorge beat the actual Twin Arches 166 km
   away in Big South Fork. Both because every single-member cluster scored
   identically and the winner was whichever candidate came back first.
   ========================================================================== */

import { haversineMeters, spreadMeters } from "./geo.mjs";
import { PROVIDERS } from "./sources.mjs";

/* What an OSM object is tagged as, weighed against what a waypoint is for.
   A trailhead search that lands on a school named "Honey Creek" is not a near
   miss, it is a different kind of thing — and the first real run did exactly
   that. Tag plausibility cannot decide a coordinate on its own, but it is a
   good tiebreak when two candidates are otherwise equal. */
const KIND_GOOD = /^(campground|trailhead|camp_site|camp_pitch|caravan_site|parking|picnic_site|picnic_table|viewpoint|attraction|peak|arch|information|wilderness_hut|ranger_station|park|nature_reserve|protected_area|path|footway|track|hiking|water_point|toilets)$/i;
const KIND_BAD  = /^(school|place_of_worship|fire_station|hospital|police|restaurant|fast_food|fuel|bank|pharmacy|residential|service|house|building|yes|retail|commercial|industrial)$/i;

export function plausibility(c) {
  // Detail strings are shaped differently per provider — OSM writes
  // "way/123 · arch", RIDB writes "Campground · id 232506" — so test every
  // segment rather than assuming the kind is last. Taking only the last one
  // scored every Recreation.gov row as "id 232506", i.e. neutral.
  const parts = String(c.detail || "").split("·").map((x) => x.trim());
  if (parts.some((x) => KIND_GOOD.test(x))) return 1;
  if (parts.some((x) => KIND_BAD.test(x))) return -1;
  return 0;
}

/** Greedy clustering: for every candidate, gather everything within tolerance
    of it, then keep the cluster backed by the most distinct providers. Ties
    fall through, in order, to: an official source, the more plausible kind of
    place, closeness to the anchor, then tightness. Before the last three were
    added every single-member cluster tied at zero and the winner was whichever
    candidate happened to come back first. */
/** Lexicographic compare: first differing element decides. */
export function lexCompare(a, b) {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return a[i] - b[i];
  return 0;
}

export function bestCluster(cands, toleranceM, anchor) {
  let best = null;
  for (const seed of cands) {
    const members = cands.filter((c) => haversineMeters(seed, c) <= toleranceM);
    const providers = new Set(members.map((m) => m.provider));
    const officials = members.filter((m) => PROVIDERS[m.provider]?.official);
    const spread = spreadMeters(members);
    const score = [
      providers.size,
      officials.length,
      Math.max(...members.map(plausibility)),
      -Math.min(...members.map((m) => haversineMeters(anchor, m))),
      -spread,
    ];
    if (!best || lexCompare(score, best.score) > 0) {
      best = { members, providers, officials, spread, score };
    }
  }
  return best;
}

