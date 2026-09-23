import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CORE_LESSONS, LESSON_GUIDES, getCoreLesson, getMovement, getKitSheet } from "../../../../course-content";
import { PlainLink as Link } from "../../../../plain-link";
import { requireProductAccess } from "../../../../../lib/require-access";
import { getEnv } from "../../../../../lib/cloudflare-env";
import { getCompletedLessons } from "../../../../../lib/progress";
import { CourseShell, COURSE_ROOT } from "../../../course-shell";
import styles from "../../../course.module.css";

export const metadata: Metadata = {
  title: "All the Way Here Lesson | Here Supply Co.",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return CORE_LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export default async function CoreLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lessonPath = `${COURSE_ROOT}/lesson/${slug}`;
  const email = await requireProductAccess("core", lessonPath);

  const lesson = getCoreLesson(slug);
  if (!lesson) notFound();

  const env = getEnv();
  const completed = await getCompletedLessons(env, email);
  const isDone = completed.has(lesson.slug);

  const index = CORE_LESSONS.findIndex((item) => item.slug === lesson.slug);
  const previous = CORE_LESSONS[index - 1];
  const next = CORE_LESSONS[index + 1];
  const printablePage = index + 4;
  const movement = getMovement(lesson.movement);
  const guide = LESSON_GUIDES[lesson.slug];

  return (
    <CourseShell completed={completed} currentSlug={lesson.slug}>
      <header className={styles.lessonHead}>
        <p className={styles.lessonEyebrow}>
          {movement?.name} <em>Lesson {lesson.number}</em>
        </p>
        <h1 className={styles.lessonTitle}>{lesson.title}</h1>
        <p className={styles.lessonSubtitle}>{lesson.subtitle}</p>
      </header>

      <figure className={styles.lessonArt}>
        <img
          src={lesson.artImage}
          alt={lesson.artAlt}
          width={1672}
          height={942}
          style={{ objectPosition: lesson.previewPosition }}
        />
        <figcaption>
          <b>
            {lesson.number} · {movement?.name}
          </b>
          <span>{lesson.artCaption}</span>
        </figcaption>
      </figure>

      <section className={styles.prose}>
        <p className={styles.label}>A familiar scene</p>
        <p>{lesson.scene}</p>
      </section>

      {lesson.problemImage && lesson.problemAlt && lesson.problemCaption && (
        <figure className={styles.lessonArt}>
          <img
            src={lesson.problemImage}
            alt={lesson.problemAlt}
            width={1672}
            height={942}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <b>What divided attention feels like</b>
            <span>{lesson.problemCaption}</span>
          </figcaption>
        </figure>
      )}

      <section className={styles.prose}>
        <p className={styles.label}>What is happening</p>
        <h2 className={styles.blockTitle}>{lesson.summary}</h2>
        <p>{lesson.problem}</p>
      </section>

      <section className={styles.principle}>
        <p className={styles.label}>The principle</p>
        <blockquote>{lesson.principle}</blockquote>
      </section>

      <section className={styles.prose}>
        <p className={styles.label}>The practice</p>
        <h2 className={styles.blockTitle}>{lesson.practice}</h2>
        <p>{lesson.practiceIntro}</p>
      </section>

      <ol className={styles.steps}>
        {lesson.steps.map((step) => (
          <li key={step.title}>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* The sheet this lesson is the instructions for. A practice you have to
          remember competes with the phone; a practice already sitting where the
          moment happens does not. */}
      <section className={styles.sheet}>
        <div className={styles.sheetCopy}>
          <span>FIELD KIT · SHEET {lesson.kit.sheet}</span>
          <h3>{lesson.kit.sheetName}</h3>
          <p className={styles.sheetLives}>Lives at: {lesson.kit.livesAt}</p>
          <p>
            Print it once and put it where the moment actually happens. That placement is the
            practice. Everything on this page is just how to use it.
          </p>
          {getKitSheet(lesson.kit.sheet) && (
            <a
              className={styles.sheetLink}
              href={getKitSheet(lesson.kit.sheet)!.file}
              download
            >
              Print sheet {lesson.kit.sheet} <span aria-hidden="true">&darr;</span>
            </a>
          )}
        </div>
      </section>

      <aside className={styles.together}>
        <span>DOING THIS TOGETHER</span>
        <p>{lesson.together}</p>
      </aside>

      {lesson.withoutKids && (
        <aside className={styles.withoutKids}>
          <span>IF YOU DO NOT HAVE KIDS</span>
          <strong>{lesson.withoutKids.note}</strong>
          <p>{lesson.withoutKids.body}</p>
        </aside>
      )}

      <p className={styles.encouragement}>{lesson.encouragement}</p>

      <div className={styles.pair}>
        <article className={styles.pairCard}>
          <h3>A practice can bend without breaking</h3>
          <p>{lesson.adaptation}</p>
        </article>
        <article className={styles.pairCard}>
          <h3>One move before tomorrow</h3>
          <p>{lesson.action}</p>
        </article>
      </div>

      {guide && (
        <section className={styles.kit}>
          <header className={styles.kitHead}>
            <p className={styles.label}>Practice kit</p>
            <h2 className={styles.blockTitle}>Make the idea usable.</h2>
            <p style={{ margin: 0, color: "var(--hsc-copy)" }}>
              This is the layer that takes the lesson out of your head and puts it into a real week.
            </p>
          </header>
          <div className={styles.kitGrid}>
            <article>
              <span>01 · Why it may help</span>
              <p>{guide.whyItHelps}</p>
            </article>
            <article>
              <span>02 · Words to use</span>
              <blockquote>&ldquo;{guide.wordsToUse}&rdquo;</blockquote>
            </article>
            <article>
              <span>03 · Watch for</span>
              <p>{guide.watchFor}</p>
            </article>
            <article>
              <span>04 · Try this week</span>
              <h3>{guide.fieldAssignment}</h3>
            </article>
          </div>
          <aside className={styles.kitSources}>
            <b>Evidence note</b>
            {guide.evidence.map((source) => (
              <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                <strong>{source.label} ↗</strong>
                <span>{source.note}</span>
              </a>
            ))}
          </aside>
        </section>
      )}

      <section className={styles.reflection}>
        <p className={styles.label}>One question</p>
        <h2>{lesson.reflection}</h2>
        <form className={styles.completeForm} method="post" action="/api/progress">
          <input type="hidden" name="lesson" value={lesson.slug} />
          <input type="hidden" name="state" value={isDone ? "incomplete" : "complete"} />
          <input type="hidden" name="return_to" value={next ? `${COURSE_ROOT}/lesson/${next.slug}` : lessonPath} />
          <button
            type="submit"
            className={`${styles.btn} ${isDone ? styles.btnGhost : styles.btnPrimary}`}
          >
            {isDone ? "Mark as not finished" : "Mark complete"}
            {!isDone && <span aria-hidden="true">→</span>}
          </button>
        </form>
        {isDone && (
          <span className={styles.completeNote}>
            <span aria-hidden="true">✓</span> You finished this lesson
          </span>
        )}
      </section>

      <section className={styles.workbookPrompt}>
        <div>
          <h3>Put this lesson on paper.</h3>
          <p>
            Every lesson has one matching action page in the workbook. Try the practice first, then
            write what happened and name the next real move.
          </p>
        </div>
        <div className={styles.workbookActions}>
          <Link href={`${COURSE_ROOT}/workbook#${lesson.slug}`} className={`${styles.btn} ${styles.btnGhost}`}>
            Write it here <span aria-hidden="true">→</span>
          </Link>
          <a
            className={`${styles.btn} ${styles.btnGhost}`}
            href={`/downloads/all-the-way-here-workbook.pdf#page=${printablePage}`}
            target="_blank"
            rel="noreferrer"
          >
            Printable page <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className={styles.fieldNote}>
        <p className={styles.label}>A note from Chris</p>
        <blockquote>&ldquo;{lesson.fieldNote}&rdquo;</blockquote>
        <small>Chris Avera · Husband and father</small>
      </section>

      <nav className={styles.lessonNav} aria-label="Lesson navigation">
        {previous ? (
          <Link href={`${COURSE_ROOT}/lesson/${previous.slug}`} className={styles.navLink}>
            <small>Previous · {previous.number}</small>
            <strong>← {previous.title}</strong>
          </Link>
        ) : (
          <Link href={COURSE_ROOT} className={styles.navLink}>
            <small>Course home</small>
            <strong>← All the Way Here</strong>
          </Link>
        )}
        {next ? (
          <Link href={`${COURSE_ROOT}/lesson/${next.slug}`} className={`${styles.navLink} ${styles.navNext}`}>
            <small>Next · {next.number}</small>
            <strong>{next.title} →</strong>
          </Link>
        ) : (
          <Link href={`${COURSE_ROOT}/workbook#thirty-day-plan`} className={`${styles.navLink} ${styles.navNext}`}>
            <small>Finish the course</small>
            <strong>Build your 30-day plan →</strong>
          </Link>
        )}
      </nav>
    </CourseShell>
  );
}
