import React from 'react';
import './AttendeeCard.css';
import { Icon } from './index';

// 导入本地图片资源
import ellipse4Pic from '../assets/pic/Ellipse 4pic.png';
import ellipse41Pic from '../assets/pic/Ellipse 4-1pic.png';

// 参会人员数据接口
export interface AttendeeInfo {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

export interface AttendeeCardProps {
  title?: string;
  attendees?: AttendeeInfo[];
  className?: string;
}

const AttendeeCard: React.FC<AttendeeCardProps> = ({
  title = "参会人名片",
  attendees = [
    {
      id: '1',
      name: '张岚风',
      title: '展会负责人',
      avatar: ellipse4Pic
    },
    {
      id: '2',
      name: 'Ariana Grande',
      title: '参会厂商',
      avatar: ellipse41Pic
    }
  ],
  className = ""
}) => {
  return (
    <div className={`attendee-card ${className}`}>
      {/* 标题区域 */}
      <div className="card-title">
        <div className="title-icons">
          <div className="icon-wrapper">
            <Icon name="people" className="icon icon-primary"/>
          </div>
        </div>
        <div className="title-text">
          <p>{title}</p>
        </div>
      </div>

      {/* 参会人员列表 */}
      <div className="attendees-container">
        {attendees.map((attendee, index) => (
          <React.Fragment key={attendee.id}>
            <div className="attendee-item">
              <div className="avatar-container">
                <img 
                  src={attendee.avatar} 
                  alt={`${attendee.name}的头像`} 
                  className="avatar"
                />
              </div>
              <div className="attendee-info">
                <div className="attendee-name">
                  <p>{attendee.name}</p>
                </div>
                <div className="attendee-title">
                  <p>{attendee.title}</p>
                </div>
              </div>
            </div>
            {/* 分隔线（最后一个项目不显示） */}
            {index < attendees.length - 1 && (
              <div className="divider">
                <div className="divider-line" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AttendeeCard;
