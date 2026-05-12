import type { Metadata } from "next";
import { CheckCircle2, Circle, FlaskConical, ScrollText } from "lucide-react";

import { ContentCard } from "@/components/content-card";
import { Badge } from "@/components/ui/badge";
import { getKnowledgeItems } from "@/lib/content";
import { itemToCard } from "@/lib/format";

export const metadata: Metadata = {
  title: "FYP",
  description: "EE405 Undergraduate Project I roadmap, progress, literature review, and experiment status.",
};

export default async function FypPage() {
  const items = await getKnowledgeItems();
  const fypItems = items.filter((item) =>
    item.meta.tags.includes("fyp") ||
    item.meta.tags.includes("calibration") ||
    item.meta.category?.toLowerCase().includes("experiment") ||
    item.meta.collection === "papers",
  );
  const papers = items.filter((item) => item.meta.collection === "papers");
  const experiments = items.filter((item) => item.meta.collection === "experiments");

  const milestones = [
    ["Scope and research questions", true],
    ["Literature matrix", papers.length > 0],
    ["Baseline experiments", experiments.length > 0],
    ["Benchmark table", false],
    ["Final write-up", false],
  ] as const;

  return (
    <div className="mx-auto max-w-7xl">
      <header className="max-w-3xl py-8">
        <p className="text-sm font-medium text-cyan-200">EE405 - Undergraduate Project I</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-zinc-50 sm:text-6xl">FYP1 progress and contribution summary</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-400">
          This page summarizes my FYP1 work: literature review, project understanding, technical notes, experiment
          records, weekly progress, and remaining tasks.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <ScrollText className="size-5 text-cyan-200" aria-hidden="true" />
          <div className="mt-4 text-3xl font-semibold text-zinc-50">{papers.length}</div>
          <p className="mt-1 text-sm text-zinc-500">papers reviewed</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <FlaskConical className="size-5 text-cyan-200" aria-hidden="true" />
          <div className="mt-4 text-3xl font-semibold text-zinc-50">{experiments.length}</div>
          <p className="mt-1 text-sm text-zinc-500">experiment notes</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <Badge tone="cyan">roadmap</Badge>
          <div className="mt-4 text-3xl font-semibold text-zinc-50">{milestones.filter(([, done]) => done).length}/{milestones.length}</div>
          <p className="mt-1 text-sm text-zinc-500">milestones documented</p>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.035] p-5">
        <h2 className="text-lg font-semibold text-zinc-50">Milestones</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {milestones.map(([label, done]) => (
            <div key={label} className="rounded-md border border-white/10 bg-zinc-950/45 p-4">
              {done ? <CheckCircle2 className="size-5 text-cyan-200" /> : <Circle className="size-5 text-zinc-600" />}
              <p className="mt-3 text-sm leading-6 text-zinc-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-zinc-50">Related project records</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {fypItems.slice(0, 9).map((item) => <ContentCard key={item.meta.href} card={itemToCard(item)} />)}
        </div>
      </section>
    </div>
  );
}
