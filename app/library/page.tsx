import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header } from "../components";
import { CHECKOUT } from "../data";
import { CORE_LESSONS, CORE_MOVEMENTS } from "../course-content";
import { JsonLd } from "../structured-data";

export const metadata: Metadata = {
  title: "Iron Compass Core | The Complete Curriculum",
  description: "A private, self-paced program for husbands and fathers who want to manage attention, carry pressure more steadily, and protect the relationships that matter. $99 founding-edition price.",
  alternates: { canonical: "/library" },
  openGraph: { title: "Iron Compass Core | The Complete Curriculum", description: "A private, self-paced curriculum for husbands and fathers.", images: [{ url: "/assets/core-bridge-poster.jpg", alt: "Iron Compass Core" }] },
  twitter: { title: "Iron Compass Core | The Complete Curriculum", description: "A private, self-paced curriculum for husbands and fathers.", images: ["/assets/core-bridge-poster.jpg"] },
};

const coreCheckoutReady = Boolean(CHECKOUT.core);

const coreProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Iron Compass Core",
  description: "A private, self-paced course with three modules, nine visual lessons, practical exercises, progress, and the Core Workbook.",
  image: "https://ironcompassinstitute.com/assets/core-bridge-poster.jpg",
  brand: { "@type": "Brand", name: "Iron Compass Institute" },
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
      <div><p className="kicker">IRON COMPASS CORE</p><h1>Be here for<br /><em>your own life.</em></h1><p>Iron Compass Core is a private, self-paced body of work for husbands and fathers who are tired of being physically home but mentally somewhere else.</p><div className="hero-buttons">{coreCheckoutReady ? <a className="button primary" href={CHECKOUT.core}>Get Core · $99 <span>→</span></a> : <Link className="button primary" href="/sunday-board#get-board">Start free while checkout opens <span>→</span></Link>}<a className="text-link" href="#curriculum">See the full curriculum <span>↓</span></a></div><small>{coreCheckoutReady ? "Founding-edition price. One-time purchase. Private access. 14-day refund window." : "The paid checkout is not open yet. The free meeting guide is available now."}</small></div>
      <aside className="core-system-card" aria-label="The three movements inside Iron Compass Core"><p>THE COMPLETE PRIVATE SYSTEM</p><div><span>01</span><h2>Return</h2><small>Get your attention back.</small></div><div><span>02</span><h2>Lead</h2><small>Bring a steadier self home.</small></div><div><span>03</span><h2>Keep</h2><small>Protect what matters most.</small></div><footer>Three movements · Core Workbook included</footer></aside>
    </section>

    <section className="core-promise"><p className="section-label">THE PROMISE</p><div><h2>Not more information.<br />A way to <em>come back.</em></h2><p>When attention is gone, pressure is running the room, or the people you love are getting the leftovers, advice is not enough. Core gives the moment a name, the practice a place, and the rest of the work a direction.</p></div></section>

    <section className="included-section"><div className="included-heading"><p className="section-label">WHAT YOU ACTUALLY GET</p><h2>See the room.<br />Work the <em>practice.</em></h2><p>Core is a guided visual lesson library, organized around attention, steadiness at home, and the relationships worth protecting.</p></div><div className="included-list"><article><span>01</span><h3>Three clear movements</h3><p>Return, Lead, and Keep give the work a structure without turning your life into another project.</p></article><article><span>02</span><h3>Nine visual lessons</h3><p>Each focused lesson names a real problem and gives you a concrete practice to use.</p></article><article><span>03</span><h3>Core Workbook</h3><p>A companion resource that helps you capture what matters and carry the practices into your own life.</p></article></div></section>

    <section id="curriculum" className="curriculum-section"><div className="curriculum-intro"><p className="section-label">THE FULL CORE CURRICULUM</p><h2>Return.<br /><em>Lead.</em><br />Keep.</h2><p>Three complete modules and nine visual lessons. Each preview below is a real lesson cover from the native course. Every lesson names a recurring problem, gives you one practice, and ends with a move you can use in your actual life.</p></div><div className="curriculum-modules">{modules.map((module) => <article className="curriculum-module" key={module.name}><div className="curriculum-preview"><img src={module.previewImage} alt={module.previewAlt} width="1400" height="900" loading="lazy" decoding="async" /></div><div className="module-copy"><span>{module.number} · {module.name.toUpperCase()}</span><h3>{module.line}</h3><ol>{module.lessons.map((lesson) => <li key={lesson.title}><strong>{lesson.title}</strong><small>{lesson.summary}</small></li>)}</ol></div></article>)}</div></section>

    <section className="offer-section"><div className="offer-intro"><p className="section-label">ONE CLEAR PATH</p><h2>Start where the<br /><em>problem is real.</em></h2><p>The Sunday Board Meeting is for the week you and your wife need to see together. Focus is for attention that keeps leaving the room. Core brings the complete system together.</p></div><div className="offer-stack"><article className="offer-card free-offer"><span>01 · START FREE</span><h3>The Sunday Board Meeting</h3><p>A printable 15-minute weekly meeting guide for you and your wife.</p><Link href="/sunday-board#get-board">Start the Sunday Board Meeting <b>→</b></Link></article><article id="focus" className="offer-card focus-offer"><span>02 · $29</span><h3>Focus Protocol</h3><p>A guided 72-hour attention reset for the man who wants to be back in the room.</p><strong>$29 <small>one time</small></strong><p className="offer-note">A browser-based visual Field Manual containing four practical moves. Immediate private access and a 14-day refund window.</p><Link href="/focus">See Focus Protocol <b>→</b></Link></article><article id="core" className="offer-card core-offer"><span>03 · $99 FOUNDING EDITION</span><h3>Iron Compass Core</h3><p>A private visual lesson library for attention, pressure, home, marriage, family connection, friendship, and the practices that bring them together.</p><strong>$99 <small>one time</small></strong><p className="offer-note">Nine visual lessons and the Core Workbook. Private access at your own pace with a 14-day refund window. The price will rise after the founding edition has real buyer feedback.</p>{coreCheckoutReady ? <a href={CHECKOUT.core}>Get Iron Compass Core <b>→</b></a> : <Link href="/sunday-board#get-board">Start free while checkout opens <b>→</b></Link>}</article></div></section>

    <section className="faq-section"><div><p className="section-label">PLAIN ANSWERS</p><h2>Know what you are<br /><em>buying.</em></h2><p>Core is a complete course, delivered directly inside Iron Compass. These are the questions that matter before checkout.</p></div><div className="faq-list"><details><summary>Should I start with Focus Protocol?<span>+</span></summary><p>If digital distraction is the clearest problem and you want a smaller first step, yes. Focus is the recommended first purchase. You can buy Core directly when you already know you want the complete system.</p></details><details><summary>What happens after I pay?<span>+</span></summary><p>Checkout unlocks the private Iron Compass course home. From there you can watch the module introductions, open every visual lesson, mark your progress, and print or save the Core Workbook. Your access link is also sent by email.</p></details><details><summary>Is this a subscription?<span>+</span></summary><p>No. Core is a one-time purchase with private, self-paced access.</p></details><details><summary>What if it is not right for me?<span>+</span></summary><p>Request a refund within 14 calendar days of purchase. <Link href="/policies#refund">Read the refund policy.</Link></p></details></div></section>

    <section className="core-closing"><p className="section-label">START HERE</p><h2>Do not buy a better version<br />of yourself. <em>Practice being here.</em></h2><p>Start with the Sunday Board Meeting. If digital distraction is the clearest problem, Focus Protocol is the recommended first purchase.</p><Link className="button primary" href="/sunday-board">Start the Sunday Board Meeting <span>→</span></Link></section>
    <Footer />
  </main>;
}
