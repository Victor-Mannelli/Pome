import { Dispatch, SetStateAction } from 'react';
import { SignatureButton } from '../tools';
import { destroyCookie } from 'nookies';
import React from 'react';

export function ErrorFeedback({
  refreshFunction,
  setFailed,
  animeApi,
  loading,
}: {
  setFailed?: Dispatch<SetStateAction<boolean>>;
  refreshFunction: () => void;
  animeApi: boolean;
  loading: boolean;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-6">
      {animeApi ? (
        <h1 className="text-white text-lg text-center">
          The button below appeared because the API is likely offline.
          <br />
          Click it to reload the page in offline mode!
        </h1>
      ) : (
        <h1 className="text-white text-lg text-center">
          An error has occurred <br /> click bellow to retry!
        </h1>
      )}
      <SignatureButton
        type="submit"
        text="Reload!"
        loading={loading}
        onClick={() => {
          destroyCookie(null, 'token', { path: '/' });
          refreshFunction();
          setFailed && setFailed(false);
        }}
      />
    </div>
  );
}
