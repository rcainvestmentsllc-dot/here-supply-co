# Here Supply Co. continuation checkpoint

## September 21, 2026: Here Supply domain and website are live

Chris authorized the domain repair and publication of the prepared rebrand. `https://heresupplyco.com` publicly serves Here Supply Co.; `https://www.heresupplyco.com` permanently redirects to the HTTPS apex, preserving paths and queries. Both domain and SSL statuses are active. HostGator authoritative DNS was already correct, so no DNS edits were needed. Refreshing the Sites connections removed the initial public 404 responses.

The rebrand was published as version 22 with source `d890a5fc41f754d177f6f6cdcb9be00e64ea4217`, independently verified on remote main. All 26 checks passed. The website origin and canonical links now use Here Supply, and the Sites display title is Here Supply Co. Public loading, HTTPS, www redirects, page titles, the approved logo, sitemap, and robots were checked; the live homepage was visually inspected. See `../HERE_LAUNCH_STATE.md` for exact IDs, certificate dates, and evidence. Previous unpublished-site/source-push/DNS blockers below are superseded. Existing checkout/email/support settings and unrelated services were preserved; the rest of the launch checklist was not reverified in this task.

Updated: 2026-09-09

## Latest pause checkpoint, September 9 afternoon

- Next design fix, reported by Chris: `/resources` and `/policies` still use the old “70s colors.” Match the current approved Here Supply palette and visually verify both when work resumes. Chris explicitly requested a fix-list entry only, with no changes now.

Chris asked to stop after wrapping up email and save the remaining launch work for next time. Read `../HERE_LINKS_AND_STATUS.md` and the top of `../HERE_LAUNCH_STATE.md` first; they supersede older purchase/browser/mailbox statuses below.

- heresupplyco.com purchase with privacy completed, $28.14, order 1919068535. Do not repurchase or compare registrars.
- hello@heresupplyco.com exists and is added to macOS Internet Accounts, displayed as Heresupplyco with Mail On and Notes Off. Secure server gator3055.hostgator.com; TLS verified on IMAP 993 and SMTP 465. Send/receive test still pending. No password in project notes.
- Website DNS/SSL remain pending. HostGator portal apex record mismatch is with support agent Chetan; exact correction request sent, no resolution yet confirmed.
- Old domain auto-renew is Off; old mailbox and shared hosting remain during migration.
- Stripe is connected in MailerLite, but the $99 product still has old branding and delivery. Native checkout, access email, sender authentication, and received-email testing remain.
- Current Here Supply build stays local at http://localhost:3000; course and workbook respond. Public Sites version remains 21 with old Iron Compass branding. Original ChatGPT URL https://iron-compass-check.chrisavera.chatgpt.site opens successfully.
- Remaining deployment/source-push recovery and exact IDs are in the root checkpoint. Pause now; no automatic continuation was scheduled.

## September 9 launch setup and email clarification

Chris asked to finish the launch setup through HostGator, find the best available Here Supply Co. address, and use the easiest practical system. After discussing Stripe and email delivery, he confirmed MailerLite is fine where helpful and favored `heresupplyco.com`.

- The working choice remains the existing MailerLite digital product connected to Stripe, with one purchase/access email and the course on the existing website. The free guide stays an immediate download. Do not add custom payment code or another platform just to replace the supported integration.
- A current Verisign check found no .com registration record for `heresupplyco.com`, `heresupplycompany.com`, or `allthewayhere.com`. The exact-match address is preferred, but HostGator's final availability/price and the purchase are unverified.
- Sites currently reports public version 21 and active SSL for the existing apex and www Iron Compass domains.
- The current MailerLite signup automation and embedded signup form are inactive. Five signup emails have sent nothing, and they still use `info@listingsinmotion.com` / `Chris at Iron Compass`. Product purchase emails are separate and have not been reverified.
- Added central public website and support-address settings and applied them to metadata, search data, sitemap, robots, and course contact links. Existing working addresses remain defaults until the new domain/mailbox are ready.
- Removed the support form's unsupported hidden-frame success message. It now opens Google's real confirmation or validation response in a new tab. Live field alignment and received-submission testing are still required.
- Prepared the exact launch configuration, purchase email, and founding invitation under `launch/`. Read `launch/LAUNCH_SETUP.md` before continuing live account work.
- Production build and all 25 checks pass. Browser access is blocked by an unavailable admin security-policy check, so HostGator changes, checkout edits, received-email testing, and fresh visual verification could not be completed. Do not switch browsers or bypass controls to work around this denial.
- Later in this pass, renamed the two empty MailerLite groups to `Here Supply Co. | All the Way Here Buyers` and `Here Supply Co. | Sunday Board`, and the inactive embedded form to `Here Supply Co. | Sunday Board Signup`. Independent readback verified names, unchanged subscriber counts, and inactive form/automation. Exact changes are in `launch/mailerlite-name-alignment-2026-09-09.json`. No domain purchase, checkout edit, customer send, or public deployment occurred. Source preservation and saved-version results are recorded in `../HERE_LAUNCH_STATE.md`.
- The unrelated Greenville-video request was canceled as an accidental paste. Continue Here Supply Co.; no Greenville changes were made.

