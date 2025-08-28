# Componente Main Dinâmico

O componente `Main` é um **container dinâmico puro** que funciona com o Expo Router. Ele **não contém código fixo de páginas**, apenas um espaço que é preenchido de acordo com a rota ativa.

## 🚀 Características

- **Container Dinâmico**: Espaço vazio que é preenchido baseado na rota atual
- **Sem Código Fixo**: Não possui conteúdo hardcoded, apenas renderiza componentes configurados
- **Sistema de Configuração**: Usa configuração externa para determinar o que renderizar
- **Gerenciamento de Layout**: Controla apenas estrutura (headers, scroll, estilos)
- **Fallback Inteligente**: Exibe página de erro quando a rota não é encontrada
- **Tipagem Completa**: Totalmente tipado com TypeScript
- **Expo Router**: Integração nativa com o sistema de roteamento do Expo

## 💡 Conceito Principal

O componente `Main` funciona como um **container vazio e inteligente**:

- ✅ **É apenas um espaço**: Não possui conteúdo próprio
- ✅ **Detecta a rota**: Usa Expo Router para saber onde está
- ✅ **Busca a configuração**: Consulta o sistema de rotas
- ✅ **Renderiza dinamicamente**: Exibe o componente configurado para aquela rota
- ✅ **Gerencia layout**: Aplica headers, scroll e estilos conforme necessário

**Analogia**: É como um "quadro vazio" que muda de "pintura" baseado em qual "sala" (rota) você está.

## 📁 Estrutura de Arquivos

```
components/
├── Main.tsx                 # Container dinâmico (sem código fixo)
config/
├── routes.config.tsx        # Configurações de rotas e componentes
```

## 🛠️ Instalação e Uso

### Uso Básico

```tsx
import { Main } from '@/components/Main';

export default function Screen() {
  return <Main />;
}
```

### Uso com Props Customizadas

```tsx
import { Main } from '@/components/Main';

export default function Screen() {
  return (
    <Main 
      className="custom-class"
      containerProps={{ testID: 'main-container' }}
    />
  );
}
```

## ⚙️ Configuração de Rotas

### Estrutura de Configuração

```tsx
interface PageConfig {
  component: React.ComponentType;     // Componente da página
  showHeader?: boolean;               // Mostrar header do dashboard
  useScrollView?: boolean;            // Usar ScrollView
  containerClassName?: string;        // Classes CSS do container
  scrollViewProps?: any;              // Props do ScrollView
  title?: string;                     // Título da página
  description?: string;               // Descrição da página
}
```

### Configurações Padrão

```tsx
// Dashboard (com header e scroll)
DEFAULT_CONFIGS.dashboard = {
  showHeader: true,
  useScrollView: true,
  containerClassName: "flex-1 bg-gray-100",
  scrollViewProps: {
    contentContainerStyle: { paddingTop: 10, paddingBottom: 30 },
    showsVerticalScrollIndicator: false
  }
}

// Página padrão (sem header, sem scroll)
DEFAULT_CONFIGS.standard = {
  showHeader: false,
  useScrollView: false,
  containerClassName: "flex-1 bg-gray-100"
}

// Tela cheia (sem header, sem scroll, sem background)
DEFAULT_CONFIGS.fullscreen = {
  showHeader: false,
  useScrollView: false,
  containerClassName: "flex-1"
}
```

## 🔧 Gerenciamento de Rotas

### RouteManager

```tsx
import { RouteManager } from '@/config/routes.config';

// Registrar nova rota
RouteManager.registerRoute('nova-rota', {
  component: NovoComponente,
  showHeader: true,
  useScrollView: false,
  title: 'Nova Página'
});

// Verificar se rota existe
const exists = RouteManager.routeExists('nova-rota');

// Obter configuração
const config = RouteManager.getRouteConfig('nova-rota');

// Atualizar rota existente
RouteManager.updateRoute('nova-rota', {
  showHeader: false
});

// Remover rota
RouteManager.unregisterRoute('nova-rota');
```

### MainUtils

```tsx
import { MainUtils } from '@/components/Main';

// Wrapper para RouteManager com funcionalidades extras
MainUtils.registerPage('pagina', config);
MainUtils.routeExists('pagina');
MainUtils.getPageConfig('pagina');
MainUtils.updateRoute('pagina', updates);
```

## 📱 Rotas Configuradas

