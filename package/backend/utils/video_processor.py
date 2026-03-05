import cv2
import os
import tempfile
import logging
from typing import List
import numpy as np
import aiohttp
from pathlib import Path

logger = logging.getLogger(__name__)


class VideoProcessor:
    def __init__(self):
        self.max_frames = int(os.getenv("MAX_FRAMES", 300))
        self.frame_sample_rate = int(os.getenv("FRAME_SAMPLE_RATE", 10))
        self.image_size = int(os.getenv("IMAGE_SIZE", 224))
        self.temp_dir = Path(tempfile.gettempdir()) / "deepfake_videos"
        self.temp_dir.mkdir(exist_ok=True)
        
    async def download_video(self, video_url: str, analysis_id: str) -> str:
        """
        从URL下载视频文件
        """
        try:
            video_path = self.temp_dir / f"{analysis_id}.mp4"
            
            async with aiohttp.ClientSession() as session:
                async with session.get(video_url) as response:
                    if response.status != 200:
                        raise Exception(f"视频下载失败，状态码: {response.status}")
                    
                    with open(video_path, 'wb') as f:
                        while True:
                            chunk = await response.content.read(8192)
                            if not chunk:
                                break
                            f.write(chunk)
            
            logger.info(f"视频下载完成: {video_path}")
            return str(video_path)
            
        except Exception as e:
            logger.error(f"视频下载失败: {str(e)}")
            raise
    
    async def extract_frames(self, video_path: str) -> List[np.ndarray]:
        """
        从视频中提取关键帧
        """
        try:
            cap = cv2.VideoCapture(video_path)
            frames = []
            frame_count = 0
            extracted_count = 0
            
            total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            logger.info(f"视频总帧数: {total_frames}")
            
            while cap.isOpened() and extracted_count < self.max_frames:
                ret, frame = cap.read()
                
                if not ret:
                    break
                
                # 按采样率提取帧
                if frame_count % self.frame_sample_rate == 0:
                    # 调整大小
                    frame_resized = cv2.resize(frame, (self.image_size, self.image_size))
                    # 转换颜色空间（BGR -> RGB）
                    frame_rgb = cv2.cvtColor(frame_resized, cv2.COLOR_BGR2RGB)
                    # 归一化到 [0, 1]
                    frame_normalized = frame_rgb.astype(np.float32) / 255.0
                    frames.append(frame_normalized)
                    extracted_count += 1
                
                frame_count += 1
            
            cap.release()
            logger.info(f"提取了 {len(frames)} 帧")
            
            if len(frames) == 0:
                raise Exception("无法从视频中提取帧")
            
            return frames
            
        except Exception as e:
            logger.error(f"帧提取失败: {str(e)}")
            raise
    
    async def cleanup(self, video_path: str):
        """
        清理临时视频文件
        """
        try:
            if os.path.exists(video_path):
                os.remove(video_path)
                logger.info(f"清理临时文件: {video_path}")
        except Exception as e:
            logger.warning(f"清理文件失败: {str(e)}")
