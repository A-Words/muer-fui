import React from 'react';
import './BottomTabBar.css';
import { Icon } from './Icon';

// Tab item 接口
export interface TabItem {
  id: string;
  label: string;
  icon: string;
  activeIcon?: string;
  isActive?: boolean;
  onClick?: () => void;
}

// 组件Props接口
export interface BottomTabBarProps {
  tabs?: TabItem[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

// 默认Tab数据
const defaultTabs: TabItem[] = [
  {
    id: 'home',
    label: '木耳',
    icon: 'muerAI',
    activeIcon: 'muerAIFillColor',
    isActive: true
  },
  {
    id: 'planning',  
    label: '规划',
    icon: 'plan',
    activeIcon: 'planFillColor'
  },
  {
    id: 'profile',
    label: '我',
    icon: 'me',
    activeIcon: 'meFillColor'
  }
];

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  tabs = defaultTabs,
  activeTabId,
  onTabChange,
  className = ''
}) => {
  const handleTabClick = (tab: TabItem) => {
    if (tab.onClick) {
      tab.onClick();
    }
    if (onTabChange) {
      onTabChange(tab.id);
    }
  };

  return (
    <div className={`bottom-tab-bar ${className}`}>
      <div className="tab-container">
        {tabs.map((tab) => {
          const isActive = activeTabId ? tab.id === activeTabId : tab.isActive;
          
          return (
            <div
              key={tab.id}
              className={`tab-item ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              <div className="icon-container">
                <div className="icon-state-layer">
                  <div className="icon-wrapper">
                    <Icon
                      name={isActive && tab.activeIcon ? tab.activeIcon : tab.icon}                      className="tab-icon"
                    />
                  </div>
                </div>
              </div>
              <div className="tab-label">
                {tab.label}
              </div>
            </div>
          );
        })}
      </div>
      <div className="tab-border" />
      <p className="version-info">此版本为演示用途构建，不代表最终品质。</p>
    </div>
  );
};

export default BottomTabBar;
