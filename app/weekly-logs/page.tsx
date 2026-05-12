import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { getWeeklyBuckets } from "@/lib/content";
import { contentHref, collectionLabel } from "@/lib/format";

export const metadata: Metadata = {
  title: "Weekly Logs",
  description: "Weekly progress records for EE405 Undergraduate Project I.",
};

export default async function WeeklyLogsPage() {
  const weeks = await getWeeklyBuckets();

  return (
    <div className="mx-auto max-w-5xl">
      <header className="max-w-3xl py-8">
        <p className="text-sm font-medium text-cyan-200">Weekly progress</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-zinc-50 sm:text-6xl">Progress by week</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-400">
          Each week shows the work completed during that period, including notes, papers, experiments, resources, and
          a short weekly reflection where available.
        </p>
      </header>

      <div className="space-y-6">
        {weeks.map((week) => (
          <section key={week.key} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-zinc-50">{week.label}</h2>
                <p className="mt-1 text-sm text-zinc-500">{week.start} to {week.end}</p>
              </div>
              {week.reflection ? <Link href={contentHref(week.reflection)} className="text-sm text-cyan-200 hover:text-cyan-100">Open reflection</Link> : null}
            </div>
            <div className="mt-5 space-y-3">
              {week.items.map((item) => (
                <Link key={item.meta.href} href={contentHref(item)} className="grid gap-3 rounded-md border border-white/10 bg-zinc-950/45 p-3 transition hover:border-cyan-300/30 hover:bg-white/[0.06] sm:grid-cols-[8rem_minmax(0,1fr)]">
                  <div className="flex items-center gap-2">
                    <Badge>{collectionLabel(item.meta.collection)}</Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-100">{item.meta.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{item.meta.summary ?? item.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
