import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  Endpoints,
  ENDPOINTS_CONFIGS,
  CreateLikeResponse,
} from '@codersquare/shared';
import { CreateLikePayload } from '../../types/likes';
import { SendRequest } from '../sendRequest';

const createLikeEndpoint = ENDPOINTS_CONFIGS[Endpoints.createLike];

export const createLike = async (
  createLikePayload: CreateLikePayload,
): Promise<CreateLikeResponse> => {
  try {
    const endpointWithParam = createLikeEndpoint.url.replace(
      ':postId',
      createLikePayload.postId,
    );
    const response = await SendRequest(
      endpointWithParam,
      createLikeEndpoint.method,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${createLikePayload.jwt}`,
      },
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
    onError: (error: Error) => {
      console.error(error);
      return `error ${error}`;
    },
  });
};
