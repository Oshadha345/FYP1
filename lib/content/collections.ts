import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

import { routeForCollection } from "@/lib/routes";
import { parseFrontmatter } from "./schema";
import type {
  ContentCollection,
  ContentItem,
  ContentMeta,
  RelatedContentOptions,
  SearchDocument,
} from "../../types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const DEFAULT_COLLECTIONS: ContentCollection[] = [
  "notes",
  "blogs",
  "books",
  "course_notes",
  "experiments",
  "papers",
  "research_notes",
  "resources",
  "weekly_logs",
];

const MDX_FILE_PATTERN = /\.(md|mdx)$/i;
const WORDS_PER_MINUTE = 220;

type LoadOptions = {
  includeDrafts?: boolean;
  collections?: Array<ContentCollection | string>;
};

async function exists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir: string): Promise<string[]> {
  if (!(await exists(dir))) {
    return [];
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(entryPath);
      }

      return MDX_FILE_PATTERN.test(entry.name) ? [entryPath] : [];
    }),
  );

  return files.flat();
}

function toSlug(collectionDir: string, filePath: string) {
  const relative = path.relative(collectionDir, filePath);
  const withoutExtension = relative.replace(MDX_FILE_PATTERN, "");
  return withoutExtension
    .split(path.sep)
    .filter((part) => part !== "index")
    .join("/");
}

