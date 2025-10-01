import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
    <View className="bg-gray-50 border border-gray-300 rounded-xl p-2.5 mt-2.5 mb-0 mx-3.5">
      <View className="flex-row justify-between items-center mb-1.5">
        <Text className="text-base font-semibold text-gray-700">Notificações</Text>
        <TouchableOpacity onPress={handleViewAllNotifications}>
          <Text className="text-sm text-slate-800 font-medium">Ver todas</Text>
        </TouchableOpacity>
      </View>
      {notifications.map(notification => (
        <View key={notification.id} className="flex-row items-center mb-2.5">
          <Text className="w-5 h-5 text-center text-xs leading-5">
            {notification.icon}
          </Text>
          <Text className="text-sm text-gray-400 flex-1">{notification.message}</Text>
        </View>
      ))}
    </View>
  );
};