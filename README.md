# keegs.co

Personal portfolio of Keegan Jones — a curated set of favorite software
projects. Built as a Swiss-typographic, content-first static site.

## Stack

- **[Astro 5](https://astro.build)** — content-first, ships zero JS by
  default. Interactive pieces are added as hydrated "islands" so the rest of
  the page stays instant.
- **[Tailwind CSS v4](https://tailwindcss.com)** — via the `@tailwindcss/vite`
  plugin. Design tokens live in `src/styles/global.css` under `@theme`.
- **Type** — [Archivo](https://fonts.google.com/specimen/Archivo) (grotesque
  voice) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (machine-facing
  metadata), self-hosted via Fontsource.
- **Deploy** — [Vercel](https://vercel.com) (static output; auto-detected, no
  adapter needed).

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output → dist/
npm run preview    # preview the production build
```

## Testing

End-to-end tests ([Playwright](https://playwright.dev)) live in `tests/`. They
run against the real production build (`astro build` → `astro preview`) across
desktop Chrome and a mobile viewport, and cover: page metadata, the hero, nav
anchors, the project list matching its printed count, safe external links
(`target/rel`), contact links, the signature slot, console-error-free load, and
heading structure.

```bash
npm test        # run the suite (builds + previews automatically)
npm run test:ui # interactive Playwright UI
```

First-time setup installs the browser: `npx playwright install chromium`.

**CI** — `.github/workflows/ci.yml` runs `npm run build` then the E2E suite on
every pull request and every push to `master`.

## Gating deployments on tests

Tests already run on PRs. To also block a *production deploy* until they pass:

1. **Branch protection** (GitHub → Settings → Branches → `master`): require the
   `Build & E2E` status check before merging. Since Vercel deploys production
   from `master`, nothing ships unless CI is green.
2. **Optional, stricter** — turn off Vercel's automatic Git production deploys
   and deploy from CI instead: add a `deploy` job to the workflow that runs
   after `build-and-test` and calls `vercel deploy --prod` (needs
   `VERCEL_TOKEN` / org / project id as repo secrets). This makes a passing
   test run a hard prerequisite for every production deploy.

## Project structure

```
src/
  content/
    projects/          # one markdown file per curated project
  content.config.ts    # projects collection schema (Zod)
  components/
    ProjectRow.astro   # a numbered work-list row
    SignatureSlot.astro# reserved frame for the future signature visual
  layouts/Base.astro   # <head>, fonts, SEO meta
  pages/index.astro    # the single-page composition
  styles/global.css    # design tokens + base + utilities
tests/                 # Playwright end-to-end tests
public/K.svg           # favicon
.github/workflows/     # CI (build + E2E on PRs and pushes to master)
```

## Adding a project

Create a new file in `src/content/projects/`. The `index` field controls both
display order and the printed `01 / 02` marker.

```markdown
---
index: 1
title: My Project
tagline: One crisp line about what it is.
year: "2024"
role: Author
tags: ['TypeScript', 'CLI']
status: live        # live | wip | archived
repo: https://github.com/jeegankones/my-project
---

Optional longer description in the body.
```

Delete the three `example-*.md` placeholders once real projects are in.

## Growth path: live GitHub stats

The schema already carries an optional `stats` block. Today it's hand-set. When
repos are public and gathering stars, this becomes an *additive* change — no
restructuring:

1. Populate `repo:` with the real URL and set `stats.live: true`.
2. In `content.config.ts`, swap the glob loader entry (or add a small custom
   loader) to fetch `stars` / `forks` / `language` from the GitHub REST API at
   build time.
3. Render the numbers in `ProjectRow.astro`.

## The signature visual

`src/components/SignatureSlot.astro` is a deliberately reserved, framed space
for a single interactive centerpiece (WebGL / generative / motion) — designed
as its own Astro island so it can be as heavy as it wants without slowing the
rest of the page. Replace its contents when the piece is ready; the frame and
caption language can stay.

## Deploy to Vercel

1. Push to GitHub.
2. Import the repo in Vercel — the Astro preset is auto-detected
   (`npm run build` → `dist/`).
3. Add the custom domain `keegs.co` under Project → Settings → Domains and
   point the DNS records Vercel provides.
