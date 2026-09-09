import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start with the Sunday Board Meeting | Here Supply Co.",
  description: "Here Supply Co. has one clear place to begin: the free Sunday Board Meeting video and guide.",
  alternates: { canonical: "/sunday-board" },
  robots: { index: false, follow: true },
};

export default function FieldGuideLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
