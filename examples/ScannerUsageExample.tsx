import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Modal } from 'react-native';
import { QRCodeScanner } from '../components/QRCodeScanner';
import { BarcodeScannerSimple } from '../components/BarcodeScannerSimple';
import { ScannerIntegrationTest } from '../tests/ScannerIntegrationTest';

interface ScanResult {
  id: string;
  type: 'qr_code' | 'barcode';
  code: string;
  data?: any;
  timestamp: Date;
}

/**
 * Exemplo prático de uso dos componentes de scanner integrados com a API
 * Demonstra como implementar escaneamento com histórico e tratamento de dados
 */
export const ScannerUsageExample: React.FC = () => {
  const [qrScannerVisible, setQrScannerVisible] = useState(false);
  const [barcodeScannerVisible, setBarcodeScannerVisible] = useState(false);
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);

  // Manipulador para QR Code escaneado
  const handleQRCodeScanned = (code: string, data?: any) => {
    const scanResult: ScanResult = {
      id: Date.now().toString(),
      type: 'qr_code',
      code,
      data,
      timestamp: new Date()
    };

    setScanHistory(prev => [scanResult, ...prev]);
    setQrScannerVisible(false);

    if (data) {
      Alert.alert(
        'QR Code Processado',
        `Código: ${code}\n\nDados da API recebidos com sucesso!`,
        [
          { text: 'Ver Detalhes', onPress: () => showScanDetails(scanResult) },
          { text: 'OK' }
        ]
      );
    } else {
      Alert.alert(
        'QR Code Lido',
        `Código: ${code}\n\nCódigo lido, mas sem dados da API.`,
        [{ text: 'OK' }]
      );
    }
  };

  // Manipulador para código de barras escaneado
  const handleBarcodeScanned = (code: string, data?: any) => {
    const scanResult: ScanResult = {
      id: Date.now().toString(),
      type: 'barcode',
      code,
      data,
      timestamp: new Date()
    };

    setScanHistory(prev => [scanResult, ...prev]);
    setBarcodeScannerVisible(false);

    if (data) {
      Alert.alert(
        'Código de Barras Processado',
        `Código: ${code}\n\nDados da API recebidos com sucesso!`,
        [
          { text: 'Ver Detalhes', onPress: () => showScanDetails(scanResult) },
          { text: 'OK' }
        ]
      );
    } else {
      Alert.alert(
        'Código de Barras Lido',
        `Código: ${code}\n\nCódigo lido, mas sem dados da API.`,
        [{ text: 'OK' }]
      );
    }
  };

  // Manipulador de erros
  const handleScanError = (error: string) => {
    Alert.alert('Erro no Scanner', error);
  };

  // Mostrar detalhes do escaneamento
  const showScanDetails = (scanResult: ScanResult) => {
    const details = scanResult.data 
      ? JSON.stringify(scanResult.data, null, 2)
      : 'Nenhum dado adicional disponível';

    Alert.alert(
      'Detalhes do Escaneamento',
      `Tipo: ${scanResult.type === 'qr_code' ? 'QR Code' : 'Código de Barras'}\n` +
      `Código: ${scanResult.code}\n` +
      `Data: ${scanResult.timestamp.toLocaleString('pt-BR')}\n\n` +
      `Dados da API:\n${details}`,
      [{ text: 'OK' }]
    );
  };

  // Limpar histórico
  const clearHistory = () => {
    Alert.alert(
      'Limpar Histórico',
      'Tem certeza que deseja limpar todo o histórico de escaneamentos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpar', 
          style: 'destructive',
          onPress: () => setScanHistory([])
        }
      ]
    );
  };

  // Renderizar item do histórico
  const renderHistoryItem = (item: ScanResult) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => showScanDetails(item)}
      className="bg-white p-4 mb-2 rounded-lg shadow-sm border border-gray-200"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="font-semibold text-gray-800">
            {item.type === 'qr_code' ? '📱 QR Code' : '📊 Código de Barras'}
          </Text>
          <Text className="text-gray-600 mt-1" numberOfLines={1}>
            {item.code}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            {item.timestamp.toLocaleString('pt-BR')}
          </Text>
        </View>
        <View className="ml-3">
          {item.data ? (
            <View className="bg-green-100 px-2 py-1 rounded">
              <Text className="text-green-800 text-xs font-medium">
                ✅ Com dados
              </Text>
            </View>
          ) : (
            <View className="bg-yellow-100 px-2 py-1 rounded">
              <Text className="text-yellow-800 text-xs font-medium">
                ⚠️ Sem dados
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white p-4 shadow-sm">
        <Text className="text-2xl font-bold text-center text-gray-800">
          Scanner com API
        </Text>
        <Text className="text-center text-gray-600 mt-1">
          Escaneie códigos e veja a integração com a API
        </Text>
      </View>

      {/* Botões de ação */}
      <View className="p-4">
        <View className="flex-row gap-3 mb-4">
          <TouchableOpacity
            onPress={() => setQrScannerVisible(true)}
            className="flex-1 bg-blue-500 p-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">
              📱 Escanear QR Code
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setBarcodeScannerVisible(true)}
            className="flex-1 bg-green-500 p-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">
              📊 Escanear Código de Barras
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-3">
          <TouchableOpacity
            onPress={() => setTestModalVisible(true)}
            className="flex-1 bg-purple-500 p-3 rounded-lg"
          >
            <Text className="text-white text-center font-medium">
              🧪 Testar API
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={clearHistory}
            className="flex-1 bg-red-500 p-3 rounded-lg"
          >
            <Text className="text-white text-center font-medium">
              🗑️ Limpar Histórico
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Histórico de escaneamentos */}
      <View className="flex-1 px-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-lg font-semibold text-gray-800">
            📋 Histórico de Escaneamentos
          </Text>
          <Text className="text-sm text-gray-600">
            {scanHistory.length} item(s)
          </Text>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {scanHistory.length === 0 ? (
            <View className="bg-white p-8 rounded-lg items-center">
              <Text className="text-gray-500 text-center">
                📱 Nenhum código escaneado ainda
              </Text>
              <Text className="text-gray-400 text-center mt-2 text-sm">
                Use os botões acima para começar a escanear
              </Text>
            </View>
          ) : (
            scanHistory.map(renderHistoryItem)
          )}
        </ScrollView>
      </View>

      {/* QR Code Scanner Modal */}
      <QRCodeScanner
        visible={qrScannerVisible}
        onClose={() => setQrScannerVisible(false)}
        onCodeScanned={handleQRCodeScanned}
        onError={handleScanError}
      />

      {/* Barcode Scanner Modal */}
      <BarcodeScannerSimple
        visible={barcodeScannerVisible}
        onClose={() => setBarcodeScannerVisible(false)}
        onCodeScanned={handleBarcodeScanned}
        onError={handleScanError}
      />

      {/* Test Modal */}
      <Modal
        visible={testModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1">
          <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
            <Text className="text-lg font-semibold">Teste de Integração API</Text>
            <TouchableOpacity
              onPress={() => setTestModalVisible(false)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              <Text className="text-gray-700">Fechar</Text>
            </TouchableOpacity>
          </View>
          <ScannerIntegrationTest />
        </View>
      </Modal>

      {/* Informações na parte inferior */}
      <View className="bg-white p-3 border-t border-gray-200">
        <Text className="text-xs text-gray-600 text-center">
          💡 Toque nos itens do histórico para ver detalhes
        </Text>
      </View>
    </View>
  );
};

export default ScannerUsageExample;