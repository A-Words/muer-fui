import React from 'react';
import { Icon } from './Icon';
import './ChatEventCard.css';

/**
 * 聊天事件卡片Props接口
 */
export interface ChatEventCardProps {
  /** 事件标题 */
  title: string;
  /** 事件时间 */
  time: string;
  /** 事件地点 */
  location?: string;
  /** 状态信息 */
  statusMessage?: string;
  /** 地点图标 */
  locationIcon?: string;
  /** 自定义类名 */
  className?: string;
  /** 点击回调 */
  onClick?: () => void;
}

/**
 * 聊天事件卡片组件
 * 用于在聊天界面中显示事件信息的卡片
 */
const ChatEventCard: React.FC<ChatEventCardProps> = ({
  title,
  time,
  location,
  statusMessage,
  locationIcon = 'placeFlag',
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`chat-event-card ${className}`}
      onClick={onClick}
    >
      {/* 标题和时间 */}
      <div className="chat-event-card__header">
        <div className="chat-event-card__title">
          {title}
        </div>
        <div className="chat-event-card__time">
          {time}
        </div>
      </div>

      {/* 地点信息 */}
      {location && (
        <div className="chat-event-card__location">
          <div className="chat-event-card__location-icon">
            <Icon name={locationIcon} size={14} />
          </div>
          <div className="chat-event-card__location-text">
            {location}
          </div>
        </div>
      )}

      {/* 状态信息 */}
      {statusMessage && (
        <div className="chat-event-card__status">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default ChatEventCard;
