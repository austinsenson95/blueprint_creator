// ============================================================
// DISCOVERY ENGINE — Mock Data Service
// ============================================================

import type {
  User,
  Blueprint,
  NicheOption,
  Persona,
  ProgramName,
  PricingStrategy,
  RoadmapPhase,
  ActivityItem,
  ProgramModule,
} from '@/types';

// ============================================================
// User Data
// ============================================================

export const mockUser: User = {
  id: 'usr_001',
  name: 'Sarah',
  email: 'sarah@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  credits: 100,
  language: 'en',
  createdAt: '2025-01-15T08:00:00Z',
};

// ============================================================
// Blueprint Data
// ============================================================

export const mockBlueprint: Blueprint = {
  id: 'bp_001',
  userId: 'usr_001',
  status: 'in_progress',
  currentStep: 1,
  progress: 25,
  niche: null,
  audience: null,
  program: null,
  roadmap: null,
};

// ============================================================
// Niche Discovery Dummy Data
// ============================================================

export const mockNicheOptions: NicheOption[] = [
  {
    id: 'niche_001',
    name: 'Clarity & Confidence Coach for Mid-Career Professionals',
    whoYouHelp: 'Corporate professionals with 8-15 years of experience who feel stuck in their careers',
    problemSolved: 'Feeling stuck, unfulfilled, and uncertain about next career moves',
    resultDelivered: 'Complete clarity on career direction with an actionable roadmap to transition into purposeful work',
    revenuePotential: '₹12L - ₹25L/year',
    marketDemand: 8.5,
    fitExplanation: 'High demand as more experienced professionals seek purpose-driven careers post-pandemic. Low competition in the structured clarity-coaching space.',
    competitionLevel: 'Medium',
    keywords: ['career clarity', 'mid-career transition', 'confidence coaching', 'leadership coaching'],
    isSelected: false,
  },
  {
    id: 'niche_002',
    name: 'Wellness Coach for Busy Entrepreneurs',
    whoYouHelp: 'Founders and entrepreneurs running early to growth-stage startups',
    problemSolved: 'Burnout, neglecting physical and mental health while building a business',
    resultDelivered: 'Sustainable high-performance routines that boost energy, focus, and longevity without sacrificing business growth',
    revenuePotential: '₹15L - ₹30L/year',
    marketDemand: 9.0,
    fitExplanation: 'Exploding demand as entrepreneur wellness becomes a priority. High willingness to pay from founders who understand ROI on health.',
    competitionLevel: 'Low',
    keywords: ['entrepreneur wellness', 'founder health', 'performance coaching', 'burnout prevention'],
    isSelected: false,
  },
  {
    id: 'niche_003',
    name: 'Parenting Coach for Working Parents',
    whoYouHelp: 'Dual-income families with children aged 2-10 juggling career and parenting',
    problemSolved: 'Parental guilt, work-life imbalance, and lack of quality time with children',
    resultDelivered: 'Harmonious family life with practical systems for quality parenting without career sacrifice',
    revenuePotential: '₹10L - ₹20L/year',
    marketDemand: 7.5,
    fitExplanation: 'Growing market as dual-income households become the norm. Emotional purchase drivers lead to high engagement and retention.',
    competitionLevel: 'High',
    keywords: ['working parent coaching', 'family coaching', 'work-life balance', 'conscious parenting'],
    isSelected: false,
  },
];

// ============================================================
// Audience Persona Dummy Data
// ============================================================

export const mockPersona: Persona = {
  id: 'persona_001',
  name: 'Kartik',
  ageRange: '35-45',
  role: 'Senior Manager at Tech Company',
  location: 'Bangalore',
  currentSituation:
    '10+ years in corporate, earning a high salary but feeling unfulfilled. Has built deep expertise in his domain but feels a calling to help others. Wants to transition to coaching but lacks clarity on niche, audience, and business model.',
  biggestDesire: 'Build a coaching business on the side and quit his job within 18 months',
  onlinePlatforms: ['LinkedIn', 'YouTube', 'WhatsApp Groups'],
  payingCapacity: '₹15,000 - ₹50,000',
  painPoints: [
    'Does not know where to start or how to pick a niche',
    'Worried about leaving a stable income for an uncertain coaching business',
    'Struggles with imposter syndrome despite 10+ years of experience',
    'Has no structured program or curriculum to offer clients',
    'Does not understand how to price his coaching services',
  ],
  goals: [
    'Build a coaching side hustle generating ₹2L+/month',
    'Create a signature program that delivers consistent results',
    'Grow an audience of 10,000+ on LinkedIn',
    'Quit corporate job and go full-time coaching within 18 months',
  ],
  quote: 'I have the experience. I just need the roadmap.',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kartik',
};

