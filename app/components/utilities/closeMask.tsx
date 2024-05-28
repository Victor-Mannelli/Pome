import { Dispatch, ReactNode, SetStateAction } from "react";

export function CloseMask({ children, setState, state }: {
  setState: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  state: boolean;
}) {
  return (
    <div className="relative">
      <div
        className={`${state ? "fixed" : "hidden"} z-10 inset-0 bg-black bg-opacity-5`}
        onClick={() => setState(false)}
      >
      </div>
      {children}
    </div>
  )
}