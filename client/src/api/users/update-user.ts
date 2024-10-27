import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Endpoints, ENDPOINTS_CONFIGS } from '@codersquare/shared';
import { UpdateMePayload, UpdateMeResponse } from '../../types';
import { SendRequest } from '../sendRequest';

export const updateMe = async ({
  jwt,
  about,
}: UpdateMePayload): Promise<UpdateMeResponse> => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.updateMe];

  return SendRequest(
    endpoint.url,
    endpoint.method,
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    JSON.stringify({ about }),
  );
};

export const useUpdateMeMutation = (): UseMutationResult<
  UpdateMeResponse,
  Error,
  UpdateMePayload
> => {
  const queryClient = useQueryClient();

  return useMutation<UpdateMeResponse, Error, UpdateMePayload>({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getMe'] });
    },
    onError: (error: Error) => {
      console.error('Update failed:', error);
      toast.error('Failed to update profile');
    },
  });
};
