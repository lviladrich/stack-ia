// ============================================================
// AI Stack Advisor - Type Definitions
// ============================================================

/** User input after decomposition */
export interface ProjectInput {
  raw_prompt: string;
  project_type: ProjectType;
  modules: ProjectModule[];
  complexity: "low" | "medium" | "high";
  developer_level: "junior" | "mid" | "senior";
  budget: "free" | "low" | "medium" | "unlimited";
  constraints: string[];
}

export type ProjectType =
  | "web_app"
  | "mobile_app"
  | "saas"
  | "api"
  | "cli_tool"
  | "landing_page"
  | "e_commerce"
  | "dashboard"
  | "portfolio"
  | "internal_tool"
  | "data_pipeline"
  | "other";

export interface ProjectModule {
  name: string;
  description: string;
  capabilities_needed: CapabilityId[];
  tags: string[];
}

export type CapabilityId =
  | "code_generation"
  | "ui_generation"
  | "requirements_analysis"
  | "database_design"
  | "testing_qa"
  | "visual_assets"
  | "devops_deploy"
  | "documentation";

/** A single tool from the registry */
export interface RegistryTool {
  id: string;
  name: string;
  type: string;
  strengths: string[];
  weaknesses: string[];
  best_for: string[];
  scores: Record<string, number>;
  pricing_model: string;
  access: string;
  updated: string;
}

/** A capability category from the registry */
export interface RegistryCapability {
  id: CapabilityId;
  name: string;
  description: string;
  sdlc_phase: string;
  benchmark_sources: string[];
  tools: RegistryTool[];
}

/** The full registry structure */
export interface Registry {
  capabilities: RegistryCapability[];
  selection_algorithm: {
    factors: SelectionFactor[];
  };
  scoring_methodology: {
    expert_score: {
      freshness_decay: {
        decay_start_days: number;
        min_score_multiplier: number;
      };
    };
  };
}

export interface SelectionFactor {
  name: string;
  weight: number;
}

// --- Enhanced Justification Types ---

export interface BenchmarkComparison {
  benchmark_name: string;
  winner_value: string;
  runner_up_value: string;
}

export interface HeadToHead {
  winner: { tool_name: string; tool_id: string };
  runner_up: { tool_name: string; tool_id: string };
  benchmarks: BenchmarkComparison[];
  winner_advantages: string[];
  runner_up_advantages: string[];
  verdict: string;
}

export interface CostEstimate {
  pricing_model: string;
  estimated_monthly: string;
  explanation: string;
}

export interface EnhancedJustification {
  summary: string;
  head_to_head: HeadToHead | null;
  cost_estimate: CostEstimate;
  benchmark_citations: string[];
  trade_offs: string[];
  fit_explanation: string;
}

// --- Pre-built Prompt Types ---

export interface PrebuiltPrompt {
  tool_id: string;
  tool_name: string;
  capability_id: CapabilityId;
  instruction: string;
  prompt_text: string;
  expected_output: string;
  generated_by: "ai" | "template";
}

// --- Architecture Diagram Types ---

export interface ArchNode {
  id: string;
  tool_name: string;
  capability_id: CapabilityId;
  capability_name: string;
  phase: number;
  category: "planning" | "design" | "implementation" | "testing" | "deployment" | "documentation";
}

export interface ArchEdge {
  from: string;
  to: string;
  label: string;
  type: "data_flow" | "feedback";
}

export interface ArchitectureDiagram {
  nodes: ArchNode[];
  edges: ArchEdge[];
}

// --- Core Scoring Types ---

/** Scored tool after selection algorithm runs */
export interface ScoredTool {
  tool: RegistryTool;
  capability_id: CapabilityId;
  capability_name: string;
  final_score: number;
  score_breakdown: {
    quality: number;
    task_fit: number;
    dev_level: number;
    cost: number;
    compatibility: number;
  };
  justification: string;
  enhanced_justification?: EnhancedJustification;
}

/** The final recommendation for one capability */
export interface ToolRecommendation {
  phase: number;
  capability_id: CapabilityId;
  capability_name: string;
  recommended_tool: ScoredTool;
  alternatives: ScoredTool[];
  reasoning: string;
  prebuilt_prompt?: PrebuiltPrompt;
}

/** The complete output of the advisor */
export interface StackRecommendation {
  project_summary: {
    type: ProjectType;
    complexity: string;
    developer_level: string;
    modules_detected: number;
  };
  recommendations: ToolRecommendation[];
  workflow: WorkflowStep[];
  workflow_diagram: string;
  metadata: {
    registry_version: string;
    generated_at: string;
    data_freshness: string;
  };
}

export interface WorkflowStep {
  order: number;
  phase_name: string;
  tool_name: string;
  action: string;
  depends_on: number[];
}
