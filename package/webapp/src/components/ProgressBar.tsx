import React from 'react'
import { Brain, Cpu, Eye } from 'lucide-react'

interface ProgressBarProps {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const getCurrentStage = () => {
    if (progress < 30) return { icon: Brain, text: '正在加载AI模型...', color: 'text-blue-600' }
    if (progress < 60) return { icon: Cpu, text: '正在处理视频帧...', color: 'text-purple-600' }
    if (progress < 90) return { icon: Eye, text: '正在进行深度分析...', color: 'text-green-600' }
    return { icon: Eye, text: '生成检测报告...', color: 'text-emerald-600' }
  }

  const stage = getCurrentStage()
  const Icon = stage.icon

  return (
    <div className="space-y-4">
      {/* 进度信息 */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <Icon className={`w-6 h-6 ${stage.color}`} />
          <span className={`text-lg font-semibold ${stage.color}`}>
            {stage.text}
          </span>
        </div>
        <p className="text-gray-600">预计还需 {Math.max(0, Math.ceil((100 - progress) / 10))} 秒</p>
      </div>

      {/* 进度条 */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* 脉动效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        {/* 进度百分比 */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          <span className="text-sm text-gray-500">完成</span>
        </div>
      </div>

      {/* 分析步骤指示器 */}
      <div className="flex justify-center space-x-8 mt-6">
        <div className={`flex flex-col items-center space-y-2 ${progress >= 30 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            progress >= 30 ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            <Brain className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">模型加载</span>
        </div>
        
        <div className={`flex flex-col items-center space-y-2 ${progress >= 60 ? 'text-purple-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            progress >= 60 ? 'bg-purple-100' : 'bg-gray-100'
          }`}>
            <Cpu className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">视频处理</span>
        </div>
        
        <div className={`flex flex-col items-center space-y-2 ${progress >= 90 ? 'text-green-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            progress >= 90 ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            <Eye className="w-4 h-4" />
          </div>
          <span className="text-xs font-medium">深度分析</span>
        </div>
        
        <div className={`flex flex-col items-center space-y-2 ${progress >= 100 ? 'text-emerald-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            progress >= 100 ? 'bg-emerald-100' : 'bg-gray-100'
          }`}>
            <div className="w-2 h-2 bg-current rounded-full"></div>
          </div>
          <span className="text-xs font-medium">结果生成</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar