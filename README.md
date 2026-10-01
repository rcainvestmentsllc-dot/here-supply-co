# Here Supply Co.

The website for heresupplyco.com: the free Sunday Board Meeting, the one minute
drifting check, and the All the Way Here course.

## How it runs

- The site is a vinext (Next.js style) app in `app/`, served by a Cloudflare
  Worker named `here-supply-co` in Chris's Cloudflare account.
- Every push to `main` deploys automatically through
  `.github/workflows/deploy.yml` (pnpm install, build, `wrangler deploy`).
  The workflow needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
  repository secrets.
- DNS for heresupplyco.com is in Cloudflare. Email for hello@heresupplyco.com
  stays on the existing mailbox host (MX `mail.heresupplyco.com`); do not touch
  those records when changing the website.
- The site no longer runs on ChatGPT Sites.

## The course password

Everything under `/access` and every paid file in `/public/downloads` sits
behind one course password, checked in the Worker before the app runs. See
`lib/course-pass.ts` for how it works and how to change it. Only a hash of the
password is stored in the code.

Buyers get the password and a one tap unlock link in the MailerLite product
confirmation email. If the password changes, update the MailerLite product's
delivery URL (`?key=`) and the confirmation email at the same time.

## Checkout

The $99 checkout is MailerLite checkout 34347 with Stripe. The product delivers
`https://heresupplyco.com/access/core-4m8r2p?key=...` and adds buyers to the
"Here Supply Co. | All the Way Here Buyers" group.

## Working on it

```bash
pnpm install
pnpm run build
pnpm test        # builds, then runs tests/*.test.mjs against the built Worker
npx wrangler dev --config dist/server/wrangler.json --local   # full local Worker, including the password gate
```
