import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { CameraView, Camera, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import ScannerService from '../Services/ScannerService';

interface QRCodeScannerProps {
  visible: boolean;
  onClose: () => void;
  onCodeScanned: (code: string, data?: any) => void;
  onError?: (error: string) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  visible,
  onClose,
  onCodeScanned,
  onError
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (visible && !permission?.granted) {
      console.log('Solicitando permissão da câmera...');
      requestPermission().then((result) => {
        console.log('Resultado da permissão:', result);
      }).catch((error) => {
        console.error('Erro ao solicitar permissão:', error);
        setCameraError('Erro ao solicitar permissão da câmera');
      });
    }
  }, [visible, permission]);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (isProcessing) return;
    
    console.log('QR Code escaneado:', { type, data });
    setScanned(true);
    setIsProcessing(true);
    
    try {
      // Registra o escaneamento para auditoria
      await ScannerService.logScan('qr', data, 'scan');
      
      // Processa o QR Code na API
      const [success, result] = await ScannerService.processQRCode(data);
      
      if (success) {
        console.log('QR Code processado com sucesso:', result);
        onCodeScanned(data, result);
        onClose();
      } else {
        console.error('Erro ao processar QR Code:', result);
        
        // Tenta buscar informações alternativas
        const [infoSuccess, infoResult] = await ScannerService.getInfoByQRCode(data);
        
        if (infoSuccess) {
          console.log('Informações encontradas:', infoResult);
          onCodeScanned(data, infoResult);
          onClose();
        } else {
          // Se não conseguir processar, ainda assim retorna o código
          const errorMessage = 'Não foi possível processar o QR Code na API, mas o código foi lido com sucesso.';
          console.warn(errorMessage);
          
          if (onError) {
            onError(errorMessage);
          } else {
            Alert.alert('Aviso', errorMessage);
          }
          
          onCodeScanned(data, null);
          onClose();
        }
      }
    } catch (error) {
      console.error('Erro ao processar QR Code:', error);
      const errorMessage = 'Erro ao conectar com a API. Código lido: ' + data;
      
      if (onError) {
        onError(errorMessage);
      } else {
        Alert.alert('Erro', errorMessage);
      }
      
      onCodeScanned(data, null);
      onClose();
    } finally {
      setIsProcessing(false);
      
      // Reset scanned state after a delay
      setTimeout(() => {
        setScanned(false);
      }, 2000);
    }
  };

  const handleCameraError = (error: any) => {
    console.error('Erro da câmera:', error);
    setCameraError('Erro ao acessar a câmera');
  };

  if (!permission) {
    return (
      <Modal visible={visible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black">
          <Text className="text-white text-lg">Carregando câmera...</Text>
        </View>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black p-6">
          <Ionicons name="camera-outline" size={80} color="white" />
          <Text className="text-white text-xl font-bold mt-4 text-center">
            Acesso à Câmera Negado
          </Text>
          <Text className="text-gray-300 text-base mt-2 text-center">
            Para escanear códigos QR, é necessário permitir o acesso à câmera.
          </Text>
          <TouchableOpacity
            className="bg-blue-600 px-6 py-3 rounded-lg mt-6"
            onPress={() => {
              if (permission?.canAskAgain) {
                requestPermission();
              } else {
                Alert.alert(
                  'Permissão da Câmera',
                  'Vá para as configurações do aplicativo e permita o acesso à câmera.',
                  [{ text: 'OK', onPress: onClose }]
                );
              }
            }}
          >
            <Text className="text-white font-bold">
              {permission?.canAskAgain ? 'Solicitar Permissão' : 'Configurações'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-4"
            onPress={onClose}
          >
            <Text className="text-gray-400">Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  if (cameraError) {
    return (
      <Modal visible={visible} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black p-6">
          <Ionicons name="warning-outline" size={80} color="orange" />
          <Text className="text-white text-xl font-bold mt-4 text-center">
            Erro na Câmera
          </Text>
          <Text className="text-gray-300 text-base mt-2 text-center">
            {cameraError}
          </Text>
          <TouchableOpacity
            className="bg-blue-600 px-6 py-3 rounded-lg mt-6"
            onPress={() => {
              setCameraError(null);
              requestPermission();
            }}
          >
            <Text className="text-white font-bold">Tentar Novamente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-4"
            onPress={onClose}
          >
            <Text className="text-gray-400">Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-black">
        {/* Header */}
        <View className="absolute top-12 left-0 right-0 z-10 flex-row justify-between items-center px-6">
          <TouchableOpacity
            onPress={onClose}
            className="bg-black/50 rounded-full p-2"
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Escanear QR Code</Text>
          <View className="w-8" />
        </View>

        {/* Camera */}
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417'],
          }}
          mode="picture"
          onCameraReady={() => {
            console.log('Câmera pronta');
            setCameraError(null);
          }}
          onMountError={(error) => {
            console.error('Erro ao montar câmera:', error);
            handleCameraError(error);
          }}
        >
          {/* Overlay com área de escaneamento */}
          <View className="flex-1 justify-center items-center">
            <View className="relative">
              {/* Área de escaneamento */}
              <View 
                className="w-64 h-64 border-2 border-white rounded-2xl"
                style={{ borderStyle: 'dashed' }}
              />
              
              {/* Cantos da área de escaneamento */}
              <View className="absolute -top-1 -left-1 w-6 h-6 border-l-4 border-t-4 border-green-500 rounded-tl-lg" />
              <View className="absolute -top-1 -right-1 w-6 h-6 border-r-4 border-t-4 border-green-500 rounded-tr-lg" />
              <View className="absolute -bottom-1 -left-1 w-6 h-6 border-l-4 border-b-4 border-green-500 rounded-bl-lg" />
              <View className="absolute -bottom-1 -right-1 w-6 h-6 border-r-4 border-b-4 border-green-500 rounded-br-lg" />
              
              {/* Loading indicator */}
              {isProcessing && (
                <View className="absolute inset-0 bg-black/70 rounded-2xl flex justify-center items-center">
                  <ActivityIndicator size="large" color="#10B981" />
                  <Text className="text-white mt-2 font-medium">Processando...</Text>
                </View>
              )}
            </View>
          </View>

          {/* Instruções */}
          <View className="absolute bottom-20 left-0 right-0 px-6">
            <View className="bg-black/70 rounded-xl p-4">
              <Text className="text-white text-center text-base">
                Posicione o QR code dentro da área marcada
              </Text>
              <Text className="text-gray-300 text-center text-sm mt-1">
                O código será escaneado automaticamente
              </Text>
            </View>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
};