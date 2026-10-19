import { MEN_COURSE, MEN_MOVEMENTS, MEN_STEPS } from "../../men/men-course";
import type { ShellEdition } from "../course-shell";

/** The rail for the men's edition: The Solo, then the nine lessons. */
export const MEN_EDITION: ShellEdition = {
  title: "Carry It Well",
  root: MEN_COURSE.root,
  lessons: MEN_STEPS,
  movements: MEN_MOVEMENTS,
  footLinks: [
    { href: MEN_COURSE.root, label: "Course home" },
    { href: MEN_COURSE.book, label: "Print course book" },
    { href: MEN_COURSE.focus, label: "Focus Protocol" },
    { href: "/men/coaching", label: "Coaching with Chris" },
  ],
  progressPrefix: MEN_COURSE.progressPrefix,
};
