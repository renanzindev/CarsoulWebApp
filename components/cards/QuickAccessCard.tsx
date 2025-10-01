import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface QuickAccessCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconClass: string;
  notificationCount?: number;
  onClick?: (id: string) => void;
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  id,
  title,
  subtitle,
  icon,
  iconClass,
  notificationCount,
  onClick
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onClick) {
      onClick(id);
    }
    
    // Navegação com router do Expo
    switch(id) {
      case 'contacts':
        router.push('/contacts');
        break;
      case 'pcp':
        router.push('/pcp');
        break;
      case 'profile':
        router.push('/profile');
        break;
      case 'reports':
        console.log('Navegando para Relatórios');
        break;
      case 'reports2':
        console.log('Navegando para Relatórios 2');
        break;
      default:
        console.log('Card não implementado:', id);
    }
  };

  const getCardClasses = () => {
    const baseClasses = "bg-white rounded-2xl p-5 items-start shadow-lg border border-gray-200 h-28 justify-center flex-1";
    
    switch(id) {
      case 'pcp':
        return `${baseClasses.replace('bg-white', 'bg-gray-900')}`;
      case 'profile':
        return `${baseClasses.replace('bg-white', 'bg-lime-500')}`;
      case 'reports':
        return `${baseClasses.replace('bg-white', 'bg-gray-500')}`;
      case 'contacts':
        return `${baseClasses.replace('bg-white', 'bg-slate-700')}`;
      default:
        return baseClasses;
    }
  };

  const getTitleClasses = () => {
    const baseClasses = "text-xs font-bold mb-1 text-left";
    
    switch(id) {
      case 'pcp':
      case 'profile':
      case 'reports':
      case 'contacts':
        return `${baseClasses} text-white`;
      default:
        return `${baseClasses} text-gray-800`;
    }
  };

  const getSubtitleClasses = () => {
    const baseClasses = "text-sm text-left";
    
    switch(id) {
      case 'pcp':
        return `${baseClasses} text-gray-300`;
      case 'profile':
      case 'reports':
      case 'contacts':
        return `${baseClasses} text-white`;
      default:
        return `${baseClasses} text-gray-600`;
    }
  };

  return (
    <TouchableOpacity className={getCardClasses()} onPress={handlePress}>
      {notificationCount && notificationCount > 0 && (
        <View className="absolute top-2 right-2 bg-red-600 rounded-full min-w-5 h-5 justify-center items-center z-10">
          <Text className="text-white text-xs font-bold">{notificationCount}</Text>
        </View>
      )}
      <View className="mb-2 self-start">
        {id === 'pcp' ? (
          <Image 
            source={require('../../assets/images/iconpcp.png')} 
            className="w-9 h-9"
            style={{ resizeMode: 'contain' }}
          />
        ) : id === 'profile' ? (
          <Image 
            source={require('../../assets/images/iconeperfil.png')} 
            className="w-9 h-9"
            style={{ resizeMode: 'contain' }}
          />
        ) : id === 'reports' ? (
          <Image 
            source={require('../../assets/images/iconreturn.png')} 
            className="w-9 h-9"
            style={{ resizeMode: 'contain' }}
          />
        ) : id === 'contacts' ? (
          <Image 
            source={require('../../assets/images/iconeContatoUteisFooter.png')} 
            className="w-9 h-9"
            style={{ resizeMode: 'contain' }}
          />
        ) : (
          <Text className="text-2xl">{icon}</Text>
        )}
      </View>
      <Text className={getTitleClasses()}>{title}</Text>
      <Text className={getSubtitleClasses()}>{subtitle}</Text>
    </TouchableOpacity>
  );
};