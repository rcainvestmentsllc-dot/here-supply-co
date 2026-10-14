import { MEN_HEADER_ACTION } from "../program";
import type { Metadata } from "next";
import { Footer, Header } from "../../components";
import { MenForm } from "../men-form";
import styles from "../men.module.css";

export const metadata: Metadata = {
  title: "Book a Free Call | Coaching for Men Who Lead",
  description: "Tell Chris a little about where you are and book a free twenty minute call to see whether coaching fits.",
  alternates: { canonical: "/men/apply" },
};

export default function MenApply() {
  return (
    <main id="main-content" className={styles.page}>
      <Header action={MEN_HEADER_ACTION} />
      <section className={styles.section}>
        <div className={styles.formWrap}>
          <div className={styles.formIntro}>
            <span className={`${styles.label} ${styles.labelRust}`}>A free twenty minute call</span>
            <h1>Tell me where <em>you are.</em></h1>
            <p>No long story needed. A sentence or two about what is costing you and what you want to be different is plenty. I read every one myself.</p>
            <ol className={styles.steps}>
              <li>You send this. It takes about three minutes.</li>
              <li>I reply within two business days with a few times for a call.</li>
              <li>We talk for twenty minutes. If coaching fits, I tell you how it would work. If it does not, I say so and point you to something better.</li>
            </ol>
          </div>
          <MenForm kind="men_application" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
