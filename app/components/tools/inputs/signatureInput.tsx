'use client';

import { BsEye, BsEyeSlash } from '@/utils/libs/reactIcons';
import { IconType } from 'react-icons';
import { useState } from 'react';

export function SignatureInput({
  required = true,
  placeholder,
  onChange,
  label,
  type,
  Icon,
  id,
}: {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  required?: boolean;
  Icon?: IconType;
  label: string;
  type?: string;
  id: string;
}) {
  const [visibility, setVisibility] = useState<boolean>(false);
  return (
    <div className="input-container w-full my-2">
      <input
        id={id}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        type={visibility ? 'text' : type}
        className={'input-field w-full pr-10'}
      />
      <label htmlFor="input-field" className="input-label">
        {label}
      </label>
      <span className="input-highlight"></span>
      {Icon && type !== 'password' ? (
        <Icon className="text-white absolute right-2 bottom-1 text-2xl" />
      ) : type === 'password' && visibility === false ? (
        <BsEyeSlash className="text-white absolute right-2 bottom-1 text-2xl cursor-pointer" onClick={() => setVisibility(!visibility)} />
      ) : type === 'password' && visibility === true ? (
        <BsEye className="text-white absolute right-2 bottom-1 text-2xl cursor-pointer" onClick={() => setVisibility(!visibility)} />
      ) : null}
    </div>
  );
}
