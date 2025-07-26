import React from 'react';
import AppBar from '../components/AppBar/AppBar';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <AppBar 
        title="木耳 AI" 
        onMenuClick={() => console.log('菜单点击')}
        onAvatarClick={() => console.log('头像点击')}
      />
      <div className="home-page-content">
        {/* 木耳主页内容 */}
      </div>
    </div>
  );
};

export default HomePage;
