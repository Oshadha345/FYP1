import type { Metadata } from "next";

import { ContentList } from "@/components/knowledge/content-list";
import { GraphView } from "@/components/knowledge/graph-view";
import { buildKnowledgeGraph, getUnifiedNotes } from "@/lib/content";
import { categoryClassName } from "@/lib/format";

export const metadata: Metadata = {
  title: "Notes",
  description: "Technical notes related to the EE405 Undergraduate Project I work.",
};

export default async function NotesPage() {
  const [items, graph] = await Promise.all([getUnifiedNotes(), buildKnowledgeGraph()]);
  const categoryCounts = Array.from(
    items.reduce((counts, item) => {
      const category = item.meta.category ?? "uncategorized";
      counts.set(category, (counts.get(category) ?? 0) + 1);
      return counts;
    }, new Map<string, number>()),
  ).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="mx-auto max-w-7xl">
      <header className="max-w-3xl py-8">
        <p className="text-sm font-semibold text-cyan-800">Technical notes</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950 sm:text-6xl">Project notes and supporting theory</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          These notes document the concepts, methods, equations, implementation details, and course material used for
          my FYP1 contribution. Use the category filters to view only one type of note.
        </p>
      </header>
      <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categoryCounts.map(([category, count]) => (
          <div key={category} className={`rounded-lg border p-4 ${categoryClassName(category)}`}>
            <div className="text-sm font-medium capitalize">{category}</div>
            <div className="mt-2 text-2xl font-semibold">{count}</div>
            <p className="mt-1 text-xs opacity-75">{count === 1 ? "record" : "records"}</p>
          </div>
        ))}
      </section>
      <GraphView nodes={graph.nodes.filter((node) => node.collection === "notes")} edges={graph.edges} compact />
      <ContentList items={items} title="Note index" />
    </div>
  );
}
