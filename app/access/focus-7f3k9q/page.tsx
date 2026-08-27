import type { Metadata } from "next";
import Link from "next/link";
import { GAMMA_LINKS } from "../../data";

export const metadata: Metadata = {
  title: "Focus Protocol Access | Iron Compass",
  description: "Private access to the Focus Protocol.",
  robots: { index: false, follow: false },
};

const manual = GAMMA_LINKS.find((item) => item.title === "Focus Protocol Field Manual");

export default function FocusAccess() {
  return (
    <main id="main-content" className="access-shell">
      <header className="access-header">
        <Link href="/" aria-label="Iron Compass home">IRON COMPASS</Link>
        <span>PRIVATE ACCESS</span>
      </header>
      <section className="access-intro">
        <p className="section-label">FOCUS PROTOCOL</p>
        <h1>Get your attention<br /><em>back in the room.</em></h1>
        <p>This is a 72-hour reset. Watch the brief introduction, open the browser-based visual Field Manual, and work one practical move at a time.</p>
      </section>
      <section className="access-resource access-video">
        <div><span>01 · WATCH</span><h2>Start here</h2><p>A short introduction to the problem, the reset, and how to use the next 72 hours.</p></div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- Add captions only after an exact transcript is verified. */}
        <video controls playsInline preload="metadata" poster="/assets/focus-manual-gamma.png" aria-label="Focus Protocol introduction video"><source src="/assets/focus-protocol-sales.mp4" type="video/mp4" />Your browser does not support this video.</video>
      </section>
      <section className="access-resource access-manual">
        <div><span>02 · WORK</span><h2>The Focus Protocol Field Manual</h2><p>A browser-based visual presentation with four practical moves, organized so you can stop reading and start using them.</p></div>
        {manual && <a className="button primary" href={manual.url} target="_blank" rel="noreferrer">Open the visual Field Manual <b>→</b></a>}
      </section>
      <footer className="access-footer"><span>Save this page. It is your private access link.</span><Link href="/">Iron Compass Institute</Link></footer>
    </main>
  );
}
