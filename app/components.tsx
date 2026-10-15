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

const COUPLES_NAV: NavLink[] = [
  { href: "/sunday-board", label: "Start here" },
  { href: "/library", label: "The course" },
  { href: "/men", label: "For men" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About Chris" },
];

/** The men's pages keep men on the men's path: no couples links up top. */
const MEN_NAV: NavLink[] = [
  { href: "/men/coaching", label: "Coaching" },
  { href: "/men/course", label: "The course" },
  { href: "/men/driveway", label: "Driveway Card" },
  { href: "/men/about", label: "About Chris" },
];

/** The site header. The men's pages swap the action and the nav for their own. */
export function Header({
  action = { href: "/sunday-board#get-board", label: "Start free" },
  path = "couples",
}: { action?: NavLink; path?: "couples" | "men" } = {}) {
  const links = path === "men" ? MEN_NAV : COUPLES_NAV;
  const mobile = path === "men" ? MEN_NAV : COUPLES_NAV.filter((l) => l.href !== "/resources").map((l) => (l.href === "/about" ? { ...l, label: "About" } : l));
  const home = path === "men" ? "/men" : "/";
  return <>
    <header className="topbar">
      <Link className="brand" href={home} aria-label={path === "men" ? "Here Supply Co. for men" : "Here Supply Co. home"}><BrandWordmark /></Link>
      <nav aria-label="Main navigation">{links.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}</nav>
      <Link className="topbar-action" href={action.href}>{action.label} <span>→</span></Link>
    </header>
    <nav className="mobile-nav" aria-label="Mobile navigation">{mobile.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}{path === "men" && <Link href={action.href}>{action.label}</Link>}</nav>
  </>;
}

export function Footer() {
  return <footer className="footer"><Link className="brand" href="/" aria-label="Here Supply Co. home"><BrandWordmark onDark /></Link><nav aria-label="Footer navigation"><Link href="/sunday-board">Sunday Board Meeting</Link><Link href="/library">All the Way Here</Link><Link href="/coaching">Thirty Days With Chris</Link><Link href="/men">For men who lead</Link><Link href="/gift">Give it to him</Link><Link href="/men/coaching">Coaching for men</Link><Link href="/resources">Resources</Link><Link href="/about">About Chris</Link><a href="https://chrisavera.substack.com" target="_blank" rel="me noreferrer">Chris on Substack ↗</a><Link href={CONTACT_FORM}>Contact</Link><Link href="/policies">Policies</Link></nav><span>MADE IN NORTH CAROLINA · © 2026 HERE SUPPLY CO.</span></footer>;
}
