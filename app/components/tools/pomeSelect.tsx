'use client';

import { airingStatusOptions, animeUserStatus } from '@/utils/consts';
import { MdKeyboardArrowDown, IoCloseSharp } from '@/utils/libs';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import React from 'react';

export function PomeSelect({
  customOptionsStyle,
  customSelectStyle,
  selectionOf,
  clearSelect,
  onSelect,
  profile,
  options,
  setShow,
  title,
  show,
}: {
  setShow: Dispatch<SetStateAction<boolean>>;
  options: string[] | number[];
  customOptionsStyle?: string;
  customSelectStyle?: string;
  clearSelect: () => void;
  onSelect: (e) => void;
  title: string | null;
  selectionOf: string;
  profile?: boolean;
  show: boolean;
}) {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShow(false));

  return (
    <div
      className={`relative flex flex-col ${customSelectStyle ? customSelectStyle : 'w-[10.5rem] h-8 bg-third text-white text-sm rounded-sm'}`}
      style={{ boxShadow: '0 0 2px rgb(204, 204, 204)', transition: 'all 0.5s ease' }}
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      <div className="flex items-center justify-between pl-3 w-full h-full cursor-pointer active:bg-fifth" onClick={() => setShow(!show)}>
        <span> {title ? title : selectionOf[0].toLocaleUpperCase() + selectionOf.slice(1)} </span>
        {title ? (
          <IoCloseSharp
            className="hover:text-signature hover:text-opacity-75 mr-[0.6rem] text-xl font-bold"
            onClick={(e) => {
              e.stopPropagation();
              clearSelect();
              setShow(false);
            }}
          />
        ) : (
          <MdKeyboardArrowDown className="text-2xl cursor-pointer mr-2" />
        )}
      </div>
      <ul
        className={`absolute z-10 overflow-auto max-h-60 ${customOptionsStyle ? customOptionsStyle : 'w-[10.5rem] top-8 bg-third'} ${show ? 'block' : 'hidden'}`}
        style={{ boxShadow: '0 0 2px rgb(204, 204, 204)', transition: 'all 0.5s ease' }}
      >
        {options.map((e: string | number, i: number) => (
          <li
            key={'option' + e + i}
            className="text-center text-sm py-2 hover:bg-fourth cursor-pointer active:bg-fifth"
            onClick={() => {
              setShow(false);
              onSelect(e);
            }}
          >
            {selectionOf === 'status' ? (profile ? animeUserStatus[e].name : airingStatusOptions[e]) : e}
          </li>
        ))}
      </ul>
    </div>
  );
}
