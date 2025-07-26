import React, { useState } from 'react';
import BottomTabBar from './BottomTabBar';
import type { TabItem } from './BottomTabBar';
import './TabExample.css';

// 模拟页面内容组件
const HomePage: React.FC = () => (
  <div className="page-content">
    <h2>🌿 木耳页面</h2>
    <p>这里是木耳功能的主页面内容。</p>
    <div className="feature-list">
      <div className="feature-item">✨ 智能推荐</div>
      <div className="feature-item">📊 数据分析</div>
      <div className="feature-item">🔔 消息通知</div>
    </div>
  </div>
);

const PlanningPage: React.FC = () => (
  <div className="page-content">
    <h2>📋 规划页面</h2>
    <p>这里是规划功能的主页面内容。</p>
    <div className="feature-list">
      <div className="feature-item">📅 日程安排</div>
      <div className="feature-item">🎯 任务管理</div>
      <div className="feature-item">📈 进度跟踪</div>
    </div>
  </div>
);

const ProfilePage: React.FC = () => (
  <div className="page-content">
    <h2>👤 个人中心</h2>
    <p>这里是个人中心页面内容。</p>
    <div className="feature-list">
      <div className="feature-item">⚙️ 设置</div>
      <div className="feature-item">📊 统计</div>
      <div className="feature-item">💬 反馈</div>
    </div>
  </div>
);

// Tab栏使用示例
const TabExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  // 自定义Tab配置
  const customTabs: TabItem[] = [
    {
      id: 'home',
      label: '木耳',
      icon: 'http://localhost:3845/assets/1a949683763fd8e99ca45bf0ac462d3999058379.svg',
      activeIcon: 'http://localhost:3845/assets/e118bb228f70efa30cc503009833df3e90ff865b.svg',
      onClick: () => {
        console.log('点击了木耳Tab');
        // 这里可以添加自定义逻辑，比如埋点统计
      }
    },
    {
      id: 'planning',
      label: '规划',
      icon: 'http://localhost:3845/assets/6d6957ffd032839ea23e7633c7ea3adc82e45fda.svg',
      activeIcon: 'http://localhost:3845/assets/9e0a3136d850c583ecb76a91901dfd4030f9aae8.svg',
      onClick: () => {
        console.log('点击了规划Tab');
      }
    },
    {
      id: 'profile',
      label: '我',
      icon: 'http://localhost:3845/assets/7e47138769a852429f1b33004acf69e645f812fd.svg',
      activeIcon: 'http://localhost:3845/assets/c24ace24146616da32501ebed8bf4d1b6106fa66.svg',
      onClick: () => {
        console.log('点击了个人中心Tab');
      }
    }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    
    // 模拟路由跳转
    console.log(`切换到 ${tabId} 页面`);
    
    // 可以在这里添加更多逻辑：
    // - 更新URL
    // - 发送埋点数据
    // - 清理页面状态
    // - 预加载数据等
  };

  // 根据当前Tab渲染对应页面内容
  const renderPageContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'planning':
        return <PlanningPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="tab-example-container">
      {/* 页面头部 */}
      <header className="page-header">
        <h1>底部Tab栏完整示例</h1>
        <p>当前活跃页面: <span className="active-tab-indicator">{activeTab}</span></p>
      </header>

      {/* 主要内容区域 */}
      <main className="main-content">
        {renderPageContent()}
      </main>

      {/* 底部Tab栏 - 固定在底部 */}
      <footer className="bottom-navigation">
        <BottomTabBar
          tabs={customTabs}
          activeTabId={activeTab}
          onTabChange={handleTabChange}
          className="custom-tab-bar"
        />
      </footer>
    </div>
  );
};

export default TabExample;
