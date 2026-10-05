import { getEnv } from "../../../lib/cloudflare-env";
import { FOUNDING_LIMIT, FOUNDING_OPEN, foundingSpotsLeft, PRICE_NOW } from "../../../lib/founding";

/** Founding spots left, for the counter on the course and home pages. */
export async function GET() {
  const left = FOUNDING_OPEN ? await foundingSpotsLeft(getEnv()) : 0;
  return Response.json(
    { open: FOUNDING_OPEN, limit: FOUNDING_LIMIT, left, price: PRICE_NOW },
    { headers: { "Cache-Control": "public, max-age=60" } }
  );
}