## September 9 approved surf logo

Chris approved the revised mid-century surf logo after rejecting the first geometric concept as too modern. His explicit “Use this direction” approval applies to the soft ocean-blue HERE lettering, navy SUPPLY CO., and integrated wave, coastal headland, coral clouds, and sun. Wave and mountain imagery are now allowed when useful. This supersedes older no-wave instructions below.

- Shared headers, footer, and private course use the v2 vector logo. The workbook uses matching screen and print treatments.
- Browser and Apple-touch icons use the coastal emblem.
- The Sunday Board guide, 16-page workbook, field card, on-page guide preview, and prepared checkout image all carry the approved logo.
- Reusable transparent PNGs, true SVGs, icon, preview, and usage notes are in `output/brand/here-supply-co-v2/`.
- The site build and all 22 rendered checks passed. Twenty-five layout checks across five routes and five widths found no overflow, header collision, or unloaded logo. Desktop and mobile views and representative PDFs were visually checked.
- The final footer spacing correction was visually checked at desktop and phone widths; both have clear breathing room and no overflow.
- Work remains local. No commit, push, public deployment, domain change, or live checkout edit was performed.

## Final local course pass, September 8

The local All the Way Here learner experience is complete. Launch plumbing is still intentionally separate and approval-gated.

- The course opens with a four-step guided start: print or open the workbook, complete the three-day Attention Reset, take one lesson into real life, and use the family tools only when they fit.
- The browser workbook now includes its own editable Attention Reset page before lesson one. It matches the downloadable 16-page workbook and saves entries on the learner's device.
- Every one of the nine lessons includes a real-life practice, a field kit, a research note, a matching printable page, progress control, and explicit previous/next navigation.
- The final lesson now hands the learner into a 30-day plan instead of ending at a generic workbook link. Marking it complete produces a clear nine-lessons-complete state and asks the learner to choose two practices to keep.
- The three module videos are labeled as optional introductions. None of the course is locked behind video. All three videos load completely in the browser and include synchronized English captions.
- The Attention Reset now includes the Clemson observation, phone-home drawer or charging-station practice, grayscale, feed and notification controls, Apple Watch as a limited people-only relay, phone-free driving, eyes-up street crossing, and a model-first family approach that does not turn the buyer into the phone police.
- The family toolkit includes The Family Screen Reset, The Weekly Tradition Builder, and The Side-by-Side Teen Check-In. The separate free Sunday Board Meeting remains a linked companion practice rather than duplicate paid content.
- The stale uncaptained sales bridge was removed from the private reset. The course now explains what the optional videos do and sends the learner directly into the full course.
- The support link now lands on the actual `contact-chris` form. Founding-circle email subjects use All the Way Here rather than the retired Life at Hand name.
- Desktop and narrow-phone browser checks pass for the course home, Attention Reset, browser workbook, and all nine lessons. The final mobile pass fixed the one remaining long-word clip in the Keep heading. No checked course route has horizontal overflow.
- The production build succeeds and all 22 rendered buyer-and-learner-path checks pass. Lint reports zero errors and 16 existing static-image optimization advisories.

This finished state is local at `http://localhost:3000/access/core-4m8r2p`. It has not been published, legally cleared, or copied into the old MailerLite checkout and delivery flow. Do not call the live business launch-ready until the checkout name and image, confirmation page, access email, public domain, and final form language are aligned and verified with Chris's approval.

