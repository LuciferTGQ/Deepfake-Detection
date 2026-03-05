# 系统架构文档

## 1. 架构概览

Deepfake Detection 系统采用前后端分离的架构，包含两个主要组件：

1. **前端应用** (React SPA)
2. **Python AI服务** (深度学习推理)

系统完全本地运行，无需外部云服务依赖。

---

## 2. 架构图

### 2.1 系统架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                          客户端层                                │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │           React Web Application (SPA)                      │ │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐ │ │
│  │  │WelcomePage │  │  MainApp   │  │  Fetch API           │ │ │
│  │  │            │  │  - Upload  │  │  - HTTP POST         │ │ │
│  │  │            │  │  - Progress│  │  - File Upload       │ │ │
│  │  │            │  │  - Result  │  │  - Response          │ │ │
│  │  └────────────┘  └────────────┘  └──────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │ HTTP POST /api/analyze
                           │ multipart/form-data
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Python AI 服务                              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                FastAPI Application                         │ │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐ │ │
│  │  │ /api/analyze│  │VideoProcessor│  │  PyTorch Model     │ │ │
│  │  │  (接收文件) │  │  (OpenCV)   │  │  (CNN推理)         │ │ │
│  │  │            │  │  - 帧提取   │  │  - 加载权重         │ │ │
│  │  │            │  │  - 预处理   │  │  - 预测结果         │ │ │
│  │  └────────────┘  └────────────┘  └──────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                 本地文件系统                                 │ │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐ │ │
│  │  │临时视频文件│  │模型权重文件│  │  处理结果缓存         │ │ │
│  │  │  (temp/)   │  │ (.pth)     │  │  (memory)           │ │ │
│  │  └────────────┘  └────────────┘  └──────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 数据流图

```
1. 用户上传视频
   ↓
2. 前端 FormData 打包
   ↓
3. HTTP POST 到 /api/analyze
   ↓
4. FastAPI 接收文件
   ↓
5. 保存到临时目录
   ↓
6. VideoProcessor 提取帧
   ↓
7. PyTorch 模型推理
   ↓
8. 返回 JSON 结果
   ↓
9. 前端显示结果
   ↓
10. 清理临时文件
```

---

## 3. 组件详细说明

### 3.1 前端应用 (React + TypeScript)

**技术栈**:
- React 18 (函数组件 + Hooks)
- TypeScript (类型安全)
- TailwindCSS (样式框架)
- Vite (构建工具)
- Lucide React (图标库)

**主要组件**:
- `WelcomePage`: 用户协议和介绍
- `MainApp`: 主应用界面
- `UploadZone`: 文件拖拽上传
- `ProgressBar`: 分析进度显示
- `ResultDisplay`: 结果可视化

**通信方式**:
- Fetch API 发送 multipart/form-data
- 同步等待分析结果
- 错误处理和用户反馈

### 3.2 后端服务 (Python + FastAPI)

**技术栈**:
- FastAPI (异步Web框架)
- PyTorch (深度学习框架)
- OpenCV (视频处理)
- Uvicorn (ASGI服务器)

**核心模块**:
- `api/main.py`: FastAPI应用和路由
- `models/detection.py`: PyTorch模型定义和推理
- `utils/video_processor.py`: 视频帧提取
- `utils/model_inference.py`: 模型推理封装

**处理流程**:
1. 接收上传的视频文件
2. 提取关键帧 (默认10帧/秒)
3. 模型批量推理
4. 返回置信度和标签
5. 清理临时文件

### 3.3 模型架构

**CNN模型结构**:
```
输入: 224x224x3 RGB图像
↓
Conv2D(32) -> ReLU -> MaxPool2D
↓
Conv2D(64) -> ReLU -> MaxPool2D
↓
Conv2D(128) -> ReLU -> MaxPool2D
↓
Conv2D(256) -> ReLU -> MaxPool2D
↓
Flatten -> Linear(512) -> ReLU -> Dropout
↓
Linear(128) -> ReLU -> Dropout
↓
Linear(2) -> Softmax
输出: [真实概率, 伪造概率]
```

**推理流程**:
- 多帧平均预测
- 置信度计算
- 结果标签映射

---

## 4. 部署架构

### 4.1 开发环境

```
开发者机器
├── 前端开发服务器 (localhost:5173)
├── 后端API服务 (localhost:8000)
└── 本地文件系统
```

### 4.2 生产环境

#### 单机部署
```
服务器
├── Nginx (反向代理)
├── PM2 (进程管理)
├── 前端静态文件
└── Python应用 (systemd)
```

#### Docker部署
```
Docker Host
├── frontend容器 (nginx)
└── backend容器 (python)
```

---

## 5. 安全考虑

### 5.1 文件上传安全

- 文件类型验证 (MP4, AVI, MOV, MKV)
- 文件大小限制 (500MB)
- 服务器端内容检查
- 临时文件自动清理

### 5.2 API安全

