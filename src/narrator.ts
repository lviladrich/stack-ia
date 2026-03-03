// ============================================================
// AI Stack Advisor - AI Narrator
// ============================================================
// Uses Claude to generate natural, conversational explanations
// of the stack recommendation. Adapts tone and depth to the
// developer's level.
// ============================================================

import { askClaude } from "./ai";
import type { ProjectInput, StackRecommendation } from "./types";

const NARRATOR_SYSTEM_PROMPT = `Eres un Solutions Architect senior y mentor de desarrolladores. Tu trabajo es explicar una recomendacion de stack de herramientas de IA de forma clara, profesional y util.

REGLAS:
1. Adapta tu tono al nivel del developer:
   - junior: explica los "por que", usa analogias simples, se didactico. No asumas conocimiento previo de las herramientas.
   - mid: se directo, enfocate en trade-offs y decisiones practicas.
   - senior: se conciso, enfocate en arquitectura, rendimiento y decisiones no obvias.

2. Estructura tu respuesta asi:
   - Un parrafo de resumen ejecutivo (3-4 lineas max)
   - Para cada herramienta recomendada: UNA oracion de por que es la mejor opcion para esa fase
   - Un consejo practico sobre como empezar (primer paso concreto)
   - Si hay alternativas relevantes, menciona 1-2 en un parrafo breve

3. NO repitas la tabla ni el diagrama (eso ya lo tiene el output anterior).
4. NO uses bullet points excesivos. Escribe en prosa fluida.
5. Si detectas que el stack tiene un riesgo o consideracion importante (costo, vendor lock-in, complejidad), mencionalo honestamente.
6. Responde en el MISMO IDIOMA que el prompt del usuario.
7. Maximo 400 palabras.`;

/**
 * Generates a conversational narrative for the stack recommendation.
 */
export async function narrateRecommendation(
  project: ProjectInput,
  result: StackRecommendation
): Promise<string> {
  // Build a summary of the recommendation for Claude
  const toolSummary = result.recommendations
    .map(
      (rec) =>
        `- Fase ${rec.phase} (${rec.capability_name}): ${rec.recommended_tool.tool.name} (score ${(rec.recommended_tool.final_score * 10).toFixed(1)}/10)` +
        (rec.alternatives.length > 0
          ? ` | Alternativa: ${rec.alternatives[0].tool.name} (${(rec.alternatives[0].final_score * 10).toFixed(1)}/10)`
          : "")
    )
    .join("\n");

  const userMessage = `PROYECTO ORIGINAL DEL USUARIO:
"${project.raw_prompt}"

NIVEL DEL DEVELOPER: ${project.developer_level}
PRESUPUESTO: ${project.budget}
TIPO DE PROYECTO: ${project.project_type}
COMPLEJIDAD: ${project.complexity}
MODULOS DETECTADOS: ${project.modules.map((m) => m.name).join(", ")}
CONSTRAINTS: ${project.constraints.length > 0 ? project.constraints.join(", ") : "ninguno"}

STACK RECOMENDADO:
${toolSummary}

HERRAMIENTAS UNICAS EN EL STACK: ${[...new Set(result.recommendations.map((r) => r.recommended_tool.tool.name))].join(", ")}

Genera la explicacion conversacional de esta recomendacion. Recuerda: adapta al nivel ${project.developer_level}.`;

  try {
    return await askClaude(NARRATOR_SYSTEM_PROMPT, userMessage, {
      maxTokens: 1500,
      temperature: 0.5,
    });
  } catch (error) {
    // Fallback: return a basic summary without AI
    return `Stack recomendado para tu proyecto (${project.project_type}): ${[...new Set(result.recommendations.map((r) => r.recommended_tool.tool.name))].join(" → ")}. Ejecuta el workflow en el orden indicado para resultados optimos.`;
  }
}
