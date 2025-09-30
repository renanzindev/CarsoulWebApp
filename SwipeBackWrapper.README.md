# SwipeBackWrapper

Componente HOC/Wrapper que implementa gesto de navegação swipe-back para React Native com Expo Router.

## 🎯 Funcionalidades

- **iOS**: Utiliza o gesto nativo do React Navigation (`gestureEnabled: true`)
- **Android**: Implementa `PanResponder` para detectar movimento horizontal
- **Threshold configurável**: Sensibilidade do gesto ajustável
- **Controle de habilitação**: Pode ser habilitado/desabilitado conforme necessário
- **Detecção de borda**: Gesto funciona apenas quando iniciado próximo à borda esquerda

## 📱 Compatibilidade

- ✅ iOS (gesto nativo)
- ✅ Android (PanResponder customizado)
- ✅ Expo Router
- ✅ React Navigation

## 🚀 Instalação

O componente já está incluído no projeto. Certifique-se de que o `Stack.Navigator` esteja configurado com:

```tsx
<Stack
  screenOptions={{
    gestureEnabled: true,
    gestureDirection: 'horizontal',
  }}
>
```

## 💻 Uso Básico

### Como Wrapper Component

```tsx
import { SwipeBackWrapper } from '@/components/SwipeBackWrapper';

export default function MinhaScreen() {
  return (
    <SwipeBackWrapper>
      <View style={{ flex: 1 }}>
        {/* Conteúdo da sua tela */}
      </View>
    </SwipeBackWrapper>
  );
}
```

### Como HOC (Higher-Order Component)

```tsx
import { withSwipeBack } from '@/components/SwipeBackWrapper';

const MinhaScreen = () => (
  <View style={{ flex: 1 }}>
    {/* Conteúdo da sua tela */}
  </View>
);

export default withSwipeBack(MinhaScreen);
```

### Com Opções Customizadas

```tsx
<SwipeBackWrapper
  enabled={true}
  swipeThreshold={75}
>
  <View style={{ flex: 1 }}>
    {/* Conteúdo da sua tela */}
  </View>
</SwipeBackWrapper>
```

## ⚙️ Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `children` | `React.ReactNode` | - | Conteúdo a ser envolvido |
| `enabled` | `boolean` | `true` | Habilita/desabilita o gesto |
| `swipeThreshold` | `number` | `50` | Distância mínima em pixels para ativar o gesto |

## 🎮 Hook useSwipeBack

Para controle programático da navegação:

```tsx
import { useSwipeBack } from '@/components/SwipeBackWrapper';

export default function MinhaScreen() {
  const { goBack, canGoBack } = useSwipeBack();

  const handleCustomBack = () => {
    if (canGoBack()) {
      goBack();
    }
  };

  return (
    <SwipeBackWrapper>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={handleCustomBack}>
          <Text>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SwipeBackWrapper>
  );
}
```

## 🔧 Configuração Avançada

### Threshold Personalizado

```tsx
// Gesto mais sensível (30px)
<SwipeBackWrapper swipeThreshold={30}>

// Gesto menos sensível (100px)
<SwipeBackWrapper swipeThreshold={100}>
```

### Desabilitar Temporariamente

```tsx
const [swipeEnabled, setSwipeEnabled] = useState(true);

<SwipeBackWrapper enabled={swipeEnabled}>
  {/* Durante um modal ou formulário, você pode desabilitar */}
</SwipeBackWrapper>
```

## 🎨 Exemplos de Implementação

### Tela Simples

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { SwipeBackWrapper } from '@/components/SwipeBackWrapper';

export default function ExemploScreen() {
  return (
    <SwipeBackWrapper>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Arraste da esquerda para direita para voltar!</Text>
      </View>
    </SwipeBackWrapper>
  );
}
```

### Tela com ScrollView

```tsx
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SwipeBackWrapper } from '@/components/SwipeBackWrapper';

export default function ScrollScreen() {
  return (
    <SwipeBackWrapper>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {/* Conteúdo scrollável */}
        </ScrollView>
      </View>
    </SwipeBackWrapper>
  );
}
```

## 🔍 Como Funciona

### iOS
- Utiliza o gesto nativo do React Navigation
- Configurado através de `gestureEnabled: true` no Stack.Navigator
- Funciona automaticamente sem código adicional

### Android
- Implementa `PanResponder` para detectar gestos
- Detecta movimento horizontal da esquerda para direita
- Verifica se o gesto começou próximo à borda esquerda (< 50px)
- Ativa `navigation.goBack()` quando o movimento excede o threshold

## 🚨 Considerações Importantes

1. **Borda Esquerda**: O gesto só funciona quando iniciado próximo à borda esquerda da tela
2. **Movimento Horizontal**: Apenas movimentos predominantemente horizontais são detectados
3. **Threshold**: O movimento deve exceder o threshold configurado para ativar
4. **Navegação Disponível**: Só funciona quando `navigation.canGoBack()` retorna `true`

## 🐛 Troubleshooting

### Gesto não funciona no Android
- Verifique se o gesto está sendo iniciado próximo à borda esquerda
- Confirme se o threshold não está muito alto
- Certifique-se de que `enabled={true}`

### Gesto não funciona no iOS
- Verifique se `gestureEnabled: true` está configurado no Stack.Navigator
- Confirme se não há outros gestos conflitantes

### Conflito com ScrollView
- O componente é compatível com ScrollView
- O PanResponder detecta corretamente gestos horizontais vs verticais

## 📚 Recursos Relacionados

- [React Navigation Gestures](https://reactnavigation.org/docs/stack-navigator/#gestures)
- [PanResponder Documentation](https://reactnative.dev/docs/panresponder)
- [Expo Router](https://docs.expo.dev/router/introduction/)