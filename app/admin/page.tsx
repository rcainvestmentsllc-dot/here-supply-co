import type { Metadata } from "next";
import { getEnv } from "../../lib/cloudflare-env";
import { requireAdmin } from "../../lib/admin";
import { PRODUCTS } from "../../lib/auth";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Operations | Here Supply Co.",
  robots: { index: false, follow: false },
};

type Row = Record<string, string | number | null>;

async function all(sql: string, ...binds: unknown[]): Promise<Row[]> {
  const env = getEnv();
  const stmt = env.DB.prepare(sql);
  const { results } = await (binds.length ? stmt.bind(...binds) : stmt).all<Row>();
  return results ?? [];
}

async function count(table: string): Promise<number> {
  const rows = await all(`select count(*) as n from ${table}`);
  return Number(rows[0]?.n ?? 0);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  await requireAdmin();
  const { msg } = await searchParams;

  const [subs, buys, purchases, recentSubs, hooks] = await Promise.all([
    count("subscribers"),
    count("purchases"),
    all("select email, product, source, created_at from purchases order by created_at desc limit 25"),
    all("select email, source, created_at, synced_at from subscribers order by created_at desc limit 15"),
    all(
      "select received_at, event, email, matched_product from webhook_log order by received_at desc limit 20"
    ),
  ]);

  const unmatched = hooks.filter((h) => !h.matched_product && h.email).length;

  return (
    <main id="main-content" className={styles.shell}>
      <header className={styles.head}>
        <p className={styles.eyebrow}>Operations</p>
        <h1>Who bought, who signed up, what the webhook saw.</h1>
      </header>

      {msg && <p className={styles.flash}>{msg}</p>}

      <div className={styles.stats}>
        <div><b>{buys}</b><span>Course access records</span></div>
        <div><b>{subs}</b><span>Email subscribers</span></div>
        <div className={unmatched ? styles.warn : undefined}>
          <b>{unmatched}</b><span>Recent webhooks that matched no product</span>
        </div>
      </div>

      <section className={styles.panel}>
        <h2>Grant access by hand</h2>
        <p className={styles.note}>
          The safety net under the webhook. If someone paid and cannot get in, put their email in
          here and they can sign in immediately.
        </p>
        <form className={styles.grantForm} method="post" action="/api/admin/grant">
          <input type="email" name="email" placeholder="buyer@example.com" required />
          <select name="product" defaultValue="core">
            {Object.values(PRODUCTS).map((p) => (
              <option key={p.slug} value={p.slug}>{p.label}</option>
            ))}
          </select>
          <button type="submit" name="action" value="grant">Grant access</button>
          <button type="submit" name="action" value="revoke" className={styles.ghost}>Revoke</button>
        </form>
      </section>

      <section className={styles.panel}>
        <h2>Recent webhook activity</h2>
        {hooks.length === 0 ? (
          <p className={styles.note}>
            Nothing received yet. Until MailerLite is pointed at{" "}
            <code>/api/webhooks/mailerlite</code>, purchases will not grant access automatically —
            use the form above.
          </p>
        ) : (
          <table className={styles.table}>
            <thead><tr><th>When</th><th>Event</th><th>Email</th><th>Matched</th></tr></thead>
            <tbody>
              {hooks.map((h, i) => (
                <tr key={i} className={!h.matched_product && h.email ? styles.rowWarn : undefined}>
                  <td>{String(h.received_at ?? "")}</td>
                  <td>{String(h.event ?? "—")}</td>
                  <td>{String(h.email ?? "—")}</td>
                  <td>{h.matched_product ? String(h.matched_product) : "no match"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className={styles.panel}>
        <h2>Course access ({buys})</h2>
        {purchases.length === 0 ? (
          <p className={styles.note}>No one has access yet.</p>
        ) : (
          <table className={styles.table}>
            <thead><tr><th>Email</th><th>Product</th><th>Source</th><th>When</th></tr></thead>
            <tbody>
              {purchases.map((p, i) => (
                <tr key={i}>
                  <td>{String(p.email)}</td>
                  <td>{String(p.product)}</td>
                  <td>{String(p.source)}</td>
                  <td>{String(p.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className={styles.panel}>
        <h2>Latest signups ({subs})</h2>
        {recentSubs.length === 0 ? (
          <p className={styles.note}>No signups yet.</p>
        ) : (
          <table className={styles.table}>
            <thead><tr><th>Email</th><th>Source</th><th>When</th><th>Synced to MailerLite</th></tr></thead>
            <tbody>
              {recentSubs.map((s, i) => (
                <tr key={i}>
                  <td>{String(s.email)}</td>
                  <td>{String(s.source)}</td>
                  <td>{String(s.created_at)}</td>
                  <td>{s.synced_at ? String(s.synced_at) : "not synced"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
