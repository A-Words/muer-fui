import React from 'react';
import ChatEventCard from './ChatEventCard';
import './ChatEventCardExample.css';

/**
 * ChatEventCard 组件使用示例
 */
const ChatEventCardExample: React.FC = () => {
  const handleCardClick = (title: string) => {
    console.log(`点击了事件: ${title}`);
  };

  return (
    <div className="chat-event-card-example">
      <h2 className="chat-event-card-example__title">ChatEventCard 组件示例</h2>
      
      <div className="chat-event-card-example__section">
        <h3>基础使用 - 完整信息</h3>
        <ChatEventCard
          title="在香港参加聚会"
          time="5月10日 21:00 - 次日 01:00"
          location="香港帕蒂奈 KTV"
          statusMessage="经过检查，规划安排没有冲突"
          onClick={() => handleCardClick('在香港参加聚会')}
        />
      </div>

      <div className="chat-event-card-example__section">
        <h3>无地点信息</h3>
        <ChatEventCard
          title="团队会议"
          time="今天 14:00 - 16:00"
          statusMessage="会议准备就绪"
          onClick={() => handleCardClick('团队会议')}
        />
      </div>

      <div className="chat-event-card-example__section">
        <h3>仅标题和时间</h3>
        <ChatEventCard
          title="重要电话会议"
          time="明天 10:00"
          onClick={() => handleCardClick('重要电话会议')}
        />
      </div>

      <div className="chat-event-card-example__section">
        <h3>长标题测试</h3>
        <ChatEventCard
          title="这是一个非常长的事件标题用来测试文字溢出处理效果"
          time="下周一 09:00 - 18:00"
          location="北京市朝阳区某某大厦某某会议室"
          statusMessage="请确认参会人员名单，会议资料已发送至邮箱"
          onClick={() => handleCardClick('长标题测试')}
        />
      </div>

      <div className="chat-event-card-example__section">
        <h3>多个卡片组合</h3>
        <div className="chat-event-card-example__grid">
          <ChatEventCard
            title="早餐会议"
            time="8:00 - 9:00"
            location="咖啡厅"
            onClick={() => handleCardClick('早餐会议')}
          />
          <ChatEventCard
            title="项目评审"
            time="10:00 - 12:00"
            location="会议室B"
            statusMessage="准备演示材料"
            onClick={() => handleCardClick('项目评审')}
          />
          <ChatEventCard
            title="客户拜访"
            time="14:00 - 16:00"
            location="客户办公室"
            onClick={() => handleCardClick('客户拜访')}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatEventCardExample;
