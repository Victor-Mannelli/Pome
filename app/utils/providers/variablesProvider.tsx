"use cliente";

import { ReactNode, createContext, useState } from "react";

export const VariablesContext = createContext<any>({})

export function VariablesProvider({ children }: { children: ReactNode }) {
  const [animelistTitle, setAnimelistTitle] = useState<string>("RELEASING");

  return (
    <VariablesContext.Provider value={{ animelistTitle, setAnimelistTitle }} >
      {children}
    </VariablesContext.Provider>
  )
}
