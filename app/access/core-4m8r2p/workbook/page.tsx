import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "All the Way Here Workbook | Here Supply Co.",
  robots: { index: false, follow: false },
};

export default function CoreWorkbook() {
  redirect("/downloads/all-the-way-here-print-edition.pdf");
}
