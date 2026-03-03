module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/registry/capabilities.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"$schema\":\"ai-stack-advisor/registry/v1\",\"version\":\"1.0.0\",\"last_updated\":\"2026-03-01\",\"description\":\"AI Stack Advisor - Capability Registry. Maps development capabilities to optimal AI tools with benchmark-backed scores.\",\"data_sources\":{\"automated\":[{\"id\":\"artificial_analysis\",\"name\":\"Artificial Analysis\",\"url\":\"https://artificialanalysis.ai\",\"api\":\"https://artificialanalysis.ai/documentation\",\"provides\":[\"intelligence_score\",\"speed_tps\",\"latency_ttft\",\"pricing\"],\"update_frequency\":\"daily\",\"free_tier\":\"1000 req/day\"},{\"id\":\"openrouter\",\"name\":\"OpenRouter\",\"url\":\"https://openrouter.ai\",\"api\":\"https://openrouter.ai/docs/api/reference/overview\",\"provides\":[\"model_catalog\",\"pricing\",\"availability\",\"usage_rankings\"],\"update_frequency\":\"real_time\"},{\"id\":\"swe_bench\",\"name\":\"SWE-bench Verified\",\"url\":\"https://www.swebench.com\",\"provides\":[\"bug_fix_pass_rate\",\"real_world_engineering_score\"],\"update_frequency\":\"monthly\"},{\"id\":\"aider\",\"name\":\"Aider Polyglot Leaderboard\",\"url\":\"https://aider.chat/docs/leaderboards\",\"provides\":[\"code_editing_score\",\"per_language_scores\"],\"update_frequency\":\"on_model_release\"},{\"id\":\"bigcodebench\",\"name\":\"BigCodeBench\",\"url\":\"https://bigcode-bench.github.io\",\"provides\":[\"code_generation_score\",\"library_usage_score\"],\"update_frequency\":\"periodic\"},{\"id\":\"arena\",\"name\":\"Arena (ex-LMSYS Chatbot Arena)\",\"url\":\"https://lmarena.ai\",\"provides\":[\"elo_rating\",\"coding_elo\",\"reasoning_elo\",\"hard_prompts_elo\"],\"update_frequency\":\"weekly\"}],\"curated\":[{\"id\":\"expert_review\",\"name\":\"AI Stack Advisor Expert Curation\",\"provides\":[\"tool_scores_for_non_llm_tools\",\"gap_coverage\",\"workflow_compatibility\"],\"update_frequency\":\"biweekly\",\"freshness_decay_days\":30}]},\"capabilities\":[{\"id\":\"code_generation\",\"name\":\"Generacion de Codigo\",\"description\":\"Generar codigo funcional a partir de requerimientos en lenguaje natural. Incluye backend, frontend, APIs, scripts y logica de negocio.\",\"sdlc_phase\":\"implementation\",\"benchmark_sources\":[\"swe_bench\",\"aider\",\"bigcodebench\",\"arena.coding_elo\"],\"tools\":[{\"id\":\"claude_code\",\"name\":\"Claude Code (Anthropic)\",\"type\":\"ai_coding_agent\",\"strengths\":[\"Razonamiento complejo multi-archivo\",\"Arquitectura de sistemas completos\",\"Edicion precisa de codigo existente\",\"Terminal integrado con ejecucion real\",\"Agentic workflow (planifica, ejecuta, valida)\"],\"weaknesses\":[\"Requiere CLI (no tiene UI visual nativa)\",\"Costo alto en uso intensivo sin cache\"],\"best_for\":[\"backend\",\"full_stack\",\"refactoring\",\"complex_logic\",\"multi_file_changes\"],\"scores\":{\"swe_bench_verified\":0.75,\"aider_polyglot\":0.82,\"arena_coding_elo\":1503,\"expert_score\":9.5},\"pricing_model\":\"token_based\",\"access\":\"cli\",\"updated\":\"2026-03-01\"},{\"id\":\"cursor\",\"name\":\"Cursor\",\"type\":\"ai_ide\",\"strengths\":[\"IDE completo con AI integrada\",\"Tab completion contextual\",\"Chat inline con codebase awareness\",\"Soporte multi-modelo (Claude, GPT, etc.)\",\"Baja curva de aprendizaje\"],\"weaknesses\":[\"Menos autonomo que Claude Code en tareas complejas\",\"Dependencia del IDE propietario\"],\"best_for\":[\"rapid_prototyping\",\"frontend\",\"learning\",\"pair_programming\"],\"scores\":{\"expert_score\":8.5},\"pricing_model\":\"subscription\",\"access\":\"ide\",\"updated\":\"2026-03-01\"},{\"id\":\"github_copilot\",\"name\":\"GitHub Copilot\",\"type\":\"ai_coding_assistant\",\"strengths\":[\"Integrado en VS Code y JetBrains\",\"Autocompletado rapido en linea\",\"Copilot Workspace para planificacion\",\"Ecosistema GitHub (PRs, Issues, Actions)\"],\"weaknesses\":[\"Menos potente en razonamiento complejo\",\"Menor calidad en refactoring de sistemas grandes\"],\"best_for\":[\"autocompletion\",\"boilerplate\",\"github_workflow\",\"team_environments\"],\"scores\":{\"expert_score\":7.5},\"pricing_model\":\"subscription\",\"access\":\"ide_extension\",\"updated\":\"2026-03-01\"},{\"id\":\"chatgpt\",\"name\":\"ChatGPT (OpenAI)\",\"type\":\"ai_chat\",\"strengths\":[\"Interfaz familiar y accesible\",\"Bueno para snippets y explicaciones\",\"Canvas para edicion visual de codigo\",\"Gran base de conocimiento general\"],\"weaknesses\":[\"No ejecuta codigo en entorno real del usuario\",\"No tiene acceso a tu codebase\",\"Inferior en tareas multi-archivo complejas\"],\"best_for\":[\"learning\",\"snippets\",\"explanations\",\"quick_prototypes\"],\"scores\":{\"arena_coding_elo\":1420,\"expert_score\":7.0},\"pricing_model\":\"subscription_or_token\",\"access\":\"web_chat\",\"updated\":\"2026-03-01\"},{\"id\":\"gemini_code\",\"name\":\"Gemini Code Assist (Google)\",\"type\":\"ai_coding_assistant\",\"strengths\":[\"Ventana de contexto masiva (1M+ tokens)\",\"Integracion con Google Cloud\",\"Bueno para analisis de codebases enormes\"],\"weaknesses\":[\"Ecosistema menos maduro que Copilot/Cursor\",\"Menor adopcion = menos comunidad\"],\"best_for\":[\"large_codebase_analysis\",\"google_cloud_projects\",\"long_context_tasks\"],\"scores\":{\"arena_coding_elo\":1500,\"expert_score\":8.0},\"pricing_model\":\"subscription_or_token\",\"access\":\"ide_extension\",\"updated\":\"2026-03-01\"}]},{\"id\":\"ui_generation\",\"name\":\"Generacion de UI/Frontend\",\"description\":\"Generar interfaces de usuario, componentes, layouts y paginas completas a partir de descripciones o mockups.\",\"sdlc_phase\":\"implementation_frontend\",\"benchmark_sources\":[\"expert_review\"],\"tools\":[{\"id\":\"v0\",\"name\":\"v0 (Vercel)\",\"type\":\"ai_ui_generator\",\"strengths\":[\"Genera componentes React/Next.js production-ready\",\"Usa shadcn/ui y Tailwind nativamente\",\"Iteracion conversacional sobre el diseno\",\"Preview en vivo del resultado\",\"Deploy directo a Vercel\"],\"weaknesses\":[\"Limitado a ecosistema React/Next.js\",\"No genera backend\"],\"best_for\":[\"landing_pages\",\"dashboards\",\"component_libraries\",\"rapid_ui_prototyping\"],\"scores\":{\"expert_score\":9.0},\"pricing_model\":\"freemium\",\"access\":\"web\",\"updated\":\"2026-03-01\"},{\"id\":\"bolt\",\"name\":\"Bolt.new (StackBlitz)\",\"type\":\"ai_fullstack_generator\",\"strengths\":[\"Genera frontend + backend en entorno WebContainer\",\"Multiples frameworks (React, Vue, Svelte, etc.)\",\"Ejecucion en browser sin setup local\",\"Iteracion rapida\"],\"weaknesses\":[\"Calidad inferior a v0 en componentes UI refinados\",\"WebContainer tiene limitaciones de runtime\"],\"best_for\":[\"full_stack_prototypes\",\"multi_framework\",\"quick_demos\"],\"scores\":{\"expert_score\":7.5},\"pricing_model\":\"freemium\",\"access\":\"web\",\"updated\":\"2026-03-01\"},{\"id\":\"lovable\",\"name\":\"Lovable (ex-GPT Engineer)\",\"type\":\"ai_app_generator\",\"strengths\":[\"Genera apps completas con Supabase backend\",\"Buena integracion de auth y base de datos\",\"UI atractiva por defecto\"],\"weaknesses\":[\"Menos control fino sobre componentes\",\"Atado a Supabase como backend\"],\"best_for\":[\"mvp_generation\",\"saas_prototypes\",\"non_technical_founders\"],\"scores\":{\"expert_score\":7.0},\"pricing_model\":\"subscription\",\"access\":\"web\",\"updated\":\"2026-03-01\"}]},{\"id\":\"requirements_analysis\",\"name\":\"Analisis de Requerimientos y Planificacion\",\"description\":\"Descomponer necesidades de negocio en requerimientos tecnicos, definir alcance, historias de usuario, y criterios de aceptacion.\",\"sdlc_phase\":\"planning\",\"benchmark_sources\":[\"arena.reasoning_elo\",\"arena.hard_prompts_elo\"],\"tools\":[{\"id\":\"claude_chat\",\"name\":\"Claude (Anthropic) - Chat\",\"type\":\"ai_reasoning\",\"strengths\":[\"Razonamiento profundo y estructurado\",\"Extended thinking para problemas complejos\",\"Excelente en descomposicion de sistemas\",\"Respuestas largas y detalladas sin degradacion\",\"Artifacts para documentos estructurados\"],\"weaknesses\":[\"No genera diagramas visuales nativamente\"],\"best_for\":[\"system_decomposition\",\"technical_specs\",\"user_stories\",\"architecture_decisions\"],\"scores\":{\"arena_reasoning_elo\":1503,\"expert_score\":9.5},\"pricing_model\":\"subscription_or_token\",\"access\":\"web_chat\",\"updated\":\"2026-03-01\"},{\"id\":\"chatgpt_planning\",\"name\":\"ChatGPT (OpenAI) - Planning\",\"type\":\"ai_reasoning\",\"strengths\":[\"Interfaz accesible y familiar\",\"GPTs personalizados para metodologias especificas\",\"Bueno para brainstorming inicial\",\"Canvas para documentos iterativos\"],\"weaknesses\":[\"Razonamiento menos profundo que Claude en sistemas complejos\",\"Tendencia a respuestas genericas en arquitectura\"],\"best_for\":[\"brainstorming\",\"initial_scoping\",\"non_technical_stakeholders\"],\"scores\":{\"arena_reasoning_elo\":1420,\"expert_score\":7.5},\"pricing_model\":\"subscription_or_token\",\"access\":\"web_chat\",\"updated\":\"2026-03-01\"},{\"id\":\"gemini_planning\",\"name\":\"Gemini (Google) - Planning\",\"type\":\"ai_reasoning\",\"strengths\":[\"Contexto masivo para analizar documentacion existente\",\"Integracion con Google Workspace\",\"Bueno para resumir grandes volumenes de requisitos\"],\"weaknesses\":[\"Menos estructurado en outputs tecnicos\"],\"best_for\":[\"large_document_analysis\",\"migration_planning\",\"google_ecosystem\"],\"scores\":{\"arena_reasoning_elo\":1500,\"expert_score\":8.0},\"pricing_model\":\"subscription_or_token\",\"access\":\"web_chat\",\"updated\":\"2026-03-01\"}]},{\"id\":\"database_design\",\"name\":\"Diseno de Bases de Datos\",\"description\":\"Disenar la estructura de datos, elegir el tipo de base de datos (SQL, NoSQL, Graph, etc.), y definir esquemas, indices, sharding y replicacion.\",\"sdlc_phase\":\"design\",\"benchmark_sources\":[\"expert_review\"],\"tools\":[{\"id\":\"ai_stack_db_skill\",\"name\":\"AI Stack DB Skill (Vercel Skill)\",\"type\":\"specialized_skill\",\"strengths\":[\"Diseno polyglot basado en CAP theorem\",\"Considera sharding, replicacion, consistencia\",\"Especializada en el paso 0 antes de codear\",\"Integra Cassandra, MongoDB, Neo4j, Redis, PostgreSQL\"],\"weaknesses\":[\"Requiere input estructurado del usuario\"],\"best_for\":[\"polyglot_persistence\",\"complex_data_models\",\"distributed_systems\"],\"scores\":{\"expert_score\":9.0},\"pricing_model\":\"free\",\"access\":\"skill\",\"updated\":\"2026-03-01\"},{\"id\":\"claude_code_db\",\"name\":\"Claude Code - Database Design\",\"type\":\"ai_coding_agent\",\"strengths\":[\"Genera schemas, migrations, ORMs completos\",\"Razonamiento sobre trade-offs de consistencia\",\"Puede ejecutar y validar migrations\"],\"weaknesses\":[\"No tiene framework especializado como la DB skill\"],\"best_for\":[\"schema_generation\",\"migration_scripts\",\"orm_setup\"],\"scores\":{\"expert_score\":8.5},\"pricing_model\":\"token_based\",\"access\":\"cli\",\"updated\":\"2026-03-01\"}]},{\"id\":\"testing_qa\",\"name\":\"Testing y QA Automatizado\",\"description\":\"Generar tests unitarios, de integracion, e2e, detectar bugs, y validar calidad de codigo.\",\"sdlc_phase\":\"testing\",\"benchmark_sources\":[\"swe_bench\",\"expert_review\"],\"tools\":[{\"id\":\"claude_code_testing\",\"name\":\"Claude Code - Testing\",\"type\":\"ai_coding_agent\",\"strengths\":[\"Genera tests con alta cobertura automaticamente\",\"Ejecuta tests y corrige en loop hasta pasar\",\"Entiende el contexto del proyecto completo\",\"Puede hacer TDD (test-driven development)\"],\"weaknesses\":[\"Costo por token en sesiones largas de debugging\"],\"best_for\":[\"unit_tests\",\"integration_tests\",\"tdd\",\"bug_reproduction\"],\"scores\":{\"swe_bench_verified\":0.75,\"expert_score\":9.0},\"pricing_model\":\"token_based\",\"access\":\"cli\",\"updated\":\"2026-03-01\"},{\"id\":\"copilot_testing\",\"name\":\"GitHub Copilot - Testing\",\"type\":\"ai_coding_assistant\",\"strengths\":[\"Genera tests inline mientras codeas\",\"Autocompletado de assertions y mocks\",\"Integrado en el flujo de desarrollo\"],\"weaknesses\":[\"No ejecuta los tests por si mismo\",\"Menor cobertura en tests complejos\"],\"best_for\":[\"inline_test_generation\",\"simple_unit_tests\",\"mock_generation\"],\"scores\":{\"expert_score\":7.0},\"pricing_model\":\"subscription\",\"access\":\"ide_extension\",\"updated\":\"2026-03-01\"}]},{\"id\":\"visual_assets\",\"name\":\"Generacion de Assets Visuales\",\"description\":\"Crear imagenes, iconos, logos, ilustraciones, mockups y assets graficos para el proyecto.\",\"sdlc_phase\":\"design_visual\",\"benchmark_sources\":[\"expert_review\"],\"tools\":[{\"id\":\"midjourney\",\"name\":\"Midjourney\",\"type\":\"ai_image_generator\",\"strengths\":[\"Calidad artistica superior\",\"Estilos consistentes con style references\",\"Excelente para branding y marketing\",\"Comunidad activa con prompts compartidos\"],\"weaknesses\":[\"Solo via Discord o web (no API publica estable)\",\"Menos control preciso sobre layouts UI\",\"No genera iconos SVG\"],\"best_for\":[\"hero_images\",\"branding\",\"illustrations\",\"marketing_assets\"],\"scores\":{\"expert_score\":9.0},\"pricing_model\":\"subscription\",\"access\":\"web_discord\",\"updated\":\"2026-03-01\"},{\"id\":\"dall_e\",\"name\":\"DALL-E 3 (OpenAI)\",\"type\":\"ai_image_generator\",\"strengths\":[\"API estable y documentada\",\"Buena comprension de texto en imagenes\",\"Integrado en ChatGPT\",\"Edicion de imagenes existentes\"],\"weaknesses\":[\"Calidad artistica inferior a Midjourney\",\"Menos control sobre estilos\"],\"best_for\":[\"api_integration\",\"text_in_images\",\"quick_mockups\",\"programmatic_generation\"],\"scores\":{\"expert_score\":7.5},\"pricing_model\":\"token_based\",\"access\":\"api_web\",\"updated\":\"2026-03-01\"},{\"id\":\"figma_ai\",\"name\":\"Figma AI\",\"type\":\"ai_design_tool\",\"strengths\":[\"Integrado en el flujo de diseno profesional\",\"Genera variantes de componentes\",\"Auto-layout inteligente\",\"Colaboracion en tiempo real\"],\"weaknesses\":[\"Requiere conocimiento de Figma\",\"AI features aun en evolucion\"],\"best_for\":[\"professional_ui_design\",\"design_systems\",\"team_collaboration\",\"component_variants\"],\"scores\":{\"expert_score\":8.0},\"pricing_model\":\"subscription\",\"access\":\"web_app\",\"updated\":\"2026-03-01\"}]},{\"id\":\"devops_deploy\",\"name\":\"DevOps, Deploy e Infraestructura\",\"description\":\"Configurar CI/CD, containerizar, deployar, gestionar infraestructura como codigo, y monitorear aplicaciones.\",\"sdlc_phase\":\"deployment\",\"benchmark_sources\":[\"expert_review\"],\"tools\":[{\"id\":\"claude_code_devops\",\"name\":\"Claude Code - DevOps\",\"type\":\"ai_coding_agent\",\"strengths\":[\"Genera Dockerfiles, CI/CD configs, IaC\",\"Ejecuta comandos de deploy reales\",\"Diagnostica errores de infra en contexto\",\"Soporta Terraform, Kubernetes, GitHub Actions\"],\"weaknesses\":[\"Requiere permisos de sistema para ejecutar\",\"No tiene integracion nativa con cloud dashboards\"],\"best_for\":[\"docker\",\"ci_cd\",\"terraform\",\"kubernetes\",\"github_actions\"],\"scores\":{\"expert_score\":9.0},\"pricing_model\":\"token_based\",\"access\":\"cli\",\"updated\":\"2026-03-01\"},{\"id\":\"vercel_platform\",\"name\":\"Vercel (Platform)\",\"type\":\"deployment_platform\",\"strengths\":[\"Deploy zero-config para Next.js\",\"Preview deploys automaticos por PR\",\"Edge functions y serverless nativo\",\"Integracion con v0\"],\"weaknesses\":[\"Optimizado para Next.js/React\",\"Costos escalan con trafico\"],\"best_for\":[\"nextjs_deploy\",\"frontend_hosting\",\"preview_environments\",\"edge_computing\"],\"scores\":{\"expert_score\":9.0},\"pricing_model\":\"usage_based\",\"access\":\"platform\",\"updated\":\"2026-03-01\"}]},{\"id\":\"documentation\",\"name\":\"Documentacion Tecnica\",\"description\":\"Generar documentacion de API, READMEs, guias tecnicas, diagramas de arquitectura, y documentacion de usuario.\",\"sdlc_phase\":\"documentation\",\"benchmark_sources\":[\"expert_review\"],\"tools\":[{\"id\":\"claude_docs\",\"name\":\"Claude - Documentation\",\"type\":\"ai_reasoning\",\"strengths\":[\"Genera documentacion extensa sin perder calidad\",\"Excelente en explicaciones tecnicas claras\",\"Artifacts para documentos estructurados\",\"Consistencia en documentos largos\"],\"weaknesses\":[\"No genera diagramas visuales nativamente\"],\"best_for\":[\"api_docs\",\"technical_guides\",\"architecture_docs\",\"readmes\"],\"scores\":{\"expert_score\":9.5},\"pricing_model\":\"subscription_or_token\",\"access\":\"web_chat\",\"updated\":\"2026-03-01\"},{\"id\":\"mermaid_via_ai\",\"name\":\"Mermaid (via Claude/ChatGPT)\",\"type\":\"diagram_generator\",\"strengths\":[\"Diagramas como codigo (versionables en git)\",\"Flowcharts, sequence, ER, class diagrams\",\"Renderizable en GitHub, Notion, etc.\",\"Cualquier LLM puede generar Mermaid\"],\"weaknesses\":[\"Limitado en diagramas complejos de arquitectura\",\"Estetica basica comparada con herramientas visuales\"],\"best_for\":[\"architecture_diagrams\",\"flow_charts\",\"er_diagrams\",\"sequence_diagrams\"],\"scores\":{\"expert_score\":8.0},\"pricing_model\":\"free\",\"access\":\"code\",\"updated\":\"2026-03-01\"},{\"id\":\"eraser_io\",\"name\":\"Eraser.io\",\"type\":\"ai_diagram_tool\",\"strengths\":[\"Genera diagramas de arquitectura desde texto\",\"Estilos profesionales listos para presentar\",\"Colaboracion en tiempo real\",\"Cloud architecture diagrams nativos\"],\"weaknesses\":[\"Herramienta separada (no integrada en IDE)\",\"Plan free limitado\"],\"best_for\":[\"cloud_architecture\",\"system_design\",\"presentation_diagrams\",\"team_docs\"],\"scores\":{\"expert_score\":8.5},\"pricing_model\":\"freemium\",\"access\":\"web_app\",\"updated\":\"2026-03-01\"}]}],\"scoring_methodology\":{\"expert_score\":{\"range\":[0,10],\"description\":\"Score asignado por curacion experta. Considera calidad de output, fiabilidad, facilidad de uso, y madurez del producto.\",\"freshness_decay\":{\"enabled\":true,\"decay_start_days\":30,\"decay_rate\":0.05,\"min_score_multiplier\":0.7,\"formula\":\"effective_score = expert_score * max(0.7, 1 - (days_since_update - 30) * 0.05 / 30)\"}},\"benchmark_scores\":{\"description\":\"Scores provenientes de fuentes automatizadas (APIs y datasets publicos). Se actualizan programaticamente.\",\"normalization\":\"Cada benchmark se normaliza a escala 0-1 para comparabilidad. Elo ratings se normalizan como (elo - 1000) / 600.\"}},\"selection_algorithm\":{\"description\":\"Como el sistema selecciona la herramienta optima para cada capacidad.\",\"factors\":[{\"name\":\"quality_score\",\"weight\":0.4,\"source\":\"Promedio ponderado de benchmark_scores + expert_score normalizado\"},{\"name\":\"task_fit\",\"weight\":0.25,\"source\":\"Match entre best_for de la herramienta y los modulos del proyecto del usuario\"},{\"name\":\"developer_level\",\"weight\":0.15,\"source\":\"junior: prioriza accesibilidad y UX. senior: prioriza potencia y control\"},{\"name\":\"cost_efficiency\",\"weight\":0.1,\"source\":\"pricing_model relativo al presupuesto del usuario\"},{\"name\":\"ecosystem_compatibility\",\"weight\":0.1,\"source\":\"Compatibilidad con otras herramientas ya seleccionadas en el stack\"}]}}"));}),
"[project]/registry/evidence.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"$schema\":\"ai-stack-advisor/evidence/v1\",\"version\":\"1.0.0\",\"last_updated\":\"2026-03-01\",\"description\":\"First-party evidence: papers, technical reports, best practices and case studies from AI companies. Every recommendation links to its source.\",\"companies\":{\"anthropic\":{\"name\":\"Anthropic\",\"tools\":[\"claude_code\",\"claude_chat\",\"claude_docs\",\"claude_code_testing\",\"claude_code_devops\",\"claude_code_db\"],\"evidence\":[{\"id\":\"anthropic_claude3_model_card\",\"title\":\"The Claude 3 Model Family: Opus, Sonnet, Haiku\",\"url\":\"https://www-cdn.anthropic.com/de8ba9b01c9ab7cbabf5c33b80b7bbc618857627/Model_Card_Claude_3.pdf\",\"type\":\"technical_report\",\"covers\":\"Capabilities, benchmarks, safety evaluations for Claude 3 family\",\"key_data\":\"Baseline coding benchmarks and capability documentation\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\"]},{\"id\":\"anthropic_opus4_system_card\",\"title\":\"System Card: Claude Opus 4 & Claude Sonnet 4\",\"url\":\"https://www-cdn.anthropic.com/4263b940cabb546aa0e3283f35b686f4f3b2ff47.pdf\",\"type\":\"technical_report\",\"covers\":\"Safety evaluations, ASL-3/ASL-2 classifications, capability assessments\",\"key_data\":\"Justifies trust in Claude for production development environments\",\"relevant_for\":[\"code_generation\",\"testing_qa\"]},{\"id\":\"anthropic_claude_code_best_practices\",\"title\":\"Claude Code: Best Practices for Agentic Coding\",\"url\":\"https://www.anthropic.com/engineering/claude-code-best-practices\",\"type\":\"best_practices\",\"covers\":\"Agentic coding workflows, CLAUDE.md files, prompt strategies\",\"key_data\":\"Primary guide for using Claude as a coding agent\",\"relevant_for\":[\"code_generation\",\"testing_qa\",\"devops_deploy\"]},{\"id\":\"anthropic_prompt_engineering\",\"title\":\"Prompt Engineering Overview\",\"url\":\"https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview\",\"type\":\"best_practices\",\"covers\":\"Comprehensive prompt engineering techniques for Claude\",\"key_data\":\"Foundation for getting optimal code generation results\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\",\"documentation\"]},{\"id\":\"anthropic_claude4_prompting\",\"title\":\"Claude 4 Prompting Best Practices\",\"url\":\"https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices\",\"type\":\"best_practices\",\"covers\":\"Tool use, thinking, agentic systems prompting\",\"key_data\":\"Latest model-specific techniques for coding workflows\",\"relevant_for\":[\"code_generation\",\"testing_qa\"]},{\"id\":\"anthropic_teams_use_claude_code\",\"title\":\"How Anthropic Teams Use Claude Code\",\"url\":\"https://www.anthropic.com/news/how-anthropic-teams-use-claude-code\",\"type\":\"case_study\",\"covers\":\"Internal usage of Claude Code by Anthropic engineers\",\"key_data\":\"First-party evidence of Claude Code effectiveness in real development\",\"relevant_for\":[\"code_generation\",\"testing_qa\",\"devops_deploy\"]},{\"id\":\"anthropic_enterprise_transformation\",\"title\":\"How Enterprises Are Driving AI Transformation with Claude\",\"url\":\"https://www.anthropic.com/news/driving-ai-transformation-with-claude\",\"type\":\"case_study\",\"covers\":\"Behavox, Altana (2-10x velocity), Novo Nordisk, Cox Automotive\",\"key_data\":\"2-10x developer velocity, 70% faster for junior developers\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\"]},{\"id\":\"anthropic_agent_sdk\",\"title\":\"Building Agents with the Claude Agent SDK\",\"url\":\"https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk\",\"type\":\"documentation\",\"covers\":\"Agent architecture, SDK patterns, orchestration\",\"key_data\":\"Foundation for building development automation tools\",\"relevant_for\":[\"code_generation\",\"devops_deploy\"]}]},\"openai\":{\"name\":\"OpenAI\",\"tools\":[\"chatgpt\",\"chatgpt_planning\",\"dall_e\"],\"evidence\":[{\"id\":\"openai_gpt4_technical_report\",\"title\":\"GPT-4 Technical Report\",\"url\":\"https://cdn.openai.com/papers/gpt-4.pdf\",\"type\":\"technical_report\",\"covers\":\"Multimodal capabilities, professional/academic benchmarks, safety\",\"key_data\":\"Foundational capability documentation for GPT-4 code generation\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\"]},{\"id\":\"openai_codex_system_card\",\"title\":\"GPT-5.2-Codex System Card\",\"url\":\"https://cdn.openai.com/pdf/ac7c37ae-7f4c-4442-b741-2eabdeaf77e0/oai_5_2_Codex.pdf\",\"type\":\"technical_report\",\"covers\":\"Codex agent capabilities, safety measures, coding benchmarks\",\"key_data\":\"Documents the cloud coding agent capabilities\",\"relevant_for\":[\"code_generation\",\"testing_qa\"]},{\"id\":\"openai_code_generation_guide\",\"title\":\"Code Generation Guide\",\"url\":\"https://platform.openai.com/docs/guides/code-generation\",\"type\":\"best_practices\",\"covers\":\"Code generation options, Codex agents, IDE/CLI/CI-CD integration\",\"key_data\":\"Primary guide for using OpenAI models for code generation\",\"relevant_for\":[\"code_generation\"]},{\"id\":\"openai_prompt_engineering\",\"title\":\"Prompt Engineering Guide\",\"url\":\"https://platform.openai.com/docs/guides/prompt-engineering\",\"type\":\"best_practices\",\"covers\":\"Six strategies for better results, structured outputs\",\"key_data\":\"Foundation for effective code prompting\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\"]},{\"id\":\"openai_cookbook\",\"title\":\"OpenAI Cookbook\",\"url\":\"https://platform.openai.com/docs/cookbooks\",\"type\":\"documentation\",\"covers\":\"Practical examples, integration patterns, use cases\",\"key_data\":\"Hands-on code examples and patterns\",\"relevant_for\":[\"code_generation\",\"documentation\"]},{\"id\":\"openai_dalle3_paper\",\"title\":\"DALL-E 3 Technical Paper\",\"url\":\"https://cdn.openai.com/papers/dall-e-3.pdf\",\"type\":\"paper\",\"covers\":\"Image generation architecture, caption improvements\",\"key_data\":\"Technical basis for DALL-E 3 prompt adherence\",\"relevant_for\":[\"visual_assets\"]},{\"id\":\"openai_image_generation_guide\",\"title\":\"Image Generation API Guide\",\"url\":\"https://platform.openai.com/docs/guides/image-generation\",\"type\":\"best_practices\",\"covers\":\"API parameters, best practices, integration\",\"key_data\":\"Primary developer reference for DALL-E integration\",\"relevant_for\":[\"visual_assets\"]}]},\"google\":{\"name\":\"Google DeepMind\",\"tools\":[\"gemini_code\",\"gemini_planning\"],\"evidence\":[{\"id\":\"google_gemini_paper\",\"title\":\"Gemini: A Family of Highly Capable Multimodal Models\",\"url\":\"https://arxiv.org/abs/2312.11805\",\"type\":\"paper\",\"covers\":\"Ultra/Pro/Nano capabilities, SOTA on 30/32 benchmarks\",\"key_data\":\"First model to achieve human-expert MMLU performance\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\"]},{\"id\":\"google_gemini15_paper\",\"title\":\"Gemini 1.5: Unlocking Multimodal Understanding Across Millions of Tokens\",\"url\":\"https://arxiv.org/abs/2403.05530\",\"type\":\"paper\",\"covers\":\"Million-token context, Pro and Flash variants\",\"key_data\":\"Enables analysis of entire large codebases in single context\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\",\"documentation\"]},{\"id\":\"google_gemini25_report\",\"title\":\"Gemini 2.5: Pushing the Frontier with Advanced Reasoning\",\"url\":\"https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf\",\"type\":\"technical_report\",\"covers\":\"SOTA on coding/reasoning benchmarks, thinking model\",\"key_data\":\"Advanced reasoning for complex coding tasks\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\"]},{\"id\":\"google_coding_agents_guide\",\"title\":\"Set Up Your Coding Agent (Gemini API)\",\"url\":\"https://ai.google.dev/gemini-api/docs/coding-agents\",\"type\":\"documentation\",\"covers\":\"Coding agent setup, API documentation\",\"key_data\":\"Direct guide for using Gemini as a coding agent\",\"relevant_for\":[\"code_generation\"]},{\"id\":\"google_code_execution\",\"title\":\"Code Execution (Gemini API)\",\"url\":\"https://ai.google.dev/gemini-api/docs/code-execution\",\"type\":\"documentation\",\"covers\":\"Code execution capabilities, supported file types\",\"key_data\":\"Enables Gemini to run and validate code\",\"relevant_for\":[\"code_generation\",\"testing_qa\"]}]},\"vercel\":{\"name\":\"Vercel\",\"tools\":[\"v0\",\"vercel_platform\"],\"evidence\":[{\"id\":\"vercel_v0_announcement\",\"title\":\"Announcing v0: Generative UI\",\"url\":\"https://vercel.com/blog/announcing-v0-generative-ui\",\"type\":\"documentation\",\"covers\":\"v0 launch, React/Shadcn UI/Tailwind generation\",\"key_data\":\"Foundational product capability documentation\",\"relevant_for\":[\"ui_generation\"]},{\"id\":\"vercel_v0_effective_agent\",\"title\":\"How We Made v0 an Effective Coding Agent\",\"url\":\"https://vercel.com/blog/how-we-made-v0-an-effective-coding-agent\",\"type\":\"technical_report\",\"covers\":\"Agent architecture, technical decisions, effectiveness metrics\",\"key_data\":\"Technical depth on v0 agent capabilities\",\"relevant_for\":[\"ui_generation\"]},{\"id\":\"vercel_v0_composite_model\",\"title\":\"Introducing the v0 Composite Model Family\",\"url\":\"https://vercel.com/blog/v0-composite-model-family\",\"type\":\"technical_report\",\"covers\":\"RAG, LLM reasoning, streaming post-processing architecture\",\"key_data\":\"Documents v0 unique multi-model architecture\",\"relevant_for\":[\"ui_generation\"]},{\"id\":\"vercel_v0_best_practices\",\"title\":\"Maximizing Outputs with v0\",\"url\":\"https://vercel.com/blog/maximizing-outputs-with-v0-from-ui-generation-to-code-creation\",\"type\":\"best_practices\",\"covers\":\"Tips for UI generation, code creation best practices\",\"key_data\":\"Primary best practices guide for v0\",\"relevant_for\":[\"ui_generation\"]},{\"id\":\"vercel_v0_platform_api\",\"title\":\"v0 Platform API\",\"url\":\"https://vercel.com/blog/build-your-own-ai-app-builder-with-the-v0-platform-api\",\"type\":\"documentation\",\"covers\":\"Text-to-app API, composable interface for developers\",\"key_data\":\"API-level integration documentation\",\"relevant_for\":[\"ui_generation\",\"devops_deploy\"]}]},\"github\":{\"name\":\"GitHub\",\"tools\":[\"github_copilot\",\"copilot_testing\"],\"evidence\":[{\"id\":\"github_copilot_productivity_study\",\"title\":\"Research: Quantifying GitHub Copilot's Impact on Developer Productivity and Happiness\",\"url\":\"https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/\",\"type\":\"paper\",\"covers\":\"SPACE framework analysis, mental energy, satisfaction metrics\",\"key_data\":\"Primary productivity study using validated framework\",\"relevant_for\":[\"code_generation\"]},{\"id\":\"github_copilot_accenture\",\"title\":\"Research: Quantifying GitHub Copilot's Impact in the Enterprise with Accenture\",\"url\":\"https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/\",\"type\":\"case_study\",\"covers\":\"Enterprise study at Accenture scale\",\"key_data\":\"55% faster coding, 85% more confident, 96% adoption success\",\"relevant_for\":[\"code_generation\"]},{\"id\":\"github_copilot_code_quality\",\"title\":\"Research: Quantifying GitHub Copilot's Impact on Code Quality\",\"url\":\"https://github.blog/2023-10-10-research-quantifying-github-copilots-impact-on-code-quality/\",\"type\":\"paper\",\"covers\":\"Code quality with AI assistance\",\"key_data\":\"53.2% greater likelihood of passing all unit tests\",\"relevant_for\":[\"code_generation\",\"testing_qa\"]},{\"id\":\"github_copilot_economic_impact\",\"title\":\"The Economic Impact of the AI-Powered Developer Lifecycle\",\"url\":\"https://github.blog/news-insights/research/the-economic-impact-of-the-ai-powered-developer-lifecycle-and-lessons-from-github-copilot/\",\"type\":\"paper\",\"covers\":\"Global GDP impact, economic modeling\",\"key_data\":\"$1.5T potential global GDP impact\",\"relevant_for\":[\"code_generation\"]},{\"id\":\"github_copilot_best_practices\",\"title\":\"Best Practices for Using GitHub Copilot\",\"url\":\"https://docs.github.com/en/copilot/get-started/best-practices\",\"type\":\"best_practices\",\"covers\":\"Prompt rephrasing, breaking requests into smaller parts\",\"key_data\":\"Primary best practices reference\",\"relevant_for\":[\"code_generation\"]},{\"id\":\"github_copilot_agent_best_practices\",\"title\":\"Best Practices for Copilot Coding Agent\",\"url\":\"https://docs.github.com/copilot/how-tos/agents/copilot-coding-agent/best-practices-for-using-copilot-to-work-on-tasks\",\"type\":\"best_practices\",\"covers\":\"Clear task scoping, problem descriptions for agent mode\",\"key_data\":\"Agent-specific workflow guidance\",\"relevant_for\":[\"code_generation\",\"testing_qa\"]}]},\"cursor\":{\"name\":\"Cursor (Anysphere)\",\"tools\":[\"cursor\"],\"evidence\":[{\"id\":\"cursor_composer_benchmark\",\"title\":\"Cursor Composer & CursorBench\",\"url\":\"https://cursor.com/blog/composer\",\"type\":\"technical_report\",\"covers\":\"CursorBench benchmark, real engineer requests\",\"key_data\":\"4x faster than comparable models on real engineering tasks\",\"relevant_for\":[\"code_generation\"]},{\"id\":\"cursor_features\",\"title\":\"Cursor Features\",\"url\":\"https://cursor.com/features\",\"type\":\"documentation\",\"covers\":\"Tab completion, Agent, multi-model support\",\"key_data\":\"Feature-level capability documentation\",\"relevant_for\":[\"code_generation\"]},{\"id\":\"cursor_agents\",\"title\":\"Cursor Agents\",\"url\":\"https://cursor.com/agents\",\"type\":\"documentation\",\"covers\":\"Long-running agents, autonomous codebase learning\",\"key_data\":\"Documents agentic capabilities for complex tasks\",\"relevant_for\":[\"code_generation\"]}]},\"midjourney\":{\"name\":\"Midjourney\",\"tools\":[\"midjourney\"],\"evidence\":[{\"id\":\"midjourney_docs\",\"title\":\"Midjourney Documentation Hub\",\"url\":\"https://docs.midjourney.com/\",\"type\":\"documentation\",\"covers\":\"Complete user guide, tools, features, troubleshooting\",\"key_data\":\"Primary reference for all Midjourney capabilities\",\"relevant_for\":[\"visual_assets\"]},{\"id\":\"midjourney_parameters\",\"title\":\"Parameter List\",\"url\":\"https://docs.midjourney.com/hc/en-us/articles/32859204029709-Parameter-List\",\"type\":\"best_practices\",\"covers\":\"All available parameters for controlling image generation\",\"key_data\":\"Essential reference for consistent high-quality outputs\",\"relevant_for\":[\"visual_assets\"]},{\"id\":\"midjourney_character_ref\",\"title\":\"Character Reference\",\"url\":\"https://docs.midjourney.com/hc/en-us/articles/32162917505293-Character-Reference\",\"type\":\"best_practices\",\"covers\":\"Maintaining character consistency across images\",\"key_data\":\"Relevant for UI/UX design consistency and branding\",\"relevant_for\":[\"visual_assets\"]}]}},\"evidence_summary\":{\"total_sources\":46,\"by_type\":{\"technical_report\":10,\"paper\":8,\"best_practices\":14,\"case_study\":4,\"documentation\":10},\"key_metrics_from_evidence\":{\"claude_code_enterprise_velocity\":\"2-10x developer velocity (Anthropic case study)\",\"claude_code_junior_speed\":\"70% faster for junior developers (Cox Automotive)\",\"copilot_coding_speed\":\"55% faster coding (Accenture study)\",\"copilot_test_pass_rate\":\"53.2% greater likelihood of passing unit tests (GitHub research)\",\"copilot_adoption_rate\":\"96% adoption success at enterprise scale (Accenture)\",\"cursor_benchmark_speed\":\"4x faster than comparable models (CursorBench)\",\"copilot_economic_impact\":\"$1.5T potential global GDP impact (GitHub research)\"}}}"));}),
"[project]/registry/academic.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"$schema\":\"ai-stack-advisor/academic/v1\",\"version\":\"1.0.0\",\"last_updated\":\"2026-03-01\",\"description\":\"Academic papers from top-tier venues (NeurIPS, ICML, ICLR, ACL, IEEE S&P, Science, arXiv) that provide independent, peer-reviewed evidence for AI tool recommendations.\",\"categories\":{\"code_generation_se\":{\"name\":\"Code Generation & Software Engineering\",\"papers\":[{\"id\":\"swebench_2024\",\"title\":\"SWE-bench: Can Language Models Resolve Real-World GitHub Issues?\",\"authors\":\"Jimenez, Yang, Wettig et al. (Princeton)\",\"venue\":\"ICLR 2024\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2310.06770\",\"key_finding\":\"The best model solved only 4.8% of real GitHub issues at launch, revealing a large gap between toy benchmarks and real-world software engineering.\",\"relevant_for\":[\"code_generation\",\"testing_qa\"],\"implication\":\"Justifies why agentic tools (Claude Code, Cursor) are needed on top of raw LLMs.\"},{\"id\":\"sweagent_2024\",\"title\":\"SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering\",\"authors\":\"Yang, Jimenez, Wettig et al. (Princeton)\",\"venue\":\"NeurIPS 2024\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2405.15793\",\"key_finding\":\"Agent interface design matters as much as model capability. A custom ACI achieves 12.5% on SWE-bench vs 4.8% with raw API.\",\"relevant_for\":[\"code_generation\"],\"implication\":\"Tools with good agent scaffolding (Claude Code, Cursor Agent) outperform raw API access.\"},{\"id\":\"humaneval_codex_2021\",\"title\":\"Evaluating Large Language Models Trained on Code (Codex / HumanEval)\",\"authors\":\"Chen, Tworek, Jun et al. (OpenAI)\",\"venue\":\"arXiv 2021 (seminal, 3000+ citations)\",\"type\":\"preprint\",\"url\":\"https://arxiv.org/abs/2107.03374\",\"key_finding\":\"Repeated sampling (pass@100) dramatically outperforms single-shot generation. Foundational evaluation methodology for code LLMs.\",\"relevant_for\":[\"code_generation\"],\"implication\":\"Tools offering multiple suggestions (Copilot, Codeium) are backed by this principle.\"},{\"id\":\"evalplus_2023\",\"title\":\"Is Your Code Generated by ChatGPT Really Correct? Rigorous Evaluation of LLMs for Code Generation\",\"authors\":\"Liu, Xia, Wang, Zhang\",\"venue\":\"NeurIPS 2023\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2305.01210\",\"key_finding\":\"With rigorous tests, GPT-4 pass rate drops from 67% to 51.2%. LLM-generated code often passes weak tests but contains subtle bugs.\",\"relevant_for\":[\"code_generation\",\"testing_qa\"],\"implication\":\"Justifies recommending robust testing alongside AI code generation.\"},{\"id\":\"repairagent_2024\",\"title\":\"RepairAgent: An Autonomous, LLM-Based Agent for Program Repair\",\"authors\":\"Bouzenia, Devanbu, Pradel\",\"venue\":\"arXiv 2024\",\"type\":\"preprint\",\"url\":\"https://arxiv.org/abs/2403.17134\",\"key_finding\":\"LLM agent with tool use fixes 164/835 bugs, significantly outperforming non-LLM repair tools.\",\"relevant_for\":[\"code_generation\",\"testing_qa\"],\"implication\":\"LLMs + tool use outperform standalone approaches for bug fixing.\"},{\"id\":\"google_ai_effectiveness_2024\",\"title\":\"The Effectiveness of AI Code Assistants in Real-World Software Development\",\"authors\":\"Abuhaimed, Kim (Google)\",\"venue\":\"arXiv 2024\",\"type\":\"preprint\",\"url\":\"https://arxiv.org/abs/2404.18832\",\"key_finding\":\"Developers accept ~25-30% of AI suggestions. Highest acceptance for boilerplate and test code. Code quality remains stable.\",\"relevant_for\":[\"code_generation\",\"testing_qa\"],\"implication\":\"AI code assistants are most useful for repetitive code and tests.\"},{\"id\":\"codegen_2023\",\"title\":\"CodeGen: An Open Large Language Model for Code with Multi-Turn Program Synthesis\",\"authors\":\"Nijkamp, Pang, Hayashi et al. (Salesforce)\",\"venue\":\"ICLR 2023\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2203.13474\",\"key_finding\":\"Multi-turn conversational code generation outperforms single-turn generation for complex tasks.\",\"relevant_for\":[\"code_generation\"],\"implication\":\"Supports chat-based coding tools (Claude, ChatGPT) over one-shot autocomplete for complex tasks.\"},{\"id\":\"alphacode_2022\",\"title\":\"Competition-Level Code Generation with AlphaCode\",\"authors\":\"Li, Choi, Chung et al. (DeepMind)\",\"venue\":\"Science 2022\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2203.07814\",\"key_finding\":\"Achieves median human-level in competitive programming via massive sampling + filtering.\",\"relevant_for\":[\"code_generation\"],\"implication\":\"Generate-and-filter paradigm validates tools using multiple completions.\"}]},\"reasoning_architecture\":{\"name\":\"LLM Reasoning & Architecture\",\"papers\":[{\"id\":\"rlhf_2022\",\"title\":\"Training Language Models to Follow Instructions with Human Feedback (InstructGPT/RLHF)\",\"authors\":\"Ouyang, Wu, Jiang et al. (OpenAI)\",\"venue\":\"NeurIPS 2022\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2203.02155\",\"key_finding\":\"RLHF makes a 1.3B model preferred over 175B GPT-3. Alignment through human feedback is critical for useful AI assistants.\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\"],\"implication\":\"Explains WHY instruction-tuned models (GPT-4, Claude) are better for dev tools than base models.\"},{\"id\":\"constitutional_ai_2022\",\"title\":\"Constitutional AI: Harmlessness from AI Feedback\",\"authors\":\"Bai, Kadavath, Kundu et al. (Anthropic)\",\"venue\":\"arXiv 2022\",\"type\":\"preprint\",\"url\":\"https://arxiv.org/abs/2212.08073\",\"key_finding\":\"AI can self-supervise alignment using constitutional principles, improving both harmlessness and helpfulness.\",\"relevant_for\":[\"code_generation\",\"testing_qa\"],\"implication\":\"Explains Claude's safety approach. Relevant for security-sensitive code generation.\"},{\"id\":\"chain_of_thought_2022\",\"title\":\"Chain-of-Thought Prompting Elicits Reasoning in Large Language Models\",\"authors\":\"Wei, Wang, Schuurmans et al. (Google)\",\"venue\":\"NeurIPS 2022\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2201.11903\",\"key_finding\":\"Intermediate reasoning steps dramatically improve performance on multi-step tasks, with gains scaling with model size.\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\",\"database_design\"],\"implication\":\"Explains why 'thinking' models produce better code for complex algorithmic tasks.\"},{\"id\":\"scaling_laws_2020\",\"title\":\"Scaling Laws for Neural Language Models\",\"authors\":\"Kaplan, McCandlish, Henighan et al. (OpenAI)\",\"venue\":\"arXiv 2020 (seminal, 4000+ citations)\",\"type\":\"preprint\",\"url\":\"https://arxiv.org/abs/2001.08361\",\"key_finding\":\"LLM performance follows predictable power-law scaling with compute, data, and parameters.\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\"],\"implication\":\"Explains why newer/larger models consistently outperform on coding tasks.\"},{\"id\":\"rag_2020\",\"title\":\"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks\",\"authors\":\"Lewis, Perez, Piktus et al. (Meta AI / UCL)\",\"venue\":\"NeurIPS 2020\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2005.11401\",\"key_finding\":\"Combining retrieval with generation produces more factual outputs. Establishes the RAG paradigm.\",\"relevant_for\":[\"code_generation\",\"documentation\"],\"implication\":\"Explains why RAG-enhanced coding tools (Cursor, Cody) outperform context-limited ones.\"},{\"id\":\"verify_step_by_step_2024\",\"title\":\"Let's Verify Step by Step\",\"authors\":\"Lightman, Kosaraju, Burda et al. (OpenAI)\",\"venue\":\"ICLR 2024\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2305.20050\",\"key_finding\":\"Process-based reward models (verifying each step) outperform outcome-based models: 78.2% vs 72.4% on MATH.\",\"relevant_for\":[\"code_generation\",\"testing_qa\"],\"implication\":\"Explains reasoning improvements in thinking models. Justifies recommending them for debugging.\"}]},\"evaluation_benchmarks\":{\"name\":\"LLM Evaluation & Benchmarks\",\"papers\":[{\"id\":\"chatbot_arena_2024\",\"title\":\"Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference\",\"authors\":\"Chiang, Zheng, Sheng et al. (LMSYS / UC Berkeley)\",\"venue\":\"ICML 2024\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2403.04132\",\"key_finding\":\"Crowdsourced pairwise evaluation with Elo ratings is more reliable than static benchmarks. 1M+ human votes reveal differences invisible in automated metrics.\",\"relevant_for\":[\"code_generation\",\"requirements_analysis\"],\"implication\":\"Justifies using Arena rankings as primary signal for tool recommendations.\"},{\"id\":\"mmlu_2021\",\"title\":\"Measuring Massive Multitask Language Understanding (MMLU)\",\"authors\":\"Hendrycks, Burns, Basart et al.\",\"venue\":\"ICLR 2021\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2009.03300\",\"key_finding\":\"57-subject benchmark establishing the primary metric for comparing general LLM capabilities.\",\"relevant_for\":[\"requirements_analysis\",\"documentation\"],\"implication\":\"Foundation benchmark for comparing models on general-purpose developer assistance.\"},{\"id\":\"livecodebench_2024\",\"title\":\"LiveCodeBench: Holistic and Contamination-Free Evaluation of LLMs for Code\",\"authors\":\"Jain, Han, Gu et al.\",\"venue\":\"arXiv 2024\",\"type\":\"preprint\",\"url\":\"https://arxiv.org/abs/2403.07974\",\"key_finding\":\"Models' HumanEval scores are inflated by 10-20% due to benchmark contamination. Continuously updated problems prevent this.\",\"relevant_for\":[\"code_generation\"],\"implication\":\"Cautions against relying on HumanEval alone. Supports using multiple benchmarks.\"},{\"id\":\"cruxeval_2024\",\"title\":\"CRUXEval: A Benchmark for Code Reasoning, Understanding, and Execution\",\"authors\":\"Gu, Roziere, Leather et al.\",\"venue\":\"ICML 2024\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2401.03065\",\"key_finding\":\"GPT-4 achieves only ~70% on execution prediction. Even top models struggle with precise code semantics.\",\"relevant_for\":[\"code_generation\",\"testing_qa\"],\"implication\":\"Supports recommending human review of AI-generated code.\"}]},\"ui_design\":{\"name\":\"AI for UI/Design\",\"papers\":[{\"id\":\"design2code_2024\",\"title\":\"Design2Code: How Far Are We From Automating Front-End Engineering?\",\"authors\":\"Si, Zhang, Yang et al.\",\"venue\":\"arXiv 2024\",\"type\":\"preprint\",\"url\":\"https://arxiv.org/abs/2403.03163\",\"key_finding\":\"GPT-4V generates HTML/CSS from screenshots with 49% visual similarity. Multimodal models outperform text-only by 2x on UI-to-code.\",\"relevant_for\":[\"ui_generation\"],\"implication\":\"Justifies recommending multimodal AI tools for frontend prototyping.\"},{\"id\":\"websight_2024\",\"title\":\"WebSight: A Comprehensive Dataset for Automated Web Page Generation\",\"authors\":\"Laurencon, Tronchon, Sanh (Hugging Face)\",\"venue\":\"arXiv 2024\",\"type\":\"preprint\",\"url\":\"https://arxiv.org/abs/2403.09029\",\"key_finding\":\"2M webpage screenshot-code pairs enable small models to generate HTML competitively with GPT-4V.\",\"relevant_for\":[\"ui_generation\"],\"implication\":\"Supports feasibility of specialized tools for UI generation like v0.\"}]},\"safety_reliability\":{\"name\":\"AI Safety & Reliability for Production Code\",\"papers\":[{\"id\":\"copilot_security_2022\",\"title\":\"Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions\",\"authors\":\"Pearce, Ahmad, Tan et al.\",\"venue\":\"IEEE S&P (Oakland) 2022\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2108.09293\",\"key_finding\":\"~40% of Copilot-generated code for security-relevant scenarios contains vulnerabilities.\",\"relevant_for\":[\"code_generation\",\"testing_qa\"],\"implication\":\"CRITICAL: Security review is mandatory alongside AI code generation.\"},{\"id\":\"insecure_code_2023\",\"title\":\"Do Users Write More Insecure Code with AI Assistants?\",\"authors\":\"Perry, Srivastava, Kumar, Boneh (Stanford)\",\"venue\":\"ACM CCS 2023\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2211.03622\",\"key_finding\":\"Developers using AI assistants produced MORE security vulnerabilities AND were MORE confident their code was correct.\",\"relevant_for\":[\"code_generation\",\"testing_qa\"],\"implication\":\"AI tools can create false confidence. Security scanning is non-negotiable.\"},{\"id\":\"hallucination_survey_2023\",\"title\":\"A Survey on Hallucination in Large Language Models\",\"authors\":\"Ji, Lee, Frieske et al.\",\"venue\":\"ACL 2023\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2311.05232\",\"key_finding\":\"Larger models hallucinate less frequently but not less confidently. RAG and self-consistency checks mitigate this.\",\"relevant_for\":[\"code_generation\",\"documentation\",\"requirements_analysis\"],\"implication\":\"Justifies recommending tools with RAG/grounding over raw generation.\"}]},\"developer_productivity\":{\"name\":\"Developer Productivity with AI\",\"papers\":[{\"id\":\"copilot_rct_2023\",\"title\":\"The Impact of AI on Developer Productivity: Evidence from GitHub Copilot\",\"authors\":\"Peng, Kalliamvakou, Cihon, Demirer (GitHub / Microsoft Research)\",\"venue\":\"arXiv 2023 (landmark RCT study)\",\"type\":\"preprint\",\"url\":\"https://arxiv.org/abs/2302.06590\",\"key_finding\":\"Randomized controlled trial: Copilot users completed tasks 55.8% faster. Effect concentrated on less experienced developers.\",\"relevant_for\":[\"code_generation\"],\"implication\":\"Strongest empirical evidence for AI coding tool productivity gains.\"},{\"id\":\"llm_se_survey_2024\",\"title\":\"Large Language Models for Software Engineering: A Systematic Literature Review\",\"authors\":\"Hou, Zhao, Liu et al.\",\"venue\":\"ACM TOSEM 2024\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2308.10620\",\"key_finding\":\"Review of 200+ papers: LLMs most effective for code generation (>70% improvement), moderately for testing/docs, least mature for requirements/design.\",\"relevant_for\":[\"code_generation\",\"testing_qa\",\"documentation\",\"requirements_analysis\"],\"implication\":\"Evidence-based hierarchy: AI is best for coding, good for testing, growing for docs, emerging for planning.\"},{\"id\":\"usability_code_gen_2023\",\"title\":\"Expectation vs. Experience: Evaluating the Usability of Code Generation Tools Powered by LLMs\",\"authors\":\"Vaithilingam, Zhang, Glassman\",\"venue\":\"CHI 2023\",\"type\":\"peer_reviewed\",\"url\":\"https://arxiv.org/abs/2204.13096\",\"key_finding\":\"Time spent understanding and debugging AI code offsets productivity gains for complex tasks. Simple tasks see net benefit.\",\"relevant_for\":[\"code_generation\"],\"implication\":\"AI tools are best for well-defined subtasks, not entire complex implementations.\"},{\"id\":\"google_test_gen_2024\",\"title\":\"LLM-Based Test Generation: An Industrial Case Study at Google\",\"authors\":\"Agarwal, Winterer et al. (Google)\",\"venue\":\"ICSE 2024 Industry Track\",\"type\":\"preprint\",\"url\":\"https://arxiv.org/abs/2402.04480\",\"key_finding\":\"LLM-generated tests achieve comparable coverage to human-written tests for ~70% of functions.\",\"relevant_for\":[\"testing_qa\"],\"implication\":\"Supports recommending AI for test generation with human oversight for complex tests.\"}]}},\"summary\":{\"total_papers\":27,\"peer_reviewed\":18,\"preprints_seminal\":9,\"venues\":[\"NeurIPS\",\"ICML\",\"ICLR\",\"ACL\",\"Science\",\"IEEE S&P\",\"ACM CCS\",\"CHI\",\"ICSE\",\"ACM TOSEM\"],\"key_insights_for_recommendations\":{\"code_generation\":\"Agentic tools with repo context outperform raw APIs by 2-3x on real tasks (SWE-bench, ICLR 2024). 55.8% faster development in RCT (Microsoft Research).\",\"testing_qa\":\"AI tests match human coverage for 70% of functions (Google, ICSE 2024). But 40% of AI code has security vulns (IEEE S&P 2022) — testing is mandatory.\",\"ui_generation\":\"Multimodal models achieve 49% visual fidelity on screenshot-to-code (Design2Code). Good for prototyping, needs human refinement.\",\"requirements_analysis\":\"LLMs least mature here per 200+ paper review (ACM TOSEM 2024). Chain-of-thought models best for complex reasoning (NeurIPS 2022).\",\"documentation\":\"RAG-enhanced tools produce more factual output (NeurIPS 2020). Larger models hallucinate less frequently (ACL 2023).\",\"security_warning\":\"Developers using AI produce MORE vulnerabilities AND are MORE confident code is secure (ACM CCS 2023, Stanford). Security scanning is non-negotiable.\"}}}"));}),
"[project]/app/lib/registry.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findAcademicPapers",
    ()=>findAcademicPapers,
    "findEvidence",
    ()=>findEvidence,
    "getAcademic",
    ()=>getAcademic,
    "getCapabilities",
    ()=>getCapabilities,
    "getEvidence",
    ()=>getEvidence
]);
// ============================================================
// Registry Loader — Static imports for Next.js (no readFileSync)
// ============================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$registry$2f$capabilities$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/registry/capabilities.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$registry$2f$evidence$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/registry/evidence.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$registry$2f$academic$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/registry/academic.json (json)");
;
;
;
function getCapabilities() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$registry$2f$capabilities$2e$json__$28$json$29$__["default"];
}
function getEvidence() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$registry$2f$evidence$2e$json__$28$json$29$__["default"];
}
function getAcademic() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$registry$2f$academic$2e$json__$28$json$29$__["default"];
}
function findEvidence(toolId, capabilityId) {
    const evidence = getEvidence();
    const results = [];
    for (const company of Object.values(evidence.companies)){
        if (!company.tools.includes(toolId)) continue;
        for (const item of company.evidence){
            if (item.relevant_for.includes(capabilityId)) {
                results.push(item);
            }
        }
    }
    return results;
}
function findAcademicPapers(capabilityId) {
    const academic = getAcademic();
    const results = [];
    for (const category of Object.values(academic.categories)){
        for (const paper of category.papers){
            if (paper.relevant_for.includes(capabilityId)) {
                results.push(paper);
            }
        }
    }
    return results;
}
}),
"[project]/src/ai.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "askClaude",
    ()=>askClaude,
    "askClaudeJSON",
    ()=>askClaudeJSON
]);
// ============================================================
// AI Stack Advisor - AI Engine (Claude API)
// ============================================================
// Centralizes all Claude API interactions. Other modules call
// these functions instead of making direct API calls.
// ============================================================
var __TURBOPACK__imported__module__$5b$externals$5d2f40$anthropic$2d$ai$2f$sdk__$5b$external$5d$__$2840$anthropic$2d$ai$2f$sdk$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$29$__ = __turbopack_context__.i("[externals]/@anthropic-ai/sdk [external] (@anthropic-ai/sdk, esm_import, [project]/node_modules/@anthropic-ai/sdk)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$anthropic$2d$ai$2f$sdk__$5b$external$5d$__$2840$anthropic$2d$ai$2f$sdk$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$anthropic$2d$ai$2f$sdk__$5b$external$5d$__$2840$anthropic$2d$ai$2f$sdk$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
let client = null;
/**
 * Initializes the Anthropic client.
 * Reads ANTHROPIC_API_KEY from environment.
 */ function getClient() {
    if (!client) {
        client = new __TURBOPACK__imported__module__$5b$externals$5d2f40$anthropic$2d$ai$2f$sdk__$5b$external$5d$__$2840$anthropic$2d$ai$2f$sdk$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f40$anthropic$2d$ai$2f$sdk$29$__["default"]();
    }
    return client;
}
async function askClaude(systemPrompt, userMessage, options) {
    const anthropic = getClient();
    const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: options?.maxTokens ?? 4096,
        temperature: options?.temperature ?? 0.3,
        system: systemPrompt,
        messages: [
            {
                role: "user",
                content: userMessage
            }
        ]
    });
    const textBlock = response.content.find((block)=>block.type === "text");
    return textBlock?.text ?? "";
}
async function askClaudeJSON(systemPrompt, userMessage) {
    const response = await askClaude(systemPrompt, userMessage, {
        maxTokens: 4096,
        temperature: 0.1
    });
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1].trim() : response.trim();
    return JSON.parse(jsonStr);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/decomposer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// ============================================================
