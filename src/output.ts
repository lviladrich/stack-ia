// ============================================================
// AI Stack Advisor - Output Generator
// ============================================================
// Takes the selected tools and generates the final output:
// - Stack table with justification
// - Sequential workflow
// - ASCII workflow diagram
// ============================================================

import { readFileSync } from "fs";
import { resolve } from "path";
import type {
  ProjectInput,
  ToolRecommendation,
  StackRecommendation,
  WorkflowStep,
} from "./types";

// --- Evidence Layer ---

interface EvidenceItem {
  id: string;
  title: string;
  url: string;
  type: string;
  covers: string;
  key_data: string;
  relevant_for: string[];
}

interface EvidenceRegistry {
  companies: Record<string, {
    name: string;
    tools: string[];
    evidence: EvidenceItem[];
  }>;
}

// --- Academic Papers Layer ---

interface AcademicPaper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  type: string;
  url: string;
  key_finding: string;
  relevant_for: string[];
  implication: string;
}

interface AcademicRegistry {
  categories: Record<string, {
    name: string;
    papers: AcademicPaper[];
  }>;
}

let evidenceCache: EvidenceRegistry | null = null;
let academicCache: AcademicRegistry | null = null;

function loadEvidence(): EvidenceRegistry {
  if (evidenceCache) return evidenceCache;
  const evidencePath = resolve(__dirname, "../registry/evidence.json");
  const raw = readFileSync(evidencePath, "utf-8");
  evidenceCache = JSON.parse(raw) as EvidenceRegistry;
  return evidenceCache;
}

function loadAcademic(): AcademicRegistry {
  if (academicCache) return academicCache;
  const academicPath = resolve(__dirname, "../registry/academic.json");
  const raw = readFileSync(academicPath, "utf-8");
  academicCache = JSON.parse(raw) as AcademicRegistry;
  return academicCache;
}

/**
 * Finds relevant academic papers for a capability.
 */
function findAcademicPapers(capabilityId: string): AcademicPaper[] {
  const academic = loadAcademic();
  const results: AcademicPaper[] = [];

  for (const category of Object.values(academic.categories)) {
    for (const paper of category.papers) {
      if (paper.relevant_for.includes(capabilityId)) {
        results.push(paper);
      }
    }
  }

  return results;
}

/**
 * Finds relevant evidence for a tool + capability combination.
 */
function findEvidence(toolId: string, capabilityId: string): EvidenceItem[] {
  const evidence = loadEvidence();
  const results: EvidenceItem[] = [];

  for (const company of Object.values(evidence.companies)) {
    if (!company.tools.includes(toolId)) continue;
    for (const item of company.evidence) {
      if (item.relevant_for.includes(capabilityId)) {
        results.push(item);
      }
    }
  }

  return results;
}

/**
 * Generates the sequential workflow from recommendations.
 * Each recommendation becomes a step, ordered by SDLC phase.
 */
function generateWorkflow(recommendations: ToolRecommendation[]): WorkflowStep[] {
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

  return recommendations.map((rec, index) => {
    // Each step depends on the previous one (simple sequential flow)
    const depends_on = index > 0 ? [index] : [];

    return {
      order: index + 1,
      phase_name: rec.capability_name,
      tool_name: rec.recommended_tool.tool.name,
      action: PHASE_ACTIONS[rec.capability_id] || `Ejecutar ${rec.capability_name}`,
      depends_on,
    };
  });
}

/**
 * Generates an ASCII workflow diagram showing the tool chain.
 */
function generateDiagram(workflow: WorkflowStep[]): string {
  if (workflow.length === 0) return "[ Sin pasos detectados ]";

  const lines: string[] = [];
  const maxToolLen = Math.max(...workflow.map((s) => s.tool_name.length));
  const maxPhaseLen = Math.max(...workflow.map((s) => s.phase_name.length));

  // Header
  lines.push("┌" + "─".repeat(maxPhaseLen + maxToolLen + 15) + "┐");
  lines.push("│  WORKFLOW: AI Stack Recomendado" + " ".repeat(Math.max(0, maxPhaseLen + maxToolLen + 15 - 31)) + "│");
  lines.push("├" + "─".repeat(maxPhaseLen + maxToolLen + 15) + "┤");

  for (let i = 0; i < workflow.length; i++) {
    const step = workflow[i];
    const stepNum = `${step.order}`.padStart(2);
    const phase = step.phase_name.padEnd(maxPhaseLen);
    const tool = step.tool_name;

    lines.push(`│  ${stepNum}. ${phase}  →  ${tool}${" ".repeat(Math.max(0, maxToolLen - tool.length + 3))}│`);

    if (i < workflow.length - 1) {
      lines.push(`│  ${" ".repeat(maxPhaseLen + 5)}│${" ".repeat(maxToolLen + 5)}│`);
      lines.push(`│  ${" ".repeat(maxPhaseLen + 5)}▼${" ".repeat(maxToolLen + 5)}│`);
    }
  }

  lines.push("└" + "─".repeat(maxPhaseLen + maxToolLen + 15) + "┘");

  // Tool summary line
  const uniqueTools = [...new Set(workflow.map((s) => s.tool_name))];
  lines.push("");
  lines.push("Herramientas unicas: " + uniqueTools.join(" + "));

  return lines.join("\n");
}

