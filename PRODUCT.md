# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: someone verifying that Keegan is a real person.** They encountered a
project first — a VS Code extension listing, a package, a GitHub repo — and
clicked through to the author. They arrive with one question ("is there a real
person behind this, and have they built anything else?"), spend well under a
minute, and leave either reassured or suspicious. They did not come to be sold
to.

**Dormant: hiring managers, recruiters, and peer engineers.** Keegan is not
actively looking and does not send this site to anyone, so these are not the
design target. The site should stay legible to them — role, stack, and contact
readable on a skim — but future work must not optimize for a recruiter's needs
at the expense of the primary job.

## Product Purpose

keegs.co is a personal calling card and a standing proof of identity. It is
deliberately a placeholder: not distributed, not promoted, not an active
job-search surface.

Its job is to *exist* — credibly, at a stable address — so that when Keegan
publishes something, the author behind it resolves to a real person with real
work attached. Secondarily it is a low-friction shelf for personal side
projects as they accumulate.

Success is not inbound conversation. Success is a visitor arriving with a
verification question, leaving with it answered, and the site continuing to do
that with very little maintenance.

## Positioning

Proof of personhood, backed by proof of craft. Anyone can publish a landing
page asserting they are real; the argument here is that the site's own
construction is corroborating evidence.

The stated claim, in Keegan's own copy, is that engineering and design are one
craft: "I build software with an eye for how it looks and how it holds up."
Curation is the second half of the position — showing few things well is itself
the argument, and it is what keeps a low-maintenance site honest.

## Operating Context

- A single page at `keegs.co`, read start to finish in one pass. Masthead,
  hero statement, numbered work list, contact, colophon.
- Visitors arrive sideways: from a package registry or marketplace listing, a
  GitHub profile, a repo README, or a link in someone else's project. Rarely
  from a résumé, effectively never from a direct share by Keegan.
- Sessions are short and verification-shaped. The name, the fact that real
  projects exist, and a way to reach a human are the payload.
- The work list is data-driven: one markdown file per project in
  `src/content/projects/`, ordered by an `index` field that also prints as the
  `01 / 02` marker beside each row.
- Outbound paths are the project repos on GitHub and two contact links
  (GitHub `@jeegankones`, email `keegs112@gmail.com`).

## Capabilities and Constraints

**Stack.** Astro static site, Tailwind CSS v4 via `@tailwindcss/vite`,
self-hosted variable fonts through Fontsource, deployed to Vercel as static
output with no adapter. Vercel Analytics and Speed Insights are installed.

**Content model.** The `projects` collection
([src/content.config.ts](src/content.config.ts)) defines: `index`, `featured`,
`title`, `tagline`, `year`, optional `role`, `tags`, `status`
(`live | wip | archived`), optional `repo` and `live` URLs, and an optional
`stats` block. Only `featured` projects render.

**Constraints future work must preserve:**

- **Nothing that decays.** The site may sit untouched for long stretches by
  design. Avoid claims with a shelf life — availability status, "last updated"
  stamps, date-stamped activity, counts that need hand-maintenance. A stale
  freshness signal damages the credibility case worse than no signal at all.
- Content-first and zero-JS by default. Interactivity is added as a hydrated
  island only when a piece genuinely needs it.
- The printed project count must match the number of rendered rows — this is
  asserted in the E2E suite, not merely a convention.
- External links carry `target="_blank"` with `rel="noopener noreferrer"`.
- The page must load with zero console errors.
- Heading structure is tested; hierarchy is a hard requirement, not styling.
- CI (`.github/workflows/ci.yml`) runs `npm run build` plus the Playwright
  suite on every PR and every push to `master`. The suite runs against the real
  production build across desktop Chrome and a mobile viewport.

**Structural scope.** The site stays a single page. New work is new rows, not
new routes. There are no project detail pages and no writing section planned.

**Open decisions:**

- Whether employment history appears on the site at all, and in what form. The
  material exists but is not in the repository and has no committed placement.
- All three current projects are `status: wip`. None is marked `live`. No
  project carries a `live:` URL.
- `stats.live` is `false` everywhere. Live GitHub numbers (stars, forks,
  language, fetched at build time) are a designed-for but unbuilt additive
  path, documented in the README. Note this would be a live signal that cannot
  go stale, which suits the constraint above.

## Brand Commitments

- **Name and domain:** `keegs.co`; the person is Keegan Jones.
- **Voice:** first person, terse, plain. No hype, no superlatives, no
  growth-marketing register. Project taglines are a single crisp sentence
  stating what the thing is. The existing copy is the voice reference.
- **Assets:** `public/K.svg` (favicon) is the only brand asset in the
  repository. There is no logotype file, no photography, and no illustration.
- Professional practice dates from 2018; the hero meta strip prints
  "Est. 2018" and the footer year is derived at build time.

## Evidence on Hand

**Real and usable:**

- Three public GitHub repositories, browsable today:
  [restpad](https://github.com/jeegankones/restpad) (offline REST client for VS
  Code, drop-in compatible with REST Client `.http` files),
  [cairn](https://github.com/jeegankones/cairn) (cross-platform airport-lounge
  travel app; Turborepo monorepo pairing Next.js with Expo over shared tRPC and
  Postgres), and
  [flight-awards](https://github.com/jeegankones/flight-awards) (CLI ranking
  award-flight availability across card transfer partners by true cash value).
  The markdown bodies in `src/content/projects/` are written, accurate
  descriptions.
- A résumé and employment history exist as material, though not in this
  repository.

**Absent — must never be fabricated:**

- No screenshots, screen recordings, product imagery, or live demo URLs for any
  project.
- No testimonials, references, or quotes.
- No metrics: no star counts, download numbers, user counts, or benchmarks.
- No press, case studies, or named clients.
- No photograph of Keegan.

Any future surface that appears to need product imagery must either be designed
without it or wait for real assets. Placeholder screenshots and invented numbers
are out of bounds.

## Product Principles

1. **Answer the verification question first.** A visitor should confirm a real
   person with real work exists before they have to scroll, decide, or read a
   pitch. Everything else on the page is a bonus.
2. **Curation over inventory.** Few projects, each earning its row. Growth
   means raising the bar, not lengthening the list.
3. **The site is the portfolio piece.** Its own construction, performance, and
   detail are the corroborating evidence for the claim it makes.
4. **Say only what is true, and only what stays true.** Every claim traces to a
   real repository or a real fact, and survives six months of neglect. Three
   `wip` projects presented honestly beat a padded portfolio; no claim about
   availability, recency, or momentum that the site cannot keep.
5. **Low maintenance is a feature.** This is a placeholder that must stay
   credible without upkeep. Prefer signals derived from content or build over
   anything hand-set.
6. **Nothing ships red.** Build and the full E2E suite pass before production.
   Correctness is part of the craft argument, not separate from it.

## Accessibility & Inclusion

No external standard was stated as a contractual requirement. The following are
commitments already present in the implementation and must be preserved:

- All three ink tiers (`--color-ink`, `--color-muted`, `--color-faint`) clear
  WCAG AA against the page ground: 17.3:1, 7.5:1, and 4.8:1. Contrast is a
  spec on these tokens, not a matter of taste — retoning any of them requires
  re-measuring, since the tertiary tier's 4.5:1 floor is what sets the
  spacing of the tier above it.
- `prefers-reduced-motion: reduce` disables the staggered entrance animation,
  the masthead status pulse, and smooth scrolling.
- A visible `:focus-visible` outline on all interactive elements.
- Semantic landmarks and a tested heading hierarchy.
- Mobile viewport coverage in the E2E suite alongside desktop.
