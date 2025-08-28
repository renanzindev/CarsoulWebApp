import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  icon: string;
  description: string;
}

interface ContactsSectionProps {
  contacts?: Contact[];
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({ contacts }) => {
  const defaultContacts: Contact[] = [
    {
      id: 1,
      name: "Fabricio Gil",
      phone: "31 99847-6992",
      email: "fabricio.souza@carsoul.com.br",
      icon: "👨‍💼",
      description: "Coordenador Produção"
    },
    {
      id: 2,
      name: "Gilene Soares",
      phone: "31 99807-1705",
      email: "gilene@carsoul.com.br",
      icon: "👨‍💼",
      description: "Supervisor Tecnico"
    },
    {
      id: 3,
      name: "David Douglas",
      phone: "31 91234-5678",
      email: "david@carsoul.com.br",
      icon: "👨‍💼",
      description: "Supervisor Operacional I"
    },
    {
      id: 4,
      name: "Alex Adriano",
      phone: "31 98267-1280",
      email: "alex@carsoul.com.br",
      icon: "👩‍💼",
      description: "PCP"
    },
    {
      id: 5,
      name: "Renan Oliveira",
      phone: "31 99934-1098",
      email: "tic@carsoul.com.br",
      icon: "👨‍💼",
      description: "TI"
    },

    {
      id: 7,
      name: "Jessica",
      phone: "31 99724-2083",
      email: "pessoal@carsoul.com.br",
      icon: "👩‍💼",
      description: "Departamento Pessoal"
    }
  ];

  const contactsList = contacts || defaultContacts;

  const handlePhoneCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    Linking.openURL(`https://wa.me/${cleanPhone}`);
  };

  return (
    <View style={styles.contactsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>📞 Contatos Úteis</Text>
      </View>
      
      <View style={styles.contactsGrid}>
        {contactsList.map(contact => (
          <View key={contact.id} style={styles.contactCard}>
            <Text style={styles.contactIcon}>{contact.icon}</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactDescription}>{contact.description}</Text>
              <View style={styles.contactDetails}>
                <Text style={styles.contactPhone}>📞 {contact.phone}</Text>
              </View>
            </View>
            <View style={styles.contactActions}>
              <TouchableOpacity 
                style={[styles.actionBtn, styles.phoneBtn]} 
                onPress={() => handlePhoneCall(contact.phone)}
              >
                <Text style={styles.actionBtnText}>📞</Text>
              </TouchableOpacity>
              {contact.email && (
                <TouchableOpacity 
                  style={[styles.actionBtn, styles.emailBtn]} 
                  onPress={() => handleEmail(contact.email!)}
                >
                  <Text style={styles.actionBtnText}>✉️</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={[styles.actionBtn, styles.whatsappBtn]} 
                onPress={() => handleWhatsApp(contact.phone)}
              >
                <Text style={styles.actionBtnText}>💬</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactsSection: {
    margin: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  contactsGrid: {
    marginBottom: 24,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    fontSize: 32,
    width: 48,
    height: 48,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 24,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  contactDetails: {
    flexDirection: 'column',
  },
  contactPhone: {
    fontSize: 14,
    color: '#2196f3',
    fontWeight: '500',
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionBtnText: {
    fontSize: 16,
    color: 'white',
  },
  phoneBtn: {
    backgroundColor: '#4caf50',
  },
  emailBtn: {
    backgroundColor: '#2196f3',
  },
  whatsappBtn: {
    backgroundColor: '#25d366',
  },
});