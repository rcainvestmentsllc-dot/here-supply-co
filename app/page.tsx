import { PlainLink as Link } from "./plain-link";
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
    title: "Return",
    line: "Bring your attention back before you try to fix anything else.",
    detail: "Make space to think clearly, finish the work in front of you, and come through the door without asking your family to carry the whole day with you.",
    image: "/assets/compass-brass-wide.webp",
    alt: "A brass compass resting on weathered wood",
    imageWidth: 1600,
    imageHeight: 1066,
    imageLabel: "DIRECTION BEFORE DISTRACTION",
  },
  {
    number: "02",
    title: "Lead",
    line: "Bring a steadier self into a hard moment.",
    detail: "Pressure is real. The work is learning to pause, respond without making the moment worse, and repair it when you miss.",
    image: "/assets/sauna-cover.webp",
    alt: "A quiet wooden sauna prepared for a reset",
    imageWidth: 1600,
    imageHeight: 1600,
    imageLabel: "CREATE ROOM TO RESET",
  },
  {
    number: "03",
    title: "Keep",
    line: "Keep the parts of life work cannot replace.",
    detail: "Protect time, friendship, marriage, family rhythms, and the ordinary parts of life that keep a good man from slowly disappearing into work.",
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
          <Link href="/resources">Resources</Link>
        </nav>
        <Link className={styles.headerAction} href="/sunday-board#get-board">Start free <span>→</span></Link>
      </header>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <a href="#system">The system</a>
        <a href="#start">Start free</a>
        <a href="#work">Programs</a>
        <Link href="/resources">Resources</Link>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>PRACTICAL WORK FOR HUSBANDS AND FATHERS</p>
            <h1>Be here for<br /><em>your own life.</em></h1>
            <p className={styles.lead}>Iron Compass gives you short, practical ways to reclaim your attention, carry pressure better, and become more present at home.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/sunday-board#get-board">Start the Sunday Board Meeting <span>→</span></Link>
              <Link className={styles.quietLightLink} href="/field-guide">Find my starting point <span>→</span></Link>
            </div>
            <p className={styles.heroAssurance}>Free 15-minute meeting guide · Opens immediately</p>
          </div>
          <figure className={styles.heroMaterials}>
            <div className={styles.heroMaterialsFrame}>
              <img className={styles.heroFocusPreview} src="/assets/focus-manual-gamma.png" alt="Focus Protocol visual Field Manual" width="2400" height="1260" fetchPriority="high" decoding="async" />
              <img className={styles.heroMeetingPreview} src="/assets/sunday-board-gamma.png" alt="Sunday Board Meeting printable guide" width="2400" height="3106" fetchPriority="high" decoding="async" />
              <img className={styles.heroCorePreview} src="/assets/thermostat-gamma.png" alt="Iron Compass Core visual lesson" width="2400" height="1260" fetchPriority="high" decoding="async" />
            </div>
            <figcaption><strong>THE ACTUAL WORK</strong><span>Printable guide, visual Field Manual, and Core lesson</span></figcaption>
          </figure>
        </div>
        <div className={styles.heroFooter} aria-label="What Iron Compass includes">
          <span><b>15 MIN</b> free weekly meeting guide</span>
          <span><b>72 HR</b> focused attention reset</span>
          <span><b>9</b> visual lessons in Core</span>
        </div>
      </section>

      <section className={styles.orientation} aria-labelledby="orientation-title">
        <div className={styles.orientationIntro}>
          <p className={styles.eyebrow}>WHY YOU MAY BE HERE</p>
          <h2 id="orientation-title">Start with the problem<br />you can <em>name.</em></h2>
          <p>You do not need a new identity or another life system. Pick the situation that feels most true right now.</p>
        </div>
        <div className={styles.orientationPaths}>
          <Link href="/sunday-board#get-board"><span>01</span><strong>My wife and I need to get on the same page.</strong><small>Start with the free Sunday Board Meeting.</small><b>Start free →</b></Link>
          <Link href="/focus"><span>02</span><strong>My attention keeps leaving the room.</strong><small>Start with the 72-hour Focus Protocol.</small><b>See Focus →</b></Link>
          <Link href="/library"><span>03</span><strong>I want a steadier way to handle work, pressure, and home.</strong><small>See the complete Iron Compass Core curriculum.</small><b>See Core →</b></Link>
        </div>
      </section>

      <section className={styles.systemIntro} id="system">
        <p className={styles.eyebrow}>THE WORLD IS DESIGNED TO PULL YOU AWAY</p>
        <div>
          <h2>Your family should not get whatever the <em>algorithm</em> leaves behind.</h2>
          <p>Phones, feeds, AI tools, and work keep pulling your attention away. Iron Compass gives you concrete ways to choose what gets your attention, come home without carrying the whole day through the door, and protect time with the people you love. Start with one free Sunday conversation, use Focus when distraction is the main problem, and choose Core when you want the whole system.</p>
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
            <div><dt>What you get</dt><dd>The printable meeting guide immediately. No email gate, account, or new system to manage.</dd></div>
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
            <div className={styles.deliveryNote}><span>DELIVERED INSIDE</span><p>A browser-based visual Field Manual with four practical moves.</p></div>
            <details className={styles.videoReveal}>
              <summary>
                <img src="/assets/focus-manual-gamma.png" alt="Focus Protocol video preview" width="2400" height="1260" loading="lazy" decoding="async" />
                <span className={styles.videoMeta}><small>FOCUS OVERVIEW · 03:28</small><strong>Watch the Focus overview <i>→</i></strong></span>
              </summary>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Add captions only after an exact transcript is verified. */}
              <video controls playsInline preload="none" poster="/assets/focus-manual-gamma.png" aria-label="Focus Protocol overview video"><source src="/assets/focus-protocol-sales.mp4" type="video/mp4" />Your browser does not support this video.</video>
            </details>
            <p className={styles.offerAssurance}>$29 one time · Immediate access · 14-day refund window</p>
            <Link href="/focus">See Focus Protocol · $29 <b>→</b></Link>
          </article>

          <article className={styles.coreOffer}>
            <div className={styles.offerTopline}><span>IRON COMPASS CORE</span><b>$99 FOUNDING EDITION</b></div>
            <h3>Build the whole<br /><em>system.</em></h3>
            <p>Core brings the full work together: attention, pressure, home, marriage, family connection, friendship, and the practices that keep a good life from slipping away.</p>
            <div className={styles.deliveryNote}><span>DELIVERED INSIDE</span><p>Nine visual lessons, specific practices, and the Core Workbook as a companion resource.</p></div>
            <div className={styles.offerStill}>
              <img src="/assets/thermostat-gamma.png" alt="A preview of an Iron Compass Core visual lesson" width="2400" height="1260" loading="lazy" decoding="async" />
              <span>CORE LESSON PREVIEW</span>
            </div>
            <p className={styles.offerAssurance}>$99 one time · Founding-edition price · 14-day refund window</p>
            <Link href="/library#curriculum">See inside Iron Compass Core <b>→</b></Link>
          </article>
        </div>
      </section>

      <section className={styles.methodSection}>
        <p className={styles.eyebrow}>HOW THE TEACHING WORKS</p>
        <div>
          <h2>See the pattern.<br />Work the <em>practice.</em></h2>
          <p>The teaching is built to be used, not collected. Each visual lesson names a real situation, makes the pattern plain, and gives you a practice to carry into an ordinary day.</p>
        </div>
        <ul>
          <li><span>01</span>Concrete names for the moments that keep repeating.</li>
          <li><span>02</span>Clear visual lessons instead of a long lecture library.</li>
          <li><span>03</span>Practical exercises that belong in real life, not on a shelf.</li>
        </ul>
      </section>

      <section className={styles.resourceSection}>
        <div>
          <p className={styles.eyebrow}>INDEPENDENT AND HONEST ABOUT ITS LIMITS</p>
          <h2>One useful resource.<br />Not the <em>only one.</em></h2>
        </div>
        <div className={styles.resourceCopy}>
          <p>Iron Compass is practical educational work from one husband and father. It is not therapy, clinical treatment, or an accredited program. When you need research, a qualified professional, or immediate support, the resource guide points you toward established places to start.</p>
          <Link className={styles.quietDarkLink} href="/resources">Use the resource guide <span>→</span></Link>
          <a className={styles.quietDarkLink} href="https://chrisavera.substack.com" target="_blank" rel="me noreferrer">Follow Chris’s Field Notes on Substack <span>↗</span></a>
        </div>
      </section>

      <section id="founder" className={styles.founderSection}>
        <figure className={styles.founderPhoto}>
          <img src="/assets/chris-founder.jpg" alt="Chris Avera outdoors near the North Carolina mountains" width="600" height="800" loading="lazy" decoding="async" />
          <figcaption>Chris Avera · Husband, father, and small-business owner</figcaption>
        </figure>
        <div>
          <p className={styles.eyebrow}>WHY I MADE THIS</p>
          <h2>I needed the work before I ever <em>shared it.</em></h2>
          <p>I’m Chris. I’m a husband, father of three, and small-business owner in the North Carolina mountains. Iron Compass began when I noticed how often I was physically home while my attention was somewhere else. I built these practices for myself first, then shaped the useful parts into tools another man could actually use.</p>
          <p className={styles.founderPersonal}>Away from work, I lift kettlebells, ride mountain-bike trails, fish, and take my Trail 125 down the roads that get quieter as they get smaller. I am still practicing this work too.</p>
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
        <nav><a href="#system">The system</a><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/field-guide">Compass Check</Link><Link href="/focus">Focus Protocol</Link><Link href="/library">Iron Compass Core</Link><Link href="/resources">Resources</Link><Link href="/about">About Chris</Link><a href="https://chrisavera.substack.com" target="_blank" rel="me noreferrer">Field Notes on Substack ↗</a><Link href="/policies">Policies</Link><a href={CONTACT_FORM} target="_blank" rel="noreferrer">Contact Chris</a></nav>
      </footer>
    </main>
  );
}
