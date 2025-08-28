import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { QuickAccessCard } from './cards/QuickAccessCard';

interface QuickAccessCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconClass: string;
  notificationCount?: number;
}

interface QuickAccessCardsProps {
  cards?: QuickAccessCardData[];
}

export const QuickAccessCards: React.FC<QuickAccessCardsProps> = ({
  cards = [
    {
      id: 'pcp',
      title: 'PCP',
      subtitle: 'Acessar',
      icon: '📋',
      iconClass: 'icon-pcp',
      notificationCount: 5
    },
    {
      id: 'profile',
      title: 'Perfil',
      subtitle: 'Acessar',
      icon: '👤',
      iconClass: 'icon-profile',
      notificationCount: 1
    },
    {
      id: 'reports',
      title: 'Relatórios',
      subtitle: 'Acessar',
      icon: '📊',
      iconClass: 'icon-reports',
      notificationCount: 1
    }
  ]
}) => {
  return (
    <View style={styles.quickAccess}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.cardsCarousel}
        contentContainerStyle={styles.cardsContainer}
      >
        {cards.map(card => (
          <QuickAccessCard
            key={card.id}
            id={card.id}
            title={card.title}
            subtitle={card.subtitle}
            icon={card.icon}
            iconClass={card.iconClass}
            notificationCount={card.notificationCount}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  quickAccess: {
    marginVertical: 0,
  },
  cardsCarousel: {
    flexDirection: 'row',
  },
  cardsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
});

// Script removido - navegação agora é feita via React Native components

// Estilos removidos - agora usando StyleSheet do React Native