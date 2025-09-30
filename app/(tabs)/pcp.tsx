import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ProfileCard, ProfileCardUtils } from '@/components/ProfileCard';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { SwipeBackWrapper } from '@/components/SwipeBackWrapper';
import { SlidingSidebar } from '@/components/SlidingSidebar';

interface Agendamento {
  id: string;
  modelo: string;
  chassi?: string;
  placa?: string;
  cliente: string;
  combo: string;
  data: string;
  hora: string;
  status: 'agendado' | 'cancelado' | 'concluido' | 'pendente';
}

/**
 * Tela de PCP - Agendamentos
 * Tela principal de agendamentos com filtros e lista de agendamentos
 */
export default function PCPScreen() {
  const [filtroAtivo, setFiltroAtivo] = useState<'semana' | 'dia'>('dia');
  const { profileData, isLoading } = useUserProfile();

  // Mostrar loading enquanto carrega os dados
  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#0066cc" />
        <Text className="mt-4 text-gray-600">Carregando perfil...</Text>
      </View>
    );
  }

  // Mostrar erro se não conseguir carregar os dados
  if (!profileData) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <Text className="text-red-600 text-center">Erro ao carregar dados do perfil</Text>
      </View>
    );
  }

  // Converter medalhas do JSON para o formato do ProfileCard
  const profileMedals = profileData.medals.map(medal => 
    ProfileCardUtils.createMedal(medal.emoji, medal.active, medal.title)
  );

  const agendamentos: Agendamento[] = [
    {
      id: '1',
      modelo: 'Corolla',
      chassi: 'MZ587565',
      cliente: 'Jose Antônio',
      combo: 'Combo X',
      data: '15/08',
      hora: '11:30',
      status: 'agendado'
    },
    {
      id: '2',
      modelo: 'Frontier',
      placa: 'PQ25853',
      cliente: 'Carlos Almeida',
      combo: 'Combo X',
      data: '15/08',
      hora: '11:30',
      status: 'cancelado'
    },
    {
      id: '3',
      modelo: 'Panamera',
      chassi: 'RJ549623',
      cliente: 'Sirléia Silva',
      combo: 'Combo X',
      data: '15/08',
      hora: '11:30',
      status: 'concluido'
    },
    {
      id: '4',
      modelo: 'T-Cross',
      chassi: 'MZ587565',
      cliente: 'Raul Ferreira',
      combo: 'Combo X',
      data: '15/08',
      hora: '11:30',
      status: 'concluido'
    },
    {
      id: '5',
      modelo: 'Corolla',
      chassi: 'MZ587565',
      cliente: 'Ana Costa',
      combo: 'Combo X',
      data: '15/08',
      hora: '11:30',
      status: 'pendente'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      agendado: {
        bg: '#e9d5ff',
        text: '#7c3aed',
        label: 'Agendado'
      },
      cancelado: {
        bg: '#fecaca',
        text: '#dc2626',
        label: 'Cancelado'
      },
      concluido: {
        bg: '#bbf7d0',
        text: '#059669',
        label: 'Concluído'
      },
      pendente: {
        bg: '#fecaca',
        text: '#dc2626',
        label: 'Pend. Agendamento'
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <View className="px-2 py-1 rounded-full" style={{ backgroundColor: config.bg }}>
        <Text className="text-xs font-medium" style={{ color: config.text }}>
          {config.label}
        </Text>
      </View>
    );
  };

  return (
    <SlidingSidebar>
      <SwipeBackWrapper>
      <View className="flex-1 bg-gray-100">
        {/* Header fixo - igual ao da tela home */}
        <DashboardHeader />
      
      {/* Container principal com scroll para o conteúdo */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingTop: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ProfileCard fixo - igual ao da tela home */}
        <View className="px-2.5 pt-2.5 pb-0">
          <ProfileCard 
            userName={profileData.user.userName}
            userRole={profileData.user.userRole}
            medals={profileMedals}
            motivationText={profileData.profile.motivationText}
            variant={profileData.profile.variant as any}
            showDivider={profileData.profile.showDivider}
          />
        </View>
        
        {/* Área dinâmica onde o conteúdo dos agendamentos é injetado */}
        <View className="flex-1 px-4 pb-6">

          {/* Seção principal "Sua Agenda" */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-gray-900">Sua Agenda</Text>
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  onPress={() => setFiltroAtivo('semana')}
                  className={`px-4 py-2 rounded-full ${
                    filtroAtivo === 'semana'
                      ? 'bg-slate-800'
                      : 'bg-white border border-gray-300'
                  }`}
                >
                  <Text className={`text-sm font-medium ${
                    filtroAtivo === 'semana' ? 'text-white' : 'text-gray-700'
                  }`}>
                    Semana
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFiltroAtivo('dia')}
                  className={`px-4 py-2 rounded-full ${
                    filtroAtivo === 'dia'
                      ? 'bg-slate-800'
                      : 'bg-white border border-gray-300'
                  }`}
                >
                  <Text className={`text-sm font-medium ${
                    filtroAtivo === 'dia' ? 'text-white' : 'text-gray-700'
                  }`}>
                    Dia
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Subtítulo da agenda */}
            <View className="items-center mb-6">
              <Text className="text-lg font-semibold text-gray-800">Amanhã dia 05/10/2024</Text>
            </View>

            {/* Lista de agendamentos */}
            <View>
              {agendamentos.map((agendamento, index) => (
                <View key={agendamento.id} className={`bg-white rounded-lg shadow-sm p-4 ${index > 0 ? 'mt-4' : ''}`}>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center space-x-4 flex-1">
                      {/* Modelo do carro */}
                      <View className="bg-gray-100 px-3 py-2 rounded-lg">
                        <Text className="text-sm font-medium text-gray-700">{agendamento.modelo}</Text>
                      </View>

                      {/* Dados do cliente */}
                      <View className="flex-1">
                        <Text className="text-sm text-gray-600 mb-1">
                          {agendamento.chassi ? `Chassi: ${agendamento.chassi}` : `Placa: ${agendamento.placa}`}
                        </Text>
                        <Text className="font-semibold text-gray-900 mb-1">{agendamento.cliente}</Text>
                        <Text className="text-sm text-gray-600">{agendamento.combo}</Text>
                      </View>

                      {/* Data e hora */}
                      <View className="items-end">
                        <Text className="text-sm font-medium text-gray-900">{agendamento.data}</Text>
                        <Text className="text-sm text-gray-600">{agendamento.hora}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Status e ações */}
                  <View className="flex-row items-center justify-between mt-3">
                    <View className="flex-row space-x-3">
                      <TouchableOpacity className="p-1">
                        <Ionicons name="eye-outline" size={16} color="#9ca3af" />
                      </TouchableOpacity>
                      <TouchableOpacity className="p-1">
                        <Ionicons name="create-outline" size={16} color="#9ca3af" />
                      </TouchableOpacity>
                    </View>
                    {getStatusBadge(agendamento.status)}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
      </SwipeBackWrapper>
    </SlidingSidebar>
  );
}