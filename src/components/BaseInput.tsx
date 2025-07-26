import React, { forwardRef } from 'react';
import './BaseInput.css';

// 图片资源常量
const microphoneIcon = "http://localhost:3845/assets/b7dc497c2bfffe9848b375d68ae6e1f095942d23.svg";
const attachIcon = "http://localhost:3845/assets/86e3deb3c1bd3e1256523e2656c6d1f367b11394.svg";

export interface BaseInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onMicrophoneClick?: () => void;
  onAttachClick?: () => void;
  onSubmit?: () => void;
  onClick?: () => void;
  readOnly?: boolean;
  className?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(({
  placeholder = "和 Muer AI 说说看你的规划问题？",
  value = "",
  onChange,
  onMicrophoneClick,
  onAttachClick,
  onSubmit,
  onClick,
  readOnly = false,
  className = ""
}, ref) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      onChange?.(e.target.value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (readOnly) {
      e.target.blur(); // 如果是只读模式，立即失焦
    }
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (readOnly) {
      e.preventDefault();
      onClick?.();
    } else {
      onClick?.();
    }
  };

  return (
    <div className={`base-input ${className}`}>
      <div className="base-input-container">
        <div className="input-area">
          <div className="input-wrapper">
            <input
              ref={ref}
              type="text"
              value={value}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              placeholder={placeholder}
              className="input-field"
              readOnly={readOnly}
            />
          </div>
        </div>
        
        <div className="icon-group">
          <button 
            className="icon-button"
            onClick={onMicrophoneClick}
            type="button"
            aria-label="语音输入"
          >
            <div className="icon-container">
              <img src={microphoneIcon} alt="麦克风" className="icon" />
            </div>
          </button>
          
          <button 
            className="icon-button"
            onClick={onAttachClick}
            type="button"
            aria-label="附件"
          >
            <div className="icon-container">
              <img src={attachIcon} alt="附件" className="icon" />
            </div>
          </button>
        </div>
      </div>
      <div className="input-border" />
    </div>
  );
});

export default BaseInput;
