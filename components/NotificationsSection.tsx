import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  return (
    <View style={styles.notifications}>
      <Text style={styles.title}>Notificações</Text>
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
  title: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(70, 70, 70, 1)',
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