import { boardFeed } from "../../../lib/feed";

/** Pinterest board feed. See lib/feed.ts. */
export async function GET() {
  return boardFeed("weekly-couples-check-in");
}
