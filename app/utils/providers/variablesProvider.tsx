import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import React from 'react';

interface VariablesContextType {
  setAnimelistTitle: Dispatch<SetStateAction<'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS'>>;
  animelistTitle: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS';
  setShowFollowedAnime: Dispatch<SetStateAction<boolean>>;
  showFollowedAnime: boolean;
}
const defaultVariablesContext: VariablesContextType = {
  setAnimelistTitle: () => {},
  animelistTitle: 'RELEASING',
  setShowFollowedAnime: () => {},
  showFollowedAnime: false,
};

export const VariablesContext = createContext<VariablesContextType>(defaultVariablesContext);

export function VariablesProvider({ children }: { children: ReactNode }) {
  const [animelistTitle, setAnimelistTitle] = useState<'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS'>('RELEASING');
  const [showFollowedAnime, setShowFollowedAnime] = useState<boolean>(false);

  return (
    <VariablesContext.Provider value={{ animelistTitle, setAnimelistTitle, showFollowedAnime, setShowFollowedAnime }}>
      {children}
    </VariablesContext.Provider>
  );
}
