import React, { useState, useEffect, useRef } from 'react';
import AppBar from '../components/AppBar/AppBar';
import BaseInput from '../components/BaseInput';
import './ChatPage.css';

const ChatPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 页面加载动画和自动聚焦
  useEffect(() => {
    // 延迟显示加载动画
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const focusInput = () => {
      if (inputRef.current) {
        // 延迟聚焦，确保页面完全加载和动画完成
        setTimeout(() => {
          inputRef.current?.focus();
          // 在移动设备上，可能需要触发点击事件才能拉起键盘
          if (window.innerWidth <= 768) {
            inputRef.current?.click();
          }
        }, 800); // 等待所有动画完成
      }
    };

    focusInput();

    // 当页面变为可见时重新聚焦（处理从其他tab切换回来的情况）
    const handleVisibilityChange = () => {
      if (!document.hidden && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(loadTimer);
    };
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleMicrophoneClick = () => {
    console.log('麦克风按钮点击');
    // TODO: 实现语音输入功能
  };

  const handleAttachClick = () => {
    console.log('附件按钮点击');
    // TODO: 实现附件功能
  };

  const handleMenuClick = () => {
    console.log('菜单按钮点击');
    // TODO: 实现菜单功能
  };

  const handleAvatarClick = () => {
    console.log('头像点击');
    // TODO: 实现头像功能
  };

  return (
    <div 
      className={`chat-page ${isLoaded ? 'loaded' : ''}`}
    >
      {/* AppBar */}
      <div className="chat-page-header">
        <AppBar
          title="Muer AI"
          onMenuClick={handleMenuClick}
          onAvatarClick={handleAvatarClick}
        />
      </div>

      {/* 主要内容区域 */}
      <div className="chat-page-content">
        {/* 大标题 */}
        <div className="chat-page-title">
          <h1>我今天能帮到你什么？</h1>
        </div>

        {/* 聊天区域占位 */}
        <div className="chat-messages">
          <div className="welcome-message">
            <p>👋 您好！我是 Muer AI，很高兴为您服务。</p>
            <p>您可以向我提问或分享您的想法。</p>
          </div>
        </div>
      </div>

      {/* 输入区域 */}
      <div className="chat-page-input">
        <BaseInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onMicrophoneClick={handleMicrophoneClick}
          onAttachClick={handleAttachClick}
          placeholder="和 Muer AI 说说看你的规划问题？"
        />
      </div>
    </div>
  );
};

export default ChatPage;
