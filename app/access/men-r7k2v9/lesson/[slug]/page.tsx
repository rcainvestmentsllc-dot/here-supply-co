import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  MEN_COURSE,
  MEN_LESSONS,
  MEN_SOLO,
  MEN_STEPS,
  getMenLesson,
  getMenMovement,
  menLessonHref,
  type MenLesson,
} from "../../../../men/men-course";
import { PlainLink as Link } from "../../../../plain-link";
import { CourseShell } from "../../../course-shell";
import { MarkDone } from "../../../progress";
import { MEN_EDITION } from "../../edition";
import styles from "../../../course.module.css";
import men from "../../men.module.css";

export const metadata: Metadata = {
  title: "All the Way Here, Men's Edition | Lesson",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return MEN_STEPS.map((step) => ({ slug: step.slug }));
}

function Neighbors({ slug }: { slug: string }) {
  const index = MEN_STEPS.findIndex((step) => step.slug === slug);
  const previous = MEN_STEPS[index - 1];
  const next = MEN_STEPS[index + 1];
  return (
    <nav className={styles.lessonNav} aria-label="Lesson navigation">
      {previous ? (
        <Link href={menLessonHref(previous.slug)} className={styles.navLink}>
          <small>Previous · {previous.number === "0" ? "Before you start" : `Lesson ${previous.number}`}</small>
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
          <small>Next · Lesson {next.number}</small>
          <strong>{next.title} →</strong>
        </Link>
      ) : (
        <Link href={MEN_COURSE.root} className={`${styles.navLink} ${styles.navNext}`}>
          <small>You finished the nine</small>
          <strong>Back to the course home →</strong>
        </Link>
      )}
    </nav>
  );
}

function FromChris({ note }: { note: string }) {
  return (
    <section className={styles.fieldNote}>
      <p className={styles.label}>From Chris</p>
      <div className={men.chris}>
        <img src="/assets/chris-founder-sunset.jpg" alt="Chris Avera" width={76} height={76} />
        <div>
          <blockquote>&ldquo;{note}&rdquo;</blockquote>
          <small>Chris Avera · Business owner, husband, father of three</small>
        </div>
      </div>
    </section>
  );
}

function SheetCard({ sheet, label }: { sheet: MenLesson["sheet"]; label: string }) {
  return (
    <section className={styles.sheet}>
      <div className={styles.sheetCopy}>
        <span>{label}</span>
        <h3>{sheet.name}</h3>
        <p className={styles.sheetLives}>Lives at: {sheet.livesAt}</p>
        <p>{sheet.holds} Print it once and put it where the moment actually happens.</p>
        <a className={styles.sheetLink} href={sheet.file} download>
          Print this sheet <span aria-hidden="true">&darr;</span>
        </a>
      </div>
    </section>
  );
}

