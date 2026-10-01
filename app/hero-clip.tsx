"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";

/**
 * A short, silent loop of Chris and Rhea from the real Sunday Board video.
 * It never plays for visitors who ask their device to reduce motion, and it
 * always has a visible pause control, since moving content that runs longer
 * than five seconds needs one.
 */
export function HeroClip() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, []);

  function toggle() {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <figure className={styles.heroClip}>
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/video/hero-chris-rhea-poster.jpg"
        aria-label="Chris and Rhea laughing together on their couch during a Sunday Board Meeting"
      >
        <source src="/assets/video/hero-chris-rhea-loop.mp4" type="video/mp4" />
      </video>
      <figcaption>
        <span>Chris and Rhea, during a real Sunday Board Meeting</span>
        <button type="button" onClick={toggle} aria-label={playing ? "Pause the video" : "Play the video"}>
          {playing ? "Pause" : "Play"}
        </button>
      </figcaption>
    </figure>
  );
}
