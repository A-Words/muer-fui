import React, { useState } from 'react';
import BaseInput from './BaseInput';
import './BaseInputDemo.css';

const BaseInputDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleMicrophoneClick = () => {
    addLog('语音输入按钮被点击');
  };

  const handleAttachClick = () => {
    addLog('附件按钮被点击');
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    addLog(`输入内容变化: "${value}"`);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>BaseInput 组件演示</h1>
        <p>这是从 Figma 设计生成的 React 输入框组件</p>
      </div>

      <div className="demo-section">
        <h3>基础用法</h3>
        <BaseInput
          value={inputValue}
          onChange={handleInputChange}
          onMicrophoneClick={handleMicrophoneClick}
          onAttachClick={handleAttachClick}
        />
      </div>

      <div className="demo-section">
        <h3>自定义占位符</h3>
        <BaseInput
          placeholder="请输入您的自定义问题..."
          onMicrophoneClick={() => addLog('自定义输入框的语音按钮被点击')}
          onAttachClick={() => addLog('自定义输入框的附件按钮被点击')}
        />
      </div>

      <div className="demo-section">
        <h3>带自定义样式</h3>
        <BaseInput
          className="custom-style"
          placeholder="带有自定义样式的输入框"
          onMicrophoneClick={() => addLog('自定义样式输入框的语音按钮被点击')}
          onAttachClick={() => addLog('自定义样式输入框的附件按钮被点击')}
        />
      </div>

      <div className="demo-section">
        <h3>当前输入值</h3>
        <div className="value-display">
          <code>{inputValue || '(空)'}</code>
        </div>
      </div>

      <div className="demo-section">
        <h3>操作日志</h3>
        <div className="logs-container">
          <div className="logs-header">
            <span>事件日志</span>
            <button onClick={clearLogs} className="clear-btn">清空日志</button>
          </div>
          <div className="logs-content">
            {logs.length === 0 ? (
              <p className="no-logs">暂无操作记录</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="log-item">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>组件特性</h3>
        <ul className="features-list">
          <li>✅ 支持受控组件模式</li>
          <li>✅ 可自定义占位符文本</li>
          <li>✅ 语音输入按钮回调</li>
          <li>✅ 附件按钮回调</li>
          <li>✅ 响应式设计</li>
          <li>✅ 可访问性支持</li>
          <li>✅ 自定义样式类名</li>
          <li>✅ TypeScript 类型支持</li>
        </ul>
      </div>
    </div>
  );
};

export default BaseInputDemo;
