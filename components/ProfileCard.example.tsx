import React from 'react';
import { View, ScrollView } from 'react-native';
import { ProfileCard, ProfileCardUtils, type Medal } from './ProfileCard';

/**
 * Exemplos de uso do componente ProfileCard
 * 
 * Este arquivo demonstra as diferentes formas de usar o ProfileCard
 * com suas variantes, temas e configurações personalizadas.
 */
export const ProfileCardExamples: React.FC = () => {
  // Medalhas personalizadas
  const customMedals: Medal[] = [
    ProfileCardUtils.createMedal("🏆", true, "Troféu de Excelência"),
    ProfileCardUtils.createMedal("🥇", true, "Medalha de Ouro"),
    ProfileCardUtils.createMedal("🥈", false, "Medalha de Prata"),
    ProfileCardUtils.createMedal("🥉", false, "Medalha de Bronze")
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Exemplo 1: Uso básico */}
      <View className="mb-6">
        <ProfileCard 
          userName="João Silva"
          userRole="Desenvolvedor Frontend"
        />
      </View>

      {/* Exemplo 2: Variante compacta */}
      <View className="mb-6">
        <ProfileCard 
          variant="compact"
          userName="Maria Santos"
          userRole="Designer UX/UI"
        />
      </View>

      {/* Exemplo 3: Variante detalhada */}
      <View className="mb-6">
        <ProfileCard 
          variant="detailed"
          userName="Pedro Oliveira"
          userRole="Tech Lead"
          medals={customMedals}
          motivationText="Continue assim! Você está no caminho certo para alcançar seus objetivos."
        />
      </View>

      {/* Exemplo 4: Tema claro */}
      <View className="mb-6">
        <ProfileCard 
          {...ProfileCardUtils.themes.light}
          userName="Ana Costa"
          userRole="Product Manager"
          medals={[
            ProfileCardUtils.createMedal("⭐", true, "Estrela"),
            ProfileCardUtils.createMedal("💎", true, "Diamante")
          ]}
        />
      </View>

      {/* Exemplo 5: Tema primário */}
      <View className="mb-6">
        <ProfileCard 
          {...ProfileCardUtils.themes.primary}
          userName="Carlos Mendes"
          userRole="DevOps Engineer"
          showDivider={false}
        />
      </View>

      {/* Exemplo 6: Tema de sucesso */}
      <View className="mb-6">
        <ProfileCard 
          {...ProfileCardUtils.themes.success}
          userName="Lucia Ferreira"
          userRole="QA Specialist"
          motivationText="Excelente trabalho! Sua dedicação está fazendo a diferença."
        />
      </View>

      {/* Exemplo 7: Customização completa */}
      <View className="mb-6">
        <ProfileCard 
          userName="Roberto Silva"
          userRole="Arquiteto de Software"
          userInitials="RS"
          backgroundColor="bg-purple-600"
          textColor="text-yellow-200"
          variant="detailed"
          medals={[
            ProfileCardUtils.createMedal("🚀", true, "Inovação"),
            ProfileCardUtils.createMedal("🎯", true, "Precisão"),
            ProfileCardUtils.createMedal("⚡", true, "Velocidade")
          ]}
          motivationText="Sua liderança técnica está inspirando toda a equipe!"
        />
      </View>

      {/* Exemplo 8: Sem medalhas */}
      <View className="mb-6">
        <ProfileCard 
          userName="Fernanda Lima"
          userRole="Estagiária"
          medals={[]}
          motivationText="Bem-vinda à equipe! Estamos ansiosos para ver seu crescimento."
        />
      </View>

      {/* Exemplo 9: Geração automática de iniciais */}
      <View className="mb-6">
        <ProfileCard 
          userName="José da Silva Santos"
          userRole="Consultor Sênior"
          // userInitials será gerado automaticamente como "JS"
        />
      </View>
    </ScrollView>
  );
};

// Exemplo de uso em uma tela
export const ProfileCardDemo = () => {
  return (
    <View className="flex-1">
      <ProfileCardExamples />
    </View>
  );
};

export default ProfileCardDemo;