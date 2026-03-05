import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { NavigationBar } from './NavigationBar';
import { UploadZone } from './UploadZone';
import { ProgressBar } from './ProgressBar';
import { ResultCard } from './ResultCard';

interface AnalysisResult {
  confidence: number;
  level: 'very-trustworthy' | 'trustworthy' | 'untrustworthy';
  description: string;
}

export const MainApp: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleStartAnalysis = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setProgress(0);
    setResult(null);

    // 模拟分析过程
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // 生成模拟结果
          const confidence = Math.floor(Math.random() * 100);
          let level: AnalysisResult['level'];
          let description: string;

          if (confidence >= 80) {
            level = 'very-trustworthy';
            description = '视频内容高度可信，未检测到AI生成痕迹';
          } else if (confidence >= 50) {
            level = 'trustworthy';
            description = '视频内容基本可信，存在轻微异常特征';
          } else {
            level = 'untrustworthy';
            description = '检测到明显的AI生成痕迹，建议谨慎对待';
          }

          setTimeout(() => {
            setResult({ confidence, level, description });
            setIsAnalyzing(false);
          }, 500);

          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleReset = () => {
    setFile(null);
    setIsAnalyzing(false);
    setProgress(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      <NavigationBar />
      
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-title md:text-5xl font-display font-bold text-neutral-900 leading-tight mb-4">
            智能检测AI换脸
          </h1>
          <p className="text-body text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            上传您的视频文件，我们的AI系统将分析视频内容，检测是否存在AI换脸痕迹
          </p>
        </div>

        {/* 上传区域 */}
        <div className="mb-8">
          <UploadZone
            file={file}
            onFileSelect={setFile}
            isDragging={isDragging}
            onDragStateChange={setIsDragging}
          />
        </div>

        {/* 分析按钮 */}
        {!isAnalyzing && !result && (
          <div className="text-center mb-8">
            <button
              onClick={handleStartAnalysis}
              disabled={!file}
              className={`h-14 px-8 rounded-md font-semibold text-body transition-all duration-200 flex items-center justify-center gap-3 mx-auto ${
                file
                  ? 'bg-primary-500 text-white shadow-button hover:bg-primary-600 hover:shadow-button-hover hover:scale-105 active:scale-95'
                  : 'bg-neutral-200 text-neutral-700 cursor-not-allowed'
              }`}
            >
              <PlayCircle className="w-5 h-5" />
              开始分析
            </button>
          </div>
        )}

        {/* 进度条 */}
        <div className="mb-8">
          <ProgressBar progress={progress} isVisible={isAnalyzing} />
        </div>

        {/* 结果展示 */}
        {result && (
          <ResultCard
            result={result}
            isVisible={true}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};