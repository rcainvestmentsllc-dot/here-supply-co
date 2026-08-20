import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compass Check | Iron Compass",
  description: "Choose the sentence closest to the truth and leave with one small practice you can use today.",
  openGraph: { title: "Compass Check | Iron Compass", description: "One small practice for the moment pulling you away right now.", images: [] },
  twitter: { title: "Compass Check | Iron Compass", description: "One small practice for the moment pulling you away right now.", images: [] },
};

export default function FieldGuideLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
