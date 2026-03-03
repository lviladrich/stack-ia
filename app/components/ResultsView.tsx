import StackTable from "./StackTable";
import ArchitectureDiagram from "./ArchitectureDiagram";
import Justification from "./Justification";
import PrebuiltPrompts from "./PrebuiltPrompts";
import SecurityWarnings from "./SecurityWarnings";

interface ResultsViewProps {
  data: {
    project: {
      project_type: string;
      complexity: string;
      modules: any[];
    };
    result: {
      recommendations: any[];
      workflow: any[];
      security_warnings?: string[];
    };
    architecture_diagram?: {
      nodes: any[];
      edges: any[];
    };
  };
}

export default function ResultsView({ data }: ResultsViewProps) {
  const { project, result } = data;

  return (
    <div className="space-y-10">
      {/* Project summary */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-bold">Tu Proyecto</h2>
          <span className="px-2 py-0.5 bg-[var(--accent)]/20 text-[var(--accent-hover)] text-xs rounded-full font-medium">
            {project.project_type}
          </span>
          <span className="px-2 py-0.5 bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs rounded-full">
            {project.complexity}
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            {project.modules.length} modulos detectados
          </span>
        </div>
      </div>

      {/* Stack table */}
      <StackTable recommendations={result.recommendations} />

      {/* Architecture diagram */}
      <ArchitectureDiagram diagram={data.architecture_diagram} />

      {/* Justification */}
      <Justification recommendations={result.recommendations} />

      {/* Pre-built prompts */}
      <PrebuiltPrompts recommendations={result.recommendations} />

      {/* Security */}
      <SecurityWarnings />
    </div>
  );
}
