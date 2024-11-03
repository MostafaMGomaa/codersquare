import { GetMeResponse, User } from '@codersquare/shared';
import { useQuery } from '@tanstack/react-query';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getMe } from '../../api';
import { ErrorPage } from '../error';
import { Spinner, UserInfo } from '../../components';
import { useUpdateMeMutation } from '../../api/users/update-user';

export const UserProfile = () => {
  const jwt = localStorage.getItem('jwt') as string;
  const updateMutation = useUpdateMeMutation();

  const { data, error, isLoading } = useQuery<User | undefined>({
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
    <UserInfo data={data} handleBioUpdate={handleBioUpdate} isEditable={true} />
  );
};
