# Deepfake Detection - AI视频真伪检测系统

一个基于深度学习的智能视频真伪检测平台，专为识别AI换脸（Deepfake）内容设计。

## 当前实现说明（2026-03）

- 正式联调前端: `webapp/`
- `deepfake-detection/` 目录是纯 UI 演示版本（默认不调用后端接口）
- 后端推理已改为适配器模式，可通过环境变量切换模型实现

## 项目信息

- **项目类型**: 大学生创新创业训练计划（大创项目）
- **开发团队**: 大三学生团队（3人）
- **技术方向**: 人工智能 + Web全栈开发
- **完成时间**: 2025年

---

## 核心功能

### 1. 视频上传
- 支持拖拽上传和点击选择
- 文件大小限制：最大500MB
- 支持格式：MP4、AVI、MOV、MKV

### 2. 智能分析
- 深度学习模型推理
- 实时进度更新
- 准确的置信度评分（0-100%）

### 3. 结果展示
- 直观的可视化界面
- 三级信任度评估：
  - 非常信任（≥80%）
  - 比较信任（50-79%）
  - 不可信（<50%）
- 详细的分析说明

---

## 技术架构

### 前端技术栈
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: TailwindCSS (Glassmorphism 玻璃态设计)
- **UI库**: Lucide React (图标)
- **HTTP通信**: Fetch API

### 后端技术栈
- **框架**: Python FastAPI
- **深度学习**: PyTorch + TorchVision
- **视频处理**: OpenCV
- **异步处理**: Python asyncio
- **文件上传**: python-multipart

### AI模型
- **架构**: CNN (Convolutional Neural Network)
- **框架**: PyTorch
- **输入**: 视频帧序列（224x224）
- **输出**: 二分类（真实/伪造）+ 置信度

---

## 系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        用户浏览器                            │
│                  (React + TailwindCSS)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP POST /api/analyze
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   Python AI 服务                             │
│                    (FastAPI)                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  1. 接收视频  →  2. 帧提取  →  3. 模型推理  →  4. 返回结果 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │VideoProcessor│  │ PyTorch Model│  │   File System    │ │
│  │  (OpenCV)    │  │     (CNN)    │  │  (临时文件)      │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 项目结构

```
deepfake-detection/
├── webapp/                    # 前端应用
│   ├── src/
│   │   ├── components/       # React组件
│   │   │   ├── WelcomePage.tsx
│   │   │   ├── MainApp.tsx
│   │   │   ├── UploadZone.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── ResultDisplay.tsx
│   │   ├── lib/
│   │   │   ├── api.ts        # API通信
│   │   │   └── utils.ts      # 工具函数
│   │   ├── styles/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                   # Python AI服务
│   ├── api/
│   │   └── main.py           # FastAPI应用
│   ├── models/               # PyTorch模型
│   │   ├── detection.py      # 模型定义和推理
│   │   ├── train.py          # 训练脚本
│   │   └── deepfake_detector.pth  # 模型权重
│   ├── utils/
│   │   ├── video_processor.py # 视频处理
│   │   └── model_inference.py # 模型推理（已迁移）
│   ├── requirements.txt      # Python依赖
│   └── README.md
│
└── docs/                      # 文档
    ├── deployment-guide.md    # 部署指南
    ├── design-specification.md
    └── content-structure-plan.md
```

---

## 快速开始

### 前置要求
- Node.js 18+
- Python 3.9+
- pip (Python包管理器)

### 1. 克隆项目

```bash
git clone <repository-url>
cd deepfake-detection
```

### 2. 后端设置

```bash
cd backend
pip install -r requirements-prod.txt
python models/train.py  # 训练占位模型（可选）
python api/main.py
```

可选环境变量：

- `MODEL_NAME=cnn`（默认）或 `MODEL_NAME=xception_temporal_stub`
- `MODEL_PATH=<weights_path>` 指定权重路径
- `MAX_UPLOAD_BYTES=524288000` 上传大小限制（默认500MB）

