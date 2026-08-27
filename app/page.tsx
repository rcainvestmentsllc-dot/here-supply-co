import Link from "next/link";
import type { Metadata } from "next";
import { CONTACT_FORM } from "./data";
import { CompassMark } from "./components";
import styles from "./home.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const movements = [
  {
    number: "01",
    title: "Attention",
    line: "Bring your attention back under your direction.",
    detail: "Make space to think clearly, finish the work in front of you, and come through the door without making your family carry the day’s pressure.",
    image: "/assets/compass-brass-wide.png",
    alt: "A brass compass resting on weathered wood",
    imageWidth: 2048,
    imageHeight: 1365,
    imageLabel: "DIRECTION BEFORE DISTRACTION",
  },
  {
    number: "02",
    title: "Regulation",
    line: "Bring a steadier self into the room.",
    detail: "Pressure is real. The work is learning to pause, return, and lead a hard moment without letting it take over the house.",
    image: "/assets/sauna-cover.png",
    alt: "A quiet wooden sauna prepared for a reset",
    imageWidth: 2048,
    imageHeight: 2048,
    imageLabel: "CREATE ROOM TO RESET",
  },
  {
    number: "03",
    title: "Identity",
    line: "Build a life that can hold what matters.",
    detail: "Protect time, friendship, marriage, family rhythms, and the parts of life that keep a good man from slowly disappearing into work.",
    image: "/assets/third-place-surf-card.jpg",
    alt: "A surfer carrying his board into the water at sunset",
    imageWidth: 1600,
    imageHeight: 900,
    imageLabel: "BUILD A LIFE BEYOND WORK",
  },
];

