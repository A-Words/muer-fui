# PlanList 组件架构文档

本文档介绍了根据 Figma 设计实现的解耦合规划列表组件架构。

## 📋 组件概述

`PlanList` 是一个规划页面的主体内容组件，实现了高度解耦合的架构设计，将复杂的 UI 拆分为多个可重用的子组件。该组件专注于内容展示，不包含状态栏和导航栏（这些由全局组件负责）。

## 🏗️ 组件架构

### 主要组件层次结构

```
PlanList (主容器组件)
├── AppBar (应用栏)
├── EventCard[] (事件卡片列表)
│   ├── EventLocation (事件位置)
│   └── TaskItem[] (任务项列表)
└── BaseInput (输入框)
```

### 组件职责分离

#### 1. **PlanList** - 主容器组件
- **职责**: 整体布局管理、数据传递、状态协调
- **特点**: 纯展示组件，所有交互通过回调函数处理
- **不包含**: 状态栏和导航栏（由全局组件提供）
- **文件**: `PlanList.tsx`, `PlanList.css`

#### 2. **EventCard** - 事件卡片组件
- **职责**: 显示单个事件信息，包含标题、时间、位置和任务列表
- **特点**: 支持不同状态（进行中、即将开始、已完成）的样式变化
- **文件**: `EventCard.tsx`, `EventCard.css`

#### 3. **TaskItem** - 任务项组件
- **职责**: 展示单个任务信息，支持建议功能
- **特点**: 状态驱动的样式，支持等待、进行中、已完成状态
- **文件**: `TaskItem.tsx`, `TaskItem.css`

#### 4. **EventLocation** - 事件位置组件
- **职责**: 显示事件地理位置信息
- **特点**: 简单的图标+文本展示，支持主题色彩
- **文件**: `EventLocation.tsx`, `EventLocation.css`

*注意：StatusBar 和 NavigationBar 组件已被移除，因为这些功能由全局组件提供。*

## 🎨 设计系统集成

### CSS 变量系统

所有组件都使用统一的 CSS 变量系统，确保设计一致性：

```css
/* 颜色变量 */
--text-normal-title-black: #3c3c3c
--text-normal-text-black: #5a5a5a
--text-theme-primary-black: #a02310

/* 尺寸变量 */
--size-large: 24px
--size-regular: 14px
--gap-content-space: 8px
--padding-big: 12px

/* 其他设计标准 */
--border-radius-big: 12px
--box-normal-Background-whiteOnly: #ffffff
```

### 响应式设计

- 固定宽度设计 (412px)，适配移动端屏幕
- 使用 flexbox 布局确保内容自适应
- 支持内容溢出滚动

## 🔧 使用方式

### 基本使用

```tsx
import { PlanList, EventStatus, TaskStatus } from '../components';
import type { EventData, NavItem } from '../components';

const MyPlanningPage = () => {
  const events: EventData[] = [
    {
      id: 'event-1',
      title: '会议讨论',
      timeDescription: '今天的会议 · 还有 2 小时',
      timeRange: '14:00 - 16:00',
      location: '会议室 A',
      status: EventStatus.UPCOMING,
      tasks: [
        {
          title: '准备会议材料',
          status: TaskStatus.IN_PROGRESS,
          isSuggestion: true,
          suggestionText: '开始准备会前笔记',
        }
      ]
    }
  ];

  const callbacks = {
    onEventClick: (eventId: string) => {
      // 处理事件点击
    },
    onTaskClick: (eventId: string, taskIndex: number) => {
      // 处理任务点击
    },
    // ... 其他回调
  };

  return (
    <PlanList
      events={events}
      callbacks={callbacks}
      // ... 其他 props
    />
  );
};
```

### 状态管理

组件采用完全受控的设计模式：

- **数据流**: 单向数据流，通过 props 传入数据
- **事件处理**: 通过回调函数向上传递用户交互
- **状态管理**: 外部管理状态，组件只负责展示

## 🎯 设计原则

### 1. **单一职责原则**
每个组件只负责一个明确的功能，职责边界清晰。

### 2. **开放封闭原则**
组件对扩展开放，对修改封闭。通过 props 和回调函数实现灵活配置。

### 3. **依赖倒置原则**
高层组件不依赖低层组件的具体实现，通过接口进行交互。

### 4. **组合优于继承**
通过组合多个小组件构建复杂 UI，而不是使用继承。

## 🔍 类型安全

### TypeScript 支持

所有组件都提供完整的 TypeScript 类型定义：

```tsx
// 事件数据类型
export interface EventData {
  id: string;
  title: string;
  timeDescription: string;
  timeRange: string;
  location?: string;
  status: EventStatusType;
  tasks?: TaskItemProps[];
}

// 任务状态枚举
export const TaskStatus = {
  WAITING: 'waiting',
  IN_PROGRESS: 'in_progress', 
  COMPLETED: 'completed'
} as const;
```

### 接口设计

- 使用可选属性增加灵活性
- 提供默认值减少必填属性
- 使用联合类型确保类型安全

## 🚀 性能优化

### 1. **代码分割**
每个组件独立打包，支持按需加载。

### 2. **重渲染优化**
- 使用 React.memo 避免不必要的重渲染
- 合理设计 props 结构避免引用变化

### 3. **CSS 优化**
- 使用 CSS 变量减少样式重复
- 采用 BEM 命名规范确保样式隔离

## 📦 扩展性

### 添加新组件

1. 创建组件文件和样式文件
2. 定义 TypeScript 接口
3. 更新 `index.ts` 导出文件
4. 编写组件文档和示例

### 主题定制

通过修改 CSS 变量实现主题定制：

```css
:root {
  --text-theme-primary-black: #your-brand-color;
  --box-normal-Background-whiteOnly: #your-background;
}
```

## 🧪 测试策略

- **单元测试**: 每个组件独立测试
- **集成测试**: 测试组件间交互
- **视觉回归测试**: 确保 UI 一致性

## 📚 相关文件

- `src/components/PlanList.tsx` - 主组件
- `src/components/EventCard.tsx` - 事件卡片
- `src/components/TaskItem.tsx` - 任务项
- `src/components/EventLocation.tsx` - 位置显示
- `src/components/PlanListExample.tsx` - 使用示例

*注意：StatusBar.tsx 和 NavigationBar.tsx 已从此架构中移除，因为这些功能由全局组件提供。*

## 🎨 Figma 设计对照

本实现严格按照 Figma 设计稿进行开发，确保：

- ✅ 像素级还原设计稿
- ✅ 完整支持设计系统变量
- ✅ 保持组件状态一致性
- ✅ 实现所有交互效果

通过这种解耦合的架构设计，我们实现了高度可维护、可扩展和可重用的组件系统。
