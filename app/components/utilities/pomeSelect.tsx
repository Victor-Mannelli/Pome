import React, { Dispatch, SetStateAction, useState } from "react"
import { MdKeyboardArrowDown } from "@/utils/libs";
import { FilterType } from "@/utils/types";

export function PomeSelect({ options, setFilter, filter }: {
  setFilter: Dispatch<SetStateAction<any>>
  filter: FilterType;
  options: any;
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div
      className="w-48 h-full bg-third text-white rounded-sm"
      style={{ boxShadow: "0 0 2px rgb(204, 204, 204)", transition: "all 0.5s ease" }}
    >
      <div
        className="flex items-center justify-evenly w-full h-10 cursor-pointer active:bg-fifth"
        onClick={() => setShow(!show)}
      >
        <MdKeyboardArrowDown className="invisible text-2xl cursor-pointer" />
        <span className=""> {filter.status ? options[filter.status] : "Select Status"} </span>
        <MdKeyboardArrowDown className="text-2xl cursor-pointer" />
      </div>
      <ul
        className={`${show ? "block" : "hidden"}`}
        style={{ boxShadow: "0 0 2px rgb(204, 204, 204)", transition: "all 0.5s ease" }}
      >
        {Object.keys(options).map((e) => (
          <li
            className="text-center py-2 hover:bg-fourth cursor-pointer active:bg-fifth"
            onClick={() => {
              setShow(false)
              setFilter((prevState: FilterType) => ({ ...prevState, status: e }));
            }}
            id={e}
          >
            {options[e]}
          </li>
        ))}
      </ul>
    </div >
  );
}
