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
      <img src="/assets/sunday-board-meeting-preview-v2.png" alt="The actual printable Sunday Board Meeting one sheet guide" width="1275" height="1650" loading="lazy" decoding="async" />
      <figcaption>THE SUNDAY BOARD MEETING · ONE SHEET GUIDE</figcaption>
    </figure>
  );
}

type NavLink = { href: string; label: string };

/**
 * One site, men first (October 2026). Every page uses the same nav. The couples
 * course is off sale; the free Sunday Board and the gift page stay, linked from
 * the footer.
 */
const NAV: NavLink[] = [
  { href: "/men/course", label: "Carry It Well" },
  { href: "/men/coaching", label: "Coaching" },
  { href: "/men/driveway", label: "Driveway Card" },
  { href: "/resources", label: "Articles" },
  { href: "/men/about", label: "About Chris" },
];

const DEFAULT_ACTION: NavLink = { href: "/men/apply", label: "Book a free call" };

/** The site header. `path` is kept so older pages still type check; every page gets the same nav. */
export function Header({
  action = DEFAULT_ACTION,
}: { action?: NavLink; path?: "couples" | "men" } = {}) {
  return <>
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Here Supply Co. home"><BrandWordmark /></Link>
      <nav aria-label="Main navigation">{NAV.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</nav>
      <Link className="topbar-action" href={action.href}>{action.label} <span>→</span></Link>
    </header>
    <nav className="mobile-nav" aria-label="Mobile navigation">{NAV.filter((l) => l.href !== "/resources").map((l) => <Link key={l.href} href={l.href}>{l.label === "About Chris" ? "About" : l.label}</Link>)}<Link href={action.href}>{action.label}</Link></nav>
  </>;
}

export function Footer() {
  return <footer className="footer"><Link className="brand" href="/" aria-label="Here Supply Co. home"><BrandWordmark onDark /></Link><nav aria-label="Footer navigation"><Link href="/men/course">Carry It Well</Link><Link href="/men/coaching">Coaching</Link><Link href="/men/apply">Book a free call</Link><Link href="/men/driveway">The Driveway Card</Link><Link href="/gift">Give it to him</Link><Link href="/sunday-board">Sunday Board, for couples</Link><Link href="/resources">Articles</Link><Link href="/men/about">About Chris</Link><a href="https://chrisavera.substack.com" target="_blank" rel="me noreferrer">Chris on Substack ↗</a><Link href={CONTACT_FORM}>Contact</Link><Link href="/policies">Policies</Link></nav><span>MADE IN NORTH CAROLINA · © 2026 HERE SUPPLY CO.</span></footer>;
}
