import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScannerService from '../Services/ScannerService';
import { BarcodeScannerSimple } from './BarcodeScannerSimple';

interface TestResult {
  success: boolean;
  data: any;
  error?: string;
  timestamp: string;
}

export const OSIntegrationTest: React.FC = () => {
  const [testCode, setTestCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showScanner, setShowScanner] = useState(false);

  const addTestResult = (success: boolean, data: any, error?: string) => {
    const result: TestResult = {
      success,
      data,
      error,
      timestamp: new Date().toLocaleString('pt-BR')
    };
    setTestResults(prev => [result, ...prev]);
  };

  const testOSSearch = async (code: string) => {
    setIsLoading(true);
    try {
      console.log('Testando busca de OS com código:', code);
      
      // Testar o método getOSByCode
      const [success, data] = await ScannerService.getOSByCode(code);
      
      addTestResult(success, data);
      
      if (success) {
        Alert.alert(
          'Teste Bem-sucedido!',
          `OS encontrada: ${data?.numero || 'Número não informado'}`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Teste Falhou',
          `Não foi possível encontrar OS para o código: ${code}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Erro no teste:', error);
      addTestResult(false, null, error?.toString());
      Alert.alert(
        'Erro no Teste',
        `Erro: ${error?.toString()}`,
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualTest = async () => {
    if (!testCode.trim()) {
      Alert.alert('Atenção', 'Digite um código para testar');
      return;
    }
    await testOSSearch(testCode);
  };

  const handleCodeScanned = async (code: string) => {
    setTestCode(code);
    setShowScanner(false);
    await testOSSearch(code);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-2">
            <Ionicons name="flask" size={24} color="#3b82f6" />
            <Text className="text-xl font-bold text-gray-800 ml-2">
              Teste de Integração OS
            </Text>
          </View>
          <Text className="text-gray-600">
            Teste a integração do scanner com a busca de OS via API
          </Text>
        </View>

        {/* Test Input */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Testar Código
          </Text>
          
          <View className="flex-row items-center bg-gray-50 rounded-lg border border-gray-200 px-3 py-3 mb-3">
            <TextInput
              className="flex-1 text-gray-900 text-base"
              placeholder="Digite um código para testar"
              placeholderTextColor="#6b7280"
              value={testCode}
              onChangeText={setTestCode}
            />
            <TouchableOpacity 
              className="ml-2 p-1" 
              onPress={() => setShowScanner(true)}
            >
              <Ionicons name="barcode-outline" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity
              className={`flex-1 ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} rounded-lg py-3 px-4 items-center`}
              onPress={handleManualTest}
              disabled={isLoading}
            >
              {isLoading ? (
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="#ffffff" />
                  <Text className="text-white font-medium ml-2">Testando...</Text>
                </View>
              ) : (
                <Text className="text-white font-medium">Testar Código</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-500 rounded-lg py-3 px-4 items-center"
              onPress={clearResults}
            >
              <Text className="text-white font-medium">Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Test Results */}
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Resultados dos Testes ({testResults.length})
          </Text>

          {testResults.length === 0 ? (
            <Text className="text-gray-500 text-center py-8">
              Nenhum teste executado ainda
            </Text>
          ) : (
            <View className="space-y-3">
              {testResults.map((result, index) => (
                <View
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    result.success 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                      <Ionicons 
                        name={result.success ? "checkmark-circle" : "close-circle"} 
                        size={20} 
                        color={result.success ? "#22c55e" : "#ef4444"} 
                      />
                      <Text className={`font-medium ml-2 ${
                        result.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {result.success ? 'Sucesso' : 'Falha'}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-500">
                      {result.timestamp}
                    </Text>
                  </View>

                  {result.success && result.data ? (
                    <View className="bg-white p-2 rounded border">
                      <Text className="text-sm font-medium text-gray-700 mb-1">
                        Dados da OS:
                      </Text>
                      <Text className="text-xs text-gray-600 font-mono">
                        {JSON.stringify(result.data, null, 2)}
                      </Text>
                    </View>
                  ) : result.error ? (
                    <View className="bg-white p-2 rounded border">
                      <Text className="text-sm font-medium text-red-700 mb-1">
                        Erro:
                      </Text>
                      <Text className="text-xs text-red-600">
                        {result.error}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Scanner Modal */}
      <BarcodeScannerSimple
        visible={showScanner}
        onClose={() => setShowScanner(false)}
        onCodeScanned={handleCodeScanned}
      />
    </View>
  );
};

export default OSIntegrationTest;