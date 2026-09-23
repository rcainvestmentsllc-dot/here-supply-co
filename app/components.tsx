import { PlainLink as Link } from "./plain-link";
import { CONTACT_FORM } from "./data";
import { Wordmark } from "./brand/wordmark";

/** The original wave mark is the brand lockup across the site. */
export function BrandWordmark({ onDark = false, size = "md" }: { onDark?: boolean; size?: "sm" | "md" | "lg" | "xl" }) {
  return <Wordmark size={size} onDark={onDark} />;
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
      <img src="/assets/sunday-board-meeting-preview-v2.png" alt="The actual printable Sunday Board Meeting one-page guide" width="1275" height="1650" loading="lazy" decoding="async" />
      <figcaption>THE SUNDAY BOARD MEETING · ONE-PAGE GUIDE</figcaption>
    </figure>
  );
}

export function Header() {
  return <>
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Here Supply Co. home"><BrandWordmark /></Link>
      <nav aria-label="Main navigation"><Link href="/sunday-board">Start here</Link><Link href="/library">The course</Link><Link href="/about">About Chris</Link></nav>
      <Link className="topbar-action" href="/sunday-board#get-board">Start free <span>→</span></Link>
    </header>
    <nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/sunday-board">Start here</Link><Link href="/library">The course</Link><Link href="/about">About Chris</Link></nav>
  </>;
}

export function Footer() {
  return <footer className="footer"><Link className="brand" href="/" aria-label="Here Supply Co. home"><BrandWordmark onDark /></Link><nav aria-label="Footer navigation"><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">All the Way Here</Link><Link href="/resources">Resources</Link><Link href="/about">About Chris</Link><a href="https://chrisavera.substack.com" target="_blank" rel="me noreferrer">Chris on Substack ↗</a><Link href={CONTACT_FORM}>Contact</Link><Link href="/policies">Policies</Link></nav><span>MADE IN NORTH CAROLINA · © 2026 HERE SUPPLY CO.</span></footer>;
}
