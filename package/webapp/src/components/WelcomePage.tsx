import React, { useState } from 'react'
import { Shield, Eye, CheckCircle } from 'lucide-react'

interface WelcomePageProps {
  onStartApp: () => void
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStartApp }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleStartClick = () => {
    if (agreedToTerms) {
      onStartApp()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 主要内容卡片 */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          {/* 图标和标题 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/20 rounded-full mb-6">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              智能检测AI换脸
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              基于深度学习的deepfake检测系统
            </p>
          </div>

          {/* 使用说明 */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">什么是Deepfake检测？</h3>
                <p className="text-gray-600 leading-relaxed">
                  Deepfake是一种使用人工智能技术制作的虚假视频或音频。我们的系统能够智能识别这类伪造内容，帮助您判断视频的真实性。
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">如何使用？</h3>
                <p className="text-gray-600 leading-relaxed">
                  1. 点击下方"确认使用"按钮进入应用<br/>
                  2. 上传您想要检测的视频文件（支持MP4、AVI、MOV等格式，最大500MB）<br/>
                  3. 点击"开始分析"，系统将自动处理并给出检测结果
                </p>
              </div>
            </div>
          </div>

          {/* 用户协议 */}
          <div className="mb-8">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-600 leading-relaxed">
                我已阅读并同意使用条款。本系统仅供学习和研究使用，请勿用于非法用途。
                上传的视频文件将被安全处理，不会被存储或分享给第三方。
              </span>
            </label>
          </div>

          {/* 开始按钮 */}
          <button
            onClick={handleStartClick}
            disabled={!agreedToTerms}
            className={`w-full py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 ${
              agreedToTerms
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            确认使用
          </button>
        </div>

        {/* 底部信息 */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>基于深度学习技术 | 支持多种视频格式 | 快速准确检测</p>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage