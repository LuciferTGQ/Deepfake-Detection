import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  isVisible: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isVisible }) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 animate-fade-in">
      <div className="relative">
        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${displayProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-glow" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Loader className="w-5 h-5 text-primary-500 animate-spin" />
          <span className="text-body text-neutral-700">分析中...</span>
        </div>
        <span className="text-subtitle font-bold text-primary-500">
          {Math.round(displayProgress)}%
        </span>
      </div>
    </div>
  );
};