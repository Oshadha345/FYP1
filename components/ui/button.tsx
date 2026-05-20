import * as React from "react";

import { cn } from "@/components/ui/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "icon";
};

export function Button({
  className,
  variant = "secondary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border text-sm font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "border-cyan-700 bg-cyan-700 text-white shadow-sm hover:bg-cyan-800",
        variant === "secondary" &&
          "border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50",
        variant === "ghost" &&
          "border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-950",
        variant === "outline" &&
          "border-slate-300 bg-white/70 text-slate-800 hover:border-cyan-500 hover:bg-cyan-50",
        size === "sm" && "h-9 px-3",
        size === "md" && "h-10 px-4",
        size === "icon" && "size-10 p-0",
        className,
      )}
      {...props}
    />
  );
}
