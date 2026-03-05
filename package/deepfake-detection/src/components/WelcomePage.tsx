import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Info, Check } from 'lucide-react';

interface WelcomePageProps {
  onConfirm: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onConfirm }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 主卡片 */}
        <div className="bg-glass-emphasized backdrop-blur-2xl border border-glass-border rounded-2xl p-8 md:p-16 shadow-glass">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <h1 className="text-hero md:text-6xl font-display font-bold text-neutral-900 leading-tight mb-4">
              智能检测AI换脸
            </h1>
            <p className="text-subtitle md:text-xl text-neutral-700 leading-relaxed">
              基于深度学习的视频真伪鉴别工具
            </p>
          </div>

          {/* 使用说明 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-primary-500" />
              <h2 className="text-heading font-semibold text-neutral-900">什么是Deepfake检测？</h2>
            </div>
            <div className="text-body text-neutral-700 leading-relaxed space-y-3">
              <p>
                Deepfake是一种使用人工智能技术制作的虚假视频或音频内容，可以将一个人的面部特征
                替换到另一个人的脸上，制造看似真实的假象。
              </p>
              <p>
                我们的检测系统使用先进的深度学习算法，分析视频中的微妙特征变化，
                准确识别AI生成内容的痕迹，为您提供可靠的检测结果。
              </p>
            </div>
          </div>

          {/* 协议确认 */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  agreed 
                    ? 'bg-primary-500 border-primary-500' 
                    : 'border-neutral-300 group-hover:border-primary-500'
                }`}>
                  {agreed && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
              <span className="text-body text-neutral-700 leading-relaxed">
                我已阅读并同意用户协议，承诺上传的内容仅用于学术研究和教育目的
              </span>
            </label>
          </div>

          {/* 确认按钮 */}
          <button
            onClick={onConfirm}
            disabled={!agreed}
            className={`w-full h-14 px-8 rounded-md font-semibold text-body transition-all duration-200 flex items-center justify-center gap-3 ${
              agreed
                ? 'bg-primary-500 text-white shadow-button hover:bg-primary-600 hover:shadow-button-hover hover:scale-105 active:scale-95'
                : 'bg-neutral-200 text-neutral-700 cursor-not-allowed'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            确认使用
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};