import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ReturnCardProps {
  percentage: number;
  icon?: string;
  iconClass?: string;
}

export const ReturnCard: React.FC<ReturnCardProps> = ({
  percentage,
  icon = '↩',
  iconClass = 'icon-return'
}) => {
  return (
    <View style={styles.returnMetricCard}>
      <View style={styles.returnHeader}>
        <Text style={styles.returnIcon}>{icon}</Text>
      </View>
      <View style={styles.returnVisual}>
        <View style={styles.returnContent}>
          <Text style={styles.returnNumber}>{percentage}%</Text>
          <Text style={styles.returnLabel}>Retorno</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  returnMetricCard: {
    width: 30,
    height: 100,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    padding: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  returnHeader: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  returnIcon: {
    fontSize: 24,
    color: '#FFA726',
  },
  returnVisual: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnContent: {
    textAlign: 'center',
    padding: 8,
    backgroundColor: 'rgba(128, 128, 143, 1)',
    borderRadius: 8,
    alignItems: 'center',
  },
  returnNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(233, 187, 25, 1)',
    marginBottom: 2,
  },
  returnLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
});