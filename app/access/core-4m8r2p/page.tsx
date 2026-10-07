import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { CORE_LESSONS, CORE_MOVEMENTS, RESOURCE_PACK_FILE } from "../../course-content";
import { nextLessonSlug } from "../../../lib/progress";
import { CourseShell, CheckIcon, COURSE_ROOT } from "../course-shell";
import styles from "../course.module.css";

export const metadata: Metadata = {
  title: "All the Way Here | Your Course",
  description: "Your private access to the Here Supply Co. course, All the Way Here.",
  robots: { index: false, follow: false },
};

/**
 * Everything printable, in three files. The Focus Protocol has its own page in
 * the course rail, and each lesson links its own sheet, so this list stays short.
 */
const RESOURCES = [
  {
    label: "Write in it",
    title: "The course book",
    note: "The Focus Protocol and all nine lessons on paper, with room to write. 25 pages.",
    href: "/downloads/all-the-way-here-print-edition.pdf",
  },
  {
    label: "Print it once",
    title: "The Resource Pack",
    note: "Every sheet in one file, in course order: the Focus Protocol, the Sunday Board, one sheet per lesson, the field card, and three family tools at the back.",
    href: RESOURCE_PACK_FILE,
  },
  {
    label: "Every week",
    title: "The Sunday Board Meeting",
    note: "The fifteen minute weekly conversation that holds the rest together. Your own week is on the back.",
    href: "/downloads/sunday-board-meeting.pdf",
  },
];

