import React from 'react';
import './PreMeetingNotes.css';

// 图片资源常量 - 实际项目中这些应该替换为本地资源或CDN链接
const iconImg = "http://localhost:3845/assets/22353f7d3eec43b18757eab4b9750a1544defef8.svg";

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
    <div className={`pre-meeting-notes ${className}`}>
      {/* 标题区域 */}
      <div className="title-section">
        <div className="icon-container">
          <div className="icon-wrapper">
            <img src={iconImg} alt="笔记图标" className="icon" />
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

      {/* 背景图片区域 */}
      <div className="background-image-section" />
    </div>
  );
};

export default PreMeetingNotes;
