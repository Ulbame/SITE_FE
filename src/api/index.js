import axios from 'axios';
import { setInterceptors } from './common/interceptors';

export default axios;

function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 1000,
  });
}

function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
    timeout: 1000,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const postAxios = createInstanceWithAuth('post/');
