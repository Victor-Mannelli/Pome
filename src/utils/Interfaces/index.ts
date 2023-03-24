import { useRouter } from "next/router";

export interface LoginHandler {
  email: string;
  password: string;
  router: ReturnType<typeof useRouter>;
}
export interface LoginFetchData {
  email: string,
  password: string,
  confirmPassword: string,
}
export interface SignupFetchData {
  email: string,
  password: string,
  confirmPassword: string,
  userBanner: string,
}
