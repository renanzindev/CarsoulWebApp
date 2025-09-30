import { useCallback, useMemo } from 'react';
import { useUserProfile, type Medal, type User, type UserStats } from '../contexts/UserProfileContext';

/**
 * Hook personalizado para gerenciar dados do usuário
 */
export const useUser = () => {
  const { profileData, updateUser, isLoading } = useUserProfile();

  const user = useMemo(() => profileData?.user || null, [profileData?.user]);

  const updateUserInfo = useCallback(async (userData: Partial<User>) => {
    await updateUser(userData);
  }, [updateUser]);

  const updateUserName = useCallback(async (userName: string) => {
    await updateUser({ userName });
  }, [updateUser]);

  const updateUserRole = useCallback(async (userRole: string) => {
    await updateUser({ userRole });
  }, [updateUser]);

  const updateUserEmail = useCallback(async (email: string) => {
    await updateUser({ email });
  }, [updateUser]);

  return {
    user,
    isLoading,
    updateUserInfo,
    updateUserName,
    updateUserRole,
    updateUserEmail,
  };
};

/**
 * Hook personalizado para gerenciar medalhas
 */
export const useMedals = () => {
  const { profileData, updateMedals, addMedal, removeMedal, toggleMedal, isLoading } = useUserProfile();

  const medals = useMemo(() => profileData?.medals || [], [profileData?.medals]);
  const activeMedals = useMemo(() => medals.filter(medal => medal.active), [medals]);
  const inactiveMedals = useMemo(() => medals.filter(medal => !medal.active), [medals]);
  const medalCount = useMemo(() => medals.length, [medals.length]);
  const activeMedalCount = useMemo(() => activeMedals.length, [activeMedals.length]);

  const createMedal = useCallback(async (emoji: string, title: string, description: string) => {
    const newMedal: Medal = {
      id: `medal_${Date.now()}`,
      emoji,
      active: false,
      title,
      description,
      earnedDate: null,
    };
    await addMedal(newMedal);
  }, [addMedal]);

  const earnMedal = useCallback(async (medalId: string) => {
    const medal = medals.find(m => m.id === medalId);
    if (medal && !medal.active) {
      await toggleMedal(medalId);
    }
  }, [medals, toggleMedal]);

  const revokeMedal = useCallback(async (medalId: string) => {
    const medal = medals.find(m => m.id === medalId);
    if (medal && medal.active) {
      await toggleMedal(medalId);
    }
  }, [medals, toggleMedal]);

  const deleteMedal = useCallback(async (medalId: string) => {
    await removeMedal(medalId);
  }, [removeMedal]);

  const getMedalById = useCallback((medalId: string) => {
    return medals.find(medal => medal.id === medalId) || null;
  }, [medals]);

  const getMedalsByEmoji = useCallback((emoji: string) => {
    return medals.filter(medal => medal.emoji === emoji);
  }, [medals]);

  return {
    medals,
    activeMedals,
    inactiveMedals,
    medalCount,
    activeMedalCount,
    isLoading,
    createMedal,
    earnMedal,
    revokeMedal,
    deleteMedal,
    toggleMedal,
    updateMedals,
    getMedalById,
    getMedalsByEmoji,
  };
};

/**
 * Hook personalizado para gerenciar estatísticas do usuário
 */
export const useUserStats = () => {
  const { profileData, updateStats, isLoading } = useUserProfile();

  const stats = useMemo(() => profileData?.stats || null, [profileData?.stats]);

  const incrementProjects = useCallback(async (amount: number = 1) => {
    if (!stats) return;
    await updateStats({
      completedProjects: stats.completedProjects + amount
    });
  }, [stats, updateStats]);

  const addExperience = useCallback(async (points: number) => {
    if (!stats) return;
    const newPoints = stats.experiencePoints + points;
    const updates: Partial<UserStats> = {
      experiencePoints: newPoints
    };

    // Verificar se subiu de nível
    if (newPoints >= stats.nextLevelPoints) {
      updates.currentLevel = stats.currentLevel + 1;
      updates.nextLevelPoints = stats.nextLevelPoints + 500; // Próximo nível requer 500 pontos a mais
    }

    await updateStats(updates);
  }, [stats, updateStats]);

  const setLevel = useCallback(async (level: number) => {
    if (!stats) return;
    await updateStats({
      currentLevel: level,
      nextLevelPoints: level * 1000 // Cada nível requer 1000 pontos base
    });
  }, [stats, updateStats]);

  const resetStats = useCallback(async () => {
    await updateStats({
      completedProjects: 0,
      currentLevel: 1,
      experiencePoints: 0,
      nextLevelPoints: 1000
    });
  }, [updateStats]);

  const getProgressToNextLevel = useCallback(() => {
    if (!stats) return 0;
    const currentLevelBase = (stats.currentLevel - 1) * 1000;
    const progress = (stats.experiencePoints - currentLevelBase) / (stats.nextLevelPoints - currentLevelBase);
    return Math.min(Math.max(progress, 0), 1); // Entre 0 e 1
  }, [stats]);

  const getPointsToNextLevel = useCallback(() => {
    if (!stats) return 0;
    return Math.max(stats.nextLevelPoints - stats.experiencePoints, 0);
  }, [stats]);

  return {
    stats,
    isLoading,
    incrementProjects,
    addExperience,
    setLevel,
    resetStats,
    updateStats,
    getProgressToNextLevel,
    getPointsToNextLevel,
  };
};

