import React from 'react';
import './StatusBar.css';

/**
 * 状态栏Props接口
 */
export interface StatusBarProps {
  /** 当前时间 */
  time: string;
  /** WiFi图标URL */
  wifiIconUrl?: string;
  /** 信号图标URL */
  signalIconUrl?: string;
  /** 电池图标URL */
  batteryIconUrl?: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 状态栏组件
 * 显示时间、WiFi、信号和电池状态
 */
const StatusBar: React.FC<StatusBarProps> = ({
  time,
  wifiIconUrl,
  signalIconUrl,
  batteryIconUrl,
  className = ''
}) => {
  return (
    <div className={`status-bar ${className}`}>
      <div className="status-bar__time">
        {time}
      </div>
      
      <div className="status-bar__icons">
        {wifiIconUrl && (
          <div className="status-bar__icon">
            <img src={wifiIconUrl} alt="WiFi" />
          </div>
        )}
        {signalIconUrl && (
          <div className="status-bar__icon">
            <img src={signalIconUrl} alt="信号" />
          </div>
        )}
        {batteryIconUrl && (
          <div className="status-bar__icon status-bar__icon--battery">
            <img src={batteryIconUrl} alt="电池" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusBar;
