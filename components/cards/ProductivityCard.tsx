import React from 'react';
import { Text, View } from 'react-native';

interface ProductivityCardProps {
  percentage: number;
  target?: number;
}

export const ProductivityCard: React.FC<ProductivityCardProps> = ({ 
  percentage, 
  target = 90 
}) => {
  return (
    <View className="bg-white rounded-xl p-4 shadow-sm items-center border border-gray-200 flex-1 h-28">
      <Text className="text-base font-semibold text-gray-800 mb-1 text-center">Produtividade</Text>
      <Text className="text-3xl font-bold text-lime-500 mb-1">{percentage}%</Text>
      <Text className="text-xs text-gray-600">Meta: {target}%</Text>
    </View>
  );
};