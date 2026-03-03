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

function buildVerdict(rec: any): string {
  const t = rec.recommended_tool;
  const ej = t.enhanced_justification;
  const tool = t.tool;
  const alt = rec.alternatives?.[0];

  const mainStrength = tool.strengths[0] || "";

  const benchmarks = ej?.benchmark_citations;
  const benchmarkProof = benchmarks && benchmarks.length > 0
    ? ` Respaldado por ${benchmarks[0]}${benchmarks[1] ? ` y ${benchmarks[1]}` : ""}.`
    : "";

  let comparison = "";
  if (alt && ej?.head_to_head) {
    const h2h = ej.head_to_head;
    const diff = ((t.final_score - alt.final_score) * 10).toFixed(1);
    comparison = ` Supera a ${alt.tool.name} por ${diff} pts`;
    const shared = h2h.benchmarks?.find(
      (b: any) => b.winner_value !== "N/A" && b.runner_up_value !== "N/A"
    );
    if (shared) {
      comparison += ` (${shared.benchmark_name}: ${shared.winner_value} vs ${shared.runner_up_value})`;
    }
    comparison += ".";
  }

  let costNote = "";
  if (ej?.cost_estimate) {
    const cost = ej.cost_estimate;
    if (cost.pricing_model === "Gratis") costNote = " Gratis.";
    else if (cost.estimated_monthly !== "Variable") costNote = ` ${cost.estimated_monthly}.`;
  }

  return `${mainStrength}.${benchmarkProof}${comparison}${costNote}`;
}

export default function Justification({ recommendations }: JustificationProps) {
  return (
    <div className="space-y-5 animate-fade-up delay-2">
      <h2 className="text-2xl font-semibold tracking-tight">Por que estas herramientas</h2>

      <div className="space-y-2">
        {recommendations.map((rec, i) => {
          const t = rec.recommended_tool;
          const ej = t.enhanced_justification;
          const verdict = buildVerdict(rec);

          return (
            <div
              key={i}
              className="glass rounded-2xl px-5 py-4 flex items-start gap-4"
            >
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

                <p className="text-[13px] text-[var(--text-secondary)] mt-1.5 leading-[1.6]">
                  {verdict}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
