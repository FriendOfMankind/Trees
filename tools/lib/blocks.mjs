/* ==========================================================================
   blocks.mjs — render and splice the generated route/trail blocks in data.js.

   Split out of the CLIs so this can be tested without a network. It had to be:
   route.mjs crashed on its first successful run with "Cannot access 'START'
   before initialization" — a const declared below the call site of a hoisted
   function — and no test had ever reached that line, because every run in
   development failed at the routing request first and exited before the write.
   The write path is the part that touches your files. It gets tested.
   ========================================================================== */

/** Where a top-level array lives in a trip file, by bracket counting.
    Used to place a generated block after the waypoints when the marker
    comments aren't there yet. */
export function arraySpan(text, name) {
  const open = new RegExp(`(?:^|\\n)\\s*(?:${name}:|const\\s+${name.toUpperCase()}\\s*=)\\s*\\[`).exec(text);
  if (!open) return null;
  const start = open.index + open[0].length - 1;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === "[") depth++;
    else if (text[i] === "]") { if (--depth === 0) return { start, end: i + 1 }; }
  }
  return null;
}

const entry = (r) =>
  `    {\n` +
  `      id: ${JSON.stringify(r.id)},\n` +
  `      label: ${JSON.stringify(r.label)},\n` +
  `      mode: ${JSON.stringify(r.mode)},\n` +
  `      days: ${JSON.stringify(r.days || "")},\n` +
  `      distanceMi: ${r.distanceMi},\n` +
  (r.durationMin != null ? `      durationMin: ${r.durationMin},\n` : "") +
  `      source: ${JSON.stringify(r.source)},\n` +
  `      generated: ${JSON.stringify(r.generated)},\n` +
  (Array.isArray(r.geometry)
    ? `      geometry: [\n${r.geometry.map((g) => `        ${JSON.stringify(g)},`).join("\n")}\n      ],\n`
    : `      geometry: ${JSON.stringify(r.geometry)},\n`) +
  `    },`;

/** The full block, marker comments included. `kind` is ROUTES or TRAILS. */
export function renderBlock(kind, field, items) {
  return `  // >>> ${kind} — generated. Re-run the tool rather than hand-editing;
  // the next --write overwrites everything between these markers.
  ${field}: [
${items.map(entry).join("\n")}
  ],
  // <<< ${kind}`;
}

/** Put the block into `source`, replacing an existing one or inserting a new
    one after the waypoints array. Returns { text, how } or null if there is
    nowhere sensible to put it. */
export function spliceBlock(source, kind, block) {
  const START = `  // >>> ${kind}`;
  const END = `  // <<< ${kind}`;
  const i = source.indexOf(START);
  const j = source.indexOf(END);

  if (i !== -1 && j !== -1) {
    return { text: source.slice(0, i) + block + source.slice(j + END.length), how: "replaced" };
  }

  // First time for this trip: place it just after the waypoints, which is
  // where a reader would look for it. Printing the block and asking for a
  // paste was a step that did not need to exist.
  const wp = arraySpan(source, "waypoints");
  if (!wp) return null;
  const after = source.indexOf("\n", wp.end);
  const at = after === -1 ? wp.end : after + 1;
  return { text: source.slice(0, at) + block + "\n" + source.slice(at), how: "inserted" };
}
