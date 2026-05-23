// ============================================================
// DISCOVERY ENGINE — Mock API Service Layer
// ============================================================

import type {
  User,
  Blueprint,
  NicheOption,
  Persona,
  ProgramName,
  PricingStrategy,
  RoadmapPhase,
} from '@/types';

import {
  mockUser,
  mockBlueprint,
  mockNicheOptions,
  mockPersona,
  mockProgramNames,
  mockPricing,
  mockRoadmap,
  CREDIT_DEDUCTIONS,
} from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory mutable state for credits
let currentCredits = mockUser.credits;

// ============================================================
// API Functions
// ============================================================

/**
 * Fetch the current user
 */
export async function fetchUser(): Promise<User> {
  console.log('[API] fetchUser called');
  await delay(300);
  console.log('[API] fetchUser resolved');
  return { ...mockUser, credits: currentCredits };
}

/**
 * Fetch the user's blueprint
 */
export async function fetchBlueprint(): Promise<Blueprint> {
  console.log('[API] fetchBlueprint called');
  await delay(300);
  console.log('[API] fetchBlueprint resolved');
  return { ...mockBlueprint };
}

/**
 * Submit niche form and return niche options
 */
export async function submitNicheForm(data: {
  background: string;
  passion: string;
  expertise: string;
}): Promise<NicheOption[]> {
  console.log('[API] submitNicheForm called with:', data);
  await delay(2000);
  console.log('[API] submitNicheForm resolved');
  return mockNicheOptions.map((n) => ({ ...n }));
}

/**
 * Generate audience persona based on niche
 */
export async function generatePersona(nicheId: string): Promise<Persona> {
  console.log('[API] generatePersona called for niche:', nicheId);
  await delay(2000);
  console.log('[API] generatePersona resolved');
  return { ...mockPersona };
}

/**
 * Generate program name suggestions
 */
export async function generateProgramNames(
  nicheId: string,
  personaId: string
): Promise<ProgramName[]> {
  console.log('[API] generateProgramNames called for niche:', nicheId, 'persona:', personaId);
  await delay(1500);
  console.log('[API] generateProgramNames resolved');
  return mockProgramNames.map((p) => ({ ...p }));
}

/**
 * Generate pricing strategy for a program
 */
export async function generatePricing(programId: string): Promise<PricingStrategy> {
  console.log('[API] generatePricing called for program:', programId);
  await delay(1500);
  console.log('[API] generatePricing resolved');
  return { ...mockPricing };
}

/**
 * Generate roadmap for a blueprint
 */
export async function generateRoadmap(
  blueprintId: string
): Promise<{ roadmap: RoadmapPhase[]; pdfUrl: string }> {
  console.log('[API] generateRoadmap called for blueprint:', blueprintId);
  await delay(3000);
  console.log('[API] generateRoadmap resolved');
  return {
    roadmap: mockRoadmap.map((phase) => ({
      ...phase,
      items: phase.items.map((item) => ({ ...item })),
    })),
    pdfUrl: `/api/blueprints/${blueprintId}/pdf`,
  };
}

/**
 * Deduct credits from user balance
 */
export async function deductCredits(
  amount: number
): Promise<{ success: boolean; credits: number }> {
  console.log('[API] deductCredits called, amount:', amount);
  await delay(200);
  if (currentCredits >= amount) {
    currentCredits -= amount;
    console.log(`[API] Credits deducted: ${amount}. New balance: ${currentCredits}`);
    return { success: true, credits: currentCredits };
  }
  console.log('[API] Insufficient credits. Current:', currentCredits, 'Required:', amount);
  return { success: false, credits: currentCredits };
}

/**
 * Get the credit deduction amount for a wizard step
 */
export function getCreditDeductionForStep(step: number): number {
  switch (step) {
    case 1:
      return CREDIT_DEDUCTIONS.niche;
    case 2:
      return CREDIT_DEDUCTIONS.audience;
    case 3:
      return CREDIT_DEDUCTIONS.program;
    case 4:
      return CREDIT_DEDUCTIONS.roadmap;
    default:
      return 0;
  }
}

/**
 * Reset mock state (useful for testing)
 */
export function resetMockState(): void {
  currentCredits = mockUser.credits;
  console.log('[API] Mock state reset');
}
