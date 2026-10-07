import type { Metadata } from "next";
import { Footer, Header } from "../../components";
import { CoachingForm } from "../coaching-form";

export const metadata: Metadata = {
  title: "Weekly Check In | Thirty Days With Chris",
  description: "The weekly check in for Thirty Days With Chris clients.",
  robots: { index: false, follow: false },
};

export default function CheckInPage() {
  return <main id="main-content" className="working-page">
    <Header />
    <section className="working-intake" id="check-in"><div><p className="section-label">THIRTY DAYS WITH CHRIS</p><h2>This week&rsquo;s<br /><em>check in.</em></h2><p>Five minutes. Be honest about what did not happen, that is the useful part. I will write back within 48 hours.</p></div><CoachingForm kind="checkin" /></section>
    <Footer />
  </main>;
}
