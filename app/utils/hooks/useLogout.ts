import { Dispatch, SetStateAction } from "react";
import { useToast } from "@chakra-ui/react";
import { destroyCookie } from "nookies";
import { User } from "../types";

export function UseLogout({ setUser, setToken }: {
  setToken: Dispatch<SetStateAction<string>>;
  setUser: Dispatch<SetStateAction<User>>;
  // toast: (options?: UseToastOptions) => void;
}) {
  const toast = useToast();
  destroyCookie(null, "token", { path: "/" });
  destroyCookie(undefined, "token", { path: "/" });
  destroyCookie({}, "token", { path: "/" });
  setUser(null);
  setToken(null);
  // router.push("/");
  toast({
    title: "logged out!",
    status: "success",
    isClosable: true,
  });
}