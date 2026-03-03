"use client";

interface JustificationProps {
  recommendations: any[];
}

function ScoreRing({ score, size = 40 }: { score: number; size?: number }) {
  const display = (score * 10).toFixed(1);
  const pct = score * 100;
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const color = score >= 0.7 ? "var(--success)" : score >= 0.5 ? "var(--warning)" : "var(--danger)";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={2}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[9px] font-mono font-semibold" style={{ color }}>{display}</span>
      </div>
    </div>
  );
}

export default function Justification({ recommendations }: JustificationProps) {
  return (
    <div className="space-y-5 animate-fade-up delay-2">
      <h2 className="text-2xl font-semibold tracking-tight">Por que estas herramientas</h2>

      <div className="space-y-4">
        {recommendations.map((rec, i) => {
          const t = rec.recommended_tool;
          const ej = t.enhanced_justification;
          const papers = rec.papers || [];
          const evidence = rec.evidence || [];
          const aiJustification = rec.ai_justification || "";

          return (
            <div key={i} className="glass rounded-2xl px-5 py-5 space-y-4">
              {/* Header: score + tool name */}
              <div className="flex items-start gap-4">
                <ScoreRing score={t.final_score} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-semibold text-[15px] text-[var(--text-primary)]">{t.tool.name}</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{rec.capability_name}</span>
                    {ej?.cost_estimate && (
                      <span className="ml-auto hidden sm:block font-mono text-[11px] text-[var(--text-muted)]">
                        {ej.cost_estimate.estimated_monthly}
                      </span>
                    )}
                  </div>
                  {/* AI-generated justification */}
                  <p className="text-[13px] text-[var(--text-secondary)] mt-1.5 leading-[1.6]">
                    {aiJustification}
                  </p>
                </div>
              </div>

              {/* Papers academicos */}
              {papers.length > 0 && (
                <div className="pl-14 space-y-2">
                  <span className="text-[11px] font-medium text-purple-400 uppercase tracking-wider">Papers</span>
                  {papers.map((paper: any, j: number) => (
                    <div key={j} className="text-[12px] leading-[1.5]">
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-primary)] hover:text-purple-400"
                      >
                        {paper.title}
                      </a>
                      <span className="text-[var(--text-muted)]"> — {paper.venue}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Evidencia tecnica */}
              {evidence.length > 0 && (
                <div className="pl-14 space-y-2">
                  <span className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider">Evidencia</span>
                  {evidence.map((ev: any, j: number) => (
                    <div key={j} className="text-[12px] leading-[1.5]">
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-primary)] hover:text-emerald-400"
                      >
                        {ev.title}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
