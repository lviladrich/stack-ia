// ============================================================
// AI Stack Advisor - Project Decomposer (AI-Powered)
// ============================================================
// Two modes:
//   1. AI mode (default): Uses Claude to deeply understand the
//      prompt, infer implicit modules, and detect nuance.
//   2. Fallback mode: Keyword-based, used when no API key or
//      when AI call fails. Ensures the skill always works.
// ============================================================

import type { ProjectInput, ProjectType, ProjectModule, CapabilityId } from "./types";
import { askClaudeJSON } from "./ai";

// --- AI-Powered Decomposition ---

/** The structure Claude must return */
interface AIDecomposition {
  project_type: ProjectType;
  modules: {
    name: string;
    description: string;
    capabilities_needed: CapabilityId[];
    tags: string[];
  }[];
  complexity: "low" | "medium" | "high";
  constraints: string[];
  reasoning: string;
}

const DECOMPOSER_SYSTEM_PROMPT = `Eres un Solutions Architect senior con 20 años de experiencia en diseño de sistemas de software. Tu trabajo es analizar la descripcion de un proyecto y descomponerlo en modulos tecnicos.

REGLAS ESTRICTAS:
1. Responde SOLO con un JSON valido dentro de un bloque \`\`\`json\`\`\`. Sin texto adicional fuera del bloque.
2. Detecta TODOS los modulos, incluyendo los implicitos. Si alguien dice "e-commerce", implica: catalogo, carrito, pagos, auth, base de datos, UI, deploy. No te limites a lo que menciona explicitamente.
3. Cada modulo debe tener capabilities_needed de esta lista exacta:
   - "code_generation"
   - "ui_generation"
   - "requirements_analysis"
   - "database_design"
   - "testing_qa"
   - "visual_assets"
   - "devops_deploy"
   - "documentation"
4. El project_type debe ser uno de: "web_app", "mobile_app", "saas", "api", "cli_tool", "landing_page", "e_commerce", "dashboard", "portfolio", "internal_tool", "data_pipeline", "other"
5. Los tags son palabras clave tecnicas que describen el modulo (ej: "backend", "frontend", "auth", "security", "api", "crud", "real_time", etc.)
6. La complejidad se basa en: cantidad de modulos, integraciones externas, requisitos de escala, y complejidad de la logica de negocio.
7. Los constraints detectados deben ser de: "budget_free", "speed_priority", "security_critical", "scale_required", "offline_capable", "open_source_only"
8. SIEMPRE incluye "requirements_analysis" como primer modulo y "devops_deploy" + "testing_qa" + "documentation" como modulos finales, porque todo proyecto profesional los necesita.
9. El campo "reasoning" es una explicacion breve de POR QUE detectaste esos modulos y esa complejidad.

EJEMPLO de output:
\`\`\`json
{
  "project_type": "e_commerce",
  "modules": [
    {
      "name": "Analisis de Requerimientos",
      "description": "Definir alcance, user stories y criterios de aceptacion del e-commerce",
      "capabilities_needed": ["requirements_analysis"],
      "tags": ["planning", "architecture"]
    },
    {
      "name": "Catalogo de Productos",
      "description": "CRUD de productos con categorias, imagenes, precios y variantes",
      "capabilities_needed": ["code_generation", "database_design", "ui_generation"],
      "tags": ["backend", "frontend", "e_commerce", "crud"]
    }
  ],
  "complexity": "high",
  "constraints": ["security_critical"],
  "reasoning": "Un e-commerce con pagos requiere modulos de catalogo, carrito, checkout, auth, y dashboard. La integracion de pagos y la gestion de inventario elevan la complejidad a high."
}
\`\`\``;

/**
 * AI-powered project decomposition using Claude.
 */
