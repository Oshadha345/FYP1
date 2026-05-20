"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { StatusDot } from "@/components/schedule/status-dot";
import { cn } from "@/components/ui/cn";
import { activeWeek, projectWeeks, statusLabel } from "@/lib/schedule";

export function WeekAccordion() {
  const [openWeek, setOpenWeek] = useState(activeWeek.week);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/78 p-4 backdrop-blur sm:p-5">
      <div className="pointer-events-none absolute -left-24 top-16 size-64 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 size-64 rounded-full bg-cyan-200/24 blur-3xl" />

      <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">14-week schedule</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">EE405 FYP1 timeline</h2>
        </div>
        <div className="flex gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-2"><StatusDot status="completed" />Done</span>
          <span className="inline-flex items-center gap-2"><StatusDot status="in-progress" />Active</span>
          <span className="inline-flex items-center gap-2"><StatusDot status="proposed" />Next</span>
        </div>
      </div>

      <div className="relative space-y-3">
        {projectWeeks.map((week) => {
          const open = openWeek === week.week;
          return (
            <article
              key={week.code}
              className={cn(
                "rounded-lg border bg-white/86 transition-all duration-300",
                open ? "border-slate-300" : "border-slate-200 hover:border-slate-300",
              )}
            >
              <button
                type="button"
                onClick={() => setOpenWeek(open ? 0 : week.week)}
                className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
                aria-expanded={open}
              >
                <StatusDot status={week.status} />
                <span className="w-12 shrink-0 font-mono text-xs font-semibold text-slate-500">{week.code}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-950 sm:text-base">{week.title}</span>
                  <span className="mt-1 block text-xs text-slate-500">{week.focus} · {statusLabel(week.status)}</span>
                </span>
                <ChevronDown
                  className={cn("size-4 shrink-0 text-slate-400 transition", open && "rotate-180 text-slate-700")}
                  aria-hidden="true"
                />
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300",
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-slate-100 px-4 pb-5 pt-4 text-sm leading-7 text-slate-600 sm:px-5">
                    <p>{week.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {week.logHref ? (
                        <Link
                          href={week.logHref}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
                        >
                          Open weekly reflection
                        </Link>
                      ) : null}
                      <Link
                        href={`/fyp#week-${week.week}`}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700"
                      >
                        View in FYP overview
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
