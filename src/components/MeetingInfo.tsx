import React from 'react';
import './MeetingInfo.css';
import { Icon } from './index';

export interface MeetingInfoProps {
  /** 会议时间 */
  time: string;
  /** 会议状态 */
  status: '进行中' | '已结束' | '未开始';
  /** 会议标题 */
  title: string;
  /** 自定义类名 */
  className?: string;
}

const MeetingInfo: React.FC<MeetingInfoProps> = ({
  time,
  status,
  title,
  className = ''
}) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case '进行中':
        return 'status-active';
      case '已结束':
        return 'status-ended';
      case '未开始':
        return 'status-upcoming';
      default:
        return '';
    }
  };

  return (
    <div className={`meeting-info ${className}`}>
      <div className="meeting-header">
        <div className="meeting-time-status">
          <span className="meeting-time">{time}</span>
          <span className={`meeting-status ${getStatusClass(status)}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="meeting-title">
        {title}
      </div>
    </div>
  );
};

export default MeetingInfo;
