
export const getIconStyles = () => {
  return `
    /* 
     * Icon Classes for Easy Customization
     * Para alterar um ícone específico, modifique apenas a classe correspondente:
     * - .icon-productivity: Ícone do gráfico de produtividade
     * - .icon-return: Ícone de retorno
     * - .icon-logistics: Ícone de logística reversa
     * - .icon-mobile-app: Ícone do app mobile
     * - .icon-material-loss: Ícone de perda de material
     * - .icon-pcp: Ícone do PCP
     * - .icon-profile: Ícone do perfil
     * - .icon-reports: Ícone de relatórios
     * - .icon-more: Ícone de mais opções
     * - .icon-notification: Ícone de notificações
     */
    .icon-productivity {
        font-size: 24px;
        opacity: 0.8;
    }
    
    .icon-return {
        font-size: 32px;
        margin-bottom: 10px;
        color: #FFFFFF;
    }
    
    .icon-logistics {
        font-size: 20px;
        color: #000000;
    }
    
    .icon-mobile-app {
        font-size: 20px;
        color: #66BB6A;
    }
    
    .icon-material-loss {
        font-size: 20px;
        color: #FF7043;
    }
    
    .icon-pcp {
        font-size: 24px;
        color: #FFFFFF;
    }
    
    .icon-profile {
        font-size: 24px;
        color: #AB47BC;
    }
    
    .icon-reports {
        font-size: 24px;
        color: #26A69A;
    }
    
    .icon-more {
        font-size: 24px;
        color: #78909C;
    }
    
    .icon-notification {
        font-size: 20px;
        color: #66BB6A;
    }
    
    .icon-success {
        font-size: 20px;
        color: #4CAF50;
    }
    
    .icon-warning {
        font-size: 20px;
        color: #FF9800;
    }
    
    .icon-info {
        font-size: 20px;
        color: #2196F3;
    }
  `;
};

export const getBaseStyles = () => {
  return `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #ffffff 100%, #ffffff 100%);
        color: #FFFFFF;
        min-height: 100vh;
        overflow-x: hidden;
    }
    
    .container {
        max-width: 100%;
        padding: 0 16px;
    }
  `;
};

export const getResponsiveStyles = () => {
  return `
    @media (max-width: 768px) {
        .performance-layout {
            grid-template-columns: 1fr;
            gap: 15px;
        }
        
        .main-productivity-card {
            padding: 20px;
        }
        
        .productivity-visual {
            flex-direction: column;
            gap: 15px;
        }
        
        .chart-area {
            height: 40px;
        }
        
        .big-number {
            font-size: 28px;
        }
        
        .return-metric-card {
            padding: 15px;
        }
        
        .return-number {
            font-size: 24px;
        }
        
        .other-metrics {
            grid-template-columns: 1fr;
            gap: 10px;
        }
        
        .cards-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .nav-links {
            display: none;
        }
        
        .header {
            padding-left: 12px;
            padding-right: 12px;
        }
        
        .container {
            padding: 0 12px;
        }
    }
  `;
};