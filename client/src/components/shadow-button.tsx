import { twMerge } from 'tailwind-merge';
import { ShadowButtonProps } from '../types';

export const ShadowButton: React.FC<ShadowButtonProps> = ({
  text,
  extraClasses,
  href = '',
  onClick,
}) => {
  return (
    <a
      href={href}
      className={`${twMerge(
        'flex place-items-center mx-4 text-gray-500 font-semibold text-center hover:text-gray-800 transition-colors duration-300',
        extraClasses,
      )} ${extraClasses}`}
      onClick={onClick}
    >
      {text}
    </a>
  );
};
