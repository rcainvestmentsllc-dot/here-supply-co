import { permanentRedirect } from "next/navigation";

/** Old name for the Sunday Board Meeting guide. */
export default function FieldGuideRedirect(): never {
  permanentRedirect("/sunday-board");
}