async function decomposeWithAI(
  prompt: string,
  developer_level: string,
  budget: string
): Promise<AIDecomposition> {
  const userMessage = `Analiza este proyecto y descomponelo en modulos tecnicos:

PROYECTO: "${prompt}"
NIVEL DEL DEVELOPER: ${developer_level}
PRESUPUESTO: ${budget}

Recuerda: detecta modulos implicitos, no solo los que menciona explicitamente. Todo proyecto profesional necesita requirements, testing, deploy y documentacion.`;

  return askClaudeJSON<AIDecomposition>(DECOMPOSER_SYSTEM_PROMPT, userMessage);
}

// --- Keyword Fallback (same as before, kept for resilience) ---

const PROJECT_TYPE_KEYWORDS: Record<ProjectType, string[]> = {
  web_app: ["web app", "aplicacion web", "webapp", "web application", "plataforma web"],
  mobile_app: ["mobile", "movil", "app movil", "ios", "android", "react native", "flutter"],
  saas: ["saas", "software as a service", "multi-tenant", "suscripcion", "subscription"],
  api: ["api", "rest api", "graphql", "microservicio", "microservice", "backend api"],
  cli_tool: ["cli", "command line", "terminal", "linea de comandos", "script"],
  landing_page: ["landing", "landing page", "pagina de aterrizaje", "one page"],
  e_commerce: ["ecommerce", "e-commerce", "tienda online", "shop", "carrito", "pagos", "payments", "checkout"],
  dashboard: ["dashboard", "panel", "admin panel", "analytics", "metricas", "reportes"],
  portfolio: ["portfolio", "portafolio", "personal website", "cv", "resume"],
  internal_tool: ["internal tool", "herramienta interna", "backoffice", "back office", "admin"],
  data_pipeline: ["data pipeline", "etl", "data processing", "batch", "streaming", "kafka"],
  other: [],
};

interface ModulePattern {
  keywords: string[];
  module_name: string;
  description: string;
  capabilities: CapabilityId[];
  tags: string[];
}

