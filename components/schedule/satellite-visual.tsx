"use client";

export function SatelliteVisual() {
  return (
    <div className="relative min-h-[28rem] overflow-hidden rounded-2xl border border-slate-950/80 bg-[linear-gradient(135deg,#edfdf3_0%,#e5f8ff_46%,#fff6ea_100%)]">
      <div className="absolute -left-24 top-10 size-72 rounded-full bg-emerald-200/36 blur-3xl" />
      <div className="absolute right-0 top-0 size-72 rounded-full bg-cyan-200/44 blur-3xl" />
      <div className="absolute bottom-16 right-8 size-60 rounded-full bg-orange-200/24 blur-3xl" />
      <div className="absolute left-[14%] top-[18%] h-20 w-[74%] rounded-full bg-gradient-to-r from-transparent via-teal-300/28 to-transparent blur-2xl" />

      <div className="absolute left-[54%] top-[45%] size-[21.5rem] -translate-x-1/2 -translate-y-1/2 animate-[terrainDrift_9s_ease-in-out_infinite] overflow-hidden rounded-[44%_56%_53%_47%/48%_43%_57%_52%] border border-cyan-500/34 bg-[radial-gradient(circle_at_34%_30%,rgba(255,255,255,0.92),rgba(103,232,249,0.46)_34%,rgba(45,212,191,0.36)_60%,rgba(251,191,36,0.18)_86%)] shadow-[0_34px_95px_rgba(14,165,233,0.26)]">
        <div className="absolute left-[19%] top-[24%] h-24 w-40 rotate-[-16deg] rounded-[50%] bg-cyan-500/20 blur-sm" />
        <div className="absolute left-[42%] top-[43%] h-24 w-40 rotate-[18deg] rounded-[50%] bg-emerald-500/20 blur-sm" />
        <div className="absolute bottom-[12%] right-[4%] h-16 w-32 rotate-[9deg] rounded-[50%] bg-orange-300/20 blur-sm" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 360" fill="none" aria-hidden="true">
          <ellipse cx="180" cy="180" rx="162" ry="112" stroke="rgba(8,145,178,0.28)" strokeWidth="1.4" />
          <ellipse cx="180" cy="180" rx="162" ry="72" stroke="rgba(8,145,178,0.22)" strokeWidth="1.2" />
          <ellipse cx="180" cy="180" rx="112" ry="162" stroke="rgba(15,118,110,0.22)" strokeWidth="1.2" />
          <ellipse cx="180" cy="180" rx="60" ry="164" stroke="rgba(15,118,110,0.18)" strokeWidth="1.1" />
          <path d="M36 182C88 145 148 130 324 144" stroke="rgba(14,116,144,0.32)" strokeWidth="1.5" />
          <path d="M42 218C112 188 194 176 318 192" stroke="rgba(13,148,136,0.26)" strokeWidth="1.4" />
          <path d="M78 104C126 156 158 214 142 300" stroke="rgba(15,118,110,0.22)" strokeWidth="1.3" />
          <path d="M232 82C200 152 204 230 250 308" stroke="rgba(14,116,144,0.22)" strokeWidth="1.3" />
          <path
            d="M34 174C102 98 238 84 326 150"
            stroke="rgba(8,145,178,0.64)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="animate-[orbitSweep_5.8s_ease-in-out_infinite]"
          />
        </svg>
      </div>

      <div className="absolute left-[18%] top-[24%] h-px w-[68%] rotate-[-18deg] bg-gradient-to-r from-transparent via-cyan-600/56 to-transparent animate-[scanSlide_4.8s_ease-in-out_infinite]" />
      <div className="absolute left-[15%] top-[58%] h-px w-[68%] rotate-[13deg] bg-gradient-to-r from-transparent via-emerald-600/46 to-transparent animate-[scanSlide_5.4s_ease-in-out_infinite]" />
      <div className="absolute left-[24%] top-[43%] h-px w-[56%] rotate-[34deg] bg-gradient-to-r from-transparent via-orange-500/42 to-transparent animate-[scanSlide_6s_ease-in-out_infinite]" />

      <div className="absolute right-[18%] top-[17%] animate-[floatSatellite_5.8s_ease-in-out_infinite]">
        <div className="relative size-24">
          <div className="absolute left-8 top-8 size-8 rotate-45 rounded-md border border-slate-900 bg-white shadow-sm" />
          <div className="absolute left-0 top-9 h-6 w-8 rounded border border-slate-900 bg-cyan-200/75" />
          <div className="absolute right-0 top-9 h-6 w-8 rounded border border-slate-900 bg-emerald-200/75" />
          <div className="absolute left-11 top-14 h-16 w-px rotate-[18deg] bg-slate-900/70" />
          <div className="absolute left-7 top-[4.8rem] h-20 w-10 -rotate-[10deg] rounded-full border border-cyan-500/45 bg-cyan-200/22 blur-[1px]" />
        </div>
      </div>

      <div className="absolute bottom-14 left-8 right-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Remote sensing change detection</p>
        <h2 className="mt-3 max-w-md text-4xl font-light leading-tight tracking-tight text-slate-950">
          Tracking change from satellite imagery
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
          Weekly evidence for literature review, dataset planning, benchmarking, and model design.
        </p>
      </div>
    </div>
  );
}
