// ============================================================
// DISCOVERY ENGINE — Dashboard Page
// ============================================================

import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Coins,
  FileText,
  Sparkles,
  Users,
  Download,
  FileTextIcon,
} from 'lucide-react';
import type { User } from '@/types';
import { mockActivities, mockStats, wizardSteps } from '@/lib/mockData';
import ProgressBar from '@/components/ProgressBar';

interface DashboardProps {
  user: User | null;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Dashboard({ user }: DashboardProps) {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Number count-up animation for stats
    if (statsRef.current) {
      const numbers = statsRef.current.querySelectorAll('.stat-number');
      numbers.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const duration = 800;
        const start = performance.now();

        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.round(target * eased).toString();
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      });
    }
  }, []);

  return (
    <div className="pb-16">
      {/* ========== Section 1: Welcome Header ========== */}
      <section className="pt-8 pb-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge Row */}
          <motion.div variants={staggerChild} className="flex flex-wrap items-center gap-2 mb-6">
            <span className="px-4 py-1.5 bg-black text-white uppercase text-[11px] font-semibold tracking-[0.12em] rounded-full">
              AI-POWERED
            </span>
            <span className="px-4 py-1.5 bg-orange-light text-orange uppercase text-[11px] font-semibold tracking-[0.12em] rounded-full">
              BLUEPRINT ENGINE
            </span>
            <span className="px-4 py-1.5 bg-green-light text-green uppercase text-[11px] font-semibold tracking-[0.12em] rounded-full">
              {user?.credits ?? 100} CREDITS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerChild}
            className="font-serif text-[44px] md:text-[56px] leading-tight text-black mb-4"
          >
            Welcome back,{' '}
            <em className="text-orange not-italic" style={{ fontStyle: 'italic' }}>
              {user?.name || 'Sarah'}
            </em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={staggerChild}
            className="text-lg text-gray-600 max-w-[560px] leading-relaxed"
          >
            Transform your expertise into a profitable coaching program. Our AI-powered wizard
            guides you through niche discovery, audience mapping, program building, and roadmap
            creation.
          </motion.p>
        </motion.div>
      </section>

      {/* ========== Section 2: Wizard CTA Card ========== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="mb-16"
      >
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-orange transition-colors duration-300 hover:shadow-[0_8px_32px_rgba(240,90,40,0.1)]">
          <div className="flex flex-col lg:flex-row">
            {/* Left content (60%) */}
            <div
              className="lg:w-[60%] p-8 lg:p-10"
              style={{
                background:
                  'linear-gradient(135deg, transparent 50%, rgba(240,90,40,0.04) 100%)',
              }}
            >
              <p className="label-badge text-gray-500 mb-3">4-STEP BLUEPRINT WIZARD</p>
              <h2 className="font-serif text-[32px] leading-tight text-black mb-3">
                Build Your <em className="text-orange" style={{ fontStyle: 'italic' }}>Signature Program</em>
              </h2>
              <p className="text-base text-gray-600 max-w-[400px] mb-6 leading-relaxed">
                Go from scattered ideas to a complete business blueprint in minutes. Our AI
                analyzes your expertise, identifies your ideal niche, maps your audience, and
                creates a full program with pricing and 12-week roadmap.
              </p>

              {/* Features list */}
              <ul className="space-y-3 mb-8">
                {[
                  'Niche Discovery with market analysis',
                  'Detailed audience persona generation',
                  'Complete program structure & pricing',
                  '12-week launch roadmap + PDF export',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={18} className="text-green flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button with pulse */}
              <Link
                to="/blueprint"
                className="inline-flex items-center gap-2 bg-orange text-white rounded-full px-8 py-3.5 text-sm font-semibold hover:bg-orange-hover hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 animate-pulse-subtle"
              >
                Start Building My Blueprint
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right content (40%) */}
            <div className="lg:w-[40%] flex flex-col items-center justify-center p-8 bg-gray-50/50">
              <motion.img
                src="/wizard-illustration.svg"
                alt="Wizard"
                className="w-[180px] h-[180px] lg:w-[200px] lg:h-[200px] mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              />
              {/* Mini step dots */}
              <div className="flex items-center gap-0">
                {wizardSteps.map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        i === 0 ? 'bg-orange' : 'bg-gray-300'
                      }`}
                    />
                    {i < wizardSteps.length - 1 && (
                      <div className="w-6 h-[1px] bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========== Section 3: Progress Overview ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="mb-12"
      >
        {/* Section header */}
        <div className="mb-6">
          <motion.p variants={staggerChild} className="label-badge text-gray-500 mb-2">
            YOUR PROGRESS
          </motion.p>
          <motion.h2
            variants={staggerChild}
            className="font-serif text-2xl text-black"
          >
            Where You&apos;ve <em className="text-orange" style={{ fontStyle: 'italic' }}>Been</em>
          </motion.h2>
        </div>

        {/* Progress cards - 3 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Blueprint Progress */}
          <motion.div
            variants={staggerChild}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
          >
            <div className="h-1 bg-orange" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={24} className="text-orange" />
                <h3 className="text-base font-semibold text-black">Blueprint Status</h3>
              </div>
              <span className="inline-flex px-3 py-1 bg-green-light text-green text-xs font-semibold uppercase tracking-[0.12em] rounded-full mb-4">
                In Progress
              </span>
              <ProgressBar progress={25} height={8} color="bg-green" />
              <p className="text-sm text-gray-500 mt-2">Step 1 of 4 — Niche Discovery</p>
            </div>
          </motion.div>

          {/* Card 2: Credits Remaining */}
          <motion.div
            variants={staggerChild}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
          >
            <div className="h-1 bg-green" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Coins size={24} className="text-green" />
                <h3 className="text-base font-semibold text-black">Credits</h3>
              </div>
              <p className="font-serif text-[32px] text-green mb-1">
                {user?.credits ?? 100}
              </p>
              <p className="text-sm text-gray-500 mb-3">credits remaining</p>
              {/* Mini bar */}
              <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                <div
                  className="bg-green rounded-full h-1 transition-all"
                  style={{ width: `${((user?.credits ?? 100) / 100) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">
                {100 - (user?.credits ?? 100)} credits used this month
              </p>
            </div>
          </motion.div>

          {/* Card 3: Programs Created */}
          <motion.div
            variants={staggerChild}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
          >
            <div className="h-1 bg-gray-500" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={24} className="text-gray-500" />
                <h3 className="text-base font-semibold text-black">Blueprints</h3>
              </div>
              <p className="font-serif text-[32px] text-black mb-1">2</p>
              <p className="text-sm text-gray-500 mb-3">blueprints generated</p>
              <p className="text-xs text-gray-500">Last generated: March 15, 2025</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ========== Section 4: Quick Stats Row ========== */}
      <motion.section
        ref={statsRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="mb-12"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: CheckCircle2,
              color: 'text-green',
              target: mockStats.nichesDiscovered,
              label: 'Niches Discovered',
            },
            {
              icon: Users,
              color: 'text-orange',
              target: mockStats.personasMapped,
              label: 'Personas Mapped',
            },
            {
              icon: FileTextIcon,
              color: 'text-black',
              target: mockStats.blueprintsCreated,
              label: 'Blueprints Created',
            },
            {
              icon: Download,
              color: 'text-gray-500',
              target: mockStats.pdfsExported,
              label: 'PDFs Exported',
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              className="flex items-center gap-3"
            >
              <stat.icon size={20} className={stat.color} />
              <div>
                <p className={`font-serif text-2xl ${stat.color}`}>
                  <span className="stat-number" data-target={stat.target}>
                    0
                  </span>
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ========== Section 5: Recent Activity Feed ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="mb-16"
      >
        {/* Section header */}
        <div className="mb-6">
          <motion.p variants={staggerChild} className="label-badge text-gray-500 mb-2">
            ACTIVITY
          </motion.p>
          <motion.h2
            variants={staggerChild}
            className="font-serif text-2xl text-black"
          >
            Recent <em className="text-orange" style={{ fontStyle: 'italic' }}>Activity</em>
          </motion.h2>
        </div>

        {/* Activity list */}
        <motion.div variants={staggerChild} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {mockActivities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-center gap-4 px-6 py-4 ${
                index < mockActivities.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              {/* Colored dot */}
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  activity.type === 'success'
                    ? 'bg-green'
                    : activity.type === 'generation'
                      ? 'bg-orange'
                      : 'bg-gray-300'
                }`}
              />
              {/* Activity text */}
              <p className="text-sm text-black flex-1">{activity.text}</p>
              {/* Timestamp */}
              <p className="text-sm text-gray-500 flex-shrink-0">{activity.timestamp}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}
