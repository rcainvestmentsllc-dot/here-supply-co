# Here Supply Co. launch setup

Updated September 9, 2026. This is a prepared configuration and execution record, not a claim that the new domain, checkout, or emails are live.

## The agreed simple system

Chris wants the fewest moving parts and is comfortable using MailerLite where it helps. Keep the existing MailerLite digital product connected to Stripe. One $99 purchase delivers one automatic access email. The course stays on the existing website. HostGator will manage the new domain and its DNS. Retain the existing Sites website hosting unless Chris specifically requests moving the application to a different hosting platform.

There is no need to add WordPress, a new course platform, Zapier, a custom payment integration, a second email provider, or another hosting subscription to accomplish this launch.

| Service | Job | What a customer sees |
| --- | --- | --- |
| HostGator | Register and manage the domain and DNS; manage the mailbox if included in the existing account | heresupplyco.com and a reply address on that domain |
| Existing Sites website | Serve the public pages, lessons, videos, and workbook | Here Supply Co. and All the Way Here |
| MailerLite digital product | Checkout presentation, product delivery, purchase/access email | One branded checkout and an email with the course link |
| Stripe | Process payment, payouts, refunds, and payment records | Secure payment; a separate receipt only if configured |
| Substack | Existing optional public writing/newsletter subscription | An optional link separate from the purchase |

The free Sunday Board guide remains an immediate download. Marketing email is optional and does not control delivery of something a customer bought. Keep the old signup sequence off until its copy, sender, consent, and purpose have been aligned.

## Preferred domain

**heresupplyco.com** is the preferred address. It matches the approved name exactly.

On September 9, direct Verisign .com RDAP requests returned HTTP 404 (no registration record) for heresupplyco.com, heresupplycompany.com, and allthewayhere.com. This is a registry availability signal, not an acquired domain or a guaranteed HostGator checkout offer. Public exact-name searches did not establish a competing exact-name course business; this is not trademark or legal clearance.

HostGator's domain availability, cart total, renewal amount, and privacy options still need to be inspected. No domain was purchased. Obtain approval for the actual named purchase and its cost before payment. Do not add a hosting plan simply to register the domain.

## HostGator and website configuration

1. Open the existing HostGator account and record its relevant hosting plan, domain, mailboxes, and existing DNS records. Preserve the current Iron Compass domain and mail service.
2. Obtain heresupplyco.com after confirming the actual first-year total, renewal, term, optional privacy charge, and Chris's approval.
3. Attach heresupplyco.com and www.heresupplyco.com to Sites project `appgprj_6a85f114c9ec8191bd4367f7004c5d3c`. Use the exact DNS values returned for these new hostnames.
4. Current Sites records for the old domain use apex targets `162.159.143.30` and `172.66.3.26`, and the subdomain target `custom-domains.chatgpt.site.`. Treat these as a reference only. New ownership verification values must come from the new hostname response.
5. Add only the required website records at HostGator. Do not replace nameservers or mail records as a shortcut. Verify both new hostnames and active SSL independently.
6. Choose the apex address as the canonical website. Verify the www redirect. Redirect the old website only after the new site and purchase/access path pass, preserving paths and existing buyer access.
7. Before the final build, set `NEXT_PUBLIC_SITE_URL=https://heresupplyco.com`. Set `NEXT_PUBLIC_SUPPORT_EMAIL` only to an actual working mailbox. Set `NEXT_PUBLIC_CORE_CHECKOUT_URL` to the tested product checkout URL.

The local source now has one shared place for the website and support addresses, so metadata, structured search data, sitemap, robots file, and course contact links can move together. The existing verified addresses remain the defaults until the replacement is ready.

## Email identity and delivery

Proposed sender name: **Chris at Here Supply Co.**

Proposed mailbox: **chris@heresupplyco.com**, subject to creation, inbound reply testing, and authentication. Do not set this as the sender before the mailbox exists. Keep the existing verified sender until the replacement passes.

- Verify incoming and outgoing mail for the new mailbox.
- Add the exact verification and DKIM records supplied by MailerLite. Merge any required SPF authorization into the existing SPF record; do not publish two separate SPF records at the same hostname.
- Review DMARC and alignment using the real providers and authenticated mail. Do not guess DKIM selectors, SPF includes, or a report-receiving mailbox.
- Set Reply-To to the verified Here Supply Co. mailbox.
- Send approved tests to Chris, then inspect the received sender, Reply-To, links, authentication results, and actual arrival.
- Distinguish the Stripe payment receipt from MailerLite's course-access email. Do not label a receipt-only test as successful course delivery.

## Product configuration

Existing product checkout: `https://checkout.mailerlite.com/checkout/34347`.

