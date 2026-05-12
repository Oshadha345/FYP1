import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KnowledgeItemPage } from "@/components/knowledge/item-page";
import { getBacklinks, getCollection, getContentBySlug, getRelatedContent } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const resources = await getCollection("resources");
  return resources.map((item) => ({ slug: item.meta.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug("resources", slug);
  return item ? { title: item.meta.title, description: item.meta.description } : {};
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getContentBySlug("resources", slug);
  if (!item) notFound();
  const [related, backlinks] = await Promise.all([getRelatedContent(item, { limit: 6 }), getBacklinks(item)]);

  return <KnowledgeItemPage item={item} backHref="/resources" backLabel="Resources" related={related} backlinks={backlinks} />;
}
