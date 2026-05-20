import Link from "next/link";
import { ArrowRight, ClipboardList, ExternalLink, UserRound, Users } from "lucide-react";

import { SatelliteVisual } from "@/components/schedule/satellite-visual";
import { WeekAccordion } from "@/components/schedule/week-accordion";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
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
              Portfolio of my contribution to FYP1. The main view is the weekly timeline: what was planned,
              what was completed, and where each reflection or technical record is linked.
            </p>
          </div>

          <div className="grid gap-3 text-sm leading-6 text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur">
              <div className="mb-2 flex items-center gap-2 font-medium text-slate-950">
                <UserRound className="size-4 text-cyan-700" aria-hidden="true" />
                Author
              </div>
              <p>{siteConfig.author} - {siteConfig.registrationNumber}</p>
              <p>{siteConfig.department}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-cyan-800">
                {[
                  ["GitHub", siteConfig.github],
                  ["LinkedIn", siteConfig.linkedin],
                  ["Scholar", siteConfig.scholar],
                  ["ORCID", siteConfig.orcid],
                ].map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-cyan-950">
                    {label}
                    <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
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

          <Link
            href="/weekly-logs"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-950 bg-slate-950 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Open weekly logs
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <SatelliteVisual />
      </section>

      <section className="pb-14 lg:pb-20">
        <WeekAccordion />
      </section>
    </div>
  );
}
