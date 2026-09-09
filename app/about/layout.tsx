import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Chris Avera | Here Supply Co.",
  description: "Why Chris Avera built Here Supply Co. for people who want to be more present inside the life they already have.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Chris Avera | Here Supply Co.",
    description: "Chris Avera on faith, family, coming back, and the practical work behind Here Supply Co.",
    images: [{ url: "/assets/course/art/problem-1-3-driveway-woman.jpg", alt: "A woman pausing in the driveway before returning to the people waiting at home" }],
  },
  twitter: { images: ["/assets/course/art/problem-1-3-driveway-woman.jpg"] },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