API服务运行在 `http://localhost:8000`

### 3. 前端设置

```bash
cd ../webapp
npm install
npm run dev
```

前端应用运行在 `http://localhost:5173`

### 4. 使用应用

1. 打开浏览器访问 `http://localhost:5173`
2. 阅读并同意用户协议
3. 选择或拖拽视频文件
4. 点击"开始分析"
5. 查看检测结果

---

## API 接口

### 健康检查
```http
GET /health
```

### 视频分析
```http
POST /api/analyze
Content-Type: multipart/form-data

file: <video_file>
```

响应：
```json
{
  "analysis_id": "uuid",
  "confidence_score": 85.3,
  "result_label": "真实视频"
}
```

---

## 模型训练

训练工作流已建议迁移到 `research/`，与部署后端分离。

### 训练环境

```bash
cd research
pip install -r requirements-train.txt
```

### 训练占位模型（当前使用）

```bash
cd backend
python models/train.py
```

### 训练真实模型

1. 准备数据集（真实视频和Deepfake视频）
2. 在 `research/` 下进行训练和评估
3. 导出权重与预处理配置
4. 使用 `MODEL_PATH` 将导出权重接入后端推理

---

## 部署

详细部署指南请参考: [docs/deployment-guide.md](docs/deployment-guide.md)

### 本地部署清单

- ✅ Python 环境配置
- ✅ PyTorch 和相关依赖安装
- ✅ 模型训练和加载
- ✅ FastAPI 服务启动
- ✅ 前端构建和运行
- ✅ CORS 配置正确

---

## 功能演示

### 本地演示

1. 启动后端服务：`python api/main.py`
2. 启动前端应用：`npm run dev`
3. 上传视频文件进行检测

### 支持的视频格式

- MP4
- AVI
- MOV
- MKV

最大文件大小：500MB

---

## 开发团队

大三学生团队 - 大创项目

## 许可证

MIT License
- **前端应用**: https://w4exuqo5onjm.space.minimaxi.com
- **API文档**: (部署后可用)

### 使用流程

1. **欢迎页**
   - 阅读使用说明
   - 同意用户协议
   - 点击"确认使用"

2. **上传视频**
   - 拖拽视频文件到上传区域
   - 或点击选择文件
   - 等待上传完成

3. **开始分析**
   - 点击"开始分析"按钮
   - 观察实时进度更新
   - 等待分析完成

4. **查看结果**
   - 查看置信度分数
   - 了解信任度评级
   - 阅读详细说明

---

## API接口文档

### 前端调用的本地API接口

#### 1. 上传视频
```
POST /functions/v1/upload-video
```

请求体:
```json
{
  "videoData": "data:video/mp4;base64,...",
  "fileName": "video.mp4"
}
```

响应:
```json
{
  "data": {
    "analysisId": "uuid",
    "publicUrl": "https://..."
  }
}
```

#### 2. 开始分析
```
POST /functions/v1/start-analysis
```

请求体:
```json
{
  "analysisId": "uuid"
}
```

响应:
```json
{
  "data": {
    "analysisId": "uuid",
    "status": "analyzing",
    "message": "分析已开始"
  }
}
```

### Python AI服务接口

#### 1. 健康检查
```
GET /health
```

