import { PlainLink as Link } from "./plain-link";
import { CONTACT_FORM } from "./data";

export function CompassMark() {
  return <img className="compass-mark" src="/assets/iron-compass-wave-mark-transparent.png" alt="" width="120" height="120" aria-hidden="true" />;
}

export function WeeklyGuidePreview() {
  return (
    <div className="weekly-guide-preview" role="img" aria-label="Preview of the free fifteen-minute weekly guide">
      <header><span>15 MINUTES · ONE PAGE</span><b>THE WEEK AHEAD</b></header>
      <div className="weekly-guide-preview-title">
        <small>FOR YOU AND YOUR WIFE</small>
        <strong>See the same week.</strong>
        <p>Put what matters on paper before the week starts making the decisions for you.</p>
      </div>
      <ol>
        <li><span>01</span><b>How are we doing?</b><small>Connection first.</small></li>
        <li><span>02</span><b>What needs our attention?</b><small>Calendar, kids, money, home.</small></li>
        <li><span>03</span><b>Where will the week get tight?</b><small>Name pressure before it arrives.</small></li>
        <li><span>04</span><b>What will we protect?</b><small>One shared priority.</small></li>
      </ol>
      <footer>PRINT IT · PUT IT ON THE TABLE · USE WHAT HELPS</footer>
    </div>
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
