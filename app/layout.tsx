import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "./structured-data";

const title = "Iron Compass | Be Here for Your Own Life";
const description = "Practical tools for husbands and fathers who want to overcome digital distraction, be more present at home, and lead a calmer family life.";

const siteData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ironcompassinstitute.com/#organization",
      name: "Iron Compass",
      url: "https://ironcompassinstitute.com/",
      email: "mailto:chris@ironcompassinstitute.com",
      founder: { "@id": "https://ironcompassinstitute.com/#chris-avera" },
      sameAs: ["https://chrisavera.substack.com"],
    },
    {
      "@type": "Person",
      "@id": "https://ironcompassinstitute.com/#chris-avera",
      name: "Chris Avera",
      url: "https://ironcompassinstitute.com/about",
      sameAs: ["https://chrisavera.substack.com"],
    },
    {
      "@type": "WebSite",
      "@id": "https://ironcompassinstitute.com/#website",
      url: "https://ironcompassinstitute.com/",
      name: "Iron Compass",
      description,
      publisher: { "@id": "https://ironcompassinstitute.com/#organization" },
      inLanguage: "en-US",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ironcompassinstitute.com"),
  title,
  description,
  icons: { icon: "/assets/iron-compass-wave-mark-transparent.png", shortcut: "/assets/iron-compass-wave-mark-transparent.png", apple: "/apple-touch-icon.png" },
  openGraph: { title, description, url: "/", siteName: "Iron Compass", type: "website", images: [{ url: "/og-iron-compass-v2.jpg", width: 1200, height: 630, alt: "Iron Compass, Be here for your own life." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-iron-compass-v2.jpg"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to main content</a><JsonLd data={siteData} />{children}</body></html>;
}
