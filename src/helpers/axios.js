import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://134.209.251.128/service/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const language = JSON.parse(localStorage.getItem('language'));
  if (language && !window.location.pathname.includes('admin')) {
    config.params = {
      ...config.params,
      language: language.title,
    };
  }
  return config;
});

export default instance;
