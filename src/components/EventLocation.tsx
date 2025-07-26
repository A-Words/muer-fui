import React from 'react';
import './EventLocation.css';
import { Icon } from './Icon';

/**
 * 事件位置组件Props接口
 */
export interface EventLocationProps {
  /** 位置名称 */
  location: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 事件位置组件
 * 用于显示事件的地理位置信息
 */
const EventLocation: React.FC<EventLocationProps> = ({
  location,
  className = ''
}) => {
  return (
    <div className={`event-location ${className}`}>
      <div className="event-location__icon">
        <Icon name="placeFlag" size={22} />
      </div>
      <span className="event-location__text">{location}</span>
    </div>
  );
};

export default EventLocation;
