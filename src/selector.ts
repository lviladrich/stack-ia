// ============================================================
// AI Stack Advisor - Tool Selector
// ============================================================
// Scores each tool in a capability using the weighted algorithm
// from the registry: quality (40%), task_fit (25%),
// dev_level (15%), cost (10%), compatibility (10%).
// ============================================================

import type {
  ProjectInput,
  RegistryTool,
  ScoredTool,
  ToolRecommendation,
  CapabilityId,
} from "./types";
import type { MappedCapability } from "./mapper";
import { generateEnhancedJustification } from "./justification";

// --- Scoring Helpers ---

/**
 * Normalizes the expert_score (0-10) to 0-1 range.
 */
function normalizeExpertScore(score: number): number {
  return score / 10;
}

/**
 * Normalizes an Elo rating to 0-1.
 * Assumes range roughly 1000-1600.
 */
function normalizeElo(elo: number): number {
  return Math.min(1, Math.max(0, (elo - 1000) / 600));
}

/**
 * Calculates the quality score from all available benchmark scores.
 * Normalizes each to 0-1 and averages them.
 */
function calcQualityScore(tool: RegistryTool): number {
  const normalized: number[] = [];

  for (const [key, value] of Object.entries(tool.scores)) {
    if (key === "expert_score") {
      normalized.push(normalizeExpertScore(value));
    } else if (key.includes("elo")) {
      normalized.push(normalizeElo(value));
    } else {
      // Already 0-1 (swe_bench, aider, etc.)
      normalized.push(Math.min(1, value));
    }
  }

  if (normalized.length === 0) return 0.5; // No data fallback
  return normalized.reduce((sum, n) => sum + n, 0) / normalized.length;
}

/**
 * Calculates task fit: how many of the tool's best_for tags
 * match the project module tags.
 */
function calcTaskFit(tool: RegistryTool, tags: string[]): number {
  if (tool.best_for.length === 0 || tags.length === 0) return 0.5;

  const toolTags = new Set(tool.best_for.map((t) => t.toLowerCase()));
  const projectTags = new Set(tags.map((t) => t.toLowerCase()));

  let matches = 0;
  for (const tag of projectTags) {
    for (const toolTag of toolTags) {
      // Partial match: "backend" matches "backend", "frontend" matches "rapid_ui_prototyping" via shared context
      if (toolTag.includes(tag) || tag.includes(toolTag)) {
        matches++;
        break;
      }
    }
  }

  return Math.min(1, matches / Math.max(1, projectTags.size));
}

/**
 * Scores based on developer level.
 * Junior: favors tools with web/ide access (lower barrier).
 * Senior: favors tools with cli/api access (more control).
 */
function calcDevLevelScore(
  tool: RegistryTool,
  level: "junior" | "mid" | "senior"
): number {
  const accessScores: Record<string, Record<string, number>> = {
    junior: {
      web: 1.0,
      web_chat: 1.0,
      web_app: 0.9,
      ide: 0.8,
      ide_extension: 0.8,
      web_discord: 0.7,
      platform: 0.7,
      api_web: 0.6,
      cli: 0.4,
      api: 0.3,
      skill: 0.6,
      code: 0.5,
    },
    mid: {
      web: 0.8,
      web_chat: 0.8,
      web_app: 0.8,
      ide: 0.9,
      ide_extension: 0.9,
      web_discord: 0.7,
      platform: 0.8,
      api_web: 0.8,
      cli: 0.8,
      api: 0.7,
      skill: 0.8,
      code: 0.8,
    },
    senior: {
      web: 0.6,
      web_chat: 0.6,
      web_app: 0.7,
      ide: 0.8,
      ide_extension: 0.8,
      web_discord: 0.5,
      platform: 0.8,
      api_web: 0.8,
      cli: 1.0,
      api: 1.0,
      skill: 0.9,
      code: 0.9,
    },
  };

  return accessScores[level]?.[tool.access] ?? 0.7;
}

/**
 * Scores cost efficiency based on pricing model and budget.
 */
function calcCostScore(
  tool: RegistryTool,
  budget: "free" | "low" | "medium" | "unlimited"
): number {
  const costMatrix: Record<string, Record<string, number>> = {
    free: {
      free: 1.0,
      freemium: 0.8,
      subscription: 0.3,
      token_based: 0.2,
      subscription_or_token: 0.3,
      usage_based: 0.2,
    },
    low: {
      free: 1.0,
      freemium: 0.9,
      subscription: 0.6,
      token_based: 0.5,
      subscription_or_token: 0.6,
      usage_based: 0.5,
    },
    medium: {
      free: 1.0,
      freemium: 1.0,
      subscription: 0.8,
      token_based: 0.7,
      subscription_or_token: 0.8,
      usage_based: 0.7,
    },
    unlimited: {
      free: 1.0,
      freemium: 1.0,
      subscription: 1.0,
      token_based: 1.0,
      subscription_or_token: 1.0,
      usage_based: 1.0,
    },
  };

  return costMatrix[budget]?.[tool.pricing_model] ?? 0.7;
}

