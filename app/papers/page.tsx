import type { Metadata } from "next";

import { ContentList } from "@/components/knowledge/content-list";
import { getCollection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Papers",
  description: "Literature review records for the EE405 Undergraduate Project I work.",
};

export default async function PapersPage() {
  const papers = await getCollection("papers");

  return (
    <div className="mx-auto max-w-7xl">
      <header className="max-w-3xl py-8">
        <p className="text-sm font-medium text-cyan-200">Literature review</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950 sm:text-6xl">Papers reviewed for the project</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Each record summarizes one paper: the main idea, useful methods, important equations, limitations, and how it
          connects to our FYP work.
        </p>
      </header>
      <ContentList items={papers} title="Paper index" />
    </div>
  );
}
