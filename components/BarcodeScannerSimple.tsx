import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
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

  useEffect(() => {
    if (visible && !permission?.granted) {
      requestPermission();
    }
  }, [visible]);

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
        <View style={styles.container}>
          <Text style={styles.text}>Carregando...</Text>
        </View>
      </Modal>
    );
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
          <Ionicons name="camera-outline" size={80} color="white" />
          <Text style={styles.title}>Permissão da Câmera</Text>
          <Text style={styles.text}>
            Precisamos de acesso à câmera para escanear códigos de barras
          </Text>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <Text style={styles.buttonText}>Permitir Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.fullScreen}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Escanear Código de Barras</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Camera */}
        <CameraView
          style={styles.camera}
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
        >
          {/* Overlay */}
          <View style={styles.overlay}>
            <View style={styles.scanArea}>
              {/* Loading indicator */}
              {isProcessing && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#10B981" />
                  <Text style={styles.loadingText}>Processando...</Text>
                </View>
              )}
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              {isProcessing ? 'Processando código...' : 'Posicione o código de barras na área marcada'}
            </Text>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  closeIcon: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 300,
    height: 120,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  instructions: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
  },
  instructionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
  },
  closeText: {
    color: '#999',
    fontSize: 16,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
});