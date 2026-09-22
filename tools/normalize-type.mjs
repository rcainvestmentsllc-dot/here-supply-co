/**
 * Bring the legacy type scale down to the design system's.
 *
 * The old sheet ran headlines up to 124px and jumped from 9px labels
 * straight to display sizes with little in between. That is why long
 * headlines wrap into four short lines and why the page reads as shouty
 * rather than composed.
 *
 * This rescales every `clamp(min, vw, max)` font-size: the max is pulled
 * toward the system's ceiling, and the min/vw are scaled by the same factor
 * so the responsive curve keeps its shape. Sizes already inside the system
 * are left alone.
 */
import { readFileSync, writeFileSync } from "fs";

const CEILING = 68;   // display maximum, matches --hsc-t-display
const KNEE = 34;      // below this, leave alone entirely

/** Map an old max size to a new one: compress the top of the range. */
function rescale(maxPx) {
  if (maxPx <= KNEE) return maxPx;
  if (maxPx <= 46) return Math.round(maxPx * 0.92);
  if (maxPx <= 64) return Math.round(maxPx * 0.84);
  if (maxPx <= 90) return Math.round(Math.min(CEILING, maxPx * 0.74));
  return CEILING;
}

const files = ["app/home.module.css", "app/globals.css"];
let changed = 0;
const samples = [];

for (const file of files) {
  let css = readFileSync(file, "utf8");
  css = css.replace(
    /font-size:\s*clamp\(\s*([\d.]+)px\s*,\s*([\d.]+)vw\s*,\s*([\d.]+)px\s*\)/g,
    (whole, min, vw, max) => {
      const oldMax = parseFloat(max);
      const newMax = rescale(oldMax);
      if (newMax === oldMax) return whole;
      const factor = newMax / oldMax;
      const newMin = Math.round(parseFloat(min) * factor);
      const newVw = +(parseFloat(vw) * factor).toFixed(2);
      changed++;
      if (samples.length < 10) samples.push(`${min}/${vw}/${max} -> ${newMin}/${newVw}/${newMax}`);
      return `font-size:clamp(${newMin}px,${newVw}vw,${newMax}px)`;
    }
  );
  writeFileSync(file, css);
}

console.log(`rescaled ${changed} clamped font sizes`);
samples.forEach((s) => console.log("  " + s));
