import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }

});

API.interceptors.request.use((config) => {
  // Access the token from window storage or a state manager where your instance lives
  const token = window._keycloakToken; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;