const FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSfw1xxS3wh6KoQHNQiNIVfIZ2Sz3aS42LoJCIxjOVb2qCEp4A/formResponse";

export function WorkingSessionForm() {
  // Show Google's real response. Loading a cross-origin iframe cannot prove
  // receipt and previously treated validation errors as successful delivery.
  return <form className="intake-form" action={FORM_ACTION} method="post" target="_blank" rel="noopener noreferrer">
      <div className="intake-row">
        <label><span>Your name</span><input name="entry.862303072" autoComplete="name" required /></label>
        <label><span>Your email</span><input type="email" name="emailAddress" autoComplete="email" required /></label>
      </div>

      <label><span>What brings you here?</span><select name="entry.1967387976" required defaultValue="">
        <option value="" disabled>Choose the closest answer</option>
        <option>I have a question about Here Supply Co.</option>
        <option>I need help with a purchase, access, or refund</option>
        <option>I want help applying one of the practices</option>
        <option>I am interested in a workshop or partnership</option>
      </select></label>

      <label><span>Which part of life or pattern needs the most attention?</span><select name="entry.1712930317" required defaultValue="">
        <option value="" disabled>Choose one starting point</option>
        <option>Phone habits and divided attention</option>
        <option>Work following me home</option>
        <option>Pressure, reactivity, or shutting down</option>
        <option>Connection with my partner or spouse</option>
        <option>Presence with my children</option>
        <option>Friendship, isolation, or life outside work</option>
        <option>Work, risk, or personal leadership</option>
        <option>Faith or interior life</option>
        <option>A practical product or support question</option>
        <option>Something else</option>
      </select></label>

      <label><span>What is happening right now?</span><small>Describe one recent moment. Concrete is more useful than your whole life story.</small><textarea name="entry.2097188110" rows={6} required /></label>

      <fieldset><legend>Where are you in the Here Supply Co. experience?</legend>
        <label><input type="radio" name="entry.2129737470" value="I have not started yet" /> <span>I have not started yet</span></label>
        <label><input type="radio" name="entry.2129737470" value="I am using the Sunday Board Meeting" /> <span>I am using the Sunday Board Meeting</span></label>
        <label><input type="radio" name="entry.2129737470" value="I am inside All the Way Here" /> <span>I am inside All the Way Here</span></label>
      </fieldset>

      <label><span>What would make this contact useful?</span><small>Name the decision, practice, or next step you want to leave with.</small><textarea name="entry.752295108" rows={5} required /></label>

      <label className="intake-scope"><input type="checkbox" required /><span>I understand that Here Supply Co. provides educational tools and implementation support, not therapy, marriage counseling, medical care, or crisis services.</span></label>

      <div className="intake-submit"><button type="submit">Send to Chris<b>→</b></button><p>A confirmation page opens in a new tab. If it asks you to correct an answer, finish that step there. Do not include passwords or payment-card information.</p></div>
    </form>;
}
