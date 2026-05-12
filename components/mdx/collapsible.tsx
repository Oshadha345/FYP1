import type { ReactNode } from "react";

export function Collapsible({
  title = "Details",
  open = false,
  children,
}: {
  title?: string;
  open?: boolean;
  children: ReactNode;
}) {
  return (
    <details className="my-6 rounded-md border border-neutral-200 bg-white px-4 py-3" open={open}>
      <summary className="cursor-pointer select-none text-sm font-semibold text-neutral-950">
        {title}
      </summary>
      <div className="mt-3 text-neutral-800">{children}</div>
    </details>
  );
}
