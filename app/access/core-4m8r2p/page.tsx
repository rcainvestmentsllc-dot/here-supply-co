import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { CORE_LESSONS, CORE_MOVEMENTS } from "../../course-content";
import { nextLessonSlug } from "../../../lib/progress";
import { CourseShell, CheckIcon, COURSE_ROOT } from "../course-shell";
import styles from "../course.module.css";

export const metadata: Metadata = {
  title: "All the Way Here | Your Course",
  description: "Your private access to the Here Supply Co. course, All the Way Here.",
  robots: { index: false, follow: false },
};

const RESOURCES = [
  {
    label: "Recommended",
    title: "The complete course book",
    note: "The whole course in one 26 page book. Print it and write in it. Use the online lessons when you want a quick reminder.",
    href: "/downloads/all-the-way-here-print-edition.pdf",
  },
  {
    label: "One page",
    title: "Field card",
    note: "Every practice on a single sheet for the fridge or the car.",
    href: "/downloads/all-the-way-here-field-card.pdf",
  },
  {
    label: "The whole kit",
    title: "Resource Pack",
    note: "Every printable sheet in one download, including the Sunday Board Meeting, the cards, and the family tools.",
    href: "/downloads/here-supply-resource-pack.zip",
  },
  {
    label: "Three family tools",
    title: "Screen Reset, Weekly Tradition, Teen Check In",
    note: "For when the practices reach the kids. One page each.",
    href: "/downloads/family-tools.pdf",
  },
  {
    label: "Start here · three days",
    title: "Focus Protocol",
    note: "Four small moves for getting the phone out of the way and seeing what changes.",
    href: "/access/focus-7f3k9q",
  },
  {
    label: "Every Sunday",
    title: "Sunday Board Meeting",
    note: "The fifteen minute weekly conversation that holds the rest together.",
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
                <b>Print the course book while it runs.</b> The whole course is in it, with room to
                write. Use the online lessons when you want a quick reminder.
              </span>
            </li>
            <li>
              <span>
                <b>On day four, open Return.</b> Read one lesson, try the practice during a normal
                week, write what happened, and mark it as tried.
              </span>
            </li>
            <li>
              <span>
                <b>Use the family tools when they fit.</b> They help you use the practices with your
                kids. You do not have to finish them.
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