export default function CourseHome() {
  const completed = new Set<string>();

  const orderedSlugs = CORE_LESSONS.map((lesson) => lesson.slug);
  const doneCount = orderedSlugs.filter((slug) => completed.has(slug)).length;
  const isFinished = doneCount === orderedSlugs.length;
  const isFresh = doneCount === 0;

  const nextSlug = nextLessonSlug(orderedSlugs, completed);
  const nextLesson = CORE_LESSONS.find((lesson) => lesson.slug === nextSlug)!;
  const nextMovement = CORE_MOVEMENTS.find((m) => m.key === nextLesson.movement);
  const startingHref = isFresh ? "/access/focus-7f3k9q" : `${COURSE_ROOT}/lesson/${nextLesson.slug}`;
  const startingLabel = isFresh ? "Focus Protocol · 72 hours" : `${nextMovement?.name} ${nextLesson.number}`;
  const startingTitle = isFresh ? "Begin with the Focus Protocol." : nextLesson.title;
  const startingSummary = isFresh
    ? "Four small moves for three days. You will have a clearer picture of what deserves your attention before you start the lessons."
    : nextLesson.summary;

  return (
    <CourseShell completed={completed}>
      <p className={styles.eyebrow}>
        Welcome. You're in.
      </p>
      <h1 className={styles.pageTitle}>
        Here is what happens next.
      </h1>
      <p className={styles.pageLede}>
        There is no rush. Start the Focus Protocol today, print the course book while it runs, then take one lesson and one practice at a time.
      </p>

      {/* Continue / start */}
      <Link href={startingHref} className={styles.continueCard}>
        <div className={styles.continueBody}>
          <span className={styles.continueKicker}>
            {isFresh ? "Start here" : isFinished ? "Revisit" : "Continue"} · {startingLabel}
          </span>
          <h2 className={styles.continueTitle}>{startingTitle}</h2>
          <p className={styles.continueSub}>{startingSummary}</p>
          <span className={`${styles.btn} ${styles.btnPrimary}`}>
            {isFresh ? "Begin the Focus Protocol" : isFinished ? "Open the lesson" : "Continue the lesson"}
            <span aria-hidden="true">→</span>
          </span>
        </div>
        <div className={styles.continueMedia}>
          <img
            src={isFresh ? "/assets/course/art/emotional-phone-at-game.jpg" : nextLesson.artImage}
            alt={isFresh ? "A parent looking at a phone while a child waits on a baseball field" : nextLesson.artAlt}
            style={{ objectPosition: isFresh ? "center" : nextLesson.previewPosition }}
            loading="eager"
          />
        </div>
      </Link>

      {/* First-run guidance, only while it is actually useful */}
      {isFresh && (
        <div className={styles.firstRun}>
          <h2 className={styles.firstRunTitle}>Four steps, in this order.</h2>
          <ol className={styles.firstRunSteps}>
            <li>
              <span>
                <b>Start the Focus Protocol today.</b> Four small moves for three days, before
                either of you asks the other to change anything.
              </span>
            </li>
            <li>
              <span>
                <b>Print the course book and the Resource Pack while it runs.</b> The book is the
                whole course with room to write. The pack is every sheet, in order.
              </span>
            </li>
            <li>
              <span>
                <b>On day four, open Return.</b> Read one lesson, put its sheet where the moment
                happens, try the practice during a normal week, and mark it as tried.
              </span>
            </li>
            <li>
              <span>
                <b>Finish with the Thirty Day Page.</b> Keep the two practices that helped and let
                the rest go without guilt.
              </span>
            </li>
          </ol>
        </div>
      )}

      {/* The three movements */}
      <div className={styles.sectionHead}>
        <h2>The three movements</h2>
        <p>Nine lessons · one practice each</p>
      </div>
      <div className={styles.movements}>
        {CORE_MOVEMENTS.map((movement) => {
          const lessons = CORE_LESSONS.filter((lesson) => lesson.movement === movement.key);
          return (
            <section key={movement.key} className={styles.movementCard}>
              <header className={styles.movementHead}>
                <span className={styles.movementIndex}>{movement.number}</span>
                <h3 className={styles.movementName}>{movement.name}</h3>
                <p className={styles.movementBlurb}>{movement.line}</p>
              </header>
              <div className={styles.movementList}>
                {lessons.map((lesson) => {
                  const isDone = completed.has(lesson.slug);
                  return (
                    <Link
                      key={lesson.slug}
                      href={`${COURSE_ROOT}/lesson/${lesson.slug}`}
                      className={`${styles.movementItem} ${isDone ? styles.movementItemDone : ""}`}
                      data-lesson={lesson.slug}
                    >
                      <span className={styles.lessonNum}>{lesson.number}</span>
                      <span>{lesson.title}</span>
                      <span className={isDone ? styles.tick : styles.tickEmpty}>
                        <CheckIcon filled={isDone} />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Resources */}
      <div className={styles.sectionHead}>
        <h2>Everything to print</h2>
        <p>Three files. That is all of it.</p>
      </div>
      <div className={styles.resources}>
        {RESOURCES.map((resource) => (
          <Link key={resource.href} href={resource.href} className={styles.resourceCard}>
            <span className={styles.resourceLabel}>{resource.label}</span>
            <span className={styles.resourceTitle}>{resource.title}</span>
            <span className={styles.resourceNote}>{resource.note}</span>
          </Link>
        ))}
      </div>

      {/* Help along the way */}
      <div className={styles.sectionHead}>
        <h2>Help along the way</h2>
        <p>You do not have to do this alone.</p>
      </div>
      <div className={styles.resources}>
        <div className={styles.resourceCard}>
          <span className={styles.resourceLabel}>Every Sunday</span>
          <span className={styles.resourceTitle}>A short email from Chris</span>
          <span className={styles.resourceNote}>For nine weeks, one note with that week&rsquo;s practice, the smallest version for a hard week, and one question for your Sunday Board. Reply and it comes straight to Chris.</span>
        </div>
        <Link href="/coaching" className={styles.resourceCard}>
          <span className={styles.resourceLabel}>Optional</span>
          <span className={styles.resourceTitle}>Thirty Days With Chris</span>
          <span className={styles.resourceNote}>One month of one on one email coaching: a call to start, a weekly check in, and a real reply within 48 hours.</span>
        </Link>
      </div>
    </CourseShell>
  );
}
