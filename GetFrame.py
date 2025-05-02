#需要安装的库：opencv-python，tqdm	

import cv2
import os
from tqdm import tqdm

def extract_frames(video_path, output_dir, frame_format="jpg", skip_frames=0):
    # 检查输入视频
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 打开视频
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Failed to open video: {video_path}")
    
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    if total_frames == 0:
        print("Warning: Video has 0 frames!")
    
    frame_count = 0
    saved_count = 0
    progress_bar = tqdm(total=total_frames, desc=f"Extracting {os.path.basename(video_path)}")

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        if frame_count % (skip_frames + 1) == 0:
            output_path = os.path.join(output_dir, f"frame_{saved_count:05d}.{frame_format}")
            success = cv2.imwrite(output_path, frame)
            if not success:
                print(f"Warning: Failed to save frame {saved_count}")
            saved_count += 1
        
        frame_count += 1
        progress_bar.update(1)
    
    cap.release()
    progress_bar.close()
    print(f"Saved {saved_count}/{frame_count} frames to {output_dir}")




import glob


# # 打印 glob 的匹配结果
# video_files = glob.glob(r"D:\Deepfake Dection Project\data1\original_sequences\youtube\c23\videos\*.mp4")
# print(f"Found files: {video_files}")  # 如果输出为空列表，说明路径或通配符有问题

# # 检查目录内容
# dir_path = r"D:\Deepfake Dection Project\data1\original_sequences\youtube\c23\videos"
# print(f"Directory contents: {os.listdir(dir_path)}")  # 查看实际文件名
#以上用于检查


#以下代码运行时，需要把路径修改为电脑中文件的实际路径！！！

# 处理所有原始视频
for video_path in glob.glob(r"D:\Deepfake Dection Project\data1\original_sequences\youtube\c23\videos\*.mp4"):
    video_name = os.path.basename(video_path).split(".")[0]
    output_dir = rf"D:\Deepfake Dection Project\data1\original_sequences\youtube\c23\frames\{video_name}"
    extract_frames(video_path, output_dir)

# 处理所有伪造视频（Deepfakes/Face2Face等）
for method in ["DeepFakeDetection"]:#,"Deepfakes", "Face2Face","FaceSwap""NeuralTextures""FaceShifter"
    for video_path in glob.glob(rf"D:\Deepfake Dection Project\data1\manipulated_sequences\{method}\c23\videos\*.mp4"):
        video_name = os.path.basename(video_path).split(".")[0]
        output_dir = rf"D:\Deepfake Dection Project\data1\manipulated_sequences\{method}\c23\frames\{video_name}"
        extract_frames(video_path, output_dir)
    