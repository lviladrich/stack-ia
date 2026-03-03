"use client";

import { memo } from "react";

interface JustificationProps {
  recommendations: any[];
}

const ScoreRing = memo(function ScoreRing({ score, size = 36 }: { score: number; size?: number }) {
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
});

export default memo(function Justification({ recommendations }: JustificationProps) {
  return (
    <div className="space-y-5 animate-fade-up delay-2">
      <h2 className="text-2xl font-semibold tracking-tight">Por que estas herramientas</h2>

      <div className="space-y-3">
        {recommendations.map((rec, i) => {
          const t = rec.recommended_tool;
          const papers = rec.papers || [];
          const evidence = rec.evidence || [];
          const aiJustification = rec.ai_justification || "";
          const refs = [...papers.slice(0, 2), ...evidence.slice(0, 1)];

          return (
            <div key={`${rec.capability_id}-${i}`} className="glass rounded-2xl px-5 py-4">
              {/* Header + justification */}
              <div className="flex items-start gap-3">
                <ScoreRing score={t.final_score} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[14px] text-[var(--text-primary)]">{t.tool.name}</span>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{rec.capability_name}</span>
                  </div>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-1 leading-[1.55]">
                    {aiJustification}
                  </p>

                  {/* References — compact, inline */}
                  {refs.length > 0 && (
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2">
                      {refs.map((ref: any, j: number) => (
                        <a
                          key={ref.id || j}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-[var(--text-muted)] hover:text-purple-400"
                        >
                          {ref.venue ? `${ref.title.split(':')[0]} (${ref.venue})` : ref.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
