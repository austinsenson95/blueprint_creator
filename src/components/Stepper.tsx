// ============================================================
// DISCOVERY ENGINE — Horizontal 4-Step Wizard Stepper
// ============================================================

import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  steps?: string[];
}

const defaultSteps = [
  'Niche Discovery',
  'Audience Mapping',
  'Program Builder',
  'Roadmap',
];

export default function Stepper({ currentStep, steps = defaultSteps }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const completed = stepNumber < currentStep;
          const current = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1 last:flex-none">
              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    completed
                      ? 'bg-green text-white'
                      : current
                        ? 'bg-orange text-white'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {completed ? <Check size={18} /> : stepNumber}
                </div>
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    current ? 'text-black' : 'text-gray-500'
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-[2px] flex-1 mx-3 mb-6 transition-all duration-500 ${
                    completed ? 'bg-green' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
