import Link from "next/link";
import { ArrowLeft, FileText, Link2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/components/content-card";
import { itemToCard, contentHref } from "@/lib/format";
import { renderMdx } from "@/lib/mdx";
import type { Backlink, ContentItem } from "@/types/content";

export async function KnowledgeItemPage({
  item,
  backHref,
  backLabel,
  related,
  backlinks,
  paperMode = false,
}: {
  item: ContentItem;
  backHref: string;
  backLabel: string;
  related: ContentItem[];
  backlinks: Backlink[];
  paperMode?: boolean;
}) {
  const rendered = await renderMdx(item);

  return (
    <article className="mx-auto max-w-6xl">
      <Link href={backHref} className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-cyan-100">
        <ArrowLeft className="size-4" aria-hidden="true" />
        {backLabel}
      </Link>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <main>
          <div className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge tone="cyan">{item.meta.category ?? item.meta.collection.replace(/_/g, " ")}</Badge>
              {item.meta.tags.slice(0, 4).map((tag) => <Badge key={tag}>#{tag}</Badge>)}
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-zinc-50 sm:text-5xl">
              {item.meta.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">{item.meta.summary ?? item.excerpt}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-500">
              <time dateTime={item.meta.date}>{item.meta.date.slice(0, 10)}</time>
              <span>{item.meta.readingMinutes} min read</span>
              <span>{item.meta.wordCount} words</span>
            </div>
          </div>

          {paperMode ? <PaperWorkspace item={item} /> : null}

          <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-cyan-200 prose-strong:text-zinc-100">
            {rendered.content}
          </div>
        </main>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-max">
          {item.meta.pdf ? (
            <a
              href={item.meta.pdf}
              className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.045] p-3 text-sm text-zinc-300 transition hover:border-cyan-300/35 hover:text-cyan-100"
            >
              <FileText className="size-4" aria-hidden="true" />
              Open attached PDF
            </a>
          ) : null}
          <SidePanel title="Linked concepts" items={[...item.meta.concepts, ...item.meta.tags]} />
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
              <Link2 className="size-4 text-cyan-200" aria-hidden="true" />
              Backlinks
            </h2>
            <div className="mt-3 space-y-3">
              {backlinks.length ? backlinks.slice(0, 6).map((link) => (
                <Link key={link.source.meta.href} href={contentHref(link.source)} className="block rounded-md p-2 text-sm text-zinc-400 transition hover:bg-white/[0.06] hover:text-zinc-100">
                  <span className="block text-zinc-200">{link.source.meta.title}</span>
                  <span className="text-xs text-zinc-500">{link.reason}</span>
                </Link>
              )) : <p className="text-sm leading-6 text-zinc-500">No backlinks yet. Link this page from another entry in Decap CMS to grow the graph.</p>}
            </div>
          </div>
        </aside>
      </div>

      {related.length ? (
        <section className="mt-12">
          <h2 className="mb-4 text-sm font-semibold text-zinc-100">Related content</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((entry) => <ContentCard key={entry.meta.href} card={itemToCard(entry)} />)}
          </div>
        </section>
      ) : null}
    </article>
  );
}

function SidePanel({ title, items }: { title: string; items: string[] }) {
  const unique = Array.from(new Set(items)).filter(Boolean);
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <h2 className="text-sm font-semibold text-zinc-100">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {unique.length ? unique.slice(0, 12).map((item) => <Badge key={item}>#{item}</Badge>) : <p className="text-sm text-zinc-500">No concepts tagged.</p>}
      </div>
    </div>
  );
}

function PaperWorkspace({ item }: { item: ContentItem }) {
  return (
    <div className="mb-8 grid gap-3 rounded-lg border border-cyan-300/15 bg-cyan-300/[0.045] p-4 md:grid-cols-3">
      <WorkspaceBlock title="Summary" items={item.meta.highlights} fallback={item.meta.summary} />
      <WorkspaceBlock title="Implementation ideas" items={item.meta.todos} fallback="Capture TODO blocks, replications, and experiment ideas from the CMS." />
      <WorkspaceBlock title="Datasets and concepts" items={[...item.meta.datasets, ...item.meta.concepts]} fallback="Attach datasets, architecture notes, and linked concepts as metadata." />
    </div>
  );
}

function WorkspaceBlock({ title, items, fallback }: { title: string; items: string[]; fallback?: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-zinc-950/45 p-4">
      <h2 className="text-sm font-semibold text-zinc-100">{title}</h2>
      <div className="mt-3 space-y-2 text-sm leading-6 text-zinc-400">
        {items.length ? items.slice(0, 4).map((item) => <p key={item}>{item}</p>) : <p>{fallback}</p>}
      </div>
    </div>
  );
}
