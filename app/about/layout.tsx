import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Chris Avera | Iron Compass Institute",
  description: "Chris Avera on faith, family, coming back, and the practical work behind Iron Compass.",
  openGraph: {
    title: "About Chris Avera | Iron Compass Institute",
    description: "Chris Avera on faith, family, coming back, and the practical work behind Iron Compass.",
    images: [],
  },
  twitter: { images: [] },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
