import type { ComponentType, ReactNode } from "react";

export type ContentStatus = "draft" | "published" | "archived";

export type ContentCollection =
  | "notes"
  | "blogs"
  | "books"
  | "course_notes"
  | "experiments"
  | "papers"
  | "research_notes"
  | "resources"
  | "weekly_logs";

export type FrontmatterBase = {
  title: string;
  slug?: string;
  description: string;
  date: string;
  updated?: string;
  status: ContentStatus;
  draft: boolean;
  featured: boolean;
  tags: string[];
  authors: string[];
  summary?: string;
  category?: string;
  cover?: string;
  image?: string;
  thumbnail?: string;
  canonical?: string;
  doi?: string;
  venue?: string;
  readingTime?: string;
  order?: number;
  links: string[];
  related: string[];
  notes: string[];
  papers: string[];
  experiments: string[];
  datasets: string[];
  concepts: string[];
  highlights: string[];
  todos: string[];
  quotes: string[];
  week?: number;
  pdf?: string;
  repository?: string;
  url?: string;
  milestone?: string;
};

export type ContentMeta = FrontmatterBase & {
  collection: ContentCollection | string;
  slug: string;
  path: string;
  href: string;
  wordCount: number;
  readingMinutes: number;
};

export type ContentItem = {
  meta: ContentMeta;
  body: string;
  excerpt: string;
};

export type RelatedContentOptions = {
  limit?: number;
  includeDrafts?: boolean;
  collections?: Array<ContentCollection | string>;
};

export type SearchDocument = {
  id: string;
  collection: string;
  slug: string;
  href: string;
  title: string;
  description: string;
  excerpt: string;
  tags: string[];
  authors: string[];
  date: string;
  body: string;
};

export type GraphNode = {
  id: string;
  title: string;
  href: string;
  collection: string;
  category?: string;
  tags: string[];
};

export type GraphEdge = {
  source: string;
  target: string;
  label: string;
};

export type Backlink = {
  source: ContentItem;
  reason: string;
};

export type WeeklyBucket = {
  key: string;
  label: string;
  start: string;
  end: string;
  items: ContentItem[];
  reflection?: ContentItem;
};

export type MdxComponentMap = Record<string, ComponentType<any>>;

export type MdxRenderResult = {
  content: ReactNode;
  frontmatter: ContentMeta;
};
