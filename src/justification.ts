// ============================================================
// AI Stack Advisor - Enhanced Justification Generator
// ============================================================
// Generates head-to-head comparisons, cost estimates,
// benchmark citations, and trade-offs programmatically.
// ============================================================

import type {
  RegistryTool,
  ScoredTool,
  ProjectInput,
  EnhancedJustification,
  HeadToHead,
  CostEstimate,
  BenchmarkComparison,
} from "./types";

// --- Benchmark Display Names ---

const BENCHMARK_NAMES: Record<string, string> = {
  swe_bench_verified: "SWE-bench Verified",
  aider_polyglot: "Aider Polyglot",
  arena_coding_elo: "Arena Coding Elo",
  arena_reasoning_elo: "Arena Reasoning Elo",
  expert_score: "Expert Score",
  bigcodebench: "BigCodeBench",
};

function formatBenchmarkValue(key: string, value: number): string {
  if (key === "expert_score") return `${value.toFixed(1)}/10`;
  if (key.includes("elo")) return `${Math.round(value)} Elo`;
  if (value <= 1) return `${(value * 100).toFixed(0)}%`;
  return `${value}`;
}

// --- Cost Reference Table ---

const COST_REFERENCE: Record<string, { type: string; monthly?: number; per_1k_input?: number; per_1k_output?: number; note?: string }> = {
  claude_code: { type: "token", per_1k_input: 0.003, per_1k_output: 0.015 },
  claude_chat: { type: "subscription", monthly: 20, note: "Claude Pro" },
  claude_docs: { type: "subscription", monthly: 20, note: "Claude Pro" },
  claude_code_testing: { type: "token", per_1k_input: 0.003, per_1k_output: 0.015 },
  claude_code_devops: { type: "token", per_1k_input: 0.003, per_1k_output: 0.015 },
  claude_code_db: { type: "token", per_1k_input: 0.003, per_1k_output: 0.015 },
  cursor: { type: "subscription", monthly: 20 },
  github_copilot: { type: "subscription", monthly: 19 },
  copilot_testing: { type: "subscription", monthly: 19 },
  chatgpt: { type: "subscription", monthly: 20, note: "ChatGPT Plus" },
  chatgpt_planning: { type: "subscription", monthly: 20 },
  gemini_code: { type: "subscription", monthly: 0, note: "Gratis con limites" },
  gemini_planning: { type: "subscription", monthly: 0, note: "Gratis con limites" },
  v0: { type: "freemium", monthly: 0, note: "Free tier generoso, Pro $20/mes" },
  bolt: { type: "freemium", monthly: 0, note: "Free tier, Pro $20/mes" },
  lovable: { type: "subscription", monthly: 20 },
  dall_e: { type: "token", per_1k_input: 0.04, per_1k_output: 0, note: "$0.04/imagen" },
  midjourney: { type: "subscription", monthly: 10, note: "Plan Basic" },
  ideogram: { type: "freemium", monthly: 0, note: "Free tier, Pro $7/mes" },
  vercel_platform: { type: "freemium", monthly: 0, note: "Free tier, Pro $20/mes" },
  eraser_io: { type: "freemium", monthly: 0, note: "Free tier, Team $12/mes" },
  mermaid_via_ai: { type: "subscription", monthly: 0, note: "Gratis (open source)" },
  ai_stack_db_skill: { type: "subscription", monthly: 0, note: "Gratis" },
};

const COMPLEXITY_TOKENS: Record<string, number> = {
  low: 15000,
  medium: 40000,
  high: 100000,
};

// --- Head-to-Head Generator ---

