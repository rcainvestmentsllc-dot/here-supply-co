import type { Metadata } from "next";
import { menMeta } from "../men/meta";
import { Footer, Header } from "../components";
import { MEN_CHECKOUT, MEN_OFFERS, usd } from "../men/program";
import { SUPPORT_EMAIL, siteUrl } from "../site-config";
import styles from "../men/men.module.css";

/**
 * The gift path: a woman (or anyone) buying for the man in her life. This is
 * where the couples side hands off to the men's side, so the two paths never
 * compete for the same buyer.
 */
const title = "Give It to Him | Here Supply Co.";
const description =
  "For the man who carries a lot. Give him Carry It Well, a nine week course from Chris, or send him a free call.";

export const metadata: Metadata = menMeta({ title, description, path: "/gift", image: { url: "/assets/men/mens-edition-kit.jpg", width: 1672, height: 941, alt: "The Carry It Well course book and printed sheets" } });

const { course } = MEN_OFFERS;

const callNote = `mailto:?subject=${encodeURIComponent("Thought of you")}&body=${encodeURIComponent(
  `You carry a lot for us, and I came across something that is just for you. It is a free twenty minute call with a guy named Chris who coaches men who run a business, a family, or both. No pressure either way.\n\n${siteUrl("/men/apply")}`,
)}`;

const coachingGift = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Coaching as a gift")}`;

export default function GiftPage() {
  return (
    <main id="main-content" className={styles.page}>
      <Header action={{ href: "#course", label: "See the gift options" }} />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.label}>Buying for him</span>
          <h1>
            For the man who <em>carries a lot.</em>
          </h1>
          <p className={styles.heroLede}>
            The husband, partner, dad, or brother who is always on: the business, the bills, the
            phone that never stops. Here are two ways to give him a little room to set it down.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href="#course">
              See the gift options <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <img
            src="/assets/men/course/honest-map.jpg"
            alt="A man on the couch writing in a notebook"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section className={styles.section} id="course">
        <div className={styles.sectionHead}>
          <span className={`${styles.label} ${styles.labelRust}`}>Give him the course</span>
          <h2>
            Carry It <em>Well.</em>
          </h2>
          <p>
            Half a day alone to get his head straight, then nine lessons he can read
            online and a course book he can write in. Every practice is shown at home and at
            work, so it fits the way he actually lives.
          </p>
        </div>
        <figure className={styles.kitShot}>
          <img src="/assets/men/mens-edition-kit.jpg" alt="The Carry It Well course book and printed sheets fanned out on a table" width={1672} height={941} loading="lazy" />
          <figcaption>The actual course book and sheets he gets.</figcaption>
        </figure>
        <div className={styles.split}>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>
              {usd(course.price)} · one time · 14 day refund window
            </span>
            <h3>How the gift works</h3>
            <ol>
              <li>You check out with your own email.</li>
              <li>A welcome email right after your receipt has a one tap link to the course and its password.</li>
              <li>Forward it to him, or print the course book and hand it to him. The weekly lesson emails come to you, so pass those along too.</li>
            </ol>
            <div style={{ marginTop: 20 }}>
              {MEN_CHECKOUT ? (
                <a className={styles.primary} href={MEN_CHECKOUT}>
                  Give the course · {usd(course.price)} <span aria-hidden="true">→</span>
                </a>
              ) : (
                <span className={styles.secondary} aria-disabled="true">Checkout opens soon</span>
              )}
            </div>
          </article>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>Free</span>
            <h3>Send him a free call</h3>
            <p>
              Twenty minutes with Chris to talk about what he is carrying and whether coaching would
              help. No pitch if it is not a fit. This opens a short note you can change before you
              send it.
            </p>
            <div style={{ marginTop: 20 }}>
              <a className={styles.primary} href={callNote}>
                Write him a note <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <span className={styles.label}>How to give it</span>
        <p className={styles.quote} style={{ marginTop: 20 }}>
          Give it as something he gets to do for himself. Something like: you carry a lot for us,
          and this one is just for you.
        </p>
      </section>

      <section className={styles.close}>
        <div>
          <h2>Want to give him coaching?</h2>
          <p>
            {MEN_OFFERS.intensive.name} is twelve weeks of calls with Chris. Coaching only works
            when he wants it, so email first and we will set it up together.
          </p>
        </div>
        <a className={styles.primary} href={coachingGift}>
          Email Chris <span aria-hidden="true">→</span>
        </a>
      </section>

      <Footer />
    </main>
  );
}
