import { SITE_ORIGIN } from "./site-config";
import type { MetadataRoute } from "next";

const baseUrl = SITE_ORIGIN;
const lastModified = new Date("2026-09-09");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/sunday-board`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/library`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/look-up-at-clemson`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/resources/why-men-need-a-third-place`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/weekly-marriage-meeting`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/leave-work-at-work`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/phone-away-before-driving`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/how-to-stop-checking-your-phone-at-home`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/resources/how-to-be-more-present-with-your-kids`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/policies`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
