import React from 'react';

interface QuickAccessCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconClass: string;
  notificationCount?: number;
}

interface QuickAccessCardsProps {
  cards?: QuickAccessCard[];
}

export const QuickAccessCards: React.FC<QuickAccessCardsProps> = ({
  cards = [
    {
      id: 'pcp',
      title: 'PCP',
      subtitle: 'Acessar',
      icon: '📋',
      iconClass: 'icon-pcp',
      notificationCount: 5
    },
    {
      id: 'profile',
      title: 'Perfil',
      subtitle: 'Acessar',
      icon: '👤',
      iconClass: 'icon-profile',
      notificationCount: 1
    },
    {
      id: 'reports',
      title: 'Relatórios',
      subtitle: 'Acessar',
      icon: '📊',
      iconClass: 'icon-reports',
      notificationCount: 1
    },
    {
      id: 'more',
      title: 'Mais',
      subtitle: 'Opções',
      icon: '⚙️',
      iconClass: 'icon-more'
    }
  ]
}) => {
  return (
    `
    <!-- Quick Access Cards -->
    <div class="quick-access">
        <div class="cards-grid">
            ${cards.map(card => `
                <div class="access-card">
                    ${card.notificationCount ? `<div class="notification-badge">${card.notificationCount}</div>` : ''}
                    <div class="icon ${card.iconClass}">${card.icon}</div>
                    <h4>${card.title}</h4>
                    <p>${card.subtitle}</p>
                </div>
            `).join('')}
        </div>
    </div>
    `
  );
};

export const getQuickAccessStyles = () => {
  return `
    /* Quick Access Cards */
    .quick-access {
        margin: 20px 0;
    }
    
    .quick-access h3 {
        margin-bottom: 15px;
        font-size: 18px;
    }
    
    .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .access-card {
        background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        transition: transform 0.2s;
        position: relative;
    }
    
    .access-card:hover {
        transform: translateY(-2px);
    }
    
    .access-card .icon {
        width: 40px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 8px;
        margin: 0 auto 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }
    
    .access-card h4 {
        font-size: 14px;
        margin-bottom: 5px;
    }
    
    .access-card p {
        font-size: 12px;
        color: #FFFFFF;
    }
    
    .notification-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ff4757;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
    }
  `;
};