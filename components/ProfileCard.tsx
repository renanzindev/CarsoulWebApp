import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Tipos para melhor tipagem
export interface Medal {
  emoji: string;
  active: boolean;
  title?: string;
}

export interface ProfileCardProps {
  userName?: string;
  userRole?: string;
  userInitials?: string;
  medals?: Medal[];
  motivationText?: string;
  variant?: 'default' | 'compact' | 'detailed';
  showDivider?: boolean;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
}

// Dados padrão do componente
const DEFAULT_MEDALS: Medal[] = [
  { emoji: "🏆", active: true, title: "Troféu de Excelência" },
  { emoji: "🥇", active: true, title: "Medalha de Ouro" },
  { emoji: "🥈", active: false, title: "Medalha de Prata" }
];

export const ProfileCard: React.FC<ProfileCardProps> = ({
  userName = "Renan Oliveira",
  userRole = "Desenvolvedor",
  userInitials = "RO",
  medals = DEFAULT_MEDALS,
  motivationText = "Descubra o que falta para você atingir o próximo nível",
  variant = 'default',
  showDivider = true,
  backgroundColor = 'bg-slate-700',
  textColor = 'text-white',
  onPress
}) => {
  // Função para gerar as iniciais automaticamente
  const generateInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayInitials = userInitials || generateInitials(userName);
  
  // Configurações baseadas na variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'p-1.5 mb-0.5',
          minHeight: 'min-h-[60px]',
          spacing: 'pr-2 pl-2'
        };
      case 'detailed':
        return {
          container: 'p-4 mb-2',
          minHeight: 'min-h-[100px]',
          spacing: 'pr-4 pl-4'
        };
      default:
        return {
          container: 'p-2 mb-1',
          minHeight: 'min-h-[86px]',
          spacing: 'pr-3 pl-3'
        };
    }
  };

  const variantStyles = getVariantStyles();
  
  const CardContent = () => (
    <View className={`${backgroundColor} mt-10 mb-2 rounded-xl mx-4 ${variantStyles.container}`}>
      <View className={`flex-row items-center ${variantStyles.minHeight}`}>
        {/* Lado Esquerdo - Informações do Usuário */}
        <View className={`flex-1 ${variantStyles.spacing}`}>
          <View className="flex-row items-center mb-2">
            <View className="w-8 h-8 bg-lime-500 rounded justify-center items-center mr-2">
              <Text className="text-white text-xs font-bold">{displayInitials}</Text>
            </View>
            <View className="flex-1">
              <Text className={`${textColor} text-xs font-bold`}>{userName}</Text>
              <Text className="text-gray-400 text-[10px]">{userRole}</Text>
            </View>
          </View>
          
          {/* Medalhas */}
          {variant !== 'compact' && (
            <View className="flex-row justify-start mt-1">
              {medals.map((medal, index) => (
                <View 
                  key={index} 
                  className={`w-7 h-7 rounded-full justify-center items-center mx-0.5 ${
                    medal.active ? 'bg-lime-500' : 'bg-gray-600'
                  }`}
                >
                  <Text className="text-lg">{medal.emoji}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        
        {/* Barra Divisória */}
        {showDivider && variant !== 'compact' && (
          <View className="w-px h-16 bg-gray-400 mx-3" />
        )}
        
        {/* Lado Direito - Texto Motivacional */}
        {variant !== 'compact' && (
          <View className={`flex-1 ${variantStyles.spacing} justify-center`}>
            <Text className="text-gray-400 text-[10px] text-left leading-5">
              {motivationText}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <CardContent />
    </TouchableOpacity>
  ) : (
    <CardContent />
  );
};

// Funções utilitárias para o ProfileCard
export const ProfileCardUtils = {
  /**
   * Gera iniciais a partir de um nome completo
   */
  generateInitials: (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },

  /**
   * Cria uma medalha com configurações padrão
   */
  createMedal: (emoji: string, active: boolean = true, title?: string): Medal => ({
    emoji,
    active,
    title
  }),

  /**
   * Configurações de tema pré-definidas
   */
  themes: {
    dark: {
      backgroundColor: 'bg-slate-700',
      textColor: 'text-white'
    },
    light: {
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    primary: {
      backgroundColor: 'bg-blue-600',
      textColor: 'text-white'
    },
    success: {
      backgroundColor: 'bg-green-600',
      textColor: 'text-white'
    }
  }
};

/**
 * ProfileCard - Componente de cartão de perfil reutilizável
 * 
 * @description Componente flexível para exibir informações do usuário com medalhas e texto motivacional
 * 
 * @example
 * ```tsx
 * // Uso básico
 * <ProfileCard userName="João Silva" userRole="Desenvolvedor" />
 * 
 * // Com variante compacta
 * <ProfileCard variant="compact" userName="Maria" />
 * 
 * // Com tema personalizado
 * <ProfileCard 
 *   {...ProfileCardUtils.themes.light}
 *   userName="Pedro"
 *   medals={[
 *     ProfileCardUtils.createMedal("🏆", true, "Campeão"),
 *     ProfileCardUtils.createMedal("🥇", false, "Ouro")
 *   ]}
 * />
 * ```
 */