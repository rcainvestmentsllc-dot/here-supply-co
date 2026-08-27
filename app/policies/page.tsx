import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "../components";
import { CONTACT_FORM } from "../data";
import styles from "./policies.module.css";

export const metadata: Metadata = {
  title: "Policies | Iron Compass Institute",
  description: "Refund, privacy, and educational-use policies for Iron Compass Institute.",
  alternates: { canonical: "/policies" },
};

export default function Policies() {
  return (
    <main id="main-content" className="site">
      <Header />
      <section className={styles.hero}>
        <p className="kicker">IRON COMPASS INSTITUTE</p>
        <h1>Plain-language<br /><em>policies.</em></h1>
        <p>What happens when you buy, subscribe, or ask for help.</p>
        <small>Last updated August 26, 2026</small>
      </section>
      <section className={styles.body}>
        <nav aria-label="Policy sections">
          <a href="#refund">Refunds</a>
          <a href="#privacy">Privacy</a>
          <a href="#use">Educational use</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className={styles.sections}>
          <section id="refund">
            <p>01 · REFUNDS</p>
            <h2>14-day refund window</h2>
            <p>If Focus Protocol or Iron Compass Core is not a useful fit, request a refund within 14 calendar days of the original purchase. Use the contact form and include the email address used at checkout so the purchase can be located.</p>
            <p>Approved refunds are returned to the original payment method. Access to the purchased material may end after a refund. The time it takes to appear in your account depends on the payment provider and your financial institution.</p>
          </section>
          <section id="privacy">
            <p>02 · PRIVACY</p>
            <h2>The information this site uses</h2>
            <p>When you request the Sunday Board, your email address is collected so the printable and five related follow-up emails can be delivered. MailerLite processes those subscriptions, and every marketing email includes an unsubscribe option.</p>
            <p>Purchases are processed through MailerLite and Stripe. Iron Compass may receive the contact and transaction details needed to deliver the product, provide support, and handle refunds. Iron Compass does not receive your full payment-card number.</p>
            <p>The contact form is provided through Google. When you use it, Google and Iron Compass receive the information you choose to submit. The site may also generate ordinary technical logs through its hosting providers. Iron Compass does not sell personal information.</p>
            <p>You may ask to review or delete the personal information Iron Compass controls by using the contact form. Some transaction records may need to be retained for accounting, fraud prevention, or legal obligations.</p>
          </section>
          <section id="use">
            <p>03 · EDUCATIONAL USE</p>
            <h2>Practical education, not professional care</h2>
            <p>Iron Compass materials are educational tools for personal use. They are not medical care, mental-health treatment, couples therapy, legal advice, or financial advice. Use your judgment and seek a qualified professional when the situation calls for one.</p>
            <p>Purchased access is for the buyer’s personal use. Please do not republish, resell, or publicly distribute the videos, lesson links, manuals, or worksheets.</p>
          </section>
          <section id="contact">
            <p>04 · CONTACT</p>
            <h2>Questions or refund requests</h2>
            <p>Use the contact form and include the email address connected to your signup or purchase. Do not send payment-card information through the form.</p>
            <a className="button dark" href={CONTACT_FORM} target="_blank" rel="noreferrer">Contact Chris <span>→</span></a>
          </section>
        </div>
      </section>
      <section className={styles.close}><p>Ready to start small?</p><Link href="/sunday-board#get-board">Start the Sunday Board Meeting <span>→</span></Link></section>
      <Footer />
    </main>
  );
}