## Current verified local state, September 7

Chris approved `HERE SUPPLY CO.` as the working parent identity for the local buyer experience. The descriptor is `TOOLS FOR SHOWING UP IN REAL LIFE`, the $99 course is `All the Way Here`, and the free starting practice is `The Sunday Board Meeting`.

- The homepage, sales page, resources, About page, support page, private course, lessons, browser workbook, metadata, footer, navigation, printables, and checkout art now use the same Here Supply Co. parent identity.
- The working identity is a clean, code-native `HERE / SUPPLY CO.` wordmark with the small descriptor and a restrained segmented board-stringer rule. It does not use the rejected spiral, wave-and-mountain badge, fake heritage seal, or literal surf icon. It is a strong working system, not a claim of final trademark or legal clearance.
- The homepage course presentation is a centered three-movement editorial sequence for Return, Lead, and Keep. The photos use intentional landscape crops on desktop and stacked crops on phones.
- The course sales page now presents the 16-page workbook, one-page All the Way Here Field Card, and three family tools as real, readable resources. The free Sunday Board Meeting remains a separate free practice and is not duplicated as a paid worksheet.
- The downloadable Sunday Board Meeting guide, 16-page All the Way Here workbook, and one-page All the Way Here Field Card have been rebuilt with Here Supply Co. parent branding in the same bright Pacific palette and inspected as rendered pages.
- The current palette is deep Pacific navy, clear ocean blue, pale sea glass, warm paper, coral, and a small amount of sun yellow. Muddy olive, brown, mustard, decorative vertical bars, and comic-book styling are out.
- Chris-only photography remains small and author-like. Large visual areas belong to purposeful relationship and ordinary-life scenes.
- Desktop and phone browser checks pass on the homepage, free practice, sales page, resources, About page, support page, private course, workbook, and a representative lesson. None of the checked routes has horizontal overflow.
- Focus Mode now shows a believable paper planning session with a normal pencil and the phone out of reach. Date Night is a natural phone-free coastal walk with no table-setting artifacts. The Third Place is an after-ride conversation with complete bikes secured in the background and no fake repair work.
- The September 7 production build succeeds and all 20 rendered buyer-path checks pass after the final image, contrast, PDF, and checkout-cover fixes. Lint reports no errors; its remaining warnings are the existing static-image performance advisories.

This state is local only. It has not been published, legally cleared, or pushed into MailerLite checkout.

## September 7 live launch audit

The local course is substantially stronger than the currently published buyer experience, but the business is not ready to sell from the public site yet.

- The live site at `https://ironcompassinstitute.com` is still the August Iron Compass version. It still presents Iron Compass, Focus Protocol, and Iron Compass Core as three paths.
- The live private delivery page is also still the older Iron Compass Core course. It does not contain the new four-step onboarding, 16-page workbook, family toolkit, Field Card, current module edits, or the final image corrections.
- MailerLite checkout `34347` is live at $99, but it still says `Get Iron Compass Core` and `Iron Compass Core`, uses the old description, and has no product image. Do not send paid traffic to it until the product, confirmation, email, and delivery language are aligned.
- The Google support form is reachable and its entry IDs still match the local embedded form, but the public form title and questions still use the old Iron Compass language. The radio choices also need to be changed to the current buyer stages before relying on submissions.
- The Sites project is public and healthy on version 21 with both `ironcompassinstitute.com` and `www.ironcompassinstitute.com` active. The new local source has not been committed, pushed, saved as a Sites version, or deployed.
- A September 7 Verisign registry check found `sundayboard.com` registered and found no current `.com` registry record for `getsundayboard.com`, `sundayboardlife.com`, `joinsundayboard.com`, or `allthewayhere.com`. Cloudflare's live search offered `allthewayhere.com` at $10.46 for registration and $10.46 for renewal. This is a point-in-time availability and price screen, not legal or trademark clearance.
- `sundayboard.com` is not parked. It is an active work-management product branded Sunday. That creates avoidable search and naming confusion for `Sunday Board` as the umbrella business, even if the free practice remains `The Sunday Board Meeting`.

Current working architecture, approved for local implementation:

