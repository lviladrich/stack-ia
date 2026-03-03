const WARNINGS = [
  {
    title: "Alucinaciones en codigo",
    description: "Los LLMs pueden generar codigo que parece correcto pero contiene errores sutiles. Siempre revisar y testear.",
    source: "IEEE TSE 2024",
  },
  {
    title: "Vulnerabilidades de seguridad",
    description: "El codigo generado por IA puede introducir vulnerabilidades (CWE-79, CWE-89). Usar SAST/DAST.",
    source: "IEEE S&P 2023",
  },
  {
    title: "Vendor lock-in",
    description: "Diseñar arquitecturas que permitan cambiar de proveedor. Los benchmarks cambian cada 3-6 meses.",
    source: "arXiv 2024",
  },
];

export default function SecurityWarnings() {
  return (
    <div className="space-y-4 animate-fade-up delay-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 rounded-full bg-fuchsia-400" />
        <h2 className="text-sm font-medium text-[var(--text-muted)]">Consideraciones</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-2">
        {WARNINGS.map((w, i) => (
          <div key={i} className="glass rounded-xl p-4">
            <div className="text-[12px] font-medium text-[var(--text-secondary)] mb-1">{w.title}</div>
            <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">{w.description}</div>
            <div className="text-[9px] text-[var(--text-muted)]/50 mt-2">{w.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
