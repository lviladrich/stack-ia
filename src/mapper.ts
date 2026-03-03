// ============================================================
// AI Stack Advisor - Capability Mapper
// ============================================================
// Takes decomposed project modules and maps them to unique
// capability categories from the registry. Deduplicates and
// orders them by SDLC phase.
// ============================================================

import type { ProjectInput, CapabilityId, RegistryCapability, Registry } from "./types";

/** SDLC phase ordering for workflow sequencing */
const PHASE_ORDER: Record<string, number> = {
  planning: 1,
  design: 2,
  design_visual: 3,
  implementation_frontend: 4,
  implementation: 5,
  testing: 6,
  deployment: 7,
  documentation: 8,
};

export interface MappedCapability {
  capability_id: CapabilityId;
  capability: RegistryCapability;
  source_modules: string[];
  all_tags: string[];
  phase_order: number;
}

/**
 * Maps project modules to registry capabilities, deduplicates,
 * and returns them ordered by SDLC phase.
 */
export function mapCapabilities(
  project: ProjectInput,
  registry: Registry
): MappedCapability[] {
  const capabilityMap = new Map<CapabilityId, MappedCapability>();

  // Build a lookup for registry capabilities by id
  const registryLookup = new Map<CapabilityId, RegistryCapability>();
  for (const cap of registry.capabilities) {
    registryLookup.set(cap.id, cap);
  }

  // Iterate modules and collect capabilities
  for (const mod of project.modules) {
    for (const capId of mod.capabilities_needed) {
      const registryCap = registryLookup.get(capId);
      if (!registryCap) continue;

      if (capabilityMap.has(capId)) {
        // Merge: add module as source, merge tags
        const existing = capabilityMap.get(capId)!;
        existing.source_modules.push(mod.name);
        existing.all_tags.push(...mod.tags);
      } else {
        capabilityMap.set(capId, {
          capability_id: capId,
          capability: registryCap,
          source_modules: [mod.name],
          all_tags: [...mod.tags],
          phase_order: PHASE_ORDER[registryCap.sdlc_phase] ?? 99,
        });
      }
    }
  }

  // Deduplicate tags
  for (const mapped of capabilityMap.values()) {
    mapped.all_tags = [...new Set(mapped.all_tags)];
  }

  // Sort by SDLC phase order
  return Array.from(capabilityMap.values()).sort(
    (a, b) => a.phase_order - b.phase_order
  );
}
