import { MEN_HEADER_ACTION } from "../program";
import type { Metadata } from "next";
import { menMeta } from "../meta";
import { Footer, Header } from "../../components";
import { MenForm } from "../men-form";
import styles from "../men.module.css";

export const metadata: Metadata = menMeta({ title: "Before Our First Call | The 90 Day Intensive", description: "The intake for men starting the 90 Day Intensive.", path: "/men/intake", index: false });

export default function MenIntake() {
  return (
    <main id="main-content" className={styles.page}>
      <Header action={MEN_HEADER_ACTION} path="men" />
      <section className={styles.section}>
        <div className={styles.formWrap}>
          <div className={styles.formIntro}>
            <span className={`${styles.label} ${styles.labelRust}`}>The 90 Day Intensive · Week one</span>
            <h1>Before our <em>first call.</em></h1>
            <p>About fifteen minutes. Be honest, especially about the parts that are not going well. Nobody sees this but me, and it lets us spend the first hour on what matters instead of catching up.</p>
            <ol className={styles.steps}>
              <li>Fill this out at least a day before our first call.</li>
              <li>Pick the day you will start the Focus Protocol. Most men start the day after the call.</li>
              <li>Print the course book if you have not yet. We will use it every week.</li>
            </ol>
          </div>
          <MenForm kind="men_intake" />
        </div>
      </section>
      <Footer />
    </main>
  );
}
