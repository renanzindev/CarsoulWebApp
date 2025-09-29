import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { PostNotificationCard } from './cards/PostNotificationCard';

interface PostNotificationCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconClass: string;
  backgroundImage?: string;
  backgroundColor?: string;
  route?: string;
}

interface PostNotificationCardsProps {
  cards?: PostNotificationCardData[];
}

export const PostNotificationCards: React.FC<PostNotificationCardsProps> = ({
  cards = [
    {
      id: 'new-action',
      title: '',
      icon: '',
      iconClass: 'icon-new-action',
      backgroundImage: require('../assets/images/backCardFooter.png'),
      route: '/nova-acao'
    },
    {
      id: 'close-os',
      title: 'Fechar OS',
      icon: '',
      iconClass: 'icon-close-os',
      backgroundImage: require('../assets/images/iconFecharOS.png'),
      backgroundColor: 'rgba(94, 94, 94, 1)',
      route: '/os'
    },

    {
      id: 'contacts',
      title: 'Contatos Úteis',
      subtitle: 'Acessar',
      icon: '',
      iconClass: 'icon-contacts',
      backgroundImage: require('../assets/images/iconeContatoUteisFooter.png'),
      backgroundColor: 'rgba(47, 48, 68, 1)',
      route: '/contacts'
    },
  ]
}) => {
  return (
    <View style={styles.postNotificationCards}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.cardsCarousel}
        contentContainerStyle={styles.cardsContainer}
      >
        {cards.map(card => (
          <PostNotificationCard
            key={card.id}
            id={card.id}
            title={card.title}
            icon={card.icon}
            iconClass={card.iconClass}
            backgroundImage={card.backgroundImage}
            backgroundColor={card.backgroundColor}
            route={card.route}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  postNotificationCards: {
    marginTop: 10,
    marginBottom: 10,
  },
  cardsCarousel: {
    marginHorizontal: 15,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingRight: 30, // Extra padding para o último card
  },
});

// Script removido - navegação agora é feita via React Native components

// Estilos removidos - agora usando StyleSheet do React Native