- **Parent brand:** Here Supply Co.
- **Descriptor:** Tools for showing up in real life
- **Paid course:** All the Way Here
- **Free practice:** The Sunday Board Meeting
- **System inside the course:** Return, Lead, Keep

No Here Supply Co. domain has been purchased and the name has not received legal clearance. Do not buy a domain or republish the site without Chris's approval at the moment of action. Preserve the existing Iron Compass domain and redirect it only after a successful migration rather than dropping it.

## Earlier Sunday Board identity proof, September 1

Chris first approved building one focused proof before another full rebrand. The local homepage tested `SUNDAY BOARD` as the umbrella brand with the promise `Do not drift from the life you built.` The surf influence is culture and design language, not a requirement that the buyer surf.

- That proof was local and homepage-only at the time. It was not published, committed, or reflected in MailerLite.
- The wordmark is code-native typography with no wave, mountain, compass, spiral, or generated badge.
- The visual system uses sunlit canvas, deep Pacific navy, clear ocean blue, faded coral, and warm sun. It avoids muddy olive, mustard, comic-book art, and beach-shop clichés.
- The hero uses one natural editorial conversation scene with a subtle surfboard and a phone set aside. The project asset is `public/assets/brand/sunday-board-hero-v1.jpg`.
- A separate code-built course cover shows how `SUNDAY BOARD` can hold the complete Return, Lead, Keep course without another branded product name.
- Desktop and phone browser QA found no horizontal overflow, clipped type, or overlap between the image caption and course cover.
- The production build succeeds and all 20 rendered buyer-path checks pass.

Chris later asked to continue the direction across the local site. The September 2 checkpoint above supersedes the homepage-only restriction. Publication and MailerLite changes still require explicit approval.

## Active handoff, September 1

### Fresh-task verification update

The guided-course continuation was completed and verified locally after the handoff:

- Finished the visual system for the welcome path, progress-aware next lesson, four-step onboarding, workbook setup, Attention Reset, support path, and optional family toolkit.
- Moved the private course and workbook into a brighter Pacific daylight palette: sunlit paper, clearer ocean blue, eucalyptus, adobe, marigold, and deep pine reserved for high-contrast sections.
- Dialed the type stack to an available Apple-first geometric display, Avenir Next humanist body, and Charter or Iowan editorial accent with safe fallbacks.
- Kept lesson navigation sticky on phones and made previous, next, course-home, workbook, progress, autosave, and support states explicit.
- Updated regression coverage for the guided entry, eleven workbook pages, restored support form, absent private-course portrait, and new course flow.
- The production build succeeds and all 20 rendered buyer-path checks pass.
- Browser QA passes at phone and desktop widths for the homepage, course sales page, free Sunday Board Meeting, private course home, workbook, representative lesson, and support page. There is no horizontal overflow or clipped text on those routes.
- The phone course, workbook, onboarding cards, representative lesson cover, and lesson artwork were visually inspected in the actual local browser.
- The current verified local preview is running at `http://localhost:3000`.

This state is still local only. It is not committed, published, or reflected in MailerLite checkout.

The response stream began disconnecting again during a long tool-heavy continuation. At the moment of handoff, the work below was saved but unverified. The fresh-task update above records the later build, test, and browser QA. Chris has not yet approved or published it.

Changes saved immediately before this handoff:

- Replaced the malformed glove, fishing rod, and reel in the Keep module still life with a cleaner physical scene. The active asset is now `public/assets/course/art/module-keep-still-life-v2.png`.
- Removed Chris's portrait from the private course overview. Founder photography remains appropriate only as small author context on the public founder story.
- Replaced the staged chin-on-fist Lead video poster with a natural real frame from the actual final video.
- Moved workbook setup to the beginning of the private course and made print, save-PDF, or type-in-another-tab instructions explicit.
- Began converting the private course from a content library into a guided journey with a welcome message, four-step start path, progress-aware next-lesson link, and explicit support path.
- Added two optional family application pages inside the existing workbook: The Family Screen Reset and The Weekly Tradition Builder. Do not duplicate the free Sunday Board Meeting sheet. Link back to the public free version.
- Restored the native Reach Out to Chris form on the support page for course, access, purchase, and educational application questions. It must remain clearly outside therapy, counseling, medical, or crisis care.

