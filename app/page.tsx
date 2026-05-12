import Link from "next/link";
import { ArrowRight, ClipboardList, Search, Users } from "lucide-react";

import { ContentCard } from "@/components/content-card";
import { GraphView } from "@/components/knowledge/graph-view";
import { Badge } from "@/components/ui/badge";
import { buildKnowledgeGraph, getKnowledgeItems, getWeeklyBuckets } from "@/lib/content";
import { itemToCard } from "@/lib/format";

export default async function HomePage() {
  const [items, graph, weeks] = await Promise.all([
    getKnowledgeItems(),
    buildKnowledgeGraph(),
    getWeeklyBuckets(),
  ]);
  const latest = items.slice(0, 6);
  const noteCount = items.filter((item) => ["notes", "research_notes", "course_notes", "books", "experiments"].includes(item.meta.collection)).length;
  const paperCount = items.filter((item) => item.meta.collection === "papers").length;

  return (
    <div className="mx-auto max-w-7xl">
      <section className="grid min-h-[72vh] content-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div>
          <Badge tone="cyan">EE405 - Undergraduate Project I</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-zinc-50 sm:text-7xl">
            FYP1 contribution portfolio
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            This site records my contribution toward EE405 - Undergraduate Project I. It includes weekly progress,
            literature review notes, technical notes, experiment records, resources, and project milestones.
          </p>
          <div className="mt-6 grid gap-3 text-sm leading-6 text-zinc-400 sm:grid-cols-2">
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <div className="mb-2 flex items-center gap-2 font-medium text-zinc-100">
                <Users className="size-4 text-cyan-200" aria-hidden="true" />
                Team
              </div>
              <p>Oshadha Samarakoon, Dineth Perera, Thaariq Firdous</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <div className="mb-2 flex items-center gap-2 font-medium text-zinc-100">
                <ClipboardList className="size-4 text-cyan-200" aria-hidden="true" />
                Advisors
              </div>
              <p>Prof. Roshan Godaliyadda, Prof. Parakrama Ekanayake, Prof. Vijitha Herath</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/notes" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-cyan-300/40 bg-cyan-300 px-4 text-sm font-medium text-zinc-950 transition hover:bg-cyan-200">
              View notes
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/papers" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-4 text-sm font-medium text-zinc-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
              View literature review
            </Link>
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-panel">
          {[
            ["Total records", items.length],
            ["Technical notes", noteCount],
            ["Papers reviewed", paperCount],
            ["Weekly logs", weeks.length],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-md border border-white/10 bg-zinc-950/50 p-4">
              <span className="text-sm text-zinc-500">{label}</span>
              <span className="text-2xl font-semibold text-zinc-100">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <GraphView nodes={graph.nodes} edges={graph.edges} compact />
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <ClipboardList className="size-4 text-cyan-200" aria-hidden="true" />
            How to read this site
          </div>
          <p className="mt-4 text-sm leading-7 text-zinc-400">
            Start with the FYP page for the project status. Use Weekly Logs to see progress over time. Use Notes and
            Papers for the technical background and literature review.
          </p>
          <div className="mt-5 space-y-2 text-sm text-zinc-500">
            <div className="flex items-center gap-2"><Search className="size-4" /> Search across all records</div>
            <div className="flex items-center gap-2"><Users className="size-4" /> Clear sections for examiners and supervisors</div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-zinc-50">Recent work</h2>
            <p className="mt-1 text-sm text-zinc-500">Latest notes, literature records, weekly logs, and resources.</p>
          </div>
          <Link href="/weekly-logs" className="text-sm text-cyan-200 hover:text-cyan-100">Weekly progress</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {latest.map((item) => <ContentCard key={item.meta.href} card={itemToCard(item)} />)}
        </div>
      </section>
    </div>
  );
}
