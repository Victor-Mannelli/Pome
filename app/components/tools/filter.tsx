"use client"

import { FilterType, GiMagnifyingGlass } from '@/utils';
import { Dispatch, SetStateAction } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

export function Filter({ setFilter }: {
  setFilter: Dispatch<SetStateAction<FilterType>>;
}) {
  const setSearchDebounced = useDebounceCallback(setFilter, 1000)

  return (
    <div className={`relative w-full h-fit `}>
      <GiMagnifyingGlass className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-eigth" />
      <input
        className="h-10 w-full rounded-md outline-none bg-third pl-3 pr-10 text-lg text-white"
        onChange={(e) =>
          setSearchDebounced(prevState => ({
            ...prevState, name: e.target.value
          }))
        }
      />
    </div>
  );
}

