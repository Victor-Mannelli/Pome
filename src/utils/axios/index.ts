import axios from "axios";
import nookies from "nookies";

export const api = axios.create({ baseURL: process.env.BASE_URL });

export const animeApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_ANIME });

export const apiAuth = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: false,
  headers: {
    Authorization: `Bearer ${nookies.get(null, "token").token}`,
  },
});
