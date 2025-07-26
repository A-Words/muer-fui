import React from 'react';
import './PreMeetingNotes.css';
import { Icon } from './index';

export interface PreMeetingNotesProps {
  title?: string;
  noteItems?: string[];
  className?: string;
}

const PreMeetingNotes: React.FC<PreMeetingNotesProps> = ({
  title = "你的会前笔记",
  noteItems = [
    "提问参展要求",
    "和供应商确认进度", 
    "确定参展产品和项目"
  ],
  className = ""
}) => {
  return (
    <div className={`pre-meeting-notes ${className}`} >
      {/* 标题区域 */}
      <div className="title-section">
        <div className="icon-container">
          <div className="icon-wrapper">
            <Icon name="note" className="icon" />
          </div>
        </div>
        <div className="title-text">
          <p>{title}</p>
        </div>
      </div>

      {/* 笔记列表 */}
      <div className="notes-list">
        <ol>
          {noteItems.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Background image section removed */}
    </div>
  );
};

export default PreMeetingNotes;
