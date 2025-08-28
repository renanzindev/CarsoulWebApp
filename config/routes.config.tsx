import React from 'react';
import { View } from 'react-native';

// Importações dos componentes das telas
import { NotificationsSection } from '@/components/NotificationsSection';
import { PerformanceSection } from '@/components/PerformanceSection';
import { PostNotificationCards } from '@/components/PostNotificationCards';
import { QuickAccessCards } from '@/components/QuickAccessCards';
import { ContactsSection } from '@/components/ContactsSection';
import { OSClosureScreen } from '@/components/OSClosureScreen';

/**
 * Interface para definir a configuração de uma página
 * Layout principal (Header, ProfileCard) agora é gerenciado pelo Main.tsx
 */
export interface PageConfig {
  /** Componente principal da página */
  component: React.ComponentType;
  /** Se deve usar ScrollView interno no Outlet */
  useScrollView?: boolean;
  /** Props adicionais para o ScrollView interno */
  scrollViewProps?: any;
  /** Título da página (opcional) */
  title?: string;
  /** Descrição da página (opcional) */
  description?: string;
}

/**
 * Componente da página Dashboard
 * ProfileCard agora está fixo no Main.tsx, então removido daqui
 */
const DashboardPage: React.FC = () => (
  <>
    <QuickAccessCards />
    <PerformanceSection />
    <NotificationsSection />
    <PostNotificationCards />
  </>
);

/**
 * Configurações padrão para diferentes tipos de página
 * Header e ProfileCard agora são fixos no Main.tsx
 */
export const DEFAULT_CONFIGS = {
  dashboard: {
    useScrollView: false, // Scroll agora é gerenciado pelo Main.tsx
    scrollViewProps: {}
  },
  standard: {
    useScrollView: false,
    scrollViewProps: {}
  },
  fullscreen: {
    useScrollView: false,
    scrollViewProps: {}
  }
} as const;

/**
 * Mapeamento de rotas para configurações de página
 */
export const ROUTES_CONFIG: Record<string, PageConfig> = {
  // Página principal (Dashboard)
  'index': {
    component: DashboardPage,
    title: 'Dashboard',
    description: 'Painel principal com métricas e informações do usuário',
    ...DEFAULT_CONFIGS.dashboard
  },
  
  // Página de contatos
  'contacts': {
    component: ContactsSection,
    title: 'Contatos',
    description: 'Lista de contatos e informações de comunicação',
    ...DEFAULT_CONFIGS.standard
  },
  
  // Página de fechamento de OS
  'os': {
    component: OSClosureScreen,
    title: 'Fechamento de OS',
    description: 'Tela para fechamento de ordens de serviço',
    ...DEFAULT_CONFIGS.standard
  }
};

/**
 * Classe para gerenciar as configurações de rotas
 */
export class RouteManager {
  private static routes = { ...ROUTES_CONFIG };
  
  /**
   * Registra uma nova rota
   * @param route - Nome da rota
   * @param config - Configuração da página
   */
  static registerRoute(route: string, config: PageConfig): void {
    this.routes[route] = config;
  }
  
  /**
   * Remove uma rota
   * @param route - Nome da rota
   */
  static unregisterRoute(route: string): void {
    delete this.routes[route];
  }
  
  /**
   * Obtém a configuração de uma rota
   * @param route - Nome da rota
   * @returns Configuração da página ou undefined
   */
  static getRouteConfig(route: string): PageConfig | undefined {
    return this.routes[route];
  }
  
  /**
   * Lista todas as rotas registradas
   * @returns Array com nomes das rotas
   */
  static getRegisteredRoutes(): string[] {
    return Object.keys(this.routes);
  }
  
  /**
   * Verifica se uma rota existe
   * @param route - Nome da rota
   * @returns true se a rota existe
   */
  static routeExists(route: string): boolean {
    return route in this.routes;
  }
  
  /**
   * Obtém todas as configurações de rotas
   * @returns Objeto com todas as configurações
   */
  static getAllRoutes(): Record<string, PageConfig> {
    return { ...this.routes };
  }
  
  /**
   * Atualiza uma configuração de rota existente
   * @param route - Nome da rota
   * @param updates - Atualizações parciais da configuração
   */
  static updateRoute(route: string, updates: Partial<PageConfig>): void {
    if (this.routeExists(route)) {
      this.routes[route] = { ...this.routes[route], ...updates };
    }
  }
  
  /**
   * Reseta as rotas para a configuração padrão
   */
  static resetToDefault(): void {
    this.routes = { ...ROUTES_CONFIG };
  }
}

/**
 * Hook personalizado para acessar informações de rota
 */
export const useRouteInfo = (route: string) => {
  const config = RouteManager.getRouteConfig(route);
  
  return {
    config,
    exists: RouteManager.routeExists(route),
    title: config?.title,
    description: config?.description,
    useScrollView: config?.useScrollView ?? false
  };
};

export default ROUTES_CONFIG;