import type { Metadata } from "next";

import { WeeklyLogBoard } from "@/components/schedule/weekly-log-board";
import { getWeeklyProgress } from "@/lib/weekly-progress";

export const metadata: Metadata = {
  title: "Weekly Logs",
  description: "Weekly progress records for EE405 Undergraduate Project I.",
};

export default async function WeeklyLogsPage() {
  const { activitiesByWeek, reflectionsByWeek } = await getWeeklyProgress();

  return (
    <div className="mx-auto max-w-7xl">
      <header className="max-w-3xl py-8">
        <p className="text-sm font-medium text-cyan-800">Weekly progress</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight text-slate-950 sm:text-6xl">14-week log index</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Select a week to open its reflection page. Each week page keeps the reflection first, followed by linked notes,
          papers, resources, and experiment records for that period.
        </p>
      </header>

      <section className="rounded-[2rem] border border-slate-200 bg-white/72 p-5 shadow-sm backdrop-blur">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Week tiles</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Progress map</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            Green means completed, red outline means active, and empty tiles are planned weeks.
          </p>
        </div>
        <WeeklyLogBoard activitiesByWeek={activitiesByWeek} reflectionsByWeek={reflectionsByWeek} />
      </section>
    </div>
  );
}
