import { User } from '@codersquare/shared';

import { UserInfo } from '../../components';
import { useUpdateMeMutation } from '../../api/users/update-user';

export const UserProfile = () => {
  const jwt = localStorage.getItem('jwt') as string;
  const updateMutation = useUpdateMeMutation();

  const user = JSON.parse(localStorage.getItem('user') as string) as User;

  const handleBioUpdate = async (newBio: string) => {
    await updateMutation.mutateAsync({
      jwt,
      about: newBio,
    });
  };

  return (
    <UserInfo data={user} handleBioUpdate={handleBioUpdate} isEditable={true} />
  );
};
