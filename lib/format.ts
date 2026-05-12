import type { ContentItem } from "@/types/content";
import { routeForCollection } from "@/lib/routes";

export type KnowledgeCard = {
  title: string;
  href: string;
  summary: string;
  kind: string;
  date: string;
  status: "draft" | "published" | "archived";
  tags: string[];
  readingMinutes?: number;
  category?: string;
};

export function contentHref(item: ContentItem) {
  return `/${routeForCollection(item.meta.collection)}/${item.meta.slug}`;
}

export function collectionLabel(collection: string) {
  const labels: Record<string, string> = {
    blogs: "essay",
    blog: "essay",
    books: "book",
    course_notes: "course",
    experiments: "experiment",
    notes: "note",
    papers: "paper",
    research_notes: "note",
    resources: "resource",
    weekly_logs: "weekly log",
  };

  return labels[collection] ?? collection.replace(/_/g, " ");
}

export function itemToCard(item: ContentItem): KnowledgeCard {
  return {
    title: item.meta.title,
    href: contentHref(item),
    summary: item.meta.summary ?? item.excerpt,
    kind: collectionLabel(item.meta.collection),
    date: item.meta.date.slice(0, 10),
    status: item.meta.status,
    tags: item.meta.tags,
    readingMinutes: item.meta.readingMinutes,
    category: item.meta.category,
  };
}

export function uniqueTags(items: ContentItem[]) {
  return Array.from(new Set(items.flatMap((item) => item.meta.tags))).sort();
}

export function uniqueCategories(items: ContentItem[]) {
  return Array.from(
    new Set(items.map((item) => item.meta.category).filter((category): category is string => Boolean(category))),
  ).sort();
}

export function categoryClassName(category?: string) {
  const normalized = category?.toLowerCase() ?? "";

  if (normalized.includes("research")) {
    return "border-cyan-300/25 bg-cyan-300/10 text-cyan-100";
  }
  if (normalized.includes("math")) {
    return "border-violet-300/25 bg-violet-300/10 text-violet-100";
  }
  if (normalized.includes("deep") || normalized.includes("model")) {
    return "border-blue-300/25 bg-blue-300/10 text-blue-100";
  }
  if (normalized.includes("course")) {
    return "border-emerald-300/25 bg-emerald-300/10 text-emerald-100";
  }
  if (normalized.includes("program") || normalized.includes("system")) {
    return "border-amber-300/25 bg-amber-300/10 text-amber-100";
  }
  if (normalized.includes("experiment")) {
    return "border-rose-300/25 bg-rose-300/10 text-rose-100";
  }

  return "border-white/10 bg-white/[0.06] text-zinc-300";
}
