import React, { useState } from 'react';
import { Icon } from './Icon';
import './ThinkingCard.css';

export interface ThinkingStep {
  id: string;
  title: string;
  description: string;
  isLoading?: boolean;
  tags?: Array<{
    id: string;
    title: string;
    icon?: string;
  }>;
}

export interface ThinkingCardProps {
  status: 'thinking' | 'completed' | 'error';
  statusText: string;
  mainStep: string;
  steps: ThinkingStep[];
  className?: string;
  defaultExpanded?: boolean;
}

const ThinkingCard: React.FC<ThinkingCardProps> = ({
  status = 'thinking',
  statusText = '研究中',
  mainStep = '智能思考',
  steps,
  className = '',
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const getStatusIcon = () => {
    switch (status) {
      case 'thinking':
        return 'loading';
      case 'completed':
        return 'muerAI';
      case 'error':
        return 'default';
      default:
        return 'loading';
    }
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`thinking-card ${className}`}>
      {/* 快速预览状态层 */}
      <div 
        className={`thinking-card-header ${isExpanded ? 'expanded' : ''}`}
        onClick={handleToggle}
      >
        <div className="status-section">
          <div className="status-item">
            <Icon 
              name={getStatusIcon()} 
              size={14} 
              className={`status-icon ${status === 'thinking' ? 'rotating' : ''}`} 
            />
            <span className="status-text">{statusText}</span>
          </div>
          <div className="main-step">
            <Icon name="muerAI" size={14} className="step-icon" />
            <span className="step-text">{mainStep}</span>
          </div>
        </div>
      </div>

      {/* 展开的思考阶段层 */}
      <div className={`thinking-card-body ${isExpanded ? 'expanded' : ''}`}>
        {steps.map((step) => (
          <div key={step.id} className="thinking-step">
            <div className="step-header">
              <Icon name="modelMessage" size={14} className="step-icon" />
              <span className="step-title">{step.title}</span>
            </div>
            
            <div className="step-description">
              {step.description}
            </div>

            {step.isLoading && (
              <div className="step-loading">
                <Icon name="loading" size={14} className="loading-icon rotating" />
                <span className="loading-text">用户最近的规划</span>
              </div>
            )}

            {step.tags && step.tags.length > 0 && (
              <div className="step-tags">
                {step.tags.map((tag, index) => (
                  <div key={tag.id} className="step-tag" style={{ zIndex: step.tags!.length - index }}>
                    {tag.icon && <Icon name={tag.icon} size={14} className="tag-icon" />}
                    {tag.title && <span className="tag-title">{tag.title}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThinkingCard;
