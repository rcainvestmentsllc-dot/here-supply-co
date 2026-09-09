import type { Metadata } from "next";
import { PlainLink as Link } from "../../../plain-link";
import { InteractiveWorkbook } from "./workbook-form";

export const metadata: Metadata = {
  title: "All the Way Here Workbook | Here Supply Co.",
  robots: { index: false, follow: false },
};

export default function CoreWorkbook() {
  return <main id="main-content" className="workbook-shell">
    <header className="access-header"><Link href="/access/core-4m8r2p">← ALL THE WAY HERE</Link><span>PRIVATE WORKBOOK</span></header>
    <InteractiveWorkbook />
  </main>;
}
