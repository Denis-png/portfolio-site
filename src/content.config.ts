import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    repo: z.url(),
    demo: z.url().optional(),
    // Path of a PDF report inside public/, for example '/report.pdf'.
    report: z.string().startsWith('/').optional(),
    // Further links, for example a second repository.
    links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
    // Where the project stands. Shown as a coloured dot and a label.
    status: z.enum(['completed', 'ongoing', 'planned']).default('completed'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
