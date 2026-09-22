/**
 * Lesson progress, stored against the account rather than the browser.
 *
 * The previous implementation kept completion in localStorage, so a member
 * who opened the course on their phone saw an empty course. This reads and
 * writes the D1 `progress` table keyed by the logged-in email, so progress
 * follows the person.
 */
import type { CloudflareEnv } from "./cloudflare-env";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Slugs this member has completed. */
export async function getCompletedLessons(
  env: CloudflareEnv,
  email: string
): Promise<Set<string>> {
  const { results } = await env.DB.prepare(
    "select lesson_slug from progress where email = ?1"
  )
    .bind(normalizeEmail(email))
    .all<{ lesson_slug: string }>();

  return new Set((results ?? []).map((row: { lesson_slug: string }) => row.lesson_slug));
}

export async function markLessonComplete(
  env: CloudflareEnv,
  email: string,
  lessonSlug: string
): Promise<void> {
  await env.DB.prepare(
    "insert into progress (email, lesson_slug) values (?1, ?2) " +
      "on conflict(email, lesson_slug) do nothing"
  )
    .bind(normalizeEmail(email), lessonSlug)
    .run();
}

export async function markLessonIncomplete(
  env: CloudflareEnv,
  email: string,
  lessonSlug: string
): Promise<void> {
  await env.DB.prepare(
    "delete from progress where email = ?1 and lesson_slug = ?2"
  )
    .bind(normalizeEmail(email), lessonSlug)
    .run();
}

/**
 * The lesson to point the member at: the first one they haven't finished,
 * or the last lesson once everything is done.
 */
export function nextLessonSlug(
  orderedSlugs: readonly string[],
  completed: ReadonlySet<string>
): string {
  return orderedSlugs.find((slug) => !completed.has(slug)) ?? orderedSlugs[orderedSlugs.length - 1];
}
