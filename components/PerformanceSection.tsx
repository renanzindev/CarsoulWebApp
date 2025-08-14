import React from 'react';

interface MetricCard {
  icon: string;
  iconClass: string;
  value: string;
  label: string;
}

interface PerformanceSectionProps {
  productivityPercentage?: number;
  returnPercentage?: number;
  metrics?: MetricCard[];
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({
  productivityPercentage = 89,
  returnPercentage = 5,
  metrics = [
    {
      icon: '🔄',
      iconClass: 'icon-logistics',
      value: '63%',
      label: 'Logística Reversa'
    },
    {
      icon: '📱',
      iconClass: 'icon-mobile-app',
      value: '89%',
      label: 'Fechamento de OS via app'
    },
    {
      icon: '⚠️',
      iconClass: 'icon-material-loss',
      value: '11',
      label: 'Perda de Material'
    }
  ]
}) => {
  return (
    `
    <!-- Performance Section -->
    <div class="performance">
        <h3>Acompanhe aqui sua performance</h3>
        <div class="performance-layout">
            <!-- Main Productivity Chart -->
            <div class="main-productivity-card">
                <div class="productivity-header">
                     <h4>Produtividade</h4>
                     <div class="chart-icon icon-productivity">📊</div>
                 </div>
                <div class="productivity-visual">
                    <div class="chart-area">
                        <div class="chart-fill" style="width: ${productivityPercentage}%;"></div>
                        <div class="chart-points">
                            <span class="point" style="left: ${productivityPercentage - 3}%;">${productivityPercentage - 3}%</span>
                            <span class="point" style="left: ${productivityPercentage - 1}%;">${productivityPercentage - 1}%</span>
                            <span class="point active" style="left: ${productivityPercentage}%;">${productivityPercentage}%</span>
                        </div>
                    </div>
                    <div class="productivity-percentage">
                        <span class="big-number">${productivityPercentage}%</span>
                    </div>
                </div>
            </div>
            
            <!-- Return Metric -->
            <div class="return-metric-card">
                <div class="return-visual">
                     <div class="return-icon icon-return">📈</div>
                    <div class="return-percentage">
                        <span class="return-number">${returnPercentage}%</span>
                        <span class="return-label">Retorno</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Other Metrics -->
        <div class="other-metrics">
             ${metrics.map(metric => `
                 <div class="metric-card">
                     <div class="icon ${metric.iconClass}">${metric.icon}</div>
                     <div class="metric-value">${metric.value}</div>
                     <div class="metric-label">${metric.label}</div>
                 </div>
             `).join('')}
         </div>
    </div>
    `
  );
};

export const getPerformanceStyles = () => {
  return `
    /* Performance Section */
    .performance {
        margin: 30px 0;
    }
    
    .performance h3 {
        margin-bottom: 20px;
        font-size: 18px;
    }
    
    .performance-layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
    }
    
    .main-productivity-card {
        background: linear-gradient(135deg, #8BC34A 0%, #689F38 100%);
        padding: 25px;
        border-radius: 16px;
        color: white;
        position: relative;
        overflow: hidden;
    }
    
    .productivity-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .productivity-header h4 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
    }
    
    .chart-icon {
         font-size: 24px;
         opacity: 0.8;
     }
    
    .productivity-visual {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    
    .chart-area {
        flex: 1;
        position: relative;
        height: 60px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 30px;
        overflow: hidden;
    }
    
    .chart-fill {
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 30px;
        transition: width 0.8s ease;
    }
    
    .chart-points {
        position: absolute;
        top: -30px;
        left: 0;
        right: 0;
        height: 20px;
    }
    
    .point {
        position: absolute;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
        transform: translateX(-50%);
    }
    
    .point.active {
        color: white;
        font-weight: bold;
    }
    
    .productivity-percentage {
        text-align: center;
    }
    
    .big-number {
        font-size: 36px;
        font-weight: bold;
        display: block;
        line-height: 1;
    }
    
    .return-metric-card {
        background: #6C7B7F;
        padding: 20px;
        border-radius: 16px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .return-visual {
        text-align: center;
    }
    
    .return-icon {
         font-size: 32px;
         margin-bottom: 10px;
         color: #FFA726;
     }
    
    .return-number {
        font-size: 28px;
        font-weight: bold;
        display: block;
        color: #FFA726;
    }
    
    .return-label {
        font-size: 14px;
        opacity: 0.9;
        margin-top: 5px;
        display: block;
    }
    
    .other-metrics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
    
    .metric-card {
        background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
        border-radius: 12px;
        padding: 20px;
        text-align: center;
    }
    
    .metric-card .icon {
        width: 40px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 50%;
        margin: 0 auto 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    
    .metric-value {
        font-size: 24px;
        font-weight: bold;
        color: #FFFFFF;
        margin-bottom: 5px;
    }
    
    .metric-label {
        font-size: 12px;
        color: #FFFFFF;
    }
  `;
};