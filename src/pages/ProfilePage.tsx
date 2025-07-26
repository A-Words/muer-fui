import React from 'react';
import './ProfilePage.css';
import AppBar from '../components/AppBar/AppBar';
import PersonCard from '../components/PersonCard';
import MemoryCard from '../components/MemoryCard';
import ToolCard from '../components/ToolCard';

const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <AppBar 
        title="个人中心"
        onAvatarClick={() => {
          // 处理头像点击事件
          console.log('头像被点击');
        }}
      />
      <div className="profile-content">
        <PersonCard name="凯伦" />
        <MemoryCard 
          onActionClick={() => {
            console.log('点击了解所有记忆');
          }}
          onClick={() => {
            console.log('点击了记忆卡片');
          }}
        />
        <ToolCard 
          onActionClick={() => {
            console.log('点击了解所有工具');
          }}
          onClick={() => {
            console.log('点击了工具卡片');
          }}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
