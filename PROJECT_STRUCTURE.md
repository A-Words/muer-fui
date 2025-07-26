# Muer FUI - 手机端React应用基础框架

## 项目结构

```
src/
├── App.tsx                 # 主应用组件，配置路由
├── App.css                 # 全局样式，移动端优化
├── main.tsx               # 应用入口
├── index.css              # 基础样式
├── components/            # 组件目录
│   ├── BottomTabBar.tsx   # 底部Tab栏组件 ✅
│   ├── BottomTabBar.css   # Tab栏样式
│   ├── Layout.tsx         # 布局组件 ✅
│   └── Layout.css         # 布局样式
└── pages/                 # 页面目录 ✅
    ├── HomePage.tsx       # 木耳主页 - 空白页
    ├── HomePage.css       # 主页样式
    ├── PlanningPage.tsx   # 规划页面 - 空白页
    ├── PlanningPage.css   # 规划页样式
    ├── ProfilePage.tsx    # 个人中心页面 - 空白页
    └── ProfilePage.css    # 个人中心样式
```

## 功能特点

✅ **移动端优化**: 最大宽度480px，响应式设计
✅ **路由系统**: 使用React Router实现页面切换
✅ **底部导航**: 使用BottomTabBar组件进行路由切换
✅ **三个页面**: 木耳主页、规划页面、个人中心页面
✅ **TypeScript支持**: 完整的类型定义

## 路由配置

- `/` 或 `/home` -> HomePage (木耳主页)
- `/planning` -> PlanningPage (规划页面)  
- `/profile` -> ProfilePage (个人中心页面)

## 如何使用

1. 启动开发服务器: `npm run dev`
2. 访问: http://localhost:5175/
3. 点击底部Tab栏切换页面

## 技术栈

- React 19.1.0
- TypeScript 5.8.3
- React Router DOM
- Vite 7.0.4
- CSS3 (移动端优化)

## 页面说明

所有页面都是空白页面，没有任何内容，方便后续开发时添加具体功能。
