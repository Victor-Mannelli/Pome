import { Dispatch, SetStateAction, useState } from 'react';
import { VscFoldDown, VscFoldUp } from 'react-icons/vsc';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { AnimeUserStatsInterface } from '../utils/Interfaces';
import DatePicker from 'react-datepicker';

export default function AnimeUserStats({ maxEpisodes, fetchData, setFetchData }: { maxEpisodes: number, fetchData: AnimeUserStatsInterface, setFetchData: Dispatch<SetStateAction<AnimeUserStatsInterface>> }) {
  const [showStatus, setShowStatus] = useState<boolean>(false);
  return (
    <div className='flex flex-col justify-evenly h-3/5'>
      <div className={`flex justify-evenly ${showStatus ? 'mb-52' : ''}`}>
        <div className='relative flex justify-evenly items-center h-14 w-80 bg-fourth rounded-md p-1 hover:cursor-pointer' onClick={() => setShowStatus(!showStatus)}>
          <h3 className='pl-14 py-1 hover:cursor-pointer'> {fetchData.status === '' ? 'Status' : fetchData.status} </h3>
          {showStatus ? <VscFoldDown className='text-white pt-1 text-2xl'/> : <VscFoldUp className='text-white pt-1 text-2xl'/>}
          <div className={`absolute z-10 top-16 left-0 w-full rounded-md border border-fifth ${showStatus ? 'block' : 'hidden'}`}>
            <h3 onClick={() => setFetchData({ ...fetchData, status: 'Watching' })} className='px-3 py-2 border border-fourth bg-fourthAndAHalf text-center rounded-md hover:cursor-pointer hover:bg-fourth w-full h-full'> Watching </h3>
            <h3 onClick={() => setFetchData({ ...fetchData, status: 'Dropped' })} className='px-3 py-2 border border-fourth bg-fourthAndAHalf text-center rounded-md hover:cursor-pointer hover:bg-fourth w-full h-full'> Dropped </h3>
            <h3 onClick={() => setFetchData({ ...fetchData, status: 'Finished' })} className='px-3 py-2 border border-fourth bg-fourthAndAHalf text-center rounded-md hover:cursor-pointer hover:bg-fourth w-full h-full'> Finished </h3>
            <h3 onClick={() => setFetchData({ ...fetchData, status: 'Rewatching' })} className='px-3 py-2 border border-fourth bg-fourthAndAHalf text-center rounded-md hover:cursor-pointer hover:bg-fourth w-full h-full'> Re-Watching </h3>
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
      </div>
      <div className='flex justify-evenly'>
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
      </div>
      <div className='flex justify-evenly'>
        <div className='relative flex justify-between items-center w-80 pl-5 gap-5 bg-fourth rounded-md'>
          <h3 className='w-fit'> Start Date </h3>
          <div className='flex w-[11.5rem] rounded-md'>
            <DatePicker
              className='pl-9 h-14 w-full rounded-md text-eigth caret-transparent bg-fourthAndAHalf outline-none cursor-pointer'
              selected={fetchData.startDate}
              onChange={(date: Date) => setFetchData({ ...fetchData, startDate: date })}
            />
          </div>
          <FaRegCalendarAlt className='absolute bottom-[0.95rem] right-3 text-white text-2xl cursor-pointer'/>
        </div>
        <div className='relative flex justify-between items-center w-80 pl-5 gap-5 bg-fourth rounded-md'>
          <h3 className='w-28'> Finish Date </h3>
          <div className='flex w-[11.5rem] rounded-md'>
            <DatePicker
              className='pl-8 h-14 w-full rounded-md text-eigth caret-transparent bg-fourthAndAHalf outline-none cursor-pointer'
              selected={fetchData.finishDate}
              onChange={(date: Date) => setFetchData({ ...fetchData, finishDate: date })}
            />
          </div>
          <FaRegCalendarAlt className='absolute bottom-[0.95rem] right-3 text-white text-2xl cursor-pointer'/>
        </div>
      </div>
    </div >
  );
}
