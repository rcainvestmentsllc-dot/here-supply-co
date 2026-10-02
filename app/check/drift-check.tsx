"use client";

import { useMemo, useRef, useState } from "react";
import { EmailSignup } from "../email-signup";
import { PRESSURE_ORDER, QUESTIONS, RESULTS, type PressureKey } from "./results";
import styles from "./check.module.css";

export type LessonSummary = {
  slug: string;
  number: string;
  title: string;
  practice: string;
  action: string;
  artImage: string;
  artAlt: string;
};

function tally(answers: (PressureKey | null)[]) {
  const counts = new Map<PressureKey, number>();
  for (const key of answers) if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
  const ranked = [...PRESSURE_ORDER].sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));
  return ranked[0];
}

export function DriftCheck({ lessons, checkoutUrl }: { lessons: Record<string, LessonSummary>; checkoutUrl: string }) {
  const [answers, setAnswers] = useState<(PressureKey | null)[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const step = answers.length;
  const done = step >= QUESTIONS.length;
  const result = useMemo(() => (done ? tally(answers) : null), [done, answers]);

  function choose(index: number, key: PressureKey | null) {
    setChosen(index);
    window.setTimeout(() => {
      setAnswers((prev) => [...prev, key]);
      setChosen(null);
      settle();
    }, 260);
  }

  /** Keep keyboard focus on the panel and bring its top into view on small screens. */
  function settle() {
    const el = panel.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    if (el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function back() {
    setAnswers((prev) => prev.slice(0, -1));
  }

  function restart() {
    setAnswers([]);
    settle();
  }

  if (done && result) {
    const copy = RESULTS[result];
    const lesson = copy.lessonSlug ? lessons[copy.lessonSlug] : null;
    return (
      <div className={styles.panel} ref={panel} tabIndex={-1} aria-live="polite">
        <p className={styles.kicker}>Where you are drifting</p>
        <h2 className={styles.resultName}>{copy.name}</h2>
        <p className={styles.read}>{copy.read}</p>

        <div className={styles.tonight}>
          <span>Try this tonight</span>
          {lesson ? (
            <>
              <strong>{lesson.practice}</strong>
              <p>{lesson.action}</p>
            </>
          ) : (
            <>
              <strong>Phone in a drawer from dinner until the kids are asleep, or until you go to bed.</strong>
              <p>One night. No exceptions for &ldquo;just checking.&rdquo; Notice how often your hand goes looking for it.</p>
            </>
          )}
        </div>

        <div className={styles.paths}>
          <a className={styles.pathFree} href={copy.free.href}>
            <span>Free starting point</span>
            <b>{copy.free.label} <i aria-hidden="true">→</i></b>
          </a>
          {lesson ? (
            <a className={styles.pathLesson} href="/library#curriculum">
              <img src={lesson.artImage} alt="" width="1672" height="942" loading="lazy" />
              <span>Lesson {lesson.number} in All the Way Here</span>
              <b>{lesson.title} <i aria-hidden="true">→</i></b>
            </a>
          ) : (
            <a className={styles.pathLesson} href="/library#focus-protocol">
              <span>Where All the Way Here starts</span>
              <b>The 72 hour Focus Protocol <i aria-hidden="true">→</i></b>
            </a>
          )}
        </div>

        <div className={styles.resultFoot}>
          <a className={styles.buy} href={checkoutUrl}>Get All the Way Here · $99</a>
          <button type="button" className={styles.textButton} onClick={restart}>Take it again</button>
        </div>

        <EmailSignup
          source="drift_check"
          next="/check"
          title="Start with the free Sunday Board"
          blurb="Fifteen minutes on Sunday to get the week out of two heads and onto one page. I'll email you the guide, then three short notes over the next week. No spam, and you can unsubscribe anytime."
        />
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div className={styles.panel} ref={panel} tabIndex={-1}>
      <div className={styles.progress} aria-hidden="true">
        {QUESTIONS.map((_, i) => <i key={i} className={i < step ? styles.filled : i === step ? styles.current : undefined} />)}
      </div>
      <p className={styles.kicker}>Question {step + 1} of {QUESTIONS.length}</p>
      <fieldset className={styles.question} key={step}>
        <legend>{q.prompt}</legend>
        <div className={styles.options}>
          {q.options.map((option, i) => (
            <button
              type="button"
              key={option.label}
              className={chosen === i ? styles.picked : undefined}
              onClick={() => choose(i, option.key)}
              disabled={chosen !== null}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>
      {step > 0 && <button type="button" className={styles.textButton} onClick={back}>← Back</button>}
    </div>
  );
}
