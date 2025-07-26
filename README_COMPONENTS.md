# 主页组件集合

本项目包含五个基于Figma设计实现的React组件，可以作为主页的功能部件使用。

## 组件列表

### 1. PreMeetingNotes - 会前笔记组件
- **功能**：显示会议准备事项的笔记列表
- **设计风格**：暖黄色渐变背景，温馨提醒风格
- **适用场景**：会议准备、任务提醒、待办事项

### 2. AttendeeCard - 参会人名片组件  
- **功能**：展示参会人员的头像、姓名和职位信息
- **设计风格**：绿色渐变背景，清新商务风格
- **适用场景**：团队展示、会议参与者、联系人列表

### 3. MeetingRecorder - 会议纪要录制组件
- **功能**：会议录制控制，实时时间显示，录制状态管理
- **设计风格**：橙色渐变背景，活力科技风格
- **适用场景**：会议录制、语音记录、AI转录

### 4. RelatedLinks - 相关链接组件
- **功能**：链接列表展示，支持点击跳转和自定义处理
- **设计风格**：蓝色渐变背景，专业信息风格
- **适用场景**：快捷链接、相关资源、外部工具入口

### 5. AppBar - 应用栏组件
- **功能**：顶部导航栏，包含菜单按钮、标题和用户头像
- **设计风格**：简洁现代的灰白渐变，符合Material Design规范
- **适用场景**：应用导航、页面标题、用户入口

## 快速开始

### 1. 单独导入使用

```tsx
import PreMeetingNotes from './components/PreMeetingNotes';
import AttendeeCard from './components/AttendeeCard';
import MeetingRecorder from './components/MeetingRecorder';
import RelatedLinks from './components/RelatedLinks';
import { AppBar } from './components/AppBar';

function HomePage() {
  return (
    <div className="homepage">
      <AppBar />
      <PreMeetingNotes />
      <AttendeeCard />
      <MeetingRecorder />
      <RelatedLinks />
    </div>
  );
}
```

### 2. 从组件库导入

```tsx
import { PreMeetingNotes, AttendeeCard, MeetingRecorder, RelatedLinks, AppBar } from './components';

function HomePage() {
  return (
    <div className="homepage">
      <AppBar />
      <PreMeetingNotes />
      <AttendeeCard />
      <MeetingRecorder />
      <RelatedLinks />
    </div>
  );
}
```

### 3. 自定义使用

```tsx
import { PreMeetingNotes, AttendeeCard, MeetingRecorder, RelatedLinks, AppBar, AttendeeInfo, LinkInfo, AppBarProps } from './components';

function HomePage() {
  // 自定义会前笔记
  const meetingNotes = [
    "确认会议室预订",
    "准备演示材料", 
    "发送会议议程",
    "测试设备连接"
  ];

  // 自定义参会人员
  const attendees: AttendeeInfo[] = [
    {
      id: '1',
      name: '张总',
      title: '总经理',
      avatar: '/images/zhang-zong.jpg'
    },
    {
      id: '2', 
      name: '李工',
      title: '技术负责人',
      avatar: '/images/li-gong.jpg'
    }
  ];

  // 自定义链接
  const links: LinkInfo[] = [
    {
      id: '1',
      name: 'GitHub',
      url: 'github.com/project',
      icon: '/images/github-icon.png'
    },
    {
      id: '2',
      name: '项目文档',
      url: 'docs.project.com',
      icon: '/images/docs-icon.png'
    }
  ];

  // AppBar 事件处理
  const handleMenuClick = () => {
    console.log('菜单被点击');
    // 打开侧边栏或导航菜单
  };

  const handleAvatarClick = () => {
    console.log('头像被点击');
    // 显示用户菜单或个人信息
  };

  // 录制事件处理
  const handleStartRecording = () => {
    console.log('开始录制会议');
  };

  const handleStopRecording = () => {
    console.log('停止录制会议');
  };

  // 链接点击处理
  const handleLinkClick = (link: LinkInfo) => {
    console.log('点击链接:', link.name);
  };

  return (
    <div className="homepage">
      {/* 应用栏 */}
      <AppBar 
        title="Muer AI 会议助手"
        avatarUrl="/images/user-avatar.jpg"
        onMenuClick={handleMenuClick}
        onAvatarClick={handleAvatarClick}
      />
      
      <div className="meeting-section">
        <PreMeetingNotes 
          title="重要会议准备"
          noteItems={meetingNotes}
        />
      </div>
      
      <div className="attendee-section">
        <AttendeeCard 
          title="核心团队成员"
          attendees={attendees}
        />
      </div>
      
      <div className="recorder-section">
        <MeetingRecorder 
          title="智能会议助手"
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
      </div>
      
      <div className="links-section">
        <RelatedLinks 
          title="项目资源"
          links={links}
          onLinkClick={handleLinkClick}
        />
      </div>
    </div>
  );
}
```

