import { useEffect, useState } from 'react';
import {
  faBell,
  faComment,
  faThumbsUp,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataResult, Notification as INotification } from '@codersquare/shared';
import { getUserNotifications } from '../../api';
import { ErrorPage } from '../../pages';
import { Spinner } from './spinner';
import { getTimeAgo, initSocket, disconnectSocket } from '../../utils';

export const Notification = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [readNotifications, setReadNotifications] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const jwt = localStorage.getItem('jwt') as string;

  const {
    data: response,
    isLoading,
    error,
  } = useQuery<DataResult<INotification[]>>({
    queryKey: ['notification'],
    queryFn: () => getUserNotifications(jwt),
  });

  const [unreadCount, setUnreadCount] = useState(
    response?.meta?.unreadCount || 0,
  );

  const handleUnReadNotification = (id: string) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications((prevReadNotifications: string[]) => [
        ...prevReadNotifications,
        id,
      ]);
    }

    if (unreadCount > 0) setUnreadCount((prev) => prev - 1);

    queryClient.setQueryData(
      ['notification'],
      (oldData?: DataResult<INotification[]>) => {
        if (!oldData) return oldData;

        const updatedData = oldData.data.map(
          (notification: Partial<INotification>) =>
            notification.id === id
              ? { ...notification, isRead: true }
              : notification,
        );

        return {
          ...oldData,
          data: updatedData,
        };
      },
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      if (!isDropdownOpen) {
        setReadNotifications([]);
        console.log({ readNotifications });
        // Send the request here
      }
      return !prev;
    });
  };

  const onChange = (newNotification: INotification) => {
    queryClient.setQueryData(
      ['notification'],
      (oldData?: DataResult<INotification[]>) => {
        if (!oldData) {
          return { data: [newNotification], meta: {} };
        }

        return {
          ...oldData,
          data: [newNotification, ...oldData.data],
        };
      },
    );
  };

  useEffect(() => {
    if (response?.meta?.unreadCount !== undefined) {
      setUnreadCount(response?.meta?.unreadCount);
    }
  }, [response]);

  useEffect(() => {
    if (jwt) {
      const socket = initSocket();
      socket?.on('notification', (newNotification: INotification) => {
        console.log({ newNotification });
        onChange(newNotification);
      });
    }
    return () => {
      disconnectSocket();
    };
  }, [jwt]);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-x-2 p-2 text-gray-500 font-semibold hover:text-gray-800 focus:outline-none"
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon icon={faBell} className="text-xl" />
        {unreadCount && (
          <span className="absolute inset-0 mr-9 ">
            <div className="inline-flex items-center px-1 py-1 border-0 border-white rounded-full text-sm bg-red-500 text-white  h-5 w-5">
              {unreadCount}
            </div>
          </span>
        )}
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
            <div className="flex flex-col p-2 gap-2 max-h-[30rem] overflow-y-scroll">
              {response?.data.map(
                (notification: Partial<INotification>, index: number) => (
                  <Link
                    to={`post/${notification.postId}`}
                    key={index}
                    className={`flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 hover:text-orange-800 rounded-lg transition-all duration-200 cursor-pointer ${
                      !notification.isRead ? 'bg-slate-200' : ''
                    }`}
                    onClick={() => setIsDropdownOpen(false)}
                    onMouseEnter={() => {
                      if (!notification.isRead)
                        handleUnReadNotification(notification.id!);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        notification.type === 'NEW_COMMENT'
                          ? faComment
                          : faThumbsUp
                      }
                      className="flex content-center justify-center text-xl"
                    />
                    <span className="flex flex-col flex-grow">
                      <p className="flex"> {notification.message}</p>
                      <p className="flex justify-end items-end text-gray-400 text-xs">
                        {getTimeAgo(notification.createdAt!)}
                      </p>
                    </span>
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
