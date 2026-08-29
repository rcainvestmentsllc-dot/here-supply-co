# Iron Compass continuation checkpoint

Updated: 2026-08-29

This file exists so the full project can continue in a fresh Codex task without relying on the unusually large original conversation stream.

## The outcome

Finish Iron Compass as one cohesive, memorable, evidence-aware business and educational experience. It should feel human, authoritative, warm, outdoorsy, and slightly countercultural. The visual language is mid-century California surf and outdoor editorial art, with Puerto Rico and Hawaii warmth, North Carolina mountain life, and real domestic moments. It must never feel nautical, dark, corporate, generic, guru-like, feminine-coded, childish, or visibly AI-generated.

The central idea is a return to real life and human connection in an AI-saturated world. AI can supply answers. Iron Compass should help husbands and fathers apply one useful practice with real people.

## Non-negotiable design direction

- Use the wave mark, not the old compass emblem.
- Keep the current evergreen, cream, ochre, rust, and muted ocean-blue palette.
- Keep the current display and editorial fonts, which Chris likes.
- Use physically coherent, emotionally real art. Avoid fake numbers, clocks, gauges, license plates, tiny text, impossible vehicles, broken bikes, unsupported furniture, malformed hands, and arbitrary AI details.
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
- Rebuilt the free weekly guide as a polished white PDF.
- Added an editable Core Workbook with local-device autosave and print/save-PDF support.
- Added artwork to the Core library, each private lesson, the public homepage, and the public course preview.
- Replaced the clipped Focus mock cover with real Focus artwork.
- Added three new module still-life artworks and the first three lesson-detail artworks.
- Removed the fake-number timer from the Sanctuary detail image.
- `pnpm test` passes all 14 checks. `pnpm lint` has zero errors and only image-optimization warnings.

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
- `public/assets/course/art/module-keep-still-life.jpg`
- `public/assets/course/art/detail-1-1-sanctuary.jpg`
- `public/assets/course/art/detail-1-2-hunter-farmer.jpg`
- `public/assets/course/art/detail-1-3-airlock.jpg`
- `public/assets/products/focus-protocol-art.jpg`

Still needed:

- Generate, inspect, and integrate detail art for lessons 2.1 through 3.3.
- Add module-opening art to the private Core course home.
- Add each lesson-detail image inside the lesson, near the practice or real-life adaptation.
- Audit every generated asset for physical coherence and remove any AI tells.

## Functional and visual QA still required

Run the local production site and inspect these routes at desktop and phone widths:

- `/`
- `/library#curriculum`
- `/sunday-board#worksheet`
- `/focus`
- `/resources`
- `/working-session#intake`
- `/access/core-4m8r2p`
- `/access/core-4m8r2p/lesson/the-date-night-experiment`
- `/access/core-4m8r2p/workbook`

Verify:

- no horizontal overflow
- no mid-word breaks
- no isolated punctuation
- no clipped headings or cards
- no low-contrast dark-on-dark text
- correct mobile image crops
- actual printable preview is readable
- workbook answers save locally and print cleanly

## Checkout still required

MailerLite checkout pages:

- Focus Protocol: checkout `34346`
- Core: checkout `34347`

Update and verify:

- replace the old compass checkout logo with the wave mark
- give Focus a real product image
- give Core a course-art product image or coherent lesson collage
- save and reopen the checkout to verify the public buyer view
- do not change price, refund terms, or checkout behavior without explicit need

## Publishing still required

Sites project: `appgprj_6a85f114c9ec8191bd4367f7004c5d3c`

Live domain: `https://ironcompassinstitute.com`

The current local work has not yet been republished. Before publishing:

1. Finish art integration.
2. Complete desktop and mobile QA.
3. Run test, lint, build, and asset checks.
4. Commit and push the exact verified state.
5. Save a new Sites version and deploy it.
6. Verify the live custom domain, not only the deployment preview.

## Business and naming work still required

Save a practical business plan in the project. It should include:

- clear customer problem and human-connection differentiation from generic AI chat
- offer ladder: free guide, Focus at $29, Core at $99 founding price, and a proof-first accountability/application offer
- coaching framed as helping men apply what they learned, not guru coaching, therapy, or “lone wolf” performance
- a small founding circle or beta path that can be free or low cost in exchange for honest feedback and permission to use real reviews
- acquisition plan, SEO, founder-led stories, email, partnerships, and proof-building
- ninety-day launch sequence and a small set of numbers to track
- delivery map showing exactly what a buyer receives and where
- room for future courses without rebuilding the platform

Naming assessment:

- Do not casually rename the live business.
- Assess whether Iron Compass can be retained as a parent brand while the public language moves toward return, real life, and human connection.
- Explore stronger names with current domain and trademark screening, but state clearly that screening is not legal clearance.
- “Sunday Board Meeting” has already shifted toward the more natural promise “See the Same Week.”

## Communication and safety

- Tell Chris what was changed, how it improves organization and user experience, how the public site reflects it, and what remains.
- Be direct and honest. Do not call a saved draft, local file, or successful build “published.”
- Do not invent testimonials, research claims, credentials, quotes, or customer results.
- Do not use em dashes in user-facing copy.
- Preserve files under `sources/` as read-only references.

