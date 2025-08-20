import React from 'react';

interface Notification {
  id: string;
  icon: string;
  iconClass: string;
  message: string;
}

interface NotificationsSectionProps {
  notifications?: Notification[];
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications = [
    {
      id: 'attendance',
      icon: '✅',
      iconClass: 'icon-success',
      message: '0 faltas e 0 atestados este mês'
    },
    {
      id: 'payslip',
      icon: '📄',
      iconClass: 'icon-info',
      message: 'Holerite do mês de agosto disponível para download'
    }
  ]
}) => {
  return (
    `
    <!-- Notifications -->
    <div class="notifications">
        <h3>Notificações</h3>
        ${notifications.map(notification => `
            <div class="notification-item">
                <div class="icon ${notification.iconClass}">${notification.icon}</div>
                <span>${notification.message}</span>
            </div>
        `).join('')}
    </div>
    `
  );
};

export const getNotificationsStyles = () => {
  return `
    /* Notifications */
    .notifications {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border: 1px solid #dee2e6;
        border-radius: 12px;
        padding: 20px;
        margin: 20px 0;
        color: #333333;
    }
    
    .notifications h3 {
        margin-bottom: 15px;
        font-size: 16px;
    }
    
    .notification-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 14px;
    }
    
    .notification-item .icon {
        width: 20px;
        height: 20px;
        background: #00d4ff;
        border-radius: 50%;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
  `;
};