// import { parseCookies } from "nookies";
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
export const animeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ANIME_API,
});

api.interceptors.request.use(
  (config) => {
    // const token = parseCookies(null).token;
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token || ''}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error.response?.data;
  },
);
