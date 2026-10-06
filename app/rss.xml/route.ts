import { FEED_ITEMS } from "../../lib/feed";

const SITE = "https://heresupplyco.com";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 for Pinterest auto publish. See lib/feed.ts. */
export async function GET() {
  const items = FEED_ITEMS.map((item) => {
    const url = `${SITE}${item.path}?utm_source=pinterest&utm_medium=rss&utm_campaign=autopublish`;
    const img = `${SITE}${item.image}`;
    return `    <item>
      <title>${esc(item.title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="false">${esc(item.path)}</guid>
      <description>${esc(item.description)}</description>
      <pubDate>${new Date(`${item.published}T12:00:00Z`).toUTCString()}</pubDate>
      <enclosure url="${esc(img)}" type="image/jpeg" length="0"/>
      <media:content url="${esc(img)}" medium="image" type="image/jpeg" width="1000" height="1500"/>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Here Supply Co.</title>
    <link>${SITE}</link>
    <description>Simple tools for couples who want to get back to the person across the table.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
