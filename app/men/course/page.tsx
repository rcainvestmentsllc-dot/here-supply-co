import { MEN_HEADER_ACTION } from "../program";
import type { Metadata } from "next";
import { menMeta } from "../meta";
import { PlainLink as Link } from "../../plain-link";
import { Footer, Header } from "../../components";
import { MEN_LESSONS, MEN_MOVEMENTS, MEN_SOLO } from "../men-course";
import { MEN_CHECKOUT, MEN_OFFERS, usd } from "../program";
import styles from "../men.module.css";

const title = "Carry It Well | A Course for Men Who Carry a Lot | Here Supply Co.";
const description =
  "Nine lessons for men who lead, each built on something men actually say out loud. Every practice shown at home and at work, with a course book and ten sheets to print.";

export const metadata: Metadata = menMeta({ title, description, path: "/men/course", image: { url: "/assets/men/mens-edition-kit.jpg", width: 1672, height: 941, alt: "The Carry It Well course book and printed sheets" } });

const { course } = MEN_OFFERS;
const ready = Boolean(MEN_CHECKOUT);

function BuyButton() {
  if (!ready) {
    return <span className={styles.secondary} aria-disabled="true">Checkout opens soon</span>;
  }
  return (
    <a className={styles.primary} href={MEN_CHECKOUT}>
      Get Carry It Well · {usd(course.price)} <span aria-hidden="true">→</span>
    </a>
  );
}

export default function MenCoursePage() {
  return (
    <main id="main-content" className={styles.page}>
      <Header action={MEN_HEADER_ACTION} path="men" />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.label}>Carry It Well · {course.line}</span>
          <h1>
            Nine things men say. <em>What to do about each one.</em>
          </h1>
          <p className={styles.heroLede}>
            Half a day alone to start, then one lesson a week: how your life actually stands, the
            nightly drift, the short fuse, the load, the work that owns you, the friends you lost
            track of, your father, and your kids. Every practice is shown at home and at work.
          </p>
          <div className={styles.heroActions}>
            <BuyButton />
            <a className={styles.textLink} href="#inside">See what is inside</a>
          </div>
          <p className={styles.heroNote}>
            {ready
              ? `${usd(course.price)}. One time purchase. 14 day refund window.`
              : "The checkout is not open yet. Coaching calls are."}
          </p>
        </div>
        <div className={styles.heroMedia}>
          <img
            src={MEN_SOLO.photo.src}
            alt={MEN_SOLO.photo.alt}
            width={960}
            height={639}
          />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionHead}>
          <span className={styles.label}>It starts with {MEN_SOLO.title}</span>
          <h2>
            Half a day alone, <em>before you change anything.</em>
          </h2>
          <p>
            A trail, a river, or a bench with a long view. The phone stays in the truck. You bring a
            notebook and answer three questions, starting with the one most men have never written
            down.
          </p>
        </div>
        <p className={styles.quote}>&ldquo;{MEN_SOLO.questions[0]}&rdquo;</p>
      </section>

      <section className={styles.section} id="inside">
        <div className={styles.sectionHead}>
          <span className={`${styles.label} ${styles.labelRust}`}>The complete course</span>
          <h2>See it. Carry it. <em>Build it.</em></h2>
          <p>Three parts, nine lessons, one practice each. Read one a week and try it in a real week before you move on.</p>
        </div>
        {MEN_MOVEMENTS.filter((m) => m.key !== "START").map((movement) => (
          <div key={movement.key} style={{ marginBottom: 40 }}>
            <p style={{ marginBottom: 16 }}>
              <span className={`${styles.label} ${styles.labelRust}`}>{movement.number} · {movement.name}</span>
              <span style={{ display: "block", marginTop: 6, color: "var(--hsc-copy)", fontSize: 16 }}>{movement.line}</span>
            </p>
            <div className={styles.lessonGrid}>
              {MEN_LESSONS.filter((l) => l.movement === movement.key).map((lesson) => (
                <article key={lesson.slug} className={styles.lessonCard}>
                  <span>LESSON {lesson.number}</span>
                  <h3>&ldquo;{lesson.says}&rdquo;</h3>
                  <p><b>{lesson.title}.</b> {lesson.summary}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={`${styles.section} ${styles.sectionSand}`}>
        <figure className={styles.kitShot}>
          <img src="/assets/men/mens-edition-kit.jpg" alt="The Carry It Well course book and printed sheets fanned out on a table" width={1672} height={941} loading="lazy" />
          <figcaption>The actual course book and sheets. Print them once and put each one where the moment happens.</figcaption>
        </figure>
        <div className={styles.split}>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>What you get</span>
            <h3>Everything, yours to keep</h3>
            <ul>
              <li>The Solo: half a day alone with a notebook, and a sheet to take with you</li>
              <li>Nine full online lessons, each with a home example, a work example, and the research behind it</li>
              <li>A course book with two pages to write on after every lesson</li>
              <li>Ten printable sheets, for the wallet, the desk, the fridge, and the mirror</li>
              <li>The question I would ask you about each lesson on a coaching call</li>
              <li>The Focus Protocol, a three day phone reset, as a tool for the nights the phone wins</li>
            </ul>
          </article>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>Who it is for</span>
            <h3>Men carrying a lot</h3>
            <ul>
              <li>Married, single, divorced, or somewhere in between. Every lesson has an honest version if it does not fit your life.</li>
              <li>Owners, managers, tradesmen, salesmen, anyone whose phone is also his job.</li>
              <li>Men who want to change something without becoming a project.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.close}>
        <div>
          <h2>Want someone walking through it with you?</h2>
          <p>
            {MEN_OFFERS.intensive.name} is this course taken one lesson a week, with a call with me
            every week. The course is included.
          </p>
        </div>
        <Link className={styles.primary} href="/men/coaching#intensive">
          See the Intensive <span aria-hidden="true">→</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
