import { PlainLink as Link } from "./plain-link";
import { CONTACT_FORM } from "./data";

export function CompassMark() {
  return <img className="compass-mark" src="/assets/iron-compass-wave-mark-reference.png" alt="" width="124" height="136" aria-hidden="true" />;
}

export function Header() {
  return <>
    <header className="topbar">
      <Link className="brand" href="/"><CompassMark /><span><strong>IRON COMPASS</strong><small>Practical work for the rooms that matter</small></span></Link>
      <nav aria-label="Main navigation"><Link href="/field-guide">Compass Check</Link><Link href="/focus">Focus Protocol</Link><Link href="/library">Iron Compass Core</Link><Link href="/resources">Resources</Link></nav>
      <Link className="topbar-action" href="/sunday-board#get-board">Start free <span>→</span></Link>
    </header>
    <nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/sunday-board">Sunday Meeting</Link><Link href="/field-guide">Compass Check</Link><Link href="/focus">Focus Protocol</Link><Link href="/library">Core</Link><Link href="/resources">Resources</Link></nav>
  </>;
}

export function Footer() {
  return <footer className="footer"><Link className="brand" href="/"><CompassMark /><span><strong>IRON COMPASS</strong><small>Practical work for the rooms that matter</small></span></Link><nav aria-label="Footer navigation"><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/field-guide">Compass Check</Link><Link href="/focus">Focus Protocol</Link><Link href="/library">Iron Compass Core</Link><Link href="/resources">Resources</Link><Link href="/about">About Chris</Link><Link href={CONTACT_FORM}>Work with Chris</Link><a href="https://chrisavera.substack.com" target="_blank" rel="me noreferrer">Field Notes on Substack ↗</a><Link href="/policies">Policies</Link></nav><span>MADE IN NORTH CAROLINA · © 2026</span></footer>;
}
