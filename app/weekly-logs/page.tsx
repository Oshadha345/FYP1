import type { Metadata } from "next";

import { WeekGrid } from "@/components/schedule/week-grid";

export const metadata: Metadata = {
  title: "Weekly Logs",
  description: "Weekly progress records for EE405 Undergraduate Project I.",
};

export default function WeeklyLogsPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <header className="max-w-3xl py-8">
        <p className="text-sm font-medium text-cyan-800">Weekly progress</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight text-slate-950 sm:text-6xl">14-week log index</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Each tile represents one project week. Completed and active weeks can open the available reflection or related
          project records. Proposed weeks remain visible so reviewers can understand the full FYP1 plan.
        </p>
      </header>

      <section className="rounded-[2rem] border border-slate-200 bg-white/72 p-5 shadow-sm backdrop-blur">
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Week tiles</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Progress map</h2>
        </div>
        <WeekGrid />
      </section>
    </div>
  );
}
