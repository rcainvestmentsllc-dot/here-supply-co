import { siteUrl } from "../site-config";
import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header } from "../components";
import { CHECKOUT } from "../data";
import { CORE_LESSONS, CORE_MOVEMENTS, FIELD_KIT } from "../course-content";
import { JsonLd } from "../structured-data";

export const metadata: Metadata = {
  title: "All the Way Here | A Here Supply Co. Course",
  description: "A self-paced course for two people who are tired of being in the same room and somewhere else. A three-day attention reset plus nine lessons. $99, one time.",
  alternates: { canonical: "/library" },
  openGraph: { title: "All the Way Here | A Course for Couples", description: "A three day attention reset and nine lessons, for two people who want the evenings back.", images: [{ url: "/assets/course/art/problem-1-3-driveway-woman.jpg", alt: "A woman pausing in the driveway before returning to the people waiting at home" }] },
  twitter: { title: "All the Way Here | A Course for Couples", description: "A three day attention reset and nine lessons, for two people who want the evenings back.", images: ["/assets/course/art/problem-1-3-driveway-woman.jpg"] },
};

const coreCheckoutReady = Boolean(CHECKOUT.core);

const coreProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "All the Way Here",
  description: "A self-paced Here Supply Co. course with the Focus Protocol, three movements, nine visual lessons, practical exercises, a complete print-first course book, and separate field tools.",
  image: siteUrl("/assets/course/art/problem-1-3-driveway-woman.jpg"),
  brand: { "@type": "Brand", name: "Here Supply Co." },
  category: "Digital educational product",
  ...(coreCheckoutReady ? {
    offers: {
      "@type": "Offer",
      url: CHECKOUT.core,
      priceCurrency: "USD",
      price: "99.00",
    },
  } : {}),
};

const modules = CORE_MOVEMENTS.map((movement) => ({
  ...movement,
  lessons: CORE_LESSONS.filter((lesson) => lesson.movement === movement.key),
}));

