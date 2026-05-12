"use client";

import { useEffect, useId, useState } from "react";

export function Mermaid({ chart }: { chart: string }) {
  const reactId = useId();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "dark",
          themeVariables: {
            background: "transparent",
            primaryColor: "#0f172a",
            primaryTextColor: "#e4e4e7",
            primaryBorderColor: "#22d3ee",
            lineColor: "#67e8f9",
            secondaryColor: "#18181b",
            tertiaryColor: "#27272a",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          },
        });

        const result = await mermaid.render(diagramId, chart);
        if (!cancelled) {
          setSvg(result.svg);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setSvg(null);
          setError(err instanceof Error ? err.message : "Unable to render Mermaid diagram.");
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (error) {
    return (
      <pre className="my-6 overflow-x-auto rounded-md border border-amber-300/20 bg-amber-300/5 p-4 text-sm text-amber-100">
        {`Mermaid diagram could not be rendered: ${error}\n\n`}
        {chart}
      </pre>
    );
  }

  return (
    <figure className="my-8 overflow-x-auto rounded-lg border border-white/10 bg-zinc-950/70 p-4">
      {svg ? (
        <div
          className="min-w-full [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="h-40 animate-pulse rounded-md bg-white/[0.04]" aria-label="Loading diagram" />
      )}
    </figure>
  );
}
