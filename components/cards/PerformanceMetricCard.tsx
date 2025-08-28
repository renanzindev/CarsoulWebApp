import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface PerformanceMetricCardProps {
  icon: string;
  value: string;
  label: string;
  iconClass?: string;
}

export const PerformanceMetricCard: React.FC<PerformanceMetricCardProps> = ({ 
  icon, 
  value, 
  label, 
  iconClass 
}) => {
  const isLogisticaReversa = label === 'Logística Reversa';
  const isFechamentoOS = label === 'Fechamento de OS';
  const isFechamentoOSApp = label === 'Fechamento de OS via app';
  const isPerdaMaterial = label === 'Perda de material';
  
  return (
    <View style={styles.card}>
      {isLogisticaReversa ? (
        <>
          <Image 
            source={require('../../assets/images/iconelogisticareversa.png')} 
            style={styles.iconImage} 
          />
          <Text style={styles.percentageValue}>63%</Text>
          <Text style={styles.title}>{label}</Text>
        </>
      ) : isFechamentoOS ? (
        <>
          <Image 
            source={require('../../assets/images/iconefechamentoOS.png')} 
            style={styles.iconImage} 
          />
          <Text style={styles.fechamentoValue}>{value}</Text>
          <Text style={styles.title}>{label}</Text>
        </>
      ) : isFechamentoOSApp ? (
        <>
          <Image 
            source={require('../../assets/images/iconefechamentoOS.png')} 
            style={styles.iconImage} 
          />
          <Text style={styles.fechamentoAppValue}>{value}</Text>
          <Text style={styles.title}>{label}</Text>
        </>
      ) : isPerdaMaterial ? (
        <>
          <Image 
            source={require('../../assets/images/iconePerdaMaterial.png')} 
            style={styles.iconImage} 
          />
          <Text style={styles.perdaMaterialValue}>{value}</Text>
          <Text style={styles.title}>{label}</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>{label}</Text>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.value}>{value}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
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
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  iconImage: {
    width: 32,
    height: 32,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  percentageValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(220, 103, 103, 1)',
    marginBottom: 8,
  },
  fechamentoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(233, 187, 25, 1)',
    marginBottom: 8,
  },
  fechamentoAppValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(233, 187, 25, 1)',
    marginBottom: 8,
  },
  perdaMaterialValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(166, 206, 56, 1)',
    marginBottom: 8,
  },
});