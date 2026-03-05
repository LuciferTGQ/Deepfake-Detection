import torch
import torch.nn as nn
import numpy as np
import logging
from typing import List, Tuple
import os

logger = logging.getLogger(__name__)


class DeepfakeDetectorCNN(nn.Module):
    """
    简单的CNN模型用于Deepfake检测
    这是一个示例模型，实际项目中应该使用更复杂的架构
    """
    def __init__(self):
        super(DeepfakeDetectorCNN, self).__init__()
        
        self.features = nn.Sequential(
            # 第一层卷积
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),
            
            # 第二层卷积
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),
            
            # 第三层卷积
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),
            
            # 第四层卷积
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),
        )
        
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(256 * 14 * 14, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 2)  # 2类：真实/伪造
        )
    
    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x


class ModelInference:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        logger.info(f"使用设备: {self.device}")
        
        self.model = None
        self.load_model()
    
    def load_model(self):
        """
        加载预训练模型
        如果模型不存在，创建一个新的示例模型
        """
        try:
            model_path = os.getenv("MODEL_PATH", "./models/deepfake_detector.pth")
            
            # 创建模型实例
            self.model = DeepfakeDetectorCNN()
            
            # 尝试加载预训练权重
            if os.path.exists(model_path):
                logger.info(f"加载模型权重: {model_path}")
                self.model.load_state_dict(torch.load(model_path, map_location=self.device))
            else:
                logger.warning(f"模型文件不存在: {model_path}")
                logger.warning("使用随机初始化的模型（仅用于演示）")
                # 在实际项目中，这里应该抛出异常或下载预训练模型
            
            self.model.to(self.device)
            self.model.eval()
            logger.info("模型加载完成")
            
        except Exception as e:
            logger.error(f"模型加载失败: {str(e)}")
            raise
    
    def is_loaded(self) -> bool:
        """检查模型是否已加载"""
        return self.model is not None
    
    async def predict(self, frames: List[np.ndarray]) -> Tuple[float, str]:
        """
        对提取的帧进行预测
        返回: (置信度分数, 结果标签)
        """
        try:
            if not self.model:
                raise Exception("模型未加载")
            
            # 将帧列表转换为批量张量
            # 形状: (num_frames, height, width, channels) -> (num_frames, channels, height, width)
            frames_array = np.array(frames)
            frames_tensor = torch.from_numpy(frames_array).permute(0, 3, 1, 2).float()
            frames_tensor = frames_tensor.to(self.device)
            
            # 批量预测
            with torch.no_grad():
                outputs = self.model(frames_tensor)
                probabilities = torch.softmax(outputs, dim=1)
                
                # 计算平均概率（对所有帧的预测取平均）
                avg_probabilities = probabilities.mean(dim=0)
                
                # 获取最终预测
                predicted_class = torch.argmax(avg_probabilities).item()
                confidence = avg_probabilities[predicted_class].item() * 100
            
            # 确定结果标签
            if predicted_class == 0:
                # 真实视频
                result_label = "真实视频"
                confidence_score = confidence
            else:
                # 伪造视频（Deepfake）
                result_label = "疑似伪造"
                confidence_score = confidence
            
            logger.info(f"预测完成 - 类别: {predicted_class}, 置信度: {confidence_score:.2f}%")
            
            return round(confidence_score, 2), result_label
            
        except Exception as e:
            logger.error(f"预测失败: {str(e)}")
            raise
    
    async def predict_single_frame(self, frame: np.ndarray) -> Tuple[float, str]:
        """
        对单个帧进行预测（可选功能）
        """
        return await self.predict([frame])
