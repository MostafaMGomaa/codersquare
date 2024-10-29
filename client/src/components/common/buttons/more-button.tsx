import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShadowButton } from './shadow-button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const MoreButton = ({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => any;
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
      extraClasses="flex text-orange-800 gap-x-2 ml-0"
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
