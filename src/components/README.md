# PreMeetingNotes 组件使用说明

这是基于Figma设计实现的"会前笔记"组件，用React和TypeScript开发。

## 功能特性

- 📝 显示会前笔记标题和图标
- 📋 支持自定义笔记列表项
- 🎨 渐变背景和阴影效果
- 📱 响应式设计，支持移动端
- 🌙 支持深色模式
- ♿ 良好的可访问性支持

## 使用方式

### 基本用法

```tsx
import PreMeetingNotes from './components/PreMeetingNotes';

function HomePage() {
  return (
    <div>
      <PreMeetingNotes />
    </div>
  );
}
```

### 自定义内容

```tsx
import PreMeetingNotes from './components/PreMeetingNotes';

function HomePage() {
  const customNotes = [
    "准备会议资料",
    "确认参会人员",
    "设置会议室设备",
    "准备演示文档"
  ];

  return (
    <div>
      <PreMeetingNotes 
        title="项目启动会前准备"
        noteItems={customNotes}
        className="my-custom-style"
      />
    </div>
  );
}
```

## Props API

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `"你的会前笔记"` | 组件标题文本 |
| `noteItems` | `string[]` | `["提问参展要求", "和供应商确认进度", "确定参展产品和项目"]` | 笔记列表项 |
| `className` | `string` | `""` | 额外的CSS类名 |

## 样式自定义

组件使用独立的CSS文件 `PreMeetingNotes.css`，你可以通过以下方式自定义样式：

1. 覆盖CSS变量
2. 使用 `className` prop 添加自定义样式
3. 直接修改CSS文件

## 设计规范

组件遵循以下设计规范：
- 主色调：`#9e720b` (标题文字)
- 文本色：`#5a5a5a` (列表文字)
- 背景：渐变从 `#fcf9e2` 到 `#ffffff`
- 字体：OPPO Sans 4.0 (降级到系统字体)
- 阴影：`0px 6px 18px 0px rgba(0,0,0,0.08)`

## 文件结构

```
src/components/
├── PreMeetingNotes.tsx    # 主组件文件
├── PreMeetingNotes.css    # 样式文件
└── index.ts               # 导出文件
```

## 注意事项

1. 图片资源当前使用localhost链接，生产环境需要替换为实际的CDN或本地资源
2. 组件已针对中文内容优化，包含中文字体fallback
3. 支持响应式设计，在小屏幕设备上会自动调整
