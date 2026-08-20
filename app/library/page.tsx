import type { Metadata } from "next";
import { Footer, Header } from "../components";
import { SKOOL } from "../data";

export const metadata: Metadata = {
  title: "Iron Compass Core | The Complete Curriculum",
  description: "The complete twelve-module Iron Compass Core for husbands and fathers who want to return, lead, and keep what matters.",
  openGraph: { title: "Iron Compass Core | The Complete Curriculum", description: "A private, self-paced twelve-module curriculum for husbands and fathers.", images: [{ url: "/assets/thermostat-gamma.png", alt: "The Emotional Thermostat inside Iron Compass Core" }] },
  twitter: { title: "Iron Compass Core | The Complete Curriculum", description: "A private, self-paced twelve-module curriculum for husbands and fathers.", images: ["/assets/thermostat-gamma.png"] },
};

const modules = [
  {
    number: "01",
    name: "Return",
    line: "Get your attention and your presence back before you try to fix anything else.",
    lessons: ["Focus Protocol", "The Sanctuary", "Hunter vs. Farmer", "The Airlock Protocol"],
    image: "/assets/airlock-gamma.png",
    imageLabel: "The Airlock Protocol",
  },
  {
    number: "02",
    name: "Lead",
    line: "Bring a steadier man into the rooms that need you most.",
    lessons: ["The Emotional Thermostat", "The Date Night Algorithm", "The Floor General", "The Sunday Board Meeting"],
    image: "/assets/thermostat-gamma.png",
    imageLabel: "The Emotional Thermostat",
  },
  {
    number: "03",
    name: "Keep",
    line: "Protect the relationships and practices that keep a good life from slipping away.",
    lessons: ["The Third Place", "The Friendship Script", "Mission Debrief", "Iron Compass Workbook"],
    image: "/assets/third-place-gamma.png",
    imageLabel: "The Third Place",
  },
];

export default function Library() {
  return <main className="site"><Header />
    <section className="core-hero">
      <div><p className="kicker">IRON COMPASS CORE</p><h1>Be here for<br /><em>your own life.</em></h1><p>Iron Compass Core is a private, self-paced body of work for husbands and fathers who are tired of being physically home but mentally somewhere else.</p><div className="hero-buttons"><a className="button primary" href={SKOOL.core} target="_blank" rel="noreferrer">Get Core for $249 <span>→</span></a><a className="text-link" href="#curriculum">See the full curriculum <span>↓</span></a></div><small>One payment. No subscription. No community obligation.</small></div>
      <aside className="core-system-card" aria-label="The three movements inside Iron Compass Core"><p>THE COMPLETE PRIVATE SYSTEM</p><div><span>01</span><h2>Return</h2><small>Get your attention back.</small></div><div><span>02</span><h2>Lead</h2><small>Bring a steadier self home.</small></div><div><span>03</span><h2>Keep</h2><small>Protect what matters most.</small></div><footer>12 guided modules · Field Manual · Workbook</footer></aside>
    </section>

    <section className="core-promise"><p className="section-label">THE PROMISE</p><div><h2>Not more information.<br />A way to <em>come back.</em></h2><p>When attention is gone, pressure is running the room, or the people you love are getting the leftovers, advice is not enough. Core gives the moment a name, the practice a place, and the rest of the work a direction.</p></div></section>

    <section className="included-section"><div className="included-heading"><p className="section-label">WHAT YOU ACTUALLY GET</p><h2>The tools.<br />The lessons.<br /><em>The whole map.</em></h2><p>Core holds twelve guided modules, a Field Manual, a workbook, The Sunday Board Meeting, and Mission Debrief in one private place.</p></div><div className="included-list"><article><span>01</span><h3>Understand</h3><p>Guided lessons that name the pattern before asking you to change it.</p></article><article><span>02</span><h3>Use</h3><p>Practical tools that work in a doorway, a hard conversation, or a Sunday night.</p></article><article><span>03</span><h3>Return</h3><p>A complete path to come back to when the same patterns show up again.</p></article></div></section>

    <section id="curriculum" className="curriculum-section"><div className="curriculum-intro"><p className="section-label">THE COMPLETE CURRICULUM</p><h2>Return.<br /><em>Lead.</em><br />Keep.</h2><p>Core has three movements. They are not a thirty-day challenge. They are the parts of a man’s life that need to work together.</p></div><div className="curriculum-modules">{modules.map((module) => <article className="curriculum-module" key={module.name}><div className="module-copy"><span>{module.number} · {module.name.toUpperCase()}</span><h3>{module.line}</h3><ol>{module.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ol></div><figure><img src={module.image} alt={module.imageLabel} /><figcaption>{module.imageLabel} · Inside Core</figcaption></figure></article>)}</div></section>

    <section className="offer-section"><div className="offer-intro"><p className="section-label">ONE CLEAR PATH</p><h2>Start free.<br /><em>Go deeper on purpose.</em></h2><p>Every step has a job. The free work gives you something useful now. Focus solves one clear problem. Core gives the full body of work.</p></div><div className="offer-stack"><article className="offer-card free-offer"><span>01 · FREE</span><h3>The Sunday Board Meeting<br />+ Compass Check</h3><p>Put your week on the table and leave with a calmer, clearer conversation.</p><a href="/sunday-board">Get the free tools <b>→</b></a></article><article id="focus" className="offer-card focus-offer"><span>02 · $29</span><h3>Focus Protocol</h3><p>A 72-hour attention reset for the man who wants to be back in the room.</p><strong>$29 <small>one time</small></strong><p className="offer-note">Four practical moves and the Focus Protocol Field Manual.</p><a href={SKOOL.focus} target="_blank" rel="noreferrer">Get Focus Protocol <b>→</b></a></article><article id="core" className="offer-card core-offer"><span>03 · $249</span><h3>Iron Compass Core</h3><p>All twelve guided modules, the Field Manual, The Sunday Board Meeting, workbook, and Mission Debrief.</p><strong>$249 <small>one time</small></strong><p className="offer-note">Private access. No paid community to keep up with. If private work opens later, it will be offered quietly inside Core.</p><a href={SKOOL.core} target="_blank" rel="noreferrer">Get the complete Core <b>→</b></a></article></div></section>

    <section className="core-closing"><p className="section-label">START HERE</p><h2>Do not buy a better version<br />of yourself. <em>Practice being here.</em></h2><p>Start with the free Sunday Board Meeting. If the work helps, the rest of Iron Compass will be waiting.</p><a className="button primary" href="/sunday-board">See The Sunday Board Meeting <span>→</span></a></section>
    <Footer />
  </main>;
}
