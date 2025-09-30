import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { ScannerService } from '../Services/ScannerService';

/**
 * Componente de teste para verificar a integração da API com os scanners
 * Este componente permite testar todas as funcionalidades do ScannerService
 */
export const ScannerIntegrationTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Teste de processamento de QR Code
  const testQRCodeProcessing = async () => {
    setIsLoading(true);
    addResult('🔄 Testando processamento de QR Code...');
    
    try {
      const testQRCode = 'TEST_QR_CODE_123';
      const result = await ScannerService.processQRCode(testQRCode);
      
      if (result) {
        addResult('✅ QR Code processado com sucesso');
        addResult(`📄 Dados: ${JSON.stringify(result, null, 2)}`);
      } else {
        addResult('⚠️ QR Code processado, mas sem dados retornados');
      }
    } catch (error) {
      addResult(`❌ Erro no processamento de QR Code: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Teste de processamento de código de barras
  const testBarcodeProcessing = async () => {
    setIsLoading(true);
    addResult('🔄 Testando processamento de código de barras...');
    
    try {
      const testBarcode = '7891234567890';
      const result = await ScannerService.processBarcode(testBarcode);
      
      if (result) {
        addResult('✅ Código de barras processado com sucesso');
        addResult(`📄 Dados: ${JSON.stringify(result, null, 2)}`);
      } else {
        addResult('⚠️ Código de barras processado, mas sem dados retornados');
      }
    } catch (error) {
      addResult(`❌ Erro no processamento de código de barras: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Teste de busca de produto por código de barras
  const testProductSearch = async () => {
    setIsLoading(true);
    addResult('🔄 Testando busca de produto por código de barras...');
    
    try {
      const testBarcode = '7891234567890';
      const result = await ScannerService.getProductByBarcode(testBarcode);
      
      if (result) {
        addResult('✅ Produto encontrado com sucesso');
        addResult(`📦 Produto: ${JSON.stringify(result, null, 2)}`);
      } else {
        addResult('⚠️ Nenhum produto encontrado para o código');
      }
    } catch (error) {
      addResult(`❌ Erro na busca de produto: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Teste de busca de informações por QR Code
  const testQRCodeInfo = async () => {
    setIsLoading(true);
    addResult('🔄 Testando busca de informações por QR Code...');
    
    try {
      const testQRCode = 'TEST_QR_INFO_456';
      const result = await ScannerService.getInfoByQRCode(testQRCode);
      
      if (result) {
        addResult('✅ Informações encontradas com sucesso');
        addResult(`📋 Info: ${JSON.stringify(result, null, 2)}`);
      } else {
        addResult('⚠️ Nenhuma informação encontrada para o QR Code');
      }
    } catch (error) {
      addResult(`❌ Erro na busca de informações: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Teste de log de escaneamento
  const testScanLogging = async () => {
    setIsLoading(true);
    addResult('🔄 Testando log de escaneamento...');
    
    try {
      await ScannerService.logScan('qr_code', 'TEST_LOG_789', 'test_scan');
      addResult('✅ Log de escaneamento registrado com sucesso');
    } catch (error) {
      addResult(`❌ Erro no log de escaneamento: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Teste de validação de código
  const testCodeValidation = async () => {
    setIsLoading(true);
    addResult('🔄 Testando validação de código...');
    
    try {
      const testCode = 'VALID_CODE_123';
      const result = await ScannerService.validateCode(testCode, 'qr_code');
      
      if (result) {
        addResult('✅ Código validado com sucesso');
        addResult(`✔️ Resultado: ${JSON.stringify(result, null, 2)}`);
      } else {
        addResult('⚠️ Código não é válido');
      }
    } catch (error) {
      addResult(`❌ Erro na validação de código: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Teste completo de todos os métodos
  const runAllTests = async () => {
    clearResults();
    addResult('🚀 Iniciando testes completos da integração...');
    
    await testQRCodeProcessing();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa entre testes
    
    await testBarcodeProcessing();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await testProductSearch();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await testQRCodeInfo();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await testScanLogging();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await testCodeValidation();
    
    addResult('🏁 Todos os testes concluídos!');
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-center mb-6 text-gray-800">
        Teste de Integração - Scanner API
      </Text>

      {/* Botões de teste */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={runAllTests}
          disabled={isLoading}
          className={`bg-blue-500 p-4 rounded-lg mb-3 ${isLoading ? 'opacity-50' : ''}`}
        >
          <Text className="text-white text-center font-semibold">
            🚀 Executar Todos os Testes
          </Text>
        </TouchableOpacity>

        <View className="flex-row flex-wrap gap-2">
          <TouchableOpacity
            onPress={testQRCodeProcessing}
            disabled={isLoading}
            className={`bg-green-500 p-3 rounded-lg flex-1 ${isLoading ? 'opacity-50' : ''}`}
          >
            <Text className="text-white text-center text-sm">QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={testBarcodeProcessing}
            disabled={isLoading}
            className={`bg-orange-500 p-3 rounded-lg flex-1 ${isLoading ? 'opacity-50' : ''}`}
          >
            <Text className="text-white text-center text-sm">Barcode</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={testProductSearch}
            disabled={isLoading}
            className={`bg-purple-500 p-3 rounded-lg flex-1 ${isLoading ? 'opacity-50' : ''}`}
          >
            <Text className="text-white text-center text-sm">Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={testQRCodeInfo}
            disabled={isLoading}
            className={`bg-indigo-500 p-3 rounded-lg flex-1 ${isLoading ? 'opacity-50' : ''}`}
          >
            <Text className="text-white text-center text-sm">Info QR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={testScanLogging}
            disabled={isLoading}
            className={`bg-yellow-500 p-3 rounded-lg flex-1 ${isLoading ? 'opacity-50' : ''}`}
          >
            <Text className="text-white text-center text-sm">Log</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={testCodeValidation}
            disabled={isLoading}
            className={`bg-red-500 p-3 rounded-lg flex-1 ${isLoading ? 'opacity-50' : ''}`}
          >
            <Text className="text-white text-center text-sm">Validar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={clearResults}
          className="bg-gray-500 p-3 rounded-lg mt-3"
        >
          <Text className="text-white text-center">🗑️ Limpar Resultados</Text>
        </TouchableOpacity>
      </View>

      {/* Indicador de carregamento */}
      {isLoading && (
        <View className="flex-row items-center justify-center mb-4">
          <ActivityIndicator size="small" color="#3B82F6" />
          <Text className="ml-2 text-gray-600">Executando teste...</Text>
        </View>
      )}

      {/* Resultados dos testes */}
      <View className="flex-1">
        <Text className="text-lg font-semibold mb-3 text-gray-700">
          📊 Resultados dos Testes:
        </Text>
        
        <ScrollView 
          className="flex-1 bg-white rounded-lg p-3"
          showsVerticalScrollIndicator={true}
        >
          {testResults.length === 0 ? (
            <Text className="text-gray-500 text-center italic">
              Nenhum teste executado ainda...
            </Text>
          ) : (
            testResults.map((result, index) => (
              <Text 
                key={index} 
                className="text-sm mb-2 text-gray-800 font-mono"
              >
                {result}
              </Text>
            ))
          )}
        </ScrollView>
      </View>

      {/* Informações adicionais */}
      <View className="mt-4 bg-blue-50 p-3 rounded-lg">
        <Text className="text-sm text-blue-800 font-semibold mb-1">
          ℹ️ Informações do Teste:
        </Text>
        <Text className="text-xs text-blue-700">
          • Este teste verifica a conectividade com a API{'\n'}
          • Códigos de teste são usados para simular escaneamentos{'\n'}
          • Erros de rede são esperados se a API estiver offline{'\n'}
          • Verifique os logs para detalhes dos resultados
        </Text>
      </View>
    </View>
  );
};

export default ScannerIntegrationTest;