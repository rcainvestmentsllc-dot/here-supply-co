import { PlainLink as Link } from "../plain-link";
import { Footer, Header } from "../components";
import styles from "./field-guide.module.css";

export default function FieldGuideBridge() {
  return (
    <main id="main-content" className={styles.page}>
      <Header />
      <section className={styles.intro}>
        <p className={styles.eyebrow}>A SIMPLER PLACE TO BEGIN</p>
        <h1>One free practice.<br /><em>One complete course.</em></h1>
        <p>We retired the extra self-check so you do not have to diagnose yourself or choose among several products. Start with the Sunday Board Meeting, then continue into All the Way Here if the work helps.</p>
        <div className="hero-buttons">
          <Link className="button primary" href="/sunday-board#get-board">Get the free guide <span>→</span></Link>
          <Link className="text-link" href="/library">See the complete course <span>→</span></Link>
        </div>
      </section>
      <section className={styles.close}>
        <p className={styles.eyebrow}>LESS FRICTION, MORE USE</p>
        <h2>You do not need another quiz. You need one small practice you can use this week.</h2>
        <Link href="/sunday-board">Watch the Sunday Board Meeting <span>→</span></Link>
      </section>
      <Footer />
    </main>
  );
}
