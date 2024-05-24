"use client"

import { FilterType, GiMagnifyingGlass, TokenContext } from '@/utils';
import { PomeSelect } from '../utilities/pomeSelect';
import { useDebounceCallback } from 'usehooks-ts';
import { Dispatch, SetStateAction, useContext } from 'react';

export function Filter({ setFilter, filter }: {
  setFilter: Dispatch<SetStateAction<FilterType>>;
  filter: FilterType;
}) {
  const setSearchDebounced = useDebounceCallback(setFilter, 1000)
  const { user } = useContext(TokenContext)

  return (
    <div className='flex flex-col items-center md:flex-row gap-5'>
      <div
        className="relative w-48 h-10 rounded-sm"
        style={{ boxShadow: "0 0 2px rgb(204, 204, 204)" }}
      >
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
      <PomeSelect
        setFilter={setFilter}
        filter={filter}
        options={{
          "NOT_YET_RELEASED": "Not yet Released",
          "RELEASING": "Releasing",
          "FINISHED": "Finished",
        }}
      />
      {user ?
        <label
          className='flex items-center bg-third text-white w-52 h-10 pl-2 cursor-pointer active:bg-fifth hover:bg-fourth'
          style={{ boxShadow: "0 0 2px rgb(204, 204, 204)" }}
        >
          <input
            className=''
            type='checkbox'
            placeholder=''
          />
          <span className='pl-2'> Hide Followed Animes </span>
        </label>
        : null
      }
    </div >
  );
}
