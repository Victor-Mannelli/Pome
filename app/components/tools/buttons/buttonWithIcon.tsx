import { AiOutlineLoading3Quarters } from '@/utils/libs';
import { IconType } from 'react-icons';
import { Link } from '..';

export function ButtonWithIcon({
  shadowColor,
  className,
  loading,
  onClick,
  title,
  Icon,
  type,
  href,
}: {
  type?: 'button' | 'submit' | 'reset';
  shadowColor?: string;
  onClick?: () => void;
  href: string | null;
  className?: string;
  loading?: boolean;
  Icon: IconType;
  title: string;
}) {
  return (
    <Link href={href}>
      <button
        style={{ boxShadow: `${shadowColor ? shadowColor : 'rgba(85, 89, 94, 0.5)'} 0px 7px 7px -4px` }}
        className={`flex items-center gap-3 p-3 rounded-lg ${className}`}
        type={type ? type : 'button'}
        disabled={loading}
        onClick={onClick}
      >
        <Icon className="text-white text-lg" />
        {loading ? (
          <span className="flex justify-center w-full mr-6">
            <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
          </span>
        ) : (
          <h1 className="cursor-pointer"> {title} </h1>
        )}
      </button>
    </Link>
  );
}
