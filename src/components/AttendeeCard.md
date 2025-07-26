# AttendeeCard 组件使用说明

这是基于Figma设计实现的"参会人名片"组件，用React和TypeScript开发。

## 功能特性

- 👥 显示参会人员列表
- 🖼️ 支持头像显示
- 📛 显示姓名和职位信息
- 🎨 绿色渐变背景设计
- 📱 响应式设计，支持移动端
- 🌙 支持深色模式
- ✨ 悬停交互效果
- ➖ 自动分隔线

## 使用方式

### 基本用法

```tsx
import AttendeeCard from './components/AttendeeCard';

function HomePage() {
  return (
    <div>
      <AttendeeCard />
    </div>
  );
}
```

### 自定义内容

```tsx
import AttendeeCard, { AttendeeInfo } from './components/AttendeeCard';

function HomePage() {
  const customAttendees: AttendeeInfo[] = [
    {
      id: '1',
      name: '李明',
      title: '项目经理',
      avatar: '/images/avatars/li-ming.jpg'
    },
    {
      id: '2',
      name: '王小红',
      title: '技术总监',
      avatar: '/images/avatars/wang-xiaohong.jpg'
    },
    {
      id: '3',
      name: 'John Smith',
      title: '产品经理',
      avatar: '/images/avatars/john-smith.jpg'
    }
  ];

  return (
    <div>
      <AttendeeCard 
        title="项目团队成员"
        attendees={customAttendees}
        className="my-custom-style"
      />
    </div>
  );
}
```

## Props API

### AttendeeCardProps

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `"参会人名片"` | 组件标题文本 |
| `attendees` | `AttendeeInfo[]` | 默认示例数据 | 参会人员列表 |
| `className` | `string` | `""` | 额外的CSS类名 |

### AttendeeInfo 接口

| 属性 | 类型 | 描述 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `name` | `string` | 参会人员姓名 |
| `title` | `string` | 职位或角色 |
| `avatar` | `string` | 头像图片URL |

## 样式自定义

组件使用独立的CSS文件 `AttendeeCard.css`，你可以通过以下方式自定义样式：

### 1. CSS变量覆盖

```css
.my-custom-attendee-card {
  --title-color: #2563eb;
  --bg-gradient-start: #dbeafe;
  --bg-gradient-end: #ffffff;
}
```

### 2. 使用className

```tsx
<AttendeeCard className="my-custom-attendee-card" />
```

### 3. 直接修改CSS文件

修改 `AttendeeCard.css` 中的样式规则。

## 设计规范

组件遵循以下设计规范：
- 主色调：`#057652` (标题文字)
- 姓名文字：`#5a5a5a`
- 职位文字：`#787878`  
- 背景：渐变从 `#d5eddf` 到 `#ffffff`
- 字体：OPPO Sans 4.0 (降级到系统字体)
- 阴影：`0px 6px 18px 0px rgba(0,0,0,0.08)`
- 头像尺寸：30px × 30px

## 交互特性

- **悬停效果**：鼠标悬停时参会人员项目背景色会改变
- **文本溢出**：长姓名和职位会自动截断并显示省略号
- **响应式**：在小屏幕设备上自动调整字体大小和间距

## 可访问性

- 所有图片都包含适当的 `alt` 属性
- 支持键盘导航
- 颜色对比度符合WCAG标准
- 支持屏幕阅读器

## 文件结构

```
src/components/
├── AttendeeCard.tsx       # 主组件文件
├── AttendeeCard.css       # 样式文件
└── index.ts               # 导出文件
```

## 注意事项

1. **图片资源**：当前使用localhost链接，生产环境需要替换为实际的CDN或本地资源
2. **头像处理**：建议对头像进行压缩和格式优化
3. **数据验证**：建议在实际使用时添加数据验证
4. **无障碍访问**：确保头像有意义的alt文本
5. **性能优化**：对于大量参会人员，考虑使用虚拟滚动

## 扩展建议

1. **点击事件**：为参会人员添加点击回调
2. **状态指示**：添加在线/离线状态指示
3. **搜索功能**：为大量参会人员添加搜索
4. **分组功能**：按部门或角色分组显示
5. **拖拽排序**：允许用户调整显示顺序
