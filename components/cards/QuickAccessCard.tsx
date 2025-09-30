import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface QuickAccessCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconClass: string;
  notificationCount?: number;
  onClick?: (id: string) => void;
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  id,
  title,
  subtitle,
  icon,
  iconClass,
  notificationCount,
  onClick
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onClick) {
      onClick(id);
    }
    
    // Navegação com router do Expo
    switch(id) {
      case 'contacts':
        router.push('/contacts');
        break;
      case 'pcp':
        router.push('/pcp');
        break;
      case 'profile':
        router.push('/profile');
        break;
      case 'reports':
        console.log('Navegando para Relatórios');
        break;
      case 'reports2':
        console.log('Navegando para Relatórios 2');
        break;
      default:
        console.log('Card não implementado:', id);
    }
  };

  const cardStyle = id === 'pcp' ? [styles.accessCard, styles.pcpCard] : 
                    id === 'profile' ? [styles.accessCard, styles.profileCard] :
                    id === 'reports' ? [styles.accessCard, styles.reportsCard] : styles.accessCard;

  return (
    <TouchableOpacity style={cardStyle} onPress={handlePress}>
      {notificationCount && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>{notificationCount}</Text>
        </View>
      )}
      <View style={styles.iconContainer}>
        {id === 'pcp' ? (
          <Image 
            source={require('../../assets/images/iconpcp.png')} 
            style={styles.iconImage} 
          />
        ) : id === 'profile' ? (
          <Image 
            source={require('../../assets/images/iconeperfil.png')} 
            style={styles.iconImage} 
          />
        ) : id === 'reports' ? (
          <Image 
            source={require('../../assets/images/iconreturn.png')} 
            style={styles.iconImage} 
          />
        ) : (
          <Text style={styles.icon}>{icon}</Text>
        )}
      </View>
      <Text style={id === 'pcp' ? [styles.title, styles.pcpTitle] : 
                   id === 'profile' ? [styles.title, styles.profileTitle] :
                   id === 'reports' ? [styles.title, styles.reportsTitle] : styles.title}>{title}</Text>
      <Text style={id === 'pcp' ? [styles.subtitle, styles.pcpSubtitle] : 
                   id === 'profile' ? [styles.subtitle, styles.profileSubtitle] :
                   id === 'reports' ? [styles.subtitle, styles.reportsSubtitle] : styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  accessCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'flex-start',
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
    height: 110,
    justifyContent: 'center',
    width: 110,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#dc3545',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  notificationText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  iconContainer: {
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  icon: {
    fontSize: 25,
  },
  iconImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  pcpCard: {
    backgroundColor: 'rgba(30, 30, 45, 1)',
  },
  pcpTitle: {
    color: '#ffffff',
  },
  pcpSubtitle: {
    color: '#cccccc',
  },
  profileCard: {
    backgroundColor: 'rgba(166, 206, 56, 1)',
  },
  profileTitle: {
    color: '#ffffff',
  },
  profileSubtitle: {
    color: '#ffffff',
  },
  reportsCard: {
    backgroundColor: 'rgba(128, 128, 143, 1)',
  },
  reportsTitle: {
    color: '#ffffff',
    flexWrap: 'nowrap',
  },
  reportsSubtitle: {
    color: '#ffffff',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
  },
});

// Estilos removidos - agora usando StyleSheet do React Native