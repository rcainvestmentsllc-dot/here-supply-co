import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compass Check | Iron Compass",
  description: "A free, private self-check for husbands and fathers dealing with distraction, work pressure, a crowded mind, or distance at home. Leave with one move for today.",
  alternates: { canonical: "/field-guide" },
  openGraph: { title: "Compass Check | Iron Compass", description: "One small practice for the moment pulling you away right now.", images: [{ url: "/og-iron-compass-v2.jpg", alt: "Iron Compass, be here for your own life" }] },
  twitter: { title: "Compass Check | Iron Compass", description: "One small practice for the moment pulling you away right now.", images: ["/og-iron-compass-v2.jpg"] },
};

export default function FieldGuideLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
