import { twMerge } from 'tailwind-merge';
import { ShadowButtonProps } from '../../../types';
import { Link } from 'react-router-dom';

export const ShadowButton: React.FC<ShadowButtonProps> = ({
  text,
  extraClasses,
  href = '',
  onClick,
  icon,
}) => {
  return (
    <Link
      to={href}
      className={twMerge(
        'flex items-center gap-x-2 px-3 py-2 text-gray-500 font-semibold text-center hover:text-gray-800 transition-colors duration-300 rounded-md',
        extraClasses,
      )}
      onClick={onClick}
    >
      {icon} {text}
    </Link>
  );
};
