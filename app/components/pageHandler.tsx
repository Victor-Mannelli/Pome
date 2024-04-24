import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/models';

export function PageHandler({ currentPage, hasNextPage, getAnimes, setPage }: {
  setPage: Dispatch<SetStateAction<number>>;
  getAnimes: () => void;
  hasNextPage: boolean;
  currentPage: number;
}) {

  return (
    <div className="flex justify-center items-center w-full">
      <Button
        text="Back"
        className="bg-third"
        onClick={() => {
          if (currentPage > 1) {
            setPage(currentPage - 1)
            getAnimes()
          }
        }}
      />
      <h3 className="font-bold px-5"> {currentPage} </h3>
      {hasNextPage
        ? <Button
          text="Next"
          className="bg-third"
          onClick={() => {
            setPage(currentPage + 1)
            getAnimes()
          }}
        />
        : null
      }
    </div>
  );
}
