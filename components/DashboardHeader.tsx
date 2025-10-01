import React from 'react';
import { Image, View } from 'react-native';

interface DashboardHeaderProps {
  vectorSrc?: string;
  logoSrc?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  vectorSrc,
  logoSrc
}) => {
  return (
    <View className="absolute top-0 left-0 right-0 z-[9999] bg-slate-800 shadow-lg h-16 items-center justify-center">
      {/* Header Inferior */}
      <View className="flex items-center justify-center px-4 pt-4 pb-2">
        
        {/* Logo alinhado à esquerda */}
        <Image source={require('../assets/images/logo-carsoul1.png')} className="ml-4 w-32 h-12 object-contain" resizeMode="contain" /> 
        
      </View>
    </View>
  );
};

// Estilos agora são gerenciados pelo Tailwind CSS