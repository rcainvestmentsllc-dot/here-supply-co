import { readdir, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("/Users/chrisavera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.cjs");

const sourceDir = path.resolve("public/assets/course/art");
const outputDir = path.resolve(".qa");
const columns = 3;
const cardWidth = 500;
const imageHeight = 282;
const labelHeight = 54;
const gap = 18;
const background = "#18231f";

await mkdir(outputDir, { recursive: true });

const allFiles = (await readdir(sourceDir))
  .filter((file) => /\.(?:jpe?g|png)$/i.test(file))
  .sort();

const groups = {
  "anchors-and-problems": allFiles.filter((file) => /^(?:lesson|problem|emotional)-/.test(file)),
  "details-and-modules": allFiles.filter((file) => /^(?:detail|module)-/.test(file)),
};

for (const [name, files] of Object.entries(groups)) {
  const rows = Math.ceil(files.length / columns);
  const width = columns * cardWidth + (columns + 1) * gap;
  const height = rows * (imageHeight + labelHeight) + (rows + 1) * gap;
  const composites = [];

  for (const [index, file] of files.entries()) {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const left = gap + column * (cardWidth + gap);
    const top = gap + row * (imageHeight + labelHeight + gap);
    const image = await sharp(path.join(sourceDir, file))
      .resize(cardWidth, imageHeight, { fit: "cover", position: "attention" })
      .jpeg({ quality: 86 })
      .toBuffer();
    const escaped = file.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    const label = Buffer.from(`<svg width="${cardWidth}" height="${labelHeight}"><rect width="100%" height="100%" fill="#f0e6d2"/><text x="16" y="32" fill="#18231f" font-family="Arial, sans-serif" font-size="17" font-weight="700">${escaped}</text></svg>`);
    composites.push({ input: image, left, top });
    composites.push({ input: label, left, top: top + imageHeight });
  }

  await sharp({ create: { width, height, channels: 3, background } })
    .composite(composites)
    .jpeg({ quality: 88 })
    .toFile(path.join(outputDir, `${name}.jpg`));
}

console.log(`Created ${Object.keys(groups).length} course-art review sheets in ${outputDir}`);
