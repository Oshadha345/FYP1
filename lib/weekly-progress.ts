import "server-only";

import { cache } from "react";

import { getCollection, getEffectiveActivityDate, getKnowledgeItems } from "@/lib/content";
import { collectionLabel, contentHref } from "@/lib/format";
import { projectWeeks, type ProjectWeek } from "@/lib/schedule";
import type { ContentItem } from "@/types/content";

export type WeeklyActivity = {
  title: string;
  href: string;
  kind: string;
  date: string;
  summary: string;
};

export type WeeklyReflection = {
  title: string;
  href: string;
  date: string;
  summary: string;
};

export type WeeklyProgress = {
  activitiesByWeek: Record<number, WeeklyActivity[]>;
  reflectionsByWeek: Record<number, WeeklyReflection | undefined>;
  reflectionItemsByWeek: Record<number, ContentItem | undefined>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function defaultWeekSlug(week: ProjectWeek) {
  return `week-${String(week.week).padStart(3, "0")}-${slugify(week.shortTitle)}`;
}

export function weekHref(week: ProjectWeek, reflection?: WeeklyReflection) {
  if (reflection) return reflection.href;
  if (week.logHref) return week.logHref;
  return `/weekly-logs/${defaultWeekSlug(week)}`;
}

export function findProjectWeekBySlug(slug: string) {
  const normalized = slug.replace(/^\/?weekly-logs\//, "");
  return projectWeeks.find((week) => {
    const weekNumber = normalized.match(/week[-_]?0*(\d+)/i)?.[1];
    return (
      week.logHref?.endsWith(`/${normalized}`) ||
      defaultWeekSlug(week) === normalized ||
      Number(weekNumber) === week.week
    );
  });
}

function weekNumberFromSlug(slug: string) {
  const match = slug.match(/week[-_]?0*(\d+)/i);
  return match ? Number(match[1]) : undefined;
}

function linkedScheduleWeek(item: ContentItem) {
  const href = contentHref(item);
  return projectWeeks.find((week) =>
    week.activityLinks.some((activity) => activity.href === href),
  )?.week;
}

function itemProjectWeek(item: ContentItem) {
  return (
    item.meta.week ??
    linkedScheduleWeek(item) ??
    weekNumberFromSlug(item.meta.slug)
  );
}

export const getWeeklyProgress = cache(async (): Promise<WeeklyProgress> => {
  const [items, logs] = await Promise.all([
    getKnowledgeItems(),
    getCollection("weekly_logs"),
  ]);
  const reflectionsByWeek: Record<number, WeeklyReflection | undefined> = {};
  const reflectionItemsByWeek: Record<number, ContentItem | undefined> = {};
  const activitiesByWeek: Record<number, WeeklyActivity[]> = {};

  for (const log of logs) {
    const week = itemProjectWeek(log);
    if (!week) continue;

    reflectionItemsByWeek[week] = log;
    reflectionsByWeek[week] = {
      title: log.meta.title,
      href: contentHref(log),
      date: getEffectiveActivityDate(log).slice(0, 10),
      summary: log.meta.summary ?? log.excerpt,
    };
  }

  for (const item of items) {
    if (item.meta.collection === "weekly_logs") continue;

    const week = itemProjectWeek(item);
    if (!week) continue;

    activitiesByWeek[week] = [
      ...(activitiesByWeek[week] ?? []),
      {
        title: item.meta.title,
        href: contentHref(item),
        kind: collectionLabel(item.meta.collection),
        date: getEffectiveActivityDate(item).slice(0, 10),
        summary: item.meta.summary ?? item.excerpt,
      },
    ];
  }

  for (const week of projectWeeks) {
    activitiesByWeek[week.week] = (activitiesByWeek[week.week] ?? []).sort((a, b) =>
      a.date.localeCompare(b.date),
    );
  }

  return { activitiesByWeek, reflectionItemsByWeek, reflectionsByWeek };
});
