import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const FOOTER_HEIGHT = 80; // Altura da sidebar do footer

interface SlidingSidebarProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export const SlidingSidebar: React.FC<SlidingSidebarProps> = ({ 
  children, 
  defaultOpen = false 
}) => {
  const [activeTab, setActiveTab] = useState<string>('HOME');
  
  const router = useRouter();

  const navigateToPage = (page: string) => {
    setActiveTab(page);
    switch (page) {
      case 'FECHAR OS':
        router.push('/(tabs)/os');
        break;
      case 'HOME':
        router.push('/(tabs)');
        break;
      case 'PCP':
        router.push('/(tabs)/pcp');
        break;
      default:
        break;
    }
  };

  const getTabIcon = (tabName: string) => {
    switch (tabName) {
      case 'FECHAR OS':
        return require('../assets/images/iconFecharOS.png');
      case 'HOME':
        return '🏠';
      case 'PCP':
        return require('../assets/images/iconpcp.png');
      default:
        return '📱';
    }
  };

  const getTabColor = (tabName: string) => {
    switch (tabName) {
      case 'FECHAR OS':
        return activeTab === tabName ? '#ef4444' : '#6b7280';
      case 'HOME':
        return activeTab === tabName ? '#10b981' : '#6b7280';
      case 'PCP':
        return activeTab === tabName ? '#3b82f6' : '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getTabBackgroundColor = (tabName: string) => {
    switch (tabName) {
      case 'FECHAR OS':
        return '#5E5E5E';
      case 'HOME':
        return '#f0fdf4';
      case 'PCP':
        return '#1E1E2D';
      default:
        return '#f3f4f6';
    }
  };

  const renderIcon = (tabName: string) => {
    const iconSource = getTabIcon(tabName);
    
    if (typeof iconSource === 'string') {
      // Para emojis (HOME)
      return (
        <Text 
          className="text-xl"
          style={{ color: getTabColor(tabName) }}
        >
          {iconSource}
        </Text>
      );
    } else {
      // Para imagens PNG (FECHAR OS e PCP)
      return (
        <Image
          source={iconSource}
          style={{
            width: 24,
            height: 24,
            tintColor: getTabColor(tabName),
          }}
          resizeMode="contain"
        />
      );
    }
  };

  return (
    <View className="flex-1">
      {/* Main Content Area */}
      <View 
        className="flex-1 bg-slate-50"
        style={{ paddingBottom: FOOTER_HEIGHT }}
      >
        {children}
      </View>

      {/* Footer Sidebar */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200"
        style={{ 
          height: FOOTER_HEIGHT,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        <LinearGradient
          colors={['#ffffff', '#f8fafc']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          className="flex-1"
        >
          <View className="flex-1 flex-row justify-around items-center px-4">
            {/* FECHAR OS Tab */}
            <TouchableOpacity
              className="flex-1 items-center justify-center py-2"
              onPress={() => navigateToPage('FECHAR OS')}
              activeOpacity={0.7}
            >
              <View 
                className="w-12 h-12 rounded-full justify-center items-center mb-1"
                style={{
                  backgroundColor: getTabBackgroundColor('FECHAR OS'),
                }}
              >
                {renderIcon('FECHAR OS')}
              </View>
              <Text 
                className={`text-xs font-medium ${
                  activeTab === 'FECHAR OS' ? 'text-red-600' : 'text-gray-500'
                }`}
                style={{ color: getTabColor('FECHAR OS') }}
              >
                FECHAR OS
              </Text>
            </TouchableOpacity>

            {/* HOME Tab */}
            <TouchableOpacity
              className="flex-1 items-center justify-center py-2"
              onPress={() => navigateToPage('HOME')}
              activeOpacity={0.7}
            >
              <View 
                className="w-12 h-12 rounded-full justify-center items-center mb-1"
                style={{
                  backgroundColor: getTabBackgroundColor('HOME'),
                }}
              >
                {renderIcon('HOME')}
              </View>
              <Text 
                className={`text-xs font-medium ${
                  activeTab === 'HOME' ? 'text-green-600' : 'text-gray-500'
                }`}
                style={{ color: getTabColor('HOME') }}
              >
                HOME
              </Text>
            </TouchableOpacity>

            {/* PCP Tab */}
            <TouchableOpacity
              className="flex-1 items-center justify-center py-2"
              onPress={() => navigateToPage('PCP')}
              activeOpacity={0.7}
            >
              <View 
                className="w-12 h-12 rounded-full justify-center items-center mb-1"
                style={{
                  backgroundColor: getTabBackgroundColor('PCP'),
                }}
              >
                {renderIcon('PCP')}
              </View>
              <Text 
                className={`text-xs font-medium ${
                  activeTab === 'PCP' ? 'text-blue-600' : 'text-gray-500'
                }`}
                style={{ color: getTabColor('PCP') }}
              >
                PCP
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};