"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { CommandPalette } from "@/components/command-palette";
import { ReadingProgress } from "@/components/reading-progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { navigation } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fbf9] text-slate-950">
      <ReadingProgress />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(187,247,208,0.28),transparent_24%),radial-gradient(circle_at_82%_0%,rgba(186,230,253,0.30),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,251,249,0.96)_30%,rgba(255,255,255,0.98))]" />

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/72 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[118rem] items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Home">
            <span className="rounded-l-md border border-slate-950 px-3 py-2 text-sm font-semibold leading-none text-slate-950">
              EE405
            </span>
            <span className="rounded-r-md border-y border-r border-slate-950 px-3 py-2 text-sm font-semibold leading-none text-slate-950">
              FYP Portfolio
            </span>
          </Link>

          <nav className="ml-auto hidden items-center lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "min-w-28 border border-slate-950 px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.14em] transition first:rounded-l-md last:rounded-r-md",
                    active ? "bg-slate-950 text-white" : "bg-white/35 text-slate-800 hover:bg-slate-100",
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            <CommandPalette />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            >
              {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {mobileOpen ? (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden" aria-label="Mobile navigation">
            <div className="grid gap-2 sm:grid-cols-2">
              {navigation.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-md border px-3 py-2 text-sm transition",
                      active
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:text-cyan-800",
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </nav>
        ) : null}
      </header>

      <main className="relative px-4 py-8 sm:px-6 lg:px-8">{children}</main>

      <footer className="relative border-t border-slate-200 bg-white/70 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[118rem] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.name}</p>
          <p>University of Peradeniya - EEE</p>
        </div>
      </footer>
    </div>
  );
}

export function TopRouteRail() {
  return null;
}
