import type { Metadata } from "next";

/**
 * Metadata for the men's path. The site wide defaults are the couples brand,
 * so every men's page sets its own Open Graph and Twitter card; otherwise a
 * link texted to a man previews as "Attention Tools for Couples".
 */
const DEFAULT_IMAGE = { url: "/assets/course/photo/movement-return-v1.jpg", width: 1672, height: 941, alt: "A man setting his phone down before walking into the house" };

export function menMeta({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(index ? {} : { robots: { index: false, follow: false } }),
    openGraph: { title, description, url: path, siteName: "Here Supply Co.", type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
