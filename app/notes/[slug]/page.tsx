import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KnowledgeItemPage } from "@/components/knowledge/item-page";
import { getBacklinks, getRelatedContent, getRouteCollection, getRouteItem } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getRouteCollection("notes");
  return items.map((item) => ({ slug: item.meta.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getRouteItem("notes", slug);
  return item ? { title: item.meta.title, description: item.meta.description } : {};
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getRouteItem("notes", slug);
  if (!item) notFound();

  const [related, backlinks] = await Promise.all([
    getRelatedContent(item, { limit: 6 }),
    getBacklinks(item),
  ]);

  return <KnowledgeItemPage item={item} backHref="/notes" backLabel="All notes" related={related} backlinks={backlinks} />;
}
