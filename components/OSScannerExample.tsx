import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OSClosureScreen } from './OSClosureScreen';
import OSIntegrationTest from './OSIntegrationTest';

export const OSScannerExample: React.FC = () => {
  const [showOSScreen, setShowOSScreen] = useState(false);
  const [showTestScreen, setShowTestScreen] = useState(false);

  const examples = [
    {
      id: '1',
      title: 'Tela de Fechamento de OS',
      description: 'Demonstra o uso completo do scanner integrado com busca de OS',
      icon: 'document-text',
      color: '#22c55e',
      action: () => setShowOSScreen(true)
    },
    {
      id: '2',
      title: 'Teste de Integração',
      description: 'Ferramenta para testar a integração do scanner com a API de OS',
      icon: 'flask',
      color: '#3b82f6',
      action: () => setShowTestScreen(true)
    }
  ];

  const features = [
    {
      icon: 'barcode',
      title: 'Scanner Integrado',
      description: 'Escaneamento de códigos de barras com busca automática de OS'
    },
    {
      icon: 'cloud',
      title: 'API Real',
      description: 'Integração com endpoints reais para busca de Ordens de Serviço'
    },
    {
      icon: 'checkmark-circle',
      title: 'Validação',
      description: 'Validação e tratamento de erros para códigos não encontrados'
    },
    {
      icon: 'time',
      title: 'Loading States',
      description: 'Indicadores visuais durante o processamento das requisições'
    }
  ];

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-100 p-3 rounded-full">
              <Ionicons name="scan" size={32} color="#3b82f6" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-bold text-gray-800">
                Scanner + OS Integration
              </Text>
              <Text className="text-gray-600 mt-1">
                Integração completa entre scanner e busca de OS
              </Text>
            </View>
          </View>

          <View className="bg-blue-50 p-4 rounded-lg">
            <Text className="text-blue-800 font-medium mb-2">
              ✅ Integração Implementada
            </Text>
            <Text className="text-blue-700 text-sm">
              O scanner agora está totalmente integrado com a API para buscar 
              Ordens de Serviço automaticamente quando um código é escaneado.
            </Text>
          </View>
        </View>

        {/* Features */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Funcionalidades Implementadas
          </Text>
          
          <View className="space-y-4">
            {features.map((feature, index) => (
              <View key={index} className="flex-row items-start">
                <View className="bg-green-100 p-2 rounded-lg mr-3">
                  <Ionicons name={feature.icon as any} size={20} color="#22c55e" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800">
                    {feature.title}
                  </Text>
                  <Text className="text-gray-600 text-sm mt-1">
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Examples */}
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Exemplos de Uso
          </Text>
          
          <View className="space-y-3">
            {examples.map((example) => (
              <TouchableOpacity
                key={example.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200 active:bg-gray-100"
                onPress={example.action}
              >
                <View className="flex-row items-center">
                  <View 
                    className="p-3 rounded-lg mr-4"
                    style={{ backgroundColor: `${example.color}20` }}
                  >
                    <Ionicons 
                      name={example.icon as any} 
                      size={24} 
                      color={example.color} 
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-800 mb-1">
                      {example.title}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {example.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* API Info */}
        <View className="bg-white rounded-xl p-6 mt-6 shadow-sm">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Informações da API
          </Text>
          
          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="font-medium text-gray-800 mb-2">
              Endpoint de Busca de OS:
            </Text>
            <Text className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
              POST {'{moduleIndex}'}/prefechamento/consultar/codigo
            </Text>
            
            <Text className="font-medium text-gray-800 mb-2 mt-4">
              Payload:
            </Text>
            <Text className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
              {JSON.stringify({ codigo: "CODIGO_ESCANEADO" }, null, 2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* OS Screen Modal */}
      <Modal
        visible={showOSScreen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1">
          <View className="bg-white p-4 border-b border-gray-200">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-800">
                Fechamento de OS
              </Text>
              <TouchableOpacity
                onPress={() => setShowOSScreen(false)}
                className="p-2"
              >
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          <OSClosureScreen />
        </View>
      </Modal>

      {/* Test Screen Modal */}
      <Modal
        visible={showTestScreen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1">
          <View className="bg-white p-4 border-b border-gray-200">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-800">
                Teste de Integração
              </Text>
              <TouchableOpacity
                onPress={() => setShowTestScreen(false)}
                className="p-2"
              >
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          <OSIntegrationTest />
        </View>
      </Modal>
    </View>
  );
};

export default OSScannerExample;