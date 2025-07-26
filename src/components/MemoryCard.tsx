import React from 'react';
import './MemoryCard.css';

// 箭头图标组件
const ArrowRightIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="memory-card__arrow-icon">
    <path 
      d="M4.55 3.5L8.05 7L4.55 10.5" 
      stroke="#5a5a5a" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export interface MemoryCardProps {
  title?: string;
  memoryCount?: number;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
  onClick?: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  title = "木耳的记忆库",
  memoryCount = 10,
  description = "详细的记忆内容可以帮助木耳在规划任务和推荐信息的时候帮到你，使得建议更加个性化。",
  actionText = "了解所有记忆",
  onActionClick,
  onClick
}) => {
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onActionClick?.();
  };

  return (
    <div className="memory-card" onClick={onClick}>
      <div className="memory-card__container">
        {/* 标题部分 */}
        <div className="memory-card__header">
          <div className="memory-card__title">
            <p>{title}</p>
          </div>
        </div>

        {/* 主要内容部分 */}
        <div className="memory-card__content">
          {/* 记忆数量 */}
          <div className="memory-card__count">
            <p>{memoryCount} 条记忆</p>
          </div>
          
          {/* 描述文字 */}
          <div className="memory-card__description">
            <p>{description}</p>
          </div>
        </div>

        {/* 操作按钮部分 */}
        <div className="memory-card__action">
          <button 
            className="memory-card__action-button"
            onClick={handleActionClick}
          >
            <div className="memory-card__action-content">
              <span className="memory-card__action-text">{actionText}</span>
            </div>
            <div className="memory-card__action-icon">
              <ArrowRightIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
