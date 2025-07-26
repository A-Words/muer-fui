import React from 'react';
import { Icon } from './Icon';
import './ChatCard.css';

export interface ChatCardProps {
  title: string;
  subtitle: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const ChatCard: React.FC<ChatCardProps> = ({
  title,
  subtitle,
  onClick,
  className = '',
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div className={`chat-card-container ${className}`}>
      <button
        className={`chat-card ${disabled ? 'disabled' : ''}`}
        onClick={handleClick}
        disabled={disabled}
        type="button"
      >
        <div className="chat-card-content">
          <div className="chat-card-text">
            <div className="chat-card-title">
              <p>{title}</p>
            </div>
            <div className="chat-card-subtitle">
              <p>{subtitle}</p>
            </div>
          </div>
          <div className="chat-card-icon">
            <Icon 
              name="arrowLeftRight" 
              size={14} 
              className="arrow-icon"
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default ChatCard;
