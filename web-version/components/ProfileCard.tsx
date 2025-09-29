import React from 'react';

// Tipos para melhor tipagem
export interface Medal {
  icon: string;
  isActive: boolean;
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
}

// Dados padrão do componente
const DEFAULT_MEDALS: Medal[] = [
  { icon: "🏆", isActive: true, title: "Troféu de Excelência" },
  { icon: "🥇", isActive: true, title: "Medalha de Ouro" },
  { icon: "🥈", isActive: false, title: "Medalha de Prata" }
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
  textColor = 'text-white'
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
  
  return (
    <div className={`${backgroundColor} rounded-xl mx-1 ${variantStyles.container}`}>
      <div className={`flex items-center ${variantStyles.minHeight}`}>
        {/* Lado Esquerdo - Informações do Usuário */}
        <div className={`flex-1 ${variantStyles.spacing}`}>
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-lime-500 rounded flex justify-center items-center mr-2">
              <span className="text-white text-xs font-bold">{displayInitials}</span>
            </div>
            <div className="flex-1">
              <h3 className={`${textColor} text-xs font-bold`}>{userName}</h3>
              <p className="text-gray-400 text-[10px]">{userRole}</p>
            </div>
          </div>
          
          {/* Medalhas */}
          {variant !== 'compact' && (
            <div className="flex justify-start mt-1">
              {medals.map((medal, index) => (
                <div 
                  key={index} 
                  className={`w-7 h-7 rounded-full flex justify-center items-center mx-0.5 ${
                    medal.isActive ? 'bg-lime-500' : 'bg-gray-600'
                  }`}
                  title={medal.title}
                >
                  <span className="text-lg">{medal.icon}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Barra Divisória */}
        {showDivider && variant !== 'compact' && (
          <div className="w-px h-16 bg-gray-400 mx-3" />
        )}
        
        {/* Lado Direito - Texto Motivacional */}
        {variant !== 'compact' && (
          <div className={`flex-1 ${variantStyles.spacing} flex justify-center items-center`}>
            <p className="text-gray-400 text-[10px] text-left leading-5">
              {motivationText}
            </p>
          </div>
        )}
      </div>
    </div>
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
  createMedal: (icon: string, isActive: boolean = true, title?: string): Medal => ({
    icon,
    isActive,
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