import type { Metadata } from "next";
import { Footer, Header } from "../components";
import { WorkingSessionForm } from "./working-session-form";

export const metadata: Metadata = {
  title: "Questions and Support | Here Supply Co.",
  description: "Contact Chris about Here Supply Co. access, purchases, refunds, or the material.",
  robots: { index: false, follow: true },
};

export default function SupportPage() {
  return <main id="main-content" className="working-page">
    <Header />
    <section className="working-hero">
      <div><p className="section-label">QUESTIONS AND SUPPORT</p><h1>Start with the<br /><em>real question.</em></h1></div>
      <div><p>Here Supply Co. has one free guide and one complete paid course. There is no coaching package or subscription to sort through right now.</p><p>If you have a purchase, access, refund, partnership, or material question, send it to Chris. Do not include passwords or payment-card information.</p><a className="button primary" href="#contact-chris">Contact Chris <span>→</span></a></div>
    </section>
    <section className="working-intake" id="contact-chris"><div><p className="section-label">REACH OUT TO CHRIS</p><h2>A real person will read this.</h2><p>Share one concrete question or moment. Chris can help with the course, access, purchases, or applying an educational practice. This is not therapy, medical care, crisis care, or marriage counseling.</p><p>Use the form beside this note. It sends your message directly to Chris.</p></div><WorkingSessionForm /></section>
    <Footer />
  </main>;
}
