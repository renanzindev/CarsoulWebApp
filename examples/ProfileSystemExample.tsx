import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useProfileManager, useUser, useMedals, useUserStats } from '../hooks/useUserProfileHooks';

/**
 * Exemplo completo de uso do sistema de perfil via JSON
 * Demonstra todas as funcionalidades implementadas
 */
export const ProfileSystemExample: React.FC = () => {
  const profileManager = useProfileManager();
  const { user, updateUserName, updateUserRole } = useUser();
  const { medals, activeMedals, createMedal, earnMedal, revokeMedal } = useMedals();
  const { stats, addExperience, incrementProjects } = useUserStats();

  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [newMedalTitle, setNewMedalTitle] = useState('');
  const [newMedalEmoji, setNewMedalEmoji] = useState('');

  if (profileManager.isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-600">Carregando perfil...</Text>
      </View>
    );
  }

  const handleUpdateUserName = async () => {
    if (newUserName.trim()) {
      try {
        await updateUserName(newUserName.trim());
        setNewUserName('');
        Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
      } catch (error) {
        Alert.alert('Erro', 'Falha ao atualizar nome');
      }
    }
  };

  const handleUpdateUserRole = async () => {
    if (newUserRole.trim()) {
      try {
        await updateUserRole(newUserRole.trim());
        setNewUserRole('');
        Alert.alert('Sucesso', 'Cargo atualizado com sucesso!');
      } catch (error) {
        Alert.alert('Erro', 'Falha ao atualizar cargo');
      }
    }
  };

  const handleCreateMedal = async () => {
    if (newMedalTitle.trim() && newMedalEmoji.trim()) {
      try {
        await createMedal(newMedalEmoji.trim(), newMedalTitle.trim(), `Medalha criada: ${newMedalTitle}`);
        setNewMedalTitle('');
        setNewMedalEmoji('');
        Alert.alert('Sucesso', 'Medalha criada com sucesso!');
      } catch (error) {
        Alert.alert('Erro', 'Falha ao criar medalha');
      }
    }
  };

  const handleAddExperience = async () => {
    try {
      await addExperience(100);
      Alert.alert('Sucesso', '+100 XP adicionados!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao adicionar experiência');
    }
  };

  const handleIncrementProjects = async () => {
    try {
      await incrementProjects(1);
      Alert.alert('Sucesso', 'Projeto concluído adicionado!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao incrementar projetos');
    }
  };

  const handleResetProfile = async () => {
    Alert.alert(
      'Confirmar Reset',
      'Tem certeza que deseja resetar o perfil para os dados padrão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetar',
          style: 'destructive',
          onPress: async () => {
            try {
              await profileManager.resetToDefault();
              Alert.alert('Sucesso', 'Perfil resetado com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Falha ao resetar perfil');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        {/* Header */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Sistema de Perfil via JSON
          </Text>
          <Text className="text-gray-600">
            Demonstração completa das funcionalidades implementadas
          </Text>
        </View>

        {/* Informações do Usuário */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            👤 Informações do Usuário
          </Text>
          
          {user && (
            <View className="mb-4">
              <Text className="text-gray-700">Nome: <Text className="font-semibold">{user.userName}</Text></Text>
              <Text className="text-gray-700">Cargo: <Text className="font-semibold">{user.userRole}</Text></Text>
              <Text className="text-gray-700">Email: <Text className="font-semibold">{user.email}</Text></Text>
              <Text className="text-gray-700">Departamento: <Text className="font-semibold">{user.department}</Text></Text>
            </View>
          )}

          {/* Atualizar Nome */}
          <View className="mb-3">
            <Text className="text-sm font-medium text-gray-700 mb-1">Novo Nome:</Text>
            <View className="flex-row">
              <TextInput
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 bg-white"
                value={newUserName}
                onChangeText={setNewUserName}
                placeholder="Digite o novo nome"
              />
              <TouchableOpacity
                className="bg-blue-500 px-4 py-2 rounded-r-lg"
                onPress={handleUpdateUserName}
              >
                <Text className="text-white font-medium">Atualizar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Atualizar Cargo */}
          <View className="mb-3">
            <Text className="text-sm font-medium text-gray-700 mb-1">Novo Cargo:</Text>
            <View className="flex-row">
              <TextInput
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 bg-white"
                value={newUserRole}
                onChangeText={setNewUserRole}
                placeholder="Digite o novo cargo"
              />
              <TouchableOpacity
                className="bg-blue-500 px-4 py-2 rounded-r-lg"
                onPress={handleUpdateUserRole}
              >
                <Text className="text-white font-medium">Atualizar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Estatísticas */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            📊 Estatísticas
          </Text>
          
          {stats && (
            <View className="mb-4">
              <Text className="text-gray-700">Nível: <Text className="font-semibold">{stats.currentLevel}</Text></Text>
              <Text className="text-gray-700">XP: <Text className="font-semibold">{stats.experiencePoints}</Text></Text>
              <Text className="text-gray-700">Próximo Nível: <Text className="font-semibold">{stats.nextLevelPoints} XP</Text></Text>
              <Text className="text-gray-700">Projetos: <Text className="font-semibold">{stats.completedProjects}</Text></Text>
              <Text className="text-gray-700">Medalhas Ativas: <Text className="font-semibold">{stats.activeMedals}</Text></Text>
            </View>
          )}

          <View className="flex-row space-x-2">
            <TouchableOpacity
              className="flex-1 bg-green-500 px-4 py-2 rounded-lg mr-2"
              onPress={handleAddExperience}
            >
              <Text className="text-white font-medium text-center">+100 XP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-purple-500 px-4 py-2 rounded-lg"
              onPress={handleIncrementProjects}
            >
              <Text className="text-white font-medium text-center">+1 Projeto</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Medalhas */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            🏆 Medalhas ({activeMedals.length}/{medals.length})
          </Text>

          {/* Lista de Medalhas */}
          <View className="mb-4">
            {medals.map((medal) => (
              <View key={medal.id} className="flex-row items-center justify-between py-2 border-b border-gray-200">
                <View className="flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">{medal.emoji}</Text>
                  <View className="flex-1">
                    <Text className={`font-medium ${medal.active ? 'text-gray-800' : 'text-gray-400'}`}>
                      {medal.title}
                    </Text>
                    <Text className="text-xs text-gray-500">{medal.description}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  className={`px-3 py-1 rounded ${medal.active ? 'bg-red-100' : 'bg-green-100'}`}
                  onPress={() => medal.active ? revokeMedal(medal.id) : earnMedal(medal.id)}
                >
                  <Text className={`text-xs font-medium ${medal.active ? 'text-red-600' : 'text-green-600'}`}>
                    {medal.active ? 'Revogar' : 'Conquistar'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Criar Nova Medalha */}
          <View className="border-t border-gray-200 pt-3">
            <Text className="text-sm font-medium text-gray-700 mb-2">Criar Nova Medalha:</Text>
            <View className="flex-row mb-2">
              <TextInput
                className="w-16 border border-gray-300 rounded-l-lg px-3 py-2 bg-white text-center"
                value={newMedalEmoji}
                onChangeText={setNewMedalEmoji}
                placeholder="🎯"
                maxLength={2}
              />
              <TextInput
                className="flex-1 border-t border-b border-gray-300 px-3 py-2 bg-white"
                value={newMedalTitle}
                onChangeText={setNewMedalTitle}
                placeholder="Título da medalha"
              />
              <TouchableOpacity
                className="bg-yellow-500 px-4 py-2 rounded-r-lg"
                onPress={handleCreateMedal}
              >
                <Text className="text-white font-medium">Criar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Resumo do Perfil */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            📋 Resumo do Perfil
          </Text>
          
          {profileManager.profileData && (
            <View className="bg-gray-50 rounded-lg p-3">
              <Text className="text-xs text-gray-600 font-mono">
                {JSON.stringify(profileManager.getProfileSummary(), null, 2)}
              </Text>
            </View>
          )}
        </View>

        {/* Ações do Sistema */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            ⚙️ Ações do Sistema
          </Text>
          
          <View className="space-y-2">
            <TouchableOpacity
              className="bg-blue-500 px-4 py-3 rounded-lg mb-2"
              onPress={() => profileManager.refreshProfile()}
            >
              <Text className="text-white font-medium text-center">🔄 Recarregar Perfil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-red-500 px-4 py-3 rounded-lg"
              onPress={handleResetProfile}
            >
              <Text className="text-white font-medium text-center">🔄 Resetar para Padrão</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Status da Implementação */}
        <View className="bg-green-50 border border-green-200 rounded-lg p-4">
          <Text className="text-lg font-semibold text-green-800 mb-2">
            ✅ Sistema Implementado com Sucesso!
          </Text>
          <Text className="text-green-700 text-sm">
            • Dados do perfil agora são gerenciados via JSON{'\n'}
            • Contexto UserProfile implementado{'\n'}
            • Hooks personalizados criados{'\n'}
            • Main.tsx atualizado para usar dados dinâmicos{'\n'}
            • Sistema de persistência com AsyncStorage{'\n'}
            • Melhor escalabilidade e manutenção
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSystemExample;