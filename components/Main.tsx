import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

// Importações do sistema de configuração de rotas
import { RouteManager, type PageConfig } from '../config/routes.config';
import { useUserProfile } from '../contexts/UserProfileContext';
import { DashboardHeader } from './DashboardHeader';
import { ProfileCard, ProfileCardUtils } from './ProfileCard';

/**
 * Props do componente Main
 */
interface MainProps {
  /** Classe CSS adicional para o container */
  className?: string;
  /** Props adicionais para o container */
  containerProps?: any;
}

/**
 * Componente Outlet - Similar ao <Outlet /> do React Router
 * Renderiza dinamicamente o conteúdo baseado na rota atual
 */
const Outlet: React.FC = () => {
  const segments = useSegments();
  
  // Determina a rota atual
  const currentRoute = segments[segments.length - 1] || 'index';
  
  // Obtém a configuração da página atual usando o RouteManager
  const pageConfig = RouteManager.getRouteConfig(currentRoute);
  
  // Se não encontrar configuração, usa a página index como fallback
  const config = pageConfig || RouteManager.getRouteConfig('index');
  
  // Se ainda não encontrar, usa configuração padrão
  if (!config) {
    console.warn(`Configuração não encontrada para a rota: ${currentRoute}`);
    return (
      <View className="flex-1 justify-center items-center p-4">
        <View className="text-center">
          <Text className="text-lg font-bold text-gray-800 mb-2">Página não encontrada</Text>
          <Text className="text-sm text-gray-600">Rota: {currentRoute}</Text>
        </View>
      </View>
    );
  }
  
  const {
    component: PageComponent,
    useScrollView = false,
    scrollViewProps = {}
  } = config;
  
  // Renderiza o conteúdo da página no Outlet
  if (useScrollView) {
    return (
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        <PageComponent />
      </ScrollView>
    );
  }
  
  return <PageComponent />;
};

/**
 * Componente Main - Layout principal com Header e Perfil fixos + Outlet dinâmico
 * 
 * Implementa o conceito de <Outlet /> do React Router:
 * - Header fixo sempre visível no topo
 * - ProfileCard fixo logo abaixo do header
 * - Área de conteúdo dinâmico (Outlet) que muda baseado na rota
 * - Layout responsivo com TailwindCSS
 * - Espaçamento adequado e largura total
 * 
 * @param props - Props do componente Main
 * @returns JSX.Element
 */
export const Main: React.FC<MainProps> = ({ 
  className = '',
  containerProps = {} 
}) => {
  const { profileData, isLoading } = useUserProfile();
  const router = useRouter();

  // Função para navegar para a tela de perfil
  const handleProfilePress = () => {
    router.push('/profile');
  };

  // Mostrar loading enquanto carrega os dados
  if (isLoading) {
    return (
      <View className={`flex-1 bg-gray-100 w-full justify-center items-center ${className}`.trim()}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text className="mt-4 text-gray-600">Carregando perfil...</Text>
      </View>
    );
  }

  // Mostrar erro se não conseguir carregar os dados
  if (!profileData) {
    return (
      <View className={`flex-1 bg-gray-100 w-full justify-center items-center ${className}`.trim()}>
        <Text className="text-red-600 text-center">Erro ao carregar dados do perfil</Text>
      </View>
    );
  }

  // Converter medalhas do JSON para o formato do ProfileCard
  const profileMedals = profileData?.medals?.map(medal => 
    ProfileCardUtils.createMedal(medal.emoji, medal.active, medal.title)
  ) || [];

  return (
    <View 
      className={`flex-1 bg-gray-100 w-full ${className}`.trim()}
      {...containerProps}
    >
      {/* Header fixo - sempre visível no topo */}
      <DashboardHeader />
      
      {/* Espaçamento mínimo entre header e ProfileCard */}
      <View className="h-8 bg-gray-100" />
      
      
      {/* ProfileCard fixo - sempre visível abaixo do header */}
      <View className="px-1 pt-1 pb-0 bg-gray-100">
        <ProfileCard 
          userName={profileData?.user?.userName || ''}
          userRole={profileData?.user?.userRole || ''}
          medals={profileMedals}
          motivationText={profileData?.profile?.motivationText || ''}
          variant={profileData?.profile?.variant as any}
          showDivider={profileData?.profile?.showDivider || false}
          onPress={handleProfilePress}
        />
      </View>
      
      {/* Container principal com scroll apenas para o conteúdo dinâmico */}
      <ScrollView 
        className="flex-1 w-full"
        contentContainerStyle={{ flexGrow: 1, paddingTop: 2, paddingBottom: 25 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Outlet - Área dinâmica onde o conteúdo das rotas é injetado */}
        <View className="flex-1 w-full px-1">
          <Outlet />
        </View>
      </ScrollView>
    </View>
  );
};

/**
 * Utilitários para o componente Main
 * Wrapper para o RouteManager com funcionalidades adicionais
 */
export const MainUtils = {
  /**
   * Registra uma nova configuração de página
   * @param route - Nome da rota
   * @param config - Configuração da página
   */
  registerPage: (route: string, config: PageConfig) => {
    RouteManager.registerRoute(route, config);
  },
  
  /**
   * Remove uma configuração de página
   * @param route - Nome da rota
   */
  unregisterPage: (route: string) => {
    RouteManager.unregisterRoute(route);
  },
  
  /**
   * Obtém a configuração de uma página
   * @param route - Nome da rota
   * @returns Configuração da página ou undefined
   */
  getPageConfig: (route: string): PageConfig | undefined => {
    return RouteManager.getRouteConfig(route);
  },
  
  /**
   * Lista todas as rotas registradas
   * @returns Array com nomes das rotas
   */
  getRegisteredRoutes: (): string[] => {
    return RouteManager.getRegisteredRoutes();
  },
  
  /**
   * Verifica se uma rota existe
   * @param route - Nome da rota
   * @returns true se a rota existe
   */
  routeExists: (route: string): boolean => {
    return RouteManager.routeExists(route);
  },
  
  /**
   * Atualiza uma configuração de rota existente
   * @param route - Nome da rota
   * @param updates - Atualizações parciais da configuração
   */
  updateRoute: (route: string, updates: Partial<PageConfig>) => {
    RouteManager.updateRoute(route, updates);
  },
  
  /**
   * Obtém informações básicas de uma rota
   * @param route - Nome da rota
   * @returns Informações da rota
   */
  getRouteInfo: (route: string) => {
    const config = RouteManager.getRouteConfig(route);
    return {
      config,
      exists: RouteManager.routeExists(route),
      title: config?.title,
      description: config?.description,
      useScrollView: config?.useScrollView ?? false
    };
  }
};

export default Main;