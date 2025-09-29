import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface LoginProps {
  onLoginSuccess?: () => void;
}

interface FormData {
  email: string;
  password: string;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async () => {
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate login process with animation
    setTimeout(() => {
      // Check credentials
      if (formData.email === 'renan.oliveira' && formData.password === '1234') {
        setIsLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
        }
      } else {
        setError('Login falhou');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <LinearGradient
      colors={['#f5f7fa', '#c3cfe2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Login Card */}
          <View className="bg-white rounded-2xl w-full max-w-sm relative overflow-hidden" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.1, shadowRadius: 40, elevation: 20 }}>
            {/* Green top border */}
            <View className="absolute top-0 left-0 right-0 h-1 bg-green-500" />
            
            <View className="p-10 text-center">
              {/* Logo Container */}
              <View className="mb-8 items-center">
                <Image 
                  source={require('../assets/images/logo-carsoul1.png')} 
                  className="h-15 w-auto"
                  style={{ height: 60 }}
                  resizeMode="contain"
                />
              </View>
              
              {/* Error Message */}
              {error ? (
                <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5">
                  <Text className="text-red-600 text-sm text-center">{error}</Text>
                </View>
              ) : null}

              {/* Form */}
              <View className="w-full">
                {/* Email Input */}
                <View className="mb-5 text-left">
                  <Text className="block mb-2 text-gray-700 font-medium text-sm">Login</Text>
                  <TextInput
                    className={`w-full px-4 py-3 border-2 rounded-lg text-base ${
                      error ? 'border-red-500' : 'border-gray-200'
                    } focus:border-green-500`}
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    placeholder="Digite seu email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                </View>

                {/* Password Input */}
                <View className="mb-5 text-left">
                  <Text className="block mb-2 text-gray-700 font-medium text-sm">Senha</Text>
                  <TextInput
                    className={`w-full px-4 py-3 border-2 rounded-lg text-base ${
                      error ? 'border-red-500' : 'border-gray-200'
                    } focus:border-green-500`}
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  className={`w-full rounded-lg py-3.5 mt-2 flex-row justify-center items-center ${
                    isLoading ? 'bg-gray-400' : 'bg-green-500 active:bg-green-600'
                  }`}
                  onPress={handleSubmit}
                  disabled={isLoading}
                  style={!isLoading ? { 
                    shadowColor: '#41C352', 
                    shadowOffset: { width: 0, height: 8 }, 
                    shadowOpacity: 0.3, 
                    shadowRadius: 20,
                    elevation: 8
                  } : {}}
                >
                  {isLoading && (
                    <ActivityIndicator 
                      size="small" 
                      color="#FFFFFF" 
                      style={{ marginRight: 8 }}
                    />
                  )}
                  <Text className="text-white text-base font-semibold">
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};



export default Login;