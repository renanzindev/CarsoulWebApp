import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface QuickAction {
  id: string;
  icon: string;
  title: string;
}

interface QuickActionsSectionProps {
  actions?: QuickAction[];
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  actions = [
    {
      id: 'close-os',
      icon: '✅',
      title: 'Fechar OS'
    }
  ]
}) => {
  return (
    <View style={styles.quickActions}>
      <Text style={styles.title}>Ações Rápidas</Text>
      <View style={styles.actionsGrid}>
        {actions.map(action => (
          <TouchableOpacity key={action.id} style={styles.actionCard}>
            <Text style={styles.icon}>{action.icon}</Text>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quickActions: {
    margin: 20,
  },
  title: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  actionCard: {
    backgroundColor: '#00d4ff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    minWidth: 120,
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a2e',
    textAlign: 'center',
  },
});