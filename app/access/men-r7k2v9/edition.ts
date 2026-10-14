import { MEN_COURSE, MEN_LESSONS, MEN_MOVEMENTS } from "../../men/men-course";
import type { ShellEdition } from "../course-shell";

/** The rail for the men's edition. */
export const MEN_EDITION: ShellEdition = {
  title: "All the Way Here · Men",
  root: MEN_COURSE.root,
  lessons: MEN_LESSONS,
  movements: MEN_MOVEMENTS,
  footLinks: [
    { href: MEN_COURSE.root, label: "Course home" },
    { href: "/downloads/men/all-the-way-here-mens-edition.pdf", label: "Print course book" },
    { href: MEN_COURSE.focus, label: "Focus Protocol" },
    { href: "/men/coaching", label: "Coaching with Chris" },
  ],
  progressPrefix: MEN_COURSE.progressPrefix,
};
