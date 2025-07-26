import React, { useState, useRef } from 'react';
import './ChatBubble.css';

export interface ChatBubbleProps {
  message: string;
  type: 'user' | 'ai';
  timestamp?: string;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  type,
  timestamp,
  className = '',
}) => {
  const [showTimestamp, setShowTimestamp] = useState(false);
  const longPressTimer = useRef<number | null>(null);
  const isLongPress = useRef(false);

  const handleTouchStart = () => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setShowTimestamp(true);
      // 添加触觉反馈（如果支持）
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500); // 长按500毫秒后显示时间
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    // 如果不是长按，隐藏时间戳
    if (!isLongPress.current) {
      setShowTimestamp(false);
    }
  };

  const handleMouseDown = () => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setShowTimestamp(true);
    }, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    if (!isLongPress.current) {
      setShowTimestamp(false);
    }
  };

  const handleMouseLeave = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setShowTimestamp(false);
    isLongPress.current = false;
  };

  // 点击其他地方隐藏时间戳
  const handleClickOutside = () => {
    setShowTimestamp(false);
    isLongPress.current = false;
  };

  return (
    <div 
      className={`chat-bubble-container ${type} ${className}`}
      onClick={handleClickOutside}
    >
      <div 
        className={`chat-bubble ${type} ${showTimestamp ? 'show-timestamp' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="chat-bubble-content">
          <p className="chat-bubble-text">{message}</p>
          {timestamp && (
            <div className={`chat-bubble-timestamp ${showTimestamp ? 'visible' : ''}`}>
              {timestamp}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
