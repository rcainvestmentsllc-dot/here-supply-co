import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const title = "Iron Compass Institute | Be Here for Your Own Life";
  const description = "Practical work for men who want their attention, home, and the way they lead to point in the same direction.";

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title,
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title, description, images: [{ url: "/og-iron-compass.png", width: 1731, height: 909, alt: "Iron Compass, Be here for your own life." }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-iron-compass.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