function stripMdx(body: string) {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/import\s+.+?from\s+["'].+?["'];?/g, " ")
    .replace(/export\s+.+/g, " ")
    .replace(/[#>*_`~[\](){}!|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFrom(body: string, fallback: string) {
  const clean = stripMdx(body);
  if (!clean) {
    return fallback;
  }

  return clean.length > 220 ? `${clean.slice(0, 217).trim()}...` : clean;
}

function countWords(body: string) {
  const clean = stripMdx(body);
  return clean ? clean.split(/\s+/).length : 0;
}

function buildMeta(
  collection: string,
  collectionDir: string,
  filePath: string,
  rawBody: string,
  data: Record<string, unknown>,
): ContentMeta {
  const frontmatter = parseFrontmatter(data, filePath);
  const fileSlug = toSlug(collectionDir, filePath);
  const slug =
    typeof frontmatter.slug === "string" && frontmatter.slug.length > 0
      ? frontmatter.slug
      : fileSlug;
  const wordCount = countWords(rawBody);
  const readingMinutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  const href = `/${collection}/${slug}`;

  return {
    ...frontmatter,
    collection,
    slug,
    path: filePath,
    href,
    wordCount,
    readingMinutes,
    readingTime: frontmatter.readingTime ?? `${readingMinutes} min read`,
  };
}

async function readItem(collection: string, filePath: string): Promise<ContentItem> {
  const collectionDir = path.join(CONTENT_ROOT, collection);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const meta = buildMeta(
    collection,
    collectionDir,
    filePath,
    parsed.content,
    parsed.data,
  );

  return {
    meta,
    body: parsed.content,
    excerpt: meta.summary ?? excerptFrom(parsed.content, meta.description),
  };
}

function sortContent(a: ContentItem, b: ContentItem) {
  const orderA = a.meta.order ?? 0;
  const orderB = b.meta.order ?? 0;
  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
}

export const getCollections = cache(async () => {
  if (!(await exists(CONTENT_ROOT))) {
    return DEFAULT_COLLECTIONS;
  }

  const entries = await fs.readdir(CONTENT_ROOT, { withFileTypes: true });
  const directories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const contentDirectories = (
    await Promise.all(
      directories.map(async (directory) => {
        const files = await walk(path.join(CONTENT_ROOT, directory));
        return files.length > 0 ? directory : null;
      }),
    )
  )
    .filter((directory): directory is string => Boolean(directory))
    .sort();

  return contentDirectories.length > 0 ? contentDirectories : DEFAULT_COLLECTIONS;
});

export const getAllContent = cache(async (options: LoadOptions = {}) => {
  const collections = options.collections ?? (await getCollections());
  const nested = await Promise.all(
    collections.map(async (collection) => {
      const collectionDir = path.join(CONTENT_ROOT, collection);
      const files = await walk(collectionDir);
      const items = await Promise.all(
        files.map((filePath) => readItem(collection, filePath)),
      );

      return items;
    }),
  );

  return nested
    .flat()
    .filter((item) => options.includeDrafts || !item.meta.draft)
    .filter((item) => options.includeDrafts || item.meta.status === "published")
    .sort(sortContent);
});

export const getCollection = cache(
  async (collection: ContentCollection | string, options: LoadOptions = {}) => {
    return getAllContent({
      ...options,
      collections: [collection],
    });
  },
);

export const getContentBySlug = cache(
  async (
    collection: ContentCollection | string,
    slug: string | string[],
    options: LoadOptions = {},
  ) => {
    const normalizedSlug = Array.isArray(slug) ? slug.join("/") : slug;
    const items = await getCollection(collection, options);
    return items.find((item) => item.meta.slug === normalizedSlug) ?? null;
  },
);

export async function getStaticParams(collection: ContentCollection | string) {
  const items = await getCollection(collection);
  return items.map((item) => ({
    slug: item.meta.slug.split("/"),
  }));
}

function scoreRelated(source: ContentItem, candidate: ContentItem) {
  if (source.meta.href === candidate.meta.href) {
    return -Infinity;
  }

  const sourceTags = new Set(source.meta.tags.map((tag) => tag.toLowerCase()));
  const candidateTags = candidate.meta.tags.map((tag) => tag.toLowerCase());
  const sharedTags = candidateTags.filter((tag) => sourceTags.has(tag)).length;
  const sameCollection = source.meta.collection === candidate.meta.collection ? 1 : 0;
  const sharedAuthors = candidate.meta.authors.filter((author) =>
    source.meta.authors.includes(author),
  ).length;

  return sharedTags * 5 + sameCollection * 2 + sharedAuthors;
}

export async function getRelatedContent(
  source: ContentItem,
  options: RelatedContentOptions = {},
) {
  const limit = options.limit ?? 4;
  const candidates = await getAllContent({
    includeDrafts: options.includeDrafts,
    collections: options.collections,
  });

  return candidates
    .map((item) => ({ item, score: scoreRelated(source, item) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || sortContent(a.item, b.item))
    .slice(0, limit)
    .map(({ item }) => item);
}

export async function buildSearchIndex(
  options: LoadOptions = {},
): Promise<SearchDocument[]> {
  const items = options.collections ? await getAllContent(options) : await getKnowledgeItems();

  return items.map((item) => ({
    id: item.meta.href,
    collection: item.meta.collection,
    slug: item.meta.slug,
    href: item.meta.href,
    title: item.meta.title,
    description: item.meta.description,
    excerpt: item.excerpt,
    tags: item.meta.tags,
    authors: item.meta.authors,
    date: item.meta.date,
    body: stripMdx(item.body),
  }));
}

export async function getKnowledgeItems() {
  return getAllContent({
    collections: [
      "notes",
      "research_notes",
      "course_notes",
      "papers",
      "experiments",
      "books",
      "blogs",
      "resources",
      "weekly_logs",
    ],
  });
}

export async function getUnifiedNotes() {
  return getAllContent({
    collections: ["notes", "research_notes", "course_notes", "books", "experiments"],
  });
}

export async function getRouteCollection(route: string) {
  const collectionMap: Record<string, string[]> = {
    notes: ["notes", "research_notes", "course_notes", "books", "experiments"],
    papers: ["papers"],
    blog: ["blogs"],
    resources: ["resources"],
    "weekly-logs": ["weekly_logs"],
  };

  return getAllContent({ collections: collectionMap[route] ?? [route] });
}

export async function getRouteItem(route: string, slug: string) {
  const items = await getRouteCollection(route);
  return items.find((item) => item.meta.slug === slug) ?? null;
}

function explicitReferences(item: ContentItem) {
  return [
    ...item.meta.links,
    ...item.meta.related,
    ...item.meta.notes,
    ...item.meta.papers,
    ...item.meta.experiments,
  ];
}

export async function getBacklinks(target: ContentItem) {
  const targetIds = new Set([
    target.meta.slug,
    target.meta.href,
    `${target.meta.collection}/${target.meta.slug}`,
    `${routeForCollection(target.meta.collection)}/${target.meta.slug}`,
  ]);
  const items = await getKnowledgeItems();

  return items
    .filter((item) => item.meta.href !== target.meta.href)
    .map((item) => {
      const refs = explicitReferences(item);
      const hasExplicitLink = refs.some((ref) => targetIds.has(ref.replace(/^\//, "")) || targetIds.has(ref));
      const hasWikiLink = new RegExp(`\\[\\[${target.meta.slug}\\]\\]`, "i").test(item.body);
      const hasTitleMention = item.body.toLowerCase().includes(target.meta.title.toLowerCase());

      if (!hasExplicitLink && !hasWikiLink && !hasTitleMention) return null;

      return {
        source: item,
        reason: hasExplicitLink ? "linked reference" : hasWikiLink ? "wiki link" : "title mention",
      };
    })
    .filter((link): link is { source: ContentItem; reason: string } => Boolean(link));
}

export async function buildKnowledgeGraph() {
  const items = await getKnowledgeItems();
  const bySlug = new Map(items.map((item) => [item.meta.slug, item]));
  const byPath = new Map(items.map((item) => [`${routeForCollection(item.meta.collection)}/${item.meta.slug}`, item]));

  const nodes = items.map((item) => ({
    id: item.meta.href,
    title: item.meta.title,
    href: `/${routeForCollection(item.meta.collection)}/${item.meta.slug}`,
    collection: routeForCollection(item.meta.collection),
    category: item.meta.category,
    tags: item.meta.tags,
  }));

  const edges = items.flatMap((item) =>
    explicitReferences(item)
      .map((ref) => ref.replace(/^\//, ""))
      .map((ref) => bySlug.get(ref) ?? byPath.get(ref))
      .filter((target): target is ContentItem => Boolean(target))
      .map((target) => ({
        source: item.meta.href,
        target: target.meta.href,
        label: "references",
      })),
  );

  return { nodes, edges };
}

export async function getWeeklyBuckets() {
  const items = await getKnowledgeItems();
  const logs = await getCollection("weekly_logs");
  const buckets = new Map<string, ContentItem[]>();

  for (const item of items) {
    const date = new Date(item.meta.date);
    const day = date.getUTCDay();
    const start = new Date(date);
    start.setUTCDate(date.getUTCDate() - ((day + 6) % 7));
    start.setUTCHours(0, 0, 0, 0);
    const key = start.toISOString().slice(0, 10);
    buckets.set(key, [...(buckets.get(key) ?? []), item]);
  }

  return Array.from(buckets.entries())
    .map(([key, bucketItems]) => {
      const start = new Date(key);
      const end = new Date(start);
      end.setUTCDate(start.getUTCDate() + 6);
      const reflection = logs.find((log) => log.meta.date.slice(0, 10) >= key && log.meta.date.slice(0, 10) <= end.toISOString().slice(0, 10));

      return {
        key,
        label: `Week of ${key}`,
        start: key,
        end: end.toISOString().slice(0, 10),
        items: bucketItems.sort(sortContent),
        reflection,
      };
    })
    .sort((a, b) => b.key.localeCompare(a.key));
}
