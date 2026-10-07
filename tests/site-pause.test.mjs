import test from "node:test";
import assert from "node:assert/strict";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `pause-${process.pid}`);
const { default: worker } = await import(workerUrl.href);
const ctx = { waitUntil() {}, passThroughOnException() {} };
const get = (path) => worker.fetch(new Request(`https://heresupplyco.com${path}`), {}, ctx);

test("paused live site shows the back soon note but keeps course access and feeds", async () => {
  for (const path of ["/", "/library", "/coaching", "/sunday-board"]) {
    const res = await get(path);
    assert.equal(res.status, 503, path);
    assert.match(await res.text(), /taking a short break/);
  }
  assert.equal((await get("/api/subscribe")).status, 503);
  assert.notEqual((await get("/rss.xml")).status, 503);
  assert.notEqual((await get("/access/core-4m8r2p")).status, 503);
});
