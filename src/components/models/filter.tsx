import { HtmlHTMLAttributes } from "react"
import { GiMagnifyingGlass } from "react-icons/gi"

export default function Filter({ onChange } : { onChange: React.ChangeEventHandler<HTMLInputElement>}) {
  return (
    <div className="relative w-full">
      <GiMagnifyingGlass className="absolute right-3 top-2 text-3xl text-eigth"/>
      <input
        className="h-12 w-full rounded-xl outline-none bg-third pb-1 pl-5 pr-14 text-xl text-white"
        onChange={onChange}
      />
    </div>
  )
}
