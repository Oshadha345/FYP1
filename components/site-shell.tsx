"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
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
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <ReadingProgress />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(34,211,238,0.10),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_18%)]" />
      <div className="relative flex min-h-screen">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden border-r border-white/10 bg-zinc-950/86 backdrop-blur-xl lg:block",
            collapsed ? "w-20" : "w-72",
          )}
        >
          <SidebarContent collapsed={collapsed} pathname={pathname} />
          <div className="absolute bottom-4 left-4 right-4">
            <Button
              variant="ghost"
              className={cn("w-full", collapsed ? "px-0" : "justify-start")}
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
              {!collapsed ? <span>Collapse</span> : null}
            </Button>
          </div>
        </aside>

        {mobileOpen ? (
          <div
            className="fixed inset-0 z-40 bg-zinc-950/75 backdrop-blur-sm lg:hidden"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setMobileOpen(false);
            }}
          >
            <aside className="h-full w-[min(22rem,86vw)] border-r border-white/10 bg-zinc-950">
              <SidebarContent collapsed={false} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        ) : null}

        <div className={cn("flex min-h-screen flex-1 flex-col", collapsed ? "lg:pl-20" : "lg:pl-72")}>
          <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/72 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
              <Link href="/" className="min-w-0 text-sm font-semibold tracking-normal text-zinc-100 lg:hidden">
                {siteConfig.name}
              </Link>
              <div className="ml-auto flex min-w-0 items-center gap-2">
                <CommandPalette />
                <Button variant="ghost" size="icon" aria-label="Dark mode active">
                  <Moon className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  collapsed,
  pathname,
  onNavigate,
}: {
  collapsed: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto px-3 py-5">
      <Link
        href="/"
        onClick={onNavigate}
        className={cn("mb-6 flex items-center gap-3 rounded-md px-3 py-2", collapsed && "justify-center px-2")}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-md border border-cyan-300/25 bg-cyan-300/10 text-sm font-bold text-cyan-100">
          OS
        </span>
        {!collapsed ? (
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">{siteConfig.name}</span>
            <span className="block truncate text-xs text-zinc-500">FYP research portfolio</span>
          </span>
        ) : null}
      </Link>

      <nav className="space-y-1" aria-label="Primary navigation">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              title={collapsed ? item.title : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-zinc-400 transition",
                "hover:bg-white/[0.07] hover:text-zinc-100 focus-visible:bg-white/[0.07] focus-visible:outline-none",
                active && "bg-cyan-300/10 text-cyan-100 ring-1 ring-cyan-300/15",
                collapsed && "justify-center px-2",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {!collapsed ? <span className="truncate">{item.title}</span> : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function TopRouteRail() {
  return (
    <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:hidden">
      {navigation.slice(1).map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-3 text-sm text-zinc-300"
          >
            <Icon className="size-4" aria-hidden="true" />
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
