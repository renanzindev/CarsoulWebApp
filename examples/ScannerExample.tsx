import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet
} from 'react-native';
import { BarcodeScannerSimple } from '../components/BarcodeScannerSimple';

interface ScanResult {
  code: string;
  data: any;
  type: 'barcode';
  timestamp: string;
}

export const ScannerExample: React.FC = () => {
  const [barcodeScannerVisible, setBarcodeScannerVisible] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  };

  const handleBarcodeScanned = (code: string, data?: any) => {
    console.log('Código de barras escaneado:', { code, data });
    
    const result: ScanResult = {
      code,
      data,
      type: 'barcode',
      timestamp: new Date().toLocaleString()
    };
    
    setScanResults(prev => [result, ...prev]);
    
    // Exibe informações do resultado
    if (data) {
      Alert.alert(
        'Código de Barras Processado',
        `Código: ${code}\nDados recebidos da API com sucesso!`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Código de Barras Lido',
        `Código: ${code}\nNenhum dado adicional da API.`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleScanError = (error: string) => {
    console.error('Erro no scanner:', error);
    Alert.alert('Erro', error);
  };

  const clearResults = () => {
    setScanResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner com Integração API</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.barcodeButton]}
          onPress={() => setBarcodeScannerVisible(true)}
        >
          <Text style={styles.buttonText}>Escanear Código de Barras</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Resultados dos Escaneamentos</Text>
        {scanResults.length > 0 && (
          <TouchableOpacity onPress={clearResults} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.resultsContainer}>
        {scanResults.length === 0 ? (
          <Text style={styles.noResults}>Nenhum código escaneado ainda</Text>
        ) : (
          scanResults.map((result, index) => (
            <View key={index} style={styles.resultItem}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultType}>
                  📊 Código de Barras
                </Text>
                <Text style={styles.resultTime}>{result.timestamp}</Text>
              </View>
              
              <Text style={styles.resultCode}>Código: {result.code}</Text>
              
              {result.data ? (
                <View style={styles.apiDataContainer}>
                  <Text style={styles.apiDataTitle}>✅ Dados da API:</Text>
                  <Text style={styles.apiDataText}>
                    {JSON.stringify(result.data, null, 2)}
                  </Text>
                </View>
              ) : (
                <Text style={styles.noApiData}>❌ Nenhum dado da API</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Barcode Scanner */}
      <BarcodeScannerSimple
        visible={barcodeScannerVisible}
        onClose={() => setBarcodeScannerVisible(false)}
        onCodeScanned={handleBarcodeScanned}
        onError={handleScanError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  barcodeButton: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 50,
  },
  resultItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  resultTime: {
    fontSize: 12,
    color: '#666',
  },
  resultCode: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  apiDataContainer: {
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  apiDataTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 5,
  },
  apiDataText: {
    fontSize: 12,
    color: '#065F46',
    fontFamily: 'monospace',
  },
  noApiData: {
    fontSize: 14,
    color: '#DC2626',
    fontStyle: 'italic',
  },
});