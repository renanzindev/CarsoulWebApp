import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useUserProfile } from '../contexts/UserProfileContext';
import { useAuth } from '../contexts/AuthContext';
import { ProfileCardUtils } from './ProfileCard';

interface ProfileScreenProps {
  onClose?: () => void;
}

interface EditableField {
  key: string;
  label: string;
  value: string;
  type: 'text' | 'email' | 'phone';
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onClose }) => {
  const { profileData, updateProfile } = useUserProfile();
  const { logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState<EditableField | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

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

  const handleEditField = (field: EditableField) => {
    setCurrentField(field);
    setTempValue(field.value);
    setEditModalVisible(true);
  };

  const handleSaveField = async () => {
    if (!currentField) return;
    
    setIsLoading(true);
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar o perfil
      const updatedUser = {
        ...profileData?.user,
        [currentField.key]: tempValue
      };
      
      updateProfile({ user: updatedUser });
      
      Alert.alert('Sucesso', 'Informação atualizada com sucesso!');
      setEditModalVisible(false);
      setCurrentField(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a informação.');
    } finally {
      setIsLoading(false);
    }
  };

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
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-slate-700 pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={handleBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Meu Perfil</Text>
          <TouchableOpacity 
            onPress={() => setIsEditing(!isEditing)}
            className="p-2"
          >
            <Ionicons 
              name={isEditing ? "checkmark" : "pencil"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </View>

        {/* Avatar e Info Principal */}
        <View className="items-center">
          <View className="w-20 h-20 bg-lime-500 rounded-full justify-center items-center mb-3">
            <Text className="text-white text-2xl font-bold">
              {ProfileCardUtils.generateInitials(profileData?.user?.userName || '')}
            </Text>
          </View>
          <Text className="text-white text-xl font-bold">{profileData?.user?.userName || ''}</Text>
          <Text className="text-gray-300 text-sm">{profileData?.user?.userRole || ''}</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Medalhas */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <Text className="text-gray-800 text-lg font-bold mb-3">Conquistas</Text>
          <View className="flex-row flex-wrap justify-center">
            {profileMedals.map((medal, index) => (
              <View key={index} className="items-center m-2">
                <View 
                  className={`w-12 h-12 rounded-full justify-center items-center ${
                    medal.active ? 'bg-lime-500' : 'bg-gray-300'
                  }`}
                >
                  <Text className="text-2xl">{medal.emoji}</Text>
                </View>
                <Text className="text-xs text-gray-600 mt-1 text-center max-w-[60px]">
                  {medal.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Estatísticas */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <Text className="text-gray-800 text-lg font-bold mb-3">Estatísticas</Text>
          <View className="flex-row flex-wrap">
            {achievements.map((achievement, index) => (
              <View key={index} className="w-1/2 p-2">
                <View className="bg-gray-50 rounded-lg p-3 items-center">
                  <Text className="text-2xl mb-1">{achievement.icon}</Text>
                  <Text className="text-lg font-bold text-gray-800">{achievement.value}</Text>
                  <Text className="text-xs text-gray-600 text-center">{achievement.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Informações Pessoais */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <Text className="text-gray-800 text-lg font-bold mb-3">Informações Pessoais</Text>
          {userInfo.map((info, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => isEditing ? handleEditField(info) : null}
              className={`flex-row items-center justify-between py-3 ${
                index < userInfo.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <View className="flex-1">
                <Text className="text-gray-600 text-sm">{info.label}</Text>
                <Text className="text-gray-800 text-base">{info.value}</Text>
              </View>
              {isEditing && (
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Configurações */}
        <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          <Text className="text-gray-800 text-lg font-bold mb-3">Configurações</Text>
          
          <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex-1">
              <Text className="text-gray-800 text-base">Notificações</Text>
              <Text className="text-gray-600 text-sm">Receber notificações push</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E5E7EB', true: '#84CC16' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View className="flex-row items-center justify-between py-3">
            <View className="flex-1">
              <Text className="text-gray-800 text-base">Modo Escuro</Text>
              <Text className="text-gray-600 text-sm">Tema escuro da aplicação</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#E5E7EB', true: '#84CC16' }}
              thumbColor={darkModeEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Ações */}
        <View className="mx-4 mt-4 mb-8">
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 rounded-xl p-4 items-center"
          >
            <Text className="text-white text-base font-bold">Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de Edição */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold">Editar {currentField?.label}</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <TextInput
              value={tempValue}
              onChangeText={setTempValue}
              placeholder={`Digite ${currentField?.label.toLowerCase()}`}
              className="border border-gray-300 rounded-lg p-3 mb-4 text-base"
              keyboardType={
                currentField?.type === 'email' ? 'email-address' :
                currentField?.type === 'phone' ? 'phone-pad' : 'default'
              }
              autoCapitalize={currentField?.type === 'email' ? 'none' : 'words'}
            />

            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                className="flex-1 bg-gray-200 rounded-lg p-3 items-center"
              >
                <Text className="text-gray-700 font-bold">Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleSaveField}
                disabled={isLoading}
                className="flex-1 bg-lime-500 rounded-lg p-3 items-center"
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold">Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;