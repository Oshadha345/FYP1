import { Badge } from "@/components/ui/badge";

export function SectionHero({
  eyebrow,
  title,
  description,
  intent,
  tags,
}: {
  eyebrow: string;
  title: string;
  description: string;
  intent?: string;
  tags: string[];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-7">
      <div className="max-w-4xl">
        <Badge tone="cyan">{eyebrow}</Badge>
        <h1 className="mt-5 text-3xl font-semibold tracking-normal text-slate-950 sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
        {intent ? <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">{intent}</p> : null}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.slice(0, 8).map((tag) => (
          <Badge key={tag}>#{tag}</Badge>
        ))}
      </div>
    </section>
  );
}
