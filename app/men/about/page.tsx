import type { Metadata } from "next";
import { menMeta } from "../meta";
import { PlainLink as Link } from "../../plain-link";
import { Footer, Header } from "../../components";
import { MEN_HEADER_ACTION } from "../program";
import styles from "../men.module.css";

/**
 * Who Chris is as a coach. Built from the facts on the main About page, told
 * for a man deciding whether to trust him with a call.
 */
const title = "About Chris Avera | Coaching for Men Who Lead";
const description =
  "Business owner, father of three, former Outward Bound field instructor. Why Chris Avera coaches men who lead, and what he will and will not do.";

export const metadata: Metadata = menMeta({
  title,
  description,
  path: "/men/about",
  image: { url: "/assets/chris-founder-sunset.jpg", width: 627, height: 627, alt: "Chris Avera" },
});

export default function MenAbout() {
  return (
    <main id="main-content" className={styles.page}>
      <Header action={MEN_HEADER_ACTION} path="men" />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.label}>About Chris</span>
          <h1>
            A business owner who <em>still does the work.</em>
          </h1>
          <p className={styles.heroLede}>
            I run a small business in Brevard, North Carolina, and I am raising three kids. I coach
            men who are carrying a lot at work and at home and want to show up better in both.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primary} href="/men/apply">
              Book a free call <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <img src="/assets/chris-founder-sunset.jpg" alt="Chris Avera at sunset by the ocean" width={627} height={627} style={{ objectPosition: "center 30%" }} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>Where this comes from</span>
            <h3>Canoes first, then clients</h3>
            <p>
              After Clemson I worked as an Outward Bound field instructor, leading twenty and thirty
              day canoe trips. I watched people grow when they had a real challenge, clear
              expectations, room to make their own calls, and someone steady beside them. People
              change by living something more than by hearing it explained. That is still how I coach.
            </p>
            <p>
              Later, real estate and building my company, Listings in Motion, put me next to people
              making big decisions under pressure. Good leadership turned out to be practical: listen
              carefully, make the next step clear, and do not add noise.
            </p>
          </article>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>Why I coach men</span>
            <h3>I drifted for a long time</h3>
            <p>
              For about twelve years I was in the house but not really there, always half a thought
              somewhere else, usually behind a screen. Coming back from that took small practices I
              could use on an ordinary Tuesday. Those practices became the course, and
              coaching is how I help other men use them.
            </p>
            <p>
              When I am not working I am usually lifting kettlebells, riding a mountain bike trail,
              fishing, or taking my Trail 125 somewhere the road gets smaller.
            </p>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionHead}>
          <span className={styles.label}>Straight answers</span>
          <h2>
            What I will do, and <em>what I will not.</em>
          </h2>
        </div>
        <div className={styles.rooms}>
          <article className={styles.room}>
            <span className={styles.roomTag}>ON A CALL</span>
            <h3>Coach what is real</h3>
            <p>We work on the situation you bring, the practice for the week, and the one thing you commit to. I will ask the question underneath the question.</p>
          </article>
          <article className={styles.room}>
            <span className={styles.roomTag}>MY LIMITS</span>
            <h3>Not a therapist</h3>
            <p>I do not have a clinical title and I will not pretend to. If something needs counseling or medical care, I will tell you plainly and help you find the right person.</p>
          </article>
          <article className={styles.room}>
            <span className={styles.roomTag}>YOUR STORY</span>
            <h3>Stays between us</h3>
            <p>I never share your name or anything you tell me without your written permission. The coaching agreement spells out the few legal exceptions.</p>
          </article>
        </div>
      </section>

      <section className={styles.close}>
        <div>
          <h2>Start with a free twenty minute call.</h2>
          <p>Tell me a little about where you are. If coaching is not the right fit, I will say so and point you to something that is.</p>
        </div>
        <Link className={styles.primary} href="/men/apply">
          Book a free call <span aria-hidden="true">→</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
