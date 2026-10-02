import { siteUrl } from "../site-config";
import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header } from "../components";
import { CHECKOUT } from "../data";
import { CORE_LESSONS, CORE_MOVEMENTS, FIELD_KIT } from "../course-content";
import { JsonLd } from "../structured-data";

export const metadata: Metadata = {
  title: "All the Way Here | A Here Supply Co. Course",
  description: "A self paced course for two people who are tired of being in the same room and somewhere else. A three day reset plus nine lessons. $99, one time.",
  alternates: { canonical: "/library" },
  openGraph: { title: "All the Way Here | A Course for Couples", description: "A three day attention reset and nine lessons, for two people who want the evenings back.", images: [{ url: "/assets/course/art/problem-1-3-driveway-woman.jpg", alt: "A woman pausing in the driveway before returning to the people waiting at home" }] },
  twitter: { title: "All the Way Here | A Course for Couples", description: "A three day attention reset and nine lessons, for two people who want the evenings back.", images: ["/assets/course/art/problem-1-3-driveway-woman.jpg"] },
};

const coreCheckoutReady = Boolean(CHECKOUT.core);

const coreProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "All the Way Here",
  description: "A self paced Here Supply Co. course: the Focus Protocol, nine short lessons, a 26 page course book to print, and a Resource Pack of printable sheets.",
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
      <div><p className="kicker">The Here Supply Co. course</p><h1>All the Way <em>Here</em></h1><p>A three day reset and nine short lessons for two people who are tired of being in the same room and somewhere else. It starts with the Focus Protocol, then works through the everyday moments where attention gets lost. Kids or no kids. One of you can start it alone, and it works better with both.</p><div className="hero-buttons">{coreCheckoutReady ? <a className="button primary" href={CHECKOUT.core}>Get All the Way Here · $99 <span>→</span></a> : <Link className="button primary" href="/sunday-board#get-board">Start free while checkout opens <span>→</span></Link>}<a className="text-link" href="#curriculum">See what is inside <span>↓</span></a></div><small>{coreCheckoutReady ? "Founding price. One time purchase. Self paced. 14 day refund window." : "The paid checkout is not open yet. The free meeting guide is available now."}</small></div>
      <aside className="core-system-card" aria-label="The three movements inside All the Way Here"><p>THREE PARTS</p><div><span>01</span><h2>Return</h2><small>Bring your attention back.</small></div><div><span>02</span><h2>Lead</h2><small>Meet pressure more steadily.</small></div><div><span>03</span><h2>Keep</h2><small>Protect what work cannot replace.</small></div><footer>Focus Protocol · Nine lessons · A course book to print</footer></aside>
    </section>

    <section className="included-section" id="focus-protocol"><div className="included-heading"><p className="section-label">WHAT YOU GET</p><h2>One problem at a time,<br />one <em>practice</em> for each.</h2><p>The course opens with the 72 hour Focus Protocol. Then nine lessons on how you get home from work, handle pressure, date, parent, and keep friends.</p><blockquote className="declaration"><p>My phone is a tool. I am not.</p><cite>From the Focus Protocol declaration, read out loud</cite></blockquote></div><div className="included-list"><article><span>01</span><h3>The online lessons</h3><p>Nine short lessons you can read on your phone or come back to when you need a reminder.</p></article><article><span>02</span><h3>A course book you can mark up</h3><p>The whole course in one 26 page book with room to write. Printing it is the best way to do the work.</p></article><article><span>03</span><h3>The Resource Pack</h3><p>Twelve one page sheets, including the Sunday Board Meeting, plus the Field Card and three family tools. Print them and put them where they get used.</p></article></div></section>





    <section id="curriculum" className="curriculum-section">
      <div className="curriculum-intro"><p className="section-label">THE COMPLETE COURSE</p><h2>Return.<br /><em>Lead.</em><br />Keep.</h2><p>Three parts, nine lessons. Open any lesson below to read the opening scene and the practice.</p></div>
      <div className="curriculum-modules">{modules.map((module) => <section className="curriculum-module" key={module.name}>
        <header className="module-copy"><span>{module.number} · {module.name.toUpperCase()}</span><h3>{module.line}</h3></header>
        <div className="curriculum-lesson-grid">{module.lessons.map((lesson) => <article className="curriculum-lesson" key={lesson.slug}>
          <figure><img src={lesson.artImage} alt={lesson.artAlt} width="1672" height="942" loading="lazy" decoding="async" style={{ objectPosition: lesson.previewPosition }} /><figcaption>{lesson.number} · {lesson.movement}</figcaption></figure>
          <div><h4>{lesson.title}</h4><p>{lesson.summary}</p><details><summary>Preview this lesson <span>+</span></summary><div className="lesson-preview-excerpt"><b>A familiar scene</b><p>{lesson.scene}</p><b>The practice</b><strong>{lesson.practice}</strong><small>{lesson.action}</small></div></details></div>
        </article>)}</div>
      </section>)}</div>
    </section>

    <section className="kit-section" id="kit">
      <div className="kit-head">
        <p className="section-label">THE RESOURCE PACK · TWELVE SHEETS</p>
        <h2>The practice does not<br />live on a <em>screen.</em></h2>
        <p>Every lesson goes with one printed sheet, and every sheet has a place it lives. A practice you have to remember is competing with your phone. A card already sitting in the glovebox wins.</p>
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

    <section className="extras-section" id="workbook" aria-labelledby="extras-heading">
      <div className="extras-head"><p className="section-label">Also included</p><h2 id="extras-heading">A few tools for the rest of the house.</h2></div>
      <ul className="extras-list">
        <li><strong>The Field Card</strong><span>Every practice on one page, for the fridge or the car.</span></li>
        <li><strong>The Family Screen Reset</strong><span>Pick one repeated moment, like dinner or bedtime, and try a three day change together.</span></li>
        <li><strong>The Weekly Tradition Builder</strong><span>One small weekly rhythm simple enough to survive a hard week.</span></li>
        <li><strong>The Side by Side Teen Check In</strong><span>A real conversation with a teenager while you drive, walk, or cook, without cornering them.</span></li>
      </ul>
    </section>

    <section className="offer-section"><div className="offer-intro"><p className="section-label">THE DECISION</p><h2>One course,<br />one <em>payment.</em></h2><p>There are no tiers to compare and no subscription to cancel.</p></div><div className="offer-stack offer-stack-simple"><article id="core" className="offer-card core-offer"><span>$99 FOUNDING PRICE</span><h3>All the Way Here</h3><p>A self paced course on how you put the phone down, get home from work, handle pressure, date, parent, and keep friends.</p><strong>$99 <small>one time</small></strong><p className="offer-note">The Focus Protocol, nine lessons, a 26 page course book to print, and the Resource Pack. Self paced, with a 14 day refund window.</p>{coreCheckoutReady ? <a href={CHECKOUT.core}>Get All the Way Here <b>→</b></a> : <Link href="/sunday-board">Start free while checkout opens <b>→</b></Link>}<p className="offer-after">After you pay, your receipt email has a button that opens the course and a password for any other device. Bookmark the course once it opens.</p></article></div><p className="offer-alt">Want to try something first? The <Link href="/sunday-board">Sunday Board Meeting</Link> is free and takes fifteen minutes.</p></section>

    <section className="faq-section"><div><p className="section-label">PLAIN ANSWERS</p><h2>Know what you are<br /><em>buying.</em></h2><p>All the Way Here works online and on paper. Here are the questions people ask before buying.</p></div><div className="faq-list"><details><summary>Why $99?<span>+</span></summary><p>It is a one time price for the Focus Protocol, nine lessons, a 26 page course book, a one page Field Card, and the Resource Pack with twelve sheets and three family tools.</p></details><details><summary>What happens after I pay?<span>+</span></summary><p>Your receipt email has a button that opens the course and a password for any other device. Inside you can start the Focus Protocol, download the course book, and open the Resource Pack.</p></details><details><summary>Are you a therapist?<span>+</span></summary><p>No. This is a course, and it does not replace counseling or therapy. If what you are carrying needs a professional, please find one.</p></details><details><summary>Is this a subscription?<span>+</span></summary><p>No. All the Way Here is a one time purchase and you keep access.</p></details><details><summary>What if it is not right for me?<span>+</span></summary><p>Request a refund within 14 calendar days of purchase. <Link href="/policies#refund">Read the refund policy.</Link></p></details></div></section>

    <section className="core-closing"><p className="section-label">ONE DECISION</p><h2>You don&rsquo;t need better versions<br />of yourselves. <em>Just more evenings here.</em></h2><p>The online lessons, the course book, the Field Card, and the Resource Pack. One payment, yours to keep, with 14 days to change your mind.</p>{coreCheckoutReady ? <a className="button primary" href={CHECKOUT.core}>Get All the Way Here · $99 <span>→</span></a> : <Link className="button primary" href="/sunday-board#get-board">Start free while checkout opens <span>→</span></Link>}<small className="closing-alt">Not ready? <Link href="/sunday-board">Start with the free Sunday Board guide</Link>.</small></section>
    <Footer />
  </main>;
}
