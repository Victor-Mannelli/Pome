import { UseToastOptions } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils";

export function userRegistration({ setLoading, userData, router, toast }: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  toast: (options?: UseToastOptions) => void;
  router: ReturnType<typeof useRouter>;
  userData: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
}) {
  setLoading(true);
  api
    .post("/users/register", userData)
    .then(() => {
      router.push("/login");
      toast({
        title: "Account created!",
        status: "success",
        isClosable: true,
      });
    })
    .catch((e) => {
      toast({
        title: e.message ? e.message : "Error on registration, API is possibly offline!",
        status: "error",
        isClosable: true,
      });
    })
    .finally(() => setLoading(false));
}