Immediate next work:

1. Finish CSS for the new onboarding, dynamic resume, family toolkit, course-support, and lesson-navigation elements.
2. Replace the muddy palette with the approved direction: lighter Pacific daylight, sunlit canvas, clearer ocean blue, eucalyptus, adobe, marigold, and deep pine reserved for contrast. Keep the surf influence architectural and editorial, never literal or cheesy.
3. Dial the type family into a professional mid-century California system. Use an available geometric display, a calm humanist body, and a restrained editorial serif. Verify actual platform font availability and fallbacks rather than naming a font the browser cannot render.
4. Make lesson navigation and course return behavior obvious on desktop and phone. The learner must always know where they are, what to do next, what is saved, how to use the workbook, and how to contact Chris.
5. Update rendered tests for the new guided flow, two additional workbook pages, restored support form, no portrait in private course, and new Keep still-life asset.
6. Run the production build and all rendered checks, then inspect the actual local buyer experience on desktop and phone. No publication without Chris's approval.

Traffic direction to preserve: owned site checkout and delivery, useful Substack stories, restrained edits of the real videos for YouTube, and aligned referrals all pointing to the free Sunday Board Meeting, then email, then the one $99 All the Way Here course. Do not migrate to Skool or Kajabi to solve discovery or navigation. Revisit a platform only if real buyers later require accounts, community, or discussion.

This file exists so the full project can continue in a fresh Codex task without relying on the unusually large original conversation stream.

## Latest verified checkpoint

- The production build succeeds and all 20 rendered buyer-path checks pass.
- Chris-only founder photographs are author-sized on the homepage and About page rather than used as hero imagery. The private course overview contains no founder portrait.
- The homepage shows the actual nine-lesson visual course, not a generic product mockup.
- All three final module edits load with synchronized English captions.
- Twenty public, private-course, lesson, workbook, and free-guide routes pass the live desktop and phone overflow, clipping, heading, and readability audit after the final identity fixes.
- Workbook entries persist after reload, and the temporary QA answer was cleared and verified after reload.
- The actual downloadable Sunday Board Meeting PDF and its public preview now use the clean Sunday Board text identity. The rejected badge is gone from the downloadable file, not only from the website.
- The local work is not published. The live domain remains on the previously published state until Chris approves the complete local buyer path.

## The outcome

Finish Here Supply Co. as one cohesive, memorable, evidence-aware business and educational experience. It should feel human, authoritative, warm, outdoorsy, and slightly countercultural. The visual language is mid-century California surf and outdoor editorial art, with Puerto Rico and Hawaii warmth, North Carolina mountain life, and real domestic moments. It must never feel nautical, dark, corporate, generic, guru-like, childish, or visibly AI-generated.

The controlling idea is: **Here Supply Co. makes tools for showing up in real life.** It helps adults reclaim attention from phones, feeds, AI, work, and endless input so they can be present in relationships and ordinary life. AI can supply answers. The work should help people practice attention and authentic connection with real people. Chris’s founder voice as a husband and father remains real, while the course examples and imagery are openly usable by women and men.

Every lesson, image, video, public page, email, and future coaching path must serve that same return. Avoid generic productivity, screen-time scolding, guru language, and unrelated family tools.

## Non-negotiable design direction

- The spiral and the wave-and-mountain badge were rejected. Do not revive either one.
- The active local site now uses a restrained `HERE / SUPPLY CO.` typographic identity with `TOOLS FOR SHOWING UP IN REAL LIFE`. It still requires Chris's approval before publication.
- Do not present a generated icon beside styled type as a finished logo. The eventual identity must work as a deliberate wordmark, a small mark, one color, reversed, and at favicon size.
- Keep the approved Pacific daylight palette: warm white, light ocean blue, sea glass, deep coastal green, restrained coral, and warm sun. Do not restore muddy tan, brown, mustard, or olive combinations.
- Keep the current display and editorial fonts, which Chris likes.
- Use physically coherent, emotionally real art. Avoid fake numbers, clocks, gauges, license plates, tiny text, impossible vehicles, broken bikes, unsupported furniture, malformed hands, and arbitrary AI details.
- Keep Chris-only photography author-sized everywhere. Do not use a giant founder portrait as a hero. Large imagery is reserved for purposeful human-story art.
- Every headline must wrap by words. Never split words or leave punctuation on its own line.
- All imagery must crop intentionally on desktop and mobile.
- Public pages, paid course pages, Focus, the free guide, workbook, and checkout must feel like one system.
- Printables use a clean white, ink-conscious background. On-screen presentation can use the brand palette.

