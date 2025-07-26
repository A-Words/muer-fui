# PersonCard 组件

PersonCard 是一个人名片组件，用于显示用户的头像和姓名，100% 还原 Figma 设计。

## 功能特性

- 显示用户头像（支持图片或占位符）
- 显示用户姓名
- 支持三种尺寸：small、medium、large
- 完全还原 Figma 设计规范

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | string | - | 用户姓名（必填） |
| avatarUrl | string | - | 头像图片URL（可选） |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 组件尺寸 |

## 使用示例

```tsx
import { PersonCard } from '../components';

// 基础用法
<PersonCard name="凯伦" />

// 带头像
<PersonCard 
  name="凯伦" 
  avatarUrl="https://example.com/avatar.jpg" 
/>

// 不同尺寸
<PersonCard name="凯伦" size="small" />
<PersonCard name="凯伦" size="medium" />
<PersonCard name="凯伦" size="large" />
```

## 设计规范

组件严格按照 Figma 设计规范实现：

- 头像尺寸：52px (medium)
- 字体：OPPO Sans 4.0 Light
- 字号：24px (medium)
- 行高：30px
- 文字颜色：#3C3C3C
- 占位符背景：#ECE6F0
- 间距：12px

## 样式变体

### Small (36px 头像)
- 头像：36px
- 字号：16px
- 行高：20px
- 间距：8px

### Medium (52px 头像) - 默认
- 头像：52px
- 字号：24px
- 行高：30px
- 间距：12px

### Large (64px 头像)
- 头像：64px
- 字号：28px
- 行高：34px
- 间距：16px
