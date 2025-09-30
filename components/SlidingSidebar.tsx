import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  Alert,
  PanResponder,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.3; // Reduzido para 30% da tela para melhor integração

// Constantes para o arraste da seta
const MIN_ARROW_POSITION = 100; // Posição mínima (topo)
const MAX_ARROW_POSITION = height - 150; // Posição máxima (fundo)
const DEFAULT_ARROW_POSITION = 280; // Posição padrão
const ARROW_POSITION_KEY = '@sidebar_arrow_position';

interface SlidingSidebarProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export const SlidingSidebar: React.FC<SlidingSidebarProps> = ({ 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [arrowPosition, setArrowPosition] = useState(DEFAULT_ARROW_POSITION);
  const [isDragging, setIsDragging] = useState(false);
  
  const slideAnim = useRef(new Animated.Value(defaultOpen ? SIDEBAR_WIDTH : 0)).current;
  const contentMarginAnim = useRef(new Animated.Value(defaultOpen ? SIDEBAR_WIDTH : 0)).current;
  const rotateAnim = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;
  const arrowPositionAnim = useRef(new Animated.Value(DEFAULT_ARROW_POSITION)).current;
  
  const router = useRouter();
  const { logout } = useAuth();

  // Função para carregar a posição salva da seta
  const loadArrowPosition = async () => {
    try {
      const savedPosition = await AsyncStorage.getItem(ARROW_POSITION_KEY);
      if (savedPosition !== null) {
        const position = parseInt(savedPosition, 10);
        const clampedPosition = Math.max(MIN_ARROW_POSITION, Math.min(MAX_ARROW_POSITION, position));
        setArrowPosition(clampedPosition);
        arrowPositionAnim.setValue(clampedPosition);
      }
    } catch (error) {
      console.log('Erro ao carregar posição da seta:', error);
    }
  };

  // Função para salvar a posição da seta
  const saveArrowPosition = async (position: number) => {
    try {
      await AsyncStorage.setItem(ARROW_POSITION_KEY, position.toString());
    } catch (error) {
      console.log('Erro ao salvar posição da seta:', error);
    }
  };

  const handleLogout = () => {
    setIsOpen(false);
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair do aplicativo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              console.log('Usuário fez logout');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
              Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
            }
          },
        },
      ]
    );
  };

  const navigateToPage = (page: string) => {
    setIsOpen(false);
    switch (page) {
      case 'dashboard':
        router.push('/(tabs)');
        break;
      case 'conquistas':
        router.push('/(tabs)/conquistas');
        break;
      case 'pcp':
        router.push('/(tabs)/pcp');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const toggleSidebar = () => {
    const sidebarValue = isOpen ? 0 : SIDEBAR_WIDTH;
    const contentMarginValue = isOpen ? 0 : SIDEBAR_WIDTH;
    const rotateValue = isOpen ? 0 : 1;

    // Animação da sidebar
    Animated.timing(slideAnim, {
      toValue: sidebarValue,
      duration: 300,
      useNativeDriver: false, // Mudado para false para permitir animação de width
    }).start();

    // Animação da margem do conteúdo
    Animated.timing(contentMarginAnim, {
      toValue: contentMarginValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Animação da rotação da seta
    Animated.timing(rotateAnim, {
      toValue: rotateValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  // PanResponder para arrastar a seta
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Ativa o pan responder se o movimento vertical for maior que horizontal
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 10;
      },
      onPanResponderGrant: () => {
        setIsDragging(true);
        // Adiciona feedback visual quando começa a arrastar
        arrowPositionAnim.setOffset(arrowPosition);
        arrowPositionAnim.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Calcula a nova posição com limites
        const newPosition = Math.max(
          MIN_ARROW_POSITION - arrowPosition,
          Math.min(MAX_ARROW_POSITION - arrowPosition, gestureState.dy)
        );
        arrowPositionAnim.setValue(newPosition);
      },
      onPanResponderRelease: (evt, gestureState) => {
        setIsDragging(false);
        // Calcula a posição final
        const finalPosition = Math.max(
          MIN_ARROW_POSITION,
          Math.min(MAX_ARROW_POSITION, arrowPosition + gestureState.dy)
        );
        
        // Remove o offset e define a posição final
        arrowPositionAnim.flattenOffset();
        
        // Anima para a posição final
        Animated.spring(arrowPositionAnim, {
          toValue: finalPosition,
          useNativeDriver: false,
          tension: 100,
          friction: 8,
        }).start();
        
        // Atualiza o estado e salva a posição
        setArrowPosition(finalPosition);
        saveArrowPosition(finalPosition);
      },
    })
  ).current;

  // useEffect para carregar a posição salva
  useEffect(() => {
    loadArrowPosition();
  }, []);

  // Interpolação para rotação da seta
  const arrowRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View className="flex-1">
      <View className="flex-1 flex-row">
        {/* Sidebar */}
        <Animated.View
          className="h-full bg-white border-r border-gray-200 shadow-lg overflow-hidden"
          style={{
            width: slideAnim,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 8,
          }}
        >
          <ScrollView className="flex-1 p-0" showsVerticalScrollIndicator={false}>
            <View className="flex-1">
              {/* Header com gradiente */}
              <LinearGradient
                colors={['#FFFFFF', '#A6CE38']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                className="p-5 rounded-b-[20px] mb-5"
              >
                <View className="flex-row items-center">
                  <View className="w-[50px] h-[50px] rounded-full bg-white/30 justify-center items-center mr-4">
                    <Text className="text-2xl">🏠</Text>
                  </View>
                  <View>
                    <Text className="text-xl font-bold text-gray-800">Menu</Text>
                    <Text className="text-sm text-gray-600 mt-0.5">Navegação</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Menu de navegação */}
              <View className="px-5">
                <TouchableOpacity 
                  className="flex-row items-center py-4 px-4 mb-2.5 bg-gray-50 rounded-xl border border-gray-200"
                  onPress={() => navigateToPage('/')}
                >
                  <View className="w-10 h-10 rounded-full justify-center items-center mr-4 bg-blue-500">
                    <Text className="text-lg text-white">🏠</Text>
                  </View>
                  <Text className="flex-1 text-base font-medium text-gray-800">Dashboard</Text>
                  <Text className="text-lg text-gray-400 font-bold">›</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-row items-center py-4 px-4 mb-2.5 bg-gray-50 rounded-xl border border-gray-200"
                  onPress={() => navigateToPage('/conquistas')}
                >
                  <View className="w-10 h-10 rounded-full justify-center items-center mr-4 bg-emerald-500">
                    <Text className="text-lg text-white">🏆</Text>
                  </View>
                  <Text className="flex-1 text-base font-medium text-gray-800">Conquistas</Text>
                  <Text className="text-lg text-gray-400 font-bold">›</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-row items-center py-4 px-4 mb-2.5 bg-gray-50 rounded-xl border border-gray-200"
                  onPress={() => navigateToPage('/pcp')}
                >
                  <View className="w-10 h-10 rounded-full justify-center items-center mr-4 bg-amber-500">
                    <Text className="text-lg text-white">📊</Text>
                  </View>
                  <Text className="flex-1 text-base font-medium text-gray-800">PCP</Text>
                  <Text className="text-lg text-gray-400 font-bold">›</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-row items-center py-4 px-4 mb-2.5 bg-gray-50 rounded-xl border border-gray-200"
                  onPress={() => navigateToPage('/notifications')}
                >
                  <View className="w-10 h-10 rounded-full justify-center items-center mr-4 bg-violet-500">
                    <Text className="text-lg text-white">🔔</Text>
                  </View>
                  <Text className="flex-1 text-base font-medium text-gray-800">Notificações</Text>
                  <Text className="text-lg text-gray-400 font-bold">›</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-row items-center py-4 px-4 mb-2.5 bg-gray-50 rounded-xl border border-gray-200"
                  onPress={() => navigateToPage('/contacts')}
                >
                  <View className="w-10 h-10 rounded-full justify-center items-center mr-4 bg-cyan-500">
                    <Text className="text-lg text-white">👥</Text>
                  </View>
                  <Text className="flex-1 text-base font-medium text-gray-800">Contatos</Text>
                  <Text className="text-lg text-gray-400 font-bold">›</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-row items-center py-4 px-4 mb-2.5 bg-gray-50 rounded-xl border border-gray-200"
                  onPress={() => navigateToPage('/os')}
                >
                  <View className="w-10 h-10 rounded-full justify-center items-center mr-4 bg-red-500">
                    <Text className="text-lg text-white">🔧</Text>
                  </View>
                  <Text className="flex-1 text-base font-medium text-gray-800">OS</Text>
                  <Text className="text-lg text-gray-400 font-bold">›</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-row items-center py-4 px-4 mb-2.5 bg-gray-50 rounded-xl border border-gray-200"
                  onPress={handleLogout}
                >
                  <View className="w-10 h-10 rounded-full justify-center items-center mr-4 bg-red-500">
                    <Text className="text-lg text-white">🚪</Text>
                  </View>
                  <Text className="flex-1 text-base font-medium text-gray-800">Sair</Text>
                  <Text className="text-lg text-gray-400 font-bold">›</Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View className="p-6 border-t border-gray-200">
                <Text className="text-xs text-gray-400 text-center">Versão 1.0.0</Text>
              </View>
            </View>
          </ScrollView>
        </Animated.View>

        {/* Main Content Area */}
        <Animated.View
          className="flex-1 bg-slate-50"
          style={{
            marginLeft: contentMarginAnim,
          }}
        >
          {children}
        </Animated.View>
      </View>

      {/* Toggle Button - Arrastável verticalmente */}
      <Animated.View
        className="absolute z-[1000]"
        style={{
          top: arrowPositionAnim,
          right: 20,
        }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={toggleSidebar}
          className={`w-[50px] h-[50px] bg-white border border-gray-200 rounded-full justify-center items-center ${
            isDragging ? 'bg-sky-50 border-sky-500' : ''
          }`}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDragging ? 0.3 : 0.2,
            shadowRadius: isDragging ? 8 : 6,
            elevation: isDragging ? 12 : 8,
            transform: isDragging ? [{ scale: 1.1 }] : [{ scale: 1 }],
          }}
          activeOpacity={0.8}
        >
          <Animated.View
            className="justify-center items-center"
            style={{
              transform: [{ rotate: arrowRotation }],
            }}
          >
            <Text className="text-xl font-bold text-gray-800 leading-5">{isOpen ? '◀' : '▶'}</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};