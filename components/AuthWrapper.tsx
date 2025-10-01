import { AuthProvider, useAuth } from '../contexts/AuthContext';
import React from 'react';
import { View } from 'react-native';
import { Login } from './Login';
import { Main } from './Main';

interface AuthWrapperProps {
  children?: React.ReactNode;
}

const AuthContent: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated, isLoading, login } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        {/* Você pode adicionar um componente de loading aqui */}
      </View>
    );
  }

  // Se não estiver autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return <Login onLoginSuccess={login} />;
  }

  // Se estiver autenticado, mostrar o conteúdo principal
  return (
    <View style={{ flex: 1 }}>
      {children || <Main />}
    </View>
  );
};

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <AuthProvider>
      <AuthContent>{children}</AuthContent>
    </AuthProvider>
  );
};

export default AuthWrapper;