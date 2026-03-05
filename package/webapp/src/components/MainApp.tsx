import React, { useState } from 'react'
import { analyzeVideo } from '../lib/api'
import { ArrowLeft, Shield } from 'lucide-react'
import UploadZone from './UploadZone'
import ProgressBar from './ProgressBar'
import ResultDisplay from './ResultDisplay'

const MainApp: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<{
    confidence: number
    status: 'very-trusted' | 'trusted' | 'untrusted'
    message: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setAnalysisResult(null)
    setAnalysisProgress(0)
    setError(null)
  }

  const handleStartAnalysis = async () => {
    if (!selectedFile) return
    console.log('开始分析文件:', selectedFile.name)
    try {
      setError(null)
      setIsAnalyzing(true)
      setAnalysisProgress(0)

      const timer = setInterval(() => {
        setAnalysisProgress(p => Math.min(90, p + Math.random()*15))
      }, 400)

      console.log('调用 analyzeVideo...')
      const { confidence, label } = await analyzeVideo(selectedFile)
      console.log('分析结果:', { confidence, label })
      clearInterval(timer)

      setAnalysisProgress(100)
      let status: 'very-trusted' | 'trusted' | 'untrusted'
      if (confidence >= 80) status = 'very-trusted'
      else if (confidence >= 50) status = 'trusted'
      else status = 'untrusted'

      setAnalysisResult({ confidence, status, message: label })
    } catch (err: any) {
      console.error('分析错误:', err)
      setError(err.message || '分析失败')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleBackToWelcome = () => {
    window.location.reload()
  }

  const handleResetAnalysis = () => {
    setSelectedFile(null)
    setAnalysisResult(null)
    setAnalysisProgress(0)
    setError(null)
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* 顶部导航 */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBackToWelcome}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              智能检测AI换脸
            </h1>
          </div>
          
          <div className="w-20"></div> {/* 占位符保持居中 */}
        </div>

        {/* 主要内容区域 */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          {!analysisResult ? (
            <>
              {/* 错误提示 */}
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700">
                  <p className="font-medium">错误</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* 上传区域 */}
              <div className="mb-8">
                <UploadZone
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  disabled={isUploading || isAnalyzing}
                />
              </div>

              {/* 分析按钮 */}
              <div className="text-center mb-8">
                <button
                  onClick={handleStartAnalysis}
                  disabled={!selectedFile || isUploading || isAnalyzing}
                  className={`py-4 px-12 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    selectedFile && !isUploading && !isAnalyzing
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isUploading ? '上传中...' : isAnalyzing ? '分析中...' : '开始分析'}
                </button>
              </div>

              {/* 进度条 */}
              {(isUploading || isAnalyzing) && (
                <div className="mb-8">
                  <ProgressBar progress={analysisProgress} />
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {isUploading && '正在上传视频...'}
                    {isAnalyzing && analysisProgress < 30 && '正在下载视频...'}
                    {isAnalyzing && analysisProgress >= 30 && analysisProgress < 50 && '正在预处理视频...'}
                    {isAnalyzing && analysisProgress >= 50 && analysisProgress < 70 && '正在进行模型推理...'}
                    {isAnalyzing && analysisProgress >= 70 && '即将完成...'}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* 结果展示 */}
              <ResultDisplay result={analysisResult} />
              
              {/* 重新分析按钮 */}
              <div className="text-center mt-8">
                <button
                  onClick={handleResetAnalysis}
                  className="py-3 px-8 rounded-xl font-medium text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                  重新上传视频
                </button>
              </div>
            </>
          )}
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>支持格式：MP4、AVI、MOV、MKV | 最大文件：500MB</p>
          {/* {analysisId && (
            <p className="mt-2 text-xs">分析ID: {analysisId}</p>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default MainApp
