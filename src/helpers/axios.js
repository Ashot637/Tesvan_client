import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://tesvan-electronics.onrender.com/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  const language = JSON.parse(localStorage.getItem('language'));
  if (language && !window.location.pathname.includes('admin')) {
    config.headers.language = `${language.title}`;
  }
  return config;
});

export default instance;
