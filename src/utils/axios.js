import axios from 'axios';
import i18n from './i18n.js'

const instance = axios.create({
  baseURL: 
  'https://conference.buketov.edu.kz', // или твой API URL
  // 'http://localhost:5000',
});

// Автоматически подставлять токен
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  config.headers['Accept-Language'] = i18n.language || 'ru';
  return config;
});

export default instance;
