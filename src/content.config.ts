import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { kindKeys } from './data/site';

/**
 * Every piece of work is one entry: a folder in src/content/entries/ holding
 * index.md (or index.mdx for interactive pieces) plus its images and files.
 *
 * Visibility:
 *   public     - the full entry is published.
 *   preview    - a sneak peek: title, summary, topics and cover only.
 *                The file must have NO body text (the build refuses one),
 *                because this repository is public.
 *   classified - shown only as a "Classified" card with its date.
 *                The file must have no title, summary or body.
 */
const entries = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/entries' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().optional(),
        summary: z.string().optional(),
        kind: z.enum(kindKeys),
        topics: z.array(z.string()).default([]),
        status: z.enum(['seedling', 'growing', 'evergreen', 'archived']).default('growing'),
        visibility: z.enum(['public', 'preview', 'classified']).default('public'),
        started: z.coerce.date().optional(),
        published: z.coerce.date(),
        updated: z.coerce.date().optional(),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        model: z.string().optional(),
        links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      })
      .superRefine((d, ctx) => {
        if (d.visibility !== 'classified' && !d.title) {
          ctx.addIssue({ code: 'custom', message: 'A title is required unless the entry is classified.' });
        }
        if (d.visibility === 'classified' && (d.title || d.summary || d.cover || d.links.length)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Classified entries must not contain a title, summary, cover or links: the repository is public.',
          });
        }
      }),
});

// Hand-written pages such as About and Now.
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: z.coerce.date().optional(),
    // Short lines shown on the homepage (used by the Now page).
    items: z.array(z.string()).default([]),
  }),
});

export const collections = { entries, pages };
