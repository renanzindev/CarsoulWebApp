import React from 'react';
import { Text, View } from 'react-native';

interface MetricCardProps {
  icon: string;
  iconClass: string;
  value: string;
  label: string;
  cardClass?: string;
  index?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  iconClass,
  value,
  label,
  cardClass,
  index = 0
}) => {
  const getCardClasses = () => {
    const baseClasses = "bg-white rounded-xl p-4 flex-col items-center justify-center";
    const minHeight = "min-h-[120px]";
    
    switch (index) {
      case 0:
        return `${baseClasses} ${minHeight} bg-green-50 border-green-200`;
      case 1:
        return `${baseClasses} ${minHeight} bg-green-50 border-green-300`;
      case 2:
        return `${baseClasses} ${minHeight} bg-gray-50 border-gray-200`;
      default:
        return `${baseClasses} ${minHeight} border-gray-200`;
    }
  };

  const getIconClasses = () => {
    const baseClasses = "w-10 h-10 rounded-full text-center mb-3 text-lg flex items-center justify-center";
    
    switch (iconClass) {
      case 'icon-logistics':
        return `${baseClasses} bg-green-600 text-white`;
      case 'icon-mobile-app':
        return `${baseClasses} bg-green-600 text-white`;
      case 'icon-material-loss':
        return `${baseClasses} bg-gray-500 text-white`;
      default:
        return baseClasses;
    }
  };

  return (
    <View className={getCardClasses()}>
      <View className={getIconClasses()}>
        <Text className="text-white text-lg">{icon}</Text>
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-1.5">{value}</Text>
      <Text className="text-xs text-gray-500 font-medium text-center">{label}</Text>
    </View>
  );
};