## Work already completed locally

- Rebuilt the public curriculum so all nine Core lessons have equal visual weight.
- Added nine unique lesson-anchor artworks to both the public site and private Core course.
- Added a true lesson preview for each lesson.
- Fixed the global headline wrapping rules that caused chopped words and isolated periods.
- Replaced the fake free-guide mockup with the actual printable preview.
- Rebuilt the free weekly guide as a polished white PDF, then removed the rejected badge from the actual downloadable file and its public preview.
- Added an editable Core Workbook with local-device autosave and print/save-PDF support.
- Added artwork to the Core library, each private lesson, the public homepage, and the public course preview.
- Replaced the clipped Focus mock cover with real Focus artwork.
- Added three module still-life artworks and all nine lesson-detail artworks.
- Removed the fake-number timer from the Sanctuary detail image.
- Added woman-led lesson art for focused work, the work-to-home transition, and friendship.
- Added a purposeful phone-at-the-game scene to the homepage and Attention Reset.
- Added emotionally purposeful problem scenes inside Focus Mode, The Driveway Pause, The Emotional Thermostat, The Date Night Algorithm, and The Floor General. The new Focus and Driveway scenes center contemporary women and show the cost and the return without turning the phone into a villain.
- Replaced the physically questionable truck image in the public social-preview metadata with the contemporary woman-at-the-driveway scene. The old image is no longer used by the homepage, course page, About page, or structured course listing.
- Recut the three real module introduction videos into tighter non-destructive course edits. The originals remain in place; the private course now loads `module-return-final-v2.mp4`, `module-lead-final.mp4`, and `module-keep-final-v2.mp4`.
- Added synchronized English caption tracks for all three final module edits and wired them into the private course player.
- Built a clean typographic identity candidate with standard and reversed wordmarks, an `LH` lettermark, a favicon treatment, and a transparent checkout logo. The rejected spiral and wave-and-mountain SVGs were removed from the active asset set.
- Built a square All the Way Here checkout image from the same emotionally purposeful course art. It represents a woman, an adult divided by his phone, and a child waiting for attention rather than using a generic product placeholder.
- Added the public privacy-safe 3:12 Sunday Board Meeting video with captions and a real Chris-and-Rhea poster.
- Added the Charleston-to-Brevard story and Rhea's perspective without exposing any child.
- Confirmed from the real video that the practice is called The Sunday Board Meeting. “See the same week” is the promise.
- Updated the current business plan to one free practice, one $99 course, and one marketing path.

## Current visual asset plan

The final Core art system should contain at least:

- 9 unique human-story lesson anchors
- 9 unique lesson-detail images, one inside each lesson
- 3 module-opening still lifes for Return, Lead, and Keep
- Focus artwork
- real founder photography
- the actual printable preview

This gives the course a minimum of 21 original Core images before founder photos, Focus, and product previews.

Already present:

- `public/assets/course/art/lesson-*.jpg` for all nine anchors
- `public/assets/course/art/module-return-still-life.jpg`
- `public/assets/course/art/module-lead-still-life.jpg`
- `public/assets/course/art/module-keep-still-life-v2.png`
- `public/assets/course/art/detail-1-1-sanctuary.jpg`
- `public/assets/course/art/detail-1-2-hunter-farmer.jpg`
- `public/assets/course/art/detail-1-3-airlock.jpg`
- `public/assets/course/art/detail-2-1-thermostat.jpg`
- `public/assets/course/art/detail-2-2-date-night.jpg`
- `public/assets/course/art/detail-2-3-floor-general.jpg`
- `public/assets/course/art/detail-3-1-third-place.jpg`
- `public/assets/course/art/detail-3-2-friendship.jpg`
- `public/assets/course/art/detail-3-3-mission-debrief.jpg`
- `public/assets/products/focus-protocol-art.jpg`
- `public/assets/course/art/emotional-phone-at-game.jpg`

