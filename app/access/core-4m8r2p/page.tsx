import { SUPPORT_EMAIL, supportEmailUrl } from "../../site-config";
import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { CORE_LESSONS, CORE_MOVEMENTS, COURSE_LENSES } from "../../course-content";
import { CourseProgress, CourseResume } from "../course-progress";
import { BrandWordmark } from "../../components";
import { requireProductAccess } from "../../../lib/require-access";

export const metadata: Metadata = {
  title: "All the Way Here | Private Course Access",
  description: "Private access to the complete Here Supply Co. course, All the Way Here.",
  robots: { index: false, follow: false },
};

export default async function CoreAccess() {
  await requireProductAccess("core", "/access/core-4m8r2p");
  return (
    <main id="main-content" className="access-shell">
      <header className="access-header">
        <Link href="/" aria-label="Here Supply Co. home"><BrandWordmark /></Link>
        <span>PRIVATE ACCESS</span>
      </header>
      <section className="access-intro">
        <div className="access-edition"><span>PRIVATE COURSE</span><b>FOUNDING EDITION</b></div>
        <p className="section-label">WELCOME · YOU’RE IN</p>
        <h1>Here is exactly<br /><em>what happens next.</em></h1>
        <p>Save this private page. You do not need to finish quickly or figure out the system on your own. Download and print the workbook, complete the short Attention Reset, and then take one lesson and one real-life practice at a time.</p>
        <nav className="access-quick-nav" aria-label="Course sections"><a href="#workbook">Set up workbook</a><a href="#attention-reset">Attention Reset</a><a href="#return">01 Return</a><a href="#lead">02 Lead</a><a href="#keep">03 Keep</a></nav>
        <CourseProgress lessonSlugs={CORE_LESSONS.map((lesson) => lesson.slug)} />
        <CourseResume lessons={CORE_LESSONS.map(({ slug, number, title }) => ({ slug, number, title }))} />
      </section>
      <section className="access-onboarding" aria-labelledby="course-start-heading">
        <header><p className="section-label">START HERE</p><h2 id="course-start-heading">Four steps. No hunting around.</h2><p>The course will still be here when life interrupts. Return to this page, check your progress, and take the next useful step.</p></header>
        <ol>
          <li><span>01</span><div><h3>Download the workbook</h3><p>Print the 16-page workbook before lesson one so every practice has a place to land. An editable browser version is also included.</p><a href="#workbook">Get the workbook ↓</a></div></li>
          <li><span>02</span><div><h3>Reset your attention</h3><p>Use the four small moves for three days. Notice the reflex before asking yourself or your family to change everything.</p><a href="#attention-reset">Open the Attention Reset ↓</a></div></li>
          <li><span>03</span><div><h3>Take one lesson into real life</h3><p>Read one visual lesson, try its practice during an ordinary week, write what happened, and mark the lesson complete.</p><a href="#return">Begin with Return ↓</a></div></li>
          <li><span>04</span><div><h3>Use the family tools when they fit</h3><p>The workbook ends with a family screen reset, a weekly tradition builder, and a side-by-side teenager check-in. They are optional application tools, not more lessons to finish.</p><Link href="/access/core-4m8r2p/workbook#family-toolkit">See the family toolkit →</Link></div></li>
        </ol>
      </section>
      <section className="access-resource access-manual" id="workbook">
        <div><span>STEP 1 · SET UP YOUR COMPANION</span><h2>Print it. Keep it beside you.</h2><p>Download the clean, ink-conscious 16-page workbook before lesson one. It includes the Attention Reset, a page for every lesson, three family tools, and a 30-day integration page. Write in it after you try each practice in real life. If paper is not practical, use the editable browser version and your answers will save on this device.</p></div>
        <div className="access-resource-actions">
          <a className="button primary" href="/downloads/all-the-way-here-workbook.pdf" download="all-the-way-here-workbook.pdf">Download the printable workbook <b>↓</b></a>
          <Link className="button outline" href="/access/core-4m8r2p/workbook" target="_blank" rel="noreferrer">Use the editable browser workbook <b>→</b></Link>
        </div>
      </section>
      <section className="access-resource access-manual access-reset" id="attention-reset">
        <div><span>STEP 2 · THREE DAYS</span><h2>The Attention Reset</h2><p>Begin with four small moves to notice the reflex, create a little friction, and choose where your attention goes. The course starts with action you can use in real life before the nine deeper lessons.</p></div>
        <Link className="button primary" href="/access/focus-7f3k9q">Open the Attention Reset <b>→</b></Link>
      </section>
      <section className="access-printables" id="printable-resources">
        <header><p className="section-label">PRINTABLE RESOURCES</p><h2>Put the useful parts on paper.</h2><p>These are application tools, not more lessons to finish. Print only the pages that meet a real need in your household.</p></header>
        <div>
          <a href="/downloads/all-the-way-here-field-card.pdf" download="all-the-way-here-field-card.pdf"><span>01 · ONE-PAGE SYSTEM</span><strong>The All the Way Here Field Card</strong><small>All nine practices across Return, Lead, and Keep on one reminder sheet.</small><b>Download the field card ↓</b></a>
          <Link href="/access/core-4m8r2p/workbook#family-screen-reset" target="_blank" rel="noreferrer"><span>02 · INCLUDED IN THE WORKBOOK</span><strong>The Family Screen Reset</strong><small>Recover one repeated family moment with a three-day experiment.</small><b>Open the printable →</b></Link>
          <Link href="/access/core-4m8r2p/workbook#teen-check-in" target="_blank" rel="noreferrer"><span>03 · INCLUDED IN THE WORKBOOK</span><strong>The Side-by-Side Teen Check-In</strong><small>Four questions for a real conversation without cornering or lecturing.</small><b>Open the printable →</b></Link>
          <Link href="/access/core-4m8r2p/workbook#weekly-tradition-builder" target="_blank" rel="noreferrer"><span>04 · INCLUDED IN THE WORKBOOK</span><strong>The Weekly Tradition Builder</strong><small>Create one small, repeatable thing your household can anticipate.</small><b>Open the printable →</b></Link>
          <Link href="/sunday-board#get-board" target="_blank" rel="noreferrer"><span>FREE COMPANION PRACTICE</span><strong>The Sunday Board Meeting</strong><small>A separate 15-minute weekly conversation for two people sharing a life.</small><b>Open the free guide →</b></Link>
        </div>
      </section>
      <section className="access-method">
        <div className="access-method-intro"><p className="section-label">THE ALL THE WAY HERE PRACTICE CYCLE</p><h2>Useful ideas only count when they survive an ordinary Tuesday.</h2><p>These five lenses turn broad personal-development ideas into small moves you can actually use. They are original All the Way Here teaching, shaped by behavioral research, lived experience, and durable principles about choice, purpose, priority, relationships, and renewal.</p></div>
        <ol>{COURSE_LENSES.map((lens) => <li key={lens.number}><span>{lens.number}</span><div><b>{lens.title}</b><p>{lens.body}</p></div></li>)}</ol>
      </section>
      <section className="access-homecoming">
        <div><p className="section-label">WHY THIS EXISTS</p><h2>Not anti-technology.<br /><em>Pro-connection.</em></h2><p>AI can produce another answer in seconds. The hard and worthwhile part is human: putting the phone away, listening without preparing a defense, keeping a promise, apologizing, getting outside, calling a friend, and being there for the people you love. Use these lessons only if they help you do more of that.</p></div>
      </section>
      {CORE_MOVEMENTS.map((movement) => (
        <section className={`access-movement access-movement-${movement.key.toLowerCase()}`} id={movement.key.toLowerCase()} key={movement.key}>
          <div className="access-movement-heading"><span>{movement.number}</span><div><p>{movement.key}</p><h2>{movement.line}</h2></div></div>
          <div className="access-movement-body">
            <div className="access-module-film">
              <div><span>MODULE INTRODUCTION · OPTIONAL</span><small>{movement.duration}</small></div>
              <p className="access-module-film-note">A short orientation from Chris. Watch it for context or go straight to the lessons. Nothing is locked.</p>
              <video controls playsInline preload="metadata" poster={movement.image} aria-label={`${movement.name} module introduction by Chris Avera`}><source src={movement.video} type="video/mp4" /><track kind="captions" src={movement.captions} srcLang="en" label="English" default />Your browser does not support this video.</video>
            </div>
            <figure className="access-module-still">
              <img src={movement.stillImage} alt={movement.stillAlt} width="1672" height="942" loading="lazy" decoding="async" />
              <figcaption><span>{movement.number} · {movement.name.toUpperCase()}</span><p>{movement.line}</p></figcaption>
            </figure>
            <ol className="access-lesson-grid">{CORE_LESSONS.filter((item) => item.movement === movement.key).map((item) => <li key={item.slug}><Link href={`/access/core-4m8r2p/lesson/${item.slug}`}><img src={item.artImage} alt={item.artAlt} width="1672" height="942" loading="lazy" decoding="async" style={{ objectPosition: item.previewPosition }} /><span><small>{item.number}</small><b>{item.title}</b><em>{item.subtitle}</em></span><strong>→</strong></Link></li>)}</ol>
          </div>
        </section>
      ))}
      <section className="access-support">
        <div><p className="section-label">YOU ARE NOT ON YOUR OWN</p><h2>Stuck on a practice or unsure what comes next?</h2><p>Send Chris one concrete question about the course, your access, or applying a practice. He reads the messages himself. Here Supply Co. provides educational support, not therapy, medical care, crisis care, or marriage counseling.</p></div>
        <Link className="button primary" href="/working-session#contact-chris">Reach out to Chris <b>→</b></Link>
      </section>
      <footer className="access-footer"><span>Questions? Email <a href={supportEmailUrl()}>{SUPPORT_EMAIL}</a>. Save this page as your private access link.</span><Link href="/">Here Supply Co.</Link></footer>
    </main>
  );
}
