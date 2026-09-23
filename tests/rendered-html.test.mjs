import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname = "/") {
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), {
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
  assert.match(html, /<title>Here Supply Co\. \| Attention Tools for Couples<\/title>/i);
  assert.match(html, /here-supply-co-logo-v2\.svg/i);
  assert.match(html, /Your phone is a tool/i);
  assert.match(html, /For two people who keep missing each other/i);
  assert.match(html, /Sunday Board Meeting/i);
  assert.match(html, /Focus Protocol/i);
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
  assert.match(library, /START WITH THE FOCUS PROTOCOL/i);
  assert.match(library, /72-hour Focus Protocol/i);
  assert.match(course, /Begin with the Focus Protocol/i);
  assert.match(course, /href="\/access\/focus-7f3k9q"/i);
  assert.match(focus, /FOCUS PROTOCOL/i);
  assert.match(focus, /Remove the color/i);
  assert.match(focus, /Give the phone a home/i);
  assert.match(focus, /<meta name="robots" content="noindex, nofollow"\/>/i);
});

test("makes the complete print edition the recommended course companion", async () => {
  const library = await htmlFor("/library");
  const course = await htmlFor("/access/core-4m8r2p");
  assert.match(library, /complete 30-page print-first course book/i);
  assert.match(course, /Recommended · print first/i);
  assert.match(course, /all-the-way-here-print-edition\.pdf/i);
  assert.match(course, /here-supply-resource-pack\.zip/i);
  assert.match(course, /Print the course book/i);
  assert.doesNotMatch(course, /browser workbook/i);
});

test("sends the retired fill-in workbook to the print edition", async () => {
  const response = await render("/access/core-4m8r2p/workbook");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "/downloads/all-the-way-here-print-edition.pdf");
});

test("keeps the course buyer path clear and the private lessons complete", async () => {
  const library = await htmlFor("/library");
  const lesson = await htmlFor("/access/core-4m8r2p/lesson/the-airlock-protocol");
  assert.match(library, /One-time purchase/i);
  assert.match(library, /14-day refund window/i);
  assert.match(library, /Nine visual lessons/i);
  assert.match(lesson, /The Driveway Pause/i);
  assert.match(lesson, /FIELD KIT/i);
  assert.match(lesson, /WORDS TO USE/i);
  assert.match(lesson, /EVIDENCE NOTE/i);
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
    "public/downloads/sunday-board-meeting.pdf",
    "public/downloads/all-the-way-here-workbook.pdf",
    "public/downloads/all-the-way-here-print-edition.pdf",
    "public/downloads/here-supply-resource-pack.zip",
    "public/downloads/the-here-week.pdf",
    "public/downloads/attention-reset.pdf",
    "public/downloads/all-the-way-here-field-card.pdf",
  ];
  for (const path of paths) await access(new URL(`../${path}`, import.meta.url));
  const guide = await readFile(new URL("../public/downloads/sunday-board-meeting.pdf", import.meta.url));
  assert.equal(guide.subarray(0, 4).toString(), "%PDF");
});