const MODULE_PATTERNS: ModulePattern[] = [
  {
    keywords: ["auth", "login", "registro", "signup", "sign up", "autenticacion", "authentication", "oauth", "jwt", "sesion", "session"],
    module_name: "Autenticacion",
    description: "Sistema de registro, login, gestion de sesiones y permisos",
    capabilities: ["code_generation", "database_design"],
    tags: ["auth", "security", "backend"],
  },
  {
    keywords: ["pago", "payment", "stripe", "checkout", "facturacion", "billing", "suscripcion", "subscription", "cobro"],
    module_name: "Sistema de Pagos",
    description: "Integracion de pagos, checkout, facturacion y gestion de suscripciones",
    capabilities: ["code_generation", "testing_qa"],
    tags: ["payments", "integration", "security"],
  },
  {
    keywords: ["dashboard", "panel", "analytics", "metricas", "graficos", "charts", "reportes", "estadisticas", "kpi"],
    module_name: "Dashboard / Analytics",
    description: "Panel de control con visualizacion de datos, graficos y metricas",
    capabilities: ["ui_generation", "code_generation", "database_design"],
    tags: ["frontend", "data_visualization", "analytics"],
  },
  {
    keywords: ["api", "rest", "graphql", "endpoint", "microservicio", "backend"],
    module_name: "API Backend",
    description: "Diseno e implementacion de API con endpoints, validacion y logica de negocio",
    capabilities: ["code_generation", "documentation", "testing_qa"],
    tags: ["backend", "api", "architecture"],
  },
  {
    keywords: ["base de datos", "database", "datos", "modelo de datos", "schema", "sql", "nosql", "postgres", "mongo"],
    module_name: "Base de Datos",
    description: "Diseno de estructura de datos, esquemas, relaciones e indices",
    capabilities: ["database_design"],
    tags: ["database", "architecture", "backend"],
  },
  {
    keywords: ["ui", "interfaz", "frontend", "componentes", "pagina", "diseño", "layout", "formulario", "form", "tabla", "table"],
    module_name: "Interfaz de Usuario",
    description: "Diseno y generacion de componentes UI, layouts y paginas",
    capabilities: ["ui_generation"],
    tags: ["frontend", "ui", "design"],
  },
  {
    keywords: ["landing", "home", "hero", "cta", "about", "contacto", "contact"],
    module_name: "Paginas Estaticas",
    description: "Landing page, paginas informativas, secciones hero y CTA",
    capabilities: ["ui_generation", "visual_assets"],
    tags: ["frontend", "marketing", "design"],
  },
  {
    keywords: ["deploy", "hosting", "despliegue", "produccion", "production", "ci/cd", "devops", "docker", "kubernetes"],
    module_name: "Deploy e Infraestructura",
    description: "Configuracion de deploy, CI/CD, containerizacion y hosting",
    capabilities: ["devops_deploy"],
    tags: ["devops", "infrastructure", "deploy"],
  },
  {
    keywords: ["test", "testing", "pruebas", "qa", "calidad", "unit test", "e2e", "integracion"],
    module_name: "Testing y QA",
    description: "Tests unitarios, de integracion y end-to-end",
    capabilities: ["testing_qa"],
    tags: ["testing", "quality", "automation"],
  },
  {
    keywords: ["imagen", "logo", "icono", "branding", "assets", "ilustracion", "foto", "visual", "grafico"],
    module_name: "Assets Visuales",
    description: "Generacion de imagenes, logos, iconos y assets graficos",
    capabilities: ["visual_assets"],
    tags: ["design", "branding", "visual"],
  },
  {
    keywords: ["docs", "documentacion", "readme", "guia", "manual", "api docs", "swagger"],
    module_name: "Documentacion",
    description: "Documentacion tecnica, API docs, guias de usuario y diagramas",
    capabilities: ["documentation"],
    tags: ["docs", "technical_writing"],
  },
  {
    keywords: ["notificacion", "email", "notification", "push", "sms", "alerta", "alert", "websocket", "real-time", "tiempo real"],
    module_name: "Notificaciones / Real-time",
    description: "Sistema de notificaciones, emails transaccionales, websockets o alertas",
    capabilities: ["code_generation"],
    tags: ["backend", "real_time", "notifications"],
  },
  {
    keywords: ["busqueda", "search", "filtro", "filter", "elasticsearch", "algolia"],
    module_name: "Busqueda y Filtros",
    description: "Sistema de busqueda, filtros avanzados e indexacion",
    capabilities: ["code_generation", "database_design"],
    tags: ["backend", "search", "ux"],
  },
  {
    keywords: ["usuario", "perfil", "profile", "cuenta", "account", "roles", "permisos", "permissions"],
    module_name: "Gestion de Usuarios",
    description: "Perfiles de usuario, roles, permisos y gestion de cuentas",
    capabilities: ["code_generation", "database_design", "ui_generation"],
    tags: ["backend", "frontend", "auth"],
  },
  {
    keywords: ["inventario", "stock", "producto", "product", "catalogo", "catalog", "sku"],
    module_name: "Catalogo / Inventario",
    description: "Gestion de productos, inventario, categorias y SKUs",
    capabilities: ["code_generation", "database_design", "ui_generation"],
    tags: ["backend", "e_commerce", "crud"],
  },
  {
    keywords: ["reserva", "booking", "cita", "appointment", "calendario", "calendar", "agenda", "horario", "schedule"],
    module_name: "Sistema de Reservas",
    description: "Gestion de reservas, calendario, disponibilidad y agendamiento",
    capabilities: ["code_generation", "database_design", "ui_generation"],
    tags: ["backend", "frontend", "scheduling"],
  },
];

