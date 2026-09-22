import { PlainLink as Link } from "./plain-link";
import type { Metadata } from "next";
import { BrandWordmark, Footer, WeeklyGuidePreview } from "./components";
import { CORE_LESSONS } from "./course-content";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Here Supply Co. | Tools for Showing Up in Real Life",
  description: "Courses, guides, and field tools for getting your attention back and showing up for the people and life that matter.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Here Supply Co. | Tools for Showing Up in Real Life",
    description: "Courses, guides, and field tools for getting your attention back and showing up for the people and life that matter.",
    url: "/",
    siteName: "Here Supply Co.",
    type: "website",
    images: [{ url: "/assets/brand/sunday-board-hero-v1.jpg", width: 1586, height: 992, alt: "A man giving his full attention to a conversation at a coastal home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Here Supply Co. | Tools for Showing Up in Real Life",
    description: "Courses, guides, and field tools for getting your attention back and showing up for the people and life that matter.",
    images: ["/assets/brand/sunday-board-hero-v1.jpg"],
  },
};

const movements = [
  {
    number: "01",
    title: "Return",
    image: "/assets/course/photo/movement-return-v1.jpg",
    imageAlt: "A man setting down his phone before joining his family at home",
    line: "Bring your attention back before you try to fix anything else.",
    detail: "Make space to think clearly, finish the work in front of you, and come through the door without asking your family to carry the whole day with you.",
    lessons: CORE_LESSONS.filter((lesson) => lesson.movement === "RETURN"),
  },
  {
    number: "02",
    title: "Lead",
    image: "/assets/course/photo/movement-lead-v1.jpg",
    imageAlt: "A husband listening closely while his wife speaks at the kitchen table",
    line: "Bring a steadier self into a hard moment.",
    detail: "Pressure is real. The work is learning to pause, respond without making the moment worse, and repair it when you miss.",
    lessons: CORE_LESSONS.filter((lesson) => lesson.movement === "LEAD"),
  },
  {
    number: "03",
    title: "Keep",
    image: "/assets/course/photo/movement-keep-v4.jpg",
    imageAlt: "A father and daughter walking home from the ocean while talking together",
    line: "Keep the parts of life work cannot replace.",
    detail: "Protect time, friendship, marriage, family rhythms, and the ordinary parts of life that keep a whole person from slowly disappearing into work.",
    lessons: CORE_LESSONS.filter((lesson) => lesson.movement === "KEEP"),
  },
];

