"use client"

import { AnimeUserStatsInterface } from '../../utils/interfaces';
import { Dispatch, SetStateAction, useState } from 'react';
import { VscFoldDown, VscFoldUp } from 'react-icons/vsc';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { animeStatus } from '@/utils';
import DatePicker from 'react-datepicker';

export function AnimeUserStats({ maxEpisodes, fetchData, setFetchData }: {
  setFetchData: Dispatch<SetStateAction<AnimeUserStatsInterface>>;
  fetchData: AnimeUserStatsInterface;
  maxEpisodes: number;
}) {
  const [showStatus, setShowStatus] = useState<boolean>(false);

  return (
    <div className="flex flex-wrap h-fit w-[21.5rem] lg:w-[43rem] gap-12">
      <div
        className={`relative flex justify-center items-center h-14 w-80 bg-fourth rounded-md p-1 hover:cursor-pointer ${fetchData.status === '' ? 'text-white' : animeStatus[fetchData.status].color}`}
        onClick={() => setShowStatus(!showStatus)}
      >
        {fetchData.status === '' ? 'Status' : fetchData.status}
        {showStatus ? <VscFoldDown className='absolute right-5 text-white pt-1 text-2xl' /> : <VscFoldUp className='absolute right-5 text-white pt-1 text-2xl' />}
        <div className={`absolute z-10 top-16 left-0 w-full rounded-md bg-fourthAndAHalf ${showStatus ? '' : 'hidden'}`}>
          {Object.keys(animeStatus).map((e) =>
            <div
              key={e}
              onClick={() => setFetchData({ ...fetchData, status: e })}
              className={`px-3 py-2 text-center rounded-md hover:cursor-pointer hover:bg-fourth w-full h-full ${animeStatus[e].color}`}
            >
              {animeStatus[e].name}
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center justify-between h-14 w-80 bg-fourth rounded-md gap-5 pl-11'>
        <h3> Score </h3>
        <input
          type='number'
          value={fetchData.score}
          autoComplete='off'
          min='0'
          max='10'
          step='1'
          className='text-center rounded-md outline-none text-eigth bg-fourthAndAHalf w-44 h-full'
          onChange={(e) => setFetchData({ ...fetchData, score: (Number(e.target.value) > 10 ? 10 : Number(e.target.value)) })}
        />
      </div>
      <div className='flex items-center justify-between h-14 w-80 bg-fourth rounded-md gap-5 pl-7'>
        <h3> Progress </h3>
        <input
          type='number'
          value={fetchData.progress}
          autoComplete='off'
          min='0'
          max={maxEpisodes ? maxEpisodes : undefined}
          step='1'
          className='text-center rounded-md outline-none text-eigth bg-fourthAndAHalf w-[11.5rem] h-full'
          onChange={(e) => setFetchData({ ...fetchData, progress: (Number(e.target.value) > maxEpisodes ? maxEpisodes : Number(e.target.value)) })}
        />
      </div >
      <div className='flex items-center justify-between h-14 w-80 bg-fourth rounded-md gap-5 pl-5'>
        <h3> Rewatches </h3>
        <input
          type='number'
          value={fetchData.rewatches}
          autoComplete='off'
          min='0'
          step='1'
          className='text-center rounded-md outline-none text-eigth bg-fourthAndAHalf w-44 h-full'
          onChange={(e) => setFetchData({ ...fetchData, rewatches: Number(e.target.value) })}
        />
      </div>
      <div className='relative flex justify-between items-center w-80 h-14 pl-5 gap-5 bg-fourth rounded-md'>
        <h3 className='w-fit'> Start Date </h3>
        <div className='flex w-[11.5rem] rounded-md'>
          <DatePicker
            className='pl-9 h-14 w-full rounded-md text-eigth caret-transparent bg-fourthAndAHalf outline-none cursor-pointer'
            selected={fetchData.startDate}
            onChange={(date: Date) => setFetchData({ ...fetchData, startDate: date })}
          />
        </div>
        <FaRegCalendarAlt className='absolute bottom-[0.95rem] right-3 text-white text-2xl cursor-pointer' />
      </div>
      <div className='relative flex justify-between items-center w-80 h-14 pl-5 gap-5 bg-fourth rounded-md'>
        <h3 className='w-28'> Finish Date </h3>
        <div className='flex w-[11.5rem] rounded-md'>
          <DatePicker
            className='pl-8 h-14 w-full rounded-md text-eigth caret-transparent bg-fourthAndAHalf outline-none cursor-pointer'
            selected={fetchData.finishDate}
            onChange={(date: Date) => setFetchData({ ...fetchData, finishDate: date })}
          />
        </div>
        <FaRegCalendarAlt className='absolute bottom-[0.95rem] right-3 text-white text-2xl cursor-pointer' />
      </div>
    </div>
  )
}
