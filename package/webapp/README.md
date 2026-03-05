# Deepfake Detection Web App

基于React开发的deepfake检测Web应用界面，采用现代玻璃态设计风格。

## 🚀 功能特性

- **欢迎页面**: 详细的使用说明和用户协议确认
- **视频上传**: 支持拖拽和点击上传，文件大小限制500MB
- **实时分析**: 动态进度条显示分析过程
- **结果展示**: 可视化的信任度百分比和检测结果
- **响应式设计**: 适配桌面和移动端设备
- **现代UI**: 玻璃态设计风格，蓝色科技感配色

## 🛠️ 技术栈

- **React 18** - 用户界面框架
- **TypeScript** - 类型安全的JavaScript
- **Tailwind CSS** - 实用优先的CSS框架
- **Vite** - 快速的构建工具
- **Lucide React** - 现代图标库
- **Fetch API** - HTTP通信

## 📦 安装和运行

### 前置要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
cd webapp
npm install
```

### 开发模式
```bash
npm run dev
```
应用将在 `http://localhost:5173` 启动

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📁 项目结构

```
webapp/
├── src/
│   ├── components/          # React组件
│   │   ├── WelcomePage.tsx  # 欢迎页面
│   │   ├── MainApp.tsx      # 主应用页面
│   │   ├── UploadZone.tsx   # 文件上传区域
│   │   ├── ProgressBar.tsx  # 进度条
│   │   └── ResultDisplay.tsx # 结果展示
│   ├── lib/
│   │   ├── api.ts           # API通信函数
│   │   └── utils.ts         # 工具函数
│   ├── styles/
│   │   └── globals.css      # 全局样式
│   ├── App.tsx              # 主应用组件
│   └── main.tsx             # 应用入口
├── public/                  # 静态资源
├── package.json
├── vite.config.ts           # Vite配置
├── tailwind.config.js       # Tailwind配置
└── postcss.config.js        # PostCSS配置
```

## 🔧 配置说明

### API配置

前端通过 `src/lib/api.ts` 与后端通信，默认连接到 `http://localhost:8000`。

如需修改后端地址，请编辑 `api.ts` 中的 `fetch` URL。

### 样式配置

- **Tailwind CSS**: 配置在 `tailwind.config.js`
- **设计令牌**: 参考 `../docs/design-tokens.json`
- **颜色方案**: 蓝色渐变 + 玻璃态效果

## 🚀 部署

### 本地开发
```bash
npm run dev
```

### 生产构建
```bash
npm run build
npm run preview
```

### 部署到静态主机
将 `dist/` 目录部署到 Vercel、Netlify 等静态主机服务。

## 🔍 调试

### 浏览器开发者工具
- 打开 F12 开发者工具
- 查看 Console 标签页的日志
- 检查 Network 标签页的 API 请求

### 常见问题

**页面空白问题**:
- 检查后端服务是否运行在 `http://localhost:8000`
- 查看浏览器控制台是否有错误信息
- 确认 CORS 配置正确

**上传失败**:
- 检查文件大小是否超过500MB
- 确认文件格式支持（MP4、AVI、MOV、MKV）

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

MIT License

## 👥 开发团队

大三学生团队 - 大创项目

```
webapp/
├── src/
│   ├── components/          # React组件
│   │   ├── WelcomePage.tsx  # 欢迎页面
│   │   ├── MainApp.tsx      # 主应用界面
│   │   ├── UploadZone.tsx   # 上传区域
│   │   ├── ProgressBar.tsx  # 进度条
│   │   └── ResultDisplay.tsx # 结果展示
│   ├── styles/
│   │   └── globals.css      # 全局样式
│   ├── lib/
│   │   └── utils.ts         # 工具函数
│   ├── App.tsx              # 主应用组件
│   └── main.tsx             # 应用入口
├── public/                  # 静态资源
├── package.json            # 项目配置
├── vite.config.ts          # Vite配置
├── tailwind.config.js      # Tailwind配置
└── tsconfig.json           # TypeScript配置
```

## 🎨 设计系统

### 色彩方案
- **主色调**: 蓝色系 (#3B82F6)
- **背景**: 中性灰白渐变
- **语义色**: 
  - 成功: 绿色 (#10B981)
  - 警告: 橙色 (#F59E0B) 
  - 错误: 红色 (#EF4444)

### 玻璃态效果
- 半透明背景: `rgba(255, 255, 255, 0.4)`
- 背景模糊: `backdrop-filter: blur(20px)`
- 边框: `rgba(255, 255, 255, 0.3)`

## 🔧 配置说明

### 环境变量
创建 `.env` 文件（可选）:
```env
VITE_API_URL=http://localhost:8000
VITE_MAX_FILE_SIZE=524288000
```

### 自定义配置
- 修改 `tailwind.config.js` 调整样式
- 修改 `vite.config.ts` 调整构建配置
- 修改 `src/styles/globals.css` 调整全局样式

## 📱 响应式断点

- **移动端**: < 768px
- **平板**: 768px - 1024px  
- **桌面**: > 1024px

## 🚀 部署

### Vercel部署
1. 连接GitHub仓库
2. 设置构建命令: `npm run build`
3. 设置输出目录: `dist`

### Netlify部署
1. 拖拽 `dist` 文件夹到Netlify
2. 或连接GitHub自动部署

### 静态托管
构建后的 `dist` 文件夹可部署到任何静态托管服务。

## 🔄 与后端集成

当前版本使用模拟数据。要连接真实的后端API:

1. 修改 `src/components/MainApp.tsx` 中的分析逻辑
2. 替换模拟的API调用为真实请求
3. 配置CORS和认证

## 📝 开发指南

### 添加新组件
1. 在 `src/components/` 创建新文件
2. 导出React组件
3. 在需要的地方导入使用

### 修改样式
1. 使用Tailwind CSS类名
2. 或在 `globals.css` 中添加自定义样式
3. 遵循设计令牌规范

### 添加新功能
1. 更新相应的组件
2. 添加必要的类型定义
3. 更新测试用例

## 🐛 故障排除

### 常见问题

**Q: 构建失败**
A: 检查Node.js版本和依赖安装

**Q: 样式不生效**  
A: 确保Tailwind CSS正确配置

**Q: 移动端显示异常**
A: 检查响应式断点设置

### 调试技巧
- 使用浏览器开发者工具
- 检查控制台错误信息
- 验证组件Props传递

## 📄 许可证

本项目采用 MIT 许可证。

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 支持

如有问题，请创建Issue或联系开发团队。