import './AppBar.css';

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

export default function AppBar({ 
  title = "Muer AI", 
  avatarUrl,
  onMenuClick,
  onAvatarClick 
}: AppBarProps) {
  return (
    <div className="app-bar">
      <div className="app-bar-left">
        <MenuButton onClick={onMenuClick} />
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
