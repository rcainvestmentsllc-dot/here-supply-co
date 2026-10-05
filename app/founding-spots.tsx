"use client";

import { useEffect, useState } from "react";

/**
 * "37 of 50 founding spots left". Reads /api/founding; if that fails the
 * static line still makes sense on its own.
 */
export function FoundingSpots({ className }: { className?: string }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/founding")
      .then((r) => r.json())
      .then((d: { left?: number | null }) => {
        if (live && typeof d.left === "number") setLeft(d.left);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  return (
    <span className={className}>
      {left === null
        ? "Founding price for the first 50 couples, then $99."
        : left > 0
          ? `${left} of 50 founding spots left at $49. Then it goes to $99.`
          : "Founding spots are gone. The price is going to $99."}
    </span>
  );
}
