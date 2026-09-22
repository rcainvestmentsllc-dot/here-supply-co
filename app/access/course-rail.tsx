"use client";

import { useState, type ReactNode } from "react";
import styles from "./course.module.css";

/**
 * Wraps the rail's collapsible region. On desktop the CSS keeps it open and
 * the toggle hidden; below 960px it becomes a disclosure so the lesson list
 * doesn't push the lesson itself off the screen.
 */
export function RailDisclosure({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={open ? styles.railOpen : undefined}>
      <button
        type="button"
        className={styles.railToggle}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>Course contents</span>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {children}
    </div>
  );
}
