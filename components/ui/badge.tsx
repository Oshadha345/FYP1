import type { ReactNode } from "react";

import { cn } from "@/components/ui/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "violet" | "zinc" | "green" | "amber";
};

export function Badge({ children, className, tone = "zinc" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "cyan" && "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
        tone === "violet" && "border-violet-300/25 bg-violet-300/10 text-violet-100",
        tone === "green" && "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
        tone === "amber" && "border-amber-300/25 bg-amber-300/10 text-amber-100",
        tone === "zinc" && "border-white/10 bg-white/[0.06] text-zinc-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
