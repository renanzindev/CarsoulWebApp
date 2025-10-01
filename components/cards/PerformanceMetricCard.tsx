import React from 'react';
import { Image, Text, View } from 'react-native';

interface PerformanceMetricCardProps {
  icon: string;
  value: string;
  label: string;
  iconClass?: string;
}

export const PerformanceMetricCard: React.FC<PerformanceMetricCardProps> = ({ 
  icon, 
  value, 
  label, 
  iconClass 
}) => {
  const isLogisticaReversa = label === 'Logística Reversa';
  const isFechamentoOS = label === 'Fechamento de OS';
  const isFechamentoOSApp = label === 'Fechamento de OS via app';
  const isPerdaMaterial = label === 'Perda de material';
  
  return (
    <View className="bg-white rounded-xl p-5 mb-2.5 items-center border border-gray-200 shadow-sm">
      {isLogisticaReversa ? (
        <>
          <Image 
            source={require('../../assets/images/iconelogisticareversa.png')} 
            className="w-8 h-8 mb-2"
            style={{ resizeMode: 'contain' }}
          />
          <Text className="text-2xl font-bold text-red-400 mb-2">63%</Text>
          <Text className="text-base font-semibold text-gray-800 mb-2.5 text-center">{label}</Text>
        </>
      ) : isFechamentoOS ? (
        <>
          <Image 
            source={require('../../assets/images/iconefechamentoOS.png')} 
            className="w-8 h-8 mb-2"
            style={{ resizeMode: 'contain' }}
          />
          <Text className="text-2xl font-bold text-yellow-500 mb-2">{value}</Text>
          <Text className="text-base font-semibold text-gray-800 mb-2.5 text-center">{label}</Text>
        </>
      ) : isFechamentoOSApp ? (
        <>
          <Image 
            source={require('../../assets/images/iconefechamentoOS.png')} 
            className="w-8 h-8 mb-2"
            style={{ resizeMode: 'contain' }}
          />
          <Text className="text-2xl font-bold text-yellow-500 mb-2">{value}</Text>
          <Text className="text-base font-semibold text-gray-800 mb-2.5 text-center">{label}</Text>
        </>
      ) : isPerdaMaterial ? (
        <>
          <Image 
            source={require('../../assets/images/iconePerdaMaterial.png')} 
            className="w-8 h-8 mb-2"
            style={{ resizeMode: 'contain' }}
          />
          <Text className="text-2xl font-bold text-lime-500 mb-2">{value}</Text>
          <Text className="text-base font-semibold text-gray-800 mb-2.5 text-center">{label}</Text>
        </>
      ) : (
        <>
          <Text className="text-base font-semibold text-gray-800 mb-2.5 text-center">{label}</Text>
          <Text className="text-2xl mb-2">{icon}</Text>
          <Text className="text-2xl font-bold text-gray-800">{value}</Text>
        </>
      )}
    </View>
  );
};