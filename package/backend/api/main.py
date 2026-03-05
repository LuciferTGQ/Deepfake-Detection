# backend/api/main.py
import sys
from pathlib import Path
# 将当前文件的父目录（即 backend）加入 sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn, os, uuid, tempfile
from pathlib import Path
import logging

from utils.video_processor import VideoProcessor
from models.detection import ModelInference

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Deepfake Detection API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

video_processor = VideoProcessor()
model_inference = ModelInference()

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model_inference.is_loaded(),
        "device": str(model_inference.device)
    }

@app.post("/api/analyze")
async def analyze_video(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="no file provided")
    # 保存上传视频
    tmp_dir = Path(tempfile.gettempdir()) / "deepfake_videos"
    tmp_dir.mkdir(exist_ok=True)
    uid = str(uuid.uuid4())
    suffix = Path(file.filename).suffix or ".mp4"
    video_path = tmp_dir / f"{uid}{suffix}"
    with open(video_path, "wb") as f:
        f.write(await file.read())

    try:
        frames = await video_processor.extract_frames(str(video_path))
        confidence, label = await model_inference.predict(frames)
    finally:
        await video_processor.cleanup(str(video_path))

    return {
        "analysis_id": uid,
        "confidence_score": confidence,
        "result_label": label
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("API_PORT", 8000)))