import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, RotateCcw } from 'lucide-react';

interface Result {
  confidence: number;
  level: 'very-trustworthy' | 'trustworthy' | 'untrustworthy';
  description: string;
}

interface ResultCardProps {
  result: Result;
  isVisible: boolean;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, isVisible, onReset }) => {
  const [displayConfidence, setDisplayConfidence] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        let start = 0;
        const end = result.confidence;
        const duration = 800;
        const increment = end / (duration / 16);

        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setDisplayConfidence(end);
            clearInterval(counter);
          } else {
            setDisplayConfidence(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(counter);
      }, 200);
    }
  }, [result.confidence, isVisible]);

  if (!isVisible) return null;

  const getResultConfig = (level: Result['level']) => {
    switch (level) {
      case 'very-trustworthy':
        return {
          icon: CheckCircle,
          iconColor: 'text-success-500',
          bgColor: 'bg-success-100',
          borderColor: 'border-success-500',
          textColor: 'text-success-500',
          label: '非常信任',
          description: '视频内容高度可信，未检测到AI生成痕迹'
        };
      case 'trustworthy':
        return {
          icon: AlertTriangle,
          iconColor: 'text-warning-500',
          bgColor: 'bg-warning-100',
          borderColor: 'border-warning-500',
          textColor: 'text-warning-500',
          label: '比较信任',
          description: '视频内容基本可信，存在轻微异常特征'
        };
      case 'untrustworthy':
        return {
          icon: XCircle,
          iconColor: 'text-error-500',
          bgColor: 'bg-error-100',
          borderColor: 'border-error-500',
          textColor: 'text-error-500',
          label: '不可信',
          description: '检测到明显的AI生成痕迹，建议谨慎对待'
        };
    }
  };

  const config = getResultConfig(result.level);
  const IconComponent = config.icon;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className={`bg-glass-emphasized backdrop-blur-2xl border-2 ${config.borderColor} rounded-2xl p-8 md:p-12 shadow-glass-hover`}>
        <div className="text-center space-y-6">
          {/* 图标 */}
          <div className={`w-12 h-12 mx-auto ${config.bgColor} rounded-full flex items-center justify-center`}>
            <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
          </div>

          {/* 信任度标签 */}
          <div>
            <p className="text-caption text-neutral-700 uppercase tracking-wider mb-2">
              信任度
            </p>
            <div className={`text-hero md:text-6xl font-bold ${config.textColor} leading-tight`}>
              {displayConfidence}%
            </div>
          </div>

          {/* 评估结果 */}
          <div>
            <p className={`text-subtitle font-semibold ${config.textColor} mb-3`}>
              {config.label}
            </p>
            <p className="text-body text-neutral-700 leading-relaxed max-w-md mx-auto">
              {result.description}
            </p>
          </div>

          {/* 重新上传按钮 */}
          <div className="pt-4">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 px-6 py-3 text-body text-primary-500 hover:bg-primary-50 rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              重新上传
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};