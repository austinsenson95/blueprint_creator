// ============================================================
// DISCOVERY ENGINE — TypeScript Type Definitions
// ============================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  credits: number;
  language: string;
  createdAt: string;
}

export type BlueprintStatus = 'not_started' | 'in_progress' | 'completed';
export type WizardStep = 1 | 2 | 3 | 4;

export interface Blueprint {
  id: string;
  userId: string;
  status: BlueprintStatus;
  currentStep: WizardStep;
  progress: number;
  niche: NicheOption | null;
  audience: Persona | null;
  program: ProgramName | null;
  roadmap: RoadmapPhase[] | null;
}

export interface NicheOption {
  id: string;
  name: string;
  whoYouHelp: string;
  problemSolved: string;
  resultDelivered: string;
  revenuePotential: string;
  marketDemand: number;
  fitExplanation: string;
  competitionLevel: string;
  keywords: string[];
  isSelected: boolean;
}

export interface Persona {
  id: string;
  name: string;
  ageRange: string;
  role: string;
  location: string;
  currentSituation: string;
  biggestDesire: string;
  onlinePlatforms: string[];
  payingCapacity: string;
  painPoints: string[];
  goals: string[];
  quote: string;
  avatar: string;
}

export interface ProgramName {
  id: string;
  name: string;
  description: string;
  isAiRecommended: boolean;
}

export interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface PricingStrategy {
  startingPrice: number;
  priceJustification: string;
  marketInsight: string;
  milestones: RevenueMilestone[];
  priceEvolution: string;
  sweetSpotRange: string;
  tiers: PricingTier[];
}

export interface RevenueMilestone {
  students: number;
  revenue: string;
  label: string;
  icon: string;
}

export interface RoadmapPhase {
  phase: number;
  weeks: string;
  title: string;
  items: RoadmapItem[];
}

export interface RoadmapItem {
  week: number;
  title: string;
  description: string;
  deliverables: string[];
  isCompleted: boolean;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration: number;
}

export interface CreditTransaction {
  id: string;
  amount: number;
  description: string;
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  type: 'success' | 'generation' | 'view';
  text: string;
  timestamp: string;
}

export interface ProgramModule {
  id: number;
  title: string;
  description: string;
  lessons: number;
}

export interface WizardStepConfig {
  step: number;
  title: string;
  description: string;
  icon: string;
}
