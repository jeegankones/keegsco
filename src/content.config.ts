import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Curated projects. Each entry is a hand-written markdown file whose body
 * is an optional longer description. The schema is intentionally shaped so
 * that when repos go public and gather stars, turning on live GitHub
 * numbers is an *additive* change: populate `repo` and flip `stats.live`,
 * no restructuring required.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    // Ordering & curation
    index: z.number(), // display order + the printed 01 / 02 marker
    featured: z.boolean().default(true),

    // Identity
    title: z.string(),
    tagline: z.string(), // one crisp line: what it is
    year: z.string(), // e.g. "2024" or "2023 to now"
    role: z.string().optional(), // "Author", "Maintainer", "Contributor"

    // Signals
    tags: z.array(z.string()).default([]), // stack / domain chips
    status: z.enum(['live', 'wip', 'archived']).default('live'),

    // Links
    repo: z.string().url().optional(),
    live: z.string().url().optional(),

    // Growth path: hand-set now, swap to live GitHub data later.
    stats: z
      .object({
        live: z.boolean().default(false), // when true, fetch fresh at build
        stars: z.number().optional(),
        forks: z.number().optional(),
        language: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { projects };
