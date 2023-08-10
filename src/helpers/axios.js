import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://tesvan-electronics.onrender.com/api',
});

export default instance;
