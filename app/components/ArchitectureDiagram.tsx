"use client";

import { memo, useMemo } from "react";

interface ArchNode {
  id: string;
  tool_name: string;
  capability_id: string;
  capability_name: string;
  phase: number;
  category: string;
}

interface ArchEdge {
  from: string;
  to: string;
  label: string;
  type: "data_flow" | "feedback";
}

interface ArchitectureDiagramProps {
  diagram: { nodes: ArchNode[]; edges: ArchEdge[] } | undefined;
}

const CAT_ACCENT: Record<string, string> = {
  planning: "#c084fc",
  design: "#f9a8d4",
  implementation: "#818cf8",
  testing: "#34d399",
  deployment: "#38bdf8",
  documentation: "#94a3b8",
};

const CAT_LABEL: Record<string, string> = {
  planning: "PLAN",
  design: "DESIGN",
  implementation: "BUILD",
  testing: "TEST",
  deployment: "DEPLOY",
  documentation: "DOCS",
};

const CAT_CHIP: Record<string, string> = {
  planning: "Specs",
  design: "Assets",
  implementation: "Code",
  testing: "QA",
  deployment: "Infra",
  documentation: "Docs",
};

export default memo(function ArchitectureDiagram({ diagram }: ArchitectureDiagramProps) {
  if (!diagram || diagram.nodes.length === 0) return null;

  const { activeCats, grouped } = useMemo(() => {
    const categories = ["planning", "design", "implementation", "testing", "deployment", "documentation"];
    const g: Record<string, ArchNode[]> = {};
    for (const cat of categories) {
      const nodes = diagram.nodes.filter((n) => n.category === cat);
      if (nodes.length > 0) g[cat] = nodes;
    }
    return { activeCats: Object.keys(g), grouped: g };
  }, [diagram.nodes]);

  return (
    <div className="space-y-5 animate-fade-up delay-1">
      <h2 className="text-2xl font-semibold tracking-tight">Arquitectura</h2>

      <div className="rounded-2xl p-8 overflow-x-auto" style={{ background: 'linear-gradient(135deg, #080808 0%, #111111 50%, #0a0a0a 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Desktop: horizontal pipeline */}
        <div className="hidden md:flex items-stretch gap-0">
          {activeCats.map((cat, ci) => {
            const nodes = grouped[cat];
            const accent = CAT_ACCENT[cat] || "#666";
            const firstNode = nodes[0];

            return (
              <div key={cat} className="flex items-stretch flex-1 min-w-0">
                {/* Column */}
                <div className="flex-1 px-5 py-4 flex flex-col">
                  {/* Phase label */}
                  <div
                    className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
                    style={{ color: accent }}
                  >
                    {CAT_LABEL[cat]}
                  </div>

                  {/* Tool name */}
                  <div className="text-[15px] font-semibold text-[var(--text-primary)] mb-1.5">
                    {firstNode.tool_name}
                  </div>

                  {/* Capability */}
                  <div className="text-[12px] text-[var(--text-secondary)] leading-relaxed mb-3">
                    {firstNode.capability_name}
                  </div>

                  {/* Extra nodes if any */}
                  {nodes.length > 1 && nodes.slice(1).map((node) => (
                    <div key={node.id} className="mt-2 pt-2 border-t border-white/[0.04]">
                      <div className="text-[13px] font-semibold text-[var(--text-primary)]">{node.tool_name}</div>
                      <div className="text-[11px] text-[var(--text-muted)]">{node.capability_name}</div>
                    </div>
                  ))}

                  {/* Chip */}
                  <div className="mt-auto pt-3">
                    <span
                      className="inline-block text-[9px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}20` }}
                    >
                      {CAT_CHIP[cat]}
                    </span>
                  </div>
                </div>

                {/* Arrow separator */}
                {ci < activeCats.length - 1 && (
                  <div className="flex items-center px-1 shrink-0">
                    <div className="w-5 h-px bg-white/[0.08]" />
                    <svg width="5" height="8" viewBox="0 0 5 8" className="text-white/[0.15] -ml-px">
                      <path d="M0 0l5 4-5 4z" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical pipeline */}
        <div className="md:hidden space-y-1">
          {activeCats.map((cat, ci) => {
            const nodes = grouped[cat];
            const accent = CAT_ACCENT[cat] || "#666";
            const firstNode = nodes[0];

            return (
              <div key={cat}>
                <div className="flex items-start gap-4 py-4">
                  {/* Phase label */}
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.15em] w-14 shrink-0 pt-0.5"
                    style={{ color: accent }}
                  >
                    {CAT_LABEL[cat]}
                  </div>

                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-[var(--text-primary)]">{firstNode.tool_name}</div>
                    <div className="text-[12px] text-[var(--text-secondary)] mt-0.5">{firstNode.capability_name}</div>
                  </div>
                </div>

                {ci < activeCats.length - 1 && (
                  <div className="ml-6 h-3 border-l border-white/[0.06]" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
