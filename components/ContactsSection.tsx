import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  icon: string;
  description: string;
  role: string;
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
      description: "Coordenador Produção",
      role: "Coordenador Produção"
    },
    {
      id: 2,
      name: "Gilene Soares",
      phone: "31 99807-1705",
      email: "gilene@carsoul.com.br",
      icon: "👨‍💼",
      description: "Supervisor Tecnico",
      role: "Supervisor Técnico"
    },
    {
      id: 3,
      name: "David Douglas",
      phone: "31 91234-5678",
      email: "david@carsoul.com.br",
      icon: "👨‍💼",
      description: "Supervisor Operacional I",
      role: "Supervisor Operacional I"
    },
    {
      id: 4,
      name: "Alex Adriano",
      phone: "31 98267-1280",
      email: "alex@carsoul.com.br",
      icon: "👩‍💼",
      description: "PCP",
      role: "PCP"
    },
    {
      id: 5,
      name: "Renan Oliveira",
      phone: "31 99934-1098",
      email: "tic@carsoul.com.br",
      icon: "👨‍💼",
      description: "TI",
      role: "TI"
    },
    {
      id: 7,
      name: "Jessica",
      phone: "31 99724-2083",
      email: "pessoal@carsoul.com.br",
      icon: "👩‍💼",
      description: "Departamento Pessoal",
      role: "Departamento Pessoal"
    }
  ];

  const contactsList = contacts || defaultContacts;

  const handlePhoneCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleCall = (phone: string) => {
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
    <View className="rounded-xl m-2 px-4 bg-white">
      <View className="items-center mb-6">
        <Text className="text-2xl font-bold m-2 text-gray-900">📞 Contatos Úteis</Text>
      </View>
      
      <View className="mb-6">
        {contactsList.map(contact => (
          <View key={contact.id} className="bg-white rounded-xl p-4 mb-4 shadow-lg border border-white flex-row items-center">
            <View className="w-12 h-12 bg-gray-100 rounded-full mr-3 items-center justify-center">
              <Text className="text-lg font-bold text-gray-900">{contact.name.charAt(0)}</Text>
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-sm font-semibold text-gray-900 mb-0.5">{contact.name}</Text>
              <Text className="text-xs text-gray-600 mb-1">{contact.role}</Text>
              <Text className="text-xs text-gray-600 font-medium">{contact.phone}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity 
                className="w-8 h-8 rounded-full items-center justify-center shadow-md bg-green-500"
                onPress={() => handleCall(contact.phone)}
              >
                <Text className="text-sm text-white">📞</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="w-8 h-8 rounded-full items-center justify-center shadow-md bg-green-400"
                onPress={() => handleWhatsApp(contact.phone)}
              >
                <Text className="text-sm text-white">💬</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};