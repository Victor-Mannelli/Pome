import { useRouter } from "next/router";

export interface LoginHandler {
  email: string;
  password: string;
  router: ReturnType<typeof useRouter>;
}
