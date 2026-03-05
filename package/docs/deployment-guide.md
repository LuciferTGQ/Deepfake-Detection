# Deepfake Detection 项目 - 完整部署指南

## 项目概述

这是一个基于深度学习的视频真伪检测系统，包含前端Web应用和Python后端服务。

### 技术栈

**前端**:
- React 18 + TypeScript
- TailwindCSS (玻璃态设计)
- Vite (构建工具)
- Fetch API (HTTP通信)

**后端**:
- Python FastAPI
- PyTorch + TorchVision
- OpenCV (视频处理)
- 本地文件系统

### 系统架构

```
用户浏览器
    ↓ HTTP POST /api/analyze
前端应用 (React)
    ↓
Python AI服务 (FastAPI)
    ├─ 接收视频文件
    ├─ 帧提取 (OpenCV)
    ├─ PyTorch模型推理
    └─ 返回检测结果
```

---

## 一、前置条件

### 1. 环境要求

- Node.js 18+ (前端开发)
- Python 3.9+ (后端AI服务)
- pip (Python包管理器)
- Git (版本控制)

### 2. 系统要求

- **内存**: 至少8GB RAM
- **存储**: 至少10GB可用空间
- **操作系统**: Windows 10+ / macOS 10.15+ / Ubuntu 18.04+

---

## 二、本地开发环境搭建

### 1. 克隆项目

```bash
git clone <repository-url>
cd deepfake-detection
```

### 2. 后端环境配置

#### 创建Python虚拟环境（推荐）

```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

#### 安装Python依赖

```bash
pip install -r requirements.txt
```

#### 验证安装

```bash
python -c "import torch; print('PyTorch version:', torch.__version__)"
python -c "import cv2; print('OpenCV version:', cv2.__version__)"
```

### 3. 前端环境配置

```bash
cd ../webapp
npm install
```

### 4. 启动服务

#### 启动后端服务

```bash
cd backend
python api/main.py
```

服务将在 `http://localhost:8000` 启动

#### 启动前端应用

```bash
cd ../webapp
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 5. 验证部署

1. 打开浏览器访问 `http://localhost:5173`
2. 确认协议并进入主页面
3. 上传一个视频文件
4. 点击"开始分析"
5. 查看检测结果

---

## 三、生产环境部署

### 选项1：单机部署

#### 1. 服务器要求

- Ubuntu 20.04+ / CentOS 7+
- Python 3.9+
- Node.js 18+
- 至少16GB RAM
- 至少50GB存储空间

#### 2. 安装系统依赖

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip nodejs npm ffmpeg

# CentOS/RHEL
sudo yum install python3 python3-pip nodejs npm ffmpeg
```

#### 3. 配置后端服务

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### 4. 配置前端应用

```bash
cd ../webapp
npm install
npm run build
```

#### 5. 使用进程管理器

安装 PM2：

```bash
npm install -g pm2
```

创建生态系统文件 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [
    {
      name: 'deepfake-backend',
      script: 'backend/api/main.py',
      interpreter: 'python',
      cwd: '/path/to/project',
      env: {
        PYTHONPATH: '/path/to/project/backend'
      }
    },
    {
      name: 'deepfake-frontend',
      script: 'npx',
      args: 'serve webapp/dist -s -l 3000',
      cwd: '/path/to/project'
    }
  ]
}
```

启动服务：

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 选项2：Docker部署

#### 1. 创建Dockerfile

**后端Dockerfile** (`backend/Dockerfile`)：

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "api/main.py"]
```

**前端Dockerfile** (`webapp/Dockerfile`)：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

#### 2. 创建docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend/models:/app/models
    environment:
      - PYTHONPATH=/app

  frontend:
    build: ./webapp
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

#### 3. 部署

```bash
docker-compose up -d
```

### 选项3：云服务器部署

#### AWS EC2部署

1. 启动EC2实例 (t3.medium 或更高配置)
2. 安装依赖：

```bash
sudo yum update -y
sudo yum install python3 python3-pip nodejs npm -y
```

3. 配置安全组开放端口 22, 80, 8000, 3000
4. 部署应用（参考单机部署步骤）
5. 配置Nginx反向代理

#### Nginx配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 四、性能优化

### 1. GPU加速

#### 安装CUDA版本PyTorch

```bash
pip uninstall torch torchvision
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

#### 设置环境变量

```bash
export CUDA_VISIBLE_DEVICES=0
```

### 2. 模型优化

- 使用 TorchScript 编译模型
- 启用模型量化
- 使用 ONNX Runtime

### 3. 服务器优化

- 配置 Gunicorn + Uvicorn workers
- 设置适当的内存限制
- 配置日志轮转

---

## 五、监控和维护

### 1. 日志配置

后端使用 Python logging，前端使用浏览器开发者工具。

### 2. 健康检查

访问 `http://localhost:8000/health` 检查服务状态。

### 3. 备份策略

- 定期备份模型文件
- 备份配置文件
- 监控磁盘使用情况

---

## 六、故障排查

### 常见问题

