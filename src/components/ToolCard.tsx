import React from 'react';
import './ToolCard.css';

// 箭头图标组件
const ArrowRightIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="tool-card__arrow-icon">
    <path 
      d="M4.55 3.5L8.05 7L4.55 10.5" 
      stroke="#5a5a5a" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export interface ToolCardProps {
  title?: string;
  mainText?: string;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
  onClick?: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title = "木耳的工具库",
  mainText = "和多平台链接",
  description = "木耳可以帮助你链接多个平台，轻松做简单事。",
  actionText = "了解所有工具",
  onActionClick,
  onClick
}) => {
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onActionClick?.();
  };

  return (
    <div className="tool-card" onClick={onClick}>
      <div className="tool-card__container">
        {/* 标题部分 */}
        <div className="tool-card__header">
          <div className="tool-card__title">
            <p>{title}</p>
          </div>
        </div>

        {/* 主要内容部分 */}
        <div className="tool-card__content">
          {/* 主要文字 */}
          <div className="tool-card__main-text">
            <p>{mainText}</p>
          </div>
          
          {/* 描述文字 */}
          <div className="tool-card__description">
            <p>{description}</p>
          </div>
        </div>

        {/* 操作按钮部分 */}
        <div className="tool-card__action">
          <button 
            className="tool-card__action-button"
            onClick={handleActionClick}
          >
            <div className="tool-card__action-content">
              <span className="tool-card__action-text">{actionText}</span>
            </div>
            <div className="tool-card__action-icon">
              <ArrowRightIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
