import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Code2,
  Database,
  FileCheck2,
  FileSearch,
  Layers,
  Map,
  PenTool,
  Radar,
  Satellite,
  ScanLine,
  Settings,
  Target,
} from "lucide-react";
import type { ComponentType } from "react";

import { StatusDot } from "@/components/schedule/status-dot";
import { cn } from "@/components/ui/cn";
import { activeWeek, projectWeeks, statusLabel } from "@/lib/schedule";
import { weekHref, type WeeklyActivity, type WeeklyReflection } from "@/lib/weekly-progress";

type WeeklyLogBoardProps = {
  activitiesByWeek: Record<number, WeeklyActivity[]>;
  reflectionsByWeek: Record<number, WeeklyReflection | undefined>;
};

const weekIcons: Array<ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = [
  BookOpen,
  Database,
  Target,
  Settings,
  Satellite,
  Radar,
  Map,
  FileCheck2,
  ScanLine,
  Layers,
  PenTool,
  Code2,
  BarChart3,
  FileSearch,
];

export function WeeklyLogBoard({ activitiesByWeek, reflectionsByWeek }: WeeklyLogBoardProps) {
  const currentWeekReflection = reflectionsByWeek[activeWeek.week];

  return (
    <div className="space-y-6">
      <Link
        href={weekHref(activeWeek, currentWeekReflection)}
        className="group grid gap-4 rounded-3xl border border-rose-200 bg-gradient-to-br from-white via-rose-50/70 to-cyan-50/70 p-5 shadow-sm transition hover:border-rose-300 hover:shadow-md md:grid-cols-[18rem_minmax(0,1fr)]"
      >
        <div className="rounded-2xl border border-white/70 bg-white/70 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-3 py-1 text-xs font-medium text-rose-800">
              <StatusDot status={activeWeek.status} />
              Current week
            </span>
            <span className="font-mono text-xs font-semibold text-slate-500">{activeWeek.code}</span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{activeWeek.title}</h2>
        </div>
        <div className="flex flex-col justify-between rounded-2xl border border-white/70 bg-white/45 p-4">
          <p className="text-sm leading-7 text-slate-600">{activeWeek.summary}</p>
          <span className="mt-4 text-sm font-medium text-cyan-800 transition group-hover:text-cyan-950">
            Open active week
          </span>
        </div>
      </Link>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
        {projectWeeks.map((entry, index) => {
          const Icon = weekIcons[index] ?? Satellite;
          const activityCount = activitiesByWeek[entry.week]?.length ?? entry.activityLinks.length;
          const reflection = reflectionsByWeek[entry.week];

          return (
            <Link
              key={entry.code}
              id={`week-${entry.week}`}
              href={weekHref(entry, reflection)}
              className={cn(
                "group min-h-36 rounded-xl border bg-white/82 p-4 text-left backdrop-blur transition hover:border-cyan-300 hover:bg-white",
                entry.status === "completed" && "border-emerald-200",
                entry.status === "in-progress" && "border-rose-300 ring-2 ring-rose-200",
                entry.status === "proposed" && "border-slate-200",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid size-10 place-items-center rounded-[1.15rem] bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.98),rgba(186,230,253,0.92)_38%,rgba(52,211,153,0.25)_66%,rgba(251,146,60,0.16)_100%)] text-cyan-800 shadow-inner transition group-hover:scale-[1.03]">
                  <Icon className="size-5" aria-hidden />
                </div>
                <StatusDot status={entry.status} />
              </div>
              <div className="mt-5 font-mono text-xs font-semibold text-slate-500">{entry.code}</div>
              <h3 className="mt-2 text-sm font-semibold leading-5 text-slate-950">{entry.shortTitle}</h3>
              <p className="mt-2 text-xs text-slate-500">{statusLabel(entry.status)}</p>
              <p className="mt-3 text-xs text-slate-400">
                {activityCount} {activityCount === 1 ? "record" : "records"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