// ============================================================
// Program Builder Dummy Data
// ============================================================

export const mockProgramNames: ProgramName[] = [
  {
    id: 'prog_001',
    name: 'The Career Clarity Accelerator',
    description: 'A 12-week transformation program for mid-career professionals seeking purpose-driven work',
    isAiRecommended: true,
  },
  {
    id: 'prog_002',
    name: 'Clarity Catalyst Blueprint',
    description: 'Your step-by-step system to go from career confusion to confident action in 90 days',
    isAiRecommended: false,
  },
  {
    id: 'prog_003',
    name: 'Purpose Pivot Pro',
    description: 'The complete framework for professionals ready to redesign their career with intention',
    isAiRecommended: false,
  },
];

export const mockModules: ProgramModule[] = [
  { id: 1, title: 'Foundation: Identifying Your Core Strengths', description: 'Discover your unique genius zone and how it maps to market opportunities', lessons: 5 },
  { id: 2, title: 'Clarity Mapping: Defining Your Ideal Path', description: 'Create a crystal-clear vision for your next career chapter', lessons: 4 },
  { id: 3, title: 'Confidence Architecture', description: 'Build unshakeable confidence and conquer imposter syndrome', lessons: 6 },
  { id: 4, title: 'Strategic Transition Planning', description: 'Map your transition timeline with financial safety nets', lessons: 5 },
  { id: 5, title: 'Networking & Opportunity Generation', description: 'Build relationships that open doors to your ideal roles', lessons: 4 },
  { id: 6, title: 'Execution & Accountability', description: 'Create momentum with weekly action plans and accountability systems', lessons: 5 },
];

export const mockPricing: PricingStrategy = {
  startingPrice: 4999,
  priceJustification: 'Based on market analysis of similar coaching programs in India and the high ROI your clients will achieve through career transitions.',
  marketInsight: 'Mid-career professionals in India are willing to invest 1-2 months salary for a program that delivers clarity and actionable results.',
  milestones: [
    { students: 10, revenue: '₹50,000', label: 'First Validation', icon: 'trophy' },
    { students: 50, revenue: '₹2.5 Lakhs', label: 'Growing Steady', icon: 'trending' },
    { students: 100, revenue: '₹5 Lakhs+', label: 'Full-Time Income', icon: 'crown' },
  ],
  priceEvolution: 'Start at ₹4,999 (founding member pricing) → Increase to ₹9,999 after 20 students → Premium tier at ₹19,999 with 1:1 coaching add-on',
  sweetSpotRange: '₹14,999 - ₹19,999',
  tiers: [
    {
      name: 'Starter',
      price: 4999,
      description: 'Self-paced program with community access',
      features: [
        '6 core training modules',
        'Downloadable worksheets & templates',
        'Private community access',
        'Monthly group Q&A call',
      ],
    },
    {
      name: 'Professional',
      price: 14999,
      description: 'Guided experience with group coaching',
      features: [
        'Everything in Starter',
        'Weekly live group coaching calls',
        'Peer accountability pods',
        'Direct messaging support',
        'Bonus: LinkedIn profile optimization',
      ],
    },
    {
      name: 'Elite',
      price: 34999,
      description: 'Premium 1:1 coaching for accelerated results',
      features: [
        'Everything in Professional',
        '4 private 1:1 coaching sessions',
        'Personalized roadmap & feedback',
        'Voxer voice message support',
        'Lifetime community access',
        'Bonus: Personal brand strategy session',
      ],
    },
  ],
};

// ============================================================
// Roadmap Dummy Data
// ============================================================

