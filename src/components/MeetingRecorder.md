# MeetingRecorder 组件使用说明

这是基于Figma设计实现的"Muer AI 会议纪要"录制组件，用React和TypeScript开发。

## 功能特性

- 🎙️ 会议录制状态切换
- ⏱️ 实时录制时间显示
- 🎨 橙色渐变背景设计
- ⚡ 动态按钮状态和动画
- 📱 响应式设计，支持移动端
- 🌙 支持深色模式
- ♿ 良好的可访问性支持
- 🔄 录制状态指示器

## 使用方式

### 基本用法

```tsx
import MeetingRecorder from './components/MeetingRecorder';

function HomePage() {
  return (
    <div>
      <MeetingRecorder />
    </div>
  );
}
```

### 自定义回调

```tsx
import MeetingRecorder from './components/MeetingRecorder';

function HomePage() {
  const handleStartRecording = () => {
    console.log('开始录制会议');
    // 这里可以集成实际的录音API
    // 例如：navigator.mediaDevices.getUserMedia()
  };

  const handleStopRecording = () => {
    console.log('停止录制会议');
    // 这里可以处理录音结束逻辑
    // 例如：保存录音文件、发送到服务器等
  };

  return (
    <div>
      <MeetingRecorder 
        title="智能会议助手"
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        className="my-custom-recorder"
      />
    </div>
  );
}
```

### 集成录音功能

```tsx
import { useState } from 'react';
import MeetingRecorder from './components/MeetingRecorder';

function MeetingPage() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true 
      });
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };
      
      recorder.start();
      console.log('开始录制音频');
    } catch (error) {
      console.error('无法访问麦克风:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      console.log('停止录制音频');
      
      // 处理录音数据
      setTimeout(() => {
        if (recordedChunks.length > 0) {
          const blob = new Blob(recordedChunks, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          // 可以下载或上传音频文件
          console.log('录音文件URL:', url);
        }
      }, 100);
    }
  };

  return (
    <div>
      <MeetingRecorder 
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />
    </div>
  );
}
```

## Props API

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `"Muer AI 会议纪要"` | 组件标题文本 |
| `onStartRecording` | `() => void` | `undefined` | 开始录制时的回调函数 |
| `onStopRecording` | `() => void` | `undefined` | 停止录制时的回调函数 |
| `className` | `string` | `""` | 额外的CSS类名 |

## 状态管理

组件内部管理以下状态：
- `isRecording`: 是否正在录制
- `duration`: 录制持续时间（秒）

状态变化会自动触发：
- 时间显示更新
- 按钮文本和样式变化
- 录制指示器动画

## 样式自定义

组件使用独立的CSS文件 `MeetingRecorder.css`，你可以通过以下方式自定义样式：

### 1. CSS变量覆盖

```css
.my-custom-recorder {
  --recorder-primary-color: #e11d48;
  --recorder-bg-start: #fce7f3;
  --recorder-bg-end: #ffffff;
  --recorder-button-bg: #be185d;
}
```

### 2. 使用className

```tsx
<MeetingRecorder className="my-custom-recorder" />
```

### 3. 主题定制

```css
/* 自定义主题 */
.meeting-recorder.theme-blue {
  background: linear-gradient(to bottom, #dbeafe, #ffffff);
}

.meeting-recorder.theme-blue .title-text p {
  color: #1d4ed8;
}

.meeting-recorder.theme-blue .record-button {
  background: #3b82f6;
}
```

## 设计规范

组件遵循以下设计规范：
- 主色调：`#a02310` (标题文字)
- 按钮色：`#f2502c` (录制按钮)
- 时间显示：`#3c3c3c` (大字体数字)
- 背景：渐变从 `#fdebe3` 到 `#ffffff`
- 字体：OPPO Sans 4.0 (降级到系统字体)
- 阴影：`0px 6px 18px 0px rgba(0,0,0,0.08)`

## 交互特性

### 按钮状态
- **默认状态**：显示"开始会议纪要"，橙色背景
- **录制状态**：显示"停止会议纪要"，红色背景，脉冲动画
- **悬停效果**：颜色加深，轻微上移
- **点击效果**：短暂按下效果

### 时间显示
- **格式**：MM:SS（分钟:秒钟）
- **字体**：等宽字体，便于阅读
- **更新频率**：每秒更新一次

### 录制指示器
- **位置**：录制状态下按钮左侧
- **样式**：白色圆点，闪烁动画
- **频率**：每秒闪烁一次

## 可访问性

- **键盘导航**：支持Tab键焦点导航
- **屏幕阅读器**：适当的aria-label属性
- **颜色对比**：符合WCAG标准
- **减少动画**：支持prefers-reduced-motion
- **焦点指示**：清晰的焦点边框

## 浏览器兼容性

- **现代浏览器**：Chrome, Firefox, Safari, Edge
- **媒体录制**：需要MediaRecorder API支持
- **权限要求**：需要麦克风访问权限
- **HTTPS要求**：在生产环境需要HTTPS

## 最佳实践

### 1. 权限处理

```tsx
const requestMicrophonePermission = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch (error) {
    console.error('麦克风权限被拒绝:', error);
    return false;
  }
};
```

### 2. 错误处理

```tsx
const handleStartRecording = async () => {
  try {
    // 录制逻辑
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      alert('请允许访问麦克风以进行录制');
    } else if (error.name === 'NotFoundError') {
      alert('未找到可用的麦克风设备');
    } else {
      alert('录制启动失败，请重试');
    }
  }
};
```

### 3. 数据持久化

```tsx
const saveRecording = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'meeting-recording.webm');
  
  try {
    const response = await fetch('/api/save-recording', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      console.log('录音保存成功');
    }
  } catch (error) {
    console.error('录音保存失败:', error);
  }
};
```

## 扩展建议

1. **音频可视化**：添加音频波形显示
2. **暂停功能**：支持录制暂停和恢复
3. **音频质量**：可配置录制质量选项
4. **文件格式**：支持多种音频格式导出
5. **云存储**：集成云存储服务
6. **转录功能**：集成语音转文字API
7. **共享功能**：支持录音文件分享
8. **批量管理**：录音文件管理界面

这个组件为会议录制提供了完整的UI界面，可以很容易地集成到任何会议或协作应用中。
