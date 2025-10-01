import React from 'react';
import { Image, Text, View } from 'react-native';

interface IndividualReturnCardProps {
  percentage: number;
}

export const IndividualReturnCard: React.FC<IndividualReturnCardProps> = ({ percentage }) => {
  return (
    <View 
      className="p-4 shadow-lg items-center justify-center border border-gray-300"
      style={{ backgroundColor: '#80808F', borderRadius: 12, height: 110 }}
    >
      <Text className="text-sm font-semibold text-gray-800 mb-2 text-center">Retorno</Text>
      <Image 
        source={require('../../assets/images/iconreturn.png')} 
        className="w-7 h-7 mb-2"
        style={{ resizeMode: 'contain' }}
      />
      <Text className="text-2xl font-bold text-yellow-500">{percentage}%</Text>
    </View>
  );
};