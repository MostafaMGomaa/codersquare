import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShadowButton } from './shadow-button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';

export const MoreButton = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  classes = '',
}: {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => any;
  classes?: string;
}) => {
  return (
    <ShadowButton
      text={
        isFetchingNextPage
          ? 'more...'
          : hasNextPage
          ? 'More'
          : 'Nothing more to load'
      }
      extraClasses={twMerge('flex text-orange-800 gap-x-2 ml-0', classes)}
      icon={
        <FontAwesomeIcon
          icon={faPlus}
          className={`text-sm w-3 ${!hasNextPage ? 'hidden' : ''}`}
        />
      }
      onClick={() => fetchNextPage()}
    />
  );
};
