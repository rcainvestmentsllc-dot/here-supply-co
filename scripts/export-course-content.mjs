// Writes the course text to tmp/pdfs/course-content.json so the print
// builders (Python) read the same words the website shows.
import { writeFileSync, mkdirSync } from "node:fs";
const c = await import("../app/course-content.ts");
mkdirSync("tmp/pdfs", { recursive: true });
const out = {};
for (const [k, v] of Object.entries(c)) if (typeof v !== "function") out[k] = v;
writeFileSync("tmp/pdfs/course-content.json", JSON.stringify(out, null, 2));
console.log("exported", Object.keys(out).join(", "));
