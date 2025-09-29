import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    onClose();
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair do aplicativo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              console.log('Usuário fez logout');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
              Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
            }
          },
        },
      ]
    );
  };

  const navigateToPage = (page: string) => {
    onClose();
    switch (page) {
      case 'dashboard':
        router.push('/(tabs)');
        break;
      case 'contacts':
        router.push('/(tabs)/contacts');
        break;

      case 'conquistas':
        router.push('/(tabs)/conquistas');
        break;
      case 'os':
        router.push('/(tabs)/os');
        break;
      case 'pcp':
        router.push('/(tabs)/pcp');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: '⚡', color: '#0a7ea4' },
    { id: 'contacts', title: 'Contatos Úteis', icon: '👥', color: '#059669' },
    { id: 'conquistas', title: 'Conquistas', icon: '🎯', color: '#dc2626' },
    { id: 'os', title: 'Fechamento de OS', icon: '📝', color: '#7c3aed' },
    { id: 'pcp', title: 'PCP', icon: '📈', color: '#ea580c' },
    { id: 'logout', title: 'Sair', icon: '🔓', color: '#6b7280' },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 flex-row">
        {/* Área da tela principal visível - 20% */}
        <TouchableOpacity 
          className="flex-1 bg-black/20" 
          onPress={onClose}
          activeOpacity={1}
        />
        
        {/* Sidebar - 80% da largura */}
        <View 
           className="bg-slate-900 shadow-2xl" 
           style={{width: '80%', height: '100%', shadowColor: '#000', shadowOffset: {width: -5, height: 0}, shadowOpacity: 0.3, shadowRadius: 15}}
         >
          {/* Header com gradiente */}
          <LinearGradient
            colors={['#0a7ea4', '#0891b2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            className="pt-20 pb-8 px-6"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4">
                <Text className="text-2xl">⚡</Text>
              </View>
              <View>
                <Text className="text-white text-xl font-bold">Menu</Text>
                <Text className="text-white/80 text-sm">Navegação do App</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Menu Items */}
          <View className="flex-1 pt-4">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                className="flex-row items-center mx-4 mb-2 p-4 rounded-2xl bg-slate-800/60 active:bg-slate-700"
                onPress={() => navigateToPage(item.id)}
                style={{
                  shadowColor: item.color,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 2
                }}
              >
                <View 
                  className="w-10 h-10 rounded-xl items-center justify-center mr-4"
                  style={{backgroundColor: `${item.color}25`}}
                >
                  <Text className="text-lg">{item.icon}</Text>
                </View>
                <Text className="text-white text-base font-semibold flex-1">{item.title}</Text>
                <Text className="text-slate-400 text-lg">›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View className="p-6 border-t border-slate-700">
            <Text className="text-slate-400 text-xs text-center">Versão 1.0.0</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Estilos agora são gerenciados pelo Tailwind CSS