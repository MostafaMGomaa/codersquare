import { useState } from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Notification as INotification } from '@codersquare/shared';

export const Notification = (notifications: INotification[]) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          <div className="flex flex-col p-2">
            {notifications.map((notification, index) => (
              <Link
                to="#"
                key={index}
                className="p-3 text-gray-600 hover:bg-gray-100 hover:text-orange-800 rounded-lg transition-all duration-200 cursor-pointer"
              >
                {notification.message}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
