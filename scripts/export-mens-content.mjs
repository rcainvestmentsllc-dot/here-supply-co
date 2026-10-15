// Writes the men's edition text to tmp/pdfs/mens-content.json so the men's
// course book reads the same words the website shows.
//   node --experimental-strip-types scripts/export-mens-content.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

mkdirSync("tmp/pdfs", { recursive: true });
// Node needs the .ts extension on relative imports; the app does not use one.
const source = readFileSync("app/men/men-course.ts", "utf8").replace(
  /from "\.\.\/course-content"/,
  `from ${JSON.stringify(pathToFileURL(resolve("app/course-content.ts")).href)}`,
);
writeFileSync("tmp/pdfs/men-course.tmp.ts", source);
const m = await import(pathToFileURL(resolve("tmp/pdfs/men-course.tmp.ts")).href);
const c = await import(pathToFileURL(resolve("app/course-content.ts")).href);
const out = {};
for (const [k, v] of Object.entries(m)) if (typeof v !== "function") out[k] = v;
writeFileSync("tmp/pdfs/mens-content.json", JSON.stringify(out, null, 2));
console.log("exported", Object.keys(out).join(", "));
