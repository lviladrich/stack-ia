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
      {/* Project summary — minimal */}
      <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
        <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-full font-medium text-[12px]">
          {project.project_type}
        </span>
        <span>{project.complexity}</span>
        <span>·</span>
        <span>{project.modules.length} modulos</span>
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
