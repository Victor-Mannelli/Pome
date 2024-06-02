"use cliente";

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import React from "react";

interface VariablesContextType {
  setAnimelistTitle: Dispatch<SetStateAction<"FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS">>;
  animelistTitle: "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS";
}
const defaultVariablesContext: VariablesContextType = {
  setAnimelistTitle: () => { },
  animelistTitle: "RELEASING",
};

export const VariablesContext = createContext<VariablesContextType>(defaultVariablesContext);

export function VariablesProvider({ children }: { children: ReactNode; }) {
  const [animelistTitle, setAnimelistTitle] = useState<
    "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS"
  >("RELEASING");

  return (
    <VariablesContext.Provider value={{ animelistTitle, setAnimelistTitle }} >
      {children}
    </VariablesContext.Provider>
  );
}
