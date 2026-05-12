import type { ReactNode } from "react";

export function Cite({
  id,
  children,
}: {
  id: string;
  children?: ReactNode;
}) {
  return (
    <a
      className="whitespace-nowrap align-baseline text-sm font-medium no-underline"
      href={`#ref-${id}`}
      id={`cite-${id}`}
    >
      [{children ?? id}]
    </a>
  );
}

export function References({ children }: { children: ReactNode }) {
  return (
    <section className="mt-10 border-t border-neutral-200 pt-6">
      <h2 id="references">References</h2>
      <div className="space-y-3 text-sm text-neutral-700">{children}</div>
    </section>
  );
}

export function Reference({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <p id={`ref-${id}`}>
      <a className="mr-2 no-underline" href={`#cite-${id}`}>
        [{id}]
      </a>
      {children}
    </p>
  );
}
