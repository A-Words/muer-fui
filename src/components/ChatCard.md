# ChatCard 聊天卡片组件

## 概述
ChatCard 是一个可点击的卡片组件，专为聊天界面设计，用于显示结构化信息和引导用户进行交互。

## 功能特性
- 可点击的卡片界面，包含标题和副标题
- 使用项目内 Icon 组件库的箭头图标指示可点击性
- Hover 和点击动画效果
- 支持禁用状态
- 响应式设计，适配移动端
- 平滑的入场动画效果
- 无障碍访问支持

## Props

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|---------|------|
| title | string | 是 | - | 卡片主标题 |
| subtitle | string | 是 | - | 卡片副标题 |
| onClick | () => void | 否 | - | 点击回调函数 |
| className | string | 否 | '' | 额外的 CSS 类名 |
| disabled | boolean | 否 | false | 是否禁用卡片 |

## 使用示例

```tsx
import ChatCard from '../components/ChatCard';

// 基础使用
<ChatCard
  title="Muer 对你去香港聚会的问题"
  subtitle="等待你回答"
  onClick={() => console.log('卡片被点击')}
/>

// 禁用状态
<ChatCard
  title="已完成的任务"
  subtitle="点击查看详情"
  disabled={true}
  onClick={() => console.log('这不会被触发')}
/>

// 自定义样式
<ChatCard
  title="重要提醒"
  subtitle="请及时处理"
  className="urgent-card"
  onClick={handleUrgentClick}
/>
```

## 样式说明

### 外观设计
- 外层背景：#f0f0f0（浅灰色边框效果）
- 内容背景：#ffffff（白色）
- 圆角：8px（外层）、6px（内容区域）
- 阴影：Hover 时显示轻微阴影
- 图标：使用项目内 Icon 组件库的 'arrowLeftRight' 图标

### 文字样式
- **标题**：14px, #5a5a5a, 行高 18px
- **副标题**：12px, #787878, 行高 16px
- 字体：OPPO Sans 4.0

### 交互效果
- **Hover**：背景变深，向上平移 1px，显示阴影，箭头右移
- **Active**：恢复位置，减少阴影
- **Disabled**：透明度 0.6，禁用鼠标事件

## 在聊天中的使用场景

1. **问题卡片**：展示待回答的问题
2. **建议卡片**：显示 AI 的建议或推荐
3. **操作卡片**：引导用户进行特定操作
4. **信息卡片**：展示结构化的信息内容
5. **混合内容**：与文本消息组合使用，在同一条回复中展示

## 混合内容支持

ChatCard 现在支持与文本消息混合使用：

```tsx
// 在聊天页面中，AI 可以在同一条回复中发送文本和卡片
const aiReply = {
  content: [
    {
      type: 'text',
      data: '根据你的情况，我为你准备了一份详细的规划建议：'
    },
    {
      type: 'card',
      data: {
        title: '香港聚会规划建议',
        subtitle: '点击查看详细规划方案',
        onClick: () => handlePlanClick()
      }
    }
  ]
};
```

## 注意事项
- 确保提供有意义的 title 和 subtitle
- onClick 为可选，不提供时卡片仍可显示但不可点击
- disabled 状态下 onClick 不会被触发
- 组件会自动处理长文本的换行
