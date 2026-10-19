import type { Metadata } from "next";
import { menMeta } from "./men/meta";
import { MenHome } from "./men/home";

const title = "Here Supply Co. | Coaching and a Course for Men Who Carry a Lot";
const description =
  "Coaching and a nine week course for men carrying a business or a career, a family, and a phone that never stops asking for more of them. Attention, steadiness, and a life outside your roles.";

export const metadata: Metadata = menMeta({ title, description, path: "/" });

export default function Home() {
  return <MenHome />;
}
