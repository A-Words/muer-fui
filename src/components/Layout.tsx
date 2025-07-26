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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // 简化的键盘检测 - 只监听输入框焦点
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') {
        setIsKeyboardVisible(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') {
        setIsKeyboardVisible(false);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // 根据当前路径设置活跃Tab
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/home' || path === '/chat') {
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
      icon: 'muerAI',
      activeIcon: 'muerAIFillColor',
    },
    {
      id: 'planning',
      label: '规划',
      icon: 'plan',
      activeIcon: 'planFillColor',
    },
    {
      id: 'profile',
      label: '我',
      icon: 'me',
      activeIcon: 'meFillColor',
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
    <div className={`app-layout ${isKeyboardVisible ? 'keyboard-visible' : ''}`}>
      {/* 主要内容区域 */}
      <main className="main-content">
        {children}
      </main>

      {/* 底部Tab栏 - 键盘弹起时隐藏 */}
      {!isKeyboardVisible && (
        <footer className="bottom-navigation">
          <BottomTabBar
            tabs={tabs}
            activeTabId={activeTab}
            onTabChange={handleTabChange}
          />
        </footer>
      )}
    </div>
  );
};

export default Layout;
