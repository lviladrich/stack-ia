// ============================================================
// AI Stack Advisor - Pre-built Prompt Generator
// ============================================================
// Generates high-quality, tool-specific prompts.
// Each prompt follows the actual best practices of each tool.
// ============================================================

import type {
  RegistryTool,
  CapabilityId,
  ProjectInput,
  ProjectModule,
  PrebuiltPrompt,
} from "./types";

// --- AI Prompt Generation ---

async function generatePromptWithAI(
  tool: RegistryTool,
  capabilityId: CapabilityId,
  project: ProjectInput,
  modules: ProjectModule[]
): Promise<PrebuiltPrompt> {
  const { askClaudeJSON } = await import("./ai");

  const moduleDescriptions = modules
    .map((m) => `- ${m.name}: ${m.description} (tags: ${m.tags.join(", ")})`)
    .join("\n");

  const toolContext = TOOL_CONTEXT[tool.id] || "";

  const systemPrompt = `Eres un experto mundial en ${tool.name}. Conoces cada feature, shortcut, y mejor practica de esta herramienta.

CONTEXTO DE LA HERRAMIENTA:
${toolContext}

Tu tarea: generar UN prompt de altisima calidad, listo para copiar y pegar directamente en ${tool.name}, que produzca el MEJOR resultado posible para el proyecto del usuario.

Reglas criticas:
1. El prompt DEBE usar las convenciones y formato que ${tool.name} entiende mejor
2. Incluir especificaciones tecnicas concretas (no "moderno y profesional", sino "Tailwind, rounded-xl, gap-4, dark:bg-zinc-900")
3. Incluir TODOS los modulos relevantes con sus detalles
4. Especificar estructura de archivos/carpetas esperada
5. Incluir edge cases: estados vacios, loading, errores, mobile
6. Si la herramienta acepta system prompts o instrucciones de rol, usarlos
7. Escribir en español
8. Entre 200-500 palabras — denso, sin relleno

Responde SOLO con JSON:
{
  "instruction": "Instruccion precisa de donde y como pegar (ej: 'Abre v0.dev, click en el chat, y pega esto:')",
  "prompt_text": "El prompt completo optimizado para ${tool.name}",
  "expected_output": "Que obtiene el usuario, con detalle (2-3 oraciones)"
}`;

  const userMessage = `Proyecto: ${project.raw_prompt}
Tipo: ${project.project_type}
Complejidad: ${project.complexity}
Nivel del developer: ${project.developer_level}
Presupuesto: ${project.budget}
Capacidad requerida: ${capabilityId}
Modulos relevantes:
${moduleDescriptions}`;

  const result = await askClaudeJSON<{
    instruction: string;
    prompt_text: string;
    expected_output: string;
  }>(systemPrompt, userMessage);

  return {
    tool_id: tool.id,
    tool_name: tool.name,
    capability_id: capabilityId,
    instruction: result.instruction,
    prompt_text: result.prompt_text,
    expected_output: result.expected_output,
    generated_by: "ai",
  };
}

// --- Tool-specific context for AI generation ---

