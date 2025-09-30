import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'apisauce';
import DownloadFile from './DownloadManager';

const baseURL = 'https://dev.valorizandoseucarro.com.br/api';
// const baseURL = 'https://smart.valorizandoseucarro.com.br/api';

const Api = create({baseURL});

Api.addAsyncRequestTransform(request => async () => {
  try {
    const token = await AsyncStorage.getItem('@smartApp:token');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log(error);
  }
});

Api.download = async (type, url, props) => {
  url = `${baseURL}${url}`;

  DownloadFile(type, url, props.filename, props.mime);
};

export default Api;