- CORS配置 (仅允许前端域名)
- 请求大小限制
- 超时控制
- 错误信息过滤

### 5.3 数据安全

- 本地处理，无数据上传
- 临时文件加密存储
- 自动清理机制
- 无用户数据持久化

---

## 6. 性能优化

### 6.1 后端优化

- GPU加速支持
- 批量推理
- 内存池管理
- 异步处理

### 6.2 前端优化

- 代码分割
- 懒加载
- 缓存策略
- 响应式设计

### 6.3 系统优化

- 容器化部署
- 负载均衡
- 监控告警
- 日志轮转

---

## 7. 扩展性设计

### 7.1 模型扩展

- 插件化模型加载
- 支持多种架构
- 动态模型切换
- A/B测试框架

### 7.2 功能扩展

- 批量处理API
- 实时流处理
- 历史记录
- 用户管理系统

### 7.3 部署扩展

- 微服务拆分
- 分布式部署
- 云原生架构
- 边缘计算

---

## 8. 监控和运维

### 8.1 健康检查

- `/health` 端点
- 模型加载状态
- 系统资源监控

### 8.2 日志系统

- 结构化日志
- 错误追踪
- 性能指标
- 审计日志

### 8.3 告警机制

- 服务不可用
- 性能下降
- 磁盘空间不足
- 异常请求

---

## 9. 总结

本系统采用简洁高效的本地架构，具有以下优势：

- **独立性**: 无外部服务依赖
- **安全性**: 数据本地处理
- **可维护性**: 技术栈统一
- **扩展性**: 模块化设计
- **性能**: GPU加速支持

系统架构为后续功能扩展和性能优化提供了良好的基础。
   │
   ▼
4. 前端接收 analysisId
```

### 3.2 分析任务流程

```
1. 前端调用 start-analysis Edge Function
   │
   ▼
2. Edge Function 更新状态为 "analyzing"
   │
   ▼
3. 调用 Python AI 服务 /api/analyze
   │
   ▼
4. Python 服务启动后台任务
   │
   ├─▶ 下载视频文件
   │   └─ 更新状态: "downloading" (20%)
   │
   ├─▶ 提取视频帧
   │   └─ 更新状态: "preprocessing" (40%)
   │
   ├─▶ PyTorch 模型推理
   │   └─ 更新状态: "inferencing" (60%)
   │
   └─▶ 计算置信度和结果标签
       └─ 更新状态: "completed" (100%)
   │
   ▼
5. 每次状态更新调用 update-analysis-status
   │
   ▼
6. 更新 analysis_records 表
   │
   ▼
7. 本地文件处理完成，返回结果
   │
   ▼
8. 前端更新 UI（进度条、结果）
```

---

## 4. 组件详细设计

### 4.1 前端组件

#### 目录结构
```
webapp/src/
├── components/
│   ├── WelcomePage.tsx      # 欢迎页（协议确认）
│   ├── MainApp.tsx          # 主应用（状态管理）
│   ├── UploadZone.tsx       # 文件上传区
│   ├── ProgressBar.tsx      # 进度条
│   └── ResultDisplay.tsx    # 结果展示
├── lib/
│   └── api.ts              # 本地API通信
├── styles/
│   └── globals.css          # 全局样式
└── App.tsx                  # 根组件
```

#### 状态管理
```typescript
// MainApp.tsx 状态
{
  selectedFile: File | null,
  isUploading: boolean,
  isAnalyzing: boolean,
  analysisId: string | null,
  analysisProgress: number,     // 0-100
  analysisResult: {
    confidence: number,         // 0-100
    status: 'very-trusted' | 'trusted' | 'untrusted',
    message: string
  } | null,
  error: string | null
}
```

#### HTTP通信
```typescript
// 发送视频分析请求
const formData = new FormData()
formData.append('file', videoFile)

const response = await fetch('/api/analyze', {
  method: 'POST',
  body: formData
})

const result = await response.json()
```

### 4.2 本地Python后端

#### 数据库表结构

```sql
CREATE TABLE analysis_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  video_filename TEXT NOT NULL,
  video_url TEXT NOT NULL,
  video_size BIGINT,
  status TEXT NOT NULL DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  confidence_score NUMERIC(5,2),
  result_label TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);
```

#### RLS策略

```sql
-- 公开读取
CREATE POLICY "Allow public read access" 
ON analysis_records FOR SELECT 
USING (true);

-- 允许Edge Function插入
CREATE POLICY "Allow insert via edge function" 
ON analysis_records FOR INSERT 
WITH CHECK (
  auth.role() = 'anon' OR auth.role() = 'service_role'
);

