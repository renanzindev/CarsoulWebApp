import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { DashboardHeader } from './DashboardHeader';
import { ProfileCard } from './ProfileCard';
import { LaunchCard } from './cards/LaunchCard';

interface Launch {
  identifier: string;
  chassi: string;
  location: string;
  product: string;
  date: string;
  time: string;
}

interface OSClosureScreenProps {
  header?: {
    logo_text: string;
    user_info: {
      name: string;
      role: string;
      medals: Array<{
        emoji: string;
        active: boolean;
      }>;
      message: string;
    };
  };
  scan_section?: {
    instruction: string;
    input_placeholder: string;
    scan_icon: string;
    button_text: string;
  };
  recent_launches_section?: {
    title: string;
    launches: Launch[];
  };
}

export const OSClosureScreen: React.FC<OSClosureScreenProps> = ({
  header = {
    logo_text: "CarSoul",
    user_info: {
      name: "Christian Junior",
      role: "Detailer CarSoul",
      medals: [
        {emoji: "🏆", active: true},
        {emoji: "🥇", active: true},
        {emoji: "🥈", active: false}
      ],
      message: "Descubra o que falta para você atingir o próximo nível"
    }
  },
  scan_section = {
    instruction: "Escaneie o código do Kit de Películas ou do produto para realizar um fechamento do serviço",
    input_placeholder: "",
    scan_icon: "barcode_scanner",
    button_text: "Consultar Cod."
  },
  recent_launches_section = {
    title: "Últimos lançamentos",
    launches: [
      {
        identifier: "A8",
        chassi: "MZ587565",
        location: "Audi Center",
        product: "Nano Proteção EVO",
        date: "15/08",
        time: "11:30"
      },
      {
        identifier: "C300",
        chassi: "BX787558",
        location: "Carbel SuperCenter",
        product: "Filme Profissional",
        date: "15/08",
        time: "8:37"
      },
      {
        identifier: "TT",
        chassi: "HJ536651",
        location: "Audi Center",
        product: "Nano Proteção 9H",
        date: "12/08",
        time: "11:22"
      }
    ]
  }
}) => {
  const [codeInput, setCodeInput] = useState('');

  const startScanner = () => {
    // Implementar scanner de código
    console.log('Scanner iniciado');
  };

  const consultCode = () => {
    // Implementar consulta de código
    console.log('Consultando código:', codeInput);
  };

  return (
    <ScrollView style={styles.container}>
      <DashboardHeader userName={header.user_info.name} />
      
      <View style={styles.content}>
        <ProfileCard
          userName={header.user_info.name}
          userRole={header.user_info.role}
          medals={header.user_info.medals}
          motivationText={header.user_info.message}
        />
        
        {/* Seção de Escaneamento */}
        <View style={styles.scanSection}>
          <Text style={styles.scanTitle}>Fechamento de OS</Text>
          <Text style={styles.scanInstruction}>{scan_section.instruction}</Text>
          
          <View style={styles.scanInputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.scanInput}
                placeholder="Digite o código ou escaneie"
                value={codeInput}
                onChangeText={setCodeInput}
              />
              <TouchableOpacity style={styles.scanButton} onPress={startScanner}>
                <Text style={styles.scanIcon}>📷</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.consultButton} onPress={consultCode}>
              <Text style={styles.consultButtonText}>{scan_section.button_text}</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Seção de Últimos Lançamentos */}
        <View style={styles.recentLaunchesSection}>
          <Text style={styles.launchesTitle}>{recent_launches_section.title}</Text>
          <View style={styles.launchesList}>
            {recent_launches_section.launches.map((launch, index) => (
              <LaunchCard
                key={index}
                identifier={launch.identifier}
                chassi={launch.chassi}
                location={launch.location}
                product={launch.product}
                date={launch.date}
                time={launch.time}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  content: {
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  scanSection: {
    backgroundColor: '#181C32',
    borderRadius: 16,
    padding: 24,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#2A2D47',
  },
  scanTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  scanInstruction: {
    color: '#A1A5B7',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  scanInputContainer: {
    alignItems: 'center',
    gap: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2139',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2A2D47',
    padding: 4,
    width: '100%',
    maxWidth: 400,
  },
  scanInput: {
    flex: 1,
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    padding: 16,
  },
  scanButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanIcon: {
    fontSize: 24,
    color: 'white',
  },
  consultButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  consultButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  recentLaunchesSection: {
    marginVertical: 20,
  },
  launchesTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingLeft: 4,
  },
  launchesList: {
    gap: 8,
  },
});