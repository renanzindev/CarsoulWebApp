import React from 'react';
import { View, Text } from 'react-native';

interface LaunchCardProps {
  identifier: string;
  chassi: string;
  location: string;
  product: string;
  date: string;
  time: string;
}

export const LaunchCard: React.FC<LaunchCardProps> = ({
  identifier,
  chassi,
  location,
  product,
  date,
  time
}) => {
  return (
    <View className="bg-gray-900 rounded-xl p-4 mb-3 flex-row items-center border border-gray-700">
      <View className="w-12 h-12 bg-purple-600 rounded-lg items-center justify-center mr-4">
        <Text className="text-white font-bold text-sm text-center">{identifier}</Text>
      </View>
      <View className="flex-1 flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-gray-400 text-xs mb-1">Chassi: {chassi}</Text>
          <Text className="text-white font-semibold text-sm mb-1">{location}</Text>
          <Text className="text-purple-600 text-sm font-medium">{product}</Text>
        </View>
        <View className="items-end">
          <Text className="text-white text-sm font-semibold mb-0.5">{date}</Text>
          <Text className="text-gray-400 text-xs">{time}</Text>
        </View>
      </View>
    </View>
  );
};