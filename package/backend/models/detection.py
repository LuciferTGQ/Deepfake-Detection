import torch
import torch.nn as nn
import numpy as np
import logging
from abc import ABC, abstractmethod
from pathlib import Path
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


class DetectorAdapter(ABC):
    """统一的检测器适配器接口，便于后续替换不同模型架构。"""

    def __init__(self, device: torch.device, model_path: str):
        self.device = device
        self.model_path = model_path

    @property
    @abstractmethod
    def model_name(self) -> str:
        raise NotImplementedError

    @abstractmethod
    def load(self) -> None:
        raise NotImplementedError

    @abstractmethod
    def is_loaded(self) -> bool:
        raise NotImplementedError

    @abstractmethod
    async def predict(self, frames: List[np.ndarray]) -> Tuple[float, str]:
        raise NotImplementedError


class CNNDetectorAdapter(DetectorAdapter):
    def __init__(self, device: torch.device, model_path: str):
        super().__init__(device, model_path)
        self.model: DeepfakeDetectorCNN | None = None

    @property
    def model_name(self) -> str:
        return "cnn"

    def load(self) -> None:
        self.model = DeepfakeDetectorCNN()

        if os.path.exists(self.model_path):
            logger.info(f"加载模型权重: {self.model_path}")
            self.model.load_state_dict(torch.load(self.model_path, map_location=self.device))
        else:
            logger.warning(f"模型文件不存在: {self.model_path}")
            logger.warning("使用随机初始化的模型（仅用于演示）")

        self.model.to(self.device)
        self.model.eval()

    def is_loaded(self) -> bool:
        return self.model is not None

    async def predict(self, frames: List[np.ndarray]) -> Tuple[float, str]:
        if not self.model:
            raise Exception("模型未加载")

        frames_array = np.array(frames)
        frames_tensor = torch.from_numpy(frames_array).permute(0, 3, 1, 2).float()
        frames_tensor = frames_tensor.to(self.device)

        with torch.no_grad():
            outputs = self.model(frames_tensor)
            probabilities = torch.softmax(outputs, dim=1)
            avg_probabilities = probabilities.mean(dim=0)

            predicted_class = torch.argmax(avg_probabilities).item()
            confidence = avg_probabilities[predicted_class].item() * 100

        result_label = "真实视频" if predicted_class == 0 else "疑似伪造"
        confidence_score = round(confidence, 2)

        logger.info(
            "预测完成 - model=%s 类别=%s 置信度=%.2f%%",
            self.model_name,
            predicted_class,
            confidence_score,
        )
        return confidence_score, result_label


class XceptionTemporalStubAdapter(DetectorAdapter):
    """Xception+时序模块占位适配器，先保证接口可切换。"""

    @property
    def model_name(self) -> str:
        return "xception_temporal_stub"

    def load(self) -> None:
        logger.warning("当前使用占位适配器 xception_temporal_stub，尚未接入真实模型权重。")

    def is_loaded(self) -> bool:
        return True

    async def predict(self, frames: List[np.ndarray]) -> Tuple[float, str]:
        if not frames:
            raise Exception("未接收到可推理的帧")
        # 占位逻辑：返回固定可用结果，保证 API 契约稳定。
        return 50.0, "模型占位输出（待接入Xception+时序）"


def create_detector_adapter(model_name: str, device: torch.device, model_path: str) -> DetectorAdapter:
    model_key = model_name.lower().strip()
    if model_key == "cnn":
        return CNNDetectorAdapter(device=device, model_path=model_path)
    if model_key in {"xception_temporal_stub", "xception_stub"}:
        return XceptionTemporalStubAdapter(device=device, model_path=model_path)
    raise ValueError(f"不支持的模型类型: {model_name}")


class ModelInference:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        logger.info(f"使用设备: {self.device}")

        default_model_path = Path(__file__).parent / "deepfake_detector.pth"
        self.model_name = os.getenv("MODEL_NAME", "cnn")
        self.model_path = os.getenv("MODEL_PATH", str(default_model_path))
        self.adapter: DetectorAdapter | None = None
        self.load_model()

    def load_model(self):
        try:
            self.adapter = create_detector_adapter(
                model_name=self.model_name,
                device=self.device,
                model_path=self.model_path,
            )
            self.adapter.load()
            logger.info("模型加载完成: model=%s", self.adapter.model_name)
        except Exception as e:
            logger.error(f"模型加载失败: {str(e)}")
            raise

    def is_loaded(self) -> bool:
        return self.adapter is not None and self.adapter.is_loaded()

    async def predict(self, frames: List[np.ndarray]) -> Tuple[float, str]:
        try:
            if not self.adapter:
                raise Exception("模型未加载")
            return await self.adapter.predict(frames)
        except Exception as e:
            logger.error(f"预测失败: {str(e)}")
            raise

    async def predict_single_frame(self, frame: np.ndarray) -> Tuple[float, str]:
        return await self.predict([frame])

    def active_model(self) -> str:
        return self.adapter.model_name if self.adapter else "uninitialized"
