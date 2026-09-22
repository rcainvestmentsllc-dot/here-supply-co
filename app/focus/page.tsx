import { permanentRedirect } from "next/navigation";

/**
 * The Focus Protocol was folded into All the Way Here. The URL still gets
 * traffic from older links, so it forwards to the course rather than 404ing.
 */
export default function FocusRedirect(): never {
  permanentRedirect("/library");
}
