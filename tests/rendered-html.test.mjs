import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

// The course is password protected. Rendering tests act as an unlocked buyer;
// the gate itself has its own tests below.
const COURSE_COOKIE = "hsc_course=f162119aa93015145535fcb58cc5a2841954b544b282bc5ba56f455d091cb310";

async function render(pathname = "/", { unlocked = true } = {}) {
  const headers = { accept: "text/html" };
  if (unlocked) headers.cookie = COURSE_COOKIE;
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

async function htmlFor(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200, `${pathname} should render`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

function mainMarkup(html) {
  return html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? html;
}

test("redirects www to the HTTPS apex without losing the request", async () => {
  const response = await worker.fetch(new Request("https://www.heresupplyco.com/library?source=bookmark"), {}, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://heresupplyco.com/library?source=bookmark");
});

test("renders the current Here Supply home page and original wave mark", async () => {
  const html = await htmlFor("/");
  assert.match(html, /<title>Here Supply Co\. \| Resources for Couples to Stay Connected<\/title>/i);
  assert.match(html, /here-supply-co-logo-v2\.svg/i);
  assert.match(html, /Get back to the person/i);
  assert.match(html, /For two people who keep missing each other/i);
  assert.match(html, /Sunday Board Meeting/i);
  assert.match(html, /Focus Protocol/i);
  assert.match(html, /Resources that help couples/i);
  assert.match(html, /Resource Pack/i);
  assert.match(html, /https:\/\/checkout\.mailerlite\.com\/checkout\/34347/i);
  assert.match(html, /Skip to main content/i);
});

test("keeps the Sunday Board free, complete, and captioned", async () => {
  const html = await htmlFor("/sunday-board");
  assert.match(html, /Sunday Board/i);
  assert.match(html, /sunday-board-meeting\.mp4/i);
  assert.match(html, /sunday-board-meeting-captions\.vtt/i);
  assert.match(html, /downloads\/sunday-board-meeting\.pdf/i);
  assert.doesNotMatch(html, /sunday-board-meeting-part-1\.mp4/i);
  assert.doesNotMatch(html, /sunday-board-meeting-part-2\.mp4/i);
});

test("makes the Focus Protocol the first step of the paid course", async () => {
  const library = await htmlFor("/library");
  const course = await htmlFor("/access/core-4m8r2p");
  const focus = await htmlFor("/access/focus-7f3k9q");
  assert.match(library, /It starts with the Focus Protocol/i);
  assert.match(library, /72 hour Focus Protocol/i);
  assert.match(course, /Begin with the Focus Protocol/i);
  assert.match(course, /href="\/access\/focus-7f3k9q"/i);
  assert.match(focus, /FOCUS PROTOCOL/i);
  assert.match(focus, /Remove the color/i);
  assert.match(focus, /Give the phone a home/i);
  assert.match(focus, /<meta name="robots" content="noindex, nofollow"\/>/i);
});

test("gives the course three print files, with family tools inside the Resource Pack", async () => {
  const library = await htmlFor("/library");
  const course = await htmlFor("/access/core-4m8r2p");
  assert.match(library, /25 page course book/i);
  assert.match(course, /Everything to print/i);
  assert.match(course, /all-the-way-here-print-edition\.pdf/i);
  assert.match(course, /here-supply-resource-pack\.pdf/i);
  assert.match(course, /sunday-board-meeting\.pdf/i);
  assert.doesNotMatch(course, /\.zip|family-tools\.pdf|field-card\.pdf/i);
  assert.match(course, /Print the course book and the Resource Pack/i);
  assert.doesNotMatch(course, /browser workbook/i);
});

test("sends retired printables to what replaced them", async () => {
  for (const [from, to] of [
    ["/downloads/attention-reset.pdf", "/downloads/focus-protocol.pdf"],
    ["/downloads/the-here-week.pdf", "/downloads/sunday-board-meeting.pdf"],
    ["/downloads/sunday-board-field-card.pdf", "/downloads/sunday-board-meeting.pdf"],
    ["/downloads/here-supply-resource-pack.zip", "/downloads/here-supply-resource-pack.pdf"],
    ["/downloads/all-the-way-here-workbook.pdf", "/downloads/all-the-way-here-print-edition.pdf"],
    ["/resources/why-men-need-a-third-place", "/resources/everyone-needs-a-third-place"],
  ]) {
    const response = await render(from, { unlocked: false });
    assert.equal(response.status, 301, from);
    assert.equal(response.headers.get("location"), to);
  }
});

test("sends the retired fill-in workbook to the print edition", async () => {
  const response = await render("/access/core-4m8r2p/workbook");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "/downloads/all-the-way-here-print-edition.pdf");
});

test("keeps the course buyer path clear and the private lessons complete", async () => {
  const library = await htmlFor("/library");
  const lesson = await htmlFor("/access/core-4m8r2p/lesson/the-airlock-protocol");
  assert.match(library, /One time purchase/i);
  assert.match(library, /14 day refund window/i);
  assert.match(library, /nine short lessons/i);
  assert.doesNotMatch(library, /videos|watch the introductions/i);
  assert.match(library, /receipt email has a button that opens the course and a password/i);
  assert.match(lesson, /The Driveway Pause/i);
  assert.match(lesson, /YOUR SHEET · LESSON 1\.3/i);
  assert.match(lesson, /WORDS TO USE/i);
  assert.match(lesson, /EVIDENCE NOTE/i);
  assert.match(lesson, /I tried this practice/i);
  assert.doesNotMatch(lesson, /Attention Reset|Hunter|Farmer|Algorithm/);
  assert.match(lesson, /<meta name="robots" content="noindex, nofollow"\/>/i);
});

test("keeps public pages findable and no private course URL indexed", async () => {
  const publicRoutes = ["/", "/sunday-board", "/library", "/resources", "/about", "/policies"];
  for (const route of publicRoutes) {
    const html = await htmlFor(route);
    assert.equal((mainMarkup(html).match(/<h1\b/gi) ?? []).length, 1, `${route} should have one page heading`);
    assert.match(html, new RegExp(`rel="canonical" href="https://heresupplyco\\.com${route === "/" ? "/?" : route}"`, "i"));
  }
});

test("ships every course asset and printable referenced by the content", async () => {
  const paths = [
    "public/assets/brand/here-supply-co-logo-v2.svg",
    "public/assets/brand/here-supply-co-logo-inverse-v2.svg",
    "public/assets/video/sunday-board-meeting.mp4",
    "public/assets/video/sunday-board-meeting-captions.vtt",
    "public/downloads/all-the-way-here-print-edition.pdf",
    "public/downloads/here-supply-resource-pack.pdf",
    "public/downloads/family-tools.pdf",
  ];
  for (const path of paths) await access(new URL(`../${path}`, import.meta.url));
  // Every sheet the course lists, and every lesson's sheet, must exist.
  const content = await readFile(new URL("../app/course-content.ts", import.meta.url), "utf8");
  const files = [...content.matchAll(/file: "(\/downloads\/[^"]+)"/g)].map((m) => m[1]);
  assert.ok(files.length >= 12);
  for (const file of files) await access(new URL(`../public${file}`, import.meta.url));
  const guide = await readFile(new URL("../public/downloads/sunday-board-meeting.pdf", import.meta.url));
  assert.equal(guide.subarray(0, 4).toString(), "%PDF");
});

test("keeps the course behind the password", async () => {
  const locked = await render("/access/core-4m8r2p", { unlocked: false });
  assert.equal(locked.status, 303);
  assert.match(locked.headers.get("location") ?? "", /^\/unlock\?return_to=%2Faccess%2Fcore-4m8r2p$/);

  const paidFile = await render("/downloads/all-the-way-here-print-edition.pdf", { unlocked: false });
  assert.equal(paidFile.status, 303);

  const forged = await worker.fetch(new Request("http://localhost/access/core-4m8r2p", { headers: { cookie: `hsc_course=${"a".repeat(64)}` } }), {}, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(forged.status, 303);

  const unlocked = await render("/access/core-4m8r2p");
  assert.equal(unlocked.status, 200);
  assert.match(unlocked.headers.get("cache-control") ?? "", /private/);
});

test("unlocks the course with the right password and refuses a wrong one", async () => {
  const post = (password) => worker.fetch(new Request("http://localhost/api/course/unlock", {
    method: "POST",
    body: new URLSearchParams({ password, return_to: "/access/core-4m8r2p/lesson/the-sanctuary" }),
  }), {}, { waitUntil() {}, passThroughOnException() {} });

  const wrong = await post("not it");
  assert.equal(wrong.status, 303);
  assert.match(wrong.headers.get("location") ?? "", /\/unlock\?.*error=1/);
  assert.equal(wrong.headers.get("set-cookie"), null);

  const right = await post(" Sunday Coffee27 ");
  assert.equal(right.status, 303);
  assert.equal(right.headers.get("location"), "http://localhost/access/core-4m8r2p/lesson/the-sanctuary");
  assert.match(right.headers.get("set-cookie") ?? "", /^hsc_course=[0-9a-f]{64}; .*HttpOnly/);

  const page = await render("/unlock?return_to=/access/core-4m8r2p", { unlocked: false });
  assert.equal(page.status, 200);
  assert.match(await page.text(), /Course password/);
});