/**
 * Hook personalizado para gerenciar preferências do usuário
 */
export const useUserPreferences = () => {
  const { profileData, updatePreferences, isLoading } = useUserProfile();

  const preferences = useMemo(() => profileData?.preferences || null, [profileData?.preferences]);

  const toggleTheme = useCallback(async () => {
    if (!preferences) return;
    await updatePreferences({
      theme: preferences.theme === 'dark' ? 'light' : 'dark'
    });
  }, [preferences, updatePreferences]);

  const setLanguage = useCallback(async (language: string) => {
    await updatePreferences({ language });
  }, [updatePreferences]);

  const toggleNotifications = useCallback(async () => {
    if (!preferences) return;
    await updatePreferences({
      notifications: !preferences.notifications
    });
  }, [preferences, updatePreferences]);

  const toggleAchievements = useCallback(async () => {
    if (!preferences) return;
    await updatePreferences({
      showAchievements: !preferences.showAchievements
    });
  }, [preferences, updatePreferences]);

  return {
    preferences,
    isLoading,
    toggleTheme,
    setLanguage,
    toggleNotifications,
    toggleAchievements,
    updatePreferences,
  };
};

/**
 * Hook personalizado para gerenciar configurações do perfil
 */
export const useProfileConfig = () => {
  const { profileData, updateProfile, isLoading } = useUserProfile();

  const profileConfig = useMemo(() => profileData?.profile || null, [profileData?.profile]);

  const setMotivationText = useCallback(async (text: string) => {
    await updateProfile({ motivationText: text });
  }, [updateProfile]);

  const setVariant = useCallback(async (variant: 'default' | 'compact' | 'detailed') => {
    await updateProfile({ variant });
  }, [updateProfile]);

  const toggleDivider = useCallback(async () => {
    if (!profileConfig) return;
    await updateProfile({ showDivider: !profileConfig.showDivider });
  }, [profileConfig, updateProfile]);

  const setColors = useCallback(async (backgroundColor: string, textColor: string) => {
    await updateProfile({ backgroundColor, textColor });
  }, [updateProfile]);

  return {
    profileConfig,
    isLoading,
    setMotivationText,
    setVariant,
    toggleDivider,
    setColors,
    updateProfile,
  };
};

/**
 * Hook combinado para acesso rápido a todas as funcionalidades
 */
export const useProfileManager = () => {
  const { profileData, isLoading, resetToDefault, refreshProfile } = useUserProfile();
  const userHooks = useUser();
  const medalHooks = useMedals();
  const statsHooks = useUserStats();
  const preferencesHooks = useUserPreferences();
  const configHooks = useProfileConfig();

  const isProfileComplete = useMemo(() => {
    if (!profileData) return false;
    return !!(
      profileData.user.userName &&
      profileData.user.userRole &&
      profileData.user.email
    );
  }, [profileData]);

  const getProfileSummary = useCallback(() => {
    if (!profileData) return null;
    
    return {
      userName: profileData.user.userName,
      userRole: profileData.user.userRole,
      level: profileData.stats.currentLevel,
      totalMedals: profileData.stats.totalMedals,
      activeMedals: profileData.stats.activeMedals,
      completedProjects: profileData.stats.completedProjects,
      experiencePoints: profileData.stats.experiencePoints,
      theme: profileData.preferences.theme,
      isComplete: isProfileComplete,
    };
  }, [profileData, isProfileComplete]);

  return {
    profileData,
    isLoading,
    isProfileComplete,
    resetToDefault,
    refreshProfile,
    getProfileSummary,
    user: userHooks,
    medals: medalHooks,
    stats: statsHooks,
    preferences: preferencesHooks,
    config: configHooks,
  };
};

export default {
  useUser,
  useMedals,
  useUserStats,
  useUserPreferences,
  useProfileConfig,
  useProfileManager,
};