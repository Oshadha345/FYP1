import Link from "next/link";
import { ArrowRight, ClipboardList, FileText, Users } from "lucide-react";

import { SatelliteVisual } from "@/components/schedule/satellite-visual";
import { WeekAccordion } from "@/components/schedule/week-accordion";
import { WeekGrid } from "@/components/schedule/week-grid";
import { getKnowledgeItems, getWeeklyBuckets } from "@/lib/content";
import { activeWeek, projectWeeks } from "@/lib/schedule";

export default async function HomePage() {
  const [items, weeks] = await Promise.all([getKnowledgeItems(), getWeeklyBuckets()]);
  const completed = projectWeeks.filter((week) => week.status === "completed").length;
  const papers = items.filter((item) => item.meta.collection === "papers").length;
  const notes = items.filter((item) => ["notes", "research_notes", "course_notes", "books", "experiments"].includes(item.meta.collection)).length;

  return (
    <div className="mx-auto max-w-7xl">
      <section className="grid min-h-[calc(100vh-7rem)] items-center gap-8 py-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(28rem,1.08fr)] lg:py-16">
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-cyan-800">
            EE405 - Undergraduate Project I
          </div>
          <div>
            <h1 className="max-w-3xl text-5xl font-light leading-[1.02] tracking-tight text-slate-950 sm:text-7xl">
              Satellite based change detection
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Portfolio of my FYP1 contribution: weekly progress, literature review, dataset planning,
              benchmark setup, and technical notes for remote sensing change detection.
            </p>
          </div>

          <div className="grid gap-3 text-sm leading-6 text-slate-600 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur">
              <div className="mb-2 flex items-center gap-2 font-medium text-slate-950">
                <Users className="size-4 text-cyan-700" aria-hidden="true" />
                Team
              </div>
              <p>Oshadha Samarakoon, Dineth Perera, Thaariq Firdous</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur">
              <div className="mb-2 flex items-center gap-2 font-medium text-slate-950">
                <ClipboardList className="size-4 text-cyan-700" aria-hidden="true" />
                Advisors
              </div>
              <p>Prof. Roshan Godaliyadda, Prof. Parakrama Ekanayake, Prof. Vijitha Herath</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/fyp"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-950 bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              View project schedule
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/weekly-logs"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 text-sm font-medium text-slate-800 transition hover:border-cyan-400 hover:text-cyan-800"
            >
              Open weekly logs
            </Link>
          </div>
        </div>

        <SatelliteVisual />
      </section>

      <section className="grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Completed weeks", `${completed}/14`],
          ["Active week", activeWeek.code],
          ["Papers reviewed", papers],
          ["Technical records", notes + weeks.length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white/80 p-5 backdrop-blur">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-3 text-3xl font-semibold text-slate-950">{value}</div>
          </div>
        ))}
      </section>

      <section className="py-12 lg:py-16">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">At a glance</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Weekly status overview</h2>
          </div>
          <Link href="/weekly-logs" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-800 hover:text-cyan-950">
            See weekly reflections
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <WeekGrid compact />
      </section>

      <section className="py-12 lg:py-16">
        <WeekAccordion />
      </section>

      <section className="grid gap-4 py-12 md:grid-cols-3 lg:py-16">
        {[
          ["FYP", "Progress summary, milestones, and 14-week plan.", "/fyp"],
          ["Papers", "Literature review notes and paper summaries.", "/papers"],
          ["Notes", "Technical notes, equations, datasets, and implementation records.", "/notes"],
        ].map(([title, description, href]) => (
          <Link
            key={title}
            href={href}
            className="rounded-lg border border-slate-200 bg-white/75 p-5 transition hover:border-cyan-300"
          >
            <FileText className="size-5 text-cyan-700" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-semibold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
