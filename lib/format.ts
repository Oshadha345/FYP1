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
    return "border-cyan-200 bg-cyan-50 text-cyan-800";
  }
  if (normalized.includes("math")) {
    return "border-violet-200 bg-violet-50 text-violet-800";
  }
  if (normalized.includes("deep") || normalized.includes("model")) {
    return "border-blue-200 bg-blue-50 text-blue-800";
  }
  if (normalized.includes("course")) {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
  if (normalized.includes("program") || normalized.includes("system")) {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }
  if (normalized.includes("experiment")) {
    return "border-rose-200 bg-rose-50 text-rose-800";
  }

  return "border-slate-200 bg-slate-50 text-slate-600";
}
