import React from 'react';
import AppBar from '../components/AppBar/AppBar';
import { MeetingInfo } from '../components';
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
        <MeetingInfo
          time="7月30日 21:00 - 次日 01:00"
          status="进行中"
          title="国际制品展会参展讨论"
        />
      </div>
    </div>
  );
};

export default HomePage;
