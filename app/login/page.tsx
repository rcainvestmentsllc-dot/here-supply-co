import type { Metadata } from "next";
import { PlainLink as Link } from "../plain-link";
import { BrandWordmark } from "../components";
import { isProductKey, PRODUCTS } from "../../lib/auth";

export const metadata: Metadata = {
  title: "Log in | Here Supply Co.",
  description: "Log in to your purchased Here Supply Co. course.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; return_to?: string; error?: string; sent?: string }>;
}) {
  const params = await searchParams;
  const product = isProductKey(params.product) ? params.product : null;
  const returnTo = params.return_to ?? (product ? PRODUCTS[product].accessPath : "/library");

  return (
    <main id="main-content" className="access-shell">
      <header className="access-header">
        <Link href="/" aria-label="Here Supply Co. home"><BrandWordmark /></Link>
        <span>PRIVATE ACCESS</span>
      </header>
      <section className="access-intro" style={{ minHeight: "auto", paddingBottom: "clamp(60px,8vw,100px)" }}>
        <p className="section-label">LOG IN</p>
        <h1>{product ? `Get back into ${PRODUCTS[product].label}` : <>Get back into<br /><em>your course.</em></>}</h1>
        <p>Enter the email you used to buy your course. We&apos;ll send a one-time link that logs you straight in — no password to remember.</p>

        {params.error === "no_access" && (
          <p style={{ color: "#8d4a31", fontWeight: 700 }}>
            That email doesn&apos;t have access to this course yet. If you just purchased, check the email your receipt came to, or reach out below.
          </p>
        )}

        {params.sent === "1" ? (
          <div className="access-resource" style={{ maxWidth: 560 }}>
            <div>
              <span>CHECK YOUR EMAIL</span>
              <h2>We sent your login link.</h2>
              <p>If an account with that email owns this course, a one-time link is on its way. It expires in 15 minutes and works once. Not seeing it in a minute or two, check spam.</p>
            </div>
          </div>
        ) : (
          <form className="intake-form" action="/api/auth/request-link" method="post" style={{ maxWidth: 460 }}>
            <input type="hidden" name="return_to" value={returnTo} />
            {product && <input type="hidden" name="product" value={product} />}
            <label>
              <span>Your email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
            {!product && (
              <label>
                <span>Which course?</span>
                <select name="product" required defaultValue="">
                  <option value="" disabled>Choose your course</option>
                  {Object.values(PRODUCTS).map((p) => (
                    <option key={p.slug} value={p.slug}>{p.label}</option>
                  ))}
                </select>
              </label>
            )}
            <div className="intake-submit">
              <button type="submit" className="button primary">Send my login link <b>→</b></button>
              <p>Trouble logging in? Email us and we&apos;ll sort it out by hand.</p>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
