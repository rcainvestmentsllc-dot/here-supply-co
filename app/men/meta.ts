import type { Metadata } from "next";

/**
 * Metadata for the men's path. The site wide defaults are the couples brand,
 * so every men's page sets its own Open Graph and Twitter card; otherwise a
 * link texted to a man previews as "Attention Tools for Couples".
 */
const DEFAULT_IMAGE = { url: "/assets/men/course/part-start.jpg", width: 960, height: 640, alt: "A man standing on a rock above a wide mountain valley" };

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
