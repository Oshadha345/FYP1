import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Clock3, type LucideIcon } from "lucide-react";

import { StatusDot } from "@/components/schedule/status-dot";
import { WeekAccordion } from "@/components/schedule/week-accordion";
import { WeekGrid } from "@/components/schedule/week-grid";
import { projectWeeks, statusLabel } from "@/lib/schedule";

export const metadata: Metadata = {
  title: "FYP",
  description: "EE405 Undergraduate Project I roadmap, progress, literature review, and experiment status.",
};

export default function FypPage() {
  const completed = projectWeeks.filter((week) => week.status === "completed").length;
  const inProgress = projectWeeks.find((week) => week.status === "in-progress");
  const statusMetrics: Array<{
    label: string;
    value: number;
    icon: LucideIcon;
    color: string;
  }> = [
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-700" },
    {
      label: "In progress",
      value: projectWeeks.filter((week) => week.status === "in-progress").length,
      icon: Clock3,
      color: "text-rose-700",
    },
    {
      label: "Proposed",
      value: projectWeeks.filter((week) => week.status === "proposed").length,
      icon: Circle,
      color: "text-slate-500",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <header className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div>
          <p className="text-sm font-medium text-cyan-800">EE405 - Undergraduate Project I</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-light leading-tight tracking-tight text-slate-950 sm:text-6xl">
            FYP1 progress and contribution summary
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            A simple 14-week view of the work completed, the current implementation phase, and the planned work for the
            remainder of FYP1.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <Clock3 className="size-4 text-cyan-700" aria-hidden="true" />
            Current status
          </div>
          <div className="mt-5 text-4xl font-semibold text-slate-950">{completed}/14</div>
          <p className="mt-1 text-sm text-slate-500">weeks completed</p>
          {inProgress ? (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-900">
                <StatusDot status="in-progress" />
                {inProgress.code} - {inProgress.shortTitle}
              </div>
              <p className="mt-2 text-sm leading-6 text-rose-900/80">{inProgress.summary}</p>
            </div>
          ) : null}
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {statusMetrics.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
            <Icon className={`size-5 ${color}`} aria-hidden="true" />
            <div className="mt-4 text-3xl font-semibold text-slate-950">{value}</div>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Schedule matrix</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">14-week project plan</h2>
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2"><StatusDot status="completed" />Completed</span>
            <span className="inline-flex items-center gap-2"><StatusDot status="in-progress" />Active</span>
            <span className="inline-flex items-center gap-2"><StatusDot status="proposed" />Proposed</span>
          </div>
        </div>
        <WeekGrid compact />
      </section>

      <section className="mt-8">
        <WeekAccordion />
      </section>

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 shadow-sm">
        <div className="grid border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 sm:grid-cols-[5rem_minmax(0,1fr)_8rem]">
          <span>Week</span>
          <span>Title</span>
          <span>Status</span>
        </div>
        {projectWeeks.map((week) => (
          <Link
            key={week.code}
            href={week.logHref ?? `/fyp#week-${week.week}`}
            className="grid gap-2 border-b border-slate-100 px-4 py-4 text-sm transition last:border-b-0 hover:bg-cyan-50/50 sm:grid-cols-[5rem_minmax(0,1fr)_8rem]"
          >
            <span className="font-mono font-semibold text-slate-600">{week.code}</span>
            <span className="font-medium text-slate-950">{week.title}</span>
            <span className="inline-flex items-center gap-2 text-slate-600">
              <StatusDot status={week.status} />
              {statusLabel(week.status)}
            </span>
          </Link>
        ))}
      </section>

      <div className="mt-8 flex justify-end">
        <Link href="/weekly-logs" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-800 hover:text-cyan-950">
          Open weekly logs
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
