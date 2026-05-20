import { z } from "zod";

const dateLike = z
  .union([z.string(), z.date()])
  .transform((value, ctx) => {
    if (value instanceof Date) {
      return value.toISOString();
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      ctx.addIssue({
        code: "custom",
        message: `Invalid date: ${value}`,
      });
      return z.NEVER;
    }

    return parsed.toISOString();
  });

const stringArray = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .default([])
  .transform((value) => (Array.isArray(value) ? value : [value]))
  .transform((items) =>
    items.map((item) => item.trim()).filter((item) => item.length > 0),
  );

export const frontmatterSchema = z
  .object({
    title: z.string().min(1),
    slug: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    date: dateLike,
    activity_date: dateLike.optional(),
    updated: dateLike.optional(),
    status: z.enum(["draft", "published", "archived"]).default("published"),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    tags: stringArray,
    authors: stringArray,
    summary: z.string().optional(),
    category: z.string().optional(),
    cover: z.string().optional(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
    canonical: z.string().url().optional(),
    doi: z.string().optional(),
    venue: z.string().optional(),
    readingTime: z.string().optional(),
    order: z.number().optional(),
    links: stringArray,
    related: stringArray,
    notes: stringArray,
    papers: stringArray,
    experiments: stringArray,
    datasets: stringArray,
    concepts: stringArray,
    highlights: stringArray,
    todos: stringArray,
    quotes: stringArray,
    week: z.number().optional(),
    pdf: z.string().optional(),
    repository: z.string().optional(),
    url: z.string().optional(),
    milestone: z.string().optional(),
  })
  .passthrough()
  .transform((data) => ({
    ...data,
    description: data.description ?? data.summary ?? data.title,
  }));

export type ParsedFrontmatter = z.infer<typeof frontmatterSchema>;

export function parseFrontmatter(
  data: Record<string, unknown>,
  filePath: string,
): ParsedFrontmatter {
  const result = frontmatterSchema.safeParse(data);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
      .join("; ");

    throw new Error(`Invalid frontmatter in ${filePath}: ${details}`);
  }

  return result.data;
}
