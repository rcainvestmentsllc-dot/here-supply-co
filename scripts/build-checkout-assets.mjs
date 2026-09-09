import { mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("/Users/chrisavera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.cjs");

const root = path.resolve(".");
const outputDir = path.join(root, "public/assets/brand");
await mkdir(outputDir, { recursive: true });

const panelSources = [
  "public/assets/course/photo/movement-return-v1.jpg",
  "public/assets/course/photo/movement-lead-v1.jpg",
  "public/assets/course/photo/movement-keep-v4.jpg",
];

const panels = await Promise.all(panelSources.map(async (source) => {
  return sharp(path.join(root, source))
    .resize(400, 610, { fit: "cover", position: "attention" })
    .jpeg({ quality: 91 })
    .toBuffer();
}));

const coverType = Buffer.from(`<svg width="1200" height="590" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="590" fill="#092f3c"/>
  <text x="70" y="208" fill="#fff8ec" font-family="Futura, 'Avenir Next Condensed', Arial, sans-serif" font-size="94" font-weight="700" letter-spacing="-1">ALL THE WAY</text>
  <text x="70" y="310" fill="#fff8ec" font-family="Futura, 'Avenir Next Condensed', Arial, sans-serif" font-size="94" font-weight="700" letter-spacing="-1">HERE</text>
  <text x="73" y="383" fill="#d9eeef" font-family="'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="27">The complete course for coming back to the life in front of you.</text>
  <path d="M73 438h648" stroke="#21859d" stroke-width="10"/>
  <path d="M731 438h222" stroke="#df5c3f" stroke-width="10"/>
  <text x="73" y="514" fill="#fff8ec" font-family="'Avenir Next', 'Helvetica Neue', Arial, sans-serif" font-size="23" font-weight="700" letter-spacing="2">ATTENTION RESET  •  9 VISUAL LESSONS  •  16-PAGE WORKBOOK</text>
</svg>`);

await sharp({ create: { width: 1200, height: 1200, channels: 3, background: "#092f3c" } })
  .composite([
    { input: panels[0], left: 0, top: 0 },
    { input: panels[1], left: 400, top: 0 },
    { input: panels[2], left: 800, top: 0 },
    { input: Buffer.from('<svg width="1200" height="610"><path d="M400 0v610M800 0v610" stroke="#fbf7ef" stroke-width="8"/></svg>'), left: 0, top: 0 },
    { input: coverType, left: 0, top: 610 },
    { input: await sharp(path.join(outputDir, "here-supply-co-logo-inverse-v2.svg")).resize({ width: 190 }).png().toBuffer(), left: 73, top: 640 },
  ])
  .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
  .toFile(path.join(outputDir, "all-the-way-here-checkout.jpg"));

const wordmark = await readFile(path.join(outputDir, "here-supply-co-logo-v2.svg"));
await sharp(wordmark)
  .resize({ width: 720 })
  .png()
  .toFile(path.join(outputDir, "here-supply-co-checkout-logo.png"));

console.log("Built the Here Supply Co. checkout logo and All the Way Here product image.");
