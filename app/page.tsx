"use client";

import { useState, useEffect } from "react";
import AdvisorForm from "./components/AdvisorForm";
import ResultsView from "./components/ResultsView";
import LoadingState from "./components/LoadingState";

const EXAMPLE_PROMPTS = [
  "SaaS de inventario con dashboard y pagos",
  "App mobile de delivery con tracking",
  "Landing page con blog y reservas",
  "API REST para marketplace",
];

const STATS = [
  { value: "27+", label: "Papers academicos" },
  { value: "20+", label: "Herramientas IA" },
  { value: "5", label: "Benchmarks reales" },
  { value: "<1s", label: "Tiempo de analisis" },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Benchmarks reales",
    desc: "SWE-bench, Aider, Arena Elo. No opiniones, datos.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Papers peer-reviewed",
    desc: "NeurIPS, ICML, ICLR, IEEE S&P. Ciencia, no marketing.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Prompts listos",
    desc: "Copia y pega. Un prompt por herramienta, especifico a tu proyecto.",
  },
];

const TOOLS_MARQUEE = [
  "Claude Code", "Cursor", "v0", "GitHub Copilot", "ChatGPT", "Gemini",
  "Bolt", "Lovable", "Midjourney", "DALL-E", "Eraser.io", "Vercel",
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedExample, setSelectedExample] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (data: { prompt: string; developer_level: string; budget: string }) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/advise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Error del servidor" }));
        throw new Error(err.error || `Error ${res.status}`);
      }

      const json = await res.json();
      setResults(json);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      {!results && !isLoading && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(88, 28, 135, 0.25) 0%, rgba(59, 7, 100, 0.1) 40%, transparent 75%)' }} />
      )}

      {/* ===== HERO STATE ===== */}
      {!results && !isLoading && mounted && (
        <div className="relative">
          {/* Title + subtitle */}
          <div className="max-w-4xl mx-auto px-6 pt-24 pb-6 text-center">
            <div className="animate-fade-up">
              <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter leading-[0.95]">
                <span className="gradient-text">AI Stack</span>
              </h1>

              <p className="text-[var(--text-secondary)] text-xl sm:text-2xl mt-5 font-light max-w-xl mx-auto leading-relaxed">
                Describe tu proyecto.<br />
                <span className="text-[var(--text-primary)]">Obtene el stack de IA perfecto.</span>
              </p>
            </div>
          </div>

          {/* Tools marquee */}
          <div className="overflow-hidden py-6 animate-fade-up delay-1">
            <div className="flex gap-3 animate-marquee whitespace-nowrap">
              {[...TOOLS_MARQUEE, ...TOOLS_MARQUEE].map((tool, i) => (
                <span
                  key={i}
                  className="inline-block px-4 py-1.5 rounded-full text-[12px] text-[var(--text-muted)]/60 border border-[var(--border-subtle)] shrink-0"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Example chips */}
          <div className="max-w-3xl mx-auto px-6 animate-fade-up delay-2">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="text-[11px] text-[var(--text-muted)] self-center mr-1">Prueba con:</span>
              {EXAMPLE_PROMPTS.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedExample(ex)}
                  className={`px-3.5 py-1.5 text-[12px] rounded-full ${
                    selectedExample === ex
                      ? "bg-purple-500/15 text-[var(--text-primary)] border border-purple-500/30"
                      : "border border-white/[0.08] text-[var(--text-secondary)] hover:border-purple-400/40 hover:text-[var(--text-primary)] hover:bg-white/[0.03]"
                  }`}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto px-6 pb-10 animate-fade-up delay-3">
            <AdvisorForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              externalPrompt={selectedExample}
            />
          </div>

          {/* Stats bar */}
          <div className="max-w-3xl mx-auto px-6 pb-12 animate-fade-up delay-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((s, i) => (
                <div key={i} className="text-center py-3">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-purple-300">{s.value}</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature cards */}
          <div className="max-w-3xl mx-auto px-6 pb-16">
            <div className="grid sm:grid-cols-3 gap-3">
              {FEATURES.map((f, i) => (
                <div key={i} className="glass rounded-2xl p-5 pointer-events-none">
                  <div className="text-purple-400 mb-3">
                    {f.icon}
                  </div>
                  <div className="text-[14px] font-semibold text-[var(--text-primary)] mb-1">{f.title}</div>
                  <div className="text-[12px] text-[var(--text-muted)] leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ===== RESULTS STATE ===== */}
      {(results || isLoading) && (
        <>
          <div className="text-center pt-6 pb-2">
            <h1 className="text-xl font-bold">
              <span className="gradient-text">AI Stack</span>
            </h1>
          </div>

          <div className="max-w-2xl mx-auto px-6 pb-6">
            <AdvisorForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              externalPrompt={selectedExample}
            />
          </div>
        </>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-2xl mx-auto px-6 pb-6">
          <div className="glass rounded-2xl p-4 text-sm text-[var(--danger)]">
            {error}
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="max-w-3xl mx-auto px-6 pb-16">
          <LoadingState />
        </div>
      )}

      {/* Results */}
      {results && !isLoading && (
        <div className="max-w-4xl mx-auto px-6 pb-20 animate-fade-up">
          <ResultsView data={results} />
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-8 text-center text-xs text-[var(--text-muted)]">
        AI Stack — SWE-bench, Aider, BigCodeBench, Arena y 27+ papers
      </footer>
    </main>
  );
}
