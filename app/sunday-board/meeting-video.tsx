"use client";

import { useState } from "react";

export function SundayBoardMeetingVideo() {
  const [part, setPart] = useState<1 | 2>(1);
  const isFirstPart = part === 1;

  return (
    <div className="sunday-film-player">
      <video
        key={part}
        controls
        playsInline
        autoPlay={!isFirstPart}
        preload="metadata"
        poster={isFirstPart ? "/assets/video/sunday-board-meeting-poster.jpg" : undefined}
        aria-label="Chris and Rhea introduce the Sunday Board Meeting"
        onEnded={() => {
          if (isFirstPart) setPart(2);
        }}
      >
        <source src={`/assets/video/sunday-board-meeting-part-${part}.mp4`} type="video/mp4" />
        {isFirstPart && <track kind="captions" src="/assets/video/sunday-board-meeting-captions.vtt" srcLang="en" label="English" default />}
        Your browser cannot play this video. You can still download the free guide below.
      </video>
      <div>
        <span>{isFirstPart ? "PLAYING" : "CONTINUING"}</span>
        <strong>The Sunday Board Meeting</strong>
        <small>{isFirstPart ? "Chris + Rhea · full conversation" : "Chris + Rhea · the rest of the conversation"}</small>
      </div>
    </div>
  );
}
