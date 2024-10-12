import { GetMeResponse } from '@codersquare/shared';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../../api';
import { formatDate } from '../../utils/date';

export const UserProfile = () => {
  const jwt = localStorage.getItem('jwt') as string;

  const { data, error, isLoading } = useQuery<GetMeResponse | undefined>({
    queryKey: ['getMe', jwt],
    queryFn: () => getMe(jwt),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="container flex flex-col mt-20 ml-20 gap-y-4">
      <div className="username-container flex gap-x-5 items-start">
        <p className="text-gray-400 w-24">User: </p>
        <span className="text-gray-700">{data?.email.split('@')[0]}</span>
      </div>
      <div className="created-container flex gap-x-5 items-start">
        <p className="text-gray-400 w-24">Created: </p>
        <span className="text-gray-700">
          {formatDate(new Date(data?.createdAt!))}
        </span>
      </div>
      <div className="points-container flex gap-x-5 items-start">
        <p className="text-gray-400 w-24">Points: </p>
        <span className="text-gray-700">0</span>
      </div>
      <div className="about-container flex gap-x-5 items-start">
        <p className="text-gray-400 w-24">About: </p>
        <span className="text-gray-700"></span>
      </div>
    </div>
  );
};
