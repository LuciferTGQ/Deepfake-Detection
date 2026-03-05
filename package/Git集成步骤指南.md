# Deepfake检测Web应用 - Git集成步骤指南

## 📦 压缩包信息
- **文件名**: `deepfake-webapp.tar.gz`
- **大小**: 13.8 KB
- **内容**: 完整的React Web应用，包含19个文件

## 🚀 快速集成步骤

### 步骤1: 下载并解压
1. 下载压缩包 `deepfake-webapp.tar.gz`
2. 解压到您的项目目录：
   ```bash
   # 在您的Deepfake-Detection项目根目录下执行
   tar -xzf deepfake-webapp.tar.gz
   ```

### 步骤2: 检查项目结构
解压后您的项目结构应该如下：
```
Deepfake-Detection/
├── .git/                    # 您的Git仓库
├── README.md               # 您的README
├── .py文件                  # 您的Python代码
├── webapp/                 # 新添加的Web应用文件夹
│   ├── package.json        # 项目依赖
│   ├── vite.config.ts      # 构建配置
│   ├── tailwind.config.js  # 样式配置
│   ├── src/                # 源代码
│   │   ├── components/     # React组件
│   │   ├── lib/           # 工具函数
│   │   └── styles/        # 样式文件
│   └── ...                # 其他配置文件
└── 其他您的文件...
```

### 步骤3: Git操作
```bash
# 1. 添加所有新文件到Git
git add webapp/

# 2. 查看添加的文件状态
git status

# 3. 提交更改
git commit -m "添加Deepfake检测Web应用界面

- 完整的React + TypeScript + Vite项目
- 玻璃态设计风格，蓝色科技感
- 包含文件上传、进度条、结果展示功能
- 支持500MB视频文件上传
- 响应式设计，适配多种设备"

# 4. 推送到GitHub
git push origin main
```

### 步骤4: 本地测试
在webapp文件夹中测试运行：
```bash
# 进入webapp目录
cd webapp

# 安装依赖（首次运行）
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看您的Web应用！

### 步骤5: 生产构建
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 文件说明

### 核心配置文件
- `package.json` - 项目依赖和脚本配置
- `vite.config.ts` - Vite构建工具配置
- `tailwind.config.js` - Tailwind CSS样式配置
- `tsconfig.json` - TypeScript编译配置

### React组件
- `WelcomePage.tsx` - 欢迎页面（使用说明 + 用户协议）
- `MainApp.tsx` - 主应用界面
- `UploadZone.tsx` - 文件上传区域（支持拖拽）
- `ProgressBar.tsx` - 进度条组件
- `ResultDisplay.tsx` - 结果展示（信任度百分比）

### 样式和工具
- `globals.css` - 玻璃态效果样式
- `utils.ts` - 工具函数（包含模拟分析功能）

## 🔧 自定义配置

### 修改端口
在 `vite.config.ts` 中修改开发服务器端口：
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000  // 修改为您想要的端口
  }
})
```

### 修改应用标题
在 `index.html` 中修改：
```html
<title>您的应用标题</title>
```

### 自定义颜色主题
在 `tailwind.config.js` 中修改主色调：
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',  // 修改主色调
        // ...
      }
    }
  }
}
```

## 🛠️ 常见问题解决

### 问题1: npm install失败
**解决方案**:
```bash
# 清除npm缓存
npm cache clean --force

# 删除node_modules重新安装
rm -rf node_modules package-lock.json
npm install
```

### 问题2: 端口被占用
**解决方案**:
```bash
# 查找占用端口的进程
lsof -ti:3000

# 杀死进程（替换PID为实际进程ID）
kill -9 <PID>

# 或者使用其他端口
npm run dev -- --port 3001
```

### 问题3: TypeScript编译错误
**解决方案**:
```bash
# 检查TypeScript版本
npx tsc --version

# 重新编译
npx tsc --noEmit
```

### 问题4: 样式不生效
**解决方案**:
```bash
# 确保Tailwind CSS正确安装
npm install -D tailwindcss postcss autoprefixer

# 重新构建
npm run build
```

## 🔄 后续开发计划

### 阶段1: 后端集成
- 配置Supabase项目
- 实现视频文件存储
- 创建数据库表结构
- 开发文件上传API

### 阶段2: 模型集成
- 将您的深度学习模型转换为API服务
- 实现视频预处理pipeline
- 连接前端和模型API

### 阶段3: 功能完善
- 用户认证系统
- 历史记录功能
- 批量处理
- 性能优化

## 📞 技术支持

如果在集成过程中遇到任何问题，请检查：
1. Node.js版本（推荐18+）
2. npm版本（推荐9+）
3. Git版本控制状态
4. 网络连接（安装依赖时）

## 🎯 项目展示

集成完成后，您可以：
1. **本地演示**: `npm run dev` 启动本地服务器
2. **在线部署**: 使用Vercel、Netlify等平台部署
3. **项目答辩**: 展示完整的用户界面和交互流程
4. **功能扩展**: 基于现有框架添加更多功能

---

**祝您的Deepfake检测项目取得成功！** 🎉