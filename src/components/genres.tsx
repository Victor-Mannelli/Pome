export function GenresList({ genres } : { genres: string[]}) {
  return (
    <div className="flex flex-col h-full ml-2 pr-2 gap-[0.35rem] overflow-auto">
      {genres.map((e: string, i: number) => (
        <li key={i} className="text-eigth text-xl"> {e} </li>
      ))}
    </div>
  );
}
