import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("/Users/chrisavera/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const output = path.resolve("output/brand/layout-check");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const results = [];
const routes = [["home", "/"], ["course", "/library"], ["learner", "/access/core-4m8r2p"], ["workbook", "/access/core-4m8r2p/workbook"], ["free", "/sunday-board"]];
for (const width of [1440, 1024, 768, 390, 320]) {
  const page = await browser.newPage({ viewport: { width, height: 950 }, deviceScaleFactor: 1 });
  for (const [name, route] of routes) {
    const response = await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => {
      const visible = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      const logos = [...document.querySelectorAll('.here-supply-logo, .workbook-brand-logo')].filter(visible).map(el => {
        const r = el.getBoundingClientRect();
        return { loaded: el.complete && el.naturalWidth > 0, width: r.width, height: r.height, onScreen: r.left >= -1 && r.right <= innerWidth + 1 };
      });
      const header = document.querySelector('header');
      const overlaps = [];
      if (header) {
        const boxes = [...header.children].filter(visible).map(el => el.getBoundingClientRect());
        for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i], b = boxes[j];
          if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) overlaps.push([i, j]);
        }
      }
      return { horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1, logos, overlaps };
    });
    results.push({ name, width, status: response.status(), ...result });
    if ([1440, 390, 320].includes(width)) await page.screenshot({ path: path.join(output, `${name}-${width}.png`) });
    if (name === "home" && [1440, 390].includes(width)) {
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.locator('footer').screenshot({ path: path.join(output, `footer-${width}.png`) });
    }
  }
  await page.close();
}
await browser.close();
await writeFile(path.join(output, "results.json"), JSON.stringify(results, null, 2));
const failures = results.filter(r => r.status !== 200 || r.horizontalOverflow || r.overlaps.length || r.logos.some(l => !l.loaded || !l.onScreen));
console.log(JSON.stringify({ checked: results.length, failures, output }));
if (failures.length) process.exitCode = 1;
