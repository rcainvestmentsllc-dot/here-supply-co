/**
 * Request-scoped access to the Cloudflare Worker `env` (D1, KV, etc.)
 * from inside Route Handlers / Server Components.
 *
 * vinext threads `env` into the worker entry's `fetch(request, env, ctx)`
 * but does not (as of @vinext/cloudflare 1.0.0-beta.2) forward it down to
 * app code the way it forwards `ExecutionContext` via
 * `vinext/shims/request-context`. This file mirrors that exact pattern
 * (an AsyncLocalStorage registered on `globalThis` via `Symbol.for(...)`,
 * using vinext's own `getOrCreateAls` helper) so `env` survives Vite's
 * multi-environment module duplication the same way `ctx` does.
 *
 * Usage:
 *   // worker/index.ts
 *   import { runWithEnv } from "../lib/cloudflare-env";
 *   async fetch(request, env, ctx) {
 *     return runWithEnv(env, () => handler.fetch(request, env, ctx));
 *   }
 *
 *   // anywhere downstream (route handlers, server components)
 *   import { getEnv } from "@/lib/cloudflare-env";
 *   const { DB } = getEnv();
 *   const row = await DB.prepare("select 1").first();
 */
import { getOrCreateAls } from "vinext/shims/internal/als-registry";

export interface CloudflareEnv {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: unknown;
  [key: string]: unknown;
}

const _als = getOrCreateAls("here-supply-co.cloudflareEnv.als");

/** Wrap a request handler so `getEnv()` resolves inside it. */
export function runWithEnv<T>(env: CloudflareEnv, fn: () => T): T {
  return _als.run(env, fn);
}

/**
 * Get the Cloudflare `env` bindings for the current request.
 * Throws if called outside a `runWithEnv()` scope (e.g. during a build-time
 * prerender pass with no live Worker request) — callers that need to run in
 * both contexts should use `tryGetEnv()` instead.
 */
export function getEnv(): CloudflareEnv {
  const env = _als.getStore();
  if (!env) {
    throw new Error(
      "[here-supply-co] getEnv() called outside a request — no Cloudflare env is bound. " +
        "This code path likely runs at build/prerender time; use tryGetEnv() and handle the null case."
    );
  }
  return env;
}

/** Same as `getEnv()`, but returns `null` instead of throwing outside a request. */
export function tryGetEnv(): CloudflareEnv | null {
  return _als.getStore() ?? null;
}
