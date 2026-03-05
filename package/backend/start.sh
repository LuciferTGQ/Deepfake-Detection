#!/bin/bash

echo "==========================================="
echo "  Deepfake Detection 后端服务启动脚本"
echo "==========================================="
echo ""

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "错误: Python3 未安装"
    exit 1
fi

# 检查是否在backend目录
if [ ! -f "requirements.txt" ]; then
    echo "错误: 请在backend目录下运行此脚本"
    exit 1
fi

# 创建虚拟环境（可选）
if [ ! -d "venv" ]; then
    echo "创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
echo "激活虚拟环境..."
source venv/bin/activate

# 安装依赖
echo "安装依赖包..."
pip install -r requirements.txt

# 创建必要的目录
mkdir -p models
mkdir -p logs

# 检查.env文件
if [ ! -f ".env" ]; then
    echo "警告: .env 文件不存在，请先配置环境变量"
    exit 1
fi

# 启动服务
echo ""
echo "启动FastAPI服务..."
echo "访问 http://localhost:8000/docs 查看API文档"
echo ""

python api/main.py
