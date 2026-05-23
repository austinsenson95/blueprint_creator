// ============================================================
// DISCOVERY ENGINE — Niche Recommendation Card
// ============================================================

import { ArrowRight, TrendingUp, BarChart3 } from 'lucide-react';
import type { NicheOption } from '@/types';

interface NicheCardProps {
  niche: NicheOption;
  onSelect: (nicheId: string) => void;
  isSelected?: boolean;
}

export default function NicheCard({ niche, onSelect, isSelected = false }: NicheCardProps) {
  return (
    <div
      className={`relative bg-white border border-gray-200 rounded-xl p-6 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
        isSelected ? 'border-orange shadow-[0_4px_24px_rgba(240,90,40,0.08)]' : ''
      }`}
      style={{ borderLeftWidth: '3px', borderLeftColor: '#F05A28' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-black leading-snug">{niche.name}</h3>
        {niche.isSelected && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-light text-green text-[11px] font-semibold uppercase tracking-[0.12em] rounded-full">
            Selected
          </span>
        )}
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 gap-4 mb-5">
        <div>
          <p className="label-badge text-gray-500 mb-1">WHO YOU HELP</p>
          <p className="text-sm text-gray-600">{niche.whoYouHelp}</p>
        </div>
        <div>
          <p className="label-badge text-gray-500 mb-1">PROBLEM SOLVED</p>
          <p className="text-sm text-gray-600">{niche.problemSolved}</p>
        </div>
        <div>
          <p className="label-badge text-gray-500 mb-1">RESULT DELIVERED</p>
          <p className="text-sm text-gray-600">{niche.resultDelivered}</p>
        </div>
      </div>

      {/* Metrics row */}
      <div className="flex items-center gap-6 mb-5 py-3 border-t border-b border-gray-100">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-green" />
          <div>
            <p className="text-xs text-gray-500">Revenue Potential</p>
            <p className="text-sm font-semibold text-black">{niche.revenuePotential}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 size={16} className="text-orange" />
          <div>
            <p className="text-xs text-gray-500">Market Demand</p>
            <p className="text-sm font-semibold text-black">{niche.marketDemand}/10</p>
          </div>
        </div>
      </div>

      {/* Competition & Keywords */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="label-badge text-gray-500">COMPETITION:</span>
          <span className="text-sm font-medium text-black">{niche.competitionLevel}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {niche.keywords.map((kw) => (
            <span
              key={kw}
              className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Fit explanation */}
      <p className="text-sm text-gray-600 mb-5 italic">{niche.fitExplanation}</p>

      {/* Select button */}
      <button
        onClick={() => onSelect(niche.id)}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${
          isSelected
            ? 'bg-green text-white hover:bg-green/90'
            : 'bg-orange text-white hover:bg-orange-hover hover:scale-[1.02] active:scale-[0.98]'
        }`}
      >
        {isSelected ? 'Selected' : 'Select This Niche'}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
