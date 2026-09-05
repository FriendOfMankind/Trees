/* ==========================================================================
   themes.js — palette presets. A trip picks one by name (TRIP.theme = "desert")
   or supplies its own object with the same keys.

   Pick by terrain, not by country. The point is that when you open a page you
   know within half a second whether you're looking at lava, granite or sand.

   `basecamp` is the exception: it is the hub's own palette and belongs to no
   terrain. Don't assign it to a trip.
   ========================================================================== */

const THEMES = {
  // The hub's own skin. Deliberately NOT a terrain — the hub is an index, not
  // a place. Slate and brass, so the trip cards' terrain colors are the only
  // saturated thing on the page. Trips should not use this.
  basecamp: {
    c950: "#12171c", c900: "#1b232b", c800: "#2b3742", c700: "#3c4b59",
    c500: "#6d8193", c300: "#a8bcca",
    sand: "#e8d9b4", sandDim: "#b8a87e",
    paper: "#f6f5f2", ink: "#1b2026", inkDim: "#58636d", line: "#d9d6ce",
  },

  // Reef, deep water, wet volcanic coast. (Maui)
  ocean: {
    c950: "#071f21", c900: "#0a2e31", c800: "#0f5257", c700: "#146b71",
    c500: "#1f8f96", c300: "#6fc4c9",
    sand: "#e8dfc8", sandDim: "#cbc0a1",
    paper: "#fbfaf6", ink: "#16211f", inkDim: "#4a5a57", line: "#dcd4bd",
  },
  // Red rock, slot canyons, high desert.
  desert: {
    c950: "#2a1108", c900: "#3d1a0c", c800: "#6b2d12", c700: "#8c3d18",
    c500: "#c25a26", c300: "#e8a87c",
    sand: "#f2e2cc", sandDim: "#d9bf9e",
    paper: "#fdf8f1", ink: "#2a1a12", inkDim: "#6b5647", line: "#e6d4bd",
  },
  // Granite, glacier, above treeline.
  alpine: {
    c950: "#0d1620", c900: "#142433", c800: "#1e3a52", c700: "#2b5273",
    c500: "#4682ad", c300: "#9dc6e0",
    sand: "#e3e9ee", sandDim: "#b9c6d1",
    paper: "#f8fafb", ink: "#16202a", inkDim: "#4c5c6b", line: "#d3dde5",
  },
  // Temperate rainforest, big trees, moss.
  forest: {
    c950: "#0a1710", c900: "#10251a", c800: "#1b4230", c700: "#255a41",
    c500: "#3a8a63", c300: "#8ac9a8",
    sand: "#e4e9dc", sandDim: "#bfc9b3",
    paper: "#f9faf6", ink: "#14211a", inkDim: "#4a5a50", line: "#d7ddcc",
  },
  // Dark sky, aurora, winter, anything where the point is night.
  night: {
    c950: "#0a0c1f", c900: "#12162e", c800: "#1e2450", c700: "#2d3670",
    c500: "#4c58a8", c300: "#a3aae0",
    sand: "#e6e3f0", sandDim: "#b9b4cf",
    paper: "#f9f8fd", ink: "#17162a", inkDim: "#514e6b", line: "#dbd7e6",
  },
  // Peak color week. Hardwood ridges, rust and amber, low autumn light.
  autumn: {
    c950: "#241005", c900: "#3a1a09", c800: "#6e3410", c700: "#8f4a15",
    c500: "#c47a24", c300: "#e8bb7a",
    sand: "#f3e6d2", sandDim: "#d6bd9c",
    paper: "#fdf9f3", ink: "#241a11", inkDim: "#655547", line: "#e5d6c0",
  },
  // Grassland, savanna, dry heat, golden light.
  savanna: {
    c950: "#241c07", c900: "#382c0b", c800: "#5c4a12", c700: "#7a641c",
    c500: "#ab8f2c", c300: "#ddc678",
    sand: "#f0e7cf", sandDim: "#d3c6a2",
    paper: "#fdfaf2", ink: "#241f12", inkDim: "#635a45", line: "#e3d9bd",
  },
};

/** Resolve a theme name or inline object into a palette. Falls back to basecamp. */
function resolveTheme(theme) {
  if (theme && typeof theme === "object") return Object.assign({}, THEMES.basecamp, theme);
  return THEMES[theme] || THEMES.basecamp;
}

/** Write a palette onto an element's inline custom properties. */
function applyTheme(theme, el) {
  const p = resolveTheme(theme);
  const target = el || document.documentElement;
  const map = {
    "--t-950": p.c950, "--t-900": p.c900, "--t-800": p.c800, "--t-700": p.c700,
    "--t-500": p.c500, "--t-300": p.c300,
    "--t-sand": p.sand, "--t-sand-dim": p.sandDim,
    "--t-paper": p.paper, "--t-ink": p.ink, "--t-ink-dim": p.inkDim, "--t-line": p.line,
  };
  Object.keys(map).forEach((k) => target.style.setProperty(k, map[k]));
  return p;
}

/** Per-card accent vars, so a hub card can wear a trip's colors without
    re-skinning the whole page. */
function cardThemeStyle(theme) {
  const p = resolveTheme(theme);
  return `--c-800:${p.c800};--c-700:${p.c700};--c-500:${p.c500}`;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { THEMES, resolveTheme };
}
