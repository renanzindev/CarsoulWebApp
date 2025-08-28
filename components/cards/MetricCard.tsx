import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MetricCardProps {
  icon: string;
  iconClass: string;
  value: string;
  label: string;
  cardClass?: string;
  index?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  iconClass,
  value,
  label,
  cardClass,
  index = 0
}) => {
  const getCardStyle = () => {
    switch (index) {
      case 0:
        return [styles.metricCard, styles.logisticsCard];
      case 1:
        return [styles.metricCard, styles.mobileAppCard];
      case 2:
        return [styles.metricCard, styles.materialLossCard];
      default:
        return styles.metricCard;
    }
  };

  const getIconStyle = () => {
    switch (iconClass) {
      case 'icon-logistics':
        return [styles.icon, styles.iconLogistics];
      case 'icon-mobile-app':
        return [styles.icon, styles.iconMobileApp];
      case 'icon-material-loss':
        return [styles.icon, styles.iconMaterialLoss];
      default:
        return styles.icon;
    }
  };

  return (
    <View style={getCardStyle()}>
      <Text style={getIconStyle()}>{icon}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 12,
    fontSize: 18,
  },
  iconLogistics: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  iconMobileApp: {
    backgroundColor: '#28a745',
    color: 'white',
  },
  iconMaterialLoss: {
    backgroundColor: '#6c757d',
    color: 'white',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 11,
    color: '#6c757d',
    fontWeight: '500',
    textAlign: 'center',
  },
  logisticsCard: {
    backgroundColor: '#e8f5e8',
    borderColor: '#d4edda',
  },
  mobileAppCard: {
    backgroundColor: '#e8f5e8',
    borderColor: '#c3e6cb',
  },
  materialLossCard: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e9ecef',
  },
});