function decomposeWithKeywords(
  prompt: string,
  developer_level: "junior" | "mid" | "senior",
  budget: "free" | "low" | "medium" | "unlimited"
): ProjectInput {
  const lower = prompt.toLowerCase();

  // Detect project type
  let project_type: ProjectType = "web_app";
  for (const [type, keywords] of Object.entries(PROJECT_TYPE_KEYWORDS)) {
    if (type === "other") continue;
    if (keywords.some((kw) => lower.includes(kw))) {
      project_type = type as ProjectType;
      break;
    }
  }

  // Detect modules
  const modules: ProjectModule[] = [];
  const seen = new Set<string>();
  for (const pattern of MODULE_PATTERNS) {
    if (pattern.keywords.some((kw) => lower.includes(kw)) && !seen.has(pattern.module_name)) {
      seen.add(pattern.module_name);
      modules.push({
        name: pattern.module_name,
        description: pattern.description,
        capabilities_needed: pattern.capabilities,
        tags: pattern.tags,
      });
    }
  }

  if (modules.length === 0) {
    modules.push(
      { name: "Aplicacion Principal", description: "Modulo principal del proyecto", capabilities_needed: ["requirements_analysis", "code_generation", "ui_generation"], tags: ["core"] },
      { name: "Deploy", description: "Configuracion de deploy basico", capabilities_needed: ["devops_deploy"], tags: ["devops"] }
    );
  }

  // Ensure requirements analysis
  if (!modules.some((m) => m.capabilities_needed.includes("requirements_analysis"))) {
    modules.unshift({ name: "Analisis de Requerimientos", description: "Descomposicion del proyecto en requerimientos tecnicos", capabilities_needed: ["requirements_analysis"], tags: ["planning"] });
  }

  // Detect complexity
  const highSignals = ["microservicio", "distributed", "sharding", "kubernetes", "multi-tenant", "real-time", "machine learning", "blockchain", "escalable", "high availability"];
  const lowSignals = ["landing", "portfolio", "blog", "static", "simple", "basico", "one page"];
  const highCount = highSignals.filter((s) => lower.includes(s)).length;
  const lowCount = lowSignals.filter((s) => lower.includes(s)).length;
  const complexity = highCount >= 2 || modules.length >= 6 ? "high" : lowCount >= 2 && modules.length <= 3 ? "low" : "medium";

  // Detect constraints
  const constraintMap: Record<string, string[]> = {
    budget_free: ["gratis", "free", "sin costo", "sin presupuesto"],
    speed_priority: ["rapido", "urgente", "mvp", "prototipo", "deadline"],
    security_critical: ["seguro", "seguridad", "security", "hipaa", "gdpr", "pci"],
    scale_required: ["escalar", "scale", "miles de usuarios", "millones", "trafico alto"],
    offline_capable: ["offline", "sin conexion", "pwa"],
    open_source_only: ["open source", "codigo abierto", "self-hosted"],
  };
  const constraints: string[] = [];
  for (const [c, kws] of Object.entries(constraintMap)) {
    if (kws.some((kw) => lower.includes(kw))) constraints.push(c);
  }

  return { raw_prompt: prompt, project_type, modules, complexity, developer_level, budget, constraints };
}

// --- Main Export ---

/**
 * Decomposes a project prompt. Uses AI by default, falls back to keywords.
 *
 * @param prompt - The user's natural language project description
 * @param developer_level - Self-reported level
 * @param budget - Budget constraint
 * @param useAI - Whether to use Claude AI (default: true)
 */
export async function decomposeProject(
  prompt: string,
  developer_level: "junior" | "mid" | "senior" = "mid",
  budget: "free" | "low" | "medium" | "unlimited" = "medium",
  useAI: boolean = true
): Promise<ProjectInput> {
  if (useAI && process.env.ANTHROPIC_API_KEY) {
    try {
      const aiResult = await decomposeWithAI(prompt, developer_level, budget);

      return {
        raw_prompt: prompt,
        project_type: aiResult.project_type,
        modules: aiResult.modules,
        complexity: aiResult.complexity,
        developer_level,
        budget,
        constraints: aiResult.constraints,
      };
    } catch (error) {
      console.warn("[AI Stack Advisor] AI decomposition failed, using keyword fallback:", (error as Error).message);
      return decomposeWithKeywords(prompt, developer_level, budget);
    }
  }

  return decomposeWithKeywords(prompt, developer_level, budget);
}
