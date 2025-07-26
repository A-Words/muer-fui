# ChatEventCard 聊天事件卡片组件

## 概述

ChatEventCard 是一个专为聊天界面设计的事件信息展示卡片组件。它采用了温暖的橙色背景和红色文字，完美还原了 Figma 设计稿的视觉效果。

## 特性

- 🎨 **视觉设计**：完全还原 Figma 设计，使用橙色背景 (#fdebe3) 和红色文字 (#9a0f16)
- 📱 **响应式**：适配移动端和桌面端显示
- 🌙 **主题支持**：支持暗色主题
- 💫 **交互效果**：悬停时有轻微的动画效果
- 🔤 **字体**：使用 OPPO Sans 4.0 字体族

## Props

| 属性 | 类型 | 默认值 | 必填 | 描述 |
|------|------|--------|------|------|
| title | string | - | ✅ | 事件标题 |
| time | string | - | ✅ | 事件时间 |
| location | string | - | ❌ | 事件地点 |
| statusMessage | string | - | ❌ | 状态信息 |
| locationIcon | string | 'placeFlag' | ❌ | 地点图标名称 |
| className | string | '' | ❌ | 自定义样式类名 |
| onClick | () => void | - | ❌ | 点击事件回调 |

## 使用示例

### 基础使用

```tsx
import { ChatEventCard } from '@/components';

function ChatExample() {
  return (
    <ChatEventCard
      title="在香港参加聚会"
      time="5月10日 21:00 - 次日 01:00"
      location="香港帕蒂奈 KTV"
      statusMessage="经过检查，规划安排没有冲突"
    />
  );
}
```

### 带点击事件

```tsx
function InteractiveChatCard() {
  const handleCardClick = () => {
    console.log('卡片被点击了');
  };

  return (
    <ChatEventCard
      title="团队会议"
      time="今天 14:00 - 16:00"
      location="会议室A"
      statusMessage="准备就绪"
      onClick={handleCardClick}
    />
  );
}
```

### 自定义样式

```tsx
function CustomStyledCard() {
  return (
    <ChatEventCard
      title="重要活动"
      time="明天 10:00"
      className="my-custom-card"
    />
  );
}
```

## 设计规范

### 颜色
- 背景色：`#fdebe3` (温暖橙色)
- 文字色：`#9a0f16` (深红色)
- 暗色主题文字：`#ff6b7a` (浅红色)

### 字体
- 标题：OPPO Sans 4.0 SemiBold, 18px, 行高 22px
- 时间：OPPO Sans 4.0 Light, 18px, 行高 22px  
- 地点和状态：OPPO Sans 4.0 Regular, 14px, 行高 18px

### 间距
- 内边距：10px 12px
- 元素间距：2px
- 圆角：8px

## 无障碍支持

- 支持键盘导航
- 适当的颜色对比度
- 语义化的 HTML 结构

## 注意事项

1. 确保项目中已安装并配置了 Icon 组件
2. OPPO Sans 4.0 字体需要单独加载
3. 组件会自动处理文本溢出，使用省略号显示
4. 在移动端会自动调整布局为垂直排列
