import React from 'react';
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
  className?: string;
}

const BaseInput: React.FC<BaseInputProps> = ({
  placeholder = "和 Muer AI 说说看你的规划问题？",
  value = "",
  onChange,
  onMicrophoneClick,
  onAttachClick,
  className = ""
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`base-input ${className}`}>
      <div className="base-input-container">
        <div className="input-area">
          <div className="input-wrapper">
            <input
              type="text"
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="input-field"
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
};

export default BaseInput;
