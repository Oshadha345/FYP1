import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { StatusDot } from "@/components/schedule/status-dot";
import { Badge } from "@/components/ui/badge";
import { getCollection, getContentBySlug } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { projectWeeks, statusLabel } from "@/lib/schedule";
import {
  defaultWeekSlug,
  findProjectWeekBySlug,
  getWeeklyProgress,
} from "@/lib/weekly-progress";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const logs = await getCollection("weekly_logs");
  const logParams = logs.map((item) => ({ slug: item.meta.slug }));
  const weekParams = projectWeeks.map((week) => ({ slug: defaultWeekSlug(week) }));

  return [...logParams, ...weekParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [item, progress] = await Promise.all([
    getContentBySlug("weekly_logs", slug),
    getWeeklyProgress(),
  ]);
  const week = item?.meta.week
    ? projectWeeks.find((entry) => entry.week === item.meta.week)
    : findProjectWeekBySlug(slug);
  const reflection = week ? progress.reflectionsByWeek[week.week] : undefined;

  if (reflection) {
    return { title: reflection.title, description: reflection.summary };
  }

  return week
    ? { title: `${week.code} - ${week.title}`, description: week.summary }
    : {};
}

export default async function WeeklyLogPage({ params }: PageProps) {
  const { slug } = await params;
  const [item, progress] = await Promise.all([
    getContentBySlug("weekly_logs", slug),
    getWeeklyProgress(),
  ]);
  const week = item?.meta.week
    ? projectWeeks.find((entry) => entry.week === item.meta.week)
    : findProjectWeekBySlug(slug);

  if (!week) notFound();

  const reflectionItem = progress.reflectionItemsByWeek[week.week] ?? item;
  const reflection = progress.reflectionsByWeek[week.week];
  const activities = progress.activitiesByWeek[week.week] ?? [];
  const rendered = reflectionItem ? await renderMdx(reflectionItem) : null;

  return (
    <article className="mx-auto max-w-5xl">
      <Link href="/weekly-logs" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-cyan-800">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Weekly logs
      </Link>

      <header className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white/78 p-5 shadow-sm backdrop-blur md:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={week.status === "completed" ? "green" : week.status === "in-progress" ? "rose" : "zinc"}>
              {week.code}
            </Badge>
            <span className="inline-flex items-center gap-2 text-sm text-slate-500">
              <StatusDot status={week.status} />
              {statusLabel(week.status)}
            </span>
          </div>
          <h1 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-slate-950">
            {week.title}
          </h1>
        </div>
        <div className="flex rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-cyan-50/50 to-emerald-50/50 p-4">
          <p className="self-center text-lg leading-8 text-slate-600">{week.summary}</p>
        </div>
      </header>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white/82 p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Weekly reflection</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              {reflection?.title ?? "Reflection not added yet"}
            </h2>
          </div>
          {reflection ? <time className="font-mono text-xs text-slate-500">{reflection.date}</time> : null}
        </div>

        {rendered ? (
          <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-cyan-700 prose-strong:text-slate-950">
            {rendered.content}
          </div>
        ) : (
          <p className="text-sm leading-7 text-slate-500">
            This week page is ready, but the reflection has not been written in the CMS yet.
          </p>
        )}
      </section>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white/82 p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Week activity</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Linked records</h2>
        </div>

        {activities.length ? (
          <div className="grid grid-cols-2 gap-3">
            {activities.map((activity) => (
              <Link
                key={`${activity.href}-${activity.title}`}
                href={activity.href}
                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-cyan-300 hover:bg-cyan-50/40"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <span className="w-max rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500 sm:text-[11px]">
                    {activity.kind}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 sm:text-xs">{activity.date}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-5 text-slate-950">{activity.title}</h3>
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{activity.summary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-sm leading-7 text-slate-500">
            No linked activity records yet.
          </p>
        )}
      </section>
    </article>
  );
}
