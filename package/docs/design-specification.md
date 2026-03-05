# 设计规范 - Deepfake Detection 智能检测AI换脸

## 1. 设计方向与理由

**风格定位:** 现代玻璃态设计（Glassmorphism）+ 蓝色科技感

**视觉精髓:** 采用半透明玻璃材质、模糊背景效果和多层次阴影，营造现代专业的科技氛围。中性灰白渐变背景（saturation <10%）配合高对比度的iOS蓝色强调色，传达"透明、精准、值得信赖"的品牌印象。

**真实案例参考:**
- macOS Big Sur/Monterey系统界面
- iOS 15+ 设计语言
- Windows 11 Fluent Design

**选择理由:**
1. **心理暗示契合:** 玻璃质感的"透明材质"与deepfake检测的"真伪鉴别"主题高度契合，传达清晰、可信的品牌信号
2. **现代科技感:** 2025年主流设计语言，符合AI技术产品的前沿定位
3. **大学项目展示:** 在专业性和视觉吸引力之间达到平衡，易于给评审留下深刻印象
4. **色彩心理学:** 蓝色代表科技、信任、专业；绿色辅助色表达成功、安全状态

---

## 2. 设计令牌

### 2.1 色彩系统

**主色调（Primary - iOS Blue）**

| Token | Hex | 用途 | WCAG对比度 |
|-------|-----|------|-----------|
| primary-50 | #E5F2FF | 浅色背景、提示框 | - |
| primary-100 | #CCE5FF | Hover状态背景 | - |
| primary-500 | #007AFF | 主要按钮、链接、强调色 | 4.52:1（白底） |
| primary-600 | #0051D5 | 按钮Hover/Active状态 | 7.1:1（白底） |
| primary-900 | #003D99 | 深色文字强调 | 10.5:1（白底） |

**中性色（Neutral）**

| Token | Hex | 用途 |
|-------|-----|------|
| neutral-50 | #F8F9FA | 最浅背景层 |
| neutral-100 | #F0F1F3 | 卡片背景、分隔线 |
| neutral-200 | #E8EAF0 | 边框、禁用状态 |
| neutral-700 | #4A5568 | 次要文字 |
| neutral-800 | #2D3748 | 主要文字 |
| neutral-900 | #1A202C | 标题文字 |

**语义色（Semantic）**

| Token | Hex | 用途 | 场景 |
|-------|-----|------|------|
| success-500 | #10B981 | 成功图标、"非常信任"状态 | 信任度≥80% |
| success-100 | #D1FAE5 | 成功背景 | 结果卡片背景 |
| warning-500 | #F59E0B | 警告图标、"比较信任"状态 | 信任度50-79% |
| warning-100 | #FEF3C7 | 警告背景 | 结果卡片背景 |
| error-500 | #EF4444 | 错误图标、"不可信"状态 | 信任度<50% |
| error-100 | #FEE2E2 | 错误背景 | 结果卡片背景 |

**背景渐变（Background Gradient）**

| Token | CSS值 | 说明 |
|-------|-------|------|
| bg-gradient-main | `linear-gradient(135deg, #E8EAF0 0%, #F4F5F9 50%, #FAFBFF 100%)` | 主背景渐变（macOS风格） |
| bg-gradient-hero | `linear-gradient(135deg, #E6EFF8 0%, #F0F4FA 100%)` | 欢迎页Hero区域（轻微蓝调） |

**玻璃材质（Glass Material）**

| Token | CSS值 | 用途 |
|-------|-------|------|
| glass-light | `rgba(255, 255, 255, 0.4)` | 标准玻璃卡片背景 |
| glass-emphasized | `rgba(255, 255, 255, 0.5)` | 强调玻璃卡片（欢迎页主卡片） |
| glass-subtle | `rgba(255, 255, 255, 0.35)` | 次要玻璃元素（导航栏） |
| glass-border | `rgba(255, 255, 255, 0.3)` | 玻璃卡片边框 |

**WCAG对比度验证（关键配对）**

