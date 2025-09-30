import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { DashboardHeader } from '../components/DashboardHeader';
import { ProfileCard } from '../components/ProfileCard';
import { useUserProfile } from '../contexts/UserProfileContext';
import { SwipeBackWrapper } from '../components/SwipeBackWrapper';
import { SlidingSidebar } from '../components/SlidingSidebar';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

interface NotificationsByDate {
  date: string;
  notifications: NotificationItem[];
}

export default function NotificationsScreen() {
  const { userProfile } = useUserProfile();
  const router = useRouter();

  // Função para navegar para a tela de perfil
  const handleProfilePress = () => {
    router.push('/profile');
  };

  const notificationData: NotificationsByDate[] = [
    {
      date: "Hoje",
      notifications: [
        {
          id: "1",
          title: "Nova ordem de serviço disponível",
          description: "OS #12345 - Manutenção preventiva",
          time: "14:30",
          isRead: false
        },
        {
          id: "2", 
          title: "Atualização do sistema",
          description: "Nova versão disponível v2.1.0",
          time: "10:15",
          isRead: true
        }
      ]
    },
    {
      date: "Ontem",
      notifications: [
        {
          id: "3",
          title: "OS finalizada com sucesso",
          description: "OS #12340 - Troca de óleo concluída",
          time: "16:45",
          isRead: true
        },
        {
          id: "4",
          title: "Lembrete de manutenção",
          description: "Veículo ABC-1234 próximo da revisão",
          time: "09:20",
          isRead: false
        }
      ]
    }
  ];

  return (
    <SlidingSidebar>
      <SwipeBackWrapper>
      <View style={styles.container}>
        {/* Header fixo - igual ao da tela home */}
        <DashboardHeader />
      
      {/* Container principal com scroll para o conteúdo */}
      <ScrollView 
        style={styles.mainScrollView}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ProfileCard fixo - igual ao da tela home */}
        <View style={styles.profileContainer}>
          <ProfileCard 
            userName={userProfile?.name || "Renan Oliveira"}
            userRole={userProfile?.role || "Desenvolvedor"}
            variant="default"
            backgroundColor="bg-slate-700"
            textColor="text-white"
            onPress={handleProfilePress}
          />
        </View>
        
        {/* Área dinâmica onde o conteúdo das notificações é injetado */}
        <View style={styles.contentArea}>
        {/* Card de notificações */}
        <View style={styles.notificationsCard}>
          <Text style={styles.notificationsTitle}>Notificações</Text>
          
          {notificationData.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.notificationGroup}>
              <Text style={styles.dateTitle}>{group.date}</Text>
              
              {group.notifications.map((notification) => (
                <View key={notification.id} style={styles.notificationItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <View style={styles.notificationContent}>
                    <Text style={[styles.notificationText, !notification.isRead && styles.unreadText]}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationDescription}>{notification.description}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
        </View>
      </ScrollView>
      </View>
    </SwipeBackWrapper>
    </SlidingSidebar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    width: '100%',
  },
  mainScrollView: {
    flex: 1,
    width: '100%',
  },
  profileContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 0,
  },
  contentArea: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  notificationsCard: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 16,
  },
  notificationGroup: {
    marginBottom: 16,
  },
  dateTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a5568',
    marginBottom: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingLeft: 8,
  },
  bulletPoint: {
    color: '#718096',
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#2d3748',
    lineHeight: 20,
    fontWeight: '500',
  },
  unreadText: {
    fontWeight: 'bold',
    color: '#1a202c',
  },
  notificationDescription: {
    fontSize: 13,
    color: '#718096',
    lineHeight: 18,
    marginTop: 2,
  },
  notificationTime: {
    fontSize: 12,
    color: '#a0aec0',
    marginTop: 4,
  },
});

export default NotificationsScreen;