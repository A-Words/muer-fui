# Muer AI - 智能会议助手前端界面

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.0.4-yellow.svg)

## 📋 项目概述

Muer AI 是一个智能会议助手的前端界面项目，专为移动端设计。提供会议规划、智能聊天、个人管理等功能，通过现代化的UI组件和AI驱动的交互体验，帮助用户更高效地管理会议和日程。

### 🎯 核心功能

- **🏠 智能主页**: 会议概览、快速操作、会议纪要录制
- **📅 规划管理**: 事件规划、任务管理、时间安排
- **💬 AI聊天**: 智能对话、思考过程展示、事件卡片
- **👤 个人中心**: 用户信息、设置管理

### ✨ 特色亮点

- **📱 移动优先**: 专为移动端优化的响应式设计
- **🤖 AI驱动**: 集成AI对话和智能思考展示
- **🎨 精美UI**: 基于Figma设计稿的像素级还原
- **⚡ 高性能**: 使用Vite构建，支持热重载
- **🔧 模块化**: 高度解耦的组件架构

## 🏗️ 技术栈

### 前端核心
- **React 19.1.0** - 用户界面框架
- **TypeScript 5.8.3** - 类型安全的JavaScript
- **Vite 7.0.4** - 现代构建工具
- **React Router DOM** - 客户端路由

### AI集成
- **@ai-sdk/react** - AI SDK React集成
- **@openrouter/ai-sdk-provider** - OpenRouter AI提供商
- **@ai-sdk/openai-compatible** - OpenAI兼容接口

### 样式和字体
- **CSS Modules** - 组件化样式
- **@fontsource-variable/source-sans-3** - 字体资源
- **OPPO Sans 4.0** - 主要字体族

### 开发工具
- **ESLint** - 代码质量检查
- **TypeScript ESLint** - TS特定规则
- **Vite Plugin SVGR** - SVG组件化

## 📦 项目结构

```
muer-fui/
├── public/                     # 静态资源
│   ├── placeholder.jpg
│   └── vite.svg
├── src/                        # 源代码
│   ├── assets/                 # 资源文件
│   │   ├── icons/             # 图标资源
│   │   ├── loading/           # 加载动画
│   │   └── pic/               # 图片资源
│   ├── components/            # 可重用组件
│   │   ├── AppBar/            # 应用栏组件
│   │   ├── Icon/              # 图标组件
│   │   ├── BaseInput.tsx      # 基础输入框
│   │   ├── ChatBubble.tsx     # 聊天气泡
│   │   ├── ChatCard.tsx       # 聊天卡片
│   │   ├── ChatEventCard.tsx  # 聊天事件卡片
│   │   ├── ThinkingCard.tsx   # 智能思考卡片
│   │   ├── PlanList.tsx       # 规划列表
│   │   ├── EventCard.tsx      # 事件卡片
│   │   ├── MeetingRecorder.tsx # 会议录制器
│   │   └── ...                # 其他组件
│   ├── pages/                 # 页面组件
│   │   ├── HomePage.tsx       # 主页
│   │   ├── ChatPage.tsx       # 聊天页
│   │   ├── PlanningPage.tsx   # 规划页
│   │   └── ProfilePage.tsx    # 个人中心
│   ├── workflows/             # 工作流程
│   │   ├── provider.ts        # AI提供商配置
│   │   └── tools/             # 工具集合
│   ├── App.tsx                # 主应用组件
│   └── main.tsx               # 应用入口
├── package.json               # 项目配置
├── tsconfig.json              # TypeScript配置
├── vite.config.ts             # Vite配置
└── README.md                  # 项目文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0
- 现代浏览器支持

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/A-Words/muer-fui.git
   cd muer-fui
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或使用 yarn
   yarn install
   ```

3. **环境配置**
   
   创建 `.env.local` 文件：
   ```env
   # OpenRouter API配置
   OPENROUTER_API_KEY=your_openrouter_api_key
   
   # SiliconFlow API配置
   SILICONFLOW_API_KEY=your_siliconflow_api_key
   SILICONFLOW_BASE_URL=https://api.siliconflow.cn/v1
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   # 或使用 yarn
   yarn dev
   ```

5. **打开浏览器**
   
   访问 [http://localhost:5173](http://localhost:5173)

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint
```

## 🎨 组件系统

### 核心组件

#### 1. 布局组件
- **AppBar** - 顶部应用栏，支持菜单和头像交互
- **BottomTabBar** - 底部导航栏，页面切换
- **Layout** - 主布局容器，统一页面结构

#### 2. 输入组件
- **BaseInput** - 基础输入框，支持语音和附件
- **ChatBubble** - 聊天气泡，长按显示时间戳
- **MeetingRecorder** - 会议录制控制器

#### 3. 卡片组件
- **ChatCard** - 聊天交互卡片，可点击操作
- **ChatEventCard** - 聊天事件展示卡片
- **ThinkingCard** - AI思考过程展示，可展开详情
- **EventCard** - 事件信息卡片，支持多状态
- **PersonCard** - 人员信息卡片
- **MemoryCard** - 记忆卡片组件

#### 4. 列表组件
- **PlanList** - 规划列表主容器
- **TaskItem** - 任务项组件，支持建议功能
- **AttendeeCard** - 参会人员卡片
- **RelatedLinks** - 相关链接组件

## 🤖 AI集成

### 配置说明

项目集成了多个AI服务提供商：

```typescript
// workflows/provider.ts
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

export const siliconflow = createOpenAICompatible({
  name: 'siliconflow',
  apiKey: process.env.SILICONFLOW_API_KEY!,
  baseURL: process.env.SILICONFLOW_BASE_URL!,
})
```

## 📱 移动端优化

### 响应式设计
- **最大宽度**: 480px，超出时居中显示
- **安全区域**: 支持iPhone刘海屏和底部指示器
- **触摸优化**: 按钮和链接区域≥44px

## 🔧 开发指南

### 添加新组件

1. **创建组件文件**
   ```bash
   src/components/NewComponent.tsx
   src/components/NewComponent.css
   src/components/NewComponent.md
   ```

2. **更新导出**
   ```tsx
   // src/components/index.ts
   export { default as NewComponent } from './NewComponent';
   export type { NewComponentProps } from './NewComponent';
   ```

## 🤝 贡献指南

1. **Fork项目** - 创建你的功能分支
2. **本地开发** - 遵循代码规范和测试要求
3. **提交代码** - 使用语义化提交信息
4. **创建PR** - 详细描述变更内容

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

---

**Muer AI - 让会议更智能，让协作更高效** ✨
