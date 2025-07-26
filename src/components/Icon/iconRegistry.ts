import React from 'react';

// 预加载所有图标
import DefaultIcon from '../../assets/icons/default.svg?react';
import MeIcon from '../../assets/icons/me.svg?react';
import MeFillColorIcon from '../../assets/icons/meFillColor.svg?react';
import MuerAIIcon from '../../assets/icons/muerAI.svg?react';
import MuerAIFillColorIcon from '../../assets/icons/muerAIFillColor.svg?react';
import PlanIcon from '../../assets/icons/plan.svg?react';
import PlanFillColorIcon from '../../assets/icons/planFillColor.svg?react';

// 图标映射表类型
export type IconName = 
  | 'default'
  | 'me'
  | 'meFillColor'
  | 'muerAI'
  | 'muerAIFillColor'
  | 'plan'
  | 'planFillColor';

// 图标映射表
export const iconMap: Record<IconName, React.ComponentType> = {
  'default': DefaultIcon,
  'me': MeIcon,
  'meFillColor': MeFillColorIcon,
  'muerAI': MuerAIIcon,
  'muerAIFillColor': MuerAIFillColorIcon,
  'plan': PlanIcon,
  'planFillColor': PlanFillColorIcon,
};

// 获取图标组件的函数
export const getIcon = (name: string): React.ComponentType => {
  return iconMap[name as IconName] || iconMap['default'];
};

// 检查图标是否存在
export const hasIcon = (name: string): boolean => {
  return name in iconMap;
};

// 获取所有可用的图标名称
export const getAvailableIcons = (): IconName[] => {
  return Object.keys(iconMap) as IconName[];
};
