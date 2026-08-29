import { PlainLink as Link } from "./plain-link";
import { CONTACT_FORM } from "./data";

export function CompassMark() {
  return <img className="compass-mark" src="/assets/iron-compass-wave-mark-transparent.png" alt="" width="120" height="120" aria-hidden="true" />;
}

export function WeeklyGuidePreview() {
  return (
    <figure className="weekly-guide-preview">
      <img src="/assets/free-weekly-guide-preview.png" alt="The actual printable See the Same Week one-page guide" width="1275" height="1650" loading="lazy" decoding="async" />
      <figcaption>ACTUAL PRINTABLE · WHITE, INK-CONSCIOUS BACKGROUND</figcaption>
    </figure>
  );
}

export function Header() {
  return <>
    <header className="topbar">
      <Link className="brand" href="/"><CompassMark /><span><strong>IRON COMPASS</strong><small>Practical work for real life</small></span></Link>
      <nav aria-label="Main navigation"><Link href="/field-guide">Compass Check</Link><Link href="/focus">Focus Protocol</Link><Link href="/library">Iron Compass Core</Link><Link href="/resources">Resources</Link></nav>
      <Link className="topbar-action" href="/sunday-board#get-board">Start free <span>→</span></Link>
    </header>
    <nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/sunday-board">Free weekly guide</Link><Link href="/field-guide">Compass Check</Link><Link href="/focus">Focus Protocol</Link><Link href="/library">Core</Link><Link href="/resources">Resources</Link></nav>
  </>;
}

export function Footer() {
  return <footer className="footer"><Link className="brand" href="/"><CompassMark /><span><strong>IRON COMPASS</strong><small>Practical work for real life</small></span></Link><nav aria-label="Footer navigation"><Link href="/sunday-board">Free weekly guide</Link><Link href="/field-guide">Compass Check</Link><Link href="/focus">Focus Protocol</Link><Link href="/library">Iron Compass Core</Link><Link href="/resources">Resources</Link><Link href="/about">About Chris</Link><Link href={CONTACT_FORM}>Work with Chris</Link><a href="https://chrisavera.substack.com" target="_blank" rel="me noreferrer">Chris on Substack ↗</a><Link href="/policies">Policies</Link></nav><span>MADE IN NORTH CAROLINA · © 2026</span></footer>;
}
