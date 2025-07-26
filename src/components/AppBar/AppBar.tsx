import { useLocation, useNavigate } from 'react-router';
import './AppBar.css';
import { useEffect, useMemo } from 'react';
import backIcon from '../../assets/icons/arrowLeft.svg';
interface AppBarProps {
  title?: string;
  avatarUrl?: string;
  onMenuClick?: () => void;
  onAvatarClick?: () => void;
}

function Avatar({ avatarUrl, onClick }: { avatarUrl?: string; onClick?: () => void }) {
  return (
    <div 
      className="app-bar-avatar"
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="用户头像" className="app-bar-avatar-image" />
      ) : (
        <div className="app-bar-avatar-placeholder" />
      )}
    </div>
  );
}

function MenuButton({ onClick }: { onClick?: () => void }) {
  return (
    <button 
      className="app-bar-menu-button"
      onClick={onClick}
      aria-label="菜单"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path 
          d="M2.25 4.5h13.5M2.25 9h13.5M2.25 13.5h13.5" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <button className="app-bar-back-button" onClick={onClick} aria-label="返回" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: '6px', background: 'transparent', color: '#1d1b20', cursor: 'pointer', transition: 'all 0.2s ease' }}>
      <img src={backIcon} alt="返回" className="app-bar-back-button-icon" />
    </button> 
  )
}

export default function AppBar({ 
  title = "Muer AI", 
  avatarUrl,
  onMenuClick,
  onAvatarClick 
}: AppBarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-bar">
      <div className="app-bar-left">
        { location.pathname !== '/' ? <BackButton onClick={() => navigate('/', { replace: true })} /> : <div style={{ width: '22px', height: '22px' }} /> }
      </div>
      
      <div className="app-bar-center">
        <h1 className="app-bar-title">{title}</h1>
      </div>
      
      <div className="app-bar-right">
        <Avatar avatarUrl={avatarUrl} onClick={onAvatarClick} />
      </div>
    </div>
  );
}

export type { AppBarProps };
