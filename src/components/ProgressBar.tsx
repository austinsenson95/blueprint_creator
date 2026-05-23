// ============================================================
// DISCOVERY ENGINE — Animated Progress Bar
// ============================================================

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number;
  height?: number;
  showLabel?: boolean;
  color?: string;
  trackColor?: string;
}

export default function ProgressBar({
  progress,
  height = 8,
  showLabel = true,
  color = 'bg-green',
  trackColor = 'bg-gray-200',
}: ProgressBarProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    // Small delay to trigger the animation
    const timer = setTimeout(() => {
      setAnimatedWidth(Math.min(Math.max(progress, 0), 100));
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="w-full">
      <div className={`w-full ${trackColor} rounded-full overflow-hidden`} style={{ height }}>
        <div
          className={`${color} rounded-full transition-all duration-800 ease-out`}
          style={{
            width: `${animatedWidth}%`,
            height: '100%',
            transition: 'width 800ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-500 mt-1.5">{Math.round(progress)}% complete</p>
      )}
    </div>
  );
}
