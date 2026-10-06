/**
 * The Pinterest feed.
 *
 * Pinterest reads /rss.xml once a day and turns every new item into a Pin on
 * the "Marriage and Relationship Tips" board. Each item needs a vertical image
 * (1000 x 1500) under /pins and a link on heresupplyco.com.
 *
 * To publish a new article to Pinterest automatically: add the article page,
 * make its pin image, then add one entry at the TOP of this list.
 *
 * Articles already scheduled by hand through the bulk upload (the Sunday
 * Board, the check, and the five older guides) are deliberately left out so
 * Pinterest does not get the same Pin twice.
 */
export interface FeedItem {
  title: string;
  description: string;
  path: string;
  image: string;
  published: string; // YYYY-MM-DD
}

export const FEED_ITEMS: FeedItem[] = [
  {
    title: "Put the Phone Away Before the Car Moves",
    description:
      "Set the route, choose who can reach you, then drive with your eyes up. A simple setup for navigation, important contacts, and crossing the street without the downward glance.",
    path: "/resources/phone-away-before-driving",
    image: "/pins/phone-away-driving.jpg",
    published: "2026-10-06",
  },
  {
    title: "What Felt Different When I Went Back to Clemson",
    description:
      "Everyone was looking down. A short story about missed moments of connection and three small ways to make looking up the default again at home, in the car, and around people.",
    path: "/resources/look-up-at-clemson",
    image: "/pins/look-up-clemson.jpg",
    published: "2026-10-06",
  },
];
