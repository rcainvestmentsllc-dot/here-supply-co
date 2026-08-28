import type { Metadata } from "next";
import { PlainLink as Link } from "../../plain-link";
import { FOCUS_MOVES } from "../../course-content";
import { CompassMark } from "../../components";

export const metadata: Metadata = {
  title: "Focus Protocol Access | Iron Compass",
  description: "Private access to the Focus Protocol.",
  robots: { index: false, follow: false },
};

export default function FocusAccess() {
  return (
    <main id="main-content" className="access-shell">
      <header className="access-header">
        <Link href="/" aria-label="Iron Compass home"><CompassMark /><b>IRON COMPASS</b></Link>
        <span>PRIVATE ACCESS</span>
      </header>
      <section className="access-intro">
        <p className="section-label">YOU’RE IN · FOCUS PROTOCOL</p>
        <h1>Start here.<br /><em>Take back 72 hours.</em></h1>
        <p>Your access is ready. Save this private page and work one practical move at a time. The complete reset lives here, with no course account or extra app to manage.</p>
      </section>
      <section className="focus-native-intro">
        <p className="section-label">THE 72-HOUR EXPERIMENT</p><h2>I choose where<br /><em>my attention goes.</em></h2><p>This is not a detox, a treatment, or a test of discipline. It is a short experiment that creates enough friction to notice the reflex and make a different choice.</p>
      </section>
      <section className="focus-moves">{FOCUS_MOVES.map((move) => <article key={move.number}><span>{move.number}</span><h2>{move.title}</h2><h3>{move.promise}</h3><p>{move.body}</p><aside><b>MAKE IT FIT</b>{move.exception}</aside></article>)}</section>
      <section className="focus-tracker"><div><p className="section-label">NOTICE, DO NOT GRADE</p><h2>Three questions.<br />Once a day.</h2></div><ol><li>When did I reach without deciding?</li><li>Where was it easier to stay present?</li><li>Which boundary is worth keeping tomorrow?</li></ol></section>
      <section className="lesson-field-note"><span>AFTER 72 HOURS</span><blockquote>Choose which tools return, where they live, and when you use them. Keep the boundaries that made the room feel different. Release the ones that did not fit.</blockquote></section>
      <section className="access-resource access-video">
        <div><span>02 · WHEN YOU ARE READY</span><h2>The next step</h2><p>Use Focus first. When you are ready to work on the larger system around attention, pressure, home, and relationships, this short bridge introduces Iron Compass Core.</p><Link className="text-link" href="/library">See the full Core curriculum <b>→</b></Link></div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Add captions only after an exact transcript is verified. */}
        <video controls playsInline preload="metadata" poster="/assets/core-bridge-poster.jpg" aria-label="Iron Compass Core bridge video"><source src="/assets/core-bridge-sales.mp4" type="video/mp4" />Your browser does not support this video.</video>
      </section>
      <footer className="access-footer"><span>Questions? Email chris@ironcompassinstitute.com. Save this page as your private access link.</span><Link href="/">Iron Compass Institute</Link></footer>
    </main>
  );
}
