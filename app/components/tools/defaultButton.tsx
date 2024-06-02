import { MouseEventHandler } from "react";
import React from "react";

export function DefaultButton({ text, onClick, className }: {
  onClick: MouseEventHandler;
  className: string;
  text: string;
}) {
  return (
    <button
      className={`p-5 text-xl font-bold text-eigth rounded-xl hover:bg-second transition-none  ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
