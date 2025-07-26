import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PreMeetingNotes from './components/PreMeetingNotes'
import AttendeeCard from './components/AttendeeCard'
import MeetingRecorder from './components/MeetingRecorder'
import RelatedLinks from './components/RelatedLinks'
import BaseInput from './components/BaseInput'
import BaseInputDemo from './components/BaseInputDemo'
import { AppBar } from './components/AppBar'
import type { LinkInfo } from './components/RelatedLinks'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const handleStartRecording = () => {
    console.log('开始录制会议纪要');
  };

  const handleStopRecording = () => {
    console.log('会议录制结束');
  };

  const handleMicrophoneClick = () => {
    console.log('语音输入按钮被点击');
  };

  const handleAttachClick = () => {
    console.log('附件按钮被点击');
  };

  const relatedLinks: LinkInfo[] = [
    { 
      id: '1',
      name: '项目文档', 
      url: 'https://example.com/docs',
      icon: 'http://localhost:3845/assets/33eec501a92dea9f26869ecf0940ced48fbd2fe6.svg'
    },
    { 
      id: '2',
      name: '设计稿', 
      url: 'https://figma.com/design',
      icon: 'http://localhost:3845/assets/33eec501a92dea9f26869ecf0940ced48fbd2fe6.svg'
    },
    { 
      id: '3',
      name: '会议纪要模板', 
      url: 'https://example.com/template',
      icon: 'http://localhost:3845/assets/33eec501a92dea9f26869ecf0940ced48fbd2fe6.svg'
    }
  ];

  const handleLinkClick = (link: LinkInfo) => {
    console.log(`点击了链接: ${link.name} - ${link.url}`);
    window.open(link.url, '_blank');
  };

  return (
    <>
      {/* 应用栏组件 */}
      <AppBar 
        title="Muer AI"
        onMenuClick={() => console.log('菜单按钮被点击')}
        onAvatarClick={() => console.log('头像被点击')}
      />
      
      <div className="main-content">
        <div>
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        
        {/* 会前笔记组件 */}
        <div className="notes-section">
          <PreMeetingNotes 
            title="今日会议准备"
            noteItems={[
              '准备PPT文档',
              '整理会议议程',
              '准备产品演示',
              '确认参会人员'
            ]}
          />
        </div>
        
        {/* 参会人员卡片 */}
        <div className="attendees-section">
          <AttendeeCard 
            title="参会人员"
            attendees={[
              { id: '1', name: '张三', title: '产品经理', avatar: '' },
              { id: '2', name: '李四', title: '开发工程师', avatar: '' },
              { id: '3', name: '王五', title: 'UI设计师', avatar: '' }
            ]}
          />
        </div>
        
        {/* 会议录制组件 */}
        <div className="recorder-section">
          <MeetingRecorder 
            title="会议纪要录制"
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        </div>
        
        {/* 相关链接组件 */}
        <div className="links-section">
          <RelatedLinks 
            title="相关链接"
            links={relatedLinks}
            onLinkClick={handleLinkClick}
          />
        </div>
        
        {/* 基础输入框组件 */}
        <div className="input-section">
          <BaseInput 
            value={inputValue}
            onChange={setInputValue}
            onMicrophoneClick={handleMicrophoneClick}
            onAttachClick={handleAttachClick}
            placeholder="和 Muer AI 说说看你的规划问题？"
          />
        </div>
      </div>
      
      {/* BaseInput 演示页面 */}
      <BaseInputDemo />
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
