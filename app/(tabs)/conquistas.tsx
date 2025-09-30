import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SwipeBackWrapper } from '@/components/SwipeBackWrapper';
import { SlidingSidebar } from '@/components/SlidingSidebar';

/**
 * Tela de Conquistas
 * Página placeholder para exibir conquistas do usuário
 */
export default function ConquistasScreen() {
  return (
    <SlidingSidebar>
      <SwipeBackWrapper>
      <ScrollView className="flex-1 bg-gray-100">
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">🎯 Conquistas</Text>
          <Text className="text-gray-600">Suas conquistas e marcos alcançados</Text>
        </View>

        {/* Placeholder Content */}
        <View className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <View className="items-center">
            <Text className="text-6xl mb-4">🚧</Text>
            <Text className="text-xl font-semibold text-gray-800 mb-2">Em Desenvolvimento</Text>
            <Text className="text-gray-600 text-center">
              Esta página está sendo desenvolvida e em breve estará disponível com suas conquistas e estatísticas.
            </Text>
          </View>
        </View>

        {/* Future Features Preview */}
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Recursos Futuros:</Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">🏆</Text>
              <Text className="text-gray-700">Troféus e medalhas</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">📊</Text>
              <Text className="text-gray-700">Estatísticas de desempenho</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">🎯</Text>
              <Text className="text-gray-700">Metas e objetivos</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">⭐</Text>
              <Text className="text-gray-700">Sistema de pontuação</Text>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
      </SwipeBackWrapper>
    </SlidingSidebar>
  );
}