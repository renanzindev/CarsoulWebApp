import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Sidebar } from './Sidebar';

interface DashboardHeaderProps {
  vectorSrc?: string;
  logoSrc?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  vectorSrc,
  logoSrc
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };



  return (
    <View className="fixed top-0 left-0 right-0 z-50 bg-slate-800 shadow-lg">
      {/* Header Superior */}
      <View className="flex-row items-center justify-between px-3 pt-14 pb-3">
        
        {/* Logo no canto esquerdo */}
        <Image source={require('../assets/images/logo-carsoul1.png')} className="ml-4 w-24 h-10" resizeMode="contain" />
        
        {/* Ícone da sidebar no canto direito */}
        <TouchableOpacity onPress={toggleSidebar} className="p-4 rounded-lg bg-slate-800 mr-4">
          <Text className="text-white text-xl font-bold">☰</Text>
        </TouchableOpacity>
      </View>
      
      <Sidebar isVisible={isSidebarOpen} onClose={closeSidebar} />
    </View>
  );
};

// Estilos agora são gerenciados pelo Tailwind CSS