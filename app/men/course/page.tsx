import { MEN_HEADER_ACTION } from "../program";
import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { Footer, Header } from "../../components";
import { MEN_LESSONS, MEN_MOVEMENTS, MEN_RESET_DECLARATION } from "../men-course";
import { MEN_CHECKOUT, MEN_OFFERS, usd } from "../program";
import styles from "../men.module.css";

const title = "All the Way Here, Men's Edition | Here Supply Co.";
const description =
  "A three day phone reset and nine short lessons for men who lead. Every practice shown at home and at work. A course book and sheets to print.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/men/course" },
  openGraph: { title, description, url: "/men/course", images: [{ url: "/assets/men/mens-edition-kit.jpg", alt: "The Men's Edition course book and printed sheets" }] },
};

const { course } = MEN_OFFERS;
const ready = Boolean(MEN_CHECKOUT);

function BuyButton() {
  if (!ready) {
    return <span className={styles.secondary} aria-disabled="true">Checkout opens soon</span>;
  }
  return (
    <a className={styles.primary} href={MEN_CHECKOUT}>
      Get the course · {usd(course.foundingPrice)} <span aria-hidden="true">→</span>
    </a>
  );
}

export default function MenCoursePage() {
  return (
    <main id="main-content" className={styles.page}>
      <Header action={MEN_HEADER_ACTION} />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.label}>All the Way Here · Men&rsquo;s Edition</span>
          <h1>
            Get your attention back. <em>Then lead with it.</em>
          </h1>
          <p className={styles.heroLede}>
            A three day reset to get the phone out of the way, then nine short lessons on how you
            run your day, get home from work, handle pressure, show up for your family, and keep a
            life of your own. Every practice is shown at home and at work.
          </p>
          <div className={styles.heroActions}>
            <BuyButton />
            <a className={styles.textLink} href="#inside">See what is inside</a>
          </div>
          <p className={styles.heroNote}>
            {ready
              ? `${usd(course.foundingPrice)} for the first ${course.foundingSeats} men, then ${usd(course.price)}. One time purchase. 14 day refund window.`
              : "The checkout is not open yet. Coaching calls are."}
          </p>
        </div>
        <div className={styles.heroMedia}>
          <img
            src="/assets/course/photo/lesson-3-3-mission-debrief-v1.jpg"
            alt="A man writing in a notebook on the porch while his family gathers inside"
            width={1672}
            height={941}
          />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <span className={styles.label}>It starts with the Focus Protocol</span>
        <p className={styles.quote} style={{ marginTop: 20 }}>{MEN_RESET_DECLARATION}</p>
        <span className={styles.quoteCite}>The Focus Protocol declaration, read out loud on day one</span>
      </section>

      <section className={styles.section} id="inside">
        <div className={styles.sectionHead}>
          <span className={`${styles.label} ${styles.labelRust}`}>The complete course</span>
          <h2>Return. Lead. <em>Keep.</em></h2>
          <p>Three parts, nine lessons, one practice each. Read one a week and try it in a real week before you move on.</p>
        </div>
        {MEN_MOVEMENTS.map((movement) => (
          <div key={movement.key} style={{ marginBottom: 40 }}>
            <p style={{ marginBottom: 16 }}>
              <span className={`${styles.label} ${styles.labelRust}`}>{movement.number} · {movement.name}</span>
              <span style={{ display: "block", marginTop: 6, color: "var(--hsc-copy)", fontSize: 16 }}>{movement.line}</span>
            </p>
            <div className={styles.lessonGrid}>
              {MEN_LESSONS.filter((l) => l.movement === movement.key).map((lesson) => (
                <article key={lesson.slug} className={styles.lessonCard}>
                  <span>LESSON {lesson.number}</span>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.summary}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={`${styles.section} ${styles.sectionSand}`}>
        <figure className={styles.kitShot}>
          <img src="/assets/men/mens-edition-kit.jpg" alt="The Men's Edition course book and printed sheets fanned out on a table" width={1672} height={941} loading="lazy" />
          <figcaption>The actual course book and sheets. Print them once and put each one where the moment happens.</figcaption>
        </figure>
        <div className={styles.split}>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>What you get</span>
            <h3>Everything, yours to keep</h3>
            <ul>
              <li>The 72 hour Focus Protocol, with what each stretch of the three days feels like</li>
              <li>Nine short online lessons, each with a home example and a work example</li>
              <li>A course book to print and write in</li>
              <li>The Resource Pack: one sheet per lesson for the glovebox, the desk, and the nightstand</li>
              <li>The question I would ask you about each lesson on a coaching call</li>
            </ul>
          </article>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>Who it is for</span>
            <h3>Men carrying a lot</h3>
            <ul>
              <li>Married, single, divorced, or somewhere in between. Two lessons have a version if you have no kids at home or no partner right now.</li>
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
            The {MEN_OFFERS.intensive.name} is this course, one lesson a week, with a call every week
            with me. The course is included.
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
