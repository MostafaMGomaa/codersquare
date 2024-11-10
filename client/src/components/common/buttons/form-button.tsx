import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FormButtonProps } from '../../../types';

export const FormButton: React.FC<FormButtonProps> = ({
  text,
  disabled = false,
  isPending = false,
  pendingText = text,
  classes = '',
  handleOnClick,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={twMerge(
        'bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-md w-24 ml-8 transition-transform duration-300',
        classes,
      )}
      onClick={handleOnClick}
    >
      {isPending ? pendingText : text}
    </button>
  );
};
