import { UseToastOptions } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/libs/axios";
import { User } from "@/utils/types";
import { setCookie } from "nookies";

export function userLogin({ login, password, router, setUser, setLoading, toast }: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  toast: (options?: UseToastOptions) => void;
  setUser: Dispatch<SetStateAction<User>>;
  router: ReturnType<typeof useRouter>;
  password: string;
  login: string;
}) {
  setLoading(true);
  api
    .post("/users/login", { login, password })
    .then((response) => {
      const decoded = JSON.parse(Buffer.from(response.data.token.split(".")[1], "base64").toString());
      setUser(decoded);
      setCookie(null, "token", response.data.token, {
        maxAge: 1 * 60 * 60 * 24, // 24 hrs
        path: "/",
      });
      router.push("/");
      toast({
        title: "Logged In!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    })
    .catch(() => {
      toast({
        title: "Error on login, API is possibly offline!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    })
    .finally(() => setLoading(false));
}

