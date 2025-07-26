import React from 'react';
import './TaskItem.css';

/**
 * 任务状态常量
 */
export const TaskStatus = {
  WAITING: 'waiting',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

/**
 * 任务项Props接口
 */
export interface TaskItemProps {
  /** 任务标题 */
  title: string;
  /** 任务描述 */
  description?: string;
  /** 任务状态 */
  status: TaskStatusType;
  /** 是否显示右箭头 */
  showArrow?: boolean;
  /** 是否是建议任务 */
  isSuggestion?: boolean;
  /** 建议图标URL */
  suggestionIconUrl?: string;
  /** 建议文本 */
  suggestionText?: string;
  /** 建议按钮文本 */
  suggestionButtonText?: string;
  /** 右箭头图标URL */
  arrowIconUrl?: string;
  /** 分隔线图标URL */
  separatorIconUrl?: string;
  /** 点击回调 */
  onClick?: () => void;
  /** 建议按钮点击回调 */
  onSuggestionClick?: () => void;
  /** 自定义类名 */
  className?: string;
}

/**
 * 任务项组件
 * 用于显示单个任务的信息和状态
 */
const TaskItem: React.FC<TaskItemProps> = ({
  title,
  description,
  status,
  showArrow = false,
  isSuggestion = false,
  suggestionIconUrl,
  suggestionText,
  suggestionButtonText = '编辑',
  arrowIconUrl,
  separatorIconUrl,
  onClick,
  onSuggestionClick,
  className = ''
}) => {
  const getStatusClass = () => {
    switch (status) {
      case TaskStatus.WAITING:
        return 'task-item--waiting';
      case TaskStatus.IN_PROGRESS:
        return 'task-item--in-progress';
      case TaskStatus.COMPLETED:
        return 'task-item--completed';
      default:
        return '';
    }
  };

  return (
    <div className={`task-item ${getStatusClass()} ${className}`}>
      <div 
        className="task-item__main"
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        <div className="task-item__content">
          <div className="task-item__info">
            <h4 className="task-item__title">{title}</h4>
            {description && (
              <p className="task-item__description">{description}</p>
            )}
          </div>
        </div>

        {showArrow && (
          <div className="task-item__actions">
            {separatorIconUrl && (
              <div className="task-item__separator">
                <img src={separatorIconUrl} alt="" />
              </div>
            )}
            {arrowIconUrl && (
              <div className="task-item__arrow">
                <img src={arrowIconUrl} alt="查看详情" />
              </div>
            )}
          </div>
        )}
      </div>

      {isSuggestion && suggestionText && (
        <div className="task-item__suggestion">
          {suggestionIconUrl && (
            <div className="task-item__suggestion-icon">
              <img src={suggestionIconUrl} alt="建议" />
            </div>
          )}
          <div className="task-item__suggestion-content">
            <span className="task-item__suggestion-text">{suggestionText}</span>
          </div>
          <button 
            className="task-item__suggestion-button"
            onClick={onSuggestionClick}
            type="button"
          >
            <span>{suggestionButtonText}</span>
            {arrowIconUrl && (
              <img src={arrowIconUrl} alt="" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
