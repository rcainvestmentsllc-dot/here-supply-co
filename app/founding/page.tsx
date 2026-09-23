import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { Footer, Header } from "../components";
import { FoundingSignupForm } from "./signup-form";
import styles from "./founding.module.css";

export const metadata: Metadata = {
  title: "The Founding Group | Here Supply Co.",
  description:
    "Twenty couples get All the Way Here free, in exchange for doing it and telling the truth about what happened.",
  alternates: { canonical: "/founding" },
};

/**
 * The founding group.
 *
 * Nothing on this site has a single line from anyone who is not Chris, and at
 * $99 a stranger has to trust him before they pay. This page exists to close
 * that gap honestly: give the whole thing away to a small number of couples in
 * exchange for the one thing that cannot be manufactured.
 *
 * It is deliberately blunt about the trade. People who feel recruited do not
 * finish; people who understand they are being asked for something do.
 */
export default async function Founding({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; err?: string }>;
}) {
  const params = await searchParams;

  return (
    <main id="main-content" className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <figure className={styles.heroPhoto}>
          <img
            src="/assets/chris-founder.jpg"
            alt="Chris Avera outdoors by the ocean"
            width="600"
            height="800"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>Chris Avera · Brevard, North Carolina</figcaption>
        </figure>
        <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>TWENTY COUPLES · NO CHARGE</p>
        <h1>
          I need to know whether<br />
          this <em>works for anyone but me.</em>
        </h1>
        <p className={styles.lead}>
          All the Way Here has never been run by anyone except my own family. Before I ask a
          stranger to pay for it, I want twenty couples to actually do it and tell me the truth
          about what happened, including the parts that did not work.
        </p>
        <p className={styles.leadSmall}>
          You get the whole thing. The Field Kit, the three day Attention Reset, and all nine
          lessons. No charge, now or later, and no card.
        </p>
        </div>
      </section>

      <section className={styles.trade}>
        <div className={styles.tradeCol}>
          <p className={styles.label}>WHAT YOU GET</p>
          <ul>
            <li>
              <b>The Field Kit</b>
              <span>
                Eleven printed sheets, each one built for where the practice actually happens. The
                reset on the fridge, the driveway card in the glovebox, the board sheet on the table.
              </span>
            </li>
            <li>
              <b>The Attention Reset</b>
              <span>
                Three days of getting the phone out of the way, plus what the hours actually feel
                like so the hard part does not catch you by surprise.
              </span>
            </li>
            <li>
              <b>Nine lessons</b>
              <span>
                One practice each, across attention, pressure, your marriage, your kids if you have
                them, and the parts of a life that go quiet first.
              </span>
            </li>
            <li>
              <b>Me, reachable</b>
              <span>
                You can email me directly while you are working through it, and I will answer. That
                is not a support desk, it is my actual inbox.
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.tradeCol}>
          <p className={styles.label}>WHAT I AM ASKING FOR</p>
          <ul>
            <li>
              <b>Actually do it</b>
              <span>
                Not skim it. The reset takes three days and each practice takes minutes. If you
                sign up and never open it, I learn nothing and so do you.
              </span>
            </li>
            <li>
              <b>Tell me what broke</b>
              <span>
                A short note at the end. What helped, what did not, what you quietly skipped. The
                skipped ones teach me the most.
              </span>
            </li>
            <li>
              <b>Let me quote you, if you want</b>
              <span>
                Only if it was worth something to you, only in your words, and only with the name
                you choose. A no here costs you nothing and you still keep everything.
              </span>
            </li>
          </ul>

          <p className={styles.honest}>
            I am not a therapist and I am not going to invent a title I do not have. This is
            education, not counseling. If what the two of you are carrying needs a professional,
            it needs a professional, and this is not a substitute for one.
          </p>
        </div>
      </section>

      <section className={styles.fit}>
        <div>
          <p className={styles.label}>WHO THIS FITS</p>
          <p className={styles.fitYes}>
            Two people sharing a life who are tired of being in the same room and somewhere else.
            Kids or no kids, eight of the nine lessons do not care. One of you can start alone,
            though it works better with both.
          </p>
        </div>
        <div>
          <p className={styles.label}>WHO IT DOES NOT</p>
          <p className={styles.fitNo}>
            Anyone hoping this fixes a marriage in real trouble, and anyone who wants to hand it to
            their partner as evidence. Nothing in the kit is written to correct one person. If that
            is what you need it for, it will not land.
          </p>
        </div>
      </section>

      <section className={styles.kitShow}>
        <p className={styles.label}>WHAT SHOWS UP</p>
        <div className={styles.kitGrid}>
          <figure>
            <img src="/assets/free-weekly-guide-preview.png" alt="The Sunday Board Meeting sheet" width="1200" height="1553" loading="lazy" decoding="async" />
            <figcaption>Sheet 01 · The table</figcaption>
          </figure>
          <figure>
            <img src="/assets/course/photo/lesson-1-3-driveway-v1.jpg" alt="A parent sitting in the car in the driveway before going inside" width="1672" height="942" loading="lazy" decoding="async" />
            <figcaption>Sheet 03 · The glovebox</figcaption>
          </figure>
          <figure>
            <img src="/assets/course/photo/lesson-2-1-thermostat-v1.jpg" alt="A family talking in the kitchen" width="1672" height="942" loading="lazy" decoding="async" />
            <figcaption>Sheet 06 · The nightstand</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.signup} id="join">
        <FoundingSignupForm joined={params.ok === "1"} error={params.err === "1"} />
      </section>

      <section className={styles.after}>
        <p className={styles.label}>WHAT HAPPENS NEXT</p>
        <ol>
          <li>
            <span>01</span>
            <div>
              <b>I email you back myself</b>
              <p>Not a sequence. An actual email, and you can reply to it.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <b>You get everything at once</b>
              <p>Full access and the printable kit. Start with the reset before anything else.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <b>You can reach me while you do it</b>
              <p>Reply to that email any time. Stuck, skeptical, or it is not working.</p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <b>You tell me the truth at the end</b>
              <p>That is the whole price. Then it is yours to keep either way.</p>
            </div>
          </li>
        </ol>
        <p className={styles.afterNote}>
          Not ready to commit to that? The <Link href="/sunday-board">Sunday Board Meeting</Link> is
          free to anyone, no strings, and takes fifteen minutes.
        </p>
      </section>

      <Footer />
    </main>
  );
}
