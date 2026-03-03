import { NextResponse } from "next/server";
import { runAdvisor } from "@/app/lib/engine";
import { findEvidence, findAcademicPapers } from "@/app/lib/registry";
import { generateArchitectureDiagram } from "@/src/architecture";
import { askClaude } from "@/src/ai";

async function generateJustificationText(
  rec: any,
  papers: any[],
  evidence: any[],
  projectPrompt: string
): Promise<string> {
  const tool = rec.recommended_tool.tool;

  const papersContext = papers.map((p: any) =>
    `- "${p.title}" (${p.authors}, ${p.venue}): ${p.key_finding}. Implicacion: ${p.implication}`
  ).join("\n");

  const evidenceContext = evidence.map((e: any) =>
    `- ${e.title}: ${e.key_data}`
  ).join("\n");

  const prompt = `Explica en 2-3 oraciones por que ${tool.name} es la mejor opcion para "${rec.capability_name}" en este proyecto: "${projectPrompt}".

Fortalezas de ${tool.name}: ${tool.strengths.join(", ")}

Papers academicos que respaldan esta eleccion:
${papersContext || "Ninguno"}

Evidencia tecnica de la empresa:
${evidenceContext || "Ninguna"}

REGLAS:
- Explica la teoria de POR QUE esta herramienta funciona mejor (ej: arquitectura agentica, RAG, RLHF, chain-of-thought, etc.)
- Menciona hallazgos concretos de los papers (ej: "logra 12.5% en SWE-bench gracias a su interfaz agentica")
- NO menciones scores numericos internos, ni "expert score", ni puntajes del sistema
- Habla como un experto explicando a otro dev, no como un reporte
- Maximo 3 oraciones, espanol, texto plano sin markdown`;

  return askClaude(
    "Eres un investigador en IA aplicada al desarrollo de software. Explicas conceptos tecnicos de forma clara citando papers reales.",
    prompt,
    { maxTokens: 300, temperature: 0.5 }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, developer_level, budget } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "El campo 'prompt' es requerido" },
        { status: 400 }
      );
    }

    const level = developer_level || "mid";
    const bud = budget || "medium";

    const { project, result } = await runAdvisor(prompt, level, bud);

    // Enrich with evidence, papers, and AI-generated justification
    const enrichedRecommendations = await Promise.all(
      result.recommendations.map(async (rec) => {
        const evidence = findEvidence(rec.recommended_tool.tool.id, rec.capability_id).slice(0, 2);
        const papers = findAcademicPapers(rec.capability_id).slice(0, 3);
        const ai_justification = await generateJustificationText(rec, papers, evidence, prompt);

        return {
          ...rec,
          evidence,
          papers,
          ai_justification,
        };
      })
    );

    // Generate architecture diagram
    const architecture_diagram = generateArchitectureDiagram(
      result.recommendations,
      result.workflow
    );

    return NextResponse.json({
      project: {
        raw_prompt: project.raw_prompt,
        project_type: project.project_type,
        modules: project.modules,
        complexity: project.complexity,
        developer_level: project.developer_level,
        budget: project.budget,
        constraints: project.constraints,
      },
      result: {
        ...result,
        recommendations: enrichedRecommendations,
      },
      architecture_diagram,
    });
  } catch (error) {
    console.error("[AI Stack Advisor] Error:", error);
    return NextResponse.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  }
}
