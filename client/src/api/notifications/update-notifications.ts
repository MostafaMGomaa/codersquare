import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Endpoints, ENDPOINTS_CONFIGS } from '@codersquare/shared';
import { SendRequest } from '../sendRequest';
import {
  UpdateNotificationsPayload,
  UpdateNotificationsResponse,
} from '../../types';

export const updateNotifications = async (
  payload: UpdateNotificationsPayload,
): Promise<UpdateNotificationsResponse> => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.updateNotifications];

  return SendRequest(
    endpoint.url,
    endpoint.method,
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${payload.jwt}`,
    },
    JSON.stringify({ ids: payload.ids }),
  );
};

export const useUpdateNotificationsMutation = (): UseMutationResult<
  UpdateNotificationsResponse,
  Error,
  UpdateNotificationsPayload
> => {
  return useMutation({
    mutationFn: updateNotifications,
    onError: (error: Error) => {
      console.error('Update failed:', error);
      toast.error('Somthing went error with notification');
    },
  });
};
