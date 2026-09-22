import { siteUrl, supportEmailUrl } from "./site-config";
import type { Metadata } from "next";
import "./design/tokens.css";
import "./globals.css";
import { JsonLd } from "./structured-data";

const title = "Here Supply Co. | Tools for Showing Up in Real Life";
const description = "Courses, guides, and field tools for bringing your attention back to the people, relationships, and ordinary life you do not want to miss.";

const siteData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": siteUrl("/#organization"),
      name: "Here Supply Co.",
      url: siteUrl("/"),
      email: supportEmailUrl(),
      founder: { "@id": siteUrl("/#chris-avera") },
      sameAs: ["https://chrisavera.substack.com"],
    },
    {
      "@type": "Person",
      "@id": siteUrl("/#chris-avera"),
      name: "Chris Avera",
      url: siteUrl("/about"),
      sameAs: ["https://chrisavera.substack.com"],
    },
    {
      "@type": "WebSite",
      "@id": siteUrl("/#website"),
      url: siteUrl("/"),
      name: "Here Supply Co.",
      description,
      publisher: { "@id": siteUrl("/#organization") },
      inLanguage: "en-US",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl("/")),
  title,
  description,
  icons: { icon: [{ url: "/favicon.svg?v=here-2", type: "image/svg+xml" }, { url: "/favicon-32x32.png?v=here-2", sizes: "32x32", type: "image/png" }], shortcut: "/favicon.svg?v=here-2", apple: "/apple-touch-icon.png?v=here-2" },
  openGraph: { title, description, url: "/", siteName: "Here Supply Co.", type: "website", images: [{ url: "/assets/course/art/problem-1-3-driveway-woman.jpg", width: 1672, height: 941, alt: "A woman pausing in the driveway before returning to the people waiting at home" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/assets/course/art/problem-1-3-driveway-woman.jpg"] },
};

/**
 * Brand typefaces.
 *
 * The site previously relied on a system stack (Avenir Next → Futura →
 * Century Gothic → Trebuchet MS), which resolves to a different typeface on
 * almost every platform: Mac visitors saw Avenir or Futura, Windows fell
 * through to Trebuchet, Android to something else again. Loading the real
 * faces means everyone sees the same brand.
 *
 * Archivo carries the wordmark and headings (the wdth axis gives the wide
 * nameplate cut). IBM Plex Mono carries the small tracked field-manual
 * labels.
 */
const FONT_HREF =
  "https://fonts.googleapis.com/css2" +
  "?family=Archivo:wdth,wght@100,400;100,500;100,600;100,700;125,600;125,700" +
  "&family=IBM+Plex+Mono:wght@400;500" +
  "&display=swap";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link rel="stylesheet" href={FONT_HREF} />
  </head><body><a className="skip-link" href="#main-content">Skip to main content</a><JsonLd data={siteData} />{children}</body></html>;
}