// AI Stack Advisor - Project Decomposer (AI-Powered)
// ============================================================
// Two modes:
//   1. AI mode (default): Uses Claude to deeply understand the
//      prompt, infer implicit modules, and detect nuance.
//   2. Fallback mode: Keyword-based, used when no API key or
//      when AI call fails. Ensures the skill always works.
// ============================================================
__turbopack_context__.s([
    "decomposeProject",
    ()=>decomposeProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
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
 */ async function decomposeWithAI(prompt, developer_level, budget) {
    const userMessage = `Analiza este proyecto y descomponelo en modulos tecnicos:

PROYECTO: "${prompt}"
NIVEL DEL DEVELOPER: ${developer_level}
PRESUPUESTO: ${budget}

Recuerda: detecta modulos implicitos, no solo los que menciona explicitamente. Todo proyecto profesional necesita requirements, testing, deploy y documentacion.`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["askClaudeJSON"])(DECOMPOSER_SYSTEM_PROMPT, userMessage);
}
// --- Keyword Fallback (same as before, kept for resilience) ---
const PROJECT_TYPE_KEYWORDS = {
    web_app: [
        "web app",
        "aplicacion web",
        "webapp",
        "web application",
        "plataforma web"
    ],
    mobile_app: [
        "mobile",
        "movil",
        "app movil",
        "ios",
        "android",
        "react native",
        "flutter"
    ],
    saas: [
        "saas",
        "software as a service",
        "multi-tenant",
        "suscripcion",
        "subscription"
    ],
    api: [
        "api",
        "rest api",
        "graphql",
        "microservicio",
        "microservice",
        "backend api"
    ],
    cli_tool: [
        "cli",
        "command line",
        "terminal",
        "linea de comandos",
        "script"
    ],
    landing_page: [
        "landing",
        "landing page",
        "pagina de aterrizaje",
        "one page"
    ],
    e_commerce: [
        "ecommerce",
        "e-commerce",
        "tienda online",
        "shop",
        "carrito",
        "pagos",
        "payments",
        "checkout"
    ],
    dashboard: [
        "dashboard",
        "panel",
        "admin panel",
        "analytics",
        "metricas",
        "reportes"
    ],
    portfolio: [
        "portfolio",
        "portafolio",
        "personal website",
        "cv",
        "resume"
    ],
    internal_tool: [
        "internal tool",
        "herramienta interna",
        "backoffice",
        "back office",
        "admin"
    ],
    data_pipeline: [
        "data pipeline",
        "etl",
        "data processing",
        "batch",
        "streaming",
        "kafka"
    ],
    other: []
};
const MODULE_PATTERNS = [
    {
        keywords: [
            "auth",
            "login",
            "registro",
            "signup",
            "sign up",
            "autenticacion",
            "authentication",
            "oauth",
            "jwt",
            "sesion",
            "session"
        ],
        module_name: "Autenticacion",
        description: "Sistema de registro, login, gestion de sesiones y permisos",
        capabilities: [
            "code_generation",
            "database_design"
        ],
        tags: [
            "auth",
            "security",
            "backend"
        ]
    },
    {
        keywords: [
            "pago",
            "payment",
            "stripe",
            "checkout",
            "facturacion",
            "billing",
            "suscripcion",
            "subscription",
            "cobro"
        ],
        module_name: "Sistema de Pagos",
        description: "Integracion de pagos, checkout, facturacion y gestion de suscripciones",
        capabilities: [
            "code_generation",
            "testing_qa"
        ],
        tags: [
            "payments",
            "integration",
            "security"
        ]
    },
    {
        keywords: [
            "dashboard",
            "panel",
            "analytics",
            "metricas",
            "graficos",
            "charts",
            "reportes",
            "estadisticas",
            "kpi"
        ],
        module_name: "Dashboard / Analytics",
        description: "Panel de control con visualizacion de datos, graficos y metricas",
        capabilities: [
            "ui_generation",
            "code_generation",
            "database_design"
        ],
        tags: [
            "frontend",
            "data_visualization",
            "analytics"
        ]
    },
    {
        keywords: [
            "api",
            "rest",
            "graphql",
            "endpoint",
            "microservicio",
            "backend"
        ],
        module_name: "API Backend",
        description: "Diseno e implementacion de API con endpoints, validacion y logica de negocio",
        capabilities: [
            "code_generation",
            "documentation",
            "testing_qa"
        ],
        tags: [
            "backend",
            "api",
            "architecture"
        ]
    },
    {
        keywords: [
            "base de datos",
            "database",
            "datos",
            "modelo de datos",
            "schema",
            "sql",
            "nosql",
            "postgres",
            "mongo"
        ],
        module_name: "Base de Datos",
        description: "Diseno de estructura de datos, esquemas, relaciones e indices",
        capabilities: [
            "database_design"
        ],
        tags: [
            "database",
            "architecture",
            "backend"
        ]
    },
    {
        keywords: [
            "ui",
            "interfaz",
            "frontend",
            "componentes",
            "pagina",
            "diseño",
            "layout",
            "formulario",
            "form",
            "tabla",
            "table"
        ],
        module_name: "Interfaz de Usuario",
        description: "Diseno y generacion de componentes UI, layouts y paginas",
        capabilities: [
            "ui_generation"
        ],
        tags: [
            "frontend",
            "ui",
            "design"
        ]
    },
    {
        keywords: [
            "landing",
            "home",
            "hero",
            "cta",
            "about",
            "contacto",
            "contact"
        ],
        module_name: "Paginas Estaticas",
        description: "Landing page, paginas informativas, secciones hero y CTA",
        capabilities: [
            "ui_generation",
            "visual_assets"
        ],
        tags: [
            "frontend",
            "marketing",
            "design"
        ]
    },
    {
        keywords: [
            "deploy",
            "hosting",
            "despliegue",
            "produccion",
            "production",
            "ci/cd",
            "devops",
            "docker",
            "kubernetes"
        ],
        module_name: "Deploy e Infraestructura",
        description: "Configuracion de deploy, CI/CD, containerizacion y hosting",
        capabilities: [
            "devops_deploy"
        ],
        tags: [
            "devops",
            "infrastructure",
            "deploy"
        ]
    },
    {
        keywords: [
            "test",
            "testing",
            "pruebas",
            "qa",
            "calidad",
            "unit test",
            "e2e",
            "integracion"
        ],
        module_name: "Testing y QA",
        description: "Tests unitarios, de integracion y end-to-end",
        capabilities: [
            "testing_qa"
        ],
        tags: [
            "testing",
            "quality",
            "automation"
        ]
    },
    {
        keywords: [
            "imagen",
            "logo",
            "icono",
            "branding",
            "assets",
            "ilustracion",
            "foto",
            "visual",
            "grafico"
        ],
        module_name: "Assets Visuales",
        description: "Generacion de imagenes, logos, iconos y assets graficos",
        capabilities: [
            "visual_assets"
        ],
        tags: [
            "design",
            "branding",
            "visual"
        ]
    },
    {
        keywords: [
            "docs",
            "documentacion",
            "readme",
            "guia",
            "manual",
            "api docs",
            "swagger"
        ],
        module_name: "Documentacion",
        description: "Documentacion tecnica, API docs, guias de usuario y diagramas",
        capabilities: [
            "documentation"
        ],
        tags: [
            "docs",
            "technical_writing"
        ]
    },
    {
        keywords: [
            "notificacion",
            "email",
            "notification",
            "push",
            "sms",
            "alerta",
            "alert",
            "websocket",
            "real-time",
            "tiempo real"
        ],
        module_name: "Notificaciones / Real-time",
        description: "Sistema de notificaciones, emails transaccionales, websockets o alertas",
        capabilities: [
            "code_generation"
        ],
        tags: [
            "backend",
            "real_time",
            "notifications"
        ]
    },
    {
        keywords: [
            "busqueda",
            "search",
            "filtro",
            "filter",
            "elasticsearch",
            "algolia"
        ],
        module_name: "Busqueda y Filtros",
        description: "Sistema de busqueda, filtros avanzados e indexacion",
        capabilities: [
            "code_generation",
            "database_design"
        ],
        tags: [
            "backend",
            "search",
            "ux"
        ]
    },
    {
        keywords: [
            "usuario",
            "perfil",
            "profile",
            "cuenta",
            "account",
            "roles",
            "permisos",
            "permissions"
        ],
        module_name: "Gestion de Usuarios",
        description: "Perfiles de usuario, roles, permisos y gestion de cuentas",
        capabilities: [
            "code_generation",
            "database_design",
            "ui_generation"
        ],
        tags: [
            "backend",
            "frontend",
            "auth"
        ]
    },
    {
        keywords: [
            "inventario",
            "stock",
            "producto",
            "product",
            "catalogo",
            "catalog",
            "sku"
        ],
        module_name: "Catalogo / Inventario",
        description: "Gestion de productos, inventario, categorias y SKUs",
        capabilities: [
            "code_generation",
            "database_design",
            "ui_generation"
        ],
        tags: [
            "backend",
            "e_commerce",
            "crud"
        ]
    },
    {
        keywords: [
            "reserva",
            "booking",
            "cita",
            "appointment",
            "calendario",
            "calendar",
            "agenda",
            "horario",
            "schedule"
        ],
        module_name: "Sistema de Reservas",
        description: "Gestion de reservas, calendario, disponibilidad y agendamiento",
        capabilities: [
            "code_generation",
            "database_design",
            "ui_generation"
        ],
        tags: [
            "backend",
            "frontend",
            "scheduling"
        ]
    }
];
function decomposeWithKeywords(prompt, developer_level, budget) {
    const lower = prompt.toLowerCase();
    // Detect project type
    let project_type = "web_app";
    for (const [type, keywords] of Object.entries(PROJECT_TYPE_KEYWORDS)){
        if (type === "other") continue;
        if (keywords.some((kw)=>lower.includes(kw))) {
            project_type = type;
            break;
        }
    }
    // Detect modules
    const modules = [];
    const seen = new Set();
    for (const pattern of MODULE_PATTERNS){
        if (pattern.keywords.some((kw)=>lower.includes(kw)) && !seen.has(pattern.module_name)) {
            seen.add(pattern.module_name);
            modules.push({
                name: pattern.module_name,
                description: pattern.description,
                capabilities_needed: pattern.capabilities,
                tags: pattern.tags
            });
        }
    }
    if (modules.length === 0) {
        modules.push({
            name: "Aplicacion Principal",
            description: "Modulo principal del proyecto",
            capabilities_needed: [
                "requirements_analysis",
                "code_generation",
                "ui_generation"
            ],
            tags: [
                "core"
            ]
        }, {
            name: "Deploy",
            description: "Configuracion de deploy basico",
            capabilities_needed: [
                "devops_deploy"
            ],
            tags: [
                "devops"
            ]
        });
    }
    // Ensure requirements analysis
    if (!modules.some((m)=>m.capabilities_needed.includes("requirements_analysis"))) {
        modules.unshift({
            name: "Analisis de Requerimientos",
            description: "Descomposicion del proyecto en requerimientos tecnicos",
            capabilities_needed: [
                "requirements_analysis"
            ],
            tags: [
                "planning"
            ]
        });
    }
    // Detect complexity
    const highSignals = [
        "microservicio",
        "distributed",
        "sharding",
        "kubernetes",
        "multi-tenant",
        "real-time",
        "machine learning",
        "blockchain",
        "escalable",
        "high availability"
    ];
    const lowSignals = [
        "landing",
        "portfolio",
        "blog",
        "static",
        "simple",
        "basico",
        "one page"
    ];
    const highCount = highSignals.filter((s)=>lower.includes(s)).length;
    const lowCount = lowSignals.filter((s)=>lower.includes(s)).length;
    const complexity = highCount >= 2 || modules.length >= 6 ? "high" : lowCount >= 2 && modules.length <= 3 ? "low" : "medium";
    // Detect constraints
    const constraintMap = {
        budget_free: [
            "gratis",
            "free",
            "sin costo",
            "sin presupuesto"
        ],
        speed_priority: [
            "rapido",
            "urgente",
            "mvp",
            "prototipo",
            "deadline"
        ],
        security_critical: [
            "seguro",
            "seguridad",
            "security",
            "hipaa",
            "gdpr",
            "pci"
        ],
        scale_required: [
            "escalar",
            "scale",
            "miles de usuarios",
            "millones",
            "trafico alto"
        ],
        offline_capable: [
            "offline",
            "sin conexion",
            "pwa"
        ],
        open_source_only: [
            "open source",
            "codigo abierto",
            "self-hosted"
        ]
    };
    const constraints = [];
    for (const [c, kws] of Object.entries(constraintMap)){
        if (kws.some((kw)=>lower.includes(kw))) constraints.push(c);
    }
    return {
        raw_prompt: prompt,
        project_type,
        modules,
        complexity,
        developer_level,
        budget,
        constraints
    };
}
async function decomposeProject(prompt, developer_level = "mid", budget = "medium", useAI = true) {
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
                constraints: aiResult.constraints
            };
        } catch (error) {
            console.warn("[AI Stack Advisor] AI decomposition failed, using keyword fallback:", error.message);
            return decomposeWithKeywords(prompt, developer_level, budget);
        }
    }
    return decomposeWithKeywords(prompt, developer_level, budget);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/mapper.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================
