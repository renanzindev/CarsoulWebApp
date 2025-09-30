import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

async function getToken() {
  let token = await AsyncStorage.getItem('@smartApp:token');
  if (token) {
    token = `Bearer ${token}`;
  }
  return token;
}

export default async function DownloadFile(type, url, fileName, fileMime) {
  try {
    const token = await getToken();
    
    // Solicitar permissões para salvar na galeria
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erro', 'Permissão negada para salvar arquivos.');
      return;
    }

    // Fazer o download do arquivo
    const downloadResult = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + fileName,
      {
        headers: {
          'Cache-Control': 'no-store',
          Authorization: token,
        },
      }
    );

    if (downloadResult.status === 200) {
      // Salvar na galeria se for uma imagem
      if (fileMime && fileMime.startsWith('image/')) {
        await MediaLibrary.saveToLibraryAsync(downloadResult.uri);
      }
      
      Alert.alert('Sucesso', 'Download Realizado Com Sucesso.');
    } else {
      throw new Error('Download failed');
    }
  } catch (error) {
    console.error('Download error:', error);
    Alert.alert('Erro', 'Houve Um Erro, Tente Mais Tarde.');
  }
}
