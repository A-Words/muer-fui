import React from 'react';
import EventLocation from './EventLocation';
import TaskItem from './TaskItem';
import type { TaskItemProps } from './TaskItem';
import './EventCard.css';

/**
 * 事件状态
 */
export const EventStatus = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  COMPLETED: 'completed'
} as const;

export type EventStatusType = typeof EventStatus[keyof typeof EventStatus];

/**
 * 事件卡片Props接口
 */
export interface EventCardProps {
  /** 事件标题 */
  title: string;
  /** 事件时间描述 */
  timeDescription: string;
  /** 事件时间范围 */
  timeRange: string;
  /** 事件位置 */
  location?: string;
  /** 位置图标URL */
  locationIconUrl?: string;
  /** 事件状态 */
  status: EventStatusType;
  /** 任务列表 */
  tasks?: TaskItemProps[];
  /** 是否可点击 */
  clickable?: boolean;
  /** 卡片点击回调 */
  onClick?: () => void;
  /** 自定义类名 */
  className?: string;
}

/**
 * 事件卡片组件
 * 用于显示单个事件的详细信息，包括时间、地点和相关任务
 */
const EventCard: React.FC<EventCardProps> = ({
  title,
  timeDescription,
  timeRange,
  location,
  locationIconUrl,
  status,
  tasks = [],
  clickable = false,
  onClick,
  className = ''
}) => {
  const getStatusClass = () => {
    switch (status) {
      case EventStatus.UPCOMING:
        return 'event-card--upcoming';
      case EventStatus.ACTIVE:
        return 'event-card--active';
      case EventStatus.COMPLETED:
        return 'event-card--completed';
      default:
        return '';
    }
  };

  const getGradientClass = () => {
    switch (status) {
      case EventStatus.ACTIVE:
        return 'event-card--gradient-active';
      default:
        return '';
    }
  };

  const CardContent = () => (
    <div className={`event-card__container ${getGradientClass()}`}>
      {/* 标题区域 */}
      <div className="event-card__header">
        <div className="event-card__title-section">
          <div className="event-card__time-description">
            {timeDescription}
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="event-card__content">
        <div className="event-card__main-info">
          <h3 className="event-card__title">{title}</h3>
          <p className="event-card__time-range">{timeRange}</p>
          
          {location && (
            <EventLocation
              location={location}
              iconUrl={locationIconUrl}
              className={status === EventStatus.ACTIVE ? 'event-location--primary' : 'event-location--secondary'}
            />
          )}
        </div>
      </div>

      {/* 任务列表区域 */}
      {tasks.length > 0 && (
        <div className="event-card__tasks">
          <div className="event-card__task-list">
            {tasks.map((task, index) => (
              <TaskItem
                key={index}
                {...task}
                className="event-card__task-item"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`event-card ${getStatusClass()} ${className}`}>
      {clickable ? (
        <button
          className="event-card__clickable"
          onClick={onClick}
          type="button"
          aria-label={`查看事件: ${title}`}
        >
          <CardContent />
        </button>
      ) : (
        <CardContent />
      )}
    </div>
  );
};

export default EventCard;
