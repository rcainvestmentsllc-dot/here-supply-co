import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Chris Avera | Iron Compass",
  description: "Why Chris Avera built Iron Compass for husbands and fathers who are physically present at home but too often pulled away by work, pressure, and screens.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Chris Avera | Iron Compass",
    description: "Chris Avera on faith, family, coming back, and the practical work behind Iron Compass.",
    images: [{ url: "/og-iron-compass-v2.jpg", alt: "Iron Compass, be here for your own life" }],
  },
  twitter: { images: ["/og-iron-compass-v2.jpg"] },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
