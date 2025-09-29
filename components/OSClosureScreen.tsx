import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { BarcodeScannerSimple } from './BarcodeScannerSimple';

interface Launch {
  id: string;
  identifier: string;
  chassi: string;
  location: string;
  date: string;
  time: string;
}

interface OSInfo {
  servico: string;
  numero: string;
  modelo: string;
  concessionaria: string;
  status: string;
  dataAbertura: string;
}

interface OSClosureScreenProps {}

export const OSClosureScreen: React.FC<OSClosureScreenProps> = () => {
  const [searchCode, setSearchCode] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [osInfo, setOsInfo] = useState<OSInfo | null>(null);

  const handleBarcodePress = () => {
    setShowCamera(true);
  };

  const handleCodeScanned = (code: string) => {
    setSearchCode(code);
    setShowCamera(false);
    // Simular busca da OS com o código escaneado
    fetchOSInfo(code);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  // Dados mock para simular informações da OS
  const mockOSData: Record<string, OSInfo> = {
    'OS123456': {
      numero: 'OS-2024-123456',
      servico: 'Troca de óleo e filtros',
      modelo: 'Honda Civic 2020 - ABC-1234',
      concessionaria: 'Honda Center São Paulo',
      status: 'Em andamento',
      dataAbertura: '15/01/2024'
    },
    'OS789012': {
      numero: 'OS-2024-789012',
      servico: 'Revisão dos 10.000 km',
      modelo: 'Toyota Corolla 2021 - XYZ-5678',
      concessionaria: 'Toyota Premium',
      status: 'Aguardando peças',
      dataAbertura: '12/01/2024'
    },
    'OS345678': {
      numero: 'OS-2024-345678',
      servico: 'Reparo no sistema de freios',
      modelo: 'Volkswagen Jetta 2019 - DEF-9012',
      concessionaria: 'VW Center',
      status: 'Pronto para entrega',
      dataAbertura: '10/01/2024'
    }
  };

  const fetchOSInfo = (code: string) => {
    // Simular busca da OS
    const osData = mockOSData[code];
    if (osData) {
      setOsInfo(osData);
    } else {
      // Gerar dados genéricos se o código não for encontrado
      setOsInfo({
        numero: `OS-2024-${code}`,
        servico: 'FILME SOLAR 20%',
        modelo: 'DOLPHIN MINI',
        concessionaria: 'BYD PAMPULHA',
        status: 'PENDENTE',
        dataAbertura: new Date().toLocaleDateString('pt-BR')
      });
    }
  };

  const recentLaunches: Launch[] = [
    {
      id: '1',
      identifier: 'AA',
      chassi: 'MZ587565',
      location: 'Audi Center',
      date: '15/08',
      time: '11:30'
    },
    {
      id: '2',
      identifier: 'BB',
      chassi: 'BX787558',
      location: 'Carbel SuperCenter',
      date: '15/08',
      time: '8:37'
    },
    {
      id: '3',
      identifier: 'CC',
      chassi: 'HJ536651',
      location: 'Audi Center',
      date: '12/08',
      time: '11:22'
    }
  ];

  const handleSearch = () => {
    if (!searchCode.trim()) {
      alert('Por favor, digite ou escaneie um código para consultar.');
      return;
    }
    console.log('Consultando código:', searchCode);
    fetchOSInfo(searchCode);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Área de Busca */}
        <View className="mx-4 mt-4">
          <View className="bg-white rounded-xl p-4 mb-4"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
            <View className="flex-row items-center bg-gray-50 rounded-lg border border-gray-200 px-3 py-3">
              <TextInput
                className="flex-1 text-gray-900 text-base"
                placeholder="Digite ou escaneie o código"
                placeholderTextColor="#6b7280"
                value={searchCode}
                onChangeText={setSearchCode}
              />
              <TouchableOpacity className="ml-2 p-1" onPress={handleBarcodePress}>
                <Ionicons name="barcode-outline" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            className="bg-green-500 rounded-xl py-4 px-6 items-center active:bg-green-600"
            onPress={handleSearch}
            style={{ shadowColor: '#22c55e', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 }}
          >
            <Text className="text-white font-bold text-lg">Consultar Cod.</Text>
          </TouchableOpacity>
        </View>

        {/* Informações da OS */}
        {osInfo && (
          <View className="mx-4 mt-6">
            <View className="bg-white rounded-xl p-4 mb-4"
                  style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
              <View className="flex-row items-center mb-4">
                <Ionicons name="document-text" size={24} color="#22c55e" />
                <Text className="text-gray-900 font-bold text-lg ml-2">Informações da OS</Text>
              </View>
              
              <View className="space-y-3">
                <View className="flex-row">
                  <Text className="text-gray-600 font-medium w-24">Número:</Text>
                  <Text className="text-gray-900 font-bold flex-1">{osInfo.numero}</Text>
                </View>
                
                <View className="flex-row">
                  <Text className="text-gray-600 font-medium w-24">Serviço:</Text>
                  <Text className="text-gray-900 flex-1">{osInfo.servico}</Text>
                </View>
                
                <View className="flex-row">
                  <Text className="text-gray-600 font-medium w-24">Modelo:</Text>
                  <Text className="text-gray-900 flex-1">{osInfo.modelo}</Text>
                </View>
                
                <View className="flex-row">
                  <Text className="text-gray-600 font-medium w-24">Local:</Text>
                  <Text className="text-gray-900 flex-1">{osInfo.concessionaria}</Text>
                </View>
                
                <View className="flex-row">
                  <Text className="text-gray-600 font-medium w-24">Status:</Text>
                  <View className="bg-blue-100 px-2 py-1 rounded-lg">
                    <Text className="text-blue-800 font-medium text-sm">{osInfo.status}</Text>
                  </View>
                </View>
                
                <View className="flex-row">
                  <Text className="text-gray-600 font-medium w-24">Técnico:</Text>
                </View>
                
                <View className="flex-row">
                  <Text className="text-gray-600 font-medium w-24">Abertura:</Text>
                  <Text className="text-gray-900 flex-1">{osInfo.dataAbertura}</Text>
                </View>
              </View>

              {/* Botão de ação */}
              <View className="mt-6">
                <TouchableOpacity 
                  className="bg-green-500 rounded-lg py-3 items-center"
                  style={{ shadowColor: '#22c55e', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 }}
                >
                  <Text className="text-white font-bold">Fechar OS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Lista de Lançamentos Recentes */}
        <View className="mx-4 mt-8 mb-6">
          <Text className="text-gray-900 font-bold text-lg mb-4">Últimos lançamentos</Text>
          
          {recentLaunches.map((launch) => (
            <View 
              key={launch.id}
              className="bg-white rounded-xl p-4 mb-3 flex-row items-center"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
            >
              {/* Ícone com identificador */}
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                <Text className="text-green-600 font-bold text-sm">{launch.identifier}</Text>
              </View>
              
              {/* Informações do lançamento */}
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-base">{launch.chassi}</Text>
                <Text className="text-gray-500 text-sm">{launch.location}</Text>
              </View>
              
              {/* Data e hora */}
              <View className="items-end">
                <Text className="text-gray-600 text-sm font-medium">{launch.date}</Text>
                <Text className="text-gray-400 text-xs">{launch.time}</Text>
              </View>
            </View>
          ))}
        </View>
       </ScrollView>

        {/* Barcode Scanner Modal */}
        <BarcodeScannerSimple
        visible={showCamera}
        onClose={handleCloseCamera}
        onCodeScanned={handleCodeScanned}
      />
     </View>
   );
};

export default OSClosureScreen;