export default function Home() {
  return (
    <main id="main-content" className={styles.home}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Here Supply Co. home">
          <BrandWordmark />
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <a href="#start">Start here</a>
          <a href="#work">The full course</a>
          <Link href="/about">About Chris</Link>
        </nav>
        <Link className={styles.headerAction} href="/sunday-board#get-board">Start free <span>→</span></Link>
      </header>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <a href="#start">Start here</a>
        <a href="#work">The course</a>
        <Link href="/about">About</Link>
      </nav>

      {/* Full-bleed hero. The photograph states the problem rather than
          selling a reward: a father on his phone while his daughter waits
          to be watched. */}
      <section className={styles.hero}>
        <img
          className={styles.heroPhoto}
          src="/assets/course/photo/emotional-phone-at-game-v1.jpg"
          alt="A father looking at his phone while his daughter, in uniform, waits for him to watch"
          width="1586"
          height="992"
          fetchPriority="high"
          decoding="async"
        />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}><i aria-hidden="true" />When your phone is taking more than it gives</p>
            <h1>Your phone is a tool. <em>You are not.</em></h1>
            <p className={styles.lead}>Practical tools for people who are tired of being physically present while their attention is somewhere else.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/sunday-board#get-board">Start free</Link>
              <Link className={styles.quietLightLink} href="/library">See the full practice</Link>
            </div>
            <p className={styles.heroAssurance}>Free 15-minute meeting guide · Built by a real family · Opens immediately</p>
          </div>
        </div>
      </section>
      <div className={styles.heroFooter} aria-label="The Here Supply Co. approach">
        <span><b>01 · Notice</b>Name the drift before you try to fix anything else.</span>
        <span><b>02 · Reset</b>Four small moves. Three days. No renegotiation.</span>
        <span><b>03 · Show up</b>Bring a steadier self through the door every night.</span>
      </div>

      <section className={styles.orientation} aria-labelledby="orientation-title">
        <div className={styles.orientationIntro}>
          <p className={styles.eyebrow}>ONE BRAND. ONE PRACTICE.</p>
          <h2 id="orientation-title">Start free.<br />Go deeper <em>when it helps.</em></h2>
          <p>No catalog and no maze of courses. Begin with the actual Sunday meeting Chris and Rhea use. Continue into one complete course when you want the whole practice.</p>
        </div>
        <div className={styles.orientationPaths}>
          <Link href="/sunday-board"><span>01</span><strong>Sunday Board Meeting</strong><small>A free 15-minute way to see the same week, with the original Chris and Rhea video.</small><b>Watch and start free →</b></Link>
          <Link href="/library"><span>02</span><strong>All the Way Here</strong><small>Nine lessons for attention, pressure, work, relationships, and the life underneath all of it.</small><b>See the course →</b></Link>
        </div>
      </section>

      <section className={styles.homecoming} aria-labelledby="homecoming-title">
        <div>
          <p className={styles.eyebrow}>THE POINT OF THE WORK</p>
          <h2 id="homecoming-title">Less life inside a machine.<br /><em>More life with other people.</em></h2>
          <p>AI can give us more answers. It cannot look another person in the eye, get down on the floor with a child, call a friend, or decide to put the phone away. Here Supply Co. is about that return: real conversations, useful work, time outside, and the people we do not want to miss.</p>
          <Link className={styles.quietLightLink} href="/about">Why Chris built this <span>→</span></Link>
        </div>
      </section>

      <section className={styles.systemIntro} id="system">
        <p className={styles.eyebrow}>THE WORLD IS DESIGNED TO PULL YOU AWAY</p>
        <div>
          <h2>Your family should not get whatever the <em>algorithm</em> leaves behind.</h2>
          <p>Phones, feeds, AI tools, and work keep pulling your attention away. Here Supply Co. gives you practical ways to control the inputs before they control the day: choose what reaches you, create friction around what takes too much, and protect time with the people you love. It is environment design for ordinary life, not a meditation program or another test of willpower.</p>
        </div>
      </section>

      <section className={styles.missedMoment} aria-labelledby="missed-moment-title">
        <figure>
          <img src="/assets/course/photo/emotional-phone-at-game-v1.jpg" alt="A father looking at his phone while his daughter waits to share a moment at a baseball field" width="1672" height="942" loading="lazy" decoding="async" />
          <figcaption>THE MOMENT IS STILL HERE. FOR NOW.</figcaption>
        </figure>
        <div>
          <p className={styles.eyebrow}>NOT ANOTHER LECTURE ABOUT SCREENS</p>
          <h2 id="missed-moment-title">The cost is not the phone.<br />It is the moment <em>we miss.</em></h2>
          <p>A child often asks for connection through a look, a question, or a quick, Watch this. When they look up and find us looking down, the screen can feel like it matters more even when that is not what we mean. This is not a case for guilt. It is a reason to notice sooner and turn toward the person who is already there.</p>
          <Link className={styles.quietLightLink} href="/library">See the Attention Reset inside the course <span>→</span></Link>
        </div>
      </section>

      <section className={styles.lookUpSection} id="look-up" aria-labelledby="look-up-title">
        <div className={styles.lookUpStory}>
          <p className={styles.eyebrow}>LOOKING UP IS A PRACTICE</p>
          <h2 id="look-up-title">The campus looked familiar.<br />The energy <em>did not.</em></h2>
          <p>When Chris returned to Clemson, he felt the difference before he had words for it. So many students were walking with their heads down, absorbed in their phones. There was less eye contact, less awareness of the people passing by, and fewer small openings for a hello.</p>
          <p>Phones had not ruined the campus. Looking down had simply become the default. The answer is not another lecture. It is a few physical practices that make connection easier to choose.</p>
          <Link href="/resources/look-up-at-clemson">Read the full story <span>→</span></Link>
        </div>
        <ol className={styles.lookUpPractices}>
          <li><span>01</span><div><h3>Eyes first</h3><p>When someone calls your name, enters the room, or asks to show you something, put the phone down and meet their eyes before anything else.</p></div></li>
          <li><span>02</span><div><h3>Give the phone a home</h3><p>Choose one repeated moment and one visible landing place. Dinner, bedtime, a game, or the weekly meeting is enough to begin.</p></div></li>
          <li><span>03</span><div><h3>Stop before you screen</h3><p>Set navigation and audio before driving. At a crosswalk, finish looking and crossing before the phone comes back out.</p></div></li>
        </ol>
      </section>

      <section className={styles.movementSection} id="movements">
        <div className={styles.movementHeader}>
          <p className={styles.eyebrow}>INSIDE ALL THE WAY HERE</p>
          <h2>Three movements.<br />One <em>way back.</em></h2>
          <p>The work moves from what has your attention, to how you carry pressure, to the life you are building around the people you love.</p>
        </div>
        <div className={styles.movementGrid}>
          {movements.map((movement) => (
            <article key={movement.title} className={styles.movementCard}>
              <div className={styles.movementPreview}>
                <div className={styles.movementArtGrid}><figure><img src={movement.image} alt={movement.imageAlt} width="1672" height="942" loading="lazy" decoding="async" /><figcaption>{movement.number} · {movement.title.toUpperCase()}</figcaption></figure></div>
                <span>THREE REAL LESSONS</span>
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
          <WeeklyGuidePreview />
          <span>FREE PRACTICE</span>
        </div>
        <div className={styles.startCopy}>
          <p className={styles.eyebrow}>START WITH A REAL CONVERSATION</p>
          <h2>The Sunday Board <em>Meeting.</em></h2>
          <p>A printable fifteen-minute weekly conversation for two people sharing a life or household, so the calendar, money, kids, connection, and one shared priority are no longer living in two separate heads.</p>
          <dl>
            <div><dt>What it helps with</dt><dd>Connection, the calendar, money, kids, time together, and one shared win.</dd></div>
            <div><dt>What you get</dt><dd>The printable meeting guide immediately. No email gate, account, or new system to manage.</dd></div>
          </dl>
          <div className={styles.buttonRow}>
            <Link className={styles.primaryButton} href="/sunday-board">Watch Chris and Rhea + get the guide <span>→</span></Link>
            <Link className={styles.quietDarkLink} href="/library">See where the complete course goes next <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className={styles.workSection} id="work">
        <div className={styles.workHeader}>
          <p className={styles.eyebrow}>ONE COMPLETE COURSE</p>
          <h2>Come back to what is<br /><em>already here.</em></h2>
          <p>All the Way Here brings the Attention Reset and the full Return, Lead, Keep practice together in one private, self-paced experience.</p>
        </div>

        <div className={styles.offerGrid}>
          <article className={styles.coreOffer}>
            <div className={styles.offerTopline}><span>HERE SUPPLY CO.</span><b>$99 FOUNDING EDITION</b></div>
            <h3>The complete<br /><em>practice.</em></h3>
            <p>One coherent course for attention, pressure, work-to-home transitions, relationships, family connection, friendship, and the practices that keep a good life from slipping away.</p>
            <div className={styles.deliveryNote}><span>DELIVERED INSIDE</span><p>The attention reset, nine visual lessons, specific practices, and an editable companion workbook.</p></div>
            <div className={styles.offerStill}>
              <div className={styles.offerStillHeading}><span>A LOOK INSIDE</span><strong>Three movements. Nine visual lessons. One practice for real life.</strong></div>
              <div className={styles.offerArtGrid}>{movements.map((movement) => <figure key={movement.title}><img src={movement.image} alt={movement.imageAlt} width="1672" height="942" loading="lazy" decoding="async" /><figcaption><span>{movement.number}</span><strong>{movement.title}</strong></figcaption></figure>)}</div>
            </div>
            <p className={styles.offerAssurance}>$99 one time · Founding-edition price · 14-day refund window</p>
            <Link href="/library#curriculum">See inside the complete course <b>→</b></Link>
          </article>
        </div>
      </section>

      <section className={styles.methodSection}>
        <p className={styles.eyebrow}>THE ALL THE WAY HERE PRACTICE CYCLE</p>
        <div>
          <h2>A practical guide for <em>coming back.</em></h2>
          <p>AI can give you ten ideas in ten seconds. All the Way Here is valuable only if it helps you use one practice in real life with real people. The course translates durable ideas about choice, purpose, priority, relationships, and renewal into a cycle built for an ordinary week.</p>
        </div>
        <ul>
          <li><span>01</span><b>Choose</b> what deserves your attention.</li>
          <li><span>02</span><b>Enter</b> the moment on purpose.</li>
          <li><span>03</span><b>Protect</b> what matters before urgency takes over.</li>
          <li><span>04</span><b>Listen</b> before you fix, defend, or perform.</li>
          <li><span>05</span><b>Renew</b> the life underneath the work.</li>
        </ul>
      </section>

      <section className={styles.resourceSection}>
        <div>
          <p className={styles.eyebrow}>INDEPENDENT AND HONEST ABOUT ITS LIMITS</p>
          <h2>One useful resource.<br />Not the <em>only one.</em></h2>
        </div>
        <div className={styles.resourceCopy}>
          <p>Here Supply Co. makes practical educational tools shaped from lived experience and careful source work. This is not therapy, clinical treatment, or an accredited program. When you need research, a qualified professional, or immediate support, the resource guide points you toward established places to start.</p>
          <Link className={styles.quietDarkLink} href="/resources">Use the resource guide <span>→</span></Link>
          <a className={styles.quietDarkLink} href="https://chrisavera.substack.com" target="_blank" rel="me noreferrer">Read Chris on Substack <span>↗</span></a>
        </div>
      </section>

      <section id="founder" className={styles.founderSection}>
        <figure className={styles.founderPhoto}>
          <img src="/assets/chris-founder.jpg" alt="Chris Avera outdoors by the ocean in Puerto Rico" width="600" height="800" loading="lazy" decoding="async" />
          <figcaption>Chris Avera · Husband, father, and small-business owner</figcaption>
        </figure>
        <div>
          <p className={styles.eyebrow}>WHY I MADE THIS</p>
          <h2>I needed the work before I ever <em>shared it.</em></h2>
          <p>I’m Chris. I’m a husband, father of three, and small-business owner in the North Carolina mountains. Here Supply Co. grew from noticing how often I was physically home while my attention was somewhere else. I built these practices for myself first, then shaped the useful parts into tools another person could actually use.</p>
          <p className={styles.founderPersonal}>Away from work, I lift kettlebells, ride mountain-bike trails, fish, and take my Trail 125 down the roads that get quieter as they get smaller. I am still practicing this work too.</p>
          <div className={styles.founderActions}><Link className={styles.quietDarkLink} href="/about">Read Chris’s story <span>→</span></Link><Link className={styles.quietDarkLink} href="/working-session">Work with Chris <span>→</span></Link></div>
        </div>
      </section>

      <section className={styles.closing}>
        <p className={styles.eyebrow}>START WHERE LIFE IS ASKING FOR YOU</p>
        <h2>One useful way<br />to come <em>back.</em></h2>
        <p>Put the free guide on the table this week. When you want the complete practice, continue into All the Way Here.</p>
        <div><Link className={styles.primaryButton} href="/sunday-board#get-board">Get the free weekly guide <span>→</span></Link><Link href="/library">See the complete course <span>→</span></Link></div>
      </section>
      <Footer />
    </main>
  );
}