Integrated:

- Module-opening art appears on the private course home.
- Each lesson-detail image appears inside its lesson, near the practice or real-life adaptation.

Still needed:

- Remove any asset that shows a physical inconsistency or visible AI tell.
- Review the three shortened module videos with Chris before any publication. Captions are already present and must be rechecked if a cut changes.

## Functional and visual QA completed

The local site was audited at desktop and phone widths across twenty routes:

- `/`
- `/about`
- `/library`
- `/sunday-board`
- `/focus`
- `/resources`
- `/working-session`
- `/policies`
- `/access/core-4m8r2p`
- `/access/core-4m8r2p/workbook`
- all nine private lesson routes
- `/field-guide`

Verified:

- no horizontal overflow
- no mid-word breaks
- no isolated punctuation
- no clipped headings or cards
- no low-contrast dark-on-dark text
- no light-on-light text, overlapping words, visually merged text, clipped type, mid-word breaks, or isolated punctuation
- brand text must have an explicit readable color on every light and dark surface; do not rely on inheritance
- correct mobile image crops
- actual printable preview is readable
- workbook answers save locally and print cleanly

The current production build and all 20 rendered tests pass. Regression checks now prevent the rejected badge from returning to the PDF builder, verify the checkout image package, and prevent the rejected truck scene from returning as the public social preview.

### September 1 continuation checkpoint

- Replaced the late muddy tan, brown, and mustard homepage override with the approved Pacific daylight direction: warm white, light ocean blue, sea glass, deep coastal green, restrained coral, and warm sun.
- Removed the decorative vertical bars and stacked retro stripes that were making the site feel 1970s instead of clean mid-century California.
- Kept Chris's founder image small and author-like. Do not restore a large founder portrait or use his face as unrelated course art.
- Added the buyer-facing printable-tools showcase and the private course resource shelf. The Family Screen Reset and Weekly Tradition Builder are part of the paid course. The Sunday Board sheet remains the free companion and should not be duplicated as a second paid printable.
- The working inline wordmark and exported brand assets use the new palette, but the identity is still a candidate awaiting Chris's approval. Do not call it final and do not revive the rejected spiral or wave-and-mountain badge.
- Rebuilt the checkout image package locally in the new palette. MailerLite remains unchanged and unpublished.
- Verified a fresh production build and all 20 rendered tests after the palette correction.
- Built and visually inspected `public/downloads/all-the-way-here-workbook.pdf`, now a 16-page US Letter workbook containing the orientation, Attention Reset, all nine lesson action pages, The Family Screen Reset, The Weekly Tradition Builder, The Teen Connection Check-In, and a 30-day integration page.
- Made the downloadable PDF the first workbook action in the private course, with the editable browser workbook preserved as a clear second choice. The public sales page now identifies the exact 16-page deliverable.
- Corrected the last tan-and-olive mobile workbook stripe and moved the support/contact path into the Pacific daylight system.
- Applied each lesson's focal crop to the homepage mosaics, private course cards, public curriculum, and lesson covers so people and relationships remain visible.
- Rebuilt the local checkout cover so it now says `16-PAGE WORKBOOK`. MailerLite still has not been changed.
- Re-ran a fresh production build and all 20 rendered tests. All pass. Phone-width checks across the homepage, library, private course, workbook, representative lesson, Sunday Board Meeting, About page, and working session show no horizontal overflow or out-of-bounds text.

Gamma archive status:

- The actual archive folder is `/Users/chrisavera/Desktop/Life at Hand/Gamma Archive`.
- Twenty-nine verified files are present, covering the Life at Hand and Iron Compass course material in editable PowerPoint and PDF form where Gamma completed both renders.
- Preserved: Mission Debrief, both Sanctuary versions, Hunter vs Farmer, Airlock Protocol, Iron Compass Workbook, Focus Protocol Bridge, Focus Protocol Field Manual, Sunday Board Meeting, Emotional Thermostat, Date Night Algorithm, Floor General, Third Place, Friendship Script, and the filming guide.
- The older duplicate Sanctuary is preserved as an editable PowerPoint; Gamma's companion PDF render timed out. The revised Sanctuary has both PDF and PowerPoint.
- The separate Gamma site export and unrelated Gamma Tips / real-estate blueprint were not used as a reason to delay preserving the course sources. Do not describe all 18 account items as fully archived unless those remaining non-course items are separately verified.
- Gamma Plus Monthly was canceled on September 1, 2026 after Chris gave action-time confirmation. Gamma displayed `Subscription cancelled` and `You won't be billed again`. The billing page was then reloaded and verified to show that Plus expires on September 16, 2026, with a `Reactivate subscription` button. The project library remained present after cancellation.