**后端启动失败**:
- 检查Python版本 (需要3.9+)
- 确认所有依赖已安装
- 检查端口8000是否被占用

**前端构建失败**:
- 确认Node.js版本 (需要18+)
- 清除node_modules后重新安装
- 检查网络连接

**模型推理慢**:
- 启用GPU加速
- 减小批处理大小
- 优化模型架构

**内存不足**:
- 增加服务器内存
- 减小视频处理参数
- 使用流式处理

---

## 七、安全考虑

### 1. 文件上传安全

- 限制文件大小和类型
- 扫描上传文件
- 使用临时目录存储

### 2. API安全

- 实现速率限制
- 添加请求验证
- 使用HTTPS

### 3. 服务器安全

- 定期更新系统
- 配置防火墙
- 使用非root用户运行服务

---

## 八、扩展计划

### 短期目标

- [ ] 添加用户认证系统
- [ ] 支持批量视频处理
- [ ] 实现结果历史记录
- [ ] 添加更多检测模型

### 长期目标

- [ ] 支持实时视频流检测
- [ ] 集成更多AI模型
- [ ] 开发移动端应用
- [ ] 实现分布式部署

---

## 九、联系支持

如遇到部署问题，请：

1. 查看本文档的故障排查部分
2. 检查GitHub Issues
3. 联系开发团队

**开发团队**: 大三学生团队 - 大创项目
**许可证**: MIT License
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
cd webapp
vercel --prod
```

4. **前端已预配置，无需额外环境变量**

### 方法2: Netlify 部署

1. **构建项目**

```bash
cd webapp
npm run build
```

2. **部署到 Netlify**

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy --prod --dir=dist
```

### 方法3: 静态文件托管

构建后将 `dist/` 目录部署到任何静态文件托管服务：
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

---

## 三、后端部署

### Python AI服务部署

#### 方法1: 云服务器部署（推荐）

适用于: AWS EC2, Google Cloud, 阿里云, 腾讯云等

**步骤**:

1. **准备服务器**

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Python和依赖
sudo apt install python3.9 python3-pip python3-venv -y
sudo apt install libopencv-dev python3-opencv -y
```

2. **上传代码**

```bash
# 使用 git clone 或 scp 上传代码
git clone <your-repo-url>
cd backend
```

3. **安装依赖**

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

4. **配置环境变量**

编辑 `.env` 文件：

```bash
nano .env
```

确保所有变量正确配置。

5. **使用 systemd 运行服务**

创建服务文件：

```bash
sudo nano /etc/systemd/system/deepfake-api.service
```

内容：

```ini
[Unit]
Description=Deepfake Detection API Service
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/path/to/backend
Environment="PATH=/path/to/backend/venv/bin"
ExecStart=/path/to/backend/venv/bin/python api/main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启动服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable deepfake-api
sudo systemctl start deepfake-api
sudo systemctl status deepfake-api
```

6. **配置 Nginx 反向代理**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

7. **配置 SSL (可选)**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### 方法2: Docker 容器部署

1. **创建 Dockerfile**

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    libopencv-dev \
    python3-opencv \
    && rm -rf /var/lib/apt/lists/*

# 安装Python依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 8000

# 启动命令
CMD ["python", "api/main.py"]
```

2. **构建镜像**

```bash
docker build -t deepfake-api .
```

3. **运行容器**

```bash
docker run -d \
  --name deepfake-api \
  -p 8000:8000 \
  --env-file .env \
  deepfake-api
```

4. **使用 Docker Compose**

创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env
    restart: unless-stopped
    volumes:
      - ./models:/app/models
```

启动：

```bash
docker-compose up -d
```

#### 方法3: Serverless 部署（高级）

适用于AWS Lambda、Google Cloud Run等平台，需要额外配置和优化。

---

## 四、环境变量配置

### 前端配置

前端应用已配置为连接本地后端服务，无需额外配置。

### 后端环境变量

在 `backend/.env` 文件中：

```env
# 服务器配置
API_HOST=0.0.0.0
API_PORT=8000

# 模型配置
MODEL_PATH=./models/deepfake_detector.pth
DEVICE=cpu  # 如果有GPU，设置为 cuda

# API配置
API_HOST=0.0.0.0
API_PORT=8000

# 视频处理配置
MAX_FRAMES=300
FRAME_SAMPLE_RATE=10
IMAGE_SIZE=224
```

---

## 五、测试与验证

### 1. 测试本地API

```bash
# 测试健康检查
curl http://localhost:8000/health

# 使用curl测试文件上传（需要实际文件）
curl -X POST http://localhost:8000/api/analyze \
  -F "file=@test_video.mp4"
```

### 2. 测试 Python API

```bash
# 健康检查
curl http://localhost:8000/health

# 测试分析接口
curl -X POST http://localhost:8000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "analysis_id": "test-123",
    "video_url": "https://...",
    "callback_url": "https://..."
  }'
