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
          theme: "base",
          themeVariables: {
            background: "transparent",
            mainBkg: "#ecfeff",
            primaryColor: "#e6fffb",
            primaryTextColor: "#0f172a",
            primaryBorderColor: "#0891b2",
            lineColor: "#0891b2",
            secondaryColor: "#ecfdf5",
            secondaryBorderColor: "#0d9488",
            tertiaryColor: "#fff7ed",
            tertiaryBorderColor: "#f97316",
            clusterBkg: "#ffffff",
            clusterBorder: "#cbd5e1",
            edgeLabelBackground: "#ffffff",
            nodeBorder: "#0891b2",
            fontSize: "16px",
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
      <pre className="my-6 overflow-x-auto rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        {`Mermaid diagram could not be rendered: ${error}\n\n`}
        {chart}
      </pre>
    );
  }

  return (
    <figure className="my-8 overflow-x-auto rounded-lg border border-cyan-100 bg-white/55 p-4 shadow-sm">
      {svg ? (
        <div
          className="min-w-full [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="h-40 animate-pulse rounded-md bg-slate-100" aria-label="Loading diagram" />
      )}
    </figure>
  );
}
