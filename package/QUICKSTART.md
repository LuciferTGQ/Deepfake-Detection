# Deepfake Detection - 快速开始指南

## 📋 项目概述

这是一个基于深度学习的AI换脸检测系统，能够分析视频文件并判断其真实性。

**技术栈**:
- 前端：React + TypeScript + TailwindCSS
- 后端：Python FastAPI + PyTorch + OpenCV
- 架构：本地全栈应用，无需云服务

## 🚀 快速启动（3分钟）

### 1. 环境检查

确保安装以下软件：

- **Python 3.9+**: [下载](https://www.python.org/downloads/)
- **Node.js 18+**: [下载](https://nodejs.org/)
- **Git**: [下载](https://git-scm.com/)

验证安装：

```bash
python --version  # 应显示 3.9+
node --version    # 应显示 18+
npm --version     # 应显示 8+
```

### 2. 下载项目

```bash
git clone <repository-url>
cd deepfake-detection
```

### 3. 启动后端服务

```bash
cd backend

# 安装Python依赖
pip install -r requirements.txt

# 训练占位模型（可选，生成模型文件）
python models/train.py

# 启动API服务
python api/main.py
```

✅ 后端服务运行在：`http://localhost:8000`

### 4. 启动前端应用

打开新终端窗口：

```bash
cd webapp

# 安装Node.js依赖
npm install

# 启动开发服务器
npm run dev
```

✅ 前端应用运行在：`http://localhost:5173`

### 5. 开始使用

1. 打开浏览器访问 `http://localhost:5173`
2. 阅读并同意用户协议
3. 上传视频文件（支持 MP4、AVI、MOV、MKV，最大500MB）
4. 点击"开始分析"
5. 查看检测结果和置信度评分

## 📁 项目结构

```
deepfake-detection/
├── backend/              # Python后端
│   ├── api/main.py      # FastAPI服务
│   ├── models/          # PyTorch模型
│   ├── utils/           # 工具函数
│   └── requirements.txt # Python依赖
├── webapp/              # React前端
│   ├── src/components/  # UI组件
│   ├── src/lib/         # API和工具
│   └── package.json     # Node.js依赖
├── docs/                # 文档
└── README.md           # 项目说明
```

## 🔧 高级配置

### GPU加速（可选）

如果有NVIDIA GPU，可以启用CUDA加速：

```bash
# 安装CUDA版本的PyTorch
pip uninstall torch torchvision
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

### 自定义模型

替换 `backend/models/deepfake_detector.pth` 文件即可使用自己的训练模型。

训练脚本：
```bash
cd backend
python models/train.py  # 使用真实数据集
```

## ❓ 故障排查

### 问题：后端启动失败

```bash
# 检查Python版本
python --version

# 检查依赖安装
pip list | grep torch

# 检查端口占用
netstat -ano | findstr :8000
```

### 问题：前端空白

- 确认后端服务正在运行
- 检查浏览器开发者工具的Console错误
- 确认Node.js版本 ≥ 18

### 问题：模型加载失败

```bash
cd backend
python models/train.py  # 重新训练模型
```

## 📞 获取帮助

- 查看详细文档：`docs/deployment-guide.md`
- 检查GitHub Issues
- 联系开发团队

## 🎯 功能特性

- ✅ 视频文件上传和分析
- ✅ 深度学习模型推理
- ✅ 实时进度显示
- ✅ 直观的结果展示
- ✅ 本地离线运行
- ✅ 支持多种视频格式

---

## 🚢 部署（生产环境）

### 本地部署

```bash
# 1. 启动后端
cd backend
python api/main.py &

# 2. 启动前端
cd webapp
npm install
npm run build
npm run preview
```

### Docker部署

```bash
# 构建镜像
docker build -t deepfake-detection .

# 运行容器
docker run -p 8000:8000 -p 5173:5173 deepfake-detection
```

**详细部署指南**: `docs/deployment-guide.md`

---

## 📚 完整文档

| 文档 | 说明 |
|------|------|
| `README.md` | 项目总览和API文档 |
| `PROJECT_DELIVERY.md` | 完整交付清单 |
| `docs/deployment-guide.md` | 详细部署指南 |
| `docs/frontend-installation.md` | 前端安装指南 |
| `docs/architecture.md` | 系统架构说明 |
| `backend/README.md` | 后端服务说明 |

---

## 🔍 故障排查

### 问题: 前端无法连接后端

**检查**:
1. 后端服务是否正在运行在localhost:8000
2. 防火墙是否阻止了连接
3. 浏览器控制台的错误信息

### 问题: 视频上传失败

**检查**:
1. 文件大小是否超过500MB
2. 文件格式是否支持
3. 磁盘空间是否充足

### 问题: Python服务启动失败

**检查**:
1. Python版本(需要3.9+)
2. 依赖是否全部安装
3. 模型文件是否存在

**详细故障排查**: `docs/deployment-guide.md#故障排查`

---

## 🎓 技术栈

### 前端
- React 18 + TypeScript
- TailwindCSS (玻璃态设计)
- Vite (构建工具)
- Fetch API

### 后端
- Python FastAPI (AI服务)
- PyTorch (深度学习)
- OpenCV (视频处理)
- 本地文件系统

---

## 📊 API接口

### Python AI服务

```bash
# 健康检查
GET /health

# 视频分析
POST /api/analyze
Content-Type: multipart/form-data
Body: video file
```

**完整API文档**: `README.md#API接口文档`

---

## 💡 下一步

### 开发阶段
1. ✅ 本地测试所有功能
2. ⬜ 训练深度学习模型
3. ⬜ 优化模型性能

### 部署阶段
1. ⬜ 配置生产环境
2. ⬜ 设置反向代理
3. ⬜ 启用HTTPS

### 优化阶段
1. ⬜ 启用GPU加速
2. ⬜ 实现并发处理
3. ⬜ 添加监控功能

---

## 🆘 获取帮助

### 文档
- 查看 `docs/` 目录下的详细文档
- 阅读 `README.md` 的完整说明

### 外部资源
- [FastAPI教程](https://fastapi.tiangolo.com/tutorial/)
- [PyTorch文档](https://pytorch.org/docs/)
- [React文档](https://react.dev/)

---

## ⚠️ 重要提示

### 模型训练
当前使用的是**示例模型**（随机权重），需要使用真实数据集训练才能获得准确的检测结果。

推荐数据集:
- FaceForensics++
- Celeb-DF
- DFDC

### 生产环境
部署到生产前，请确保:
1. 模型已训练并测试
2. 安全配置已完成
3. 性能已优化

---

**开始使用**: `npm run dev` (前端) + `python api/main.py` (后端)

**完整指南**: 查看 `PROJECT_DELIVERY.md` 📝
