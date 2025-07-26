import React from 'react';
import './ChatLayout.css';

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <div className="chat-layout">
      {/* 主要内容区域，占满整个屏幕 */}
      <main className="chat-main-content">
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;
