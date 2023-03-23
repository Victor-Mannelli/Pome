import { setCookie } from "nookies";
import { toast } from "react-toastify";
import { LoginHandler } from "../Interfaces";
import { api } from "../axios";

export function userLogin({ email, password, router }: LoginHandler) {
  toast.promise(
    api
      .post("user/signin", { email, password })
      .then((response) => {
        setCookie(null, "token", response.data.token, {
          maxAge: 2 * 60 * 60,
          path: "/",
        });
      }),
    {
      pending: "Logging in...",
      success: {
        render() {
          router.push("/PoMe/home");
          return "Logado com sucesso!";
        },
      },
      error: "Not authorized.",
    },
    { toastId: "login" }
  );
}
