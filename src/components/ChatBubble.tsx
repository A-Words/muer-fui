import React from 'react';
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
  return (
    <div className={`chat-bubble-container ${type} ${className}`}>
      <div className={`chat-bubble ${type}`}>
        <div className="chat-bubble-content">
          <p className="chat-bubble-text">{message}</p>
          {timestamp && (
            <div className="chat-bubble-timestamp">
              {timestamp}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
