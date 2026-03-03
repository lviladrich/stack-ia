// ============================================================
// Registry Loader — Static imports for Next.js (no readFileSync)
// ============================================================

import capabilitiesData from "@/registry/capabilities.json";
import evidenceData from "@/registry/evidence.json";
import academicData from "@/registry/academic.json";
import type { CapabilityId } from "@/src/types";

// --- Types for evidence/academic ---

export interface EvidenceItem {
  id: string;
  title: string;
  url: string;
  type: string;
  covers: string;
  key_data: string;
  relevant_for: string[];
}

export interface EvidenceRegistry {
  companies: Record<string, {
    name: string;
    tools: string[];
    evidence: EvidenceItem[];
  }>;
}

export interface AcademicPaper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  type: string;
  url: string;
  key_finding: string;
  relevant_for: string[];
  implication: string;
}

export interface AcademicRegistry {
  categories: Record<string, {
    name: string;
    papers: AcademicPaper[];
  }>;
}

// --- Loaders ---

export function getCapabilities() {
  return capabilitiesData as any;
}

export function getEvidence(): EvidenceRegistry {
  return evidenceData as any;
}

export function getAcademic(): AcademicRegistry {
  return academicData as any;
}

// --- Lookup helpers ---

export function findEvidence(toolId: string, capabilityId: string): EvidenceItem[] {
  const evidence = getEvidence();
  const results: EvidenceItem[] = [];

  for (const company of Object.values(evidence.companies)) {
    if (!company.tools.includes(toolId)) continue;
    for (const item of company.evidence) {
      if (item.relevant_for.includes(capabilityId)) {
        results.push(item);
      }
    }
  }

  return results;
}

export function findAcademicPapers(capabilityId: string): AcademicPaper[] {
  const academic = getAcademic();
  const results: AcademicPaper[] = [];

  for (const category of Object.values(academic.categories)) {
    for (const paper of category.papers) {
      if (paper.relevant_for.includes(capabilityId)) {
        results.push(paper);
      }
    }
  }

  return results;
}
