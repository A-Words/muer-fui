import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, BaseInput, MeetingInfo, PreMeetingNotes, MeetingRecorder, AttendeeCard, RelatedLinks } from '../components';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  
  const handleInputClick = () => {
    // 开始过渡动画
    setIsTransitioning(true);
    
    // 延迟跳转，等待动画完成
    setTimeout(() => {
      navigate('/chat');
    }, 300); // 300ms的过渡时间
  };
  
  const handleMicrophoneClick = () => {
    console.log('麦克风点击');
    // 同样的过渡效果
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/chat');
    }, 300);
  };
  
  const handleAttachClick = () => {
    console.log('附件点击');
    // 同样的过渡效果
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/chat');
    }, 300);
  };
  
  const handleStartRecording = () => {
    console.log('开始会议纪要录制');
  };
  
  const handleStopRecording = () => {
    console.log('停止会议纪要录制');
  };

  return (
    <div className={`home-page ${isTransitioning ? 'transitioning' : ''}`}>
      {/* <AppBar 
        title="Muer AI" 
        onMenuClick={() => console.log('菜单点击')}
        onAvatarClick={() => console.log('头像点击')}
      /> */}
      <div className="home-page-content">
        {/* 顶部输入框 */}
        <div className="input-section">
          <BaseInput
            placeholder="和 Muer AI 说说看你的会议问题？"
            onClick={handleInputClick}
            onMicrophoneClick={handleMicrophoneClick}
            onAttachClick={handleAttachClick}
            readOnly={true}
          />
        </div>
        
        {/* 会议信息 */}
        <div className="meeting-section">
          <MeetingInfo
            time="7月27日 09:00 - 17:00"
            status="进行中"
            title="AdventureX 2025 展会"
            description="AdventureX 2025 展会"
          />
        </div>
        
        {/* 功能卡片区域 */}
        <div className="features-section">
          <div className="feature-cards">
            <div className="feature-card">
              <div className="card-content">
                <div className="card-text">
                  <div className="card-title">让 Muer AI 帮你做 会议纪要 。</div>
                  <div className="card-subtitle">高效记录，记忆可问答</div>
                </div>
                <button className="card-button">开始会议纪要</button>
              </div>
            </div>
          </div>
          
          {/* 滚动区域 */}
          <div className="scrollable-section">
            <div className="scroll-container">
              {/* 会前笔记卡片 */}
              <div className="card-container">
                <PreMeetingNotes />
              </div>
              
              {/* 会议纪要录制卡片 */}
              <div className="card-container">
                <MeetingRecorder 
                  onStartRecording={handleStartRecording}
                  onStopRecording={handleStopRecording}
                />
              </div>
              
              {/* 参会人名片卡片 */}
              <div className="card-container">
                <AttendeeCard />
              </div>
              
              {/* 相关链接卡片 */}
              <div className="card-container">
                <RelatedLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
