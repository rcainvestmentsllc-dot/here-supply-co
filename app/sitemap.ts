import type { MetadataRoute } from "next";

const baseUrl = "https://ironcompassinstitute.com";
const lastModified = new Date("2026-08-27");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/field-guide`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/sunday-board`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/focus`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/library`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/policies`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