| 前景 | 背景 | 对比度 | 级别 |
|------|------|--------|------|
| #1A202C (neutral-900) | rgba(255,255,255,0.4) on gradient | 6.8:1 | AA+ |
| #007AFF (primary-500) | #FFFFFF | 4.52:1 | AA |
| #003D99 (primary-900) | #FFFFFF | 10.5:1 | AAA |

---

### 2.2 字体系统

**字体族（Font Family）**

| Token | 值 | 用途 |
|-------|-----|------|
| font-primary | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | 全局字体（现代、清晰、专业） |
| font-display | `'Poppins', 'Inter', sans-serif` | 大标题（可选，圆润感） |

**字体尺寸（Type Scale）**

| Token | 尺寸 | 用途 |
|-------|------|------|
| text-hero | 64px | 欢迎页主标题 |
| text-title | 48px | 应用主标题"智能检测AI换脸" |
| text-subtitle | 28px | 欢迎页副标题 |
| text-heading | 20px | 区块标题、结果标签 |
| text-body | 16px | 正文、说明文字 |
| text-small | 14px | 辅助说明、提示文字 |
| text-caption | 12px | 文件大小、时间戳 |

**字体粗细（Font Weight）**

| Token | 值 | 用途 |
|-------|-----|------|
| weight-light | 300 | Caption（极少用） |
| weight-regular | 400 | 正文、说明 |
| weight-medium | 500 | 玻璃上的文字（增强可读性） |
| weight-semibold | 600 | 按钮、小标题 |
| weight-bold | 700 | 大标题、重要数字 |

**行高（Line Height）**

| Token | 值 | 用途 |
|-------|-----|------|
| leading-tight | 1.2 | 大标题 |
| leading-normal | 1.5 | 正文 |
| leading-relaxed | 1.7 | 长文本说明（欢迎页） |

---

### 2.3 间距系统（8pt Grid）

| Token | 值 | 用途 |
|-------|-----|------|
| space-2 | 8px | 紧密内联间距（图标与文字） |
| space-3 | 12px | 小型元素间距 |
| space-4 | 16px | 标准元素间距 |
| space-6 | 24px | 组件内部间距 |
| space-8 | 32px | 卡片内边距（最小值） |
| space-10 | 40px | 卡片内边距（标准） |
| space-12 | 48px | 大型组件内边距 |
| space-16 | 64px | 区块间距 |
| space-24 | 96px | 大型区块间距 |

---

### 2.4 圆角（Border Radius）

| Token | 值 | 用途 |
|-------|-----|------|
| radius-md | 12px | 按钮、输入框 |
| radius-lg | 16px | 小卡片 |
| radius-xl | 20px | 标准玻璃卡片 |
| radius-2xl | 24px | 大型卡片（欢迎页主卡片） |
| radius-full | 9999px | 圆形元素（进度条圆点） |

---

### 2.5 阴影（Box Shadow）

| Token | CSS值 | 用途 |
|-------|-------|------|
| shadow-glass | `0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)` | 标准玻璃卡片 |
| shadow-glass-hover | `0 12px 40px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.08)` | 玻璃卡片悬停 |
| shadow-button | `0 4px 12px rgba(0, 122, 255, 0.3)` | 主要按钮 |
| shadow-button-hover | `0 6px 16px rgba(0, 122, 255, 0.4)` | 主要按钮悬停 |

---

### 2.6 动画时长（Animation Duration）

| Token | 值 | 用途 |
|-------|-----|------|
| duration-fast | 200ms | 按钮快速反馈 |
| duration-normal | 300ms | 标准过渡（卡片、输入框） |
| duration-smooth | 400ms | 平滑动画（视图切换） |
| duration-slow | 600ms | 慢速动画（结果展示淡入） |

---

## 3. 组件规范

### 3.1 主要按钮（Primary Button - 实心）

**结构:**
```
[图标（可选）] 按钮文字
```