## 布局建议

### 1. 垂直布局（推荐）

```css
.homepage {
  max-width: 400px;
  margin: 0 auto;
  padding: 0; /* AppBar 已有 padding */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 为 AppBar 预留固定位置 */
.main-content {
  padding: 20px;
  margin-top: 64px; /* AppBar 高度 */
}
}

.meeting-section,
.attendee-section,
.recorder-section,
.links-section {
  width: 100%;
}
```

### 2. 网格布局

```css
.homepage {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
```

### 3. 响应式布局

```css
.homepage {
  padding: 16px;
}

@media (min-width: 768px) {
  .homepage {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    max-width: 800px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .homepage {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    padding: 32px;
    max-width: 1200px;
  }
}
```

## 主题定制

四个组件都支持深色模式和主题定制：

```css
/* 自定义主题变量 */
:root {
  --meeting-notes-primary: #9e720b;
  --meeting-notes-bg-start: #fcf9e2;
  --meeting-notes-bg-end: #ffffff;
  
  --attendee-card-primary: #057652;
  --attendee-card-bg-start: #d5eddf;
  --attendee-card-bg-end: #ffffff;
  
  --meeting-recorder-primary: #a02310;
  --meeting-recorder-bg-start: #fdebe3;
  --meeting-recorder-bg-end: #ffffff;
  --meeting-recorder-button: #f2502c;
  
  --related-links-primary: #1156a0;
  --related-links-bg-start: #e3f7fd;
  --related-links-bg-end: #ffffff;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --meeting-notes-primary: #d4b854;
    --meeting-notes-bg-start: #2a2518;
    --meeting-notes-bg-end: #1a1a1a;
    
    --attendee-card-primary: #4ade80;
    --attendee-card-bg-start: #1a2b1f;
    --attendee-card-bg-end: #1a1a1a;
    
    --meeting-recorder-primary: #ff7f5c;
    --meeting-recorder-bg-start: #3d2317;
    --meeting-recorder-bg-end: #1a1a1a;
    
    --related-links-primary: #5ba7ff;
    --related-links-bg-start: #1e3a5f;
    --related-links-bg-end: #1a1a1a;
  }
}
```

## 性能优化建议

1. **图片优化**：
   - 使用 WebP 格式的头像图片
   - 实现图片懒加载
   - 添加图片占位符

2. **组件优化**：
   - 使用 React.memo 包装组件
   - 避免不必要的重渲染
   - 合理使用 useMemo 和 useCallback

3. **样式优化**：
   - 使用CSS模块或styled-components
   - 减少CSS文件大小
   - 启用CSS压缩

## 开发工具

- **TypeScript**：完整的类型支持
- **ESLint**：代码质量检查
- **Vite**：快速开发和构建
- **Hot Reload**：实时预览更改

## 项目结构

```
src/
├── components/
│   ├── PreMeetingNotes.tsx
│   ├── PreMeetingNotes.css
│   ├── AttendeeCard.tsx
│   ├── AttendeeCard.css
│   ├── MeetingRecorder.tsx
│   ├── MeetingRecorder.css
│   ├── index.ts
│   ├── README.md
│   ├── AttendeeCard.md
│   └── MeetingRecorder.md
├── App.tsx
├── App.css
└── main.tsx
```

## 下一步计划

1. **添加更多组件**：根据Figma设计继续实现其他组件
2. **状态管理**：集成Redux或Zustand进行状态管理
3. **数据获取**：连接API获取真实数据
4. **测试覆盖**：添加单元测试和集成测试
5. **文档完善**：使用Storybook创建组件文档

## 技术栈

- **React 19.1.0** - UI框架
- **TypeScript 5.8.3** - 类型安全
- **Vite 7.0.4** - 构建工具
- **CSS3** - 样式实现
- **ESLint** - 代码检查

这三个组件已经可以完美地作为主页部件使用，具有良好的可维护性、可扩展性和用户体验。每个组件都有独特的功能和视觉风格，可以组合使用构建完整的会议管理界面。
