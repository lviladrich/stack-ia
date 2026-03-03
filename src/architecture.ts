// ============================================================
// AI Stack Advisor - Architecture Diagram Generator
// ============================================================
// Generates nodes and edges showing how tools connect
// in the recommended stack.
// ============================================================

import type {
  ToolRecommendation,
  WorkflowStep,
  CapabilityId,
  ArchNode,
  ArchEdge,
  ArchitectureDiagram,
} from "./types";

// --- Capability Flow Map ---

const CAPABILITY_FLOWS: Partial<Record<CapabilityId, { targets: CapabilityId[]; label: string; type: "data_flow" | "feedback" }[]>> = {
  requirements_analysis: [
    { targets: ["code_generation", "ui_generation", "database_design"], label: "Specs", type: "data_flow" },
  ],
  database_design: [
    { targets: ["code_generation"], label: "Schemas", type: "data_flow" },
  ],
  visual_assets: [
    { targets: ["ui_generation"], label: "Assets", type: "data_flow" },
  ],
  ui_generation: [
    { targets: ["code_generation"], label: "Componentes", type: "data_flow" },
  ],
  code_generation: [
    { targets: ["testing_qa"], label: "Codigo", type: "data_flow" },
    { targets: ["devops_deploy"], label: "Artifacts", type: "data_flow" },
  ],
  testing_qa: [
    { targets: ["code_generation"], label: "Bug reports", type: "feedback" },
    { targets: ["devops_deploy"], label: "Tests OK", type: "data_flow" },
  ],
  devops_deploy: [
    { targets: ["documentation"], label: "URLs/Configs", type: "data_flow" },
  ],
  documentation: [],
};

// --- Category Mapping ---

const CATEGORY_MAP: Record<CapabilityId, ArchNode["category"]> = {
  requirements_analysis: "planning",
  database_design: "design",
  visual_assets: "design",
  ui_generation: "implementation",
  code_generation: "implementation",
  testing_qa: "testing",
  devops_deploy: "deployment",
  documentation: "documentation",
};

// --- Generator ---

export function generateArchitectureDiagram(
  recommendations: ToolRecommendation[],
  _workflow: WorkflowStep[]
): ArchitectureDiagram {
  // Build nodes from recommendations
  const nodes: ArchNode[] = recommendations.map((rec) => ({
    id: rec.recommended_tool.tool.id,
    tool_name: rec.recommended_tool.tool.name,
    capability_id: rec.capability_id,
    capability_name: rec.capability_name,
    phase: rec.phase,
    category: CATEGORY_MAP[rec.capability_id] || "implementation",
  }));

  // Build capability-to-node lookup
  const capabilityNodeMap = new Map<CapabilityId, ArchNode>();
  for (const node of nodes) {
    capabilityNodeMap.set(node.capability_id, node);
  }

  // Generate edges based on capability flows
  const edges: ArchEdge[] = [];
  const edgeSet = new Set<string>(); // Avoid duplicates

  for (const node of nodes) {
    const flows = CAPABILITY_FLOWS[node.capability_id];
    if (!flows) continue;

    for (const flow of flows) {
      for (const targetCap of flow.targets) {
        const targetNode = capabilityNodeMap.get(targetCap);
        if (!targetNode) continue;

        const edgeKey = `${node.id}->${targetNode.id}:${flow.label}`;
        if (edgeSet.has(edgeKey)) continue;
        edgeSet.add(edgeKey);

        edges.push({
          from: node.id,
          to: targetNode.id,
          label: flow.label,
          type: flow.type,
        });
      }
    }
  }

  return { nodes, edges };
}
