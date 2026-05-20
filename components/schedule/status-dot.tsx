import { cn } from "@/components/ui/cn";
import type { WeekStatus } from "@/lib/schedule";

export function StatusDot({
  status,
  className,
}: {
  status: WeekStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-3 shrink-0 rounded-full border",
        status === "completed" && "border-emerald-600 bg-emerald-600",
        status === "in-progress" && "border-rose-600 bg-rose-500 shadow-[0_0_0_5px_rgba(225,29,72,0.12)]",
        status === "proposed" && "border-slate-300 bg-transparent",
        className,
      )}
      aria-hidden="true"
    />
  );
}