const TOOL_CONTEXT: Record<string, string> = {
  v0: `v0 (v0.dev) genera componentes React/Next.js con shadcn/ui y Tailwind CSS.
Mejores practicas: ser especifico en layout (grid, flex), nombrar componentes, pedir estados (hover, loading, empty, error), pedir responsive, pedir dark mode. v0 entiende "shadcn/ui" como comando. Puedes pedir paginas completas o componentes individuales.`,

  cursor: `Cursor es un IDE con AI integrada. Tiene Composer (multi-archivo) y Chat (inline).
Mejores practicas: dar contexto de archivos existentes con @file, especificar patrones del proyecto, pedir que siga convenciones existentes, usar Composer para cambios multi-archivo. Entiende TypeScript, frameworks, y puede ejecutar comandos.`,

  claude_code: `Claude Code es un agente de coding en terminal. Puede leer, editar, crear archivos, ejecutar comandos, y hacer commits.
Mejores practicas: dar contexto amplio del proyecto, pedir que lea archivos primero, pedir implementacion completa con tests, pedir que ejecute y valide. Puede hacer TDD, refactoring multi-archivo, y workflows agenticos.`,

  claude_chat: `Claude Chat (claude.ai) es ideal para analisis y documentos largos. Tiene Artifacts para documentos estructurados.
Mejores practicas: pedir outputs en formato Artifact, ser especifico en formato de tabla/documento, pedir razonamiento paso a paso. Puede analizar documentos enormes con su contexto de 200K tokens.`,

  claude_docs: `Claude para documentacion. Usa Artifacts para generar documentos completos.
Mejores practicas: pedir formato Markdown especifico, incluir ejemplos de codigo, pedir estructura con headings. Puede generar README, API docs, architecture docs, y guias completas.`,

  github_copilot: `GitHub Copilot se integra en VS Code/JetBrains. Tiene Chat, Inline suggestions, y Copilot Workspace.
Mejores practicas: dar contexto del archivo actual, usar comentarios como prompts, pedir autocompletado de funciones especificas. Para Workspace: describir el issue y dejar que planifique.`,

  chatgpt: `ChatGPT (OpenAI) tiene Canvas para edicion iterativa y Code Interpreter.
Mejores practicas: pedir que use Canvas para codigo, ser especifico en lenguaje y framework, pedir explicaciones si el dev es junior. Puede ejecutar Python con Code Interpreter.`,

  chatgpt_planning: `ChatGPT para planning. Bueno para brainstorming y scoping inicial.
Mejores practicas: pedir formato estructurado, pedir pros/cons, pedir estimaciones de esfuerzo. Usar Canvas para documentos iterativos.`,

  gemini_planning: `Gemini (Google) tiene contexto masivo (1M+ tokens). Ideal para analizar documentacion existente.
Mejores practicas: subir documentos existentes, pedir analisis comparativo, pedir output estructurado. Puede procesar repositorios enteros.`,

  gemini_code: `Gemini Code Assist se integra en IDEs. Contexto masivo para codebases grandes.
Mejores practicas: dar contexto amplio, pedir que analice multiples archivos, usar para refactoring de codebases legacy.`,

  bolt: `Bolt.new genera apps fullstack en el browser con WebContainers. Soporta React, Vue, Svelte.
Mejores practicas: describir la app completa, especificar framework, pedir routing y state management. Genera frontend + backend.`,

  lovable: `Lovable (ex-GPT Engineer) genera apps completas con Supabase backend.
Mejores practicas: describir features de usuario, pedir auth y base de datos, especificar el flujo de usuario. Genera full-stack con Supabase.`,

  midjourney: `Midjourney genera imagenes via Discord. Usa comandos /imagine.
Mejores practicas: usar formato "subject, style, details --ar 16:9 --v 6". Ser especifico en estilo, iluminacion, composicion.`,

  dall_e: `DALL-E (OpenAI) genera imagenes desde texto. Integrado en ChatGPT.
Mejores practicas: ser descriptivo en composicion, estilo, colores. Especificar resolucion. Pedir variaciones.`,

  ai_stack_db_skill: `AI Stack DB Skill es una skill especializada en diseño polyglot de bases de datos.
Mejores practicas: describir las entidades del dominio, volumenes esperados, patrones de acceso (read-heavy vs write-heavy), requisitos de consistencia.`,

  claude_code_testing: `Claude Code para testing. Puede generar tests, ejecutarlos, y corregir hasta que pasen.
Mejores practicas: pedir TDD (test first), especificar framework (vitest/jest), pedir cobertura minima, pedir que ejecute los tests y corrija errores.`,

  claude_code_devops: `Claude Code para DevOps. Puede configurar CI/CD, Docker, deployment.
Mejores practicas: especificar plataforma (Vercel/AWS/etc), pedir archivos de configuracion completos, pedir que valide ejecutando comandos.`,

  eraser_io: `Eraser.io genera diagramas de arquitectura desde texto.
Mejores practicas: describir componentes y conexiones, especificar tipo de diagrama (sequence, architecture, ER), pedir estilo profesional.`,

  mermaid_via_ai: `Mermaid genera diagramas como codigo. Renderizable en GitHub, Notion, etc.
Mejores practicas: especificar tipo (flowchart, sequence, ER, class), incluir todas las relaciones, pedir sintaxis Mermaid valida.`,
};

// --- Tool-Specific Templates ---

type TemplateBuilder = (project: ProjectInput, modules: ProjectModule[]) => {
  instruction: string;
  prompt: string;
  expected: string;
};

function moduleList(modules: ProjectModule[]): string {
  return modules.map((m) => m.name).join(", ");
}

