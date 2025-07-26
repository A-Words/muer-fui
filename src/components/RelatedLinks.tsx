import React from 'react';
import './RelatedLinks.css';

// 图片资源常量
const linkIcon = "http://localhost:3845/assets/33eec501a92dea9f26869ecf0940ced48fbd2fe6.svg";
const dividerIcon = "http://localhost:3845/assets/dc0646cf93617253d51c19f3cc619470a10aa64d.svg";

// 链接数据接口
export interface LinkInfo {
  id: string;
  name: string;
  url: string;
  icon: string;
  onClick?: () => void;
}

export interface RelatedLinksProps {
  title?: string;
  links?: LinkInfo[];
  className?: string;
  onLinkClick?: (link: LinkInfo) => void;
}

const RelatedLinks: React.FC<RelatedLinksProps> = ({
  title = "相关链接",
  links = [
    {
      id: '1',
      name: 'United Portal',
      url: 'adventure-x.org',
      icon: 'http://localhost:3845/assets/f552894ad3e3f2980f528fdc9adf97c9c0fc6a9b.png'
    },
    {
      id: '2',
      name: '飞书',
      url: 'feishu.cn',
      icon: 'http://localhost:3845/assets/168bcb13087a8786a3c85194f8488032551897ac.png'
    }
  ],
  className = "",
  onLinkClick
}) => {
  const handleLinkClick = (link: LinkInfo) => {
    if (link.onClick) {
      link.onClick();
    } else if (onLinkClick) {
      onLinkClick(link);
    } else {
      // 默认行为：在新窗口打开链接
      const fullUrl = link.url.startsWith('http') ? link.url : `https://${link.url}`;
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`related-links ${className}`}>
      {/* 标题区域 */}
      <div className="links-title">
        <div className="title-icon">
          <div className="icon-wrapper">
            <img src={linkIcon} alt="链接图标" className="link-title-icon" />
          </div>
        </div>
        <div className="title-text">
          <p>{title}</p>
        </div>
      </div>

      {/* 链接列表 */}
      <div className="links-container">
        {links.map((link, index) => (
          <React.Fragment key={link.id}>
            <div 
              className="link-item"
              onClick={() => handleLinkClick(link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleLinkClick(link);
                }
              }}
              aria-label={`打开 ${link.name} - ${link.url}`}
            >
              <div className="link-icon-container">
                <img 
                  src={link.icon} 
                  alt={`${link.name}图标`} 
                  className="link-icon"
                />
              </div>
              <div className="link-info">
                <div className="link-name">
                  <p>{link.name}</p>
                </div>
                <div className="link-url">
                  <p>{link.url}</p>
                </div>
              </div>
            </div>
            {/* 分隔线（最后一个项目不显示） */}
            {index < links.length - 1 && (
              <div className="divider">
                <img src={dividerIcon} alt="分隔线" className="divider-line" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RelatedLinks;
