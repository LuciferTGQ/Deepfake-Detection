import React, { useEffect, useState } from 'react'
import { Shield, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'

interface ResultDisplayProps {
  result: {
    confidence: number
    status: 'very-trusted' | 'trusted' | 'untrusted'
    message: string
  }
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const [displayedConfidence, setDisplayedConfidence] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedConfidence(result.confidence)
    }, 500)
    return () => clearTimeout(timer)
  }, [result.confidence])

  const getStatusConfig = () => {
    switch (result.status) {
      case 'very-trusted':
        return {
          icon: CheckCircle,
          title: '非常信任',
          subtitle: '未检测到AI换脸痕迹',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
          progressColor: 'from-green-400 to-emerald-500'
        }
      case 'trusted':
        return {
          icon: Shield,
          title: '比较信任',
          subtitle: '检测到轻微异常，建议进一步验证',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          borderColor: 'border-blue-200',
          progressColor: 'from-blue-400 to-cyan-500'
        }
      case 'untrusted':
        return {
          icon: AlertTriangle,
          title: '不可信',
          subtitle: '检测到明显的AI换脸特征',
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
          progressColor: 'from-red-400 to-pink-500'
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  const handleNewAnalysis = () => {
    window.location.reload()
  }

  return (
    <div className="text-center space-y-8">
      {/* 结果图标和标题 */}
      <div className="space-y-4">
        <div className={`inline-flex items-center justify-center w-20 h-20 ${config.bgColor} rounded-full`}>
          <Icon className={`w-10 h-10 ${config.color}`} />
        </div>
        
        <div>
          <h2 className={`text-3xl font-bold ${config.color} mb-2`}>
            {config.title}
          </h2>
          <p className="text-gray-600 text-lg">
            {config.subtitle}
          </p>
        </div>
      </div>

      {/* 信任度显示 */}
      <div className="space-y-4">
        <div className="relative">
          {/* 大号百分比 */}
          <div className="text-6xl md:text-7xl font-bold text-gray-800 mb-2">
            {displayedConfidence}%
          </div>
          
          {/* 进度环 */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* 背景圆环 */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              {/* 进度圆环 */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - displayedConfidence / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className="stop-color-blue-400" />
                  <stop offset="100%" className="stop-color-purple-500" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        <p className="text-gray-600">
          信任度：{displayedConfidence >= 80 ? '高' : displayedConfidence >= 60 ? '中' : '低'}
        </p>
      </div>

      {/* 详细分析结果 */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
        <h3 className="font-semibold text-gray-800 mb-3">分析详情</h3>
        <p className="text-gray-600 leading-relaxed">
          {result.message}
        </p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-medium text-gray-800">置信度</div>
            <div className="text-gray-600">{displayedConfidence}%</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-800">检测状态</div>
            <div className={`font-medium ${config.color}`}>{config.title}</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-800">处理时间</div>
            <div className="text-gray-600">约 3.2 秒</div>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleNewAnalysis}
          className="flex items-center justify-center space-x-2 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <RefreshCw className="w-5 h-5" />
          <span>重新分析</span>
        </button>
        
        <button className="py-3 px-6 bg-white/60 hover:bg-white/80 text-gray-700 rounded-xl font-semibold transition-all duration-300 border border-white/40">
          下载报告
        </button>
      </div>

      {/* 免责声明 */}
      <div className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
        <p>
          * 本检测结果仅供参考，建议结合其他证据进行综合判断。
          AI技术不断进步，检测结果可能存在误差。
          如有疑问，请咨询相关领域的专业人士。
        </p>
      </div>
    </div>
  )
}

export default ResultDisplay