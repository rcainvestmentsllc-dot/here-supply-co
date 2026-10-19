import { MEN_HEADER_ACTION } from "./program";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header } from "../components";
import { MEN_OFFERS, usd } from "./program";
import styles from "./men.module.css";

/**
 * The homepage. Since October 2026 heresupplyco.com leads with men: one site,
 * one course for sale (Carry It Well), one coaching path. /men redirects here.
 */
export function MenHome() {
  return (
    <main id="main-content" className={styles.page}>
      <Header action={MEN_HEADER_ACTION} path="men" />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.label}>For men who lead something</span>
          <h1>
            Real work. <em>Real relationships.</em>
          </h1>
          <p className={styles.heroLede}>
            Most of leadership is relationships, and people feel where your attention is before you say a word.
            Coaching and a course for men carrying a business or a career, a family, and a phone
            that never stops asking for more of them.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primary} href="/men/apply">
              Book a free call <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.textLink} href="/men/course">
              Or start with Carry It Well, {usd(MEN_OFFERS.course.price)}
            </Link>
          </div>
          <p className={styles.heroNote}>Coached by a business owner and father who is still doing this work himself.</p>
        </div>
        <div className={styles.heroMedia}>
          <img
            src="/assets/men/course/part-start.jpg"
            alt="A man standing on a rock above a wide mountain valley"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionHead}>
          <span className={styles.label}>One man. One system. Every room.</span>
          <h2>
            The same three things decide how you show up <em>everywhere.</em>
          </h2>
          <p>
            Where your attention goes. How you handle pressure. Whether you have a life of your own
            outside the roles. Get those right and it shows at the kitchen table and in the
            conference room.
          </p>
        </div>
        <div className={styles.rooms}>
          <article className={styles.room}>
            <span className={styles.roomTag}>01 · ATTENTION</span>
            <h3>Where your focus actually goes</h3>
            <p>Whether the people in front of you get you, or whatever the phone and the inbox left over.</p>
          </article>
          <article className={styles.room}>
            <span className={styles.roomTag}>02 · STEADINESS</span>
            <h3>How you carry pressure</h3>
            <p>Handling the hard day, the hard conversation, and the hard season without passing it down the line.</p>
          </article>
          <article className={styles.room}>
            <span className={styles.roomTag}>03 · IDENTITY</span>
            <h3>A life outside your roles</h3>
            <p>Friends, a place that is yours, and a sense of yourself that is bigger than the job and the bills.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.story}>
          <img
            src="/assets/men/course/who.jpg"
            alt="A man in a wide brimmed hat crouched in a frosty forest"
            width={960}
            height={640}
            loading="lazy"
          />
          <div>
            <span className={`${styles.label} ${styles.labelRust}`}>Who this is for</span>
            <h2>The man in the middle of the journey.</h2>
            <p>
              Somewhere between thirty five and fifty five. Carrying a business or a career, a
              family, maybe aging parents, and a restlessness he does not talk about much. Most
              men&rsquo;s content is built for twenty five year olds chasing hustle or for guys who
              already retired. This is for the guy in the middle.
            </p>
            <p>
              You do not need to be in crisis, and you do not need to have it figured out. You just
              need to want to be more present and more steady, and to be willing to do the work.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSand}`}>
        <div className={styles.sectionHead}>
          <span className={`${styles.label} ${styles.labelRust}`}>Ways to work together</span>
          <h2>
            Start where it fits. <em>Go deeper if it helps.</em>
          </h2>
          <p>Every option uses the same nine practices. What changes is how much of me comes with it.</p>
        </div>
        <div className={`${styles.ladder} ${styles.ladderThree}`}>
          <article className={styles.rung}>
            <span className={styles.label}>On your own</span>
            <h3>{MEN_OFFERS.course.name}</h3>
            <p className={styles.rungPrice}>{usd(MEN_OFFERS.course.price)} <small>one time</small></p>
            <ul>
              <li>The Solo, then nine lessons, one a week</li>
              <li>Every lesson at home and at work</li>
              <li>A course book and ten sheets to print</li>
            </ul>
            <p className={styles.rungFoot}><Link href="/men/course">See the course</Link></p>
          </article>
          <article className={`${styles.rung} ${styles.rungFeatured}`}>
            <span className={`${styles.label} ${styles.labelRust}`}>Starts with a free call</span>
            <h3>{MEN_OFFERS.intensive.name}</h3>
            <p className={styles.rungPrice}>{usd(MEN_OFFERS.intensive.price)} <small>or three payments of {usd(MEN_OFFERS.intensive.installments.amount)}</small></p>
            <ul>
              <li>Twelve weekly calls with me</li>
              <li>The course, one lesson a week</li>
              <li>A Friday check in and weekday access</li>
            </ul>
            <p className={styles.rungFoot}><Link href="/men/coaching#intensive">See the twelve weeks</Link></p>
          </article>
          <article className={styles.rung}>
            <span className={styles.label}>After the Intensive</span>
            <h3>{MEN_OFFERS.ongoing.name}</h3>
            <p className={styles.rungPrice}>{usd(MEN_OFFERS.ongoing.price)} <small>a month</small></p>
            <ul>
              <li>Two {MEN_OFFERS.ongoing.callMinutes} minute calls a month</li>
              <li>A quarterly planning call</li>
              <li>Weekday access by text or voice memo</li>
            </ul>
            <p className={styles.rungFoot}><Link href="/men/coaching#ongoing">How ongoing works</Link></p>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.story}>
          <img
            src="/assets/chris-founder-sunset.jpg"
            alt="Chris Avera"
            width={627}
            height={627}
            loading="lazy"
            style={{ aspectRatio: "1 / 1", objectFit: "cover", borderRadius: 4 }}
          />
          <div>
            <span className={styles.label}>A note from Chris</span>
            <p className={styles.quote} style={{ marginTop: 20, color: "#f2ece1", fontSize: "clamp(22px, 2.2vw, 32px)" }}>
              I have run a business for twenty years and I am raising three kids. I spent a long
              stretch physically home and mentally somewhere else, and I still do this work when it
              is hard. I coach the way I would want to be coached: straight with you, on your side,
              and asking about the part you did not mention.
            </p>
            <span className={styles.quoteCite}>Chris Avera · Brevard, North Carolina · <Link href="/men/about" style={{ color: "#f2ece1", textDecoration: "underline" }}>More about me</Link></span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSand}`}>
        <div className={styles.split}>
          <div className={styles.sectionHead} style={{ marginBottom: 0 }}>
            <span className={`${styles.label} ${styles.labelRust}`}>Not ready for any of it?</span>
            <h2>
              Start with <em>two minutes.</em>
            </h2>
            <p>
              The Driveway Card is free: a two minute hand off between work and home that lives in
              your glovebox. No email needed to print it.
            </p>
            <p style={{ marginTop: 18 }}>
              <Link className={styles.primary} href="/men/driveway">
                Get the Driveway Card <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
          <img
            src="/assets/men/driveway-card-shot.jpg"
            alt="The printed Driveway Card, a sheet of four and two cut cards"
            width={1672}
            height={941}
            loading="lazy"
            style={{ width: "100%", height: "auto", borderRadius: 4 }}
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.split}>
          <div className={styles.sectionHead} style={{ marginBottom: 0 }}>
            <span className={`${styles.label} ${styles.labelRust}`}>Here for him?</span>
            <h2>
              Buying it for <em>your husband.</em>
            </h2>
            <p>
              A lot of the men who need this will not go looking for it. You can give him the
              course, or send him a free call with a note in your own words.
            </p>
            <p style={{ marginTop: 18 }}>
              <Link className={styles.primary} href="/gift">
                See the gift options <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
          <div className={styles.sectionHead} style={{ marginBottom: 0 }}>
            <span className={styles.label}>For the two of you</span>
            <h2>
              The Sunday <em>Board.</em>
            </h2>
            <p>
              A free fifteen minute weekly conversation for two people sharing a life, with a
              printable guide and a short video of Chris and Rhea doing one.
            </p>
            <p style={{ marginTop: 18 }}>
              <Link className={styles.textLink} href="/sunday-board">
                Get the free guide <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className={styles.close}>
        <div>
          <h2>A free twenty minute call, and no pitch if it is not a fit.</h2>
          <p>
            Tell me a little about where you are. I will reply with a few times for a free call. If
            coaching is not the right tool, I will say so and point you to something that is.
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