/**
 * Generates the complete stack recommendation table as formatted text.
 */
function generateStackTable(recommendations: ToolRecommendation[]): string {
  const lines: string[] = [];

  lines.push("## Stack Recomendado\n");
  lines.push("| Fase | Capacidad | Herramienta | Score | Por que |");
  lines.push("|------|-----------|-------------|-------|---------|");

  for (const rec of recommendations) {
    const score = (rec.recommended_tool.final_score * 10).toFixed(1);
    const topStrength = rec.recommended_tool.tool.strengths[0] || "";
    lines.push(
      `| ${rec.phase} | ${rec.capability_name} | **${rec.recommended_tool.tool.name}** | ${score}/10 | ${topStrength} |`
    );
  }

  // Alternatives section
  lines.push("\n### Alternativas\n");
  for (const rec of recommendations) {
    if (rec.alternatives.length > 0) {
      const alt = rec.alternatives[0];
      const altScore = (alt.final_score * 10).toFixed(1);
      lines.push(
        `- **${rec.capability_name}**: ${alt.tool.name} (${altScore}/10) - ${alt.tool.strengths[0] || ""}`
      );
    }
  }

  return lines.join("\n");
}

/**
 * Generates detailed justification for each selection.
 */
function generateJustificationReport(recommendations: ToolRecommendation[]): string {
  const lines: string[] = [];

  lines.push("## Justificacion Tecnica\n");

  for (const rec of recommendations) {
    const t = rec.recommended_tool;
    const b = t.score_breakdown;

    lines.push(`### ${rec.capability_name} → ${t.tool.name}\n`);
    lines.push(`**Score total: ${(t.final_score * 10).toFixed(1)}/10**\n`);
    lines.push("Desglose:");
    lines.push(`- Calidad (40%): ${(b.quality * 10).toFixed(1)}/10`);
    lines.push(`- Fit con proyecto (25%): ${(b.task_fit * 10).toFixed(1)}/10`);
    lines.push(`- Nivel developer (15%): ${(b.dev_level * 10).toFixed(1)}/10`);
    lines.push(`- Costo (10%): ${(b.cost * 10).toFixed(1)}/10`);
    lines.push(`- Compatibilidad (10%): ${(b.compatibility * 10).toFixed(1)}/10`);
    lines.push("");
    lines.push("**Fortalezas:**");
    for (const s of t.tool.strengths) {
      lines.push(`- ${s}`);
    }
    if (t.tool.weaknesses.length > 0) {
      lines.push("\n**Consideraciones:**");
      for (const w of t.tool.weaknesses) {
        lines.push(`- ${w}`);
      }
    }

    // Evidence: papers, reports, best practices from the company itself
    const evidenceItems = findEvidence(t.tool.id, rec.capability_id);
    if (evidenceItems.length > 0) {
      lines.push("\n**Fuentes oficiales del fabricante:**");
      for (const ev of evidenceItems.slice(0, 2)) {
        const typeLabel = ev.type === "paper" ? "Paper" :
          ev.type === "technical_report" ? "Informe Tecnico" :
          ev.type === "case_study" ? "Caso de Estudio" :
          ev.type === "best_practices" ? "Buenas Practicas" : "Documentacion";
        lines.push(`- [${typeLabel}] **${ev.title}** — ${ev.key_data} → [Ver fuente](${ev.url})`);
      }
    }

    // Academic papers: independent, peer-reviewed research
    const academicPapers = findAcademicPapers(rec.capability_id);
    if (academicPapers.length > 0) {
      lines.push("\n**Investigacion academica independiente:**");
      for (const paper of academicPapers.slice(0, 3)) {
        const peerBadge = paper.type === "peer_reviewed" ? "PEER-REVIEWED" : "PREPRINT";
        lines.push(`- [${peerBadge} · ${paper.venue}] **${paper.title}** (${paper.authors})`);
        lines.push(`  Hallazgo: ${paper.key_finding}`);
        lines.push(`  Implicacion: ${paper.implication} → [Paper](${paper.url})`);
      }
    }
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Generates security and reliability warnings based on academic research.
 * These warnings appear regardless of which tools are recommended.
 */
function generateSecurityWarnings(recommendations: ToolRecommendation[]): string {
  const hasCodeGen = recommendations.some((r) => r.capability_id === "code_generation");
  const hasTesting = recommendations.some((r) => r.capability_id === "testing_qa");

  if (!hasCodeGen) return "";

  const lines: string[] = [];
  lines.push("## Advertencias de Seguridad (basadas en investigacion academica)\n");

  lines.push("> Las siguientes advertencias provienen de papers peer-reviewed independientes,");
  lines.push("> no de opiniones. Son hallazgos cientificos que aplican a CUALQUIER herramienta de IA para codigo.\n");

  lines.push("**1. Vulnerabilidades en codigo generado por IA**");
  lines.push("- ~40% del codigo generado por IA en escenarios de seguridad contiene vulnerabilidades (SQL injection, path traversal, XSS).");
  lines.push("- Fuente: Pearce et al., *\"Asleep at the Keyboard?\"*, IEEE S&P 2022 → [Paper](https://arxiv.org/abs/2108.09293)\n");

  lines.push("**2. Falsa confianza del desarrollador**");
  lines.push("- Desarrolladores usando IA producen MAS vulnerabilidades Y reportan MAYOR confianza en que su codigo es seguro.");
  lines.push("- Fuente: Perry et al., *\"Do Users Write More Insecure Code with AI Assistants?\"*, ACM CCS 2023 → [Paper](https://arxiv.org/abs/2211.03622)\n");

  lines.push("**3. Los benchmarks sobreestiman la calidad**");
  lines.push("- Con tests rigurosos, el pass rate de GPT-4 baja de 67% a 51.2%. El codigo que \"funciona\" puede tener bugs sutiles.");
  lines.push("- Fuente: Liu et al., *\"Is Your Code Generated by ChatGPT Really Correct?\"*, NeurIPS 2023 → [Paper](https://arxiv.org/abs/2305.01210)\n");

  lines.push("**Recomendacion obligatoria:**");
  if (hasTesting) {
    lines.push("- Tu stack ya incluye testing. Asegurate de incluir SAST/DAST (analisis de seguridad estatico/dinamico) ademas de tests funcionales.");
  } else {
    lines.push("- **CRITICO:** Tu stack NO incluye testing. Se recomienda fuertemente agregar Testing y QA con analisis de seguridad (SAST/DAST).");
  }
  lines.push("");

  return lines.join("\n");
}

/**
 * Counts total unique sources (evidence + academic) referenced in the output.
 */
function countSources(recommendations: ToolRecommendation[]): number {
  const sourceIds = new Set<string>();

  for (const rec of recommendations) {
    const evidence = findEvidence(rec.recommended_tool.tool.id, rec.capability_id);
    for (const ev of evidence.slice(0, 2)) sourceIds.add(ev.id);

    const papers = findAcademicPapers(rec.capability_id);
    for (const p of papers.slice(0, 3)) sourceIds.add(p.id);
  }

  // Add the 3 security papers that always appear
  sourceIds.add("copilot_security_2022");
  sourceIds.add("insecure_code_2023");
  sourceIds.add("evalplus_2023");

  return sourceIds.size;
}

// --- Main Export ---

/**
 * Generates the complete StackRecommendation output.
 */
export function generateOutput(
  project: ProjectInput,
  recommendations: ToolRecommendation[]
): StackRecommendation {
  const workflow = generateWorkflow(recommendations);
  const diagram = generateDiagram(workflow);

  return {
    project_summary: {
      type: project.project_type,
      complexity: project.complexity,
      developer_level: project.developer_level,
      modules_detected: project.modules.length,
    },
    recommendations,
    workflow,
    workflow_diagram: diagram,
    metadata: {
      registry_version: "1.0.0",
      generated_at: new Date().toISOString(),
      data_freshness: "2026-03-01",
    },
  };
}

/**
 * Formats the entire recommendation as a readable string.
 * This is what the user sees.
 */
export function formatOutput(
  project: ProjectInput,
  result: StackRecommendation
): string {
  const sections: string[] = [];

  // Header
  sections.push("# AI Stack Advisor - Recomendacion\n");
  sections.push(`**Proyecto:** ${project.project_type.replace(/_/g, " ")} | **Complejidad:** ${project.complexity} | **Developer:** ${project.developer_level} | **Modulos detectados:** ${result.project_summary.modules_detected}\n`);

  // Detected modules
  sections.push("## Modulos Detectados\n");
  for (const mod of project.modules) {
    sections.push(`- **${mod.name}**: ${mod.description}`);
  }
  sections.push("");

  // Stack table
  sections.push(generateStackTable(result.recommendations));
  sections.push("");

  // Workflow diagram
  sections.push("## Workflow\n");
  sections.push("```");
  sections.push(result.workflow_diagram);
  sections.push("```\n");

  // Workflow steps detail
  sections.push("## Pasos del Workflow\n");
  for (const step of result.workflow) {
    sections.push(`**${step.order}. ${step.phase_name}** → ${step.tool_name}`);
    sections.push(`   ${step.action}\n`);
  }

  // Justification
  sections.push(generateJustificationReport(result.recommendations));

  // Security & reliability warnings from academic research
  sections.push(generateSecurityWarnings(result.recommendations));

  // Footer
  sections.push("---");
  sections.push(`*Generado por AI Stack Advisor v${result.metadata.registry_version} | ${result.metadata.generated_at}*`);
  sections.push(`*Frescura de datos: ${result.metadata.data_freshness} | Los scores se degradan automaticamente despues de 30 dias sin actualizacion.*`);
  sections.push(`*Respaldado por ${countSources(result.recommendations)} fuentes: papers peer-reviewed, informes tecnicos y benchmarks independientes.*`);

  return sections.join("\n");
}
