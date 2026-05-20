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

import { StatusDot } from "@/components/schedule/status-dot";
import { cn } from "@/components/ui/cn";
import { projectWeeks, statusLabel, type ProjectWeek } from "@/lib/schedule";

const icons = [
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

export function WeekGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
      {projectWeeks.map((week, index) => {
        const Icon = icons[index] ?? Satellite;
        const href = week.logHref ?? `/fyp#week-${week.week}`;
        return <WeekTile key={week.code} week={week} href={href} icon={Icon} compact={compact} />;
      })}
    </div>
  );
}

function WeekTile({
  week,
  href,
  icon: Icon,
  compact,
}: {
  week: ProjectWeek;
  href: string;
  icon: typeof Satellite;
  compact: boolean;
}) {
  return (
    <Link
      id={`week-${week.week}`}
      href={href}
      className={cn(
        "group min-h-36 rounded-lg border bg-white/85 p-4 backdrop-blur transition hover:border-cyan-300",
        week.status === "completed" && "border-emerald-200",
        week.status === "in-progress" && "border-rose-300 ring-2 ring-rose-200",
        week.status === "proposed" && "border-slate-200",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-10 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.95),rgba(186,230,253,0.95)_42%,rgba(20,184,166,0.20))] text-cyan-800 shadow-inner transition group-hover:bg-cyan-100">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <StatusDot status={week.status} />
      </div>
      <div className="mt-5 font-mono text-xs font-semibold text-slate-500">{week.code}</div>
      <h3 className="mt-2 text-sm font-semibold leading-5 text-slate-950">{week.shortTitle}</h3>
      <p className="mt-2 text-xs text-slate-500">{statusLabel(week.status)}</p>

      {!compact && week.activityLinks.length ? (
        <div className="mt-4 space-y-1 border-t border-slate-100 pt-3">
          {week.activityLinks.slice(0, 2).map((activity) => (
            <span key={activity.href} className="block truncate text-xs text-slate-500">
              {activity.label}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
