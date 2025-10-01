import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import ScannerService from '../Services/ScannerService';

interface BarcodeScannerSimpleProps {
  visible: boolean;
  onClose: () => void;
  onCodeScanned: (code: string, data?: any) => void;
  onError?: (error: string) => void;
}

const { width, height } = Dimensions.get('window');

export const BarcodeScannerSimple: React.FC<BarcodeScannerSimpleProps> = ({
  visible,
  onClose,
  onCodeScanned,
  onError
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    if (visible) {
      setScanned(false);
      setIsProcessing(false);
      setCameraReady(false);
      
      if (!permission?.granted) {
        requestPermission();
      }
    }
  }, [visible]);

  useEffect(() => {
    if (permission?.granted && visible) {
      // Pequeno delay para garantir que a câmera seja inicializada
      const timer = setTimeout(() => {
        setCameraReady(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [permission?.granted, visible]);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (scanned || isProcessing) return;
    
    setScanned(true);
    setIsProcessing(true);
    
    console.log('=== CÓDIGO ESCANEADO ===');
    console.log('Tipo:', type);
    console.log('Dados:', data);
    console.log('Comprimento:', data?.length);
    console.log('Caracteres especiais:', /[^a-zA-Z0-9]/.test(data));
    
    try {
      // Registra o escaneamento para auditoria
      console.log('Registrando escaneamento...');
      const [logSuccess, logResult] = await ScannerService.logScan('barcode', data, 'scan');
      console.log('Log resultado:', logSuccess ? 'Sucesso' : 'Falha', logResult);
      
      // Processa o código de barras na API
      console.log('Processando código de barras...');
      const [success, result] = await ScannerService.processBarcode(data);
      console.log('Processamento resultado:', success ? 'Sucesso' : 'Falha', result);
      
      if (success) {
        console.log('✅ Código de barras processado com sucesso:', result);
        onCodeScanned(data, result);
        onClose();
      } else {
        console.log('⚠️ Falha no processamento, tentando buscar produto...');
        
        // Tenta buscar produto por código de barras
        const [productSuccess, productResult] = await ScannerService.getProductByBarcode(data);
        console.log('Busca de produto resultado:', productSuccess ? 'Sucesso' : 'Falha', productResult);
        
        if (productSuccess) {
          console.log('✅ Produto encontrado:', productResult);
          onCodeScanned(data, productResult);
          onClose();
        } else {
          // Se não conseguir processar, ainda assim retorna o código
          const errorMessage = `Código lido: ${data}\n\nNão foi possível processar na API.\n\nDetalhes:\n- Processamento: ${success ? 'OK' : 'Falha'}\n- Busca produto: ${productSuccess ? 'OK' : 'Falha'}`;
          console.warn('⚠️ Nenhuma API funcionou, retornando código bruto');
          
          if (onError) {
            onError(errorMessage);
          } else {
            Alert.alert('Código Lido', errorMessage + '\n\nO código será enviado mesmo assim.');
          }
          
          onCodeScanned(data, null);
          onClose();
        }
      }
    } catch (error) {
      console.error('=== ERRO NO SCANNER ===');
      console.error('Erro completo:', error);
      console.error('Stack trace:', error.stack);
      
      const errorMessage = `Erro ao processar código: ${data}\n\nDetalhes do erro:\n${error.message || error}\n\nO código será enviado mesmo assim.`;
      
      if (onError) {
        onError(errorMessage);
      } else {
        Alert.alert('Erro no Scanner', errorMessage);
      }
      
      // Sempre retorna o código, mesmo com erro
      onCodeScanned(data, null);
      onClose();
    } finally {
      setIsProcessing(false);
      console.log('=== FIM DO PROCESSAMENTO ===');
      
      setTimeout(() => {
        setScanned(false);
      }, 2000);
    }
  };

  if (!permission) {
    return (
      <Modal visible={visible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black p-5">
          <Text className="text-white text-base text-center my-2.5">Carregando...</Text>
        </View>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black p-5">
          <Ionicons name="camera-outline" size={80} color="white" />
          <Text className="text-white text-xl font-bold mt-5 mb-2.5">Permissão da Câmera</Text>
          <Text className="text-white text-base text-center my-2.5">
            Precisamos de acesso à câmera para escanear códigos de barras
          </Text>
          <TouchableOpacity className="bg-blue-500 px-7 py-4 rounded-lg mt-5" onPress={requestPermission}>
            <Text className="text-white text-base font-bold">Permitir Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-4" onPress={onClose}>
            <Text className="text-gray-400 text-base">Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-black">
        {/* Header */}
        <View className="absolute top-12 left-0 right-0 flex-row justify-between items-center px-5 z-10">
          <TouchableOpacity onPress={onClose} className="bg-black/50 rounded-full p-2">
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Escanear Código de Barras</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Camera */}
        {cameraReady ? (
          <CameraView
            className="flex-1"
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: [
                'code128',
                'code39',
                'code93',
                'codabar',
                'ean13',
                'ean8',
                'itf14',
                'upc_a',
                'upc_e',
                'pdf417',
                'aztec',
                'datamatrix'
              ],
            }}
            onCameraReady={() => {
              console.log('Câmera pronta para uso');
            }}
            onMountError={(error) => {
              console.error('Erro ao montar câmera:', error);
              Alert.alert('Erro na Câmera', 'Não foi possível inicializar a câmera. Tente novamente.');
            }}
          >
          {/* Overlay */}
          <View className="flex-1 justify-center items-center">
            <View className="w-72 h-28 border-2 border-white rounded-lg bg-transparent relative">
              {/* Loading indicator */}
              {isProcessing && (
                <View className="absolute inset-0 bg-black/70 justify-center items-center rounded-lg">
                  <ActivityIndicator size="large" color="#10B981" />
                  <Text className="text-white mt-2.5 text-sm font-medium">Processando...</Text>
                </View>
              )}
            </View>
          </View>

            {/* Instructions */}
            <View className="absolute bottom-24 left-5 right-5">
              <Text className="text-white text-center text-base bg-black/70 p-4 rounded-lg">
                {isProcessing ? 'Processando código...' : 'Posicione o código de barras na área marcada'}
              </Text>
            </View>
          </CameraView>
        ) : (
          <View className="flex-1 justify-center items-center bg-black">
            <ActivityIndicator size="large" color="#10B981" />
            <Text className="text-white mt-4 text-base">Inicializando câmera...</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};