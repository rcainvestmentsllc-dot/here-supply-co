/**
 * Collapse the site's accumulated colour literals onto one token palette.
 *
 * globals.css carries 326 distinct hex values and home.module.css another 95,
 * the residue of three different palettes layered over each other. This maps
 * every literal to its nearest token in CIELAB (perceptual) space, so dark
 * stays dark and warm stays warm, and rewrites the files.
 *
 * Run with --dry to print the mapping without touching anything.
 */
import { readFileSync, writeFileSync } from "fs";

const TOKENS = {
  "--hsc-ink": "#0b2530",
  "--hsc-ink-soft": "#1b3a44",
  "--hsc-copy": "#4a5f66",
  "--hsc-quiet": "#8ea6ad",
  "--hsc-paper": "#f2ece1",
  "--hsc-paper-raised": "#f8f3ea",
  "--hsc-sand": "#e3d9c8",
  "--hsc-mist": "#dfe7e6",
  "--hsc-forest": "#14313c",
  "--hsc-forest-deep": "#081d26",
  "--hsc-teal": "#2f7180",
  "--hsc-teal-soft": "#cfe0e2",
  "--hsc-iron": "#a8503a",
  "--hsc-iron-deep": "#8f4230",
  "--hsc-brass": "#b8974e",
  "--hsc-white": "#ffffff",
  "--hsc-black": "#000000",
};

const hexToRgb = (h) => {
  h = h.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

function rgbToLab([r, g, b]) {
  let [x, y, z] = [r, g, b].map((v) => {
    v /= 255;
    return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
  });
  // sRGB D65 -> XYZ
  const X = (x * 0.4124 + y * 0.3576 + z * 0.1805) / 0.95047;
  const Y = (x * 0.2126 + y * 0.7152 + z * 0.0722) / 1.0;
  const Z = (x * 0.0193 + y * 0.1192 + z * 0.9505) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const [fx, fy, fz] = [f(X), f(Y), f(Z)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

const tokenLab = Object.entries(TOKENS).map(([name, hex]) => ({
  name,
  hex,
  lab: rgbToLab(hexToRgb(hex)),
}));

function nearest(hex) {
  const lab = rgbToLab(hexToRgb(hex));
  let best = tokenLab[0];
  let bestD = Infinity;
  for (const t of tokenLab) {
    const d = dist(lab, t.lab);
    if (d < bestD) { bestD = d; best = t; }
  }
  return { ...best, delta: bestD };
}

const dry = process.argv.includes("--dry");
const files = ["app/globals.css", "app/home.module.css"];

const tally = new Map();
for (const file of files) {
  const css = readFileSync(file, "utf8");
  for (const m of css.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)) {
    const hex = m[0].toLowerCase();
    tally.set(hex, (tally.get(hex) ?? 0) + 1);
  }
}

const rows = [...tally.entries()]
  .map(([hex, count]) => {
    const t = nearest(hex);
    return { hex, count, name: t.name, tokenHex: t.hex, delta: t.delta };
  })
  .sort((a, b) => b.count - a.count);

console.log(`distinct literals: ${rows.length}`);
console.log(`total occurrences: ${rows.reduce((n, r) => n + r.count, 0)}`);
console.log(`\nfurthest 12 matches (largest perceptual shift — check these):`);
[...rows].sort((a, b) => b.delta - a.delta).slice(0, 12)
  .forEach((r) => console.log(`  ${r.hex} x${String(r.count).padStart(3)} -> ${r.name.padEnd(20)} ΔE ${r.delta.toFixed(1)}`));
console.log(`\ntop 20 by usage:`);
rows.slice(0, 20).forEach((r) =>
  console.log(`  ${r.hex} x${String(r.count).padStart(3)} -> ${r.name.padEnd(20)} ΔE ${r.delta.toFixed(1)}`)
);

if (dry) { console.log("\n(dry run — nothing written)"); process.exit(0); }

const map = new Map(rows.map((r) => [r.hex, r.name]));
for (const file of files) {
  let css = readFileSync(file, "utf8");
  css = css.replace(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g, (m) => {
    const token = map.get(m.toLowerCase());
    return token ? `var(${token})` : m;
  });
  writeFileSync(file, css);
  console.log(`rewrote ${file}`);
}
