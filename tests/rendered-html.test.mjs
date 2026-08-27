import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname = "/") {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("server-renders the finished Iron Compass homepage", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<title>Iron Compass Institute \| Be Here for Your Own Life<\/title>/i);
  assert.match(html, /Be here for/);
  assert.match(html, /less distracted, more present at home/);
  assert.match(html, /Start the Sunday Board Meeting/);
  assert.match(html, /Take the Compass Check/);
  assert.match(html, /Phones, feeds, AI tools, and work/);
  assert.match(html, /Skip to main content/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("makes the Sunday Board Meeting clear and renders a valid MailerLite mount", async () => {
  const html = await htmlFor("/sunday-board");

  assert.match(html, /A 15-MINUTE WEEKLY MEETING FOR YOU AND YOUR WIFE/i);
  assert.match(html, /Sit down together/);
  assert.match(html, /Free 15-minute meeting guide/i);
  assert.match(html, /<div class="ml-embedded" data-form="B8mkye"><\/div>/i);
  assert.doesNotMatch(html, /Get the free Board/i);
});

test("renders the verified Focus checkout", async () => {
  const html = await htmlFor("/focus");

  assert.match(html, /Focus Protocol \| A 72-Hour Attention Reset/);
  assert.match(html, /https:\/\/checkout\.mailerlite\.com\/checkout\/34346/i);
  assert.match(html, /Get Focus Protocol/i);
  assert.match(html, /14-day refund window/i);
  assert.match(html, /Work at your own pace/i);
  assert.match(html, /focus-protocol-sales\.mp4/i);
  assert.match(html, /Remove the Color/i);
  assert.match(html, /Delete Extraction Apps/i);
  assert.match(html, /Silence Everything/i);
  assert.match(html, /Install the Vault/i);
  assert.match(html, /"@type":"Product"/i);
  assert.match(html, /"@type":"Offer"/i);
});

test("renders the verified Core checkout", async () => {
  const html = await htmlFor("/library");

  assert.match(html, /Iron Compass Core \| The Complete Curriculum/);
  assert.match(html, /https:\/\/checkout\.mailerlite\.com\/checkout\/34347/i);
  assert.match(html, /Get Core/i);
  assert.match(html, /14-day refund window/i);
  assert.match(html, /Core Workbook included/i);
  assert.doesNotMatch(html, /core-bridge-sales\.mp4/i);
  assert.match(html, /THE FULL CORE CURRICULUM/i);
  assert.match(html, /The Sanctuary/i);
  assert.match(html, /The Emotional Thermostat/i);
  assert.match(html, /Mission Debrief/i);
  assert.match(html, /"@type":"Offer"/i);
});

test("shows the public Focus overview and keeps the Core bridge private", async () => {
  const html = await htmlFor("/");

  assert.match(html, /focus-protocol-sales\.mp4/i);
  assert.doesNotMatch(html, /core-bridge-sales\.mp4/i);
  assert.match(html, /FOCUS OVERVIEW/i);
  assert.match(html, /CORE LESSON PREVIEW/i);
});

test("keeps paid access pages private and puts the Core bridge after Focus", async () => {
  const focusHtml = await htmlFor("/access/focus-7f3k9q");
  const coreHtml = await htmlFor("/access/core-4m8r2p");

  assert.match(focusHtml, /<meta name="robots" content="noindex, nofollow"\/>/i);
  assert.match(focusHtml, /PRIVATE ACCESS/);
  assert.match(focusHtml, /core-bridge-sales\.mp4/i);
  assert.doesNotMatch(focusHtml, /focus-protocol-sales\.mp4/i);
  assert.match(coreHtml, /<meta name="robots" content="noindex, nofollow"\/>/i);
  assert.doesNotMatch(coreHtml, /core-bridge-sales\.mp4/i);
  assert.match(coreHtml, /The Core Workbook/i);
  assert.doesNotMatch(coreHtml, /Focus Protocol Field Manual|The Sunday Board Meeting/i);
});

test("gives every public page one clear heading and a canonical URL", async () => {
  const routes = ["/", "/sunday-board", "/field-guide", "/focus", "/library", "/about", "/policies"];

  for (const route of routes) {
    const html = await htmlFor(route);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} should have exactly one h1`);
    assert.match(html, new RegExp(`rel="canonical" href="https://ironcompassinstitute\\.com${route === "/" ? "/?" : route}"`, "i"));
  }
});
