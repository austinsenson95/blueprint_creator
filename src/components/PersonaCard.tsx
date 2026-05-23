// ============================================================
// DISCOVERY ENGINE — Detailed Persona Profile Card
// ============================================================

import { MapPin, Briefcase, DollarSign, ArrowRight, Quote } from 'lucide-react';
import type { Persona } from '@/types';

interface PersonaCardProps {
  persona: Persona;
  onConfirm: (personaId: string) => void;
  isConfirmed?: boolean;
}

export default function PersonaCard({ persona, onConfirm, isConfirmed = false }: PersonaCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-250">
      {/* Header with avatar */}
      <div className="bg-gray-100 px-6 py-6 flex items-center gap-5">
        <img
          src={persona.avatar}
          alt={persona.name}
          className="w-20 h-20 rounded-full border-3 border-white shadow-md"
        />
        <div>
          <h3 className="text-2xl font-semibold text-black">{persona.name}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Briefcase size={14} />
              {persona.role}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {persona.location}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={14} />
              {persona.payingCapacity}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6 space-y-6">
        {/* Quote */}
        <div className="relative bg-orange-light rounded-xl p-5">
          <Quote size={20} className="text-orange mb-2" />
          <p className="text-lg text-black italic font-serif">"{persona.quote}"</p>
        </div>

        {/* Demographics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="label-badge text-gray-500 mb-1">AGE</p>
            <p className="text-sm font-semibold text-black">{persona.ageRange}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="label-badge text-gray-500 mb-1">ROLE</p>
            <p className="text-sm font-semibold text-black">{persona.role}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="label-badge text-gray-500 mb-1">LOCATION</p>
            <p className="text-sm font-semibold text-black">{persona.location}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="label-badge text-gray-500 mb-1">BUDGET</p>
            <p className="text-sm font-semibold text-black">{persona.payingCapacity}</p>
          </div>
        </div>

        {/* Current Situation */}
        <div>
          <p className="label-badge text-gray-500 mb-2">CURRENT SITUATION</p>
          <p className="text-sm text-gray-600 leading-relaxed">{persona.currentSituation}</p>
        </div>

        {/* Biggest Desire */}
        <div>
          <p className="label-badge text-gray-500 mb-2">BIGGEST DESIRE</p>
          <p className="text-sm font-semibold text-orange">{persona.biggestDesire}</p>
        </div>

        {/* Online Platforms */}
        <div>
          <p className="label-badge text-gray-500 mb-2">ONLINE PLATFORMS</p>
          <div className="flex flex-wrap gap-2">
            {persona.onlinePlatforms.map((platform) => (
              <span
                key={platform}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        {/* Pain Points */}
        <div>
          <p className="label-badge text-gray-500 mb-2">PAIN POINTS</p>
          <ul className="space-y-2">
            {persona.painPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-red rounded-full mt-1.5 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Goals */}
        <div>
          <p className="label-badge text-gray-500 mb-2">GOALS</p>
          <ul className="space-y-2">
            {persona.goals.map((goal, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-green rounded-full mt-1.5 flex-shrink-0" />
                {goal}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onConfirm(persona.id)}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 ${
            isConfirmed
              ? 'bg-green text-white'
              : 'bg-orange text-white hover:bg-orange-hover hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isConfirmed ? 'Persona Confirmed' : 'Confirm This Persona'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
