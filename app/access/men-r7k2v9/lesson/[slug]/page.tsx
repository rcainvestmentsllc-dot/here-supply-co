import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKitSheet } from "../../../../course-content";
import { MEN_COURSE, MEN_LESSONS, getMenLesson, getMenMovement, menLessonHref } from "../../../../men/men-course";
import { PlainLink as Link } from "../../../../plain-link";
import { CourseShell } from "../../../course-shell";
import { MarkDone } from "../../../progress";
import { MEN_EDITION } from "../../edition";
import styles from "../../../course.module.css";

export const metadata: Metadata = {
  title: "All the Way Here, Men's Edition | Lesson",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return MEN_LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export default async function MenLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getMenLesson(slug);
  if (!lesson) notFound();

  const index = MEN_LESSONS.findIndex((item) => item.slug === lesson.slug);
  const previous = MEN_LESSONS[index - 1];
  const next = MEN_LESSONS[index + 1];
  const movement = getMenMovement(lesson.movement);
  const guide = lesson.guide;
  const sheet = getKitSheet(lesson.kit.sheet);

  return (
    <CourseShell completed={new Set<string>()} currentSlug={lesson.slug} edition={MEN_EDITION}>
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

      <section className={styles.sheet}>
        <div className={styles.sheetCopy}>
          <span>{`YOUR SHEET · LESSON ${lesson.kit.sheet}`}</span>
          <h3>{lesson.kit.sheetName}</h3>
          <p className={styles.sheetLives}>Lives at: {lesson.kit.livesAt}</p>
          <p>
            Print it once and put it where the moment actually happens. That placement is the
            practice. Everything on this page is how to use it.
          </p>
          {sheet && (
            <a className={styles.sheetLink} href={sheet.file} download>
              Print this sheet <span aria-hidden="true">&darr;</span>
            </a>
          )}
        </div>
      </section>

      {/* Every practice in two rooms. The men this is for lead at home and at work. */}
      <div className={styles.pair}>
        <article className={styles.pairCard} data-room="home">
          <h3>At home</h3>
          <p>{lesson.atHome}</p>
        </article>
        <article className={styles.pairCard} data-room="work">
          <h3>At work</h3>
          <p>{lesson.atWork}</p>
        </article>
      </div>

      {lesson.ifNot && (
        <aside className={styles.withoutKids}>
          <span>{lesson.ifNot.label}</span>
          <p>{lesson.ifNot.body}</p>
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

      <section className={styles.kit}>
        <header className={styles.kitHead}>
          <p className={styles.label}>Practice kit</p>
          <h2 className={styles.blockTitle}>How to make it stick.</h2>
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

      <section className={styles.reflection}>
        <p className={styles.label}>One question</p>
        <h2>{lesson.reflection}</h2>
        <MarkDone slug={MEN_COURSE.progressPrefix + lesson.slug} />
        <Link
          href={next ? menLessonHref(next.slug) : "/downloads/thirty-day-page.pdf"}
          className={`${styles.btn} ${styles.btnGhost}`}
          style={{ marginTop: 14 }}
        >
          {next ? "Take the next lesson" : "Print your thirty day page"}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={styles.workbookPrompt}>
        <div>
          <h3>The question I would ask you on a call.</h3>
          <p>&ldquo;{lesson.coachQuestion}&rdquo; Write your answer in the course book. If you want someone asking it every week, that is what coaching is for.</p>
        </div>
        <div className={styles.workbookActions}>
          <Link className={`${styles.btn} ${styles.btnGhost}`} href="/men/coaching">
            See coaching <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.fieldNote}>
        <p className={styles.label}>A note from Chris</p>
        <blockquote>&ldquo;{lesson.fieldNote}&rdquo;</blockquote>
        <small>Chris Avera · Business owner, husband, and father</small>
      </section>

      <nav className={styles.lessonNav} aria-label="Lesson navigation">
        {previous ? (
          <Link href={menLessonHref(previous.slug)} className={styles.navLink}>
            <small>Previous · {previous.number}</small>
            <strong>← {previous.title}</strong>
          </Link>
        ) : (
          <Link href={MEN_COURSE.root} className={styles.navLink}>
            <small>Course home</small>
            <strong>← All the Way Here</strong>
          </Link>
        )}
        {next ? (
          <Link href={menLessonHref(next.slug)} className={`${styles.navLink} ${styles.navNext}`}>
            <small>Next · {next.number}</small>
            <strong>{next.title} →</strong>
          </Link>
        ) : (
          <Link href="/downloads/thirty-day-page.pdf" className={`${styles.navLink} ${styles.navNext}`}>
            <small>Finish the course</small>
            <strong>Your thirty day page →</strong>
          </Link>
        )}
      </nav>
    </CourseShell>
  );
}
