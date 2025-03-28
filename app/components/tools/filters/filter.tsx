import { GiMagnifyingGlass } from '@/utils/libs';

export function Filter({
  onChange,
  className,
  placeholder,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={`relative w-full h-fit ${className}`}>
      <GiMagnifyingGlass className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-eigth" />
      <input className="h-10 w-full rounded-md outline-none bg-third pl-3 pr-10 text-lg text-white" onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