## Checkout still required

MailerLite checkout pages:

- retired Focus Protocol checkout: `34346`, leave untouched until Chris approves how to retire it
- current $99 course checkout: `34347`

Update and verify:

- replace the old compass checkout logo with `public/assets/brand/sunday-board-checkout-logo.png` after Chris approves the local identity
- rename Core to All the Way Here and use `public/assets/brand/all-the-way-here-checkout.jpg`
- save and reopen the checkout to verify the public buyer view
- do not change price, refund terms, or checkout behavior without explicit need

Read-only MailerLite inspection on August 30 found:

- the active $99 product is still named `Iron Compass Core`;
- its checkout title is still `Get Iron Compass Core`;
- the product image is missing;
- the old compass image is still used as the checkout logo;
- the order-confirmation page and button still use `Iron Compass Core`;
- the confirmation email is still generic and the sender label is `Chris Avera | Iron Compass` from the Listings in Motion address;
- the delivery URL is correctly set to `/access/core-4m8r2p`;
- no MailerLite changes were saved during the inspection.

## Publishing still required

Sites project: `appgprj_6a85f114c9ec8191bd4367f7004c5d3c`

Live domain: `https://ironcompassinstitute.com`

The current local work has not yet been republished. Before publishing:

1. Review the final module edits with Chris.
2. Finish the approved professional identity and checkout product image.
3. Run one last production build, test, and asset audit after those changes.
4. Commit and push the exact verified state.
5. Save a new Sites version and deploy it.
6. Verify the live custom domain, not only the deployment preview.

## Business and naming work still required

The current authoritative launch direction is in `ONE_OFFER_GO_TO_MARKET.md`. It replaces the older multi-offer ladder for launch decisions while preserving the research and naming exploration in `BUSINESS_AND_BRAND_PLAN.md`.

Current simplified direction after Chris rejected founder-led events and excess offer complexity:

- keep and improve the existing material rather than start a different business;
- Here Supply Co. as the local working parent brand, pending a current domain and legal screen;
- The Sunday Board Meeting as the one free entrance, with “See the same week” as its promise;
- All the Way Here as the one $99 founding paid offer, with The Attention Reset folded into it;
- one marketing path from useful stories and search content, to the free guide, to a short email sequence, to Core;
- no founder-led family nights, event business, subscription, group license, or additional course at launch;
- no separate $29 middle purchase, quiz, or program catalog;
- no live rebrand until Chris approves the local preview and the name and domain are screened again.

The practical business plan is saved in `ONE_OFFER_GO_TO_MARKET.md`. It includes:

- clear customer problem and human-connection differentiation from generic AI chat
- one free practice and one $99 course, with later application support only after demand is proven
- coaching framed as helping men apply what they learned, not guru coaching, therapy, or “lone wolf” performance
- a small founding circle or beta path that can be free or low cost in exchange for honest feedback and permission to use real reviews
- acquisition plan, SEO, founder-led stories, email, partnerships, and proof-building
- ninety-day launch sequence and a small set of numbers to track
- delivery map showing exactly what a buyer receives and where
- room for future courses without rebuilding the platform

Naming status:

- Here Supply Co. is implemented locally but not published or legally cleared.
- The Sunday Board Meeting is confirmed by the real Chris-and-Rhea video.
- “See the same week” remains the plain-language promise.
- All the Way Here is the complete course.

## Communication and safety

- Tell Chris what was changed, how it improves organization and user experience, how the public site reflects it, and what remains.
- Be direct and honest. Do not call a saved draft, local file, or successful build “published.”
- Do not invent testimonials, research claims, credentials, quotes, or customer results.
- Do not use em dashes in user-facing copy.
- Preserve files under `sources/` as read-only references.