/**
 * Scores ecosystem compatibility with already-selected tools.
 * Tools from the same family get a bonus.
 */
function calcCompatibilityScore(
  tool: RegistryTool,
  selectedToolIds: Set<string>
): number {
  // Compatibility groups: tools that work well together
  const compatibilityGroups: string[][] = [
    ["claude_code", "claude_chat", "claude_docs", "claude_code_testing", "claude_code_devops", "claude_code_db"],
    ["v0", "vercel_platform"],
    ["github_copilot", "copilot_testing"],
    ["chatgpt", "chatgpt_planning", "dall_e"],
    ["gemini_code", "gemini_planning"],
    ["bolt", "lovable"],
  ];

  // Find which group this tool belongs to
  const toolGroup = compatibilityGroups.find((group) =>
    group.includes(tool.id)
  );

  if (!toolGroup) return 0.7; // Neutral

  // Check if any already-selected tool is in the same group
  const hasGroupmate = toolGroup.some((id) => selectedToolIds.has(id));
  return hasGroupmate ? 1.0 : 0.7;
}

// --- Main Selection ---

/**
 * Generates a justification string for a tool selection.
 */
function generateJustification(
  tool: RegistryTool,
  capabilityName: string,
  breakdown: ScoredTool["score_breakdown"]
): string {
  const topStrength = tool.strengths[0] || "Herramienta solida en su categoria";

  const parts: string[] = [];
  parts.push(`${tool.name} es la herramienta recomendada para ${capabilityName}.`);
  parts.push(topStrength + ".");

  if (breakdown.quality >= 0.8) {
    parts.push("Tiene scores de benchmark superiores en esta categoria.");
  }
  if (breakdown.task_fit >= 0.7) {
    parts.push("Alto grado de compatibilidad con los modulos de tu proyecto.");
  }
  if (breakdown.cost <= 0.4) {
    parts.push("Nota: el costo puede ser un factor a considerar con tu presupuesto actual.");
  }

  return parts.join(" ");
}

/**
 * Scores and ranks all tools for a given capability.
 * Returns the best tool and alternatives.
 */
export function selectToolForCapability(
  mapped: MappedCapability,
  project: ProjectInput,
  selectedToolIds: Set<string>
): ToolRecommendation {
  const weights = {
    quality: 0.40,
    task_fit: 0.25,
    dev_level: 0.15,
    cost: 0.10,
    compatibility: 0.10,
  };

  const scoredTools: ScoredTool[] = mapped.capability.tools.map((tool) => {
    const quality = calcQualityScore(tool);
    const task_fit = calcTaskFit(tool, mapped.all_tags);
    const dev_level = calcDevLevelScore(tool, project.developer_level);
    const cost = calcCostScore(tool, project.budget);
    const compatibility = calcCompatibilityScore(tool, selectedToolIds);

    const final_score =
      quality * weights.quality +
      task_fit * weights.task_fit +
      dev_level * weights.dev_level +
      cost * weights.cost +
      compatibility * weights.compatibility;

    const breakdown = { quality, task_fit, dev_level, cost, compatibility };

    return {
      tool,
      capability_id: mapped.capability_id,
      capability_name: mapped.capability.name,
      final_score,
      score_breakdown: breakdown,
      justification: generateJustification(tool, mapped.capability.name, breakdown),
    };
  });

  // Sort by final score descending
  scoredTools.sort((a, b) => b.final_score - a.final_score);

  const recommended = scoredTools[0];
  const alternatives = scoredTools.slice(1);

  // Generate enhanced justification
  const enhanced = generateEnhancedJustification(
    recommended,
    alternatives[0] || null,
    project,
    mapped.all_tags
  );
  recommended.enhanced_justification = enhanced;

  return {
    phase: mapped.phase_order,
    capability_id: mapped.capability_id,
    capability_name: mapped.capability.name,
    recommended_tool: recommended,
    alternatives,
    reasoning: recommended.justification,
  };
}

/**
 * Selects optimal tools for all mapped capabilities.
 * Runs sequentially so compatibility scores account for
 * previously selected tools.
 */
export function selectStack(
  mappedCapabilities: MappedCapability[],
  project: ProjectInput
): ToolRecommendation[] {
  const selectedToolIds = new Set<string>();
  const recommendations: ToolRecommendation[] = [];

  for (const mapped of mappedCapabilities) {
    const recommendation = selectToolForCapability(mapped, project, selectedToolIds);
    recommendations.push(recommendation);

    // Track selected tool for compatibility scoring
    selectedToolIds.add(recommendation.recommended_tool.tool.id);
  }

  return recommendations;
}
