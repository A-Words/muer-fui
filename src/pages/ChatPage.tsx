import React, { useState, useEffect, useRef } from 'react';
import AppBar from '../components/AppBar/AppBar';
import BaseInput from '../components/BaseInput';
import ChatBubble from '../components/ChatBubble';
import './ChatPage.css';

const ChatPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState<Array<{
    id: string;
    message: string;
    type: 'user' | 'ai';
    timestamp: string;
  }>>([]);
  const [currentReplyIndex, setCurrentReplyIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 预定义的AI回复列表
  const aiReplies = [
    "好的，我来帮你制定香港聚会的规划。首先需要了解一些基本信息，比如聚会的时间、地点和参与人数。",
    "香港有很多不错的聚会场所。你们更倾向于室内还是户外活动？预算大概是多少？",
    "根据你的描述，我建议几个方案：1. 如果喜欢热闹，可以选择铜锣湾或尖沙咀的餐厅；2. 如果想要安静一些，可以考虑太平山顶的景观餐厅。",
    "关于交通安排，建议提前预订出租车或使用港铁。港铁很方便，而且避免了交通拥堵的问题。",
    "还需要考虑一下住宿安排吗？香港的酒店选择很多，我可以根据你的预算推荐一些不错的选择。",
    "聚会的时候记得准备一些小礼物或者纪念品，这样能让聚会更有意义。有什么其他需要我帮助规划的吗？"
  ];

  // 生成时间戳
  const generateTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

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

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      message: inputValue,
      type: 'user' as const,
      timestamp: generateTimestamp(),
    };

    // 添加用户消息
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 模拟AI回复延迟
    setTimeout(() => {
      const aiMessage = {
        id: `ai-${Date.now()}`,
        message: aiReplies[currentReplyIndex % aiReplies.length],
        type: 'ai' as const,
        timestamp: generateTimestamp(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setCurrentReplyIndex(prev => prev + 1);
    }, 1000 + Math.random() * 1000); // 1-2秒随机延迟
  };

  // 自动滚动到底部
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  // 当消息更新时自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        {messages.length === 0 ? (
          <>
            {/* 大标题 */}
            <div className="chat-page-title">
              <h1>我今天能帮到你什么？</h1>
            </div>

            {/* 欢迎消息 */}
            <div className="chat-messages">
              <div className="welcome-message">
                <p>👋 您好！我是 Muer AI，很高兴为您服务。</p>
                <p>您可以向我提问或分享您的想法。</p>
              </div>
            </div>
          </>
        ) : (
          <div className="chat-messages" ref={chatContainerRef}>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.message}
                type={message.type}
                timestamp={message.timestamp}
              />
            ))}
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className="chat-page-input">
        <BaseInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onMicrophoneClick={handleMicrophoneClick}
          onAttachClick={handleAttachClick}
          onSubmit={handleSubmit}
          placeholder="和 Muer AI 说说看你的规划问题？"
        />
      </div>
    </div>
  );
};

export default ChatPage;
