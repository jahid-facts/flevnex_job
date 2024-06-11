import axios from 'axios';
import { store } from './store';
import { logout, refreshAccessToken } from './authSlice';

const api = axios.create({
  baseURL: 'https://your.api.base.url',
});

// Request interceptor to attach token to requests
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle token expiration
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      await store.dispatch(refreshAccessToken());
      const newToken = store.getState().auth.accessToken;
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return axios(originalRequest);
    } catch (err) {
      store.dispatch(logout());
      return Promise.reject(err);
    }
  }

  return Promise.reject(error);
});

export default api;
