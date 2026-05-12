import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KnowledgeItemPage } from "@/components/knowledge/item-page";
import { getBacklinks, getCollection, getContentBySlug, getRelatedContent } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const logs = await getCollection("weekly_logs");
  return logs.map((item) => ({ slug: item.meta.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug("weekly_logs", slug);
  return item ? { title: item.meta.title, description: item.meta.description } : {};
}

export default async function WeeklyLogPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getContentBySlug("weekly_logs", slug);
  if (!item) notFound();
  const [related, backlinks] = await Promise.all([getRelatedContent(item, { limit: 6 }), getBacklinks(item)]);

  return <KnowledgeItemPage item={item} backHref="/weekly-logs" backLabel="Weekly logs" related={related} backlinks={backlinks} />;
}
