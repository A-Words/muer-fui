import React, { useState, useRef, useEffect } from 'react';
import { AppBar, BaseInput, ChatBubble, ChatCard, ThinkingCard, ChatEventCard } from '../components';
import type { ThinkingStep } from '../components/ThinkingCard';
import './ChatPage.css';

// 定义内容项类型
// 消息内容项类型
interface ContentItem {
  type: 'text' | 'card' | 'thinking' | 'event';
  data: {
    text?: string;
    cardData?: {
      title: string;
      icon: string;
    };
    thinkingData?: {
      status: 'thinking' | 'completed' | 'error';
      statusText: string;
      mainStep: string;
      steps: ThinkingStep[];
    };
    eventData?: {
      title: string;
      time: string;
      location?: string;
      statusMessage?: string;
      locationIcon?: string;
    };
  };
}

// 定义消息类型
type Message = {
  id: string;
  type: 'user' | 'ai';
  timestamp: string;
  content: ContentItem[];
};

const ChatPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentReplyIndex, setCurrentReplyIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 预定义的AI回复列表（混合文本和卡片内容）
  const aiReplies = [
    [
      {
        type: 'text' as const,
        data: { text: "好的，我来帮你制定香港聚会的规划。首先需要了解一些基本信息，比如聚会的时间、地点和参与人数。" }
      }
    ],
    [
      {
        type: 'text' as const,
        data: { text: "根据你的情况，我为你准备了一份详细的规划建议：" }
      },
      {
        type: 'card' as const,
        data: {
          cardData: {
            title: "香港聚会规划建议",
            icon: "plan"
          }
        }
      }
    ],
    [
      {
        type: 'text' as const,
        data: { text: "我为你安排了一个具体的聚会计划，请查看以下详情：" }
      },
      {
        type: 'event' as const,
        data: {
          eventData: {
            title: "在香港参加聚会",
            time: "5月10日 21:00 - 次日 01:00",
            location: "香港帕蒂奈 KTV",
            statusMessage: "经过检查，规划安排没有冲突",
            locationIcon: "placeFlag"
          }
        }
      }
    ],
    [
      {
        type: 'thinking' as const,
        data: {
          thinkingData: {
            status: 'thinking' as const,
            statusText: '研究中',
            mainStep: '智能思考',
            steps: [
              {
                id: 'context',
                title: '获取上下文',
                description: '正在分析你的聚会需求和偏好，结合香港当地的实际情况...',
                isLoading: true,
                tags: [
                  { id: 'plan1', title: '用户最近的规划', icon: 'plan' },
                  { id: 'note1', title: '相关笔记', icon: 'note' },
                  { id: 'traffic1', title: '交通状况', icon: 'traffic' }
                ]
              }
            ]
          }
        }
      }
    ],
    [
      {
        type: 'text' as const,
        data: { text: "我建议几个方案：如果喜欢热闹，可以选择铜锣湾或尖沙咀的餐厅；如果想要安静一些，可以考虑太平山顶的景观餐厅。" }
      },
      {
        type: 'card' as const,
        data: {
          cardData: {
            title: "推荐餐厅列表",
            icon: "placeFlag"
          }
        }
      }
    ],
    [
      {
        type: 'text' as const,
        data: { text: "关于交通安排，建议提前预订出租车或使用港铁。港铁很方便，而且避免了交通拥堵的问题。" }
      },
      {
        type: 'card' as const,
        data: {
          cardData: {
            title: "交通路线规划",
            icon: "traffic"
          }
        }
      }
    ],
    [
      {
        type: 'text' as const,
        data: { text: "还需要考虑一下住宿安排吗？香港的酒店选择很多，我可以根据你的预算推荐一些不错的选择。" }
      }
    ],
    [
      {
        type: 'text' as const,
        data: { text: "聚会的时候记得准备一些小礼物或者纪念品，这样能让聚会更有意义。有什么其他需要我帮助规划的吗？" }
      }
    ]
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
      type: 'user' as const,
      timestamp: generateTimestamp(),
      content: [
        {
          type: 'text' as const,
          data: { text: inputValue }
        }
      ]
    };

    // 添加用户消息
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 模拟AI回复延迟
    setTimeout(() => {
      const currentReply = aiReplies[currentReplyIndex % aiReplies.length];
      
      const aiMessage = {
        id: `ai-${Date.now()}`,
        type: 'ai' as const,
        timestamp: generateTimestamp(),
        content: currentReply
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
              <div key={message.id} className={`message-group ${message.type}`}>
                {message.content.map((item, index) => (
                  <div key={`${message.id}-${index}`}>
                    {item.type === 'text' ? (
                      <ChatBubble
                        message={item.data.text || ''}
                        type={message.type}
                        timestamp={index === message.content.length - 1 ? message.timestamp : undefined}
                      />
                    ) : item.type === 'card' ? (
                      <div className={`chat-card-wrapper ${message.type}`}>
                        <ChatCard
                          title={item.data.cardData?.title || ''}
                          subtitle=""
                          onClick={() => console.log('Card clicked:', item.data.cardData?.title)}
                        />
                      </div>
                    ) : item.type === 'event' ? (
                      <div className={`chat-event-card-wrapper ${message.type}`}>
                        <ChatEventCard
                          title={item.data.eventData?.title || ''}
                          time={item.data.eventData?.time || ''}
                          location={item.data.eventData?.location}
                          statusMessage={item.data.eventData?.statusMessage}
                          locationIcon={item.data.eventData?.locationIcon}
                          onClick={() => console.log('Event card clicked:', item.data.eventData?.title)}
                        />
                      </div>
                    ) : item.type === 'thinking' ? (
                      <div className={`thinking-card-wrapper ${message.type}`}>
                        <ThinkingCard
                          status={item.data.thinkingData?.status || 'thinking'}
                          statusText={item.data.thinkingData?.statusText || '研究中'}
                          mainStep={item.data.thinkingData?.mainStep || '智能思考'}
                          steps={item.data.thinkingData?.steps || []}
                          defaultExpanded={false}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
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
