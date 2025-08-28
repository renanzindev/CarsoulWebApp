import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface MetricData {
  icon: string;
  value: string;
  label: string;
  iconClass?: string;
}

interface CombinedMetricsCardProps {
  metrics: MetricData[];
  onMetricPress?: (label: string) => void;
}

export const CombinedMetricsCard: React.FC<CombinedMetricsCardProps> = ({ metrics, onMetricPress }) => {
  const renderMetric = (metric: MetricData, index: number) => {
    const isLogisticaReversa = metric.label === 'Logística Reversa';
    const isFechamentoOSApp = metric.label === 'Fechamento de OS via app';
    const isPerdaMaterial = metric.label === 'Perda de material';
    
    const handlePress = () => {
      if (onMetricPress) {
        onMetricPress(metric.label);
      }
    };
    
    return (
      <TouchableOpacity key={index} className="items-center flex-1" onPress={handlePress} activeOpacity={0.7}>
        {isLogisticaReversa ? (
          <>
            <Image 
              source={require('../../assets/images/iconelogisticareversa.png')} 
              className="w-7 h-7 mb-1.5"
              style={{ resizeMode: 'contain' }}
            />
            <Text className="text-lg font-bold mb-1" style={{ color: 'rgba(220, 103, 103, 1)' }}>63%</Text>
            <Text className="text-xs font-medium text-gray-600 text-center leading-3.5">{metric.label}</Text>
          </>
        ) : isFechamentoOSApp ? (
          <>
            <Image 
              source={require('../../assets/images/iconefechamentoOS.png')} 
              className="w-7 h-7 mb-1.5"
              style={{ resizeMode: 'contain' }}
            />
            <Text className="text-lg font-bold mb-1" style={{ color: 'rgba(233, 187, 25, 1)' }}>{metric.value}</Text>
            <Text className="text-xs font-medium text-gray-600 text-center leading-3.5">{metric.label}</Text>
          </>
        ) : isPerdaMaterial ? (
          <>
            <Image 
              source={require('../../assets/images/iconePerdaMaterial.png')} 
              className="w-7 h-7 mb-1.5"
              style={{ resizeMode: 'contain' }}
            />
            <Text className="text-lg font-bold mb-1" style={{ color: 'rgba(166, 206, 56, 1)' }}>{metric.value}</Text>
            <Text className="text-xs font-medium text-gray-600 text-center leading-3.5">{metric.label}</Text>
          </>
        ) : (
          <>
            <Text className="text-xl mb-1.5">{metric.icon}</Text>
            <Text className="text-lg font-bold text-slate-700 mb-1">{metric.value}</Text>
            <Text className="text-xs font-medium text-gray-600 text-center leading-3.5">{metric.label}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="bg-white rounded-xl p-2.5 mb-0 shadow-lg border border-gray-300 flex-row justify-around items-center">
      {metrics.map((metric, index) => renderMetric(metric, index))}
    </View>
  );
};