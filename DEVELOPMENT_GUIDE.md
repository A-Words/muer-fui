# Muer AI 开发文档

## 目录
- [项目架构](#项目架构)
- [技术栈详解](#技术栈详解)
- [组件设计](#组件设计)
- [状态管理](#状态管理)
- [API集成](#api集成)
- [开发规范](#开发规范)
- [性能优化](#性能优化)
- [测试策略](#测试策略)
- [部署指南](#部署指南)

## 项目架构

### 整体架构图

```
┌─────────────────────────────────────────┐
│              前端应用层                    │
├─────────────────────────────────────────┤
│  Pages (页面层)                          │
│  ├── HomePage (主页)                     │
│  ├── ChatPage (聊天页)                   │
│  ├── PlanningPage (规划页)               │
│  └── ProfilePage (个人中心)               │
├─────────────────────────────────────────┤
│  Components (组件层)                     │
│  ├── Layout Components (布局组件)        │
│  ├── UI Components (UI组件)              │
│  ├── Business Components (业务组件)      │
│  └── Common Components (通用组件)        │
├─────────────────────────────────────────┤
│  Services (服务层)                       │
│  ├── AI Service (AI服务)                │
│  ├── API Service (API服务)              │
│  └── Utils (工具函数)                    │
├─────────────────────────────────────────┤
│  State Management (状态管理)             │
│  ├── Local State (本地状态)              │
│  ├── Context (上下文)                    │
│  └── Hooks (自定义钩子)                  │
└─────────────────────────────────────────┘
```

### 文件结构详解

```
src/
├── App.tsx                     # 应用根组件，路由配置
├── main.tsx                    # 应用入口点
├── index.css                   # 全局样式
├── vite-env.d.ts              # Vite类型定义
│
├── assets/                     # 静态资源
│   ├── icons/                 # SVG图标
│   │   ├── ai.svg            # AI相关图标
│   │   ├── add.svg           # 添加图标
│   │   ├── edit.svg          # 编辑图标
│   │   └── ...               # 其他图标
│   ├── loading/              # 加载动画
│   └── pic/                  # 图片资源
│
├── components/                # 组件库
│   ├── AppBar/               # 顶部应用栏
│   │   ├── AppBar.tsx
│   │   ├── AppBar.css
│   │   └── index.ts
│   ├── Icon/                 # 图标组件
│   │   ├── Icon.tsx
│   │   ├── Icon.css
│   │   └── icons.ts
│   │
│   ├── BaseInput.tsx         # 基础输入组件
│   ├── BaseInput.css
│   ├── BaseInput.md          # 组件文档
│   │
│   ├── ChatBubble.tsx        # 聊天气泡
│   ├── ChatCard.tsx          # 聊天卡片
│   ├── ChatEventCard.tsx     # 聊天事件卡片
│   ├── ThinkingCard.tsx      # 智能思考卡片
│   │
│   ├── PlanList.tsx          # 规划列表
│   ├── EventCard.tsx         # 事件卡片
│   ├── TaskItem.tsx          # 任务项
│   │
│   ├── MeetingRecorder.tsx   # 会议录制器
│   ├── AttendeeCard.tsx      # 参会人卡片
│   ├── RelatedLinks.tsx      # 相关链接
│   │
│   └── index.ts              # 组件统一导出
│
├── pages/                    # 页面组件
│   ├── HomePage.tsx          # 主页
│   ├── HomePage.css
│   ├── ChatPage.tsx          # 聊天页面
│   ├── ChatPage.css
│   ├── PlanningPage.tsx      # 规划页面
│   ├── PlanningPage.css
│   ├── ProfilePage.tsx       # 个人中心
│   └── ProfilePage.css
│
├── workflows/                # 工作流和服务
│   ├── provider.ts           # AI提供商配置
│   └── tools/                # 工具集合
│       ├── api.ts           # API工具
│       ├── utils.ts         # 通用工具
│       └── hooks.ts         # 自定义钩子
│
├── types/                    # 类型定义
│   ├── api.ts               # API相关类型
│   ├── components.ts        # 组件类型
│   └── global.ts            # 全局类型
│
└── styles/                   # 样式文件
    ├── variables.css        # CSS变量
    ├── mixins.css          # 样式混入
    └── themes.css          # 主题配置
```

## 技术栈详解

### 1. React 19.1.0
**选择原因**：
- 最新的React版本，支持Concurrent Features
- 更好的性能和开发体验
- Server Components支持

**核心特性使用**：
```tsx
// 并发特性
import { Suspense, startTransition } from 'react';

// 自动批处理
const handleSubmit = () => {
  startTransition(() => {
    setLoading(true);
    setData(newData);
  });
};

// 错误边界
<Suspense fallback={<Loading />}>
  <ChatInterface />
</Suspense>
```

### 2. TypeScript 5.8.3
**类型系统设计**：
```typescript
// 组件Props设计模式
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 泛型约束
interface ListProps<T> extends BaseComponentProps {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

// 联合类型和字面量类型
type MessageType = 'text' | 'card' | 'thinking' | 'event';
type ComponentSize = 'sm' | 'md' | 'lg';

// 条件类型
type ConditionalProps<T> = T extends 'text' 
  ? { content: string } 
  : { data: unknown };
```

### 3. Vite 7.0.4
**配置优化**：
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ai: ['@ai-sdk/react', '@openrouter/ai-sdk-provider'],
        },
      },
    },
  },
});
```

## 组件设计

### 设计原则

1. **单一职责原则**：每个组件只负责一个功能
2. **开闭原则**：对扩展开放，对修改封闭
3. **组合优于继承**：使用组合模式构建复杂UI
4. **一致性**：统一的API设计和命名规范

### 组件分类

#### 1. 原子组件 (Atoms)
最基础的UI元素，不可再分割：

```tsx
// Icon 组件
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 16, color, className }) => {
  // 图标渲染逻辑
};
```

#### 2. 分子组件 (Molecules)
由原子组件组合而成：

```tsx
// BaseInput 组件
interface BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onMicrophoneClick?: () => void;
  onAttachClick?: () => void;
}

