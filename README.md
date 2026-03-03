# AI Stack Advisor

Describe tu proyecto y obtene el stack de IA perfecto. Respaldado por benchmarks reales, papers academicos y datos de produccion.

**[Probar la app](https://stack-ia-test.vercel.app/)**

## Que hace

Analizas tu proyecto escribiendo una descripcion (ej: "SaaS de inventario con dashboard y pagos") y la app te recomienda:

- **Herramientas de IA** para cada fase del desarrollo (planning, coding, testing, deploy, docs)
- **Justificaciones** basadas en papers academicos y benchmarks reales
- **Prompts listos** para copiar y pegar en cada herramienta

## Herramientas que evalua

Claude Code, Cursor, GitHub Copilot, ChatGPT, Gemini, v0, Bolt, Lovable, Midjourney, DALL-E, Eraser.io, Vercel y mas.

## Datos que usa

- **27+ papers academicos** de NeurIPS, ICML, ICLR, IEEE S&P, ACM CCS
- **5 benchmarks**: SWE-bench, Aider Polyglot, Arena Elo, BigCodeBench, Expert Score
- **20+ herramientas** evaluadas con datos reales

## Tech stack

- **Frontend**: Next.js + React + Tailwind CSS
- **Backend**: API Routes (Next.js)
- **IA**: Claude API (Anthropic)
- **Deploy**: Vercel

## Desarrollo local

```bash
# Clonar el repo
git clone https://github.com/lviladrich/stack-ia.git
cd stack-ia

# Instalar dependencias
npm install

# Configurar API key
echo "ANTHROPIC_API_KEY=tu-key-aqui" > .env.local

# Correr en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Autora

Lucia Viladrich
