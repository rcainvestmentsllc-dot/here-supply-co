import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `men-${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const ctx = { waitUntil() {}, passThroughOnException() {} };
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const COUPLES = "hsc_course=f162119aa93015145535fcb58cc5a2841954b544b282bc5ba56f455d091cb310";
const MEN = "hsc_men=0118e3e004e44ff78dd99ba9aaf35d757f4c81305df057c1106f9fceba4d5ad7";
const ROOT = "/access/men-r7k2v9";

function get(pathname, cookie) {
  const headers = { accept: "text/html" };
  if (cookie) headers.cookie = cookie;
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers }), env, ctx);
}

async function html(pathname, cookie) {
  const res = await get(pathname, cookie);
  assert.equal(res.status, 200, `${pathname} should render`);
  return (await res.text()).replace(/<!-- -->/g, "");
}

test("the men's public pages render, each with one heading and its own canonical", async () => {
  for (const route of ["/men", "/men/coaching", "/men/course", "/men/apply"]) {
    const page = await html(route);
    const main = page.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? page;
    assert.equal((main.match(/<h1\b/gi) ?? []).length, 1, `${route} should have one page heading`);
    assert.match(page, new RegExp(`rel="canonical" href="https://heresupplyco\\.com${route}"`));
  }
});

test("the men's landing page shows the ladder and the free call", async () => {
  const page = await html("/men");
  assert.match(page, /Real work\./);
  assert.match(page, /The Weekly Table/);
  assert.match(page, /The 90 Day Intensive/);
  assert.match(page, /\$2,500/);
  assert.match(page, /\$500/);
  assert.match(page, /class="topbar-action" href="\/men\/apply"/);
});

test("the coaching page lays out all twelve weeks and the limits of coaching", async () => {
  const page = await html("/men/coaching");
  for (const title of ["The Sanctuary", "Focus Mode", "The Driveway Pause", "Leading the room at work", "Mission Debrief"]) {
    assert.match(page, new RegExp(title));
  }
  assert.match(page, /988/);
  assert.match(page, /not therapy/);
});

test("intake and check in pages stay out of search", async () => {
  for (const route of ["/men/intake", "/men/check-in"]) {
    assert.match(await html(route), /noindex/);
  }
});

test("the couples home page offers both paths", async () => {
  const page = await html("/");
  assert.match(page, /FOR COUPLES/);
  assert.match(page, /FOR MEN WHO LEAD/);
  assert.match(page, /href="\/men"/);
});

test("the men's course has its own password", async () => {
  const locked = await get(ROOT);
  assert.equal(locked.status, 303);
  assert.match(locked.headers.get("location") ?? "", /^\/unlock\?return_to=/);

  // A couples buyer does not get the men's course, and the reverse.
  assert.equal((await get(ROOT, COUPLES)).status, 303);
  assert.equal((await get("/access/core-4m8r2p", MEN)).status, 303);

  const forged = await get(ROOT, `hsc_men=${"a".repeat(64)}`);
  assert.equal(forged.status, 303);

  const open = await get(ROOT, MEN);
  assert.equal(open.status, 200);
  assert.match(open.headers.get("cache-control") ?? "", /private/);
});

test("the men's password unlocks the men's course and lands there", async () => {
  const post = (password, returnTo) => worker.fetch(new Request("http://localhost/api/course/unlock", {
    method: "POST",
    body: new URLSearchParams({ password, return_to: returnTo }),
  }), env, ctx);

  const fromMen = await post(" Every Room ", `${ROOT}/lesson/the-sanctuary`);
  assert.equal(fromMen.status, 303);
  assert.equal(fromMen.headers.get("location"), `http://localhost${ROOT}/lesson/the-sanctuary`);
  assert.match(fromMen.headers.get("set-cookie") ?? "", /^hsc_men=[0-9a-f]{64}; .*HttpOnly/);

  // Typed on the generic unlock page, it still goes to the men's course.
  const generic = await post("everyroom", "/access/core-4m8r2p");
  assert.equal(generic.headers.get("location"), `http://localhost${ROOT}`);

  const key = await get(`${ROOT}?key=everyroom`);
  assert.equal(key.status, 303);
  assert.match(key.headers.get("set-cookie") ?? "", /^hsc_men=/);
});

test("men's buyers can print the shared sheets, and the men's book needs the men's password", async () => {
  // The test ASSETS binding answers 404, so passing the gate shows up as 404, not a 303.
  assert.equal((await get("/downloads/brain-dump.pdf", MEN)).status, 404);
  assert.equal((await get("/downloads/brain-dump.pdf", COUPLES)).status, 404);
  assert.equal((await get("/downloads/brain-dump.pdf")).status, 303);
  assert.equal((await get("/downloads/men/all-the-way-here-mens-edition.pdf", COUPLES)).status, 303);
  assert.equal((await get("/downloads/men/all-the-way-here-mens-edition.pdf", MEN)).status, 404);
});

test("every men's lesson renders with a home example, a work example, and a coaching question", async () => {
  const home = await html(ROOT, MEN);
  assert.match(home, /Begin with the Focus Protocol/);
  assert.match(home, /data-lesson="men:the-sanctuary"/);
  const slugs = [...home.matchAll(/href="\/access\/men-r7k2v9\/lesson\/([a-z-]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(slugs).size, 9);
  for (const slug of new Set(slugs)) {
    const lesson = await html(`${ROOT}/lesson/${slug}`, MEN);
    assert.match(lesson, /At home/);
    assert.match(lesson, /At work/);
    assert.match(lesson, /The question I would ask you on a call/);
    assert.match(lesson, /noindex/);
  }
  const focus = await html(`${ROOT}/focus`, MEN);
  assert.match(focus, /TELL ONE PERSON/);
  assert.doesNotMatch(focus, /DOING THIS TOGETHER/);
});

test("men's forms reject bad input", async () => {
  for (const kind of ["men_application", "men_intake", "men_checkin"]) {
    const body = new FormData();
    body.set("kind", kind);
    body.set("name", "Test");
    body.set("email", "not an email");
    const res = await worker.fetch(new Request("http://localhost/api/coaching", { method: "POST", body }), env, ctx);
    assert.equal(res.status, 400, kind);
  }
  const body = new FormData();
  body.set("kind", "something_else");
  body.set("name", "Test");
  body.set("email", "test@example.com");
  const res = await worker.fetch(new Request("http://localhost/api/coaching", { method: "POST", body }), env, ctx);
  assert.equal(res.status, 400);
});

test("the paused live site keeps the men's pages paused too, but the men's course open", async () => {
  const live = (path) => worker.fetch(new Request(`https://heresupplyco.com${path}`), {}, ctx);
  for (const path of ["/men", "/men/coaching", "/men/apply"]) {
    assert.equal((await live(path)).status, 503, path);
  }
  assert.notEqual((await live(ROOT)).status, 503);
});
