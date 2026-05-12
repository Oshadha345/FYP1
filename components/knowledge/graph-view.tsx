"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { GraphEdge, GraphNode } from "@/types/content";
import { cn } from "@/components/ui/cn";

export function GraphView({
  nodes,
  edges,
  compact = false,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
  compact?: boolean;
}) {
  const [active, setActive] = useState<string | null>(nodes[0]?.id ?? null);
  const visibleNodes = nodes.slice(0, compact ? 12 : 28);

  const connected = useMemo(() => {
    if (!active) return new Set<string>();
    return new Set(
      edges
        .filter((edge) => edge.source === active || edge.target === active)
        .flatMap((edge) => [edge.source, edge.target]),
    );
  }, [active, edges]);

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-100">Related records</h2>
          <p className="mt-1 text-xs text-zinc-500">{nodes.length} records, {edges.length} links</p>
        </div>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs text-cyan-100">
          linked index
        </span>
      </div>
      <div className="relative min-h-72 overflow-hidden rounded-md border border-white/10 bg-zinc-950/70 p-4">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="relative flex flex-wrap content-center justify-center gap-3">
          {visibleNodes.map((node, index) => {
            const isActive = node.id === active;
            const isConnected = connected.has(node.id);
            return (
              <Link
                key={node.id}
                href={node.href}
                onMouseEnter={() => setActive(node.id)}
                className={cn(
                  "max-w-44 rounded-full border px-3 py-2 text-xs transition",
                  "hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-cyan-100",
                  isActive
                    ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-50 shadow-glow"
                    : isConnected
                      ? "border-cyan-300/25 bg-white/[0.07] text-zinc-100"
                      : "border-white/10 bg-white/[0.045] text-zinc-400",
                )}
                style={{ transform: `translateY(${index % 3 === 0 ? "10px" : "0"})` }}
              >
                <span className="block truncate">{node.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
