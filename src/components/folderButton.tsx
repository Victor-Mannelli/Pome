import { useState } from 'react';
import { VscFoldDown, VscFoldUp } from 'react-icons/vsc';

export default function AnimeUserStats() {
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [fetchData, setFetchData] = useState<any>({ status: '', score: '', progress: '', rewatches: '' });

  console.log(fetchData);
  return (
    <div className='flex justify-evenly pt-20'>
      <div className='flex relative justify-evenly items-center bg-fourth rounded-md p-1 hover:cursor-pointer' onClick={() => setShowStatus(!showStatus)}>
        <h3 className='px-8 py-1 hover:cursor-pointer'> {fetchData.status === '' ? 'Status' : fetchData.status} </h3>
        {showStatus ? <VscFoldDown className='text-white pt-1' /> : <VscFoldUp className='text-white pt-1' />}
        <div className={`absolute top-14 left-0 w-full bg-fourthAndAHalf rounded-md ${showStatus ? 'block' : 'hidden'}`}>
          <h3 onClick={() => setFetchData({ ...fetchData, status: 'Watching' })} className='px-3 py-1 text-center rounded-sm hover:cursor-pointer hover:bg-fourth w-full h-full'> Watching </h3>
          <h3 onClick={() => setFetchData({ ...fetchData, status: 'Dropped' })} className='px-3 py-1 text-center rounded-sm hover:cursor-pointer hover:bg-fourth w-full h-full'> Dropped </h3>
          <h3 onClick={() => setFetchData({ ...fetchData, status: 'Finished' })} className='px-3 py-1 text-center rounded-sm hover:cursor-pointer hover:bg-fourth w-full h-full'> Finished </h3>
          <h3 onClick={() => setFetchData({ ...fetchData, status: 'Re-Watching' })} className='px-3 py-1 text-center rounded-sm hover:cursor-pointer hover:bg-fourth w-full h-full'> Re-Watching </h3>
        </div>
      </div>
      <div className='flex items-center bg-fourth rounded-md gap-5 pl-5'>
        <h3> Score </h3>
        <input
          type='number'
          placeholder='0'
          min='0'
          max='10'
          step='1'
          className='px-3 text-center rounded-md outline-none text-eigth bg-fourthAndAHalf w-full h-full'
          onChange={(e) => setFetchData({ ...fetchData, score: e.target.value })}
        />
      </div>
      <div className='flex items-center bg-fourth rounded-md gap-5 pl-5'>
        <h3> Progress </h3>  
        <input
          type='number'
          placeholder='0'
          min='0'
          max='10'
          step='1'
          className='px-3 text-center rounded-md outline-none text-eigth bg-fourthAndAHalf w-full h-full'
          onChange={(e) => setFetchData({ ...fetchData, progress: e.target.value })}
        />
      </div >
      <div className='flex items-center bg-fourth rounded-md gap-5 pl-5'>
        <h3> Rewatches </h3>
        <input
          type='number'
          placeholder='0'
          min='0'
          max='10'
          step='1'
          className='px-3 text-center rounded-md outline-none text-eigth bg-fourthAndAHalf w-full h-full'
          onChange={(e) => setFetchData({ ...fetchData, progress: e.target.value })}
        />
      </div>
    </div >
  );
}
