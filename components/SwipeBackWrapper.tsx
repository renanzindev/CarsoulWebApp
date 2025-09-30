import React from 'react';
import { View, PanResponder, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface SwipeBackWrapperProps {
  children: React.ReactNode;
  enabled?: boolean;
  swipeThreshold?: number;
}

/**
 * HOC/Wrapper component que implementa gesto de swipe-back para navegação
 * 
 * Funcionalidades:
 * - iOS: Utiliza o gesto nativo do React Navigation (gestureEnabled: true)
 * - Android: Implementa PanResponder para detectar movimento horizontal
 * - Threshold configurável para sensibilidade do gesto
 * - Pode ser habilitado/desabilitado conforme necessário
 */
export const SwipeBackWrapper: React.FC<SwipeBackWrapperProps> = ({
  children,
  enabled = true,
  swipeThreshold = 50,
}) => {
  const navigation = useNavigation();

  // No iOS, o gesto nativo já funciona com gestureEnabled: true
  // Implementamos PanResponder apenas para Android
  const panResponder = React.useMemo(() => {
    if (Platform.OS === 'ios' || !enabled) {
      return null;
    }

    return PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Detecta movimento horizontal da esquerda para direita
        const { dx, dy } = gestureState;
        const isHorizontalSwipe = Math.abs(dx) > Math.abs(dy);
        const isSwipeRight = dx > 0;
        const isFromLeftEdge = evt.nativeEvent.pageX < 50; // Começa próximo à borda esquerda
        
        return isHorizontalSwipe && isSwipeRight && isFromLeftEdge;
      },
      onPanResponderGrant: () => {
        // Gesto iniciado
      },
      onPanResponderMove: () => {
        // Durante o movimento
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        
        // Se o movimento horizontal for maior que o threshold, navega para trás
        if (dx > swipeThreshold && navigation.canGoBack()) {
          navigation.goBack();
        }
      },
      onPanResponderTerminate: () => {
        // Gesto cancelado
      },
    });
  }, [enabled, swipeThreshold, navigation]);

  // Se for iOS ou o wrapper estiver desabilitado, retorna apenas os children
  if (Platform.OS === 'ios' || !enabled || !panResponder) {
    return <>{children}</>;
  }

  // Para Android, envolve os children com o PanResponder
  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      {children}
    </View>
  );
};

/**
 * HOC que envolve um componente com funcionalidade de swipe-back
 * 
 * @param WrappedComponent - Componente a ser envolvido
 * @param options - Opções de configuração do swipe-back
 * @returns Componente envolvido com funcionalidade de swipe-back
 */
export const withSwipeBack = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: Omit<SwipeBackWrapperProps, 'children'>
) => {
  const SwipeBackEnhancedComponent: React.FC<P> = (props) => (
    <SwipeBackWrapper {...options}>
      <WrappedComponent {...props} />
    </SwipeBackWrapper>
  );

  SwipeBackEnhancedComponent.displayName = `withSwipeBack(${WrappedComponent.displayName || WrappedComponent.name})`;

  return SwipeBackEnhancedComponent;
};

/**
 * Hook para controlar o swipe-back programaticamente
 * 
 * @returns Objeto com funções para controlar o swipe-back
 */
export const useSwipeBack = () => {
  const navigation = useNavigation();

  return {
    goBack: () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    },
    canGoBack: () => navigation.canGoBack(),
  };
};