"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import { ContentCard } from "@/components/content-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryClassName, type KnowledgeCard } from "@/lib/format";

export function FilterableContent({
  cards,
  categories = [],
  tags,
  title = "Indexed entries",
}: {
  cards: KnowledgeCard[];
  categories?: string[];
  tags: string[];
  title?: string;
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return cards.filter((card) => {
      const matchesQuery =
        !normalized ||
        [card.title, card.summary, card.kind, card.status, card.category ?? "", ...card.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesTag = !activeTag || card.tags.includes(activeTag);
      const matchesCategory = !activeCategory || card.category === activeCategory;
      return matchesQuery && matchesTag && matchesCategory;
    });
  }, [activeCategory, activeTag, cards, query]);

  return (
    <section className="mt-8" aria-labelledby="content-index-title">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-cyan-800">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            <h2 id="content-index-title">{title}</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500">{filtered.length} records shown</p>
        </div>
        <label className="relative block w-full lg:w-80">
          <span className="sr-only">Search entries</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 w-full rounded-md border border-slate-200 bg-white/80 pl-9 pr-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400"
            placeholder="Search title, category, or tag"
          />
        </label>
      </div>

      {categories.length ? (
        <div className="mb-4 flex flex-wrap gap-2" aria-label="Filter by note category">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs text-slate-500 transition hover:border-cyan-300 hover:text-cyan-800 aria-pressed:border-cyan-400 aria-pressed:bg-cyan-50 aria-pressed:text-cyan-800"
            aria-pressed={!activeCategory}
          >
            All categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory((value) => (value === category ? null : category))}
              className={`rounded-full border px-3 py-1.5 text-xs transition hover:brightness-125 ${categoryClassName(category)}`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mb-5 flex flex-wrap gap-2">
        {tags.slice(0, 14).map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag((value) => (value === tag ? null : tag))}
            className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs text-slate-500 transition hover:border-cyan-300 hover:text-cyan-800 aria-pressed:border-cyan-400 aria-pressed:bg-cyan-50 aria-pressed:text-cyan-800"
            aria-pressed={activeTag === tag}
          >
            #{tag}
          </button>
        ))}
        {activeTag ? (
          <Button variant="ghost" size="sm" onClick={() => setActiveTag(null)}>
            <X className="size-4" aria-hidden="true" />
            Clear tag
          </Button>
        ) : null}
        {activeCategory ? (
          <Button variant="ghost" size="sm" onClick={() => setActiveCategory(null)}>
            <X className="size-4" aria-hidden="true" />
            Clear category
          </Button>
        ) : null}
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((card) => (
            <ContentCard key={`${card.href}-${card.title}`} card={card} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-slate-200 bg-white/80 p-8 text-center">
          <Badge>No results</Badge>
          <p className="mt-3 text-sm text-slate-500">Adjust the search query or remove the selected tag.</p>
        </div>
      )}
    </section>
  );
}
