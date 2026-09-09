import { writeFile, mkdir, copyFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
const require = createRequire(import.meta.url);
const sharp = require("/Users/chrisavera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.cjs");
const output = path.resolve("output/brand/here-supply-co-v2");
await mkdir(output, { recursive: true });
const { data, info } = await sharp(path.join(output, "generated-source.png")).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const palette = ["#092f3c", "#21859d", "#df5c3f", "#f4c550"];
const rgb = palette.map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)));
const category = new Int8Array(width * height).fill(-1);
for (let i = 0; i < category.length; i++) {
  const o = i * channels;
  if (data[o + 3] < 150) continue;
  let best = Infinity;
  rgb.forEach((c, j) => {
    const d = c.reduce((s, n, k) => s + (data[o + k] - n) ** 2, 0);
    if (d < best) { category[i] = j; best = d; }
  });
}
function area(p) { return p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0) / 2; }
function simplify(p, epsilon = 1.6) {
  if (p.length <= 2) return p;
  const a = p[0], b = p.at(-1), dx = b[0] - a[0], dy = b[1] - a[1], length = dx * dx + dy * dy;
  let max = 0, at = 0;
  for (let i = 1; i < p.length - 1; i++) {
    const t = length ? Math.max(0, Math.min(1, ((p[i][0] - a[0]) * dx + (p[i][1] - a[1]) * dy) / length)) : 0;
    const d = Math.hypot(p[i][0] - a[0] - t * dx, p[i][1] - a[1] - t * dy);
    if (d > max) { max = d; at = i; }
  }
  return max > epsilon ? [...simplify(p.slice(0, at + 1), epsilon).slice(0, -1), ...simplify(p.slice(at), epsilon)] : [a, b];
}
const contours = [];
for (let color = 0; color < palette.length; color++) {
  const solid = (x, y) => x >= 0 && y >= 0 && x < width && y < height && category[y * width + x] === color;
  const edges = new Map(), key = (x, y) => y * (width + 1) + x;
  const point = k => [k % (width + 1), Math.floor(k / (width + 1))];
  function edge(x, y, a, b) { const k = key(x, y); if (!edges.has(k)) edges.set(k, []); edges.get(k).push(key(a, b)); }
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    if (!solid(x, y)) continue;
    if (!solid(x, y - 1)) edge(x, y, x + 1, y);
    if (!solid(x + 1, y)) edge(x + 1, y, x + 1, y + 1);
    if (!solid(x, y + 1)) edge(x + 1, y + 1, x, y + 1);
    if (!solid(x - 1, y)) edge(x, y + 1, x, y);
  }
  while (edges.size) {
    const first = edges.keys().next().value;
    let current = first;
    const loop = [];
    do {
      loop.push(point(current));
      const nexts = edges.get(current);
      if (!nexts?.length) throw new Error("Open logo contour");
      const next = nexts.pop();
      if (!nexts.length) edges.delete(current);
      current = next;
    } while (current !== first);
    if (Math.abs(area(loop)) < 60) continue;
    let far = 1, dist = 0;
    loop.forEach((p, i) => { const d = Math.hypot(p[0] - loop[0][0], p[1] - loop[0][1]); if (d > dist) { dist = d; far = i; } });
    const points = [...simplify(loop.slice(0, far + 1)).slice(0, -1), ...simplify([...loop.slice(far), loop[0]]).slice(0, -1)];
    contours.push({ color, points });
  }
}
const all = contours.flatMap(c => c.points);
const x0 = Math.min(...all.map(p => p[0])) - 10, y0 = Math.min(...all.map(p => p[1])) - 10;
const w = Math.max(...all.map(p => p[0])) - x0 + 10, h = Math.max(...all.map(p => p[1])) - y0 + 10;
function smoothPath(points) {
  const p = points.map(([x, y]) => [x - x0, y - y0]);
  const tangent = i => {
    const a = p[(i - 1 + p.length) % p.length], b = p[i], c = p[(i + 1) % p.length];
    const u = [b[0] - a[0], b[1] - a[1]], v = [c[0] - b[0], c[1] - b[1]];
    const cosine = (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v));
    return cosine < 0.4 ? [0, 0] : [(c[0] - a[0]) * 0.13, (c[1] - a[1]) * 0.13];
  };
  const n = x => Number(x.toFixed(2));
  let d = `M${p[0].join(" ")}`;
  for (let i = 0; i < p.length; i++) {
    const j = (i + 1) % p.length, a = p[i], b = p[j];
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const clamp = t => { const f = Math.min(1, length / 3 / (Math.hypot(...t) || 1)); return t.map(v => v * f); };
    const t = clamp(tangent(i)), u = clamp(tangent(j));
    d += `C${n(a[0] + t[0])} ${n(a[1] + t[1])} ${n(b[0] - u[0])} ${n(b[1] - u[1])} ${b.join(" ")}`;
  }
  return `${d}Z`;
}
function paths(colors, onlyEmblem = false) {
  return palette.map((_, color) => {
    const d = contours.filter(c => c.color === color && (!onlyEmblem || Math.max(...c.points.map(p => p[0])) < width * 0.49)).map(c => smoothPath(c.points)).join("");
    return `<path fill="${colors[color]}" fill-rule="evenodd" d="${d}"/>`;
  }).join("");
}
function logo(colors) { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">Here Supply Co.</title><desc id="desc">Ocean-blue hand lettering beside a wave, coastal headland and warm sun. Tools for showing up in real life.</desc>${paths(colors)}</svg>`; }
const inverseColors = ["#fff8ec", "#86ccd1", "#df5c3f", "#f4c550"];
for (const [name, colors] of [["here-supply-co-logo-v2", palette], ["here-supply-co-logo-inverse-v2", inverseColors]]) {
  const svg = logo(colors);
  await writeFile(path.join(output, `${name}.svg`), svg);
  await sharp(Buffer.from(svg)).resize({ width: 2600 }).png().toFile(path.join(output, `${name}.png`));
}
const board = `<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="770"><rect width="1500" height="770" fill="#fff8ec"/><text x="80" y="84" fill="#092f3c" font-family="Arial,sans-serif" font-size="17" letter-spacing="3">HERE SUPPLY CO.</text><text x="80" y="119" fill="#526b72" font-family="Arial,sans-serif" font-size="17">Tools for showing up in real life</text><g transform="translate(95 220) scale(${1310 / w})">${paths(palette)}</g><rect x="80" y="686" width="335" height="8" fill="#21859d"/><rect x="415" y="686" width="335" height="8" fill="#df5c3f"/><rect x="750" y="686" width="335" height="8" fill="#f4c550"/><rect x="1085" y="686" width="335" height="8" fill="#092f3c"/></svg>`;
await sharp(Buffer.from(board)).png().toFile(path.join(output, "here-supply-co-surf-preview.png"));
await writeFile(path.join(output, "asset-info.json"), JSON.stringify({ width: w, height: h, contours: contours.length, palette }, null, 2));
const emblem = contours.filter(c => Math.max(...c.points.map(p => p[0])) < width * 0.49).flatMap(c => c.points);
const ex = Math.min(...emblem.map(p => p[0])) - x0, ey = Math.min(...emblem.map(p => p[1])) - y0;
const ew = Math.max(...emblem.map(p => p[0])) - x0 - ex, eh = Math.max(...emblem.map(p => p[1])) - y0 - ey;
const scale = 58 / ew;
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Here Supply Co."><rect width="64" height="64" rx="10" fill="#fff8ec"/><g transform="translate(${3 - ex * scale} ${(64 - eh * scale) / 2 - ey * scale}) scale(${scale})">${paths(palette, true)}</g></svg>`;
await writeFile(path.join(output, "here-supply-co-icon-v2.svg"), icon);
for (const [file, size] of [["favicon-32x32.png", 32], ["apple-touch-icon.png", 180]]) await sharp(Buffer.from(icon)).resize(size, size).png().toFile(path.join(output, file));
if (process.argv.includes("--install")) {
  const assets = path.resolve("public/assets/brand");
  for (const name of ["here-supply-co-logo-v2", "here-supply-co-logo-inverse-v2"]) {
    for (const ext of ["svg", "png"]) await copyFile(path.join(output, `${name}.${ext}`), path.join(assets, `${name}.${ext}`));
  }
  await copyFile(path.join(output, "here-supply-co-icon-v2.svg"), path.resolve("public/favicon.svg"));
  for (const file of ["favicon-32x32.png", "apple-touch-icon.png"]) await copyFile(path.join(output, file), path.resolve("public", file));
}
console.log(JSON.stringify({ width: w, height: h, contours: contours.length, output }));