function generateHeadToHead(
  winner: ScoredTool,
  runnerUp: ScoredTool
): HeadToHead {
  const benchmarks: BenchmarkComparison[] = [];
  const allKeys = new Set([
    ...Object.keys(winner.tool.scores),
    ...Object.keys(runnerUp.tool.scores),
  ]);

  for (const key of allKeys) {
    const wVal = winner.tool.scores[key];
    const rVal = runnerUp.tool.scores[key];
    if (wVal === undefined && rVal === undefined) continue;

    benchmarks.push({
      benchmark_name: BENCHMARK_NAMES[key] || key,
      winner_value: wVal !== undefined ? formatBenchmarkValue(key, wVal) : "N/A",
      runner_up_value: rVal !== undefined ? formatBenchmarkValue(key, rVal) : "N/A",
    });
  }

  // Winner advantages: strengths that map to runner-up weaknesses
  const winnerAdvantages: string[] = [];
  const runnerUpAdvantages: string[] = [];

  for (const strength of winner.tool.strengths) {
    const matchesWeakness = runnerUp.tool.weaknesses.some((w) =>
      sharesConcept(strength, w)
    );
    if (matchesWeakness) {
      winnerAdvantages.push(strength);
    }
  }
  if (winnerAdvantages.length === 0 && winner.tool.strengths.length > 0) {
    winnerAdvantages.push(winner.tool.strengths[0]);
  }

  for (const strength of runnerUp.tool.strengths) {
    const matchesWeakness = winner.tool.weaknesses.some((w) =>
      sharesConcept(strength, w)
    );
    if (matchesWeakness) {
      runnerUpAdvantages.push(strength);
    }
  }
  if (runnerUpAdvantages.length === 0 && runnerUp.tool.strengths.length > 0) {
    runnerUpAdvantages.push(runnerUp.tool.strengths[0]);
  }

  // Score difference
  const scoreDiff = ((winner.final_score - runnerUp.final_score) * 10).toFixed(1);
  const topBenchmark = benchmarks.find(
    (b) => b.winner_value !== "N/A" && b.runner_up_value !== "N/A"
  );

  let verdict = `${winner.tool.name} supera a ${runnerUp.tool.name} por ${scoreDiff} puntos.`;
  if (topBenchmark) {
    verdict += ` En ${topBenchmark.benchmark_name}: ${topBenchmark.winner_value} vs ${topBenchmark.runner_up_value}.`;
  }
  if (runnerUpAdvantages.length > 0) {
    verdict += ` Sin embargo, ${runnerUp.tool.name} destaca en: ${runnerUpAdvantages[0].toLowerCase()}.`;
  }

  return {
    winner: { tool_name: winner.tool.name, tool_id: winner.tool.id },
    runner_up: { tool_name: runnerUp.tool.name, tool_id: runnerUp.tool.id },
    benchmarks,
    winner_advantages: winnerAdvantages,
    runner_up_advantages: runnerUpAdvantages,
    verdict,
  };
}

/** Check if two strings share a concept (simplified NLP) */
function sharesConcept(a: string, b: string): boolean {
  const keywords = (s: string) =>
    s.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const aWords = keywords(a);
  const bWords = keywords(b);
  return aWords.some((aw) => bWords.some((bw) => aw.includes(bw) || bw.includes(aw)));
}

// --- Cost Estimator ---

function generateCostEstimate(
  tool: RegistryTool,
  complexity: string
): CostEstimate {
  const ref = COST_REFERENCE[tool.id];
  const tokens = COMPLEXITY_TOKENS[complexity] || 40000;

  if (!ref) {
    return {
      pricing_model: tool.pricing_model,
      estimated_monthly: "Variable",
      explanation: `Modelo de precio: ${tool.pricing_model}`,
    };
  }

  if (ref.type === "token" && ref.per_1k_input !== undefined) {
    const inputCost = (tokens * ref.per_1k_input) / 1000;
    const outputCost = (tokens * (ref.per_1k_output || 0)) / 1000;
    const total = inputCost + outputCost;
    return {
      pricing_model: "Por uso (tokens)",
      estimated_monthly: `~$${total.toFixed(2)}`,
      explanation: `~${(tokens / 1000).toFixed(0)}k tokens estimados (proyecto ${complexity}). $${ref.per_1k_input}/1k input + $${ref.per_1k_output}/1k output.`,
    };
  }

  if (ref.type === "subscription") {
    return {
      pricing_model: ref.monthly === 0 ? "Gratis" : "Suscripcion",
      estimated_monthly: ref.monthly === 0 ? "$0" : `$${ref.monthly}/mes`,
      explanation: ref.note || `Suscripcion mensual de $${ref.monthly}`,
    };
  }

  // Freemium
  return {
    pricing_model: "Freemium",
    estimated_monthly: "$0 (free tier)",
    explanation: ref.note || "Free tier disponible, planes pagos opcionales",
  };
}

// --- Trade-offs Generator ---

