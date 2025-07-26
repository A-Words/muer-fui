import React from 'react';
import ChatCard from './ChatCard';
import './ChatCardExample.css';

const ChatCardExample: React.FC = () => {
  const handleCardClick = (title: string) => {
    console.log(`点击了卡片: ${title}`);
  };

  return (
    <div className="chat-card-example">
      <h2>ChatCard 组件示例</h2>
      
      <div className="example-section">
        <h3>基础卡片</h3>
        <ChatCard
          title="Muer 对你去香港聚会的问题"
          subtitle="等待你回答"
          onClick={() => handleCardClick('香港聚会问题')}
        />
      </div>

      <div className="example-section">
        <h3>规划建议卡片</h3>
        <ChatCard
          title="香港聚会规划建议"
          subtitle="点击查看详细规划方案"
          onClick={() => handleCardClick('规划建议')}
        />
      </div>

      <div className="example-section">
        <h3>禁用状态</h3>
        <ChatCard
          title="已完成的任务"
          subtitle="此任务已完成"
          disabled={true}
          onClick={() => handleCardClick('已完成任务')}
        />
      </div>

      <div className="example-section">
        <h3>长文本示例</h3>
        <ChatCard
          title="这是一个很长的标题，用来测试文本换行和布局的情况，看看组件是否能正确处理"
          subtitle="这是一个很长的副标题，同样用来测试换行效果和整体的视觉效果"
          onClick={() => handleCardClick('长文本')}
        />
      </div>
    </div>
  );
};

export default ChatCardExample;
