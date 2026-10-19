import { MEN_HEADER_ACTION } from "../program";
import type { Metadata } from "next";
import { menMeta } from "../meta";
import { PlainLink as Link } from "../../plain-link";
import { Footer, Header } from "../../components";
import { INTENSIVE_WEEKS, MEN_OFFERS, REFER_OUT, usd } from "../program";
import styles from "../men.module.css";
import { COACHING_TERMS } from "../terms";

const title = "Coaching for Men Who Lead | Here Supply Co.";
const description =
  "One on one coaching with Chris Avera for men who lead a family, a team, or a company. A 90 Day Intensive, then ongoing coaching month to month, with plain terms up front.";

export const metadata: Metadata = menMeta({ title, description, path: "/men/coaching", image: { url: "/assets/men/course/council.jpg", width: 960, height: 640, alt: "Three men talking beside a pickup after a ride" } });

const { intensive, ongoing, table } = MEN_OFFERS;

export default function MenCoaching() {
  return (
    <main id="main-content" className={styles.page}>
      <Header action={MEN_HEADER_ACTION} path="men" />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.label}>Coaching with Chris</span>
          <h1>
            Someone in your corner who <em>asks the hard question.</em>
          </h1>
          <p className={styles.heroLede}>
            The course gives you the practices. Coaching is for the part after that: doing them on a
            Tuesday night when you are tired and the phone is buzzing. Short calls, a clear plan, and
            someone who notices when you drift.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primary} href="/men/apply">
              Book a free call <span aria-hidden="true">→</span>
            </Link>
            <a className={styles.textLink} href="#intensive">See the twelve weeks</a>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <img
            src="/assets/men/course/council.jpg"
            alt="Two men sitting side by side on a bench in the woods"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section className={styles.section} id="intensive">
        <div className={styles.sectionHead}>
          <span className={`${styles.label} ${styles.labelRust}`}>{intensive.name} · {usd(intensive.price)}</span>
          <h2>
            Twelve weeks, one practice at a time, <em>with a call every week.</em>
          </h2>
          <p>
            The Intensive is Carry It Well walked through with me. Each week you get a
            {" "}{intensive.callMinutes} minute call, one lesson and one practice to use at home and
            at work, and a short check in every Friday that I read before our next call. Pay in
            full, or in three monthly payments of {usd(intensive.installments.amount)}
            ({usd(intensive.installments.amount * intensive.installments.count)} total).
          </p>
          <p>
            It includes the course and the printed course book, and three months of the Waking Up
            meditation app as a gift from me for the quiet minutes in week seven. If your wife
            wants in, she joins one or two of the calls, and the two of you get the couples course
            too.
          </p>
        </div>
        <figure className={styles.kitShot}>
          <img src="/assets/men/mens-edition-kit.jpg" alt="The Carry It Well course book and printed sheets fanned out on a table" width={1672} height={941} loading="lazy" />
          <figcaption>Included: the Carry It Well course book and every sheet. We work from these each week.</figcaption>
        </figure>
        <ol className={styles.weeks}>
          {INTENSIVE_WEEKS.map((w) => (
            <li key={w.week} className={styles.week}>
              <span className={styles.weekNum}>{String(w.week).padStart(2, "0")}</span>
              <span className={styles.weekPart}>{w.part}</span>
              <h3>{w.title}</h3>
              <p>{w.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${styles.section} ${styles.sectionSand}`} id="ongoing">
        <div className={styles.split}>
          <div className={styles.sectionHead} style={{ marginBottom: 0 }}>
            <span className={`${styles.label} ${styles.labelRust}`}>{ongoing.name} · {usd(ongoing.price)} a month</span>
            <h2>
              After the twelve weeks, <em>keep going.</em>
            </h2>
            <p>
              For men who finished the Intensive and want someone holding the plan with them. Whatever is real that month: a business decision,
              a hard conversation at home, a son pulling away, an old habit drifting back.
            </p>
          </div>
          <div className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>Every month</span>
            <h3>The rhythm</h3>
            <ol>
              <li><b>Call one, week one.</b> What is coming this month and the one thing that matters most. {ongoing.callMinutes} minutes.</li>
              <li><b>Friday check ins.</b> Three questions on a short form, every week.</li>
              <li><b>Call two, week three.</b> What happened, what got in the way, the next move.</li>
              <li><b>Weekday access.</b> A text or voice memo for a quick question or a win. I reply within one business day.</li>
              <li><b>Once a quarter.</b> One call becomes a sixty minute planning call that resets your goals at home, at work, and for yourself.</li>
            </ol>
            <p style={{ marginTop: 14 }}>
              Six month first agreement, then month to month with thirty days’ notice. Pay for the
              year and it is {usd(ongoing.yearPrice)} instead of {usd(ongoing.price * 12)}.
            </p>
          </div>
        </div>
      </section>

      {table.open && (
      <section className={`${styles.section} ${styles.sectionDark}`} id="table">
        <div className={styles.split}>
          <div className={styles.sectionHead} style={{ marginBottom: 0 }}>
            <span className={styles.label}>{table.name} · {usd(table.price)} a month</span>
            <h2>
              One call a week with men <em>working the same practices.</em>
            </h2>
            <p>
              A {table.callMinutes} minute video call, same day and time every week, for up to
              {" "}{table.maxMen} men. You learn as much from watching another man work through his
              situation as from working through your own. Month to month, cancel any time. It
              starts once {table.startsAt} men want it.
            </p>
          </div>
          <div className={styles.card}>
            <span className={styles.label}>Every week</span>
            <h3>The format</h3>
            <ol>
              <li><b>Check in, five minutes.</b> One line each on your week.</li>
              <li><b>Hot seat, twenty five minutes.</b> Two men bring something real. I coach them with the group listening.</li>
              <li><b>The practice, ten minutes.</b> One practice from the course with a home example and a work example.</li>
              <li><b>Commitments, five minutes.</b> Each man types one thing he will do before next week. It comes back to him on Friday.</li>
            </ol>
            <p style={{ marginTop: 14 }}>Missed it? The recording comes to your inbox.</p>
          </div>
        </div>
      </section>
      )}

      <section className={styles.section}>
        <div className={styles.split}>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>A good fit</span>
            <h3>This is for you if</h3>
            <ul>
              <li>You lead something: a family, a team, a company, or all three.</li>
              <li>You know what you want to change and keep losing it by Wednesday.</li>
              <li>You want someone straight with you, on your side, who asks whether you did the thing.</li>
              <li>You are willing to do the work between calls.</li>
            </ul>
          </article>
          <article className={styles.card}>
            <span className={`${styles.label} ${styles.labelRust}`}>When coaching is the wrong tool</span>
            <h3>I will point you elsewhere if</h3>
            <ul>
              {REFER_OUT.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p style={{ marginTop: 14 }}>
              Coaching works on habits, leadership, decisions, and relationships going forward. It
              is not therapy, counseling, or crisis care, and I will tell you if you need one of those.
            </p>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSand}`}>
        <div className={styles.sectionHead}>
          <span className={`${styles.label} ${styles.labelRust}`}>How it starts</span>
          <h2>Three steps, <em>no pressure.</em></h2>
        </div>
        <div className={`${styles.ladder} ${styles.ladderThree}`}>
          <article className={styles.rung}>
            <span className={styles.label}>01</span>
            <h3>Tell me where you are</h3>
            <p>A short form, about three minutes. A sentence or two on what you want to be different is plenty.</p>
          </article>
          <article className={styles.rung}>
            <span className={styles.label}>02</span>
            <h3>A free twenty minute call</h3>
            <p>I reply within two business days with a few times. We talk about what is costing you the most and whether coaching fits.</p>
          </article>
          <article className={styles.rung}>
            <span className={styles.label}>03</span>
            <h3>Start, or do not</h3>
            <p>If it fits, I send the agreement and a secure payment link and we book your first call. If it does not, I will say so and point you to something that does.</p>
          </article>
        </div>
      </section>

      <section className={styles.section} id="terms">
        <div className={styles.sectionHead}>
          <span className={`${styles.label} ${styles.labelRust}`}>The terms</span>
          <h2>
            Plain terms, <em>before you pay anything.</em>
          </h2>
          <p>The same terms are in the coaching agreement you sign before we start.</p>
        </div>
        <div className={styles.termsGrid}>
          {COACHING_TERMS.map((t) => (
            <article key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.close}>
        <div>
          <h2>Start with twenty minutes.</h2>
          <p>
            Tell me what you are carrying. If coaching is the right tool, I will tell you how the
            twelve weeks would go. If it is not, I will say so and point you somewhere better.
          </p>
        </div>
        <Link className={styles.primary} href="/men/apply">
          Book a free call <span aria-hidden="true">→</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
