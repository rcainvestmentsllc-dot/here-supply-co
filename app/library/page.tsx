import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header } from "../components";
import { CHECKOUT } from "../data";
import { JsonLd } from "../structured-data";

export const metadata: Metadata = {
  title: "Iron Compass Core | The Complete Curriculum",
  description: "A private, self-paced program for husbands and fathers who want to manage attention, carry pressure more steadily, and protect the relationships that matter. $249 once.",
  alternates: { canonical: "/library" },
  openGraph: { title: "Iron Compass Core | The Complete Curriculum", description: "A private, self-paced curriculum for husbands and fathers.", images: [{ url: "/assets/core-bridge-poster.jpg", alt: "Iron Compass Core" }] },
  twitter: { title: "Iron Compass Core | The Complete Curriculum", description: "A private, self-paced curriculum for husbands and fathers.", images: ["/assets/core-bridge-poster.jpg"] },
};

const coreCheckoutReady = Boolean(CHECKOUT.core);

const coreProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Iron Compass Core",
  description: "A private, self-paced curriculum with nine visual lessons, practical exercises, and the Core Workbook.",
  image: "https://ironcompassinstitute.com/assets/core-bridge-poster.jpg",
  brand: { "@type": "Brand", name: "Iron Compass Institute" },
  category: "Digital educational product",
  ...(coreCheckoutReady ? {
    offers: {
      "@type": "Offer",
      url: CHECKOUT.core,
      priceCurrency: "USD",
      price: "249.00",
    },
  } : {}),
};

const modules = [
  {
    number: "01",
    name: "Return",
    line: "Get your attention and your presence back before you try to fix anything else.",
    lessons: [
      { title: "The Sanctuary", detail: "Get the open loops out of your head with a weekly mind sweep on paper." },
      { title: "Hunter vs. Farmer", detail: "Protect focused work first, then handle email, admin, and maintenance." },
      { title: "The Airlock Protocol", detail: "Use the drive home as a deliberate transition from work into family life." },
    ],
    image: "/assets/airlock-gamma.png",
    alt: "A preview from The Airlock Protocol lesson",
  },
  {
    number: "02",
    name: "Lead",
    line: "Bring a steadier man into the rooms that need you most.",
    lessons: [
      { title: "The Emotional Thermostat", detail: "Pause before you react so pressure does not set the temperature of the room." },
      { title: "The Date Night Algorithm", detail: "Use novelty and shared activity to create real connection, with the phones put away." },
      { title: "The Floor General", detail: "Give your kids fifteen phone-free minutes at their level, following their lead." },
    ],
    image: "/assets/thermostat-gamma.png",
    alt: "A preview from The Emotional Thermostat lesson",
  },
  {
    number: "03",
    name: "Keep",
    line: "Protect the relationships and practices that keep a good life from slipping away.",
    lessons: [
      { title: "The Third Place", detail: "Choose one place outside work and home where you can show up without performing a role." },
      { title: "The Friendship Script", detail: "Build friendship through shared activity, low stakes, repetition, and inviting first." },
      { title: "Mission Debrief", detail: "Review the full system and decide which practices you will keep using." },
    ],
    image: "/assets/third-place-gamma.png",
    alt: "A preview from The Third Place lesson",
  },
];

