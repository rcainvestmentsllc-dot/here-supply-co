import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import {
  MEN_COURSE,
  MEN_LESSONS,
  MEN_MOVEMENTS,
  MEN_PRINT_FILES,
  MEN_SHEETS,
  MEN_SOLO,
  menLessonHref,
} from "../../men/men-course";
import { CourseShell, CheckIcon } from "../course-shell";
import { MEN_EDITION } from "./edition";
import styles from "../course.module.css";
import men from "./men.module.css";

export const metadata: Metadata = {
  title: "Carry It Well | Your Course",
  description: "Your private access to Carry It Well.",
  robots: { index: false, follow: false },
};

export default function MenCourseHome() {
  const prefix = MEN_COURSE.progressPrefix;

  return (
    <CourseShell completed={new Set<string>()} edition={MEN_EDITION}>
      <p className={styles.eyebrow}>Welcome. You&rsquo;re in.</p>
      <h1 className={styles.pageTitle}>Here is what happens next.</h1>
      <p className={styles.pageLede}>
        Nine lessons, one a week, each built around something men actually say out loud. Before the
        first one, you take half a day alone with a notebook. Every lesson shows the practice at home
        and at work, and every lesson has a sheet to print.
      </p>

      <Link href={menLessonHref(MEN_SOLO.slug)} className={styles.continueCard} data-lesson={prefix + MEN_SOLO.slug}>
        <div className={styles.continueBody}>
          <span className={styles.continueKicker}>Start here · The Solo · Half a day</span>
          <h2 className={styles.continueTitle}>Begin with The Solo.</h2>
          <p className={styles.continueSub}>
            A trail, a river or a bench with a long view. No phone, a notebook, and three questions.
            Bring what you write to Lesson 1.
          </p>
          <span className={`${styles.btn} ${styles.btnPrimary}`}>
            Read The Solo <span aria-hidden="true">→</span>
          </span>
        </div>
        <div className={styles.continueMedia}>
          <img src={MEN_SOLO.photo.src} alt={MEN_SOLO.photo.alt} loading="eager" />
        </div>
      </Link>

      <div className={styles.firstRun}>
        <h2 className={styles.firstRunTitle}>Four steps, in this order.</h2>
        <ol className={styles.firstRunSteps}>
          <li>
            <span>
              <b>Take The Solo this week.</b> Half a day outside, phone in the truck. If you can only
              get two hours, take two hours.
            </span>
          </li>
          <li>
            <span>
              <b>Print the course book.</b> Every lesson on paper with room to write. Keep it with
              the notebook from your Solo.
            </span>
          </li>
          <li>
            <span>
              <b>One lesson a week.</b> Read it on Sunday, try the practice all week at home and at
              work, then mark it as tried. Each lesson&rsquo;s sheet goes where the moment happens.
            </span>
          </li>
          <li>
            <span>
              <b>Answer the coaching question.</b> Every lesson ends with the question I would ask
              you on a call. Write the answer, even if nobody ever reads it.
            </span>
          </li>
        </ol>
      </div>

      <div className={styles.sectionHead}>
        <h2>The course</h2>
        <p>The Solo · nine lessons in three parts</p>
      </div>
      <div className={men.parts}>
        {MEN_MOVEMENTS.map((movement) => {
          const steps =
            movement.key === "START"
              ? [{ slug: MEN_SOLO.slug, number: "0", title: MEN_SOLO.title, line: MEN_SOLO.summary }]
              : MEN_LESSONS.filter((l) => l.movement === movement.key).map((l) => ({
                  slug: l.slug,
                  number: l.number,
                  title: l.title,
                  line: `“${l.says}”`,
                }));
          return (
            <section key={movement.key} className={men.partCard}>
              <img src={movement.still} alt={movement.stillAlt} loading="lazy" />
              <div className={men.partBody}>
                <header>
                  <b>{movement.number}</b>
                  <h3>{movement.name}</h3>
                  <p>{movement.line}</p>
                </header>
                {steps.map((step) => (
                  <Link key={step.slug} href={menLessonHref(step.slug)} className={men.partLesson} data-lesson={prefix + step.slug}>
                    <span>{step.number === "0" ? "00" : step.number.padStart(2, "0")}</span>
                    <span>
                      <strong>{step.title}</strong>
                      <em>{step.line}</em>
                    </span>
                    <span className={styles.tickEmpty}>
                      <CheckIcon filled={false} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className={styles.sectionHead}>
        <h2>Everything to print</h2>
        <p>Start with these. Every sheet is also on its lesson&rsquo;s page.</p>
      </div>
      <div className={styles.resources}>
        {MEN_PRINT_FILES.map((resource) => (
          <a key={resource.href} href={resource.href} className={styles.resourceCard} download>
            <span className={styles.resourceLabel}>{resource.label}</span>
            <span className={styles.resourceTitle}>{resource.title}</span>
            <span className={styles.resourceNote}>{resource.note}</span>
          </a>
        ))}
      </div>

      <div className={styles.sectionHead}>
        <h2>The ten sheets</h2>
        <p>
          One for The Solo and one for each lesson ·{" "}
          <a href="/downloads/men/sheets/all-sheets.pdf" download>
            Print all of them in one file
          </a>
        </p>
      </div>
      <div className={men.sheetsGrid}>
        {MEN_SHEETS.map((sheet, i) => (
          <a key={sheet.slug} href={sheet.file} className={men.sheetItem} download>
            <small>{i === 0 ? "Before you start" : `Lesson ${i}`}</small>
            <strong>{sheet.name}</strong>
            <span>{sheet.holds}</span>
          </a>
        ))}
      </div>

      <div className={styles.sectionHead}>
        <h2>If you want someone in your corner</h2>
        <p>The course gives you the practices. Coaching keeps them going.</p>
      </div>
      <div className={styles.resources}>
        <Link href="/men/coaching#intensive" className={styles.resourceCard}>
          <span className={styles.resourceLabel}>Twelve weeks</span>
          <span className={styles.resourceTitle}>The 90 Day Intensive</span>
          <span className={styles.resourceNote}>This course, one lesson a week, with a weekly call with Chris.</span>
        </Link>
        <Link href="/men/apply" className={styles.resourceCard}>
          <span className={styles.resourceLabel}>Start here</span>
          <span className={styles.resourceTitle}>Book a free call</span>
          <span className={styles.resourceNote}>Twenty minutes to see whether coaching fits. No pitch if it does not.</span>
        </Link>
      </div>
    </CourseShell>
  );
}
