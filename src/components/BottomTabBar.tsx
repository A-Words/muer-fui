import React from 'react';
import './BottomTabBar.css';

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
    icon: 'http://localhost:3845/assets/1a949683763fd8e99ca45bf0ac462d3999058379.svg',
    activeIcon: 'http://localhost:3845/assets/e118bb228f70efa30cc503009833df3e90ff865b.svg',
    isActive: true
  },
  {
    id: 'planning',  
    label: '规划',
    icon: 'http://localhost:3845/assets/6d6957ffd032839ea23e7633c7ea3adc82e45fda.svg',
    activeIcon: 'http://localhost:3845/assets/9e0a3136d850c583ecb76a91901dfd4030f9aae8.svg'
  },
  {
    id: 'profile',
    label: '我',
    icon: 'http://localhost:3845/assets/7e47138769a852429f1b33004acf69e645f812fd.svg',
    activeIcon: 'http://localhost:3845/assets/c24ace24146616da32501ebed8bf4d1b6106fa66.svg'
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
                    <img
                      src={isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
                      alt={`${tab.label} 图标`}
                      className="tab-icon"
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
    </div>
  );
};

export default BottomTabBar;
