import type { ReactNode } from "react";

import { cn } from "@/components/ui/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "violet" | "zinc" | "green" | "amber" | "rose";
};

export function Badge({ children, className, tone = "zinc" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "cyan" && "border-cyan-200 bg-cyan-50 text-cyan-800",
        tone === "violet" && "border-violet-200 bg-violet-50 text-violet-800",
        tone === "green" && "border-emerald-200 bg-emerald-50 text-emerald-800",
        tone === "amber" && "border-amber-200 bg-amber-50 text-amber-800",
        tone === "rose" && "border-rose-200 bg-rose-50 text-rose-800",
        tone === "zinc" && "border-slate-200 bg-slate-50 text-slate-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
