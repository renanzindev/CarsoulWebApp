import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importar dados padrão do JSON
import defaultProfileData from '../data/userProfile.json';

// Tipos para o perfil do usuário
export interface Medal {
  id: string;
  emoji: string;
  active: boolean;
  title: string;
  description: string;
  earnedDate: string | null;
}

export interface User {
  id: string;
  userName: string;
  userRole: string;
  userInitials: string;
  email: string;
  avatar: string | null;
  department: string;
  level: string;
  joinDate: string;
}

export interface ProfileConfig {
  motivationText: string;
  variant: 'default' | 'compact' | 'detailed';
  showDivider: boolean;
  backgroundColor: string;
  textColor: string;
}

export interface UserStats {
  totalMedals: number;
  activeMedals: number;
  completedProjects: number;
  currentLevel: number;
  experiencePoints: number;
  nextLevelPoints: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  showAchievements: boolean;
}

export interface UserProfileData {
  user: User;
  medals: Medal[];
  profile: ProfileConfig;
  stats: UserStats;
  preferences: UserPreferences;
}

interface UserProfileContextType {
  profileData: UserProfileData | null;
  isLoading: boolean;
  updateUser: (userData: Partial<User>) => Promise<void>;
  updateMedals: (medals: Medal[]) => Promise<void>;
  updateProfile: (profileConfig: Partial<ProfileConfig>) => Promise<void>;
  updateStats: (stats: Partial<UserStats>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  addMedal: (medal: Medal) => Promise<void>;
  removeMedal: (medalId: string) => Promise<void>;
  toggleMedal: (medalId: string) => Promise<void>;
  resetToDefault: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

interface UserProfileProviderProps {
  children: React.ReactNode;
}

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children }) => {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Chave para AsyncStorage
  const STORAGE_KEY = '@user_profile_data';

  // Carregar dados do perfil ao inicializar
  useEffect(() => {
    loadProfileData();
  }, []);

  // Carregar dados do AsyncStorage ou usar dados padrão
  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setProfileData(parsedData);
      } else {
        // Usar dados padrão do JSON e salvar no AsyncStorage
        setProfileData(defaultProfileData as UserProfileData);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfileData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do perfil:', error);
      // Em caso de erro, usar dados padrão
      setProfileData(defaultProfileData as UserProfileData);
    } finally {
      setIsLoading(false);
    }
  };

  // Salvar dados no AsyncStorage
  const saveProfileData = async (data: UserProfileData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setProfileData(data);
    } catch (error) {
      console.error('Erro ao salvar dados do perfil:', error);
      throw error;
    }
  };

  // Atualizar dados do usuário
  const updateUser = async (userData: Partial<User>) => {
    if (!profileData) return;
    
    const updatedData = {
      ...profileData,
      user: { ...profileData.user, ...userData }
    };
    await saveProfileData(updatedData);
  };

  // Atualizar medalhas
  const updateMedals = async (medals: Medal[]) => {
    if (!profileData) return;
    
    const updatedData = {
      ...profileData,
      medals,
      stats: {
        ...profileData.stats,
        totalMedals: medals.length,
        activeMedals: medals.filter(medal => medal.active).length
      }
    };
    await saveProfileData(updatedData);
  };

  // Atualizar configurações do perfil
  const updateProfile = async (profileConfig: Partial<ProfileConfig>) => {
    if (!profileData) return;
    
    const updatedData = {
      ...profileData,
      profile: { ...profileData.profile, ...profileConfig }
    };
    await saveProfileData(updatedData);
  };

  // Atualizar estatísticas
  const updateStats = async (stats: Partial<UserStats>) => {
    if (!profileData) return;
    
    const updatedData = {
      ...profileData,
      stats: { ...profileData.stats, ...stats }
    };
    await saveProfileData(updatedData);
  };

  // Atualizar preferências
  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    if (!profileData) return;
    
    const updatedData = {
      ...profileData,
      preferences: { ...profileData.preferences, ...preferences }
    };
    await saveProfileData(updatedData);
  };

  // Adicionar nova medalha
  const addMedal = async (medal: Medal) => {
    if (!profileData) return;
    
    const updatedMedals = [...profileData.medals, medal];
    await updateMedals(updatedMedals);
  };

  // Remover medalha
  const removeMedal = async (medalId: string) => {
    if (!profileData) return;
    
    const updatedMedals = profileData.medals.filter(medal => medal.id !== medalId);
    await updateMedals(updatedMedals);
  };

  // Alternar status da medalha (ativa/inativa)
  const toggleMedal = async (medalId: string) => {
    if (!profileData) return;
    
    const updatedMedals = profileData.medals.map(medal =>
      medal.id === medalId 
        ? { 
            ...medal, 
            active: !medal.active,
            earnedDate: !medal.active ? new Date().toISOString().split('T')[0] : null
          }
        : medal
    );
    await updateMedals(updatedMedals);
  };

  // Resetar para dados padrão
  const resetToDefault = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setProfileData(defaultProfileData as UserProfileData);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfileData));
    } catch (error) {
      console.error('Erro ao resetar dados do perfil:', error);
      throw error;
    }
  };

  // Recarregar dados do perfil
  const refreshProfile = async () => {
    await loadProfileData();
  };

  const value: UserProfileContextType = {
    profileData,
    isLoading,
    updateUser,
    updateMedals,
    updateProfile,
    updateStats,
    updatePreferences,
    addMedal,
    removeMedal,
    toggleMedal,
    resetToDefault,
    refreshProfile,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useUserProfile = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile deve ser usado dentro de um UserProfileProvider');
  }
  return context;
};

export default UserProfileContext;