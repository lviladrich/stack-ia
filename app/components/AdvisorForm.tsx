"use client";

import { useState, useEffect, useCallback, memo } from "react";

interface AdvisorFormProps {
  onSubmit: (data: { prompt: string; developer_level: string; budget: string }) => void;
  isLoading: boolean;
  externalPrompt?: string;
}

export default memo(function AdvisorForm({ onSubmit, isLoading, externalPrompt }: AdvisorFormProps) {
  const [prompt, setPrompt] = useState("");
  const [level, setLevel] = useState("mid");
  const [budget, setBudget] = useState("medium");

  useEffect(() => {
    if (externalPrompt?.trim()) setPrompt(externalPrompt);
  }, [externalPrompt]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit({ prompt, developer_level: level, budget });
  }, [prompt, level, budget, onSubmit]);

  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  }, []);

  const handleLevelChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
  }, []);

  const handleBudgetChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setBudget(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="glass rounded-2xl p-1 glow-purple focus-within:border-purple-500/30">
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Describe tu proyecto... ej: SaaS de inventario con dashboard, pagos y auth"
          rows={5}
          className="w-full px-5 py-5 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)]/40 focus:outline-none resize-none text-[16px] leading-relaxed"
          disabled={isLoading}
        />

        <div className="flex items-center gap-2 px-3 pb-3">
          <select
            value={level}
            onChange={handleLevelChange}
            className="no-transition px-3 py-1.5 bg-white/[0.04] border border-[var(--border)] rounded-lg text-[13px] text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]/40"
            disabled={isLoading}
          >
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>

          <select
            value={budget}
            onChange={handleBudgetChange}
            className="no-transition px-3 py-1.5 bg-white/[0.04] border border-[var(--border)] rounded-lg text-[13px] text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]/40"
            disabled={isLoading}
          >
            <option value="free">Gratis</option>
            <option value="low">Bajo</option>
            <option value="medium">Medio</option>
            <option value="unlimited">Sin limite</option>
          </select>

          <div className="flex-1" />

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-[13px] font-medium rounded-xl"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analizando
              </span>
            ) : "Analizar"}
          </button>
        </div>
      </div>
    </form>
  );
});
