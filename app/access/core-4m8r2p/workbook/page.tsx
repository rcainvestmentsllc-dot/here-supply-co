import type { Metadata } from "next";
import { PlainLink as Link } from "../../../plain-link";
import { InteractiveWorkbook } from "./workbook-form";

export const metadata: Metadata = {
  title: "Iron Compass Core Workbook",
  robots: { index: false, follow: false },
};

export default function CoreWorkbook() {
  return <main id="main-content" className="workbook-shell">
    <header className="access-header"><Link href="/access/core-4m8r2p">← CORE LIBRARY</Link><span>PRIVATE WORKBOOK</span></header>
    <InteractiveWorkbook />
  </main>;
}