const BaseInput: React.FC<BaseInputProps> = ({
  value,
  onChange,
  placeholder,
  onMicrophoneClick,
  onAttachClick,
}) => {
  return (
    <div className="base-input">
      <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {onMicrophoneClick && (
        <Icon name="microphone" onClick={onMicrophoneClick} />
      )}
      {onAttachClick && (
        <Icon name="attach" onClick={onAttachClick} />
      )}
    </div>
  );
};
```

#### 3. 有机体组件 (Organisms)
由分子和原子组件组合的复杂组件：

```tsx
// ChatInterface 组件
interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
}) => {
  return (
    <div className="chat-interface">
      <div className="messages">
        {messages.map((message) => (
          <ChatBubble key={message.id} {...message} />
        ))}
      </div>
      <BaseInput 
        onSubmit={onSendMessage}
        disabled={isLoading}
      />
    </div>
  );
};
```

### 组件通信模式

#### 1. Props Down, Events Up
```tsx
// 父组件
const ParentComponent = () => {
  const [data, setData] = useState();
  
  const handleChange = (newData) => {
    setData(newData);
  };
  
  return (
    <ChildComponent 
      data={data} 
      onChange={handleChange} 
    />
  );
};

// 子组件
const ChildComponent = ({ data, onChange }) => {
  return (
    <button onClick={() => onChange(newData)}>
      Update Data
    </button>
  );
};
```

#### 2. Context Pattern
```tsx
// 创建Context
const ThemeContext = createContext();

// Provider组件
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

#### 3. Custom Hooks
```tsx
// 数据获取Hook
export const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);
  
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);
  
  return {
    messages,
    loading,
    addMessage,
    clearMessages,
  };
};
```

## 状态管理

### 状态分层

#### 1. 组件本地状态 (Local State)
```tsx
const Component = () => {
  // UI状态 - 仅影响当前组件
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  return (
    // 组件渲染
  );
};
```

