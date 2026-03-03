"use client";

import { useState } from "react";

interface PrebuiltPromptsProps {
  recommendations: any[];
}

const PROMPT_COLOR = { bg: "bg-purple-500/10", text: "text-purple-300", border: "border-purple-500/20", glow: "shadow-[0_0_20px_rgba(168,85,247,0.08)]" };

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3.5 py-1.5 text-[11px] rounded-full font-semibold tracking-wide uppercase transition-all ${
        copied
          ? "bg-[var(--success)]/20 text-[var(--success)]"
          : `${PROMPT_COLOR.bg} ${PROMPT_COLOR.text} hover:brightness-125`
      }`}
    >
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}

export default function PrebuiltPrompts({ recommendations }: PrebuiltPromptsProps) {
  const prompts = recommendations.filter((r) => r.prebuilt_prompt);
  if (prompts.length === 0) return null;

  return (
    <div className="space-y-5 animate-fade-up delay-3">
      <h2 className="text-2xl font-semibold tracking-tight">Prompts listos</h2>

      <div className="space-y-4">
        {prompts.map((rec, i) => {
          const p = rec.prebuilt_prompt;
          return (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden border ${PROMPT_COLOR.border} ${PROMPT_COLOR.glow} bg-white/[0.02] backdrop-blur-sm transition-all hover:brightness-105`}
            >
              {/* Header with color accent */}
              <div className={`flex items-center justify-between px-5 py-3.5 ${PROMPT_COLOR.bg}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${PROMPT_COLOR.text} bg-current`} />
                  <span className={`text-[14px] font-bold ${PROMPT_COLOR.text}`}>{p.tool_name}</span>
                  <span className="text-[11px] text-[var(--text-muted)] bg-white/[0.05] px-2 py-0.5 rounded-full">
                    {rec.capability_name}
                  </span>
                </div>
                <CopyButton text={p.prompt_text} />
              </div>

              {/* Prompt body */}
              <div className="px-5 py-4">
                <pre className="text-[12px] text-[var(--text-secondary)] bg-black/30 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed border border-white/[0.04]">
                  {p.prompt_text}
                </pre>
                <div className={`text-[11px] mt-3 flex items-center gap-2 ${PROMPT_COLOR.text} opacity-70`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  {p.expected_output}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
