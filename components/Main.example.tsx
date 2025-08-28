import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Main, MainUtils } from './Main';
import { RouteManager, DEFAULT_CONFIGS } from '@/config/routes.config';

/**
 * Exemplos de uso do componente Main dinâmico
 * 
 * Este arquivo demonstra:
 * - Uso básico do componente Main
 * - Registro de novas rotas
 * - Configurações customizadas
 * - Gerenciamento de rotas
 */

// ============================================================================
// EXEMPLO 1: Componente de página simples
// ============================================================================

const ExampleSimplePage: React.FC = () => (
  <View className="flex-1 justify-center items-center p-4">
    <Text className="text-2xl font-bold text-gray-800 mb-4">
      Página de Exemplo Simples
    </Text>
    <Text className="text-base text-gray-600 text-center">
      Esta é uma página simples criada para demonstrar o uso do componente Main.
    </Text>
  </View>
);

// ============================================================================
// EXEMPLO 2: Componente de página com scroll
// ============================================================================

const ExampleScrollPage: React.FC = () => (
  <>
    {Array.from({ length: 20 }, (_, index) => (
      <View key={index} className="bg-white m-2 p-4 rounded-lg shadow">
        <Text className="text-lg font-semibold text-gray-800">
          Item {index + 1}
        </Text>
        <Text className="text-sm text-gray-600 mt-2">
          Este é um item de exemplo para demonstrar o scroll da página.
        </Text>
      </View>
    ))}
  </>
);

// ============================================================================
// EXEMPLO 3: Componente de página com header customizado
// ============================================================================

const ExampleHeaderPage: React.FC = () => (
  <View className="flex-1 p-4">
    <View className="bg-blue-50 p-4 rounded-lg mb-4">
      <Text className="text-xl font-bold text-blue-800 mb-2">
        Página com Header
      </Text>
      <Text className="text-sm text-blue-600">
        Esta página demonstra o uso do DashboardHeader junto com conteúdo customizado.
      </Text>
    </View>
    
    <View className="bg-green-50 p-4 rounded-lg mb-4">
      <Text className="text-lg font-semibold text-green-800 mb-2">
        Funcionalidades do Main
      </Text>
      <Text className="text-sm text-green-600">
        • Renderização dinâmica baseada na rota\n
        • Sistema de configuração centralizado\n
        • Gerenciamento automático de layout\n
        • Suporte a headers e scroll\n
        • Tipagem completa com TypeScript
      </Text>
    </View>
  </View>
);

// ============================================================================
// EXEMPLO 4: Componente de página interativa
// ============================================================================

const ExampleInteractivePage: React.FC = () => {
  const [counter, setCounter] = React.useState(0);
  
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Página Interativa
      </Text>
      
      <View className="bg-gray-100 p-6 rounded-lg mb-6">
        <Text className="text-lg text-center mb-4">
          Contador: {counter}
        </Text>
        
        <View className="flex-row justify-center gap-4">
          <TouchableOpacity 
            className="bg-blue-500 px-4 py-2 rounded"
            onPress={() => setCounter(c => c + 1)}
          >
            <Text className="text-white font-semibold">+</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-red-500 px-4 py-2 rounded"
            onPress={() => setCounter(c => c - 1)}
          >
            <Text className="text-white font-semibold">-</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-gray-500 px-4 py-2 rounded"
            onPress={() => setCounter(0)}
          >
            <Text className="text-white font-semibold">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text className="text-sm text-gray-600 text-center">
        Esta página demonstra como criar componentes interativos que funcionam perfeitamente com o sistema Main.
      </Text>
    </View>
  );
};

// ============================================================================
// REGISTROS DE ROTAS DE EXEMPLO
// ============================================================================

/**
 * Função para registrar todas as rotas de exemplo
 * Chame esta função para adicionar as rotas de exemplo ao sistema
 */
