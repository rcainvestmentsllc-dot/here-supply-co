/**
 * The Pinterest feeds.
 *
 * Every pin lives in content/pins.json and its image in public/pins (render
 * with `python3 scripts/build-pins.py`). Each Pinterest board reads its own
 * RSS feed once a day and turns every new item into a Pin:
 *
 *   /rss.xml                          Marriage and Relationship Tips
 *   /rss/weekly-couples-check-in      Weekly Couples Check In
 *   /rss/phone-free-evenings          Phone Free Evenings
 *
 * A pin only shows up in its feed once its publish time has passed, so adding
 * pins with future dates is how they get scheduled.
 */
import data from "../content/pins.json";

export const SITE = "https://heresupplyco.com";

export interface Pin {
  slug: string;
  publish: string;
  board: string;
  link: string;
  title: string;
  description: string;
}

export const BOARDS = data.boards as Record<string, string>;
export const PINS = data.pins as Pin[];

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function livePins(board: string, now = Date.now()): Pin[] {
  return PINS.filter((p) => p.board === board && Date.parse(p.publish) <= now).sort(
    (a, b) => Date.parse(b.publish) - Date.parse(a.publish),
  );
}

export function boardFeed(board: string, now = Date.now()): Response {
  const items = livePins(board, now)
    .map((p) => {
      const url = `${SITE}${p.link}?utm_source=pinterest&utm_medium=rss&utm_campaign=${board}&utm_content=${p.slug}`;
      const img = `${SITE}/pins/${p.slug}.jpg`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="false">${esc(p.slug)}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(p.publish).toUTCString()}</pubDate>
      <enclosure url="${esc(img)}" type="image/jpeg" length="0"/>
      <media:content url="${esc(img)}" medium="image" type="image/jpeg" width="1000" height="1500"/>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Here Supply Co. | ${esc(BOARDS[board] ?? board)}</title>
    <link>${SITE}</link>
    <description>Simple tools for couples who want to get back to the person across the table.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=1800" },
  });
}
