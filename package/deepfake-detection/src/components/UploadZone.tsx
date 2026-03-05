import React, { useCallback } from 'react';
import { UploadCloud, Video, X } from 'lucide-react';

interface UploadZoneProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  isDragging?: boolean;
  onDragStateChange?: (isDragging: boolean) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ 
  file, 
  onFileSelect, 
  isDragging = false,
  onDragStateChange 
}) => {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    onDragStateChange?.(true);
  }, [onDragStateChange]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    onDragStateChange?.(false);
  }, [onDragStateChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    onDragStateChange?.(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      if (videoFile.size > 500 * 1024 * 1024) { // 500MB
        alert('文件大小不能超过500MB');
        return;
      }
      onFileSelect(videoFile);
    }
  }, [onFileSelect, onDragStateChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 500 * 1024 * 1024) { // 500MB
        alert('文件大小不能超过500MB');
        return;
      }
      onFileSelect(selectedFile);
    }
  }, [onFileSelect]);

  const removeFile = useCallback(() => {
    onFileSelect(null);
  }, [onFileSelect]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div
      className={`min-h-80 md:min-h-96 rounded-xl border-2 border-dashed transition-all duration-300 p-12 flex flex-col items-center justify-center cursor-pointer group ${
        isDragging
          ? 'border-primary-500 bg-primary-50/50'
          : file
          ? 'border-neutral-200 bg-glass-light backdrop-blur-lg'
          : 'border-glass-border bg-glass-light backdrop-blur-lg hover:border-primary-500 hover:bg-primary-50/30 hover:-translate-y-1 hover:shadow-glass-hover'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !file && document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="video/*"
        onChange={handleFileInput}
        className="hidden"
      />
      
      {file ? (
        // 已上传文件显示
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-success-100 rounded-full flex items-center justify-center">
            <Video className="w-8 h-8 text-success-500" />
          </div>
          <div>
            <p className="text-heading font-medium text-neutral-900 mb-2">
              {file.name}
            </p>
            <p className="text-small text-neutral-700 mb-4">
              {formatFileSize(file.size)}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-small text-error-500 hover:bg-error-100 rounded-full transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              删除文件
            </button>
          </div>
        </div>
      ) : (
        // 空状态显示
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors duration-300 ${
            isDragging ? 'bg-primary-100' : 'bg-neutral-100'
          }`}>
            <UploadCloud className={`w-8 h-8 transition-colors duration-300 ${
              isDragging ? 'text-primary-500' : 'text-neutral-700'
            }`} />
          </div>
          <div>
            <h3 className="text-heading font-medium text-neutral-900 mb-2">
              上传视频（不超过500MB）
            </h3>
            <p className="text-small text-neutral-700">
              支持拖拽或点击选择文件
            </p>
            <p className="text-caption text-neutral-500 mt-2">
              支持格式：MP4, AVI, MOV, WMV
            </p>
          </div>
        </div>
      )}
    </div>
  );
};