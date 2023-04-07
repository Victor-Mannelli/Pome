import axios from 'axios';
import nookies from 'nookies';

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API });

export const apiAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${nookies.get(null, 'token').token}`,
  },
});

export const animeApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_ANIME });
