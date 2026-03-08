# Deepfake Detection - 后端服务

基于 PyTorch 的深度学习视频真伪检测服务

## 功能特性

- 视频文件上传和处理
- 基于深度学习的 Deepfake 检测
- 实时推理结果返回
- 本地文件系统处理
- RESTful API 接口

## 技术栈

- **框架**: FastAPI
- **深度学习**: PyTorch + TorchVision
- **视频处理**: OpenCV
- **异步处理**: Python asyncio
- **文件上传**: python-multipart

## 项目结构

```
backend/
├── api/                    # FastAPI应用
│   └── main.py            # 主API入口
├── models/                # 深度学习模型
│   ├── detection.py       # 模型定义和推理
│   ├── train.py           # 训练脚本
│   └── deepfake_detector.pth  # 模型权重文件
├── utils/                 # 工具函数
│   ├── video_processor.py # 视频处理
│   └── model_inference.py # 模型推理（已迁移到models/）
└── requirements.txt       # Python依赖
```

## 快速开始

### 1. 安装依赖

```bash
cd backend
pip install -r requirements-prod.txt
```

兼容说明：`requirements.txt` 保留历史依赖列表；推荐部署使用 `requirements-prod.txt`。

### 2. 训练模型（可选）

如果需要训练占位模型：

```bash
python models/train.py
```

### 3. 启动服务

```bash
python api/main.py
```

服务将在 `http://localhost:8000` 启动

### 4. 查看API文档

访问 `http://localhost:8000/docs` 查看自动生成的API文档

## API 接口

### 1. 健康检查

```
GET /health
```

返回服务状态和模型加载情况

**响应示例**:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "device": "cpu"
}
```

### 2. 视频分析

```
POST /api/analyze
Content-Type: multipart/form-data
```

**请求参数**:
- `file`: 视频文件（支持 MP4、AVI、MOV、MKV，最大500MB）

**响应示例**:
```json
{
  "analysis_id": "uuid-string",
  "confidence_score": 85.3,
  "result_label": "真实视频"
}
```

**错误响应示例**:
```json
{
  "error": {
    "code": "UNSUPPORTED_FILE_TYPE",
    "message": "unsupported file extension: .txt. allowed: .avi, .mkv, .mov, .mp4"
  }
}
```

## 模型说明

### 当前模型

项目使用简单的 CNN 模型进行演示。实际生产环境中，建议使用以下模型架构：

- **EfficientNet**: 轻量级且高效
- **ResNet50/101**: 经典且稳定
- **XceptionNet**: 专门用于 Deepfake 检测
- **FaceForensics++**: 专业的伪造检测模型

### 模型架构

```python
DeepfakeDetectorCNN:
- 输入: 224x224 RGB图像
- 特征提取: 4层卷积 + MaxPool
- 分类器: 3层全连接网络
- 输出: 2类概率 (真实/伪造)
```

### 模型切换

推理层已支持适配器模式，可通过环境变量切换模型实现：

```bash
set MODEL_NAME=cnn
set MODEL_PATH=backend\\models\\deepfake_detector.pth
```

占位实现可用于联调验证：

```bash
set MODEL_NAME=xception_temporal_stub
```

### 训练自己的模型

1. 准备数据集（真实视频 + Deepfake 视频）
2. 修改 `models/train.py` 中的数据加载逻辑
3. 运行训练脚本：

```bash
python models/train.py
```

4. 模型权重将自动保存到 `models/deepfake_detector.pth`
5. 重启服务即可使用新模型

推荐数据集：
- FaceForensics++
- Celeb-DF
- DFDC (Deepfake Detection Challenge)

## 性能优化

- 使用批量处理提高吞吐量
- 缓存常用的模型推理结果
- 使用 TorchScript 优化模型
- 启用 GPU 加速（设置 `DEVICE=cuda`）
- 使用 ONNX Runtime 加速推理

## 注意事项

1. **视频大小限制**: 默认支持最大 500MB 的视频文件
2. **处理时间**: 取决于视频长度和服务器性能
3. **模型准确率**: 示例模型仅用于演示，实际项目需要训练专业模型
4. **内存使用**: 大视频文件会占用较多内存

## 故障排查

### 问题：模型加载失败

- 检查 `models/deepfake_detector.pth` 文件是否存在
- 确保 PyTorch 版本兼容性
- 检查模型文件是否损坏

### 问题：视频处理失败

- 检查 OpenCV 是否正确安装
- 确保视频格式支持（推荐 MP4）
- 检查视频文件是否损坏

### 问题：内存不足

- 减小 `MAX_FRAMES` 环境变量
- 增加 `FRAME_SAMPLE_RATE` 以减少处理帧数
- 使用更小的图像尺寸

## 开发团队

大三学生团队 - 大创项目

## 许可证

MIT License
- **ResNet50/101**: 经典且稳定
- **XceptionNet**: 专门用于 Deepfake 检测
- **FaceForensics++**: 专业的伪造检测模型

### 训练自己的模型

1. 准备数据集（真实视频 + Deepfake 视频）
2. 使用 PyTorch 训练模型
3. 保存模型权重到 `models/deepfake_detector.pth`
4. 更新 `utils/model_inference.py` 中的模型架构

推荐数据集：
- FaceForensics++
- Celeb-DF
- DFDC (Deepfake Detection Challenge)

## 部署建议

### Docker 部署

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "api/main.py"]
```

### 云函数部署

- AWS Lambda (需要容器化)
- Google Cloud Run
- Azure Functions

### GPU 加速

在生产环境中，建议使用 GPU 加速推理：

1. 安装 CUDA 版本的 PyTorch
2. 设置 `DEVICE=cuda` 在 `.env`
3. 使用支持 GPU 的云服务（AWS EC2 GPU 实例等）

## 性能优化

- 使用批量处理提高吞吐量
- 缓存常用的模型推理结果
- 使用 TorchScript 优化模型
- 启用 GPU 加速
- 使用 ONNX Runtime 加速推理

## 注意事项

1. **视频大小限制**: 默认支持最大 500MB 的视频文件
2. **处理时间**: 取决于视频长度和服务器性能
3. **模型准确率**: 示例模型仅用于演示，实际项目需要训练专业模型
4. **安全性**: 确保本地文件系统安全

## 故障排查

### 问题：模型加载失败

- 检查 `MODEL_PATH` 配置是否正确
- 确保模型文件存在
- 检查 PyTorch 版本兼容性

### 问题：视频处理失败

- 检查 OpenCV 是否正确安装
- 确保视频格式支持（推荐 MP4）
- 检查视频文件是否损坏

### 问题：本地服务连接失败

- 检查本地文件系统权限
- 确保网络连接正常
- 检查 Edge Function 是否正确部署

## 开发团队

大三学生团队 - 大创项目

## 许可证

MIT License