响应:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "device": "cpu"
}
```

#### 2. 视频分析
```
POST /api/analyze
```

请求体:
```json
{
  "analysis_id": "uuid",
  "video_url": "https://...",
  "callback_url": "https://..."
}
```

响应:
```json
{
  "status": "accepted",
  "analysis_id": "uuid",
  "message": "分析任务已加入队列"
}
```

---

## 数据库设计

### analysis_records 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| user_id | UUID | 用户ID（可选）|
| video_filename | TEXT | 视频文件名 |
| video_url | TEXT | 视频URL |
| video_size | BIGINT | 文件大小（字节）|
| status | TEXT | 状态 |
| progress | INTEGER | 进度（0-100）|
| confidence_score | NUMERIC(5,2) | 置信度分数 |
| result_label | TEXT | 结果标签 |
| error_message | TEXT | 错误信息 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |
| completed_at | TIMESTAMP | 完成时间 |

### 状态流转

```
pending → uploaded → downloading → preprocessing → 
analyzing → inferencing → completed/failed
```

---

## 模型训练指南

### 1. 数据准备

推荐数据集:
- **FaceForensics++**: 1000+ 真实和伪造视频
- **Celeb-DF**: 高质量深度伪造数据集
- **DFDC**: Facebook的深度伪造检测挑战数据集

### 2. 模型架构

当前使用简单的CNN，推荐升级为:
- **EfficientNet-B0**: 轻量高效
- **ResNet50**: 经典可靠
- **XceptionNet**: 专门用于Deepfake检测
- **MesoNet**: 专业的伪造检测网络

### 3. 训练流程

```python
# 示例训练代码（简化版）
import torch
import torch.nn as nn
from torch.utils.data import DataLoader

# 1. 加载数据
train_loader = DataLoader(train_dataset, batch_size=32)

# 2. 初始化模型
model = DeepfakeDetectorCNN()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

# 3. 训练循环
for epoch in range(50):
    for videos, labels in train_loader:
        outputs = model(videos)
        loss = criterion(outputs, labels)
        
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

# 4. 保存模型
torch.save(model.state_dict(), 'deepfake_detector.pth')
```

### 4. 模型评估

关键指标:
- **准确率 (Accuracy)**: 整体预测正确率
- **精确率 (Precision)**: 预测为伪造的准确性
- **召回率 (Recall)**: 找出所有伪造视频的能力
- **F1分数**: 精确率和召回率的调和平均
- **AUC-ROC**: 分类性能综合指标

---

## 性能指标

### 当前性能
- **处理速度**: ~2-5分钟/视频（取决于长度）
- **准确率**: 示例模型（未训练）
- **支持并发**: 根据服务器配置

### 优化建议
1. 使用GPU加速（提升10-50倍）
2. 模型量化（减少内存占用）
3. 批处理优化（提高吞吐量）
4. 缓存机制（避免重复分析）

---

## 故障排查

### 常见问题

**Q: 视频上传失败**  
A: 检查文件大小(<500MB)、格式(MP4)和网络连接

**Q: 分析进度卡住**  
A: 查看Python服务日志，确保服务正常运行

**Q: 前端无法连接后端**  
A: 检查后端服务是否正在运行在localhost:8000，确认防火墙设置

详细故障排查请参考: [docs/deployment-guide.md#故障排查](docs/deployment-guide.md#六故障排查)

---

## 安全性

### 已实施的安全措施

1. **数据安全**
   - RLS (Row Level Security) 策略
   - Service Role Key仅在后端使用
   - 文件类型验证

2. **API安全**
   - CORS配置
   - 请求速率限制（建议添加）
   - 输入验证

3. **存储安全**
   - 公开读取，受控写入
   - 文件大小限制
   - 自动过期清理（建议添加）

---

## 贡献指南

欢迎提交Issue和Pull Request！

### 开发规范
- 使用TypeScript进行类型检查
- 遵循ESLint规则
- 提交前运行测试
- 清晰的commit信息

---

## 许可证

MIT License

---

## 致谢

- **本地架构**: 无需外部服务依赖
- **PyTorch**: 强大的深度学习框架
- **OpenCV**: 视频处理工具
- **FastAPI**: 高性能Python Web框架
- **React**: 现代前端框架

---

## 联系方式

**项目**: Deepfake Detection AI换脸检测系统  
**团队**: 大三学生团队（3人）  
**类型**: 大学生创新创业训练计划项目  

---

**⭐ 如果这个项目对你有帮助，请给我们一个Star！**
