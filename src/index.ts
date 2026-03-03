// ============================================================
// AI Stack Advisor - Main Orchestrator
// ============================================================
// Entry point. Takes a user prompt and returns a complete
// AI stack recommendation powered by Claude.
//
// Flow:  Prompt → AI Decompose → Map → Select → AI Narrate → Output
// ============================================================

import { readFileSync } from "fs";
import { resolve } from "path";
import { decomposeProject } from "./decomposer";
import { mapCapabilities } from "./mapper";
import { selectStack } from "./selector";
import { generateOutput, formatOutput } from "./output";
import { narrateRecommendation } from "./narrator";
import type { Registry } from "./types";

/**
 * Loads the capability registry from disk.
 */
function loadRegistry(): Registry {
  const registryPath = resolve(__dirname, "../registry/capabilities.json");
  const raw = readFileSync(registryPath, "utf-8");
  return JSON.parse(raw) as Registry;
}

/**
 * Main advisor function (AI-powered).
 *
 * @param prompt - The user's project description in natural language
 * @param developer_level - "junior" | "mid" | "senior"
 * @param budget - "free" | "low" | "medium" | "unlimited"
 * @returns Formatted recommendation string (Markdown) with AI narrative
 */
export async function advise(
  prompt: string,
  developer_level: "junior" | "mid" | "senior" = "mid",
  budget: "free" | "low" | "medium" | "unlimited" = "medium"
): Promise<string> {
  const registry = loadRegistry();

  // 1. AI-powered decomposition (falls back to keywords if no API key)
  const project = await decomposeProject(prompt, developer_level, budget);

  // 2. Map project modules to registry capabilities
  const mappedCapabilities = mapCapabilities(project, registry);

  // 3. Select optimal tool for each capability (deterministic algorithm)
  const recommendations = selectStack(mappedCapabilities, project);

  // 4. Generate structured output
  const result = generateOutput(project, recommendations);

  // 5. Format as Markdown
  const formattedOutput = formatOutput(project, result);

  // 6. Generate AI narrative (conversational explanation)
  let narrative = "";
  if (process.env.ANTHROPIC_API_KEY) {
    narrative = await narrateRecommendation(project, result);
  }

  // Combine: structured output + AI narrative
  if (narrative) {
    return formattedOutput + "\n\n## Explicacion del Advisor\n\n" + narrative;
  }

  return formattedOutput;
}

/**
 * Returns the structured result (for API/programmatic use).
 */
export async function adviseStructured(
  prompt: string,
  developer_level: "junior" | "mid" | "senior" = "mid",
  budget: "free" | "low" | "medium" | "unlimited" = "medium"
) {
  const registry = loadRegistry();
  const project = await decomposeProject(prompt, developer_level, budget);
  const mappedCapabilities = mapCapabilities(project, registry);
  const recommendations = selectStack(mappedCapabilities, project);
  const result = generateOutput(project, recommendations);

  // Add narrative if AI available
  let narrative: string | undefined;
  if (process.env.ANTHROPIC_API_KEY) {
    narrative = await narrateRecommendation(project, result);
  }

  return { ...result, narrative };
}

// --- CLI execution ---
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("AI Stack Advisor v1.0.0\n");
    console.log("Uso:");
    console.log('  npx ts-node src/index.ts "<descripcion del proyecto>" [junior|mid|senior] [free|low|medium|unlimited]\n');
    console.log("Ejemplo:");
    console.log('  npx ts-node src/index.ts "Necesito crear un e-commerce con pagos y dashboard" junior medium\n');
    console.log("Variables de entorno:");
    console.log("  ANTHROPIC_API_KEY  → Activa la IA para descomposicion inteligente y narrativa conversacional");
    console.log("                       Sin API key funciona con keyword matching (modo fallback)\n");
    process.exit(0);
  }

  const prompt = args[0];
  const level = (args[1] as "junior" | "mid" | "senior") || "mid";
  const budget = (args[2] as "free" | "low" | "medium" | "unlimited") || "medium";

  const aiMode = process.env.ANTHROPIC_API_KEY ? "AI" : "KEYWORDS";
  console.log(`[Modo: ${aiMode}]\n`);

  advise(prompt, level, budget)
    .then((output) => console.log(output))
    .catch((err) => {
      console.error("Error:", err.message);
      process.exit(1);
    });
}
