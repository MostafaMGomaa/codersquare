import { GetMeResponse } from '@codersquare/shared';
import { useQuery } from '@tanstack/react-query';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getMe } from '../../api';
import { formatDate } from '../../utils/date';
import { ErrorPage } from '../error';
import { Spinner } from '../../components';
import { EditableField } from '../../components/common/editable-field';
import { useUpdateMeMutation } from '../../api/users/update-user';

export const UserProfile = () => {
  const jwt = localStorage.getItem('jwt') as string;
  const updateMutation = useUpdateMeMutation();

  const { data, error, isLoading } = useQuery<GetMeResponse | undefined>({
    queryKey: ['getMe', jwt],
    queryFn: () => getMe(jwt),
  });

  const handleBioUpdate = async (newBio: string) => {
    await updateMutation.mutateAsync({
      jwt,
      about: newBio,
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorPage
        errorMessage="Error, fetching the data"
        errorDetails="Sorry, we can't fetch data, please try again later."
        statusCode={500}
        icon={
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-orange-600 text-8xl mb-4 animate-bounce"
          />
        }
      />
    );
  }

  return (
    <div className="container flex flex-col mt-20 ml-20 gap-y-4">
      <div className="username-container flex gap-x-5 items-start">
        <p className="text-gray-400 w-24">User: </p>
        <span className="text-gray-700">{data?.username}</span>
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
        {/* <span className="text-gray-700">{data?.about}</span> */}
        <EditableField
          initialText={data?.about || ''}
          onSave={handleBioUpdate}
          placeholder="Add bio..."
        />
      </div>
    </div>
  );
};
