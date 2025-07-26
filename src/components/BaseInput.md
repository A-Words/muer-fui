# BaseInput 组件

一个带有输入框和图标按钮的基础输入组件，基于 Figma 设计生成。

## 功能特性

- 📝 支持文本输入
- 🎤 语音输入按钮
- 📎 附件按钮
- 🎨 符合设计规范的样式
- ♿ 可访问性支持
- 📱 响应式设计

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `placeholder` | `string` | `"和 Muer AI 说说看你的规划问题？"` | 输入框占位符文本 |
| `value` | `string` | `""` | 输入框值 |
| `onChange` | `(value: string) => void` | - | 输入值变化回调 |
| `onMicrophoneClick` | `() => void` | - | 麦克风按钮点击回调 |
| `onAttachClick` | `() => void` | - | 附件按钮点击回调 |
| `className` | `string` | `""` | 自定义CSS类名 |

## 使用示例

### 基础用法

```tsx
import BaseInput from './components/BaseInput';

function App() {
  const [inputValue, setInputValue] = useState('');

  return (
    <BaseInput
      value={inputValue}
      onChange={setInputValue}
      onMicrophoneClick={() => console.log('语音输入')}
      onAttachClick={() => console.log('添加附件')}
    />
  );
}
```

### 自定义占位符

```tsx
<BaseInput
  placeholder="请输入您的问题..."
  onChange={(value) => console.log(value)}
/>
```

### 带有自定义样式

```tsx
<BaseInput
  className="custom-input"
  value={value}
  onChange={setValue}
/>
```

## 样式定制

组件使用 CSS 文件进行样式定义，支持以下自定义：

- `.base-input` - 主容器样式
- `.input-field` - 输入框样式
- `.icon-button` - 图标按钮样式
- `.icon` - 图标样式

### 主要设计变量

- 背景色: `#ffffff`
- 边框色: `#e1e1e1`
- 文本色: `#5a5a5a`
- 字体: OPPO Sans 4.0
- 圆角: 6px
- 阴影: `0px 6px 18px 0px rgba(0,0,0,0.08)`

## 可访问性

- 支持键盘导航
- 提供适当的 ARIA 标签
- 支持屏幕阅读器

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 注意事项

1. 图片资源目前使用 localhost 链接，生产环境需要替换为实际的资源路径
2. 建议在实际项目中添加错误处理和加载状态
3. 可以根据需要扩展更多功能，如文件上传、语音识别等