| Setting | Prepared value |
| --- | --- |
| Product name | All the Way Here |
| Parent brand | Here Supply Co. |
| Price | Existing one-time $99 USD |
| Checkout headline | Get All the Way Here |
| Description | A self-paced course for bringing your attention back, meeting pressure more steadily, and protecting the relationships and ordinary life that matter. Includes the Attention Reset, nine practical lessons, three captioned optional introductions, a 16-page workbook, a field card, and family tools. |
| Checkout logo | `public/assets/brand/here-supply-co-checkout-logo.png` |
| Product image | `public/assets/brand/all-the-way-here-checkout.jpg` |
| Delivery | External link to the verified website's `/access/core-4m8r2p` |
| Refund terms | Preserve the existing 14-day window |
| Confirmation headline | Your course is ready |
| Confirmation message | Thank you for purchasing All the Way Here. Open the course, download your workbook, and begin with the Attention Reset. Save your course link so you can return when you need it. |
| Confirmation button | Open All the Way Here |
| Marketing signup | Optional; course delivery must work without subscribing to marketing |
| Retired Focus product | Leave checkout 34346 and prior-buyer delivery unchanged |

MailerLite's documentation says the native order-confirmation email format is shared across digital products, with fulfillment details substituted for the purchased product. Inspect the scope before editing it. Preserve the native dynamic product and fulfillment fields and any other product's valid delivery. The existing account also contains Listings In Motion groups; do not change unrelated audiences, senders, or campaigns.

## Purchase email copy

Prepared product-specific copy is in `PURCHASE_EMAIL.md`. This has not been installed or sent. Use it directly only if the editor supports product-specific content. If the template is shared, use the generic version in that file with the actual native product-delivery block; keep the course-specific starting instructions on the course page.

## Verified MailerLite status

Direct account read on September 9:

- `Iron Compass | Sunday Board Signup Workflow` exists and is disabled.
- It contains five emails, scheduled for signup day and days 1, 3, 5, and 7.
- The sequence has sent zero emails and has zero subscribers queued.
- All five messages use `info@listingsinmotion.com` and `Chris at Iron Compass`.
- `Iron Compass | Sunday Board Signup` is inactive and has double opt-in enabled.
- The Core Buyers, Focus Buyers, and Sunday Board groups each have zero active subscribers.

This audit describes signup marketing, not the separate automatic product-purchase email. Current Stripe account details, payout destination, checkout options, purchase-email content, and purchase-email delivery have not been reverified.

## Support form

The local form now opens Google's actual response in a new tab. The previous hidden-frame implementation marked any response as received, even when Google could be showing an error. It no longer makes that unsupported claim.

Google Form title, questions, and choices must be aligned with the existing field IDs in `app/working-session/working-session-form.tsx`. In particular, use the new Here Supply Co. contact reasons and buyer-stage radio choices. After saving, make an approved test submission and independently verify the response was received. An on-screen confirmation alone is not proof Chris was notified.

## Final verification

- Both new domain variants resolve securely; the canonical address is consistent.
- Approved video cuts and captions are final.
- Checkout has the correct brand, price, product image, refund terms, and payment account.
- A successful payment produces the right confirmation and course-access email.
- A buyer who declines marketing still receives purchased access.
- A failed or abandoned payment does not trigger a course-delivery message.
- Course, videos, workbook save/print, downloads, and support work on phone and desktop.
- Replying to the access email reaches Chris.
- Old buyer links continue working after the domain migration.
- Refund handling is tested or documented without claiming automatic access revocation. The current course uses a shared unlisted link, not individual authenticated buyer accounts.

## Blocker and current validation

The browser integration refused HostGator access because its admin-enforced security-policy check was unavailable. It also prevented earlier access to the public site and checkout. This is an access blocker, not a reason to bypass browser controls. The documented MailerLite read connection and Sites connector still worked.

The local production build passed and all 25 automated checks passed after the domain-settings and support-confirmation fixes. Fresh visual browser testing remains blocked. The two empty course-related groups and the inactive signup form were subsequently renamed to Here Supply Co.; independent readback passed, and the exact changes are recorded in `mailerlite-name-alignment-2026-09-09.json`. No HostGator purchase, checkout edit, activation, customer email send, or public deployment occurred in this pass.

The Sites build helper rejected the project's existing conflicting package-manager/lockfile arrangement. The established bundled-pnpm production build succeeded. Preserve the existing dependencies and lockfiles; this helper limitation did not prevent validation.

## Source preservation

See `../../HERE_LAUNCH_STATE.md` for the exact committed source, push result, saved Sites version, and remaining publication status. Saving a version does not publish it.

## References

- [MailerLite digital products, checkout choices, and purchase email](https://www.mailerlite.com/help/create-a-digital-product)
- [Stripe payment confirmation, receipts, and fulfillment](https://docs.stripe.com/payment-links/post-payment)
- [MailerLite domain authentication](https://www.mailerlite.com/help/how-to-verify-and-authenticate-your-domain)
- [HostGator domain renewal reference](https://www.hostgator.com/help/article/generic-top-level-domains-gtlds-overview)
- [Verisign registration lookup for heresupplyco.com](https://rdap.verisign.com/com/v1/domain/heresupplyco.com)
