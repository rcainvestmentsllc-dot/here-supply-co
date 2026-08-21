import type { Metadata } from "next";
import { Footer, Header } from "../components";
import { SKOOL } from "../data";

export const metadata: Metadata = {
  title: "Iron Compass Core | The Complete Curriculum",
  description: "The complete private Iron Compass Core curriculum for husbands and fathers who want to return, lead, and keep what matters.",
  openGraph: { title: "Iron Compass Core | The Complete Curriculum", description: "A private, self-paced curriculum for husbands and fathers.", images: [] },
  twitter: { title: "Iron Compass Core | The Complete Curriculum", description: "A private, self-paced curriculum for husbands and fathers.", images: [] },
};

const modules = [
  {
    number: "01",
    name: "Return",
    line: "Get your attention and your presence back before you try to fix anything else.",
    lessons: ["The Sanctuary", "Hunter vs. Farmer", "The Airlock Protocol"],
  },
  {
    number: "02",
    name: "Lead",
    line: "Bring a steadier man into the rooms that need you most.",
    lessons: ["The Emotional Thermostat", "The Date Night Algorithm", "The Floor General"],
  },
  {
    number: "03",
    name: "Keep",
    line: "Protect the relationships and practices that keep a good life from slipping away.",
    lessons: ["The Third Place", "The Friendship Script", "Mission Debrief"],
  },
];

export default function Library() {
  return <main className="site"><Header />
    <section className="core-hero">
      <div><p className="kicker">IRON COMPASS CORE</p><h1>Be here for<br /><em>your own life.</em></h1><p>Iron Compass Core is a private, self-paced body of work for husbands and fathers who are tired of being physically home but mentally somewhere else.</p><div className="hero-buttons"><a className="button primary" href={SKOOL.group} target="_blank" rel="noreferrer">Start free, then see Core <span>→</span></a><a className="text-link" href="#curriculum">See the full curriculum <span>↓</span></a></div><small>Create a free account first. Core is a one-time $249 purchase inside the library.</small></div>
      <aside className="core-system-card" aria-label="The three movements inside Iron Compass Core"><p>THE COMPLETE PRIVATE SYSTEM</p><div><span>01</span><h2>Return</h2><small>Get your attention back.</small></div><div><span>02</span><h2>Lead</h2><small>Bring a steadier self home.</small></div><div><span>03</span><h2>Keep</h2><small>Protect what matters most.</small></div><footer>Three movements · Core Workbook included</footer></aside>
    </section>

    <section className="core-promise"><p className="section-label">THE PROMISE</p><div><h2>Not more information.<br />A way to <em>come back.</em></h2><p>When attention is gone, pressure is running the room, or the people you love are getting the leftovers, advice is not enough. Core gives the moment a name, the practice a place, and the rest of the work a direction.</p></div></section>

    <section className="included-section"><div className="included-heading"><p className="section-label">WHAT YOU ACTUALLY GET</p><h2>Watch the room.<br />Work the <em>practice.</em></h2><p>Core is a guided visual lesson library, organized around attention, steadiness at home, and the relationships worth protecting.</p></div><div className="included-list"><article><span>01</span><h3>Module introductions</h3><p>Each movement begins with a short video from Chris so you know the room you are working on and why it matters.</p></article><article><span>02</span><h3>Visual lesson decks</h3><p>Then move through clear, visual lessons and one practice at a time. No long lecture library.</p></article><article><span>03</span><h3>Core Workbook</h3><p>A companion resource included with Core. It supports the work, but it is not a lesson or a fourth movement.</p></article></div></section>

    <section id="curriculum" className="curriculum-section"><div className="curriculum-intro"><p className="section-label">THE CORE CURRICULUM</p><h2>Return.<br /><em>Lead.</em><br />Keep.</h2><p>Core has three movements. They are not a thirty-day challenge. They are the parts of a man’s life that need to work together.</p></div><div className="curriculum-modules">{modules.map((module) => <article className="curriculum-module" key={module.name}><div className="module-copy"><span>{module.number} · {module.name.toUpperCase()}</span><h3>{module.line}</h3><ol>{module.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ol></div></article>)}</div></section>

    <section className="offer-section"><div className="offer-intro"><p className="section-label">ONE CLEAR PATH</p><h2>Start free.<br /><em>Go deeper on purpose.</em></h2><p>Every step has a job. The free library gives you something useful now. Inside it, Focus solves one clear problem and Core gives the full body of work.</p></div><div className="offer-stack"><article className="offer-card free-offer"><span>01 · FREE</span><h3>The Sunday Board Meeting<br />+ Compass Check</h3><p>Create a free account, then put your week on the table with a calmer, clearer conversation.</p><a href={SKOOL.group} target="_blank" rel="noreferrer">Enter the free library <b>↗</b></a></article><article id="focus" className="offer-card focus-offer"><span>02 · $29</span><h3>Focus Protocol</h3><p>A video-led 72-hour attention reset for the man who wants to be back in the room.</p><strong>$29 <small>one time</small></strong><p className="offer-note">A short Focus video, four practical moves, and the visual Focus Protocol Field Manual. Available to buy inside Iron Compass.</p><a href={SKOOL.group} target="_blank" rel="noreferrer">Enter free, then see Focus <b>↗</b></a></article><article id="core" className="offer-card core-offer"><span>03 · $249</span><h3>Iron Compass Core</h3><p>A private visual lesson library for attention, pressure, home, marriage, family connection, friendship, and the practices that bring them together.</p><strong>$249 <small>one time</small></strong><p className="offer-note">Three module introduction videos, clear visual lessons, and the Core Workbook. Private access. No paid community to keep up with.</p><a href={SKOOL.group} target="_blank" rel="noreferrer">Enter free, then see Core <b>↗</b></a></article></div></section>

    <section className="core-closing"><p className="section-label">START HERE</p><h2>Do not buy a better version<br />of yourself. <em>Practice being here.</em></h2><p>Start with the free Sunday Board Meeting. If the work helps, the rest of Iron Compass will be waiting.</p><a className="button primary" href={SKOOL.group} target="_blank" rel="noreferrer">Start free in Iron Compass <span>→</span></a></section>
    <Footer />
  </main>;
}
