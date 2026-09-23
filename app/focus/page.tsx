import { permanentRedirect } from "next/navigation";

/**
 * The Focus Protocol is the opening practice inside All the Way Here. The URL
 * still gets traffic from older links, so it points to its place in the course.
 */
export default function FocusRedirect(): never {
  permanentRedirect("/library#focus-protocol");
}
