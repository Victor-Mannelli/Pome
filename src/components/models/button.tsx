export default function Button({
  text,
  onClick,
  // list
  className
}: {
  text: string,
  onClick: React.MouseEventHandler,
  className: string
  // list?: string
}) {
  return (
    <button
      className={`p-5 text-xl font-bold text-eigth rounded-xl hover:bg-second transition-none  ${className}`}
      onClick={onClick}
    > {text} </button> 
    // <button
    //   className={`p-5 ml-5 mt-5 text-xl font-bold text-eigth rounded-xl hover:bg-second transition-none
    //   ${text === list ? "border bg-second" : "bg-third"}`}
    //   onClick={onClick}
    // > {text} </button>
  );
}
