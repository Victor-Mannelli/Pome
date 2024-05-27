import { MdKeyboardArrowDown } from "@/utils/libs";
import React, { Dispatch, SetStateAction } from "react"

export function PomeSelect({ children, setShow, title, show }: {
  setShow: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  show: boolean;
}) {
  return (
    <div
      className="relative flex flex-col w-48 h-full bg-third text-white rounded-sm"
      style={{ boxShadow: "0 0 2px rgb(204, 204, 204)", transition: "all 0.5s ease" }}
    >
      <div
        className="flex items-center justify-evenly w-full h-10 cursor-pointer active:bg-fifth"
        onClick={() => setShow(!show)}
      >
        <MdKeyboardArrowDown className="invisible text-2xl cursor-pointer" />
        <span> {title} </span>
        <MdKeyboardArrowDown className="text-2xl cursor-pointer" />
      </div>
      <ul
        className={`absolute top-10 bg-third w-48 max-h-60 overflow-auto ${show ? "block" : "hidden"}`}
        style={{ boxShadow: "0 0 2px rgb(204, 204, 204)", transition: "all 0.5s ease" }}
      >
        {children}
      </ul>
    </div >
  );
}
