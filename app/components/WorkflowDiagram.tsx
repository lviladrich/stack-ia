interface WorkflowDiagramProps {
  workflow: any[];
}

export default function WorkflowDiagram({ workflow }: WorkflowDiagramProps) {
  if (!workflow || workflow.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Workflow</h2>

      <div className="flex flex-col items-center space-y-0">
        {workflow.map((step, i) => (
          <div key={i} className="flex flex-col items-center w-full max-w-md">
            {/* Node */}
            <div className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--accent)] transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-sm font-bold text-white">
                  {step.order}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{step.phase_name}</div>
                  <div className="text-xs text-[var(--accent-hover)] truncate">{step.tool_name}</div>
                </div>
              </div>
              <div className="mt-2 text-xs text-[var(--text-muted)] pl-11">{step.action}</div>
            </div>

            {/* Arrow */}
            {i < workflow.length - 1 && (
              <div className="flex flex-col items-center py-1">
                <div className="w-px h-4 bg-[var(--border)]" />
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-[var(--border)]">
                  <path d="M6 8L0 0h12L6 8z" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Unique tools summary */}
      <div className="text-center text-sm text-[var(--text-muted)] mt-4">
        Herramientas:{" "}
        {[...new Set(workflow.map((s: any) => s.tool_name))].map((tool, i, arr) => (
          <span key={i}>
            <span className="text-[var(--text-secondary)]">{tool as string}</span>
            {i < arr.length - 1 && <span className="text-[var(--border)]"> + </span>}
          </span>
        ))}
      </div>
    </div>
  );
}
