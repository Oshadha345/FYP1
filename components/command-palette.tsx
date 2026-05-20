"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Command, FileSearch, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { searchableNavigation } from "@/lib/navigation";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<Array<{ title: string; href: string; description: string; tags: string[] }>>([]);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const navResults = searchableNavigation.filter((item) =>
      !normalized || [item.title, item.description, ...item.keywords]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
    const contentResults = documents.filter((item) =>
      normalized &&
      [item.title, item.description, ...item.tags].join(" ").toLowerCase().includes(normalized),
    );

    return [...navResults, ...contentResults].slice(0, 12);
  }, [documents, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isShortcut) {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    if (!open || documents.length) return;
    fetch("/api/search")
      .then((response) => response.json())
      .then((data) => setDocuments(data))
      .catch(() => setDocuments([]));
  }, [documents.length, open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <Button
        variant="outline"
        className="h-10 w-full justify-between px-3 text-slate-500 md:w-72"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="inline-flex min-w-0 items-center gap-2">
          <Search className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">Search FYP records</span>
        </span>
        <kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-500">
          Ctrl K
        </kbd>
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-slate-950/20 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
              <Command className="size-5 text-cyan-700" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && results[0]) {
                    router.push(results[0].href);
                    setOpen(false);
                  }
                }}
                className="h-10 flex-1 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400"
                placeholder="Jump to notes, papers, weekly logs, resources, or FYP"
              />
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close command palette">
                <X className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {results.length ? (
                results.map((item) => {
                  const Icon = "icon" in item ? item.icon : FileSearch;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-start gap-3 rounded-md px-3 py-3 transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none",
                        pathname === item.href && "bg-cyan-50",
                      )}
                    >
                      <Icon className="mt-0.5 size-5 text-cyan-700" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-slate-950">{item.title}</span>
                        <span className="block truncate text-xs text-slate-500">{item.description}</span>
                      </span>
                    </Link>
                  );
                })
              ) : (
                <div className="flex items-center gap-3 px-3 py-8 text-sm text-slate-500">
                  <FileSearch className="size-5" aria-hidden="true" />
                  No matching route found.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
