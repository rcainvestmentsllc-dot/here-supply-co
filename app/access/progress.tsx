"use client";

import { useEffect, useState } from "react";
import styles from "./course.module.css";

/**
 * Lesson progress, kept in this browser only.
 *
 * The course has one shared password and no accounts, so there is nowhere on
 * the server to keep a person's progress. Each browser remembers which lessons
 * were marked done; a different phone or laptop starts fresh. Every read and
 * write is wrapped because storage can be blocked in private windows.
 */
const KEY = "hsc_course_done_v1";
const EVENT = "hsc-progress";

export function readDone(): Set<string> {
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as unknown) : [];
    return new Set(Array.isArray(list) ? list.filter((x): x is string => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

function writeDone(done: Set<string>) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...done]));
  } catch {
    /* storage blocked; the button still reflects the click for this visit */
  }
  window.dispatchEvent(new Event(EVENT));
}

function paint(done: Set<string>) {
  document.querySelectorAll<HTMLElement>("[data-lesson]").forEach((el) => {
    el.dataset.done = done.has(el.dataset.lesson || "") ? "true" : "false";
  });
  const total = document.querySelectorAll("[data-lesson-total]").length
    ? Number((document.querySelector("[data-lesson-total]") as HTMLElement).dataset.lessonTotal)
    : 0;
  const count = Math.min(done.size, total || done.size);
  document.querySelectorAll<HTMLElement>("[data-progress-count]").forEach((el) => {
    el.textContent = String(count);
  });
  document.querySelectorAll<HTMLElement>("[data-progress-fill]").forEach((el) => {
    el.style.width = total ? `${Math.round((count / total) * 100)}%` : "0%";
  });
  document.querySelectorAll<HTMLElement>("[data-progress-bar]").forEach((el) => {
    el.setAttribute("aria-valuenow", String(count));
  });
}

/** Paints done states onto the server rendered rail and lists. */
export function ProgressSync() {
  useEffect(() => {
    const update = () => paint(readDone());
    update();
    window.addEventListener(EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return null;
}

/** The button at the end of a lesson. */
export function MarkDone({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(readDone().has(slug));
  }, [slug]);

  function toggle() {
    const all = readDone();
    if (all.has(slug)) all.delete(slug);
    else all.add(slug);
    writeDone(all);
    setDone(all.has(slug));
  }

  return (
    <div className={styles.markDone}>
      <button
        type="button"
        className={`${styles.btn} ${done ? styles.btnGhost : styles.btnPrimary}`}
        aria-pressed={done}
        onClick={toggle}
      >
        {done ? "Marked as tried" : "I tried this practice"}
      </button>
      <p>{done ? "Saved on this device. Tap again to undo." : "Mark it once you have used it in a real week. It saves on this device."}</p>
    </div>
  );
}
