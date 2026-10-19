import type { Metadata } from "next";
import { menMeta } from "../meta";
import { PlainLink as Link } from "../../plain-link";
import { Footer, Header } from "../../components";
import { EmailSignup } from "../../email-signup";
import { MEN_HEADER_ACTION, MEN_OFFERS, usd } from "../program";
import styles from "../men.module.css";

/**
 * The men's free front door: one practice, one printable card, no email
 * required. The optional signup joins the men's list (never the couples list)
 * and starts a three email series that ends at the course and the free call.
 */
const title = "The Driveway Card: Two Minutes Before You Go In | Here Supply Co.";
const description =
  "A free printable card for men who bring work home with them. Two minutes in the driveway so the people inside get your attention and the workday stays in the truck.";
const CARD = "/downloads/driveway-card.pdf";

export const metadata: Metadata = menMeta({ title, description, path: "/men/driveway", image: { url: "/assets/men/driveway-card-shot.jpg", width: 1672, height: 941, alt: "The printed Driveway Card, a sheet of four and two cut cards" } });

const STEPS = [
  ["Stop", "Engine off. Phone silent and out of your hand."],
  ["Name it", "Say what followed you home. Decide what belongs to tomorrow."],
  ["Breathe", "Three slow breaths, longer on the way out."],
  ["Choose", "Who do you want to be for the first ten seconds inside?"],
] as const;

export default function DrivewayPage() {
  return (
    <main id="main-content" className={styles.page}>
      <Header action={MEN_HEADER_ACTION} path="men" />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.label}>Free · Print it tonight</span>
          <h1>
            Two minutes <em>before you go in.</em>
          </h1>
          <p className={styles.heroLede}>
            Most men walk in the door still carrying the job, the client, the number that did not
            close. The people inside get whatever is left. The Driveway Card is a two minute hand
            off between work and home that lives in your glovebox.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primary} href={CARD} download="driveway-card.pdf">
              Download the card <span aria-hidden="true">↓</span>
            </a>
            <a className={styles.textLink} href="#signup">
              Or have it emailed to you
            </a>
          </div>
          <p className={styles.heroNote}>No email needed to download. Four cards to a page, one for each vehicle.</p>
        </div>
        <div className={styles.heroMedia}>
          <img
            src="/assets/men/driveway-card-shot.jpg"
            alt="The printed Driveway Card: a sheet of four cards and two cut out cards"
            width={1672}
            height={941}
          />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionHead}>
          <span className={styles.label}>How it works</span>
          <h2>
            Park. Engine off. <em>Two minutes.</em>
          </h2>
          <p>
            Do it every day for a week before you decide whether it works. Tell whoever is waiting
            inside what it is, once, so two minutes in the truck does not look like avoidance.
          </p>
        </div>
        <div className={`${styles.rooms} ${styles.roomsFour}`}>
          {STEPS.map(([name, text], i) => (
            <article className={styles.room} key={name}>
              <span className={styles.roomTag}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>If you do not drive home</span>
            <h3>The doorway matters more than the car</h3>
            <p>
              Work from home? Close the laptop, write the next work thing down, walk to the end of the
              street, and come back in. Same four steps, different door.
            </p>
            <p>
              It works before a hard meeting too. Two minutes, name what you are carrying, and choose
              how you walk in.
            </p>
          </article>
          <article className={styles.card} id="signup">
            <EmailSignup
              source="men_driveway"
              next="/men/driveway"
              list="men"
              title="Want it in your inbox?"
              blurb="I will send the card, then two short notes over the next week: one on handling pressure at home and at work, one on what comes next if you want more. That is the whole series."
              done="The card is on its way. If it is not in your inbox in a few minutes, check promotions or spam."
            />
          </article>
        </div>
      </section>

      <section className={styles.close}>
        <div>
          <h2>Snapping when you walk in?</h2>
          <p>
            Lesson three of Carry It Well goes after the short fuse itself:
            your warning signs, a sixty second reset, and how to repair it when you miss. Nine
            lessons, one a week, each shown at home and at work.{" "}
            {usd(MEN_OFFERS.course.price)}, one time.
          </p>
        </div>
        <Link className={styles.primary} href="/men/course">
          See the course <span aria-hidden="true">→</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
