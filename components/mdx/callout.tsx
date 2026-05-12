import type { ReactNode } from "react";

const styles = {
  note: "border-sky-300 bg-sky-50 text-sky-950",
  tip: "border-emerald-300 bg-emerald-50 text-emerald-950",
  warning: "border-amber-300 bg-amber-50 text-amber-950",
  danger: "border-rose-300 bg-rose-50 text-rose-950",
} as const;

type CalloutType = keyof typeof styles;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const label = title ?? type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <aside className={`my-6 rounded-md border px-4 py-3 ${styles[type]}`}>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      <div className="prose-p:my-2 prose-ul:my-2 prose-ol:my-2">{children}</div>
    </aside>
  );
}