function moduleDetail(modules: ProjectModule[]): string {
  return modules.map((m) => `- ${m.name}: ${m.description}`).join("\n");
}

function tagList(modules: ProjectModule[]): string {
  const tags = new Set(modules.flatMap((m) => m.tags));
  return [...tags].join(", ");
}

const TOOL_TEMPLATES: Record<string, Record<string, TemplateBuilder>> = {

  // ===== V0 =====
  v0: {
    ui_generation: (project, modules) => ({
      instruction: "Abre v0.dev, click en el chat principal, y pega esto:",
      prompt: `Crea una aplicacion ${project.project_type} completa con las siguientes paginas y componentes:

${moduleDetail(modules)}

Especificaciones tecnicas:
- Framework: Next.js 14 App Router + TypeScript
- Estilos: Tailwind CSS + shadcn/ui (usa @shadcn components)
- Layout: Sidebar responsive con navegacion entre secciones
- Dark mode obligatorio con variables CSS
- Responsive: mobile-first, breakpoints en sm/md/lg

Para cada pagina incluir:
- Estado vacio (sin datos, con CTA)
- Estado loading (skeleton)
- Estado con datos (tabla/cards/lista segun corresponda)
- Formularios con validacion visual (errores inline)
- Toasts para feedback de acciones

Componentes compartidos: Header con breadcrumbs, Sidebar colapsable, DataTable con sorting/filtering/pagination, Modal de confirmacion, Badge de status.

Paleta: zinc-900/950 backgrounds, zinc-100 text, blue-500 accents. Rounded-xl en cards, gap-4 spacing.`,
      expected: "Aplicacion Next.js completa con todas las paginas, componentes shadcn/ui, dark mode, estados vacios/loading/error, y layout responsive con sidebar.",
    }),
  },

  // ===== CURSOR =====
  cursor: {
    code_generation: (project, modules) => ({
      instruction: "Abre Cursor, presiona Cmd+I (Composer), y pega esto:",
      prompt: `Implementa el backend completo para un ${project.project_type}. Necesito:

## Modulos
${moduleDetail(modules)}

## Stack
- Next.js 14 App Router, TypeScript strict
- Base de datos: Prisma + PostgreSQL (genera schema.prisma)
- Validacion: Zod schemas para cada endpoint
- Auth: NextAuth.js con providers (Google + credentials)

## Estructura de archivos
\`\`\`
app/api/[modulo]/route.ts    → CRUD endpoints
lib/validations/[modulo].ts  → Zod schemas
lib/actions/[modulo].ts      → Server actions
prisma/schema.prisma         → Data model completo
types/index.ts               → Shared types
\`\`\`

## Por cada modulo genera:
1. Schema Prisma con relaciones
2. Zod validation schema (create + update)
3. API route con GET (list+filter), POST, PATCH, DELETE
4. Server action alternativo para forms
5. Error handling consistente con tipos de error custom

## Convenciones
- camelCase para variables, PascalCase para types
- Responses: { data, error, meta: { total, page } }
- HTTP status codes correctos (201 create, 204 delete)
- Middleware de auth en rutas protegidas

Lee los archivos existentes primero con @workspace para seguir las convenciones del proyecto.`,
      expected: "Backend completo: Prisma schema, Zod validations, API routes CRUD por modulo, server actions, types compartidos, y middleware de auth. Todo conectado y funcional.",
    }),
  },

  // ===== CLAUDE CODE =====
  claude_code: {
    code_generation: (project, modules) => ({
      instruction: "Abre tu terminal en el directorio del proyecto y pega esto en Claude Code:",
      prompt: `Necesito que implementes la funcionalidad core de mi ${project.project_type}.

Primero lee la estructura actual del proyecto con ls y los archivos principales. Despues implementa:

## Modulos a crear
${moduleDetail(modules)}

## Requisitos de implementacion
1. Lee package.json y tsconfig para entender el stack actual
2. Crea la estructura de carpetas si no existe
3. Implementa cada modulo con:
   - Types/interfaces en types/
   - Logica de negocio en lib/
   - API endpoints en app/api/
   - Validacion con Zod
   - Error handling con tipos custom
4. Conecta los modulos entre si (imports, dependencias)
5. Agrega las dependencias necesarias con npm install
6. Ejecuta tsc --noEmit para verificar que no hay errores de tipos
7. Crea al menos 1 test por modulo critico

## Patron de codigo
- TypeScript strict, no any
- Funciones puras donde sea posible
- Early returns para edge cases
- Logs estructurados con console.error para errores

Implementa todo, ejecuta, valida que compila, y corrige cualquier error.`,
      expected: "Implementacion completa y validada: modulos conectados, types, API routes, validacion, tests basicos. Compilacion verificada sin errores.",
    }),
  },

  // ===== CLAUDE CODE TESTING =====
  claude_code_testing: {
    testing_qa: (project, modules) => ({
      instruction: "En tu terminal, dentro del proyecto, pega esto en Claude Code:",
      prompt: `Genera una suite de tests completa para mi ${project.project_type}.

Primero lee el codigo existente para entender la estructura. Despues:

## Modulos a testear
${moduleDetail(modules)}

## Estrategia de testing
1. **Setup**: Configura vitest si no esta (vitest.config.ts, scripts en package.json)
2. **Unit tests** por cada modulo:
   - Test happy path de cada funcion publica
   - Test edge cases (input vacio, null, invalido)
   - Test de validaciones Zod (input valido e invalido)
3. **Integration tests** de API routes:
   - Test GET con filtros y paginacion
   - Test POST con datos validos e invalidos
   - Test auth (con y sin token)
   - Test status codes correctos
4. **Mocks**: Mock de base de datos con vitest.mock, mock de servicios externos
5. **Ejecuta** todos los tests con npx vitest run
6. **Corrige** cualquier test que falle hasta que todos pasen
7. **Cobertura**: ejecuta con --coverage y reporta %

Patron de tests:
- describe() por modulo, it() por caso
- Naming: "should [accion] when [condicion]"
- AAA: Arrange, Act, Assert
- Un assert por test idealmente`,
      expected: "Suite de tests completa ejecutandose sin errores: unit tests por modulo, integration tests de API, mocks configurados, cobertura reportada.",
    }),
  },

  // ===== CLAUDE CHAT / DOCS =====
  claude_chat: {
    requirements_analysis: (project, modules) => ({
      instruction: "Abre claude.ai y pega esto en un chat nuevo:",
      prompt: `Actua como un Product Manager senior con 10 años de experiencia. Necesito un documento de requerimientos profesional para mi ${project.project_type}.

## Proyecto
${project.raw_prompt}

## Modulos detectados
${moduleDetail(modules)}

## Genera un PRD (Product Requirements Document) con:

### 1. Resumen ejecutivo (3 lineas)

### 2. User personas (2-3 personas con nombre, rol, pain point)

### 3. Por cada modulo, una tabla:
| Requerimiento | Tipo | Prioridad | Criterio de aceptacion |
Con al menos 5 requerimientos por modulo.
Tipos: Funcional, No-funcional, Seguridad
Prioridad: P0 (launch blocker), P1 (importante), P2 (nice to have)

### 4. Diagrama de dependencias entre modulos (formato Mermaid)

### 5. Non-functional requirements
- Performance (response time targets)
- Seguridad (OWASP top 10 relevantes)
- Escalabilidad (usuarios concurrentes target)

### 6. Out of scope (que NO incluye el MVP)

### 7. Milestones sugeridos con orden de implementacion

Usa formato Artifact para que pueda descargarlo como documento.`,
      expected: "PRD profesional con user personas, requerimientos tabulados por modulo con prioridades, diagrama de dependencias Mermaid, NFRs, y milestones. Formato descargable.",
    }),
  },

  claude_docs: {
    documentation: (project, modules) => ({
      instruction: "Abre claude.ai y pega esto:",
      prompt: `Genera la documentacion tecnica completa para mi ${project.project_type}. Usa formato Artifact por cada documento.

## Proyecto
${project.raw_prompt}

## Modulos
${moduleDetail(modules)}

## Documentos a generar:

### 1. README.md
- Badges (build, coverage, license)
- Descripcion de 1 parrafo
- Screenshots placeholder (describir que iria)
- Quick start: prerequisites, install, dev, build, deploy
- Estructura de carpetas con descripcion
- Environment variables (tabla con nombre, descripcion, ejemplo, requerido)
- Scripts disponibles

### 2. API Documentation (api-docs.md)
Por cada endpoint:
- Metodo + URL
- Headers requeridos
- Body schema (TypeScript interface)
- Response schema con ejemplos JSON
- Status codes posibles
- Curl de ejemplo

### 3. Architecture Decision Records (adr/001-*.md)
Para las 3 decisiones mas importantes del stack:
- Contexto, Decision, Consecuencias (formato ADR estandar)

### 4. CONTRIBUTING.md
- Branch naming (feature/*, fix/*, etc)
- Commit convention (conventional commits)
- PR template
- Code review checklist`,
      expected: "4 documentos Markdown profesionales: README completo, API docs con ejemplos, 3 ADRs, y contributing guide. Listos para copiar al repo.",
    }),
  },

  // ===== GITHUB COPILOT =====
  github_copilot: {
    code_generation: (project, modules) => ({
      instruction: "Abre VS Code con Copilot, presiona Cmd+Shift+I (Copilot Chat), y pega esto:",
      prompt: `@workspace Necesito implementar los siguientes modulos para mi ${project.project_type}:

${moduleDetail(modules)}

Para cada modulo, genera:
1. El archivo principal con la logica de negocio
2. Types/interfaces TypeScript
3. API route (Next.js App Router format)
4. Validacion de inputs

Sigue las convenciones que ya existen en el proyecto. Mira los archivos existentes para:
- Patron de naming
- Estructura de carpetas
- Manejo de errores
- Formato de responses

Empeza por los types compartidos y despues implementa modulo por modulo.
Stack: ${project.project_type === "saas" ? "Next.js, TypeScript, Prisma" : "TypeScript, Next.js App Router"}.
Complejidad: ${project.complexity}.`,
      expected: "Codigo TypeScript para cada modulo siguiendo las convenciones existentes del proyecto: types, logica de negocio, API routes, y validaciones.",
    }),
  },

  // ===== CHATGPT =====
  chatgpt: {
    code_generation: (project, modules) => ({
      instruction: "Abre ChatGPT, activa Canvas mode, y pega esto:",
      prompt: `Necesito que generes codigo TypeScript production-ready para un ${project.project_type}.

## Modulos
${moduleDetail(modules)}

## Instrucciones
Usa Canvas para generar el codigo. Por cada modulo necesito:

1. **Interface/Types** (types.ts)
2. **Logica de negocio** (service.ts) — funciones puras, tipadas, con error handling
3. **API Route** (route.ts) — Next.js App Router, validacion con Zod
4. **Schema de validacion** (schema.ts) — Zod schemas para create/update

## Convenciones
- TypeScript strict mode
- Async/await (no callbacks)
- Error handling con Result pattern: { success: true, data } | { success: false, error }
- Funciones de maximo 30 lineas
- Nombrar variables descriptivamente

Genera cada archivo en Canvas para que pueda editarlo inline y copiarlo.`,
      expected: "Archivos TypeScript editables en Canvas: types, services con logica de negocio, API routes con validacion Zod, por cada modulo del proyecto.",
    }),
  },

  chatgpt_planning: {
    requirements_analysis: (project, modules) => ({
      instruction: "Abre ChatGPT y pega esto:",
      prompt: `Actua como Tech Lead. Necesito planificar la implementacion de un ${project.project_type}.

Proyecto: ${project.raw_prompt}
Modulos: ${moduleList(modules)}
Complejidad: ${project.complexity}
Nivel del equipo: ${project.developer_level}

Genera:
1. **Breakdown de tareas** — lista cada tarea con estimacion en horas, prioridad (P0/P1/P2), y dependencias
2. **Arquitectura** — que stack usar, por que, como se conectan los componentes
3. **Riesgos** — top 3 riesgos tecnicos y como mitigarlos
4. **Sprint planning** — organiza las tareas en sprints de 2 semanas
5. **Definition of Done** — checklist para considerar cada modulo "terminado"

Usa formato estructurado con tablas y headers claros.`,
      expected: "Plan de implementacion completo: tareas estimadas, arquitectura, riesgos, sprint planning, y definition of done.",
    }),
  },

  // ===== GEMINI =====
  gemini_planning: {
    requirements_analysis: (project, modules) => ({
      instruction: "Abre Gemini (gemini.google.com) y pega esto:",
      prompt: `Necesito un analisis profundo de requerimientos para un ${project.project_type}.

Proyecto: ${project.raw_prompt}

Modulos identificados:
${moduleDetail(modules)}

Usando tu capacidad de contexto largo, genera:

1. **Analisis de cada modulo** — requerimientos funcionales, edge cases que otros omiten, integraciones necesarias
2. **Mapa de dependencias** — que modulo depende de cual, orden de implementacion optimo
3. **Comparative analysis** — para cada decision tecnica (DB, auth, payments), compara 3 opciones con pros/cons
4. **Security checklist** — amenazas especificas por modulo (OWASP relevante)
5. **Estimacion de complejidad** — story points por modulo, total estimado
6. **Questions to ask** — 10 preguntas que deberia hacerle al cliente antes de empezar

Se exhaustivo. Usa todo tu contexto para no omitir nada.`,
      expected: "Analisis exhaustivo: requerimientos detallados por modulo, mapa de dependencias, comparativas tecnicas, security checklist, estimaciones, y preguntas clave.",
    }),
  },

  // ===== BOLT =====
  bolt: {
    ui_generation: (project, modules) => ({
      instruction: "Abre bolt.new y pega esto en el prompt inicial:",
      prompt: `Crea un ${project.project_type} completo con frontend y backend.

## Features
${moduleDetail(modules)}

## Stack
- React + TypeScript
- Tailwind CSS
- Express o similar para backend
- SQLite para desarrollo

## Paginas
${modules.map((m) => `- /${m.name.toLowerCase().replace(/\s+/g, "-")}: ${m.description}`).join("\n")}
- /login: Pagina de auth con email/password
- /dashboard: Overview con metricas principales

## Requisitos
- Routing completo entre paginas
- State management (zustand o context)
- Forms con validacion
- API endpoints conectados al frontend
- Responsive
- Dark theme

Genera la app completa funcionando, no solo componentes sueltos.`,
      expected: "Aplicacion fullstack funcionando en el browser: frontend React con routing, backend con API, base de datos, auth, y todas las paginas conectadas.",
    }),
  },

  // ===== LOVABLE =====
  lovable: {
    ui_generation: (project, modules) => ({
      instruction: "Abre lovable.dev y describe tu proyecto:",
      prompt: `Crea un ${project.project_type} con las siguientes features:

${moduleDetail(modules)}

Requisitos:
- Auth con email/password y Google
- Base de datos para persistir todos los datos
- Dashboard con estadisticas
- CRUD completo para cada entidad
- Notificaciones (toast) para feedback
- Responsive design
- Pagina de settings para el usuario

El flujo principal: usuario se registra → ve dashboard → gestiona ${moduleList(modules)} → ve reportes.

Quiero que se vea profesional, con sidebar de navegacion y estilo moderno.`,
      expected: "App completa con Supabase backend: auth, base de datos, CRUD por entidad, dashboard con estadisticas, y navegacion completa.",
    }),
  },

  // ===== VISUAL ASSETS =====
  midjourney: {
    visual_assets: (project, modules) => ({
      instruction: "En Discord, en un canal de Midjourney, escribe:",
      prompt: `/imagine prompt: Professional SaaS application logo for "${project.raw_prompt}", minimal geometric design, single color mark, works on dark and light backgrounds, vector style, clean lines, tech startup aesthetic --ar 1:1 --v 6 --style raw

---

Tambien genera estos assets adicionales (un /imagine por cada uno):

Hero illustration:
/imagine prompt: Abstract isometric illustration representing ${moduleList(modules)}, blue and purple gradient, dark background, floating 3D elements, tech aesthetic, clean minimal --ar 16:9 --v 6

Feature icons (genera uno por modulo):
${modules.map((m) => `/imagine prompt: Minimal line icon representing "${m.name}", single stroke, white on transparent, geometric, ${project.project_type} context --ar 1:1 --v 6 --style raw`).join("\n")}`,
      expected: "Logo profesional (1:1), hero illustration (16:9), e iconos individuales por modulo. Todo en estilo tech minimalista consistente.",
    }),
  },

  dall_e: {
    visual_assets: (project, modules) => ({
      instruction: "En ChatGPT, pide a DALL-E que genere:",
      prompt: `Genera los siguientes assets visuales para mi ${project.project_type}:

1. LOGO: Un logo minimalista y geometrico para "${project.raw_prompt}". Estilo: tech startup, una sola forma/marca, funciona en fondo oscuro y claro. Colores: azul electrico (#2997ff) como acento. Formato cuadrado.

2. HERO IMAGE: Ilustracion abstracta para la landing page que represente visualmente: ${moduleList(modules)}. Estilo: gradiente azul-purpura, fondo oscuro (#0a0a0a), elementos 3D flotantes isometricos, limpio y profesional. Formato panoramico 16:9.

3. OG IMAGE: Imagen para compartir en redes sociales. Incluye el nombre del proyecto, una tagline corta, y el logo. Fondo oscuro, texto blanco, acento azul. 1200x630px.

Genera cada imagen por separado para maxima calidad.`,
      expected: "3 assets: logo minimalista cuadrado, hero illustration panoramica con gradiente, y OG image para redes sociales.",
    }),
  },

  // ===== DEVOPS =====
  claude_code_devops: {
    devops_deploy: (project, modules) => ({
      instruction: "En tu terminal, pega esto en Claude Code:",
      prompt: `Configura el deployment completo para mi ${project.project_type} en produccion.

Primero lee package.json y la estructura del proyecto. Despues:

## 1. Vercel deployment
- Crea/verifica vercel.json con configuracion optima
- Configura environment variables necesarias (.env.example)
- Configura headers de seguridad en next.config

## 2. CI/CD con GitHub Actions
Crea .github/workflows/ci.yml:
- Trigger: push a main, PR a main
- Jobs: lint, typecheck, test, build
- Cache de node_modules y .next
- Deploy automatico a Vercel en push a main

## 3. Docker (opcional, para desarrollo)
- Dockerfile multi-stage (build + runtime)
- docker-compose.yml con la app + postgres + redis si aplica

## 4. Monitoreo
- Configura Sentry (error tracking) con @sentry/nextjs
- Health check endpoint en /api/health
- Logging estructurado

## 5. Seguridad
- Security headers (CSP, HSTS, X-Frame-Options)
- Rate limiting en API routes criticas
- Validar que no hay secrets hardcodeados

Ejecuta cada paso, verifica que funciona, y commitea.`,
      expected: "Deployment completo: vercel.json, GitHub Actions CI/CD, Dockerfile, Sentry configurado, health check, security headers. Todo verificado y funcionando.",
    }),
  },

  // ===== DB SKILL =====
  ai_stack_db_skill: {
    database_design: (project, modules) => ({
      instruction: "Ejecuta la DB Skill con este input:",
      prompt: `Diseña la base de datos para un ${project.project_type}.

## Proyecto
${project.raw_prompt}

## Entidades principales
${modules.map((m) => `- ${m.name}: ${m.description}`).join("\n")}

## Requisitos
- Volumenes esperados: ${project.complexity === "high" ? "100K+ registros, 1K+ usuarios concurrentes" : project.complexity === "medium" ? "10K registros, 100 usuarios concurrentes" : "1K registros, 10 usuarios"}
- Consistencia: ACID para transacciones financieras, eventual para analytics
- Patron de acceso: read-heavy para dashboards, write-heavy para ${modules[0]?.name || "datos core"}

## Output esperado
1. Modelo ER con todas las entidades y relaciones
2. Schema SQL (PostgreSQL) con indices optimizados
3. Analisis de si necesito mas de una DB (polyglot persistence)
4. Migraciones iniciales
5. Seed data para desarrollo`,
      expected: "Diseño de base de datos completo: modelo ER, schema PostgreSQL con indices, analisis polyglot, migraciones, y seed data.",
    }),
  },

  // ===== ERASER =====
  eraser_io: {
    documentation: (project, modules) => ({
      instruction: "Abre eraser.io y crea un nuevo diagrama con este texto:",
      prompt: `Genera un diagrama de arquitectura para un ${project.project_type}:

## Componentes
- Frontend: Next.js App (Vercel)
- API: Next.js API Routes
- Auth: NextAuth.js
- Database: PostgreSQL (Supabase/Neon)
${modules.map((m) => `- ${m.name}: ${m.tags.join(", ")}`).join("\n")}
- CDN: Vercel Edge Network
- Monitoring: Sentry

## Conexiones
Frontend -> API: REST/Server Actions
API -> Database: Prisma ORM
API -> Auth: JWT/Session
Frontend -> CDN: Static assets
API -> Monitoring: Error tracking
${modules.filter((m) => m.tags.includes("payments")).length > 0 ? "API -> Stripe: Payment processing" : ""}

## Estilo
Cloud architecture diagram, profesional, con iconos de cada servicio. Agrupar por: Client, Backend, Data, External Services.`,
      expected: "Diagrama de arquitectura profesional con todos los componentes, conexiones, y agrupacion logica. Listo para documentacion o presentacion.",
    }),
  },

  // ===== COPILOT TESTING =====
  copilot_testing: {
    testing_qa: (project, modules) => ({
      instruction: "En VS Code con Copilot, abre el Copilot Chat (Cmd+Shift+I) y pega:",
      prompt: `@workspace Genera tests para los siguientes modulos de mi ${project.project_type}:

${moduleDetail(modules)}

Por cada modulo existente en el proyecto, genera:

1. Tests unitarios (vitest):
   - Happy path de cada funcion exportada
   - Edge cases (null, undefined, empty string, array vacio)
   - Validacion de types (inputs invalidos)

2. Tests de API routes:
   - Test de cada HTTP method (GET, POST, PATCH, DELETE)
   - Test con body valido e invalido
   - Test de auth (con y sin session)
   - Verificar status codes y response format

3. Mocks necesarios:
   - Mock de Prisma client
   - Mock de session/auth
   - Mock de servicios externos

Sigue el patron de tests que ya existe en el proyecto. Si no hay tests, crea la estructura en __tests__/ o *.test.ts junto al archivo.`,
      expected: "Tests unitarios y de integracion por modulo, con mocks configurados, siguiendo las convenciones del proyecto existente.",
    }),
  },
};