### Dashboard (`index`)
- **Componente**: DashboardPage (ProfileCard + QuickAccess + Performance + Notifications)
- **Header**: Sim (DashboardHeader)
- **Scroll**: Sim
- **Estilo**: Background cinza claro

### Contatos (`contacts`)
- **Componente**: ContactsSection
- **Header**: Não
- **Scroll**: Não
- **Estilo**: Background cinza claro

### Fechamento de OS (`os`)
- **Componente**: OSClosureScreen
- **Header**: Não
- **Scroll**: Não
- **Estilo**: Background cinza claro

## 🎯 Exemplos Avançados

### Criando Nova Página

```tsx
// 1. Criar o componente
const MinhaNovaPage: React.FC = () => (
  <View className="p-4">
    <Text className="text-xl font-bold">Minha Nova Página</Text>
  </View>
);

// 2. Registrar a rota
RouteManager.registerRoute('minha-nova-pagina', {
  component: MinhaNovaPage,
  title: 'Minha Nova Página',
  description: 'Descrição da nova página',
  ...DEFAULT_CONFIGS.standard
});

// 3. Criar arquivo de tela
export default function MinhaNovaScreen() {
  return <Main />;
}
```

### Página com Configuração Customizada

```tsx
RouteManager.registerRoute('pagina-especial', {
  component: ComponenteEspecial,
  showHeader: true,
  useScrollView: true,
  containerClassName: "flex-1 bg-blue-50",
  scrollViewProps: {
    contentContainerStyle: { padding: 20 },
    bounces: false
  },
  title: 'Página Especial',
  description: 'Uma página com configurações especiais'
});
```

## 🔍 Hook useRouteInfo

```tsx
import { useRouteInfo } from '@/config/routes.config';

function MeuComponente() {
  const routeInfo = useRouteInfo('index');
  
  console.log(routeInfo.title);        // "Dashboard"
  console.log(routeInfo.exists);       // true
  console.log(routeInfo.showHeader);   // true
  console.log(routeInfo.config);       // Configuração completa
}
```

## 🚨 Tratamento de Erros

Quando uma rota não é encontrada, o componente Main exibe automaticamente:

```tsx
<View className="flex-1 bg-gray-100 justify-center items-center">
  <View className="text-center">
    <View className="text-lg font-bold text-gray-800 mb-2">
      Página não encontrada
    </View>
    <View className="text-sm text-gray-600">
      Rota: {currentRoute}
    </View>
  </View>
</View>
```

## 🎨 Customização de Estilos

### Container Principal

```tsx
<Main 
  className="custom-background"
  containerProps={{
    style: { backgroundColor: '#custom' }
  }}
/>
```

### Configuração de Rota

```tsx
{
  containerClassName: "flex-1 bg-gradient-to-b from-blue-50 to-white",
  scrollViewProps: {
    contentContainerStyle: {
      paddingHorizontal: 16,
      paddingVertical: 24
    }
  }
}
```

## 🧪 Testes

```tsx
// Testar se rota existe
expect(RouteManager.routeExists('index')).toBe(true);

// Testar configuração
const config = RouteManager.getRouteConfig('index');
expect(config?.showHeader).toBe(true);

// Testar registro de nova rota
RouteManager.registerRoute('test', { component: TestComponent });
expect(RouteManager.routeExists('test')).toBe(true);
```

## 📈 Performance

- **Lazy Loading**: Componentes são carregados apenas quando necessário
- **Memoização**: Configurações são cacheadas para melhor performance
- **Otimização de Re-renders**: Usa React.memo quando apropriado

## 🔄 Migração

### De Telas Individuais para Main

**Antes:**
```tsx
export default function MinhaScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <MeuComponente />
      </ScrollView>
    </View>
  );
}
```

**Depois:**
```tsx
// 1. Registrar a rota
RouteManager.registerRoute('minha-screen', {
  component: MeuComponente,
  showHeader: true,
  useScrollView: true
});

// 2. Simplificar a tela
export default function MinhaScreen() {
  return <Main />;
}
```

## 🤝 Contribuição

1. Mantenha a tipagem completa
2. Documente novas funcionalidades
3. Teste todas as rotas após mudanças
4. Siga os padrões de nomenclatura existentes
5. Mantenha a compatibilidade com Expo Router

## 📚 Recursos Relacionados

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)