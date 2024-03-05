import { parseCookies } from 'nookies';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
export const animeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ANIME
});

api.interceptors.request.use(
  (config) => {
    const token = parseCookies(null).token;
    config.headers.Authorization = `Bearer ${token || ''}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response): any => {
    return response;
  },
  (error) => { 
    throw error.response?.data
  }
);