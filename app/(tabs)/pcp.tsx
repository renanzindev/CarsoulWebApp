import React from 'react';
import { View, Text, ScrollView } from 'react-native';

/**
 * Tela de PCP (Planejamento e Controle da Produção)
 * Página placeholder para funcionalidades de PCP
 */
export default function PCPScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">📈 PCP</Text>
          <Text className="text-gray-600">Planejamento e Controle da Produção</Text>
        </View>

        {/* Placeholder Content */}
        <View className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <View className="items-center">
            <Text className="text-6xl mb-4">🚧</Text>
            <Text className="text-xl font-semibold text-gray-800 mb-2">Em Desenvolvimento</Text>
            <Text className="text-gray-600 text-center">
              Esta página está sendo desenvolvida e em breve estará disponível com ferramentas de PCP.
            </Text>
          </View>
        </View>

        {/* Future Features Preview */}
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Recursos Futuros:</Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">📅</Text>
              <Text className="text-gray-700">Planejamento de produção</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">📊</Text>
              <Text className="text-gray-700">Controle de qualidade</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">⏱️</Text>
              <Text className="text-gray-700">Cronogramas e prazos</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">📦</Text>
              <Text className="text-gray-700">Gestão de estoque</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">📈</Text>
              <Text className="text-gray-700">Relatórios de produtividade</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}