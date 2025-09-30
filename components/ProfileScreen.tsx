import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useUserProfile } from '../contexts/UserProfileContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { ProfileCardUtils } from './ProfileCard';

interface ProfileScreenProps {
  onClose?: () => void;
}



export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onClose }) => {
  const { profileData, updateProfile } = useUserProfile();
  const { logout } = useAuth();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const router = useRouter();

   
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Converter medalhas do JSON para o formato do ProfileCard
  const profileMedals = profileData?.profile?.medals?.map(medal =>
    ProfileCardUtils.createMedal(medal.emoji, medal.active, medal.title)
  ) || [];

  const userInfo = [
    { key: 'userName', label: 'Nome', value: profileData?.user?.userName || '', type: 'text' as const },
    { key: 'userRole', label: 'Cargo', value: profileData?.user?.userRole || '', type: 'text' as const },
    { key: 'email', label: 'Email', value: profileData?.user?.email || 'usuario@empresa.com', type: 'email' as const },
    { key: 'phone', label: 'Telefone', value: profileData?.user?.phone || '(11) 99999-9999', type: 'phone' as const },
    { key: 'department', label: 'Departamento', value: profileData?.user?.department || 'Tecnologia', type: 'text' as const },
    { key: 'location', label: 'Localização', value: profileData?.user?.location || 'São Paulo, SP', type: 'text' as const }
  ];

  const achievements = [
    { title: 'Projetos Concluídos', value: '24', icon: '📋' },
    { title: 'Horas Trabalhadas', value: '1,240', icon: '⏰' },
    { title: 'Avaliação Média', value: '4.8/5', icon: '⭐' },
    { title: 'Certificações', value: '8', icon: '🏆' }
  ];



  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair da sua conta?',
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
              router.replace('/login');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
            }
          },
        },
      ]
    );
  };



  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View className="pt-12 pb-6 px-4" style={{ backgroundColor: colors.header }}>
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={handleBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Avatar e Info Principal */}
        <View className="items-center">
          <View className="w-20 h-20 bg-lime-500 rounded-full justify-center items-center mb-3">
            <Text className="text-white text-2xl font-bold">
              {ProfileCardUtils.generateInitials(profileData?.user?.userName || '')}
            </Text>
          </View>
          <Text className="text-xl font-bold" style={{ color: colors.text }}>{profileData?.user?.userName || ''}</Text>
          <Text className="text-sm" style={{ color: colors.textSecondary }}>{profileData?.user?.userRole || ''}</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Medalhas */}
        <View className="mx-4 mt-4 rounded-xl p-4 shadow-sm" style={{ backgroundColor: colors.card }}>
          <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>Conquistas</Text>
          <View className="flex-row flex-wrap justify-center">
            {profileMedals.map((medal, index) => (
              <View key={index} className="items-center m-2">
                <View 
                  className="w-12 h-12 rounded-full justify-center items-center"
                  style={{ backgroundColor: medal.active ? colors.primary : colors.border }}
                >
                  <Text className="text-2xl">{medal.emoji}</Text>
                </View>
                <Text className="text-xs mt-1 text-center max-w-[60px]" style={{ color: colors.textSecondary }}>
                  {medal.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Estatísticas */}
        <View className="mx-4 mt-4 rounded-xl p-4 shadow-sm" style={{ backgroundColor: colors.card }}>
          <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>Estatísticas</Text>
          <View className="flex-row flex-wrap">
            {achievements.map((achievement, index) => (
              <View key={index} className="w-1/2 p-2">
                <View className="rounded-lg p-3 items-center" style={{ backgroundColor: colors.surface }}>
                  <Text className="text-2xl mb-1">{achievement.icon}</Text>
                  <Text className="text-lg font-bold" style={{ color: colors.text }}>{achievement.value}</Text>
                  <Text className="text-xs text-center" style={{ color: colors.textSecondary }}>{achievement.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Informações Pessoais */}
        <View className="mx-4 mt-4 rounded-xl p-4 shadow-sm" style={{ backgroundColor: colors.card }}>
          <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>Informações Pessoais</Text>
          {userInfo.map((info, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between py-3"
              style={{
                borderBottomWidth: index < userInfo.length - 1 ? 1 : 0,
                borderBottomColor: colors.border
              }}
            >
              <View className="flex-1">
                <Text className="text-sm" style={{ color: colors.textSecondary }}>{info.label}</Text>
                <Text className="text-base" style={{ color: colors.text }}>{info.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Configurações */}
        <View className="mx-4 mt-4 rounded-xl p-4 shadow-sm" style={{ backgroundColor: colors.card }}>
          <Text className="text-lg font-bold mb-3" style={{ color: colors.text }}>Configurações</Text>
          
          <View 
            className="flex-row items-center justify-between py-3"
            style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
          >
            <View className="flex-1">
              <Text className="text-base" style={{ color: colors.text }}>Notificações</Text>
              <Text className="text-sm" style={{ color: colors.textSecondary }}>Receber notificações push</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View className="flex-row items-center justify-between py-3">
            <View className="flex-1">
              <Text className="text-base" style={{ color: colors.text }}>Modo Escuro</Text>
              <Text className="text-sm" style={{ color: colors.textSecondary }}>Tema escuro da aplicação</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Ações */}
        <View className="mx-4 mt-4 mb-8">
          <TouchableOpacity
            onPress={handleLogout}
            className="rounded-xl p-4 items-center"
            style={{ backgroundColor: '#ef4444' }}
          >
            <Text className="text-white text-base font-bold">Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>


    </View>
  );
};

export default ProfileScreen;