export const mockRoadmap: RoadmapPhase[] = [
  {
    phase: 1,
    weeks: 'Weeks 1-3',
    title: 'Foundation',
    items: [
      {
        week: 1,
        title: 'Define Your Niche & Value Proposition',
        description: 'Get crystal clear on who you serve, what problem you solve, and what makes you unique.',
        deliverables: ['Niche clarity statement', 'Value proposition canvas', 'Competitor analysis'],
        isCompleted: false,
      },
      {
        week: 2,
        title: 'Validate Your Audience & Messaging',
        description: 'Research your ideal client and craft messaging that resonates deeply.',
        deliverables: ['Ideal client avatar', 'Messaging framework', 'Content pillar strategy'],
        isCompleted: false,
      },
      {
        week: 3,
        title: 'Set Up Your Digital Presence',
        description: 'Create the essential online assets for your coaching business.',
        deliverables: ['LinkedIn optimization', 'Simple landing page', 'Email capture setup'],
        isCompleted: false,
      },
    ],
  },
  {
    phase: 2,
    weeks: 'Weeks 4-6',
    title: 'Build',
    items: [
      {
        week: 4,
        title: 'Design Your Signature Program',
        description: 'Structure your coaching methodology into a results-driven program framework.',
        deliverables: ['Program outline (6 modules)', 'Delivery methodology', 'Client transformation map'],
        isCompleted: false,
      },
      {
        week: 5,
        title: 'Create Your Pricing Strategy',
        description: 'Set pricing tiers that reflect your value and maximize revenue potential.',
        deliverables: ['3-tier pricing model', 'Payment collection setup', 'Offer stack document'],
        isCompleted: false,
      },
      {
        week: 6,
        title: 'Build Your Content Engine',
        description: 'Create a sustainable system for attracting and nurturing leads.',
        deliverables: ['30-day content calendar', 'Lead magnet creation', 'Email welcome sequence'],
        isCompleted: false,
      },
    ],
  },
  {
    phase: 3,
    weeks: 'Weeks 7-9',
    title: 'Launch',
    items: [
      {
        week: 7,
        title: 'Pre-Launch: Build Anticipation',
        description: 'Create buzz and enroll founding members at special pricing.',
        deliverables: ['Pre-launch content series', 'Founding member offer', 'Waitlist landing page'],
        isCompleted: false,
      },
      {
        week: 8,
        title: 'Open Cart & Convert Sales',
        description: 'Execute a structured launch sequence to convert interest into paying clients.',
        deliverables: ['Sales page live', 'Email launch sequence', 'Social proof collection'],
        isCompleted: false,
      },
      {
        week: 9,
        title: 'Deliver & Refine',
        description: 'Run your first cohort and gather testimonials for social proof.',
        deliverables: ['First cohort delivery', 'Testimonial collection', 'Program iteration notes'],
        isCompleted: false,
      },
    ],
  },
  {
    phase: 4,
    weeks: 'Weeks 10-12',
    title: 'Scale',
    items: [
      {
        week: 10,
        title: 'Automate & Systematize',
        description: 'Build systems that free your time and create predictable growth.',
        deliverables: ['Automation workflows', 'Client onboarding system', 'Referral program setup'],
        isCompleted: false,
      },
      {
        week: 11,
        title: 'Scale Your Marketing',
        description: 'Double down on what works and expand your reach.',
        deliverables: ['Paid ads testing', 'Partnership outreach', 'Affiliate program setup'],
        isCompleted: false,
      },
      {
        week: 12,
        title: 'Optimize & Plan Ahead',
        description: 'Review your progress, celebrate wins, and plan your next growth phase.',
        deliverables: ['12-week review report', 'Q2 growth plan', 'Team/VA hiring plan'],
        isCompleted: false,
      },
    ],
  },
];

// ============================================================
// Credit System
// ============================================================

export const CREDIT_DEDUCTIONS = {
  niche: 10,
  audience: 10,
  program: 5,
  pricing: 5,
  roadmap: 15,
} as const;

export const STARTING_CREDITS = 100;

// ============================================================
// Activity Feed Dummy Data
// ============================================================

export const mockActivities: ActivityItem[] = [
  {
    id: 'act_001',
    type: 'success',
    text: "Completed Program Builder for 'Mindful Momentum'",
    timestamp: 'Today, 10:30 AM',
  },
  {
    id: 'act_002',
    type: 'generation',
    text: 'Generated 3 program name suggestions',
    timestamp: 'Today, 10:15 AM',
  },
  {
    id: 'act_003',
    type: 'generation',
    text: "Created audience persona 'Kartik'",
    timestamp: 'Yesterday, 4:45 PM',
  },
  {
    id: 'act_004',
    type: 'success',
    text: "Downloaded PDF blueprint for 'Clarity Catalyst'",
    timestamp: 'Yesterday, 2:00 PM',
  },
  {
    id: 'act_005',
    type: 'view',
    text: 'Started Niche Discovery wizard',
    timestamp: 'Mar 15, 2025',
  },
];

// ============================================================
// Stats Data
// ============================================================

export const mockStats = {
  nichesDiscovered: 4,
  personasMapped: 2,
  blueprintsCreated: 2,
  pdfsExported: 1,
};

// ============================================================
// Wizard Steps Config
// ============================================================

export const wizardSteps = [
  { step: 1, title: 'Niche Discovery', description: 'Find your profitable niche', icon: 'Lightbulb' },
  { step: 2, title: 'Audience Mapping', description: 'Define your ideal client', icon: 'Users' },
  { step: 3, title: 'Program Builder', description: 'Design your offer', icon: 'FileText' },
  { step: 4, title: 'Roadmap', description: 'Your 12-week plan', icon: 'Map' },
] as const;
