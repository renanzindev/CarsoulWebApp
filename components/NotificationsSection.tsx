import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface Notification {
  id: string;
  icon: string;
  iconClass: string;
  message: string;
}

interface NotificationsSectionProps {
  notifications?: Notification[];
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications = [
    {
      id: 'attendance',
      icon: '•',
      iconClass: 'icon-success',
      message: '0 faltas e 0 atestados este mês'
    },
    {
      id: 'payslip',
      icon: '•',
      iconClass: 'icon-info',
      message: 'Holerite do mês de agosto disponível para download'
    }
  ]
}) => {
  const router = useRouter();

  const handleViewAllNotifications = () => {
    router.push('/notifications');
  };

  return (
    <View style={styles.notifications}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificações</Text>
        <TouchableOpacity onPress={handleViewAllNotifications}>
          <Text style={styles.viewAllButton}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      {notifications.map(notification => (
        <View key={notification.id} style={styles.notificationItem}>
          <Text style={styles.icon}>
            {notification.icon}
          </Text>
          <Text style={styles.message}>{notification.message}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  notifications: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 12,
    padding: 10,
    marginTop: 10,
    marginBottom: 3,
    marginHorizontal: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(70, 70, 70, 1)',
  },
  viewAllButton: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 20,
  },
  message: {
    fontSize: 14,
    color: 'rgba(151, 151, 151, 1)',
    flex: 1,
  },
});