#### 2. 共享状态 (Shared State)
```tsx
// 使用Context共享状态
const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  
  return (
    <AppStateContext.Provider value={{ user, messages, setUser, setMessages }}>
      {children}
    </AppStateContext.Provider>
  );
};
```

#### 3. 服务器状态 (Server State)
```tsx
// 使用SWR或React Query管理服务器状态
const useUserProfile = (userId) => {
  return useSWR(`/api/users/${userId}`, fetcher);
};

// 在组件中使用
const Profile = ({ userId }) => {
  const { data: user, error, isLoading } = useUserProfile(userId);
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  
  return <UserInfo user={user} />;
};
```

### 状态更新模式

#### 1. 不变性更新
```tsx
// 数组更新
const addItem = (item) => {
  setItems(prev => [...prev, item]);
};

const updateItem = (id, updates) => {
  setItems(prev => prev.map(item => 
    item.id === id ? { ...item, ...updates } : item
  ));
};

const removeItem = (id) => {
  setItems(prev => prev.filter(item => item.id !== id));
};

// 对象更新
const updateUser = (updates) => {
  setUser(prev => ({ ...prev, ...updates }));
};
```

#### 2. 批量更新
```tsx
import { unstable_batchedUpdates } from 'react-dom';

const handleMultipleUpdates = () => {
  unstable_batchedUpdates(() => {
    setLoading(true);
    setError(null);
    setData(newData);
  });
};
```

## API集成

### AI服务集成

#### 1. 提供商配置
```typescript
// workflows/provider.ts
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || '',
  baseURL: 'https://openrouter.ai/api/v1',
});

export const siliconflow = createOpenAICompatible({
  name: 'siliconflow',
  apiKey: process.env.SILICONFLOW_API_KEY || '',
  baseURL: process.env.SILICONFLOW_BASE_URL || 'https://api.siliconflow.cn/v1',
});
```

#### 2. AI Hook封装
```typescript
// hooks/useAI.ts
export const useAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = async (content: string) => {
    setIsLoading(true);
    
    try {
      const userMessage: Message = {
        id: generateId(),
        type: 'user',
        content: [{ type: 'text', data: { text: content } }],
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // 调用AI API
      const response = await generateResponse(content);
      
      const aiMessage: Message = {
        id: generateId(),
        type: 'ai',
        content: response.content,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI response error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    isLoading,
    sendMessage,
  };
};
```

#### 3. 流式响应处理
```typescript
const handleStreamResponse = async (prompt: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  
  const reader = response.body?.getReader();
  let accumulatedContent = '';
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = new TextDecoder().decode(value);
    accumulatedContent += chunk;
    
    // 实时更新UI
    setStreamingContent(accumulatedContent);
  }
};
```

### HTTP客户端配置

```typescript
// utils/api.ts
import ky from 'ky';

export const api = ky.create({
  prefixUrl: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
  retry: {
    limit: 3,
    methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ],
    afterResponse: [
      (_request, _options, response) => {
        if (response.status === 401) {
          // 处理认证失败
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return response;
      }
    ]
  }
});

// API接口封装
export const chatAPI = {
  sendMessage: (message: string) => 
    api.post('chat/messages', { json: { message } }).json(),
  
  getHistory: () => 
    api.get('chat/history').json(),
  
  clearHistory: () => 
    api.delete('chat/history').json(),
};
```

## 开发规范

### 代码规范

#### 1. 命名规范
```typescript
// 组件命名 - PascalCase
const ChatBubble = () => {};
const BaseInput = () => {};

// 变量和函数 - camelCase
const userName = 'John';
const handleClick = () => {};

// 常量 - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// 类型和接口 - PascalCase
interface UserProfile {
  id: string;
  name: string;
}

type MessageType = 'text' | 'image';
```