export default function Home() {
  return (
    <main id="main-content" className={styles.home}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Iron Compass home">
          <CompassMark />
          <span><strong>IRON COMPASS</strong><small>Practical work for the rooms that matter</small></span>
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#system">The system</a>
          <a href="#start">Start free</a>
          <a href="#work">Programs</a>
          <Link href="/about">About Chris</Link>
        </nav>
        <Link className={styles.headerAction} href="/sunday-board#get-board">Get the meeting guide <span>→</span></Link>
      </header>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <a href="#system">The system</a>
        <a href="#start">Start free</a>
        <a href="#work">Programs</a>
        <Link href="/about">About Chris</Link>
      </nav>

      <section className={styles.hero}>
        <img className={styles.heroImage} src="/assets/home-hero-doorway.jpg" alt="A man pausing before entering a warmly lit room" width="1536" height="1024" fetchPriority="high" decoding="async" />
        <div className={styles.heroShade} />
        <div className={styles.heroRule} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>PRACTICAL WORK FOR HUSBANDS AND FATHERS</p>
          <h1>Be here for<br /><em>your own life.</em></h1>
          <p className={styles.lead}>Practical tools for husbands and fathers who want to be less distracted, more present at home, and steadier with the people they love.</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/sunday-board">Start the Sunday Board Meeting <span>→</span></Link>
            <Link className={styles.quietLightLink} href="/field-guide">Take the Compass Check <span>→</span></Link>
          </div>
        </div>
        <div className={styles.heroFooter}><span>START FREE. USE IT THIS SUNDAY.</span><span>Attention · Regulation · Identity</span></div>
      </section>

      <section className={styles.systemIntro} id="system">
        <p className={styles.eyebrow}>THE WORLD IS DESIGNED TO PULL YOU AWAY</p>
        <div>
          <h2>Your family should not get whatever the <em>algorithm</em> leaves behind.</h2>
          <p>Phones, feeds, AI tools, and work can make life faster while making it harder to arrive anywhere fully. The answer is not to hate technology. It is to decide what gets your attention, create a clean transition home, and protect a few simple rhythms with the people you love. Iron Compass turns that work into practices you can actually use.</p>
        </div>
      </section>

      <section className={styles.movementSection} id="movements">
        <div className={styles.movementHeader}>
          <p className={styles.eyebrow}>THE IRON COMPASS SYSTEM</p>
          <h2>Three movements.<br />One <em>way back.</em></h2>
          <p>The work moves from what has your attention, to how you carry pressure, to the life you are building around the people you love.</p>
        </div>
        <div className={styles.movementGrid}>
          {movements.map((movement) => (
            <article key={movement.title} className={styles.movementCard}>
              <div className={styles.movementPreview}>
                <img src={movement.image} alt={movement.alt} width={movement.imageWidth} height={movement.imageHeight} loading="lazy" decoding="async" />
                <span>{movement.imageLabel}</span>
              </div>
              <div className={styles.movementBody}>
                <span>{movement.number}</span>
                <h3>{movement.title}</h3>
                <strong>{movement.line}</strong>
                <p>{movement.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.startSection} id="start">
        <div className={styles.startArtwork}>
          <img src="/assets/sunday-board-gamma.png" alt="The Sunday Board Meeting weekly meeting guide" width="2400" height="3106" loading="lazy" decoding="async" />
          <span>FREE PRACTICE</span>
        </div>
        <div className={styles.startCopy}>
          <p className={styles.eyebrow}>START WITH A REAL CONVERSATION</p>
          <h2>The Sunday Board <em>Meeting.</em></h2>
          <p>A printable fifteen-minute weekly meeting for you and your wife, so the calendar, money, kids, connection, and one shared priority are no longer living in two separate heads.</p>
          <dl>
            <div><dt>What it helps with</dt><dd>Connection, the calendar, money, kids, time together, and one shared win.</dd></div>
            <div><dt>What you get</dt><dd>The printable meeting guide immediately, plus five short notes that help you use it well.</dd></div>
          </dl>
          <div className={styles.buttonRow}>
            <Link className={styles.primaryButton} href="/sunday-board#get-board">Start the Sunday Board Meeting <span>→</span></Link>
            <Link className={styles.quietDarkLink} href="/field-guide">Not sure where to start? Take the Compass Check <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.workSection} id="work">
        <div className={styles.workHeader}>
          <p className={styles.eyebrow}>WHEN YOU WANT TO GO DEEPER</p>
          <h2>A small reset first.<br />The full system <em>later.</em></h2>
          <p>Start with the problem that is real today. Focus is the practical first purchase. Core is there when you want the whole system.</p>
        </div>

        <div className={styles.offerGrid}>
          <article className={styles.focusOffer}>
            <div className={styles.offerTopline}><span>FOCUS PROTOCOL</span><b>$29 ONE TIME</b></div>
            <h3>Get your attention<br />back in the <em>room.</em></h3>
            <p>Focus Protocol is a guided 72-hour reset for the man who knows distraction is taking more than it should. It is not a lecture. It is four practical moves presented clearly enough to use immediately.</p>
            <div className={styles.deliveryNote}><span>DELIVERED INSIDE</span><p>A three-minute introduction and a browser-based visual Field Manual with four practical moves.</p></div>
            <div className={styles.offerStill}>
              <img src="/assets/focus-manual-gamma.png" alt="A preview of the Focus Protocol visual Field Manual" width="2400" height="1260" loading="lazy" decoding="async" />
              <span>VISUAL FIELD MANUAL PREVIEW</span>
            </div>
            <p className={styles.offerAssurance}>$29 one time · Immediate access · 14-day refund window</p>
            <Link href="/focus">See Focus Protocol · $29 <b>→</b></Link>
          </article>

          <article className={styles.coreOffer}>
            <div className={styles.offerTopline}><span>IRON COMPASS CORE</span><b>$249 ONE TIME</b></div>
            <h3>Build the whole<br /><em>system.</em></h3>
            <p>Core brings the full work together: attention, pressure, home, marriage, family connection, friendship, and the practices that keep a good life from slipping away.</p>
            <div className={styles.deliveryNote}><span>DELIVERED INSIDE</span><p>One short orientation video, visual teaching decks, specific practices, and the Core Workbook as a companion resource.</p></div>
            <div className={styles.offerStill}>
              <img src="/assets/thermostat-gamma.png" alt="A preview of an Iron Compass Core visual lesson" width="2400" height="1260" loading="lazy" decoding="async" />
              <span>CORE LESSON PREVIEW</span>
            </div>
            <p className={styles.offerAssurance}>The deeper path. Focus Protocol is the recommended first purchase if you are unsure.</p>
            <Link href="/library#curriculum">See inside Iron Compass Core <b>→</b></Link>
          </article>
        </div>
      </section>

      <section className={styles.methodSection}>
        <p className={styles.eyebrow}>HOW THE TEACHING WORKS</p>
        <div>
          <h2>Watch the room.<br />Work the <em>practice.</em></h2>
          <p>The teaching is built to be used, not collected. A short video puts the work in context. A visual lesson makes it plain. Then there is one practice to carry into an ordinary day.</p>
        </div>
        <ul>
          <li><span>01</span>A short orientation that explains how the three movements work together.</li>
          <li><span>02</span>Clear visual teaching decks instead of a long lecture library.</li>
          <li><span>03</span>Practical exercises that belong in real life, not on a shelf.</li>
        </ul>
      </section>

      <section className={styles.founderSection}>
        <div className={styles.founderMark}>CA</div>
        <div>
          <p className={styles.eyebrow}>FROM CHRIS</p>
          <h2>I made this for the part of life you cannot get <em>back.</em></h2>
          <p>I am not standing outside of this work. I am a husband and father who knows what it is like to be physically present while my attention is somewhere else. Iron Compass came out of my own effort to come back, stay in the room, and take better care of the people I love.</p>
          <Link className={styles.quietDarkLink} href="/about">Read Chris’s story <span>→</span></Link>
        </div>
      </section>

      <section className={styles.closing}>
        <p className={styles.eyebrow}>START WHERE LIFE IS ASKING FOR YOU</p>
        <h2>One useful way<br />to come <em>back.</em></h2>
        <p>Start the Sunday Board Meeting with your wife this week. If you are not sure what needs attention first, take the Compass Check.</p>
        <div><Link className={styles.primaryButton} href="/sunday-board#get-board">Start the Sunday Board Meeting <span>→</span></Link><Link href="/field-guide">Take the Compass Check <span>→</span></Link></div>
      </section>

      <footer className={styles.footer}>
        <span>© 2026 Iron Compass Institute</span>
        <nav><a href="#system">The system</a><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/field-guide">Compass Check</Link><Link href="/focus">Focus Protocol</Link><Link href="/library">Iron Compass Core</Link><Link href="/about">About Chris</Link><Link href="/policies">Policies</Link><a href={CONTACT_FORM} target="_blank" rel="noreferrer">Contact Chris</a></nav>
      </footer>
    </main>
  );
}
