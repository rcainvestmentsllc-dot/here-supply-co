import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

test("redirects the Here Supply www host to HTTPS apex without losing the path or query", async () => {
  for (const protocol of ["http", "https"]) {
    const response = await worker.fetch(
      new Request(`${protocol}://www.heresupplyco.com/library?source=bookmark`),
      {},
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), "https://heresupplyco.com/library?source=bookmark");
  }
});

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

test("server-renders the Here Supply Co. identity proof", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<title>Here Supply Co\. \| Tools for Showing Up in Real Life<\/title>/i);
  assert.match(html, /Do not drift from/);
  assert.match(html, /practical tools for men/i);
  assert.match(html, /Chris Avera/);
  assert.match(html, /Get the free weekly guide/);
  assert.match(html, /See the complete course/);
  assert.match(html, /Phones, feeds, AI tools, and work/);
  assert.match(html, /Start free.*Go deeper/s);
  assert.match(html, /class="here-supply-lockup"/i);
  assert.match(html, /TOOLS FOR SHOWING UP IN REAL LIFE/i);
  assert.match(html, /sunday-board-hero-v1\.jpg/i);
  assert.match(html, /course\/photo\/movement-return-v1\.jpg/i);
  assert.match(html, /course\/photo\/movement-lead-v1\.jpg/i);
  assert.match(html, /course\/photo\/movement-keep-v4\.jpg/i);
  assert.match(html, /course\/photo\/emotional-phone-at-game-v1\.jpg/i);
  assert.match(html, /The cost is not the phone/i);
  assert.match(html, /9 LESSONS \+ A PRINTABLE WORKBOOK/i);
  assert.match(html, /Skip to main content/);
  assert.doesNotMatch(html, /_next\/static\/chunks\/link-/i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("serves the custom Here Supply Co. logo with accessible branding and reusable assets", async () => {
  const wordmark = await readFile(new URL("../public/assets/brand/here-supply-co-logo-v2.svg", import.meta.url), "utf8");
  const productWordmark = await readFile(new URL("../public/assets/brand/sunday-board-wordmark.svg", import.meta.url), "utf8");
  const favicon = await readFile(new URL("../public/favicon.svg", import.meta.url), "utf8");
  const checkoutLogo = await readFile(new URL("../public/assets/brand/here-supply-co-checkout-logo.png", import.meta.url));
  const productImage = await readFile(new URL("../public/assets/brand/all-the-way-here-checkout.jpg", import.meta.url));
  const rootLayout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const libraryPage = await readFile(new URL("../app/library/page.tsx", import.meta.url), "utf8");
  const aboutLayout = await readFile(new URL("../app/about/layout.tsx", import.meta.url), "utf8");

  assert.match(wordmark, /<title[^>]*>Here Supply Co\.<\/title>/);
  assert.match(wordmark, /<path\b/);
  assert.doesNotMatch(wordmark, /<text\b|<image\b/);
  for (const route of ["/", "/library", "/access/core-4m8r2p"]) {
    const rendered = await htmlFor(route);
    assert.match(rendered, /aria-label="Here Supply Co\. Tools for showing up in real life\."/);
    assert.match(rendered, /src="\/assets\/brand\/here-supply-co-logo-v2\.svg"/);
    assert.match(rendered, /apple-touch-icon\.png\?v=here-2/);
  }
  assert.match(productWordmark, />SUNDAY</);
  assert.match(productWordmark, />BOARD</);
  assert.match(favicon, /aria-label="Here Supply Co\."/);
  assert.match(favicon, /<path\b/);
  assert.match(favicon, /#21859d/i);
  assert.ok(checkoutLogo.length > 1000);
  assert.ok(productImage.length > 200000);
  assert.equal(checkoutLogo.subarray(1, 4).toString(), "PNG");
  assert.equal(productImage.subarray(0, 2).toString("hex"), "ffd8");
  for (const source of [rootLayout, libraryPage, aboutLayout]) {
    assert.match(source, /problem-1-3-driveway-woman\.jpg/i);
    assert.doesNotMatch(source, /lesson-1-3-airlock\.jpg/i);
  }
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

  assert.match(html, /FREE WEEKLY PRACTICE/i);
  assert.match(html, /class="sunday-board-lockup"/i);
  assert.match(html, /See the same week/i);
  assert.match(html, /Chris and Rhea/i);
  assert.match(html, /sunday-board-meeting-part-1\.mp4/i);
  assert.match(html, /sunday-board-meeting-part-2\.mp4/i);
  assert.match(html, /Part 1 of 2/i);
  assert.match(html, /Part 2 of 2/i);
  assert.match(html, /sunday-board-meeting-captions\.vtt/i);
  assert.match(html, /Free 15-minute meeting guide/i);
  assert.match(html, /href="\/downloads\/sunday-board-meeting\.pdf"[^>]*download="sunday-board-meeting\.pdf"/i);
  assert.match(html, /chrisavera\.substack\.com\/subscribe/i);
  assert.match(html, /No account, inbox hunt, or new system to manage/i);
  assert.doesNotMatch(html, /ml-embedded|B8mkye|assets\.mailerlite\.com/i);
  assert.doesNotMatch(html, /Get the free Board/i);

  const captions = await readFile(new URL("../public/assets/video/sunday-board-meeting-captions.vtt", import.meta.url), "utf8");
  assert.doesNotMatch(captions, /special needs|treatment|therapy coach|autis|adhd/i);
});

test("keeps the rejected badge out of the actual weekly guide builder", async () => {
  const builder = await readFile(new URL("../scripts/build-weekly-guide.py", import.meta.url), "utf8");
  const pdf = await readFile(new URL("../public/downloads/sunday-board-meeting.pdf", import.meta.url));

  assert.match(builder, /here-supply-co-logo-v2\.png/);
  assert.match(builder, /TOOLS FOR SHOWING UP IN REAL LIFE/);
  assert.doesNotMatch(builder, /ridge\s*=|wave\s*=|\.circle\(/i);
  assert.equal(pdf.subarray(0, 4).toString(), "%PDF");
  assert.ok(pdf.byteLength > 20_000, "the weekly guide should be a real rendered PDF");
});

test("grounds the founder story in Chris and Rhea's real life", async () => {
  const html = await htmlFor("/about");

  assert.match(html, /built a life together in Charleston/i);
  assert.match(html, /raising three kids in Brevard/i);
  assert.match(html, /Rhea has her own side of this story/i);
  assert.match(html, /sunday-board-meeting-poster\.jpg/i);
  assert.doesNotMatch(html, /autis|adhd|special needs/i);
});

test("retires the separate Focus checkout without losing the attention reset", async () => {
  const html = await htmlFor("/focus");

  assert.match(html, /The Attention Reset Is Now Inside All the Way Here/i);
  assert.match(html, /ONE COURSE, NOT ANOTHER DECISION/i);
  assert.match(html, /four moves now open All the Way Here/i);
  assert.doesNotMatch(html, /checkout\/34346/i);
  assert.doesNotMatch(html, /\$29/i);
});

test("renders the one verified All the Way Here checkout", async () => {
  const html = await htmlFor("/library");

  assert.match(html, /All the Way Here \| A Here Supply Co\. Course/);
  assert.match(html, /https:\/\/checkout\.mailerlite\.com\/checkout\/34347/i);
  assert.match(html, /Get All the Way Here/i);
  assert.match(html, /14-day refund window/i);
  assert.match(html, /16-page printable workbook/i);
  assert.match(html, /16-PAGE WORKBOOK · INCLUDED/i);
  assert.match(html, /The Family Screen Reset/i);
  assert.match(html, /The Weekly Tradition Builder/i);
  assert.match(html, /The Side-by-Side Teen Check-In/i);
  assert.match(html, /ALL THE WAY HERE FIELD CARD/i);
  assert.match(html, /143\.26 average cash-pay psychotherapy rate/i);
  assert.doesNotMatch(html, /core-bridge-sales\.mp4/i);
  assert.match(html, /THE COMPLETE COURSE/i);
  assert.match(html, /The Sanctuary/i);
  assert.match(html, /The Emotional Thermostat/i);
  assert.match(html, /Mission Debrief/i);
  assert.match(html, /"@type":"Offer"/i);
});

test("shows one free guide and one complete paid path", async () => {
  const html = await htmlFor("/");

  assert.doesNotMatch(html, /focus-protocol-sales\.mp4/i);
  assert.doesNotMatch(html, /core-bridge-sales\.mp4/i);
  assert.match(html, /Sunday Board Meeting/i);
  assert.match(html, /The complete course/i);
  assert.doesNotMatch(html, /Compass Check/i);
});

test("keeps paid access pages private and includes the attention reset in the course", async () => {
  const focusHtml = await htmlFor("/access/focus-7f3k9q");
  const coreHtml = await htmlFor("/access/core-4m8r2p");

  assert.match(focusHtml, /<meta name="robots" content="noindex, nofollow"\/>/i);
  assert.match(focusHtml, /PRIVATE ACCESS/);
  assert.doesNotMatch(focusHtml, /core-bridge-sales\.mp4/i);
  assert.doesNotMatch(focusHtml, /focus-protocol-sales\.mp4/i);
  assert.match(coreHtml, /<meta name="robots" content="noindex, nofollow"\/>/i);
  assert.doesNotMatch(coreHtml, /core-bridge-sales\.mp4/i);
  assert.match(coreHtml, /Here is exactly.*what happens next/is);
  assert.match(coreHtml, /Four steps\. No hunting around/i);
  assert.match(coreHtml, /Print it\. Keep it beside you/i);
  assert.match(coreHtml, /href="\/downloads\/all-the-way-here-workbook\.pdf"[^>]*download="all-the-way-here-workbook\.pdf"/i);
  assert.match(coreHtml, /Download the printable workbook/i);
  assert.match(coreHtml, /Use the editable browser workbook/i);
  assert.match(coreHtml, /PRINTABLE RESOURCES/i);
  assert.match(coreHtml, /The Family Screen Reset/i);
  assert.match(coreHtml, /The Weekly Tradition Builder/i);
  assert.match(coreHtml, /The Side-by-Side Teen Check-In/i);
  assert.match(coreHtml, /all-the-way-here-field-card\.pdf/i);
  assert.match(coreHtml, /YOU ARE NOT ON YOUR OWN/i);
  assert.match(coreHtml, /Reach out to Chris/i);
  assert.doesNotMatch(coreHtml, /chris-puerto-rico/i);
  assert.match(coreHtml, /module-return-final-v2\.mp4/i);
  assert.match(coreHtml, /module-lead-final\.mp4/i);
  assert.match(coreHtml, /module-keep-final-v2\.mp4/i);
  assert.equal((coreHtml.match(/kind="captions"/gi) ?? []).length, 3);
  assert.equal((mainMarkup(coreHtml).match(/MODULE INTRODUCTION · OPTIONAL/gi) ?? []).length, 3);
  assert.match(coreHtml, /Nothing is locked/i);
  assert.match(coreHtml, /THE ALL THE WAY HERE PRACTICE CYCLE/i);
  assert.match(coreHtml, /The Attention Reset/i);
  assert.match(coreHtml, /Useful ideas only count when they survive an ordinary Tuesday/i);
  assert.equal((mainMarkup(coreHtml).match(/\/access\/core-4m8r2p\/lesson\//gi) ?? []).length, 10);
  assert.doesNotMatch(coreHtml, /gamma\.app/i);
  assert.doesNotMatch(coreHtml, /Focus Protocol Field Manual/i);
});

test("ships accessible final module edits without the retired male-only language", async () => {
  const files = [
    "module-return-final.vtt",
    "module-lead-final.vtt",
    "module-keep-final.vtt",
  ];

  for (const file of files) {
    const captions = await readFile(new URL(`../public/assets/course/${file}`, import.meta.url), "utf8");
    assert.match(captions, /^WEBVTT/m);
    assert.doesNotMatch(captions, /man of the house|grounded man|brotherhood|airlock protocol/i);
  }
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
    assert.match(html, /MATCHING ACTION PAGE · INCLUDED/i);
    assert.match(html, /all-the-way-here-workbook\.pdf#page=/i);
  }
});

test("uses purposeful editorial photography throughout the course", async () => {
  const focusMode = await htmlFor("/access/core-4m8r2p/lesson/hunt-before-you-farm");
  const drivewayPause = await htmlFor("/access/core-4m8r2p/lesson/the-airlock-protocol");
  const thermostat = await htmlFor("/access/core-4m8r2p/lesson/the-emotional-thermostat");
  const dateNight = await htmlFor("/access/core-4m8r2p/lesson/the-date-night-experiment");
  const floorGeneral = await htmlFor("/access/core-4m8r2p/lesson/the-floor-general");
  const thirdPlace = await htmlFor("/access/core-4m8r2p/lesson/the-third-place");

  assert.match(focusMode, /course\/photo\/lesson-1-2-focus-v3\.jpg/i);
  assert.match(drivewayPause, /course\/photo\/lesson-1-3-driveway-v1\.jpg/i);
  assert.match(thermostat, /course\/photo\/lesson-2-1-thermostat-v1\.jpg/i);
  assert.match(dateNight, /course\/photo\/lesson-2-2-date-night-v6\.jpg/i);
  assert.match(floorGeneral, /course\/photo\/lesson-2-3-floor-general-v1\.jpg/i);
  assert.match(floorGeneral, /course\/photo\/emotional-phone-at-game-v1\.jpg/i);
  assert.match(floorGeneral, /WHAT DIVIDED ATTENTION FEELS LIKE/i);
  assert.match(thirdPlace, /course\/photo\/lesson-3-1-third-place-v3\.jpg/i);
});

test("gives every indexed public page one clear heading and a canonical URL", async () => {
  const routes = ["/", "/sunday-board", "/library", "/resources", "/resources/how-to-stop-checking-your-phone-at-home", "/resources/how-to-be-more-present-with-your-kids", "/resources/look-up-at-clemson", "/about", "/policies"];

  for (const route of routes) {
    const html = await htmlFor(route);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} should have exactly one h1`);
    assert.match(html, new RegExp(`rel="canonical" href="https://heresupplyco\\.com${route === "/" ? "/?" : route}"`, "i"));
  }
});

test("keeps retired extra paths as noindex bridges", async () => {
  const fieldGuideHtml = await htmlFor("/field-guide");
  const focusHtml = await htmlFor("/focus");
  const supportHtml = await htmlFor("/working-session");
  assert.match(fieldGuideHtml, /<meta name="robots" content="noindex, follow"\/>/i);
  assert.match(focusHtml, /<meta name="robots" content="noindex, follow"\/>/i);
  assert.match(supportHtml, /<meta name="robots" content="noindex, follow"\/>/i);
  assert.match(fieldGuideHtml, /one free practice/i);
  assert.match(focusHtml, /now part of.*complete practice/is);
});

test("every internal page link resolves and no public page depends on Skool", async () => {
  const routes = ["/", "/sunday-board", "/field-guide", "/focus", "/library", "/resources", "/resources/how-to-stop-checking-your-phone-at-home", "/resources/how-to-be-more-present-with-your-kids", "/resources/look-up-at-clemson", "/working-session", "/about", "/policies"];
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
  const finalLessonHtml = await htmlFor("/access/core-4m8r2p/lesson/mission-debrief");
  const workbookHtml = await htmlFor("/access/core-4m8r2p/workbook");

  assert.match(lessonHtml, /<meta name="robots" content="noindex, nofollow"\/>/i);
  assert.match(lessonHtml, /WHAT IS HAPPENING/i);
  assert.match(lessonHtml, /THE PRINCIPLE/i);
  assert.match(lessonHtml, /THE PRACTICE/i);
  assert.match(lessonHtml, /Mark lesson complete/i);
  assert.match(lessonHtml, /PREVIOUS/i);
  assert.match(lessonHtml, /NEXT/i);
  assert.doesNotMatch(lessonHtml, /gamma\.app/i);
  assert.match(finalLessonHtml, /FINISH THE COURSE/i);
  assert.match(finalLessonHtml, /Build your 30-day plan/i);
  assert.match(workbookHtml, /The Workbook/i);
  assert.match(workbookHtml, /BEFORE LESSON ONE · THREE DAYS/i);
  assert.match(workbookHtml, /Recover one moment first/i);
  assert.match(workbookHtml, /PHONE-AWAY WINDOW/i);
  assert.match(workbookHtml, /The Family Screen Reset/i);
  assert.match(workbookHtml, /The Weekly Tradition Builder/i);
  assert.match(workbookHtml, /The Side-by-Side Teen Check-In/i);
  assert.match(workbookHtml, /Open the free Sunday Board Meeting/i);
  assert.equal((mainMarkup(workbookHtml).match(/class="workbook-page(?:\s|")/gi) ?? []).length, 13);
  assert.equal((mainMarkup(workbookHtml).match(/class="workbook-page-brand"/gi) ?? []).length, 14);
  assert.doesNotMatch(workbookHtml, /gamma\.app/i);

  const printableWorkbook = await readFile(new URL("../public/downloads/all-the-way-here-workbook.pdf", import.meta.url));
  assert.equal(printableWorkbook.subarray(0, 4).toString(), "%PDF");
  assert.ok(printableWorkbook.byteLength > 15_000, "the course workbook should be a real rendered PDF");
  assert.equal((printableWorkbook.toString("latin1").match(/\/Type\s*\/Page\b/g) ?? []).length, 16);
  const fieldCard = await readFile(new URL("../public/downloads/all-the-way-here-field-card.pdf", import.meta.url));
  assert.equal(fieldCard.subarray(0, 4).toString(), "%PDF");
  assert.ok(fieldCard.byteLength > 10_000, "the field card should be a real rendered PDF");
});

test("delivers Focus natively as four concrete moves", async () => {
  const html = await htmlFor("/access/focus-7f3k9q");

  assert.match(html, /Remove the Color/i);
  assert.match(html, /Control the feeds/i);
  assert.match(html, /Silence the machine/i);
  assert.match(html, /Give the phone a home/i);
  assert.match(html, /Let the watch carry people/i);
  assert.match(html, /When I returned to Clemson/i);
  assert.match(html, /answer is not becoming the phone police/i);
  assert.match(html, /Set it before you move/i);
  assert.match(html, /The practices and action pages are the course/i);
  assert.match(html, /THE 72-HOUR EXPERIMENT/i);
  assert.match(html, /emotional-phone-at-game\.jpg/i);
  assert.doesNotMatch(html, /core-bridge-sales\.mp4/i);
  assert.doesNotMatch(html, /gamma\.app/i);
});

test("keeps support links anchored to the actual contact form", async () => {
  const homeHtml = await htmlFor("/");
  const supportHtml = await htmlFor("/working-session");

  assert.match(homeHtml, /href="\/working-session#contact-chris"/i);
  assert.match(supportHtml, /id="contact-chris"/i);
  assert.doesNotMatch(homeHtml, /working-session#intake/i);
  assert.match(supportHtml, /<form[^>]*action="https:\/\/docs\.google\.com\/forms\/[^"\s]+\/formResponse"[^>]*method="post"[^>]*target="_blank"/i);
  assert.match(supportHtml, /A confirmation page opens in a new tab/i);
  assert.doesNotMatch(supportHtml, /intake-frame|REQUEST RECEIVED|Thanks\. Chris will read this himself/i);
});

test("every local course image, video, caption, and download exists", async () => {
  const routes = [
    "/",
    "/library",
    "/sunday-board",
    "/access/focus-7f3k9q",
    "/access/core-4m8r2p",
    "/access/core-4m8r2p/workbook",
    "/access/founding-circle-c7h4p9",
    ...[
      "the-sanctuary",
      "hunt-before-you-farm",
      "the-airlock-protocol",
      "the-emotional-thermostat",
      "the-date-night-experiment",
      "the-floor-general",
      "the-third-place",
      "the-friendship-script",
      "mission-debrief",
    ].map((slug) => `/access/core-4m8r2p/lesson/${slug}`),
  ];
  const assets = new Set();

  for (const route of routes) {
    const html = await htmlFor(route);
    for (const [, pathname] of html.matchAll(/(?:src|poster|href)="(\/(?:assets|downloads)\/[^"#?]+)(?:[#?][^"]*)?"/gi)) {
      assets.add(pathname);
    }
  }

  assert.ok(assets.size >= 25, "the course should ship a substantial local media package");
  for (const pathname of assets) {
    const file = await readFile(new URL(`../public${pathname}`, import.meta.url));
    assert.ok(file.byteLength > 100, `${pathname} should be a real local asset`);
  }
});

test("does not publish a second coaching offer at launch", async () => {
  const html = await htmlFor("/working-session");

  assert.match(html, /one free guide and one complete paid course/i);
  assert.match(html, /There is no coaching package or subscription/i);
  assert.match(html, /REACH OUT TO CHRIS/i);
  assert.match(html, /A real person will read this/i);
  assert.match(html, /formResponse/i);
  assert.doesNotMatch(html, /\$150/i);
});

test("publishes practical search entry points for phone habits and fatherhood", async () => {
  const resourcesHtml = await htmlFor("/resources");
  const phoneHtml = await htmlFor("/resources/how-to-stop-checking-your-phone-at-home");
  const fatherHtml = await htmlFor("/resources/how-to-be-more-present-with-your-kids");
  const clemsonHtml = await htmlFor("/resources/look-up-at-clemson");

  assert.match(resourcesHtml, /How to Stop Checking Your Phone at Home/i);
  assert.match(resourcesHtml, /How to Be More Present With Your Kids/i);
  assert.match(resourcesHtml, /What felt different when I returned to Clemson/i);
  assert.match(phoneHtml, /Choose the place before the urge/i);
  assert.match(fatherHtml, /Let them lead/i);
  assert.match(clemsonHtml, /something seemed missing from the place I remembered/i);
  assert.match(clemsonHtml, /Eyes first/i);
  assert.match(phoneHtml, /"@type":"Article"/i);
  assert.match(fatherHtml, /"@type":"Article"/i);
});
