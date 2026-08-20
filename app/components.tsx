import Link from "next/link";
import { SKOOL } from "./data";

export function CompassMark() {
  return <span className="compass-mark" aria-hidden="true"><i /><b /></span>;
}

export function Header() {
  return <>
    <header className="topbar">
      <Link className="brand" href="/"><CompassMark /><span><strong>IRON COMPASS</strong><small>A field guide for coming home</small></span></Link>
      <nav aria-label="Main navigation"><Link href="/field-guide">Compass Check</Link><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">The Work</Link></nav>
      <a className="topbar-action" href={SKOOL.sundayBoard} target="_blank" rel="noreferrer">Get the free Board <span>→</span></a>
    </header>
    <nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/field-guide">Compass Check</Link><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">The Work</Link></nav>
  </>;
}

export function Footer() {
  return <footer className="footer"><Link className="brand" href="/"><CompassMark /><span><strong>IRON COMPASS</strong><small>A field guide for coming home</small></span></Link><nav aria-label="Footer navigation"><Link href="/field-guide">Compass Check</Link><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">Core</Link><a href="https://chrisavera.substack.com" target="_blank" rel="noreferrer">Chris’s writing ↗</a></nav><span>© 2026</span></footer>;
}
