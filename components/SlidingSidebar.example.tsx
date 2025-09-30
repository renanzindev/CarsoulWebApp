import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SlidingSidebar } from './SlidingSidebar';

/**
 * Exemplo de uso do componente SlidingSidebar
 * 
 * Este exemplo demonstra como usar o SlidingSidebar tanto com conteúdo padrão
 * quanto com conteúdo personalizado.
 */

// Exemplo 1: Uso básico com conteúdo padrão
export const BasicSlidingSidebarExample: React.FC = () => {
  return (
    <View style={styles.container}>
      <SlidingSidebar>
        {/* Conteúdo padrão será exibido automaticamente */}
      </SlidingSidebar>
      
      {/* Conteúdo principal da tela */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>Tela Principal</Text>
        <Text style={styles.description}>
          Toque no botão da seta na lateral direita para abrir a sidebar.
        </Text>
      </View>
    </View>
  );
};

// Exemplo 2: Uso com conteúdo personalizado
export const CustomSlidingSidebarExample: React.FC = () => {
  return (
    <View style={styles.container}>
      <SlidingSidebar>
        {/* Conteúdo personalizado */}
        <View style={styles.customContent}>
          <Text style={styles.customTitle}>Menu Personalizado</Text>
          <Text style={styles.customSubtitle}>
            Navegação customizada do aplicativo
          </Text>
          
          <TouchableOpacity style={styles.customMenuItem}>
            <Text style={styles.customMenuText}>🏠 Dashboard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.customMenuItem}>
            <Text style={styles.customMenuText}>👥 Contatos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.customMenuItem}>
            <Text style={styles.customMenuText}>🔧 Configurações</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.customMenuItem}>
            <Text style={styles.customMenuText}>📊 Relatórios</Text>
          </TouchableOpacity>
          
          <View style={styles.customFooter}>
            <Text style={styles.customFooterText}>
              Versão 1.0.0
            </Text>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SlidingSidebar>
      
      {/* Conteúdo principal da tela */}
      <View style={styles.mainContent}>
        <Text style={styles.title}>App com Menu Personalizado</Text>
        <Text style={styles.description}>
          Este exemplo mostra como personalizar completamente o conteúdo da sidebar.
        </Text>
      </View>
    </View>
  );
};

// Exemplo 3: Sidebar aberta por padrão
export const DefaultOpenSidebarExample: React.FC = () => {
  return (
    <View style={styles.container}>
      <SlidingSidebar defaultOpen={true}>
        <View style={styles.customContent}>
          <Text style={styles.customTitle}>Sidebar Aberta</Text>
          <Text style={styles.customSubtitle}>
            Esta sidebar inicia aberta por padrão
          </Text>
          
          <TouchableOpacity style={styles.customMenuItem}>
            <Text style={styles.customMenuText}>📋 Início</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.customMenuItem}>
            <Text style={styles.customMenuText}>📈 Analytics</Text>
          </TouchableOpacity>
        </View>
      </SlidingSidebar>
      
      <View style={styles.mainContent}>
        <Text style={styles.title}>Sidebar Padrão Aberta</Text>
        <Text style={styles.description}>
          Útil para telas onde você quer mostrar o menu imediatamente.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  customContent: {
    flex: 1,
  },
  customTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  customSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  customMenuItem: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  customMenuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  customFooter: {
    marginTop: 'auto',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  customFooterText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});