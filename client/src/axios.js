import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7000',
  headers: {
    "Content-type": "application/json"
  }
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;