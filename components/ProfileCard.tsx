import React from 'react';

interface ProfileCardProps {
  userName?: string;
  userRole?: string;
  userInitials?: string;
  medals?: Array<{ emoji: string; active: boolean }>;
  motivationText?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  userName = "Renan Oliveira",
  userRole = "Desenvolvedor",
  userInitials = "RO",
  medals = [
    { emoji: "🏆", active: true },
    { emoji: "🥇", active: true },
    { emoji: "🥈", active: false }
  ],
  motivationText = "Descubra o que falta para você atingir o próximo nível"
}) => {
  return (
    `
    <!-- Profile Card -->
    <div class="profile-card">
        <div class="profile-info">
            <div class="profile-avatar">${userInitials}</div>
            <div class="profile-details">
                <h3>${userName}</h3>
                <p>${userRole}</p>
            </div>
        </div>
        <div class="medals">
            ${medals.map(medal => 
              `<div class="medal ${medal.active ? 'active' : 'inactive'}">${medal.emoji}</div>`
            ).join('')}
        </div>
        <div class="motivation">
            ${motivationText}
        </div>
    </div>
    `
  );
};

export const getProfileCardStyles = () => {
  return `
    /* Profile Card */
    .profile-card {
        background: #181C32;
        border-radius: 12px;
        padding: 10px;
        margin: 20px 0;
    }
    
    .profile-info {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }
    
    .profile-avatar {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
    }
    
    .profile-details h3 {
        color: #ffffff;
        font-size: 12px;
        margin-bottom: 5px;
    }
    
    .profile-details p {
        color: #FFFFFF;
        font-size: 10px;
    }
    
    .medals {
        display: flex;
        gap: 5px;
        margin-bottom: 15px;
    }
    
    .medal {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }
    
    .medal.active {
        background: linear-gradient(135deg, #ffd700, #ffb347);
    }
    
    .medal.inactive {
        background: #4a5568;
        opacity: 0.5;
    }
    
    .motivation {
        color: #FFFFFF;
        font-size: 10px;
        font-style: italic;
    }
  `;
};