// --- Fallback generico por capability ---

function genericFallback(
  tool: RegistryTool,
  capabilityId: CapabilityId,
  project: ProjectInput,
  modules: ProjectModule[]
): PrebuiltPrompt {
  const instruction = tool.access === "cli"
    ? `Abre tu terminal y usa ${tool.name}:`
    : tool.access === "ide" || tool.access === "ide_extension"
    ? `Abre el chat de ${tool.name} en tu IDE:`
    : `Abre ${tool.name} y pega esto:`;

  const capabilityDescriptions: Record<string, string> = {
    requirements_analysis: "analizar requerimientos y planificar la implementacion",
    database_design: "diseñar la base de datos con schema, relaciones e indices",
    ui_generation: "crear la interfaz de usuario con componentes responsive",
    code_generation: "implementar la logica de negocio con API routes y validacion",
    testing_qa: "generar tests unitarios, de integracion, y e2e",
    visual_assets: "generar assets visuales (logo, iconos, ilustraciones)",
    devops_deploy: "configurar CI/CD, deployment y monitoreo",
    documentation: "generar documentacion tecnica (README, API docs, arquitectura)",
  };

  const capDesc = capabilityDescriptions[capabilityId] || capabilityId;

  const prompt = `Necesito ${capDesc} para mi ${project.project_type}.

## Proyecto
${project.raw_prompt}

## Modulos
${moduleDetail(modules)}

## Contexto
- Complejidad: ${project.complexity}
- Nivel: ${project.developer_level}
- Tags: ${tagList(modules)}

Genera una solucion completa, especifica a este proyecto, no generica. Incluye todos los archivos necesarios, con nombres, estructura, y codigo funcional.`;

  return {
    tool_id: tool.id,
    tool_name: tool.name,
    capability_id: capabilityId,
    instruction,
    prompt_text: prompt,
    expected_output: `Solucion completa para ${capDesc}, especifica al proyecto, con archivos y codigo funcional.`,
    generated_by: "template",
  };
}

// --- Main Export ---

export async function generatePrebuiltPrompt(
  tool: RegistryTool,
  capabilityId: CapabilityId,
  project: ProjectInput,
  modules: ProjectModule[]
): Promise<PrebuiltPrompt> {
  // Try AI first
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return await generatePromptWithAI(tool, capabilityId, project, modules);
    } catch (e) {
      console.warn("[Prompts] AI generation failed, using template:", e);
    }
  }

  // Try tool-specific template
  const toolTemplates = TOOL_TEMPLATES[tool.id];
  if (toolTemplates) {
    const builder = toolTemplates[capabilityId];
    if (builder) {
      const t = builder(project, modules);
      return {
        tool_id: tool.id,
        tool_name: tool.name,
        capability_id: capabilityId,
        instruction: t.instruction,
        prompt_text: t.prompt,
        expected_output: t.expected,
        generated_by: "template",
      };
    }
  }

  // Generic fallback
  return genericFallback(tool, capabilityId, project, modules);
}
