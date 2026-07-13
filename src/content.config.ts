import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    section: z.enum(['项目作品', '技术探索', '阅读笔记', '闲隅拾笺']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    hero: z.string().optional(),
    description: z.string().optional(),
    featured: z.boolean().default(false),
    pinned: z.boolean().default(false),
    order: z.number().default(0),
    toc: z.boolean().default(true),
  }),
});

export const collections = {
  blog: blogCollection,
};
