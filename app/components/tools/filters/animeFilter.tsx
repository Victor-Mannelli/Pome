'use client';

import { airingStatusOptions, animeUserStatus, animeYearOptions, genres } from '@/utils/consts';
import { Dispatch, SetStateAction, useContext, useRef, useState } from 'react';
import { GiMagnifyingGlass, IoCloseSharp } from '@/utils/libs';
import { ShowFollowedAnime } from '@/home/showFollowedAnime';
import { useDebounceCallback } from 'usehooks-ts';
import { FilterType } from '@/utils/types';
import { PomeSelect } from '@/components';
import { TokenContext } from '@/utils';
import React from 'react';

export function AnimeFilter({
  setShowFollowedAnime,
  showFollowedAnime,
  setFilter,
  profile,
  filter,
}: {
  setShowFollowedAnime?: Dispatch<SetStateAction<boolean>>;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  showFollowedAnime: boolean;
  filter: FilterType;
  profile?: boolean;
}) {
  const [showSelectStatus, setShowSelectStatus] = useState<boolean>(false);
  const [showSelectGenres, setShowSelectGenres] = useState<boolean>(false);
  const [showSelectYear, setShowSelectYear] = useState<boolean>(false);
  const setSearchDebounced = useDebounceCallback(setFilter, 1000);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { user } = useContext(TokenContext);

  return (
    <div className="flex flex-wrap items-center justify-center md:flex-row gap-3 py-3">
      <div className="relative w-[10.5rem] h-8 rounded-sm" style={{ boxShadow: '0 0 2px rgb(204, 204, 204)' }}>
        {!filter.search ? (
          <GiMagnifyingGlass className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-eigth" />
        ) : (
          <IoCloseSharp
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-signature hover:text-opacity-75 mr-[0.6rem] text-xl font-bold cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSearchDebounced((prevState) => ({ ...prevState, search: null }));
              searchInputRef.current.value = null;
            }}
          />
        )}
        <input
          ref={searchInputRef}
          className="h-8 w-full rounded-sm outline-none bg-third pl-3 pr-10 text-sm text-white"
          onChange={(e) => setSearchDebounced((prevState) => ({ ...prevState, search: e.target.value }))}
          placeholder="Search"
        />
      </div>
      <PomeSelect
        clearSelect={() => setFilter((prevState: FilterType) => ({ ...prevState, ['status']: null }))}
        onSelect={(e) => setFilter((prevState: FilterType) => ({ ...prevState, ['status']: e }))}
        title={filter.status ? (profile ? animeUserStatus[filter.status].name : airingStatusOptions[filter.status]) : null}
        options={profile ? Object.keys(animeUserStatus) : Object.keys(airingStatusOptions)}
        setShow={setShowSelectStatus}
        show={showSelectStatus}
        selectionOf={'status'}
        profile={profile}
      />
      <PomeSelect
        clearSelect={() => setFilter((prevState: FilterType) => ({ ...prevState, ['genres']: null }))}
        onSelect={(e) => setFilter((prevState: FilterType) => ({ ...prevState, ['genres']: e }))}
        setShow={setShowSelectGenres}
        show={showSelectGenres}
        selectionOf={'genres'}
        title={filter.genres}
        options={genres}
      />
      <PomeSelect
        clearSelect={() => setFilter((prevState: FilterType) => ({ ...prevState, ['year']: null }))}
        onSelect={(e) => setFilter((prevState: FilterType) => ({ ...prevState, ['year']: e }))}
        title={filter.year ? filter.year.toString() : null}
        setShow={setShowSelectYear}
        options={animeYearOptions}
        show={showSelectYear}
        selectionOf={'year'}
      />
      {!showFollowedAnime ? (
        <ShowFollowedAnime setShowFollowedAnime={setShowFollowedAnime} showFollowedAnime={showFollowedAnime} user={user} mobile={true} />
      ) : null}
    </div>
  );
}
