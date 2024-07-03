import { VariablesProvider } from './variablesProvider';
import { ApolloGqlProvider } from './apolloProvider';
import { LoadingProvider } from './loadingProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { TokenProvider } from './tokenProvider';
import { ThemeProvider } from './themeProvider';
import { theme } from '@/utils/themes';
import { ReactNode } from 'react';
import React from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top', duration: 5000 } }}>
      <ThemeProvider>
        <LoadingProvider>
          <ApolloGqlProvider>
            <VariablesProvider>
              <TokenProvider>{children}</TokenProvider>
            </VariablesProvider>
          </ApolloGqlProvider>
        </LoadingProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
