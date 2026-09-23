import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

const moduleUrl = new URL("../app/site-config.ts", import.meta.url).href;

function readSettings(overrides = {}, expression = "({ origin: SITE_ORIGIN, course: siteUrl('/access/core-4m8r2p'), email: supportEmailUrl('Course access') })") {
  const env = { ...process.env };
  delete env.NEXT_PUBLIC_SITE_URL;
  delete env.NEXT_PUBLIC_SUPPORT_EMAIL;
  return JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e",
    `import { SITE_ORIGIN, siteUrl, supportEmailUrl } from ${JSON.stringify(moduleUrl)}; console.log(JSON.stringify(${expression}));`,
  ], { env: { ...env, ...overrides }, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
}

test("uses the verified Here Supply domain while preserving the existing support mailbox", () => {
  assert.deepEqual(readSettings(), {
    origin: "https://heresupplyco.com",
    course: "https://heresupplyco.com/access/core-4m8r2p",
    email: "mailto:hello@heresupplyco.com?subject=Course%20access",
  });
});

test("moves course links and contact links together to verified replacement settings", () => {
  assert.deepEqual(readSettings({
    NEXT_PUBLIC_SITE_URL: "https://new-brand.example/",
    NEXT_PUBLIC_SUPPORT_EMAIL: "support@new-brand.example",
  }), {
    origin: "https://new-brand.example",
    course: "https://new-brand.example/access/core-4m8r2p",
    email: "mailto:support@new-brand.example?subject=Course%20access",
  });
});

test("rejects insecure or malformed launch settings before they can ship", () => {
  for (const value of ["http://new-brand.example", "https://new-brand.example/course", "https://user:pass@new-brand.example", "https://new-brand.example/?wrong=1", "https://new-brand.example/#wrong"]) {
    assert.throws(() => readSettings({ NEXT_PUBLIC_SITE_URL: value }));
  }
  assert.throws(() => readSettings({ NEXT_PUBLIC_SUPPORT_EMAIL: "not a mailbox" }));
  assert.throws(() => readSettings({}, "siteUrl('//unrelated.example/course')"));
});