#### 2. 文件组织
```bash
# 组件文件命名
ComponentName.tsx      # 组件实现
ComponentName.css      # 组件样式
ComponentName.test.tsx # 组件测试
ComponentName.md       # 组件文档
index.ts              # 导出文件

# 工具函数文件
utils/
├── string.ts         # 字符串工具
├── date.ts          # 日期工具
├── validation.ts    # 验证工具
└── index.ts         # 统一导出
```

#### 3. 导入顺序
```typescript
// 1. React相关
import React, { useState, useEffect } from 'react';

// 2. 第三方库
import { format } from 'date-fns';
import ky from 'ky';

// 3. 内部模块 - 绝对路径
import { Button, Input } from '@/components';
import { useAuth } from '@/hooks';

// 4. 相对路径
import './Component.css';
import { localUtility } from '../utils';
```

### 组件开发规范

#### 1. 组件结构模板
```tsx
import React, { forwardRef, memo } from 'react';
import './Component.css';

// 1. 类型定义
export interface ComponentProps {
  /** 必需属性描述 */
  title: string;
  /** 可选属性描述 */
  description?: string;
  /** 事件处理器 */
  onClick?: (id: string) => void;
}

// 2. 组件实现
const Component = memo(forwardRef<HTMLDivElement, ComponentProps>(({
  title,
  description,
  onClick,
  ...restProps
}, ref) => {
  // 3. 状态和副作用
  const [isActive, setIsActive] = useState(false);
  
  // 4. 事件处理
  const handleClick = () => {
    onClick?.(title);
    setIsActive(!isActive);
  };
  
  // 5. 渲染
  return (
    <div 
      ref={ref}
      className={`component ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      {...restProps}
    >
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}));

Component.displayName = 'Component';

export default Component;
```

#### 2. Hooks使用规范
```typescript
// 自定义Hook模板
export const useCustomHook = (initialValue: string) => {
  // 1. 状态定义
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  
  // 2. 副作用
  useEffect(() => {
    // 副作用逻辑
    return () => {
      // 清理逻辑
    };
  }, [value]);
  
  // 3. 回调函数 - 使用useCallback优化
  const updateValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);
  
  // 4. 计算值 - 使用useMemo优化
  const processedValue = useMemo(() => {
    return value.toUpperCase();
  }, [value]);
  
  // 5. 返回值
  return {
    value: processedValue,
    loading,
    updateValue,
  };
};
```

### CSS规范

#### 1. BEM命名方法
```css
/* 块 (Block) */
.chat-bubble {
  /* 基础样式 */
}

/* 元素 (Element) */
.chat-bubble__content {
  /* 内容样式 */
}

.chat-bubble__timestamp {
  /* 时间戳样式 */
}

/* 修饰符 (Modifier) */
.chat-bubble--user {
  /* 用户消息样式 */
}

.chat-bubble--ai {
  /* AI消息样式 */
}

/* 状态修饰符 */
.chat-bubble--loading {
  /* 加载状态样式 */
}
```

#### 2. CSS变量系统
```css
:root {
  /* 颜色系统 */
  --color-primary: #007AFF;
  --color-secondary: #5856D6;
  --color-success: #34C759;
  --color-warning: #FF9500;
  --color-error: #FF3B30;
  
  /* 中性色 */
  --color-text-primary: #000000;
  --color-text-secondary: #666666;
  --color-text-tertiary: #999999;
  
  /* 背景色 */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F2F2F7;
  --color-bg-tertiary: #FFFFFF;
  
  /* 间距系统 */
  --spacing-xs: 2px;
  --spacing-sm: 4px;
  --spacing-md: 8px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;
  
  /* 字体系统 */
  --font-family-primary: 'OPPO Sans 4.0', -webkit-system-font, system-ui;
  --font-size-xs: 11px;
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 18px;
  --font-size-2xl: 24px;
  
  /* 阴影系统 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* 圆角系统 */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;
  
  /* 动画时长 */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
}
```

#### 3. 响应式设计
```css
/* 移动优先设计 */
.component {
  /* 基础移动端样式 */
  padding: var(--spacing-md);
}

