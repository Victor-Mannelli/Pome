import { Button } from "@chakra-ui/react";

export function SignatureButton({ loading, onClick, text, type }: {
  type: "submit" | "reset" | "button";
  onClick: () => void;
  loading: boolean;
  text: string;
}) {
  return (
    <Button
      isLoading={loading}
      isDisabled={loading}
      className="w-fit h-1/3 cursor-pointer text-signature hover:brightness-105 hover:shadow-sm hover:shadow-white active:shadow-none"
      transition={"ease"}
      bgColor={"darkslategrey"}
      textColor={"text-signature"}
      _hover={{ bgColor: "darkslategrey" }}
      type={type}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}