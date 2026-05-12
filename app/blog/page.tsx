import type { Metadata } from "next";

import { ContentList } from "@/components/knowledge/content-list";
import { getCollection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Long-form project explanations and technical write-ups.",
};

export default async function BlogPage() {
  const posts = await getCollection("blogs");

  return (
    <div className="mx-auto max-w-7xl">
      <header className="max-w-3xl py-8">
        <p className="text-sm font-medium text-cyan-200">Write-ups</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-zinc-50 sm:text-6xl">Longer project explanations</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-400">
          This section is for clear explanations of important project decisions, technical findings, and lessons learned
          during FYP1.
        </p>
      </header>
      <ContentList items={posts} title="Write-up index" />
    </div>
  );
}
