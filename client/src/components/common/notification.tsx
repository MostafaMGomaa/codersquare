import { useState } from 'react';
import {
  faBell,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DataResult, Notification as INotification } from '@codersquare/shared';
import { getUserNotifications } from '../../api';
import { ErrorPage } from '../../pages';
import { Spinner } from './spinner';

export const Notification = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const jwt = localStorage.getItem('jwt') as string;

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery<DataResult<INotification[]>>({
    queryKey: ['notification'],
    queryFn: () => getUserNotifications(jwt),
    enabled: false, // Fetch only when triggered
  });

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      if (!prev) {
        // Fetch notifications only when opening the dropdown
        refetch();
      }
      return !prev;
    });
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-x-2 p-2 text-gray-500 font-semibold hover:text-gray-800 focus:outline-none"
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon icon={faBell} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-gray-200 z-10">
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <ErrorPage
              errorMessage="Error fetching the data"
              errorDetails="Sorry, we can't fetch data. Please try again later."
              statusCode={500}
              icon={
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="text-orange-600 text-8xl mb-4 animate-bounce"
                />
              }
            />
          ) : (
            <div className="flex flex-col p-2">
              {response?.data.map(
                (notification: INotification, index: number) => (
                  <Link
                    to="#"
                    key={index}
                    className="p-3 text-gray-600 hover:bg-gray-100 hover:text-orange-800 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    {notification.message}
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
