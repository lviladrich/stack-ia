interface StackTableProps {
  recommendations: any[];
}

function ScorePill({ score }: { score: number }) {
  const display = (score * 10).toFixed(1);
  const color = score >= 0.7 ? "text-[var(--success)]" : score >= 0.5 ? "text-[var(--warning)]" : "text-[var(--danger)]";
  const bg = score >= 0.7 ? "bg-[var(--success)]/10" : score >= 0.5 ? "bg-[var(--warning)]/10" : "bg-[var(--danger)]/10";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-md font-mono text-xs font-semibold ${color} ${bg}`}>
      {display}
    </span>
  );
}

export default function StackTable({ recommendations }: StackTableProps) {
  return (
    <div className="space-y-5 animate-fade-up">
      <h2 className="text-2xl font-semibold tracking-tight">Stack Recomendado</h2>

      {/* Desktop — clean Apple table */}
      <div className="hidden md:block glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-3.5 px-5 text-[var(--text-muted)] font-normal text-xs uppercase tracking-wider">Fase</th>
              <th className="text-left py-3.5 px-5 text-[var(--text-muted)] font-normal text-xs uppercase tracking-wider">Capacidad</th>
              <th className="text-left py-3.5 px-5 text-[var(--text-muted)] font-normal text-xs uppercase tracking-wider">Herramienta</th>
              <th className="text-center py-3.5 px-5 text-[var(--text-muted)] font-normal text-xs uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec, i) => (
              <tr key={i} className="border-b border-[var(--border-subtle)] last:border-0">
                <td className="py-3.5 px-5 font-mono text-[var(--text-muted)] text-xs">{rec.phase}</td>
                <td className="py-3.5 px-5 text-[var(--text-secondary)]">{rec.capability_name}</td>
                <td className="py-3.5 px-5 font-semibold text-[var(--text-primary)]">
                  {rec.recommended_tool.tool.name}
                </td>
                <td className="py-3.5 px-5 text-center">
                  <ScorePill score={rec.recommended_tool.final_score} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-2">
        {recommendations.map((rec, i) => (
          <div key={i} className="glass rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">{rec.capability_name}</div>
                <div className="font-semibold text-[var(--text-primary)] mt-0.5">{rec.recommended_tool.tool.name}</div>
              </div>
              <ScorePill score={rec.recommended_tool.final_score} />
            </div>
          </div>
        ))}
      </div>

      {/* Alternatives — barely visible, Apple-style footnote */}
      {recommendations.some((r) => r.alternatives?.length > 0) && (
        <div className="flex flex-wrap gap-x-5 gap-y-0.5 text-[11px] text-[var(--text-muted)]/60">
          {recommendations.map((rec, i) =>
            rec.alternatives?.[0] ? (
              <span key={i}>
                {rec.capability_name}: {rec.alternatives[0].tool.name} ({(rec.alternatives[0].final_score * 10).toFixed(1)})
              </span>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
