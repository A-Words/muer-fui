import React from 'react';
import './NavigationBar.css';

/**
 * 导航项接口
 */
export interface NavItem {
  /** 项目ID */
  id: string;
  /** 显示标签 */
  label: string;
  /** 图标URL */
  iconUrl?: string;
  /** 选中状态图标URL */
  activeIconUrl?: string;
  /** 是否为当前选中项 */
  active?: boolean;
  /** 点击回调 */
  onClick?: () => void;
}

/**
 * 导航栏Props接口
 */
export interface NavigationBarProps {
  /** 导航项列表 */
  items: NavItem[];
  /** 自定义类名 */
  className?: string;
}

/**
 * 导航栏组件
 * 底部导航栏，支持多个导航项
 */
const NavigationBar: React.FC<NavigationBarProps> = ({
  items,
  className = ''
}) => {
  return (
    <div className={`navigation-bar ${className}`}>
      <div className="navigation-bar__container">
        {items.map((item) => (
          <div key={item.id} className="navigation-bar__item-wrapper">
            <button
              className={`navigation-bar__item ${item.active ? 'navigation-bar__item--active' : ''}`}
              onClick={item.onClick}
              type="button"
              aria-label={item.label}
            >
              <div className="navigation-bar__icon-container">
                <div className="navigation-bar__state-layer">
                  {item.active && item.activeIconUrl && (
                    <div className="navigation-bar__icon navigation-bar__icon--hidden">
                      <img src={item.activeIconUrl} alt="" />
                    </div>
                  )}
                  <div className="navigation-bar__icon">
                    <img 
                      src={item.active && item.activeIconUrl ? item.activeIconUrl : item.iconUrl} 
                      alt="" 
                    />
                  </div>
                </div>
              </div>
              <div className="navigation-bar__label">
                {item.label}
              </div>
            </button>
          </div>
        ))}
      </div>
      
      {/* 边框线 */}
      <div className="navigation-bar__border" />
      
      {/* 底部手势条 */}
      <div className="navigation-bar__handle-area">
        <div className="navigation-bar__handle" />
      </div>
    </div>
  );
};

export default NavigationBar;
