import { PlainLink as Link } from "./plain-link";
import { CONTACT_FORM } from "./data";

export function BrandWordmark() {
  return (
    <span className="here-supply-lockup" role="img" aria-label="Here Supply Co. Tools for showing up in real life.">
      <img className="here-supply-logo here-supply-logo-primary" src="/assets/brand/here-supply-co-logo-v2.svg" width="1874" height="547" alt="" decoding="async" />
      <img className="here-supply-logo here-supply-logo-inverse" src="/assets/brand/here-supply-co-logo-inverse-v2.svg" width="1874" height="547" alt="" decoding="async" />
      <span className="here-supply-descriptor" aria-hidden="true">TOOLS FOR SHOWING UP IN REAL LIFE</span>
    </span>
  );
}

export function SundayBoardWordmark() {
  return (
    <span className="sunday-board-lockup" role="img" aria-label="Sunday Board. Real life, on purpose.">
      <span className="sunday-board-name">
        <span>SUNDAY</span>
        <strong>BOARD</strong>
      </span>
      <span className="sunday-board-tagline">REAL LIFE. ON PURPOSE.</span>
    </span>
  );
}

export function WeeklyGuidePreview() {
  return (
    <figure className="weekly-guide-preview">
      <img src="/assets/free-weekly-guide-preview.png" alt="The actual printable Sunday Board Meeting one-page guide" width="1275" height="1650" loading="lazy" decoding="async" />
      <figcaption>ACTUAL PRINTABLE · WHITE, INK-CONSCIOUS BACKGROUND</figcaption>
    </figure>
  );
}

export function Header() {
  return <>
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Here Supply Co. home"><BrandWordmark /></Link>
      <nav aria-label="Main navigation"><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">The course</Link><Link href="/resources">Resources</Link><Link href="/about">About</Link></nav>
      <Link className="topbar-action" href="/sunday-board#get-board">Start free <span>→</span></Link>
    </header>
    <nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/sunday-board">Start free</Link><Link href="/library">The course</Link><Link href="/resources">Resources</Link><Link href="/about">About</Link></nav>
  </>;
}

export function Footer() {
  return <footer className="footer"><Link className="brand" href="/" aria-label="Here Supply Co. home"><BrandWordmark /></Link><nav aria-label="Footer navigation"><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">All the Way Here</Link><Link href="/resources">Resources</Link><Link href="/about">About Chris</Link><a href="https://chrisavera.substack.com" target="_blank" rel="me noreferrer">Chris on Substack ↗</a><Link href={CONTACT_FORM}>Contact</Link><Link href="/policies">Policies</Link></nav><span>MADE IN NORTH CAROLINA · © 2026 HERE SUPPLY CO.</span></footer>;
}
