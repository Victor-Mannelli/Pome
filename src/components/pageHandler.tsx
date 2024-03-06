import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { Button } from './models';

export function PageHandler({ currentPage, hasNextPage, setToggle, toggle, route }: {
  setToggle?: Dispatch<SetStateAction<boolean>>
  hasNextPage: boolean,
  currentPage: number,
  toggle?: boolean,
  route: string;
}) {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-full">
      <Button
        text="Back"
        className="bg-third"
        onClick={() => {
          if (currentPage > 1) {
            router.push({
              pathname: `/${route}`,
              query: { page: `${currentPage - 1}` }
            });
            setToggle && setToggle(!toggle)
          }
        }}
      />
      <h3 className="font-bold px-5"> {currentPage} </h3>
      {hasNextPage
        ? <Button
          text="Next"
          className="bg-third"
          onClick={() => {
            router.push({
              pathname: `/${route}`,
              query: { page: `${currentPage + 1}` }
            });
            setToggle && setToggle(!toggle)
          }}
        />
        : null
      }
    </div>
  );
}
