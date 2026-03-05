#!/usr/bin/env python3

import sys
import os

# 添加backend路径到Python路径
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_path)

try:
    # 测试导入
    from utils.video_processor import VideoProcessor
    from utils.model_inference import ModelInference
    from database.supabase_client import SupabaseClient
    
    print("✅ 所有模块导入成功")
    
    # 测试初始化
    video_processor = VideoProcessor()
    model_inference = ModelInference()
    supabase_client = SupabaseClient()
    
    print("✅ 所有组件初始化成功")
    print(f"✅ 模型状态: {model_inference.is_loaded()}")
    print(f"✅ 设备: {model_inference.device}")
    
except Exception as e:
    print(f"❌ 错误: {e}")
    import traceback
    traceback.print_exc()