import React from 'react';
import './AttendeeCard.css';

// 图片资源常量 - 实际项目中这些应该替换为本地资源或CDN链接
const iconUser = "http://localhost:3845/assets/74ffe2c6c1fe82efb6aad849208f572fd7a34d1b.svg";
const iconGroup = "http://localhost:3845/assets/82a6142b200f797d06114e40ba5c28bcd3885167.svg";
const dividerIcon = "http://localhost:3845/assets/dc0646cf93617253d51c19f3cc619470a10aa64d.svg";

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
      avatar: 'http://localhost:3845/assets/dd7fc6e62db72bf1a2669a0277f8d63145853883.png'
    },
    {
      id: '2',
      name: 'Ariana Grande',
      title: '参会厂商',
      avatar: 'http://localhost:3845/assets/037deda8a40d6c58c4befc365a66e0bae635fc9e.png'
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
            <img src={iconGroup} alt="人员图标1" className="icon icon-primary" />
            <img src={iconUser} alt="人员图标2" className="icon icon-secondary" />
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
                <img src={dividerIcon} alt="分隔线" className="divider-line" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AttendeeCard;
