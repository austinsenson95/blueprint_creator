// ============================================================
// DISCOVERY ENGINE — Blueprint Wizard (4-Step Process)
// ============================================================

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Edit3,
  CheckCircle2,
  Sparkles,
  Download,
  Trophy,
  TrendingUp,
  Crown,
  Target,
  Rocket,
  Lightbulb,
  Users,
  FileText,
  Map,
  Check,
  Zap,
} from 'lucide-react';
import type {
  User,
  NicheOption,
  Persona,
  ProgramName,
  PricingStrategy,
  RoadmapPhase,
  Toast,
} from '@/types';
import Stepper from '@/components/Stepper';
import NicheCard from '@/components/NicheCard';
import PersonaCard from '@/components/PersonaCard';
import ProgressBar from '@/components/ProgressBar';
import {
  submitNicheForm,
  generatePersona,
  generateProgramNames,
  generatePricing,
  generateRoadmap,
  deductCredits,
  getCreditDeductionForStep,
  fetchUser,
} from '@/lib/api';
import { mockModules } from '@/lib/mockData';
import { Spinner } from '@/components/ui/spinner';

// ------------------------------------------------------------------
// Props
// ------------------------------------------------------------------
interface BlueprintWizardProps {
  user: User | null;
  onUserUpdate: (user: User) => void;
}

// ------------------------------------------------------------------
// Toast helper
// ------------------------------------------------------------------
const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' = 'info'
) => {
  (
    window as unknown as {
      addToast?: (toast: Omit<Toast, 'id'>) => void;
    }
  ).addToast?.({
    message,
    type,
    duration: 4000,
  });
};

