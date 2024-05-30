import { VariablesProvider } from "./variablesProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { TokenProvider } from "./tokenProvider";
import { ThemeProvider } from "./themeProvider";
import { theme } from '@/utils/themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top', duration: 5000 } }}>
      <ThemeProvider>
        <VariablesProvider>
          <TokenProvider>
            {children}
          </TokenProvider>
        </VariablesProvider>
      </ThemeProvider >
    </ChakraProvider>
  );
}
