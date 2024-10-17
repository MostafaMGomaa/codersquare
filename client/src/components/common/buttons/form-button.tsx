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
        `bg-orange-700 hover:bg-orange-900 text-white text-center font-bold py-2 px-4 rounded-md 
        transition-transform duration-400 w-[6rem] ml-40 `,
        classes,
      )}
      onClick={handleOnClick}
    >
      {isPending ? pendingText : text}
    </button>
  );
};
