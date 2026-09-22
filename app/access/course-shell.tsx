import type { ReactNode } from "react";
import { PlainLink as Link } from "../plain-link";
import { CORE_LESSONS, CORE_MOVEMENTS } from "../course-content";
import { RailDisclosure } from "./course-rail";
import styles from "./course.module.css";

const COURSE_ROOT = "/access/core-4m8r2p";

function CheckIcon({ filled }: { filled: boolean }) {
  if (!filled) {
    return (
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path
        d="M4.9 8.2l2.1 2.1 4.1-4.4"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CourseShell({
  completed,
  currentSlug,
  children,
}: {
  completed: ReadonlySet<string>;
  currentSlug?: string;
  children: ReactNode;
}) {
  const total = CORE_LESSONS.length;
  const done = CORE_LESSONS.filter((lesson) => completed.has(lesson.slug)).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className={styles.shell}>
      <aside className={styles.rail}>
        <div className={styles.railHead}>
          <Link href="/" className={styles.railBrand}>
            <span aria-hidden="true">←</span> Here Supply Co.
          </Link>
          <p className={styles.railTitle}>All the Way Here</p>

          <div className={styles.progress}>
            <div className={styles.progressMeta}>
              <span>Progress</span>
              <b>
                {done} of {total}
              </b>
            </div>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuenow={done}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label="Lessons completed"
            >
              <div className={styles.progressFill} style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        <RailDisclosure>
          <nav className={styles.railNav} aria-label="Course lessons">
            {CORE_MOVEMENTS.map((movement) => {
              const lessons = CORE_LESSONS.filter(
                (lesson) => lesson.movement === movement.key
              );
              return (
                <div key={movement.key} className={styles.movementGroup}>
                  <p className={styles.movementLabel}>
                    {movement.name} <i />
                  </p>
                  {lessons.map((lesson) => {
                    const isDone = completed.has(lesson.slug);
                    const isCurrent = lesson.slug === currentSlug;
                    const classes = [styles.lessonLink];
                    if (isDone) classes.push(styles.lessonDone);
                    if (isCurrent) classes.push(styles.lessonCurrent);
                    return (
                      <Link
                        key={lesson.slug}
                        href={`${COURSE_ROOT}/lesson/${lesson.slug}`}
                        className={classes.join(" ")}
                        aria-current={isCurrent ? "page" : undefined}
                      >
                        <span className={styles.lessonNum}>{lesson.number}</span>
                        <span className={styles.lessonName}>{lesson.title}</span>
                        <span
                          className={`${styles.lessonState} ${
                            isDone ? styles.tick : styles.tickEmpty
                          }`}
                        >
                          <CheckIcon filled={isDone} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          <div className={styles.railFoot}>
            <Link href={`${COURSE_ROOT}`} className={styles.railFootLink}>
              Course home <span aria-hidden="true">→</span>
            </Link>
            <Link href={`${COURSE_ROOT}/workbook`} className={styles.railFootLink}>
              Workbook <span aria-hidden="true">→</span>
            </Link>
            <Link href="/access/focus-7f3k9q" className={styles.railFootLink}>
              Attention Reset <span aria-hidden="true">→</span>
            </Link>
          </div>
        </RailDisclosure>
      </aside>

      <main id="main-content" className={styles.main}>
        <div className={styles.inner}>{children}</div>
      </main>
    </div>
  );
}

export { CheckIcon, COURSE_ROOT };
