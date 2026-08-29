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

function mainMarkup(html) {
  return html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? html;
}

test("server-renders the finished Iron Compass homepage", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<title>Iron Compass \| Be Here for Your Own Life<\/title>/i);
  assert.match(html, /Be here for/);
  assert.match(html, /reclaim your attention and return to the people and life already waiting for you/);
  assert.match(html, /Chris Avera/);
  assert.match(html, /Get the free weekly guide/);
  assert.match(html, /Take the Compass Check/);
  assert.match(html, /Phones, feeds, AI tools, and work/);
  assert.match(html, /Start with the problem.*you can.*name/s);
  assert.match(html, /iron-compass-wave-mark-transparent\.png/i);
  assert.match(html, /course\/preview-return\.png/i);
  assert.match(html, /course\/preview-lead\.png/i);
  assert.match(html, /course\/preview-keep\.png/i);
  assert.match(html, /REAL COURSE PREVIEW/i);
  assert.match(html, /Skip to main content/);
  assert.doesNotMatch(html, /_next\/static\/chunks\/link-/i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("renders a grounded resource guide without implying accreditation", async () => {
  const html = await htmlFor("/resources");

  assert.match(html, /Use the right kind.*of help for the.*real problem/i);
  assert.match(html, /American Association for Marriage and Family Therapy/i);
  assert.match(html, /U\.S\. Substance Abuse and Mental Health Services Administration/i);
  assert.match(html, /National Responsible Fatherhood Clearinghouse/i);
  assert.match(html, /call or text 988/i);
  assert.match(html, /not therapy, medical care, crisis care, a licensed clinical service, or an accredited program/i);
});

test("makes the free weekly guide clear and delivers it without an email gate", async () => {
  const html = await htmlFor("/sunday-board");

  assert.match(html, /A 15-MINUTE WEEKLY MEETING FOR YOU AND YOUR WIFE/i);
  assert.match(html, /Sit down together/);
  assert.match(html, /Free 15-minute meeting guide/i);
  assert.match(html, /href="\/downloads\/sunday-board-meeting\.pdf"[^>]*download="see-the-same-week\.pdf"/i);
  assert.match(html, /chrisavera\.substack\.com\/subscribe/i);
  assert.match(html, /No account, inbox hunt, or new system to manage/i);
  assert.doesNotMatch(html, /ml-embedded|B8mkye|assets\.mailerlite\.com/i);
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
  assert.match(html, /INSIDE THE LEAD MODULE/i);
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
  assert.match(coreHtml, /module-return\.mp4/i);
  assert.match(coreHtml, /module-lead\.mp4/i);
  assert.match(coreHtml, /module-keep\.mp4/i);
  assert.match(coreHtml, /THE IRON COMPASS PRACTICE CYCLE/i);
  assert.match(coreHtml, /Useful ideas only count when they survive an ordinary Tuesday/i);
  assert.equal((mainMarkup(coreHtml).match(/\/access\/core-4m8r2p\/lesson\//gi) ?? []).length, 9);
  assert.doesNotMatch(coreHtml, /gamma\.app/i);
  assert.doesNotMatch(coreHtml, /Focus Protocol Field Manual|The Sunday Board Meeting/i);
});

test("gives every Core lesson a usable field kit and evidence note", async () => {
  const lessonRoutes = [
    "the-sanctuary",
    "hunt-before-you-farm",
    "the-airlock-protocol",
    "the-emotional-thermostat",
    "the-date-night-experiment",
    "the-floor-general",
    "the-third-place",
    "the-friendship-script",
    "mission-debrief",
  ];

  for (const slug of lessonRoutes) {
    const html = await htmlFor(`/access/core-4m8r2p/lesson/${slug}`);
    assert.match(html, /PRACTICE KIT/i);
    assert.match(html, /WORDS TO USE/i);
    assert.match(html, /WATCH FOR/i);
    assert.match(html, /TRY THIS WEEK/i);
    assert.match(html, /EVIDENCE NOTE/i);
  }
});

test("gives every public page one clear heading and a canonical URL", async () => {
  const routes = ["/", "/sunday-board", "/field-guide", "/focus", "/library", "/resources", "/resources/how-to-stop-checking-your-phone-at-home", "/resources/how-to-be-more-present-with-your-kids", "/working-session", "/about", "/policies"];

  for (const route of routes) {
    const html = await htmlFor(route);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} should have exactly one h1`);
    assert.match(html, new RegExp(`rel="canonical" href="https://ironcompassinstitute\\.com${route === "/" ? "/?" : route}"`, "i"));
  }
});

test("every internal page link resolves and no public page depends on Skool", async () => {
  const routes = ["/", "/sunday-board", "/field-guide", "/focus", "/library", "/resources", "/resources/how-to-stop-checking-your-phone-at-home", "/resources/how-to-be-more-present-with-your-kids", "/working-session", "/about", "/policies"];
  const destinations = new Set(routes);

  for (const route of routes) {
    const html = await htmlFor(route);
    assert.doesNotMatch(html, /skool\.com/i, `${route} should not depend on Skool`);
    for (const [, href] of html.matchAll(/href="([^"]+)"/gi)) {
      if (!href.startsWith("/") || href.startsWith("/_next/") || /\.[a-z0-9]{2,5}(?:[?#]|$)/i.test(href)) continue;
      destinations.add(href.split(/[?#]/, 1)[0] || "/");
    }
  }

  for (const destination of destinations) {
    const response = await render(destination);
    assert.equal(response.status, 200, `${destination} should resolve`);
  }
});

test("delivers the complete native Core course and workbook without Gamma", async () => {
  const lessonHtml = await htmlFor("/access/core-4m8r2p/lesson/the-airlock-protocol");
  const workbookHtml = await htmlFor("/access/core-4m8r2p/workbook");

  assert.match(lessonHtml, /<meta name="robots" content="noindex, nofollow"\/>/i);
  assert.match(lessonHtml, /WHAT IS HAPPENING/i);
  assert.match(lessonHtml, /THE PRINCIPLE/i);
  assert.match(lessonHtml, /THE PRACTICE/i);
  assert.match(lessonHtml, /Mark lesson complete/i);
  assert.match(lessonHtml, /PREVIOUS/i);
  assert.match(lessonHtml, /NEXT/i);
  assert.doesNotMatch(lessonHtml, /gamma\.app/i);
  assert.match(workbookHtml, /The Workbook/i);
  assert.equal((mainMarkup(workbookHtml).match(/class="workbook-page"/gi) ?? []).length, 9);
  assert.doesNotMatch(workbookHtml, /gamma\.app/i);
});

test("delivers Focus natively as four concrete moves", async () => {
  const html = await htmlFor("/access/focus-7f3k9q");

  assert.match(html, /Remove the Color/i);
  assert.match(html, /Remove the extraction apps/i);
  assert.match(html, /Silence the machine/i);
  assert.match(html, /Choose a Vault window/i);
  assert.match(html, /THE 72-HOUR EXPERIMENT/i);
  assert.doesNotMatch(html, /gamma\.app/i);
});

test("uses a focused native intake for the personal leadership working session", async () => {
  const html = await htmlFor("/working-session");

  assert.match(html, /One real problem/i);
  assert.match(html, /Sixty minutes/i);
  assert.match(html, /\$150/i);
  assert.match(html, /formResponse/i);
  assert.match(html, /entry\.862303072/i);
  assert.match(html, /entry\.2097188110/i);
  assert.match(html, /not therapy, marriage counseling, medical care, or crisis services/i);
});

test("publishes practical search entry points for phone habits and fatherhood", async () => {
  const resourcesHtml = await htmlFor("/resources");
  const phoneHtml = await htmlFor("/resources/how-to-stop-checking-your-phone-at-home");
  const fatherHtml = await htmlFor("/resources/how-to-be-more-present-with-your-kids");

  assert.match(resourcesHtml, /How to Stop Checking Your Phone at Home/i);
  assert.match(resourcesHtml, /How to Be More Present With Your Kids/i);
  assert.match(phoneHtml, /Choose the place before the urge/i);
  assert.match(fatherHtml, /Let them lead/i);
  assert.match(phoneHtml, /"@type":"Article"/i);
  assert.match(fatherHtml, /"@type":"Article"/i);
});