export const registerExampleRoutes = () => {
  // Página simples sem header nem scroll
  RouteManager.registerRoute('example-simple', {
    component: ExampleSimplePage,
    title: 'Exemplo Simples',
    description: 'Página de exemplo simples sem funcionalidades extras',
    ...DEFAULT_CONFIGS.standard
  });
  
  // Página com scroll interno
  RouteManager.registerRoute('example-scroll', {
    component: ExampleScrollPage,
    title: 'Exemplo com Scroll',
    description: 'Página de exemplo que demonstra o uso de ScrollView',
    useScrollView: true,
    scrollViewProps: {
      contentContainerStyle: { paddingVertical: 10 },
      showsVerticalScrollIndicator: true
    }
  });
  
  // Página sem scroll interno
  RouteManager.registerRoute('example-header', {
    component: ExampleHeaderPage,
    title: 'Exemplo com Header',
    description: 'Página de exemplo simples sem scroll interno',
    useScrollView: false
  });
  
  // Página interativa sem scroll interno (scroll gerenciado pelo Main)
  RouteManager.registerRoute('example-interactive', {
    component: ExampleInteractivePage,
    title: 'Exemplo Interativo',
    description: 'Página de exemplo com componentes interativos',
    ...DEFAULT_CONFIGS.dashboard
  });
};

/**
 * Função para remover todas as rotas de exemplo
 */
export const unregisterExampleRoutes = () => {
  RouteManager.unregisterRoute('example-simple');
  RouteManager.unregisterRoute('example-scroll');
  RouteManager.unregisterRoute('example-header');
  RouteManager.unregisterRoute('example-interactive');
};

// ============================================================================
// EXEMPLOS DE USO DO MAIN UTILS
// ============================================================================

/**
 * Exemplos de como usar o MainUtils
 */
export const MainUtilsExamples = {
  // Verificar se uma rota existe
  checkRoute: (route: string) => {
    const exists = MainUtils.routeExists(route);
    console.log(`Rota '${route}' existe:`, exists);
    return exists;
  },
  
  // Obter configuração de uma rota
  getConfig: (route: string) => {
    const config = MainUtils.getPageConfig(route);
    console.log(`Configuração da rota '${route}':`, config);
    return config;
  },
  
  // Listar todas as rotas registradas
  listRoutes: () => {
    const routes = MainUtils.getRegisteredRoutes();
    console.log('Rotas registradas:', routes);
    return routes;
  },
  
  // Atualizar configuração de uma rota
  updateRoute: (route: string, updates: any) => {
    MainUtils.updateRoute(route, updates);
    console.log(`Rota '${route}' atualizada com:`, updates);
  },
  
  // Registrar nova rota dinamicamente
  registerDynamicRoute: (route: string) => {
    const DynamicComponent: React.FC = () => (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold">Rota Dinâmica: {route}</Text>
        <Text className="text-sm text-gray-600 mt-2">
          Esta rota foi criada dinamicamente!
        </Text>
      </View>
    );
    
    MainUtils.registerPage(route, {
      component: DynamicComponent,
      title: `Rota ${route}`,
      description: `Rota criada dinamicamente: ${route}`,
      ...DEFAULT_CONFIGS.standard
    });
    
    console.log(`Rota dinâmica '${route}' registrada!`);
  }
};

// ============================================================================
// COMPONENTE DE DEMONSTRAÇÃO
// ============================================================================

/**
 * Componente que demonstra o uso do Main em diferentes cenários
 */
export const MainDemo: React.FC = () => {
  React.useEffect(() => {
    // Registrar rotas de exemplo quando o componente monta
    registerExampleRoutes();
    
    // Cleanup: remover rotas quando o componente desmonta
    return () => {
      unregisterExampleRoutes();
    };
  }, []);
  
  return (
    <Main 
      className="demo-main"
      containerProps={{
        testID: 'main-demo-container'
      }}
    />
  );
};

// ============================================================================
// TELAS DE EXEMPLO PARA USO EM APP/(TABS)/
// ============================================================================

/**
 * Exemplo de como criar uma tela que usa o Main
 * Use este padrão em seus arquivos de tela
 */
export const ExampleScreen: React.FC = () => {
  return <Main />;
};

/**
 * Exemplo de tela com props customizadas
 */
export const ExampleCustomScreen: React.FC = () => {
  return (
    <Main 
      className="custom-background"
      containerProps={{
        style: { backgroundColor: '#f0f9ff' }
      }}
    />
  );
};

export default {
  ExampleSimplePage,
  ExampleScrollPage,
  ExampleHeaderPage,
  ExampleInteractivePage,
  registerExampleRoutes,
  unregisterExampleRoutes,
  MainUtilsExamples,
  MainDemo,
  ExampleScreen,
  ExampleCustomScreen
};