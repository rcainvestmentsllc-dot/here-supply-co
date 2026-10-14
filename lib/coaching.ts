/**
 * Thirty Days With Chris: one month of email coaching for couples using the course.
 *
 * Applications and weekly check ins land in D1 (coaching_messages). A daily
 * scheduled task reads /api/coaching/inbox with a secret token, drafts replies
 * for Chris, and marks the rows handled. Only the token's hash lives here.
 */
import type { CloudflareEnv } from "./cloudflare-env";

export const COACHING = {
  name: "Thirty Days With Chris",
  price: 450,
  foundingPrice: 250,
  foundingSeats: 3,
  replyHours: 48,
  callMinutes: 30,
} as const;

const INBOX_TOKEN_HASH = "a44da9a1b2256489ccc7088711d8e4c0939aeea739fdf962b9f1bd28b79ba8ea";

export async function inboxTokenOk(token: string | null): Promise<boolean> {
  if (!token) return false;
  const bytes = new TextEncoder().encode(`hsc-coaching:${token}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return hex === INBOX_TOKEN_HASH;
}

/**
 * application and checkin belong to Thirty Days With Chris (couples).
 * The men_ kinds belong to the men's coaching program: the free call
 * request, the Intensive intake before the first call, and the Friday check in.
 */
export type CoachingKind = "application" | "checkin" | "men_application" | "men_intake" | "men_checkin";

export const FIELDS: Record<CoachingKind, string[]> = {
  application: ["together", "where", "different", "tried", "times"],
  checkin: ["week", "practiced", "in_the_way", "question", "anything_else"],
  men_application: ["phone", "lead", "costing", "different", "interest", "times", "heard"],
  men_intake: ["work", "home", "people", "drift_home", "drift_work", "drift_self", "cost", "goal_home", "goal_work", "goal_self", "focus_start", "know"],
  men_checkin: ["week", "practiced", "best_of_you", "bring", "anything_else"],
};

export const isCoachingKind = (value: string): value is CoachingKind => Object.hasOwn(FIELDS, value);

export async function recordCoachingMessage(
  env: CloudflareEnv,
  kind: CoachingKind,
  name: string,
  email: string,
  payload: Record<string, string>,
) {
  await env.DB.prepare("insert into coaching_messages (kind, name, email, payload) values (?, ?, ?, ?)")
    .bind(kind, name, email, JSON.stringify(payload))
    .run();
}
