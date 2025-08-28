import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LaunchCardProps {
  identifier: string;
  chassi: string;
  location: string;
  product: string;
  date: string;
  time: string;
}

export const LaunchCard: React.FC<LaunchCardProps> = ({
  identifier,
  chassi,
  location,
  product,
  date,
  time
}) => {
  return (
    <View style={styles.launchCard}>
      <View style={styles.launchIdentifier}>
        <Text style={styles.identifierCode}>{identifier}</Text>
      </View>
      <View style={styles.launchContent}>
        <View style={styles.launchInfo}>
          <Text style={styles.chassiInfo}>Chassi: {chassi}</Text>
          <Text style={styles.locationInfo}>{location}</Text>
          <Text style={styles.productInfo}>{product}</Text>
        </View>
        <View style={styles.launchDatetime}>
          <Text style={styles.launchDate}>{date}</Text>
          <Text style={styles.launchTime}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  launchCard: {
    backgroundColor: '#181C32',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2D47',
  },
  launchIdentifier: {
    width: 50,
    height: 50,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  identifierCode: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  launchContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  launchInfo: {
    flex: 1,
  },
  chassiInfo: {
    color: '#A1A5B7',
    fontSize: 12,
    marginBottom: 4,
  },
  locationInfo: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  productInfo: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '500',
  },
  launchDatetime: {
    alignItems: 'flex-end',
  },
  launchDate: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  launchTime: {
    color: '#A1A5B7',
    fontSize: 12,
  },
});