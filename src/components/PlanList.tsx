import React from 'react';
import { AppBar } from './AppBar';
import BaseInput from './BaseInput';
import EventCard, { EventStatus } from './EventCard';
import { TaskStatus } from './TaskItem';
import type { EventStatusType } from './EventCard';
import type { TaskItemProps } from './TaskItem';
import './PlanList.css';

/**
 * 事件数据接口
 */
export interface EventData {
  /** 事件ID */
  id: string;
  /** 事件标题 */
  title: string;
  /** 时间描述 */
  timeDescription: string;
  /** 时间范围 */
  timeRange: string;
  /** 事件位置 */
  location?: string;
  /** 位置图标URL */
  locationIconUrl?: string;
  /** 事件状态 */
  status: EventStatusType;
  /** 相关任务列表 */
  tasks?: TaskItemProps[];
}

/**
 * 规划列表Props接口
 */
export interface PlanListProps {
  /** 顶部提示文本 */
  headerText?: string;
  /** 事件列表数据 */
  events?: EventData[];
  /** 输入框占位符 */
  inputPlaceholder?: string;
  /** 是否隐藏应用栏 */
  hideAppBar?: boolean;
  /** 各种图标URLs */
  icons?: {
    menuIcon?: string;
    locationIcon?: string;
    arrowIcon?: string;
    separatorIcon?: string;
    suggestionIcon?: string;
    microphoneIcon?: string;
    attachIcon?: string;
  };
  /** 回调函数 */
  callbacks?: {
    onMenuClick?: () => void;
    onAvatarClick?: () => void;
    onEventClick?: (eventId: string) => void;
    onTaskClick?: (eventId: string, taskIndex: number) => void;
    onSuggestionClick?: (eventId: string, taskIndex: number) => void;
    onInputChange?: (value: string) => void;
    onMicrophoneClick?: () => void;
    onAttachClick?: () => void;
  };
  /** 自定义类名 */
  className?: string;
}

/**
 * 规划列表组件
 * 完整的规划页面，包含应用栏、事件列表和输入框
 */
const PlanList: React.FC<PlanListProps> = ({
  headerText = "有事件正在进行，\\n请到「木耳」查看。\\n7月30日 21:00 - 次日 01:00\\n国际制品展会参展讨论",
  events = [],
  inputPlaceholder = "和 Muer AI 说说看你的规划问题？",
  hideAppBar = false,
  icons = {},
  callbacks = {},
  className = ''
}) => {
  // 图标URLs（使用默认的localhost URLs）
  const defaultIcons = {
    menuIcon: "http://localhost:3845/assets/c1b06405d176b1601b820b1ad11f156431b291ff.svg",
    locationIcon: "http://localhost:3845/assets/4d419ba8f89a744f1164433d662a061bbb01d56d.svg",
    arrowIcon: "http://localhost:3845/assets/fb3f35dc52f019ba14f7985f8ab5f2cce1e7153a.svg",
    separatorIcon: "http://localhost:3845/assets/ee390f3d85d093a5581a33e12f1761e061e04bec.svg",
    suggestionIcon: "http://localhost:3845/assets/a31b552216bffb45e107601fc98585b75bde5ec1.svg",
    microphoneIcon: "http://localhost:3845/assets/b7dc497c2bfffe9848b375d68ae6e1f095942d23.svg",
    attachIcon: "http://localhost:3845/assets/86e3deb3c1bd3e1256523e2656c6d1f367b11394.svg",
    ...icons
  };

  // 处理事件点击
  const handleEventClick = (eventId: string) => {
    callbacks.onEventClick?.(eventId);
  };

  // 处理任务点击
  const handleTaskClick = (eventId: string, taskIndex: number) => {
    callbacks.onTaskClick?.(eventId, taskIndex);
  };

  // 处理建议点击
  const handleSuggestionClick = (eventId: string, taskIndex: number) => {
    callbacks.onSuggestionClick?.(eventId, taskIndex);
  };

  return (
    <div className={`plan-list ${className}`}>
      {/* 应用栏 */}
      {!hideAppBar && (
        <div className="plan-list__app-bar">
          <AppBar 
            title="规划" 
            onMenuClick={callbacks.onMenuClick}
            onAvatarClick={callbacks.onAvatarClick}
          />
        </div>
      )}

      {/* 主要内容区域 */}
      <div className={`plan-list__main-content ${hideAppBar ? 'plan-list__main-content--no-app-bar' : ''}`}>
        {/* 顶部提示区域 */}
        {headerText && (
          <div className="plan-list__header">
            <div className="plan-list__header-text">
              {headerText.split('\\n').map((line, index) => (
                <p key={index} className={index < 2 ? 'plan-list__header-title' : 'plan-list__header-subtitle'}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* 事件列表区域 */}
        <div className="plan-list__event-list">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              timeDescription={event.timeDescription}
              timeRange={event.timeRange}
              location={event.location}
              locationIconUrl={event.locationIconUrl || defaultIcons.locationIcon}
              status={event.status}
              tasks={event.tasks?.map((task, taskIndex) => ({
                ...task,
                arrowIconUrl: task.arrowIconUrl || defaultIcons.arrowIcon,
                separatorIconUrl: task.separatorIconUrl || defaultIcons.separatorIcon,
                suggestionIconUrl: task.suggestionIconUrl || defaultIcons.suggestionIcon,
                onClick: () => handleTaskClick(event.id, taskIndex),
                onSuggestionClick: () => handleSuggestionClick(event.id, taskIndex),
              }))}
              clickable={!!callbacks.onEventClick}
              onClick={() => handleEventClick(event.id)}
              className="plan-list__event-card"
            />
          ))}
        </div>
      </div>

      {/* 底部输入区域 */}
      <div className="plan-list__input-area">
        <BaseInput
          placeholder={inputPlaceholder}
          onChange={callbacks.onInputChange}
          onMicrophoneClick={callbacks.onMicrophoneClick}
          onAttachClick={callbacks.onAttachClick}
          className="plan-list__input"
        />
      </div>
    </div>
  );
};

export default PlanList;

// 导出相关类型和常量以供外部使用
export { EventStatus, TaskStatus };
export type { TaskItemProps };