/* 平板样式 */
@media (min-width: 768px) {
  .component {
    padding: var(--spacing-lg);
  }
}

/* 桌面样式 */
@media (min-width: 1024px) {
  .component {
    padding: var(--spacing-xl);
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* 高分辨率屏幕优化 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .component__icon {
    /* 高清图标处理 */
  }
}
```

## 性能优化

### React性能优化

#### 1. 组件优化
```tsx
// 使用memo避免不必要的重渲染
const ExpensiveComponent = memo(({ data, onUpdate }) => {
  // 组件实现
}, (prevProps, nextProps) => {
  // 自定义比较函数
  return prevProps.data.id === nextProps.data.id;
});

// 使用useMemo缓存计算结果
const ProcessedData = ({ items, filter }) => {
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);
  
  return <List items={filteredItems} />;
};

// 使用useCallback缓存函数
const Parent = ({ items }) => {
  const handleItemClick = useCallback((id) => {
    // 处理点击
  }, []);
  
  return (
    <div>
      {items.map(item => (
        <Item key={item.id} onClick={handleItemClick} />
      ))}
    </div>
  );
};
```

#### 2. 懒加载和代码分割
```tsx
// 路由级别的懒加载
const HomePage = lazy(() => import('../pages/HomePage'));
const ChatPage = lazy(() => import('../pages/ChatPage'));

// 组件级别的懒加载
const HeavyComponent = lazy(() => 
  import('./HeavyComponent').then(module => ({ 
    default: module.HeavyComponent 
  }))
);

// 使用Suspense包装
const App = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Suspense>
  </Router>
);
```

#### 3. 虚拟滚动
```tsx
// 大列表优化
import { FixedSizeList } from 'react-window';

const VirtualList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <ListItem data={items[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={80}
    >
      {Row}
    </FixedSizeList>
  );
};
```

### 资源优化

#### 1. 图片优化
```tsx
// WebP格式支持
const OptimizedImage = ({ src, alt, ...props }) => {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={`${src}.jpg`} alt={alt} {...props} />
    </picture>
  );
};

// 懒加载图片
const LazyImage = ({ src, alt, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={imgRef}>
      {loaded && <img src={src} alt={alt} {...props} />}
    </div>
  );
};
```

#### 2. 资源预加载
```tsx
// 预加载关键资源
const preloadCriticalResources = () => {
  // 预加载字体
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = '/fonts/oppo-sans.woff2';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
  
  // 预加载关键图片
  const imageLink = document.createElement('link');
  imageLink.rel = 'preload';
  imageLink.href = '/images/hero.webp';
  imageLink.as = 'image';
  document.head.appendChild(imageLink);
};
```

## 测试策略

### 单元测试

#### 1. 组件测试
```tsx
// ChatBubble.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatBubble from './ChatBubble';

