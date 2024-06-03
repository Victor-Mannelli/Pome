import { TokenContext } from "../providers";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";

export function UseLogout() {
  const { setToken, setUser } = useContext(TokenContext);
  const router = useRouter();
  const toast = useToast();

  localStorage.removeItem("token");
  localStorage.clear();
  // destroyCookie(null, "token", { path: "/" });
  // destroyCookie(undefined, "token", { path: "/" });
  // destroyCookie({}, "token", { path: "/" });
  setUser(null);
  setToken(null);
  router.push("/");

  toast({
    title: "logged out!",
    status: "success",
    isClosable: true,
  });
}
