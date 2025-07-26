import React from 'react';
import './PersonCard.css';

export interface PersonCardProps {
  name: string;
  avatarUrl?: string;
  size?: 'small' | 'medium' | 'large';
}

const PersonCard: React.FC<PersonCardProps> = ({ 
  name, 
  avatarUrl, 
  size = 'medium' 
}) => {
  return (
    <div className={`person-card person-card--${size}`}>
      <div className="person-card__content">
        <div className="person-card__avatar">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={`${name}的头像`} 
              className="person-card__avatar-image" 
            />
          ) : (
            <div className="person-card__avatar-placeholder" />
          )}
        </div>
        <div className="person-card__info">
          <p className="person-card__name">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