describe('ChatBubble', () => {
  const defaultProps = {
    message: 'Hello world',
    type: 'user' as const,
    timestamp: '14:30',
  };
  
  it('renders message correctly', () => {
    render(<ChatBubble {...defaultProps} />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
  
  it('shows timestamp on long press', async () => {
    const user = userEvent.setup();
    render(<ChatBubble {...defaultProps} />);
    
    const bubble = screen.getByText('Hello world');
    
    // 模拟长按
    fireEvent.mouseDown(bubble);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    expect(screen.getByText('14:30')).toBeVisible();
  });
  
  it('applies correct styles for user message', () => {
    render(<ChatBubble {...defaultProps} />);
    const container = screen.getByText('Hello world').closest('.chat-bubble-container');
    expect(container).toHaveClass('user');
  });
});
```

#### 2. Hook测试
```tsx
// useMessages.test.ts
import { renderHook, act } from '@testing-library/react';
import { useMessages } from './useMessages';

describe('useMessages', () => {
  it('adds message correctly', () => {
    const { result } = renderHook(() => useMessages());
    
    act(() => {
      result.current.addMessage({
        id: '1',
        type: 'user',
        content: 'Test message',
        timestamp: '14:30',
      });
    });
    
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe('Test message');
  });
  
  it('clears messages correctly', () => {
    const { result } = renderHook(() => useMessages());
    
    // 添加消息
    act(() => {
      result.current.addMessage({
        id: '1',
        type: 'user',
        content: 'Test message',
        timestamp: '14:30',
      });
    });
    
    // 清空消息
    act(() => {
      result.current.clearMessages();
    });
    
    expect(result.current.messages).toHaveLength(0);
  });
});
```

### 集成测试

```tsx
// ChatPage.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ChatPage from './ChatPage';

// Mock API
jest.mock('../workflows/provider', () => ({
  sendMessage: jest.fn().mockResolvedValue({
    content: 'AI response'
  }),
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ChatPage Integration', () => {
  it('sends message and receives AI response', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ChatPage />);
    
    // 输入消息
    const input = screen.getByPlaceholderText(/说说看你的规划问题/);
    await user.type(input, 'Hello AI');
    
    // 发送消息
    const sendButton = screen.getByRole('button', { name: /发送/ });
    await user.click(sendButton);
    
    // 验证用户消息显示
    expect(screen.getByText('Hello AI')).toBeInTheDocument();
    
    // 等待AI回复
    await waitFor(() => {
      expect(screen.getByText('AI response')).toBeInTheDocument();
    });
  });
});
```

### E2E测试

```typescript
// cypress/e2e/chat.cy.ts
describe('Chat Flow', () => {
  beforeEach(() => {
    cy.visit('/chat');
  });
  
  it('completes full chat interaction', () => {
    // 等待页面加载
    cy.get('[data-testid="chat-input"]').should('be.visible');
    
    // 输入消息
    cy.get('[data-testid="chat-input"]')
      .type('我想在香港组织一个聚会{enter}');
    
    // 验证用户消息
    cy.contains('我想在香港组织一个聚会').should('be.visible');
    
    // 等待AI回复
    cy.get('[data-testid="ai-message"]', { timeout: 10000 })
      .should('be.visible');
    
    // 验证思考卡片
    cy.get('[data-testid="thinking-card"]')
      .should('be.visible')
      .click();
    
    // 验证展开的思考步骤
    cy.get('[data-testid="thinking-steps"]')
      .should('be.visible');
  });
  
  it('handles input interactions', () => {
    // 测试语音按钮
    cy.get('[data-testid="microphone-button"]')
      .click();
    
    // 测试附件按钮
    cy.get('[data-testid="attach-button"]')
      .click();
  });
});
```

## 部署指南

### 构建配置

#### 1. 环境变量配置
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api
VITE_OPENROUTER_API_KEY=your_dev_key
VITE_SILICONFLOW_API_KEY=your_dev_key
VITE_SILICONFLOW_BASE_URL=https://api.siliconflow.cn/v1

# .env.production
VITE_API_BASE_URL=https://api.muer.ai
VITE_OPENROUTER_API_KEY=your_prod_key
VITE_SILICONFLOW_API_KEY=your_prod_key
VITE_SILICONFLOW_BASE_URL=https://api.siliconflow.cn/v1
```

#### 2. 构建脚本
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "build:analyze": "vite build && npx vite-bundle-analyzer dist",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix"
  }
}
```

### Docker部署

#### 1. Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# 复制package files
COPY package*.json ./
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# Production stage
FROM nginx:alpine

# 复制构建结果
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### 2. Nginx配置
```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA路由处理
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API代理
    location /api/ {
        proxy_pass http://backend:3000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

#### 3. Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    image: muer-ai/backend:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### 云部署

#### 1. Vercel部署
```json
// vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### 2. GitHub Actions CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test
      - run: npm run lint

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
          VITE_OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
      
      - name: Deploy to S3
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_ID }} --paths "/*"
```

---

这份开发文档涵盖了Muer AI项目的核心技术架构、开发规范、最佳实践和部署指南。通过遵循这些规范，可以确保项目的代码质量、性能和可维护性。
