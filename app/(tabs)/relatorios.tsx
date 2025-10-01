import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ReportItem {
  id: string;
  title: string;
  description: string;
  type: 'OS' | 'PCP' | 'GERAL';
  icon: string;
  color: string;
}

const RelatoriosScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'TODOS' | 'OS' | 'PCP' | 'GERAL'>('TODOS');

  const reports: ReportItem[] = [
    {
      id: '1',
      title: 'Relatório de OS Fechadas',
      description: 'Relatório completo das ordens de serviço finalizadas',
      type: 'OS',
      icon: '🔧',
      color: '#ef4444'
    },
    {
      id: '2',
      title: 'Relatório de OS Pendentes',
      description: 'Ordens de serviço em andamento e pendentes',
      type: 'OS',
      icon: '⏳',
      color: '#f59e0b'
    },
    {
      id: '3',
      title: 'Relatório PCP Mensal',
      description: 'Planejamento e controle de produção do mês',
      type: 'PCP',
      icon: '📊',
      color: '#3b82f6'
    },
    {
      id: '4',
      title: 'Relatório de Agendamentos',
      description: 'Histórico de agendamentos realizados',
      type: 'PCP',
      icon: '📅',
      color: '#8b5cf6'
    },
    {
      id: '5',
      title: 'Relatório Geral de Produtividade',
      description: 'Análise geral da produtividade da oficina',
      type: 'GERAL',
      icon: '📈',
      color: '#10b981'
    },
    {
      id: '6',
      title: 'Relatório de Clientes',
      description: 'Informações e histórico de clientes',
      type: 'GERAL',
      icon: '👥',
      color: '#06b6d4'
    }
  ];

  const filteredReports = selectedType === 'TODOS' 
    ? reports 
    : reports.filter(report => report.type === selectedType);

  const getFilterButtonStyle = (type: string) => {
    return selectedType === type 
      ? 'bg-blue-500 border-blue-500' 
      : 'bg-white border-gray-300';
  };

  const getFilterTextStyle = (type: string) => {
    return selectedType === type 
      ? 'text-white font-semibold' 
      : 'text-gray-600';
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <LinearGradient
        colors={['#3b82f6', '#1d4ed8']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        className="pt-12 pb-6 px-6"
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-white">Relatórios</Text>
            <Text className="text-blue-100 mt-1">Análises e dados da oficina</Text>
          </View>
          <View className="w-12 h-12 bg-white/20 rounded-full justify-center items-center">
            <Text className="text-2xl">📋</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Filter Buttons */}
      <View className="px-6 py-4">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {['TODOS', 'OS', 'PCP', 'GERAL'].map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setSelectedType(type as any)}
              className={`px-4 py-2 rounded-full border mr-3 ${getFilterButtonStyle(type)}`}
            >
              <Text className={`text-sm ${getFilterTextStyle(type)}`}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Reports List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {filteredReports.map((report) => (
          <TouchableOpacity
            key={report.id}
            className="bg-white rounded-xl p-4 mb-4 border border-gray-200"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View 
                className="w-12 h-12 rounded-full justify-center items-center mr-4"
                style={{ backgroundColor: `${report.color}20` }}
              >
                <Text className="text-xl">{report.icon}</Text>
              </View>
              
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800 mb-1">
                  {report.title}
                </Text>
                <Text className="text-sm text-gray-600 mb-2">
                  {report.description}
                </Text>
                <View className="flex-row items-center">
                  <View 
                    className="px-2 py-1 rounded-full mr-2"
                    style={{ backgroundColor: `${report.color}20` }}
                  >
                    <Text 
                      className="text-xs font-medium"
                      style={{ color: report.color }}
                    >
                      {report.type}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View className="ml-2">
                <Text className="text-gray-400 text-lg">›</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-6xl mb-4">📊</Text>
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Nenhum relatório encontrado
          </Text>
          <Text className="text-gray-600 text-center">
            Não há relatórios disponíveis para o filtro selecionado.
          </Text>
        </View>
      )}
    </View>
  );
};

export default RelatoriosScreen;