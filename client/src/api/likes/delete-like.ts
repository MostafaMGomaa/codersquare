import {
  DeleteLikeResponse,
  Endpoints,
  ENDPOINTS_CONFIGS,
} from '@codersquare/shared';
import { SendRequest } from '../sendRequest';
import { DeleteLikePayload } from '../../types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export const deleteLike = async (payload: DeleteLikePayload) => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.deleteLike];
  const urlWithParam = endpoint.url.replace(':postId', payload.postId);

  return (await SendRequest(urlWithParam, endpoint.method, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${payload.jwt}`,
  })) as DeleteLikeResponse;
};

export const useDeleteLikeMutation = (): UseMutationResult<
  DeleteLikeResponse,
  Error,
  DeleteLikePayload
> => {
  return useMutation<DeleteLikeResponse, Error, DeleteLikePayload>({
    mutationFn: (payload: DeleteLikePayload) => deleteLike(payload),
    onError: (error: Error) => {
      console.error(error);
      return `error ${error}`;
    },
  });
};
