import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { CORE_LESSONS, CORE_MOVEMENTS, COURSE_LENSES } from "../../course-content";
import { CourseProgress } from "../course-progress";
import { CompassMark } from "../../components";

export const metadata: Metadata = {
  title: "Iron Compass Core Access",
  description: "Private access to Iron Compass Core.",
  robots: { index: false, follow: false },
};

export default function CoreAccess() {
  return (
    <main id="main-content" className="access-shell">
      <header className="access-header">
        <Link href="/" aria-label="Iron Compass home"><CompassMark /><b>IRON COMPASS</b></Link>
        <span>PRIVATE ACCESS</span>
      </header>
      <section className="access-intro">
        <div className="access-edition"><span>FIELD MANUAL No. 01</span><b>FOUNDING EDITION</b></div>
        <p className="section-label">YOU’RE IN · IRON COMPASS CORE</p>
        <h1>Come back to<br /><em>your own life.</em></h1>
        <p>Your access is ready. Save this private page and start with Return. This is a field manual, not a show to binge. Use one practice in a real room before you move on.</p>
        <nav className="access-quick-nav" aria-label="Core course sections"><a href="#return">01 Return</a><a href="#lead">02 Lead</a><a href="#keep">03 Keep</a><a href="#workbook">Workbook</a></nav>
        <CourseProgress lessonSlugs={CORE_LESSONS.map((lesson) => lesson.slug)} />
      </section>
      <section className="access-method">
        <div className="access-method-intro"><p className="section-label">THE IRON COMPASS PRACTICE CYCLE</p><h2>Useful ideas only count when they survive an ordinary Tuesday.</h2><p>These five lenses turn broad personal-development ideas into small moves you can actually use. They are original Iron Compass teaching, shaped by behavioral research, lived experience, and durable principles about choice, purpose, priority, relationships, and renewal.</p></div>
        <ol>{COURSE_LENSES.map((lens) => <li key={lens.number}><span>{lens.number}</span><div><b>{lens.title}</b><p>{lens.body}</p></div></li>)}</ol>
      </section>
      {CORE_MOVEMENTS.map((movement) => (
        <section className={`access-movement access-movement-${movement.key.toLowerCase()}`} id={movement.key.toLowerCase()} key={movement.key}>
          <div className="access-movement-heading"><span>{movement.number}</span><div><p>{movement.key}</p><h2>{movement.line}</h2></div></div>
          <div className="access-movement-body">
            <div className="access-module-film">
              <div><span>MODULE INTRODUCTION</span><small>{movement.duration}</small></div>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Captions will be added after an exact transcript is verified against Chris's original recording. */}
              <video controls playsInline preload="metadata" poster={movement.image} aria-label={`${movement.name} module introduction by Chris Avera`}><source src={movement.video} type="video/mp4" />Your browser does not support this video.</video>
            </div>
            <ol>{CORE_LESSONS.filter((item) => item.movement === movement.key).map((item) => <li key={item.slug}><span>{item.number}</span><Link href={`/access/core-4m8r2p/lesson/${item.slug}`}><span><b>{item.title}</b><small>{item.subtitle}</small></span><strong>→</strong></Link></li>)}</ol>
          </div>
        </section>
      ))}
      <section className="access-resource access-manual" id="workbook">
        <div><span>COMPANION RESOURCE</span><h2>The Core Workbook</h2><p>A clean, printable page for each lesson. Keep your notes and the two practices you choose for the next thirty days.</p></div>
        <Link className="button primary" href="/access/core-4m8r2p/workbook">Open the Core Workbook <b>→</b></Link>
      </section>
      <footer className="access-footer"><span>Questions? Email chris@ironcompassinstitute.com. Save this page as your private access link.</span><Link href="/">Iron Compass Institute</Link></footer>
    </main>
  );
}
