import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/access/" },
    sitemap: "https://ironcompassinstitute.com/sitemap.xml",
    host: "https://ironcompassinstitute.com",
  };
}