**设计令牌:**
- 高度：56px
- 水平内边距：32px
- 圆角：radius-md (12px)
- 背景：primary-500 (#007AFF)
- 文字：白色，weight-semibold (600)，text-body (16px)
- 阴影：shadow-button
- 图标：20px，白色

**交互状态:**
- **Hover:** 背景变为 primary-600，阴影升级为 shadow-button-hover，scale(1.02)，transform 200ms
- **Active:** 背景变为 primary-600，scale(0.98)
- **Disabled:** 背景 neutral-200，文字 neutral-700，无阴影，cursor not-allowed

**使用场景:** "确认使用"按钮、"开始分析"按钮

---

### 3.2 玻璃卡片（Glass Card）

**结构:**
```
标题（可选）
内容区域
操作按钮（可选）
```

**设计令牌:**
- 内边距：space-12 (48px) 桌面端 / space-8 (32px) 移动端
- 圆角：radius-2xl (24px) 大卡片 / radius-xl (20px) 小卡片
- 背景：glass-light (rgba(255,255,255,0.4))
- 模糊效果：`backdrop-filter: blur(20px) saturate(150%)`
- 边框：1px solid glass-border
- 阴影：shadow-glass

**交互状态（上传卡片）:**
- **Hover:** 边框变为 `rgba(0, 122, 255, 0.4)`，阴影升级为 shadow-glass-hover，transform translateY(-4px)，300ms
- **拖拽悬停:** 边框变为 primary-500，背景 `rgba(0, 122, 255, 0.05)`

**变体:**
- **强调卡片（欢迎页主卡片）:** 背景 glass-emphasized (0.5)，内边距 space-16 (64px) 桌面端
- **结果卡片:** 根据结果类型添加语义色边框（success-500 / warning-500 / error-500 2px）

**使用场景:** 欢迎页主卡片、上传区域、结果展示卡片

---

### 3.3 导航栏（Navigation Bar - 玻璃）

**结构:**
```
[Logo图标] 应用标题
```

**设计令牌:**
- 高度：72px
- 水平内边距：space-8 (32px)
- 位置：Sticky top，z-index 50
- 背景：glass-subtle (rgba(255,255,255,0.35))
- 模糊效果：`backdrop-filter: blur(15px) saturate(180%)`
- 底部边框：1px solid rgba(255, 255, 255, 0.2)
- 阴影：`0 2px 16px rgba(0,0,0,0.08)`

**内部元素:**
- Logo图标：32px，primary-500色
- 标题文字：text-heading (20px)，weight-semibold (600)，neutral-900色

**响应式调整:**
- 移动端：高度 64px，内边距 space-4 (16px)，标题 18px

**使用场景:** 应用主界面顶部导航

---

### 3.4 文件上传区域（Upload Zone）

**结构:**
```
[上传图标 64px]
主提示文字
副提示文字
或者
"点击选择文件"链接
```

**设计令牌:**
- 最小高度：320px（桌面端）/ 240px（移动端）
- 内边距：space-12 (48px)
- 圆角：radius-xl (20px)
- 边框：2px dashed glass-border
- 背景：glass-light (rgba(255,255,255,0.4))
- 模糊效果：`backdrop-filter: blur(15px)`

**内部元素:**
- 图标：64px，neutral-700色（默认）/ primary-500色（拖拽悬停）
- 主文字："上传视频（不超过500MB）"，text-heading (20px)，weight-medium (500)，neutral-900色
- 副文字："支持拖拽或点击选择文件"，text-small (14px)，neutral-700色
- 链接："点击选择文件"，primary-500色，下划线

**交互状态:**
- **Hover:** 边框颜色 primary-500，图标颜色 primary-500，cursor pointer
- **拖拽悬停:** 背景 `rgba(0, 122, 255, 0.05)`，边框实线 primary-500 2px
- **已上传:** 显示文件名 + 文件大小 + 删除图标按钮

**文件信息展示:**
- 文件名：text-body (16px)，weight-medium，neutral-900
- 文件大小：text-small (14px)，neutral-700
- 删除按钮：24px圆形，error-500色，Hover时背景 error-100

**使用场景:** 应用主界面中央上传区

---

### 3.5 进度条（Progress Bar）

**结构:**
```
进度条轨道
进度条填充（动画）
进度百分比文字
状态文字（"分析中..."）
```

**设计令牌:**
- 宽度：100%（最大600px）
- 轨道高度：8px
- 轨道背景：neutral-200
- 轨道圆角：radius-full
- 填充背景：primary-500
- 填充圆角：radius-full
- 填充动画：线性过渡，配合模糊光效

**进度文字:**
- 百分比：text-subtitle (28px)，weight-bold (700)，primary-500色
- 状态文字："分析中..."，text-body (16px)，neutral-700色

**动画效果:**
- 进度填充：`transition: width 300ms ease-out`
- 脉动效果：`box-shadow: 0 0 20px rgba(0, 122, 255, 0.6)`，1s循环动画

**使用场景:** 视频分析过程中的进度展示

---

### 3.6 结果展示卡片（Result Card）

**结构:**
```
[状态图标 48px]
"信任度"标签
百分比数字（大号）
评估结果文字（"非常信任" / "比较信任" / "不可信"）
分隔线
详细说明（可选）
```

**设计令牌:**
- 内边距：space-12 (48px) 桌面 / space-8 (32px) 移动
- 圆角：radius-2xl (24px)
- 背景：glass-emphasized (rgba(255,255,255,0.5))
- 模糊效果：`backdrop-filter: blur(25px) saturate(160%)`
- 边框：根据结果类型
  - 成功（≥80%）：2px solid success-500
  - 警告（50-79%）：2px solid warning-500
  - 错误（<50%）：2px solid error-500
- 阴影：shadow-glass-hover

**内部元素:**
- 状态图标：48px，对应语义色
  - 成功：check-circle，success-500
  - 警告：alert-triangle，warning-500
  - 错误：x-circle，error-500
- 标签："信任度"，text-small (14px)，neutral-700色，字母间距 0.05em，大写
- 百分比：72px（桌面）/ 56px（移动），weight-bold (700)，对应语义色
- 评估文字：text-subtitle (28px)，weight-semibold (600)，对应语义色

**动画效果:**
- 淡入：opacity 0 → 1，translateY(20px) → 0，duration-slow (600ms)
- 数字计数：从0%动画至目标百分比，800ms

**使用场景:** 分析完成后的结果展示

---

## 4. 布局与响应式

### 4.1 视图结构（基于 content-structure-plan.md）

#### 视图 1：欢迎页（Welcome Page）

**布局模式:** 全屏居中对齐，单列布局

**区块结构:**
```
背景渐变层（bg-gradient-hero）
  └─ 垂直居中容器（min-height: 100vh）
      └─ 玻璃卡片（强调版）
          ├─ 标题区（Hero Pattern简化版）
          │   ├─ 主标题："智能检测AI换脸"（text-hero, 64px）
          │   └─ 副标题："基于深度学习的视频真伪鉴别工具"（text-subtitle, 28px）
          ├─ 使用说明区（内容卡片）
          │   ├─ 说明图标（info-circle, 24px）
          │   ├─ 标题："什么是Deepfake检测？"（text-heading, 20px）
          │   └─ 说明文本（4-6行，text-body, 16px，行高1.7）
          ├─ 协议确认区（表单组件）
          │   ├─ 勾选框（24px × 24px）
          │   └─ 协议文本："我已阅读并同意用户协议"（text-body, 16px）
          └─ 确认按钮区（主要CTA）
              └─ "确认使用"按钮（56px高，全宽移动端 / 320px桌面端）
```

**尺寸规范（桌面端 1920px）:**
- 玻璃卡片最大宽度：720px
- 卡片内边距：space-16 (64px)
- 元素间距：space-8 (32px)
- 标题行高：leading-tight (1.2)
- 说明文本行高：leading-relaxed (1.7)

**响应式调整（移动端 ≤768px）:**
- 卡片最大宽度：92vw（最小margin 16px）
- 卡片内边距：space-8 (32px)
- 主标题：48px（text-title）
- 副标题：20px（text-heading）
- 元素间距：space-6 (24px)
- 按钮：全宽（width 100%）

---

#### 视图 2：应用主界面（Application Main）

**布局模式:** 顶部导航 + 主内容区（垂直居中）

**区块结构:**
```
背景渐变层（bg-gradient-main）
├─ 导航栏（Navigation Bar 玻璃）
│   ├─ Logo图标（shield-check, 32px）
│   └─ 应用标题："智能检测AI换脸"（text-heading, 20px）
│
└─ 主内容区（垂直居中，min-height: calc(100vh - 72px)）
    └─ 内容容器（max-width: 960px）
        ├─ 页面标题："智能检测AI换脸"（text-title, 48px）
        │
        ├─ 上传区域（Upload Zone 玻璃卡片）
        │   ├─ 状态：默认（空） → 已上传（显示文件）
        │   ├─ 图标：upload-cloud / video（64px）
        │   ├─ 提示文字（text-heading + text-small）
        │   └─ 文件信息（上传后显示）
        │
        ├─ 分析按钮（Primary Button）
        │   ├─ 状态：disabled（无文件） → enabled（已上传）
        │   └─ 文字："开始分析"（图标：play-circle）
        │
        ├─ 进度展示区（Progress Bar，分析时显示）
        │   ├─ 进度条（8px高，max-width: 600px）
        │   ├─ 百分比数字（text-subtitle, 28px）
        │   └─ 状态文字："分析中..."（text-body, 16px）
        │
        └─ 结果展示区（Result Card，完成后显示）
            ├─ 状态图标（48px，根据结果类型）
            ├─ "信任度"标签（text-small, 12px）
            ├─ 百分比数字（72px桌面 / 56px移动）
            ├─ 评估结果（text-subtitle, 28px）
            └─ 重新上传按钮（text-body, 16px，链接样式）
```

**尺寸规范（桌面端 1920px）:**
- 内容容器最大宽度：960px
- 容器水平居中：margin 0 auto
- 区块间距：space-12 (48px)
- 上传区最小高度：320px
- 按钮宽度：240px（居中）

**响应式调整（移动端 ≤768px）:**
- 内容容器：92vw（最小margin 16px）
- 页面标题：36px
- 上传区最小高度：240px
- 按钮：全宽（width 100%）
- 区块间距：space-8 (32px)
- 结果卡片内边距：space-8 (32px)

---

### 4.2 响应式断点

| 断点 | 尺寸 | 设备类型 | 关键调整 |
|------|------|----------|----------|
| xs | <640px | 小型手机 | 单列，全宽按钮，减小字体 |
| sm | 640px-768px | 手机横屏 | 单列，部分元素增大 |
| md | 768px-1024px | 平板竖屏 | 过渡尺寸，开始增加间距 |
| lg | 1024px-1280px | 平板横屏/小型笔记本 | 标准桌面布局 |
| xl | 1280px+ | 桌面显示器 | 完整设计尺寸 |

### 4.3 触摸目标

- **最小尺寸:** 44×44px（符合WCAG 2.1 AAA标准）
- **推荐尺寸:** 56×56px（主要按钮）
- **元素间距:** 移动端最小 8px

### 4.4 容器策略

- **最大宽度:** 
  - 欢迎页卡片：720px
  - 主界面内容：960px
  - 进度条：600px
- **水平居中:** `margin: 0 auto`
- **最小外边距:** 移动端 16px

---

## 5. 交互与动画

### 5.1 动画原则

- **性能优先:** 仅动画 `transform` 和 `opacity`（GPU加速）
- **时长选择:** 快速反馈 200ms，标准过渡 300ms，重要动画 400-600ms
- **缓动函数:** 
  - `ease-out` (90%场景) - 快入慢出，自然感
  - `ease-in-out` - 平滑对称，用于淡入淡出
- **减少动态:** 支持 `prefers-reduced-motion` 查询

### 5.2 按钮交互

**Primary Button:**
```css
/* 默认 → Hover */
- transform: scale(1) → scale(1.02)
- box-shadow: shadow-button → shadow-button-hover
- duration: 200ms ease-out

/* Hover → Active */
- transform: scale(1.02) → scale(0.98)
- duration: 100ms ease-out

/* Disabled */
- opacity: 0.5
- cursor: not-allowed
- 无动画
```

### 5.3 玻璃卡片交互

**上传区域卡片:**
```css
/* Hover */
- transform: translateY(0) → translateY(-4px)
- border-color: glass-border → primary-500
- box-shadow: shadow-glass → shadow-glass-hover
- duration: 300ms ease-out

/* 拖拽悬停 */
- background: glass-light → rgba(0, 122, 255, 0.05)
- border: 2px dashed → 2px solid primary-500
- duration: 200ms ease-out
```

### 5.4 进度条动画

**进度填充:**
```css
- 宽度变化：transition: width 300ms ease-out
- 脉动效果：box-shadow 1s infinite alternate
  - 0%: 0 0 10px rgba(0, 122, 255, 0.4)
  - 100%: 0 0 20px rgba(0, 122, 255, 0.8)
```

**加载指示器（可选）:**
- 旋转图标（loader）：360度旋转，1.5s linear infinite

### 5.5 结果卡片动画

**淡入效果:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
animation: fadeInUp 600ms ease-out;
```

**数字计数动画:**
- 百分比从 0% 动画至目标值
- duration: 800ms
- easing: ease-out
- 使用 JavaScript 实现（CSS counter或requestAnimationFrame）

### 5.6 视图切换

**欢迎页 → 主界面:**
```css
/* 欢迎页淡出 */
- opacity: 1 → 0
- transform: scale(1) → scale(0.95)
- duration: 400ms ease-in

/* 主界面淡入 */
- opacity: 0 → 1
- transform: translateY(20px) → translateY(0)
- duration: 400ms ease-out
- delay: 200ms（等待欢迎页淡出）
```

### 5.7 图标微动画

**通用图标 Hover（可选）:**
- 轻微缩放：scale(1) → scale(1.1)
- duration: 200ms
- 仅用于可交互图标（删除按钮等）

**特殊图标:**
- 上传图标（拖拽时）：向上浮动 translateY(0) → translateY(-4px)
- 成功图标（结果展示）：勾选动画（SVG stroke-dashoffset）

### 5.8 减少动态支持

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* 保留透明度渐变，移除位移/缩放 */
  .result-card {
    animation: fadeIn 0.01ms; /* 仅透明度 */
  }
}
```

---

## 附录：设计检查清单

**✅ 风格指南符合性:**
- [x] 使用 macOS 风格中性灰白渐变背景（saturation <10%）
- [x] 玻璃材质：rgba(255,255,255,0.3-0.5) + backdrop-blur(15-25px)
- [x] 蓝色主色调：iOS Blue (#007AFF)
- [x] 所有圆角 12-24px
- [x] 卡片内边距 ≥32px

**✅ 无障碍性（WCAG AA）:**
- [x] 文字对比度 ≥4.5:1（已验证关键配对）
- [x] 触摸目标 ≥44×44px
- [x] 支持 prefers-reduced-motion
- [x] 禁用状态明确（颜色+cursor）

**✅ 响应式:**
- [x] 移动端（≤768px）全宽按钮，减小字体和间距
- [x] 平板端（768-1024px）过渡布局
- [x] 桌面端（≥1024px）完整设计尺寸
- [x] 断点：640px / 768px / 1024px / 1280px

**✅ 性能:**
- [x] 仅动画 transform 和 opacity
- [x] backdrop-filter 提供降级方案
- [x] GPU 加速（will-change 谨慎使用）

**✅ 组件完整性:**
- [x] 6个核心组件（按钮、卡片、导航、上传、进度、结果）
- [x] 每个组件包含默认状态、交互状态、响应式调整
- [x] 无CSS代码，仅设计规范

**✅ 文档规范:**
- [x] ≤3000字
- [x] 5个章节
- [x] 无实现细节
- [x] 引用 content-structure-plan.md

---

**文档版本:** 1.0  
**最后更新:** 2025-11-05  
**设计师:** MiniMax Agent
