import React, { useCallback, useState } from 'react'
import { Upload, FileVideo, X } from 'lucide-react'

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  disabled?: boolean
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, selectedFile, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (disabled) return

    const files = Array.from(e.dataTransfer.files)
    const videoFile = files.find(file => file.type.startsWith('video/'))
    
    if (videoFile) {
      if (videoFile.size > 500 * 1024 * 1024) { // 500MB
        alert('文件大小不能超过500MB')
        return
      }
      onFileSelect(videoFile)
    } else {
      alert('请上传视频文件')
    }
  }, [onFileSelect, disabled])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 500 * 1024 * 1024) { // 500MB
        alert('文件大小不能超过500MB')
        return
      }
      if (!file.type.startsWith('video/')) {
        alert('请选择视频文件')
        return
      }
      onFileSelect(file)
    }
  }, [onFileSelect])

  const removeFile = () => {
    // 这里可以添加清除文件的逻辑
    window.location.reload()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="w-full">
      {!selectedFile ? (
        /* 上传区域 */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            isDragOver
              ? 'border-blue-500 bg-blue-50/50'
              : disabled
              ? 'border-gray-200 bg-gray-50/50 cursor-not-allowed'
              : 'border-gray-300 bg-gray-50/30 hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer'
          }`}
          onClick={() => !disabled && document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept="video/*"
            onChange={handleFileInput}
            className="hidden"
            disabled={disabled}
          />
          
          <div className="space-y-4">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
              isDragOver ? 'bg-blue-100' : 'bg-gray-100'
            }`}>
              <Upload className={`w-8 h-8 ${isDragOver ? 'text-blue-600' : 'text-gray-400'}`} />
            </div>
            
            <div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                {isDragOver ? '释放文件以上传' : '上传视频'}
              </p>
              <p className="text-gray-500">
                拖拽视频文件到此处，或 <span className="text-blue-600 font-medium">点击选择文件</span>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                支持 MP4、AVI、MOV、MKV 格式，最大 500MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* 已选择文件显示 */
        <div className="border border-gray-200 rounded-2xl p-6 bg-white/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileVideo className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)} • {selectedFile.type}
                </p>
              </div>
            </div>
            
            <button
              onClick={removeFile}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              disabled={disabled}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadZone