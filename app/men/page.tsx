import type { Metadata } from "next";
import { menMeta } from "./meta";
import { MenHome } from "./home";

/** The men's page is the homepage now; the worker sends /men to /. This copy only serves local builds. */
export const metadata: Metadata = menMeta({
  title: "Here Supply Co. | Coaching and a Course for Men Who Carry a Lot",
  description: "Coaching and a nine week course for men carrying a business or a career, a family, and a lot in their heads.",
  path: "/",
});

export default function MenPage() {
  return <MenHome />;
}
