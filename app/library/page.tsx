import { siteUrl } from "../site-config";
import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header } from "../components";
import { CHECKOUT } from "../data";
import { CORE_LESSONS, CORE_MOVEMENTS } from "../course-content";
import { JsonLd } from "../structured-data";

export const metadata: Metadata = {
  title: "All the Way Here | A Here Supply Co. Course",
  description: "A private, self-paced course for bringing your attention back, carrying pressure more steadily, and protecting the relationships and ordinary life that matter. $99 founding-edition price.",
  alternates: { canonical: "/library" },
  openGraph: { title: "All the Way Here | Here Supply Co.", description: "One complete private course for attention, pressure, relationships, and the life in front of you.", images: [{ url: "/assets/course/art/problem-1-3-driveway-woman.jpg", alt: "A woman pausing in the driveway before returning to the people waiting at home" }] },
  twitter: { title: "All the Way Here | Here Supply Co.", description: "One complete private course for attention, pressure, relationships, and the life in front of you.", images: ["/assets/course/art/problem-1-3-driveway-woman.jpg"] },
};

const coreCheckoutReady = Boolean(CHECKOUT.core);

const coreProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "All the Way Here",
  description: "A private, self-paced Here Supply Co. course with an attention reset, three movements, nine visual lessons, practical exercises, progress, and a 16-page printable workbook.",
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
      <div><p className="kicker">WHEN YOUR PHONE IS TAKING MORE THAN IT GIVES</p><h1>Your phone is a tool.<br /><em>You are not.</em></h1><p>All the Way Here is a private, self-paced course for people who are tired of being physically present while their attention, pressure, or unfinished work is somewhere else. It gives you practical ways to come back before the people you love keep getting what is left.</p><div className="hero-buttons">{coreCheckoutReady ? <a className="button primary" href={CHECKOUT.core}>Get All the Way Here · $99 <span>→</span></a> : <Link className="button primary" href="/sunday-board#get-board">Start free while checkout opens <span>→</span></Link>}<a className="text-link" href="#curriculum">See what is inside <span>↓</span></a></div><small>{coreCheckoutReady ? "Founding-edition price. One-time purchase. Private access. 14-day refund window." : "The paid checkout is not open yet. The free meeting guide is available now."}</small></div>
      <aside className="core-system-card" aria-label="The three movements inside All the Way Here"><p>ONE COMPLETE PRIVATE COURSE</p><div><span>01</span><h2>Return</h2><small>Bring your attention back.</small></div><div><span>02</span><h2>Lead</h2><small>Meet pressure more steadily.</small></div><div><span>03</span><h2>Keep</h2><small>Protect what work cannot replace.</small></div><footer>Attention reset · Nine lessons · 16-page workbook</footer></aside>
    </section>

    <section className="core-promise"><p className="section-label">THE PROMISE</p><div><h2>Not more information.<br />A way to <em>come back.</em></h2><p>When your attention is gone, pressure is choosing your response, or the people you love are getting the leftovers, advice is not enough. This course gives the problem a name, the practice a place, and the rest of the work a direction.</p></div></section>

    <section className="included-section"><div className="included-heading"><p className="section-label">WHAT YOU ACTUALLY GET</p><h2>Name the problem.<br />Work the <em>practice.</em></h2><p>The course begins with a practical attention reset, then moves through nine visual lessons organized around attention, steadiness, relationships, and the parts of life worth protecting.</p></div><div className="included-list"><article><span>01</span><h3>The attention reset</h3><p>Grayscale, quieter feeds, a physical phone home, and an optional watch relay make attention easier to choose.</p></article><article><span>02</span><h3>Nine visual lessons</h3><p>Each focused lesson names a recognizable problem and gives you one concrete practice to use in real life.</p></article><article><span>03</span><h3>A real workbook</h3><p>Download and print 16 useful pages, or type privately in the browser version that saves on your device.</p></article></div></section>

    <section className="offer-section"><div className="offer-intro"><p className="section-label">THE DECISION</p><h2>One course.<br />One <em>payment.</em></h2><p>No tiers to compare, no subscription to cancel, nothing held back for a later upgrade. This is the whole practice.</p></div><div className="offer-stack offer-stack-simple"><article id="core" className="offer-card core-offer"><span>$99 FOUNDING EDITION</span><h3>All the Way Here</h3><p>One private visual course for attention, pressure, work, home, relationships, friendship, and the practices that bring them together.</p><strong>$99 <small>one time</small></strong><p className="offer-note">The attention reset, nine lessons, a 16-page printable workbook, and the field card. Private access at your own pace with a 14-day refund window.</p>{coreCheckoutReady ? <a href={CHECKOUT.core}>Get All the Way Here <b>→</b></a> : <Link href="/sunday-board">Start free while checkout opens <b>→</b></Link>}<p className="offer-after">After you pay you land on a welcome page, enter the same email, and the course opens. No password to invent.</p></article></div><p className="offer-alt">Want to try something first? The <Link href="/sunday-board">Sunday Board Meeting</Link> is free and takes fifteen minutes.</p></section>


    <section className="course-detail-intro" aria-label="Explore the complete course in detail"><p className="section-label">LOOK INSIDE WHEN YOU WANT THE DETAIL</p><p>The rest of this page shows the workbook, family tools, and each lesson in the course. You do not need to read all of it before you decide.</p></section>

    <section className="printables-showcase" id="workbook" aria-labelledby="printables-heading">
      <header><p className="section-label">16-PAGE WORKBOOK · INCLUDED</p><h2 id="printables-heading">Useful enough to put<br />on the <em>table.</em></h2><p>The printable workbook gives the Attention Reset and every lesson a place to land, then adds three practical family tools and a 30-day integration page. The browser version is also editable and saves privately on your device.</p></header>
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


    <section className="faq-section"><div><p className="section-label">PLAIN ANSWERS</p><h2>Know what you are<br /><em>buying.</em></h2><p>All the Way Here is one complete course, delivered privately in your browser. These are the questions that matter before checkout.</p></div><div className="faq-list"><details><summary>Why $99?<span>+</span></summary><p>It is a one-time price for nine lessons, the complete attention reset, a 16-page workbook, a one-page field card, and practical family tools you can reuse. It is education, not counseling or therapy.</p></details><details><summary>What happens after I pay?<span>+</span></summary><p>You land on a welcome page, enter the same email you paid with, and the course opens. There is no password to invent. Inside you can watch the introductions, open every lesson, mark your progress, and type in or print the workbook. If anything goes wrong, email Chris and he opens your access by hand.</p></details><details><summary>Are you a therapist?<span>+</span></summary><p>No, and I am not going to invent a title I do not have. This is education, not counseling or therapy. If what you are carrying needs a professional, it needs a professional, and this course is not a substitute for one.</p></details><details><summary>Is this a subscription?<span>+</span></summary><p>No. All the Way Here is a one-time purchase with private, self-paced access.</p></details><details><summary>What if it is not right for me?<span>+</span></summary><p>Request a refund within 14 calendar days of purchase. <Link href="/policies#refund">Read the refund policy.</Link></p></details></div></section>

    <section className="core-closing"><p className="section-label">ONE DECISION</p><h2>Do not buy a better version<br />of yourself. <em>Practice being here.</em></h2><p>The attention reset, nine lessons, the workbook, and the field card. One payment, yours to keep, with 14 days to change your mind.</p>{coreCheckoutReady ? <a className="button primary" href={CHECKOUT.core}>Get All the Way Here · $99 <span>→</span></a> : <Link className="button primary" href="/sunday-board#get-board">Start free while checkout opens <span>→</span></Link>}<small className="closing-alt">Not ready? <Link href="/sunday-board">Start with the free Sunday Board guide</Link>.</small></section>
    <Footer />
  </main>;
}
