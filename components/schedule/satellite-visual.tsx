"use client";

export function SatelliteVisual() {
  return (
    <div className="relative min-h-[28rem] overflow-hidden rounded-2xl border border-slate-950/80 bg-gradient-to-br from-emerald-50 via-cyan-50 to-white">
      <div className="absolute -left-28 top-20 size-64 rounded-full bg-emerald-200/28 blur-3xl" />
      <div className="absolute right-8 top-10 size-56 rounded-full bg-cyan-200/34 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-44 w-[120%] -translate-x-1/2 rounded-[50%_50%_0_0] border-t border-cyan-400/30 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.28),rgba(240,253,250,0.9)_45%,rgba(255,255,255,0.95)_70%)]" />

      <div className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/35 bg-cyan-100/16 animate-[scanPulse_6.5s_ease-in-out_infinite]" />
      <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/22 animate-[scanPulse_8s_ease-in-out_infinite]" />

      <div className="absolute left-[18%] top-[22%] h-px w-[68%] rotate-[-18deg] bg-gradient-to-r from-transparent via-cyan-500/45 to-transparent" />
      <div className="absolute left-[16%] top-[58%] h-px w-[62%] rotate-[13deg] bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent" />

      <div className="absolute right-[20%] top-[20%] animate-[floatSatellite_5.8s_ease-in-out_infinite]">
        <div className="relative size-24">
          <div className="absolute left-8 top-8 size-8 rotate-45 rounded-md border border-slate-900 bg-white shadow-sm" />
          <div className="absolute left-0 top-9 h-6 w-8 rounded border border-slate-900 bg-cyan-200/70" />
          <div className="absolute right-0 top-9 h-6 w-8 rounded border border-slate-900 bg-cyan-200/70" />
          <div className="absolute left-11 top-14 h-16 w-px rotate-[18deg] bg-slate-900/70" />
          <div className="absolute left-7 top-[4.8rem] h-20 w-10 -rotate-[10deg] rounded-full border border-cyan-400/35 bg-cyan-200/20 blur-[1px]" />
        </div>
      </div>

      <div className="absolute bottom-14 left-8 right-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Remote sensing change detection</p>
        <h2 className="mt-3 max-w-md text-4xl font-light leading-tight tracking-tight text-slate-950">
          Tracking change from satellite imagery
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
          A simple project record for literature review, dataset planning, benchmarking, and model design across 14 weeks.
        </p>
      </div>
    </div>
  );
}
