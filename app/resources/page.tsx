import type { Metadata } from "next";

import { ContentList } from "@/components/knowledge/content-list";
import { getCollection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description: "Datasets, tools, templates, references, and useful links for the FYP work.",
};

export default async function ResourcesPage() {
  const resources = await getCollection("resources");

  return (
    <div className="mx-auto max-w-7xl">
      <header className="max-w-3xl py-8">
        <p className="text-sm font-semibold text-cyan-800">Resources</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950 sm:text-6xl">Project references and useful files</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          This section keeps datasets, tools, templates, PDFs, links, and other material used during the project.
        </p>
      </header>
      <ContentList items={resources} title="Resource index" />
    </div>
  );
}
