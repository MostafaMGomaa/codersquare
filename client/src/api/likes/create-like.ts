import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  Endpoints,
  ENDPOINTS_CONFIGS,
  CreateLikeResponse,
} from '@codersquare/shared';
import { CreateLikePayload } from '../../types/likes';
import { SendRequest } from '../sendRequest';

const createEndpoint = ENDPOINTS_CONFIGS[Endpoints.createLike];

export const createLike = async (
  createLikePayload: CreateLikePayload,
): Promise<CreateLikeResponse> => {
  try {
    const response = await SendRequest(
      createEndpoint.url,
      createEndpoint.method,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${createLikePayload.jwt}`,
      },
      JSON.stringify(createLikePayload),
    );

    return response as CreateLikeResponse;
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Signup failed';
    throw new Error(error || 'Error occurred during creating like');
  }
};

export const useCreateLikeMutation = (): UseMutationResult<
  CreateLikeResponse,
  Error,
  CreateLikePayload
> => {
  return useMutation<CreateLikeResponse, Error, CreateLikePayload>({
    mutationFn: (createLikePayload: CreateLikePayload) =>
      createLike(createLikePayload),
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error(error);
      return `error ${error}`;
    },
  });
};
