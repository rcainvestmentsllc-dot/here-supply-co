import type { Metadata } from "next";
import { Footer, Header } from "../components";
import { CHECKOUT } from "../data";
import { CORE_LESSONS } from "../course-content";
import { DriftCheck, type LessonSummary } from "./drift-check";
import styles from "./check.module.css";

export const metadata: Metadata = {
  title: "Where Are You Drifting? A One Minute Check | Here Supply Co.",
  description: "Five quick questions that name where attention and connection are slipping at home, with one practical thing to try tonight.",
  alternates: { canonical: "/check" },
  openGraph: {
    title: "Where are you drifting? | Here Supply Co.",
    description: "Five quick questions. One honest answer. One thing to try tonight.",
    url: "/check",
  },
};

const lessons: Record<string, LessonSummary> = Object.fromEntries(
  CORE_LESSONS.map((l) => [l.slug, { slug: l.slug, number: l.number, title: l.title, practice: l.practice, action: l.action, artImage: l.artImage, artAlt: l.artAlt }]),
);

export default function Check() {
  return (
    <main id="main-content" className="site">
      <Header />
      <section className={styles.page}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>One minute · Five questions</p>
          <h1>Where are you <em>drifting?</em></h1>
          <p>Answer for the last few weeks, not your best week. You will get a plain read on where attention and connection are slipping, and one practical thing to try tonight.</p>
          <small>Nothing to sign up for. Your answers stay on this page.</small>
        </div>
        <DriftCheck lessons={lessons} checkoutUrl={CHECKOUT.core} />
      </section>
      <Footer />
    </main>
  );
}
