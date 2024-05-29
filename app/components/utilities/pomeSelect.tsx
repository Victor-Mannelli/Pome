import { GiBroom, MdKeyboardArrowDown } from "@/utils/libs";
import { airingStatusOptions } from "@/utils/consts";
import { Dispatch, SetStateAction } from "react";
import { FilterType } from "@/utils/types";
import { CloseMask } from "./closeMask";

export function PomeSelect({ title, options, setShow, show, selectionOf, setFilter }: {
  setFilter: Dispatch<SetStateAction<FilterType>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  title: string | null;
  selectionOf: string;
  options: any[];
  show: boolean;
}) {
  return (
    <CloseMask setState={setShow} state={show}>
      <div
        className="relative z-20 flex flex-col w-48 h-full bg-third text-white rounded-sm"
        style={{ boxShadow: "0 0 2px rgb(204, 204, 204)", transition: "all 0.5s ease" }}
      >
        <div
          className="flex items-center justify-between pl-3 w-full h-10 cursor-pointer text-sm active:bg-fifth"
          onClick={() => setShow(!show)}
        >
          <span> {title ? title : selectionOf[0].toLocaleUpperCase() + selectionOf.slice(1)} </span>
          {title ?
            <GiBroom
              className="hover:text-signature hover:text-opacity-75 mr-[0.9rem] text-[1rem]"
              onClick={() => {
                setFilter((prevState: any) => ({ ...prevState, [selectionOf]: null }));
                setShow(false)
              }}
            />
            : <MdKeyboardArrowDown className="text-2xl cursor-pointer mr-2" />
          }
        </div>
        <ul
          className={`absolute top-10 bg-third w-48 max-h-60 overflow-auto ${show ? "block" : "hidden"}`}
          style={{ boxShadow: "0 0 2px rgb(204, 204, 204)", transition: "all 0.5s ease" }}
        >
          {options.map((e, i) => (
            <li
              id={e}
              key={"option" + e + i}
              className="text-center py-2 hover:bg-fourth cursor-pointer active:bg-fifth"
              onClick={() => {
                setShow(false)
                setFilter((prevState: any) => ({ ...prevState, [selectionOf]: e }));
              }}
            >
              {selectionOf === "status" ? airingStatusOptions[e] : e}
            </li>
          ))}
        </ul>
      </div >
    </CloseMask>
  );
}
