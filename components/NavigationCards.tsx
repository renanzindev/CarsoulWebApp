import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface NavigationCardsProps {
  className?: string;
}

export const NavigationCards: React.FC<NavigationCardsProps> = ({ className = '' }) => {
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

  const getCardColors = (tabName: string) => {
    const isActive = activeTab === tabName;
    
    switch (tabName) {
      case 'FECHAR OS':
        return {
          background: isActive ? '#5E5E5E' : '#5E5E5E',
          text: isActive ? 'text-white' : 'text-white',
          border: 'border-transparent',
          iconTint: isActive ? '#ffffff' : '#ffffff',
        };
      case 'HOME':
        return {
          background: isActive ? 'bg-white' : 'bg-white',
          text: isActive ? 'text-white' : 'text-green-500',
          border: 'border-transparent',
          iconTint: isActive ? '#ffffff' : '#10b981',
        };
      case 'PCP':
        return {
          background: isActive ? '#1E1E2D' : '#1E1E2D',
          text: isActive ? 'text-white' : 'text-white',
          border: 'border-transparent',
          iconTint: isActive ? '#ffffff' : '#ffffff',
        };
      default:
        return {
          background: 'bg-white',
          text: 'text-gray-500',
          border: 'border-gray-200',
          iconTint: '#6b7280',
        };
    }
  };

  const renderIcon = (tabName: string) => {
    const iconSource = getTabIcon(tabName);
    const colors = getCardColors(tabName);
    
    if (typeof iconSource === 'string') {
      // Para emojis (HOME)
      return (
        <Text 
          className="text-2xl mb-2"
          style={{ color: colors.iconTint }}
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
            width: 32,
            height: 32,
            tintColor: colors.iconTint,
            marginBottom: 8,
          }}
          resizeMode="contain"
        />
      );
    }
  };

  const navigationItems = [
    { name: 'FECHAR OS', label: 'Fechar OS' },
    { name: 'HOME', label: 'Home' },
    { name: 'PCP', label: 'PCP' },
  ];

  return (
    <View className={`px-4 py-6 ${className}`}>
      <View className="flex-row justify-between space-x-3">
        {navigationItems.map((item) => {
          const colors = getCardColors(item.name);
          
          return (
            <TouchableOpacity
              key={item.name}
              className={`flex-1 ${item.name === 'HOME' ? '' : `${colors.background.startsWith('#') ? '' : colors.background} ${colors.border} border-2`} rounded-xl overflow-hidden min-h-[100px] active:scale-95`}
              onPress={() => navigateToPage(item.name)}
              activeOpacity={0.8}
              style={{
                backgroundColor: item.name === 'HOME' ? 'transparent' : (colors.background.startsWith('#') ? colors.background : undefined),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              {/* Imagem de fundo apenas para o card HOME */}
              {item.name === 'HOME' && (
                <Image
                  source={require('../assets/images/backCardFooter.png')}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="cover"
                />
              )}
              
              {/* Conteúdo do card (ícone e texto) */}
              <View className="flex-1 p-4 items-center justify-center">
                {renderIcon(item.name)}
                <Text 
                  className={`${colors.text} font-semibold text-sm text-center`}
                  numberOfLines={2}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default NavigationCards;