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
      id: 'contacts',
      title: 'Contatos Úteis',
      subtitle: 'Acessar',
      icon: '📞',
      iconClass: 'icon-contacts'
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
    }
  ]
}) => {
  return (
    `
    <!-- Quick Access Cards Carousel -->
    <div class="quick-access">
        <div class="cards-carousel">
            ${cards.map(card => `
                <div class="access-card" onclick="navigateToCard('${card.id}')">
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

export const getQuickAccessScript = () => {
  return `
    function navigateToCard(cardId) {
      switch(cardId) {
        case 'contacts':
          // Navegar para a tela de contatos
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'navigate',
              route: '/contacts'
            }));
          } else {
            // Fallback para web
            window.location.href = '/contacts';
          }
          break;
        case 'pcp':
          console.log('Navegando para PCP');
          break;
        case 'profile':
          console.log('Navegando para Perfil');
          break;
        case 'reports':
          console.log('Navegando para Relatórios');
          break;
        default:
          console.log('Card não implementado:', cardId);
      }
    }


  `;
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
    
    .cards-carousel {
        display: flex;
        gap: 15px;
        overflow-x: auto;
        scroll-behavior: smooth;
        padding: 10px 0;
        margin-bottom: 20px;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
    }
    
    .cards-carousel::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
    }
    
    .access-card {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border: 1px solid #dee2e6;
        border-radius: 12px;
        padding: 15px;
        text-align: center;
        cursor: pointer;
        transition: transform 0.2s;
        position: relative;
        color: #333333;
        min-width: 140px;
        flex-shrink: 0;
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
        color: #6c757d;
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