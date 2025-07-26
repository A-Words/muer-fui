# RelatedLinks 组件使用说明

这是基于Figma设计实现的"相关链接"组件，用React和TypeScript开发。

## 功能特性

- 🔗 链接列表展示和管理
- 🖼️ 自定义链接图标显示
- 🎯 可点击跳转到外部链接
- 🎨 蓝色渐变背景设计
- 📱 响应式设计，支持移动端
- 🌙 支持深色模式
- ✨ 丰富的交互效果
- ♿ 良好的可访问性支持
- ⚡ 点击波纹动画

## 使用方式

### 基本用法

```tsx
import RelatedLinks from './components/RelatedLinks';

function HomePage() {
  return (
    <div>
      <RelatedLinks />
    </div>
  );
}
```

### 自定义链接

```tsx
import RelatedLinks, { LinkInfo } from './components/RelatedLinks';

function HomePage() {
  const customLinks: LinkInfo[] = [
    {
      id: '1',
      name: 'GitHub',
      url: 'github.com/username',
      icon: '/images/github-icon.png'
    },
    {
      id: '2',
      name: '官方网站',
      url: 'example.com',
      icon: '/images/website-icon.png'
    },
    {
      id: '3',
      name: '文档中心',
      url: 'https://docs.example.com',
      icon: '/images/docs-icon.png'
    }
  ];

  return (
    <div>
      <RelatedLinks 
        title="快捷链接"
        links={customLinks}
        className="my-custom-links"
      />
    </div>
  );
}
```

### 自定义点击处理

```tsx
import RelatedLinks, { LinkInfo } from './components/RelatedLinks';

function HomePage() {
  const handleLinkClick = (link: LinkInfo) => {
    // 自定义处理逻辑
    console.log('用户点击了链接:', link.name);
    
    // 可以添加统计、验证等逻辑
    if (link.url.includes('github.com')) {
      // 特殊处理GitHub链接
      window.open(`https://${link.url}`, '_blank');
    } else {
      // 默认处理
      window.open(`https://${link.url}`, '_blank');
    }
  };

  return (
    <div>
      <RelatedLinks 
        onLinkClick={handleLinkClick}
      />
    </div>
  );
}
```

### 带自定义onClick的链接

```tsx
import RelatedLinks, { LinkInfo } from './components/RelatedLinks';

function HomePage() {
  const linksWithCustomActions: LinkInfo[] = [
    {
      id: '1',
      name: '下载报告',
      url: 'download.example.com',
      icon: '/images/download-icon.png',
      onClick: () => {
        // 自定义点击行为
        console.log('开始下载报告...');
        // 调用下载API
        downloadReport();
      }
    },
    {
      id: '2',
      name: '联系支持',
      url: 'support.example.com',
      icon: '/images/support-icon.png',
      onClick: () => {
        // 打开支持聊天
        openSupportChat();
      }
    }
  ];

  const downloadReport = () => {
    // 下载逻辑
  };

  const openSupportChat = () => {
    // 打开聊天逻辑
  };

  return (
    <div>
      <RelatedLinks 
        title="操作中心"
        links={linksWithCustomActions}
      />
    </div>
  );
}
```

## Props API

### RelatedLinksProps

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `"相关链接"` | 组件标题文本 |
| `links` | `LinkInfo[]` | 默认示例数据 | 链接列表数据 |
| `className` | `string` | `""` | 额外的CSS类名 |
| `onLinkClick` | `(link: LinkInfo) => void` | `undefined` | 链接点击回调函数 |

### LinkInfo 接口

| 属性 | 类型 | 描述 |
|------|------|------|
| `id` | `string` | 唯一标识符 |
| `name` | `string` | 链接显示名称 |
| `url` | `string` | 链接地址（支持相对和绝对URL） |
| `icon` | `string` | 图标图片URL |
| `onClick` | `() => void` | 可选的自定义点击处理函数 |

## 交互行为

### 点击优先级
1. **自定义onClick**: 如果LinkInfo中定义了onClick，优先执行
2. **组件onLinkClick**: 如果组件props中定义了onLinkClick，次之执行
3. **默认行为**: 在新窗口打开链接

### URL处理
- **相对URL**: 自动添加https://前缀
- **绝对URL**: 直接使用
- **特殊协议**: 支持mailto:、tel:等

### 键盘导航
- **Tab键**: 在链接间导航
- **Enter/Space**: 激活选中的链接

## 样式自定义

组件使用独立的CSS文件 `RelatedLinks.css`，支持多种自定义方式：

### 1. CSS变量覆盖

```css
.my-custom-links {
  --links-primary-color: #7c3aed;
  --links-bg-start: #f3e8ff;
  --links-bg-end: #ffffff;
  --links-hover-bg: #faf5ff;
}
```

### 2. 主题定制

```css
/* 绿色主题 */
.related-links.theme-green {
  background: linear-gradient(to bottom, #d1fae5, #ffffff);
}

.related-links.theme-green .title-text p {
  color: #065f46;
}

.related-links.theme-green .link-item:hover {
  background: #ecfdf5;
  box-shadow: 0 2px 4px rgba(6, 95, 70, 0.1);
}

/* 深色主题 */
.related-links.theme-dark {
  background: linear-gradient(to bottom, #1f2937, #111827);
}
```

### 3. 图标样式

```css
/* 圆角图标 */
.related-links .link-icon-container {
  border-radius: 8px;
}

/* 方形图标 */
.related-links .link-icon-container {
  border-radius: 0;
}

/* 图标边框 */
.related-links .link-icon-container {
  border: 2px solid #e5e7eb;
}
```

## 设计规范

组件遵循以下设计规范：
- 主色调：`#1156a0` (标题文字)
- 链接名称：`#5a5a5a`
- 链接URL：`#787878`
- 背景：渐变从 `#e3f7fd` 到 `#ffffff`
- 字体：OPPO Sans 4.0 (降级到系统字体)
- 阴影：`0px 6px 18px 0px rgba(0,0,0,0.08)`
- 图标尺寸：30px × 30px

## 高级用法

### 1. 动态加载链接

```tsx
import { useState, useEffect } from 'react';
import RelatedLinks, { LinkInfo } from './components/RelatedLinks';

function DynamicLinksPage() {
  const [links, setLinks] = useState<LinkInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从API加载链接数据
    fetchLinks().then(data => {
      setLinks(data);
      setLoading(false);
    });
  }, []);

  const fetchLinks = async (): Promise<LinkInfo[]> => {
    const response = await fetch('/api/links');
    return response.json();
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <RelatedLinks 
      title="动态链接"
      links={links}
    />
  );
}
```

### 2. 链接统计

```tsx
import RelatedLinks, { LinkInfo } from './components/RelatedLinks';

function AnalyticsLinksPage() {
  const handleLinkClick = async (link: LinkInfo) => {
    // 发送点击统计
    await fetch('/api/analytics/link-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        linkId: link.id,
        linkName: link.name,
        timestamp: new Date().toISOString()
      })
    });

    // 打开链接
    const fullUrl = link.url.startsWith('http') ? link.url : `https://${link.url}`;
    window.open(fullUrl, '_blank');
  };

  return (
    <RelatedLinks 
      title="统计链接"
      onLinkClick={handleLinkClick}
    />
  );
}
```

### 3. 权限控制

```tsx
import { useState, useEffect } from 'react';
import RelatedLinks, { LinkInfo } from './components/RelatedLinks';

