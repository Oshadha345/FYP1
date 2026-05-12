import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { KnowledgeItemPage } from "@/components/knowledge/item-page";
import { getBacklinks, getCollection, getContentBySlug, getRelatedContent } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getCollection("blogs");
  return posts.map((item) => ({ slug: item.meta.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getContentBySlug("blogs", slug);
  return item ? { title: item.meta.title, description: item.meta.description } : {};
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getContentBySlug("blogs", slug);
  if (!item) notFound();
  const [related, backlinks] = await Promise.all([getRelatedContent(item, { limit: 6 }), getBacklinks(item)]);

  return <KnowledgeItemPage item={item} backHref="/blog" backLabel="Essays" related={related} backlinks={backlinks} />;
}
