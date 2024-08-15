import { Dispatch, SetStateAction } from 'react';
import { DefaultButton } from '@/components';
import React from 'react';

export function PageHandler({
  currentPage,
  hasNextPage,
  setPage,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  hasNextPage: boolean;
  currentPage: number;
}) {
  return (
    <div className="flex justify-center items-center w-full">
      <DefaultButton
        text="Back"
        className={`${currentPage === 1 ? 'cursor-default bg-third hover:bg-third opacity-50 hover:opacity-50' : 'bg-third'}`}
        onClick={() => {
          if (currentPage > 1) {
            setPage(currentPage - 1);
            scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />
      <h3 className="font-bold px-5"> {currentPage} </h3>
      <DefaultButton
        text="Next"
        className={`${!hasNextPage ? 'cursor-default bg-third hover:bg-third opacity-50 hover:opacity-50' : 'bg-third'}`}
        onClick={() => {
          if (hasNextPage) {
            setPage(currentPage + 1);
            scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}
