export function SundayBoardMeetingVideo() {
  // Keep the complete conversation in one media file so its timeline is seekable.
  return (
    <div className="sunday-film-player">
      <video
        controls
        playsInline
        preload="metadata"
        poster="/assets/video/chris-rhea-at-home-enhanced.png"
        aria-label="Chris and Rhea introduce the Sunday Board Meeting"
      >
        <source src="/assets/video/sunday-board-meeting.mp4" type="video/mp4" />
        <track kind="captions" src="/assets/video/sunday-board-meeting-captions.vtt" srcLang="en" label="English" default />
        Your browser cannot play this video. You can still download the free guide below.
      </video>
      <div>
        <span>FULL VIDEO</span>
        <strong>The Sunday Board Meeting</strong>
        <small>Chris + Rhea · 5 minutes 34 seconds</small>
      </div>
    </div>
  );
}