// AI Stack Advisor - Capability Mapper
// ============================================================
// Takes decomposed project modules and maps them to unique
// capability categories from the registry. Deduplicates and
// orders them by SDLC phase.
// ============================================================
__turbopack_context__.s([
    "mapCapabilities",
    ()=>mapCapabilities
]);
/** SDLC phase ordering for workflow sequencing */ const PHASE_ORDER = {
    planning: 1,
    design: 2,
    design_visual: 3,
    implementation_frontend: 4,
    implementation: 5,
    testing: 6,
    deployment: 7,
    documentation: 8
};
function mapCapabilities(project, registry) {
    const capabilityMap = new Map();
    // Build a lookup for registry capabilities by id
    const registryLookup = new Map();
    for (const cap of registry.capabilities){
        registryLookup.set(cap.id, cap);
    }
    // Iterate modules and collect capabilities
    for (const mod of project.modules){
        for (const capId of mod.capabilities_needed){
            const registryCap = registryLookup.get(capId);
            if (!registryCap) continue;
            if (capabilityMap.has(capId)) {
                // Merge: add module as source, merge tags
                const existing = capabilityMap.get(capId);
                existing.source_modules.push(mod.name);
                existing.all_tags.push(...mod.tags);
            } else {
                capabilityMap.set(capId, {
                    capability_id: capId,
                    capability: registryCap,
                    source_modules: [
                        mod.name
                    ],
                    all_tags: [
                        ...mod.tags
                    ],
                    phase_order: PHASE_ORDER[registryCap.sdlc_phase] ?? 99
                });
            }
        }
    }
    // Deduplicate tags
    for (const mapped of capabilityMap.values()){
        mapped.all_tags = [
            ...new Set(mapped.all_tags)
        ];
    }
    // Sort by SDLC phase order
    return Array.from(capabilityMap.values()).sort((a, b)=>a.phase_order - b.phase_order);
}
}),
"[project]/src/selector.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ============================================================
// AI Stack Advisor - Tool Selector
// ============================================================
// Scores each tool in a capability using the weighted algorithm
// from the registry: quality (40%), task_fit (25%),
// dev_level (15%), cost (10%), compatibility (10%).
// ============================================================
__turbopack_context__.s([
    "selectStack",
    ()=>selectStack,
    "selectToolForCapability",
    ()=>selectToolForCapability
]);
// --- Scoring Helpers ---
/**
 * Normalizes the expert_score (0-10) to 0-1 range.
 */ function normalizeExpertScore(score) {
    return score / 10;
}
/**
 * Normalizes an Elo rating to 0-1.
 * Assumes range roughly 1000-1600.
 */ function normalizeElo(elo) {
    return Math.min(1, Math.max(0, (elo - 1000) / 600));
}
/**
 * Calculates the quality score from all available benchmark scores.
 * Normalizes each to 0-1 and averages them.
 */ function calcQualityScore(tool) {
    const normalized = [];
    for (const [key, value] of Object.entries(tool.scores)){
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
    return normalized.reduce((sum, n)=>sum + n, 0) / normalized.length;
}
/**
 * Calculates task fit: how many of the tool's best_for tags
 * match the project module tags.
 */ function calcTaskFit(tool, tags) {
    if (tool.best_for.length === 0 || tags.length === 0) return 0.5;
    const toolTags = new Set(tool.best_for.map((t)=>t.toLowerCase()));
    const projectTags = new Set(tags.map((t)=>t.toLowerCase()));
    let matches = 0;
    for (const tag of projectTags){
        for (const toolTag of toolTags){
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
 */ function calcDevLevelScore(tool, level) {
    const accessScores = {
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
            code: 0.5
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
            code: 0.8
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
            code: 0.9
        }
    };
    return accessScores[level]?.[tool.access] ?? 0.7;
}
/**
 * Scores cost efficiency based on pricing model and budget.
 */ function calcCostScore(tool, budget) {
    const costMatrix = {
        free: {
            free: 1.0,
            freemium: 0.8,
            subscription: 0.3,
            token_based: 0.2,
            subscription_or_token: 0.3,
            usage_based: 0.2
        },
        low: {
            free: 1.0,
            freemium: 0.9,
            subscription: 0.6,
            token_based: 0.5,
            subscription_or_token: 0.6,
            usage_based: 0.5
        },
        medium: {
            free: 1.0,
            freemium: 1.0,
            subscription: 0.8,
            token_based: 0.7,
            subscription_or_token: 0.8,
            usage_based: 0.7
        },
        unlimited: {
            free: 1.0,
            freemium: 1.0,
            subscription: 1.0,
            token_based: 1.0,
            subscription_or_token: 1.0,
            usage_based: 1.0
        }
    };
    return costMatrix[budget]?.[tool.pricing_model] ?? 0.7;
}
/**
 * Scores ecosystem compatibility with already-selected tools.
 * Tools from the same family get a bonus.
 */ function calcCompatibilityScore(tool, selectedToolIds) {
    // Compatibility groups: tools that work well together
    const compatibilityGroups = [
        [
            "claude_code",
            "claude_chat",
            "claude_docs",
            "claude_code_testing",
            "claude_code_devops",
            "claude_code_db"
        ],
        [
            "v0",
            "vercel_platform"
        ],
        [
            "github_copilot",
            "copilot_testing"
        ],
        [
            "chatgpt",
            "chatgpt_planning",
            "dall_e"
        ],
        [
            "gemini_code",
            "gemini_planning"
        ],
        [
            "bolt",
            "lovable"
        ]
    ];
    // Find which group this tool belongs to
    const toolGroup = compatibilityGroups.find((group)=>group.includes(tool.id));
    if (!toolGroup) return 0.7; // Neutral
    // Check if any already-selected tool is in the same group
    const hasGroupmate = toolGroup.some((id)=>selectedToolIds.has(id));
    return hasGroupmate ? 1.0 : 0.7;
}
// --- Main Selection ---
/**
 * Generates a justification string for a tool selection.
 */ function generateJustification(tool, capabilityName, breakdown) {
    const topStrength = tool.strengths[0] || "Herramienta solida en su categoria";
    const parts = [];
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
function selectToolForCapability(mapped, project, selectedToolIds) {
    const weights = {
        quality: 0.40,
        task_fit: 0.25,
        dev_level: 0.15,
        cost: 0.10,
        compatibility: 0.10
    };
    const scoredTools = mapped.capability.tools.map((tool)=>{
        const quality = calcQualityScore(tool);
        const task_fit = calcTaskFit(tool, mapped.all_tags);
        const dev_level = calcDevLevelScore(tool, project.developer_level);
        const cost = calcCostScore(tool, project.budget);
        const compatibility = calcCompatibilityScore(tool, selectedToolIds);
        const final_score = quality * weights.quality + task_fit * weights.task_fit + dev_level * weights.dev_level + cost * weights.cost + compatibility * weights.compatibility;
        const breakdown = {
            quality,
            task_fit,
            dev_level,
            cost,
            compatibility
        };
        return {
            tool,
            capability_id: mapped.capability_id,
            capability_name: mapped.capability.name,
            final_score,
            score_breakdown: breakdown,
            justification: generateJustification(tool, mapped.capability.name, breakdown)
        };
    });
    // Sort by final score descending
    scoredTools.sort((a, b)=>b.final_score - a.final_score);
    const recommended = scoredTools[0];
    const alternatives = scoredTools.slice(1);
    return {
        phase: mapped.phase_order,
        capability_id: mapped.capability_id,
        capability_name: mapped.capability.name,
        recommended_tool: recommended,
        alternatives,
        reasoning: recommended.justification
    };
}
function selectStack(mappedCapabilities, project) {
    const selectedToolIds = new Set();
    const recommendations = [];
    for (const mapped of mappedCapabilities){
        const recommendation = selectToolForCapability(mapped, project, selectedToolIds);
        recommendations.push(recommendation);
        // Track selected tool for compatibility scoring
        selectedToolIds.add(recommendation.recommended_tool.tool.id);
    }
    return recommendations;
}
}),
"[project]/app/lib/engine.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "runAdvisor",
    ()=>runAdvisor
]);
// ============================================================
// AI Stack Advisor — Web Engine
// ============================================================
// Orchestrates the full pipeline for the web version.
// Uses static imports instead of readFileSync.
// ============================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/registry.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$decomposer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/decomposer.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/mapper.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$selector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/selector.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$decomposer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$decomposer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
// --- Workflow generation (adapted from output.ts without file I/O) ---
const PHASE_ACTIONS = {
    requirements_analysis: "Definir requerimientos, historias de usuario y criterios de aceptacion",
    database_design: "Disenar estructura de datos, esquemas y estrategia de persistencia",
    visual_assets: "Generar assets visuales, logo, imagenes y branding",
    ui_generation: "Generar componentes UI, layouts y paginas del frontend",
    code_generation: "Implementar logica de negocio, API y funcionalidad core",
    testing_qa: "Generar y ejecutar tests unitarios, de integracion y e2e",
    devops_deploy: "Configurar CI/CD, containerizar y deployar a produccion",
    documentation: "Generar documentacion tecnica, API docs y diagramas"
};
function generateWorkflow(recommendations) {
    return recommendations.map((rec, index)=>({
            order: index + 1,
            phase_name: rec.capability_name,
            tool_name: rec.recommended_tool.tool.name,
            action: PHASE_ACTIONS[rec.capability_id] || `Ejecutar ${rec.capability_name}`,
            depends_on: index > 0 ? [
                index
            ] : []
        }));
}
async function runAdvisor(prompt, developer_level = "mid", budget = "medium") {
    const registry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCapabilities"])();
    // 1. Decompose
    const project = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$decomposer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decomposeProject"])(prompt, developer_level, budget);
    // 2. Map
    const mappedCapabilities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$mapper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapCapabilities"])(project, registry);
    // 3. Select
    const recommendations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$selector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["selectStack"])(mappedCapabilities, project);
    // 4. Build result
    const workflow = generateWorkflow(recommendations);
    const result = {
        project_summary: {
            type: project.project_type,
            complexity: project.complexity,
            developer_level: project.developer_level,
            modules_detected: project.modules.length
        },
        recommendations,
        workflow,
        workflow_diagram: "",
        metadata: {
            registry_version: "1.0.0",
            generated_at: new Date().toISOString(),
            data_freshness: "2026-03-01"
        }
    };
    return {
        project,
        result
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/app/api/advise/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/engine.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/lib/registry.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { prompt, developer_level, budget } = body;
        if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "El campo 'prompt' es requerido"
            }, {
                status: 400
            });
        }
        const level = developer_level || "mid";
        const bud = budget || "medium";
        const { project, result } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runAdvisor"])(prompt, level, bud);
        // Enrich with evidence and academic papers
        const enrichedRecommendations = result.recommendations.map((rec)=>({
                ...rec,
                evidence: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findEvidence"])(rec.recommended_tool.tool.id, rec.capability_id).slice(0, 2),
                papers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$lib$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findAcademicPapers"])(rec.capability_id).slice(0, 3)
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            project: {
                raw_prompt: project.raw_prompt,
                project_type: project.project_type,
                modules: project.modules,
                complexity: project.complexity,
                developer_level: project.developer_level,
                budget: project.budget,
                constraints: project.constraints
            },
            result: {
                ...result,
                recommendations: enrichedRecommendations
            }
        });
    } catch (error) {
        console.error("[AI Stack Advisor] Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Error procesando la solicitud"
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__04d88239._.js.map