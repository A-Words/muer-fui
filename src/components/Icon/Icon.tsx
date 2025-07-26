import React from 'react';
import './Icon.css';
import { getIcon } from './iconRegistry';

export interface IconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  size,
  color,
  className = '',
  onClick
}) => {
  // 从注册表获取图标组件
  const IconComponent = getIcon(name);

  const iconStyle: React.CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    color: color,
    fill: color || 'currentColor',
  };

  return (
    <div 
      className={`icon ${className}`} 
      style={iconStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <IconComponent />
    </div>
  );
};

export default Icon;