export default function Library() {
  return <main id="main-content" className="site"><JsonLd data={coreProduct} /><Header />
    <section className="core-hero">
      <div><p className="kicker">WHEN YOUR PHONE IS TAKING MORE THAN IT GIVES</p><h1>Your phone is a tool.<br /><em>You are not.</em></h1><p>A self-paced course for two people who are tired of being in the same room and somewhere else. It starts with the 72-hour Focus Protocol, then gives you nine practices for the ordinary moments where attention actually gets lost. Kids or no kids. One of you can start it alone.</p><div className="hero-buttons">{coreCheckoutReady ? <a className="button primary" href={CHECKOUT.core}>Get All the Way Here · $99 <span>→</span></a> : <Link className="button primary" href="/sunday-board#get-board">Start free while checkout opens <span>→</span></Link>}<a className="text-link" href="#curriculum">See what is inside <span>↓</span></a></div><small>{coreCheckoutReady ? "Founding-edition price. One-time purchase. Self-paced access. 14-day refund window." : "The paid checkout is not open yet. The free meeting guide is available now."}</small></div>
      <aside className="core-system-card" aria-label="The three movements inside All the Way Here"><p>ONE COMPLETE COURSE</p><div><span>01</span><h2>Return</h2><small>Bring your attention back.</small></div><div><span>02</span><h2>Lead</h2><small>Meet pressure more steadily.</small></div><div><span>03</span><h2>Keep</h2><small>Protect what work cannot replace.</small></div><footer>Focus Protocol · Nine lessons · Complete print-first course book</footer></aside>
    </section>

    <section id="focus-protocol" className="core-promise"><p className="section-label">START WITH THE FOCUS PROTOCOL</p><div><h2>Not more information.<br />A way to <em>come back.</em></h2><p>Start with the Focus Protocol: three days of getting the phone out of the way and seeing what changes. Then move through nine practices for the ordinary places attention gets lost. The course gives the problem a name, the practice a place, and the week a shape you can actually keep.</p></div></section>

    <section className="included-section"><div className="included-heading"><p className="section-label">WHAT YOU ACTUALLY GET</p><h2>Name the problem.<br />Work the <em>practice.</em></h2><p>The course opens with the 72-hour Focus Protocol, then moves through nine lessons across attention, steadiness under pressure, your marriage, your kids if you have them, and the parts of a life worth protecting.</p></div><div className="included-list"><article><span>01</span><h3>The online course</h3><p>Nine focused lessons and short videos for the moments when you want to watch, read, or revisit a practice.</p></article><article><span>02</span><h3>A course book you can mark up</h3><p>Print the complete 26-page course book as one useful volume. It is the recommended way to do the work.</p></article><article><span>03</span><h3>The Resource Pack</h3><p>The one-page Field Card plus the separate practical sheets, including the Sunday Board Meeting, ready to print where life happens.</p></article></div></section>

    <section className="offer-section"><div className="offer-intro"><p className="section-label">THE DECISION</p><h2>One course.<br />One <em>payment.</em></h2><p>No tiers to compare, no subscription to cancel, nothing held back for a later upgrade. This is the whole practice.</p></div><div className="offer-stack offer-stack-simple"><article id="core" className="offer-card core-offer"><span>$99 FOUNDING EDITION</span><h3>All the Way Here</h3><p>One self-paced course for attention, pressure, work, home, your marriage, friendship, and the practices that hold them together.</p><strong>$99 <small>one time</small></strong><p className="offer-note">The Focus Protocol, nine lessons, a complete 26-page print-first course book, and separate field tools. Self-paced access with a 14-day refund window.</p>{coreCheckoutReady ? <a href={CHECKOUT.core}>Get All the Way Here <b>→</b></a> : <Link href="/sunday-board">Start free while checkout opens <b>→</b></Link>}<p className="offer-after">After you pay, the confirmation page and your receipt email give you the course link. Save it or bookmark it so you can return whenever you need it.</p></article></div><p className="offer-alt">Want to try something first? The <Link href="/sunday-board">Sunday Board Meeting</Link> is free and takes fifteen minutes.</p></section>


    <section className="kit-section" id="kit">
      <div className="kit-head">
        <p className="section-label">THE FIELD KIT · TWELVE SHEETS</p>
        <h2>The practice does not<br />live on a <em>screen.</em></h2>
        <p>Every lesson is the instructions for one printed sheet, and every sheet has a place it lives. That placement is not decoration. A practice you have to remember is competing with your phone. A card already in the glovebox is not.</p>
      </div>
      <ul className="kit-list">
        {FIELD_KIT.map((sheet) => (
          <li key={sheet.sheet}>
            <span>{sheet.sheet}</span>
            <div>
              <strong>{sheet.name}</strong>
              <small>{sheet.livesAt}</small>
            </div>
            <p>{sheet.note}</p>
          </li>
        ))}
      </ul>
      <p className="kit-foot">Print them once. Replace the ones you write on. Sheet 01 is free to anyone, with or without the course.</p>
    </section>

    <section className="course-detail-intro" aria-label="Explore the complete course in detail"><p className="section-label">LOOK INSIDE WHEN YOU WANT THE DETAIL</p><p>The rest of this page shows the print-first course book, Resource Pack, family tools, and each lesson. You do not need to read all of it before you decide.</p></section>

    <section className="printables-showcase" id="workbook" aria-labelledby="printables-heading">
      <header><p className="section-label">PRINT-FIRST COURSE BOOK + RESOURCE PACK · INCLUDED</p><h2 id="printables-heading">Useful enough to put<br />on the <em>table.</em></h2><p>The complete print-first course book combines the Focus Protocol, lessons, and action pages in one place. The Resource Pack keeps the Sunday Board and the other one-page tools separate, so they can live where they actually help.</p></header>
      <article className="field-card-promo" aria-label="Preview of the All the Way Here Field Card">
        <div><span>ONE-PAGE PRACTICE SYSTEM</span><h3>RETURN.<br />LEAD.<br />KEEP.</h3><p>Nine practices reduced to one useful reminder sheet.</p></div>
        <ol><li><b>01 · RETURN</b><span>Bring your attention back.</span></li><li><b>02 · LEAD</b><span>Meet pressure more steadily.</span></li><li><b>03 · KEEP</b><span>Protect what work cannot replace.</span></li></ol>
        <footer>ALL THE WAY HERE FIELD CARD · INCLUDED WITH THE COURSE</footer>
      </article>
      <div className="printables-grid">
        <article className="printable-feature">
          <div className="printable-sheet" aria-label="Preview of The Family Screen Reset printable"><span>FAMILY TOOL 01</span><h3>The Family<br />Screen Reset</h3><p>Recover one repeated moment together.</p><div><b>THE MOMENT WE WANT BACK</b><i /><b>WHAT IS PULLING OUR ATTENTION?</b><i /><b>OUR THREE-DAY EXPERIMENT</b><i /><i /></div><footer>ADULTS MODEL · KIDS HELP CHOOSE · THREE DAYS</footer></div>
          <div className="printable-copy"><span>ONE SHARED EXPERIMENT</span><h3>Start with the adults, not a punishment.</h3><p>Choose dinner, bedtime, a game, the ride to school, or another repeated moment. Name the pattern without blame, decide where devices will live, and try the smallest workable change for three days.</p></div>
        </article>
        <article className="printable-feature">
          <div className="printable-sheet printable-sheet-blue" aria-label="Preview of The Weekly Tradition Builder printable"><span>FAMILY TOOL 02</span><h3>The Weekly<br />Tradition Builder</h3><p>Make one small thing worth returning to.</p><div><b>WHAT DO WE WANT TO PROTECT?</b><i /><b>THE SMALLEST REPEATABLE VERSION</b><i /><b>HOW WILL EVERYONE HAVE A VOICE?</b><i /><i /></div><footer>PURPOSE · FIRST DATE · MINIMUM VERSION</footer></div>
          <div className="printable-copy"><span>ONE THING TO ANTICIPATE</span><h3>Meaning comes from returning, not spending more.</h3><p>Build a small weekly rhythm around connection, play, faith, food, movement, service, or creativity. Make it simple enough to survive a hard week and flexible enough to grow with the people using it.</p></div>
        </article>
        <article className="printable-feature">
          <div className="printable-sheet printable-sheet-teen" aria-label="Preview of The Side-by-Side Teen Check-In printable"><span>FAMILY TOOL 03</span><h3>The Side-by-Side<br />Teen Check-In</h3><p>A real conversation without cornering or lecturing.</p><div><b>ONE EASY INVITATION</b><i /><b>WHAT IS TAKING UP HEADSPACE?</b><i /><b>LISTEN, THINK, OR ACT?</b><i /><i /></div><footer>ADULT MODELS · FOUR QUESTIONS · ONE NEXT STEP</footer></div>
          <div className="printable-copy"><span>A CONVERSATION THAT CAN BREATHE</span><h3>Lead beside them, not across from them.</h3><p>Drive, walk, make food, or work on something together. Put your phone away first, ask what kind of help they want, and follow through on one thing you agreed to do.</p></div>
        </article>
      </div>
    </section>


    <section id="curriculum" className="curriculum-section">
      <div className="curriculum-intro"><p className="section-label">THE COMPLETE COURSE</p><h2>Return.<br /><em>Lead.</em><br />Keep.</h2><p>Three movements and nine complete lessons. No lesson is a decorative cover. Every preview below shows the real subject, a familiar moment, and the practical move waiting inside.</p></div>
      <div className="curriculum-modules">{modules.map((module) => <section className="curriculum-module" key={module.name}>
        <header className="module-copy"><span>{module.number} · {module.name.toUpperCase()}</span><h3>{module.line}</h3></header>
        <div className="curriculum-lesson-grid">{module.lessons.map((lesson) => <article className="curriculum-lesson" key={lesson.slug}>
          <figure><img src={lesson.artImage} alt={lesson.artAlt} width="1672" height="942" loading="lazy" decoding="async" style={{ objectPosition: lesson.previewPosition }} /><figcaption>{lesson.number} · {lesson.movement}</figcaption></figure>
          <div><h4>{lesson.title}</h4><p>{lesson.summary}</p><details><summary>Open a real lesson preview <span>+</span></summary><div className="lesson-preview-excerpt"><b>A familiar scene</b><p>{lesson.scene}</p><b>The practice</b><strong>{lesson.practice}</strong><small>{lesson.action}</small></div></details></div>
        </article>)}</div>
      </section>)}</div>
    </section>


    <section className="faq-section"><div><p className="section-label">PLAIN ANSWERS</p><h2>Know what you are<br /><em>buying.</em></h2><p>All the Way Here is one complete course, built to work online and on paper. These are the questions that matter before checkout.</p></div><div className="faq-list"><details><summary>Why $99?<span>+</span></summary><p>It is a one-time price for the Focus Protocol, nine lessons and videos, a complete 26-page print-first course book, a one-page Field Card, and the separate Resource Pack. It is education, not counseling or therapy.</p></details><details><summary>What happens after I pay?<span>+</span></summary><p>Your confirmation page and receipt email include the course link. Save it or bookmark it so you can return whenever you need it. Inside you can watch the introductions, download the complete course book, and open the Resource Pack.</p></details><details><summary>Are you a therapist?<span>+</span></summary><p>No, and I am not going to invent a title I do not have. This is education, not counseling or therapy. If what you are carrying needs a professional, it needs a professional, and this course is not a substitute for one.</p></details><details><summary>Is this a subscription?<span>+</span></summary><p>No. All the Way Here is a one-time purchase with self-paced access.</p></details><details><summary>What if it is not right for me?<span>+</span></summary><p>Request a refund within 14 calendar days of purchase. <Link href="/policies#refund">Read the refund policy.</Link></p></details></div></section>

    <section className="core-closing"><p className="section-label">ONE DECISION</p><h2>Do not buy a better version<br />of yourself. <em>Practice being here.</em></h2><p>The online course, one-page Field Card, print-first course book, and Resource Pack. One payment, yours to keep, with 14 days to change your mind.</p>{coreCheckoutReady ? <a className="button primary" href={CHECKOUT.core}>Get All the Way Here · $99 <span>→</span></a> : <Link className="button primary" href="/sunday-board#get-board">Start free while checkout opens <span>→</span></Link>}<small className="closing-alt">Not ready? <Link href="/sunday-board">Start with the free Sunday Board guide</Link>.</small></section>
    <Footer />
  </main>;
}
