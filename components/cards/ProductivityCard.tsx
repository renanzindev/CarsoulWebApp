import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProductivityCardProps {
  percentage: number;
  target?: number;
}

export const ProductivityCard: React.FC<ProductivityCardProps> = ({ 
  percentage, 
  target = 90 
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Produtividade</Text>
      <Text style={styles.value}>{percentage}%</Text>
      <Text style={styles.subtitle}>Meta: {target}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#A6CE38',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
});