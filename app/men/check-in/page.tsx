import { MEN_HEADER_ACTION } from "../program";
import type { Metadata } from "next";
import { menMeta } from "../meta";
import { Footer, Header } from "../../components";
import { MenForm } from "../men-form";
import styles from "../men.module.css";

export const metadata: Metadata = menMeta({ title: "Friday Check In | Coaching with Chris", description: "The weekly check in for men in coaching with Chris.", path: "/men/check-in", index: false });

export default function MenCheckIn() {
  return (
    <main id="main-content" className={styles.page}>
      <Header action={MEN_HEADER_ACTION} path="men" />
      <section className={styles.section}>
        <div className={styles.formWrap}>
          <div className={styles.formIntro}>
            <span className={`${styles.label} ${styles.labelRust}`}>Friday check in</span>
            <h1>Three questions, <em>five minutes.</em></h1>
            <p>Be honest about what did not happen. That is the useful part. I read these before our next call so we can start where you actually are.</p>
          </div>
          <MenForm kind="men_checkin" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
