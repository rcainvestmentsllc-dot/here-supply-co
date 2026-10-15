import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { MEN_COURSE, MEN_LESSONS, MEN_MOVEMENTS, MEN_PRINT_FILES, menLessonHref } from "../../men/men-course";
import { CourseShell, CheckIcon } from "../course-shell";
import { MEN_EDITION } from "./edition";
import styles from "../course.module.css";

export const metadata: Metadata = {
  title: "All the Way Here, Men's Edition | Your Course",
  description: "Your private access to All the Way Here, Men's Edition.",
  robots: { index: false, follow: false },
};

export default function MenCourseHome() {
  const prefix = MEN_COURSE.progressPrefix;

  return (
    <CourseShell completed={new Set<string>()} edition={MEN_EDITION}>
      <p className={styles.eyebrow}>Welcome. You&rsquo;re in.</p>
      <h1 className={styles.pageTitle}>Here is what happens next.</h1>
      <p className={styles.pageLede}>
        No rush. Start the Focus Protocol today, print the course book while it runs, then take one
        lesson and one practice a week. Every lesson shows you the practice at home and at work.
      </p>

      <Link href={MEN_COURSE.focus} className={styles.continueCard}>
        <div className={styles.continueBody}>
          <span className={styles.continueKicker}>Start here · Focus Protocol · 72 hours</span>
          <h2 className={styles.continueTitle}>Begin with the Focus Protocol.</h2>
          <p className={styles.continueSub}>
            Four small moves for three days. You will see what deserves your attention before you
            start the lessons.
          </p>
          <span className={`${styles.btn} ${styles.btnPrimary}`}>
            Begin the Focus Protocol <span aria-hidden="true">→</span>
          </span>
        </div>
        <div className={styles.continueMedia}>
          <img
            src="/assets/course/photo/movement-return-v1.jpg"
            alt="A man setting his phone down on a table by the door before walking into the house"
            loading="eager"
          />
        </div>
      </Link>

      <div className={styles.firstRun}>
        <h2 className={styles.firstRunTitle}>Four steps, in this order.</h2>
        <ol className={styles.firstRunSteps}>
          <li>
            <span>
              <b>Start the Focus Protocol today.</b> Four small moves for three days, before you ask
              anyone else to change anything.
            </span>
          </li>
          <li>
            <span>
              <b>Print the course book while it runs.</b> The whole course with room to write. Put
              each lesson&rsquo;s sheet where the moment happens: the glovebox, the desk, the nightstand.
            </span>
          </li>
          <li>
            <span>
              <b>On day four, open Return.</b> One lesson a week. Try the practice at home and at
              work, then mark it as tried.
            </span>
          </li>
          <li>
            <span>
              <b>Finish with the Thirty Day Page.</b> Keep the two practices that helped and let the
              rest go without guilt.
            </span>
          </li>
        </ol>
      </div>

      <div className={styles.sectionHead}>
        <h2>The three movements</h2>
        <p>Nine lessons · one practice each</p>
      </div>
      <div className={styles.movements}>
        {MEN_MOVEMENTS.map((movement) => {
          const lessons = MEN_LESSONS.filter((lesson) => lesson.movement === movement.key);
          return (
            <section key={movement.key} className={styles.movementCard}>
              <header className={styles.movementHead}>
                <span className={styles.movementIndex}>{movement.number}</span>
                <h3 className={styles.movementName}>{movement.name}</h3>
                <p className={styles.movementBlurb}>{movement.line}</p>
              </header>
              <div className={styles.movementList}>
                {lessons.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={menLessonHref(lesson.slug)}
                    className={styles.movementItem}
                    data-lesson={prefix + lesson.slug}
                  >
                    <span className={styles.lessonNum}>{lesson.number}</span>
                    <span>{lesson.title}</span>
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
        <p>Three files to start. Each lesson has its own sheet on its page.</p>
      </div>
      <div className={styles.resources}>
        {MEN_PRINT_FILES.map((resource) => (
          <Link key={resource.href} href={resource.href} className={styles.resourceCard}>
            <span className={styles.resourceLabel}>{resource.label}</span>
            <span className={styles.resourceTitle}>{resource.title}</span>
            <span className={styles.resourceNote}>{resource.note}</span>
          </Link>
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