export default function Library() {
  return <main id="main-content" className="site"><JsonLd data={coreProduct} /><Header />
    <section className="core-hero">
      <div><p className="kicker">IRON COMPASS CORE</p><h1>Be here for<br /><em>your own life.</em></h1><p>Iron Compass Core is a private, self-paced body of work for husbands and fathers who are tired of being physically home but mentally somewhere else.</p><div className="hero-buttons">{coreCheckoutReady ? <a className="button primary" href={CHECKOUT.core}>Get Core · $249 <span>→</span></a> : <Link className="button primary" href="/sunday-board#get-board">Start free while checkout opens <span>→</span></Link>}<a className="text-link" href="#curriculum">See the full curriculum <span>↓</span></a></div><small>{coreCheckoutReady ? "One-time purchase. Private access. 14-day refund window." : "The paid checkout is not open yet. The free meeting guide is available now."}</small></div>
      <aside className="core-system-card" aria-label="The three movements inside Iron Compass Core"><p>THE COMPLETE PRIVATE SYSTEM</p><div><span>01</span><h2>Return</h2><small>Get your attention back.</small></div><div><span>02</span><h2>Lead</h2><small>Bring a steadier self home.</small></div><div><span>03</span><h2>Keep</h2><small>Protect what matters most.</small></div><footer>Three movements · Core Workbook included</footer></aside>
    </section>

    <section className="core-promise"><p className="section-label">THE PROMISE</p><div><h2>Not more information.<br />A way to <em>come back.</em></h2><p>When attention is gone, pressure is running the room, or the people you love are getting the leftovers, advice is not enough. Core gives the moment a name, the practice a place, and the rest of the work a direction.</p></div></section>

    <section className="included-section"><div className="included-heading"><p className="section-label">WHAT YOU ACTUALLY GET</p><h2>See the room.<br />Work the <em>practice.</em></h2><p>Core is a guided visual lesson library, organized around attention, steadiness at home, and the relationships worth protecting.</p></div><div className="included-list"><article><span>01</span><h3>Three clear movements</h3><p>Return, Lead, and Keep give the work a structure without turning your life into another project.</p></article><article><span>02</span><h3>Nine visual lessons</h3><p>Each focused lesson names a real problem and gives you a concrete practice to use.</p></article><article><span>03</span><h3>Core Workbook</h3><p>A companion resource that helps you capture what matters and carry the practices into your own life.</p></article></div></section>

    <section id="curriculum" className="curriculum-section"><div className="curriculum-intro"><p className="section-label">THE FULL CORE CURRICULUM</p><h2>Return.<br /><em>Lead.</em><br />Keep.</h2><p>Nine lessons across three movements. Each one gives a recurring problem a name and a practice you can actually use.</p></div><div className="curriculum-modules">{modules.map((module) => <article className="curriculum-module" key={module.name}><div className="curriculum-preview"><img src={module.image} alt={module.alt} width="2400" height="1260" loading="lazy" decoding="async" /><span>LESSON PREVIEW</span></div><div className="module-copy"><span>{module.number} · {module.name.toUpperCase()}</span><h3>{module.line}</h3><ol>{module.lessons.map((lesson) => <li key={lesson.title}><strong>{lesson.title}</strong><small>{lesson.detail}</small></li>)}</ol></div></article>)}</div></section>

    <section className="offer-section"><div className="offer-intro"><p className="section-label">ONE CLEAR PATH</p><h2>Start where the<br /><em>problem is real.</em></h2><p>The Sunday Board Meeting is for the week you and your wife need to see together. Focus is for attention that keeps leaving the room. Core brings the complete system together.</p></div><div className="offer-stack"><article className="offer-card free-offer"><span>01 · START FREE</span><h3>The Sunday Board Meeting</h3><p>A printable 15-minute weekly meeting guide for you and your wife.</p><Link href="/sunday-board#get-board">Start the Sunday Board Meeting <b>→</b></Link></article><article id="focus" className="offer-card focus-offer"><span>02 · $29</span><h3>Focus Protocol</h3><p>A guided 72-hour attention reset for the man who wants to be back in the room.</p><strong>$29 <small>one time</small></strong><p className="offer-note">A browser-based visual Field Manual containing four practical moves. Immediate private access and a 14-day refund window.</p><Link href="/focus">See Focus Protocol <b>→</b></Link></article><article id="core" className="offer-card core-offer"><span>03 · $249</span><h3>Iron Compass Core</h3><p>A private visual lesson library for attention, pressure, home, marriage, family connection, friendship, and the practices that bring them together.</p><strong>$249 <small>one time</small></strong><p className="offer-note">Nine visual lessons and the Core Workbook. Private access at your own pace with a 14-day refund window.</p>{coreCheckoutReady ? <a href={CHECKOUT.core}>Get Iron Compass Core <b>→</b></a> : <Link href="/sunday-board#get-board">Start free while checkout opens <b>→</b></Link>}</article></div></section>

    <section className="faq-section"><div><p className="section-label">PLAIN ANSWERS</p><h2>Know what you are<br /><em>buying.</em></h2><p>Core is deliberately simple to access and use. These are the questions that matter before checkout.</p></div><div className="faq-list"><details><summary>Should I start with Focus Protocol?<span>+</span></summary><p>If digital distraction is the clearest problem and you want a smaller first step, yes. Focus is the recommended first purchase. You can buy Core directly when you already know you want the complete system.</p></details><details><summary>How is Core delivered?<span>+</span></summary><p>After checkout, you are sent directly to an unlisted access page with the nine lesson links and the Core Workbook. Save that private link.</p></details><details><summary>Is this a subscription?<span>+</span></summary><p>No. Core is a one-time purchase with private, self-paced access.</p></details><details><summary>What if it is not right for me?<span>+</span></summary><p>Request a refund within 14 calendar days of purchase. <Link href="/policies#refund">Read the refund policy.</Link></p></details></div></section>

    <section className="core-closing"><p className="section-label">START HERE</p><h2>Do not buy a better version<br />of yourself. <em>Practice being here.</em></h2><p>Start with the Sunday Board Meeting. If digital distraction is the clearest problem, Focus Protocol is the recommended first purchase.</p><Link className="button primary" href="/sunday-board">Start the Sunday Board Meeting <span>→</span></Link></section>
    <Footer />
  </main>;
}