```

### 3. 端到端测试

1. 打开前端应用
2. 上传一个测试视频
3. 点击"开始分析"
4. 观察进度条更新
5. 查看分析结果

---

## 六、故障排查

### 常见问题

#### 1. 前端无法连接到后端

**症状**: 控制台显示连接错误

**解决方案**:
- 检查后端服务是否在localhost:8000运行
- 确保防火墙允许本地连接
- 检查浏览器控制台的详细错误信息

#### 2. 视频上传失败

**症状**: 上传时显示错误

**解决方案**:
- 检查视频文件大小（<500MB）
- 查看后端服务日志
- 确保存储空间充足

#### 3. 分析任务失败

**症状**: 分析过程出错

**解决方案**:
- 检查 Python API 服务是否运行
- 查看 Python 服务日志
- 确保模型文件存在
- 检查 OpenCV 和 PyTorch 安装

#### 4. 模型推理失败

**症状**: 分析状态变为"失败"

**解决方案**:
- 检查模型文件是否存在
- 查看 Python 服务日志中的错误信息
- 确保 PyTorch 和 OpenCV 正确安装
- 检查服务器资源（内存、CPU）

### 查看日志

**后端服务**:
```bash
# 如果使用 systemd
sudo journalctl -u deepfake-api -f

# 如果使用 Docker
docker logs -f deepfake-api

# 如果直接运行
python api/main.py  # 查看控制台输出
```

**Python API**:
```bash
# 如果使用 systemd
sudo journalctl -u deepfake-api -f

# 如果使用 Docker
docker logs -f deepfake-api
```

---

## 七、性能优化建议

### 前端优化

1. **代码分割**: 使用 React.lazy 和 Suspense
2. **图片优化**: 压缩和懒加载
3. **CDN加速**: 使用Vercel或Cloudflare CDN

### 后端优化

1. **GPU加速**: 使用CUDA版PyTorch
2. **模型优化**: 
   - 使用 TorchScript
   - 量化模型（INT8）
   - ONNX Runtime
3. **批处理**: 同时处理多个视频
4. **缓存**: Redis缓存分析结果
5. **负载均衡**: 多个API实例 + Nginx负载均衡

### 数据库优化

1. **索引**: 为 `analysis_records` 表的 `id` 和 `status` 字段添加索引
2. **清理**: 定期删除旧的分析记录
3. **监控**: 使用系统监控工具检查性能

---

## 八、安全注意事项

1. **API密钥安全**
   - 永远不要在前端代码中暴露 Service Role Key
   - 使用环境变量管理敏感信息
   - 定期轮换密钥

2. **文件上传限制**
   - 限制文件大小（500MB）
   - 验证文件类型（只允许视频格式）
   - 扫描恶意文件

3. **RLS策略**
   - 确保用户只能访问自己的数据
   - 定期审查策略配置

4. **HTTPS**
   - 所有生产环境使用HTTPS
   - 配置SSL证书

---

## 九、监控与维护

### 监控指标

1. **系统指标**
   - CPU使用率
   - 内存使用率
   - 磁盘空间
   - 网络带宽

2. **应用指标**
   - API响应时间
   - 错误率
   - 分析成功率
   - 队列长度

3. **业务指标**
   - 日活跃用户
   - 分析任务数量
   - 平均处理时间

### 维护任务

1. **日常维护**
   - 检查日志错误
   - 监控系统资源
   - 备份数据库

2. **定期维护**
   - 更新依赖包
   - 清理临时文件
   - 优化数据库

3. **模型更新**
   - 使用新数据重新训练
   - A/B测试新模型
   - 逐步部署

---

## 十、成本估算

### 服务器成本

- **免费层**: 
  - 500MB数据库
  - 1GB文件存储
  - 2GB带宽/月
  - 适合开发和小规模测试

- **Pro层** ($25/月):
  - 8GB数据库
  - 100GB文件存储
  - 50GB带宽/月
  - 适合中小型应用

### 服务器成本

- **AWS t3.medium**: ~$30/月 (适合CPU推理)
- **AWS g4dn.xlarge**: ~$390/月 (GPU加速)
- **阿里云ecs.t6-c1m2.large**: ~¥70/月 (入门级)

### 总成本估算

- **开发阶段**: 免费
- **小规模生产**: $30 - $100/月
- **中等规模**: $100 - $500/月

---

## 联系与支持

**项目**: Deepfake Detection - 大创项目  
**团队**: 大三学生团队 (3人)  
**技术栈**: React + Python + PyTorch + 本地架构

---

## 附录

### A. 快速命令参考

```bash
# 前端
cd webapp
npm install
npm run dev          # 开发
npm run build        # 构建
npm run preview      # 预览构建

# 后端
cd backend
pip install -r requirements.txt
python api/main.py   # 启动服务

# Docker
docker build -t deepfake-api .
docker run -p 8000:8000 deepfake-api
```

### B. 相关文档链接

- [FastAPI 文档](https://fastapi.tiangolo.com/)
- [PyTorch 文档](https://pytorch.org/docs/)
- [React 文档](https://react.dev/)
- [React 文档](https://react.dev/)

---

**部署完成后，请务必进行全面测试，确保所有功能正常运行！**
