"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";
import React from "react";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_ANIME_API,
  cache: new InMemoryCache(),
});

export function ApolloGqlProvider({ children }: { children: ReactNode; }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}
