# BottomTabBar 组件使用说明

这是基于Figma设计实现的底部Tab栏组件，用React和TypeScript开发。

## 功能特性

- 📱 底部导航栏设计
- 🎯 支持活跃状态切换
- 🖼️ 支持普通和活跃状态图标
- 🎨 橙色渐变背景高亮设计
- 📱 响应式设计，支持移动端
- ✨ 悬停和点击交互效果
- ⌨️ 支持键盘导航
- 🔍 无障碍访问支持

## 使用方式

### 基本用法

```tsx
import BottomTabBar from './components/BottomTabBar';

function App() {
  return (
    <div>
      <BottomTabBar />
    </div>
  );
}
```

### 受控模式

```tsx
import React, { useState } from 'react';
import BottomTabBar, { TabItem } from './components/BottomTabBar';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const customTabs: TabItem[] = [
    {
      id: 'home',
      label: '首页',
      icon: '/icons/home.svg',
      activeIcon: '/icons/home-active.svg'
    },
    {
      id: 'search', 
      label: '搜索',
      icon: '/icons/search.svg',
      activeIcon: '/icons/search-active.svg'
    },
    {
      id: 'profile',
      label: '我的',
      icon: '/icons/profile.svg',
      activeIcon: '/icons/profile-active.svg'
    }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log('切换到:', tabId);
  };

  return (
    <div>
      <BottomTabBar 
        tabs={customTabs}
        activeTabId={activeTab}
        onTabChange={handleTabChange}
        className="my-custom-tab-bar"
      />
    </div>
  );
}
```

### 自定义点击事件

```tsx
import BottomTabBar, { TabItem } from './components/BottomTabBar';

function App() {
  const tabsWithCustomActions: TabItem[] = [
    {
      id: 'home',
      label: '木耳',
      icon: '/icons/home.svg',
      onClick: () => {
        // 自定义点击逻辑
        window.location.href = '/home';
      }
    },
    {
      id: 'planning',
      label: '规划', 
      icon: '/icons/planning.svg',
      onClick: () => {
        // 打开规划页面
        window.location.href = '/planning';
      }
    }
  ];

  return (
    <BottomTabBar tabs={tabsWithCustomActions} />
  );
}
```

## Props API

### BottomTabBarProps

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `tabs` | `TabItem[]` | 默认示例数据 | Tab项目列表 |
| `activeTabId` | `string` | `undefined` | 当前活跃的Tab ID (受控模式) |
| `onTabChange` | `(tabId: string) => void` | `undefined` | Tab切换回调函数 |
| `className` | `string` | `""` | 额外的CSS类名 |

### TabItem 接口

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `id` | `string` | ✅ | 唯一标识符 |
| `label` | `string` | ✅ | Tab标签文本 |
| `icon` | `string` | ✅ | 普通状态图标URL |
| `activeIcon` | `string` | ❌ | 活跃状态图标URL |
| `isActive` | `boolean` | ❌ | 是否为活跃状态 (非受控模式) |
| `onClick` | `() => void` | ❌ | 点击回调函数 |

## 样式自定义

组件使用独立的CSS文件 `BottomTabBar.css`，你可以通过以下方式自定义样式：

### 1. CSS变量覆盖

```css
.my-custom-tab-bar {
  --tab-active-bg: #d5eddf;
  --tab-active-text: #057652;
  --tab-normal-text: #49454f;
  --tab-border-color: #e1e1e1;
}
```

### 2. 使用className

```tsx
<BottomTabBar className="my-custom-tab-bar" />
```

### 3. 直接修改CSS文件

修改 `BottomTabBar.css` 中的样式规则。

## 设计规范

组件遵循以下设计规范：
- 背景色：`#ffffff`
- 活跃状态背景：`#fbcebc` (橙色渐变)
- 普通文字颜色：`#49454f`
- 活跃文字颜色：`#625b71`
- 字体：OPPO Sans 4.0 (降级到系统字体)
- 字体大小：14px
- 行高：18px
- 图标尺寸：24px × 24px
- 容器高度：32px × 56px
- 顶部边框：1px solid #e1e1e1

## 交互特性

- **点击切换**：点击Tab项目可以切换活跃状态
- **悬停效果**：鼠标悬停时背景色会变化
- **键盘导航**：支持Tab键和Enter键操作
- **活跃动画**：切换到活跃状态时有缩放动画效果
- **图标切换**：活跃状态会显示不同的图标

## 可访问性

- 所有图标都包含适当的 `alt` 属性
- 支持键盘导航 (Tab键和Enter键)
- 颜色对比度符合WCAG标准
- 支持屏幕阅读器
- 焦点状态有明显的视觉反馈

## 文件结构

```
src/components/
├── BottomTabBar.tsx       # 主组件文件
├── BottomTabBar.css       # 样式文件
├── BottomTabBar.md        # 使用说明文档
└── index.ts               # 导出文件 (需要更新)
```

## 注意事项

1. **图片资源**：当前使用localhost链接，生产环境需要替换为实际的CDN或本地资源
2. **图标优化**：建议对图标进行SVG优化和压缩
3. **状态管理**：支持受控和非受控两种模式
4. **无障碍访问**：确保图标有意义的alt文本
5. **性能优化**：图标建议使用懒加载或预加载

## 扩展建议

1. **角标功能**：为Tab添加数字角标或红点提示
2. **手势支持**：添加左右滑动切换Tab
3. **动态Tab**：支持动态添加和删除Tab项目
4. **主题切换**：支持深色模式和主题定制
5. **路由集成**：与React Router等路由库集成
6. **持久化**：记住用户的Tab选择状态

## 集成示例

### 与React Router集成

```tsx
import { useNavigate, useLocation } from 'react-router-dom';
import BottomTabBar from './components/BottomTabBar';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', label: '木耳', icon: '/icons/home.svg', path: '/' },
    { id: 'planning', label: '规划', icon: '/icons/planning.svg', path: '/planning' },
    { id: 'profile', label: '我', icon: '/icons/profile.svg', path: '/profile' }
  ];

  const currentTab = tabs.find(tab => tab.path === location.pathname)?.id || 'home';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <BottomTabBar 
      tabs={tabs}
      activeTabId={currentTab}
      onTabChange={handleTabChange}
    />
  );
}
```