function generateTradeOffs(
  winner: ScoredTool,
  runnerUp: ScoredTool | null
): string[] {
  const tradeOffs: string[] = [];

  if (!runnerUp) return tradeOffs;

  // Compare score breakdowns
  const wb = winner.score_breakdown;
  const rb = runnerUp.score_breakdown;

  if (rb.quality > wb.quality) {
    tradeOffs.push(
      `${runnerUp.tool.name} tiene mayor calidad de benchmark (${(rb.quality * 10).toFixed(1)} vs ${(wb.quality * 10).toFixed(1)}), pero ${winner.tool.name} gana en el score total.`
    );
  }
  if (rb.cost > wb.cost) {
    tradeOffs.push(
      `${runnerUp.tool.name} es mas economico para tu presupuesto, pero ${winner.tool.name} ofrece mejor relacion calidad-precio.`
    );
  }
  if (rb.dev_level > wb.dev_level) {
    tradeOffs.push(
      `${runnerUp.tool.name} se ajusta mejor a tu nivel de experiencia, pero ${winner.tool.name} compensa con mejores resultados.`
    );
  }

  // Cross strengths/weaknesses
  for (const weakness of winner.tool.weaknesses) {
    const matchingStrength = runnerUp.tool.strengths.find((s) =>
      sharesConcept(s, weakness)
    );
    if (matchingStrength) {
      tradeOffs.push(
        `${winner.tool.name}: ${weakness.toLowerCase()}. ${runnerUp.tool.name} resuelve esto con: ${matchingStrength.toLowerCase()}.`
      );
      break; // One is enough
    }
  }

  return tradeOffs.slice(0, 3); // Max 3 trade-offs
}

// --- Benchmark Citations ---

function generateBenchmarkCitations(tool: RegistryTool): string[] {
  const citations: string[] = [];

  for (const [key, value] of Object.entries(tool.scores)) {
    const name = BENCHMARK_NAMES[key] || key;
    citations.push(`${formatBenchmarkValue(key, value)} ${name}`);
  }

  return citations;
}

// --- Fit Explanation ---

function generateFitExplanation(
  winner: ScoredTool,
  project: ProjectInput,
  matchedTags: string[]
): string {
  const fitPct = (winner.score_breakdown.task_fit * 100).toFixed(0);
  const level = project.developer_level;
  const accessType = winner.tool.access;

  let explanation = `Score de fit: ${fitPct}% con tu proyecto ${project.project_type}.`;

  if (matchedTags.length > 0) {
    explanation += ` Tags compatibles: ${matchedTags.slice(0, 3).join(", ")}.`;
  }

  if (level === "junior" && (accessType === "web" || accessType === "web_chat" || accessType === "ide")) {
    explanation += ` Interfaz ${accessType} ideal para tu nivel.`;
  } else if (level === "senior" && (accessType === "cli" || accessType === "api")) {
    explanation += ` Acceso ${accessType} te da control total.`;
  }

  return explanation;
}

// --- Main Export ---

export function generateEnhancedJustification(
  recommended: ScoredTool,
  runnerUp: ScoredTool | null,
  project: ProjectInput,
  allTags: string[]
): EnhancedJustification {
  const headToHead = runnerUp
    ? generateHeadToHead(recommended, runnerUp)
    : null;

  const costEstimate = generateCostEstimate(
    recommended.tool,
    project.complexity
  );

  const benchmarkCitations = generateBenchmarkCitations(recommended.tool);

  const tradeOffs = generateTradeOffs(recommended, runnerUp);

  const matchedTags = allTags.filter((tag) =>
    recommended.tool.best_for.some(
      (bf) => bf.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(bf.toLowerCase())
    )
  );

  const fitExplanation = generateFitExplanation(
    recommended,
    project,
    matchedTags
  );

  const summary = `${recommended.tool.name} obtiene ${(recommended.final_score * 10).toFixed(1)}/10 para ${recommended.capability_name}${runnerUp ? `, superando a ${runnerUp.tool.name} (${(runnerUp.final_score * 10).toFixed(1)}/10)` : ""}.`;

  return {
    summary,
    head_to_head: headToHead,
    cost_estimate: costEstimate,
    benchmark_citations: benchmarkCitations,
    trade_offs: tradeOffs,
    fit_explanation: fitExplanation,
  };
}
