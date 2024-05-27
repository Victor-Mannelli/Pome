"use client"

import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { animeStatusOptions, genres } from '@/utils/consts';
import { PomeSelect } from '../utilities/pomeSelect';
import { useDebounceCallback } from 'usehooks-ts';
import { GiMagnifyingGlass } from '@/utils/libs';
import { FilterType } from '@/utils/types';
import { TokenContext } from '@/utils';

export function Filter({ setFilter, filter }: { setFilter: Dispatch<SetStateAction<FilterType>>; filter: FilterType; }) {
  const [showSelectStatus, setShowSelectStatus] = useState<boolean>(false);
  const [showSelectGenres, setShowSelectGenres] = useState<boolean>(false);
  const setSearchDebounced = useDebounceCallback(setFilter, 1000)
  const { user } = useContext(TokenContext)

  return (
    <div className='flex flex-col items-center md:flex-row gap-5 py-3'>
      <div
        className="relative w-48 h-10 rounded-sm"
        style={{ boxShadow: "0 0 2px rgb(204, 204, 204)" }}
      >
        <GiMagnifyingGlass className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-eigth" />
        <input
          className="h-10 w-full rounded-md outline-none bg-third pl-3 pr-10 text-lg text-white"
          onChange={(e) => setSearchDebounced(prevState => ({ ...prevState, search: e.target.value }))}
          placeholder='search'
        />
      </div>
      <PomeSelect
        title={filter.status.length === 1 ? animeStatusOptions[filter.status] : "Select Status"}
        setShow={setShowSelectStatus}
        show={showSelectStatus}
      >
        {filter.status.length === 1 ?
          <li
            id={"clear status"}
            className="text-center py-2 hover:bg-fourth cursor-pointer active:bg-fifth"
            onClick={() => {
              setShowSelectStatus(false)
              setFilter((prevState: any) => ({ ...prevState, status: ["FINISHED", "RELEASING", "NOT_YET_RELEASED", "CANCELLED", "HIATUS"] }));
            }}
          >
            Clear Status
          </li>
          : null
        }
        {Object.keys(animeStatusOptions).map((e, i) => (
          <li
            id={e}
            key={e + i}
            className="text-center py-2 hover:bg-fourth cursor-pointer active:bg-fifth"
            onClick={() => {
              setShowSelectStatus(false)
              setFilter((prevState: any) => ({ ...prevState, status: [e] }));
            }}
          >
            {animeStatusOptions[e]}
          </li>
        ))}
      </PomeSelect>
      <PomeSelect
        title={filter.genre ? filter.genre : "Select Genre"}
        setShow={setShowSelectGenres}
        show={showSelectGenres}
      >
        {filter.genre ?
          <li
            id={"clear genre"}
            className="text-center py-2 hover:bg-fourth cursor-pointer active:bg-fifth"
            onClick={() => {
              setShowSelectGenres(false)
              setFilter((prevState: any) => ({ ...prevState, genre: null }));
            }}
          >
            Clear Genre
          </li>
          : null
        }
        {genres.map((e, i) => (
          <li
            id={e}
            key={e + i}
            className="text-center py-2 hover:bg-fourth cursor-pointer active:bg-fifth"
            onClick={() => {
              setShowSelectGenres(false)
              setFilter((prevState: any) => ({ ...prevState, genre: e }));
            }}
          >
            {e}
          </li>
        ))}
      </PomeSelect>
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
