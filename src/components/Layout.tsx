import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomTabBar, { type TabItem } from './BottomTabBar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');

  // 根据当前路径设置活跃Tab
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/home') {
      setActiveTab('home');
    } else if (path === '/planning') {
      setActiveTab('planning');
    } else if (path === '/profile') {
      setActiveTab('profile');
    }
  }, [location.pathname]);

  // Tab配置
  const tabs: TabItem[] = [
    {
      id: 'home',
      label: '木耳',
      icon: 'http://localhost:3845/assets/1a949683763fd8e99ca45bf0ac462d3999058379.svg',
      activeIcon: 'http://localhost:3845/assets/e118bb228f70efa30cc503009833df3e90ff865b.svg',
    },
    {
      id: 'planning',
      label: '规划',
      icon: 'http://localhost:3845/assets/6d6957ffd032839ea23e7633c7ea3adc82e45fda.svg',
      activeIcon: 'http://localhost:3845/assets/9e0a3136d850c583ecb76a91901dfd4030f9aae8.svg',
    },
    {
      id: 'profile',
      label: '我',
      icon: 'http://localhost:3845/assets/7e47138769a852429f1b33004acf69e645f812fd.svg',
      activeIcon: 'http://localhost:3845/assets/c24ace24146616da32501ebed8bf4d1b6106fa66.svg',
    }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    
    // 路由跳转
    switch (tabId) {
      case 'home':
        navigate('/');
        break;
      case 'planning':
        navigate('/planning');
        break;
      case 'profile':
        navigate('/profile');
        break;
    }
  };

  return (
    <div className="app-layout">
      {/* 主要内容区域 */}
      <main className="main-content">
        {children}
      </main>

      {/* 底部Tab栏 */}
      <footer className="bottom-navigation">
        <BottomTabBar
          tabs={tabs}
          activeTabId={activeTab}
          onTabChange={handleTabChange}
        />
      </footer>
    </div>
  );
};

export default Layout;
