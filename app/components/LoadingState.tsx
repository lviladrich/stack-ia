export default function LoadingState() {
  return (
    <div className="space-y-4 animate-fade-up">
      {/* Spinner */}
      <div className="flex justify-center py-8">
        <div className="relative">
          <div className="w-10 h-10 rounded-full border-2 border-[var(--border)]" />
          <div className="absolute inset-0 w-10 h-10 rounded-full border-2 border-transparent border-t-[var(--accent)] animate-spin" />
        </div>
      </div>

      <div className="text-center text-sm text-[var(--text-muted)]">
        Analizando tu proyecto...
      </div>

      {/* Skeleton cards */}
      <div className="space-y-2 opacity-40">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass rounded-2xl p-4 animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/[0.04]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 bg-white/[0.04] rounded" />
                <div className="h-2 w-48 bg-white/[0.03] rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
