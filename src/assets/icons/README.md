# SVG图标系统使用指南

## 文件结构

```
src/
├── assets/
│   └── icons/          # SVG图标文件夹
│       ├── default.svg # 默认占位图标
│       └── ...         # 你的SVG文件放在这里
└── components/
    └── Icon/           # Icon组件
        ├── Icon.tsx
        ├── Icon.css
        └── index.ts
```

## 如何添加新图标

1. 将你的SVG文件放入 `src/assets/icons/` 文件夹
2. 文件命名规范：使用小写字母和连字符，如：`user-profile.svg`、`home.svg`、`arrow-left.svg`

## 使用Icon组件

```tsx
import { Icon } from '../components';

// 基本使用
<Icon name="home" />

// 设置大小
<Icon name="home" size={24} />
<Icon name="home" size="2rem" />

// 设置颜色
<Icon name="home" color="#007AFF" />

// 添加点击事件
<Icon name="home" onClick={() => console.log('clicked')} />

// 自定义样式类
<Icon name="home" className="custom-icon" />
```

## Props说明

- `name`: 图标名称（不包含.svg扩展名）
- `size`: 图标大小，可以是数字（像素）或字符串
- `color`: 图标颜色
- `className`: 自定义CSS类名
- `onClick`: 点击事件处理函数

## 注意事项

1. SVG文件需要使用 `currentColor` 或 `fill="currentColor"` 来支持颜色自定义
2. 如果图标不存在，会显示默认的占位图标
3. 带有点击事件的图标会自动添加悬停和焦点效果
4. 组件使用懒加载，首次加载时会有轻微延迟

## 推荐的SVG优化

1. 移除不必要的属性和注释
2. 使用相对路径而不是绝对路径
3. 设置合适的viewBox
4. 使用currentColor以支持颜色定制
