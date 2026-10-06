import { boardFeed } from "../../lib/feed";

/** Marriage and Relationship Tips board. See lib/feed.ts. */
export async function GET() {
  return boardFeed("marriage-and-relationship-tips");
}
