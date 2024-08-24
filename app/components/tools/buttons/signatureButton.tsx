import { Button } from '@chakra-ui/react';
import React from 'react';

export function SignatureButton({
  type = 'button',
  className,
  loading,
  onClick,
  text,
}: {
  type?: 'submit' | 'reset' | 'button';
  onClick: () => void;
  className?: string;
  loading: boolean;
  text: string;
}) {
  return (
    <Button
      isLoading={loading}
      isDisabled={loading}
      className={`w-fit h-1/3 cursor-pointer text-signature hover:brightness-105 hover:shadow-sm hover:shadow-white active:shadow-none ${className}`}
      transition={'ease'}
      bgColor={'darkslategrey'}
      textColor={'text-signature'}
      _hover={{ bgColor: 'darkslategrey' }}
      type={type}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
