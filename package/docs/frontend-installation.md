# 前端安装指南

## 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

## 安装步骤

### 1. 进入前端目录

```bash
cd webapp
```

### 2. 安装依赖

```bash
npm install
```

这将自动安装 package.json 中列出的所有依赖，包括：
- `react`, `react-dom`: React框架
- `lucide-react`: 图标库
- `tailwindcss`: CSS框架
- TypeScript 和相关开发工具

### 3. 验证安装

检查Node.js版本：

```bash
node --version
npm --version
```

### 4. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 5. 构建生产版本

```bash
npm run build
```

构建产物将保存在 `dist/` 目录中

### 6. 预览生产版本

```bash
npm run preview
```

## 依赖说明

### 核心依赖

- **React 18**: 用户界面框架
- **TypeScript**: 类型安全的JavaScript
- **Tailwind CSS**: 实用优先的CSS框架
- **Vite**: 快速的构建工具
- **Lucide React**: 现代图标库

### 开发依赖

- **ESLint**: 代码检查
- **PostCSS**: CSS处理
- **Autoprefixer**: CSS浏览器兼容性

## 常见问题

### 安装失败

如果遇到网络问题导致安装失败：

```bash
# 清除缓存
npm cache clean --force

# 使用国内镜像
npm config set registry https://registry.npmmirror.com

# 重新安装
npm install
```

### 启动失败

如果开发服务器启动失败：

1. 检查端口5173是否被占用
2. 确认Node.js版本 ≥ 18
3. 尝试删除 node_modules 并重新安装

### 构建失败

如果生产构建失败：

```bash
# 清除构建缓存
rm -rf dist node_modules/.vite

# 重新构建
npm run build
```

## 项目结构

```
webapp/
├── src/
│   ├── components/     # React组件
│   ├── lib/           # 工具函数和API
│   ├── styles/        # 样式文件
│   └── main.tsx       # 应用入口
├── public/            # 静态资源
├── package.json       # 项目配置
├── vite.config.ts     # Vite配置
├── tailwind.config.js # Tailwind配置
└── tsconfig.json      # TypeScript配置
```

## 下一步

安装完成后，参考主项目的 README.md 了解如何启动后端服务并进行完整测试。

构建产物将生成在 `dist/` 目录。

## 如果遇到问题

### 问题1: npm install 失败

**解决方案**:
- 清理缓存: `npm cache clean --force`
- 删除 node_modules: `rm -rf node_modules package-lock.json`
- 重新安装: `npm install`

### 问题2: Node版本不匹配

**当前代码**: 支持 Node.js 18+

**本地开发要求**: Node.js 18+

**解决方案**:
- 升级 Node.js 到最新版本
  nvm use 20
  ```

### 问题3: TypeScript编译错误

**解决方案**:
- 确保 TypeScript 版本正确: `npm install --save-dev typescript@5.2.2`
- 检查 tsconfig.json 配置

### 问题4: 构建失败

**解决方案**:
- 检查所有import路径是否正确
- 确保 src/lib/api.ts 中的API配置正确
- 运行 `npm run lint` 检查代码问题

## 依赖列表

### 核心依赖
- `lucide-react`: ^0.344.0 - 图标库
- `react`: ^18.2.0 - React框架
- `react-dom`: ^18.2.0 - React DOM

### UI依赖
- `lucide-react`: ^0.294.0 - 图标库
- `tailwindcss`: ^3.3.6 - CSS框架

### 开发依赖
- `typescript`: ^5.2.2 - TypeScript支持
- `vite`: ^5.0.8 - 构建工具
- `@vitejs/plugin-react`: ^4.2.1 - Vite React插件

完整列表请查看 `package.json`

## 配置说明

### 本地配置

前端应用已配置为连接本地后端服务，无需额外配置。

## 测试

### 功能测试

1. 访问欢迎页
2. 点击"确认使用"
3. 上传视频文件
4. 开始分析
5. 查看实时进度
6. 查看分析结果

### 浏览器兼容性

支持所有现代浏览器：
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 部署

详细部署指南请参考: `/docs/deployment-guide.md`

### 快速部署到Vercel

```bash
npm install -g vercel
vercel --prod
```

### 快速部署到Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## 后续步骤

1. ✅ 安装依赖
2. ✅ 前端已预配置
3. ⬜ 本地测试
4. ⬜ 构建生产版本
5. ⬜ 部署到托管平台
6. ⬜ 配置自定义域名

## 技术支持

如有问题，请参考：
- [React 文档](https://react.dev/)
- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://react.dev/)

或查看项目 README.md 中的故障排查章节。
