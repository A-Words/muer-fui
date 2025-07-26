import React from 'react';
import AppBar from '../components/AppBar/AppBar';
import './PlanningPage.css';

const PlanningPage: React.FC = () => {
  return (
    <div className="planning-page">
      <AppBar 
        title="规划" 
        onMenuClick={() => console.log('菜单点击')}
        onAvatarClick={() => console.log('头像点击')}
      />
      <div className="planning-page-content">
        {/* 规划页面内容 */}
      </div>
    </div>
  );
};

export default PlanningPage;
