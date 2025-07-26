import React, { useState, useEffect } from 'react';
import './MeetingRecorder.css';

// 图片资源常量
const recordIcon = "http://localhost:3845/assets/87ee2ba4153fda28423d49fb7dabff94097f1ed2.svg";

export interface MeetingRecorderProps {
  title?: string;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  className?: string;
}

const MeetingRecorder: React.FC<MeetingRecorderProps> = ({
  title = "Muer AI 会议纪要",
  onStartRecording,
  onStopRecording,
  className = ""
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  // 格式化时间显示
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 录制计时器
  useEffect(() => {
    let interval: number | undefined;
    
    if (isRecording) {
      interval = window.setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isRecording]);

  const handleRecordingToggle = () => {
    if (isRecording) {
      // 停止录制
      setIsRecording(false);
      onStopRecording?.();
    } else {
      // 开始录制
      setIsRecording(true);
      setDuration(0);
      onStartRecording?.();
    }
  };

  return (
    <div className={`meeting-recorder ${className}`}>
      {/* 标题区域 */}
      <div className="recorder-title">
        <div className="title-icon">
          <div className="icon-wrapper">
            <img src={recordIcon} alt="录制图标" className="record-icon" />
          </div>
        </div>
        <div className="title-text">
          <p>{title}</p>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="recorder-content">
        {/* 时间显示 */}
        <div className="time-display">
          <p className="time-text">
            <span className="time-minutes">{formatTime(duration).split(':')[0]}:</span>
            <span className="time-seconds">{formatTime(duration).split(':')[1]}</span>
          </p>
        </div>

        {/* 录制按钮 */}
        <button 
          className={`record-button ${isRecording ? 'recording' : ''}`}
          onClick={handleRecordingToggle}
          type="button"
          aria-label={isRecording ? '停止会议纪要' : '开始会议纪要'}
        >
          <div className="button-content">
            <p>{isRecording ? '停止会议纪要' : '开始会议纪要'}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MeetingRecorder;
