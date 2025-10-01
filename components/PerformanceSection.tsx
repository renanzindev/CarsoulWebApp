import React from 'react';
import { Text, View } from 'react-native';
import { CombinedMetricsCard } from './cards/CombinedMetricsCard';
import { IndividualReturnCard } from './cards/IndividualReturnCard';
import { ProductivityCard } from './cards/ProductivityCard';

interface MetricCardData {
  icon: string;
  iconClass: string;
  value: string;
  label: string;
}

interface PerformanceSectionProps {
  productivityPercentage?: number;
  returnPercentage?: number;
  metrics?: MetricCardData[];
  onMetricPress?: (label: string) => void;
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({
  productivityPercentage = 89,
  returnPercentage = 5,
  metrics = [
    {
      icon: '↻',
      iconClass: 'icon-logistics',
      value: '63%',
      label: 'Logística Reversa'
    },
    {
      icon: '✓',
      iconClass: 'icon-mobile-app',
      value: '89%',
      label: 'Fechamento de OS via app'
    },
    {
      icon: '⬢',
      iconClass: 'icon-material-loss',
      value: '11',
      label: 'Perda de Material'
    }
  ],
  onMetricPress
}) => {
  const handleMetricPress = (label: string) => {
    if (onMetricPress) {
      onMetricPress(label);
    } else {
      // Navegação padrão baseada no label
      console.log(`Navegando para: ${label}`);
      // Aqui você pode adicionar navegação específica para cada card
      switch(label) {
        case 'Logística Reversa':
          console.log('Navegando para página de Logística Reversa');
          break;
        case 'Fechamento de OS via app':
          console.log('Navegando para página de Fechamento de OS');
          break;
        case 'Perda de material':
          console.log('Navegando para página de Perda de Material');
          break;
        default:
          console.log('Card não implementado:', label);
      }
    }
  };
  return (
    <View className="px-4">
      <Text className="text-base font-bold text-gray-800 mb-2.5 text-center mt-2.5">
        Acompanhe aqui sua performance
      </Text>
      
      <View className="flex-row gap-2.5 mb-4">
        <View style={{ width: '75%' }}>
          <ProductivityCard percentage={productivityPercentage} />
        </View>
        
        <View style={{ width: '23%' }}>
          <IndividualReturnCard percentage={returnPercentage} />
        </View>
      </View>
      
      <CombinedMetricsCard metrics={metrics} onMetricPress={handleMetricPress} />
    </View>
  );
};