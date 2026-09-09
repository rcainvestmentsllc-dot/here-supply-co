"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "iron-compass-core-progress";
const PROGRESS_EVENT = "iron-compass-core-progress-change";

function parseProgress(value: string | null) {
  try {
    const stored = JSON.parse(value || "[]");
    return Array.isArray(stored) ? stored.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(PROGRESS_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(PROGRESS_EVENT, onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

function getServerSnapshot() {
  return "[]";
}

function useProgress() {
  return parseProgress(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
}

export function LessonProgress({ slug, isFinal = false }: { slug: string; isFinal?: boolean }) {
  const progress = useProgress();
  const complete = progress.includes(slug);

  function toggle() {
    const next = complete ? progress.filter((item) => item !== slug) : [...progress, slug];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  }

  return <div className="lesson-progress-action">
    <button className={`lesson-complete ${complete ? "is-complete" : ""}`} type="button" onClick={toggle}>{complete ? "✓ Lesson complete" : "Mark lesson complete"}</button>
    {isFinal && complete && <div className="lesson-finish" role="status"><span>NINE LESSONS COMPLETE</span><strong>You finished the course material. Now choose two practices to keep for the next thirty days.</strong><a href="/access/core-4m8r2p/workbook#thirty-day-plan">Build your thirty-day plan →</a></div>}
  </div>;
}

export function CourseProgress({ lessonSlugs }: { lessonSlugs: string[] }) {
  const progress = useProgress();
  const count = progress.filter((slug) => lessonSlugs.includes(slug)).length;

  return <div className="course-progress" aria-label={`${count} of ${lessonSlugs.length} lessons complete`}><span><b>{count}</b> / {lessonSlugs.length} complete</span><i><u style={{ width: `${(count / lessonSlugs.length) * 100}%` }} /></i></div>;
}

export function CourseResume({ lessons }: { lessons: { slug: string; number: string; title: string }[] }) {
  const progress = useProgress();
  const next = lessons.find((lesson) => !progress.includes(lesson.slug));

  if (!next) {
    return <div className="course-resume"><span>NINE LESSONS COMPLETE</span><strong>You finished the course material. Now choose two practices to keep for the next thirty days.</strong><a href="/access/core-4m8r2p/workbook#thirty-day-plan">Build your thirty-day plan →</a></div>;
  }

  const started = progress.length > 0;
  return <div className="course-resume"><span>{started ? "YOUR NEXT LESSON" : "AFTER SETUP, BEGIN HERE"}</span><strong>{next.number} · {next.title}</strong><a href={`/access/core-4m8r2p/lesson/${next.slug}`}>{started ? "Continue the course" : "Begin the first lesson"} →</a></div>;
}

export function PrintWorkbookButton() {
  return <button className="button primary" type="button" onClick={() => window.print()}>Print or save as PDF <b>↓</b></button>;
}