-- 允许更新
CREATE POLICY "Allow update via edge function" 
ON analysis_records FOR UPDATE 
USING (
  auth.role() = 'anon' OR auth.role() = 'service_role'
);
```

#### Edge Functions

**upload-video**:
```typescript
// 功能: 处理视频上传
// 输入: { videoData: base64, fileName: string }
// 输出: { analysisId, publicUrl }
// 操作:
//   1. Base64解码
//   2. 上传到Storage
//   3. 创建analysis_records
```

**start-analysis**:
```typescript
// 功能: 触发分析任务
// 输入: { analysisId: uuid }
// 输出: { status: 'analyzing' }
// 操作:
//   1. 更新状态
//   2. 调用Python API
```

**update-analysis-status**:
```typescript
// 功能: 更新分析状态
// 输入: { analysisId, status, progress, ... }
// 输出: { success: true }
// 操作:
//   1. 更新数据库
//   2. 触发Realtime推送
```

### 4.3 Python AI服务

#### API端点

```python
# FastAPI应用
@app.get("/")              # 服务信息
@app.get("/health")        # 健康检查
@app.post("/api/analyze")  # 视频分析
```

#### 处理流程

```python
async def process_video_analysis(analysis_id, video_url):
    # 1. 下载视频
    video_path = await video_processor.download_video(video_url)
    
    # 2. 提取帧
    frames = await video_processor.extract_frames(video_path)
    
    # 3. 模型推理
    confidence, label = await model_inference.predict(frames)
    
    # 4. 更新状态
    # 5. 返回结果
    return {
        'analysis_id': analysis_id,
        'confidence_score': confidence,
        'result_label': label
    }
```

#### 模型架构

```python
class DeepfakeDetectorCNN(nn.Module):
    def __init__(self):
        # 4层卷积 + 池化
        self.features = nn.Sequential(
            Conv2d(3, 32, 3) → ReLU → MaxPool,
            Conv2d(32, 64, 3) → ReLU → MaxPool,
            Conv2d(64, 128, 3) → ReLU → MaxPool,
            Conv2d(128, 256, 3) → ReLU → MaxPool
        )

        # 3层全连接
        self.classifier = nn.Sequential(
            Linear(256*14*14, 512) → ReLU → Dropout,
            Linear(512, 128) → ReLU → Dropout,
            Linear(128, 2)  # 2类: 真实/伪造
        )
```

---

## 5. 安全设计

### 5.1 本地安全

```
客户端 → 本地Python服务
├─ HTTP通信（localhost）
└─ 文件直接上传

Python服务 → 本地文件系统
├─ 临时文件处理
└─ 自动清理机制

### 5.2 数据安全

1. **RLS策略**: 行级安全控制
2. **API密钥管理**: 前端只使用Anon Key
3. **CORS配置**: 限制跨域访问
4. **文件验证**: 类型和大小检查

---

## 6. 性能优化

### 6.1 前端优化

1. **代码分割**: React.lazy动态导入
2. **图片优化**: WebP格式，懒加载
3. **缓存策略**: Service Worker
4. **CDN**: 静态资源加速

### 6.2 后端优化

1. **异步处理**: FastAPI异步端点
2. **批量推理**: 一次处理多帧
3. **结果缓存**: Redis缓存
4. **GPU加速**: CUDA支持

---

## 7. 可扩展性

### 7.1 水平扩展

```
负载均衡器
    ├─ Python服务实例1
    ├─ Python服务实例2
    └─ Python服务实例N
```

### 7.2 功能扩展

1. **用户系统**: 本地无用户系统
2. **批量上传**: 多文件队列
3. **历史记录**: 用户dashboard
4. **导出报告**: PDF生成

---

## 8. 监控和日志

### 8.1 日志记录

```python
# Python服务
logger.info(f"分析任务: {analysis_id}")
logger.error(f"失败: {error}")

# Edge Functions
console.log('视频上传:', fileName)
console.error('错误:', error)
```

### 8.2 监控指标

1. **系统指标**: CPU、内存、磁盘
2. **应用指标**: 响应时间、错误率
3. **业务指标**: 分析成功率、用户数

---

## 9. 部署架构

### 9.1 生产环境

```
Vercel/Netlify (前端)
    ↓ HTTPS
本地服务器 (Python AI)
    ├─ Nginx (反向代理)
    ├─ systemd (进程管理)
    └─ SSL/TLS (加密)
```

### 9.2 容器化部署

```yaml
# docker-compose.yml
services:
  api:
    image: deepfake-api
    ports:
      - "8000:8000"
    volumes:
      - ./models:/app/models
```

---

## 10. 技术债务和改进

### 10.1 已知限制

1. **模型**: 示例CNN，需要训练
2. **文件大小**: 500MB限制（本地处理）
3. **并发**: 单实例处理能力有限

### 10.2 改进计划

1. **短期**:
   - 训练专业模型
   - 增加文件大小限制
   - 添加结果缓存

2. **中期**:
   - 实现用户认证
   - 添加批量处理
   - GPU加速部署

3. **长期**:
   - 微服务架构
   - 分布式任务队列
   - 多模型集成

---

**文档版本**: 1.0  
**最后更新**: 2025-11-05  
**维护者**: MiniMax Agent
