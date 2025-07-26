import React from 'react';
import './Icon.css';

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
  // 动态导入SVG图标
  const IconComponent = React.lazy(() =>
    import(`../../assets/icons/${name}.svg?react`).catch(() =>
      // 如果图标不存在，返回一个默认的占位符
      import('../../assets/icons/default.svg?react')
    )
  );

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
      <React.Suspense fallback={<div className="icon-loading" />}>
        <IconComponent />
      </React.Suspense>
    </div>
  );
};

export default Icon;
