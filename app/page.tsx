"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import AdvisorForm from "./components/AdvisorForm";
import LoadingState from "./components/LoadingState";

// Lazy load heavy results components
const ResultsView = lazy(() => import("./components/ResultsView"));

const EXAMPLE_PROMPTS = [
  "SaaS de inventario con dashboard y pagos",
  "App mobile de delivery con tracking",
  "Landing page con blog y reservas",
  "API REST para marketplace",
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

  const handleSubmit = useCallback(async (data: { prompt: string; developer_level: string; budget: string }) => {
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
  }, []);

  const showHero = !results && !isLoading;

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      {showHero && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(88, 28, 135, 0.25) 0%, rgba(59, 7, 100, 0.1) 40%, transparent 75%)' }} />
      )}

      {/* ===== HERO STATE ===== */}
      {showHero && (
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
            <div className="flex gap-3 animate-marquee whitespace-nowrap will-change-transform">
              {[...TOOLS_MARQUEE, ...TOOLS_MARQUEE].map((tool, i) => (
                <span
                  key={`${tool}-${i}`}
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
              {EXAMPLE_PROMPTS.map((ex) => (
                <button
                  key={ex}
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

          {/* Bottom spacing */}
          <div className="pb-16" />

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
          <Suspense fallback={<LoadingState />}>
            <ResultsView data={results} />
          </Suspense>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-8 text-center text-xs text-[var(--text-muted)]">
        AI Stack — SWE-bench, Aider, BigCodeBench, Arena y 27+ papers
      </footer>
    </main>
  );
}
