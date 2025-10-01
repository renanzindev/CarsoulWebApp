import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PostNotificationCardProps {
  id: string;
  title: string;
  icon: string;
  iconClass: string;
  backgroundImage?: string;
  backgroundColor?: string;
  route?: string;
  onClick?: (id: string) => void;
}

export const PostNotificationCard: React.FC<PostNotificationCardProps> = ({
  id,
  title,
  icon,
  iconClass,
  backgroundImage,
  backgroundColor,
  route,
  onClick
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onClick) {
      onClick(id);
    }
    
    // Navegação com router do Expo
    if (route) {
      router.push(route as any);
    } else {
      switch(id) {
        case 'contacts':
          router.push('/contacts');
          break;
        case 'close-os':
          console.log('Fechando OS');
          break;

        default:
          console.log('Card não implementado:', id);
      }
    }
  };

  const CardContent = () => {
    const isCloseOS = id === 'close-os';
    const isPerdaMaterial = id === 'perda-material';
    const isNewAction = id === 'new-action';
    const isContacts = id === 'contacts';

    
    return (
      <View style={[isNewAction ? styles.newActionContent : styles.cardContent]}>
        {isCloseOS ? (
          <>
            <Image 
              source={require('../../assets/images/iconFecharOS.png')} 
              style={styles.iconImage} 
            />
            <Text style={[styles.title, (backgroundImage || backgroundColor) && styles.titleWithBackground]}>{title}</Text>
            <Text style={[styles.subtitle, (backgroundImage || backgroundColor) && styles.subtitleWithBackground]}> </Text>
          </>
        ) : isPerdaMaterial ? (
          <>
            <Image 
              source={require('../../assets/images/iconePerdaMaterial.png')} 
              style={styles.iconImage} 
            />
            <Text style={styles.perdaMaterialValue}>12%</Text>
            <Text style={[styles.title, backgroundImage && styles.titleWithBackground]}>{title}</Text>
          </>
        ) : isContacts ? (
          <>
            <Image 
              source={require('../../assets/images/iconeContatoUteisFooter.png')} 
              style={styles.iconImage} 
            />
            <Text style={[styles.title, (backgroundImage || backgroundColor) && styles.titleWithBackground]}>{title}</Text>
            <Text style={[styles.subtitle, (backgroundImage || backgroundColor) && styles.subtitleWithBackground]}> </Text>
          </>
        ) : (
          <>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={[styles.title, backgroundImage && styles.titleWithBackground]}>{title}</Text>
            <Text style={[styles.subtitle, backgroundImage && styles.subtitleWithBackground]}> </Text>
          </>
        )}
      </View>
    );
  };

  if (backgroundImage) {
    const cardStyle = id === 'new-action' ? [styles.accessCard, styles.newActionCard] : styles.accessCard;
    const imageSource = typeof backgroundImage === 'string' ? { uri: backgroundImage } : backgroundImage;
    
    return (
      <TouchableOpacity style={cardStyle} onPress={handlePress}>
        <ImageBackground 
          source={imageSource} 
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={[styles.cardOverlay, backgroundColor && { backgroundColor }]} />
          <CardContent />
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.accessCard, backgroundColor && { backgroundColor }]} onPress={handlePress}>
      <CardContent />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  accessCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: 111,
    height: 125,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e9ecef',
    minHeight: 120,
  },
  newActionCard: {
    width: 111,
    height: 125,
    minHeight: 125,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
    width: 111,
    height: 125,
  },
  backgroundImageStyle: {
    borderRadius: 16,
    resizeMode: 'cover',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 16,
  },
  cardContent: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 15,
    flex: 1,
  },

  newActionContent: {
    padding: 0,
  },
  iconContainer: {
    marginBottom: 8,
  },
  iconContainerLeft: {
    marginRight: 10,
  },
  icon: {
    fontSize: 38,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'left',
  },
  titleWithBackground: {
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
  },
  subtitleWithBackground: {
    color: '#ffffff',
  },
  iconImage: {
    width: 43,
    height: 40,
    marginTop: 8,
    marginBottom: 2,
    resizeMode: 'contain',
  },
  iconImageLeft: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  closeOSValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(233, 187, 25, 1)',
    marginBottom: 8,
  },
  perdaMaterialValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(166, 206, 56, 1)',
    marginBottom: 8,
  },

});

// Estilos removidos - agora usando StyleSheet do React Native