function Solo() {
  const solo = MEN_SOLO;
  return (
    <CourseShell completed={new Set<string>()} currentSlug={solo.slug} edition={MEN_EDITION}>
      <header className={styles.lessonHead}>
        <p className={styles.lessonEyebrow}>
          Before you start <em>Half a day</em>
        </p>
        <h1 className={styles.lessonTitle}>{solo.title}</h1>
        <p className={styles.lessonSubtitle}>{solo.subtitle}</p>
      </header>

      <figure className={styles.lessonArt}>
        <img src={solo.photo.src} alt={solo.photo.alt} width={1600} height={900} style={{ objectPosition: solo.photo.position }} />
        <figcaption>
          <b>Before Lesson 1 · The Solo</b>
          <span>{solo.photo.caption}</span>
        </figcaption>
      </figure>

      <section className={men.part}>
        {solo.intro.map((text) => (
          <p key={text.slice(0, 24)}>{text}</p>
        ))}
      </section>

      <section className={men.part}>
        <p className={styles.label}>Three questions</p>
        <h2>Answer them on paper, once your head quiets down.</h2>
        <p>{solo.questionsIntro}</p>
      </section>
      <ol className={men.questions}>
        {solo.questions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>
      <section className={men.part}>
        <p>{solo.questionsAfter}</p>
      </section>

      <section className={men.part}>
        <p className={styles.label}>How the half day goes</p>
        <h2>Three hours, roughly.</h2>
      </section>
      <div className={men.hours}>
        {solo.hours.map((hour) => (
          <article key={hour.title}>
            <h3>{hour.title}</h3>
            <p>{hour.body}</p>
          </article>
        ))}
      </div>

      <div className={men.photoRow}>
        <figure>
          <img src={solo.detail.src} alt={solo.detail.alt} loading="lazy" style={{ objectPosition: solo.detail.position }} />
        </figure>
        <div className={men.hardWeek}>
          <span>Smallest version</span>
          <p>{solo.smallest}</p>
          <small>{solo.cannotGetAway}</small>
        </div>
      </div>

      <div className={styles.pair}>
        <article className={styles.pairCard}>
          <h3>What to bring</h3>
          <ul className={men.bring}>
            {solo.bring.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p style={{ marginTop: 12 }}>{solo.bringNote}</p>
        </article>
        <article className={styles.pairCard}>
          <h3>After</h3>
          <p>{solo.after}</p>
        </article>
      </div>

      <section className={styles.kit}>
        <header className={styles.kitHead}>
          <p className={styles.label}>Words to use</p>
          <h2 className={styles.blockTitle}>How to tell the people at home.</h2>
          <ul className={men.words}>
            <li>&ldquo;{solo.words}&rdquo;</li>
          </ul>
        </header>
      </section>

      <SheetCard sheet={solo.sheet} label="YOUR SHEET · BEFORE LESSON 1" />

      <section className={styles.reflection}>
        <p className={styles.label}>Before you go on</p>
        <h2>{solo.questions[0]}</h2>
        <MarkDone slug={MEN_COURSE.progressPrefix + solo.slug} />
        <Link href={menLessonHref(MEN_LESSONS[0].slug)} className={`${styles.btn} ${styles.btnGhost}`} style={{ marginTop: 14 }}>
          Start Lesson 1 <span aria-hidden="true">→</span>
        </Link>
      </section>

      <FromChris note={solo.fromChris} />
      <Neighbors slug={solo.slug} />
    </CourseShell>
  );
}

export default async function MenLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === MEN_SOLO.slug) return <Solo />;
  const lesson = getMenLesson(slug);
  if (!lesson) notFound();

  const movement = getMenMovement(lesson.movement);
  const index = MEN_LESSONS.findIndex((item) => item.slug === lesson.slug);
  const next = MEN_LESSONS[index + 1];

  return (
    <CourseShell completed={new Set<string>()} currentSlug={lesson.slug} edition={MEN_EDITION}>
      <header className={styles.lessonHead}>
        <p className={styles.lessonEyebrow}>
          {movement?.name} <em>Lesson {lesson.number} of 9</em>
        </p>
        <p className={men.says}>&ldquo;{lesson.says}&rdquo;</p>
        <h1 className={styles.lessonTitle}>{lesson.title}</h1>
        <p className={styles.lessonSubtitle}>{lesson.subtitle}</p>
      </header>

      <figure className={styles.lessonArt}>
        <img
          src={lesson.photo.src}
          alt={lesson.photo.alt}
          width={1600}
          height={900}
          style={{ objectPosition: lesson.photo.position }}
        />
        <figcaption>
          <b>
            Lesson {lesson.number} · {movement?.name}
          </b>
          <span>{lesson.photo.caption}</span>
        </figcaption>
      </figure>

      <section className={men.part}>
        <p className={styles.label}>The moment</p>
        <p>{lesson.moment}</p>
      </section>

      <section className={men.part}>
        <p className={styles.label}>What is really going on</p>
        <p>{lesson.really}</p>
      </section>

      <section className={styles.principle}>
        <p className={styles.label}>The principle</p>
        <blockquote>{lesson.principle}</blockquote>
      </section>

      <section className={styles.prose}>
        <p className={styles.label}>The practice</p>
        <h2 className={styles.blockTitle}>{lesson.practice.name}</h2>
        <p>{lesson.practice.intro}</p>
      </section>

      <ol className={styles.steps}>
        {lesson.practice.steps.map((step) => (
          <li key={step.title}>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={men.photoRow}>
        <figure>
          <img src={lesson.detail.src} alt={lesson.detail.alt} loading="lazy" style={{ objectPosition: lesson.detail.position }} />
        </figure>
        <div className={men.hardWeek}>
          <span>If this week is hard</span>
          <p>{lesson.hardWeek}</p>
          <small>A small version you keep beats a full version you skip.</small>
        </div>
      </div>

      <SheetCard sheet={lesson.sheet} label={`YOUR SHEET · LESSON ${lesson.number}`} />

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

      <aside className={styles.withoutKids}>
        <span>IF THIS DOES NOT FIT YOUR LIFE</span>
        <p>{lesson.ifNot}</p>
      </aside>

      {lesson.tool && (
        <aside className={men.tool}>
          <div>
            <span>{lesson.tool.label}</span>
            <h3>{lesson.tool.title}</h3>
            <p>{lesson.tool.body}</p>
          </div>
          <Link className={`${styles.btn} ${styles.btnGhost}`} href={lesson.tool.href}>
            {lesson.tool.cta} <span aria-hidden="true">→</span>
          </Link>
        </aside>
      )}

      <section className={styles.kit}>
        <header className={styles.kitHead}>
          <p className={styles.label}>Make it stick</p>
          <h2 className={styles.blockTitle}>Why it helps, what to say, and what to watch.</h2>
        </header>
        <div className={styles.kitGrid}>
          <article>
            <span>01 · Why it helps</span>
            <p>{lesson.whyItHelps}</p>
          </article>
          <article>
            <span>02 · Words to use</span>
            <ul className={men.words}>
              {lesson.words.map((line) => (
                <li key={line}>&ldquo;{line}&rdquo;</li>
              ))}
            </ul>
          </article>
          <article>
            <span>03 · Watch for</span>
            <p>{lesson.watchFor}</p>
          </article>
          <article>
            <span>04 · This week</span>
            <h3>{lesson.thisWeek}</h3>
          </article>
        </div>
        <aside className={styles.kitSources}>
          <b>The research</b>
          {lesson.evidence.map((source) => (
            <a key={source.label} href={source.href} target="_blank" rel="noreferrer">
              <strong>{source.label} ↗</strong>
              <span>{source.note}</span>
            </a>
          ))}
        </aside>
      </section>

      {lesson.straightWord && (
        <aside className={men.straight}>
          <span>A straight word</span>
          <p>{lesson.straightWord}</p>
        </aside>
      )}

      <section className={styles.reflection}>
        <p className={styles.label}>Reflect</p>
        <h2>{lesson.reflect}</h2>
        <MarkDone slug={MEN_COURSE.progressPrefix + lesson.slug} />
        <Link
          href={next ? menLessonHref(next.slug) : MEN_COURSE.root}
          className={`${styles.btn} ${styles.btnGhost}`}
          style={{ marginTop: 14 }}
        >
          {next ? `Next week: ${next.title}` : "Back to the course home"}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={styles.workbookPrompt}>
        <div>
          <h3>The question I would ask you on a call.</h3>
          <p>
            &ldquo;{lesson.coachQuestion}&rdquo; Write your answer in the course book. If you want
            someone asking it every week, that is what coaching is for.
          </p>
        </div>
        <div className={styles.workbookActions}>
          <Link className={`${styles.btn} ${styles.btnGhost}`} href="/men/coaching">
            See coaching <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <FromChris note={lesson.fromChris} />
      <Neighbors slug={lesson.slug} />
    </CourseShell>
  );
}
