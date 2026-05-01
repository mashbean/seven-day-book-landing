import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const reportSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  lang: z.string().default("zh-TW"),

  // AI generation metadata
  aiModel: z.string().optional(),
  aiPrompt: z.string().optional(),
  aiPipelineStage: z.string().optional(),
  aiPipelineId: z.string().optional(),
  aiGeneratedDate: z.coerce.date().optional(),
  humanReviewed: z.boolean().default(false),

  // Reading experience
  category: z.string().optional(),
  series: z.string().optional(),
  seriesOrder: z.number().int().positive().optional(),
  slug: z.string().optional(),
});

const reports = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/reports" }),
  schema: reportSchema,
});

export const collections = { reports };
