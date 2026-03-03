import { NextResponse } from "next/server";
import { runAdvisor } from "@/app/lib/engine";
import { findEvidence, findAcademicPapers } from "@/app/lib/registry";
import { generateArchitectureDiagram } from "@/src/architecture";

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

    // Enrich with evidence and academic papers
    const enrichedRecommendations = result.recommendations.map((rec) => ({
      ...rec,
      evidence: findEvidence(rec.recommended_tool.tool.id, rec.capability_id).slice(0, 2),
      papers: findAcademicPapers(rec.capability_id).slice(0, 3),
    }));

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
