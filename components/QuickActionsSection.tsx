import React from 'react';

interface QuickAction {
  id: string;
  icon: string;
  title: string;
}

interface QuickActionsSectionProps {
  actions?: QuickAction[];
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  actions = [
    {
      id: 'close-os',
      icon: '✅',
      title: 'Fechar OS'
    }
  ]
}) => {
  return (
    `
    <!-- Quick Actions -->
    <div class="quick-actions">
        <h3>Ações Rápidas</h3>
        <div class="actions-grid">
            ${actions.map(action => `
                <div class="action-card">
                    <div class="icon">${action.icon}</div>
                    <h4>${action.title}</h4>
                </div>
            `).join('')}
        </div>
    </div>
    `
  );
};

export const getQuickActionsStyles = () => {
  return `
    /* Quick Actions */
    .quick-actions {
        margin: 20px 0;
    }
    
    .quick-actions h3 {
        margin-bottom: 15px;
        font-size: 18px;
    }
    
    .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 15px;
    }
    
    .action-card {
        background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        transition: transform 0.2s;
        color: #1a1a2e;
    }
    
    .action-card:hover {
        transform: translateY(-2px);
    }
    
    .action-card .icon {
        font-size: 24px;
        margin-bottom: 10px;
    }
    
    .action-card h4 {
        font-size: 14px;
        font-weight: bold;
    }
  `;
};