// ------------------------------------------------------------------
// Animation variants
// ------------------------------------------------------------------
const stepVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.25 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// ------------------------------------------------------------------
// PDF Generator
// ------------------------------------------------------------------
function generatePDF(data: {
  user: User | null;
  niche: NicheOption | null;
  persona: Persona | null;
  program: ProgramName | null;
  pricing: PricingStrategy | null;
  roadmap: RoadmapPhase[] | null;
}) {
  const { user, niche, persona, program, pricing, roadmap } = data;

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>My Coaching Blueprint — ${user?.name || 'Coach'}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; color: #0A0A0A; line-height: 1.6; background: #fff; }
  .page { width: 210mm; min-height: 297mm; padding: 48px 56px; margin: 0 auto; page-break-after: always; }
  .page:last-child { page-break-after: auto; }
  .cover { background: linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 100%); color: #fff; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
  .cover h1 { font-family: 'DM Serif Display', serif; font-size: 48px; margin-bottom: 16px; }
  .cover p { font-size: 18px; opacity: 0.8; }
  .cover .badge { display: inline-block; background: #F05A28; color: #fff; padding: 8px 20px; border-radius: 999px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 32px; }
  h2 { font-family: 'DM Serif Display', serif; font-size: 28px; color: #0A0A0A; margin-bottom: 20px; border-bottom: 2px solid #F05A28; padding-bottom: 8px; display: inline-block; }
  h3 { font-size: 18px; font-weight: 600; margin: 24px 0 8px; }
  .label { text-transform: uppercase; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #6B7280; margin-bottom: 4px; }
  .value { font-size: 15px; color: #0A0A0A; margin-bottom: 16px; }
  .card { background: #F5F5F5; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .tag { display: inline-block; background: #FFF0EB; color: #F05A28; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 500; margin-right: 6px; margin-bottom: 6px; }
  .phase { border-left: 3px solid #F05A28; padding-left: 16px; margin-bottom: 24px; }
  .phase-title { font-weight: 600; font-size: 16px; margin-bottom: 4px; }
  .phase-meta { font-size: 13px; color: #6B7280; margin-bottom: 12px; }
  .item { margin-bottom: 12px; }
  .item-title { font-weight: 500; font-size: 14px; }
  .item-desc { font-size: 13px; color: #4A4A4A; }
  .footer { text-align: center; padding-top: 32px; border-top: 1px solid #E5E5E5; margin-top: 32px; font-size: 12px; color: #6B7280; }
  @media print { .page { margin: 0; width: 100%; } }
</style>
</head>
<body>
  <div class="page cover">
    <div class="badge">Coaching Business Blueprint</div>
    <h1>My Coaching Blueprint</h1>
    <p>Prepared for <strong>${user?.name || 'Coach'}</strong></p>
    <p style="margin-top:8px; font-size:14px; opacity:0.6;">Generated by DISCOVERY ENGINE</p>
  </div>
  <div class="page">
    <h2>1. Your Niche</h2>
    <div class="card">
      <div class="label">Niche Name</div>
      <div class="value" style="font-size:18px; font-weight:600;">${niche?.name || '—'}</div>
    </div>
    <div class="grid-2">
      <div><div class="label">Who You Help</div><div class="value">${niche?.whoYouHelp || '—'}</div></div>
      <div><div class="label">Problem Solved</div><div class="value">${niche?.problemSolved || '—'}</div></div>
      <div><div class="label">Result Delivered</div><div class="value">${niche?.resultDelivered || '—'}</div></div>
      <div><div class="label">Revenue Potential</div><div class="value">${niche?.revenuePotential || '—'}</div></div>
    </div>
    <div style="margin-top:16px;"><div class="label">Why This Fits</div><div class="value">${niche?.fitExplanation || '—'}</div></div>
    <div style="margin-top:16px;"><div class="label">Keywords</div><div>${niche?.keywords.map((k) => `<span class="tag">${k}</span>`).join('') || '—'}</div></div>
  </div>
  <div class="page">
    <h2>2. Ideal Student Persona</h2>
    <div class="card" style="display:flex; align-items:center; gap:16px;">
      <img src="${persona?.avatar || ''}" style="width:64px; height:64px; border-radius:50%;" />
      <div>
        <div style="font-size:20px; font-weight:600;">${persona?.name || '—'}</div>
        <div style="font-size:14px; color:#6B7280;">${persona?.role || '—'} · ${persona?.location || '—'} · ${persona?.ageRange || '—'}</div>
      </div>
    </div>
    <div class="grid-2">
      <div><div class="label">Current Situation</div><div class="value">${persona?.currentSituation || '—'}</div></div>
      <div><div class="label">Biggest Desire</div><div class="value" style="color:#F05A28; font-weight:500;">${persona?.biggestDesire || '—'}</div></div>
    </div>
    <div style="margin-top:16px;"><div class="label">Paying Capacity</div><div class="value">${persona?.payingCapacity || '—'}</div></div>
    <div style="margin-top:16px;"><div class="label">Online Platforms</div><div>${persona?.onlinePlatforms.map((p) => `<span class="tag">${p}</span>`).join('') || '—'}</div></div>
  </div>
  <div class="page">
    <h2>3. Your Program</h2>
    <div class="card">
      <div class="label">Program Name</div>
      <div class="value" style="font-size:18px; font-weight:600;">${program?.name || '—'}</div>
      <div class="value">${program?.description || '—'}</div>
    </div>
    <h3>Pricing Strategy</h3>
    <div class="grid-2">
      <div class="card"><div class="label">Starting Price</div><div class="value" style="font-size:20px; font-weight:700; color:#059669;">₹${pricing?.startingPrice.toLocaleString('en-IN') || '—'}</div></div>
      <div class="card"><div class="label">Sweet Spot Range</div><div class="value" style="font-size:20px; font-weight:700; color:#F05A28;">${pricing?.sweetSpotRange || '—'}</div></div>
    </div>
    <div style="margin-top:16px;"><div class="label">Price Justification</div><div class="value">${pricing?.priceJustification || '—'}</div></div>
    <div style="margin-top:16px;"><div class="label">Market Insight</div><div class="value">${pricing?.marketInsight || '—'}</div></div>
    <div style="margin-top:16px;"><div class="label">Price Evolution</div><div class="value">${pricing?.priceEvolution || '—'}</div></div>
  </div>
  <div class="page">
    <h2>4. 12-Week Roadmap</h2>
    ${roadmap?.map((phase) => `
      <div class="phase">
        <div class="phase-title">${phase.title}</div>
        <div class="phase-meta">${phase.weeks}</div>
        ${phase.items.map((item) => `
          <div class="item">
            <div class="item-title">Week ${item.week}: ${item.title}</div>
            <div class="item-desc">${item.description}</div>
          </div>
        `).join('')}
      </div>
    `).join('') || '<p>No roadmap data.</p>'}
    <div class="footer">Built with DISCOVERY ENGINE · Build. Launch. Scale.</div>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'My-Coaching-Blueprint.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
export default function BlueprintWizard({ user, onUserUpdate }: BlueprintWizardProps) {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [programSubStep, setProgramSubStep] = useState<'problems' | 'naming' | 'pricing'>('problems');

  const [nicheForm, setNicheForm] = useState({ background: '', experience: '', passion: '' });
  const [nicheOptions, setNicheOptions] = useState<NicheOption[] | null>(null);
  const [selectedNiche, setSelectedNiche] = useState<NicheOption | null>(null);

  const [persona, setPersona] = useState<Persona | null>(null);

  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [programNames, setProgramNames] = useState<ProgramName[] | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<ProgramName | null>(null);
  const [pricing, setPricing] = useState<PricingStrategy | null>(null);

  const [roadmap, setRoadmap] = useState<RoadmapPhase[] | null>(null);
  // PDF URL returned by API (unused locally)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const refreshUser = useCallback(async () => {
    try {
      const updated = await fetchUser();
      onUserUpdate(updated);
    } catch {
      // ignore
    }
  }, [onUserUpdate]);

  // --- Step 1 ---
  const handleSubmitNicheForm = async () => {
    if (!nicheForm.background.trim() || !nicheForm.experience.trim() || !nicheForm.passion.trim()) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    setIsLoading(true);
    setLoadingMessage('AI is analyzing your expertise...');
    try {
      const creditResult = await deductCredits(getCreditDeductionForStep(1));
      if (!creditResult.success) {
        showToast('Insufficient credits', 'error');
        setIsLoading(false);
        return;
      }
      await refreshUser();
      const options = await submitNicheForm({
        background: nicheForm.background,
        passion: nicheForm.passion,
        expertise: nicheForm.experience,
      });
      setNicheOptions(options);
      showToast('Niche recommendations generated!', 'success');
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectNiche = (niche: NicheOption) => {
    setSelectedNiche(niche);
    showToast('Niche selected! Moving to audience mapping...', 'success');
    setTimeout(() => setCurrentStep(2), 500);
  };

  const handleRegenerateNiches = () => {
    setNicheOptions(null);
    setSelectedNiche(null);
  };

  // --- Step 2 ---
  const handleGeneratePersona = async () => {
    if (!selectedNiche) return;
    setIsLoading(true);
    setLoadingMessage('Creating your ideal student persona...');
    try {
      const creditResult = await deductCredits(getCreditDeductionForStep(2));
      if (!creditResult.success) {
        showToast('Insufficient credits', 'error');
        setIsLoading(false);
        return;
      }
      await refreshUser();
      const generated = await generatePersona(selectedNiche.id);
      setPersona(generated);
      showToast('Persona generated!', 'success');
    } catch {
      showToast('Failed to generate persona. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmPersona = () => {
    showToast("Persona confirmed! Let's build your program.", 'success');
    setCurrentStep(3);
    setProgramSubStep('problems');
  };

  // --- Step 3 ---
  const handleConfirmProblems = () => {
    if (selectedProblems.length === 0) {
      showToast('Please select at least one problem', 'error');
      return;
    }
    setProgramSubStep('naming');
  };

  const handleGenerateProgramNames = async () => {
    if (!selectedNiche || !persona) return;
    setIsLoading(true);
    setLoadingMessage('Generating program names...');
    try {
      const creditResult = await deductCredits(getCreditDeductionForStep(3));
      if (!creditResult.success) {
        showToast('Insufficient credits', 'error');
        setIsLoading(false);
        return;
      }
      await refreshUser();
      const names = await generateProgramNames(selectedNiche.id, persona.id);
      setProgramNames(names);
      showToast('Program names generated!', 'success');
    } catch {
      showToast('Failed to generate names. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProgram = (program: ProgramName) => {
    setSelectedProgram(program);
    setProgramSubStep('pricing');
  };

  const handleGeneratePricing = async () => {
    if (!selectedProgram) return;
    setIsLoading(true);
    setLoadingMessage('Analyzing pricing strategy...');
    try {
      const creditResult = await deductCredits(5);
      if (!creditResult.success) {
        showToast('Insufficient credits', 'error');
        setIsLoading(false);
        return;
      }
      await refreshUser();
      const strategy = await generatePricing(selectedProgram.id);
      setPricing(strategy);
      showToast('Pricing strategy ready!', 'success');
    } catch {
      showToast('Failed to generate pricing. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmPricing = () => {
    showToast('Program built! Generating your roadmap...', 'success');
    setCurrentStep(4);
  };

  // --- Step 4 ---
  const handleGenerateRoadmap = async () => {
    setIsLoading(true);
    setLoadingMessage('Building your 12-week roadmap...');
    try {
      const creditResult = await deductCredits(getCreditDeductionForStep(4));
      if (!creditResult.success) {
        showToast('Insufficient credits', 'error');
        setIsLoading(false);
        return;
      }
      await refreshUser();
      const result = await generateRoadmap('bp_001');
      setRoadmap(result.roadmap);
      // API returns pdfUrl — we generate our own PDF locally
      showToast('Roadmap generated! Download your blueprint below.', 'success');
    } catch {
      showToast('Failed to generate roadmap. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    setIsGeneratingPDF(true);
    setTimeout(() => {
      try {
        generatePDF({ user, niche: selectedNiche, persona, program: selectedProgram, pricing, roadmap });
        showToast('Your blueprint PDF has been generated!', 'success');
      } catch {
        showToast('Failed to generate PDF. Please try again.', 'error');
      } finally {
        setIsGeneratingPDF(false);
      }
    }, 800);
  };

  // --- Loading State ---
  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-orange-light flex items-center justify-center">
          <Sparkles size={28} className="text-orange" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-orange border-t-transparent animate-spin" />
      </div>
      <p className="text-lg font-medium text-black mb-2">{loadingMessage}</p>
      <p className="text-sm text-gray-500">This may take a few seconds...</p>
    </div>
  );

  // ================================================================
  // STEP 1 RENDERER
  // ================================================================
  const renderStep1 = () => {
    if (isLoading) return renderLoading();

    if (nicheOptions) {
      return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="label-badge text-gray-500 mb-1">STEP 1 OF 4</p>
              <h2 className="font-serif text-2xl text-black">
                Choose Your <em className="text-orange">Niche</em>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleRegenerateNiches} className="btn-ghost text-sm">
                <RefreshCw size={14} />
                Regenerate
              </button>
              <button onClick={() => setNicheOptions(null)} className="btn-ghost text-sm">
                <Edit3 size={14} />
                Edit Answers
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {nicheOptions.map((niche) => (
              <NicheCard
                key={niche.id}
                niche={niche}
                onSelect={() => handleSelectNiche(niche)}
                isSelected={selectedNiche?.id === niche.id}
              />
            ))}
          </div>
          <button onClick={() => navigate('/dashboard')} className="btn-ghost w-full">
            <ArrowLeft size={16} />
            Return to Dashboard
          </button>
        </motion.div>
      );
    }

    return (
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-[640px] mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-light mb-4">
            <Lightbulb size={24} className="text-orange" />
          </div>
          <p className="label-badge text-gray-500 mb-2">STEP 1 OF 4</p>
          <h2 className="font-serif text-3xl text-black mb-2">Niche Discovery</h2>
          <p className="text-gray-600">Tell us about yourself so our AI can find your perfect coaching niche.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              What are your skills or areas of expertise?
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Fitness & Health', 'Business & Career', 'Education & Skills', 'Yoga & Mindfulness'].map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setNicheForm((prev) => ({
                      ...prev,
                      background: prev.background ? `${prev.background}, ${tag}` : tag,
                    }))
                  }
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <textarea
              value={nicheForm.background}
              onChange={(e) => setNicheForm((prev) => ({ ...prev, background: e.target.value }))}
              placeholder="e.g., Leadership coaching, nutrition consulting, career mentoring..."
              className="w-full min-h-[100px] p-4 rounded-xl border border-gray-200 text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all resize-none"
              maxLength={500}
            />
            <p className="text-right text-xs text-gray-400 mt-1">{nicheForm.background.length}/500</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              What is your professional experience?
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {['IT Professional', 'Teacher/Trainer', 'Corporate Employee', 'Healthcare Professional'].map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setNicheForm((prev) => ({
                      ...prev,
                      experience: prev.experience ? `${prev.experience}, ${tag}` : tag,
                    }))
                  }
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <textarea
              value={nicheForm.experience}
              onChange={(e) => setNicheForm((prev) => ({ ...prev, experience: e.target.value }))}
              placeholder="e.g., 10 years in corporate HR, 5 years as a freelance trainer..."
              className="w-full min-h-[100px] p-4 rounded-xl border border-gray-200 text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all resize-none"
              maxLength={500}
            />
            <p className="text-right text-xs text-gray-400 mt-1">{nicheForm.experience.length}/500</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              What topics could you talk about for hours?
            </label>
            <textarea
              value={nicheForm.passion}
              onChange={(e) => setNicheForm((prev) => ({ ...prev, passion: e.target.value }))}
              placeholder="Topics you're passionate about..."
              className="w-full min-h-[100px] p-4 rounded-xl border border-gray-200 text-sm focus:border-orange focus:ring-1 focus:ring-orange/20 outline-none transition-all resize-none"
              maxLength={500}
            />
            <p className="text-right text-xs text-gray-400 mt-1">{nicheForm.passion.length}/500</p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button onClick={() => navigate('/dashboard')} className="btn-ghost flex-1">
              <ArrowLeft size={16} />
              Back
            </button>
            <button onClick={handleSubmitNicheForm} className="btn-primary flex-[2]">
              <Sparkles size={16} />
              Discover My Niche
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            Costs {getCreditDeductionForStep(1)} credits · You have {user?.credits ?? 100} credits
          </p>
        </div>
      </motion.div>
    );
  };

  // ================================================================
  // STEP 2 RENDERER
  // ================================================================
  const renderStep2 = () => {
    if (isLoading) return renderLoading();

    if (persona) {
      return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="label-badge text-gray-500 mb-1">STEP 2 OF 4</p>
              <h2 className="font-serif text-2xl text-black">
                Meet Your <em className="text-orange">Ideal Student</em>
              </h2>
            </div>
            <button
              onClick={() => {
                setPersona(null);
                setSelectedProblems([]);
              }}
              className="btn-ghost text-sm"
            >
              <RefreshCw size={14} />
              Regenerate Avatar
            </button>
          </div>

          <PersonaCard persona={persona} onConfirm={() => handleConfirmPersona()} isConfirmed={false} />

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setCurrentStep(1);
                setPersona(null);
              }}
              className="btn-ghost flex-1"
            >
              <ArrowLeft size={16} />
              Back to Niche
            </button>
            <button onClick={handleConfirmPersona} className="btn-primary flex-[2]">
              Yes, This Is My Student!
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-[560px] mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-light mb-6">
          <Users size={32} className="text-orange" />
        </div>
        <p className="label-badge text-gray-500 mb-2">STEP 2 OF 4</p>
        <h2 className="font-serif text-3xl text-black mb-3">Audience Mapping</h2>
        <p className="text-gray-600 mb-8">
          Based on your chosen niche <strong>&quot;{selectedNiche?.name}&quot;</strong>, our AI will create a detailed ideal student persona.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 text-left">
          <p className="label-badge text-gray-500 mb-3">SELECTED NICHE</p>
          <p className="text-lg font-semibold text-black mb-2">{selectedNiche?.name}</p>
          <p className="text-sm text-gray-600">{selectedNiche?.whoYouHelp}</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setCurrentStep(1);
              setNicheOptions(null);
              setSelectedNiche(null);
            }}
            className="btn-ghost flex-1"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button onClick={handleGeneratePersona} className="btn-primary flex-[2]">
            <Sparkles size={16} />
            Generate Persona
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Costs {getCreditDeductionForStep(2)} credits · You have {user?.credits ?? 100} credits
        </p>
      </motion.div>
    );
  };

  // ================================================================
  // STEP 3 RENDERER
  // ================================================================
  const renderStep3 = () => {
    if (isLoading) return renderLoading();

    // 3a: Problems
    if (programSubStep === 'problems') {
      const problems = persona?.painPoints ?? [];
      return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-[720px] mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-light mb-4">
              <Target size={24} className="text-orange" />
            </div>
            <p className="label-badge text-gray-500 mb-1">STEP 3A — PROGRAM BUILDER</p>
            <h2 className="font-serif text-2xl text-black mb-2">Identify the Problems</h2>
            <p className="text-gray-600">
              Select the problems your ideal student <strong>{persona?.name}</strong> faces that you will solve.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {problems.map((problem) => {
              const isSelected = selectedProblems.includes(problem);
              return (
                <button
                  key={problem}
                  onClick={() =>
                    setSelectedProblems((prev) =>
                      prev.includes(problem) ? prev.filter((p) => p !== problem) : [...prev, problem]
                    )
                  }
                  className={`w-full flex items-start gap-4 p-5 rounded-xl border text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-orange bg-orange-light shadow-[0_4px_16px_rgba(240,90,40,0.08)]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'bg-orange text-white' : 'border-2 border-gray-300'
                    }`}
                  >
                    {isSelected && <Check size={14} />}
                  </div>
                  <span className={`text-sm ${isSelected ? 'text-black font-medium' : 'text-gray-700'}`}>{problem}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setCurrentStep(2);
                setSelectedProblems([]);
              }}
              className="btn-ghost flex-1"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button onClick={handleConfirmProblems} className="btn-primary flex-[2]">
              Confirm Problems
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      );
    }

    // 3b: Naming
    if (programSubStep === 'naming') {
      if (!programNames) {
        return (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-[560px] mx-auto text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-light mb-6">
              <FileText size={32} className="text-orange" />
            </div>
            <p className="label-badge text-gray-500 mb-2">STEP 3B — PROGRAM BUILDER</p>
            <h2 className="font-serif text-3xl text-black mb-3">Name Your Program</h2>
            <p className="text-gray-600 mb-8">
              Our AI will generate 3 premium program name suggestions based on your niche and audience.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => setProgramSubStep('problems')} className="btn-ghost flex-1">
                <ArrowLeft size={16} />
                Back to Problems
              </button>
              <button onClick={handleGenerateProgramNames} className="btn-primary flex-[2]">
                <Sparkles size={16} />
                Generate Names
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">
              Costs {getCreditDeductionForStep(3)} credits · You have {user?.credits ?? 100} credits
            </p>
          </motion.div>
        );
      }

      return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-[720px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="label-badge text-gray-500 mb-1">STEP 3B — PROGRAM BUILDER</p>
              <h2 className="font-serif text-2xl text-black">
                Choose a <em className="text-orange">Program Name</em>
              </h2>
            </div>
            <button onClick={() => setProgramNames(null)} className="btn-ghost text-sm">
              <RefreshCw size={14} />
              Regenerate
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            {programNames.map((program) => (
              <div
                key={program.id}
                className={`relative bg-white border rounded-xl p-6 transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
                  program.isAiRecommended ? 'border-orange shadow-[0_4px_24px_rgba(240,90,40,0.08)]' : 'border-gray-200'
                }`}
              >
                {program.isAiRecommended && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 bg-orange text-white text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full">
                    <Zap size={12} />
                    AI Recommended
                  </span>
                )}
                <h3 className="text-lg font-semibold text-black mb-1">{program.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                <button
                  onClick={() => handleSelectProgram(program)}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                    selectedProgram?.id === program.id
                      ? 'bg-green text-white'
                      : 'bg-orange text-white hover:bg-orange-hover hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {selectedProgram?.id === program.id ? 'Selected' : 'Select This Name'}
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>

          <button onClick={() => setProgramSubStep('problems')} className="btn-ghost w-full">
            <ArrowLeft size={16} />
            Back to Problems
          </button>
        </motion.div>
      );
    }

    // 3c: Pricing
    if (programSubStep === 'pricing') {
      if (!pricing) {
        return (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-[560px] mx-auto text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-light mb-6">
              <TrendingUp size={32} className="text-orange" />
            </div>
            <p className="label-badge text-gray-500 mb-2">STEP 3C — PROGRAM BUILDER</p>
            <h2 className="font-serif text-3xl text-black mb-3">Pricing Strategy</h2>
            <p className="text-gray-600 mb-8">
              Our AI will recommend optimal pricing based on your audience&apos;s paying capacity and market analysis.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => setProgramSubStep('naming')} className="btn-ghost flex-1">
                <ArrowLeft size={16} />
                Back to Names
              </button>
              <button onClick={handleGeneratePricing} className="btn-primary flex-[2]">
                <Sparkles size={16} />
                Generate Pricing
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">
              Costs 5 credits · You have {user?.credits ?? 100} credits
            </p>
          </motion.div>
        );
      }

      return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-[840px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="label-badge text-gray-500 mb-1">STEP 3C — PROGRAM BUILDER</p>
              <h2 className="font-serif text-2xl text-black">
                Your <em className="text-orange">Pricing Strategy</em>
              </h2>
            </div>
            <button onClick={() => setPricing(null)} className="btn-ghost text-sm">
              <RefreshCw size={14} />
              Regenerate
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <p className="label-badge text-gray-500 mb-3">RECOMMENDED STARTING PRICE</p>
            <p className="font-serif text-[48px] text-green mb-2">₹{pricing.startingPrice.toLocaleString('en-IN')}</p>
            <p className="text-sm text-gray-500 mb-4">per student</p>
            <div className="max-w-[480px] mx-auto">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Sweet Spot:</strong>{' '}
                <span className="text-orange font-semibold">{pricing.sweetSpotRange}</span>
              </p>
            </div>
          </div>

          <div>
            <p className="label-badge text-gray-500 mb-4">PRICING TIERS</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pricing.tiers.map((tier, i) => {
                const colors = ['bg-gray-50 border-gray-200', 'bg-orange-light border-orange/20', 'bg-green-light border-green/20'];
                return (
                  <div key={tier.name} className={`border rounded-xl p-5 ${colors[i]}`}>
                    <p className="label-badge text-gray-500 mb-2">{tier.name}</p>
                    <p className="font-serif text-2xl text-black mb-1">₹{tier.price.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-gray-500 mb-4">{tier.description}</p>
                    <ul className="space-y-2">
                      {tier.features.map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={14} className="text-green mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="label-badge text-gray-500 mb-4">REVENUE PROJECTIONS</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pricing.milestones.map((m) => (
                <div
                  key={m.label}
                  className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mb-3">
                    {m.icon === 'trophy' && <Trophy size={18} className="text-amber" />}
                    {m.icon === 'trending' && <TrendingUp size={18} className="text-orange" />}
                    {m.icon === 'crown' && <Crown size={18} className="text-green" />}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{m.students} Students</p>
                  <p className="font-serif text-xl text-black mb-1">{m.revenue}</p>
                  <p className="text-xs text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="label-badge text-gray-500 mb-2">PRICE JUSTIFICATION</p>
              <p className="text-sm text-gray-600 leading-relaxed">{pricing.priceJustification}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="label-badge text-gray-500 mb-2">MARKET INSIGHT</p>
              <p className="text-sm text-gray-600 leading-relaxed">{pricing.marketInsight}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="label-badge text-gray-500 mb-2">PRICE EVOLUTION STRATEGY</p>
            <p className="text-sm text-gray-600 leading-relaxed">{pricing.priceEvolution}</p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button onClick={() => setProgramSubStep('naming')} className="btn-ghost flex-1">
              <ArrowLeft size={16} />
              Back to Names
            </button>
            <button onClick={handleConfirmPricing} className="btn-primary flex-[2]">
              Confirm Pricing & Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  // ================================================================
  // STEP 4 RENDERER
  // ================================================================
  const renderStep4 = () => {
    if (isLoading) return renderLoading();

    if (roadmap) {
      return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-[840px] mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-light mb-4">
              <Map size={24} className="text-green" />
            </div>
            <p className="label-badge text-gray-500 mb-1">STEP 4 OF 4</p>
            <h2 className="font-serif text-2xl text-black mb-2">
              Your 12-Week <em className="text-orange">Roadmap</em>
            </h2>
            <p className="text-gray-600">A complete action plan to launch and scale your coaching business.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-black">Blueprint Completion</span>
              <span className="text-sm font-semibold text-green">100%</span>
            </div>
            <ProgressBar progress={100} height={10} color="bg-green" showLabel={false} />
          </div>

          <div className="space-y-8">
            {roadmap.map((phase) => (
              <div key={phase.phase} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange text-white flex items-center justify-center text-sm font-bold">{phase.phase}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{phase.title}</h3>
                    <p className="text-xs text-gray-500">{phase.weeks}</p>
                  </div>
                </div>
                <div className="ml-5 pl-8 border-l-2 border-gray-200 space-y-4">
                  {phase.items.map((item) => (
                    <div key={item.week} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] font-semibold rounded-full">Week {item.week}</span>
                        <h4 className="text-sm font-semibold text-black">{item.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.deliverables.map((d) => (
                          <span key={d} className="px-2.5 py-1 bg-green-light text-green text-xs rounded-full font-medium">{d}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="label-badge text-gray-500 mb-4">PROGRAM MODULES</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockModules.map((mod) => (
                <div key={mod.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-light text-orange flex items-center justify-center text-sm font-bold flex-shrink-0">{mod.id}</div>
                  <div>
                    <p className="text-sm font-semibold text-black">{mod.title}</p>
                    <p className="text-xs text-gray-500">{mod.lessons} lessons</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black rounded-2xl p-8 text-center">
            <h3 className="font-serif text-2xl text-white mb-2">Your Blueprint is Ready!</h3>
            <p className="text-sm text-gray-400 mb-6">Download your complete coaching business blueprint as a PDF.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="btn-primary bg-white text-black hover:bg-gray-100 disabled:opacity-50"
              >
                {isGeneratingPDF ? (
                  <>
                    <Spinner className="text-black" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Download Blueprint PDF
                  </>
                )}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} />
                Return to Dashboard
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-[560px] mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-light mb-6">
          <Rocket size={32} className="text-green" />
        </div>
        <p className="label-badge text-gray-500 mb-2">STEP 4 OF 4</p>
        <h2 className="font-serif text-3xl text-black mb-3">Roadmap & Plan</h2>
        <p className="text-gray-600 mb-8">
          Generate your complete 12-week coaching business launch roadmap and export your blueprint.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 text-left space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green" />
            <span className="text-sm text-black">
              <strong>Niche:</strong> {selectedNiche?.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green" />
            <span className="text-sm text-black">
              <strong>Audience:</strong> {persona?.name} — {persona?.role}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green" />
            <span className="text-sm text-black">
              <strong>Program:</strong> {selectedProgram?.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-green" />
            <span className="text-sm text-black">
              <strong>Price:</strong> ₹{pricing?.startingPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentStep(3)} className="btn-ghost flex-1">
            <ArrowLeft size={16} />
            Back
          </button>
          <button onClick={handleGenerateRoadmap} className="btn-primary flex-[2]">
            <Sparkles size={16} />
            Generate Roadmap
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Costs {getCreditDeductionForStep(4)} credits · You have {user?.credits ?? 100} credits
        </p>
      </motion.div>
    );
  };

  const stepKey = currentStep === 3 ? `step3-${programSubStep}` : `step-${currentStep}`;

  return (
    <div className="pb-16">
      <div className="mb-10">
        <Stepper currentStep={currentStep} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={stepKey} variants={stepVariants} initial="hidden" animate="visible" exit="exit">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
