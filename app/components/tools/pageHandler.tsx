import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components';

export function PageHandler({ currentPage, hasNextPage, setPage }: {
  setPage: Dispatch<SetStateAction<number>>;
  hasNextPage: boolean;
  currentPage: number;
}) {
  return (
    <div className="flex justify-center items-center w-full">
      <Button
        text="Back"
        className={`${currentPage === 1 ? "cursor-default bg-third hover:bg-third opacity-50 hover:opacity-50" : "bg-third"}`}
        onClick={() => {
          if (currentPage > 1) {
            setPage(currentPage - 1)
          }
        }}
      />
      <h3 className="font-bold px-5"> {currentPage} </h3>
      <Button
        text="Next"
        className={`${!hasNextPage ? "cursor-default bg-third hover:bg-third opacity-50 hover:opacity-50" : "bg-third"}`}
        onClick={() => {
          if (hasNextPage) {
            setPage(currentPage + 1)
          }
        }}
      />
    </div>
  );
}
