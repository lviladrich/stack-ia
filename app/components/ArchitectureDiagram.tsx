"use client";

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
  planning: "Plan",
  design: "Design",
  implementation: "Build",
  testing: "Test",
  deployment: "Deploy",
  documentation: "Docs",
};

export default function ArchitectureDiagram({ diagram }: ArchitectureDiagramProps) {
  if (!diagram || diagram.nodes.length === 0) return null;

  const categories = ["planning", "design", "implementation", "testing", "deployment", "documentation"];
  const grouped: Record<string, ArchNode[]> = {};
  for (const cat of categories) {
    const nodes = diagram.nodes.filter((n) => n.category === cat);
    if (nodes.length > 0) grouped[cat] = nodes;
  }
  const activeCats = Object.keys(grouped);

  return (
    <div className="space-y-5 animate-fade-up delay-1">
      <h2 className="text-2xl font-semibold tracking-tight">Arquitectura</h2>

      <div className="glass rounded-2xl p-6">
        {/* Flow — horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-0">
          {activeCats.map((cat, ci) => {
            const nodes = grouped[cat];
            const accent = CAT_ACCENT[cat] || "var(--text-muted)";

            return (
              <div key={cat} className="flex items-center md:flex-1">
                {/* Node group */}
                <div className="flex-1 md:flex-initial">
                  <div className="text-[10px] uppercase tracking-widest font-medium mb-2" style={{ color: accent }}>
                    {CAT_LABEL[cat] || cat}
                  </div>
                  {nodes.map((node) => {
                    const outEdges = diagram.edges.filter((e) => e.from === node.id);
                    return (
                      <div key={`${node.id}-${node.capability_id}`} className="mb-1.5 last:mb-0">
                        <div className="text-[13px] font-semibold text-[var(--text-primary)]">{node.tool_name}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">{node.capability_name}</div>
                        {outEdges.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {outEdges.map((e, ei) => (
                              <span
                                key={ei}
                                className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                                  e.type === "feedback"
                                    ? "text-[var(--warning)]/70 border border-[var(--warning)]/15"
                                    : "text-[var(--text-muted)]/60 border border-[var(--border)]"
                                }`}
                              >
                                {e.label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Arrow between groups */}
                {ci < activeCats.length - 1 && (
                  <>
                    {/* Desktop: horizontal arrow */}
                    <div className="hidden md:flex items-center px-3 pt-4">
                      <div className="w-6 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
                      <svg width="6" height="10" viewBox="0 0 6 10" className="text-[var(--text-muted)]/30 -ml-px">
                        <path d="M0 0l6 5-6 5z" fill="currentColor" />
                      </svg>
                    </div>
                    {/* Mobile: vertical arrow */}
                    <div className="md:hidden flex justify-center">
                      <svg width="10" height="12" viewBox="0 0 10 12" className="text-[var(--text-muted)]/20">
                        <path d="M5 0v8M5 12l-4-4h8z" fill="currentColor" />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
