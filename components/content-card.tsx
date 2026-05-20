import Link from "next/link";
import { ArrowUpRight, Clock3, Dot } from "lucide-react";

import { cn } from "@/components/ui/cn";
import { categoryClassName, type KnowledgeCard } from "@/lib/format";

export function ContentCard({ card, compact = false }: { card: KnowledgeCard; compact?: boolean }) {
  return (
    <Link
      href={card.href}
      className={cn(
        "group flex h-full flex-col rounded-lg border border-slate-200 bg-white/85 p-5 transition",
        "hover:border-cyan-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", categoryClassName(card.category))}>
          {card.category ?? card.kind}
        </span>
        <ArrowUpRight className="size-4 shrink-0 text-slate-400 transition group-hover:text-cyan-700" aria-hidden="true" />
      </div>
      <h3 className={cn("font-semibold text-slate-950", compact ? "text-sm" : "text-base")}>{card.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{card.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {card.tags.slice(0, compact ? 2 : 3).map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-slate-500">
        <time dateTime={card.date}>{card.date}</time>
        <Dot className="size-4" aria-hidden="true" />
        <span className="inline-flex items-center gap-1">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {card.readingMinutes ? `${card.readingMinutes} min` : card.kind}
        </span>
      </div>
    </Link>
  );
}
