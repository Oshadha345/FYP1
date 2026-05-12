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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "border-cyan-300/40 bg-cyan-300 text-zinc-950 shadow-[0_0_24px_rgba(103,232,249,0.22)] hover:bg-cyan-200",
        variant === "secondary" &&
          "border-white/10 bg-white/[0.07] text-zinc-100 hover:border-white/20 hover:bg-white/[0.1]",
        variant === "ghost" &&
          "border-transparent bg-transparent text-zinc-300 hover:bg-white/[0.07] hover:text-white",
        variant === "outline" &&
          "border-white/15 bg-transparent text-zinc-100 hover:border-cyan-300/40 hover:bg-cyan-300/10",
        size === "sm" && "h-9 px-3",
        size === "md" && "h-10 px-4",
        size === "icon" && "size-10 p-0",
        className,
      )}
      {...props}
    />
  );
}
