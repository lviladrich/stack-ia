// ============================================================
// AI Stack Advisor — Web Engine
// ============================================================
// Orchestrates the full pipeline for the web version.
// Uses static imports instead of readFileSync.
// ============================================================

import { getCapabilities } from "./registry";
import { decomposeProject } from "@/src/decomposer";
import { mapCapabilities } from "@/src/mapper";
import { selectStack } from "@/src/selector";
import type { Registry, ToolRecommendation, WorkflowStep, StackRecommendation, ProjectInput, CapabilityId } from "@/src/types";
import { generatePrebuiltPrompt } from "@/src/prompts";

// --- Workflow generation (adapted from output.ts without file I/O) ---

const PHASE_ACTIONS: Record<string, string> = {
  requirements_analysis: "Definir requerimientos, historias de usuario y criterios de aceptacion",
  database_design: "Disenar estructura de datos, esquemas y estrategia de persistencia",
  visual_assets: "Generar assets visuales, logo, imagenes y branding",
  ui_generation: "Generar componentes UI, layouts y paginas del frontend",
  code_generation: "Implementar logica de negocio, API y funcionalidad core",
  testing_qa: "Generar y ejecutar tests unitarios, de integracion y e2e",
  devops_deploy: "Configurar CI/CD, containerizar y deployar a produccion",
  documentation: "Generar documentacion tecnica, API docs y diagramas",
};

function generateWorkflow(recommendations: ToolRecommendation[]): WorkflowStep[] {
  return recommendations.map((rec, index) => ({
    order: index + 1,
    phase_name: rec.capability_name,
    tool_name: rec.recommended_tool.tool.name,
    action: PHASE_ACTIONS[rec.capability_id] || `Ejecutar ${rec.capability_name}`,
    depends_on: index > 0 ? [index] : [],
  }));
}

// --- Main engine ---

export interface WebResult {
  project: ProjectInput;
  result: StackRecommendation;
}

export async function runAdvisor(
  prompt: string,
  developer_level: "junior" | "mid" | "senior" = "mid",
  budget: "free" | "low" | "medium" | "unlimited" = "medium"
): Promise<WebResult> {
  const registry = getCapabilities() as Registry;

  // 1. Decompose
  const project = await decomposeProject(prompt, developer_level, budget);

  // 2. Map
  const mappedCapabilities = mapCapabilities(project, registry);

  // 3. Select
  const recommendations = selectStack(mappedCapabilities, project);

  // 4. Generate pre-built prompts
  await Promise.all(
    recommendations.map(async (rec) => {
      const relevantModules = project.modules.filter((m) =>
        m.capabilities_needed.includes(rec.capability_id as CapabilityId)
      );
      rec.prebuilt_prompt = await generatePrebuiltPrompt(
        rec.recommended_tool.tool,
        rec.capability_id,
        project,
        relevantModules.length > 0 ? relevantModules : project.modules.slice(0, 2)
      );
    })
  );

  // 5. Build result
  const workflow = generateWorkflow(recommendations);

  const result: StackRecommendation = {
    project_summary: {
      type: project.project_type,
      complexity: project.complexity,
      developer_level: project.developer_level,
      modules_detected: project.modules.length,
    },
    recommendations,
    workflow,
    workflow_diagram: "", // Not needed for web (we render visually)
    metadata: {
      registry_version: "1.0.0",
      generated_at: new Date().toISOString(),
      data_freshness: "2026-03-01",
    },
  };

  return { project, result };
}
