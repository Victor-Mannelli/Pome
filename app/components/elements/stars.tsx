import { ReactElement } from 'react';

export function Stars({ score, className } : { score: number, className?: string}) : ReactElement {
  return (
    <div className={`relative w-[74.98px] h-8 overflow-hidden ${className}`}>
      <div 
        className='absolute z-10 top-0 left-0'
        style={{ width: `${score}%` }}
      > 
        <p className="text-[#e7711b] text-lg">★★★★★</p>
      </div>
      <div className="absolute z-0 top-0 left-0">
        <p className="text-white text-lg">★★★★★</p>
      </div>
    </div>
  );
}
