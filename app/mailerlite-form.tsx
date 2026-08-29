const GUIDE_URL = "/downloads/sunday-board-meeting.pdf";
const FIELD_NOTES_URL = "https://chrisavera.substack.com/subscribe";

export function SundayBoardSignupForm() {
  return (
    <div className="signup-card">
      <div className="signup-card-intro">
        <span>FREE 15-MINUTE MEETING GUIDE</span>
        <h3>Download it now.</h3>
        <p>No account, inbox hunt, or new system to manage. Open the PDF, print one copy, and put it between you this Sunday.</p>
      </div>

      <a className="signup-download" href={GUIDE_URL} download="see-the-same-week.pdf">
        Download the meeting guide <span aria-hidden="true">↓</span>
      </a>
      <p className="signup-download-note">Free PDF · Opens immediately</p>

      <div className="signup-notes">
        <div>
          <strong>Want an occasional note from Chris too?</strong>
          <p>Chris writes about attention, family, faith, and the work of coming back to what matters.</p>
        </div>
        <a href={FIELD_NOTES_URL} target="_blank" rel="me noreferrer">
          Read Chris on Substack <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
