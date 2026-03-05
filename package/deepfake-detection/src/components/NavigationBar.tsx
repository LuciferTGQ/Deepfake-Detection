import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const NavigationBar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-glass-subtle backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-8 h-18 md:h-18 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-primary-500" />
          <h1 className="text-heading font-semibold text-neutral-900">
            智能检测AI换脸
          </h1>
        </div>
      </div>
    </nav>
  );
};