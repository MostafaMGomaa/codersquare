import React from 'react';
import { FormButtonProps } from '../types';

export const FormButton: React.FC<FormButtonProps> = ({
  text,
  disabled = false,
  isPending = false,
  pendingText = text,
  classes = '',
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`bg-orange-700 hover:bg-orange-900 text-white text-center font-bold py-2 px-4 rounded-md 
        transition-transform duration-400 w-[6rem] ml-40 ${classes}`}
    >
      {isPending ? pendingText : text}
    </button>
  );
};
