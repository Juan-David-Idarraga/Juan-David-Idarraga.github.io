import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    featured: z.boolean(),
    year: z.number(),
    type: z.array(z.string()),
    industry: z.string(),
    role: z.string(),
    summary: z.string(),
    problem: z.string(),
    stack: z.array(z.string()),
    architecture: z.array(z.string()),
    challenges: z.array(z.string()),
    decisions: z.array(
      z.object({
        title: z.string(),
        reason: z.string(),
      }),
    ),
    results: z.array(z.string()),
    cover: z.string(),
    gallery: z.array(z.string()).default([]),
    video: z.string().optional(),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});

export const collections = { projects };