function SecureLinksPage() {
  const [visibleLinks, setVisibleLinks] = useState<LinkInfo[]>([]);

  useEffect(() => {
    // 根据用户权限过滤链接
    const allLinks: LinkInfo[] = [
      { id: '1', name: '管理面板', url: 'admin.example.com', icon: '/admin-icon.png' },
      { id: '2', name: '用户中心', url: 'user.example.com', icon: '/user-icon.png' },
      { id: '3', name: '帮助文档', url: 'help.example.com', icon: '/help-icon.png' }
    ];

    // 检查用户权限
    const userRole = getCurrentUserRole();
    const filtered = allLinks.filter(link => {
      if (link.id === '1') return userRole === 'admin';
      return true; // 其他链接对所有用户可见
    });

    setVisibleLinks(filtered);
  }, []);

  const getCurrentUserRole = () => {
    // 获取当前用户角色的逻辑
    return 'user'; // 示例返回
  };

  return (
    <RelatedLinks 
      title="个人链接"
      links={visibleLinks}
    />
  );
}
```

## 可访问性

- **ARIA标签**: 所有链接都有适当的aria-label
- **键盘导航**: 完整的键盘操作支持
- **屏幕阅读器**: 兼容主流屏幕阅读器
- **颜色对比**: 符合WCAG AA标准
- **焦点指示**: 清晰的焦点边框

## 性能优化

- **图片懒加载**: 建议对图标实现懒加载
- **虚拟滚动**: 大量链接时考虑虚拟滚动
- **缓存策略**: 链接数据缓存
- **预加载**: 重要链接的预加载

## 浏览器兼容性

- **现代浏览器**: Chrome, Firefox, Safari, Edge
- **移动浏览器**: iOS Safari, Chrome Mobile
- **特性支持**: CSS Grid, Flexbox, CSS Variables
- **回退方案**: 优雅降级到基础样式

## 常见问题

### Q: 如何修改链接的打开方式？
A: 在自定义的onClick或onLinkClick中控制：
```tsx
const handleLinkClick = (link: LinkInfo) => {
  // 在当前窗口打开
  window.location.href = `https://${link.url}`;
  
  // 或者在新窗口打开
  window.open(`https://${link.url}`, '_blank');
};
```

### Q: 如何添加加载状态？
A: 可以通过CSS类或组件状态控制：
```tsx
const [loading, setLoading] = useState(false);

const handleLinkClick = async (link: LinkInfo) => {
  setLoading(true);
  // 执行异步操作
  await someAsyncOperation();
  setLoading(false);
};
```

### Q: 如何自定义图标样式？
A: 通过CSS覆盖图标容器样式：
```css
.related-links .link-icon-container {
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: #f9fafb;
}
```

这个组件为链接管理提供了完整的UI解决方案，可以轻松集成到任何需要链接展示的应用中。
