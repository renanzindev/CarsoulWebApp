import React from 'react';
import { ScrollView, View } from 'react-native';
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
  cards = []
}) => {
  return (
    <View className="mt-0.5 mb-2.5">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mx-4"
        contentContainerStyle={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingRight: 30
        }}
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