import React, { useState, useRef, useEffect, useCallback, startTransition } from 'react';
import { AppBar, BaseInput, ChatBubble, ChatCard, ThinkingCard, ChatEventCard } from '../components';
import type { ThinkingStep } from '../components/ThinkingCard';
import { collect } from '../workflows/agents/collector';
import { websearch } from '../workflows/agents/websearch';
import { schedule } from '../workflows/agents/scheduler';
import { openrouter, siliconflow } from '../workflows/provider';
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<'idle' | 'collecting' | 'searching' | 'scheduling'>('idle');
  const [pendingQuestions, setPendingQuestions] = useState<string[]>([]);
  const [waitingForAnswers, setWaitingForAnswers] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [collectedAnswers, setCollectedAnswers] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const answerResolverRef = useRef<((answers: string[]) => void) | null>(null);

  // 模型配置
  const modelV3 = siliconflow('deepseek-ai/DeepSeek-V3');
  const modelFlash = openrouter('google/gemini-2.5-flash');
  const modelK2 = siliconflow('moonshotai/Kimi-K2-Instruct');

  // 添加消息的辅助函数
  const addMessage = useCallback((type: 'user' | 'ai', content: ContentItem[]) => {
    const message: Message = {
      id: `${type}-${Date.now()}`,
      type,
      timestamp: generateTimestamp(),
      content
    };
    setMessages(prev => [...prev, message]);
    return message;
  }, []);

  // 添加思考状态消息
  const addThinkingMessage = useCallback((mainStep: string, statusText: string) => {
    return addMessage('ai', [{
      type: 'thinking',
      data: {
        thinkingData: {
          status: 'thinking',
          statusText,
          mainStep,
          steps: []
        }
      }
    }]);
  }, [addMessage]);

  // 更新思考状态
  const updateThinkingMessage = useCallback((messageId: string, statusText: string, steps?: ThinkingStep[]) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          content: msg.content.map(item => {
            if (item.type === 'thinking') {
              return {
                ...item,
                data: {
                  ...item.data,
                  thinkingData: {
                    ...item.data.thinkingData!,
                    statusText,
                    steps: steps || item.data.thinkingData!.steps
                  }
                }
              };
            }
            return item;
          })
        };
      }
      return msg;
    }));
  }, []);

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

  // 处理问题回答
  const handleQuestionAnswer = useCallback((answer: string) => {
    // 立即清空输入框，避免UI卡顿
    setInputValue('');
    
    startTransition(() => {
      // 添加用户回答的消息
      addMessage('user', [{
        type: 'text',
        data: { text: answer }
      }]);

      const newAnswers = [...collectedAnswers, answer];
      setCollectedAnswers(newAnswers);
      
      // 检查是否还有更多问题
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < pendingQuestions.length) {
        // 还有更多问题，显示下一个
        setCurrentQuestionIndex(nextIndex);
        setTimeout(() => {
          addMessage('ai', [{
            type: 'text',
            data: { text: `问题 ${nextIndex + 1}/${pendingQuestions.length}: ${pendingQuestions[nextIndex]}` }
          }]);
        }, 100);
      } else {
        // 所有问题都回答完毕，提交答案
        if (answerResolverRef.current) {
          const resolver = answerResolverRef.current;
          answerResolverRef.current = null;
          
          setWaitingForAnswers(false);
          setPendingQuestions([]);
          setCurrentQuestionIndex(0);
          setCollectedAnswers([]);
          
          addMessage('ai', [{
            type: 'text',
            data: { text: '感谢您的回答！正在处理您的信息...' }
          }]);
          
          // 延迟调用resolver，避免竞态条件
          setTimeout(() => {
            resolver(newAnswers);
          }, 200);
        }
      }
    });
  }, [collectedAnswers, currentQuestionIndex, pendingQuestions, addMessage]);

  const handleSubmit = useCallback(async () => {
    console.log(isProcessing)
    // if (!inputValue.trim() || isProcessing) return;

    console.log(waitingForAnswers)
    console.log(pendingQuestions)

    // 如果正在等待用户回答问题，处理回答
    if (waitingForAnswers && pendingQuestions.length > 0) {
      console.log('answer')
      handleQuestionAnswer(inputValue);
      return;
    }

    // 添加用户消息
    addMessage('user', [{
      type: 'text',
      data: { text: inputValue }
    }]);

    const query = inputValue;
    setInputValue('');
    setIsProcessing(true);

    try {
      await runWorkflow(query);
    } catch (error) {
      console.error('工作流程执行失败:', error);
      addMessage('ai', [{
        type: 'text',
        data: { text: '抱歉，处理您的请求时出现了错误，请稍后再试。' }
      }]);
    } finally {
      setIsProcessing(false);
    }
  }, [inputValue, isProcessing, waitingForAnswers, pendingQuestions, handleQuestionAnswer, addMessage]);

  // 格式化时间线时间
  const formatTimelineTime = useCallback((when: string) => {
    try {
      // YYYYMMDDHHMM+ZZZZ -> 可读格式
      const year = when.substring(0, 4);
      const month = when.substring(4, 6);
      const day = when.substring(6, 8);
      const hour = when.substring(8, 10);
      const minute = when.substring(10, 12);
      
      return `${month}月${day}日 ${hour}:${minute}`;
    } catch {
      return when;
    }
  }, []);

  // 从描述中提取位置信息
  const extractLocation = useCallback((description: string) => {
    // 简单的位置提取逻辑，可以根据需要改进
    const locationMatches = description.match(/(?:地点|位置|地址)[：:]\s*([^\n,，。]+)/);
    return locationMatches ? locationMatches[1].trim() : undefined;
  }, []);

  // 主工作流程
  const runWorkflow = useCallback(async (query: string) => {
    let collectedSummary: Record<string, string> = {};
    let webReport = '';

    // 阶段 1: 信息收集
    setCurrentStage('collecting');
    const collectingMessage = addThinkingMessage('信息收集', '正在分析您的需求...');

        await collect(modelV3, query, async (questions) => {
      updateThinkingMessage(collectingMessage.id, '请回答以下问题以完善您的需求');
      
      // 显示第一个问题
      if (questions.length > 0) {
        addMessage('ai', [{
          type: 'text',
          data: { text: `为了更好地为您安排，我需要了解一些信息。\n\n问题 1/${questions.length}: ${questions[0]}` }
        }]);

        setPendingQuestions(questions);
        setCurrentQuestionIndex(0);
        setCollectedAnswers([]);
        setWaitingForAnswers(true);

        // 等待用户回答
        return new Promise<string[]>((resolve) => {
          answerResolverRef.current = resolve;
        });
      }
      return [];
    }, async (summary: Record<string, string>, reason: string) => {
      collectedSummary = summary;
      updateThinkingMessage(collectingMessage.id, '信息收集完成');
      
      addMessage('ai', [{
        type: 'text',
        data: { text: `信息收集完成：${reason}\n\n正在进行网络搜索以获取更多相关信息...` }
      }]);
    });

    // 阶段 2: Web 搜索
    setCurrentStage('searching');
    const searchingMessage = addThinkingMessage('网络搜索', '正在搜索相关信息...');

    await websearch(
      modelFlash,
      query,
      Object.entries(collectedSummary).map(([key, value]) => `${key}: ${value}`).join('\n'),
      async (summary) => {
        webReport = Object.entries(summary).map(([key, value]) => `## ${key}\n\n${value}`).join('\n\n');
        updateThinkingMessage(searchingMessage.id, '网络搜索完成');
        
        addMessage('ai', [{
          type: 'text',
          data: { text: '搜索完成，正在为您生成个性化的日程安排...' }
        }]);
      },
      async (results) => {
        updateThinkingMessage(searchingMessage.id, `搜索到 ${results.length} 个相关结果`);
      },
      async () => {
        updateThinkingMessage(searchingMessage.id, '正在分析网页内容...');
      },
      async () => {
        updateThinkingMessage(searchingMessage.id, '正在解析详细信息...');
      }
    );

    // 阶段 3: 日程安排
    setCurrentStage('scheduling');
    const schedulingMessage = addThinkingMessage('日程规划', '正在生成您的专属日程...');

    await schedule(
      modelK2,
      collectedSummary,
      webReport,
      async (timeline) => {
        updateThinkingMessage(schedulingMessage.id, '日程安排完成');
        
        try {
          const timelineData = JSON.parse(timeline);
          
          addMessage('ai', [{
            type: 'text',
            data: { text: '为您生成了以下日程安排：' }
          }]);

          // 为每个时间线项目创建事件卡片
          timelineData.forEach((item: any) => {
            addMessage('ai', [{
              type: 'event',
              data: {
                eventData: {
                  title: item.title,
                  time: formatTimelineTime(item.when),
                  location: extractLocation(item.description),
                  statusMessage: item.description,
                  locationIcon: 'placeFlag'
                }
              }
            }]);
          });
          
        } catch (error) {
          console.error('解析时间线失败:', error);
          addMessage('ai', [{
            type: 'text',
            data: { text: `日程安排完成：\n\n${timeline}` }
          }]);
        }
      }
    );

    setCurrentStage('idle');
  }, [modelV3, modelFlash, modelK2, addThinkingMessage, updateThinkingMessage, addMessage, formatTimelineTime, extractLocation]);



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

  return (
    <div 
      className={`chat-page ${isLoaded ? 'loaded' : ''}`}
    >
      {/* AppBar */}
      <div className="chat-page-header">
        <AppBar
          title="Muer AI"
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
          onSubmit={handleSubmit}
          placeholder={
            waitingForAnswers 
              ? `请回答问题 ${currentQuestionIndex + 1}/${pendingQuestions.length}...` 
              : isProcessing 
                ? `正在${currentStage === 'collecting' ? '收集信息' : currentStage === 'searching' ? '搜索资料' : '规划日程'}...` 
                : "和 Muer AI 说说看你的规划问题？"
          }
        />
      </div>
    </div>
  );
};

export default ChatPage;
