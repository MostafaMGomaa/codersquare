import {
  CreatePostResponse,
  Endpoints,
  ENDPOINTS_CONFIGS,
} from '@codersquare/shared';
import { SendRequest } from '../sendRequest';
import { CreatePostPayload } from '../../types/posts';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export const createPost = async (
  createPostPayload: CreatePostPayload,
): Promise<CreatePostResponse> => {
  const endpoint = ENDPOINTS_CONFIGS[Endpoints.createPost];
  return (await SendRequest(
    endpoint.url,
    endpoint.method,
    {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${createPostPayload.jwt}`,
    },
    JSON.stringify({
      title: createPostPayload.title,
      url: createPostPayload.url,
    }),
  )) as CreatePostResponse;
};

export const useCreatePostMutation = (): UseMutationResult<
  CreatePostResponse,
  Error,
  CreatePostPayload
> => {
  return useMutation<CreatePostResponse, Error, CreatePostPayload>({
    mutationFn: (createPostPayload: CreatePostPayload) =>
      createPost(createPostPayload),
    onError: (error: Error) => {
      console.error(error);
      return `error ${error}`;
    },
  });
};
