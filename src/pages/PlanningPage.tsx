import React from 'react';
import { PlanList, EventStatus, TaskStatus, AppBar } from '../components';
import type { EventData } from '../components';
import './PlanningPage.css';

const PlanningPage: React.FC = () => {
  // 示例事件数据
  const events: EventData[] = [
    {
      id: 'event-1',
      title: '在杭州参加聚会',
      timeDescription: '在杭州参加聚会 · 还有 7 天',
      timeRange: '7月30日 21:00 - 次日 01:00',
      location: '杭州帕蒂奈 KTV',
      status: EventStatus.ACTIVE,
      tasks: [
        {
          title: '正在等待阶段任务开始',
          status: TaskStatus.WAITING,
          showArrow: true,
        },
        {
          title: '前往 杭州帕蒂奈 KTV',
          description: '20:00 出发',
          status: TaskStatus.IN_PROGRESS,
        }
      ]
    },
    {
      id: 'event-2',
      title: '国际制品展会参展讨论',
      timeDescription: '在杭州参加聚会 · 还有 18 天',
      timeRange: '8月2日 13:00 - 16:00',
      location: '香港会议展览中心',
      status: EventStatus.UPCOMING,
      tasks: [
        {
          title: '正在等待阶段任务开始',
          status: TaskStatus.WAITING,
          showArrow: true,
        },
        {
          title: '准备会前材料',
          description: '在会议开始前',
          status: TaskStatus.IN_PROGRESS,
          isSuggestion: true,
          suggestionText: '开始准备会前笔记，会中不慌张',
          suggestionButtonText: '编辑',
        }
      ]
    },
    {
      id: 'event-3',
      title: '国际制品展会参展讨论',
      timeDescription: '在杭州参加聚会 · 还有 7 天',
      timeRange: '8月2日 13:00 - 16:00',
      location: '香港会议展览中心',
      status: EventStatus.UPCOMING,
      tasks: [
        {
          title: '正在等待阶段任务开始',
          status: TaskStatus.WAITING,
          showArrow: true,
        },
        {
          title: '前往 香港会议展览中心',
          description: '12:00 出发',
          status: TaskStatus.IN_PROGRESS,
          isSuggestion: true,
          suggestionText: '开始准备会前笔记，会中不慌张',
          suggestionButtonText: '编辑',
        }
      ]
    }
  ];

  // 回调函数
  const callbacks = {
    onMenuClick: () => {
      console.log('菜单按钮被点击');
    },
    onAvatarClick: () => {
      console.log('头像被点击');
    },
    onEventClick: (eventId: string) => {
      console.log('事件被点击:', eventId);
    },
    onTaskClick: (eventId: string, taskIndex: number) => {
      console.log('任务被点击:', eventId, taskIndex);
    },
    onSuggestionClick: (eventId: string, taskIndex: number) => {
      console.log('建议被点击:', eventId, taskIndex);
    },
    onInputChange: (value: string) => {
      console.log('输入框内容变化:', value);
    },
    onMicrophoneClick: () => {
      console.log('麦克风按钮被点击');
    },
    onAttachClick: () => {
      console.log('附件按钮被点击');
    }
  };

  return (
    <div className="planning-page">
      <AppBar 
        title="规划" 
        onMenuClick={callbacks.onMenuClick}
        onAvatarClick={callbacks.onAvatarClick}
      />
      <div className="planning-page-content">
        <PlanList
          headerText="有事件正在进行，\n请到「木耳」查看。\n7月30日 21:00 - 次日 01:00\n国际制品展会参展讨论"
          events={events}
          inputPlaceholder="和 Muer AI 说说看你的规划问题？"
          callbacks={callbacks}
          hideAppBar={true}
        />
      </div>
    </div>
  );
};

export default PlanningPage;
