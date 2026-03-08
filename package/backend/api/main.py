# backend/api/main.py
import sys
from pathlib import Path
# 将当前文件的父目录（即 backend）加入 sys.path
sys.path.insert(0, str(Path(__file__).parent.parent))
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn, os, uuid, tempfile
import logging

from utils.video_processor import VideoProcessor
from models.detection import ModelInference

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_BYTES", str(500 * 1024 * 1024)))
ALLOWED_VIDEO_EXTENSIONS = {".mp4", ".avi", ".mov", ".mkv"}

app = FastAPI(title="Deepfake Detection API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

video_processor = VideoProcessor()
model_inference = ModelInference()


def _error_payload(code: str, message: str) -> dict:
    return {"error": {"code": code, "message": message}}


def _raise_http_error(status_code: int, code: str, message: str) -> None:
    raise HTTPException(status_code=status_code, detail=_error_payload(code, message))


@app.exception_handler(HTTPException)
async def http_exception_handler(_, exc: HTTPException):
    if isinstance(exc.detail, dict) and "error" in exc.detail:
        payload = exc.detail
    else:
        payload = _error_payload("HTTP_ERROR", str(exc.detail))
    return JSONResponse(status_code=exc.status_code, content=payload)


def _validate_upload_file(file: UploadFile) -> None:
    if not file.filename:
        _raise_http_error(400, "MISSING_FILE_NAME", "no file provided")

    suffix = Path(file.filename).suffix.lower()
    if suffix not in ALLOWED_VIDEO_EXTENSIONS:
        allowed = ", ".join(sorted(ALLOWED_VIDEO_EXTENSIONS))
        _raise_http_error(400, "UNSUPPORTED_FILE_TYPE", f"unsupported file extension: {suffix}. allowed: {allowed}")

    if file.content_type and not file.content_type.startswith("video/"):
        _raise_http_error(400, "INVALID_CONTENT_TYPE", f"content-type must be video/*, got: {file.content_type}")


async def _save_upload_file(file: UploadFile, destination: Path) -> None:
    total_written = 0
    chunk_size = 1024 * 1024

    with open(destination, "wb") as buffer:
        while True:
            chunk = await file.read(chunk_size)
            if not chunk:
                break
            total_written += len(chunk)
            if total_written > MAX_UPLOAD_BYTES:
                _raise_http_error(413, "FILE_TOO_LARGE", f"file exceeds {MAX_UPLOAD_BYTES} bytes")
            buffer.write(chunk)

    if total_written == 0:
        _raise_http_error(400, "EMPTY_FILE", "uploaded file is empty")

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model_inference.is_loaded(),
        "device": str(model_inference.device),
        "model_name": model_inference.active_model(),
    }

@app.post("/api/analyze")
async def analyze_video(file: UploadFile = File(...)):
    _validate_upload_file(file)

    # 保存上传视频
    tmp_dir = Path(tempfile.gettempdir()) / "deepfake_videos"
    tmp_dir.mkdir(exist_ok=True)
    uid = str(uuid.uuid4())
    suffix = Path(file.filename).suffix or ".mp4"
    video_path = tmp_dir / f"{uid}{suffix}"

    try:
        await _save_upload_file(file, video_path)
    except HTTPException:
        if video_path.exists():
            video_path.unlink(missing_ok=True)
        raise

    try:
        frames = await video_processor.extract_frames(str(video_path))
        confidence, label = await model_inference.predict(frames)
    finally:
        await video_processor.cleanup(str(video_path))
        await file.close()

    return {
        "analysis_id": uid,
        "confidence_score": confidence,
        "result_label": label
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("API_PORT", 8000)))