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
  const ej = rec.recommended_tool.enhanced_justification;
  const benchmarks = ej?.benchmark_citations || [];
  const alt = rec.alternatives?.[0];

  const papersContext = papers.map((p: any) =>
    `- "${p.title}" (${p.venue}): ${p.key_finding}`
  ).join("\n");

  const evidenceContext = evidence.map((e: any) =>
    `- ${e.title}: ${e.key_data}`
  ).join("\n");

  const altContext = alt
    ? `Alternativa: ${alt.tool.name} (score ${(alt.final_score * 10).toFixed(1)}/10).`
    : "";

  const prompt = `Genera una justificacion de 2-3 oraciones sobre por que ${tool.name} es la mejor herramienta para "${rec.capability_name}" en un proyecto descrito como: "${projectPrompt}".

Datos del tool:
- Score: ${(rec.recommended_tool.final_score * 10).toFixed(1)}/10
- Fortalezas: ${tool.strengths.join(", ")}
- Benchmarks: ${benchmarks.join(", ") || "N/A"}
${altContext}

Papers academicos relevantes:
${papersContext || "Ninguno"}

Evidencia tecnica:
${evidenceContext || "Ninguna"}

REGLAS:
- Combina teoria actualizada con datos de los papers
- Cita al menos un paper o benchmark especifico
- Se conciso y directo, maximo 3 oraciones
- No uses frases como "segun los datos" o "basandonos en"
- Escribe en espanol
- NO uses markdown, solo texto plano`;

  return askClaude(
    "Eres un experto en herramientas de IA para desarrollo de software. Generas justificaciones tecnicas breves y precisas.",
    prompt,
    { maxTokens: 300, temperature: 0.4 }
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
