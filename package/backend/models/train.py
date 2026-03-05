# backend/models/train.py
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import transforms, datasets
from detection import DeepfakeDetectorCNN
import os
from pathlib import Path

def train(data_dir: str, epochs: int = 5, batch_size: int = 16, lr: float = 1e-3):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    transform = transforms.Compose([
        transforms.Resize((224,224)),
        transforms.ToTensor(),
    ])
    trainset = datasets.ImageFolder(os.path.join(data_dir, "train"), transform=transform)
    loader = torch.utils.data.DataLoader(trainset, batch_size=batch_size, shuffle=True)
    model = DeepfakeDetectorCNN().to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=lr)
    for ep in range(epochs):
        model.train()
        total_loss = 0
        for imgs, labels in loader:
            imgs, labels = imgs.to(device), labels.to(device)
            optimizer.zero_grad()
            out = model(imgs)
            loss = criterion(out, labels)
            loss.backward(); optimizer.step()
            total_loss += loss.item()
        print(f"Epoch {ep}/{epochs} loss={total_loss/len(loader)}")
    torch.save(model.state_dict(), "./models/deepfake_detector.pth")

def train_dummy_model():
    """
    训练一个简单的占位模型，使用随机数据
    """
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"使用设备: {device}")

    # 创建模型
    model = DeepfakeDetectorCNN().to(device)

    # 由于没有真实数据集，我们使用随机数据训练
    # 这只是为了生成一个模型文件
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
    ])

    # 创建虚拟数据集（随机图像）
    class DummyDataset(torch.utils.data.Dataset):
        def __init__(self, size=100):
            self.size = size

        def __len__(self):
            return self.size

        def __getitem__(self, idx):
            # 生成随机图像和标签
            img = torch.randn(3, 224, 224)
            label = torch.randint(0, 2, (1,)).item()  # 0 或 1
            return img, label

    trainset = DummyDataset(200)  # 200 个样本
    loader = torch.utils.data.DataLoader(trainset, batch_size=16, shuffle=True)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=1e-3)

    print("开始训练占位模型...")
    epochs = 5
    for ep in range(epochs):
        model.train()
        total_loss = 0
        for imgs, labels in loader:
            imgs, labels = imgs.to(device), labels.to(device)
            optimizer.zero_grad()
            out = model(imgs)
            loss = criterion(out, labels)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        print(f"Epoch {ep+1}/{epochs} loss={total_loss/len(loader):.4f}")

    # 保存模型
    model_path = Path(__file__).parent / "deepfake_detector.pth"
    torch.save(model.state_dict(), model_path)
    print(f"模型已保存到: {model_path}")

if __name__ == "__main__":
    train_dummy_model()