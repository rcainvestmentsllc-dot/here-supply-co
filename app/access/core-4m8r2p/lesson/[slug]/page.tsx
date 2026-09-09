import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CORE_LESSONS, LESSON_GUIDES, getCoreLesson, getMovement } from "../../../../course-content";
import { PlainLink as Link } from "../../../../plain-link";
import { LessonProgress } from "../../../course-progress";

export const metadata: Metadata = {
  title: "All the Way Here Lesson | Here Supply Co.",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return CORE_LESSONS.map((lesson) => ({ slug: lesson.slug }));
}

export default async function CoreLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getCoreLesson(slug);
  if (!lesson) notFound();

  const index = CORE_LESSONS.findIndex((item) => item.slug === lesson.slug);
  const previous = CORE_LESSONS[index - 1];
  const next = CORE_LESSONS[index + 1];
  const printablePage = index + 4;
  const movement = getMovement(lesson.movement);
  const guide = LESSON_GUIDES[lesson.slug];

  return <main id="main-content" className={`lesson-shell lesson-${lesson.movement.toLowerCase()}`}>
    <header className="access-header lesson-header"><Link href="/access/core-4m8r2p">← ALL THE WAY HERE</Link><span>{lesson.number} · {lesson.movement}</span></header>

    <section className="lesson-cover">
      <div className="lesson-cover-number">{lesson.number}</div>
      <div className="lesson-cover-copy"><p>{movement?.name.toUpperCase()} · ALL THE WAY HERE</p><h1>{lesson.title}</h1><h2>{lesson.subtitle}</h2><div><span>LESSON {lesson.number}</span><span>ONE PRACTICE · ONE WEEK</span></div></div>
    </section>

    <figure className="lesson-art">
      <img src={lesson.artImage} alt={lesson.artAlt} width="1672" height="942" style={{ objectPosition: lesson.previewPosition }} />
      <figcaption><span>{lesson.number} · {lesson.movement}</span><p>{lesson.artCaption}</p></figcaption>
    </figure>

    <section className="lesson-scene"><span>A FAMILIAR SCENE</span><p>{lesson.scene}</p></section>

    {lesson.problemImage && lesson.problemAlt && lesson.problemCaption && <figure className="lesson-problem-art">
      <img src={lesson.problemImage} alt={lesson.problemAlt} width="1672" height="942" loading="lazy" decoding="async" />
      <figcaption><span>WHAT DIVIDED ATTENTION FEELS LIKE</span><p>{lesson.problemCaption}</p></figcaption>
    </figure>}

    <section className="lesson-card lesson-opening"><div><p className="section-label">WHAT IS HAPPENING</p><h2>{lesson.summary}</h2></div><p>{lesson.problem}</p></section>

    <section className="lesson-card lesson-principle"><p className="section-label">THE PRINCIPLE</p><blockquote>{lesson.principle}</blockquote></section>

    <section className="lesson-practice">
      <div className="lesson-practice-heading"><p className="section-label">THE PRACTICE</p><h2>{lesson.practice}</h2><p>{lesson.practiceIntro}</p></div>
      <ol>{lesson.steps.map((step, stepIndex) => <li key={step.title}><span>0{stepIndex + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
    </section>

    <section className="lesson-pair"><article><p className="section-label">MAKE IT FIT REAL LIFE</p><h2>A practice can bend without breaking.</h2><p>{lesson.adaptation}</p></article><article><p className="section-label">USE IT NOW</p><h2>One move before tomorrow.</h2><p>{lesson.action}</p></article></section>

    {guide && <section className="lesson-field-kit">
      <header><p className="section-label">PRACTICE KIT</p><h2>Make the idea usable.</h2><p>This is the layer that takes the lesson out of your head and puts it into a real week.</p></header>
      <div className="lesson-field-grid">
        <article><span>01 · WHY IT MAY HELP</span><p>{guide.whyItHelps}</p></article>
        <article><span>02 · WORDS TO USE</span><blockquote>“{guide.wordsToUse}”</blockquote></article>
        <article><span>03 · WATCH FOR</span><p>{guide.watchFor}</p></article>
        <article className="lesson-assignment"><span>04 · TRY THIS WEEK</span><h3>{guide.fieldAssignment}</h3></article>
      </div>
      <aside><b>EVIDENCE NOTE</b>{guide.evidence.map((source) => <a href={source.href} target="_blank" rel="noreferrer" key={source.href}><strong>{source.label} ↗</strong><span>{source.note}</span></a>)}</aside>
    </section>}

    <section className="lesson-reflection"><p className="section-label">ONE QUESTION</p><h2>{lesson.reflection}</h2><LessonProgress slug={lesson.slug} isFinal={!next} /></section>

    <section className="lesson-workbook-action">
      <div><p className="section-label">MATCHING ACTION PAGE · INCLUDED</p><h2>Put this lesson on paper.</h2><p>Every lesson has one matching action page in the workbook. Try the practice first, then write what happened and name the next real move.</p></div>
      <div><a className="button primary" href={`/downloads/all-the-way-here-workbook.pdf#page=${printablePage}`} target="_blank" rel="noreferrer">Open this printable page <b>→</b></a><Link href={`/access/core-4m8r2p/workbook#${lesson.slug}`} target="_blank" rel="noreferrer">Type in this page instead →</Link><a href="/downloads/all-the-way-here-workbook.pdf" download="all-the-way-here-workbook.pdf">Download all 16 pages ↓</a></div>
    </section>

    <section className="lesson-field-note"><span>A NOTE FROM CHRIS</span><blockquote>“{lesson.fieldNote}”</blockquote><small>Chris Avera · Husband and father</small></section>

    <nav className="lesson-next" aria-label="Lesson navigation">
      {previous ? <Link href={`/access/core-4m8r2p/lesson/${previous.slug}`}><small>PREVIOUS · {previous.number}</small><strong>← {previous.title}</strong></Link> : <Link href="/access/core-4m8r2p"><small>COURSE HOME</small><strong>← All the Way Here</strong></Link>}
      {next ? <Link href={`/access/core-4m8r2p/lesson/${next.slug}`}><small>NEXT · {next.number}</small><strong>{next.title} →</strong></Link> : <Link href="/access/core-4m8r2p/workbook#thirty-day-plan"><small>FINISH THE COURSE</small><strong>Build your 30-day plan →</strong></Link>}
    </nav>
  </main>;
}
