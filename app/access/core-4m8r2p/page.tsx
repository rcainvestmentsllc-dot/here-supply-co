import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { CORE_LESSONS, CORE_MOVEMENTS } from "../../course-content";
import { requireProductAccess } from "../../../lib/require-access";
import { getEnv } from "../../../lib/cloudflare-env";
import { getCompletedLessons, nextLessonSlug } from "../../../lib/progress";
import { CourseShell, CheckIcon, COURSE_ROOT } from "../course-shell";
import styles from "../course.module.css";

export const metadata: Metadata = {
  title: "All the Way Here | Your Course",
  description: "Your private access to the Here Supply Co. course, All the Way Here.",
  robots: { index: false, follow: false },
};

const RESOURCES = [
  {
    label: "Companion",
    title: "The workbook",
    note: "Print it, or fill it in here. Every practice has a place to land.",
    href: `${COURSE_ROOT}/workbook`,
  },
  {
    label: "One page",
    title: "Field card",
    note: "All nine practices on a single sheet you can keep in the truck.",
    href: "/downloads/all-the-way-here-field-card.pdf",
  },
  {
    label: "Three days",
    title: "Attention Reset",
    note: "The four small moves. Start here if the phone is the loudest problem.",
    href: "/access/focus-7f3k9q",
  },
  {
    label: "Free companion",
    title: "Sunday Board Meeting",
    note: "A fifteen-minute weekly conversation for two people sharing a life.",
    href: "/sunday-board#get-board",
  },
];

export default async function CourseHome() {
  const email = await requireProductAccess("core", COURSE_ROOT);
  const env = getEnv();
  const completed = await getCompletedLessons(env, email);

  const orderedSlugs = CORE_LESSONS.map((lesson) => lesson.slug);
  const doneCount = orderedSlugs.filter((slug) => completed.has(slug)).length;
  const isFinished = doneCount === orderedSlugs.length;
  const isFresh = doneCount === 0;

  const nextSlug = nextLessonSlug(orderedSlugs, completed);
  const nextLesson = CORE_LESSONS.find((lesson) => lesson.slug === nextSlug)!;
  const nextMovement = CORE_MOVEMENTS.find((m) => m.key === nextLesson.movement);

  return (
    <CourseShell completed={completed}>
      <p className={styles.eyebrow}>
        {isFresh ? "Welcome — you're in" : isFinished ? "All nine complete" : "Your course"}
      </p>
      <h1 className={styles.pageTitle}>
        {isFresh
          ? "Here is exactly what happens next."
          : isFinished
            ? "You've been through all of it."
            : "Pick up where you left off."}
      </h1>
      <p className={styles.pageLede}>
        {isFresh
          ? "You do not need to finish quickly or figure out the system on your own. Set up the workbook, then take one lesson and one real-life practice at a time."
          : isFinished
            ? "The practices are yours now. Come back to any lesson when a season changes and you need the reminder."
            : "One lesson, one practice, one ordinary week. The course will still be here when life interrupts."}
      </p>

      {/* Continue / start */}
      <Link href={`${COURSE_ROOT}/lesson/${nextLesson.slug}`} className={styles.continueCard}>
        <div className={styles.continueBody}>
          <span className={styles.continueKicker}>
            {isFresh ? "Start here" : isFinished ? "Revisit" : "Continue"} · {nextMovement?.name}{" "}
            {nextLesson.number}
          </span>
          <h2 className={styles.continueTitle}>{nextLesson.title}</h2>
          <p className={styles.continueSub}>{nextLesson.summary}</p>
          <span className={`${styles.btn} ${styles.btnPrimary}`}>
            {isFresh ? "Begin the lesson" : isFinished ? "Open the lesson" : "Continue the lesson"}
            <span aria-hidden="true">→</span>
          </span>
        </div>
        <div className={styles.continueMedia}>
          <img
            src={nextLesson.artImage}
            alt={nextLesson.artAlt}
            style={{ objectPosition: nextLesson.previewPosition }}
            loading="eager"
          />
        </div>
      </Link>

      {/* First-run guidance, only while it is actually useful */}
      {isFresh && (
        <div className={styles.firstRun}>
          <h2 className={styles.firstRunTitle}>Four steps. No hunting around.</h2>
          <ol className={styles.firstRunSteps}>
            <li>
              <span>
                <b>Set up the workbook.</b> Print the 16-page companion, or use the browser
                version. Do this before lesson one.
              </span>
            </li>
            <li>
              <span>
                <b>Reset your attention.</b> Use the four small moves for three days before asking
                anyone else to change anything.
              </span>
            </li>
            <li>
              <span>
                <b>Take one lesson into real life.</b> Read it, try the practice during an ordinary
                week, write what happened, mark it complete.
              </span>
            </li>
            <li>
              <span>
                <b>Use the family tools when they fit.</b> They are application tools, not more
                lessons to finish.
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
        <h2>Tools and companions</h2>
        <p>Use what meets a real need</p>
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
    </CourseShell>
  );
}
