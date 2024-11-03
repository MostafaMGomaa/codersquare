import { useQuery } from '@tanstack/react-query';
import { User } from '@codersquare/shared';

import { Spinner, UserInfo } from '../../components';
import { getUserById } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { ErrorPage } from '../error';
import { useParams } from 'react-router-dom';

export const ViewUser = () => {
  const { id } = useParams<{ id: string }>();
  const jwt = localStorage.getItem('jwt') as string;

  if (!id) {
    return (
      <ErrorPage
        errorMessage="Error, Bad Request the posts"
        errorDetails="Missing user Id, please enter vaild user Id."
        statusCode={400}
        icon={
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-orange-600 text-8xl mb-4 animate-bounce"
          />
        }
      />
    );
  }

  const { data, error, isLoading } = useQuery<User | undefined>({
    queryKey: ['getMe', jwt],
    queryFn: () => getUserById({ jwt, userId: id! }),
  });

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

  return <UserInfo data={data} isEditable={false} />;
};
