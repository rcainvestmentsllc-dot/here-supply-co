import { PlainLink as Link } from "./plain-link";
import type { Metadata } from "next";
import { BrandWordmark, Footer, WeeklyGuidePreview } from "./components";
import { CHECKOUT } from "./data";
import { CORE_LESSONS } from "./course-content";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Here Supply Co. | Attention Tools for Couples",
  description: "A free weekly meeting guide and one complete course for two people who are tired of being in the same room and somewhere else.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Here Supply Co. | Attention Tools for Couples",
    description: "A free weekly meeting guide and one complete course for two people who are tired of being in the same room and somewhere else.",
    url: "/",
    siteName: "Here Supply Co.",
    type: "website",
    images: [{ url: "/assets/brand/sunday-board-hero-v1.jpg", width: 1586, height: 992, alt: "A man giving his full attention to a conversation at a coastal home" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Here Supply Co. | Attention Tools for Couples",
    description: "A free weekly meeting guide and one complete course for two people who are tired of being in the same room and somewhere else.",
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
          <a href="#offer">The course</a>
          <Link href="/about">About Chris</Link>
        </nav>
        <a className={styles.headerAction} href="#offer">Get the course <span>→</span></a>
      </header>

      <nav className={styles.mobileNav} aria-label="Mobile navigation">
        <a href="#start">Start here</a>
        <a href="#offer">The course</a>
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
            <p className={styles.eyebrow}><i aria-hidden="true" />For two people who keep missing each other</p>
            <h1>Your phone is a tool. <em>You are not.</em></h1>
            <p className={styles.lead}>Practical tools for couples who are tired of being in the same room and somewhere else. Kids or no kids. One of you can start.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/sunday-board#get-board">Start free</Link>
              <Link className={styles.quietLightLink} href="/library">See the full practice</Link>
            </div>
            <p className={styles.heroAssurance}>Free 15-minute weekly guide · Built by a real couple · Opens immediately</p>
          </div>
        </div>
      </section>
      <div className={styles.heroFooter} aria-label="The Here Supply Co. approach">
        <span><b>01 · Notice</b>Name the drift before you try to fix anything else.</span>
        <span><b>02 · Reset</b>Four small moves. Three days. No renegotiation.</span>
        <span><b>03 · Show up</b>Bring a steadier self through the door every night.</span>
      </div>
      <section className={styles.missedMoment} aria-labelledby="missed-moment-title">
        <figure>
          <img src="/assets/course/photo/lesson-1-3-driveway-v1.jpg" alt="A parent sitting in the car in the driveway, the lit kitchen window just ahead" width="1672" height="942" loading="lazy" decoding="async" />
          <figcaption>TWO MINUTES BEFORE YOU WALK IN</figcaption>
        </figure>
        <div>
          <p className={styles.eyebrow}>NOT ANOTHER LECTURE ABOUT SCREENS</p>
          <h2 id="missed-moment-title">The cost is not the phone.<br />It is the moment <em>you miss.</em></h2>
          <p>A child asks for your attention out loud. Watch this, or just your name until you answer. An adult asks once, quietly, and then stops asking. A story about their day that trails off. Something read aloud that you half hear. Either way the screen ends up looking like it mattered more, which is never what anyone meant. This is not a case for guilt. It is a reason to notice sooner and turn toward the person who is already in the room.</p>
          <Link className={styles.quietLightLink} href="#offer">See what the practice actually is <span>→</span></Link>
        </div>
      </section>
      <section id="founder" className={styles.founderSection}>
        <figure className={styles.founderPhoto}>
          <img src="/assets/chris-founder.jpg" alt="Chris Avera outdoors by the ocean in Puerto Rico" width="600" height="800" loading="lazy" decoding="async" />
          <figcaption>Chris Avera · Husband, father, and small-business owner</figcaption>
        </figure>
        <div>
          <p className={styles.eyebrow}>WHO IS TELLING YOU THIS</p>
          <h2>I needed this before I ever <em>sold it.</em></h2>
          <p>I’m Chris. Husband, father of three, small business owner in the North Carolina mountains. Here Supply Co. came out of noticing how often I was home and not actually there. I built these practices for my own family first and then shaped the parts that held up into something another couple could use.</p><p>Anyone can generate a nice looking course now. What nobody can copy is a real family actually running the thing, on camera, with their own name on it. That is the only reason to take this from me instead of from a search result, so you will find me and my wife Rhea in it rather than a stock photo of a calm couple.</p>
          <p className={styles.founderPersonal}>Away from work, I lift kettlebells, ride mountain-bike trails, fish, and take my Trail 125 down the roads that get quieter as they get smaller. I am still practicing this work too.</p>
          <div className={styles.founderActions}><Link className={styles.quietDarkLink} href="/sunday-board#watch-together">Watch us actually do it <span>→</span></Link><Link className={styles.quietDarkLink} href="/about">Read the whole story <span>→</span></Link><Link className={styles.quietDarkLink} href="/working-session">Ask me a question <span>→</span></Link></div>
        </div>
      </section>
      <section className={styles.systemIntro} id="system">
        <p className={styles.eyebrow}>THE WORLD IS DESIGNED TO PULL YOU AWAY</p>
        <div>
          <h2>The people you live with should not get whatever the <em>algorithm</em> leaves behind.</h2>
          <p>Phones, feeds, AI tools, and work keep pulling your attention away, and the person across from you is competing with all of it. Here Supply Co. gives you practical ways to control the inputs before they control the day: choose what reaches you, create friction around what takes too much, and protect time with the people you love. It is environment design for ordinary life, not a meditation program or another test of willpower.</p>
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
            <div><dt>What you get</dt><dd>The printable meeting guide, sent to your inbox so you can find it again. No account and no new system to manage.</dd></div>
          </dl>
          <div className={styles.buttonRow}>
            <Link className={styles.primaryButton} href="/sunday-board">Watch Chris and Rhea + get the guide <span>→</span></Link>
            <Link className={styles.quietDarkLink} href="#offer">Or see the complete course <span>→</span></Link>
          </div>
        </div>
      </section>
      <section className={styles.movementSection} id="movements">
        <div className={styles.movementHeader}>
          <p className={styles.eyebrow}>INSIDE ALL THE WAY HERE</p>
          <h2>Three movements.<br />One <em>way back.</em></h2>
          <p>The work moves from what has your attention, to how you carry pressure into a room, to the life the two of you are actually building.</p>
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
      <section className={styles.workSection} id="offer">
        <div className={styles.workHeader}>
          <p className={styles.eyebrow}>ONE COMPLETE COURSE</p>
          <h2>Come back to what is<br /><em>already here.</em></h2>
          <p>All the Way Here opens with the Attention Reset, three days of getting the phone out of the way, then moves through nine lessons across Return, Lead and Keep. One of you can start it alone. It works better with both.</p>
        </div>

        <div className={styles.offerGrid}>
          <article className={styles.coreOffer}>
            <div className={styles.offerTopline}><span>HERE SUPPLY CO.</span><b>$99 FOUNDING EDITION</b></div>
            <h3>The complete<br /><em>practice.</em></h3>
            <p>One course for attention, pressure, the walk from work to home, your marriage, your kids if you have them, friendship, and the parts of a good life that slip away quietly while nobody is looking.</p>
            <div className={styles.deliveryNote}><span>DELIVERED INSIDE</span><p>The three day Attention Reset, nine visual lessons, one practice each, and an editable companion workbook. Eight of the nine work whether or not you have kids.</p></div>
            <div className={styles.offerStill}>
              <div className={styles.offerStillHeading}><span>A LOOK INSIDE</span><strong>Three movements. Nine visual lessons. One practice for real life.</strong></div>
              <div className={styles.offerArtGrid}>{movements.map((movement) => <figure key={movement.title}><img src={movement.image} alt={movement.imageAlt} width="1672" height="942" loading="lazy" decoding="async" /><figcaption><span>{movement.number}</span><strong>{movement.title}</strong></figcaption></figure>)}</div>
            </div>
            <p className={styles.offerAssurance}>$99 one time · Founding-edition price · 14-day refund window</p>
            <a className={styles.buyButton} href={CHECKOUT.core}>Get All the Way Here <b>$99</b></a>
            <p className={styles.afterPay}>
              After you pay, the confirmation page and your receipt email give you the private course
              link. Save it or bookmark it so you can return whenever you need it.
            </p>
          </article>
        </div>
      </section>
      <section className={styles.closing}>
        <p className={styles.eyebrow}>START WHERE LIFE IS ASKING FOR YOU</p>
        <h2>One useful way<br />to come <em>back.</em></h2>
        <p>The three day Attention Reset, nine lessons, the workbook, and the field card. One payment, yours to keep, with 14 days to change your mind.</p>
        <div><a className={styles.primaryButton} href={CHECKOUT.core}>Get All the Way Here · $99 <span>→</span></a><Link href="/sunday-board#get-board">Or start with the free guide <span>→</span></Link></div>
        <p className={styles.foundingNote}>The first Founding Circle is being invited personally. Start with the free Sunday Board Meeting today.</p>
      </section>
      <Footer />
    </main>
  );
}