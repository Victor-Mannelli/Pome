export function Stars(props: any) {
  const width =`${(props.score * 10).toFixed(2)}%`
  return (
    <div className="relative w-[74.98px] h-8">
      <div 
        className={`absolute z-10 top-0 left-0 overflow-hidden`}
        style={{ width: width }}
      > 
        <p className="text-[#e7711b] text-lg">★★★★★</p>
      </div>
      <div className="absolute z-0 top-0 left-0">
        <p className="text-white text-lg">★★★★★</p>
      </div>
    </div>
  )
}
